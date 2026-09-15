# AgriSetu (కృషి సేతు)
## AI-Powered Agricultural Market Intelligence & Digital Transaction Platform

Connecting Smallholder Farmers and FPOs with Mandis, Food Processors, and Institutional Buyers across India with Transparent Price Discovery and Simulated Escrow Protection.

---

## 🌾 The Problem
Small and marginal farmers and Farmer Producer Organizations (FPOs) face severe information asymmetry:
1. **Opaque Mandi Prices & Middlemen:** Farmers sell immediately post-harvest at local farmgates at depressed distress prices due to lack of visibility into nearby terminal markets (e.g., Madanapalle, Guntur, Vijayawada).
2. **Hidden Net Realization:** A higher nominal mandi price often turns into a net loss once transit fuel, loading fees, and APMC cess are deducted.
3. **Quality Penalties:** Subjective grading by intermediaries results in arbitrary price cuts.
4. **Payment Default Risk:** Selling directly to private traders carries high payment risk and multi-week collection delays.

## 🚀 The AgriSetu Solution
AgriSetu is a production-grade full-stack digital platform engineered specifically for Indian agricultural corridors (with rich Andhra Pradesh & Telangana datasets):
- **Real-Time APMC Mandi Intelligence:** Live modal, minimum, and maximum prices alongside arrival volumes across regional hubs.
- **Automated Net Realization Engine:** Compares mandis by calculating:  
  `Net Realization = Mandi Modal Price - Transit Logistics Cost - Loading/Storage Fee - Mandi Cess`.
- **Gemini 3.8 AI Price & Window Forecasting:** Predicts 3–7 day price trajectories using arrival velocities, historical seasonal indices, and processor procurement batches.
- **Interactive Sale-Window & Cold Storage Arbitrage:** Compares "Sell Today" vs. "Store in Local Cold Chain 3 Days & Sell at Peak" with complete net financial breakdown.
- **AI Visual Quality Grading:** Computer vision inspection assigning AGMARK Grade A/B/C, caliber diameter, and defect percentages.
- **Institutional Buyer Marketplace:** Pre-verified corporate processors (e.g., ABC Foods Ltd) with verified GST credentials and transparent procurement tenders.
- **Algorithmic Compatibility Matching:** Matches harvest lots to buyers based on volume capacity, grade criteria, distance, and reliability score.
- **Simulated Escrow Protection Protocol:** 100% of buyer funds are locked into simulated escrow upon digital agreement signing, and deterministically released to the farmer's bank account upon delivery and weighbridge slip confirmation.
- **20-Step Guided Live Walkthrough:** Interactive demo controller stepping through the entire lifecycle of a 50-quintal tomato lot from harvest listing to final bank credit.

---

## 🛠️ Architecture & Tech Stack

```
├── server.ts                       # Express server with Vite middleware integration (Port 3000)
├── server/
│   ├── api.ts                     # RESTful API endpoints & 20-Step Transaction Simulation Controller
│   ├── db.ts                      # Resilient DataStore (Mongoose models + In-Memory Fallback with Indian Ag data)
│   ├── middleware/auth.ts         # JWT authentication & Role-Based Access Control (RBAC)
│   └── services/gemini.ts         # Server-side Gemini 3.8 Flash SDK integration with robust agro-heuristics fallback
├── src/
│   ├── components/                # UI Components (Navbar with persona switch, Footer, DemoTourModal, Recharts)
│   ├── context/AuthContext.tsx    # Global user session, persona switcher, language & live demo state
│   ├── pages/                     # Full page modules (Farmer, FPO, Buyer, Admin, Mandis, Storage, Escrow, AI)
│   ├── services/api.ts            # Frontend typed Axios/Fetch service layer
│   └── types.ts                   # Comprehensive TypeScript domain interfaces
```

### Frontend
- **React 18 + TypeScript + Vite**
- **Tailwind CSS** with specialized agricultural theme (Deep Emerald, Amber Gold, Warm Stone)
- **Recharts** for historical price trend line charts and arrival volume bars
- **Lucide React** for consistent, accessible iconography
- **English & Telugu UI Support** (`తెలుగు రైతు సలహా`)

### Backend
- **Node.js + Express**
- **@google/genai SDK** running server-side for Gemini 3.8 Flash market insights, sale window recommendations, and visual quality inspection
- **Resilient DataStore Engine:** Connects to MongoDB Atlas when configured via `MONGODB_URI`, or seamlessly switches to an in-memory transactional database seeded with realistic Andhra Pradesh mandi prices, cold storage directories, and buyer profiles.

---

## ⚡ Interactive 20-Step End-to-End Live Demo

The platform features an automated **20-Step Transaction Simulation Engine** that can be launched anytime from the top navigation bar or any dashboard:

1. **Step 1:** Farmer Ramesh Naidu lists 50 quintals of Grade A Shivam Hybrid tomatoes in Chandragiri, Chittoor.
2. **Step 2:** AI visual quality grading certifies Grade A with 1.8% defect rate.
3. **Step 3:** Gemini AI analyzes Madanapalle arrival velocity and predicts +₹110/qtl price upside.
4. **Step 4:** Sale-window optimizer calculates a net advantage of +₹5,170 by holding produce for 2–3 days.
5. **Step 5:** Farmer reserves space in Chittoor Agro Cold Hub at ₹2.20/qtl/day.
6. **Step 6:** Buyer matching algorithm scores ABC Foods Ltd with a 95% compatibility rating.
7. **Step 7:** ABC Foods Ltd issues a digital offer of ₹2,800/quintal with buyer-arranged transport.
8. **Step 8:** Farmer counters at ₹2,850/qtl highlighting certified Grade A caliber.
9. **Step 9:** ABC Foods accepts the counter-offer at ₹2,800/qtl with expedited pickup.
10. **Step 10:** Digital procurement contract signed with legal electronic timestamp.
11. **Step 11:** ABC Foods deposits ₹1,40,000 (100% total value) into simulated escrow.
12. **Step 12:** Escrow engine locks funds and issues verified pickup clearance.
13. **Step 13:** 3PL truck `AP-03-TC-8910` dispatched with driver contact.
14. **Step 14:** Truck arrives at Chandragiri farmgate; digital loading slip signed.
15. **Step 15:** Harvest in transit to Sri City Mega Food Park with temperature logs.
16. **Step 16:** Consignment arrives at ABC Foods factory weighbridge.
17. **Step 17:** Automated weighbridge slip verifies 50.2 quintals net weight.
18. **Step 18:** Quality supervisor approves AGMARK Grade A inspection sample.
19. **Step 19:** Escrow release triggered deterministically; deductions calculated.
20. **Step 20:** ₹1,36,400 credited to Farmer Ramesh Naidu's SBI bank account (A/C ...4092). Transaction complete!

---

## 👥 Pre-Seeded Test Personas & Quick Logins

Use the top-bar persona switch or sign in with:

| Persona | Name | Email | Password | Key Role |
|---|---|---|---|---|
| **Farmer** | Ramesh Naidu | `farmer@agrisetu.in` | `password123` | Tomato grower in Chandragiri, Chittoor |
| **FPO Aggregator** | Rayalaseema FPO | `fpo@agrisetu.in` | `password123` | 45 member farmers pooling bulk volumes |
| **Verified Buyer** | ABC Foods Ltd | `buyer@agrisetu.in` | `password123` | Institutional food processor in Sri City |
| **Mandi Admin** | APMC Administrator | `admin@agrisetu.in` | `password123` | Market yard regulator & dispute arbitrator |

---

## 🔒 Compliance & Escrow Disclaimer
*The simulated escrow feature in this prototype demonstrates automated conditional release protocols (buyer deposit -> delivery verification -> automated bank payout) without requiring live banking credentials. AI forecasts are algorithmic estimates based on terminal market velocities and should be paired with physical sample checks.*
