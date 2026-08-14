export type Locale = "th" | "en";

export type Dictionary = {
  brand: string;
  hiLearner: string;
  readyToday: string;
  goalReadiness: string;
  nav: {
    dashboard: string;
    missions: string;
    studyBuddy: string;
    coach: string;
    notebook: string;
    settings: string;
    help: string;
  };
  lang: { en: string; th: string; switchTo: string };
  a11y: {
    voiceMode: string;
    voiceOn: string;
    voiceOff: string;
    listening: string;
    readPage: string;
    stopSpeaking: string;
    helpCommands: string;
    unsupported: string;
    micDenied: string;
    fabLabel: string;
    liveRegion: string;
  };
  dashboard: {
    greeting: string;
    greetingEn: string;
    bannerBody: string;
    startMission: string;
    streak: string;
    weeklyTime: string;
    completed: string;
    readiness: string;
    upcoming: string;
    upcomingSub: string;
    viewAll: string;
    dueToday: string;
    mins: string;
    activities: {
      calc: { subject: string; title: string };
      essay: { subject: string; title: string };
      portfolio: { subject: string; title: string };
    };
    pageSummary: string;
  };
  missions: {
    targetGoal: string;
    faculty: string;
    university: string;
    admissionRounds: string;
    round: string;
    current: string;
    progress: string;
    locked: string;
    portfolio: string;
    portfolioDesc: string;
    quota: string;
    quotaDesc: string;
    admission: string;
    admissionDesc: string;
    requirements: string;
    doneOf: string;
    urgent: string;
    addTask: string;
    deadlines: string;
    readDeadlines: string;
    req: {
      transcripts: string;
      essay: string;
      mockExam: string;
      letters: string;
      portfolio: string;
    };
    timeline: {
      t1Date: string;
      t1Title: string;
      t1Desc: string;
      t2Date: string;
      t2Title: string;
      t2Desc: string;
      t3Date: string;
      t3Title: string;
      t3Desc: string;
    };
    pageSummary: string;
  };
  studyBuddy: {
    title: string;
    subtitle: string;
    dropTitle: string;
    dropHint: string;
    analyzing: string;
    analysisComplete: string;
    mathAlgebra: string;
    problem: string;
    keyConcepts: string;
    linear: string;
    isolation: string;
    coachName: string;
    online: string;
    welcome: string;
    welcomeHint: string;
    userMsg: string;
    coachReply1: string;
    coachReply2: string;
    step1: string;
    step1q: string;
    subtract5: string;
    divide3: string;
    placeholder: string;
    safe: string;
    audioMode: string;
    pageSummary: string;
    afterSubtract: string;
    afterDivide: string;
  };
  settings: {
    title: string;
    subtitle: string;
    language: string;
    languageHint: string;
    voiceMode: string;
    voiceHint: string;
    testVoice: string;
    testVoiceText: string;
    commandsTitle: string;
    comingSoon: string;
  };
  placeholders: {
    notebook: string;
    help: string;
    backHome: string;
  };
  voiceHelp: string;
};

const en: Dictionary = {
  brand: "GuideLearn",
  hiLearner: "Hi, Learner!",
  readyToday: "Ready for today?",
  goalReadiness: "Goal Readiness: 85%",
  nav: {
    dashboard: "Dashboard",
    missions: "Missions",
    studyBuddy: "Study Buddy",
    coach: "Coach",
    notebook: "Notebook",
    settings: "Settings",
    help: "Help Center",
  },
  lang: { en: "EN", th: "TH", switchTo: "Language" },
  a11y: {
    voiceMode: "Voice accessibility mode",
    voiceOn: "Voice mode on. Say help for commands.",
    voiceOff: "Voice mode off.",
    listening: "Listening…",
    readPage: "Reading this page.",
    stopSpeaking: "Stopped speaking.",
    helpCommands:
      "Commands: dashboard, missions, study buddy, settings, read page, stop, Thai, English, help.",
    unsupported: "Speech features need Chrome or Edge on this device.",
    micDenied: "Microphone permission denied. Enable it in browser settings.",
    fabLabel: "Toggle voice command accessibility mode",
    liveRegion: "Accessibility announcements",
  },
  dashboard: {
    greeting: "Hello, Kulthida",
    greetingEn: "Hello, Kulthida",
    bannerBody:
      "You're doing great! Keep up the good work. I've prepared some tailored exercises for you today to help you conquer that Calculus module.",
    startMission: "Start Today's Mission",
    streak: "Streak",
    weeklyTime: "Weekly Time",
    completed: "Completed",
    readiness: "Goal Readiness",
    upcoming: "Upcoming Activities",
    upcomingSub: "Stay on top of your learning goals.",
    viewAll: "View All",
    dueToday: "Due Today",
    mins: "mins",
    activities: {
      calc: {
        subject: "Mathematics",
        title: "Calculus: Integration Techniques Practice",
      },
      essay: { subject: "Language", title: "English: Essay Draft Review" },
      portfolio: {
        subject: "Portfolio",
        title: "Update Extracurricular Activities Log",
      },
    },
    pageSummary:
      "Dashboard. Hello Kulthida. Goal readiness sixty-eight percent. Streak seven days. Weekly study time three hours forty-five minutes. Eighteen items completed. Upcoming: Calculus practice due today, English essay review, and portfolio log update.",
  },
  missions: {
    targetGoal: "Target Goal",
    faculty: "Computer Science Faculty",
    university: "Top Tier University",
    admissionRounds: "Admission Rounds",
    round: "Round",
    current: "Current",
    progress: "Progress",
    locked: "Locked",
    portfolio: "Portfolio",
    portfolioDesc: "Showcase your best projects.",
    quota: "Quota",
    quotaDesc: "Written exams and interviews.",
    admission: "Admission",
    admissionDesc: "Final national selection test.",
    requirements: "Requirements",
    doneOf: "{done} of {total} Done",
    urgent: "Urgent",
    addTask: "Add Custom Task",
    deadlines: "Upcoming Deadlines",
    readDeadlines: "Read Deadlines",
    req: {
      transcripts: "Submit High School Transcripts",
      essay: "Complete Personal Essay",
      mockExam: "Take Mock Math Exam",
      letters: "Prepare Recommendation Letters",
      portfolio: "Finalize Activity Portfolio Log",
    },
    timeline: {
      t1Date: "Oct 15, 2023",
      t1Title: "Portfolio Submission",
      t1Desc: "All documents uploaded.",
      t2Date: "Nov 20, 2023",
      t2Title: "Quota Registration",
      t2Desc: "Pay fees and select test center.",
      t3Date: "Dec 05, 2023",
      t3Title: "Written Exam",
      t3Desc: "Mathematics and Logic test.",
    },
    pageSummary:
      "Missions page for Computer Science Faculty. Portfolio round complete. Quota round is current at forty-five percent. Admission round locked. Requirements checklist and upcoming deadlines are available.",
  },
  studyBuddy: {
    title: "Let's tackle this together!",
    subtitle:
      "Stuck on a tricky problem? Snap a photo of your homework and drop it here. Toby the AI Coach will help you break it down step-by-step.",
    dropTitle: "Drop your homework photo here",
    dropHint: "or click to browse your device. We accept JPG, PNG, and PDF files.",
    analyzing: "File analyzing...",
    analysisComplete: "Analysis Complete",
    mathAlgebra: "Math - Algebra",
    problem: "Solve for x: 3x + 5 = 20",
    keyConcepts: "Key Concepts Identified",
    linear: "Linear Equations",
    isolation: "Variable Isolation",
    coachName: "Coach Toby",
    online: "Online & ready to help",
    welcome: "Hi there! I'm Coach Toby. Ready to crush some homework?",
    welcomeHint:
      "Just drop a photo of the problem you're working on in the box on the left, and we'll figure it out step-by-step!",
    userMsg: "I just uploaded a math problem. I'm stuck on how to isolate 'x'.",
    coachReply1: "Great job uploading that! I see it perfectly.",
    coachReply2: "The problem is 3x + 5 = 20.",
    step1: "Step 1:",
    step1q: "Our goal is to get 'x' all by itself. What do you think we should do with that +5 first?",
    subtract5: "Subtract 5",
    divide3: "Divide by 3",
    placeholder: "Type your answer here...",
    safe: "Safe & Private Space",
    audioMode: "Audio Mode",
    pageSummary:
      "Study Buddy with Coach Toby. Drop a homework photo to analyze. Sample problem: solve for x, 3x plus 5 equals 20. Key concepts: linear equations and variable isolation.",
    afterSubtract:
      "Yes! Subtract 5 from both sides. Then we get 3x equals 15. Next, divide both sides by 3 to find x equals 5.",
    afterDivide:
      "Not yet — first undo the plus 5 by subtracting 5 from both sides. Then divide by 3.",
  },
  settings: {
    title: "Settings",
    subtitle: "Language and accessibility for GuideLearn.",
    language: "App language",
    languageHint: "Choose Thai or English for the whole app.",
    voiceMode: "Voice accessibility mode",
    voiceHint:
      "For visually impaired learners: speak commands and hear page descriptions aloud.",
    testVoice: "Test voice",
    testVoiceText: "Hello from GuideLearn. Voice accessibility is working.",
    commandsTitle: "Voice commands",
    comingSoon: "More settings coming soon.",
  },
  placeholders: {
    notebook: "Notebook is coming soon.",
    help: "Help Center is coming soon.",
    backHome: "Back to Dashboard",
  },
  voiceHelp:
    "Say: dashboard, missions, study buddy, settings, read page, stop, Thai, or English.",
};

const th: Dictionary = {
  brand: "GuideLearn",
  hiLearner: "สวัสดี ผู้เรียน!",
  readyToday: "พร้อมสำหรับวันนี้หรือยัง?",
  goalReadiness: "ความพร้อมสู่เป้าหมาย: 85%",
  nav: {
    dashboard: "แดชบอร์ด",
    missions: "ภารกิจ",
    studyBuddy: "เพื่อนเรียน",
    coach: "โค้ช",
    notebook: "สมุดโน้ต",
    settings: "การตั้งค่า",
    help: "ศูนย์ช่วยเหลือ",
  },
  lang: { en: "EN", th: "TH", switchTo: "ภาษา" },
  a11y: {
    voiceMode: "โหมดเข้าถึงด้วยเสียง",
    voiceOn: "เปิดโหมดเสียงแล้ว พูดว่า ช่วยเหลือ เพื่อฟังคำสั่ง",
    voiceOff: "ปิดโหมดเสียงแล้ว",
    listening: "กำลังฟัง…",
    readPage: "กำลังอ่านหน้านี้ออกเสียง",
    stopSpeaking: "หยุดพูดแล้ว",
    helpCommands:
      "คำสั่ง: แดชบอร์ด, ภารกิจ, เพื่อนเรียน, การตั้งค่า, อ่านหน้า, หยุด, ไทย, อังกฤษ, ช่วยเหลือ",
    unsupported: "ฟีเจอร์เสียงต้องใช้ Chrome หรือ Edge บนอุปกรณ์นี้",
    micDenied: "ไม่อนุญาตใช้ไมโครโฟน กรุณาเปิดในตั้งค่าเบราว์เซอร์",
    fabLabel: "เปิด/ปิดโหมดคำสั่งเสียงสำหรับผู้พิการทางสายตา",
    liveRegion: "ประกาศเพื่อการเข้าถึง",
  },
  dashboard: {
    greeting: "สวัสดี กุลธิดา",
    greetingEn: "Hello, Kulthida",
    bannerBody:
      "คุณทำได้เยี่ยมมาก! พยายามต่อไป วันนี้ฉันได้เตรียมแบบฝึกหัดที่ปรับให้เหมาะกับคุณ เพื่อช่วยพิชิตบทแคลคูลัส",
    startMission: "เริ่มภารกิจวันนี้",
    streak: "สถิติต่อเนื่อง",
    weeklyTime: "เวลาเรียนสัปดาห์นี้",
    completed: "สำเร็จแล้ว",
    readiness: "ความพร้อม",
    upcoming: "กิจกรรมที่กำลังจะมาถึง",
    upcomingSub: "ติดตามเป้าหมายการเรียนรู้ของคุณ",
    viewAll: "ดูทั้งหมด",
    dueToday: "ครบกำหนดวันนี้",
    mins: "นาที",
    activities: {
      calc: {
        subject: "คณิตศาสตร์",
        title: "แคลคูลัส: ฝึกเทคนิคอินทิกรัล",
      },
      essay: { subject: "ภาษา", title: "อังกฤษ: ตรวจร่างเรียงความ" },
      portfolio: {
        subject: "พอร์ตโฟลิโอ",
        title: "อัปเดตบันทึกกิจกรรมนอกหลักสูตร",
      },
    },
    pageSummary:
      "หน้าแดชบอร์ด สวัสดีกุลธิดา ความพร้อมสู่เป้าหมายหกสิบแปดเปอร์เซ็นต์ สถิติต่อเนื่องเจ็ดวัน เวลาเรียนสัปดาห์นี้สามชั่วโมงสี่สิบห้านาที สำเร็จแล้วสิบแปดรายการ กิจกรรมถัดไป ได้แก่ ฝึกแคลคูลัสครบกำหนดวันนี้ ตรวจร่างเรียงความ และอัปเดตพอร์ตโฟลิโอ",
  },
  missions: {
    targetGoal: "เป้าหมาย",
    faculty: "คณะวิทยาการคอมพิวเตอร์",
    university: "มหาวิทยาลัยชั้นนำ",
    admissionRounds: "รอบการรับเข้า",
    round: "รอบ",
    current: "ปัจจุบัน",
    progress: "ความคืบหน้า",
    locked: "ล็อกอยู่",
    portfolio: "พอร์ตโฟลิโอ",
    portfolioDesc: "นำเสนอผลงานที่ดีที่สุดของคุณ",
    quota: "โควตา",
    quotaDesc: "สอบข้อเขียนและสัมภาษณ์",
    admission: "แอดมิชชัน",
    admissionDesc: "การสอบคัดเลือกกลาง",
    requirements: "รายการที่ต้องทำ",
    doneOf: "ทำแล้ว {done} จาก {total}",
    urgent: "ด่วน",
    addTask: "เพิ่มงานเอง",
    deadlines: "กำหนดส่งที่ใกล้ถึง",
    readDeadlines: "อ่านกำหนดส่ง",
    req: {
      transcripts: "ส่งใบแสดงผลการเรียนมัธยม",
      essay: "เขียนเรียงความส่วนตัวให้เสร็จ",
      mockExam: "ทำข้อสอบจำลองคณิตศาสตร์",
      letters: "เตรียมจดหมายแนะนำตัว",
      portfolio: "สรุปบันทึกกิจกรรมพอร์ตโฟลิโอ",
    },
    timeline: {
      t1Date: "15 ต.ค. 2566",
      t1Title: "ส่งพอร์ตโฟลิโอ",
      t1Desc: "อัปโหลดเอกสารครบแล้ว",
      t2Date: "20 พ.ย. 2566",
      t2Title: "ลงทะเบียนโควตา",
      t2Desc: "ชำระค่าธรรมเนียมและเลือกศูนย์สอบ",
      t3Date: "5 ธ.ค. 2566",
      t3Title: "สอบข้อเขียน",
      t3Desc: "สอบคณิตศาสตร์และตรรกะ",
    },
    pageSummary:
      "หน้าภารกิจ คณะวิทยาการคอมพิวเตอร์ รอบพอร์ตโฟลิโอเสร็จแล้ว รอบโควตาเป็นรอบปัจจุบัน ความคืบหน้าสี่สิบห้าเปอร์เซ็นต์ รอบแอดมิชชันยังล็อกอยู่ มีรายการที่ต้องทำและกำหนดส่งใกล้ถึง",
  },
  studyBuddy: {
    title: "มาลุยโจทย์ด้วยกัน!",
    subtitle:
      "ติดโจทย์ยากใช่ไหม? ถ่ายรูปการบ้านมาวางที่นี่ โค้ชโทบี้จะช่วยอธิบายทีละขั้น",
    dropTitle: "วางรูปการบ้านที่นี่",
    dropHint: "หรือคลิกเพื่อเลือกไฟล์ รองรับ JPG, PNG และ PDF",
    analyzing: "กำลังวิเคราะห์ไฟล์…",
    analysisComplete: "วิเคราะห์เสร็จแล้ว",
    mathAlgebra: "คณิตศาสตร์ - พีชคณิต",
    problem: "หาค่า x: 3x + 5 = 20",
    keyConcepts: "แนวคิดสำคัญที่พบ",
    linear: "สมการเชิงเส้น",
    isolation: "แยกตัวแปร",
    coachName: "โค้ชโทบี้",
    online: "ออนไลน์ พร้อมช่วยเหลือ",
    welcome: "สวัสดี! ฉันคือโค้ชโทบี้ พร้อมลุยการบ้านกันไหม?",
    welcomeHint:
      "วางรูปโจทย์ทางซ้าย แล้วเราจะช่วยคิดทีละขั้นด้วยกัน!",
    userMsg: "อัปโหลดโจทย์คณิตแล้ว ติดตรงที่ต้องแยกตัวแปร x",
    coachReply1: "อัปโหลดได้ดีมาก! ฉันเห็นโจทย์ชัดเจน",
    coachReply2: "โจทย์คือ 3x + 5 = 20",
    step1: "ขั้นที่ 1:",
    step1q: "เป้าหมายคือทำให้ x อยู่ตัวเดียว เราควรทำอย่างไรกับ +5 ก่อน?",
    subtract5: "ลบ 5",
    divide3: "หารด้วย 3",
    placeholder: "พิมพ์คำตอบที่นี่…",
    safe: "พื้นที่ปลอดภัยและเป็นส่วนตัว",
    audioMode: "โหมดเสียง",
    pageSummary:
      "หน้าเพื่อนเรียนกับโค้ชโทบี้ วางรูปการบ้านเพื่อวิเคราะห์ โจทย์ตัวอย่าง หาค่า x จากสามเอ็กซ์บวกห้าเท่ากับยี่สิบ แนวคิดสำคัญคือสมการเชิงเส้นและการแยกตัวแปร",
    afterSubtract:
      "ถูกต้อง! ลบห้าทั้งสองข้าง จะได้สามเอ็กซ์เท่ากับสิบห้า จากนั้นหารด้วยสาม จะได้เอ็กซ์เท่ากับห้า",
    afterDivide:
      "ยังไม่ใช่ ก่อนอื่นให้ลบห้าทั้งสองข้างเพื่อแก้ +5 แล้วค่อยหารด้วยสาม",
  },
  settings: {
    title: "การตั้งค่า",
    subtitle: "ภาษาและการเข้าถึงของ GuideLearn",
    language: "ภาษาของแอป",
    languageHint: "เลือกภาษาไทยหรืออังกฤษทั้งแอป",
    voiceMode: "โหมดเข้าถึงด้วยเสียง",
    voiceHint:
      "สำหรับผู้พิการทางสายตา: ใช้คำสั่งเสียงและฟังคำอธิบายหน้าจอ",
    testVoice: "ทดสอบเสียง",
    testVoiceText: "สวัสดีจาก GuideLearn ระบบเสียงพร้อมใช้งานแล้ว",
    commandsTitle: "คำสั่งเสียง",
    comingSoon: "การตั้งค่าเพิ่มเติมกำลังมาเร็วๆ นี้",
  },
  placeholders: {
    notebook: "สมุดโน้ตกำลังจะมาเร็วๆ นี้",
    help: "ศูนย์ช่วยเหลือกำลังจะมาเร็วๆ นี้",
    backHome: "กลับแดชบอร์ด",
  },
  voiceHelp:
    "พูดว่า: แดชบอร์ด, ภารกิจ, เพื่อนเรียน, การตั้งค่า, อ่านหน้า, หยุด, ไทย, หรือ อังกฤษ",
};

export const dictionaries: Record<Locale, Dictionary> = { en, th };
