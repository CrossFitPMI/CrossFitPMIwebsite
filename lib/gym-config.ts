// Gym Configuration File
// Single location configuration for CrossFit PMI

export interface GymConfig {
  // Basic Information
  name: string;
  displayName: string;
  tagline: string;
  description: string;

  // Contact Information
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    address: {
      street: string;
      city: string;
      postcode: string;
      country: string;
      full: string;
    };
  };

  // Map
  mapEmbedUrl: string;

  // Operating Hours
  hours: {
    weekdays: string;
    friday: string;
    saturday: string;
    sunday: string;
    detailed: {
      [key: string]: string;
    };
  };

  // Website URLs
  urls: {
    website: string;
    booking: string;
    consultation: string;
    services: string;
    about: string;
    contact: string;
  };

  // Social Media Links
  social: {
    instagram: string;
    facebook: string;
    x: string;
    youtube: string;
  };

  // Timetable
  timetable: {
    embedUrl: string;
  };

  // Brand Assets
  assets: {
    logo: string;
    horizontalLogo: string;
    heroImage: string;
    communityImage: string;
    aboutImage: string;
    aboutImageMobile: string;
    aboutUsImage: string;
  };

  // Statistics
  stats: {
    members: string;
    rating: string;
    successRate: string;
    yearsOfExperience: string;
    experience: string;
  };

  // Programs/Services
  programs: Array<{
    name: string;
    description: string;
    duration: string;
    intensity: string;
    maxParticipants: string;
    price: string;
    features?: string[];
  }>;

  // Programs Navigation (for menus)
  programsNav: Array<{
    id: string;
    name: string;
    href: string;
  }>;

  // Team Members
  team: Array<{
    name: string;
    role: string;
    image: string;
    bio: string;
    qualifications?: string[];
    turningPoint?: string;
    passion?: string;
  }>;

  // Company Values
  values: Array<{
    title: string;
    description: string;
  }>;

  // Mission Statement
  mission: {
    title: string;
    statement: string;
    quote: string;
  };

  // Story
  story: {
    title: string;
    content: string[];
  };

  // Hero Section
  hero: {
    title: string;
    subtitle?: string;
    ctaText: string;
  };

  // About Section
  about: {
    journeyTitle: string;
    journeyContent: string[];
  };

  // Testimonials / Google Reviews
  testimonials: Array<{
    name: string;
    review: string;
  }>;

  // E-Books
  ebooks: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    tag: string;
  }>;

  // E-Books Webhook
  ebooksWebhookUrl: string;

  // Sweat Program Webhook
  sweatWebhookUrl: string;

  // SEO/Meta Information
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Main gym configuration
export const gymConfig: GymConfig = {
  // Basic Information
  name: 'CrossFit PMI',
  displayName: 'CrossFit PMI',
  tagline: 'Reach new heights no matter your fitness level',
  description: `Our passionate and knowledgeable coaching staff will strive to help you reach any goals, both inside and outside the gym.`,

  // Contact Information
  contact: {
    phone: '+353 61 788 386',
    email: 'info@crossfitpmi.com',
    whatsapp: '+353 61 788 386',
    address: {
      street: 'Unit 6C, Docklands Business Park',
      city: 'Limerick',
      postcode: 'V94 5H04',
      country: 'Ireland',
      full: 'Unit 6C, Docklands Business Park, Limerick, V94 5H04'
    }
  },
  // Map
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2420.1774853549423!2d-8.639285200000002!3d52.65677170000001!2m3!1f0!2f0!3f0!3m2!1sen!2sie!4f13.1!3m3!1m2!1s0x485b5c88b95e3e59%3A0x1f188009f4dbe6e7!2sCrossFit%20PMI!5e0!3m2!1sen!2sie!4v1774429909538!5m2!1sen!2sie', // Update with CrossFit PMI Google Maps embed URL,

  // Operating Hours
  hours: {
    weekdays: '6:30am – 8:30pm',
    friday: '6:30am – 7:30pm',
    saturday: '10:00am – 11:00am',
    sunday: '10:00am – 12:00pm',
    detailed: {
      'Monday': '6:30am – 8:30pm',
      'Tuesday': '6:30am – 8:30pm',
      'Wednesday': '6:30am – 8:30pm',
      'Thursday': '6:30am – 8:30pm',
      'Friday': '6:30am – 7:30pm',
      'Saturday': '10:00am – 11:00am',
      'Sunday': '10:00am – 12:00pm'
    }
  },

  // Website URLs
  urls: {
    website: 'https://www.crossfitpmi.com',
    booking: '/join',
    consultation: 'https://api.gymgrow.app/widget/booking/f8OQxOoGIvOSdAS0sWNg',
    services: '/services',
    about: '/about',
    contact: '/contact'
  },

  // Social Media Links
  social: {
    instagram: 'https://www.instagram.com/crossfit.pmi/',
    facebook: 'https://www.facebook.com/CrossfitPMI/',
    x: 'https://twitter.com/crossfitpmi/',
    youtube: 'https://www.youtube.com/c/CrossFitPMI',
  },

  // Timetable
  timetable: {
    embedUrl: 'https://crossfitpmi.pushpress.com/open/calendar?framed=1'
  },

  // Brand Assets
  assets: {
    logo: '/pmi-logo.png',
    horizontalLogo: '/pmi-logo.png',
    heroImage: '/hero.jpeg',
    communityImage: '/community.jpg',
    aboutImage: '/about.jpeg',
    aboutImageMobile: '/about-mobile.jpg',
    aboutUsImage: '/about-us.jpeg'
  },

  // Statistics
  stats: {
    members: '100+',
    rating: '5.0/5',
    successRate: '95%',
    yearsOfExperience: '5+',
    experience: 'Years of Expert Coaching'
  },

  // Programs/Services
  programs: [
    {
      name: 'CrossFit Classes',
      description: 'Our core offering designed to help you improve fitness through expert coaching and structured workouts. Suitable for all fitness levels.',
      duration: '60 min',
      intensity: 'High',
      maxParticipants: '15',
      price: 'Contact for pricing',
      features: [
        'Expert coaching',
        'Structured workouts',
        'Suitable for all fitness levels',
        'Build strength & fitness',
        'Supportive community'
      ]
    },
    {
      name: 'Foundation Course',
      description: '3 one-to-one sessions over 1 week designed to introduce new clients to fundamental CrossFit movements and how to scale them to their fitness level. Sessions take place every weekday at 7:30pm.',
      duration: '60 min',
      intensity: 'Beginner',
      maxParticipants: '1',
      price: 'Contact for pricing',
      features: [
        '3 one-to-one sessions',
        'Learn fundamental movements',
        'Personalized scaling',
        'Weekdays at 7:30pm',
        'Transition to regular classes'
      ]
    },
    {
      name: 'Sweat!',
      description: 'CrossFit-style movements without Olympic lifting and high-skill gymnastics. No prescribed weights, coach-guided warm-up and instruction, scaled to individual fitness levels. Perfect for any fitness level.',
      duration: '60 min',
      intensity: 'Medium',
      maxParticipants: '12',
      price: 'Contact for pricing',
      features: [
        'No Olympic lifting',
        'No high-skill gymnastics',
        'Individually scaled',
        'Coach-guided instruction',
        'All fitness levels welcome'
      ]
    },
    {
      name: 'Drop-In',
      description: 'For visitors in town or nearby. Train at CrossFit PMI as your temporary home away from home. Minimum 1 month CrossFit experience required.',
      duration: '60 min',
      intensity: 'High',
      maxParticipants: '15',
      price: 'Contact for pricing',
      features: [
        'Visitors welcome',
        'Sign up and pay for pass',
        'Schedule your class',
        'Digital check-in',
        'Min. 1 month experience'
      ]
    },
    {
      name: 'Nutrition Coaching',
      description: 'Simple habit-based approach with customized plans for long-term sustainable results. Accountability and support to optimize fitness through both exercise and nutrition.',
      duration: 'Custom',
      intensity: 'N/A',
      maxParticipants: '1',
      price: 'Contact for pricing',
      features: [
        'Habit-based approach',
        'Customized nutrition plan',
        'Long-term sustainable results',
        'Accountability & support',
        'Performance optimization'
      ]
    }
  ],

  // Programs Navigation (for menus)
  programsNav: [
    { id: 'sweat', name: 'Sweat', href: '/programs#sweat' },
    { id: 'hyrox', name: 'Hyrox', href: '/programs#hyrox' },
    { id: 'foundation', name: 'Foundation Course', href: '/programs#foundation' },
    { id: 'crossfit', name: 'CrossFit Classes', href: '/programs#crossfit' },
    { id: 'olympic-lifting', name: 'Olympic Lifting', href: '/programs#olympic-lifting' },
    { id: 'nutrition', name: 'Nutrition Coaching', href: '/programs#nutrition' },
    { id: 'inbody', name: 'InBody Scan', href: '/programs#inbody' }
  ],

  // Team Members
  team: [
    {
      name: 'Micheál Fitzpatrick',
      role: 'Owner & Head Coach',
      image: '/coaches/Micheal.jpg',
      qualifications: ['CrossFit Level 1', 'CrossFit Level 2', 'CrossFit Weightlifting'],
      bio: 'Micheál comes from an educational background and believes education is key to improving people\'s lives - both physically and mentally. He\'s on a mission to cut through the fitness industry\'s marketing noise and show members what it truly takes to reach their goals in a sustainable, lasting way.',
      turningPoint: 'Micheál believes that a small amount of hard work and a shift in perspective can completely transform a person. CrossFit opened his eyes to what really needs to be done to get in better shape sustainably.',
      passion: 'For him, CrossFit has something for everyone, no matter their background, and is extremely satisfying and rewarding in the long run.',
    },
    {
      name: 'Miguel Brenes',
      role: 'Coach',
      image: '/coaches/Miguel.jpg',
      qualifications: ['CrossFit L1', 'Swimming Instructor & Lifeguard'],
      bio: 'Miguel began his athletic journey in competitive swimming at a national level before transitioning to football and ultimately CrossFit. For the past five years he has been competing in the RX category, solidifying his passion for functional training and high-performance sport.',
      turningPoint: 'After losing motivation and battling mental fatigue, Miguel reconnected with his purpose, changed up his routines, and surrounded himself with inspiring people - rediscovering a passion that transformed both his performance and his life.',
      passion: 'Miguel genuinely enjoys seeing students progress - not just physically, but in their self-confidence - and that growth is what motivates him to keep developing as a coach.',
    },
    {
      name: 'John Ferris',
      role: 'Coach',
      image: '/coaches/John.jpeg',
      qualifications: ['CrossFit Level 1', 'Diploma in Personal Training & Strength & Conditioning - Setanta College'],
      bio: 'Growing up in Ireland, John\'s love of sport ran deep - from GAA to running, duathlons, and adventure races. He worked his way up from 10 km races in his teens to 220 km ultra-marathons in his forties, with a marathon PB of 2hrs 53min.',
      turningPoint: 'A 2015 injury forced John into the gym, where he discovered that strength and conditioning dramatically improved his endurance. In July 2023 he tried CrossFit and fell in love with its intensity, variety, and community.',
      passion: 'John loves sharing the rewards of CrossFit with others. For him, coaching is about guiding people to their personal milestones - and being there when those moments happen.',
    },
    {
      name: 'Vanessa Rueda Brazão',
      role: 'Coach',
      image: '/coaches/Vanessa.jpeg',
      qualifications: ['CF Level 1', 'Level 3 Fitness Instructor'],
      bio: 'Vanessa started CrossFit almost 7 years ago, before she wouldn’t do any sports or anything physically challenging. She tried going to regular gyms but found it was too boring. However, once she tried CrossFit she just fell in love with the sense of community and developing new abilities overtime. What made her keep showing up for was that she just loved discovering what fitness can do in peoples lives and especially how it improved hers.',
      turningPoint: `Her turning point was when she realised that everyone around her would tell her “I'll give you one month before you give up”. She didn’t like listening to it because it would make her realise that she would always start things but never keep it going. She used those words as fuel to keep going and now, 7 years later, she is consistent with her training and constantly improving!`,
      passion: `Her motivation is seeing what fitness can do to people’s lives! She love seeing beginners getting better at a certain movement that they can't do initially, or just showing up for themselves and winning the inner battle they carry inside against procrastination and laziness! She just loves the community and everything CrossFit can do to everyone who’s willing to give it a go!`,
    },
    {
      name: 'Katie O\'Dea',
      role: 'Coach',
      image: '/coaches/Katie.jpg',
      qualifications: ['CrossFit Level 1', 'Pregnancy & Postpartum', 'Women\'s Fitness & Physiology', 'Women\'s Physiology - Menopause Specialist'],
      bio: 'Growing up, Katie played many sports with camogie as her passion, competing at inter-county level. She started CrossFit after recognising the vital importance of strength training for women, and after two years of consistent training she decided to pursue coaching.',
      turningPoint: 'Two years of dedicated training led Katie to realise she could channel her experience into helping others - particularly women navigating unique physiological challenges.',
      passion: 'Katie specialises in coaching pregnant and postpartum women, and also trains female sports teams using cycle-syncing and nutrition strategies to maximise their potential on the field.',
    },
    {
      name: 'Tina Harper',
      role: 'Coach',
      image: '/coaches/Tina.jpg',
      qualifications: ['CrossFit Online Level 1'],
      bio: 'Tina started CrossFit in 2016 shortly after her second child was born. Having dabbled in running, boxing, and cycling, she found her true home from her very first CrossFit class and has been passionate about sharing that enthusiasm with PMI members ever since.',
      turningPoint: 'What began as a hobby quickly became a core part of Tina\'s daily routine, social life, and mental health. As her experience grew, so did her commitment to nutrition and movement mechanics, making coaching a natural next step.',
      passion: 'Tina is committed to helping members succeed - whether that means hitting a movement PB, moving well through a workout, or simply building a consistent routine and having fun along the way.',
    },
    {
      name: 'Philip McShannock',
      role: 'Coach',
      image: '/coaches/Philip.webp',
      qualifications: ['CrossFit Level 1'],
      bio: 'Growing up in Northern Ireland, Phil excelled in gymnastics at national level before pursuing rugby and athletics. When he first walked into CrossFit PMI, the welcoming atmosphere reignited his passion for training - a stark contrast to the commercial gym world he\'d left behind.',
      turningPoint: 'Phil\'s gymnastics foundations allowed him to progress quickly at CrossFit PMI, and within months he decided to take his Level 1 course. The constant challenges and the sense of community sealed his commitment to the sport.',
      passion: 'Loving the camaraderie of group classes, Phil strives to improve everyone\'s day with every session he coaches - building lasting friendships and fitness together.',
    },
    {
      name: 'Ryan Toohey',
      role: 'Coach',
      image: '/coaches/Ryan.jpg',
      qualifications: ['CrossFit L1'],
      bio: 'A GAA obsessive from childhood, Ryan represented his county at underage levels and hurled competitively until shoulder injuries - including two dislocations - ended his career at 24. CrossFit helped him rebuild stability and strength, and he\'s been hooked since 2020.',
      turningPoint: 'After years of inactivity and growing unhappiness with his health, Ryan turned to CrossFit as a new discipline. It built good habits across diet and exercise that transformed his physical and mental wellbeing - and his personal and professional life.',
      passion: 'Ryan became a coach to relay the methodology and foundations that helped him transform his health, and to help others do exactly the same.',
    },
  ],

  // Company Values
  values: [
    {
      title: 'Expert Coaching',
      description: 'Our experienced coaches provide personalized guidance and structured workouts to help every member improve their fitness, from complete beginners to experienced athletes.'
    },
    {
      title: 'Supportive Training',
      description: 'We create a supportive environment where members feel comfortable starting their fitness journey and progressing at their own pace.'
    },
    {
      title: 'Community & Support',
      description: 'CrossFit PMI is more than a gym - it\'s a community built on support and shared progress. We help people feel comfortable and motivated.'
    },
    {
      title: 'Consistent Habits',
      description: 'We focus on building sustainable fitness habits through structured workouts and accountability, helping members achieve long-term results.'
    }
  ],

  // Mission Statement
  mission: {
    title: 'Our Mission',
    statement: 'CrossFit PMI is a coaching-led gym helping people at different fitness levels improve their fitness through expert coaching, supportive training, and consistent habits.',
    quote: 'Reach new heights no matter your fitness level.'
  },

  // Story
  story: {
    title: 'Our Story',
    content: [
      'CrossFit PMI is located in Limerick, Ireland, about a 10-minute walk from the city centre and close to the motorway.',
      'We are a coaching-led gym focused on helping people at different fitness levels improve their fitness through expert coaching and supportive training.',
      'Whether you\'re a complete beginner or an experienced athlete, our structured workouts and welcoming community will help you build consistent habits and reach your fitness goals.'
    ]
  },

  // Hero Section
  hero: {
    title: 'Reach new heights no matter your fitness level',
    subtitle: 'Our passionate and knowledgeable coaching staff will strive to help you reach any goals, both inside and outside the gym.',
    ctaText: 'Free No-Sweat Intro'
  },

  // About Section
  about: {
    journeyTitle: 'Your Journey Starts Here',
    journeyContent: [
      `We understand how intimidating it can be to get started on a new fitness journey. Don't worry, our aim is to make your journey as simple as possible.`,
      'Our trainers are passionate and knowledgeable, helping you know what to do, keeping you on track. They celebrate with you every time you reach the next level!',
      'We don’t believe in quick fixes or gimmicks. We care about your long-term success above all else.'
    ]
  },

  // Testimonials / Google Reviews
  testimonials: [
    {
      name: 'Sunu V Sam',
      review: 'Was overwhelming at the start seeing so many fit individuals working out, but then thanks to our coaches who are absolutely brilliant and committed and making sure each one of us get the best coaching and support. I have become more agile, more fit, and yes more confident. CrossFit PMI you\'re an eye opener and a game changer.',
    },
    {
      name: 'Sean O\'Dwyer',
      review: 'CrossFit PMI is unreal. The coaching, the atmosphere, the push you get - nothing compares. Every session feels purposeful, and I\'m genuinely loving it. Couldn\'t recommend it more.',
    },
    {
      name: 'Amilcar Miller',
      review: 'CrossFit classes are awesome and super dynamic! The workouts are tough but at the same time so much fun, you actually look forward to them. The best part is that the coaches are always right there with you, making sure you\'re improving your technique and getting better every session.',
    },
    {
      name: 'Cian Collopy',
      review: 'Lovely gym with lovely people. Staff are so welcoming and excellent coaches. Would highly recommend CrossFit to anyone of any ability.',
    },
    {
      name: 'Chris Beville',
      review: 'CrossFit PMI is a great atmosphere and great gym to train in. Top notch facilities and excellent coaches who are very approachable and excellent at explaining the movements and workouts. A very friendly unique environment with a great community feel. Definitely recommend!',
    },
    {
      name: 'E.G. I',
      review: 'Very solid gym, good CrossFit programming and coaches comfortable providing options for different skill and fitness levels of participants. Very welcoming community, well organised, neat and accessible.',
    },
    {
      name: 'Helen Basini',
      review: 'I\'m two weeks in and it\'s been great fun. Really challenging at times but everyone is friendly and all the exercises scaled to ability whilst gently pushing you to your limits. There\'s loads of support from the coaches and other members. If you\'ve been considering it, try it, you won\'t be disappointed.',
    },
    {
      name: 'James Clancy',
      review: 'Great Gym with excellent coaches who are very friendly and helpful. They show you how to do all the exercises the correct way and are on hand throughout the session to guide you. People of all different shapes and sizes in the class and everyone encourages and supports each other. Great place to get fit and meet new people.',
    },
    {
      name: 'Kelsey L',
      review: 'The best gym! I love it! I look forward to every class. The coaches are incredible and take the time and care to know every person. I never regret a day I come here. If you want a great workout and a positive environment this is the place for you!',
    },
    {
      name: 'Flavia Poltronieri',
      review: 'Joining CrossFit was the best decision I could have made for my health. The coaches are outstanding, always attentive and willing to help. The atmosphere is welcoming, and the whole team continuously encourages beginners to improve. The facilities are top-notch. Highly recommend!',
    },
    {
      name: 'Angee Moten',
      review: 'I joined CrossFit PMI to learn to take better care of my body and mind and I honestly wish I had started years ago! I can already see a difference in my appetite, sleep and overall humor with only 3 weeks in! Our coaches are absolutely great, really approachable and friendly. Slowly but surely my confidence is growing!',
    },
  ],

  // E-Books
  ebooks: [
    {
      id: 'high-fibre-veggie-sides',
      name: 'High Fibre Veggie Sides',
      description: 'Discover 5 easy, healthy and tasty vegetable side dish recipes to fuel your training and support your nutrition goals.',
      image: '/e-books/high-fibre-veggie.png',
      tag: 'ebook-high-fibre-veggie-sides',
    },
    {
      id: 'hyrox-program',
      name: 'HYROX Program for CrossFitters',
      description: 'A structured HYROX training plan built specifically for CrossFit athletes looking to compete and perform at their best.',
      image: '/e-books/Hyrox-program.png',
      tag: 'ebook-hyrox-program',
    },
    {
      id: 'pull-up-program',
      name: 'Pull Up Program for CrossFitters',
      description: 'A progressive pull-up program designed for CrossFitters to build upper body strength and nail that first strict rep.',
      image: '/e-books/pull-up-program.png',
      tag: 'ebook-pull-up-program',
    },
    {
      id: 'marathon-program',
      name: 'Marathon Program for CrossFitters',
      description: 'A CrossFit-friendly marathon training plan to help you build endurance, pace yourself, and cross the finish line strong.',
      image: '/e-books/Running-program.png',
      tag: 'ebook-marathon-program',
    },
    {
      id: 'protein-essentials',
      name: 'Protein Unraveled: Quick-Start Guide',
      description: 'Essential insights on protein intake, timing, and quality to help you optimise your health and performance.',
      image: '/e-books/protein-essentials.png',
      tag: 'ebook-protein-essentials',
    },
    {
      id: 'protein-smoothies',
      name: '5 High Protein Smoothies',
      description: '5 delicious high-protein smoothie recipes to support recovery, fuel workouts, and keep you on track with your nutrition.',
      image: '/e-books/protein-smoothies.png',
      tag: 'ebook-protein-smoothies',
    },
    {
      id: 'snacking-habits',
      name: 'Transform Your Snacking Habits',
      description: 'Practical tips and healthy snack ideas to help you ditch the junk, stay fuelled, and support your fitness goals.',
      image: '/e-books/snacking-habits.png',
      tag: 'ebook-snacking-habits',
    },
  ],

  // E-Books Webhook
  ebooksWebhookUrl: 'https://services.leadconnectorhq.com/hooks/x2SQfuNunTMD3qCk5Yam/webhook-trigger/caQrIAi0vEFgNJyBW3lq',

  // Sweat Program Webhook
  sweatWebhookUrl: 'https://services.leadconnectorhq.com/hooks/x2SQfuNunTMD3qCk5Yam/webhook-trigger/79XVGIWnCMlV0qgltVBo',

  // SEO/Meta Information
  seo: {
    title: 'CrossFit PMI Limerick - Expert CrossFit Coaching & Training | Limerick',
    description: 'Reach new heights no matter your fitness level at CrossFit PMI Limerick. CrossFit classes, Foundation Course, Sweat! program & nutrition coaching. Free No-Sweat Intro available. Book today!',
    keywords: [
      'crossfit pmi limerick',
      'crossfit limerick',
      'limerick gym',
      'crossfit classes limerick',
      'fitness coaching limerick',
      'functional fitness limerick',
      'group training limerick',
      'crossfit training limerick',
      'docklands business park gym',
      'limerick city gym',
      'crossfit ireland',
      'fitness center limerick',
      'strength training limerick',
      'nutrition coaching limerick'
    ]
  }
};

// Helper function to get specific config values
export const getConfig = (path: string) => {
  const keys = path.split('.');
  let value: any = gymConfig;

  for (const key of keys) {
    value = value[key];
    if (!value) return null;
  }

  return value;
};