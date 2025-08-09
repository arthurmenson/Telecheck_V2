import { RequestHandler } from "express";
import { db } from "../utils/database";
import { AIService } from "../utils/aiService";
import { ApiResponse, LabResult, LabReport } from "@shared/types";

// Get all lab results for a user
export const getLabResults: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || 'user-1'; // Default user for demo
    const results = db.getLabResults(userId);
    
    const response: ApiResponse<LabResult[]> = {
      success: true,
      data: results
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching lab results:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lab results'
    });
  }
};

// Get lab reports for a user
export const getLabReports: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || 'user-1';
    const reports = db.getLabReports(userId);
    
    const response: ApiResponse<LabReport[]> = {
      success: true,
      data: reports
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching lab reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lab reports'
    });
  }
};

// Analyze uploaded lab report
export const analyzeLabReport: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const userId = req.body.userId || 'user-1';
    const file = req.file;

    // Create lab report record
    const labReport = db.createLabReport({
      userId,
      fileName: file.originalname,
      fileSize: file.size,
      uploadDate: new Date().toISOString(),
      analysisStatus: 'processing',
      results: [],
      confidence: 0
    });

    // Process document with AI
    const analysis = await AIService.processLabDocument(file.buffer, file.originalname);
    
    // Create lab results
    const labResults: LabResult[] = [];
    for (const result of analysis.results) {
      const labResult = db.createLabResult({
        ...result,
        userId
      });
      labResults.push(labResult);
    }

    // Generate AI insights
    const aiAnalysis = AIService.analyzeLabResults(labResults);
    
    // Create health insights
    for (const insight of aiAnalysis.insights) {
      db.createHealthInsight({
        ...insight,
        userId
      });
    }

    // Update lab report with results
    const updatedReport = db.updateLabReport(labReport.id, {
      analysisStatus: 'completed',
      results: labResults,
      aiSummary: aiAnalysis.summary,
      confidence: analysis.confidence
    });

    const response: ApiResponse<LabReport> = {
      success: true,
      data: updatedReport!,
      message: 'Lab report analyzed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Lab analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get AI analysis for specific lab results
export const getLabAnalysis: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId || 'user-1';
    const results = db.getLabResults(userId);
    
    if (results.length === 0) {
      return res.json({
        success: true,
        data: {
          summary: 'No lab results available for analysis.',
          insights: [],
          overallRisk: 'low'
        }
      });
    }

    const analysis = AIService.analyzeLabResults(results);
    
    const response: ApiResponse = {
      success: true,
      data: analysis
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error generating lab analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate analysis'
    });
  }
};