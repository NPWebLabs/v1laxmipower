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
export const NEEDS = ['Automotive battery', 'Inverter & inverter battery', 'Installation', 'Battery health check-up', 'Doorstep / after-sales service', 'Wholesale / dealer enquiry', 'Other']

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products & Services' },
  { id: 'customers', label: 'Our Customers' },
  { id: 'team', label: 'Our Team' },
  { id: 'faq', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
]

export const APPLICATIONS = ['Motorcycles', 'Cars', 'Tractors', 'Commercial vehicles', 'Homes', 'Shops', 'Offices', 'Schools', 'Clinics', 'Workshops', 'Garages', 'Dealers']

export const WHY_HOME = [
  { k: 'Trusted experience', v: 'Serving customers since 2018.' },
  { k: 'Quality products', v: 'Battery and inverter solutions for multiple applications.' },
  { k: 'Integrated services', v: 'Products, installation and after-sales support.' },
  { k: 'Customer convenience', v: 'Doorstep consultation and service support.' },
  { k: 'Local market expertise', v: 'Serving Barshi and surrounding markets.' },
  { k: 'Technology-enabled', v: 'A focus on digital ordering and battery health monitoring.' },
]

export const VALUES = [
  { icon: 'Handshake', k: 'Trust', v: 'Building long-term relationships through transparent business practices.' },
  { icon: 'BadgeCheck', k: 'Quality', v: 'Providing reliable battery and inverter solutions.' },
  { icon: 'UsersRound', k: 'Customer Focus', v: 'Understanding customer needs and recommending suitable products.' },
  { icon: 'Truck', k: 'Convenience', v: 'Making product selection, installation and servicing easier.' },
  { icon: 'Activity', k: 'Innovation', v: 'Exploring digital tools and battery health monitoring.' },
  { icon: 'Sprout', k: 'Local Impact', v: 'Supporting local employment and skilled service opportunities.' },
]

export const GOALS = [
  'Develop an integrated battery, inverter, installation and service business.',
  'Expand our dealer, distribution and service network.',
  'Introduce digital ordering and service-request facilities.',
  'Promote battery health checks and preventive maintenance.',
  'Deliver timely and professional after-sales support.',
  'Create local employment and skilled technical opportunities.',
]

export const SERVICES = [
  { icon: 'Car', title: 'Automotive Batteries', img: 'img/store-rack.webp', alt: 'Rows of boxed automotive batteries on shelves at the Laxmi Power store',
    text: 'Battery solutions for motorcycles, cars, tractors and commercial vehicles. We serve individual vehicle owners as well as dealers, garages and retailers.', span: 'lg:col-span-2 lg:row-span-2' },
  { icon: 'BatteryCharging', title: 'Inverters & Inverter Batteries', img: 'img/inverter-home.webp', alt: 'Home inverter connected to a tall tubular battery',
    text: 'Backup-power solutions for homes, shops, offices and other establishments requiring dependable power backup.' },
  { icon: 'Wrench', title: 'Installation Services', img: 'img/install.webp', alt: 'Technician wiring batteries to a wall-mounted inverter',
    text: 'Installation support for battery and inverter systems at residential and commercial premises.' },
  { icon: 'Gauge', title: 'Battery Health Check-up', img: 'img/health.webp', alt: 'Technician testing a car battery with a multimeter',
    text: 'Battery testing and health assessment to help customers understand battery condition and identify potential maintenance or replacement needs.' },
  { icon: 'Truck', title: 'Doorstep & After-Sales Service', img: 'img/doorstep.webp', alt: 'Technicians replacing a car battery',
    text: 'Convenient service support for battery replacement, maintenance and basic technical assistance, subject to service availability.' },
  { icon: 'Smartphone', title: 'Digital Ordering & Service Support', img: 'img/digital.webp', alt: 'Shop owner placing an order on a phone', planned: true,
    text: 'A planned technology-enabled approach to product enquiries, service requests and customer support.', span: 'lg:col-span-2' },
]

export const SEGMENTS = [
  { icon: 'Home', title: 'Residential Customers', img: 'img/residential.webp', alt: 'Family at home beside an inverter and lithium battery', text: 'Households looking for inverter and battery backup solutions.' },
  { icon: 'Store', title: 'Commercial Customers', img: 'img/commercial.webp', alt: 'Shopkeeper standing in her general store', text: 'Shops, offices, small businesses and commercial establishments.' },
  { icon: 'Tractor', title: 'Automotive & Agricultural', img: 'img/agri.webp', alt: 'Farmer standing in front of his tractor in a green field', text: 'Motorcycle, car, tractor and commercial vehicle owners.' },
  { icon: 'Wrench', title: 'Dealers, Retailers & Garages', img: 'img/garage.webp', alt: 'Mechanic working on a car engine in his garage', text: 'Battery shops, spare-parts dealers, electrical retailers and automobile service centres requiring regular product supply.' },
  { icon: 'Building2', title: 'Institutions & Small Industries', img: 'img/institution.webp', alt: 'Health centre building with palm trees', text: 'Schools, clinics, workshops and other establishments requiring battery and backup-power solutions.' },
]

export const WHY = [
  { k: 'Experience since 2018', v: 'Established local business experience.' },
  { k: 'Multiple applications', v: 'Solutions for vehicles, agriculture, homes and businesses.' },
  { k: 'B2B & B2C service', v: 'Serving both individual customers and business partners.' },
  { k: 'Convenient support', v: 'Consultation and doorstep service options.' },
  { k: 'Transparent communication', v: 'Clear product information and pricing.' },
  { k: 'Ongoing assistance', v: 'Support beyond the initial purchase.' },
]

export const COMMUNITY = [
  'Creating local employment opportunities.',
  'Developing skilled battery and inverter service personnel.',
  'Improving access to battery and backup-power solutions in nearby areas.',
  'Supporting customers through convenient service and maintenance.',
  'Exploring technology-enabled services to improve customer experience.',
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
