import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleChat } from "./routes/chat";
import { handleChat, getChatHistory } from "./routes/chat";
import { getLabResults, getLabReports, analyzeLabReport, getLabAnalysis } from "./routes/labs";
import { getMedications, addMedication, checkInteractions } from "./routes/medications";
import { getVitalSigns, addVitalSigns, getVitalTrends } from "./routes/vitals";
import { getHealthInsights, dismissInsight, generateInsights } from "./routes/insights";
import multer from "multer";
import { 
  assessCardiovascularRisk, 
  analyzeAdvancedInteractions, 
  generatePredictiveAnalytics,
  analyzeMedicalImage,
  analyzeMiddleware,
  assessSymptoms,
  calculateAdvancedHealthScore,
  getClinicalRecommendations
} from "./routes/advanced-ai";
import { 
  syncAppleHealth, 
  syncFitbit, 
  syncCGM, 
  getAggregatedWearableData,
  registerWearableDevice,
  getConnectedDevices
} from "./routes/wearables";
import { 
  getAvailableProviders, 
  scheduleAppointment, 
  getUserAppointments,
  createConsultationRoom,
  generateConsultationSummary,
  triageEmergency
} from "./routes/telemedicine";
import { 
  exportFHIRData, 
  importFHIRData, 
  getFHIRPatient, 
  getFHIRObservations 
} from "./routes/fhir";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/chat", handleChat);
  app.get("/api/chat/history/:userId?", getChatHistory);

  // Lab routes
  app.get("/api/labs/results/:userId?", getLabResults);
  app.get("/api/labs/reports/:userId?", getLabReports);
  app.post("/api/labs/analyze", upload.single('labReport'), analyzeLabReport);
  app.get("/api/labs/analysis/:userId?", getLabAnalysis);
  
  // Medication routes
  app.get("/api/medications/:userId?", getMedications);
  app.post("/api/medications", addMedication);
  app.get("/api/medications/interactions/:userId?", checkInteractions);
  
  // Vital signs routes
  app.get("/api/vitals/:userId?", getVitalSigns);
  app.post("/api/vitals", addVitalSigns);
  app.get("/api/vitals/trends/:userId?", getVitalTrends);
  
  // Health insights routes
  app.get("/api/insights/:userId?", getHealthInsights);
  app.post("/api/insights/:id/dismiss", dismissInsight);
  app.post("/api/insights/generate/:userId?", generateInsights);

  // Advanced AI routes
  app.get("/api/ai/cardiovascular-risk/:userId?", assessCardiovascularRisk);
  app.get("/api/ai/drug-interactions/:userId?", analyzeAdvancedInteractions);
  app.get("/api/ai/predictive-analytics/:userId?", generatePredictiveAnalytics);
  app.post("/api/ai/analyze-image", analyzeMiddleware, analyzeMedicalImage);
  app.post("/api/ai/assess-symptoms", assessSymptoms);
  app.get("/api/ai/health-score/:userId?", calculateAdvancedHealthScore);
  app.get("/api/ai/clinical-recommendations/:userId?", getClinicalRecommendations);

  // Wearable integration routes
  app.get("/api/wearables/apple-health/:userId?", syncAppleHealth);
  app.get("/api/wearables/fitbit/:userId?", syncFitbit);
  app.get("/api/wearables/cgm/:userId?", syncCGM);
  app.get("/api/wearables/aggregate/:userId?", getAggregatedWearableData);
  app.post("/api/wearables/register", registerWearableDevice);
  app.get("/api/wearables/devices/:userId?", getConnectedDevices);

  // Telemedicine routes
  app.get("/api/telemedicine/providers", getAvailableProviders);
  app.post("/api/telemedicine/schedule", scheduleAppointment);
  app.get("/api/telemedicine/appointments/:userId?", getUserAppointments);
  app.post("/api/telemedicine/room", createConsultationRoom);
  app.get("/api/telemedicine/summary/:roomId", generateConsultationSummary);
  app.post("/api/telemedicine/triage", triageEmergency);

  // FHIR integration routes
  app.post("/api/fhir/export/:userId?", exportFHIRData);
  app.post("/api/fhir/import", importFHIRData);
  app.get("/api/fhir/patient/:userId?", getFHIRPatient);
  app.get("/api/fhir/observations/:userId?", getFHIRObservations);

  return app;
}
