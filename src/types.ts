export type UserRole = 'farmer' | 'fpo' | 'buyer' | 'admin';

export interface IUser {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
  location: string;
  state: string;
  district: string;
  village: string;
  isVerified?: boolean;
  avatar?: string;
  createdAt?: string;
}

export interface ICrop {
  _id: string;
  name: string;
  teluguName: string;
  category: string;
  icon: string;
  standardUnit: 'quintal' | 'tonne' | 'kg';
  grades: string[];
  shelfLifeDays: number;
}

export interface IMarketPrice {
  _id: string;
  cropId: string;
  cropName: string;
  state: string;
  district: string;
  marketName: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  arrivalQuantity: number;
  arrivalUnit: string;
  trend: 'RISING' | 'STABLE' | 'FALLING';
  priceChangePercentage: number;
  distanceKmFromUser?: number;
  transportCostPerQtl?: number;
  storageCostPerQtl?: number;
  otherCostsPerQtl?: number;
  netRealizationPerQtl?: number;
  isBestNetRealization?: boolean;
}

export interface ICropLot {
  _id: string;
  lotId: string;
  farmerId: string;
  farmerName: string;
  farmerMobile: string;
  farmerType: 'Farmer' | 'FPO';
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  location: string;
  district: string;
  state: string;
  expectedPrice: number;
  qualityGrade: string;
  description: string;
  images: string[];
  status: string;
  isAggregated?: boolean;
  contributingFarmersCount?: number;
  qualityReport?: any;
  offersCount?: number;
  createdAt: string;
}

export interface IBuyerRequirement {
  _id: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  isVerified: boolean;
  crop: string;
  quantity: number;
  unit: string;
  requiredGrade: string;
  minPrice: number;
  maxPrice: number;
  deliveryLocation: string;
  district: string;
  requiredDate: string;
  additionalRequirements: string;
  status: 'ACTIVE' | 'FULFILLED' | 'CANCELLED';
  createdAt: string;
}

export interface IOffer {
  _id: string;
  offerId: string;
  lotId: string;
  lotCode: string;
  crop: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  isBuyerVerified: boolean;
  quantity: number;
  unit: string;
  originalPrice: number;
  currentPrice: number;
  transportResponsibility: string;
  paymentTerms: string;
  deliveryDate: string;
  offerExpiry: string;
  status: 'PENDING' | 'COUNTERED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  negotiationHistory: {
    senderId: string;
    senderRole: string;
    senderName: string;
    price: number;
    message?: string;
    timestamp: string;
  }[];
  createdAt: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  orderNumber?: string;
  transactionId: string;
  offerId: string;
  lotId: string;
  lotCode: string;
  crop: string;
  quantity: number;
  unit: string;
  qualityGrade?: string;
  agreedPricePerUnit: number;
  totalCropValue: number;
  totalAmount?: number;
  transportCost: number;
  storageCost: number;
  platformFee: number;
  netRealization: number;
  netFarmerPayout?: number;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: string;
  escrowStatus: string;
  paymentStatus: string;
  logisticsId?: string;
  logisticsProvider?: string;
  vehicleNumber?: string;
  driverPhone?: string;
  qualityConfirmedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IColdStorage {
  _id: string;
  name: string;
  location: string;
  district: string;
  type: string;
  availableCapacityTonnes: number;
  totalCapacityTonnes: number;
  dailyRatePerQuintal: number;
  temperatureRange: string;
  humidityRange: string;
  supportedCrops: string[];
  contactPhone?: string;
}

export interface ILogistics {
  _id: string;
  logisticsId: string;
  orderId: string;
  transactionId: string;
  pickupLocation: string;
  deliveryLocation: string;
  distanceKm: number;
  estimatedTransportCost: number;
  estimatedDeliveryTime: string;
  vehicleType: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  preferredDate: string;
  status: string;
  timeline: {
    status: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface IStorageFacility {
  _id: string;
  facilityName: string;
  location: string;
  district: string;
  state: string;
  capacityTonnes: number;
  availableCapacityTonnes: number;
  dailyCostPerQtl: number;
  storageType: string;
  suitableCrops: string[];
  contactPerson: string;
  contactPhone: string;
  distanceKm: number;
  rating: number;
}

export interface IDispute {
  _id: string;
  disputeId: string;
  orderId: string;
  transactionId: string;
  raisedBy: {
    userId: string;
    name: string;
    role: string;
  };
  type: string;
  description: string;
  evidence: string[];
  status: 'OPEN' | 'UNDER REVIEW' | 'RESOLVED' | 'REJECTED';
  adminResolution?: {
    resolvedBy: string;
    decision: string;
    escrowAction: string;
    notes: string;
    resolvedAt: string;
  };
  createdAt: string;
}

export interface INotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface IBuyerProfile {
  _id: string;
  userId: string;
  companyName: string;
  businessType: string;
  registrationDetails: string;
  gstNumber?: string;
  requiredCrops: string[];
  purchaseCapacity: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  completedTransactions: number;
  paymentReliability: number;
  averageRating: number;
  disputeRate: number;
  badges: string[];
}
