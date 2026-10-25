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

// SAMPLE testimonials — shown with a "Sample" badge. Replace with real customer reviews (and set sample: false).
export const TESTIMONIALS = [
  { sample: true, name: 'Customer name', place: 'Barshi', product: 'Car battery', rating: 5,
    text: 'They checked my old battery for free, told me honestly it needed replacing and fitted the new one the same day.' },
  { sample: true, name: 'Customer name', place: 'Vairag', product: 'Inverter + battery', rating: 5,
    text: 'The team helped us choose the right inverter for our shop and did a neat installation. Backup has been reliable.' },
  { sample: true, name: 'Garage owner', place: 'Barshi', product: 'Dealer supply', rating: 5,
    text: 'Regular supply, fair pricing and quick response on WhatsApp. Laxmi Power is our first call for batteries.' },
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
export const PHOTO_GROUPS = ['Our store', 'Our team', 'Products & service', 'Customers we serve']
export const PHOTOS = [
  { src: 'img/store-team.webp', group: 'Our store', alt: 'The Laxmi Power team with a new consignment of batteries' },
  { src: 'img/store-shelves.webp', group: 'Our store', alt: 'Shelves stocked with car and two-wheeler batteries' },
  { src: 'img/store-wall.webp', group: 'Our store', alt: 'Battery display wall inside the Laxmi Power store' },
  { src: 'img/store-rack.webp', group: 'Our store', alt: 'Racks of boxed batteries sorted by model' },
  { src: 'img/store-tubular.webp', group: 'Our store', alt: 'Tall tubular inverter batteries in their boxes' },
  { src: 'img/store-stack.webp', group: 'Our store', alt: 'Stacked battery stock beside a steel rack' },
  { src: 'img/store-floor.webp', group: 'Our store', alt: 'New battery stock unpacked on the store floor' },
  { src: 'img/founder.webp', group: 'Our team', alt: 'Mrs. Sushma Sagar Agawane, Founder & CEO' },
  { src: 'img/madhubala.webp', group: 'Our team', alt: 'Madhubala Vidhate, Sales & Purchase Manager' },
  { src: 'img/dipali.webp', group: 'Our team', alt: 'Dipali Ukirde, Accountant' },
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
