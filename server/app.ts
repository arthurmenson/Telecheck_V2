import express from 'express';
import cors from 'cors';
import multer from 'multer';

// Keep using existing route handlers for now to avoid behavior changes
import { handleDemo } from './routes/demo';
import { handleChat, getChatHistory } from './routes/chat';
import { getLabResults, getLabReports, analyzeLabReport, getLabAnalysis } from './routes/labs';
import { getMedications, addMedication, checkInteractions } from './routes/medications';
import { getVitalSigns, addVitalSigns, getVitalTrends } from './routes/vitals';
import filesRouter from './modules/files/router';
import { getHealthInsights, dismissInsight, generateInsights } from './routes/insights';
import {
  assessCardiovascularRisk,
  analyzeAdvancedInteractions,
  generatePredictiveAnalytics,
  analyzeMedicalImage,
  analyzeMiddleware,
  assessSymptoms,
  calculateAdvancedHealthScore,
  getClinicalRecommendations,
} from './routes/advanced-ai';
import {
  syncAppleHealth,
  syncFitbit,
  syncCGM,
  getAggregatedWearableData,
  registerWearableDevice,
  getConnectedDevices,
} from './routes/wearables';
import {
  getAvailableProviders,
  scheduleAppointment,
  getUserAppointments,
  createConsultationRoom,
  generateConsultationSummary,
  triageEmergency,
} from './routes/telemedicine';
import { exportFHIRData, importFHIRData, getFHIRPatient, getFHIRObservations } from './routes/fhir';
import rpmRouter from './modules/rpm/router';
import ccmRouter from './modules/ccm/router';
import billingRouter from './modules/billing/router';
import notificationsRouter from './modules/notifications/router';
import messagingRouter from './modules/messaging/router';
import programsRouter from './modules/ehr/programs/router';
import ussdRouter from './modules/ussd/router';
import smsRouter from './modules/sms/router';

// Minimal upload middleware (matches existing index.ts behavior)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api/ping', (_req, res) => {
    res.json({ message: process.env.PING_MESSAGE ?? 'ping' });
  });

  app.get('/api/demo', handleDemo);

  app.post('/api/chat', handleChat);
  app.get('/api/chat/history/:userId?', getChatHistory);

  // Labs
  app.get('/api/labs/results/:userId?', getLabResults);
  app.get('/api/labs/reports/:userId?', getLabReports);
  app.post('/api/labs/analyze', upload.single('labReport'), analyzeLabReport);
  app.get('/api/labs/analysis/:userId?', getLabAnalysis);

  // Medications
  app.get('/api/medications/:userId?', getMedications);
  app.post('/api/medications', addMedication);
  app.get('/api/medications/interactions/:userId?', checkInteractions);

  // Vitals
  app.get('/api/vitals/:userId?', getVitalSigns);
  app.post('/api/vitals', addVitalSigns);
  app.get('/api/vitals/trends/:userId?', getVitalTrends);

  // Insights
  app.get('/api/insights/:userId?', getHealthInsights);
  app.post('/api/insights/:id/dismiss', dismissInsight);
  app.post('/api/insights/generate/:userId?', generateInsights);

  // Advanced AI
  app.get('/api/ai/cardiovascular-risk/:userId?', assessCardiovascularRisk);
  app.get('/api/ai/drug-interactions/:userId?', analyzeAdvancedInteractions);
  app.get('/api/ai/predictive-analytics/:userId?', generatePredictiveAnalytics);
  app.post('/api/ai/analyze-image', analyzeMiddleware, analyzeMedicalImage);
  app.post('/api/ai/assess-symptoms', assessSymptoms);
  app.get('/api/ai/health-score/:userId?', calculateAdvancedHealthScore);
  app.get('/api/ai/clinical-recommendations/:userId?', getClinicalRecommendations);

  // Wearables
  app.get('/api/wearables/apple-health/:userId?', syncAppleHealth);
  app.get('/api/wearables/fitbit/:userId?', syncFitbit);
  app.get('/api/wearables/cgm/:userId?', syncCGM);
  app.get('/api/wearables/aggregate/:userId?', getAggregatedWearableData);
  app.post('/api/wearables/register', registerWearableDevice);
  app.get('/api/wearables/devices/:userId?', getConnectedDevices);

  // Telemedicine
  app.get('/api/telemedicine/providers', getAvailableProviders);
  app.post('/api/telemedicine/schedule', scheduleAppointment);
  app.get('/api/telemedicine/appointments/:userId?', getUserAppointments);
  app.post('/api/telemedicine/room', createConsultationRoom);
  app.get('/api/telemedicine/summary/:roomId', generateConsultationSummary);
  app.post('/api/telemedicine/triage', triageEmergency);

  // FHIR
  app.post('/api/fhir/export/:userId?', exportFHIRData);
  app.post('/api/fhir/import', importFHIRData);
  app.get('/api/fhir/patient/:userId?', getFHIRPatient);
  app.get('/api/fhir/observations/:userId?', getFHIRObservations);

  // RPM/CCM/Billing
  app.use('/api', rpmRouter);
  app.use('/api', ccmRouter);
  app.use('/api', billingRouter);
  app.use('/api', ussdRouter);
  app.use('/api', smsRouter);
  app.use('/api', notificationsRouter);
  app.use('/api', messagingRouter);
  app.use('/api', filesRouter);
  app.use('/api', programsRouter);

  return app;
}

export default createApp;


