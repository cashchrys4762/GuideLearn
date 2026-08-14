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
    lowBandwidth: string;
    lowBandwidthHint: string;
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
    roleStudent: string;
    roleTeacher: string;
    roleHint: string;
    continueAsTeacher: string;
  };
  navExtra: {
    tutor: string;
    plan: string;
    files: string;
    listen: string;
    portfolio: string;
    news: string;
    classroom: string;
    copilot: string;
  };
  classroom: {
    title: string;
    bodyStudent: string;
    bodyTeacher: string;
    create: string;
    join: string;
    joinCode: string;
    joinLink: string;
    copyCode: string;
    copyLink: string;
    copied: string;
    className: string;
    subject: string;
    section: string;
    emptyTeacher: string;
    emptyStudent: string;
    members: string;
    assignments: string;
    materials: string;
    addWork: string;
    addMaterial: string;
    materialTitle: string;
    materialUrl: string;
    materialFile: string;
    materialLink: string;
    workTitle: string;
    workDesc: string;
    dueDate: string;
    submit: string;
    yourWork: string;
    viewStudent: string;
    score: string;
    feedback: string;
    returnWork: string;
    statusAssigned: string;
    statusTurnedIn: string;
    statusReturned: string;
    notFound: string;
    joinSuccess: string;
    joinFail: string;
    demoCode: string;
    openClass: string;
    teacherOnly: string;
    studentWork: string;
    noSubmissions: string;
    copilotTitle: string;
    copilotBody: string;
    copilotAtRisk: string;
    copilotThriving: string;
    turnInRate: string;
    advise: string;
    localFirst: string;
    submitAsText: string;
    submitAsLink: string;
    submitAsFile: string;
    linkPlaceholder: string;
    fileNamePlaceholder: string;
    currentWork: string;
    nearestDue: string;
  };
  dash: {
    todayQuestion: string;
    aiTip: string;
    todayQuestionTeacher: string;
    aiTipTeacher: string;
    greetingTeacher: string;
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
    teachScheduleTitle: string;
    teachScheduleSub: string;
    addPeriod: string;
    removePeriod: string;
    cancelPeriod: string;
    periodDay: string;
    periodStart: string;
    periodEnd: string;
    periodSubject: string;
    periodRoom: string;
    periodClass: string;
    calendarWeek: string;
    periodsFor: string;
    noPeriods: string;
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
      t1Date: "Jul 15, 2026",
      t1Title: "Portfolio Submission",
      t1Desc: "All documents uploaded.",
      t2Date: "Aug 20, 2026",
      t2Title: "Quota Registration",
      t2Desc: "Pay fees and select test center.",
      t3Date: "Sep 05, 2026",
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
    lowBandwidth: "Low-bandwidth mode",
    lowBandwidthHint:
      "Faster loads and less data: hide decorative images, blur, and motion. Best for unstable networks.",
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
    roleStudent: "Student",
    roleTeacher: "Teacher",
    roleHint: "Choose your role when signing up. Teachers can create classes like Google Classroom.",
    continueAsTeacher: "Continue as Teacher Somchai",
  },
  navExtra: {
    tutor: "Homework Tutor",
    plan: "University Plan",
    files: "Files & Exam Summaries",
    listen: "Listening Buddy",
    portfolio: "Portfolio",
    news: "Education News",
    classroom: "Classroom",
    copilot: "Teacher Co-pilot",
  },
  classroom: {
    title: "Classroom",
    bodyStudent: "Join with a class code or link from your teacher—works offline-first on this device.",
    bodyTeacher: "Create classes, share a code/link, assign work, and review each student’s submissions.",
    create: "Create class",
    join: "Join class",
    joinCode: "Class code",
    joinLink: "Invite link",
    copyCode: "Copy code",
    copyLink: "Copy link",
    copied: "Copied",
    className: "Class name",
    subject: "Subject",
    section: "Section",
    emptyTeacher: "No classes yet. Create one and share the code with students.",
    emptyStudent: "You are not in a class yet. Ask your teacher for a code or open their invite link.",
    members: "Students",
    assignments: "Assignments",
    materials: "Materials & links",
    addWork: "Create assignment",
    addMaterial: "Add file or link",
    materialTitle: "Title",
    materialUrl: "URL or file note",
    materialFile: "File / document",
    materialLink: "Link",
    workTitle: "Assignment title",
    workDesc: "Instructions",
    dueDate: "Due date",
    submit: "Turn in",
    yourWork: "Your work",
    viewStudent: "View student work",
    score: "Score",
    feedback: "Feedback",
    returnWork: "Return",
    statusAssigned: "Assigned",
    statusTurnedIn: "Turned in",
    statusReturned: "Returned",
    notFound: "Class not found. Check the code and try again.",
    joinSuccess: "Joined the class",
    joinFail: "Could not join this class",
    demoCode: "Demo class code: KLM4NP",
    openClass: "Open class",
    teacherOnly: "Teachers only",
    studentWork: "Student submissions",
    noSubmissions: "No submissions yet",
    copilotTitle: "Teacher Co-pilot",
    copilotBody:
      "Back-office summaries of student progress so you can coach the right learner next—less admin, more guidance.",
    copilotAtRisk: "Needs attention",
    copilotThriving: "On track",
    turnInRate: "Turn-in rate",
    advise: "Suggested next step",
    localFirst: "Saved on this device · low data · works when the network is weak",
    submitAsText: "Text",
    submitAsLink: "Link",
    submitAsFile: "File",
    linkPlaceholder: "https://…",
    fileNamePlaceholder: "e.g. homework.pdf (name only — low-bandwidth)",
    currentWork: "Current work",
    nearestDue: "Nearest deadline",
  },
  dash: {
    todayQuestion: "What should you do next today?",
    aiTip:
      "Prioritize Calculus review tonight, skim your English mock outline, then polish one portfolio entry before the weekend.",
    todayQuestionTeacher: "What should you focus on as a teacher today?",
    aiTipTeacher:
      "Check submissions that are due soon, open Teacher Co-pilot for students who need attention, then prep tomorrow’s periods in your timetable.",
    greetingTeacher: "Hello, Teacher Somchai",
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
    teachScheduleTitle: "Teaching timetable & calendar",
    teachScheduleSub: "Plan your week, add or remove class periods anytime.",
    addPeriod: "Add period",
    removePeriod: "Remove period",
    cancelPeriod: "Cancel",
    periodDay: "Day",
    periodStart: "Start",
    periodEnd: "End",
    periodSubject: "Subject / class",
    periodRoom: "Room",
    periodClass: "Classroom code (optional)",
    calendarWeek: "Week calendar",
    periodsFor: "Periods on",
    noPeriods: "No periods this day. Tap Add period to create one.",
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
      "Only Thai education news and scholarships that are currently open for applications.",
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
      t1Date: "15 ก.ค. 2569",
      t1Title: "ส่งพอร์ตโฟลิโอ",
      t1Desc: "อัปโหลดเอกสารครบแล้ว",
      t2Date: "20 ส.ค. 2569",
      t2Title: "ลงทะเบียนโควตา",
      t2Desc: "ชำระค่าธรรมเนียมและเลือกศูนย์สอบ",
      t3Date: "5 ก.ย. 2569",
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
    lowBandwidth: "โหมดประหยัดเน็ต",
    lowBandwidthHint:
      "โหลดเร็ว กินดาต้าน้อย: ซ่อนภาพตกแต่ง เบลอ และแอนิเมชัน เหมาะกับสัญญาณไม่เสถียร",
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
    roleStudent: "นักเรียน",
    roleTeacher: "ครู",
    roleHint: "เลือกบทบาทตอนสมัคร ครูสามารถสร้างชั้นเรียนแบบ Google Classroom ได้",
    continueAsTeacher: "ทดลองใช้ในชื่อ ครูสมชาย",
  },
  navExtra: {
    tutor: "ติวการบ้าน",
    plan: "แผนสู่มหาวิทยาลัย",
    files: "สรุปไฟล์และข้อสอบ",
    listen: "เพื่อนรับฟัง",
    portfolio: "แฟ้มสะสมผลงาน",
    news: "ข่าวการศึกษา",
    classroom: "ห้องเรียน",
    copilot: "Teacher Co-pilot",
  },
  classroom: {
    title: "ห้องเรียน",
    bodyStudent: "เข้าชั้นด้วยรหัสหรือลิงก์จากครู — ข้อมูลเก็บในเครื่อง ใช้ได้แม้เน็ตไม่เสถียร",
    bodyTeacher: "สร้างชั้นเรียน แชร์รหัส/ลิงก์ สั่งงาน ดูงานนักเรียนแต่ละคน และแนบไฟล์หรือลิงก์",
    create: "สร้างชั้นเรียน",
    join: "เข้าร่วมชั้นเรียน",
    joinCode: "รหัสชั้นเรียน",
    joinLink: "ลิงก์เชิญ",
    copyCode: "คัดลอกรหัส",
    copyLink: "คัดลอกลิงก์",
    copied: "คัดลอกแล้ว",
    className: "ชื่อชั้นเรียน",
    subject: "วิชา",
    section: "ห้อง / กลุ่ม",
    emptyTeacher: "ยังไม่มีชั้นเรียน สร้างชั้นแล้วแชร์รหัสให้นักเรียน",
    emptyStudent: "ยังไม่ได้เข้าชั้นเรียน ขอรหัสจากครู หรือเปิดลิงก์เชิญ",
    members: "นักเรียน",
    assignments: "งานที่มอบหมาย",
    materials: "เอกสารและลิงก์",
    addWork: "สร้างงาน",
    addMaterial: "เพิ่มไฟล์หรือลิงก์",
    materialTitle: "ชื่อรายการ",
    materialUrl: "URL หรือบันทึกชื่อไฟล์",
    materialFile: "ไฟล์ / เอกสาร",
    materialLink: "ลิงก์",
    workTitle: "ชื่องาน",
    workDesc: "รายละเอียด / คำสั่ง",
    dueDate: "กำหนดส่ง",
    submit: "ส่งงาน",
    yourWork: "งานของคุณ",
    viewStudent: "ดูงานนักเรียน",
    score: "คะแนน",
    feedback: "ความคิดเห็น",
    returnWork: "ส่งคืน",
    statusAssigned: "ยังไม่ส่ง",
    statusTurnedIn: "ส่งแล้ว",
    statusReturned: "ตรวจแล้ว",
    notFound: "ไม่พบชั้นเรียน ตรวจรหัสแล้วลองใหม่",
    joinSuccess: "เข้าร่วมชั้นเรียนแล้ว",
    joinFail: "เข้าร่วมชั้นเรียนไม่สำเร็จ",
    demoCode: "รหัสตัวอย่าง: KLM4NP",
    openClass: "เปิดชั้นเรียน",
    teacherOnly: "สำหรับครูเท่านั้น",
    studentWork: "งานของนักเรียน",
    noSubmissions: "ยังไม่มีการส่งงาน",
    copilotTitle: "Teacher Co-pilot",
    copilotBody:
      "สรุปความก้าวหน้าของเด็กส่งตรงถึงมือครู เพื่อแนะนำต่อได้แม่นยำ — ลดภาระหลังบ้าน ให้โฟกัสเด็กที่ต้องการความช่วยเหลือ",
    copilotAtRisk: "ควรติดตาม",
    copilotThriving: "ไปได้ดี",
    turnInRate: "อัตราการส่งงาน",
    advise: "แนะนำขั้นถัดไป",
    localFirst: "บันทึกในเครื่อง · กินดาต้าน้อย · ใช้ได้เมื่อเน็ตอ่อน",
    submitAsText: "ข้อความ",
    submitAsLink: "ลิงก์",
    submitAsFile: "ไฟล์",
    linkPlaceholder: "https://…",
    fileNamePlaceholder: "เช่น homework.pdf (ใส่ชื่อไฟล์ — ประหยัดเน็ต)",
    currentWork: "งานปัจจุบัน",
    nearestDue: "กำหนดส่งที่ใกล้ถึง",
  },
  dash: {
    todayQuestion: "วันนี้ควรทำอะไรต่อ",
    aiTip:
      "คืนนี้น่าจะทบทวนแคลคูลัสก่อน แล้วไล่โครงข้อสอบจำลองอังกฤษ จากนั้นเก็บงานพอร์ตโฟลิโอให้อีกนิดก่อนสุดสัปดาห์",
    todayQuestionTeacher: "วันนี้ครูควรโฟกัสอะไรต่อ",
    aiTipTeacher:
      "ลองเช็กงานที่ใกล้กำหนดส่งก่อน แล้วเปิด Teacher Co-pilot ดูเด็กที่ควรติดตาม จากนั้นจัดคาบสอนในตารางให้พร้อมวันพรุ่งนี้",
    greetingTeacher: "สวัสดี ครูสมชาย",
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
    teachScheduleTitle: "ตารางสอนและปฏิทิน",
    teachScheduleSub: "ดูตารางรายสัปดาห์ เพิ่มหรือลดคาบเรียนได้ทันที",
    addPeriod: "เพิ่มคาบ",
    removePeriod: "ลบคาบ",
    cancelPeriod: "ยกเลิก",
    periodDay: "วัน",
    periodStart: "เริ่ม",
    periodEnd: "สิ้นสุด",
    periodSubject: "วิชา / ชั้นเรียน",
    periodRoom: "ห้อง",
    periodClass: "รหัสชั้นเรียน (ถ้ามี)",
    calendarWeek: "ปฏิทินสัปดาห์",
    periodsFor: "คาบของวัน",
    noPeriods: "ยังไม่มีคาบวันนี้ กดเพิ่มคาบเพื่อสร้าง",
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
      "คัดเฉพาะข่าวการศึกษาไทย และทุนการศึกษาที่เปิดรับสมัครอยู่",
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
