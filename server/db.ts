import mongoose, { Schema, Document } from 'mongoose';
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
} from './types.ts';
import {
  SEED_USERS,
  SEED_FARMER_PROFILE,
  SEED_FPO_PROFILE,
  SEED_BUYER_PROFILES,
  SEED_CROPS,
  SEED_MARKET_PRICES,
  SEED_BUYER_REQUIREMENTS,
  SEED_CROP_LOTS,
  SEED_OFFERS,
  SEED_ORDERS,
  SEED_LOGISTICS,
  SEED_STORAGE_FACILITIES,
  SEED_DISPUTES,
  SEED_NOTIFICATIONS
} from './seed/data.ts';

/* =========================================================================
   Mongoose Schemas (Used when connected to MongoDB Atlas)
   ========================================================================= */

const UserSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'fpo', 'buyer', 'admin'], required: true },
  location: { type: String, default: '' },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, default: '' },
  village: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  avatar: { type: String }
}, { timestamps: true, _id: false });

const FarmerProfileSchema = new Schema<IFarmerProfile>({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  farmerName: { type: String, required: true },
  farmLocation: { type: String, required: true },
  cropsGrown: [{ type: String }],
  approxLandArea: { type: Number, default: 2 },
  irrigationType: { type: String },
  soilType: { type: String },
  upiId: { type: String },
  bankAccountMasked: { type: String },
  totalLotsSold: { type: Number, default: 0 },
  rating: { type: Number, default: 4.8 }
}, { timestamps: true, _id: false });

const FPOProfileSchema = new Schema<IFPOProfile>({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  fpoName: { type: String, required: true },
  registrationDetails: { type: String, required: true },
  numberOfFarmers: { type: Number, default: 50 },
  majorCrops: [{ type: String }],
  operatingDistricts: [{ type: String }],
  annualTurnover: { type: String },
  aggregationCenters: [{ type: String }],
  storageCapacityTonnes: { type: Number, default: 100 }
}, { timestamps: true, _id: false });

const BuyerProfileSchema = new Schema<IBuyerProfile>({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  companyName: { type: String, required: true },
  businessType: { type: String, required: true },
  registrationDetails: { type: String, required: true },
  gstNumber: { type: String },
  requiredCrops: [{ type: String }],
  purchaseCapacity: { type: String },
  verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
  completedTransactions: { type: Number, default: 0 },
  paymentReliability: { type: Number, default: 95 },
  averageRating: { type: Number, default: 4.5 },
  disputeRate: { type: Number, default: 1.0 },
  badges: [{ type: String }]
}, { timestamps: true, _id: false });

const CropSchema = new Schema<ICrop>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  teluguName: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: '🌱' },
  standardUnit: { type: String, default: 'quintal' },
  grades: [{ type: String }],
  shelfLifeDays: { type: Number, default: 7 }
}, { timestamps: true, _id: false });

const MarketPriceSchema = new Schema<IMarketPrice>({
  _id: { type: String, required: true },
  cropId: { type: String, required: true },
  cropName: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  marketName: { type: String, required: true },
  date: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  modalPrice: { type: Number, required: true },
  arrivalQuantity: { type: Number, default: 0 },
  arrivalUnit: { type: String, default: 'quintals' },
  trend: { type: String, enum: ['RISING', 'STABLE', 'FALLING'], default: 'STABLE' },
  priceChangePercentage: { type: Number, default: 0 },
  distanceKmFromUser: { type: Number },
  transportCostPerQtl: { type: Number },
  storageCostPerQtl: { type: Number }
}, { timestamps: true, _id: false });

const CropLotSchema = new Schema<ICropLot>({
  _id: { type: String, required: true },
  lotId: { type: String, required: true, unique: true },
  farmerId: { type: String, required: true, ref: 'User' },
  farmerName: { type: String, required: true },
  farmerMobile: { type: String, required: true },
  farmerType: { type: String, default: 'Farmer' },
  crop: { type: String, required: true },
  variety: { type: String, default: 'Standard' },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'quintal' },
  harvestDate: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, default: '' },
  state: { type: String, default: 'Andhra Pradesh' },
  expectedPrice: { type: Number, required: true },
  qualityGrade: { type: String, default: 'Grade A' },
  description: { type: String, default: '' },
  images: [{ type: String }],
  status: { type: String, default: 'Listed' },
  isAggregated: { type: Boolean, default: false },
  contributingFarmersCount: { type: Number, default: 1 },
  qualityReport: { type: Schema.Types.Mixed },
  offersCount: { type: Number, default: 0 }
}, { timestamps: true, _id: false });

const BuyerRequirementSchema = new Schema<IBuyerRequirement>({
  _id: { type: String, required: true },
  buyerId: { type: String, required: true, ref: 'User' },
  buyerName: { type: String, required: true },
  buyerCompany: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'quintal' },
  requiredGrade: { type: String, default: 'Grade A' },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  deliveryLocation: { type: String, required: true },
  district: { type: String, default: '' },
  requiredDate: { type: String, required: true },
  additionalRequirements: { type: String, default: '' },
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true, _id: false });

const OfferSchema = new Schema<IOffer>({
  _id: { type: String, required: true },
  offerId: { type: String, required: true, unique: true },
  lotId: { type: String, required: true },
  lotCode: { type: String, required: true },
  crop: { type: String, required: true },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCompany: { type: String, required: true },
  isBuyerVerified: { type: Boolean, default: false },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'quintal' },
  originalPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  transportResponsibility: { type: String, default: 'Buyer' },
  paymentTerms: { type: String, default: '100% Escrow on Delivery' },
  deliveryDate: { type: String, required: true },
  offerExpiry: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
  negotiationHistory: [{ type: Schema.Types.Mixed }]
}, { timestamps: true, _id: false });

const OrderSchema = new Schema<IOrder>({
  _id: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  transactionId: { type: String, required: true, unique: true },
  offerId: { type: String, required: true },
  lotId: { type: String, required: true },
  lotCode: { type: String, required: true },
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'quintal' },
  agreedPricePerUnit: { type: Number, required: true },
  totalCropValue: { type: Number, required: true },
  transportCost: { type: Number, default: 0 },
  storageCost: { type: Number, default: 0 },
  platformFee: { type: Number, default: 0 },
  netRealization: { type: Number, required: true },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, default: '' },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCompany: { type: String, required: true },
  buyerPhone: { type: String, default: '' },
  pickupLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  status: { type: String, default: 'OFFER ACCEPTED' },
  escrowStatus: { type: String, default: 'FUNDS SIMULATED / PROTECTED' },
  paymentStatus: { type: String, default: 'PAYMENT PENDING' },
  logisticsId: { type: String },
  qualityConfirmedAt: { type: String },
  completedAt: { type: String }
}, { timestamps: true, _id: false });

const LogisticsSchema = new Schema<ILogistics>({
  _id: { type: String, required: true },
  logisticsId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  transactionId: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  estimatedTransportCost: { type: Number, required: true },
  estimatedDeliveryTime: { type: String, default: 'Same Day' },
  vehicleType: { type: String, default: 'Covered Truck' },
  vehicleNumber: { type: String },
  driverName: { type: String },
  driverPhone: { type: String },
  preferredDate: { type: String },
  status: { type: String, default: 'Transport Required' },
  timeline: [{ type: Schema.Types.Mixed }]
}, { timestamps: true, _id: false });

const StorageFacilitySchema = new Schema<IStorageFacility>({
  _id: { type: String, required: true },
  facilityName: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, default: 'Andhra Pradesh' },
  capacityTonnes: { type: Number, required: true },
  availableCapacityTonnes: { type: Number, required: true },
  dailyCostPerQtl: { type: Number, required: true },
  storageType: { type: String, required: true },
  suitableCrops: [{ type: String }],
  contactPerson: { type: String, required: true },
  contactPhone: { type: String, required: true },
  distanceKm: { type: Number, default: 25 },
  rating: { type: Number, default: 4.8 }
}, { timestamps: true, _id: false });

const DisputeSchema = new Schema<IDispute>({
  _id: { type: String, required: true },
  disputeId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  transactionId: { type: String, required: true },
  raisedBy: { type: Schema.Types.Mixed, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  evidence: [{ type: String }],
  status: { type: String, default: 'OPEN' },
  adminResolution: { type: Schema.Types.Mixed }
}, { timestamps: true, _id: false });

const NotificationSchema = new Schema<INotification>({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'system' },
  isRead: { type: Boolean, default: false },
  link: { type: String }
}, { timestamps: true, _id: false });

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export const FarmerProfileModel = mongoose.models.FarmerProfile || mongoose.model('FarmerProfile', FarmerProfileSchema);
export const FPOProfileModel = mongoose.models.FPOProfile || mongoose.model('FPOProfile', FPOProfileSchema);
export const BuyerProfileModel = mongoose.models.BuyerProfile || mongoose.model('BuyerProfile', BuyerProfileSchema);
export const CropModel = mongoose.models.Crop || mongoose.model('Crop', CropSchema);
export const MarketPriceModel = mongoose.models.MarketPrice || mongoose.model('MarketPrice', MarketPriceSchema);
export const CropLotModel = mongoose.models.CropLot || mongoose.model('CropLot', CropLotSchema);
export const BuyerRequirementModel = mongoose.models.BuyerRequirement || mongoose.model('BuyerRequirement', BuyerRequirementSchema);
export const OfferModel = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
export const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export const LogisticsModel = mongoose.models.Logistics || mongoose.model('Logistics', LogisticsSchema);
export const StorageFacilityModel = mongoose.models.StorageFacility || mongoose.model('StorageFacility', StorageFacilitySchema);
export const DisputeModel = mongoose.models.Dispute || mongoose.model('Dispute', DisputeSchema);
export const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

/* =========================================================================
   Unified Resilient Store (In-Memory + Atlas Synchronization)
   Ensures 100% functionality even when MONGODB_URI is not configured yet.
   ========================================================================= */

class DataStore {
  public users: IUser[] = JSON.parse(JSON.stringify(SEED_USERS));
  public farmerProfiles: IFarmerProfile[] = [JSON.parse(JSON.stringify(SEED_FARMER_PROFILE))];
  public fpoProfiles: IFPOProfile[] = [JSON.parse(JSON.stringify(SEED_FPO_PROFILE))];
  public buyerProfiles: IBuyerProfile[] = JSON.parse(JSON.stringify(SEED_BUYER_PROFILES));
  public crops: ICrop[] = JSON.parse(JSON.stringify(SEED_CROPS));
  public marketPrices: IMarketPrice[] = JSON.parse(JSON.stringify(SEED_MARKET_PRICES));
  public buyerRequirements: IBuyerRequirement[] = JSON.parse(JSON.stringify(SEED_BUYER_REQUIREMENTS));
  public lots: ICropLot[] = JSON.parse(JSON.stringify(SEED_CROP_LOTS));
  public offers: IOffer[] = JSON.parse(JSON.stringify(SEED_OFFERS));
  public orders: IOrder[] = JSON.parse(JSON.stringify(SEED_ORDERS));
  public logistics: ILogistics[] = JSON.parse(JSON.stringify(SEED_LOGISTICS));
  public storage: IStorageFacility[] = JSON.parse(JSON.stringify(SEED_STORAGE_FACILITIES));
  public disputes: IDispute[] = JSON.parse(JSON.stringify(SEED_DISPUTES));
  public notifications: INotification[] = JSON.parse(JSON.stringify(SEED_NOTIFICATIONS));

  public isAtlasConnected = false;
  public connectionStatus = 'Connecting...';

  constructor() {
    this.initDatabase();
  }

  public resetToDefaultSeed() {
    this.users = JSON.parse(JSON.stringify(SEED_USERS));
    this.farmerProfiles = [JSON.parse(JSON.stringify(SEED_FARMER_PROFILE))];
    this.fpoProfiles = [JSON.parse(JSON.stringify(SEED_FPO_PROFILE))];
    this.buyerProfiles = JSON.parse(JSON.stringify(SEED_BUYER_PROFILES));
    this.crops = JSON.parse(JSON.stringify(SEED_CROPS));
    this.marketPrices = JSON.parse(JSON.stringify(SEED_MARKET_PRICES));
    this.buyerRequirements = JSON.parse(JSON.stringify(SEED_BUYER_REQUIREMENTS));
    this.lots = JSON.parse(JSON.stringify(SEED_CROP_LOTS));
    this.offers = JSON.parse(JSON.stringify(SEED_OFFERS));
    this.orders = JSON.parse(JSON.stringify(SEED_ORDERS));
    this.logistics = JSON.parse(JSON.stringify(SEED_LOGISTICS));
    this.storage = JSON.parse(JSON.stringify(SEED_STORAGE_FACILITIES));
    this.disputes = JSON.parse(JSON.stringify(SEED_DISPUTES));
    this.notifications = JSON.parse(JSON.stringify(SEED_NOTIFICATIONS));
  }

  private async initDatabase() {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri && !mongoUri.includes('username:password')) {
      try {
        await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 4000
        });
        this.isAtlasConnected = true;
        this.connectionStatus = 'Connected to MongoDB Atlas';
        console.log('Successfully connected to MongoDB Atlas');
      } catch (err: any) {
        this.isAtlasConnected = false;
        this.connectionStatus = 'Resilient Embedded Store Active (Atlas URI provided had error: ' + (err?.message || 'timeout') + ')';
        console.warn('MongoDB Atlas connection failed, falling back to Resilient Store:', err?.message);
      }
    } else {
      this.isAtlasConnected = false;
      this.connectionStatus = 'Active with Resilient Embedded Store (Configure MONGODB_URI in Settings > Secrets for Atlas)';
      console.log('Running with Resilient In-Memory & Seed Data Store');
    }
  }

  public addNotification(userId: string, title: string, message: string, type: INotification['type'] = 'system', link?: string) {
    const newNotif: INotification = {
      _id: 'notif-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      userId,
      title,
      message,
      type,
      isRead: false,
      link,
      createdAt: new Date().toISOString()
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }
}

export const db = new DataStore();
