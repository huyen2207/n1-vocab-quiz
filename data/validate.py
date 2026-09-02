import csv
import os
import glob

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

files = sorted(glob.glob(os.path.join(DATA_DIR, "Bai*.csv")), key=lambda p: int(''.join(filter(str.isdigit, os.path.basename(p)))))

chapters = []
for path in files:
    name = os.path.basename(path)
    num = int(''.join(filter(str.isdigit, name)))
    with open(path, encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = [r for r in reader if r]

    header_trimmed = [h for h in header if h != ""]
    if header_trimmed != ["STT", "漢字", "音（漢越）", "読み方", "意味"]:
        print(f"BAD HEADER in {name}: {header}")

    # tolerate a trailing-empty-column export quirk from the source sheet
    rows = [r[:5] if len(r) > 5 and all(c == "" for c in r[5:]) else r for r in rows]
    bad_rows = [r for r in rows if len(r) != 5]
    if bad_rows:
        print(f"BAD ROW SHAPE in {name}: {len(bad_rows)} rows, e.g. {bad_rows[0]}")
        rows = [r for r in rows if len(r) == 5]
    stts = []
    for r in rows:
        try:
            stts.append(int(r[0]))
        except ValueError:
            print(f"NON-INTEGER STT in {name}: {r}")
    if stts != sorted(stts) or len(set(stts)) != len(stts):
        print(f"NON-SEQUENTIAL/DUPLICATE STT within {name}")
    gaps = [b - a for a, b in zip(stts, stts[1:]) if b - a != 1]
    if gaps:
        print(f"INTERNAL GAP in {name}: gaps={gaps}")
    chapters.append((num, name, stts[0] if stts else None, stts[-1] if stts else None, len(rows)))

print(f"\nTotal chapters found: {len(chapters)}")
total_rows = sum(c[4] for c in chapters)
print(f"Total data rows: {total_rows}")

print("\n--- Cross-file STT continuity ---")
prev_end = None
prev_name = None
for num, name, start, end, count in chapters:
    if prev_end is not None and start != prev_end + 1:
        print(f"GAP/OVERLAP between {prev_name} (end={prev_end}) and {name} (start={start}) -> diff={start - prev_end}")
    prev_end = end
    prev_name = name

print("\n--- Duplicate content check (by first+last STT match) ---")
seen_ranges = {}
for num, name, start, end, count in chapters:
    key = (start, end)
    if key in seen_ranges:
        print(f"DUPLICATE RANGE: {name} matches {seen_ranges[key]} (STT {start}-{end})")
    seen_ranges[key] = name

print("\nDone.")
