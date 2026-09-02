import csv
import json
import glob
import os

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

files = sorted(
    glob.glob(os.path.join(DATA_DIR, "Bai*.csv")),
    key=lambda p: int(''.join(filter(str.isdigit, os.path.basename(p))))
)

chapters = []
for path in files:
    name = os.path.basename(path)
    num = int(''.join(filter(str.isdigit, name)))
    with open(path, encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        next(reader)
        rows = [r for r in reader if r]
    stts = [int(r[0]) for r in rows]
    chapters.append({
        "num": num,
        "file": name,
        "count": len(rows),
        "startStt": stts[0],
        "endStt": stts[-1],
    })

# group into decade-ish batches for the UI range picker
groups = []
current = []
for ch in chapters:
    current.append(ch["num"])
    if len(current) == 10:
        groups.append(current)
        current = []
if current:
    groups.append(current)

manifest = {
    "chapters": chapters,
    "groups": [{"chapters": g, "label": f"Bai{g[0]}〜{g[-1]}"} for g in groups],
    "totalWords": sum(c["count"] for c in chapters),
    "missing": [59],
    "note": "Bai58はBai57と完全に重複していたため除外。STT 7542-7675相当の範囲はGoogle Drive上に見つからず欠落。",
}

with open(os.path.join(DATA_DIR, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"{len(chapters)} chapters, {manifest['totalWords']} words total")
for g in manifest["groups"]:
    print(g["label"], g["chapters"])
