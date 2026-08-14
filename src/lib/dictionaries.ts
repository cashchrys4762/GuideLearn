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
  platform: {
    tagline: string;
    searchPlaceholder: string;
    login: string;
    logout: string;
    signIn: string;
    signUp: string;
    name: string;
    email: string;
    password: string;
    showPassword: string;
    hidePassword: string;
    loginTitle: string;
    loginHint: string;
    continueAs: string;
    saving: string;
    saved: string;
    notifications: string;
    markAllRead: string;
    openCalendar: string;
    private: string;
    readinessShort: string;
    addActivity: string;
    needLogin: string;
    toolsLocked: string;
    coachFab: string;
    coachTitle: string;
    coachPlaceholder: string;
    coachWelcome: string;
    xpHint: string;
  };
  navExtra: {
    tutor: string;
    plan: string;
    files: string;
    listen: string;
    portfolio: string;
    news: string;
  };
  dash: {
    todayQuestion: string;
    aiTip: string;
    ctaTutor: string;
    ctaPlan: string;
    streakBest: string;
    weeklyGoal: string;
    vsLastWeek: string;
    readinessUp: string;
    scheduleTitle: string;
    scheduleSub: string;
    typeStudy: string;
    typeExam: string;
    typeDeadline: string;
    act1: string;
    act2: string;
    act3: string;
    newActivity: string;
  };
  tools: {
    tutorTitle: string;
    tutorBody: string;
    tutorStep1: string;
    tutorStep2: string;
    tutorStep3: string;
    tutorStep4: string;
    planTitle: string;
    planBody: string;
    filesTitle: string;
    filesBody: string;
    uploadCta: string;
    listenTitle: string;
    listenBody: string;
    listenDisclaimer: string;
    portfolioTitle: string;
    portfolioBody: string;
    readiness: string;
    newsTitle: string;
    newsBody: string;
    newsItems: Array<{
      title: string;
      cat: string;
      date: string;
      deadline: string;
    }>;
  };
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
  platform: {
    tagline: "AI Learning Coach",
    searchPlaceholder: "Search lessons, tools, or deadlines…",
    login: "Log in",
    logout: "Log out",
    signIn: "Sign in",
    signUp: "Sign up",
    name: "Name",
    email: "Email",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    loginTitle: "Welcome back",
    loginHint: "Sign in to unlock personal tools",
    continueAs: "Continue as Kulthida",
    saving: "Saving…",
    saved: "Saved",
    notifications: "Notifications",
    markAllRead: "Mark all as read",
    openCalendar: "Open calendar",
    private: "Private",
    readinessShort: "Goal readiness 68%",
    addActivity: "Add activity",
    needLogin: "Please sign in to continue",
    toolsLocked: "Sign in to unlock these tools",
    coachFab: "Ask Coach Toby",
    coachTitle: "Coach Toby",
    coachPlaceholder: "Ask anything about your study plan…",
    coachWelcome:
      "Hi! I'm Coach Toby. Ask me about homework, your university plan, or what to do next today.",
    xpHint: "Earn XP by finishing activities and keeping your streak",
  },
  navExtra: {
    tutor: "Homework Tutor",
    plan: "University Plan",
    files: "Files & Exam Summaries",
    listen: "Listening Buddy",
    portfolio: "Portfolio",
    news: "Education News",
  },
  dash: {
    todayQuestion: "What should you do next today?",
    aiTip:
      "Prioritize Calculus review tonight, skim your English mock outline, then polish one portfolio entry before the weekend.",
    ctaTutor: "Open Homework Tutor",
    ctaPlan: "View University Plan",
    streakBest: "Best streak: 12 days",
    weeklyGoal: "of 5h goal",
    vsLastWeek: "vs last week",
    readinessUp: "Readiness up this week",
    scheduleTitle: "Today's schedule",
    scheduleSub: "Study blocks, mocks, and deadlines at a glance.",
    typeStudy: "Study",
    typeExam: "Exam",
    typeDeadline: "Deadline",
    act1: "Calculus review · today 17:30",
    act2: "English mock · tomorrow 19:00",
    act3: "Portfolio due · Aug 18 23:59",
    newActivity: "New activity",
  },
  tools: {
    tutorTitle: "Homework Tutor",
    tutorBody:
      "Snap or upload a problem and walk through it step by step with Coach Toby—no spoilers until you're ready.",
    tutorStep1: "Upload a photo or paste the question",
    tutorStep2: "Confirm the subject and difficulty",
    tutorStep3: "Try each hint before revealing the next step",
    tutorStep4: "Save the worked solution to your notebook",
    planTitle: "University Plan",
    planBody:
      "Map admission rounds, required scores, and weekly milestones toward your target faculty.",
    filesTitle: "Files & Exam Summaries",
    filesBody:
      "Upload notes and past papers. GuideLearn turns them into concise summaries and practice sets.",
    uploadCta: "Upload files",
    listenTitle: "Listening Buddy",
    listenBody:
      "A calm space to vent study stress, practice speaking, or rehearse interview answers out loud.",
    listenDisclaimer:
      "Not a substitute for professional counseling. If you need urgent help, contact a trusted adult or local support line.",
    portfolioTitle: "Portfolio Builder",
    portfolioBody:
      "Collect activities, reflections, and evidence so your admission portfolio stays interview-ready.",
    readiness: "Portfolio readiness",
    newsTitle: "Education News",
    newsBody:
      "Curated updates on admissions, scholarships, and exam calendars relevant to Thai university applicants.",
    newsItems: [
      {
        title: "TCAS Round 1 portfolio window opens next week",
        cat: "Admissions",
        date: "Aug 12, 2026",
        deadline: "Sep 5, 2026",
      },
      {
        title: "New English mock exam schedule for Grade 12",
        cat: "Exams",
        date: "Aug 10, 2026",
        deadline: "Aug 22, 2026",
      },
      {
        title: "STEM scholarship shortlist announced",
        cat: "Scholarships",
        date: "Aug 8, 2026",
        deadline: "Aug 30, 2026",
      },
    ],
  },
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
  platform: {
    tagline: "โค้ชการเรียนรู้ด้วย AI",
    searchPlaceholder: "ค้นหาบทเรียน เครื่องมือ หรือกำหนดส่ง…",
    login: "เข้าสู่ระบบ",
    logout: "ออกจากระบบ",
    signIn: "เข้าสู่ระบบ",
    signUp: "สมัครสมาชิก",
    name: "ชื่อ",
    email: "อีเมล",
    password: "รหัสผ่าน",
    showPassword: "แสดงรหัสผ่าน",
    hidePassword: "ซ่อนรหัสผ่าน",
    loginTitle: "ยินดีต้อนรับกลับมา",
    loginHint: "เข้าสู่ระบบเพื่อใช้เครื่องมือส่วนตัว",
    continueAs: "ทดลองใช้ในชื่อ กุลธิดา",
    saving: "กำลังบันทึก…",
    saved: "บันทึกแล้ว",
    notifications: "การแจ้งเตือน",
    markAllRead: "อ่านทั้งหมดแล้ว",
    openCalendar: "เปิดปฏิทิน",
    private: "ส่วนตัว",
    readinessShort: "ความพร้อมสู่เป้าหมาย 68%",
    addActivity: "เพิ่มกิจกรรม",
    needLogin: "กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ",
    toolsLocked: "เข้าสู่ระบบเพื่อปลดล็อกเครื่องมือเหล่านี้",
    coachFab: "ถามโค้ชโทบี้",
    coachTitle: "โค้ชโทบี้",
    coachPlaceholder: "ถามอะไรก็ได้เกี่ยวกับแผนเรียนของคุณ…",
    coachWelcome:
      "สวัสดี! ฉันคือโค้ชโทบี้ ถามได้ทั้งเรื่องการบ้าน แผนสู่มหาวิทยาลัย หรือวันนี้ควรทำอะไรต่อ",
    xpHint: "สะสม XP ได้เมื่อทำกิจกรรมสำเร็จและรักษาสถิติต่อเนื่อง",
  },
  navExtra: {
    tutor: "ติวการบ้าน",
    plan: "แผนสู่มหาวิทยาลัย",
    files: "สรุปไฟล์และข้อสอบ",
    listen: "เพื่อนรับฟัง",
    portfolio: "แฟ้มสะสมผลงาน",
    news: "ข่าวการศึกษา",
  },
  dash: {
    todayQuestion: "วันนี้ควรทำอะไรต่อ",
    aiTip:
      "คืนนี้น่าจะทบทวนแคลคูลัสก่อน แล้วไล่โครงข้อสอบจำลองอังกฤษ จากนั้นเก็บงานพอร์ตโฟลิโอให้อีกนิดก่อนสุดสัปดาห์",
    ctaTutor: "เปิดติวการบ้าน",
    ctaPlan: "ดูแผนสู่มหาวิทยาลัย",
    streakBest: "สถิติดีสุด: 12 วัน",
    weeklyGoal: "จากเป้า 5 ชม.",
    vsLastWeek: "เทียบสัปดาห์ก่อน",
    readinessUp: "ความพร้อมเพิ่มขึ้นสัปดาห์นี้",
    scheduleTitle: "ตารางวันนี้",
    scheduleSub: "บล็อกเรียน ข้อสอบจำลอง และกำหนดส่งแบบดูครบในที่เดียว",
    typeStudy: "เรียน",
    typeExam: "สอบ",
    typeDeadline: "กำหนดส่ง",
    act1: "ทบทวนแคลคูลัส · วันนี้ 17:30",
    act2: "ข้อสอบจำลองอังกฤษ · พรุ่งนี้ 19:00",
    act3: "ส่งพอร์ตโฟลิโอ · 18 ส.ค. 23:59",
    newActivity: "กิจกรรมใหม่",
  },
  tools: {
    tutorTitle: "ติวการบ้าน",
    tutorBody:
      "ถ่ายหรืออัปโหลดโจทย์ แล้วให้โค้ชโทบี้พาคิดทีละขั้น—ไม่เฉลยก่อนจนกว่าคุณจะพร้อม",
    tutorStep1: "อัปโหลดรูปหรือวางข้อความโจทย์",
    tutorStep2: "ยืนยันวิชาและความยาก",
    tutorStep3: "ลองตามคำใบ้ก่อนเปิดขั้นถัดไป",
    tutorStep4: "บันทึกวิธีทำลงสมุดโน้ต",
    planTitle: "แผนสู่มหาวิทยาลัย",
    planBody:
      "จัดรอบรับเข้า คะแนนที่ต้องได้ และเป้าหมายรายสัปดาห์สู่คณะที่คุณตั้งใจ",
    filesTitle: "สรุปไฟล์และข้อสอบ",
    filesBody:
      "อัปโหลดโน้ตและข้อสอบเก่า GuideLearn จะสรุปสั้น ๆ และสร้างชุดฝึกให้",
    uploadCta: "อัปโหลดไฟล์",
    listenTitle: "เพื่อนรับฟัง",
    listenBody:
      "พื้นที่สงบสำหรับระบายความเครียดจากการเรียน ฝึกพูด หรือซ้อมสัมภาษณ์ออกเสียง",
    listenDisclaimer:
      "ไม่ใช่การให้คำปรึกษาวิชาชีพ หากต้องการความช่วยเหลือเร่งด่วน ให้ติดต่อผู้ใหญ่ที่ไว้ใจหรือสายด่วนในพื้นที่",
    portfolioTitle: "แฟ้มสะสมผลงาน",
    portfolioBody:
      "รวบรวมกิจกรรม การสะท้อนคิด และหลักฐานให้พอร์ตโฟลิโอพร้อมสัมภาษณ์อยู่เสมอ",
    readiness: "ความพร้อมของพอร์ตโฟลิโอ",
    newsTitle: "ข่าวการศึกษา",
    newsBody:
      "อัปเดตคัดสรรเรื่องการรับเข้า ทุนการศึกษา และปฏิทินสอบที่เกี่ยวกับผู้สมัครมหาวิทยาลัยไทย",
    newsItems: [
      {
        title: "เปิดรับพอร์ตโฟลิโอ TCAS รอบ 1 สัปดาห์หน้า",
        cat: "รับเข้า",
        date: "12 ส.ค. 2569",
        deadline: "5 ก.ย. 2569",
      },
      {
        title: "ประกาศตารางสอบจำลองอังกฤษ ม.6",
        cat: "สอบ",
        date: "10 ส.ค. 2569",
        deadline: "22 ส.ค. 2569",
      },
      {
        title: "ประกาศรายชื่อรอบคัดเลือกทุน STEM",
        cat: "ทุนการศึกษา",
        date: "8 ส.ค. 2569",
        deadline: "30 ส.ค. 2569",
      },
    ],
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, th };
