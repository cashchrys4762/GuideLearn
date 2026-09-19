# -*- coding: utf-8 -*-
"""Generate complete illustrated Physics 1 midterm study sheet."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from chapters_complete import ch1, ch2, ch3, ch4, extras

ROOT = Path(__file__).parent
OUT_HTML = ROOT / "index.html"
OUT_PDF = ROOT / "export" / "physics1-midterm-study-sheet.pdf"
OUT_PDF.parent.mkdir(parents=True, exist_ok=True)

parts = []
parts.append('''<!DOCTYPE html>
<html lang="th"><head>
<meta charset="utf-8"/>
<title>สรุปฟิสิกส์ 1 Midterm — ครบถ้วนพร้อมภาพ</title>
<link rel="stylesheet" href="styles.css"/>
</head><body><div class="sheet">
''')

parts.append('''
<section class="cover">
  <div class="cover-deco"></div>
  <h1>สรุปฟิสิกส์ 1</h1>
  <p class="subtitle">ชีทสอบ Midterm · ครบถ้วน น่ารัก อ่านง่าย · มีภาพ + เฉลยทีละขั้น</p>
  <ul class="cover-list">
    <li>① การเคลื่อนที่แนวตรง (1D + เวกเตอร์)</li>
    <li>② โปรเจคไทล์ + การเคลื่อนที่วงกลม</li>
    <li>③ กฎของนิวตัน</li>
    <li>④ งาน · พลังงาน · กำลัง</li>
  </ul>
  <p class="cover-note">สรุปละเอียดจากไฟล์เลคเชอร์ Warisara Boonsiri · จัดใหม่เป็นชีทสอบ</p>
</section>

<section class="toc keep">
  <h1 class="chapter-title">สารบัญ</h1>
  <ol>
    <li>บทที่ 1 — การเคลื่อนที่แนวตรง (ทฤษฎี + ตัวอย่าง 10 ข้อ)</li>
    <li>บทที่ 2 — โปรเจคไทล์ + วงกลม</li>
    <li>บทที่ 3 — กฎของนิวตัน + FBD + เสียดทาน</li>
    <li>บทที่ 4 — งาน–พลังงาน</li>
    <li>เทคนิคทำข้อสอบ + แนวข้อ</li>
    <li>แบบฝึกทบทวน P1–P13</li>
    <li>เชื่อม 4 บท + คำศัพท์ + แผ่นสูตรด่วน</li>
  </ol>
  <div class="box tip"><div class="box-label">เคล็ดสอบ</div>
  เขียนหน่วยทุกขั้น · แยกแกน x–y · กำหนดทิศบวกก่อนลงสมการ · ตรวจว่าคำตอบสมเหตุสมผล
  </div>
</section>
''')

parts.append(ch1())
parts.append(ch2())
parts.append(ch3())
parts.append(ch4())
parts.append(extras())
parts.append('</div></body></html>')

OUT_HTML.write_text(''.join(parts), encoding='utf-8')
print('HTML', OUT_HTML, OUT_HTML.stat().st_size)

url = OUT_HTML.resolve().as_uri()
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(url, wait_until='networkidle')
    page.wait_for_timeout(3000)
    page.pdf(
        path=str(OUT_PDF),
        format='A4',
        print_background=True,
        margin={'top': '12mm', 'bottom': '12mm', 'left': '12mm', 'right': '12mm'},
    )
    browser.close()
print('PDF', OUT_PDF, OUT_PDF.stat().st_size)
