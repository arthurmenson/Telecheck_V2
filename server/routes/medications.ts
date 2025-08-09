import { RequestHandler } from "express";
import { db } from "../utils/database";
import { ApiResponse, Medication } from "@shared/types";

// Get all medications for a user
export const getMedications: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || 'user-1';
    const medications = db.getMedications(userId);
    
    const response: ApiResponse<Medication[]> = {
      success: true,
      data: medications
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch medications'
    });
  }
};

// Add new medication
export const addMedication: RequestHandler = async (req, res) => {
  try {
    const userId = req.body.userId || 'user-1';
    const medicationData = req.body;
    
    const medication = db.createMedication({
      ...medicationData,
      userId,
      isActive: true
    });
    
    const response: ApiResponse<Medication> = {
      success: true,
      data: medication,
      message: 'Medication added successfully'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error adding medication:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add medication'
    });
  }
};

// Check drug interactions
export const checkInteractions: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || 'user-1';
    const medications = db.getMedications(userId);
    
    // Simulate drug interaction checking
    const interactions = checkDrugInteractions(medications);
    
    const response: ApiResponse = {
      success: true,
      data: {
        interactions,
        riskLevel: interactions.length > 0 ? 'medium' : 'low',
        recommendations: generateInteractionRecommendations(interactions)
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error checking interactions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check interactions'
    });
  }
};

function checkDrugInteractions(medications: Medication[]) {
  // Simulate drug interaction database
  const knownInteractions = [
    {
      drug1: 'atorvastatin',
      drug2: 'warfarin',
      severity: 'moderate',
      description: 'May increase bleeding risk'
    },
    {
      drug1: 'metformin',
      drug2: 'alcohol',
      severity: 'moderate',
      description: 'May increase risk of lactic acidosis'
    }
  ];

  const interactions = [];
  const drugNames = medications.map(m => m.name.toLowerCase());

  for (const interaction of knownInteractions) {
    if (drugNames.includes(interaction.drug1) && drugNames.includes(interaction.drug2)) {
      interactions.push(interaction);
    }
  }

  return interactions;
}

function generateInteractionRecommendations(interactions: any[]) {
  if (interactions.length === 0) {
    return ['No significant drug interactions detected', 'Continue current medications as prescribed'];
  }

  return [
    'Discuss potential interactions with your healthcare provider',
    'Monitor for side effects',
    'Consider timing adjustments between medications'
  ];
}