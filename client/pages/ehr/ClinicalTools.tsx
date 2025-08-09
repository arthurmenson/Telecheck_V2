import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Calculator,
  Brain,
  Activity,
  Heart,
  Pill,
  Search,
  FileText,
  TestTube,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";

export function ClinicalTools() {
  const clinicalTools = [
    {
      id: 1,
      name: "Drug Interaction Checker",
      description: "Comprehensive drug-drug, drug-food, and drug-condition interaction analysis",
      icon: AlertTriangle,
      category: "Safety",
      badge: "Critical",
      color: "text-red-600 bg-red-50",
      features: ["Real-time alerts", "Severity ratings", "Clinical recommendations"]
    },
    {
      id: 2,
      name: "Clinical Calculator Suite",
      description: "Medical calculators for dosing, risk assessment, and clinical scores",
      icon: Calculator,
      category: "Calculations",
      badge: "Essential",
      color: "text-blue-600 bg-blue-50",
      features: ["BMI/BSA calculators", "Creatinine clearance", "Risk scores"]
    },
    {
      id: 3,
      name: "Differential Diagnosis AI",
      description: "AI-powered differential diagnosis assistant based on symptoms",
      icon: Brain,
      category: "Diagnosis",
      badge: "AI-Powered",
      color: "text-purple-600 bg-purple-50",
      features: ["Symptom analysis", "Probability ranking", "Clinical reasoning"]
    },
    {
      id: 4,
      name: "Lab Value Interpreter",
      description: "Automated lab result interpretation with reference ranges",
      icon: TestTube,
      category: "Laboratory",
      badge: "Automated",
      color: "text-green-600 bg-green-50",
      features: ["Reference ranges", "Critical values", "Trend analysis"]
    },
    {
      id: 5,
      name: "Vital Signs Monitor",
      description: "Real-time vital signs tracking and alert system",
      icon: Activity,
      category: "Monitoring",
      badge: "Real-time",
      color: "text-orange-600 bg-orange-50",
      features: ["Continuous monitoring", "Threshold alerts", "Trend visualization"]
    },
    {
      id: 6,
      name: "Clinical Guidelines",
      description: "Evidence-based clinical practice guidelines and protocols",
      icon: FileText,
      category: "Guidelines",
      badge: "Evidence-based",
      color: "text-indigo-600 bg-indigo-50",
      features: ["Latest guidelines", "Protocol search", "Implementation tools"]
    }
  ];

  const quickAccessTools = [
    { name: "BMI Calculator", icon: Target, action: "Calculate" },
    { name: "Creatinine Clearance", icon: TestTube, action: "Calculate" },
    { name: "Drug Lookup", icon: Search, action: "Search" },
    { name: "ICD-10 Codes", icon: FileText, action: "Lookup" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Clinical Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive suite of clinical decision support tools and calculators
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            12 Tools Available
          </Badge>
        </div>
      </div>

      {/* Quick Access Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Quick Access Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAccessTools.map((tool, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <tool.icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="text-sm font-medium">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.action}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicalTools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <Badge variant="secondary">{tool.badge}</Badge>
              </div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Features:
                </div>
                <ul className="space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4">
                  Open Tool
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Tool Usage Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Tools Used This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15 min</div>
              <div className="text-sm text-gray-600">Average Time Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
