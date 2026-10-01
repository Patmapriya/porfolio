import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

const API_BASE = 'http://localhost:8000/api'

const fallbackProfile = {
  studio: 'Everus Studio',
  tagline: 'Web development and design experiences shaped for brands that want clarity, speed, and standout presence.',
  location: 'Remote · India',
  specialties: [],
  team: [
    {
      name: 'Sakthi',
      role: 'Web Developer',
      specialty: 'Frontend Development',
      bio: 'Sakthi builds fast, clean, and conversion-focused web experiences using modern frontend and backend technologies, turning product ideas into dependable digital systems.',
      skills: ['React', 'JavaScript', 'Responsive Design', 'Git & GitHub', 'Python'],
    },
    {
      name: 'Priya',
      role: 'Designer / Developer',
      specialty: 'UI/UX Design',
      bio: 'Priya blends product thinking, UX design, and visual craft to shape intuitive interfaces, polished brand experiences, and AI-enhanced creative solutions.',
      skills: ['Figma', 'HTML/CSS', 'React', 'Graphic Design', 'Python'],
    },
  ],
  stats: { projects: 42, avgLaunch: '1-3 weeks', clients: 18 },
  about: 'We are Sakthi and Priya, a collaborative creative duo blending web development, UX strategy, and AI-powered design thinking to build polished digital experiences that feel premium and perform with purpose.',
}

const fallbackWorkCategories = [
  { id: 'thumbnail-design', label: 'Thumbnail Design', summary: 'Custom YouTube and digital content thumbnail design.' },
  { id: 'poster-design', label: 'Poster Designs', summary: 'Event and campaign posters built for attention and clarity.' },
  { id: 'website-design', label: 'Websites', summary: 'Premium websites that convert and clearly tell your story.' },
  { id: 'chatbot', label: 'Chatbot', summary: 'Interactive AI assistants for instant answers and support.' },
]

const fallbackPortfolio = [
  {
    id: 'thumbnail-beauty',
    title: 'Beauty Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Beauty Content Creator',
    tools: ['Thumbnail Design', 'Visual Design', 'Digital Content'],
    description: 'An eye-catching beauty-themed thumbnail designed to stand out across digital content.',
    image: '/images/beauty thumbnail.jpeg',
    gallery: ['/images/beauty thumbnail.jpeg'],
    sales: 'Thumbnail design',
    rate: '₹250',
    price: '₹250',
    finalResult: 'A bold beauty thumbnail with a clear focal point and polished visual styling.',
    techStack: ['Beauty', 'Thumbnail Design', 'Digital Content'],
    previewUrl: '/images/beauty thumbnail.jpeg',
  },
  {
    id: 'thumbnail-image-1',
    title: 'News Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Digital Content Creator',
    tools: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    description: 'A custom thumbnail design created to stand out in digital content feeds.',
    image: '/images/thumbnail 1.png',
    gallery: ['/images/thumbnail 1.png'],
    sales: 'Thumbnail design',
    rate: '₹250',
    price: '₹250',
    finalResult: 'A polished thumbnail design for digital content.',
    techStack: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    previewUrl: '/images/thumbnail 1.png',
  },
  {
    id: 'thumbnail-image-2',
    title: 'Vlog Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Digital Content Creator',
    tools: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    description: 'A custom thumbnail design created to stand out in digital content feeds.',
    image: '/images/thumbnail 2.png',
    gallery: ['/images/thumbnail 2.png'],
    sales: 'Thumbnail design',
    rate: '₹200',
    price: '₹200',
    finalResult: 'A polished thumbnail design for digital content.',
    techStack: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    previewUrl: '/images/thumbnail 2.png',
  },
  {
    id: 'thumbnail-image-3',
    title: 'Mysterious Place Vlog Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Digital Content Creator',
    tools: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    description: 'A custom thumbnail design created to stand out in digital content feeds.',
    image: '/images/thumbnail 3.png',
    gallery: ['/images/thumbnail 3.png'],
    sales: 'Thumbnail design',
    rate: '₹300',
    price: '₹300',
    finalResult: 'A polished thumbnail design for digital content.',
    techStack: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    previewUrl: '/images/thumbnail 3.png',
  },
  {
    id: 'thumbnail-image-5',
    title: 'My First Sales Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Digital Content Creator',
    tools: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    description: 'A custom thumbnail design created to stand out in digital content feeds.',
    image: '/images/thumbnail 5.png',
    gallery: ['/images/thumbnail 5.png'],
    sales: 'Thumbnail design',
    rate: '₹150',
    price: '₹150',
    finalResult: 'A polished thumbnail design for digital content.',
    techStack: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    previewUrl: '/images/thumbnail 5.png',
  },
  {
    id: 'thumbnail-image-6',
    title: 'Study Tips Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Digital Content Creator',
    tools: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    description: 'A custom thumbnail design created to stand out in digital content feeds.',
    image: '/images/thumbnail 6.png',
    gallery: ['/images/thumbnail 6.png'],
    sales: 'Thumbnail design',
    rate: '₹200',
    price: '₹200',
    finalResult: 'A polished thumbnail design for digital content.',
    techStack: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    previewUrl: '/images/thumbnail 6.png',
  },
  {
    id: 'thumbnail-image-7',
    title: 'Digital Content Thumbnail',
    category: 'thumbnail-design',
    categoryLabel: 'Thumbnail Design',
    client: 'Digital Content Creator',
    tools: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    description: 'A custom thumbnail design created to stand out in digital content feeds.',
    image: '/images/thumbnail 7.png',
    gallery: ['/images/thumbnail 7.png'],
    sales: 'Thumbnail design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A polished thumbnail design for digital content.',
    techStack: ['Thumbnail Design', 'YouTube', 'Digital Content'],
    previewUrl: '/images/thumbnail 7.png',
  },
  {
    id: 'poster-priya-invitation',
    title: 'Priya Invitation Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Priya',
    tools: ['Illustrator', 'Floral Styling', 'Typography', 'Luxury Branding'],
    description: 'A floral invitation composition with soft luxury tones, elegant spacing, and premium event styling for personal celebrations.',
    image: '/priya-invitation.jpg.jpeg',
    gallery: ['/priya-invitation.jpg.jpeg'],
    sales: '300+ shares',
    rate: '₹100',
    price: '₹100',
    finalResult: 'The invitation felt polished and personal, creating a memorable preview for the celebration.',
    techStack: ['Invitation Design', 'Floral Styling', 'Typography', 'Luxury Branding'],
    previewUrl: '/priya-invitation.jpg.jpeg',
  },
  {
    id: 'poster-menu-card',
    title: 'Menu Card Design',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Menu Design Project',
    tools: ['Menu Design', 'Typography', 'Layout Design', 'Branding'],
    description: 'A visually engaging menu card design created to present food and drink offerings with a clear, inviting layout.',
    image: '/images/menucard.jpeg',
    gallery: ['/images/menucard.jpeg'],
    sales: 'Menu card design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A polished, easy-to-scan menu design with a clear visual hierarchy.',
    techStack: ['Menu Design', 'Typography', 'Layout Design', 'Branding'],
    previewUrl: '/images/menucard.jpeg',
  },
  {
    id: 'poster-coffee',
    title: 'Coffee Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Coffee Poster Project',
    tools: ['Poster Design', 'Typography', 'Layout Design'],
    description: 'A promotional coffee poster designed to showcase the product with an inviting visual layout.',
    image: '/images/coffee poster.jpeg',
    gallery: ['/images/coffee poster.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A polished promotional poster with a clear coffee-focused visual presentation.',
    techStack: ['Poster Design', 'Coffee Promotion', 'Visual Layout'],
    previewUrl: '/images/coffee poster.jpeg',
  },
  {
    id: 'poster-college-advertisement',
    title: 'College Advertisement',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'College Advertisement Project',
    tools: ['Poster Design', 'Typography', 'Layout Design'],
    description: 'A college advertisement poster designed to present key information in a clear, engaging format.',
    image: '/images/college advertisement.jpeg',
    gallery: ['/images/college advertisement.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'An informative college promotion with an easy-to-scan layout.',
    techStack: ['Poster Design', 'Education', 'Visual Layout'],
    previewUrl: '/images/college advertisement.jpeg',
  },
  {
    id: 'poster-invitation',
    title: 'Invitation Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Invitation Design Project',
    tools: ['Invitation Design', 'Typography', 'Layout Design'],
    description: 'An invitation design arranged to make event details clear and visually appealing.',
    image: '/images/invitation.jpeg',
    gallery: ['/images/invitation.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A welcoming invitation with a clear event-focused composition.',
    techStack: ['Invitation Design', 'Typography', 'Event Design'],
    previewUrl: '/images/invitation.jpeg',
  },
  {
    id: 'poster-dress',
    title: 'Dress Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Fashion Poster Project',
    tools: ['Poster Design', 'Fashion', 'Layout Design'],
    description: 'A fashion poster highlighting a dress design with a clean, attention-grabbing composition.',
    image: '/images/dress poster.jpeg',
    gallery: ['/images/dress poster.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A focused fashion promotion with the featured dress at the center of attention.',
    techStack: ['Poster Design', 'Fashion', 'Visual Layout'],
    previewUrl: '/images/dress poster.jpeg',
  },
  {
    id: 'poster-movie',
    title: 'Movie Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Movie Poster Project',
    tools: ['Poster Design', 'Movie Promotion', 'Visual Design'],
    description: 'A cinematic movie poster designed to create interest and present the film visually.',
    image: '/images/movie poster.jpeg',
    gallery: ['/images/movie poster.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A dramatic film promotion presented in a clear poster format.',
    techStack: ['Poster Design', 'Movie Promotion', 'Visual Storytelling'],
    previewUrl: '/images/movie poster.jpeg',
  },
  {
    id: 'poster-pizza',
    title: 'Pizza Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Pizza Poster Project',
    tools: ['Poster Design', 'Food Promotion', 'Layout Design'],
    description: 'A food promotion poster featuring pizza in a bold, appetizing layout.',
    image: '/images/pizza poster.jpeg',
    gallery: ['/images/pizza poster.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'An eye-catching food poster designed to make the featured pizza stand out.',
    techStack: ['Poster Design', 'Food Promotion', 'Visual Layout'],
    previewUrl: '/images/pizza poster.jpeg',
  },
  {
    id: 'poster-titanic',
    title: 'Titanic Poster',
    category: 'poster-design',
    categoryLabel: 'Poster Design',
    client: 'Titanic Poster Project',
    tools: ['Poster Design', 'Movie Promotion', 'Visual Design'],
    description: 'A Titanic-themed movie poster arranged as a cinematic visual tribute.',
    image: '/images/titanic poster.jpeg',
    gallery: ['/images/titanic poster.jpeg'],
    sales: 'Poster design',
    rate: '₹100',
    price: '₹100',
    finalResult: 'A cinematic Titanic poster with a memorable, film-inspired presentation.',
    techStack: ['Poster Design', 'Movie Tribute', 'Visual Storytelling'],
    previewUrl: '/images/titanic poster.jpeg',
  },
  {
    id: 'website-mobile-mart',
    title: 'Mobile Mart Store',
    category: 'website-design',
    categoryLabel: 'Website Design',
    client: 'Mobile Mart',
    tools: ['React', 'Vite', 'Responsive UI', 'E-commerce UX', 'Brand Styling'],
    description: 'A mobile-first storefront built for quick discovery, product trust, and strong conversion journeys for modern gadget buyers.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    ],
    sales: '₹1.8L revenue',
    rate: '₹4,000',
    price: '₹4,000',
    finalResult: 'The storefront delivered a cleaner shopping journey with stronger mobile usability and better conversion flow.',
    techStack: ['React', 'Vite', 'Responsive UI', 'E-commerce UX', 'Conversion Design'],
    liveUrl: 'https://mobile-mart-x8mu.onrender.com',
    githubUrl: 'https://github.com/everus-studio/mobile-mart',
  },
  {
    id: 'website-paintpro',
    title: 'PaintPro',
    category: 'website-design',
    categoryLabel: 'Website Design',
    client: 'PaintPro',
    tools: ['React', 'Vite', 'Responsive UI', 'Brand Styling'],
    description: 'A polished painting services website designed to showcase PaintPro offerings and make it easy for customers to get started.',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80',
    gallery: ['https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80'],
    sales: 'Live project',
    rate: '₹5,500',
    price: '₹5,500',
    finalResult: 'A clear, responsive web presence for PaintPro with a focused path to explore the live service experience.',
    techStack: ['React', 'Vite', 'Responsive UI', 'Service Website'],
    liveUrl: 'https://paintpro-1.netlify.app',
  },
  {
    id: 'website-sp-digital-service',
    title: 'SP Digital Service',
    category: 'website-design',
    categoryLabel: 'Website Design',
    client: 'SP Digital Service',
    tools: ['React', 'Vite', 'Responsive UI', 'Digital Services', 'Online Portal'],
    description: 'SP Digital Service — a digital service centre website for online applications, document services, application tracking and other digital assistance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    ],
    sales: 'Live project',
    rate: '₹2,700',
    price: '₹2,700',
    finalResult: 'A digital service centre web portal providing online applications, document services, and tracking assistance.',
    techStack: ['React', 'Vite', 'Responsive UI', 'Digital Assistance', 'Service Portal'],
    liveUrl: 'https://sp-onlineservice.netlify.app',
  },
  {
    id: 'website-nexus-hospital-management',
    title: 'Nexus Hospital Management System',
    category: 'website-design',
    categoryLabel: 'Website Design',
    client: 'Nexus Hospital',
    tools: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'AI'],
    description: 'Premium AI-powered hospital management platform for managing patients, doctors, appointments, departments, pharmacy, laboratory, billing, beds, staff, reports, and hospital operations.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    gallery: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80'],
    sales: 'Live project',
    rate: '₹5,000',
    price: '₹5,000',
    finalResult: 'A responsive hospital operations platform with AI-powered administrative insights.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'AI'],
    liveUrl: 'https://nexushospitalmanagement.netlify.app/',
  },
  {
    id: 'chatbot-ai-assistant',
    title: 'AI Chatbot Assistant',
    category: 'chatbot',
    categoryLabel: 'CHATBOT',
    client: 'AI Chatbot Project',
    tools: ['AI', 'Gemini', 'Python', 'API', 'Chatbot'],
    description: 'An AI-powered chatbot built to provide intelligent, interactive conversations.',
    image: '/images/chatbot.svg',
    gallery: ['/images/chatbot.svg'],
    sales: 'Interactive project',
    rate: '₹5,000',
    price: '₹5,000',
    finalResult: 'An interactive assistant experience designed to provide quick answers and support.',
    techStack: ['AI', 'Gemini', 'Python', 'API', 'Chatbot'],
    liveUrl: 'https://my-gemini-chatbot-bjuh.onrender.com/',
  },
]

const ensureRequiredProjects = (projects) => {
  const currentProjects = projects.filter((project) => (
    project.id !== 'poster-yuvamangalam' &&
    project.title?.trim().toLowerCase() !== 'yuvamangalam event poster'
  ))
  const requiredProjects = fallbackPortfolio.filter((project) => [
    'website-nexus-hospital-management',
    'website-mobile-mart',
    'chatbot-ai-assistant',
    'poster-menu-card',
    'thumbnail-beauty',
    'thumbnail-image-1',
    'thumbnail-image-2',
    'thumbnail-image-3',
    'thumbnail-image-5',
    'thumbnail-image-6',
    'thumbnail-image-7',
    'poster-coffee',
    'poster-college-advertisement',
    'poster-invitation',
    'poster-dress',
    'poster-movie',
    'poster-pizza',
    'poster-titanic',
  ].includes(project.id))

  return requiredProjects.reduce((portfolioItems, requiredProject) => {
    const alreadyIncluded = portfolioItems.some((project) => (
      project.id === requiredProject.id ||
      project.title?.trim().toLowerCase() === requiredProject.title.toLowerCase()
    ))

    return alreadyIncluded ? portfolioItems : [...portfolioItems, requiredProject]
  }, currentProjects)
}

const ensureChatbotCategory = (categories) => (
  categories.some((category) => category.id === 'chatbot')
    ? categories
    : [...categories, fallbackWorkCategories.find((category) => category.id === 'chatbot')]
)

const fallbackServices = [
  { name: 'Thumbnail Design', summary: 'High-converting thumbnails that make people stop, click, and watch with confidence.', price: 'From ₹200' },
  { name: 'Poster Design', summary: 'Promotional posters and campaign visuals crafted to grab attention and elevate brand presence.', price: 'From ₹300' },
  { name: 'Website Design', summary: 'Modern responsive websites that balance performance, storytelling, and conversion.', price: 'From ₹4,000' },
  { name: 'Social Content', summary: 'Short-form creative direction for reels, promos, and launch assets that feel polished and strategic.', price: 'From ₹300' },
  { name: 'Landing Pages', summary: 'Focused pages designed to explain your offer quickly and move visitors toward action.', price: 'From ₹400' },
]

const fallbackSkills = [
  {
    title: 'Design Tools',
    icon: '🎨',
    items: [
      { name: 'Figma', level: 95, icon: '✦' },
      { name: 'Photoshop', level: 92, icon: '◈' },
      { name: 'Illustrator', level: 88, icon: '✧' },
      { name: 'Brand Systems', level: 90, icon: '⬢' },
      { name: 'Typography', level: 94, icon: '▣' },
    ],
  },
  {
    title: 'Web Development',
    icon: '💻',
    items: [
      { name: 'React', level: 94, icon: '⚛' },
      { name: 'Vite', level: 90, icon: '▣' },
      { name: 'JavaScript', level: 92, icon: 'JS' },
      { name: 'Python', level: 88, icon: 'PY' },
      { name: 'Responsive Design', level: 96, icon: '◫' },
    ],
  },
  {
    title: 'Strategy',
    icon: '📈',
    items: [
      { name: 'UX Writing', level: 89, icon: '✍' },
      { name: 'Conversion Design', level: 91, icon: '↗' },
      { name: 'Content Direction', level: 87, icon: '◎' },
      { name: 'Launch Planning', level: 86, icon: '✦' },
      { name: 'Brand Positioning', level: 90, icon: '⬡' },
    ],
  },
]

const sampleTestimonialQuotes = [
  'Delivery was very fast, and the pricing was affordable.',
  'The team understood my brief and turned it into a clean design.',
  'Communication stayed clear throughout the project.',
  'The final website feels polished and simple to navigate.',
  'The thumbnail has a strong focal point and reads well at a glance.',
  'The poster looks professional and is easy to share.',
  'I appreciated the quick turnaround and careful revisions.',
  'The layout is clear and puts the key information first.',
  'The design feels consistent with the style I wanted.',
  'Feedback was handled patiently, and the final result feels finished.',
  'The mobile version is easy to use and looks well arranged.',
  'The colors and type work together without making the design busy.',
  'The team was responsive and kept the process straightforward.',
  'The final artwork feels crisp and suits my content.',
  'The design is easy to understand, even when viewed quickly.',
  'I received helpful updates while the project was in progress.',
  'The website feels more organized and easier to browse.',
  'The poster design balances the images and information nicely.',
  'The thumbnail design fits the video topic and stands out.',
  'The revisions were straightforward, and my notes were considered.',
  'The project was delivered as discussed, with a clean final finish.',
  'The page looks good on both mobile and desktop.',
  'The finished design gives my brand a more cohesive appearance.',
  'I found the process simple from the first message to delivery.',
  'The final result is clear, polished, and ready to publish.',
  'The team listened to what I needed and kept the design focused.',
  'The work was completed quickly, and the final design looks professional.',
]

const fallbackTestimonials = [
  { name: 'Nandha Kumar', role: 'Founder, YuvaSangamam', quote: 'The poster design gave our event real pull. It looked premium, felt intentional, and helped us attract a much bigger audience.', image: '' },
  { name: 'Anisha', role: 'Content Creator', quote: 'Our new thumbnails changed the click-through rate immediately. The visuals feel so much cleaner and way more clickable.', image: '' },
  { name: 'Arjun', role: 'Small Business Owner', quote: 'From message to launch, the process was smooth and professional. We finally have a site that feels like our brand.', image: '' },
  ...sampleTestimonialQuotes.map((quote, index) => ({
    name: `Sample Client ${String(index + 4).padStart(2, '0')}`,
    role: 'Sample feedback (demo)',
    quote,
    image: '',
  })),
]

const fallbackPricing = [
  {
    plan: 'Thumbnail Design',
    price: 'Starting at ₹150',
    description: 'Eye-catching thumbnails designed to improve CTR and make your content stand out in crowded feeds.',
    features: ['1 main thumbnail concept', '2 revision rounds', 'Brand-aware color and layout direction', 'High-contrast, click-worthy composition'],
    contactLabel: 'Contact Me',
    contactLink: 'mailto:nbrucelee76@gmail.com?subject=Thumbnail%20Design%20Inquiry',
  },
  {
    plan: 'Poster Design',
    price: 'Starting at ₹300',
    description: 'Event and campaign posters built for clarity, visibility, and strong visual impact.',
    features: ['Poster layout design', 'Typography and hierarchy refinement', 'Custom event/promo styling', 'Social-ready export dimensions'],
    contactLabel: 'Contact Me',
    contactLink: 'mailto:nbrucelee76@gmail.com?subject=Poster%20Design%20Inquiry',
  },
  {
    plan: 'Website Design',
    price: 'Starting at ₹4,000',
    description: 'Premium responsive websites that balance aesthetics, clarity, and conversion-focused user experience.',
    features: ['Landing page or multi-section website', 'Modern responsive layout', 'Brand styling and content structure', 'Launch-ready design system'],
    contactLabel: 'Contact Me',
    contactLink: 'mailto:nbrucelee76@gmail.com?subject=Website%20Design%20Inquiry',
  },
]

const normalizeProfile = (value) => {
  const source = value && typeof value === 'object' ? value : {}
  return {
    ...fallbackProfile,
    ...source,
    specialties: Array.isArray(source.specialties) && source.specialties.length ? source.specialties : fallbackProfile.specialties,
    team: Array.isArray(source.team) && source.team.length ? source.team : fallbackProfile.team,
    stats: {
      ...fallbackProfile.stats,
      ...(source.stats || {}),
    },
    about: source.about || fallbackProfile.about,
    tagline: source.tagline || fallbackProfile.tagline,
    studio: source.studio || fallbackProfile.studio,
  }
}

const normalizeCollection = (value, fallback) => (Array.isArray(value) && value.length ? value : fallback)

function ProjectDetailPage({ profile, portfolio, onBack }) {
  const { projectId } = useParams()
  const project = portfolio.find((item) => item.id === projectId) || portfolio[0]

  if (!project) {
    return (
      <div className="page-shell detail-shell">
        <div className="detail-card empty-state">
          <p className="eyebrow">Project not found</p>
          <h2>That case study isn’t available yet.</h2>
          <button type="button" className="primary-btn" onClick={onBack}>Back to portfolio</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell detail-shell">
      <header className="detail-header">
        <button type="button" className="secondary-btn detail-back" onClick={onBack}>← Back</button>
        <div className="brand-block">
          <span className="brand-mark">E</span>
          <span className="brand-name">{profile.studio}</span>
        </div>
      </header>

      <article className="project-detail" aria-label={`${project.title} project details`}>
        <div className="detail-hero">
          <div className="detail-image-wrap">
            <img src={project.image} alt={project.title} className="detail-image" />
          </div>
          <div className="detail-overview">
            <span className="detail-category">{project.categoryLabel}</span>
            <h1>{project.title}</h1>
            <p className="detail-description">{project.description}</p>
            <div className="detail-meta-grid">
              <div>
                <span>Client</span>
                <strong>{project.client || 'Private client'}</strong>
              </div>
              <div>
                <span>Project price</span>
                <strong>{project.price || project.rate || 'Custom quote'}</strong>
              </div>
              <div>
                <span>Sales</span>
                <strong>{project.sales || 'Campaign growth'}</strong>
              </div>
            </div>
            <div className="detail-actions">
              {project.liveUrl && (
                <a className="primary-btn" href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
              )}
              <Link className="secondary-btn" to="/">View all projects</Link>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <section className="detail-card">
            <p className="eyebrow">Tools used</p>
            <div className="tool-list">
              {(project.tools || project.techStack || []).map((tool) => (
                <span key={`${project.id}-${tool}`} className="tool-chip">{tool}</span>
              ))}
            </div>
          </section>

          <section className="detail-card">
            <p className="eyebrow">Final result</p>
            <p>{project.finalResult || 'A polished outcome designed to strengthen the client’s digital presence and conversion flow.'}</p>
          </section>
        </div>

        <section className="detail-card detail-story">
          <p className="eyebrow">Project overview</p>
          <p>{project.description}</p>
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section className="detail-gallery">
            {project.gallery.map((imgUrl, idx) => (
              <img key={`${project.id}-gallery-${idx}`} src={imgUrl} alt={`${project.title} preview ${idx + 1}`} className="detail-gallery-image" />
            ))}
          </section>
        )}
      </article>
    </div>
  )
}

function PortfolioHome({
  profile,
  workCategories,
  portfolio,
  services,
  skills,
  testimonials,
  pricing,
  selectedCategory,
  setSelectedCategory,
  bookingForm,
  setBookingForm,
  bookingSent,
  setBookingSent,
  selectedProject,
  setSelectedProject,
  onOpenProject,
  activeTestimonial,
  setActiveTestimonial,
  testimonialSlides,
}) {
  const navigate = useNavigate()
  const featuredProjects = ['thumbnail-beauty', 'website-mobile-mart', 'poster-coffee']
    .map((projectId) => portfolio.find((project) => project.id === projectId))
    .filter(Boolean)
  const visibleCategories = workCategories.filter((category) => ['thumbnail-design', 'poster-design', 'website-design', 'chatbot'].includes(category.id))
  const visiblePortfolio = portfolio.filter((project) => project.category === selectedCategory)

  const handleBookingChange = (event) => {
    const { name, value } = event.target
    setBookingForm((current) => ({ ...current, [name]: value }))
  }

  const handleBookingSubmit = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Project inquiry: ${bookingForm.projectType}`)
    const body = encodeURIComponent(
      `Project type: ${bookingForm.projectType}\n` +
      `Budget: ${bookingForm.budget}\n` +
      `Preferred date: ${bookingForm.date || 'Not specified'}\n` +
      `Preferred time: ${bookingForm.time || 'Not specified'}\n\n` +
      `Project details:\n${bookingForm.message || 'No additional details provided.'}`,
    )

    window.location.href = `mailto:nbrucelee76@gmail.com?subject=${subject}&body=${body}`
    setBookingSent(true)
  }

  const handleCardClick = (project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
    } else {
      onOpenProject(project)
    }
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">E</span>
          <span className="brand-name">{profile.studio}</span>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#booking">Book a call</a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Sakthi + Priya • Everus Studio</p>
            <h1>
              We build <span>web experiences</span> that feel premium and convert.
            </h1>
            <p className="lead">{profile.tagline}</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#work">View our work</a>
              <a className="secondary-btn" href="#booking">Start a project</a>
            </div>
            <div className="stat-row">
              <div>
                <strong>{profile.stats.projects}+</strong>
                <span>projects shipped</span>
              </div>
              <div>
                <strong>{profile.stats.clients}</strong>
                <span>brands supported</span>
              </div>
              <div>
                <strong>{profile.stats.avgLaunch}</strong>
                <span>average launch</span>
              </div>
            </div>
          </div>

          <div className="profile-card" aria-label="Freelance team profile">
            <div className="portrait-panel">
              <div className="portrait-orb" />
              <div className="portrait-badge">Sakthi • Priya</div>
            </div>
            <div className="profile-meta">
              {profile.team.map((member) => (
                <div key={member.name} className="member-profile-item">
                  <span className="meta-label">{member.name}</span>
                  <strong>{member.role}</strong>
                  {member.specialty && (
                    <div className="member-specialty-block">
                      <span className="meta-label small-label">Speciality</span>
                      <span className="meta-detail">{member.specialty}</span>
                    </div>
                  )}
                  {Array.isArray(member.skills) && member.skills.length > 0 && (
                    <div className="member-skills" aria-label={`${member.name} skills`}>
                      {member.skills.map((skill) => (
                        <span key={`${member.name}-${skill}`} className="member-skill">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="section-header">
            <p className="eyebrow">Featured projects</p>
            <h2>My best work, selected for impact.</h2>
          </div>

          <div className={`featured-grid ${featuredProjects.length === 1 ? 'featured-grid-single' : ''}`}>
            {featuredProjects.map((project) => (
              <article key={project.id || project.title} className="featured-card">
                <div className="featured-image-wrap">
                  <img src={project.image} alt={project.title} className="featured-image" />
                </div>
                <div className="featured-content">
                  <span className="featured-category">{project.categoryLabel}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button type="button" className="featured-button" onClick={() => handleCardClick(project)}>
                    View Project
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="section-header split-header">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Projects designed to attract attention and drive action.</h2>
            </div>
            <div className="work-filters" role="tablist" aria-label="Portfolio categories">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="category-summary">
            <span className="summary-chip">{visibleCategories.find((category) => category.id === selectedCategory)?.label}</span>
          </div>

          <div className="project-grid">
            {visiblePortfolio.map((project) => (
              <article
                key={project.id || project.title}
                className={`project-card ${project.id === 'chatbot-ai-assistant' ? 'chatbot-project-card' : ''}`}
              >
                <button type="button" className="project-image-button" onClick={() => handleCardClick(project)} aria-label={`Preview ${project.title}`}>
                  <div className="project-image-wrap">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`project-image ${project.category === 'poster-design' ? 'poster-image' : ''}`}
                    />
                  </div>
                </button>

                <div className="card-topline">
                  <span>{project.categoryLabel}</span>
                  {project.id === 'chatbot-ai-assistant' ? (
                    <span className="chatbot-live-badge">LIVE DEMO</span>
                  ) : (
                    <span className="chip" />
                  )}
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-stats">
                  <div>
                    <span>Sales</span>
                    <strong>{project.sales}</strong>
                  </div>
                  <div>
                    <span>Rate</span>
                    <strong>{project.category === 'poster-design' ? '₹100' : project.rate}</strong>
                  </div>
                </div>

                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                  <div className="tech-stack" aria-label={`${project.title} tech stack`}>
                    {project.techStack.map((item) => (
                      <span key={`${project.title}-${item}`} className="tech-badge">{item}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {project.id === 'chatbot-ai-assistant' ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-live-btn chatbot-try-btn"
                    >
                      Try AI Chatbot <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-live-btn">Live Demo</a>
                      )}
                      <button type="button" className="project-preview-btn" onClick={() => onOpenProject(project)}>{project.category === 'poster-design' ? 'View Poster' : 'View details'}</button>
                    </>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="section-header">
            <p className="eyebrow">What we do</p>
            <h2>Premium creative partnership built for momentum.</h2>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <div key={service.name} className="service-card">
                <span className="service-index">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <div className="service-price">{service.price}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section">
          <div className="section-header">
            <p className="eyebrow">Skills &amp; tools</p>
            <h2>Software and technologies I use to design and build digital experiences.</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skillGroup) => {
              const skillItems = Array.isArray(skillGroup.items) ? skillGroup.items : []

              return (
                <div key={skillGroup.title} className="skill-group">
                  <div className="skill-group-header">
                    <span className="skill-icon" aria-hidden="true">{skillGroup.icon || '✦'}</span>
                    <h3>{skillGroup.title}</h3>
                  </div>

                  <div className="skill-list">
                    {skillItems.map((skill) => {
                      const tool = typeof skill === 'string' ? { name: skill, level: 85, icon: '✦' } : skill

                      return (
                        <div key={tool.name || skill} className="skill-item">
                          <div className="skill-label-row">
                            <span className="skill-badge" aria-hidden="true">{tool.icon || '✦'}</span>
                            <span>{tool.name}</span>
                            <strong>{tool.level || 85}%</strong>
                          </div>
                          <div className="skill-progress-bar" aria-label={`${tool.name} proficiency ${tool.level || 85}%`}>
                            <span style={{ width: `${tool.level || 85}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="testimonials" className="testimonial-section">
          <div className="section-header">
            <p className="eyebrow">Client feedback</p>
            <h2>Trusted by founders, creators, and growing teams.</h2>
          </div>

          <div className="testimonial-slider" aria-label="Client testimonials slider">
            <div
              className="testimonial-slider-track"
              style={{ transform: `translateX(-${activeTestimonial * (100 / Math.max(testimonialSlides.length, 1))}%)` }}
            >
              {testimonialSlides.map((testimonial) => {
                const initials = testimonial.name
                  ?.split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'CL'

                return (
                  <blockquote key={testimonial.name} className="testimonial-card slide-card">
                    <div className="testimonial-header">
                      <div className="testimonial-avatar" aria-label={`${testimonial.name} profile placeholder`}>
                        {testimonial.image ? <img src={testimonial.image} alt={testimonial.name} /> : initials}
                      </div>
                      <div className="testimonial-author">
                        <strong>{testimonial.name}</strong>
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                    <div className="stars" aria-label="Five star review">★★★★★</div>
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                )
              })}
            </div>
          </div>

          <div className="testimonial-dots" aria-label="Testimonial navigation">
            {testimonialSlides.map((testimonial, index) => (
              <button
                key={`${testimonial.name}-dot`}
                type="button"
                className={`testimonial-dot ${activeTestimonial === index ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="pricing-section">
          <div className="section-header">
            <p className="eyebrow">Simple pricing</p>
            <h2>Packages tailored for modern brands and growing ideas.</h2>
          </div>

          <div className="pricing-grid">
            {pricing.map((plan) => (
              <div key={plan.plan} className="pricing-card">
                <p className="plan-name">{plan.plan}</p>
                <h3>{plan.price}</h3>
                <p className="plan-description">{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a className="primary-btn pricing-cta" href={plan.contactLink || 'mailto:nbrucelee76@gmail.com?subject=Project%20Inquiry'}>
                  {plan.contactLabel || 'Contact Me'}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="section-header narrow">
            <p className="eyebrow">Why teams hire us</p>
            <h2>Strategy-led design that feels elevated from day one.</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>{profile.about}</p>
            </div>
            <div className="about-points">
              <div>
                <strong>01</strong>
                <span><strong>Sakthi</strong> brings technical depth and product execution for clean, scalable web builds.</span>
              </div>
              <div>
                <strong>02</strong>
                <span><strong>Priya</strong> shapes memorable interfaces and design systems with a strong UX and visual perspective.</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Fast collaboration with founders and teams to move from concept to polished launch.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="booking-section" aria-label="Book a call form">
          <div className="section-header">
            <p className="eyebrow">Book a call</p>
            <h2>Tell us about your next project.</h2>
          </div>

          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <div className="form-row two-up">
              <label>
                <span>Project type</span>
                <select name="projectType" value={bookingForm.projectType} onChange={handleBookingChange}>
                  <option value="Website">Website</option>
                  <option value="Brand Design">Brand Design</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Product UI">Product UI</option>
                  <option value="AI Experience">AI Experience</option>
                </select>
              </label>

              <label>
                <span>Budget</span>
                <select name="budget" value={bookingForm.budget} onChange={handleBookingChange}>
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                  <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000</option>
                  <option value="₹35,000 - ₹60,000">₹35,000 - ₹60,000</option>
                  <option value="₹60,000+">₹60,000+</option>
                </select>
              </label>
            </div>

            <div className="form-row two-up">
              <label>
                <span>Date</span>
                <input type="date" name="date" value={bookingForm.date} onChange={handleBookingChange} />
              </label>

              <label>
                <span>Time</span>
                <input type="time" name="time" value={bookingForm.time} onChange={handleBookingChange} />
              </label>
            </div>

            <label>
              <span>Message</span>
              <textarea name="message" rows="5" value={bookingForm.message} onChange={handleBookingChange} placeholder="Tell us about your goals, audience, and timeline..." />
            </label>

            <div className="booking-actions">
              <button type="submit" className="primary-btn">Send inquiry</button>
              <a className="secondary-btn" href="https://wa.me/7539913460" target="_blank" rel="noreferrer">Message on WhatsApp</a>
            </div>

            {bookingSent && <p className="success-message">Your inquiry is ready to send via email.</p>}
          </form>
        </section>
      </main>

      <footer id="contact" className="contact-footer">
        <div className="footer-copy">
          <p className="eyebrow">Let’s build your next move</p>
          <h2>Need a sharper digital presence or a more human product experience?</h2>
        </div>
        <div className="contact-actions">
          <a className="primary-btn" href="mailto:nbrucelee76@gmail.com?subject=Project%20Inquiry">nbrucelee76@gmail.com</a>
          <a className="secondary-btn" href="https://wa.me/7539913460" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="brand-block">
          <span className="brand-mark">E</span>
          <span className="brand-name">{profile.studio}</span>
        </div>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <p>© 2026 Everus Studio</p>
      </div>

      {selectedProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} preview`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'rgba(5, 7, 15, 0.96)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            type="button"
            className="project-modal-close"
            onClick={() => setSelectedProject(null)}
            aria-label="Close preview"
            style={{
              position: 'fixed',
              top: '20px',
              right: '24px',
              zIndex: 100001,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.35)',
              background: 'rgba(0,0,0,.65)',
              color: '#fff',
              fontSize: '32px',
              lineHeight: 1,
              cursor: 'pointer',
            }}
          >
            ×
          </button>

          <div
            className="project-modal-backdrop"
            onClick={() => setSelectedProject(null)}
            style={{ position: 'absolute', inset: 0 }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 100000,
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#161923',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,.12)',
            }}
          >
            <h2 style={{ color: '#fff', margin: '0 0 12px' }}>{selectedProject.title}</h2>
            <p style={{ color: '#d8cde9', margin: '0 0 20px' }}>{selectedProject.description}</p>
            <div style={{ margin: '20px 0', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {selectedProject.liveUrl && (
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <a className="primary-btn" href={selectedProject.liveUrl} target="_blank" rel="noreferrer">Open Website Live</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [profile, setProfile] = useState(normalizeProfile(fallbackProfile))
  const [workCategories, setWorkCategories] = useState(normalizeCollection(fallbackWorkCategories, fallbackWorkCategories))
  const [portfolio, setPortfolio] = useState(normalizeCollection(fallbackPortfolio, fallbackPortfolio))
  const [services, setServices] = useState(normalizeCollection(fallbackServices, fallbackServices))
  const [skills, setSkills] = useState(normalizeCollection(fallbackSkills, fallbackSkills))
  const [testimonials, setTestimonials] = useState(normalizeCollection(fallbackTestimonials, fallbackTestimonials))
  const [pricing, setPricing] = useState(normalizeCollection(fallbackPricing, fallbackPricing))
  const [selectedCategory, setSelectedCategory] = useState('poster-design')
  const [bookingForm, setBookingForm] = useState({
    projectType: 'Website',
    budget: '₹15,000 - ₹30,000',
    date: '',
    time: '',
    message: '',
  })
  const [bookingSent, setBookingSent] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const safeProfile = normalizeProfile(profile)
  const safeWorkCategories = normalizeCollection(workCategories, fallbackWorkCategories)
  const safePortfolio = normalizeCollection(portfolio, fallbackPortfolio)
  const safeServices = normalizeCollection(services, fallbackServices)
  const safeSkills = normalizeCollection(skills, fallbackSkills)
  const safeTestimonials = normalizeCollection(testimonials, fallbackTestimonials)
  const safePricing = normalizeCollection(pricing, fallbackPricing)

  const testimonialSlides = safeTestimonials.length ? safeTestimonials : fallbackTestimonials

  useEffect(() => {
    if (!safeTestimonials.length) return undefined

    const timer = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % safeTestimonials.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [safeTestimonials.length])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, categoriesRes, portfolioRes, servicesRes, skillsRes, testimonialsRes, pricingRes] = await Promise.all([
          fetch(`${API_BASE}/profile`),
          fetch(`${API_BASE}/work-categories`),
          fetch(`${API_BASE}/portfolio`),
          fetch(`${API_BASE}/services`),
          fetch(`${API_BASE}/skills`),
          fetch(`${API_BASE}/testimonials`),
          fetch(`${API_BASE}/pricing`),
        ])

        const profileData = profileRes.ok ? await profileRes.json().catch(() => fallbackProfile) : fallbackProfile
        const categoriesData = categoriesRes.ok ? await categoriesRes.json().catch(() => fallbackWorkCategories) : fallbackWorkCategories
        const portfolioData = portfolioRes.ok ? await portfolioRes.json().catch(() => fallbackPortfolio) : fallbackPortfolio
        const servicesData = servicesRes.ok ? await servicesRes.json().catch(() => fallbackServices) : fallbackServices
        const skillsData = skillsRes.ok ? await skillsRes.json().catch(() => fallbackSkills) : fallbackSkills
        const testimonialsData = testimonialsRes.ok ? await testimonialsRes.json().catch(() => fallbackTestimonials) : fallbackTestimonials
        const pricingData = pricingRes.ok ? await pricingRes.json().catch(() => fallbackPricing) : fallbackPricing

        setProfile(normalizeProfile(profileData))
        setWorkCategories(ensureChatbotCategory(normalizeCollection(categoriesData, fallbackWorkCategories)))
        setPortfolio(ensureRequiredProjects(normalizeCollection(portfolioData, fallbackPortfolio)))
        setServices(normalizeCollection(servicesData, fallbackServices))
        setSkills(normalizeCollection(skillsData, fallbackSkills))
        setTestimonials(normalizeCollection(testimonialsData, fallbackTestimonials))
        setPricing(normalizeCollection(pricingData, fallbackPricing))
      } catch (error) {
        console.error('Failed to load portfolio data', error)
        setProfile(normalizeProfile(fallbackProfile))
        setWorkCategories(normalizeCollection(fallbackWorkCategories, fallbackWorkCategories))
        setPortfolio(ensureRequiredProjects(normalizeCollection(fallbackPortfolio, fallbackPortfolio)))
        setServices(normalizeCollection(fallbackServices, fallbackServices))
        setSkills(normalizeCollection(fallbackSkills, fallbackSkills))
        setTestimonials(normalizeCollection(fallbackTestimonials, fallbackTestimonials))
        setPricing(normalizeCollection(fallbackPricing, fallbackPricing))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const openProjectPreview = (project) => {
    setSelectedProject(project)
  }

  if (loading && !profile) {
    return <div className="loading">Loading portfolio…</div>
  }

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <PortfolioHome
            profile={safeProfile}
            workCategories={safeWorkCategories}
            portfolio={safePortfolio}
            services={safeServices}
            skills={safeSkills}
            testimonials={safeTestimonials}
            pricing={safePricing}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            bookingForm={bookingForm}
            setBookingForm={setBookingForm}
            bookingSent={bookingSent}
            setBookingSent={setBookingSent}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            onOpenProject={openProjectPreview}
            activeTestimonial={activeTestimonial}
            setActiveTestimonial={setActiveTestimonial}
            testimonialSlides={testimonialSlides}
          />
        )}
      />
      <Route
        path="/project/:projectId"
        element={<ProjectDetailPage profile={safeProfile} portfolio={safePortfolio} onBack={() => navigate('/')} />}
      />
    </Routes>
  )
}

export default App
