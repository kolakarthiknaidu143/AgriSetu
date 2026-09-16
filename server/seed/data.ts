import {
  IUser,
  IFarmerProfile,
  IFPOProfile,
  IBuyerProfile,
  ICrop,
  IMarketPrice,
  ICropLot,
  IBuyerRequirement,
  IOffer,
  IOrder,
  ILogistics,
  IStorageFacility,
  IDispute,
  INotification
} from '../types.ts';

export const SEED_CROPS: ICrop[] = [
  {
    _id: 'crop-tomato',
    name: 'Tomato',
    teluguName: 'టమోటా (Tamata)',
    category: 'Vegetable',
    icon: '🍅',
    standardUnit: 'quintal',
    grades: ['Grade A', 'Grade B', 'Grade C'],
    shelfLifeDays: 5
  },
  {
    _id: 'crop-chilli',
    name: 'Chilli',
    teluguName: 'మిరపకాయ (Mirapakaya)',
    category: 'Spice',
    icon: '🌶️',
    standardUnit: 'quintal',
    grades: ['Teja Deluxe (Grade A)', 'Guntur Sannam (Grade B)', 'Common'],
    shelfLifeDays: 180
  },
  {
    _id: 'crop-rice',
    name: 'Rice (BPT / Sona Masoori)',
    teluguName: 'వరి బియ్యం (Vari Biyyam)',
    category: 'Grain',
    icon: '🌾',
    standardUnit: 'quintal',
    grades: ['Super Fine', 'Fine', 'Common'],
    shelfLifeDays: 365
  },
  {
    _id: 'crop-paddy',
    name: 'Paddy (Dhan)',
    teluguName: 'వరి ధాన్యం (Vari Dhanyam)',
    category: 'Grain',
    icon: '🌱',
    standardUnit: 'quintal',
    grades: ['Grade A', 'Common'],
    shelfLifeDays: 365
  },
  {
    _id: 'crop-cotton',
    name: 'Cotton',
    teluguName: 'ప్రత్తి (Pratti)',
    category: 'Cash Crop',
    icon: '☁️',
    standardUnit: 'quintal',
    grades: ['Long Staple Grade A', 'Medium Staple'],
    shelfLifeDays: 240
  },
  {
    _id: 'crop-maize',
    name: 'Maize (Corn)',
    teluguName: 'మొక్కజొన్న (Mokkajonna)',
    category: 'Grain',
    icon: '🌽',
    standardUnit: 'quintal',
    grades: ['Grade A Hybrid', 'Feed Grade'],
    shelfLifeDays: 120
  },
  {
    _id: 'crop-groundnut',
    name: 'Groundnut',
    teluguName: 'వేరుశనగ (Verusanaga)',
    category: 'Oilseed',
    icon: '🥜',
    standardUnit: 'quintal',
    grades: ['Bold Grade A', 'Medium Pods'],
    shelfLifeDays: 150
  },
  {
    _id: 'crop-banana',
    name: 'Banana (Grand Naine)',
    teluguName: 'అరటి (Arati)',
    category: 'Fruit',
    icon: '🍌',
    standardUnit: 'tonne',
    grades: ['Export Grade A', 'Domestic Grade B'],
    shelfLifeDays: 7
  },
  {
    _id: 'crop-mango',
    name: 'Mango (Banganapalli)',
    teluguName: 'మామిడి (Mamidi)',
    category: 'Fruit',
    icon: '🥭',
    standardUnit: 'tonne',
    grades: ['Premium Table Grade', 'Processing Grade'],
    shelfLifeDays: 10
  },
  {
    _id: 'crop-onion',
    name: 'Onion',
    teluguName: 'ఉల్లిపాయ (Ullipaya)',
    category: 'Vegetable',
    icon: '🧅',
    standardUnit: 'quintal',
    grades: ['Nasik Red Grade A', 'Medium Grade B'],
    shelfLifeDays: 45
  }
];

export const SEED_USERS: IUser[] = [
  {
    _id: 'user-farmer-1',
    name: 'Ramesh Naidu',
    mobile: '9876543210',
    email: 'farmer@agrisetu.in',
    password: '$2a$10$wTqK/gZgA1hF.8pY91c1xeJ7vYqF15kFq5pU7V4k.zS8X3H2A0lq6', // hashed 'password123'
    role: 'farmer',
    location: 'Chittoor District',
    state: 'Andhra Pradesh',
    district: 'Chittoor',
    village: 'Chandragiri',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01T08:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z'
  },
  {
    _id: 'user-fpo-1',
    name: 'Rayalaseema Farmer Producer Co.',
    mobile: '9876543220',
    email: 'fpo@agrisetu.in',
    password: '$2a$10$wTqK/gZgA1hF.8pY91c1xeJ7vYqF15kFq5pU7V4k.zS8X3H2A0lq6', // hashed 'password123'
    role: 'fpo',
    location: 'Tirupati Highway Center',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    village: 'Renigunta Agro Hub',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-07-15T08:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z'
  },
  {
    _id: 'user-buyer-1',
    name: 'ABC Foods Ltd',
    mobile: '9876543230',
    email: 'buyer@abcfoods.com',
    password: '$2a$10$wTqK/gZgA1hF.8pY91c1xeJ7vYqF15kFq5pU7V4k.zS8X3H2A0lq6', // hashed 'password123'
    role: 'buyer',
    location: 'Sri City Industrial Zone',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    village: 'Sri City',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-06-20T08:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z'
  },
  {
    _id: 'user-buyer-2',
    name: 'Southern Agro Processors',
    mobile: '9876543231',
    email: 'southern@agro.com',
    password: '$2a$10$wTqK/gZgA1hF.8pY91c1xeJ7vYqF15kFq5pU7V4k.zS8X3H2A0lq6',
    role: 'buyer',
    location: 'Guntur Food Park',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    village: 'Autonagar',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-07-10T08:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z'
  },
  {
    _id: 'user-admin-1',
    name: 'Mandi Board Administrator',
    mobile: '9876543299',
    email: 'admin@agrisetu.in',
    password: '$2a$10$wTqK/gZgA1hF.8pY91c1xeJ7vYqF15kFq5pU7V4k.zS8X3H2A0lq6', // 'password123'
    role: 'admin',
    location: 'AP Agricultural Marketing Dept',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    village: 'Headquarters',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-05-01T08:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z'
  }
];

export const SEED_FARMER_PROFILE: IFarmerProfile = {
  _id: 'fp-1',
  userId: 'user-farmer-1',
  farmerName: 'Ramesh Naidu',
  farmLocation: 'Chandragiri, Chittoor District',
  cropsGrown: ['Tomato', 'Mango', 'Chilli', 'Groundnut'],
  approxLandArea: 7.5,
  irrigationType: 'Drip Irrigation & Borewell',
  soilType: 'Red Sandy Loam',
  upiId: 'ramesh.farmer@okhdfcbank',
  bankAccountMasked: 'HDFC •••• 4092',
  totalLotsSold: 18,
  rating: 4.8
};

export const SEED_FPO_PROFILE: IFPOProfile = {
  _id: 'fpo-1',
  userId: 'user-fpo-1',
  fpoName: 'Rayalaseema Farmer Producer Co. Ltd',
  registrationDetails: 'CIN: U01111AP2021PTC118940 / NABARD Sponsored',
  numberOfFarmers: 265,
  majorCrops: ['Tomato', 'Chilli', 'Paddy', 'Groundnut', 'Banana'],
  operatingDistricts: ['Tirupati', 'Chittoor', 'Annamayya', 'Nellore'],
  annualTurnover: '₹4.2 Crores',
  aggregationCenters: ['Renigunta Hub', 'Madanapalle Sorting Center'],
  storageCapacityTonnes: 850
};

export const SEED_BUYER_PROFILES: IBuyerProfile[] = [
  {
    _id: 'bp-1',
    userId: 'user-buyer-1',
    companyName: 'ABC Foods Ltd',
    businessType: 'Processor',
    registrationDetails: 'CIN: L15400AP2014PLC094211',
    gstNumber: '37AAACA8492J1Z3',
    requiredCrops: ['Tomato', 'Chilli', 'Mango', 'Onion'],
    purchaseCapacity: '500 tonnes / month',
    verificationStatus: 'VERIFIED',
    completedTransactions: 94,
    paymentReliability: 98.6,
    averageRating: 4.9,
    disputeRate: 0.4,
    badges: ['VERIFIED BUYER', 'TRUSTED BUYER']
  },
  {
    _id: 'bp-2',
    userId: 'user-buyer-2',
    companyName: 'Southern Agro Processors',
    businessType: 'Processor',
    registrationDetails: 'CIN: U15122AP2018PTC104523',
    gstNumber: '37AABCS1109P1ZU',
    requiredCrops: ['Chilli', 'Cotton', 'Maize', 'Paddy'],
    purchaseCapacity: '350 tonnes / month',
    verificationStatus: 'VERIFIED',
    completedTransactions: 62,
    paymentReliability: 97.2,
    averageRating: 4.7,
    disputeRate: 0.8,
    badges: ['VERIFIED BUYER']
  },
  {
    _id: 'bp-3',
    userId: 'user-buyer-3',
    companyName: 'FreshMart Supermarkets',
    businessType: 'Retailer',
    registrationDetails: 'CIN: U52100KA2019PTC128490',
    gstNumber: '29AAACF9921K1ZM',
    requiredCrops: ['Tomato', 'Banana', 'Onion', 'Rice (BPT / Sona Masoori)'],
    purchaseCapacity: '200 tonnes / month',
    verificationStatus: 'VERIFIED',
    completedTransactions: 118,
    paymentReliability: 99.1,
    averageRating: 4.85,
    disputeRate: 0.3,
    badges: ['VERIFIED BUYER', 'TRUSTED BUYER']
  }
];

export const SEED_MARKET_PRICES: IMarketPrice[] = [
  // Tomato in AP and nearby Mandis
  {
    _id: 'mp-tomato-madanapalle',
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    state: 'Andhra Pradesh',
    district: 'Annamayya',
    marketName: 'Madanapalle Mandi (Major Hub)',
    date: '2026-09-15',
    minPrice: 2400,
    maxPrice: 2900,
    modalPrice: 2720,
    arrivalQuantity: 620,
    arrivalUnit: 'tonnes',
    trend: 'RISING',
    priceChangePercentage: 4.8,
    distanceKmFromUser: 65,
    transportCostPerQtl: 60,
    storageCostPerQtl: 25
  },
  {
    _id: 'mp-tomato-guntur',
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    marketName: 'Guntur Mandi',
    date: '2026-09-15',
    minPrice: 2550,
    maxPrice: 2950,
    modalPrice: 2750,
    arrivalQuantity: 410,
    arrivalUnit: 'tonnes',
    trend: 'RISING',
    priceChangePercentage: 3.2,
    distanceKmFromUser: 320,
    transportCostPerQtl: 210,
    storageCostPerQtl: 30
  },
  {
    _id: 'mp-tomato-vijayawada',
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    state: 'Andhra Pradesh',
    district: 'NTR / Krishna',
    marketName: 'Vijayawada (Gollapudi Mandi)',
    date: '2026-09-15',
    minPrice: 2450,
    maxPrice: 2850,
    modalPrice: 2650,
    arrivalQuantity: 380,
    arrivalUnit: 'tonnes',
    trend: 'STABLE',
    priceChangePercentage: 0.5,
    distanceKmFromUser: 360,
    transportCostPerQtl: 230,
    storageCostPerQtl: 30
  },
  {
    _id: 'mp-tomato-tirupati',
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    marketName: 'Tirupati Mandi',
    date: '2026-09-15',
    minPrice: 2350,
    maxPrice: 2700,
    modalPrice: 2550,
    arrivalQuantity: 220,
    arrivalUnit: 'tonnes',
    trend: 'STABLE',
    priceChangePercentage: -0.8,
    distanceKmFromUser: 18,
    transportCostPerQtl: 25,
    storageCostPerQtl: 20
  },
  {
    _id: 'mp-tomato-nellore',
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    state: 'Andhra Pradesh',
    district: 'SPSR Nellore',
    marketName: 'Nellore Mandi',
    date: '2026-09-15',
    minPrice: 2300,
    maxPrice: 2650,
    modalPrice: 2500,
    arrivalQuantity: 195,
    arrivalUnit: 'tonnes',
    trend: 'FALLING',
    priceChangePercentage: -2.1,
    distanceKmFromUser: 135,
    transportCostPerQtl: 110,
    storageCostPerQtl: 25
  },
  {
    _id: 'mp-tomato-kolar',
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    state: 'Karnataka (Border)',
    district: 'Kolar',
    marketName: 'Kolar APMC',
    date: '2026-09-15',
    minPrice: 2500,
    maxPrice: 2980,
    modalPrice: 2820,
    arrivalQuantity: 840,
    arrivalUnit: 'tonnes',
    trend: 'RISING',
    priceChangePercentage: 5.1,
    distanceKmFromUser: 120,
    transportCostPerQtl: 95,
    storageCostPerQtl: 25
  },

  // Chilli
  {
    _id: 'mp-chilli-guntur',
    cropId: 'crop-chilli',
    cropName: 'Chilli',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    marketName: 'Guntur Mirchi Yard (Asia Largest)',
    date: '2026-09-15',
    minPrice: 16800,
    maxPrice: 22400,
    modalPrice: 19600,
    arrivalQuantity: 1250,
    arrivalUnit: 'quintals',
    trend: 'RISING',
    priceChangePercentage: 6.4,
    distanceKmFromUser: 320,
    transportCostPerQtl: 180,
    storageCostPerQtl: 80
  },
  {
    _id: 'mp-chilli-khammam',
    cropId: 'crop-chilli',
    cropName: 'Chilli',
    state: 'Telangana',
    district: 'Khammam',
    marketName: 'Khammam APMC Yard',
    date: '2026-09-15',
    minPrice: 16200,
    maxPrice: 21500,
    modalPrice: 18900,
    arrivalQuantity: 890,
    arrivalUnit: 'quintals',
    trend: 'STABLE',
    priceChangePercentage: 1.2,
    distanceKmFromUser: 420,
    transportCostPerQtl: 240,
    storageCostPerQtl: 75
  },

  // Rice / Paddy
  {
    _id: 'mp-rice-nellore',
    cropId: 'crop-rice',
    cropName: 'Rice (BPT / Sona Masoori)',
    state: 'Andhra Pradesh',
    district: 'SPSR Nellore',
    marketName: 'Nellore Rice Market Yard',
    date: '2026-09-15',
    minPrice: 4200,
    maxPrice: 4850,
    modalPrice: 4600,
    arrivalQuantity: 1500,
    arrivalUnit: 'quintals',
    trend: 'STABLE',
    priceChangePercentage: 0.8,
    distanceKmFromUser: 135,
    transportCostPerQtl: 90,
    storageCostPerQtl: 40
  },
  {
    _id: 'mp-cotton-adoni',
    cropId: 'crop-cotton',
    cropName: 'Cotton',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    marketName: 'Adoni Cotton Yard',
    date: '2026-09-15',
    minPrice: 7100,
    maxPrice: 7850,
    modalPrice: 7520,
    arrivalQuantity: 920,
    arrivalUnit: 'quintals',
    trend: 'RISING',
    priceChangePercentage: 3.5,
    distanceKmFromUser: 290,
    transportCostPerQtl: 170,
    storageCostPerQtl: 60
  }
];

export const SEED_BUYER_REQUIREMENTS: IBuyerRequirement[] = [
  {
    _id: 'req-1',
    buyerId: 'user-buyer-1',
    buyerName: 'ABC Foods Ltd',
    buyerCompany: 'ABC Foods Ltd',
    isVerified: true,
    crop: 'Tomato',
    quantity: 50,
    unit: 'tonnes (500 quintals)',
    requiredGrade: 'Grade A',
    minPrice: 2700,
    maxPrice: 2900,
    deliveryLocation: 'Sri City Food Processing Unit 2',
    district: 'Tirupati',
    requiredDate: '2026-09-20',
    additionalRequirements: 'Deep red color, firmness rating > 4, moisture 88-92%, crates provided if required.',
    status: 'ACTIVE',
    createdAt: '2026-09-14T09:00:00.000Z'
  },
  {
    _id: 'req-2',
    buyerId: 'user-buyer-3',
    buyerName: 'FreshMart Supermarkets',
    buyerCompany: 'FreshMart Supermarkets',
    isVerified: true,
    crop: 'Tomato',
    quantity: 20,
    unit: 'tonnes (200 quintals)',
    requiredGrade: 'Grade A',
    minPrice: 2650,
    maxPrice: 2850,
    deliveryLocation: 'Bengaluru / Hosur Distribution Hub',
    district: 'Bengaluru Rural',
    requiredDate: '2026-09-18',
    additionalRequirements: 'Sorted and washed, defect rate strictly < 4%. Immediate escrow settlement.',
    status: 'ACTIVE',
    createdAt: '2026-09-14T11:00:00.000Z'
  },
  {
    _id: 'req-3',
    buyerId: 'user-buyer-2',
    buyerName: 'Southern Agro Processors',
    buyerCompany: 'Southern Agro Processors',
    isVerified: true,
    crop: 'Chilli',
    quantity: 35,
    unit: 'tonnes (350 quintals)',
    requiredGrade: 'Teja Deluxe (Grade A)',
    minPrice: 19200,
    maxPrice: 21000,
    deliveryLocation: 'Guntur Processing Plant',
    district: 'Guntur',
    requiredDate: '2026-09-25',
    additionalRequirements: 'Moisture < 11%, stemless preferred, SHU > 60,000.',
    status: 'ACTIVE',
    createdAt: '2026-09-13T14:30:00.000Z'
  },
  {
    _id: 'req-4',
    buyerId: 'user-buyer-1',
    buyerName: 'ABC Foods Ltd',
    buyerCompany: 'ABC Foods Ltd',
    isVerified: true,
    crop: 'Mango (Banganapalli)',
    quantity: 40,
    unit: 'tonnes',
    requiredGrade: 'Processing Grade',
    minPrice: 38000,
    maxPrice: 42000,
    deliveryLocation: 'Chittoor Pulping Facility',
    district: 'Chittoor',
    requiredDate: '2026-09-28',
    additionalRequirements: 'Brix > 17, pesticide residue compliant.',
    status: 'ACTIVE',
    createdAt: '2026-09-12T10:00:00.000Z'
  }
];

export const SEED_CROP_LOTS: ICropLot[] = [
  {
    _id: 'lot-1',
    lotId: 'LOT-2026-000123',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Naidu',
    farmerMobile: '9876543210',
    farmerType: 'Farmer',
    crop: 'Tomato',
    variety: 'Shivam Hybrid (US 440)',
    quantity: 50,
    unit: 'quintal',
    harvestDate: '2026-09-14',
    location: 'Chandragiri, Chittoor District',
    district: 'Chittoor',
    state: 'Andhra Pradesh',
    expectedPrice: 2800,
    qualityGrade: 'Grade A',
    description: 'Freshly handpicked Shivam variety tomatoes with firm pulp, uniform bright red color, zero transit damage.',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'Offer Received',
    qualityReport: {
      grade: 'Grade A',
      size: '55-65 mm uniform diameter',
      color: '92% Deep Red Ripeness',
      moisture: '90.5%',
      defectPercentage: 2.1,
      packaging: 'Plastic Crates (25kg each)',
      qualityNotes: 'Optimal skin elasticity, no pest scars, high brix content suitable for both table & puree.',
      aiAnalyzed: true,
      aiConfidence: 94.5,
      aiSuggestedGrade: 'Grade A',
      visibleDefects: ['Minor surface blemish on < 2% of sample'],
      sizeConsistency: 'Excellent (CV < 4%)',
      colorConsistency: 'High uniform red',
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    },
    offersCount: 2,
    createdAt: '2026-09-14T10:00:00.000Z',
    updatedAt: '2026-09-15T07:30:00.000Z'
  },
  {
    _id: 'lot-2',
    lotId: 'LOT-2026-000124',
    farmerId: 'user-fpo-1',
    farmerName: 'Rayalaseema Farmer Producer Co.',
    farmerMobile: '9876543220',
    farmerType: 'FPO',
    crop: 'Tomato',
    variety: 'Hybrid US 440 & Abhinav Aggregated',
    quantity: 500, // 50 tonnes
    unit: 'quintal',
    harvestDate: '2026-09-15',
    location: 'Renigunta Aggregation Hub',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    expectedPrice: 2850,
    qualityGrade: 'Grade A',
    description: 'Bulk aggregated lot collected from 18 verified member farmers. Pre-graded and packed in standard food-grade crates.',
    images: [
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'Listed',
    isAggregated: true,
    contributingFarmersCount: 18,
    offersCount: 1,
    qualityReport: {
      grade: 'Grade A',
      size: '50-70 mm sorted',
      color: 'Uniform Red-Orange turning Red',
      moisture: '91%',
      defectPercentage: 3.0,
      packaging: '500 crates stacked on pallets',
      qualityNotes: 'Aggregated FPO quality certified lot with digital barcode on crates.',
      aiAnalyzed: true,
      aiConfidence: 92.0,
      aiSuggestedGrade: 'Grade A'
    },
    createdAt: '2026-09-15T06:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z'
  },
  {
    _id: 'lot-3',
    lotId: 'LOT-2026-000119',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Naidu',
    farmerMobile: '9876543210',
    farmerType: 'Farmer',
    crop: 'Chilli',
    variety: 'Teja Supreme Dry',
    quantity: 15,
    unit: 'quintal',
    harvestDate: '2026-08-28',
    location: 'Chandragiri, Chittoor District',
    district: 'Chittoor',
    state: 'Andhra Pradesh',
    expectedPrice: 20500,
    qualityGrade: 'Grade A',
    description: 'Sun-dried high pungent red chillies, sun-cured naturally on clean tarpaulins.',
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'Completed',
    offersCount: 3,
    createdAt: '2026-08-30T10:00:00.000Z',
    updatedAt: '2026-09-10T16:00:00.000Z'
  }
];

export const SEED_OFFERS: IOffer[] = [
  {
    _id: 'offer-1',
    offerId: 'OFF-2026-00101',
    lotId: 'lot-1',
    lotCode: 'LOT-2026-000123',
    crop: 'Tomato',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Naidu',
    buyerId: 'user-buyer-1',
    buyerName: 'ABC Foods Ltd',
    buyerCompany: 'ABC Foods Ltd',
    isBuyerVerified: true,
    quantity: 50,
    unit: 'quintal',
    originalPrice: 2700,
    currentPrice: 2750,
    transportResponsibility: 'Buyer',
    paymentTerms: '100% Escrow on Delivery',
    deliveryDate: '2026-09-18',
    offerExpiry: '2026-09-17T18:00:00.000Z',
    status: 'COUNTERED',
    negotiationHistory: [
      {
        senderId: 'user-buyer-1',
        senderRole: 'buyer',
        senderName: 'ABC Foods Ltd',
        price: 2700,
        message: 'We offer ₹2,700/qtl with free pickup from your Chandragiri farm.',
        timestamp: '2026-09-14T14:30:00.000Z'
      },
      {
        senderId: 'user-farmer-1',
        senderRole: 'farmer',
        senderName: 'Ramesh Naidu',
        price: 2800,
        message: 'Counter offer: Current Madanapalle modal is ₹2,750. I can supply Grade A at ₹2,800/qtl.',
        timestamp: '2026-09-14T16:45:00.000Z'
      },
      {
        senderId: 'user-buyer-1',
        senderRole: 'buyer',
        senderName: 'ABC Foods Ltd',
        price: 2750,
        message: 'We can settle at ₹2,750/qtl with instant simulated escrow lock upon your acceptance.',
        timestamp: '2026-09-15T08:15:00.000Z'
      }
    ],
    createdAt: '2026-09-14T14:30:00.000Z',
    updatedAt: '2026-09-15T08:15:00.000Z'
  },
  {
    _id: 'offer-2',
    offerId: 'OFF-2026-00102',
    lotId: 'lot-1',
    lotCode: 'LOT-2026-000123',
    crop: 'Tomato',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Naidu',
    buyerId: 'user-buyer-3',
    buyerName: 'FreshMart Supermarkets',
    buyerCompany: 'FreshMart Supermarkets',
    isBuyerVerified: true,
    quantity: 50,
    unit: 'quintal',
    originalPrice: 2720,
    currentPrice: 2720,
    transportResponsibility: 'Platform 3PL',
    paymentTerms: 'Instant Escrow',
    deliveryDate: '2026-09-17',
    offerExpiry: '2026-09-16T23:59:59.000Z',
    status: 'PENDING',
    negotiationHistory: [
      {
        senderId: 'user-buyer-3',
        senderRole: 'buyer',
        senderName: 'FreshMart Supermarkets',
        price: 2720,
        message: 'Spot buying offer at ₹2,720/qtl. 3PL logistics will be coordinated automatically.',
        timestamp: '2026-09-15T06:30:00.000Z'
      }
    ],
    createdAt: '2026-09-15T06:30:00.000Z',
    updatedAt: '2026-09-15T06:30:00.000Z'
  }
];

export const SEED_ORDERS: IOrder[] = [
  {
    _id: 'order-intransit-1',
    orderId: 'ORD-2026-09-001',
    transactionId: 'TXN-2026-000452',
    offerId: 'offer-1',
    lotId: 'lot-1',
    lotCode: 'LOT-2026-000123',
    crop: 'Tomato',
    quantity: 50,
    unit: 'quintal',
    agreedPricePerUnit: 2800,
    totalCropValue: 140000,
    transportCost: 3600,
    storageCost: 0,
    platformFee: 0,
    netRealization: 136400,
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Naidu',
    farmerPhone: '9876543210',
    buyerId: 'user-buyer-1',
    buyerName: 'ABC Foods Ltd',
    buyerCompany: 'ABC Foods Ltd',
    buyerPhone: '9876543220',
    pickupLocation: 'Chandragiri, Chittoor District',
    deliveryLocation: 'Sri City Mega Food Park, AP',
    status: 'DISPATCHED',
    escrowStatus: 'FUNDS SIMULATED / PROTECTED',
    paymentStatus: 'PAYMENT PROCESSING',
    logisticsId: 'logistics-intransit-1',
    createdAt: '2026-09-15T09:00:00.000Z',
    updatedAt: '2026-09-15T10:00:00.000Z'
  },
  {
    _id: 'order-completed-1',
    orderId: 'ORD-2026-000089',
    transactionId: 'TXN-2026-000451',
    offerId: 'offer-completed-1',
    lotId: 'lot-3',
    lotCode: 'LOT-2026-000119',
    crop: 'Chilli',
    quantity: 15,
    unit: 'quintal',
    agreedPricePerUnit: 20000,
    totalCropValue: 300000,
    transportCost: 4500,
    storageCost: 1500,
    platformFee: 1500,
    netRealization: 292500,
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Naidu',
    farmerPhone: '9876543210',
    buyerId: 'user-buyer-2',
    buyerName: 'Southern Agro Processors',
    buyerCompany: 'Southern Agro Processors',
    buyerPhone: '9876543231',
    pickupLocation: 'Chandragiri, Chittoor District',
    deliveryLocation: 'Guntur Processing Plant, Guntur',
    status: 'COMPLETED',
    escrowStatus: 'ESCROW RELEASED',
    paymentStatus: 'PAYMENT COMPLETED',
    logisticsId: 'logistics-1',
    qualityConfirmedAt: '2026-09-08T11:00:00.000Z',
    completedAt: '2026-09-08T15:30:00.000Z',
    createdAt: '2026-09-05T09:00:00.000Z',
    updatedAt: '2026-09-08T15:30:00.000Z'
  }
];

export const SEED_LOGISTICS: ILogistics[] = [
  {
    _id: 'logistics-intransit-1',
    logisticsId: 'LOG-2026-00091',
    orderId: 'order-intransit-1',
    transactionId: 'TXN-2026-000452',
    pickupLocation: 'Chandragiri, Chittoor District',
    deliveryLocation: 'Sri City Mega Food Park, AP',
    distanceKm: 95,
    estimatedTransportCost: 3600,
    estimatedDeliveryTime: '3.5 hours',
    vehicleType: 'Tata 407 Insulated Reefer Truck',
    vehicleNumber: 'AP-03-TC-8910',
    driverName: 'Suresh Kumar',
    driverPhone: '9440123456',
    preferredDate: '2026-09-15',
    status: 'In Transit',
    timeline: [
      {
        status: 'Transport Required',
        description: 'Order confirmed, logistics initiated for 50q Tomato batch',
        timestamp: '2026-09-15T09:00:00.000Z',
        completed: true
      },
      {
        status: 'Vehicle Assigned',
        description: 'Vehicle AP-03-TC-8910 assigned with driver Suresh Kumar (Venkata Logistics)',
        timestamp: '2026-09-15T09:30:00.000Z',
        completed: true
      },
      {
        status: 'Picked Up',
        description: 'Loaded 50 quintals at Chandragiri farm, electronic e-Way bill generated',
        timestamp: '2026-09-15T11:00:00.000Z',
        completed: true
      },
      {
        status: 'In Transit',
        description: 'En route via NH-716 toward Sri City, GPS telematics connected',
        timestamp: '2026-09-15T13:00:00.000Z',
        completed: true
      },
      {
        status: 'Delivered',
        description: 'Arriving at Sri City weighbridge for visual grade confirmation',
        timestamp: '2026-09-15T16:00:00.000Z',
        completed: false
      }
    ],
    createdAt: '2026-09-15T09:00:00.000Z',
    updatedAt: '2026-09-15T13:00:00.000Z'
  },
  {
    _id: 'logistics-1',
    logisticsId: 'LOG-2026-00089',
    orderId: 'order-completed-1',
    transactionId: 'TXN-2026-000451',
    pickupLocation: 'Chandragiri, Chittoor District',
    deliveryLocation: 'Guntur Processing Plant, Guntur',
    distanceKm: 310,
    estimatedTransportCost: 4500,
    estimatedDeliveryTime: '8 hours',
    vehicleType: 'Eicher 14ft Covered Truck',
    vehicleNumber: 'AP 26 TB 4821',
    driverName: 'K. Venkateswara Rao',
    driverPhone: '9988776655',
    preferredDate: '2026-09-06',
    status: 'Delivered',
    timeline: [
      {
        status: 'Transport Required',
        description: 'Order confirmed, request sent to verified agro-haulers',
        timestamp: '2026-09-05T09:30:00.000Z',
        completed: true
      },
      {
        status: 'Vehicle Assigned',
        description: 'Vehicle AP 26 TB 4821 assigned with driver K. Venkateswara Rao',
        timestamp: '2026-09-05T14:00:00.000Z',
        completed: true
      },
      {
        status: 'Picked Up',
        description: 'Loaded 15 quintals at Chandragiri farm, e-Way bill generated',
        timestamp: '2026-09-06T08:00:00.000Z',
        completed: true
      },
      {
        status: 'In Transit',
        description: 'Passed Ongole toll gate, temperature & humidity stable',
        timestamp: '2026-09-06T13:30:00.000Z',
        completed: true
      },
      {
        status: 'Delivered',
        description: 'Safely arrived at Guntur Processing Plant gate',
        timestamp: '2026-09-06T17:15:00.000Z',
        completed: true
      }
    ],
    createdAt: '2026-09-05T09:30:00.000Z',
    updatedAt: '2026-09-06T17:15:00.000Z'
  }
];

export const SEED_STORAGE_FACILITIES: IStorageFacility[] = [
  {
    _id: 'store-1',
    facilityName: 'Tirupati Cold Chain & Agro Logistics Hub',
    location: 'Renigunta Industrial Road, Tirupati',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    capacityTonnes: 3500,
    availableCapacityTonnes: 820,
    dailyCostPerQtl: 2.2, // ₹2.20 per quintal per day
    storageType: 'Cold Storage (0-4°C)',
    suitableCrops: ['Tomato', 'Mango', 'Banana', 'Vegetables'],
    contactPerson: 'S. Chandrasekhar (Warehouse Mgr)',
    contactPhone: '+91 877 228 9011',
    distanceKm: 22,
    rating: 4.8
  },
  {
    _id: 'store-2',
    facilityName: 'Madanapalle Controlled Atmosphere Cold Store',
    location: 'Beside APMC Market Yard, Madanapalle',
    district: 'Annamayya',
    state: 'Andhra Pradesh',
    capacityTonnes: 5000,
    availableCapacityTonnes: 1450,
    dailyCostPerQtl: 2.5,
    storageType: 'Controlled Atmosphere',
    suitableCrops: ['Tomato', 'Vegetables', 'Pomegranate'],
    contactPerson: 'B. Mohan Reddy',
    contactPhone: '+91 8571 245 670',
    distanceKm: 68,
    rating: 4.9
  },
  {
    _id: 'store-3',
    facilityName: 'Chittoor Central Dry Agri Warehouse (WDRA Certified)',
    location: 'Collectorate By-pass, Chittoor',
    district: 'Chittoor',
    state: 'Andhra Pradesh',
    capacityTonnes: 10000,
    availableCapacityTonnes: 4200,
    dailyCostPerQtl: 1.1,
    storageType: 'Dry Warehouse',
    suitableCrops: ['Paddy', 'Rice', 'Groundnut', 'Maize', 'Chilli'],
    contactPerson: 'K. Subrahmanyam',
    contactPhone: '+91 8572 233 450',
    distanceKm: 28,
    rating: 4.7
  },
  {
    _id: 'store-4',
    facilityName: 'Guntur Spice & Cold Preservation Hub',
    location: 'Mirchi Yard Road, Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    capacityTonnes: 12000,
    availableCapacityTonnes: 2800,
    dailyCostPerQtl: 2.8,
    storageType: 'Cold Storage (0-4°C)',
    suitableCrops: ['Chilli', 'Turmeric', 'Spices'],
    contactPerson: 'M. Sivaramakrishna',
    contactPhone: '+91 863 224 8899',
    distanceKm: 320,
    rating: 4.9
  }
];

export const SEED_DISPUTES: IDispute[] = [
  {
    _id: 'disp-1',
    disputeId: 'DISP-2026-00012',
    orderId: 'ORD-2026-000078',
    transactionId: 'TXN-2026-000412',
    raisedBy: {
      userId: 'user-buyer-1',
      name: 'ABC Foods Ltd',
      role: 'buyer'
    },
    type: 'Quantity mismatch',
    description: 'Weighed 48.2 quintals at factory weighbridge versus billed 50.0 quintals. Moisture loss of 1.8 qtl suspected during extended transit.',
    evidence: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'UNDER REVIEW',
    adminResolution: {
      resolvedBy: 'Mandi Board Administrator',
      decision: 'Fair weighbridge reconciliation applied. Verified 1.2% normal transit moisture evap. 0.6 qtl deduction adjusted.',
      escrowAction: 'SPLIT_SETTLEMENT',
      notes: '₹4,200 adjusted to buyer, remaining ₹1,34,500 released to farmer.',
      resolvedAt: '2026-09-12T14:00:00.000Z'
    },
    createdAt: '2026-09-11T10:00:00.000Z',
    updatedAt: '2026-09-12T14:00:00.000Z'
  }
];

export const SEED_NOTIFICATIONS: INotification[] = [
  {
    _id: 'notif-1',
    userId: 'user-farmer-1',
    title: 'New Buyer Offer Received!',
    message: 'ABC Foods Ltd made a counter-offer of ₹2,750/quintal for your Tomato Lot LOT-2026-000123.',
    type: 'offer',
    isRead: false,
    link: '/farmer',
    createdAt: '2026-09-15T08:15:00.000Z'
  },
  {
    _id: 'notif-2',
    userId: 'user-farmer-1',
    title: 'Market Price Alert (Tomato)',
    message: 'Madanapalle mandi price for Shivam Tomato increased by 4.8% to ₹2,720/qtl due to festival demand.',
    type: 'price',
    isRead: false,
    link: '/market-intelligence',
    createdAt: '2026-09-15T07:00:00.000Z'
  },
  {
    _id: 'notif-3',
    userId: 'user-farmer-1',
    title: 'AI Smart Match Found',
    message: 'Your Tomato lot matched 95% with purchase requirement of ABC Foods Ltd.',
    type: 'match',
    isRead: true,
    link: '/marketplace',
    createdAt: '2026-09-14T11:00:00.000Z'
  },
  {
    _id: 'notif-4',
    userId: 'user-farmer-1',
    title: 'Simulated Escrow Payment Completed',
    message: '₹2,92,500 transferred to your bank account for Transaction TXN-2026-000451 (Chilli Lot).',
    type: 'payment',
    isRead: true,
    link: '/transactions',
    createdAt: '2026-09-08T15:30:00.000Z'
  }
];
