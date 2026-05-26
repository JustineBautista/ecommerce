/*
  NexaMart E-Commerce Platform - Product Seed Data & Catalog Database (data.js)
  Contains 50+ fully realized products in multiple categories, stored and managed inside localStorage.
*/

const INITIAL_PRODUCTS = [
  // 1. ELECTRONICS (1-10)
  {
    id: "prod-elec-1",
    name: "AeroSound Pro ANC Headphones",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    category: "Electronics",
    subcategory: "Audio",
    brand: "AeroSound",
    rating: 4.8,
    reviewCount: 145,
    description: "Experience premium active noise cancelling audio with the AeroSound Pro. Offering up to 40 hours of pure listening time, high-fidelity acoustics, and ultra-comfortable memory foam earcups.",
    specs: {
      "Driver Size": "40mm Dynamic",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "Up to 40 hours",
      "Bluetooth Version": "5.2",
      "Noise Cancellation": "Hybrid Active ANC"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 25,
    tags: ["featured", "hot", "audio", "noise-cancelling"],
    dateAdded: "2026-01-10"
  },
  {
    id: "prod-elec-2",
    name: "Apex Chrono smartwatch 4G",
    price: 249.99,
    originalPrice: 299.99,
    discount: 16,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "ApexTech",
    rating: 4.6,
    reviewCount: 92,
    description: "Stay connected anywhere with the 4G-enabled Apex Chrono smartwatch. Tracks heart rate, blood oxygen levels, workouts, sleep, and features fully custom AMOLED widgets.",
    specs: {
      "Screen": "1.43 inch AMOLED",
      "Battery": "Up to 7 days normal use",
      "Water Resistance": "5ATM (up to 50m)",
      "Connectivity": "LTE / Wi-Fi / Bluetooth 5.0",
      "Sensors": "Heart Rate, SpO2, Accelerometer, GPS"
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    tags: ["wearables", "fitness", "trending"],
    dateAdded: "2026-02-15"
  },
  {
    id: "prod-elec-3",
    name: "Lumina 4K Ultra-Short Throw Projector",
    price: 1199.99,
    originalPrice: 1499.99,
    discount: 20,
    category: "Electronics",
    subcategory: "Home Theater",
    brand: "Lumina",
    rating: 4.9,
    reviewCount: 38,
    description: "Turn your living room into an immersive cinema. The Lumina UST project creates up to a 120-inch stunning 4K screen just inches from the wall, featuring built-in Dolby Audio speakers.",
    specs: {
      "Resolution": "4K UHD (3840 x 2160)",
      "Brightness": "2500 ANSI Lumens",
      "Contrast Ratio": "1,500,000:1",
      "Audio": "Built-in 30W Dolby Stereo",
      "OS": "Smart TV Platform Enabled"
    },
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 8,
    tags: ["luxury", "home-cinema", "featured"],
    dateAdded: "2026-03-01"
  },
  {
    id: "prod-elec-4",
    name: "NovaTab 11-inch Creator Edition",
    price: 499.99,
    originalPrice: 499.99,
    discount: 0,
    category: "Electronics",
    subcategory: "Computers",
    brand: "NovaTech",
    rating: 4.5,
    reviewCount: 64,
    description: "Designed for artists and creators. The NovaTab sports a 120Hz display with low latency pen input. Features a blazing fast processor and 8GB RAM to handle sketching and photo edits easily.",
    specs: {
      "Display": "11-inch IPS, 120Hz Refresh",
      "Processor": "Octa-Core Helio G99",
      "RAM": "8GB LPDDR5",
      "Storage": "256GB Expandable UFS 3.1",
      "Stylus": "Precision Stylus included"
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 18,
    tags: ["new", "tablet", "creators"],
    dateAdded: "2026-04-12"
  },
  {
    id: "prod-elec-5",
    name: "Viper mechanical gaming keyboard",
    price: 129.99,
    originalPrice: 159.99,
    discount: 18,
    category: "Electronics",
    subcategory: "Accessories",
    brand: "ViperGaming",
    rating: 4.7,
    reviewCount: 210,
    description: "Maximize your reaction speeds. Compact hot-swappable linear yellow switches, double-shot PBT keycaps, and immersive programmable individual RGB backlighting.",
    specs: {
      "Form Factor": "75% Layout",
      "Switches": "Viper Linear Yellow (Hot-Swappable)",
      "Keycaps": "Double-shot PBT Cherry profile",
      "Backlight": "Per-key customizable RGB",
      "Connection": "USB-C, 2.4Ghz Wireless, BT 5.1"
    },
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 35,
    tags: ["gaming", "mechanical", "accessories"],
    dateAdded: "2026-01-20"
  },
  {
    id: "prod-elec-6",
    name: "Helix Wireless Charge Pad 3-in-1",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    category: "Electronics",
    subcategory: "Accessories",
    brand: "Helix",
    rating: 4.3,
    reviewCount: 304,
    description: "Eliminate cable clutter on your bedside table. Charges your smartphone, smartwatch, and wireless earbuds concurrently. Fully Qi-certified with temperature control.",
    specs: {
      "Input": "Type-C (9V/2A, 12V/2A)",
      "Output Phone": "15W / 10W / 7.5W / 5W",
      "Output Watch": "2.5W max",
      "Output Buds": "5W max",
      "Certifications": "Qi, CE, FCC, RoHS"
    },
    images: [
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 50,
    tags: ["accessories", "charging", "deals"],
    dateAdded: "2026-02-10"
  },
  {
    id: "prod-elec-7",
    name: "Solas Solar Charging Power Bank",
    price: 39.99,
    originalPrice: 39.99,
    discount: 0,
    category: "Electronics",
    subcategory: "Accessories",
    brand: "Solas",
    rating: 4.4,
    reviewCount: 88,
    description: "Never run out of power outdoors. Packing a massive 20,000mAh battery recharged directly by solar rays. Waterproof, shockproof, and fitted with an emergency LED flashlight.",
    specs: {
      "Capacity": "20,000mAh Lithium-Polymer",
      "Solar Panel": "1.5W Monocrystalline",
      "Inputs": "Micro-USB & USB Type-C",
      "Outputs": "Dual USB 5V/2.1A",
      "Protection": "IP66 Waterproof & Dustproof"
    },
    images: [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 40,
    tags: ["outdoors", "power-bank", "accessories"],
    dateAdded: "2026-03-10"
  },
  {
    id: "prod-elec-8",
    name: "Zephyr Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "Electronics",
    subcategory: "Audio",
    brand: "AeroSound",
    rating: 4.7,
    reviewCount: 172,
    description: "Compact size, legendary sound. The Zephyr delivers crisp highs and surprising deep bass, all packed in an IPX7 fully waterproof rugged housing. Perfect for pools, beaches, and hiking.",
    specs: {
      "Output Power": "20W RMS",
      "Water Resistance": "IPX7 Waterproof",
      "Playtime": "Up to 15 Hours",
      "Dual Connect": "Link 2 units for Stereo Sound",
      "Dimensions": "180mm x 70mm x 70mm"
    },
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 22,
    tags: ["audio", "portable", "waterproof"],
    dateAdded: "2026-02-28"
  },
  {
    id: "prod-elec-9",
    name: "Titan external SSD 1TB USB 3.2",
    price: 109.99,
    originalPrice: 129.99,
    discount: 15,
    category: "Electronics",
    subcategory: "Accessories",
    brand: "ApexTech",
    rating: 4.8,
    reviewCount: 114,
    description: "Transfer files in seconds with read speeds up to 1050MB/s. Built in an aluminum shock-resistant shell that handles drops up to 2 meters. Includes both USB-C and USB-A adapters.",
    specs: {
      "Interface": "USB 3.2 Gen 2 Type-C",
      "Read Speed": "Up to 1050 MB/s",
      "Write Speed": "Up to 1000 MB/s",
      "Enclosure": "Solid Anodized Aluminum",
      "Compatibility": "Windows, macOS, Android, Consoles"
    },
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 30,
    tags: ["storage", "ssd", "essential"],
    dateAdded: "2026-03-24"
  },
  {
    id: "prod-elec-10",
    name: "Iris HD Wide-Angle Webcam",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    category: "Electronics",
    subcategory: "Accessories",
    brand: "NovaTech",
    rating: 4.5,
    reviewCount: 199,
    description: "Look your professional best in Zoom calls and live streams. Delivers Full HD 1080p video at 60fps with automatic low-light correction and stereo dual microphones.",
    specs: {
      "Resolution": "1080p @ 60fps / 720p @ 60fps",
      "Field of View": "90 Degrees Wide Angle",
      "Focus": "Auto-Focus & Light Correction",
      "Mount": "Universal clip fits all monitors",
      "Privacy": "Physical sliding shutter cover"
    },
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 28,
    tags: ["wfh", "video-calls", "accessories"],
    dateAdded: "2026-04-02"
  },

  // 2. FASHION (11-20)
  {
    id: "prod-fash-1",
    name: "Urban Minimalist Bomber Jacket",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    category: "Fashion",
    subcategory: "Outerwear",
    brand: "NordicLines",
    rating: 4.6,
    reviewCount: 88,
    description: "A timeless, water-resistant bomber jacket designed for sleek everyday styling. Fits snug and features high-grade heavy metal zippers, inside phone pocket, and ribbed cuffs.",
    specs: {
      "Material": "Shell: 100% Nylon, Lining: Polyester",
      "Waterproofing": "Durable Water Repellent (DWR) coating",
      "Fit": "Modern Standard Bomber",
      "Care": "Machine wash cold, tumble dry low"
    },
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 12,
    tags: ["clothing", "outerwear", "trending"],
    dateAdded: "2026-01-15"
  },
  {
    id: "prod-fash-2",
    name: "Metro leather Chelsea Boots",
    price: 149.99,
    originalPrice: 179.99,
    discount: 16,
    category: "Fashion",
    subcategory: "Footwear",
    brand: "MetroCraft",
    rating: 4.7,
    reviewCount: 65,
    description: "Premium full-grain leather boots designed to age beautifully. Easy slip-on design with durable elastic side panels, breathable inner lining, and robust anti-slip rubber soles.",
    specs: {
      "Leather Type": "Full-Grain Italian Calfskin",
      "Sole": "Durable Goodyear Welted Rubber",
      "Lining": "Soft pigskin breathable lining",
      "Shaft Height": "5.5 inches"
    },
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 10,
    tags: ["shoes", "leather", "luxury"],
    dateAdded: "2026-02-18"
  },
  {
    id: "prod-fash-3",
    name: "Elysian Linen Oversized Shirt",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    category: "Fashion",
    subcategory: "Tops",
    brand: "NordicLines",
    rating: 4.4,
    reviewCount: 110,
    description: "Woven entirely from sustainable European flax. Extremely lightweight, breezy, and featuring a relaxed drop shoulder fit. Ideal for warm afternoons and weekend getaways.",
    specs: {
      "Composition": "100% French Linen",
      "Fit": "Breezy Oversized",
      "Buttons": "Natural coconut shell details",
      "Weave": "Lightweight breathable plain weave"
    },
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 20,
    tags: ["linen", "summer", "sustainable"],
    dateAdded: "2026-03-25"
  },
  {
    id: "prod-fash-4",
    name: "Stratus Premium Jogger Pants",
    price: 54.99,
    originalPrice: 54.99,
    discount: 0,
    category: "Fashion",
    subcategory: "Bottoms",
    brand: "AeroSound", // Reuse brand in a casual/active sense or define new
    rating: 4.5,
    reviewCount: 233,
    description: "The gold standard of comfortable joggers. Engineered from a ultra-soft four-way stretch interlock knit fabric, fitted with deep zip-security pockets.",
    specs: {
      "Fabric": "78% Cotton, 15% Polyester, 7% Elastane",
      "Stretch": "4-Way Stretch Interlock",
      "Waistband": "Flat knit drawcord elastic",
      "Pockets": "Two concealed front zipper pockets"
    },
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 30,
    tags: ["athleisure", "pants", "comfort"],
    dateAdded: "2026-02-05"
  },
  {
    id: "prod-fash-5",
    name: "Vanguard Chronograph Wristwatch",
    price: 189.99,
    originalPrice: 229.99,
    discount: 17,
    category: "Fashion",
    subcategory: "Accessories",
    brand: "MetroCraft",
    rating: 4.8,
    reviewCount: 42,
    description: "Make a strong impression. Sleek stainless steel casing with deep blue dials, tachymeter ring, high-precision Japanese quartz movements, and genuine brown leather straps.",
    specs: {
      "Movement": "Miyota Japanese Quartz Chrono",
      "Case Material": "316L Surgical Grade Stainless Steel",
      "Strap": "20mm Genuine Italian leather",
      "Waterproofing": "10 ATM (100 meters)"
    },
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 7,
    tags: ["watch", "classic", "accessories"],
    dateAdded: "2026-03-12"
  },
  {
    id: "prod-fash-6",
    name: "Sienna Wool Fedora Hat",
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    category: "Fashion",
    subcategory: "Accessories",
    brand: "NordicLines",
    rating: 4.2,
    reviewCount: 57,
    description: "An elegant unstructured fedora made of premium Australian wool felt. Finished with a thin leather band detail and interior adjustable sweatband for custom fits.",
    specs: {
      "Material": "100% Pure Australian Wool Felt",
      "Band": "100% Genuine leather strap",
      "Brim Width": "3 inches",
      "Sizing": "Adjustable interior band fits M/L"
    },
    images: [
      "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    tags: ["hat", "fall", "accessories"],
    dateAdded: "2026-01-28"
  },
  {
    id: "prod-fash-7",
    name: "Solace Organic Cotton Hoodie",
    price: 59.99,
    originalPrice: 59.99,
    discount: 0,
    category: "Fashion",
    subcategory: "Tops",
    brand: "NordicLines",
    rating: 4.7,
    reviewCount: 142,
    description: "Eco-friendly cozy comfort. Fabricated from thick, heavy-weight organic French terry cotton. Free from harmful dyes and pre-shrunk for the ideal fit right out of the box.",
    specs: {
      "Fabric Weight": "400 GSM Heavyweight",
      "Material": "100% Certified Organic Cotton",
      "Dyeing": "Eco-friendly low-impact dyes",
      "Origin": "Ethically crafted in Portugal"
    },
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 25,
    tags: ["hoodie", "organic", "basic"],
    dateAdded: "2026-03-05"
  },
  {
    id: "prod-fash-8",
    name: "Kodiak Polarized Sunglasses",
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    category: "Fashion",
    subcategory: "Accessories",
    brand: "ApexTech", // Brand reuse
    rating: 4.6,
    reviewCount: 94,
    description: "Advanced polarization technology protects your eyes while enhancing colors and contrast. Extremely lightweight titanium frames withstand tough adventures.",
    specs: {
      "Lenses": "Tri-Acetate Cellulose (TAC) Polarized",
      "UV Protection": "100% UVA/UVB blockage",
      "Frame": "Flexible Beta-Titanium alloys",
      "Weight": "Only 18 grams"
    },
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 20,
    tags: ["eyewear", "summer", "polarized"],
    dateAdded: "2026-02-20"
  },
  {
    id: "prod-fash-9",
    name: "Athena Knit Pleated Midi Skirt",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    category: "Fashion",
    subcategory: "Bottoms",
    brand: "NordicLines",
    rating: 4.5,
    reviewCount: 78,
    description: "Flowing elegance meets stretch comfort. This heavy knit pleated skirt holds its form beautifully, presenting an elastic high waist that looks striking in any setting.",
    specs: {
      "Material": "65% Rayon, 35% Nylon ribbed knit",
      "Length": "Midi cut (32 inches)",
      "Waist": "Wide elastic slip-on waistband",
      "Wash": "Hand wash cold, dry flat"
    },
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 18,
    tags: ["skirt", "knitwear", "classic"],
    dateAdded: "2026-04-05"
  },
  {
    id: "prod-fash-10",
    name: "Nomad Canvas Travel Duffel",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "Fashion",
    subcategory: "Bags",
    brand: "MetroCraft",
    rating: 4.8,
    reviewCount: 105,
    description: "The ultimate weekender bag. Heavy-duty waxed cotton canvas repels water, while full-grain leather straps, solid brass hardware, and dedicated shoe compartments ensure supreme practicality.",
    specs: {
      "Capacity": "45 Liters (Carry-on approved)",
      "Material": "20oz Waterproof Waxed Canvas",
      "Leather": "Vegetable-tanned saddle leather",
      "Pockets": "1 main, 2 outer zips, 1 inner phone slots"
    },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    tags: ["bag", "travel", "waxed-canvas"],
    dateAdded: "2026-03-18"
  },

  // 3. HOME & LIVING (21-30)
  {
    id: "prod-home-1",
    name: "Aura Glass Dome Essential Oil Diffuser",
    price: 49.99,
    originalPrice: 59.99,
    discount: 16,
    category: "Home & Living",
    subcategory: "Decor",
    brand: "AuraCasa",
    rating: 4.5,
    reviewCount: 340,
    description: "Soothe your senses with ultrasonic misting inside a handcrafted glass dome. Warm glowing ambient LED lights recreate candle flames, perfect for relaxation and yoga.",
    specs: {
      "Water Tank": "150ml Capacity",
      "Run Time": "Up to 8 hours intermittent",
      "Coverage": "Up to 300 sq ft",
      "Lights": "7 color cycling ambient LED",
      "Mist Output": "20ml/hr ultrasonic frequency"
    },
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 35,
    tags: ["decor", "diffuser", "home-spa"],
    dateAdded: "2026-01-22"
  },
  {
    id: "prod-home-2",
    name: "Verdant Ceramic Self-Watering Planter",
    price: 24.99,
    originalPrice: 34.99,
    discount: 28,
    category: "Home & Living",
    subcategory: "Garden",
    brand: "Verdant",
    rating: 4.3,
    reviewCount: 188,
    description: "Never worry about overwatering again. Ceramic exterior acts as a natural reservoir feeding moisture to soil via sub-irrigation channels. Sleek modern minimalist look.",
    specs: {
      "Material": "High-fired porous ceramic",
      "Diameter": "7.5 inches",
      "Reservoir": "Stores water for up to 3 weeks",
      "Indicator": "Subtle float tells when reservoir is low"
    },
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 50,
    tags: ["plants", "pots", "self-watering"],
    dateAdded: "2026-02-12"
  },
  {
    id: "prod-home-3",
    name: "Nordic Solid Oak Coffee Table",
    price: 289.99,
    originalPrice: 349.99,
    discount: 17,
    category: "Home & Living",
    subcategory: "Furniture",
    brand: "AuraCasa",
    rating: 4.8,
    reviewCount: 39,
    description: "Exquisite craftsmanship meets Scandinavian minimalism. Hewn entirely from solid American white oak with natural oil finishes that highlight beautiful grain movements.",
    specs: {
      "Wood Source": "FSC-Certified Solid White Oak",
      "Dimensions": "Length: 100cm, Width: 60cm, Height: 45cm",
      "Finish": "Hardwax natural oil coating",
      "Assembly": "Easy 5-minute leg screwing"
    },
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 5,
    tags: ["furniture", "oak", "premium"],
    dateAdded: "2026-03-15"
  },
  {
    id: "prod-home-4",
    name: "Solace Weighted Gravity Blanket 15lbs",
    price: 89.99,
    originalPrice: 89.99,
    discount: 0,
    category: "Home & Living",
    subcategory: "Bedding",
    brand: "AuraCasa",
    rating: 4.7,
    reviewCount: 277,
    description: "Unlock deeper sleep through deep touch pressure simulation. Micro-glass beads distributed evenly in compact stitched square grids feel like a soothing, warm hug.",
    specs: {
      "Weight": "15 lbs (Ideal for body weights 130-180 lbs)",
      "Cover": "Double-sided: Cool bamboo & warm fleece",
      "Fill": "Lead-free hypo-allergenic micro glass beads",
      "Grid Size": "4x4 inch small quilted pockets"
    },
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 22,
    tags: ["bedding", "sleep", "weighted-blanket"],
    dateAdded: "2026-01-30"
  },
  {
    id: "prod-home-5",
    name: "Titan Cast Iron Dutch Oven 6-Quart",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "Home & Living",
    subcategory: "Kitchen",
    brand: "Verdant",
    rating: 4.9,
    reviewCount: 167,
    description: "The workhorse of any serious kitchen. Heavy enameled cast iron delivers flawless heat retention and distribution, with self-basting spikes on the lid for succulent braises.",
    specs: {
      "Capacity": "6 Quarts",
      "Material": "Enameled Cast Iron",
      "Oven Safe": "Up to 500°F (260°C)",
      "Cooktops": "Gas, Electric, Ceramic, Induction"
    },
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 14,
    tags: ["cookware", "dutch-oven", "kitchen"],
    dateAdded: "2026-02-25"
  },
  {
    id: "prod-home-6",
    name: "Lumina Wireless Dimmable Desk Lamp",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    category: "Home & Living",
    subcategory: "Lighting",
    brand: "Lumina",
    rating: 4.4,
    reviewCount: 122,
    description: "Perfect reading lighting. Eye-friendly flicker-free LED bars feature 5 color modes and 10 brightness steps. Includes built-in wireless smartphone charging ports.",
    specs: {
      "LED Panel": "50 high-efficiency eye-care LEDs",
      "Modes": "3000K Warm - 6500K Cool White",
      "Wireless Output": "10W Fast Phone charging",
      "Arm Tilt": "180 degree folding head, 90 degree base"
    },
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 30,
    tags: ["lighting", "office", "accessories"],
    dateAdded: "2026-03-08"
  },
  {
    id: "prod-home-7",
    name: "Nomad Handwoven Jute Rug (5x7)",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    category: "Home & Living",
    subcategory: "Decor",
    brand: "AuraCasa",
    rating: 4.6,
    reviewCount: 89,
    description: "Add organic, rustic charm to your home. Hand-loomed in India using high-quality natural jute fibers. Durable, thick, and fully reversible for double the wear life.",
    specs: {
      "Material": "100% Biodegradable Natural Jute",
      "Craft": "Hand-knitted flat weave loom",
      "Thickness": "0.5 inches",
      "Care": "Vacuum regularly, blot stains immediately"
    },
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 12,
    tags: ["rug", "decor", "jute"],
    dateAdded: "2026-03-20"
  },
  {
    id: "prod-home-8",
    name: "Helix Modular Magnetic Knife Bar",
    price: 29.99,
    originalPrice: 29.99,
    discount: 0,
    category: "Home & Living",
    subcategory: "Kitchen",
    brand: "Helix",
    rating: 4.5,
    reviewCount: 156,
    description: "Showcase your cutlery safely. Extremely powerful double-sided neodymium magnets enclosed inside a sleek, dark walnut wood bar. Installs easily with double-sided backing.",
    specs: {
      "Wood Type": "Solid Premium Black Walnut",
      "Magnet Type": "Continuous Neodymium rare-earth bar",
      "Length": "16 inches (holds 6-8 heavy knives)",
      "Mounting": "Industrial adhesive backing + dry screws included"
    },
    images: [
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 25,
    tags: ["kitchen", "organization", "woodworking"],
    dateAdded: "2026-04-10"
  },
  {
    id: "prod-home-9",
    name: "Sienna Amber Glass Soap Dispenser Pair",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    category: "Home & Living",
    subcategory: "Decor",
    brand: "Verdant",
    rating: 4.4,
    reviewCount: 231,
    description: "Transform your washroom into an upscale boutique hotel. Elegant thick amber glass bottles fitted with rust-proof matte black stainless steel pumps. Includes custom waterproof stickers.",
    specs: {
      "Bottle Volume": "16 oz / 500ml per bottle",
      "Pump Material": "304 Anti-rust Matte Black Stainless Steel",
      "Stickers": "HAND SOAP, DISH SOAP, LOTION waterproof labels",
      "Base": "Non-slip silicone coasters included"
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 45,
    tags: ["bathroom", "organization", "amber-glass"],
    dateAdded: "2026-02-04"
  },
  {
    id: "prod-home-10",
    name: "Apex Air Purifier with H13 HEPA",
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    category: "Home & Living",
    subcategory: "Appliances",
    brand: "ApexTech",
    rating: 4.8,
    reviewCount: 95,
    description: "Breathe cleaner air in minutes. Medical-grade H13 True HEPA filters capture 99.97% of airborne pollen, pet dander, smoke, and odors down to 0.1 microns in rooms up to 500 sq ft.",
    specs: {
      "Filters": "Pre-filter + H13 True HEPA + Active Carbon",
      "CADR Rating": "250 m³/h (covers 500 sq ft hourly)",
      "Noise Level": "Super quiet 22dB Sleep Mode",
      "Features": "AQI air quality laser sensor auto mode"
    },
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    tags: ["appliances", "air-quality", "essential"],
    dateAdded: "2026-03-29"
  },

  // 4. SPORTS & OUTDOORS (31-40)
  {
    id: "prod-spor-1",
    name: "Apex Carbon Fiber Road Bike Helmet",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    category: "Sports & Outdoors",
    subcategory: "Cycling",
    brand: "ApexTech",
    rating: 4.7,
    reviewCount: 63,
    description: "Extreme protection, ultimate speed. Engineered with high-strength carbon fiber reinforcement cages and fitted with MIPS technology to deflect rotational impacts during crashes.",
    specs: {
      "Shell": "Polycarbonate with Carbon Fiber Reinforcements",
      "Protection": "MIPS rotational impact protection system",
      "Vents": "22 aerodynamic high-flow vent channels",
      "Weight": "Ultra-lightweight 240g (Size M)"
    },
    images: [
      "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 12,
    tags: ["cycling", "helmet", "safety"],
    dateAdded: "2026-02-14"
  },
  {
    id: "prod-spor-2",
    name: "Stratus Yoga Mat Eco-TPE (6mm)",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: "Sports & Outdoors",
    subcategory: "Fitness",
    brand: "Verdant",
    rating: 4.4,
    reviewCount: 388,
    description: "Perform your poses with absolute grip. Textured double-sided non-slip surfaces provide supreme cushioning using biodegradable, hypoallergenic certified TPE materials.",
    specs: {
      "Material": "Eco-friendly SGS-Certified TPE",
      "Thickness": "6mm (Optimal knee joint support)",
      "Dimensions": "72 inches x 24 inches",
      "Design": "Laser engraved alignment grids"
    },
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 40,
    tags: ["yoga", "fitness", "eco-friendly"],
    dateAdded: "2026-03-05"
  },
  {
    id: "prod-spor-3",
    name: "Viper Adjustable Dumbbell Pair (50lbs)",
    price: 229.99,
    originalPrice: 279.99,
    discount: 17,
    category: "Sports & Outdoors",
    subcategory: "Fitness",
    brand: "ViperGaming", // Reuse brand
    rating: 4.8,
    reviewCount: 78,
    description: "Clear up your home gym space. Turn the dial to adjust weights from 5 to 50 lbs in 5lb increments. Anti-slip steel handles ensure maximum safety.",
    specs: {
      "Weight Range": "5 to 50 lbs (2.3 to 22.7 kg) per dumbbell",
      "Increments": "5, 10, 15, 20, 25, 30, 35, 40, 45, 50 lbs",
      "Plates": "Heavy-duty laser cut thermoplastic-coated steel",
      "Grip": "Contoured textured chrome knurling"
    },
    images: [
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 6,
    tags: ["fitness", "dumbbells", "gym"],
    dateAdded: "2026-01-18"
  },
  {
    id: "prod-spor-4",
    name: "Nomad ultralight 2-Person Camp Tent",
    price: 149.99,
    originalPrice: 179.99,
    discount: 16,
    category: "Sports & Outdoors",
    subcategory: "Camping",
    brand: "NordicLines",
    rating: 4.6,
    reviewCount: 92,
    description: "Designed for backcountry backpackers where weight matters. Packs down to under 3.5 lbs while providing fully tape-sealed waterproof protection against heavy storms.",
    specs: {
      "Capacity": "2 Persons",
      "Weight": "3.2 lbs / 1.45 kg fully packed",
      "Fly Material": "15D Ripstop Sil-Nylon 3000mm rating",
      "Poles": "DAC Featherlite NSL Aluminum rods"
    },
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 18,
    tags: ["camping", "backpacking", "tent"],
    dateAdded: "2026-03-12"
  },
  {
    id: "prod-spor-5",
    name: "Zephyr Insulated Stainless Thermos 32oz",
    price: 24.99,
    originalPrice: 29.99,
    discount: 16,
    category: "Sports & Outdoors",
    subcategory: "Camping",
    brand: "AeroSound", // Reuse brand
    rating: 4.7,
    reviewCount: 450,
    description: "Ice cold drinks for 24 hours, steaming hot coffee for 12. Heavy food-grade 18/8 stainless steel double-walled vacuum flasks coated in custom grip powder coats.",
    specs: {
      "Capacity": "32 oz / 946 ml",
      "Steel Quality": "Pro-Grade 18/8 Condensation-Free Stainless",
      "Lids": "Includes Leak-proof straw lid & flex cap",
      "BPA Free": "100% toxin and plasticizer free"
    },
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 60,
    tags: ["bottles", "camping", "activewear"],
    dateAdded: "2026-02-22"
  },
  {
    id: "prod-spor-6",
    name: "Kodiak Tactical Survival Backpack 40L",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "Sports & Outdoors",
    subcategory: "Hiking",
    brand: "MetroCraft",
    rating: 4.8,
    reviewCount: 112,
    description: "Tough as nails. Crafted from military-grade 1050D nylon. Fully customizable MOLLE webbings, thick padded shoulder straps, and modular compression compartments.",
    specs: {
      "Volume": "40 Liters",
      "Fabric": "1050D Ballistic Nylon (tear & water proof)",
      "Zippers": "YKK Dual heavy-duty sliders",
      "Harness": "Contoured padded airmesh strap with chest buckles"
    },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    tags: ["hiking", "tactical", "outdoor-bags"],
    dateAdded: "2026-03-18"
  },
  {
    id: "prod-spor-7",
    name: "AeroStrike Graphite Tennis Racket",
    price: 119.99,
    originalPrice: 119.99,
    discount: 0,
    category: "Sports & Outdoors",
    subcategory: "Racquets",
    brand: "ApexTech",
    rating: 4.5,
    reviewCount: 48,
    description: "Fierce power, precision control. High-modulus carbon graphite frame keeps swing weight light while dampening vibrations. Strung with heavy premium synthetic gut.",
    specs: {
      "Composition": "High-Modulus Carbon Graphite",
      "Head Size": "100 sq inches",
      "Weight": "290 grams (unstrung)",
      "Grip Size": "4 3/8 inches standard"
    },
    images: [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a4b1fa?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 20,
    tags: ["tennis", "racket", "new"],
    dateAdded: "2026-04-01"
  },
  {
    id: "prod-spor-8",
    name: "Helix LED Rechargeable Headlamp",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    category: "Sports & Outdoors",
    subcategory: "Camping",
    brand: "Helix",
    rating: 4.6,
    reviewCount: 302,
    description: "Light up your trail hands-free. Powerful 500 lumen CREE LEDs offer 6 lighting modes, with automated wave-sensors that toggle power via hand gestures.",
    specs: {
      "Max Output": "500 Lumens (CREE XML-T6 LED)",
      "Battery": "1200mAh USB-C Lithium rechargeable",
      "Waterproofing": "IPX5 rainproof rating",
      "Modes": "High, Medium, Low, Red LED SOS, Sensor Mode"
    },
    images: [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 45,
    tags: ["outdoor-lights", "camping", "headlamp"],
    dateAdded: "2026-01-28"
  },
  {
    id: "prod-spor-9",
    name: "Solas Hydration Running Vest 5L",
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    category: "Sports & Outdoors",
    subcategory: "Running",
    brand: "Solas",
    rating: 4.3,
    reviewCount: 75,
    description: "Forget bounce during trail runs. Snug vest-fit houses a 1.5L hydration bladder inside heat-shielded sleeves. Soft front flasks pockets keep electrolytes close at hand.",
    specs: {
      "Vest Volume": "5 Liters capacity",
      "Water Bladder": "1.5L food-grade TPU bladder included",
      "Flask Pockets": "Dual front sleeves for 500ml soft flasks",
      "Safety": "Reflective 3M safety decals & whistle"
    },
    images: [
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 22,
    tags: ["running", "hydration", "trail-run"],
    dateAdded: "2026-03-24"
  },
  {
    id: "prod-spor-10",
    name: "Lumina Golf Rangefinder 800yd",
    price: 129.99,
    originalPrice: 159.99,
    discount: 18,
    category: "Sports & Outdoors",
    subcategory: "Golf",
    brand: "Lumina",
    rating: 4.7,
    reviewCount: 92,
    description: "Lock onto the flag instantly. High-precision laser rangefinders measure distances up to 800 yards with 6x magnification, dynamic slope-compensation, and vibrating pin locks.",
    specs: {
      "Range": "5 to 800 Yards",
      "Accuracy": "+/- 1 Yard",
      "Magnification": "6x Adjustable HD Focus",
      "Modes": "Slope ON/OFF, Pin-seeker vibration locks"
    },
    images: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 14,
    tags: ["golf", "accessories", "laser"],
    dateAdded: "2026-02-10"
  },

  // 5. BOOKS & MEDIA (41-45)
  {
    id: "prod-book-1",
    name: "The Antigravity Method: Peak Performance",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    category: "Books & Media",
    subcategory: "Business",
    brand: "NexaPublishing",
    rating: 4.9,
    reviewCount: 520,
    description: "Unlock agentic acceleration. This masterwork outlines techniques for optimizing cognitive capacity, workflow automation, and rapid technology learning in the AI era.",
    specs: {
      "Format": "Hardcover / ePUB / Audio",
      "Pages": "320 pages premium thick stock",
      "Publisher": "NexaPublishing LLC",
      "Author": "Antigravity Research Group"
    },
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 100,
    tags: ["featured", "bestseller", "books"],
    dateAdded: "2026-05-01"
  },
  {
    id: "prod-book-2",
    name: "AeroSynth Sound Synthesis Vinyl Guide",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    category: "Books & Media",
    subcategory: "Music",
    brand: "NexaPublishing",
    rating: 4.8,
    reviewCount: 34,
    description: "Explore modular synthesis. A fully comprehensive manual printed in 12x12 gatefold record format. Includes a stunning 180g colored vinyl filled with synthesis exercises and wave files.",
    specs: {
      "Vinyl Weight": "180 Gram Audiophile Collector Grade",
      "Book Dimensions": "12.5 x 12.5 inches hardback",
      "Contents": "14 chapters on synth modules, 20 audio demo tracks",
      "Color": "Nebula Violet Splatter Wax"
    },
    images: [
      "https://images.unsplash.com/photo-1539625312781-19d547f63ef4?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 25,
    tags: ["vinyl", "music", "luxury"],
    dateAdded: "2026-04-10"
  },
  {
    id: "prod-book-3",
    name: "Minimalist Architecture of Japan",
    price: 49.99,
    originalPrice: 59.99,
    discount: 16,
    category: "Books & Media",
    subcategory: "Art",
    brand: "NexaPublishing",
    rating: 4.9,
    reviewCount: 45,
    description: "A gorgeous coffee table photo book capturing the absolute tranquility and structural brilliance of contemporary concrete, cedar, and paper architecture in Japan.",
    specs: {
      "Binding": "Linen Hardbound cover with sleeve jacket",
      "Illustrations": "250 full-color ultra HD large plates",
      "Paper": "150 GSM Matte silk archive grade",
      "Dimensions": "10 x 13.5 inches"
    },
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 30,
    tags: ["art", "architecture", "coffee-table"],
    dateAdded: "2026-03-24"
  },
  {
    id: "prod-book-4",
    name: "Cosmic Odyssey Board Game",
    price: 59.99,
    originalPrice: 69.99,
    discount: 14,
    category: "Books & Media",
    subcategory: "Games",
    brand: "NexaPublishing",
    rating: 4.7,
    reviewCount: 88,
    description: "Lead your stellar faction to total dominion. Dynamic worker placement and system colonization with high-fidelity plastic ship models and custom acrylic starboards.",
    specs: {
      "Players": "2 - 5 Players",
      "Time": "60 - 90 Minutes per campaign",
      "Age": "12+",
      "Includes": "180 plastic figures, 200 cards, 12 thick hex boards"
    },
    images: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 15,
    tags: ["board-game", "sci-fi", "tabletop"],
    dateAdded: "2026-02-18"
  },
  {
    id: "prod-book-5",
    name: "Cyberpunk 2088 Interactive Graphic Novel",
    price: 24.99,
    originalPrice: 24.99,
    discount: 0,
    category: "Books & Media",
    subcategory: "Comics",
    brand: "NexaPublishing",
    rating: 4.6,
    reviewCount: 104,
    description: "Scan QR codes throughout the chapters to listen to cinematic ambient tracks and watch fully animated comic frames. The future of visual storytelling is here.",
    specs: {
      "Binding": "Premium flexicover matte",
      "Soundtrack": "24 ambient industrial wave tracks included",
      "Artist": "Dmitry Kurov & NeoTokyo Collective",
      "Pages": "196 Full Color pages"
    },
    images: [
      "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 35,
    tags: ["comics", "cyberpunk", "interactive"],
    dateAdded: "2026-04-05"
  },

  // 6. BEAUTY & HEALTH (46-50)
  {
    id: "prod-beau-1",
    name: "Verdant Rosehip Seed Organic Oil",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    category: "Beauty & Health",
    subcategory: "Skincare",
    brand: "Verdant",
    rating: 4.6,
    reviewCount: 412,
    description: "Wipe out dark spots, fine lines, and acne scars. Pressed cold from certified organic Rosa Canina seeds in Chile. Rich in Provitamin A and Essential Fatty Acids.",
    specs: {
      "Method": "100% Cold-Pressed Unrefined",
      "Certification": "USDA Organic & EcoCert Certified",
      "Volume": "1 oz / 30ml amber bottle",
      "Usage": "Apply 2-3 drops to clean face nightly"
    },
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 50,
    tags: ["skincare", "organic", "rosehip-oil"],
    dateAdded: "2026-01-10"
  },
  {
    id: "prod-beau-2",
    name: "Aura Botanica Lavender Mineral Bath Soak",
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    category: "Beauty & Health",
    subcategory: "Wellness",
    brand: "AuraCasa",
    rating: 4.5,
    reviewCount: 167,
    description: "Unwind after exhausting shifts. Premium blend of Epsom salt, Dead Sea salt, French pink clay, and organic lavender oil. Detoxifies pores while softening tight muscles.",
    specs: {
      "Weight": "16 oz / 454 grams jar",
      "Salts": "Pure Magnesium Epsom and Dead Sea Minerals",
      "Essential Oils": "French Highland Lavender & Sweet Orange",
      "Packaging": "Reusable glass apothecary jar"
    },
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 40,
    tags: ["bath", "relax", "lavender"],
    dateAdded: "2026-02-15"
  },
  {
    id: "prod-beau-3",
    name: "Helix Ceramic Sonic Facial Brush",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    category: "Beauty & Health",
    subcategory: "Device",
    brand: "Helix",
    rating: 4.7,
    reviewCount: 94,
    description: "Deliver professional spa cleanses at home. High frequency sonic pulses massage dirt, oil, and cosmetics residue from pores using medical-grade silicone brush bristles.",
    specs: {
      "Pulsation Speed": "8000 T-Sonic pulsations per minute",
      "Bristles": "Ultra-hygienic non-porous silicone",
      "Waterproofing": "IPX7 waterproof (shower safe)",
      "Battery": "USB magnetic charging, lasts 300 uses"
    },
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 28,
    tags: ["beauty-tech", "skincare", "essential"],
    dateAdded: "2026-03-10"
  },
  {
    id: "prod-beau-4",
    name: "Aura Matcha Jade Facial Roller & Gua Sha Set",
    price: 24.99,
    originalPrice: 29.99,
    discount: 16,
    category: "Beauty & Health",
    subcategory: "Device",
    brand: "AuraCasa",
    rating: 4.4,
    reviewCount: 220,
    description: "De-puff, sculpt, and firm up face muscles. Hand-carved from premium natural cooling Dongling Jade. Massages facial tissues to boost blood circulation.",
    specs: {
      "Stone": "100% Genuine Natural Dongling Jadeite",
      "Includes": "Dual-sided face roller + Heart Gua Sha board",
      "Frame": "Noise-free zinc alloy gold-plated studs",
      "Case": "Padded storage display gift box"
    },
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 35,
    tags: ["jade", "massage", "facial"],
    dateAdded: "2026-02-05"
  },
  {
    id: "prod-beau-5",
    name: "Nomad Plant-Based Multi-Vitamin (60 count)",
    price: 29.99,
    originalPrice: 29.99,
    discount: 0,
    category: "Beauty & Health",
    subcategory: "Wellness",
    brand: "Verdant",
    rating: 4.8,
    reviewCount: 144,
    description: "Clean cellular energy. Sourced from organic real fruits, green tea extracts, organic spirulina, and kelp. Loaded with crucial micro-nutrients to build robust immunities.",
    specs: {
      "Count": "60 Organic Vegan Capsules (30-day supply)",
      "Vitamins": "Whole-food complex A, B, C, D3, E, Zinc, Iron",
      "Free From": "Gluten, Soy, Artificial Fillers, Heavy Metals",
      "Certifications": "Non-GMO Verified, GMP Quality Facility"
    },
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80"
    ],
    stock: 50,
    tags: ["vitamins", "vegan", "wellness"],
    dateAdded: "2026-04-12"
  }
];

const MOCK_REVIEWS = {
  "prod-elec-1": [
    { username: "Sarah M.", rating: 5, date: "2026-05-10", comment: "Absolutely incredible! Noise cancelling is better than my Sony headphones and the fit is incredibly cozy." },
    { username: "David K.", rating: 4, date: "2026-05-02", comment: "Terrific sound stage and crisp mid-ranges. Battery life easily hits 38+ hours. Highly recommend." }
  ],
  "prod-book-1": [
    { username: "Alex T.", rating: 5, date: "2026-05-18", comment: "The Antigravity Method is a masterpiece. The concepts on automation changed how I run my web dev systems completely." },
    { username: "Elena R.", rating: 5, date: "2026-05-14", comment: "Extremely insightful, very clean diagrams and practical step-by-step instructions. A must-read." }
  ]
};

// Initialize localStorage databases if not set
function initializeDatabase() {
  if (!localStorage.getItem("nexamart_products")) {
    localStorage.setItem("nexamart_products", JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem("nexamart_reviews")) {
    localStorage.setItem("nexamart_reviews", JSON.stringify(MOCK_REVIEWS));
  }
  if (!localStorage.getItem("nexamart_orders")) {
    localStorage.setItem("nexamart_orders", JSON.stringify([]));
  }
}

// Get all products from database
function getProducts() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem("nexamart_products"));
}

// Save products to database
function saveProducts(products) {
  localStorage.setItem("nexamart_products", JSON.stringify(products));
}

// Get all reviews
function getReviews() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem("nexamart_reviews"));
}

// Add a review
function addProductReview(productId, review) {
  const reviews = getReviews();
  if (!reviews[productId]) {
    reviews[productId] = [];
  }
  reviews[productId].unshift(review);
  localStorage.setItem("nexamart_reviews", JSON.stringify(reviews));
  
  // Update product aggregate ratings
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    const prodReviews = reviews[productId];
    const totalRating = prodReviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = parseFloat((totalRating / prodReviews.length).toFixed(1));
    product.reviewCount = prodReviews.length;
    saveProducts(products);
  }
}

// Orders Database API
function getOrders() {
  initializeDatabase();
  return JSON.parse(localStorage.getItem("nexamart_orders"));
}

function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem("nexamart_orders", JSON.stringify(orders));
  
  // Adjust stock levels
  const products = getProducts();
  order.items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
    }
  });
  saveProducts(products);
}

// Expose APIs to window
window.NexaDb = {
  initializeDatabase,
  getProducts,
  saveProducts,
  getReviews,
  addProductReview,
  getOrders,
  addOrder
};

initializeDatabase();
