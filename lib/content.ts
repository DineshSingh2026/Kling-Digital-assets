// Single source of truth for all site copy. Edit text here, not in components.

export const site = {
  name: 'Kling Digital Assets',
  legalName: 'Kling Digital Assets FZCO',
  url: 'https://www.kling-digital.com',
  tagline: 'Digital assets, portals and software, built for businesses that run on technology.',
  heroSupport:
    'Kling Digital Assets is an Information Technology consultancy specialising in digital asset solutions, portal development, custom software and game development, based in Dubai Silicon Oasis.',
  footerLine: 'IT consultancy specialising in digital assets, portals and software.',
  title: 'Kling Digital Assets | IT Consulting, Digital Assets & Portal Development, Dubai',
  description:
    'Kling Digital Assets FZCO is an IT consultancy based in Dubai, delivering digital asset management, portal services, IT consulting, custom software and game development.',
} as const;

export const contact = {
  company: 'Kling Digital Assets FZCO',
  addressLines: ['Dubai Silicon Oasis, DDP, Building A2', 'Dubai, United Arab Emirates'],
  address: {
    street: 'Dubai Silicon Oasis, DDP, Building A2',
    locality: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
  },
  phone: '+971 50 9656858',
  phoneHref: 'tel:+971509656858',
  email: 'info@klingmetaverse.io',
  emailHref: 'mailto:info@klingmetaverse.io',
} as const;

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export const hero = {
  eyebrow: 'IT Consultancy · Dubai Silicon Oasis',
  primaryCta: { label: 'Explore our services', href: '#services' },
  secondaryCta: { label: 'Talk to an expert', href: '#contact' },
} as const;

/** Every item is taken from the service descriptions below — used for the capability strip. */
export const capabilities = [
  'Data',
  'Documents',
  'Multimedia',
  'Enterprise portals',
  'Customer portals',
  'Ecommerce platforms',
  'IT infrastructure',
  'Digital strategy',
  'Custom applications',
  'Database management systems',
  'App games',
  'Arcade games',
  'iGaming',
  'Real Money Games (RMG)',
] as const;

export const services = {
  eyebrow: 'Our Services',
  heading: 'Services We Offer',
  intro:
    'Complete IT expertise, from strategy and infrastructure to the platforms and products that run on it.',
  items: [
    {
      title: 'Digital Asset Management',
      icon: 'Database',
      description:
        'Helping clients manage, organise and optimise their digital assets, including data, documents and multimedia files, so they are secure, discoverable and working for the business.',
    },
    {
      title: 'Portal Services',
      icon: 'LayoutDashboard',
      description:
        'Developing and maintaining web portals and online platforms that act as centralised hubs for information, collaboration, communication and transactions, including internal enterprise portals, customer portals and ecommerce platforms.',
    },
    {
      title: 'IT Consulting',
      icon: 'Compass',
      description:
        'Strategic advice, technical guidance and implementation support for businesses looking to strengthen their IT infrastructure, sharpen their digital strategy or get more from their existing technology.',
    },
    {
      title: 'Software Development',
      icon: 'Code2',
      description:
        'Custom software and applications built around specific business needs, such as portal development, database management systems and other tailored IT solutions.',
    },
    {
      title: 'Game Development',
      icon: 'Gamepad2',
      description:
        'An innovative game studio focused on quality, with a diverse portfolio spanning app games, arcade games, iGaming and Real Money Games (RMG). Versatile development that appeals to a broad audience.',
    },
  ],
} as const;

export const about = {
  eyebrow: 'About Us',
  heading: 'Technology, applied with purpose.',
  paragraphs: [
    'Kling Digital Assets is an Information Technology consultancy specialising in comprehensive solutions and services around digital assets and portal development.',
    'We help businesses use technology efficiently, strengthening their digital presence, optimising IT operations and achieving their strategic objectives. Our focus is maximising the value of digital assets while ensuring secure, streamlined access through portals and digital platforms.',
  ],
  pillars: [
    { title: 'Strategy first', icon: 'Target', text: 'Advice grounded in your business objectives.' },
    { title: 'Secure by design', icon: 'ShieldCheck', text: 'Streamlined access without compromising on security.' },
    { title: 'Full cycle delivery', icon: 'Workflow', text: 'From consulting to shipped software.' },
  ],
} as const;

export const contactSection = {
  eyebrow: 'Contact',
  heading: "Let's talk.",
  sub: "Tell us about the problem you're trying to solve. We'll come back with a clear, practical plan.",
} as const;
