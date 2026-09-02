const DATA_DIR = "data/";
const MANIFEST_URL = DATA_DIR + "manifest.json";

let MANIFEST = null;
const chapterCache = new Map();

// RFC4180風のCSVパーサ（意味欄にカンマを含む値があるため必須）
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // skip
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function loadManifest() {
  const res = await fetch(MANIFEST_URL);
  MANIFEST = await res.json();
  return MANIFEST;
}

async function loadChapter(num) {
  if (chapterCache.has(num)) return chapterCache.get(num);

  const meta = MANIFEST.chapters.find((c) => c.num === num);
  if (!meta) return [];

  const res = await fetch(DATA_DIR + meta.file);
  const text = await res.text();
  const rows = parseCsv(text).filter((r) => r.length >= 5 && r[0] !== "");
  rows.shift(); // header

  const words = rows.map((r) => ({
    stt: parseInt(r[0], 10),
    kanji: r[1],
    hanviet: r[2],
    yomi: r[3],
    meaning: r[4],
    bai: num,
    source: meta.file,
  }));

  chapterCache.set(num, words);
  return words;
}

async function loadChapters(nums) {
  const lists = await Promise.all(nums.map(loadChapter));
  return lists.flat();
}

function findChapterForStt(stt) {
  const ch = MANIFEST.chapters.find((c) => stt >= c.startStt && stt <= c.endStt);
  return ch ? ch.num : null;
}

// ===== 苦手単語の永続化（localStorage） =====

const WRONG_WORDS_KEY = "n1QuizWrongWords";

function loadWrongStts() {
  try {
    const raw = JSON.parse(localStorage.getItem(WRONG_WORDS_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function addWrongStt(stt) {
  const set = new Set(loadWrongStts());
  set.add(stt);
  localStorage.setItem(WRONG_WORDS_KEY, JSON.stringify([...set]));
}

function removeWrongStt(stt) {
  const set = new Set(loadWrongStts());
  set.delete(stt);
  localStorage.setItem(WRONG_WORDS_KEY, JSON.stringify([...set]));
}

async function getWrongWords() {
  const stts = loadWrongStts();
  const byChapter = new Map();
  for (const stt of stts) {
    const num = findChapterForStt(stt);
    if (num == null) continue;
    if (!byChapter.has(num)) byChapter.set(num, []);
    byChapter.get(num).push(stt);
  }

  const words = [];
  for (const [num, sttList] of byChapter) {
    const chapterWords = await loadChapter(num);
    const bySttInChapter = new Map(chapterWords.map((w) => [w.stt, w]));
    for (const stt of sttList) {
      const w = bySttInChapter.get(stt);
      if (w) words.push(w);
    }
  }
  return words;
}

// ===== 出題範囲（グループ）定義 =====

let RANGE_DEFS = {};
let selectedRangeId = "all";
let selectedCount = 5;
let selectedType = "mixed";

function buildRangeDefs() {
  const allNums = MANIFEST.chapters.map((c) => c.num);
  const totalWords = MANIFEST.totalWords;
  RANGE_DEFS = {
    all: { label: `全部（${totalWords}語）`, chapters: allNums },
  };
  MANIFEST.groups.forEach((g, i) => {
    const count = g.chapters.reduce((sum, num) => {
      const ch = MANIFEST.chapters.find((c) => c.num === num);
      return sum + (ch ? ch.count : 0);
    }, 0);
    RANGE_DEFS[`g${i}`] = { label: `${g.label}（${count}語）`, chapters: g.chapters };
  });
}

function rangeWordCount(rangeId) {
  return RANGE_DEFS[rangeId].chapters.reduce((sum, num) => {
    const ch = MANIFEST.chapters.find((c) => c.num === num);
    return sum + (ch ? ch.count : 0);
  }, 0);
}

// ===== クイズの状態 =====

let quizItems = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let history = [];

let fcQueue = [];
let fcTotal = 0;
let fcKnownCount = 0;
let fcFlipped = false;

const QUESTION_TYPES = ["kanji-yomi", "kanji-meaning", "meaning-kanji"];
const TYPE_LABEL = {
  "kanji-yomi": "漢字 → 読み方",
  "kanji-meaning": "漢字 → 意味（ベトナム語）",
  "meaning-kanji": "ベトナム語 → 漢字",
};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const flashcardScreen = document.getElementById("flashcard-screen");
const ALL_SCREENS = [startScreen, quizScreen, resultScreen, flashcardScreen];

function showScreen(screen) {
  ALL_SCREENS.forEach((s) => s.classList.toggle("hidden", s !== screen));
}

const loadingText = document.getElementById("loading-text");
const rangeGroup = document.getElementById("range-group");
const rangeOptions = document.getElementById("range-options");
const countGroup = document.getElementById("count-group");
const countOptions = document.getElementById("count-options");
const typeGroup = document.getElementById("type-group");
const typeOptions = document.getElementById("type-options");
const startBtn = document.getElementById("start-btn");
const allCountBtn = countOptions.querySelector('[data-count="all"]');

const flashcardEntry = document.getElementById("flashcard-entry");
const flashcardEntryText = document.getElementById("flashcard-entry-text");
const flashcardEntryBtn = document.getElementById("flashcard-entry-btn");

const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const questionLabel = document.getElementById("question-label");
const questionText = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const feedbackResult = document.getElementById("feedback-result");
const feedbackExplain = document.getElementById("feedback-explain");
const nextBtn = document.getElementById("next-btn");

const resultScore = document.getElementById("result-score");
const resultList = document.getElementById("result-list");
const reviewMistakesBtn = document.getElementById("review-mistakes-btn");
const retryBtn = document.getElementById("retry-btn");

const fcProgress = document.getElementById("flashcard-progress");
const fcCard = document.getElementById("flashcard");
const fcKanji = document.getElementById("flashcard-kanji");
const fcYomi = document.getElementById("flashcard-yomi");
const fcMeaning = document.getElementById("flashcard-meaning");
const fcSource = document.getElementById("flashcard-source");
const fcActions = document.getElementById("flashcard-actions");
const fcAgainBtn = document.getElementById("fc-again-btn");
const fcKnownBtn = document.getElementById("fc-known-btn");
const fcComplete = document.getElementById("flashcard-complete");
const fcCompleteText = document.getElementById("flashcard-complete-text");
const fcExitBtn = document.getElementById("fc-exit-btn");

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setupOptionGroup(container, dataAttr, onSelect, defaultValue) {
  const buttons = container.querySelectorAll(".option-btn");
  buttons.forEach((btn) => {
    if (btn.dataset[dataAttr] === String(defaultValue)) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      onSelect(btn.dataset[dataAttr]);
    });
  });
}

function updateAllCountLabel() {
  allCountBtn.textContent = `全${rangeWordCount(selectedRangeId)}問`;
}

function renderRangeOptions() {
  rangeOptions.innerHTML = "";
  const order = ["all", ...MANIFEST.groups.map((_, i) => `g${i}`)];
  order.forEach((id) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn" + (id === selectedRangeId ? " selected" : "");
    btn.textContent = RANGE_DEFS[id].label;
    btn.addEventListener("click", () => {
      rangeOptions.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedRangeId = id;
      updateAllCountLabel();
    });
    rangeOptions.appendChild(btn);
  });
}

function buildQuestion(word, type, pool) {
  const others = pool.filter((w) => w.stt !== word.stt);

  if (type === "kanji-yomi") {
    const distractors = shuffle(others.filter((w) => w.yomi !== word.yomi)).slice(0, 3);
    const choices = shuffle([word, ...distractors]).map((w) => w.yomi);
    return { type, prompt: word.kanji, correctAnswer: word.yomi, choices, word };
  }

  if (type === "kanji-meaning") {
    const distractors = shuffle(others.filter((w) => w.meaning !== word.meaning)).slice(0, 3);
    const choices = shuffle([word, ...distractors]).map((w) => w.meaning);
    return { type, prompt: word.kanji, correctAnswer: word.meaning, choices, word };
  }

  // meaning-kanji
  const distractors = shuffle(others.filter((w) => w.kanji !== word.kanji)).slice(0, 3);
  const choices = shuffle([word, ...distractors]).map((w) => w.kanji);
  return { type, prompt: word.meaning, correctAnswer: word.kanji, choices, word };
}

async function startQuiz() {
  startBtn.disabled = true;
  startBtn.textContent = "読み込み中...";

  const pool = await loadChapters(RANGE_DEFS[selectedRangeId].chapters);
  const count = selectedCount === "all" ? pool.length : Math.min(parseInt(selectedCount, 10), pool.length);
  const words = shuffle(pool).slice(0, count);

  quizItems = words.map((word) => {
    const type = selectedType === "mixed"
      ? QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)]
      : selectedType;
    return buildQuestion(word, type, pool);
  });

  currentIndex = 0;
  score = 0;
  history = [];

  startBtn.disabled = false;
  startBtn.textContent = "クイズを始める";

  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  feedbackEl.classList.add("hidden");

  const item = quizItems[currentIndex];
  const total = quizItems.length;

  progressFill.style.width = `${(currentIndex / total) * 100}%`;
  progressText.textContent = `問題 ${currentIndex + 1} / ${total}`;

  questionLabel.textContent = TYPE_LABEL[item.type];
  questionText.textContent = item.prompt;

  choicesEl.innerHTML = "";
  item.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, choice));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(button, choice) {
  if (answered) return;
  answered = true;

  const item = quizItems[currentIndex];
  const isCorrect = choice === item.correctAnswer;

  if (isCorrect) score++;

  Array.from(choicesEl.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === item.correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  const w = item.word;
  if (!isCorrect) {
    addWrongStt(w.stt);
  }

  feedbackResult.textContent = isCorrect ? "正解！" : "不正解";
  feedbackResult.className = `feedback-result ${isCorrect ? "correct" : "wrong"}`;
  feedbackExplain.textContent =
    `${w.kanji}（${w.yomi}）= ${w.meaning}　` +
    `【${w.source} STT ${w.stt}番より】`;
  feedbackEl.classList.remove("hidden");

  history.push({
    prompt: item.prompt,
    typeLabel: TYPE_LABEL[item.type],
    correctAnswer: item.correctAnswer,
    userAnswer: choice,
    isCorrect,
    word: w,
  });

  nextBtn.textContent = currentIndex === quizItems.length - 1 ? "結果を見る" : "次へ";
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < quizItems.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  progressFill.style.width = "100%";
  showScreen(resultScreen);

  resultScore.textContent = `${score} / ${quizItems.length} 問正解`;

  resultList.innerHTML = "";
  history.forEach((h, idx) => {
    const div = document.createElement("div");
    div.className = `result-item ${h.isCorrect ? "correct" : "wrong"}`;
    div.innerHTML = `
      <div class="r-question">問${idx + 1}（${h.typeLabel}）: ${h.prompt}</div>
      <div class="r-answer">
        あなたの答え: ${h.userAnswer} ${h.isCorrect ? "" : `／ 正解: ${h.correctAnswer}`}
        — ${h.word.kanji}（${h.word.yomi}）= ${h.word.meaning}
        【${h.word.source} STT ${h.word.stt}番より】
      </div>
    `;
    resultList.appendChild(div);
  });

  const roundMistakes = [...new Map(
    history.filter((h) => !h.isCorrect).map((h) => [h.word.stt, h.word])
  ).values()];

  reviewMistakesBtn.classList.toggle("hidden", roundMistakes.length === 0);
  reviewMistakesBtn.textContent = `今回間違えた単語をフラッシュカードで復習する（${roundMistakes.length}語）`;
  reviewMistakesBtn.onclick = () => startFlashcards(roundMistakes);

  refreshFlashcardEntry();
}

// ===== フラッシュカード =====

async function refreshFlashcardEntry() {
  const words = await getWrongWords();
  flashcardEntry.classList.toggle("hidden", words.length === 0);
  flashcardEntryText.textContent = `📇 苦手単語: ${words.length}語が復習待ちです`;
}

flashcardEntryBtn.addEventListener("click", async () => {
  const words = await getWrongWords();
  startFlashcards(words);
});

function startFlashcards(words) {
  if (words.length === 0) return;
  fcQueue = shuffle(words);
  fcTotal = fcQueue.length;
  fcKnownCount = 0;

  fcComplete.classList.add("hidden");
  fcCard.classList.remove("hidden");
  fcActions.classList.remove("hidden");
  fcExitBtn.classList.remove("hidden");

  showScreen(flashcardScreen);
  renderFlashcard();
}

function renderFlashcard() {
  if (fcQueue.length === 0) {
    fcCard.classList.add("hidden");
    fcActions.classList.add("hidden");
    fcProgress.textContent = "";
    fcComplete.classList.remove("hidden");
    fcCompleteText.textContent = `お疲れさまでした！ ${fcKnownCount} / ${fcTotal} 語を覚えました。`;
    refreshFlashcardEntry();
    return;
  }

  fcFlipped = false;
  fcCard.classList.remove("flipped");
  fcActions.classList.add("hidden");

  const w = fcQueue[0];
  fcProgress.textContent = `覚えた ${fcKnownCount} / ${fcTotal}　（残り ${fcQueue.length} 枚）`;
  fcKanji.textContent = w.kanji;
  fcYomi.textContent = w.yomi;
  fcMeaning.textContent = w.meaning;
  fcSource.textContent = `【${w.source} STT ${w.stt}番より】`;
}

fcCard.addEventListener("click", () => {
  if (fcQueue.length === 0) return;
  fcFlipped = !fcFlipped;
  fcCard.classList.toggle("flipped", fcFlipped);
  if (fcFlipped) {
    fcActions.classList.remove("hidden");
  }
});

fcAgainBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const w = fcQueue.shift();
  fcQueue.push(w);
  renderFlashcard();
});

fcKnownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const w = fcQueue.shift();
  fcKnownCount++;
  removeWrongStt(w.stt);
  renderFlashcard();
});

fcExitBtn.addEventListener("click", () => {
  showScreen(startScreen);
  refreshFlashcardEntry();
});

startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", () => {
  showScreen(startScreen);
  refreshFlashcardEntry();
});

// ===== 初期化 =====

async function init() {
  await loadManifest();
  buildRangeDefs();

  renderRangeOptions();
  setupOptionGroup(countOptions, "count", (v) => (selectedCount = v), "5");
  setupOptionGroup(typeOptions, "type", (v) => (selectedType = v), "mixed");
  updateAllCountLabel();

  loadingText.classList.add("hidden");
  rangeGroup.classList.remove("hidden");
  countGroup.classList.remove("hidden");
  typeGroup.classList.remove("hidden");
  startBtn.classList.remove("hidden");

  refreshFlashcardEntry();
}

init();
