export type UserRole = 'farmer' | 'fpo' | 'buyer' | 'admin';

export interface IUser {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  password?: string;
  role: UserRole;
  location: string;
  state: string;
  district: string;
  village: string;
  isVerified?: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFarmerProfile {
  _id: string;
  userId: string;
  farmerName: string;
  farmLocation: string;
  cropsGrown: string[];
  approxLandArea: number; // in acres
  irrigationType?: string;
  soilType?: string;
  upiId?: string;
  bankAccountMasked?: string;
  totalLotsSold?: number;
  rating?: number;
}

export interface IFPOProfile {
  _id: string;
  userId: string;
  fpoName: string;
  registrationDetails: string;
  numberOfFarmers: number;
  majorCrops: string[];
  operatingDistricts: string[];
  annualTurnover?: string;
  aggregationCenters?: string[];
  storageCapacityTonnes?: number;
}

export interface IBuyerProfile {
  _id: string;
  userId: string;
  companyName: string;
  businessType: 'Processor' | 'Retailer' | 'Exporter' | 'Institutional' | 'Trader';
  registrationDetails: string;
  gstNumber?: string;
  requiredCrops: string[];
  purchaseCapacity: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  completedTransactions: number;
  paymentReliability: number; // percentage, e.g. 98%
  averageRating: number;
  disputeRate: number; // percentage, e.g. 0.8%
  badges: ('VERIFIED BUYER' | 'TRUSTED BUYER')[];
}

export interface ICrop {
  _id: string;
  name: string;
  teluguName: string;
  category: 'Vegetable' | 'Grain' | 'Spice' | 'Cash Crop' | 'Fruit' | 'Oilseed';
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
  minPrice: number; // ₹ per quintal
  maxPrice: number;
  modalPrice: number;
  arrivalQuantity: number; // in tonnes or quintals
  arrivalUnit: string;
  trend: 'RISING' | 'STABLE' | 'FALLING';
  priceChangePercentage: number;
  distanceKmFromUser?: number;
  transportCostPerQtl?: number;
  storageCostPerQtl?: number;
}

export type LotStatus =
  | 'Draft'
  | 'Listed'
  | 'Offer Received'
  | 'Offer Accepted'
  | 'In Transit'
  | 'Delivered'
  | 'Completed'
  | 'Disputed';

export interface ICropLot {
  _id: string;
  lotId: string; // e.g. LOT-2026-000123
  farmerId: string;
  farmerName: string;
  farmerMobile: string;
  farmerType: 'Farmer' | 'FPO';
  crop: string;
  variety: string;
  quantity: number;
  unit: 'quintal' | 'tonne' | 'kg';
  harvestDate: string;
  location: string;
  district: string;
  state: string;
  expectedPrice: number; // per unit
  qualityGrade: 'Grade A' | 'Grade B' | 'Grade C';
  description: string;
  images: string[];
  status: LotStatus;
  isAggregated?: boolean;
  contributingFarmersCount?: number;
  qualityReport?: IQualityReport;
  offersCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQualityReport {
  grade: string;
  size: string;
  color: string;
  moisture: string;
  defectPercentage: number;
  packaging: string;
  qualityNotes: string;
  aiAnalyzed: boolean;
  aiConfidence?: number;
  aiSuggestedGrade?: string;
  visibleDefects?: string[];
  sizeConsistency?: string;
  colorConsistency?: string;
  imageUrl?: string;
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

export type OfferStatus =
  | 'PENDING'
  | 'COUNTERED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED';

export interface INegotiationStep {
  senderId: string;
  senderRole: 'farmer' | 'buyer' | 'fpo';
  senderName: string;
  price: number;
  message?: string;
  timestamp: string;
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
  transportResponsibility: 'Buyer' | 'Farmer' | 'Platform 3PL';
  paymentTerms: '100% Escrow on Delivery' | '50% Advance + 50% on Delivery' | 'Instant Escrow';
  deliveryDate: string;
  offerExpiry: string;
  status: OfferStatus;
  negotiationHistory: INegotiationStep[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'OFFER ACCEPTED'
  | 'ORDER CREATED'
  | 'LOGISTICS'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'QUALITY CONFIRMED'
  | 'PAYMENT'
  | 'COMPLETED'
  | 'DISPUTED';

export type EscrowStatus =
  | 'FUNDS SIMULATED / PROTECTED'
  | 'ELIGIBLE FOR RELEASE'
  | 'ESCROW RELEASED'
  | 'DISPUTED_HOLD';

export interface IOrder {
  _id: string;
  orderId: string;
  transactionId: string; // e.g. TXN-2026-000451
  offerId: string;
  lotId: string;
  lotCode: string;
  crop: string;
  quantity: number;
  unit: string;
  agreedPricePerUnit: number;
  totalCropValue: number;
  transportCost: number;
  storageCost: number;
  platformFee: number;
  netRealization: number; // cropValue - transport - storage - platformFee
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: OrderStatus;
  escrowStatus: EscrowStatus;
  paymentStatus: 'PAYMENT PENDING' | 'PAYMENT PROCESSING' | 'PAYMENT COMPLETED' | 'PAYMENT FAILED';
  logisticsId?: string;
  qualityConfirmedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
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
  status: 'Transport Required' | 'Vehicle Assigned' | 'Picked Up' | 'In Transit' | 'Delivered';
  timeline: {
    status: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
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
  storageType: 'Cold Storage (0-4°C)' | 'Controlled Atmosphere' | 'Dry Warehouse' | 'Silo';
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
    role: 'farmer' | 'buyer' | 'fpo';
  };
  type:
    | 'Quantity mismatch'
    | 'Quality disagreement'
    | 'Payment delay'
    | 'Delivery issue'
    | 'Price disagreement'
    | 'Other';
  description: string;
  evidence: string[]; // URLs or Base64
  status: 'OPEN' | 'UNDER REVIEW' | 'RESOLVED' | 'REJECTED';
  adminResolution?: {
    resolvedBy: string;
    decision: string;
    escrowAction: 'RELEASE_TO_FARMER' | 'REFUND_TO_BUYER' | 'SPLIT_SETTLEMENT';
    notes: string;
    resolvedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface INotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'offer' | 'price' | 'match' | 'payment' | 'delivery' | 'dispute' | 'system';
  isRead: boolean;
  link?: string;
  createdAt: string;
}
