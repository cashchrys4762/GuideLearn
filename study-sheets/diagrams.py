# -*- coding: utf-8 -*-
"""Cute SVG diagrams for physics study sheet."""

def fig(svg: str, caption: str = "") -> str:
    cap = f'<div class="fig-cap">{caption}</div>' if caption else ""
    return f'<figure class="fig keep">{svg}{cap}</figure>'


# --- Chapter 1 ---
VECTOR = fig(
    """
<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#3d5a80"/>
    </marker>
    <marker id="ahp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#e07a9a"/>
    </marker>
    <marker id="ahb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#5b8def"/>
    </marker>
  </defs>
  <!-- axes -->
  <line x1="40" y1="150" x2="300" y2="150" stroke="#aab" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="40" y1="150" x2="40" y2="20" stroke="#aab" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="290" y="168" fill="#5a5a68" font-size="12">x</text>
  <text x="20" y="28" fill="#5a5a68" font-size="12">y</text>
  <!-- vector F -->
  <line x1="40" y1="150" x2="220" y2="50" stroke="#e07a9a" stroke-width="3" marker-end="url(#ahp)"/>
  <text x="200" y="42" fill="#e07a9a" font-size="14" font-weight="700">F</text>
  <!-- Fx Fy -->
  <line x1="40" y1="150" x2="220" y2="150" stroke="#5b8def" stroke-width="2.5" marker-end="url(#ahb)" stroke-dasharray="4 3"/>
  <line x1="220" y1="150" x2="220" y2="50" stroke="#6ec9a8" stroke-width="2.5" marker-end="url(#ah)" stroke-dasharray="4 3"/>
  <text x="120" y="168" fill="#5b8def" font-size="13">Fₓ = F cosθ</text>
  <text x="230" y="100" fill="#2a7a5a" font-size="13">Fᵧ = F sinθ</text>
  <!-- angle arc -->
  <path d="M80,150 A40,40 0 0,0 72,122" fill="none" stroke="#c9b6f2" stroke-width="2"/>
  <text x="88" y="138" fill="#7a5a9a" font-size="13">θ</text>
</svg>
""",
    "แยกเวกเตอร์เป็นองค์ประกอบ x–y",
)

VT_GRAPH = fig(
    """
<svg viewBox="0 0 340 190" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="ax" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#3d5a80"/>
    </marker>
  </defs>
  <line x1="40" y1="160" x2="320" y2="160" stroke="#889" stroke-width="1.5" marker-end="url(#ax)"/>
  <line x1="40" y1="160" x2="40" y2="20" stroke="#889" stroke-width="1.5" marker-end="url(#ax)"/>
  <text x="310" y="178" font-size="12" fill="#555">t</text>
  <text x="18" y="30" font-size="12" fill="#555">v</text>
  <!-- accelerating then constant -->
  <polyline points="40,140 140,50 260,50" fill="none" stroke="#e07a9a" stroke-width="3" stroke-linejoin="round"/>
  <rect x="40" y="50" width="100" height="110" fill="rgba(158,201,245,0.25)"/>
  <rect x="140" y="50" width="120" height="110" fill="rgba(168,230,207,0.25)"/>
  <text x="55" y="120" font-size="11" fill="#3d5a80">พื้นที่ = s</text>
  <text x="70" y="45" font-size="11" fill="#e07a9a">เร่ง (ชัน)</text>
  <text x="175" y="40" font-size="11" fill="#2a7a5a">คงที่ (ราบ)</text>
</svg>
""",
    "กราฟ v–t · ความชัน = a · พื้นที่ใต้กราฟ = การกระจัด",
)

CLIFF = fig(
    """
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" class="diag">
  <rect x="20" y="40" width="100" height="140" fill="#d4c4a8" stroke="#a89070" stroke-width="2" rx="4"/>
  <text x="40" y="110" font-size="12" fill="#6a5a40">หน้าผา</text>
  <text x="45" y="128" font-size="11" fill="#6a5a40">50 m</text>
  <!-- rock path -->
  <path d="M120,55 Q200,80 280,180" fill="none" stroke="#e07a9a" stroke-width="2.5" stroke-dasharray="5 4"/>
  <circle cx="120" cy="55" r="10" fill="#c9b6f2" stroke="#5c4d7a" stroke-width="2"/>
  <text x="108" y="40" font-size="12" fill="#5c4d7a">u=10</text>
  <!-- water -->
  <rect x="120" y="175" width="180" height="18" fill="#9ec9f5" rx="4"/>
  <text x="180" y="188" font-size="11" fill="#2a4a6a">น้ำ</text>
  <line x1="125" y1="55" x2="125" y2="175" stroke="#a8e6cf" stroke-width="1.5" stroke-dasharray="3 2"/>
  <text x="130" y="120" font-size="11" fill="#2a7a5a">s=50m</text>
</svg>
""",
    "ตัวอย่างขว้างหินจากหน้าผา · ใช้ v² = u² + 2as",
)

# --- Chapter 2 ---
PROJECTILE = fig(
    """
<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#e07a9a"/>
    </marker>
    <marker id="ab" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#5b8def"/>
    </marker>
  </defs>
  <line x1="30" y1="170" x2="340" y2="170" stroke="#889" stroke-width="2"/>
  <!-- parabola -->
  <path d="M40,170 Q160,20 320,170" fill="none" stroke="#c9b6f2" stroke-width="3"/>
  <!-- start -->
  <circle cx="40" cy="170" r="7" fill="#ffd6a5" stroke="#c97b7b" stroke-width="2"/>
  <line x1="40" y1="170" x2="100" y2="110" stroke="#e07a9a" stroke-width="2.5" marker-end="url(#ar)"/>
  <text x="95" y="105" font-size="12" fill="#e07a9a">u</text>
  <path d="M70,170 A30,30 0 0,0 58,145" fill="none" stroke="#f7b6c8" stroke-width="2"/>
  <text x="72" y="158" font-size="12" fill="#a05070">θ</text>
  <!-- top -->
  <circle cx="180" cy="55" r="6" fill="#a8e6cf" stroke="#2a7a5a" stroke-width="2"/>
  <text x="155" y="42" font-size="12" fill="#2a7a5a">H · vᵧ=0</text>
  <line x1="180" y1="55" x2="210" y2="55" stroke="#5b8def" stroke-width="2" marker-end="url(#ab)"/>
  <text x="215" y="50" font-size="11" fill="#5b8def">vₓ</text>
  <!-- R -->
  <line x1="40" y1="185" x2="320" y2="185" stroke="#5b8def" stroke-width="1.5"/>
  <text x="160" y="198" font-size="13" fill="#3d5a80">R = ระยะไกลสุด</text>
</svg>
""",
    "วิถีโปรเจคไทล์ · จุดสูงสุดยังมี vₓ · ใช้ t ร่วมกันระหว่างแกน",
)

DRONE = fig(
    """
<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" class="diag">
  <rect x="20" y="185" width="300" height="10" fill="#d4c4a8" rx="2"/>
  <!-- drone -->
  <ellipse cx="80" cy="40" rx="28" ry="10" fill="#c9b6f2" stroke="#5c4d7a" stroke-width="2"/>
  <line x1="52" y1="40" x2="40" y2="28" stroke="#5c4d7a" stroke-width="2"/>
  <line x1="108" y1="40" x2="120" y2="28" stroke="#5c4d7a" stroke-width="2"/>
  <text x="55" y="25" font-size="11" fill="#5c4d7a">โดรน 20 m/s</text>
  <!-- package drop -->
  <path d="M80,55 Q140,100 200,185" fill="none" stroke="#e07a9a" stroke-width="2.5" stroke-dasharray="5 3"/>
  <rect x="72" y="50" width="16" height="14" rx="2" fill="#ffd6a5" stroke="#c97b7b" stroke-width="1.5"/>
  <!-- height -->
  <line x1="40" y1="40" x2="40" y2="185" stroke="#6ec9a8" stroke-width="1.5" stroke-dasharray="3 2"/>
  <text x="8" y="120" font-size="12" fill="#2a7a5a">80m</text>
  <!-- range -->
  <line x1="80" y1="175" x2="200" y2="175" stroke="#5b8def" stroke-width="2"/>
  <text x="110" y="168" font-size="12" fill="#3d5a80">sₓ ≈ 80 m</text>
  <circle cx="200" cy="185" r="8" fill="#f7b6c8" stroke="#a05070" stroke-width="2"/>
  <text x="210" y="190" font-size="11" fill="#a05070">เป้า</text>
</svg>
""",
    "โดรนปล่อยพัสดุ · แกน y หา t แล้วใช้หา sₓ",
)

CIRCLE = fig(
    """
<svg viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="ac" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#e07a9a"/>
    </marker>
    <marker id="av" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#5b8def"/>
    </marker>
  </defs>
  <circle cx="140" cy="110" r="70" fill="none" stroke="#c9b6f2" stroke-width="3"/>
  <circle cx="140" cy="110" r="4" fill="#5c4d7a"/>
  <text x="148" y="108" font-size="12" fill="#5c4d7a">O</text>
  <!-- mass at right -->
  <circle cx="210" cy="110" r="12" fill="#ffd6a5" stroke="#c97b7b" stroke-width="2"/>
  <!-- v tangent up -->
  <line x1="210" y1="110" x2="210" y2="55" stroke="#5b8def" stroke-width="2.5" marker-end="url(#av)"/>
  <text x="218" y="70" font-size="13" fill="#5b8def">v</text>
  <!-- ac toward center -->
  <line x1="210" y1="110" x2="160" y2="110" stroke="#e07a9a" stroke-width="2.5" marker-end="url(#ac)"/>
  <text x="165" y="100" font-size="13" fill="#e07a9a">a_c</text>
  <line x1="140" y1="110" x2="198" y2="110" stroke="#aab" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="155" y="128" font-size="12" fill="#666">r</text>
  <text x="60" y="200" font-size="12" fill="#555">a_c = v²/r เข้าศูนย์กลาง · v ตามสัมผัส</text>
</svg>
""",
    "วงกลมสม่ำเสมอ · ขนาด v คงที่ แต่ทิศเปลี่ยน → มี a_c",
)

# --- Chapter 3 ---
FBD_BOX = fig(
    """
<svg viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="af" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#3d5a80"/>
    </marker>
  </defs>
  <rect x="40" y="180" width="200" height="12" fill="#d4c4a8" rx="2"/>
  <rect x="100" y="120" width="70" height="50" rx="6" fill="#fff3a3" stroke="#c9a84c" stroke-width="2"/>
  <text x="118" y="150" font-size="14" fill="#6a5a20">m</text>
  <!-- N up -->
  <line x1="135" y1="120" x2="135" y2="55" stroke="#5b8def" stroke-width="2.5" marker-end="url(#af)"/>
  <text x="142" y="70" font-size="13" fill="#5b8def">N</text>
  <!-- mg down -->
  <line x1="135" y1="170" x2="135" y2="210" stroke="#e07a9a" stroke-width="2.5" marker-end="url(#af)"/>
  <text x="142" y="205" font-size="13" fill="#e07a9a">mg</text>
  <!-- F right -->
  <line x1="170" y1="145" x2="240" y2="145" stroke="#6ec9a8" stroke-width="2.5" marker-end="url(#af)"/>
  <text x="220" y="135" font-size="13" fill="#2a7a5a">F</text>
  <!-- f left -->
  <line x1="100" y1="165" x2="50" y2="165" stroke="#c9b6f2" stroke-width="2.5" marker-end="url(#af)"/>
  <text x="55" y="155" font-size="13" fill="#7a5a9a">f</text>
</svg>
""",
    "FBD กล่องบนพื้นราบ · ΣFₓ = F−f = ma · ΣFᵧ = N−mg = 0",
)

INCLINE = fig(
    """
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="ai" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#3d5a80"/>
    </marker>
  </defs>
  <polygon points="40,170 280,170 280,50" fill="#f0e8dc" stroke="#a89070" stroke-width="2"/>
  <rect x="160" y="85" width="50" height="30" rx="4" fill="#fff3a3" stroke="#c9a84c" stroke-width="2"
        transform="rotate(-28 185 100)"/>
  <!-- angle -->
  <path d="M220,170 A40,40 0 0,0 250,145" fill="none" stroke="#e07a9a" stroke-width="2"/>
  <text x="235" y="160" font-size="13" fill="#e07a9a">θ</text>
  <text x="100" y="130" font-size="12" fill="#5b8def">mg sinθ ↓ขนาน</text>
  <text x="90" y="80" font-size="12" fill="#2a7a5a">N ⟂ พื้น</text>
  <text x="50" y="50" font-size="12" fill="#7a5a9a">mg cosθ</text>
</svg>
""",
    "พื้นเอียง · แยกแกนตามพื้น · a = g sinθ (ไม่มีเสียดทาน)",
)

CAR_INERTIA = fig(
    """
<svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" class="diag">
  <!-- car -->
  <rect x="40" y="70" width="120" height="45" rx="10" fill="#9ec9f5" stroke="#3d5a80" stroke-width="2"/>
  <circle cx="65" cy="120" r="12" fill="#555"/>
  <circle cx="130" cy="120" r="12" fill="#555"/>
  <text x="70" y="98" font-size="12" fill="#3d5a80">รถเบรก</text>
  <!-- person dashed forward -->
  <circle cx="250" cy="75" r="14" fill="#f7b6c8" stroke="#a05070" stroke-width="2"/>
  <line x1="250" y1="90" x2="250" y2="125" stroke="#a05070" stroke-width="2"/>
  <path d="M160,90 Q200,70 235,75" fill="none" stroke="#e07a9a" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="200" y="55" font-size="12" fill="#e07a9a">เฉื่อยพุ่งหน้า</text>
  <text x="40" y="150" font-size="12" fill="#555">กฎข้อ 1 — ไม่มีแรงดันคนไปหน้า เป็นการรักษาสภาพเดิม</text>
</svg>
""",
    "ตัวอย่างกฎข้อ 1 · ผู้โดยสารพุ่งไปข้างหน้าเมื่อรถเบรก",
)

# --- Chapter 4 ---
WORK_ANGLE = fig(
    """
<svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" class="diag">
  <defs>
    <marker id="aw" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L5,3 L0,6 Z" fill="#3d5a80"/>
    </marker>
  </defs>
  <rect x="30" y="100" width="50" height="35" rx="4" fill="#fff3a3" stroke="#c9a84c" stroke-width="2"/>
  <line x1="30" y1="140" x2="280" y2="140" stroke="#ccc" stroke-width="2"/>
  <!-- s -->
  <line x1="80" y1="118" x2="220" y2="118" stroke="#5b8def" stroke-width="2.5" marker-end="url(#aw)"/>
  <text x="140" y="110" font-size="13" fill="#5b8def">s</text>
  <!-- F at angle -->
  <line x1="80" y1="118" x2="180" y2="50" stroke="#e07a9a" stroke-width="2.5" marker-end="url(#aw)"/>
  <text x="185" y="48" font-size="13" fill="#e07a9a">F</text>
  <path d="M120,118 A35,35 0 0,0 108,90" fill="none" stroke="#c9b6f2" stroke-width="2"/>
  <text x="125" y="95" font-size="13" fill="#7a5a9a">θ</text>
  <text x="60" y="165" font-size="13" fill="#555">W = F s cosθ</text>
</svg>
""",
    "งาน · ใช้เฉพาะองค์ประกอบแรงที่ขนานกับการกระจัด",
)

ENERGY = fig(
    """
<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" class="diag">
  <!-- hill -->
  <path d="M30,170 Q100,40 170,170 L300,170" fill="#e8f5e9" stroke="#6ec9a8" stroke-width="2"/>
  <circle cx="70" cy="70" r="12" fill="#c9b6f2" stroke="#5c4d7a" stroke-width="2"/>
  <text x="50" y="50" font-size="12" fill="#5c4d7a">สูง · U สูง · K≈0</text>
  <circle cx="170" cy="170" r="12" fill="#ffd6a5" stroke="#c97b7b" stroke-width="2"/>
  <text x="185" y="165" font-size="12" fill="#c97b7b">พื้น · U≈0 · K สูง</text>
  <path d="M80,80 Q120,120 160,160" fill="none" stroke="#e07a9a" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="40" y="195" font-size="13" fill="#3d5a80">Kᵢ + Uᵢ = Kᶠ + Uᶠ  (ไม่มีเสียดทาน)</text>
</svg>
""",
    "อนุรักษ์พลังงานกล · ศักย์ ⇄ จลน์",
)

SPRING = fig(
    """
<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" class="diag">
  <rect x="20" y="40" width="16" height="60" fill="#bbb"/>
  <!-- spring zigzag -->
  <polyline points="36,70 50,50 65,90 80,50 95,90 110,50 125,70" fill="none" stroke="#e07a9a" stroke-width="3" stroke-linejoin="round"/>
  <rect x="125" y="55" width="40" height="30" rx="4" fill="#fff3a3" stroke="#c9a84c" stroke-width="2"/>
  <line x1="165" y1="70" x2="250" y2="70" stroke="#5b8def" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="200" y="60" font-size="12" fill="#5b8def">v</text>
  <text x="40" y="120" font-size="13" fill="#555">½kx² = ½mv² (พื้นลื่น)</text>
</svg>
""",
    "สปริงปล่อยมวล · พลังงานยืดหยุ่น → จลน์",
)

FX_GRAPH = fig(
    """
<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="diag">
  <line x1="40" y1="150" x2="280" y2="150" stroke="#889" stroke-width="1.5"/>
  <line x1="40" y1="150" x2="40" y2="20" stroke="#889" stroke-width="1.5"/>
  <text x="270" y="168" font-size="12" fill="#555">x</text>
  <text x="20" y="30" font-size="12" fill="#555">F</text>
  <!-- F=3x^2 curve-ish -->
  <path d="M80,140 Q120,130 160,100 Q200,60 240,30" fill="none" stroke="#e07a9a" stroke-width="2.5"/>
  <rect x="120" y="70" width="80" height="80" fill="rgba(168,230,207,0.35)" stroke="#6ec9a8" stroke-width="1"/>
  <text x="130" y="115" font-size="11" fill="#2a7a5a">พื้นที่ = W</text>
  <text x="115" y="168" font-size="11" fill="#555">3</text>
  <text x="195" y="168" font-size="11" fill="#555">5</text>
</svg>
""",
    "งานจากแรงแปรตาม x · W = ∫ F dx = พื้นที่ใต้กราฟ",
)
