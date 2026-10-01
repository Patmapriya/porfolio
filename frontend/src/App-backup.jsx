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
  { id: 'poster-design', label: 'Poster Designs', summary: 'Event and campaign posters built for attention and clarity.' },
  { id: 'website-design', label: 'Websites', summary: 'Premium websites that convert and clearly tell your story.' },
]

const fallbackPortfolio = [
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
    rate: '₹18,000',
    price: '₹18,000',
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
    rate: 'On request',
    price: 'On request',
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
    rate: 'On request',
    price: 'On request',
    finalResult: 'A digital service centre web portal providing online applications, document services, and tracking assistance.',
    techStack: ['React', 'Vite', 'Responsive UI', 'Digital Assistance', 'Service Portal'],
    liveUrl: 'https://sp-onlineservice.netlify.app',
  },
]

export default function AppBackup() {
  return null
}
