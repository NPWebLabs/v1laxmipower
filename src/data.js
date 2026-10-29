export const PHONE = '8208580903'
export const PHONE_DISPLAY = '+91 82085 80903'
export const TEL = `tel:+91${PHONE}`
export const WHATSAPP = '8208580903'
export const WHATSAPP_DISPLAY = '+91 82085 80903'
export const EMAIL = 'laxmipower607@gmail.com'
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry from website')}`
export const ADDRESS = 'Barshi, District Solapur, Maharashtra, India'
export const MAPS = 'https://maps.google.com/?q=Barshi,+Solapur,+Maharashtra'
export const WA = (text) => `https://wa.me/91${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`
// Contact-form endpoint. Set VITE_CONTACT_API when the API runs on a different domain.
export const CONTACT_API = import.meta.env.VITE_CONTACT_API || '/api/contact'
export { NEEDS } from './needs.js'

// Site structure. `href` starting with '#/' is a page; plain '#id' is a section on the home page.
export const NAV = [
  { href: '#top', label: 'Home' },
  { href: '#/about', label: 'About Us', children: [
    { href: '#/about/story', label: 'Our story' },
    { href: '#/about/vision', label: 'Vision & mission' },
    { href: '#/about/why', label: 'Why Laxmi Power' },
    { href: '#/about/team', label: 'Our team' },
  ] },
  { href: '#/products', label: 'Products' },
  { href: '#brands', label: 'Our Brands' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Laxmi Power' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#/gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact Us' },
]

// Product catalogue (Products page + home categories).
// Specs are typical ranges for each category — adjust to the models Laxmi Power actually stocks.
export const PRODUCTS = [
  { id: 'car', icon: 'Car', title: 'Car & SUV Batteries', short: 'Car batteries', need: 'Car / SUV battery',
    img: 'img/doorstep.webp', alt: 'Technicians fitting a new car battery',
    text: 'Maintenance-free batteries for hatchbacks, sedans, SUVs and MUVs, matched to your vehicle make, model and fuel type.',
    specs: [['Voltage', '12 V'], ['Capacity', '35 – 100 Ah'], ['Type', 'Maintenance-free / SMF'], ['Ideal for', 'Petrol, diesel & CNG cars']],
    tags: ['Hatchback', 'Sedan', 'SUV', 'Diesel / CNG'] },
  { id: 'two-wheeler', icon: 'Bike', title: 'Two-wheeler Batteries', short: 'Two-wheeler batteries', need: 'Two-wheeler battery',
    img: 'img/store-shelves.webp', alt: 'Shelves stocked with two-wheeler and car batteries',
    text: 'Compact, spill-proof batteries for motorcycles and scooters with dependable self-start performance.',
    specs: [['Voltage', '12 V'], ['Capacity', '2.5 – 9 Ah'], ['Type', 'VRLA / maintenance-free'], ['Ideal for', 'Bikes, scooters, mopeds']],
    tags: ['Motorcycle', 'Scooter', 'Self-start'] },
  { id: 'tractor', icon: 'Tractor', title: 'Tractor & Farm Batteries', short: 'Tractor batteries', need: 'Tractor battery',
    img: 'img/agri.webp', alt: 'Farmer standing in front of his tractor in a field',
    text: 'High-cranking batteries built for tractors and farm equipment that work long hours in heat and dust.',
    specs: [['Voltage', '12 V'], ['Capacity', '75 – 120 Ah'], ['Type', 'High-cranking flat plate'], ['Ideal for', 'Tractors, harvesters, pumps']],
    tags: ['Tractor', 'Harvester', 'Farm equipment'] },
  { id: 'commercial', icon: 'Truck', title: 'Commercial Vehicle Batteries', short: 'Commercial batteries', need: 'Commercial vehicle battery',
    img: 'img/store-wall.webp', alt: 'Battery display wall inside the Laxmi Power store',
    text: 'Heavy-duty batteries for trucks, buses, pick-ups, auto-rickshaws and construction equipment.',
    specs: [['Voltage', '12 V'], ['Capacity', '80 – 200 Ah'], ['Type', 'Heavy-duty flat plate'], ['Ideal for', 'Trucks, buses, JCB, autos']],
    tags: ['Truck', 'Bus', 'Pick-up', 'Auto-rickshaw'] },
  { id: 'inverter-battery', icon: 'BatteryFull', title: 'Inverter Batteries', short: 'Inverter batteries', need: 'Inverter battery',
    img: 'img/store-tubular.webp', alt: 'Tall tubular inverter batteries in their boxes',
    text: 'Long-life tall tubular and flat-plate batteries for reliable backup at homes, shops and offices.',
    specs: [['Voltage', '12 V'], ['Capacity', '100 – 220 Ah'], ['Type', 'Tall tubular / flat plate'], ['Ideal for', 'Homes, shops, offices']],
    tags: ['Tall tubular', 'Flat plate', 'Long backup'] },
  { id: 'inverter', icon: 'BatteryCharging', title: 'Home & Shop Inverters', short: 'Inverters', need: 'Inverter',
    img: 'img/inverter-home.webp', alt: 'Home inverter connected to a tall tubular battery',
    text: 'Sine-wave inverters sized to your load, from a few fans and lights to a full shop or clinic, with installation.',
    specs: [['Rating', '600 VA – 2 kVA'], ['Output', 'Pure / modified sine wave'], ['Battery', 'Single & dual battery'], ['Ideal for', 'Homes, shops, clinics']],
    tags: ['Pure sine wave', 'Single / dual battery', 'Installation'] },
]

// Brands shown in "Our Brands". TODO: confirm this list with Laxmi Power before going live.
export const BRANDS = [
  { name: 'Exide', note: 'Automotive & inverter' },
  { name: 'Amaron', note: 'Automotive' },
  { name: 'SF Sonic', note: 'Automotive' },
  { name: 'Livguard', note: 'Inverter & batteries' },
  { name: 'Luminous', note: 'Inverter & batteries' },
  { name: 'Microtek', note: 'Inverters' },
]

// Testimonials from Laxmi Power's dealer and business partners (text as supplied by Laxmi Power).
// img: head-and-shoulders crop for the round avatar · photo: the full original.
export const TESTIMONIALS = [
  { name: 'Santosh Ghongane', business: 'Guruprasad Battery', place: 'Barshi', img: 'img/testimonials/faces/santosh-ghongane.jpg', photo: 'img/testimonials/santosh-ghongane.jpg',
    text: 'Laxmi Power stands out for its customer-focused approach and commitment to reliable battery solutions. A dependable business partner for customers looking for quality products and service.' },
  { name: 'Rajashree Dev', business: 'Laxmi Enterprise', place: 'Barshi', img: 'img/testimonials/faces/rajashree-dev.jpg', photo: 'img/testimonials/rajashree-dev.jpg',
    text: 'A business grows when it focuses on customer needs, product quality and dependable service. Laxmi Power’s commitment to these principles supports a strong foundation for long-term growth.' },
  { name: 'Ganesh Ghongane', business: 'Ganesh Battery', place: 'Solapur', img: 'img/testimonials/faces/ganesh-ghongane.jpg', photo: 'img/testimonials/ganesh-ghongane.jpg',
    text: 'A good battery solutions partner should understand customer requirements and recommend the right products. Laxmi Power aims to bring product knowledge, dependable support and customer satisfaction together.' },
  { name: 'Mustaffa Shaikh', business: 'Vairag Auto Service', place: 'Vairag', img: 'img/testimonials/faces/mustaffa-shaikh.jpg', photo: 'img/testimonials/mustaffa-shaikh.jpg',
    text: 'Reliable battery solutions are important for keeping vehicles running smoothly. Laxmi Power’s focus on suitable products and service support reflects what customers value in a local power solutions provider.' },
  { name: 'Kiran Dev', business: 'Swami Power', place: 'Pune', img: 'img/testimonials/faces/kiran-dev.jpg', photo: 'img/testimonials/kiran-dev.jpg',
    text: 'For battery and inverter customers, product reliability and the right guidance matter. Laxmi Power’s focus on dependable power solutions and customer support is a valuable approach.' },
  { name: 'Jiva Choudhari', business: 'Jay Ganesh Automobiles', place: 'Barshi', img: 'img/testimonials/faces/jiva-choudhari.jpg', photo: 'img/testimonials/jiva-choudhari.jpg',
    text: 'A customer-friendly battery business makes it easier to find suitable solutions for different vehicles. Laxmi Power’s emphasis on quality products and practical support is a positive step towards better customer service.' },
  { name: 'Nana Bhandwalkar', business: 'Gajanan Battery', place: 'Bhoom, Dharashiv', img: 'img/testimonials/faces/nana-bhandwalkar.jpg', photo: 'img/testimonials/nana-bhandwalkar.jpg',
    text: 'Customers need dependable battery options and clear guidance before making a purchase. Laxmi Power’s customer-first approach can help build confidence and long-term relationships.' },
  { name: 'Sudharshan Sirsat', business: 'S.S. Battery', place: 'Dharashiv', img: 'img/testimonials/faces/sudharshan-sirsat.jpg', photo: 'img/testimonials/sudharshan-sirsat.jpg',
    text: 'Consistency in product quality and service is essential in the battery business. Laxmi Power’s commitment to reliable power solutions and customer support is the kind of approach that builds trust.' },
  { name: 'Sandeep Dain', business: 'Gajanan Battery', place: 'Paranda, Dharashiv', img: 'img/testimonials/faces/sandeep-dain.jpg', photo: 'img/testimonials/sandeep-dain.jpg',
    text: 'Battery customers value the right product for their vehicle and dependable assistance when they need it. Laxmi Power’s focus on accessible power solutions is well aligned with these needs.' },
  { name: 'Javed Shaikh', business: 'J.S. Battery', place: 'Kurduwadi', img: 'img/testimonials/faces/javed-shaikh.jpg', photo: 'img/testimonials/javed-shaikh.jpg',
    text: 'Finding suitable batteries and receiving clear product guidance can make the buying experience much easier. Laxmi Power’s emphasis on reliable products and helpful service is a strong customer-focused direction.' },
]

export const SERVICES = [
  { icon: 'Wrench', title: 'Installation Services', img: 'img/install.webp', alt: 'Technician wiring batteries to a wall-mounted inverter', span: 'lg:col-span-2',
    text: 'Installation support for battery and inverter systems at residential and commercial premises.' },
  { icon: 'Gauge', title: 'Battery Health Check-up', img: 'img/health.webp', alt: 'Technician testing a car battery with a multimeter',
    text: 'Battery testing and health assessment to help customers understand battery condition and identify potential maintenance or replacement needs.' },
  { icon: 'Truck', title: 'Doorstep & After-Sales Service', img: 'img/doorstep.webp', alt: 'Technicians replacing a car battery',
    text: 'Convenient service support for battery replacement, maintenance and basic technical assistance, subject to service availability.' },
  { icon: 'Smartphone', title: 'Digital Ordering & Service Support', img: 'img/digital.webp', alt: 'Shop owner placing an order on a phone', planned: true,
    text: 'A planned technology-enabled approach to product enquiries, service requests and customer support.', span: 'lg:col-span-2' },
]

export const WHY = [
  { k: 'Experience since 2018', v: 'Established local business experience.' },
  { k: 'Multiple applications', v: 'Solutions for vehicles, agriculture, homes and businesses.' },
  { k: 'B2B & B2C service', v: 'Serving both individual customers and business partners.' },
  { k: 'Convenient support', v: 'Consultation and doorstep service options.' },
  { k: 'Transparent communication', v: 'Clear product information and pricing.' },
  { k: 'Ongoing assistance', v: 'Support beyond the initial purchase.' },
]

export const FAQS = [
  { q: 'What products does Laxmi Power offer?', a: 'Laxmi Power deals in automotive batteries for motorcycles, cars, tractors and commercial vehicles, along with inverter and inverter-battery solutions.' },
  { q: 'Does Laxmi Power provide installation services?', a: 'Installation support for battery and inverter systems is part of our service offering. Contact us to confirm availability for your location and requirements.' },
  { q: 'Do you serve wholesale and retail customers?', a: 'Yes. Laxmi Power serves individual customers as well as dealers, garages, retailers and other business customers.' },
  { q: 'Do you provide doorstep service?', a: 'Doorstep consultation and service support are part of our expansion model. Please contact us to confirm the current availability of the service in your area.' },
  { q: 'Where does Laxmi Power operate?', a: 'Laxmi Power is based in Barshi, Maharashtra, and serves Barshi and surrounding markets. Contact us to confirm service availability at your location.' },
  { q: 'How can I enquire about a battery or inverter?', a: 'Contact our team with your vehicle or inverter details and requirements. We can help you enquire about product availability and suitable options.' },
]

export const GALLERY = [
  { src: 'img/store-shelves.webp', alt: 'Shelves stocked with car and two-wheeler batteries', w: 'w-[420px]' },
  { src: 'img/store-tubular.webp', alt: 'Tall tubular inverter batteries in their boxes', w: 'w-[200px]' },
  { src: 'img/store-wall.webp', alt: 'Battery display wall inside the Laxmi Power store', w: 'w-[460px]' },
  { src: 'img/store-stack.webp', alt: 'Stacked battery stock beside a steel rack', w: 'w-[200px]' },
  { src: 'img/store-team.webp', alt: 'Laxmi Power team with a new consignment of batteries', w: 'w-[460px]' },
  { src: 'img/store-rack.webp', alt: 'Racks of boxed batteries sorted by model', w: 'w-[200px]' },
  { src: 'img/store-floor.webp', alt: 'New battery stock unpacked on the store floor', w: 'w-[200px]' },
]

// Gallery page: every photo, grouped. Add new photos to public/img and list them here.
export const PHOTO_GROUPS = ['Our store', 'Products & service', 'Customers we serve']
export const PHOTOS = [
  { src: 'img/store-team.webp', group: 'Our store', alt: 'The Laxmi Power team with a new consignment of batteries' },
  { src: 'img/store-shelves.webp', group: 'Our store', alt: 'Shelves stocked with car and two-wheeler batteries' },
  { src: 'img/store-wall.webp', group: 'Our store', alt: 'Battery display wall inside the Laxmi Power store' },
  { src: 'img/store-rack.webp', group: 'Our store', alt: 'Racks of boxed batteries sorted by model' },
  { src: 'img/store-tubular.webp', group: 'Our store', alt: 'Tall tubular inverter batteries in their boxes' },
  { src: 'img/store-stack.webp', group: 'Our store', alt: 'Stacked battery stock beside a steel rack' },
  { src: 'img/store-floor.webp', group: 'Our store', alt: 'New battery stock unpacked on the store floor' },
  { src: 'img/doorstep.webp', group: 'Products & service', alt: 'Technicians replacing a car battery' },
  { src: 'img/install.webp', group: 'Products & service', alt: 'Technician wiring batteries to a wall-mounted inverter' },
  { src: 'img/health.webp', group: 'Products & service', alt: 'Technician testing a car battery with a multimeter' },
  { src: 'img/tester.webp', group: 'Products & service', alt: 'Battery tester showing a good battery result' },
  { src: 'img/inverter-home.webp', group: 'Products & service', alt: 'Home inverter connected to a tall tubular battery' },
  { src: 'img/inverter-wall.webp', group: 'Products & service', alt: 'Wall-mounted inverter installation' },
  { src: 'img/digital.webp', group: 'Products & service', alt: 'Shop owner placing an order on a phone' },
  { src: 'img/residential.webp', group: 'Customers we serve', alt: 'Family at home beside an inverter and battery' },
  { src: 'img/commercial.webp', group: 'Customers we serve', alt: 'Shopkeeper standing in her general store' },
  { src: 'img/agri.webp', group: 'Customers we serve', alt: 'Farmer standing in front of his tractor in a green field' },
  { src: 'img/garage.webp', group: 'Customers we serve', alt: 'Mechanic working on a car engine in his garage' },
  { src: 'img/institution.webp', group: 'Customers we serve', alt: 'Health centre building with palm trees' },
]

// About page + home team cards. `id` links a home card to the person's section: #/about/<id>
export const TEAM = [
  { id: 'sushma', name: 'Mrs. Sushma Sagar Agawane', role: 'Founder & CEO', img: 'img/founder.webp', since: 'Nearly eight years in the battery industry',
    bio: [
      'Mrs. Sushma Sagar Agawane is a determined entrepreneur with nearly eight years of experience in the battery industry. A B.A. graduate, she began her entrepreneurial journey with an investment of just ₹10,000 and gradually built Laxmi Power into an established business through hard work, integrity and perseverance.',
      'Beyond the battery industry, her passion for beauty and wellness led her to receive professional training from renowned beauty expert Mrs. Sandhya Tasgaonkar and establish her own beauty parlour. A cooking enthusiast and yoga practitioner, she believes in continuous learning, discipline and personal growth.',
      'Under her leadership, Laxmi Power aims to become a trusted, technology-enabled provider of complete battery and power solutions while creating local employment opportunities and inspiring aspiring women entrepreneurs.',
    ],
    quote: 'Every successful journey begins with a small step, a strong belief and the determination to never give up.' },
  { id: 'madhubala', name: 'Madhubala Vidhate', role: 'Sales & Purchase Manager', img: 'img/madhubala.webp', since: 'With Laxmi Power for five years',
    bio: ['A homemaker by background, Madhubala Vidhate has been associated with Laxmi Power for the past five years. With a strong desire to learn, work and become financially independent, she embraced the opportunity offered by Mrs. Sushma Sagar Agawane. Her journey reflects how the right opportunity can empower a homemaker to become confident, skilled and financially self-reliant.'],
    quote: 'Sushma Ma’am gave me the opportunity to work and earn independently. Today, Laxmi Power has given me financial stability, confidence, and a sense of independence. I am truly grateful for this opportunity and proud to be part of Laxmi Power.' },
  { id: 'dipali', name: 'Dipali Ukirde', role: 'Accountant', img: 'img/dipali.webp', since: 'With Laxmi Power for two years',
    bio: ['Dipali Ukirde has been working as an Accountant with Laxmi Power for the past two years. A Commerce graduate with accounting experience, she was given the opportunity by Mrs. Sushma Sagar Agawane to contribute her skills and build a stable source of income. Alongside managing her responsibilities as a homemaker, Dipali is also passionate about painting and preparing and selling homemade products such as papad and pickles. Her journey reflects her dedication to work, willingness to learn, and determination to make the most of her skills and opportunities.'] },
]

export const VISION = 'To become a trusted and technology-enabled power-solutions provider in the region, delivering reliable batteries, inverters, installation and after-sales services through a strong local network, digital innovation and customer-centric solutions.'
export const MISSION = 'To provide quality batteries and inverter solutions with dependable installation, maintenance and after-sales service, while leveraging digital ordering, doorstep support and battery health monitoring to deliver a seamless customer experience.'

export const GOALS = [
  'Develop an integrated battery, inverter, installation and service business.',
  'Expand our dealer, distribution and service network.',
  'Introduce digital ordering and service-request facilities.',
  'Promote battery health checks and preventive maintenance.',
  'Deliver timely and professional after-sales support.',
  'Create local employment and skilled technical opportunities.',
]

export const VALUES = [
  { icon: 'Handshake', k: 'Trust', v: 'Building long-term relationships through transparent business practices.' },
  { icon: 'BadgeCheck', k: 'Quality', v: 'Providing reliable battery and inverter solutions.' },
  { icon: 'UsersRound', k: 'Customer Focus', v: 'Understanding customer needs and recommending suitable products.' },
  { icon: 'Truck', k: 'Convenience', v: 'Making product selection, installation and servicing easier.' },
  { icon: 'Activity', k: 'Innovation', v: 'Exploring digital tools and battery health monitoring.' },
  { icon: 'Sprout', k: 'Local Impact', v: 'Supporting local employment and skilled service opportunities.' },
]
