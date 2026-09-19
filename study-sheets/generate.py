# -*- coding: utf-8 -*-
from pathlib import Path
from playwright.sync_api import sync_playwright
from diagrams import (
    VECTOR, VT_GRAPH, CLIFF, PROJECTILE, DRONE, CIRCLE,
    FBD_BOX, INCLINE, CAR_INERTIA, WORK_ANGLE, ENERGY, SPRING, FX_GRAPH,
)

ROOT = Path(__file__).parent
OUT_HTML = ROOT / "index.html"
OUT_PDF = ROOT / "export" / "physics1-midterm-study-sheet.pdf"
OUT_PDF.parent.mkdir(parents=True, exist_ok=True)

# Read CSS
css = (ROOT / "styles.css").read_text(encoding="utf-8")
# Inline fonts for offline-ish; keep @import in CSS via link

def box(kind, label, body):
    return f'<div class="box {kind} keep"><div class="box-label">{label}</div>{body}</div>'

parts = []
parts.append(f'''<!DOCTYPE html>
<html lang="th"><head>
<meta charset="utf-8"/>
<title>สรุปฟิสิกส์ 1 Midterm</title>
<link rel="stylesheet" href="styles.css"/>
</head><body><div class="sheet">
''')

parts.append('''
<section class="cover">
  <div class="cover-deco"></div>
  <h1>สรุปฟิสิกส์ 1</h1>
  <p class="subtitle">ชีทสอบ Midterm · น่ารัก อ่านง่าย พร้อมเฉลยทีละขั้น</p>
  <ul class="cover-list">
    <li>① การเคลื่อนที่แนวตรง (1D + เวกเตอร์)</li>
    <li>② โปรเจคไทล์ + การเคลื่อนที่วงกลม</li>
    <li>③ กฎของนิวตัน</li>
    <li>④ งาน · พลังงาน · กำลัง</li>
  </ul>
  <p class="cover-note">สรุปจากไฟล์เลคเชอร์ Warisara Boonsiri · จัดใหม่เป็นชีทสอบ</p>
</section>

<section class="toc keep">
  <h1 class="chapter-title">สารบัญ</h1>
  <ol>
    <li>บทที่ 1 — การเคลื่อนที่แนวตรง</li>
    <li>บทที่ 2 — โปรเจคไทล์ + วงกลม</li>
    <li>บทที่ 3 — กฎของนิวตัน</li>
    <li>บทที่ 4 — งาน–พลังงาน</li>
    <li>เทคนิคทำข้อสอบ</li>
    <li>แบบฝึกทบทวน + เฉลย</li>
    <li>แผ่นสูตรด่วนท้ายเล่ม</li>
  </ol>
  <div class="box tip"><div class="box-label">เคล็ดสอบ</div>
  เขียนหน่วยทุกขั้น · แยกแกน x–y · กำหนดทิศบวกก่อนลงสมการ · ตรวจว่าคำตอบสมเหตุสมผล
  </div>
</section>
''')

# Chapter 1
parts.append('''
<section class="chapter">
  <h1 class="chapter-title">① การเคลื่อนที่แนวตรง</h1>
  <h2>ปริมาณทางฟิสิกส์</h2>
  <p>แบ่งเป็น <span class="hl blue">หน่วยฐาน</span> และ <span class="hl mint">หน่วยอนุพัทธ์</span></p>
  <table class="keep">
    <tr><th>หน่วยฐาน</th><th>สัญลักษณ์</th><th class="left">ใช้กับ</th></tr>
    <tr><td>เมตร</td><td>m</td><td class="left">ระยะทาง, การกระจัด, ความสูง</td></tr>
    <tr><td>กิโลกรัม</td><td>kg</td><td class="left">มวล</td></tr>
    <tr><td>วินาที</td><td>s</td><td class="left">เวลา, คาบ T</td></tr>
    <tr><td>แอมแปร์</td><td>A</td><td class="left">กระแสไฟฟ้า</td></tr>
    <tr><td>เคลวิน</td><td>K</td><td class="left">อุณหภูมิ</td></tr>
    <tr><td>โมล</td><td>mol</td><td class="left">ปริมาณสาร</td></tr>
    <tr><td>แคนเดลา</td><td>cd</td><td class="left">ความเข้มแสง</td></tr>
  </table>
  <div class="box tip keep"><div class="box-label">แปลงหน่วย</div>
  1 km/h = 1/3.6 m/s · 72 km/h = 20 m/s · g ≈ 9.8 m/s²
  </div>

  <h2>สเกลาร์ vs เวกเตอร์</h2>
  <div class="two-col keep">
    <div class="box"><strong class="hl lemon">สเกลาร์</strong> — แค่ขนาด<br/>ระยะทาง, เวลา, มวล, งาน, พลังงาน</div>
    <div class="box"><strong class="hl pink">เวกเตอร์</strong> — ขนาด+ทิศ<br/>การกระจัด, ความเร็ว, ความเร่ง, แรง</div>
  </div>
''' + VECTOR + '''

  <h2>หาเวกเตอร์ลัพธ์</h2>
  <ul>
    <li>F<sub>x</sub> = F cos θ, F<sub>y</sub> = F sin θ</li>
    <li>|R| = √(R<sub>x</sub>² + R<sub>y</sub>²), tan θ = R<sub>y</sub>/R<sub>x</sub></li>
  </ul>
  <div class="box formula keep"><div class="box-label">Dot · Cross</div>
  A·B = |A||B| cos θ (สเกลาร์) | |A×B| = |A||B| sin θ (เวกเตอร์)
  </div>

  <h2>จลศาสตร์ 1 มิติ</h2>
  <table class="keep">
    <tr><th>ปริมาณ</th><th>นิยาม</th></tr>
    <tr><td>ตำแหน่ง x(t)</td><td>ที่อยู่เทียบจุดอ้างอิง</td></tr>
    <tr><td>ความเร็ว v</td><td>v = dx/dt</td></tr>
    <tr><td>ความเร่ง a</td><td>a = dv/dt</td></tr>
  </table>
  <div class="box formula keep"><div class="box-label">สูตร a คงที่</div>
    <div class="formula-line">v = u + at</div>
    <div class="formula-line">s = ut + ½at²</div>
    <div class="formula-line">v² = u² + 2as</div>
    <div class="formula-line">s = (u+v)/2 · t</div>
  </div>
  <div class="box tip keep"><div class="box-label">จำไว้</div>
  ความเร็วคงที่ → a=0 → s=vt · ตกอิสระ → a=±g กำหนดทิศบวกก่อน
  </div>
''' + VT_GRAPH + '''

  <h2>ตัวอย่างพร้อมเฉลย</h2>
  <div class="box example keep"><div class="box-label">ตัวอย่าง · v = 5t²</div>
  หา a เฉลี่ย t=2 ถึง 4, a ที่ t=2 และ 4, การกระจัด t=2 ถึง 4
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  <ol class="steps">
    <li>v(2)=20, v(4)=80 m/s → a<sub>avg</sub>=(80−20)/2 = <span class="hl mint">30 m/s²</span></li>
    <li>a=10t → a(2)=20, a(4)=40 m/s²</li>
    <li>s=∫₂⁴ 5t² dt = (5/3)(64−8) = <span class="hl mint">93.33 m</span></li>
  </ol></div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · รถออกตัว</div>
  จากหยุด a=2 m/s² ที่ t=5 ความเร็ว?
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  v=0+2·5 = <span class="hl mint">10 m/s</span>
  </div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · รถสองคันพบกัน</div>
  A คงที่ 50 km/h ผ่าน B ที่ 40 km/h เร่ง 20 km/h² อีกนานพบกัน?
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  <ol class="steps">
    <li>50t = 40t + ½(20)t²</li>
    <li>10t = 10t² → t = <span class="hl mint">1 ชม.</span></li>
  </ol></div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · เบรกก่อนสิ่งกีดขวาง</div>
  10 m/s ห่าง 35 m คิด 1 s ก่อนเบรก ต้อง a เท่าไรจึงหยุดพอดี?
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  <ol class="steps">
    <li>ช่วงคิด s=10 m เหลือเบรก 25 m</li>
    <li>0=100+2a(25) → a = <span class="hl mint">−2 m/s²</span></li>
  </ol></div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · ขว้างหินจากหน้าผา</div>
  u=10 m/s จากสูง 50 m ความเร็วกระทบน้ำ?
  </div>
''' + CLIFF + '''
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  v²=100+2(9.8)(50)=1080 → v≈<span class="hl mint">32.86 m/s</span>
  </div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · รถไฟสองขบวน</div>
  10 และ 20 m/s เข้าหากันห่าง 325 m เบรกหยุดพร้อมกันห่างเหลือ 25 m หา t
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  ระยะรวม 300 m · s=ut/2 → 5t+10t=300 → t=<span class="hl mint">20 s</span>
  </div>

  <h2>ระยะทาง vs การกระจัด</h2>
  <div class="two-col keep">
    <div class="box"><strong>ระยะทาง</strong> เส้นทางจริง (สเกลาร์)</div>
    <div class="box"><strong>การกระจัด</strong> จุดเริ่ม→จบ (เวกเตอร์)</div>
  </div>
  <div class="box tip keep"><div class="box-label">กราฟ</div>
  ความชัน x–t = v · ความชัน v–t = a · พื้นที่ใต้ v–t = การกระจัด
  </div>
</section>
''')

# Chapter 2
parts.append('''
<section class="chapter">
  <h1 class="chapter-title">② โปรเจคไทล์ + วงกลม</h1>
  <h2>โปรเจคไทล์</h2>
  <div class="box formula keep">ตกอิสระแนวดิ่ง <span class="arrow">+</span> แนวราบความเร็วคงที่ (ไม่คิดแรงต้าน)</div>
  <ul>
    <li>a<sub>x</sub>=0, a<sub>y</sub>=−g · x กับ y อิสระ ใช้ t ร่วมกัน</li>
    <li>จุดสูงสุด v<sub>y</sub>=0 แต่ยังมี v<sub>x</sub></li>
  </ul>
  <div class="box formula keep"><div class="box-label">องค์ประกอบ</div>
  u<sub>x</sub>=u cos θ · u<sub>y</sub>=u sin θ
  </div>
  <table class="keep">
    <tr><th>แนวราบ</th><th>แนวดิ่ง</th></tr>
    <tr><td>v<sub>x</sub>=u<sub>x</sub>, x=u<sub>x</sub>t</td><td>v<sub>y</sub>=u<sub>y</sub>−gt, y=u<sub>y</sub>t−½gt²</td></tr>
  </table>
  <div class="box tip keep"><div class="box-label">สูตรลัด</div>
  T=2u sinθ/g · R=u² sin2θ/g · H=(u sinθ)²/(2g)
  </div>
''' + PROJECTILE + '''

  <div class="box example keep"><div class="box-label">ตัวอย่าง · โดรนปล่อยพัสดุ</div>
  72 km/h สูง 80 m (ก) ระยะปล่อย (ข) ความเร็วกระทบ (ค) มี a<sub>x</sub>=−0.5
  </div>
''' + DRONE + '''
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  <ol class="steps">
    <li>72 km/h=20 m/s · จาก 80=½gt² → t≈4 s</li>
    <li>(ก) s<sub>x</sub>=20·4=<span class="hl mint">80 m</span></li>
    <li>(ข) v<sub>y</sub>≈39.2 → |v|≈<span class="hl mint">44 m/s</span> มุม≈63°</li>
    <li>(ค) s<sub>x</sub>=80−4=<span class="hl mint">76 m</span> เปลี่ยน 4 m</li>
  </ol></div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · เตะฟุตบอล</div>
  22 m/s มุม 40° หา H, T, R
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  <ol class="steps">
    <li>u<sub>y</sub>≈14.14 → H≈<span class="hl mint">10.2 m</span></li>
    <li>T≈<span class="hl mint">2.89 s</span> · R≈<span class="hl mint">48.7 m</span></li>
  </ol></div>

  <h2>การเคลื่อนที่วงกลมสม่ำเสมอ</h2>
  <div class="box formula keep"><div class="box-label">สูตรวงกลม</div>
  T=1/f · ω=2πf · v=ωr · a<sub>c</sub>=v²/r=ω²r · F<sub>c</sub>=mv²/r
  </div>
  <div class="box tip keep"><div class="box-label">rpm</div>
  n rpm → f=n/60 · ω=2πn/60
  </div>
''' + CIRCLE + '''

  <div class="box example keep"><div class="box-label">ตัวอย่าง · ข้อเหวี่ยง 2400 rpm</div>
  เส้นผ่านศูนย์กลาง 4 cm (r=0.02 m)
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  <ol class="steps">
    <li>f=40 Hz, T=0.025 s</li>
    <li>ω≈251.3 rad/s · v≈5.03 m/s · a<sub>c</sub>≈1265 m/s²</li>
  </ol></div>

  <div class="box tip keep"><div class="box-label">วงกลมแนวดิ่ง</div>
  จุดต่ำ: T−mg=mv²/r · จุดสูง: T+mg=mv²/r · หลุดเมื่อ T=0 → v²≥gr
  </div>
  <div class="box warn keep"><div class="box-label">กับดัก</div>
  จุดสูงสุดโปรเจคไทล์ ความเร็วไม่เป็นศูนย์ — เหลือ v<sub>x</sub>
  </div>
</section>
''')

# Chapter 3
parts.append('''
<section class="chapter">
  <h1 class="chapter-title">③ กฎของนิวตัน</h1>
  <div class="box keep"><strong class="hl lav">ข้อ 1 ความเฉื่อย</strong><br/>
  นิ่งหรือเร็วคงที่ถ้า ΣF=0 · รถเบรก คนพุ่งหน้า = เฉื่อย ไม่ใช่แรงดันไปหน้า
  </div>
  <div class="box keep"><strong class="hl blue">ข้อ 2 ΣF=ma</strong><br/>
  แรงมาก→เร่งมาก · มวลมาก→เร่งยาก
  </div>
  <div class="box keep"><strong class="hl mint">ข้อ 3 Action=Reaction</strong><br/>
  คู่แรงขนาดเท่า ทิศตรงข้าม <span class="hl pink">คนละวัตถุ</span>
  </div>
''' + CAR_INERTIA + '''

  <table class="keep">
    <tr><th>มวล m</th><th>น้ำหนัก W=mg</th></tr>
    <tr><td>คงที่ หน่วย kg</td><td>เปลี่ยนตาม g หน่วย N</td></tr>
  </table>

  <h2>FBD + เสียดทาน</h2>
  <ul>
    <li>N ตั้งฉากพื้น · T ตามเชือก · f สวนทางเคลื่อน · mg ลง</li>
    <li>f<sub>s,max</sub>=μ<sub>s</sub>N · f<sub>k</sub>=μ<sub>k</sub>N (μ<sub>k</sub>&lt;μ<sub>s</sub>)</li>
  </ul>
''' + FBD_BOX + '''
  <div class="box formula keep"><div class="box-label">พื้นเอียง</div>
  mg sinθ (ขนาน) · N=mg cosθ · mg sinθ − f = ma
  </div>
''' + INCLINE + '''

  <div class="box example keep"><div class="box-label">ตัวอย่าง · เสียดทาน</div>
  m=10 kg, μ<sub>s</sub>=0.4, μ<sub>k</sub>=0.3
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  f<sub>s,max</sub>=39.2 N · f<sub>k</sub>=29.4 N
  </div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · เบรกรถ 1500 kg</div>
  จาก 100 km/h หยุด · F=ma (a ลบ)
  </div>
  <div class="box answer keep"><div class="box-label">แนว</div>
  u=27.78 m/s · หา a จากโจทย์ · เช่น a≈−7 → F≈<span class="hl mint">−10,500 N</span>
  </div>

  <div class="box example keep"><div class="box-label">ตัวอย่าง · ลูกบอลเชือก 30°</div>
  m=0.5 kg L=1.5 m วงกลมราบ เชือกเอียง 30° กับแนวดิ่ง
  </div>
  <div class="box answer keep"><div class="box-label">แนว</div>
  <ol class="steps">
    <li>T cos30°=mg · T sin30°=mv²/r · r=L sin30°</li>
    <li>แก้ v จากสมการ · ถ้า T<sub>max</sub>=9.8 ใส่ T แล้วแก้ v ใหม่</li>
  </ol></div>

  <div class="box warn keep"><div class="box-label">สับสนบ่อย</div>
  mg กับ N ไม่ใช่คู่ action-reaction
  </div>

  <h2>ขั้นตอนทำโจทย์</h2>
  <ol class="steps keep">
    <li>วาดรูป + ทิศบวก</li>
    <li>FBD แยกวัตถุ</li>
    <li>แยกแกน · ΣF=ma</li>
    <li>ใส่ μ / เชือก · แก้สมการ</li>
  </ol>
</section>
''')

# Chapter 4
parts.append('''
<section class="chapter">
  <h1 class="chapter-title">④ งาน · พลังงาน</h1>
  <div class="box formula keep"><div class="box-label">งาน</div>
  W = F·s = Fs cos θ · หน่วย J · สเกลาร์
  </div>
  <ul>
    <li>θ=90° → W=0 · θ=180° → งานติดลบ</li>
    <li>แรงแปร: W=∫ F(x) dx = พื้นที่ใต้กราฟ F–x</li>
  </ul>
''' + WORK_ANGLE + FX_GRAPH + '''

  <div class="box example keep"><div class="box-label">ตัวอย่าง · F(x)=3x² จาก x=3 ถึง 5</div></div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  W=∫₃⁵ 3x² dx = [x³]₃⁵ = 125−27 = <span class="hl mint">98 J</span>
  </div>

  <div class="two-col keep">
    <div class="box"><strong class="hl blue">จลน์</strong> K=½mv²</div>
    <div class="box"><strong class="hl peach">ศักย์</strong> U<sub>g</sub>=mgh · U<sub>s</sub>=½kx²</div>
  </div>
  <div class="box formula keep"><div class="box-label">งาน–พลังงาน</div>
  W<sub>net</sub> = ΔK = K<sub>f</sub>−K<sub>i</sub>
  </div>
  <div class="box formula keep"><div class="box-label">อนุรักษ์พลังงานกล</div>
  K<sub>i</sub>+U<sub>i</sub> = K<sub>f</sub>+U<sub>f</sub> (ไม่มีเสียดทาน)<br/>
  มีเสียดทาน: E<sub>i</sub> + W<sub>nc</sub> = E<sub>f</sub> · W<sub>nc</sub>=−f·s
  </div>
  <div class="box formula keep"><div class="box-label">กำลัง</div>
  P = W/t = F·v · หน่วยวัตต์ (W)
  </div>
''' + ENERGY + SPRING + '''

  <div class="box example keep"><div class="box-label">ตัวอย่าง · อนุรักษ์ E</div>
  สปริง/สูง → หา v หรือ h
  </div>
  <div class="box answer keep"><div class="box-label">โครง</div>
  <ol class="steps">
    <li>เลือก h=0</li>
    <li>เขียน ΣE ต้น = ΣE ปลาย</li>
    <li>ใส่ ½kx² / mgh / ½mv²</li>
    <li>แก้ตัวแปร (ตัวอย่างในเลคเชอร์ v≈5.67 m/s, h≈1.64 m)</li>
  </ol></div>

  <table class="keep">
    <tr><th>แนวคิด</th><th>ใช้เมื่อ</th><th>สูตร</th></tr>
    <tr><td>งานตรง</td><td>รู้ F,s,θ</td><td>Fs cosθ</td></tr>
    <tr><td>อินทิกรัล</td><td>F(x)</td><td>∫F dx</td></tr>
    <tr><td>งาน–พลังงาน</td><td>หา v จากแรง</td><td>W<sub>net</sub>=ΔK</td></tr>
    <tr><td>อนุรักษ์ E</td><td>ไม่มี f</td><td>K+U คงที่</td></tr>
  </table>
</section>
''')

# Exam tips + practice + quick
parts.append('''
<section class="chapter">
  <h1 class="chapter-title">📝 เทคนิคทำข้อสอบ</h1>
  <ol>
    <li>กวาดตาทั้งฉบับ — เก็บข้อสั้นก่อน</li>
    <li>เขียนข้อมูล → สูตร → แทนค่า → หน่วย</li>
    <li>ข้อนิวตันนึก FBD ก่อนเลือก</li>
    <li>ย้อนตรวจเครื่องหมายและหน่วย</li>
  </ol>
  <table class="keep">
    <tr><th>จาก</th><th>เป็น</th><th>วิธี</th></tr>
    <tr><td>km/h</td><td>m/s</td><td>÷ 3.6</td></tr>
    <tr><td>rpm</td><td>rad/s</td><td>× 2π/60</td></tr>
  </table>
  <div class="box formula keep">
  v=u+at · s=ut+½at² · v²=u²+2as<br/>
  R=u²sin2θ/g · ΣF=ma · f=μN · W=Fscosθ · K=½mv² · U=mgh
  </div>
</section>

<section class="chapter">
  <h1 class="chapter-title">✏️ แบบฝึกทบทวน + เฉลย</h1>

  <div class="box example keep"><div class="box-label">P1</div>
  จากหยุด a=3 นาน 4 s แล้วคงที่อีก 6 s หา v และ s รวม
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  v=12 m/s · s=24+72=<span class="hl mint">96 m</span>
  </div>

  <div class="box example keep"><div class="box-label">P2</div>
  v=2t+3 หา s จาก t=0 ถึง 5 และ a
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  s=40 m · a=2 m/s²
  </div>

  <div class="box example keep"><div class="box-label">P3</div>
  โยนขึ้น 20 m/s g=10 หา t_up, H, T
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  2 s · 20 m · 4 s
  </div>

  <div class="box example keep"><div class="box-label">P4</div>
  ยิง 30 m/s มุม 30° g=10 หา H,T,R
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  H=11.25 m · T=3 s · R≈77.9 m
  </div>

  <div class="box example keep"><div class="box-label">P5</div>
  ปล่อยจากเครื่องบินสูง 500 m ความเร็ว 100 m/s ระยะ x?
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  t≈10.1 s · x≈1010 m
  </div>

  <div class="box example keep"><div class="box-label">P6</div>
  m=2 kg r=0.5 m v=4 หา T
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  T=mv²/r=<span class="hl mint">64 N</span>
  </div>

  <div class="box example keep"><div class="box-label">P7</div>
  กล่อง 5 kg ดึง 20 N μ<sub>k</sub>=0.2 g=10 หา a
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  f=10 · a=<span class="hl mint">2 m/s²</span>
  </div>

  <div class="box example keep"><div class="box-label">P8</div>
  พื้นเอียง 30° ไม่มี f g=10 หา a
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  a=g sin30°=<span class="hl mint">5 m/s²</span>
  </div>

  <div class="box example keep"><div class="box-label">P9</div>
  ลิฟต์เร่งขึ้น 2 m/s² คน 60 kg g=10 ตาชั่ง?
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  N=m(g+a)=<span class="hl mint">720 N</span>
  </div>

  <div class="box example keep"><div class="box-label">P10</div>
  แรง 50 N ระยะ 10 m มุม 60° หางาน
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  W=250 J
  </div>

  <div class="box example keep"><div class="box-label">P11</div>
  m=2 v=6 มีงานต้าน −20 J หา v ใหม่
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  K_i=36 → K_f=16 → v=<span class="hl mint">4 m/s</span>
  </div>

  <div class="box example keep"><div class="box-label">P12</div>
  ปล่อยจากสูง 5 m g=10 หา v ที่พื้น
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  v=√(2gh)=<span class="hl mint">10 m/s</span>
  </div>

  <div class="box example keep"><div class="box-label">P13</div>
  สปริง k=200 อัด 0.1 m มวล 0.5 kg หา v
  </div>
  <div class="box answer keep"><div class="box-label">เฉลย</div>
  v=x√(k/m)=<span class="hl mint">2 m/s</span>
  </div>
</section>

<section class="chapter">
  <h1 class="chapter-title">🔗 เชื่อม 4 บท</h1>
  <div class="box keep">
  <strong>1D</strong> เคลื่อนยังไง · <strong>2D</strong> แยกแกนใช้ 1D ·
  <strong>นิวตัน</strong> ทำไมเร่ง · <strong>พลังงาน</strong> ทางลัดหา v/h
  </div>
  <table class="keep">
    <tr><th>โจทย์</th><th>ใช้บท</th></tr>
    <tr><td>รถเร่ง/เบรกตรง</td><td>1</td></tr>
    <tr><td>โยนเฉียง</td><td>2</td></tr>
    <tr><td>ดึงกล่องมี μ</td><td>3</td></tr>
    <tr><td>สูง→เร็ว ไม่สนเวลา</td><td>4</td></tr>
    <tr><td>วงกลม ความตึง</td><td>2+3</td></tr>
  </table>
  <h2>คำศัพท์</h2>
  <table class="keep">
    <tr><th>อังกฤษ</th><th>ไทย</th></tr>
    <tr><td>Displacement</td><td>การกระจัด</td></tr>
    <tr><td>Projectile</td><td>โปรเจคไทล์</td></tr>
    <tr><td>Centripetal</td><td>เข้าสู่ศูนย์กลาง</td></tr>
    <tr><td>Inertia</td><td>ความเฉื่อย</td></tr>
    <tr><td>Friction</td><td>แรงเสียดทาน</td></tr>
    <tr><td>Kinetic / Potential</td><td>จลน์ / ศักย์</td></tr>
  </table>
</section>

<section class="chapter quick-sheet">
  <h1 class="chapter-title">⚡ แผ่นสูตรด่วน</h1>
  <div class="box formula keep">v=u+at | s=ut+½at² | v²=u²+2as</div>
  <div class="box formula keep">u<sub>x</sub>=u cosθ | H=(usinθ)²/(2g) | T=2usinθ/g | R=u²sin2θ/g</div>
  <div class="box formula keep">ω=2π/T | v=ωr | a<sub>c</sub>=v²/r | F<sub>c</sub>=mv²/r</div>
  <div class="box formula keep">ΣF=ma | f=μN | mg sinθ | N=mg cosθ</div>
  <div class="box formula keep">W=Fs cosθ | K=½mv² | U=mgh | ½kx² | K+U คงที่</div>
  <p class="footer-note">ชีทสรุป Midterm ฟิสิกส์ 1 · สไตล์โน้ตลายมือ</p>
</section>
</div></body></html>
''')

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
        margin={'top':'12mm','bottom':'12mm','left':'12mm','right':'12mm'},
    )
    browser.close()
print('PDF', OUT_PDF, OUT_PDF.stat().st_size)
