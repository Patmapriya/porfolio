from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Everus Studio API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/api/profile')
def get_profile():
    return {
        'studio': 'Everus Studio',
        'tagline': 'Web development and design experiences shaped for brands that want clarity, speed, and standout presence.',
        'location': 'Remote · India',
        'specialties': [
            'Web',
            'React',
            'UI/UX',
            'Python',
            'AI',
            'Design & Video',
        ],
        'team': [
            {
                'name': 'Sakthi',
                'role': 'Web Developer',
                'bio': 'Sakthi builds fast, clean, and conversion-focused web experiences using modern frontend and backend technologies, turning product ideas into dependable digital systems.',
                'skills': ['React', 'JavaScript', 'Responsive Design', 'Git & GitHub'],
            },
            {
                'name': 'Priya',
                'role': 'Designer / Developer',
                'bio': 'Priya blends product thinking, UX design, and visual craft to shape intuitive interfaces, polished brand experiences, and AI-enhanced creative solutions.',
                'skills': ['UI/UX', 'Figma', 'AI Design', 'Graphic Design', 'Design Systems'],
            },
        ],
        'stats': {
            'projects': 42,
            'avgLaunch': '1-3 weeks',
            'clients': 18,
        },
        'about': 'We are Sakthi and Priya, a collaborative creative duo blending web development, UX strategy, and AI-powered design thinking to build polished digital experiences that feel premium and perform with purpose.',
    }


@app.get('/api/work-categories')
def get_work_categories():
    return [
        {
            'id': 'thumbnail-design',
            'label': 'Thumbnail Design',
            'summary': 'High-CTR visual hooks for YouTube, reels, and short-form content.',
        },
        {
            'id': 'poster-design',
            'label': 'Poster Designs',
            'summary': 'Event posters, promo graphics, and brand-led campaign creatives.',
        },
        {
            'id': 'website-design',
            'label': 'Websites',
            'summary': 'Premium responsive websites that tell a clear story and convert.',
        },
        {
            'id': 'chatbot',
            'label': 'Chatbot',
            'summary': 'Interactive AI assistants for instant answers and support.',
        },
    ]


@app.get('/api/portfolio')
def get_portfolio():
    return [
        {
            'id': 'poster-priya-invitation',
            'title': 'Priya Invitation Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A floral invitation composition with soft luxury tones, elegant spacing, and premium event styling for personal celebrations.',
            'image': '/priya-invitation.jpg.jpeg',
            'sales': '300+ shares',
            'rate': '₹2,200',
            'techStack': ['Invitation Design', 'Floral Styling', 'Typography', 'Luxury Branding'],
            'previewUrl': '/priya-invitation.jpg.jpeg',
        },
        {
            'id': 'poster-menu-card',
            'title': 'Menu Card Design',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A visually engaging menu card design created to present food and drink offerings with a clear, inviting layout.',
            'image': '/images/menucard.jpeg',
            'sales': 'Menu card design',
            'rate': '₹100',
            'techStack': ['Menu Design', 'Typography', 'Layout Design', 'Branding'],
            'previewUrl': '/images/menucard.jpeg',
        },
        {
            'id': 'thumbnail-beauty',
            'title': 'Beauty Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'An eye-catching beauty-themed thumbnail designed to stand out across digital content.',
            'image': '/images/beauty thumbnail.jpeg',
            'sales': 'Thumbnail design',
            'rate': '₹250',
            'techStack': ['Beauty', 'Thumbnail Design', 'Digital Content'],
            'previewUrl': '/images/beauty thumbnail.jpeg',
        },
        {
            'id': 'thumbnail-image-1',
            'title': 'News Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'A custom thumbnail design created to stand out in digital content feeds.',
            'image': '/images/thumbnail 1.png',
            'sales': 'Thumbnail design',
            'rate': '₹250',
            'techStack': ['Thumbnail Design', 'YouTube', 'Digital Content'],
            'previewUrl': '/images/thumbnail 1.png',
        },
        {
            'id': 'thumbnail-image-2',
            'title': 'Vlog Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'A custom thumbnail design created to stand out in digital content feeds.',
            'image': '/images/thumbnail 2.png',
            'sales': 'Thumbnail design',
            'rate': '₹200',
            'techStack': ['Thumbnail Design', 'YouTube', 'Digital Content'],
            'previewUrl': '/images/thumbnail 2.png',
        },
        {
            'id': 'thumbnail-image-3',
            'title': 'Mysterious Place Vlog Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'A custom thumbnail design created to stand out in digital content feeds.',
            'image': '/images/thumbnail 3.png',
            'sales': 'Thumbnail design',
            'rate': '₹300',
            'techStack': ['Thumbnail Design', 'YouTube', 'Digital Content'],
            'previewUrl': '/images/thumbnail 3.png',
        },
        {
            'id': 'thumbnail-image-5',
            'title': 'My First Sales Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'A custom thumbnail design created to stand out in digital content feeds.',
            'image': '/images/thumbnail 5.png',
            'sales': 'Thumbnail design',
            'rate': '₹150',
            'techStack': ['Thumbnail Design', 'YouTube', 'Digital Content'],
            'previewUrl': '/images/thumbnail 5.png',
        },
        {
            'id': 'thumbnail-image-6',
            'title': 'Study Tips Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'A custom thumbnail design created to stand out in digital content feeds.',
            'image': '/images/thumbnail 6.png',
            'sales': 'Thumbnail design',
            'rate': '₹200',
            'techStack': ['Thumbnail Design', 'YouTube', 'Digital Content'],
            'previewUrl': '/images/thumbnail 6.png',
        },
        {
            'id': 'thumbnail-image-7',
            'title': 'Digital Content Thumbnail',
            'category': 'thumbnail-design',
            'categoryLabel': 'Thumbnail Design',
            'description': 'A custom thumbnail design created to stand out in digital content feeds.',
            'image': '/images/thumbnail 7.png',
            'sales': 'Thumbnail design',
            'rate': '₹100',
            'techStack': ['Thumbnail Design', 'YouTube', 'Digital Content'],
            'previewUrl': '/images/thumbnail 7.png',
        },
        {
            'id': 'poster-coffee',
            'title': 'Coffee Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A promotional coffee poster designed to showcase the product with an inviting visual layout.',
            'image': '/images/coffee poster.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Poster Design', 'Coffee Promotion', 'Visual Layout'],
            'previewUrl': '/images/coffee poster.jpeg',
        },
        {
            'id': 'poster-college-advertisement',
            'title': 'College Advertisement',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A college advertisement poster designed to present key information in a clear, engaging format.',
            'image': '/images/college advertisement.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Poster Design', 'Education', 'Visual Layout'],
            'previewUrl': '/images/college advertisement.jpeg',
        },
        {
            'id': 'poster-invitation',
            'title': 'Invitation Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'An invitation design arranged to make event details clear and visually appealing.',
            'image': '/images/invitation.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Invitation Design', 'Typography', 'Event Design'],
            'previewUrl': '/images/invitation.jpeg',
        },
        {
            'id': 'poster-dress',
            'title': 'Dress Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A fashion poster highlighting a dress design with a clean, attention-grabbing composition.',
            'image': '/images/dress poster.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Poster Design', 'Fashion', 'Visual Layout'],
            'previewUrl': '/images/dress poster.jpeg',
        },
        {
            'id': 'poster-movie',
            'title': 'Movie Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A cinematic movie poster designed to create interest and present the film visually.',
            'image': '/images/movie poster.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Poster Design', 'Movie Promotion', 'Visual Storytelling'],
            'previewUrl': '/images/movie poster.jpeg',
        },
        {
            'id': 'poster-pizza',
            'title': 'Pizza Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A food promotion poster featuring pizza in a bold, appetizing layout.',
            'image': '/images/pizza poster.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Poster Design', 'Food Promotion', 'Visual Layout'],
            'previewUrl': '/images/pizza poster.jpeg',
        },
        {
            'id': 'poster-titanic',
            'title': 'Titanic Poster',
            'category': 'poster-design',
            'categoryLabel': 'Poster Design',
            'description': 'A Titanic-themed movie poster arranged as a cinematic visual tribute.',
            'image': '/images/titanic poster.jpeg',
            'sales': 'Poster design',
            'rate': '₹100',
            'techStack': ['Poster Design', 'Movie Tribute', 'Visual Storytelling'],
            'previewUrl': '/images/titanic poster.jpeg',
        },
        {
            'id': 'website-mobile-mart',
            'title': 'Mobile Mart Store',
            'category': 'website-design',
            'categoryLabel': 'Website Design',
            'description': 'A mobile-first storefront built for quick discovery, product trust, and strong conversion journeys for modern gadget buyers.',
            'image': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
            'sales': '₹1.8L revenue',
            'rate': '₹4,000',
            'techStack': ['React', 'Vite', 'Responsive UI', 'E-commerce UX', 'Conversion Design'],
            'liveUrl': 'https://mobile-mart-x8mu.onrender.com',
            'githubUrl': 'https://github.com/everus-studio/mobile-mart',
        },
        {
            'id': 'website-paintpro',
            'title': 'PaintPro',
            'category': 'website-design',
            'categoryLabel': 'Website Design',
            'description': 'A polished painting services website designed to showcase PaintPro offerings and make it easy for customers to get started.',
            'image': 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80',
            'sales': 'Live project',
            'rate': '₹5,500',
            'techStack': ['React', 'Vite', 'Responsive UI', 'Service Website'],
            'liveUrl': 'https://paintpro-1.netlify.app',
        },
        {
            'id': 'website-sp-digital-service',
            'title': 'SP Digital Service',
            'category': 'website-design',
            'categoryLabel': 'Website Design',
            'client': 'SP Digital Service',
            'description': 'SP Digital Service — a digital service centre website for online applications, document services, application tracking and other digital assistance.',
            'image': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
            'sales': 'Live project',
            'rate': '₹2,700',
            'techStack': ['React', 'Vite', 'Responsive UI', 'Digital Assistance', 'Service Portal'],
            'liveUrl': 'https://sp-onlineservice.netlify.app',
        },
        {
            'id': 'chatbot-ai-assistant',
            'title': 'AI Chatbot Assistant',
            'category': 'chatbot',
            'categoryLabel': 'CHATBOT',
            'description': 'An AI-powered chatbot built to provide intelligent, interactive conversations.',
            'image': '/images/chatbot.svg',
            'sales': 'Interactive project',
            'rate': '₹5,000',
            'techStack': ['AI', 'Gemini', 'Python', 'API', 'Chatbot'],
            'liveUrl': 'https://my-gemini-chatbot-bjuh.onrender.com/',
        },
        {
            'id': 'chatbot-ai-new',
            'title': 'AI Chatbot',
            'category': 'chatbot',
            'categoryLabel': 'CHATBOT',
            'description': 'An AI-powered chatbot built with Node.js and Gemini API, featuring a mobile-first design and daily usage tracking.',
            'image': '/images/chatbot-new.jpg',
            'sales': 'Live Demo',
            'rate': '₹5,000',
            'techStack': ['AI', 'Gemini', 'Node.js', 'Express', 'Chatbot'],
            'liveUrl': 'https://my-new-chatbot-81d5.onrender.com',
        },
        {
            'id': 'chatbot-ai-3',
            'title': 'AI Chatbot 3',
            'category': 'chatbot',
            'categoryLabel': 'CHATBOT',
            'description': 'Smarter conversations, better solutions. Get quick, accurate and helpful answers with this AI Chatbot powered by Gemini.',
            'image': '/images/chatbot-3.jpg',
            'sales': 'Live Demo',
            'rate': '₹5,000',
            'techStack': ['AI', 'Gemini', 'Node.js', 'Express', 'Chatbot'],
            'liveUrl': 'https://my-chatbot-ctxv.onrender.com',
        },
    ]


@app.get('/api/services')
def get_services():
    return [
        {
            'name': 'Thumbnail Design',
            'summary': 'High-converting thumbnails that make people stop, click, and watch with confidence.',
            'price': 'From ₹200',
        },
        {
            'name': 'Poster Design',
            'summary': 'Promotional posters and campaign visuals crafted to grab attention and elevate brand presence.',
            'price': 'From ₹300',
        },
        {
            'name': 'Website Design',
            'summary': 'Modern responsive websites that balance performance, storytelling, and conversion.',
            'price': 'From ₹4,000',
        },
        {
            'name': 'Social Content',
            'summary': 'Short-form creative direction for reels, promos, and launch assets that feel polished and strategic.',
            'price': 'From ₹300',
        },
        {
            'name': 'Landing Pages',
            'summary': 'Focused pages designed to explain your offer quickly and move visitors toward action.',
            'price': 'From ₹400',
        },
    ]


@app.get('/api/skills')
def get_skills():
    return [
        {
            'title': 'Design',
            'items': ['Figma', 'Photoshop', 'Brand Systems', 'Layout Design', 'Typography'],
        },
        {
            'title': 'Development',
            'items': ['React', 'Vite', 'JavaScript', 'Python', 'Responsive UI'],
        },
        {
            'title': 'Strategy',
            'items': ['UX Writing', 'Conversion Design', 'Content Direction', 'Launch Planning'],
        },
    ]


@app.get('/api/testimonials')
def get_testimonials():
    testimonials = [
        {
            'name': 'Nandha Kumar',
            'role': 'Founder, Yuvamangalam',
            'quote': 'The poster design gave our event real pull. It looked premium, felt intentional, and helped us attract a much bigger audience.',
        },
        {
            'name': 'Anisha',
            'role': 'Content Creator',
            'quote': 'Our new thumbnails changed the click-through rate immediately. The visuals feel so much cleaner and way more clickable.',
        },
        {
            'name': 'Arjun',
            'role': 'Small Business Owner',
            'quote': 'From message to launch, the process was smooth and professional. We finally have a site that feels like our brand.',
        },
    ]
    sample_quotes = [
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
    testimonials.extend(
        {
            'name': f'Sample Client {index:02d}',
            'role': 'Sample feedback (demo)',
            'quote': quote,
        }
        for index, quote in enumerate(sample_quotes, start=4)
    )
    return testimonials


@app.get('/api/pricing')
def get_pricing():
    return [
        {
            'plan': 'Thumbnail Design',
            'price': 'Starting at ₹150',
            'description': 'Eye-catching thumbnails designed to improve CTR and make your content stand out in crowded feeds.',
            'features': ['1 main thumbnail concept', '2 revision rounds', 'Brand-aware color and layout direction', 'High-contrast, click-worthy composition'],
            'contactLabel': 'Contact Me',
            'contactLink': 'mailto:nbrucelee76@gmail.com?subject=Thumbnail%20Design%20Inquiry',
        },
        {
            'plan': 'Poster Design',
            'price': 'Starting at ₹300',
            'description': 'Event and campaign posters built for clarity, visibility, and strong visual impact.',
            'features': ['Poster layout design', 'Typography and hierarchy refinement', 'Custom event/promo styling', 'Social-ready export dimensions'],
            'contactLabel': 'Contact Me',
            'contactLink': 'mailto:nbrucelee76@gmail.com?subject=Poster%20Design%20Inquiry',
        },
        {
            'plan': 'Website Design',
            'price': 'Starting at ₹4,000',
            'description': 'Premium responsive websites that balance aesthetics, clarity, and conversion-focused user experience.',
            'features': ['Landing page or multi-section website', 'Modern responsive layout', 'Brand styling and content structure', 'Launch-ready design system'],
            'contactLabel': 'Contact Me',
            'contactLink': 'mailto:nbrucelee76@gmail.com?subject=Website%20Design%20Inquiry',
        },
    ]
