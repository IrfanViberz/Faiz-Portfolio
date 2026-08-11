import type { ExperienceItem, ValueItem, ProjectItem, N8nWorkflowItem } from '@/types';

export const obsessionsList: string[] = [
  'Exploring Google Flow for TikTok AI UGC automation...',
  'Analyzing ROAS metrics across Facebook & Shopee Ad campaigns...',
  'Diagnosing & repairing second-hand motherboard logic...',
  'Architecting high-concurrency Angular data tables...',
];

export const valueItems: ValueItem[] = [
  {
    title: 'Revenue & Scale Focused',
    desc: "Code doesn't matter if nobody uses it. I understand both high-concurrency backend architecture and the marketing funnels required to acquire users.",
  },
  {
    title: 'Aggressive Learner',
    desc: 'Technology moves too fast to wait for tutorials. I actively reverse-engineer systems, test AI potentials, and pull apart hardware to understand the full stack.',
  },
  {
    title: 'Production-Ready Execution',
    desc: 'Proven experience shipping code in highly regulated environments (Healthcare/Logistics). I write clean, maintainable, and scalable architecture.',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    period: '2025 — 2026',
    company: 'Bugz Studio SDN BHD',
    projects: [
      {
        title: 'Rest N Go (RNG) Ecosystem',
        role: 'Mobile App & Admin Architecture',
        description:
          'Led the UI/UX redesign and core feature implementation, integrating hardware-level QR scanners. Engineered a robust Angular-based admin portal for centralized promotion management.',
        impact:
          'Enhanced overall user experience by delivering a more intuitive and visually refined interface, improving platform usability for customers and internal teams. Strengthened operational efficiency by streamlining promotion management workflows and ensuring more accurate transaction data representation.',
        tags: ['Ionic', 'Angular', 'TypeScript', 'Flutter'],
      },
      {
        title: 'Ekajaya Cement Distribution',
        role: 'Logistics Frontend Module',
        description:
          'Architected core frontend modules and dynamic document generation utilizing Stimulsoft for specialized reporting.',
        impact:
          'Improved operational scalability by designing a structured frontend architecture capable of handling complex order workflows and large-scale distribution operations. Increased reporting efficiency by implementing dynamic document generation, enabling faster access to accurate business insights.',
        tags: ['Angular', 'Stimulsoft', 'High-Concurrency'],
      },
      {
        title: 'UMSC Q-Care & Doctor Portal',
        role: 'Patient & Doctor Facing Applications',
        description:
          'Developed comprehensive patient and doctor dashboards seamlessly integrated with highly regulated healthcare backends.',
        impact:
          'Improved healthcare service accessibility by developing streamlined patient and doctor workflows, reducing friction in appointment-related processes. Enhanced operational efficiency through automation of insurance-related queries, allowing users to access important information faster.',
        tags: ['NestJS', 'Angular', 'Stimulsoft', 'Healthcare compliance'],
      },
    ],
  },
];

export const stackItems = [
  {
    iconName: 'Terminal' as const,
    title: 'Languages',
    text: 'JavaScript, TypeScript, HTML5, CSS3, SQL',
  },
  {
    iconName: 'Smartphone' as const,
    title: 'Frontend & Mobile',
    text: 'Angular, Ionic, Flutter, Next.js, RxJS',
  },
  {
    iconName: 'Database' as const,
    title: 'Backend & Databases',
    text: 'NestJS, Node.js, MySQL, Firebase',
  },
  {
    iconName: 'Activity' as const,
    title: 'Growth & Tools',
    text: 'Meta/TikTok/Shopee Ads, Git, Android Studio, Stimulsoft',
  },
];

export const webProjects: ProjectItem[] = [
  {
    title: 'Teacher Hub — Lesson Plan & Timetable Management',
    subtitle: 'Teacher Management & Lesson Portal',
    statusTag: 'Project Demo',
    icon: 'GraduationCap',
    image: '/projects/teacher-hub.png',
    description:
      'A comprehensive teacher portal and school management platform designed for educators to manage lesson plans, view timetables, track student attendance, and monitor weekly duties. Features a Principal module for clash-free automated timetable generation across faculty, as well as 1-click lesson plan form auto-generation (built to scale into AI-driven generation).',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Lesson Plan Automation', 'School Management'],
    link: 'https://kise-testin-env.netlify.app/',
  },
  {
    title: 'MenuCraft (CiptaMenu) — SaaS Menu & QR Generator',
    subtitle: 'Bilingual SaaS Menu Builder & QR Platform',
    statusTag: 'Project Demo',
    icon: 'QrCode',
    image: '/projects/menucraft.png',
    description:
      'A modern SaaS platform that empowers restaurants, cafés, food stalls, and bakeries to generate professional digital, printable (PNG/PDF), and QR-code menus instantly without design software like Canva or Adobe. Features bilingual support (BM & EN), dynamic menu building, template customization, and business profile management built with Next.js, NestJS, Tailwind CSS, and PostgreSQL.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'SaaS'],
    link: 'https://ciptamenu.netlify.app/ms/dashboard',
  },
  {
    title: 'Kelantan Bites — Food & Event Discovery Platform',
    subtitle: 'Food Hunting & Local Event Finder',
    statusTag: 'Project Demo',
    icon: 'UtensilsCrossed',
    image: '/projects/kelantan-bites.png',
    description:
      'A food hunting and culinary discovery web platform for exploring top places to eat and upcoming food events in Kelantan. Features curated eatery directories, food event listings, and location-based food exploration built with Next.js, NestJS, and PostgreSQL.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Food Discovery'],
    link: 'https://kebibites.netlify.app/',
  },
  {
    title: 'Burger Grill Anak Muda — WhatsApp Direct Ordering System',
    subtitle: 'F&B Digital Menu & WhatsApp Direct Checkout',
    statusTag: 'Project Demo',
    icon: 'Flame',
    image: '/projects/burger-grill.png',
    description:
      'A streamlined e-commerce landing page built for local burger sellers to simplify customer ordering. Customers browse the menu, add items to cart, specify pickup time and contact details, and submit—automatically formatting the complete order and redirecting directly to the seller’s WhatsApp for instant fulfillment.',
    tags: ['Next.js', 'JavaScript', 'CSS3', 'WhatsApp Order Flow', 'F&B E-Commerce'],
    link: 'https://burgergrillanakmuda.netlify.app/',
  },
  {
    title: 'StealthX Performance — Workshop & Dyno Booking Platform',
    subtitle: 'Automotive Tuning & Dyno Booking Portal',
    statusTag: 'Finished Project',
    icon: 'Gauge',
    image: '/projects/stealthx.png',
    description:
      'A modern automotive workshop showcase and online booking platform built for high-performance car tuning centers during my internship. Features workshop service catalogs, custom Dyno tuning session scheduling, real-time booking management, and service showcase.',
    tags: ['Next.js', 'PostgreSQL', 'TypeScript', 'PHP', 'Blade', 'Workshop Booking'],
    link: 'https://stealthxperformance.netlify.app/',
  },
];

export const n8nWorkflows: N8nWorkflowItem[] = [
  {
    id: 'whatsapp-ai-support-bot',
    title: 'WhatsApp AI Support Bot with Human Handoff',
    subtitle: 'WhatsApp Cloud API + Claude Sonnet + FAQ Base + Telegram Alert',
    description:
      'An intelligent customer support bot built in n8n that auto-replies to customer WhatsApp messages using an FAQ knowledge base & conversation memory. Automatically detects when a request is out of scope, sensitive, or requires human intervention (refunds, cancellations, frustrated users), triggers a human takeover state, alerts the support team on Telegram with customer details, and goes silent so a human agent can seamlessly take over.',
    schedule: 'Event Trigger (WhatsApp Webhook)',
    nodesUsed: [
      'WhatsApp Trigger',
      'Normalize Code Node',
      'Google Sheets (Chat State & FAQ)',
      'Claude Sonnet LLM',
      'Buffer Window Memory',
      'LangChain Agent',
      'Telegram Alert Bot',
      'WhatsApp API',
    ],
    tags: ['n8n', 'WhatsApp API', 'Claude Sonnet', 'Human Handoff', 'Telegram', 'LangChain'],
    image: '/workflows/whatsapp-ai-support-bot-workflow.png',
    jsonPath: '/workflows/whatsapp-ai-support-bot.json',
  },
  {
    id: 'n8n-node-cheat-sheet',
    title: 'n8n Node Cheat Sheet (Visual Reference Workflow)',
    subtitle: '17 Core Nodes + Plain-English Explanations',
    description:
      'A visual reference guide detailing 17 of the most essential n8n nodes across Triggers, Actions, Logic, and AI capabilities. Each node is paired with a sticky note explaining its exact function in plain English. Built for quick lookups, developer reference, and team/client onboarding.',
    schedule: 'Reference Guide (Non-Executable Workflow)',
    nodesUsed: [
      'Triggers (Webhook, Schedule, Manual)',
      'Actions (HTTP Request, Code, Set)',
      'Logic (IF, Switch, Merge, Loop, Wait)',
      'AI & LangChain (AI Agent, LLM, Memory, Tool)',
      'Integrations (Telegram, Gmail, Sheets)',
    ],
    tags: ['n8n', 'Cheat Sheet', 'Reference', 'Documentation', 'LangChain', 'Node Guide'],
    image: '/workflows/n8n-node-cheat-sheet-workflow.png',
    jsonPath: '/workflows/n8n-node-cheat-sheet.json',
  },
  {
    id: 'youtube-automation',
    title: 'Autonomous YouTube Shorts Video Generation Pipeline',
    subtitle: 'GPT-4o + ElevenLabs + Flux AI + Creatomate + YouTube API',
    description:
      'An end-to-end automated YouTube Shorts creation & publishing pipeline. Generates punchy video scripts with GPT-4o, synthesizes high-quality voiceovers with ElevenLabs, renders 9:16 AI visuals using Replicate/Flux, stitches audio/visual layers dynamically via Creatomate API, uploads the final video to YouTube, and dispatches a notification to Slack.',
    schedule: 'Daily at 9:00 AM (Cron: 0 9 * * *)',
    nodesUsed: [
      'Cron Trigger',
      'OpenAI GPT-4o',
      'ElevenLabs TTS',
      'Replicate/Flux AI',
      'Google Drive API',
      'Creatomate Video Renderer',
      'YouTube Data API',
      'Slack Bot',
    ],
    tags: ['n8n', 'GPT-4o', 'ElevenLabs', 'Flux AI', 'Creatomate', 'YouTube API', 'Slack'],
    image: '/workflows/youtube-automation-workflow.png',
    jsonPath: '/workflows/youtube-automation.json',
  },
  {
    id: 'email-reader-telegram',
    title: 'Automated Daily Email Reader & AI Telegram Digest',
    subtitle: 'Gmail + Ollama LLM + Telegram Bot Workflow',
    description:
      'A scheduled cron workflow that fetches unread/last 24h emails from Gmail, combines email headers & snippets into a single context payload, routes them through a local Ollama AI Agent to generate key takeaways, and dispatches a structured Markdown digest to Telegram.',
    schedule: 'Daily at 10:00 AM (Cron: 0 10 * * *)',
    nodesUsed: [
      'Cron Trigger',
      'Gmail API',
      'JS Code Transformer',
      'IF Condition',
      'Ollama Chat LLM',
      'LangChain AI Agent',
      'Simple Memory',
      'Telegram Bot API',
    ],
    tags: ['n8n', 'Ollama AI', 'Gmail API', 'Telegram Bot', 'LangChain', 'Automation'],
    image: '/workflows/email-reader-workflow.png',
    jsonPath: '/workflows/email-reader-automation.json',
  },
];

export const WHATSAPP_TEXT =
  "Hi Faiz, I am reaching out from your portfolio. Let's discuss an opportunity!";
export const OWNER_EMAIL = 'faizirfan2608@gmail.com';
export const WHATSAPP_NUMBER = '601156329034';
