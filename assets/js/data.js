/*
  Portfolio content.
  Every project, screenshot and link on the site comes from this file.

  To add a project: copy one of the objects in PROJECTS and edit it.
    id         short unique slug, used in the URL (#work/<id>)
    category   ai | mobile | web | games | cv | other
    size       card size in the grid: feature (8x2), tall (4x2), wide (8x1), small (4x1)
    visual     what the card shows: browser | phones | landscape | doc | ble | vision | text
    gallery    screenshots shown in the detail view
    play       optional URL of a playable build (e.g. "games/street-rush/index.html").
               When set, the arcade and the detail view show a "Play in browser" button.
*/

window.CATEGORIES = {
  ai:     { label: "AI, LLM & data",      tint: "lavender" },
  mobile: { label: "Mobile apps",         tint: "blue" },
  web:    { label: "Web apps",            tint: "pink" },
  games:  { label: "Games & experiments", tint: "pink" },
  cv:     { label: "Computer vision",     tint: "blue" },
  other:  { label: "Other engineering",   tint: "neutral" }
};

window.PROJECTS = [
  /* ===================== AI, LLM & DATA ===================== */
  {
    id: "player-feedback-radar",
    title: "Player Feedback Radar",
    category: "ai",
    size: "feature",
    tint: "lavender",
    badges: ["Product analytics", "Live dashboard"],
    tagline: "What players complain about in Turkish mobile games, and what a product team could do about it.",
    summary: "5,400+ App Store reviews from four markets, labelled with an open-source LLM and turned into product recommendations for each game.",
    cardStat: { value: "5,400+", label: "reviews analysed" },
    visual: { type: "browser", imgs: ["images/pfr/heatmap.jpg", "images/pfr/overview.jpg"] },
    overview: "I collected 5,400+ App Store reviews of games from Dream Games, Peak, Rollic and Gulliver's Games across four markets (US, UK, Germany, Türkiye), labelled them with an open-source language model and turned the patterns into product recommendations for each game.",
    problem: "A store rating mostly comes from quick in-game rating prompts, so it says little about why players are unhappy. The written reviews carry the reasons, but there are thousands of them across games and markets.",
    role: "Independent portfolio work. I collected the reviews, designed the taxonomy, ran and checked the labelling, did the analysis and built the dashboard.",
    built: [
      "Designed a 13-category player feedback taxonomy (difficulty, monetization, ads, events, bugs, UX and more), each tied to a product KPI",
      "Labelled every review for topic, sentiment, severity and churn signal with Qwen2.5-7B on a free Colab GPU, and checked the results by hand",
      "Found each game's main product risk, e.g. 15.7% of Royal Match reviews say the game is not what its ads show, and mid-game ads frustrate even happy Word Tiles GO players",
      "Proposed three testable improvements per game with the metric to watch (retention, IAP conversion, ad revenue)",
      "Built an interactive dashboard where every number traces back to its data"
    ],
    results: [
      { value: "5,400+", label: "App Store reviews, 4 games, 4 markets" },
      { value: "13", label: "feedback categories, each tied to a KPI" },
      { value: "97.5%", label: "sentiment and main-topic accuracy, checked by hand" },
      { value: "15.7%", label: "of Royal Match reviews say the game isn't what its ads show" }
    ],
    stack: ["Python", "pandas", "Qwen2.5-7B", "LLM evaluation", "d3.js", "Google Colab", "GitHub Pages"],
    arch: {
      type: "flow",
      caption: "How a review becomes a product recommendation",
      nodes: [
        { title: "Collect", text: "App Store reviews, 4 games in US, UK, DE and TR" },
        { title: "Label", text: "Qwen2.5-7B tags topic, sentiment, severity, churn signal" },
        { title: "Check", text: "Hand review of the labels: 97.5% accurate" },
        { title: "Analyse", text: "pandas: complaint shares and store-rating gap per game" },
        { title: "Recommend", text: "Three testable changes per game, each with a KPI" }
      ]
    },
    links: [
      { label: "Open live dashboard", url: "https://ilaydagurocak.github.io/player-feedback-radar/dashboard.html", kind: "live" },
      { label: "Code on GitHub", url: "https://github.com/ilaydagurocak/player-feedback-radar", kind: "github" }
    ],
    note: "The dashboard is in Turkish. Independent portfolio work, not affiliated with the studios mentioned.",
    gallery: {
      type: "browser",
      items: [
        { src: "images/pfr/overview.jpg", caption: "Games at a glance", alt: "Dashboard overview table comparing four games" },
        { src: "images/pfr/heatmap.jpg", caption: "Complaint map", alt: "Complaint heatmap by game and category" },
        { src: "images/pfr/royal-match.jpg", caption: "Royal Match deep dive", alt: "Royal Match findings and recommendations" },
        { src: "images/pfr/word-tiles-go.jpg", caption: "Word Tiles GO deep dive", alt: "Word Tiles GO findings and recommendations" },
        { src: "images/pfr/store-gap.jpg", caption: "Silent majority vs. vocal critics", alt: "Store rating compared with written review rating" }
      ]
    }
  },

  {
    id: "mevzuatradar",
    title: "MevzuatRadar",
    category: "ai",
    size: "tall",
    tint: "blue",
    badges: ["Open source"],
    tagline: "Regulatory change intelligence for Turkish banking law.",
    summary: "Finds amendment acts in the Official Gazette, extracts every change and verifies it against the consolidated law, with no hand-labelled data.",
    cardStat: { value: "98.3%", label: "of extracted changes verified" },
    visual: { type: "doc" },
    overview: "MevzuatRadar finds amendment acts for BDDK, MASAK and TCMB rules in the Official Gazette, extracts structured change records (operation, target article, paragraph and clause, old and new wording) and verifies them against the consolidated law text, with no manually labelled data.",
    problem: "Rules from BDDK, MASAK and TCMB change often, and the amendment texts are hard to read on their own: one sentence can change a heading and three different paragraphs at once.",
    role: "A personal project, built and evaluated on my own.",
    built: [
      "End-to-end pipeline: collection, discovery of amendment acts, parsing, extraction and verification",
      "Label-free verification: if a change was extracted correctly, its effect must appear in the published current text",
      "Turned verified output into silver-labelled training data, fine-tuned mT5-small and benchmarked it against few-shot Qwen2.5-7B through the same evaluation pipeline",
      "FastAPI service with Docker for extraction, verification and point-in-time queries, such as what an article said in 2019",
      "A daily Official Gazette watcher on GitHub Actions, with 139 automated tests running in CI on every push"
    ],
    results: [
      { value: "98.3%", label: "verification rate: 13 regulations, 84 amendment acts, 460 records" },
      { value: "97.5%", label: "on two regulations held out as an untouched test set" },
      { value: "+5%", label: "more verified changes from a rules and model hybrid" },
      { value: "139", label: "automated tests in CI on every push" }
    ],
    compare: [
      { label: "Rules", value: 97.5 },
      { label: "Fine-tuned mT5-small", value: 80.5 },
      { label: "Few-shot Qwen2.5-7B", value: 77.8 }
    ],
    stack: ["Python", "Hugging Face Transformers", "PyTorch", "mT5-small", "Qwen2.5-7B", "Few-shot prompting", "FastAPI", "Docker", "GitHub Actions", "Information extraction", "NER", "pytest"],
    arch: {
      type: "flow",
      caption: "Pipeline. Verified records also become silver-labelled training data for mT5-small.",
      nodes: [
        { title: "Collect", text: "Official Gazette, watched daily on GitHub Actions" },
        { title: "Discover", text: "Find the acts that amend a tracked regulation" },
        { title: "Parse", text: "Split each act into amendment sentences" },
        { title: "Extract", text: "Rules, fine-tuned mT5-small or few-shot Qwen2.5-7B" },
        { title: "Verify", text: "The change must appear in the consolidated text" },
        { title: "Serve", text: "FastAPI + Docker, incl. point-in-time queries" }
      ]
    },
    links: [
      { label: "View on GitHub", url: "https://github.com/ilaydagurocak/mevzuatradar", kind: "github" }
    ]
  },

  /* ===================== MOBILE ===================== */
  {
    id: "promptprobe",
    title: "PromptProbe",
    category: "ai",
    size: "wide",
    tint: "lavender",
    badges: ["LLM security", "Open source"],
    tagline: "Automated prompt-injection red-teaming for LLM chatbots.",
    summary: "Fires 41 injection attacks at a chatbot, disguises them six ways and grades the bot from A to F with deterministic evidence.",
    cardStat: { value: "41", label: "attacks in 8 packs, EN and TR" },
    visual: { type: "browser", imgs: ["images/ai/promptprobe-report.jpg"] },
    overview: "PromptProbe fires a catalogue of injection attacks at a chatbot, disguises them with mutators that defeat naive filters, detects success with deterministic canary and marker checks, and writes an HTML, JSON and Markdown report with a severity-weighted risk score and remediation advice.",
    problem: "Prompt injection is #1 on the OWASP Top 10 for LLM Applications (2025) and system-prompt leakage is #7. Most teams test it by hand, once, in English. PromptProbe makes it a repeatable test you can run after every prompt or model change, and fail a CI build on.",
    role: "A personal project, designed, built and tested on my own. Released as v0.1.0 under the MIT licence.",
    built: [
      "41 attacks in 8 packs: direct override, system-prompt and secret leakage, role-play, delimiter confusion, obfuscation, indirect injection (email, web page, CV, RAG), multi-turn and a Turkish-language pack",
      "6 mutators that re-send the same payload as Base64, leetspeak, Cyrillic homoglyphs, zero-width-split text or concatenated variables, to show whether a guardrail understands or only pattern-matches",
      "Deterministic detection: a random canary secret planted in the system prompt and a unique harmless marker per case. A leak is caught even when Base64-encoded, spaced out or reversed",
      "Targets: OpenAI-compatible APIs (OpenAI, Ollama, vLLM, Groq), Anthropic, any HTTP chatbot backend, and an offline DemoBot with four defense levels",
      "Optional LLM judge for paraphrased or translated leaks; it only adds findings and its reasoning is kept in the report",
      "Async runner with concurrency, retries, exponential backoff and Retry-After support",
      "Severity-weighted risk score (0–100) and A–F grade; HTML, JSON and Markdown reports",
      "--fail-on-asr exit code so it works as a CI security gate; the repo's own CI fails if the hardened DemoBot lets a single attack through",
      "77 tests that run fully offline, on Python 3.10 to 3.13"
    ],
    results: [
      { value: "41 × 6", label: "attacks × mutators → 181 test cases" },
      { value: "100% → 0%", label: "attack success from DemoBot level 0 to level 3" },
      { value: "35.7%", label: "of Base64-disguised attacks still got through at level 2" },
      { value: "77", label: "offline tests in CI" }
    ],
    compareTitle: "Defense level vs. attack success",
    compareText: "Attack success rate on the four DemoBot defense levels, 181 cases each. DemoBot is a rule-based simulation, not an LLM.",
    compare: [
      { label: "Level 0: no defense", value: 100 },
      { label: "Level 1: English blocklist", value: 93.9 },
      { label: "Level 2: EN+TR blocklist, output filter", value: 14.4 },
      { label: "Level 3: full screening", value: 0 }
    ],
    stack: ["Python", "LLM red-teaming", "OWASP LLM Top 10", "GitHub Actions", "asyncio", "httpx", "Jinja2", "OpenAI-compatible APIs", "Anthropic API", "Ollama", "pytest", "ruff"],
    arch: {
      type: "flow",
      caption: "From attack pack to graded report",
      nodes: [
        { title: "Attack packs", text: "41 attacks in 8 YAML packs" },
        { title: "Mutators", text: "Base64, leetspeak, homoglyph, zero-width, split" },
        { title: "Runner", text: "Async, retries, multi-turn conversations" },
        { title: "Target", text: "OpenAI-compatible, Anthropic, HTTP or DemoBot" },
        { title: "Detectors", text: "Marker, canary, leak, refusal, optional LLM judge" },
        { title: "Report", text: "Risk score, A–F grade, HTML / JSON / MD" }
      ]
    },
    note: "Only for systems you own or have permission to test. Payloads are deliberately harmless: markers and canaries instead of real secrets or malicious actions.",
    gallery: {
      type: "browser",
      items: [
        { src: "images/ai/promptprobe-report.jpg", caption: "Report summary: risk score, grade and results by category", alt: "PromptProbe HTML report for DemoBot defense level 2 with risk 22 of 100 and grade C" },
        { src: "images/ai/promptprobe-finding.jpg", caption: "A finding with prompt, response and evidence", alt: "Critical finding for an indirect injection hidden in a CV, with the evidence that the marker was found" }
      ]
    }
  },

  {
    id: "safemap",
    title: "SafeMap",
    category: "mobile",
    size: "tall",
    tint: "blue",
    badges: ["iOS", "Solo build"],
    tagline: "A community map that shows how safe a neighborhood feels.",
    summary: "People rate parts of their city as safe, moderate or unsafe; the ratings become colour-coded pins on a map.",
    visual: { type: "phones", imgs: ["images/safemap/mainview.jpg", "images/safemap/comments.jpg"] },
    overview: "Users rate areas of their city as safe, moderate or unsafe and leave comments. Ratings appear as colour-coded pins on the map, so people can check a place before they go.",
    problem: "How safe a street feels is local knowledge that rarely makes it onto a map. SafeMap lets people share it, so others can check a place before they go.",
    role: "Designed and built on my own, from idea to TestFlight.",
    built: [
      "Map screen with colour-coded safety pins and average scores using MapKit",
      "Location-based reviews: add, list and delete your own comments",
      "Email sign-up and login with Firebase Authentication",
      "Localization in 15+ languages",
      "Profile, trusted contacts, notification and location permission settings"
    ],
    results: [
      { value: "15+", label: "languages supported" },
      { value: "TestFlight", label: "shipped for testing" }
    ],
    stack: ["Swift", "SwiftUI", "MVVM", "MapKit", "Firebase Auth", "Firestore", "Firebase Storage", "Localization", "TestFlight"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/safemap/mainview.jpg", caption: "Safety map", alt: "Map with colour-coded safety pins" },
        { src: "images/safemap/comments.jpg", caption: "Area reviews", alt: "Area reviews with average score" },
        { src: "images/safemap/content.jpg", caption: "Welcome", alt: "Welcome screen" },
        { src: "images/safemap/login.jpg", caption: "Login", alt: "Login screen" },
        { src: "images/safemap/menu.jpg", caption: "Settings", alt: "Settings menu" },
        { src: "images/safemap/changelanguage.jpg", caption: "Language selection", alt: "Language selection list" },
        { src: "images/safemap/userreports.jpg", caption: "My reviews", alt: "Empty state for user comments" },
        { src: "images/safemap/notificationsettings.jpg", caption: "Notifications", alt: "Notification settings" }
      ]
    }
  },

  {
    id: "school-management",
    title: "School Management App",
    category: "mobile",
    size: "tall",
    tint: "lavender",
    badges: ["Freelance", "Published on the App Store"],
    tagline: "One app for teachers and students to run a school's daily work.",
    summary: "Attendance, progress notes and class announcements for an international client. iOS and Android apps, backend and App Store release.",
    visual: { type: "phones", imgs: ["images/school/menu.jpg", "images/school/announcements.jpg", "images/school/progress.jpg"] },
    overview: "Built for an international client. Teachers take attendance, track each student's progress and post announcements to selected classes. Students see their own classes, updates and resources.",
    problem: "A school's daily work — attendance, progress, announcements, trips, payments — needed one place that teachers and students could both use, with each role seeing only what it should.",
    role: "Delivered end to end on my own: iOS and Android apps, the backend, App Store publishing and the transfer of the app to the client.",
    built: [
      "Role-based access for teachers, admin teachers and students",
      "Sign-up with an invite code and role selection",
      "Class groups, with announcements sent only to the chosen classes",
      "Dated progress notes for each student",
      "Attendance, chat, trips, resources, payments, rewards and notifications",
      "Searchable user directory grouped by role",
      "Node.js backend deployed on Render, with media stored on Cloudinary",
      "Built the same app for Android in Kotlin, with matching features on both platforms",
      "Published the iOS app on the App Store, then handed it over to the client with an App Store app transfer"
    ],
    results: [
      { value: "2", label: "native platforms with matching features" },
      { value: "App Store", label: "published, then transferred to the client" }
    ],
    stack: ["Swift", "Kotlin", "Firebase", "Node.js", "REST API", "Cloudinary", "Render", "App Store release"],
    arch: {
      type: "flow",
      caption: "Both apps talk to one backend",
      nodes: [
        { title: "iOS app", text: "Swift" },
        { title: "Android app", text: "Kotlin" },
        { title: "REST API", text: "Node.js, deployed on Render" },
        { title: "Media", text: "Stored on Cloudinary" }
      ]
    },
    gallery: {
      type: "phone",
      items: [
        { src: "images/school/menu.jpg", caption: "Teacher home", alt: "Teacher home menu" },
        { src: "images/school/student.jpg", caption: "Student home", alt: "Student home menu" },
        { src: "images/school/announcements.jpg", caption: "Announcements", alt: "Announcements list by class" },
        { src: "images/school/add-announcement.jpg", caption: "Send to classes", alt: "Choosing classes for a new announcement" },
        { src: "images/school/progress.jpg", caption: "Student progress", alt: "Adding a progress note for a student" },
        { src: "images/school/users.jpg", caption: "User directory", alt: "User directory grouped by role" },
        { src: "images/school/login.jpg", caption: "Login", alt: "Login screen" },
        { src: "images/school/register.jpg", caption: "Registration", alt: "Registration form" }
      ]
    }
  },

  /* ===================== WEB ===================== */
  {
    id: "uzlastirma",
    title: "Uzlaştırma Belge Oluşturucu",
    category: "web",
    size: "wide",
    tint: "pink",
    badges: ["Legal document generator", "Live tool"],
    tagline: "A browser tool that turns one form into a criminal mediator's entire paperwork.",
    summary: "One form, 12 document types, exported as Word, UDF (UYAP) or PDF right in the browser.",
    cardStat: { value: "12", label: "document types from one form" },
    visual: { type: "browser", imgs: ["images/other/uzl-hero.jpg"] },
    overview: "Criminal mediators (uzlaştırmacı) prepare the same documents over and over for every case. The user fills in the case, mediator and party details once and the tool generates the invitation letters, offer forms, notification requests and mediation reports. It is free to use and runs on the Gürocak Hukuk Bürosu website.",
    problem: "Every case needs the same invitation letters, settlement offers and mediation reports, typed again with the same names and details.",
    role: "I built the tool: the six-step form, the 12 document types and the Word, UDF and PDF export. I first built it in Python with Streamlit, then rebuilt it as a standalone browser app so mediators can open it from the website with no server.",
    built: [
      "12 document types from a single form, from invitation letters to reports for instalment, deferred and community-service settlements",
      "Export to Word (DOCX), UDF for Turkey's UYAP court system with tables included, and PDF in the same layout as the Word file",
      "Six-step form with section navigation; choosing documents opens only the sections they need",
      "Any number of parties per case, each assigned to the documents they appear in",
      "Privacy by design: documents are built entirely in the browser, personal data is never sent to a server or saved, and the form is cleared when the page closes"
    ],
    results: [
      { value: "12", label: "document types" },
      { value: "3", label: "export formats: Word, UDF, PDF" },
      { value: "0", label: "data sent to a server" }
    ],
    stack: ["HTML", "CSS", "JavaScript", "Word, PDF and UDF generation"],
    arch: {
      type: "flow",
      caption: "Six steps from an empty form to the full case file, all in the browser",
      nodes: [
        { title: "Documents", text: "Pick one or more of the 12 document types" },
        { title: "Case", text: "Prosecutor's office, offence, file numbers, output format" },
        { title: "Mediator", text: "Mediator details, entered once" },
        { title: "Parties", text: "Any number of parties and their roles" },
        { title: "Assign", text: "Which parties go on which document" },
        { title: "Generate", text: "Word, UDF or PDF, built on the device" }
      ]
    },
    links: [
      { label: "Open the tool", url: "https://gurocakhukuk.com.tr/uzlastirma/", kind: "live" }
    ],
    gallery: {
      type: "browser",
      items: [
        { src: "images/other/uzl-hero.jpg", caption: "Start page and privacy note", alt: "Uzlaştırma Belge Oluşturucu start page with a note that data never leaves the device" },
        { src: "images/other/uzl-types.jpg", caption: "Choose documents", alt: "Grid of 12 document types to select, with the six form sections listed on the left" },
        { src: "images/other/uzl-case.jpg", caption: "Output format and case details", alt: "Word, UDF and PDF format choice above the case details form" },
        { src: "images/other/uzl-parties.jpg", caption: "Parties", alt: "Party details form with a counter for the number of parties" }
      ]
    }
  },

  {
    id: "smart-pet-feeder",
    title: "Smart Pet Feeder",
    category: "mobile",
    size: "tall",
    tint: "pink",
    badges: ["IoT team project"],
    tagline: "A connected food and water bowl you control from your phone.",
    summary: "Live food and water levels, remote feeding and low-level alerts. I built the iOS app, the backend and the live data flow.",
    visual: { type: "phones", imgs: ["images/petfeeder/dashboard.jpg", "images/petfeeder/send.jpg"] },
    overview: "A two-person hardware and software project. My teammate built the device: the ESP32, motors and C++ firmware. I built everything on the software side: the iOS app, the backend and the live data flow between the phone and the bowl.",
    problem: "Owners want to know whether their pet has food and water, and to top it up, when they are not at home.",
    role: "All software and mobile work. Hardware and firmware were built by my teammate.",
    built: [
      "iOS app with sign-up, login and a profile for each pet (cat or dog)",
      "Live food and water levels on the dashboard, updated in real time from the device",
      "Remote feeding: send a set amount of food or water to the bowl from the app",
      "Low food and low water alerts as notifications",
      "Firebase for authentication and real-time data, with a Node.js backend connecting the app and the device"
    ],
    stack: ["Swift", "Firebase", "Node.js", "Real-time data", "Notifications", "IoT", "ESP32"],
    arch: {
      type: "flow",
      caption: "Phone to bowl. The device and its firmware were built by my teammate.",
      nodes: [
        { title: "iOS app", text: "Swift. Levels, feeding, alerts" },
        { title: "Firebase", text: "Auth and real-time data" },
        { title: "Node.js", text: "Backend between app and device" },
        { title: "ESP32 bowl", text: "Motors and C++ firmware (teammate)" }
      ]
    },
    gallery: {
      type: "phone",
      items: [
        { src: "images/petfeeder/dashboard.jpg", caption: "Live levels", alt: "Dashboard with live food and water levels" },
        { src: "images/petfeeder/send.jpg", caption: "Remote feeding", alt: "Sending food and water to the bowl" },
        { src: "images/petfeeder/low-water.jpg", caption: "Low water alert", alt: "Low water notification" },
        { src: "images/petfeeder/low-food.jpg", caption: "Low food alert", alt: "Low food notification" },
        { src: "images/petfeeder/register.jpg", caption: "Pet sign-up", alt: "Sign-up with pet name and type" },
        { src: "images/petfeeder/welcome.jpg", caption: "Welcome", alt: "Welcome screen" }
      ]
    }
  },

  {
    id: "mesai-survivors",
    title: "Mesai Survivors",
    category: "games",
    size: "tall",
    tint: "night",
    badges: ["iOS game"],
    platform: "iOS · Swift",
    tagline: "An office-humour survivor game: get through the working day from 09:00 to 18:00.",
    summary: "Dodge swarms of angry e-mails, level up with office gear like a laser pointer and coffee breaks, and survive until 18:00.",
    visual: { type: "phones", imgs: ["images/games/mesai-rain.jpg", "images/games/mesai-levelup.jpg"] },
    overview: "An office-humour survivor game for iOS, inspired by Survivor.io. You move with one finger and attack automatically while the inbox comes for you: angry e-mails swarm the office, and the goal is to stay alive from 09:00 until 18:00. Each weekday is a chapter, starting with Monday.",
    problem: "Built in my free time to try a full game loop in Swift — waves, level-ups, characters and an economy — around jokes anyone who has worked in an office will recognise.",
    built: [
      "Chapters by weekday, starting with Monday, each with a best time and a reward",
      "One-finger joystick movement with automatic attacks",
      "Enemies are angry e-mails, with timed events such as Mail Yağmuru (mail storm)",
      "Level-ups (Terfi!) offer three skills to choose from, with a reroll: weapons such as Lazer Pointer and Kahve Molası, passives such as Mekanik Klavye",
      "A team of playable characters, each with a starting weapon and a perk, unlocked with in-game salary",
      "An end-of-day screen with a title for the day, time reached, archived notifications, level and salary earned"
    ],
    mechanics: [
      "Move with one finger; your character attacks on its own",
      "Survive the e-mail swarms from 09:00 to 18:00",
      "Fill the Verimlilik (productivity) bar to get promoted and pick a new skill",
      "Earn salary to unlock new team members"
    ],
    stack: ["Swift"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/games/mesai-home.jpg", caption: "Home: Chapter 1, Monday", alt: "Mesai Survivors home screen with the Monday chapter and the selected character" },
        { src: "images/games/mesai-team.jpg", caption: "Pick your team member", alt: "Team screen with four office characters, their weapons and perks" },
        { src: "images/games/mesai-start.jpg", caption: "09:00, the working day starts", alt: "Gameplay start with the message: working day started, survive until 18:00" },
        { src: "images/games/mesai-play.jpg", caption: "Dodging e-mails", alt: "Character in an office surrounded by angry e-mail enemies, with a joystick" },
        { src: "images/games/mesai-rain.jpg", caption: "Mail storm event", alt: "A swarm of angry e-mails during the mail storm event" },
        { src: "images/games/mesai-levelup.jpg", caption: "Promotion: choose a skill", alt: "Level-up screen offering Laser Pointer, Coffee Break and Mechanical Keyboard" },
        { src: "images/games/mesai-over.jpg", caption: "End of the day", alt: "Game over screen with the title of the day, stats and salary earned" }
      ]
    }
  },

  {
    id: "vapura-yetistir",
    title: "Vapura Yetiştir",
    category: "games",
    size: "wide",
    tint: "sky",
    badges: ["iOS game", "Preparing for the App Store"],
    platform: "iOS · Swift",
    tagline: "An İstanbul endless runner: catch the Eminönü ferry before it leaves.",
    summary: "Run from Karaköy to Eminönü against the clock, collect simit, dodge seagulls and simit carts, and don't miss the ferry.",
    visual: { type: "landscape", imgs: ["images/games/vapura-run.jpg"] },
    overview: "An endless runner set on the İstanbul waterfront, inspired by Subway Surfers. You run from Karaköy towards Eminönü with a countdown to the ferry, collect simit, jump over simit carts and get away from seagulls trying to steal your simit. I'm preparing it for release on the App Store.",
    problem: "Built in my free time to make a polished, very local game: İstanbul's skyline, ferries, simit and seagulls, with full sound effects and music.",
    built: [
      "Ferry countdown with a Karaköy to Eminönü progress bar",
      "Swipe controls: jump, double jump in the air, slide",
      "Simit to collect, seagulls that steal them, and timed power-ups",
      "Runners to unlock with simit, each with a perk: Ela (balanced), Simitçi Rıza (every simit counts twice), Nur Teyze (coin magnet lasts twice as long) and more",
      "Results screen with score, distance, simit and ferries caught, plus a savings jar and best score"
    ],
    mechanics: [
      "Swipe up or tap to jump",
      "Swipe up again in the air to double jump",
      "Swipe down to slide",
      "Collect simit, avoid the seagulls and catch the ferry before the timer runs out"
    ],
    stack: ["Swift"],
    gallery: {
      type: "landscape",
      items: [
        { src: "images/games/vapura-home.jpg", caption: "Start screen and controls", alt: "Vapura Yetiştir start screen with the run button and swipe controls" },
        { src: "images/games/vapura-runners.jpg", caption: "Choose your runner", alt: "Runner selection with Ela, Simitçi Rıza and Nur Teyze" },
        { src: "images/games/vapura-run.jpg", caption: "Running for the ferry", alt: "Runner next to a simit cart with the ferry countdown at 0:57" },
        { src: "images/games/vapura-seagull.jpg", caption: "A seagull goes for the simit", alt: "Seagull hitting the runner, who shouts: don't take my simit" },
        { src: "images/games/vapura-power.jpg", caption: "Closing in on Eminönü", alt: "Runner jumping with the ferry countdown at 0:15" },
        { src: "images/games/vapura-over.jpg", caption: "Missed the ferry", alt: "Results screen with a new record, score, distance and simit collected" }
      ]
    }
  },

  {
    id: "seagull-pier",
    title: "Seagull Pier: Lost & Found",
    category: "games",
    size: "wide",
    tint: "night",
    badges: ["PC game", "Unity"],
    platform: "PC · Unity",
    tagline: "A calm detective game: run the lost & found office at a ferry pier and send every item home.",
    summary: "Examine forgotten items, collect clues, check the pier records and stamp a return tag for the right owner.",
    visual: { type: "landscape", imgs: ["images/games/pier-deniz.jpg"] },
    overview: "A calm puzzle game made in Unity, in English. You are the new clerk at the lost & found window of Seagull Pier. Each day is a shift: a deckhand brings in what passengers left on the ferries, you look each item over, gather clues, check the binder of records and fill in a return tag that names the owner. Then the owners come to the window to collect their things, each with a little story.",
    problem: "Built to make a complete PC game with its own world and characters: a cosy pier office, ferries with names, regulars at the window and a mystery on the top shelf.",
    built: [
      "Days as chapters, each with its own mood, such as Monday's first shift and Tuesday's rain on the strait",
      "An item desk where clicking details writes clues into your notes, plus a lamp for a closer look",
      "A binder of pier records to cross-check ferry lines, times and passengers",
      "Fill-in-the-blank return tags you can only stamp when every answer is in place",
      "Characters at the window with their own dialogue, from the deckhand Deniz to the owners of each item",
      "Story touches: a letter from the previous clerk, a cat who thinks the office is his, ferries in dry dock that change the lines"
    ],
    mechanics: [
      "Take each item from the deckhand and open it on the desk",
      "Click anything that catches your eye to add a clue to your notes",
      "Check the records binder to match times, lines and names",
      "Fill in every blank on the return tag, then stamp it"
    ],
    stack: ["Unity", "C#"],
    gallery: {
      type: "landscape",
      items: [
        { src: "images/games/pier-title.jpg", caption: "Title screen", alt: "Seagull Pier Lost & Found title screen with a ferry at sunset" },
        { src: "images/games/pier-letter.jpg", caption: "A letter from the old clerk", alt: "Letter from Halil to the new clerk on the office desk" },
        { src: "images/games/pier-deniz.jpg", caption: "Deniz brings the day's items", alt: "Deckhand Deniz at the lost and found window, with the ferry behind him" },
        { src: "images/games/pier-scarf.jpg", caption: "Examining an item", alt: "Red wool scarf on the desk with a clue noted from its sewn-in label" },
        { src: "images/games/pier-umbrella.jpg", caption: "Where and when it was found", alt: "Black umbrella with a duck-head handle and the found note" },
        { src: "images/games/pier-tag.jpg", caption: "Filling in the return tag", alt: "Return tag with blanks for owner, maker and destination, and a list of names" },
        { src: "images/games/pier-define.jpg", caption: "An owner at the window", alt: "A girl with braids happy to see her scarf again" },
        { src: "images/games/pier-tahsin.jpg", caption: "Another one sent home", alt: "An old man with round glasses reunited with his umbrella" },
        { src: "images/games/pier-rain.jpg", caption: "Tuesday: rain on the strait", alt: "Rainy day at the window with Deniz explaining the ferry changes" }
      ]
    }
  },

  {
    id: "street-rush",
    title: "Street Rush: Neon Highway",
    category: "games",
    size: "wide",
    tint: "night",
    badges: ["Browser game"],
    platform: "Browser · HTML and CSS",
    tagline: "A browser racing game with a neon city look.",
    summary: "Garage, missions, achievements, daily rewards, coins and levels, with a nitro boost and an in-race pause menu.",
    visual: { type: "landscape", imgs: ["images/fun/rush-menu.jpg"] },
    overview: "A browser racing game with a neon city look. It includes a garage, missions, achievements, daily rewards, coins and levels, plus a nitro boost and a pause menu during the race.",
    problem: "A free-time project to try game mechanics and progression systems, built for the browser with HTML and CSS.",
    built: [
      "Garage, missions and achievements",
      "Daily rewards, coins and levels",
      "Nitro boost and in-race pause menu"
    ],
    mechanics: [
      "Race down a neon highway",
      "Use the nitro boost for extra speed",
      "Earn coins, level up and claim daily rewards",
      "Complete missions and unlock achievements"
    ],
    stack: ["HTML", "CSS"],
    gallery: {
      type: "browser",
      items: [
        { src: "images/fun/rush-menu.jpg", caption: "Main menu", alt: "Main menu with garage, missions and achievements" },
        { src: "images/fun/rush-paused.jpg", caption: "In-race pause", alt: "Pause menu during a race with speed and nitro" }
      ]
    }
  },

  {
    id: "thesis-management",
    title: "Thesis Management App",
    category: "mobile",
    size: "tall",
    tint: "neutral",
    badges: ["University project"],
    tagline: "A SwiftUI app for submitting, reviewing and searching graduate theses.",
    summary: "Authors submit, supervisors approve or reject, anyone searches the archive. Six-table relational schema designed by me.",
    visual: { type: "phones", imgs: ["images/thesis/thesis-panel.jpg", "images/thesis/thesis-approve.jpg"] },
    overview: "Authors submit their theses and supervisors review them. Anyone can browse and search the archive by title, abstract, author, keyword, topic, type, university and institute.",
    problem: "Submitting, approving and finding graduate theses needed one flow with separate roles for authors and supervisors.",
    role: "I designed the database schema: six related tables for users, theses, universities, institutes, topics and types, linked by foreign keys.",
    built: [
      "Sign-up with two roles, author and supervisor, each with its own profile and screens",
      "Thesis submission form with pickers for supervisor, topic, type, university and institute",
      "Approval flow: supervisors see pending theses and approve or reject them",
      "Advanced search with text fields and filters",
      "Admin screens to add, edit and delete universities, institutes and theses",
      "Detail pages with full abstract view"
    ],
    results: [
      { value: "6", label: "related tables linked by foreign keys" },
      { value: "2", label: "roles: author and supervisor" }
    ],
    stack: ["Swift", "SwiftUI", "Role-based access", "CRUD", "Relational database design"],
    arch: {
      type: "image",
      src: "images/thesis/thesis-er.png",
      alt: "Entity relationship diagram with Users, Thesis, Universities, Institutes, Topic and Type tables",
      caption: "Entity relationship diagram"
    },
    gallery: {
      type: "phone",
      items: [
        { src: "images/thesis/thesis-panel.jpg", caption: "Thesis panel", alt: "Thesis list with search" },
        { src: "images/thesis/thesis-detail.jpg", caption: "Thesis details", alt: "Thesis detail page" },
        { src: "images/thesis/thesis-search.jpg", caption: "Advanced search", alt: "Advanced search with filters" },
        { src: "images/thesis/thesis-add.jpg", caption: "Submit a thesis", alt: "Form to submit a new thesis" },
        { src: "images/thesis/thesis-supervisor.jpg", caption: "Supervisor profile", alt: "Supervisor profile" },
        { src: "images/thesis/thesis-pending.jpg", caption: "Pending approvals", alt: "List of theses waiting for approval" },
        { src: "images/thesis/thesis-approve.jpg", caption: "Approve or reject", alt: "Approve or reject a thesis" },
        { src: "images/thesis/thesis-universities.jpg", caption: "Manage universities", alt: "Editing the university list" }
      ]
    }
  },

  {
    id: "coinapp",
    title: "CoinApp",
    category: "mobile",
    size: "tall",
    tint: "blue",
    badges: ["Side project"],
    tagline: "A crypto market tracker with live prices from a public API.",
    summary: "Each coin's rank, price and 24-hour change, with search, refresh, favourites and a three-tab layout.",
    visual: { type: "phones", imgs: ["images/fun/coin-market3.jpg"] },
    overview: "A crypto market tracker that pulls live prices from a public API. It shows each coin's rank, current price and 24-hour change, with search, a refresh button, favourites and a tab bar for market, favourites and profile.",
    problem: "Built in my free time to try new ideas in Swift, here with live data from a public API.",
    built: [
      "Live prices from a public API",
      "Rank, current price and 24-hour change for each coin",
      "Search and a refresh button",
      "Favourites, and a tab bar for market, favourites and profile"
    ],
    stack: ["Swift", "REST API"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/fun/coin-market3.jpg", caption: "Live market", alt: "Top coins led by Bitcoin" },
        { src: "images/fun/coin-market2.jpg", caption: "Coin list", alt: "Scrolling through the coin list" },
        { src: "images/fun/coin-market.jpg", caption: "Price changes", alt: "More coins with price changes" },
        { src: "images/fun/coin-login.jpg", caption: "Sign in", alt: "Login screen" }
      ]
    }
  },

  {
    id: "spinverse",
    title: "SpinVerse",
    category: "games",
    size: "tall",
    tint: "lavender",
    badges: ["iOS party game"],
    platform: "iOS · Swift",
    tagline: "12 wheel games in one app, for friends, couples, teams or just you.",
    summary: "Party, team, couple and solo games that all run on a spinning wheel. Can't decide? The wheel picks the game too.",
    visual: { type: "phones", imgs: ["images/games/spinverse-home.jpg", "images/games/spinverse-act.jpg", "images/games/spinverse-penalty.jpg"] },
    overview: "SpinVerse collects 12 wheel-based games in one app: Decide For Me, Who's It?, Spill It, Fortune Points, Act It Out, Penalty Spin, Story Spinner, Daily Quest, Today's Fortune, Mood Mixer, Couple Quests and Party Rules (18+). Each game is tagged with who it's for, from solo to teams. If nobody can choose, the home screen wheel picks a game.",
    problem: "Built in my free time to bring all my wheel game ideas into one app, with one shared wheel that each game styles and rules its own way.",
    built: [
      "12 games, each tagged by audience: Anyone, Solo, Couples, Groups, Teams, 2–6 or 3+ players, 18+",
      "A Surprise me wheel on the home screen that picks a game for you",
      "Act It Out: two teams, a 30, 60 or 90 second timer and challenges like Describe, Draw, Mime, One Word and Sounds",
      "Penalty Spin: the loser of the last game spins for a forfeit",
      "Who's It?: add 2 to 12 players, or try it with sample names",
      "Sound and haptics toggles"
    ],
    mechanics: [
      "Pick a game, or let the home wheel choose one",
      "Tap the centre button to spin",
      "Follow what the wheel lands on: a question, a challenge, a forfeit or a player",
      "Keep score in team games and pass the phone"
    ],
    results: [{ value: "12", label: "wheel games in one app" }],
    stack: ["Swift"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/games/spinverse-home.jpg", caption: "Home: let the wheel pick", alt: "SpinVerse home with a wheel of game icons and a Surprise me button" },
        { src: "images/games/spinverse-games.jpg", caption: "All 12 games", alt: "Grid of game cards with audience tags" },
        { src: "images/games/spinverse-act.jpg", caption: "Act It Out", alt: "Act It Out wheel with two team scores and a timer choice" },
        { src: "images/games/spinverse-penalty.jpg", caption: "Penalty Spin", alt: "Penalty Spin wheel with forfeits such as sing, dance and act" },
        { src: "images/games/spinverse-whosit.jpg", caption: "Who's It?", alt: "Who's It wheel with a field to add players" }
      ]
    }
  },

  {
    id: "splash-fairies",
    title: "Splash Fairies",
    category: "games",
    size: "small",
    tint: "pink",
    badges: ["iOS game"],
    platform: "iOS · Swift",
    tagline: "Pop water balloons with needles and fill the fairy fountain.",
    summary: "Aim needles at water balloons; same colours pop together and the water goes to the fairies. Levels never end.",
    visual: { type: "phones", imgs: ["images/games/splash-home.jpg"] },
    overview: "A balloon-popping puzzle game for iOS, my own idea, built in Swift and in English. You shoot needles from a pincushion at a wall of water balloons. Balloons of the same colour pop together, the water they release fills the fairies' jar, and the fairies cheer you on as you level up. Levels go on without end.",
    problem: "Built to turn a simple idea into a full, polished mobile game, with power-ups, special balloons, sound and music.",
    built: [
      "Aim with a guide line and shoot needles from the pincushion, with a limited needle count per level",
      "Same-colour neighbours pop together for chain pops and score popups",
      "Special balloons: frozen ice balloons, bomb balloons and star balloons that award stars",
      "Five power-ups, including a Rainbow Needle that pops every balloon of the colour it hits",
      "A water jar that fills from popped balloons, with three water fairies on the fountain",
      "Endless levels, stars and water drops to collect, with sound and music toggles"
    ],
    mechanics: [
      "Drag to aim, release to throw a needle",
      "Hit a balloon to pop it and every same-colour balloon touching it",
      "Use power-ups for big combo pops",
      "Fill the fairy jar before you run out of needles"
    ],
    stack: ["Swift"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/games/splash-home.jpg", caption: "Home screen", alt: "Splash Fairies home with three fairies and a play button" },
        { src: "images/games/splash-same.jpg", caption: "Same colours pop together", alt: "Level 27 start with a hint that same colours pop together" },
        { src: "images/games/splash-aim.jpg", caption: "Aiming a needle", alt: "Aim guide line from the pincushion to a red balloon" },
        { src: "images/games/splash-pop.jpg", caption: "Chain pop", alt: "A cluster of balloons popping with a +60 score popup" },
        { src: "images/games/splash-star.jpg", caption: "Star balloon", alt: "Star balloon popped with a lightning effect" },
        { src: "images/games/splash-rainbow.jpg", caption: "Rainbow Needle power-up", alt: "Rainbow needle clearing balloons of one colour" }
      ]
    }
  },

  {
    id: "last-time",
    title: "Last time.",
    category: "mobile",
    size: "small",
    tint: "pink",
    badges: ["iOS app"],
    tagline: "When did you last…? Track the little things you always forget.",
    summary: "Log when you last watered the plants or changed the sheets, and get reminded when it's due.",
    visual: { type: "phones", imgs: ["images/apps/lasttime-home.jpg"] },
    overview: "A small iOS app for the things you do every so often and never remember: watering the plants, changing the bed sheets, calling mom, a new toothbrush, a haircut. Tap a suggestion to start or add your own, and the app keeps track of when you last did it.",
    problem: "Built in my free time for a question everyone asks themselves: when did I last do this?",
    built: [
      "Starter suggestions to add with one tap, such as Water the plants, Call mom and Back up my phone",
      "Add your own thing with a name, one of 32 icons and one of 6 colours, with a live preview",
      "Optional reminder interval, from daily to every 6 months, or no goal for just tracking",
      "Set when you last did it, by date and time"
    ],
    stack: ["Swift"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/apps/lasttime-home.jpg", caption: "Start: when did you last…?", alt: "Last time home screen with suggestions like Water the plants and Call mom" },
        { src: "images/apps/lasttime-new.jpg", caption: "Add a new thing", alt: "New thing sheet with a preview, a name field and an icon picker" },
        { src: "images/apps/lasttime-remind.jpg", caption: "Colour, reminder and last done", alt: "Colour choice, reminder intervals and last done date and time" }
      ]
    }
  },

  {
    id: "iot-ios-nda",
    title: "iOS App for IoT Devices",
    category: "mobile",
    size: "small",
    tint: "neutral",
    badges: ["Under NDA"],
    tagline: "Professional work as an iOS developer. Screens and code stay private under a confidentiality agreement.",
    summary: "SwiftUI app built from scratch, talking to IoT devices over Bluetooth Low Energy.",
    visual: { type: "ble" },
    overview: "Professional work as an iOS developer. Screens and code can't be shared because of a confidentiality agreement.",
    role: "iOS developer, working with the hardware and backend teams.",
    built: [
      "Built a SwiftUI iOS app from scratch using MVVM architecture",
      "Implemented Bluetooth Low Energy (BLE) for real-time communication with IoT devices",
      "Designed the interfaces and flows for device discovery, pairing and data sync",
      "Worked with hardware and backend teams to turn product requirements into features and ship stable releases"
    ],
    stack: ["Swift", "SwiftUI", "MVVM", "CoreBluetooth (BLE)", "IoT"],
    note: "I can walk through my approach and the technical challenges in an interview, without sharing confidential details."
  },

  {
    id: "gurocak-hukuk",
    title: "Gürocak Hukuk Bürosu website",
    category: "web",
    size: "small",
    tint: "neutral",
    badges: ["Live site"],
    tagline: "A website for a law firm in Turkish and English: the lawyer, practice areas, values and contact with a map.",
    summary: "Designed and built for my father's law firm, in Turkish and English. Also hosts my Uzlaştırma tool.",
    visual: { type: "browser", imgs: ["images/other/law-home.jpg"] },
    overview: "A website I designed and built for my father's law firm. It introduces the lawyer and the firm, lists the practice areas, sets out how the firm works with clients and has a contact section with an embedded Google Map. The site is in Turkish and English, and it hosts the Uzlaştırma Belge Oluşturucu at /uzlastirma/.",
    role: "Design and build.",
    built: [
      "Turkish and English versions with a TR / EN switch",
      "Home and about sections introducing the lawyer and the firm",
      "Values section and a grid of practice areas",
      "Contact section with phone, e-mail, address and an embedded Google Map",
      "Hosts my Uzlaştırma Belge Oluşturucu, linked from the site"
    ],
    stack: ["HTML", "CSS", "Google Maps embed"],
    links: [
      { label: "Visit gurocakhukuk.com.tr", url: "https://gurocakhukuk.com.tr", kind: "live" }
    ],
    gallery: {
      type: "browser",
      items: [
        { src: "images/other/law-home.jpg", caption: "Home", alt: "Law firm website home section with a gold scale of justice" },
        { src: "images/other/law-about.jpg", caption: "About", alt: "About section introducing Av. Yılmaz Gürocak" },
        { src: "images/other/law-values.jpg", caption: "Values", alt: "Quote and four working principles of the firm" },
        { src: "images/other/law-areas.jpg", caption: "Practice areas", alt: "Grid of practice areas such as commercial, criminal and labour law" },
        { src: "images/other/law-contact.jpg", caption: "Contact and map", alt: "Contact details with an embedded map" }
      ]
    }
  },

  /* ===================== COMPUTER VISION ===================== */
  {
    id: "vision-assistant",
    title: "Vision Assistant for Visually Impaired People",
    category: "cv",
    size: "small",
    tint: "blue",
    badges: [],
    tagline: "Real-time object detection that describes the street out loud.",
    summary: "YOLOv5 detects what's ahead; the app warns about obstacles and reads traffic lights out loud.",
    visual: { type: "vision" },
    overview: "Detects objects in real time and describes the surroundings through speech. It warns about obstacles ahead and reads traffic lights, so users can walk more safely.",
    problem: "Help visually impaired people walk more safely by turning what a camera sees into spoken warnings.",
    built: [
      "Detects objects in real time and describes the surroundings through speech",
      "Warns about obstacles ahead and reads traffic lights"
    ],
    stack: ["Python", "YOLOv5", "Computer vision", "Text-to-speech"],
    arch: {
      type: "flow",
      caption: "From camera frame to spoken warning",
      nodes: [
        { title: "See", text: "Real-time camera frames" },
        { title: "Detect", text: "YOLOv5 object detection" },
        { title: "Decide", text: "Obstacles ahead, traffic light state" },
        { title: "Speak", text: "Text-to-speech description" }
      ]
    },
    visualNote: "Illustration. No screenshots are available for this project."
  },

  /* ===================== GAMES ===================== */
  {
    id: "dont-poop-on-me",
    title: "Don't Poop On Me!",
    category: "games",
    size: "small",
    tint: "sky",
    badges: ["iOS game"],
    platform: "iOS · Swift",
    tagline: "An arcade dodging game. Escape the seagulls and beat your best score.",
    summary: "Move left and right to escape the seagulls. Pick a character or play as a photo from your gallery.",
    visual: { type: "landscape", imgs: ["images/fun/poop-play.jpg"] },
    overview: "An arcade dodging game. Move left and right to escape the seagulls and beat your best score. Players can pick a boy or girl character, or use a photo from their gallery.",
    problem: "Built in my free time to try new ideas, animations and game mechanics in Swift.",
    built: [
      "Left and right movement to dodge the seagulls",
      "Score and best score",
      "Character selection: boy, girl or a photo from the gallery"
    ],
    mechanics: [
      "Move left and right with the on-screen arrows",
      "Escape the seagulls overhead",
      "Beat your best score",
      "Play as a boy, a girl or a photo from your gallery"
    ],
    stack: ["Swift"],
    gallery: {
      type: "landscape",
      items: [
        { src: "images/fun/poop-menu.jpg", caption: "Main menu", alt: "Main menu" },
        { src: "images/fun/poop-play.jpg", caption: "Gameplay", alt: "Gameplay with seagulls" },
        { src: "images/fun/poop-character.jpg", caption: "Choose a character", alt: "Character selection" },
        { src: "images/fun/poop-over.jpg", caption: "Game over", alt: "Game over screen" }
      ]
    }
  },

  {
    id: "dont-burn-me",
    title: "Don't Burn Me!",
    category: "games",
    size: "small",
    tint: "night",
    badges: ["iOS game"],
    platform: "iOS · Swift",
    tagline: "A night-city version of the dodging game.",
    summary: "Falling meteors, score popups and a saved high score.",
    visual: { type: "landscape", imgs: ["images/fun/burn-play.jpg"] },
    overview: "A night-city version of the dodging game, with falling meteors, score popups and a saved high score.",
    problem: "Built in my free time to try new ideas, animations and game mechanics in Swift.",
    built: [
      "Falling meteors, with more on screen as the game goes on",
      "Score popups",
      "High score saved between sessions"
    ],
    mechanics: [
      "Dodge the meteors falling over the night city",
      "Score popups show your progress",
      "Beat your saved high score"
    ],
    stack: ["Swift"],
    gallery: {
      type: "landscape",
      items: [
        { src: "images/fun/burn-menu.jpg", caption: "Main menu", alt: "Main menu" },
        { src: "images/fun/burn-play.jpg", caption: "Gameplay", alt: "Dodging falling meteors" },
        { src: "images/fun/burn-play2.jpg", caption: "Getting harder", alt: "More meteors on screen" },
        { src: "images/fun/burn-over.jpg", caption: "Game over", alt: "Game over with best score" }
      ]
    }
  },

  {
    id: "cosmic-odyssey",
    title: "Cosmic Odyssey",
    category: "games",
    size: "small",
    tint: "night",
    badges: ["Browser game"],
    platform: "Browser · HTML and CSS",
    tagline: "A story-driven browser puzzle game across the galaxy.",
    summary: "Find your missing brother planet by planet. Each world has its own puzzle.",
    visual: { type: "landscape", imgs: ["images/fun/cosmic-crystals.jpg"] },
    overview: "A story-driven browser puzzle game. You travel across the galaxy to find your missing brother, and each planet has its own challenge, like unscrambling a cosmic word or matching crystal pairs. Solving it earns energy crystals and a new clue.",
    problem: "A free-time project to try story-driven puzzle mechanics, built for the browser with HTML and CSS.",
    built: [
      "Story intro and mission flow",
      "A different puzzle on each planet: word cipher, crystal matching",
      "Energy crystal rewards and clues after each puzzle"
    ],
    mechanics: [
      "Travel from planet to planet to find your brother",
      "Unscramble cosmic words",
      "Match crystal pairs from memory",
      "Earn energy crystals and a new clue for each solved planet"
    ],
    stack: ["HTML", "CSS"],
    gallery: {
      type: "browser",
      items: [
        { src: "images/fun/cosmic-story.jpg", caption: "Story intro", alt: "Story intro screen" },
        { src: "images/fun/cosmic-cipher.jpg", caption: "Word cipher", alt: "Word cipher puzzle on planet Cryptus Prime" },
        { src: "images/fun/cosmic-crystals.jpg", caption: "Crystal matching", alt: "Crystal matching memory game on planet Gemara Nova" },
        { src: "images/fun/cosmic-complete.jpg", caption: "Mission complete", alt: "Mission complete screen with reward" }
      ]
    }
  },

  {
    id: "sor-bakalim",
    title: "Sor Bakalım",
    category: "games",
    size: "small",
    tint: "lavender",
    badges: ["iOS party game"],
    platform: "iOS · Swift",
    tagline: "A spin-the-wheel question game for friends and couples.",
    summary: "Spin, answer honestly, pass the phone. 500+ questions, with an optional bold mode.",
    visual: { type: "phones", imgs: ["images/fun/sorbakalim-wheel.jpg"] },
    overview: "A spin-the-wheel question game for friends and couples. Spin, answer honestly, pass the phone. 500+ questions, with an optional bold mode.",
    problem: "Built in my free time to try new ideas, animations and game mechanics in Swift.",
    built: [
      "Spinning question wheel",
      "500+ questions",
      "Optional bold mode"
    ],
    mechanics: [
      "Spin the wheel",
      "Answer the question honestly",
      "Pass the phone to the next player",
      "Switch on bold mode if the group is up for it"
    ],
    results: [{ value: "500+", label: "questions" }],
    stack: ["Swift"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/fun/sorbakalim-wheel.jpg", caption: "Spin the wheel", alt: "Question wheel before spinning" },
        { src: "images/fun/sorbakalim-question.jpg", caption: "Question card", alt: "A question card after spinning" }
      ]
    }
  },

  {
    id: "bugun-nasil-gececek",
    title: "Bugünün Nasıl Geçecek?",
    category: "games",
    size: "small",
    tint: "pink",
    badges: ["iOS app"],
    platform: "iOS · Swift",
    tagline: "A playful daily fortune wheel.",
    summary: "Tap the wheel and get a light-hearted message about your day.",
    visual: { type: "phones", imgs: ["images/fun/bugun-wheel.jpg"] },
    overview: "A playful daily fortune wheel. Tap the wheel and get a light-hearted message about your day.",
    problem: "Built in my free time to try new ideas, animations and game mechanics in Swift.",
    built: [
      "Animated fortune wheel",
      "A light-hearted daily message after each spin"
    ],
    mechanics: [
      "Tap the wheel to spin it",
      "Read your message for the day"
    ],
    stack: ["Swift"],
    gallery: {
      type: "phone",
      items: [
        { src: "images/fun/bugun-wheel.jpg", caption: "Tap to spin", alt: "Pink fortune wheel" },
        { src: "images/fun/bugun-result.jpg", caption: "Daily message", alt: "Daily message after spinning" }
      ]
    }
  },

  /* ===================== OTHER ===================== */
  {
    id: "kaggle",
    title: "Machine learning and Kaggle",
    category: "other",
    size: "small",
    tint: "lavender",
    badges: ["Competitions"],
    tagline: "Machine learning and deep learning models on real datasets.",
    summary: "Took part in Kaggle competitions: model building, deep learning and data analysis.",
    visual: { type: "text", glyph: "ml" },
    overview: "Took part in Kaggle competitions, building machine learning and deep learning models and doing data analysis on real datasets.",
    stack: ["PyTorch", "TensorFlow", "XGBoost", "scikit-learn", "pandas"]
  },

  {
    id: "kotlin-android",
    title: "Android versions in Kotlin",
    category: "other",
    size: "small",
    tint: "blue",
    badges: ["Cross-platform"],
    tagline: "Swift apps rebuilt as native Android apps.",
    summary: "Rebuilt some of my Swift apps for Android, keeping the same features and design on both platforms.",
    visual: { type: "text", glyph: "kotlin" },
    overview: "Rebuilt some of my Swift apps as native Android apps, keeping the same features and design on both platforms.",
    stack: ["Kotlin", "Jetpack Compose", "Android Studio"]
  }
];

/* Mobile apps shown in the App Playground, in order */
window.APP_PLAYGROUND = ["safemap", "smart-pet-feeder", "school-management", "last-time", "thesis-management", "coinapp"];

/* Games shown in the Arcade, in order */
window.ARCADE = ["seagull-pier", "mesai-survivors", "vapura-yetistir", "splash-fairies", "spinverse", "dont-poop-on-me", "dont-burn-me", "street-rush", "cosmic-odyssey", "sor-bakalim", "bugun-nasil-gececek"];

/*
  Tech map. Each name is matched against project stacks.
  "also" lists other stack names that count as the same technology.
*/
window.TECH_MAP = [
  { group: "AI & machine learning", items: [
    { name: "PyTorch" }, { name: "TensorFlow" }, { name: "scikit-learn" }, { name: "XGBoost" },
    { name: "pandas" }, { name: "Google Colab" }, { name: "d3.js" }
  ]},
  { group: "NLP & LLM", items: [
    { name: "Hugging Face Transformers" }, { name: "mT5-small", label: "mT5 fine-tuning" },
    { name: "Qwen2.5-7B" }, { name: "Few-shot prompting" }, { name: "LLM evaluation" },
    { name: "Information extraction" }, { name: "NER" }, { name: "RAG" },
    { name: "LLM red-teaming" }, { name: "OWASP LLM Top 10" }, { name: "Anthropic API" }, { name: "Ollama" },
    { name: "BeautifulSoup" }, { name: "pdfplumber" }, { name: "Regular expressions" }
  ]},
  { group: "Mobile & games", items: [
    { name: "Unity" }, { name: "C#" },
    { name: "Swift" }, { name: "SwiftUI" }, { name: "UIKit" }, { name: "MVVM" },
    { name: "Kotlin" }, { name: "Jetpack Compose" }, { name: "Java" }, { name: "Xcode" },
    { name: "Android Studio" }, { name: "MapKit" }, { name: "CoreBluetooth (BLE)", label: "Bluetooth Low Energy" },
    { name: "Localization" }, { name: "TestFlight" }, { name: "App Store release" }
  ]},
  { group: "Backend, APIs & web", items: [
    { name: "Python" }, { name: "FastAPI" }, { name: "Node.js" }, { name: "Express" },
    { name: "Django" }, { name: "REST API", label: "REST" }, { name: "GraphQL" },
    { name: "Firebase", also: ["Firebase Auth", "Firebase Storage"] },
    { name: "Streamlit" }, { name: "Render" }, { name: "Cloudinary" }, { name: "asyncio" }, { name: "httpx" }, { name: "Jinja2" },
    { name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }
  ]},
  { group: "Databases", items: [
    { name: "SQL", also: ["Relational database design"] }, { name: "PostgreSQL" }, { name: "MySQL" },
    { name: "MongoDB" }, { name: "Firestore" }, { name: "Relational database design", label: "Schema design" }
  ]},
  { group: "Computer vision", items: [
    { name: "YOLOv5" }, { name: "Computer vision", label: "Real-time detection" }, { name: "Text-to-speech" }
  ]},
  { group: "Cloud & DevOps", items: [
    { name: "Docker" }, { name: "GitHub Actions" }, { name: "GitLab CI/CD" }, { name: "Jenkins" },
    { name: "Git" }, { name: "AWS" }, { name: "GCP" }, { name: "GitHub Pages" }
  ]},
  { group: "Testing & automation", items: [
    { name: "pytest" }, { name: "ruff" }, { name: "Selenium" }, { name: "Appium" }, { name: "Postman" },
    { name: "API and regression testing" }
  ]}
];

/*
  Real numbers from the Player Feedback Radar dashboard (complaint map, 2026-10-12).
  Each value: negative reviews about that topic as a share of all the game's reviews (%).
*/
window.PFR_DATA = {
  games: [
    { name: "Royal Match", studio: "Dream Games", store: 4.68, written: 3.01, reviews: 2000, negative: 58.7, churn: 5.9 },
    { name: "Toon Blast", studio: "Peak", store: 4.71, written: 3.44, reviews: 1700, negative: 52.6, churn: 6.8 },
    { name: "Word Tiles GO", studio: "Gulliver's Games", store: 4.74, written: 3.08, reviews: 199, negative: 61.3, churn: 15.1 },
    { name: "Color Block Jam", studio: "Rollic", store: 4.56, written: 2.25, reviews: 1505, negative: 83.5, churn: 17.0 }
  ],
  topics: [
    { name: "Monetization",        values: [26.9, 27.1, 9.5, 27.4] },
    { name: "In-game ads",         values: [3.5, 5.1, 47.2, 25.8] },
    { name: "Difficulty",          values: [21.4, 21.9, 0, 30.6] },
    { name: "Bugs / performance",  values: [4.8, 9.8, 7.5, 23.9] },
    { name: "UI / UX",             values: [5.3, 7.6, 4.5, 13.2] },
    { name: "Not what the ads show", values: [15.7, 1.4, 1.0, 2.9] },
    { name: "Content",             values: [7.7, 4.1, 3.5, 4.6] },
    { name: "Feature requests",    values: [1.9, 2.9, 5.0, 3.9] },
    { name: "Social / PvP",        values: [1.8, 2.1, 6.0, 0.4] },
    { name: "Lives / waiting",     values: [0.4, 0.8, 0, 2.2] },
    { name: "Rewarded ads",        values: [0.4, 0.9, 0, 0.9] },
    { name: "Events",              values: [0.8, 1.2, 0, 0.2] }
  ]
};

/* PromptProbe: DemoBot scans from the project README and sample report (41 attacks x 6 mutators = 181 cases) */
window.PROMPTPROBE_DATA = {
  levels: [
    { short: "No defense", defense: "none.", asr: 100, risk: 100, grade: "F" },
    { short: "English blocklist", defense: "English keyword blocklist on the raw input.", asr: 93.9, risk: 93.2, grade: "F" },
    { short: "EN+TR blocklist", defense: "normalized English and Turkish blocklist, plus an output filter for the plain-text secret.", asr: 14.4, risk: 22.2, grade: "C" },
    { short: "Full screening", defense: "whole-conversation screening, indirect-injection heuristics and an output filter that also catches encoded leaks.", asr: 0, risk: 0, grade: "A" }
  ],
  mutators: [
    { label: "Base64", value: 35.7 },
    { label: "Plain (no mutator)", value: 19.5 },
    { label: "Leetspeak", value: 7.1 },
    { label: "Homoglyph", value: 7.1 },
    { label: "Zero-width", value: 7.1 },
    { label: "Payload split", value: 7.1 }
  ],
  categories: [
    { label: "Multi-turn", value: 66.7 },
    { label: "Indirect injection", value: 60 },
    { label: "Prompt & secret leak", value: 26.2 },
    { label: "Obfuscation", value: 20 },
    { label: "Direct override", value: 16.7 },
    { label: "Role-play", value: 6.7 },
    { label: "Turkish-language", value: 2.8 },
    { label: "Delimiter confusion", value: 0 }
  ]
};
