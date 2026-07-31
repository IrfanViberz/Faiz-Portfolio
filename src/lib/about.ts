export interface TimelineEntry {
  period: string;
  institution: string;
  location?: string;
  field: string;
  description: string;
}

export interface InterestItem {
  title: string;
  description: string;
  icon: string;
}

export interface ValueAboutItem {
  title: string;
  description: string;
}

export interface GoalItem {
  text: string;
}

export const timeline: TimelineEntry[] = [
  {
    period: '2007 — 2012',
    institution: 'Sekolah Kebangsaan Kampung Baharu',
    location: 'Besut, Terengganu',
    field: 'Primary Education',
    description:
      'Early education foundation that developed curiosity in learning and a natural drive toward problem-solving and exploration.',
  },
  {
    period: '2013 — 2016',
    institution: 'Sekolah Menengah Kebangsaan Tengku Mahmud (TMS)',
    location: 'Terengganu',
    field: 'Science Major',
    description:
      'Built analytical thinking and scientific foundations. The science stream strengthened logical reasoning skills that would later shape an engineering mindset.',
  },
  {
    period: '2017',
    institution: 'Sekolah Menengah Kebangsaan Kubang Kerian',
    location: 'Kelantan',
    field: 'Science Major',
    description:
      'Continued strengthening scientific and analytical skills, adapting to a new environment — building resilience and adaptability.',
  },
  {
    period: '2018 — 2020',
    institution: 'Kolej Matrikulasi Kelantan',
    location: 'Kelantan',
    field: 'Science Major',
    description:
      'Built stronger foundations in mathematics, science, and structured problem-solving. Prepared academically for an engineering-focused university journey.',
  },
  {
    period: '2021 — 2025',
    institution: 'Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)',
    location: 'Pahang',
    field: 'Bachelor of Computer Science (Software Engineering) with Honours',
    description:
      'Developed expertise in software development, system architecture, application development, and engineering practices. Where technical curiosity became professional capability.',
  },
];

export const interests: InterestItem[] = [
  {
    title: 'TikTok Affiliate & Digital Marketing',
    icon: 'ShoppingBag',
    description:
      'Applying marketing strategies, content analytics, and conversion funnels to drive real e-commerce sales and user acquisition.',
  },
  {
    title: 'Hardware & Laptop Repair',
    icon: 'Wrench',
    description:
      'Hands-on hardware diagnostics, laptop repair, and system assembly as a technical hobby — understanding performance from silicon to software.',
  },
  {
    title: 'Gaming & Strategy',
    icon: 'Gamepad2',
    description:
      'Gaming sharpens creativity, strategic thinking, and pattern recognition — skills that directly translate to better system design and user experience understanding.',
  },
  {
    title: 'Fitness & Gym',
    icon: 'Dumbbell',
    description:
      'Consistent training builds discipline and mental resilience. The principles of showing up daily and tracking progress apply equally to writing software as they do to physical development.',
  },
  {
    title: 'Technology Exploration',
    icon: 'Cpu',
    description:
      'Constantly exploring new AI tools, frameworks, and modern development workflows. Staying curious keeps the engineering approach fresh and practical.',
  },
  {
    title: 'Continuous Learning',
    icon: 'BookOpen',
    description:
      'Whether through documentation, open-source projects, or industry blogs — always looking for better ways to build, ship, and improve software systems.',
  },
];

export const valuesAbout: ValueAboutItem[] = [
  {
    title: 'Growth Mindset',
    description:
      'Every challenge is a learning opportunity. I approach problems with curiosity, and treat every feedback loop as a chance to improve.',
  },
  {
    title: 'Problem Solving',
    description:
      'Breaking down complex systems into clear, practical solutions. I focus on understanding the root problem before writing a single line of code.',
  },
  {
    title: 'Ownership',
    description:
      'I take full responsibility for the quality and outcomes of my work. Shipping something means owning its reliability, not just its delivery.',
  },
  {
    title: 'Collaboration',
    description:
      'The best software is built together. Clear communication, shared context, and mutual respect are as important as technical skill.',
  },
];

export const currentGoals: string[] = [
  'Building scalable software solutions with clean architecture',
  'Continuously improving engineering depth and code quality',
  'Exploring AI-assisted development workflows and automation',
  'Creating digital products that solve real-world problems',
  'Growing as a full-stack engineer across frontend and backend domains',
];
