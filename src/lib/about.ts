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
  image: string;
  images?: string[];
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
    period: '2007 to 2012',
    institution: 'Sekolah Kebangsaan Kampung Baharu',
    location: 'Besut, Terengganu',
    field: 'Primary Education',
    description:
      'Early education foundation that developed curiosity in learning and a natural drive toward problem solving and exploration.',
  },
  {
    period: '2013 to 2016',
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
      'Continued strengthening scientific and analytical skills, adapting to a new environment while building resilience and adaptability.',
  },
  {
    period: '2018 to 2020',
    institution: 'Kolej Matrikulasi Kelantan',
    location: 'Kelantan',
    field: 'Science Major',
    description:
      'Built stronger foundations in mathematics, science, and structured problem solving. Prepared academically for an engineering focused university journey.',
  },
  {
    period: '2021 to 2025',
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
    image: '/interests/tiktok.jpg',
    description:
      'Started doing TikTok affiliate out of curiosity and ended up genuinely enjoying the content creation side of it. I like understanding what makes people click, buy, and come back. Its part creative, part data.',
  },
  {
    title: 'Hardware & Laptop Repair',
    icon: 'Wrench',
    image: '/interests/hardware.png',
    description:
      'I actually enjoy taking laptops apart and figuring out what is wrong with them. There is something satisfying about diagnosing a dead machine and bringing it back to life. Its like a puzzle every single time.',
  },
  {
    title: 'Gaming & Strategy',
    icon: 'Gamepad2',
    image: '/interests/gaming.png',
    description:
      'Gaming is just something I genuinely love. I am drawn to games that make you think, whether its outplaying someone or figuring out the best strategy on the fly. Its my go to way to unwind and have fun.',
  },
  {
    title: 'Fitness & Gym',
    icon: 'Dumbbell',
    image: '/interests/fitness.jpg',
    description:
      'Gym has become a big part of my routine. It keeps me grounded, clears my head, and honestly the discipline you build from showing up consistently carries into everything else in life.',
  },
  {
    title: 'Technology & Continuous Learning',
    icon: 'Cpu',
    image: '/interests/tech.png',
    images: ['/interests/tech.png', '/interests/learning.png'],
    description:
      'Always poking around new tools, gadgets, and tech that catches my eye. Whether its a new AI app or some random piece of hardware, I am probably already looking into it. I genuinely enjoy learning new things, not because I have to, but because staying curious keeps things interesting.',
  },
  {
    title: 'Sports',
    icon: 'Trophy',
    image: '/interests/sports.jpg',
    description:
      'Outside of screens I stay active through badminton and bowling. Badminton keeps me sharp and quick on my feet, while bowling is all about precision and consistency. Both sports teach patience, focus, and the drive to keep improving.',
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
