import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import {
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Dna,
  Calendar,
  TrendingUp,
  Shield,
  Brain,
  Sparkles,
  Info,
  Eye,
  RefreshCw,
  Zap,
  Activity,
  Heart,
  Leaf,
  Book,
} from "lucide-react";

export function Medications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock herbal medicines the user is taking
  const currentHerbals = [
    { name: "Turmeric", dosage: "500mg daily", startDate: "2024-01-01" },
    { name: "Ginkgo Biloba", dosage: "120mg daily", startDate: "2023-12-15" },
    { name: "Garlic Extract", dosage: "600mg daily", startDate: "2024-01-10" },
  ];

  // Herbal-drug interactions
  const herbalInteractions = [
    {
      medication: "Atorvastatin",
      herbal: "Turmeric",
      severity: "moderate",
      risk: "May increase muscle pain risk",
      recommendation: "Monitor for muscle symptoms",
    },
    {
      medication: "Lisinopril",
      herbal: "Garlic Extract",
      severity: "minor",
      risk: "May enhance blood pressure lowering",
      recommendation: "Monitor blood pressure regularly",
    },
  ];

  // Mock medication data
  const medications = [
    {
      id: 1,
      name: "Atorvastatin",
      brand: "Lipitor",
      dosage: "20mg",
      frequency: "Once daily",
      prescribedDate: "2024-01-15",
      nextRefill: "2024-03-15",
      adherence: 94,
      category: "Cardiovascular",
      pgxStatus: "compatible",
      interactions: [],
      sideEffects: ["Muscle pain", "Digestive issues"],
      indication: "High cholesterol",
      prescriber: "Dr. Smith",
      pharmacy: "CVS Pharmacy",
    },
    {
      id: 2,
      name: "Metformin",
      brand: "Glucophage",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedDate: "2024-01-20",
      nextRefill: "2024-03-20",
      adherence: 89,
      category: "Diabetes",
      pgxStatus: "monitor",
      interactions: ["Alcohol"],
      sideEffects: ["Nausea", "Diarrhea"],
      indication: "Type 2 Diabetes",
      prescriber: "Dr. Johnson",
      pharmacy: "Walgreens",
    },
    {
      id: 3,
      name: "Lisinopril",
      brand: "Prinivil",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedDate: "2024-02-01",
      nextRefill: "2024-04-01",
      adherence: 96,
      category: "Cardiovascular",
      pgxStatus: "compatible",
      interactions: ["NSAIDs"],
      sideEffects: ["Dry cough", "Dizziness"],
      indication: "High blood pressure",
      prescriber: "Dr. Smith",
      pharmacy: "CVS Pharmacy",
    },
  ];

  const interactions = [
    {
      id: 1,
      medications: ["Atorvastatin", "Warfarin"],
      severity: "moderate",
      description: "May increase bleeding risk. Monitor INR levels closely.",
      recommendation: "Regular blood tests recommended",
    },
    {
      id: 2,
      medications: ["Metformin", "Alcohol"],
      severity: "high",
      description:
        "Increased risk of lactic acidosis when combined with alcohol.",
      recommendation: "Avoid alcohol consumption",
    },
  ];

  const pgxInsights = [
    {
      gene: "SLCO1B1",
      medication: "Atorvastatin",
      variant: "*15",
      impact: "Increased muscle toxicity risk",
      recommendation: "Consider alternative statin or lower dose",
      confidence: 92,
    },
    {
      gene: "CYP2C19",
      medication: "Clopidogrel",
      variant: "*2",
      impact: "Reduced drug effectiveness",
      recommendation: "Consider alternative antiplatelet therapy",
      confidence: 88,
    },
  ];

  const adherenceData = [
    { date: "2024-01-01", percentage: 85 },
    { date: "2024-01-08", percentage: 89 },
    { date: "2024-01-15", percentage: 92 },
    { date: "2024-01-22", percentage: 94 },
    { date: "2024-01-29", percentage: 96 },
    { date: "2024-02-05", percentage: 93 },
    { date: "2024-02-12", percentage: 94 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compatible":
        return "bg-green-100 text-green-800 border-green-200";
      case "monitor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "avoid":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Medication Management
              </h1>
              <p className="text-muted-foreground text-lg">
                AI-powered medication tracking with safety alerts and PGx
                insights
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button variant="outline" size="sm" className="hover-lift">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="gradient-bg text-white border-0 hover-lift"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-morphism border border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Medications
                  </p>
                  <p className="text-3xl font-bold text-foreground">3</p>
                </div>
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Adherence Rate
                  </p>
                  <p className="text-3xl font-bold text-foreground">94%</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interactions</p>
                  <p className="text-3xl font-bold text-foreground">2</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">PGx Alerts</p>
                  <p className="text-3xl font-bold text-foreground">1</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Dna className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Herbal-Drug Interaction Alerts */}
        <Card className="glass-morphism border border-orange-200 bg-orange-50/50 dark:bg-orange-900/10 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
              <Leaf className="w-5 h-5 mr-2" />
              Herbal-Drug Interaction Monitor
              <Badge className="ml-2 bg-orange-100 text-orange-800">
                {herbalInteractions.length} interactions
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Herbals */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Leaf className="w-4 h-4 mr-2 text-green-500" />
                  Current Herbal Medicines
                </h4>
                <div className="space-y-2">
                  {currentHerbals.map((herbal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200"
                    >
                      <div>
                        <div className="font-medium text-foreground">
                          {herbal.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {herbal.dosage}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Since {new Date(herbal.startDate).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Book className="w-4 h-4 mr-2" />
                  View Pharmacopia
                </Button>
              </div>

              {/* Interaction Alerts */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                  Active Interactions
                </h4>
                <div className="space-y-3">
                  {herbalInteractions.map((interaction, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Pill className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {interaction.medication}
                          </span>
                          <span className="text-muted-foreground">+</span>
                          <Leaf className="w-4 h-4 text-green-500" />
                          <span className="font-medium">
                            {interaction.herbal}
                          </span>
                        </div>
                        <Badge
                          className={`text-xs ${
                            interaction.severity === "severe"
                              ? "bg-red-100 text-red-800"
                              : interaction.severity === "moderate"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {interaction.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        <strong>Risk:</strong> {interaction.risk}
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">
                        <strong>Recommendation:</strong>{" "}
                        {interaction.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
                {herbalInteractions.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm">No interactions detected</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Medications */}
          <div className="lg:col-span-2">
            <Card className="glass-morphism border border-border/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="glass-morphism p-6 rounded-xl border border-border/10 hover-lift"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {medication.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(medication.pgxStatus)}
                            >
                              PGx {medication.pgxStatus}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-1">
                            {medication.brand} • {medication.dosage} •{" "}
                            {medication.frequency}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            For {medication.indication} • Prescribed by{" "}
                            {medication.prescriber}
                          </p>
                        </div>
                        <div className="mt-4 lg:mt-0 lg:text-right">
                          <div className="text-sm text-muted-foreground mb-1">
                            Adherence
                          </div>
                          <div className="text-2xl font-bold text-foreground">
                            {medication.adherence}%
                          </div>
                          <Progress
                            value={medication.adherence}
                            className="w-20 h-2 mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="glass-morphism p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground">
                              Next Refill
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {new Date(
                              medication.nextRefill,
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="glass-morphism p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground">
                              Interactions
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {medication.interactions.length} detected
                          </p>
                        </div>

                        <div className="glass-morphism p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-muted-foreground">
                              Pharmacy
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {medication.pharmacy}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bell className="w-4 h-4 mr-2" />
                          Reminders
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Interactions & Alerts */}
          <div className="space-y-6">
            {/* Drug Interactions */}
            <Card className="glass-morphism border border-border/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                  Drug Interactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <div
                      key={interaction.id}
                      className="p-4 rounded-xl border border-border/10 bg-background/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          className={getSeverityColor(interaction.severity)}
                        >
                          {interaction.severity} risk
                        </Badge>
                      </div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {interaction.medications.join(" + ")}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {interaction.description}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-primary">
                        <Brain className="w-3 h-3" />
                        <span>{interaction.recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PGx Insights */}
            <Card className="glass-morphism border border-border/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground flex items-center">
                  <Dna className="w-5 h-5 text-purple-500 mr-2" />
                  PGx Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pgxInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-border/10 bg-background/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {insight.gene} {insight.variant}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3" />
                          <span>{insight.confidence}% confidence</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {insight.medication}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {insight.impact}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-primary">
                        <Info className="w-3 h-3" />
                        <span>{insight.recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Adherence Trend */}
            <Card className="glass-morphism border border-border/20">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Adherence Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">
                      94%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average adherence
                    </div>
                  </div>

                  <div className="h-24 flex items-end justify-between space-x-1">
                    {adherenceData.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-primary rounded-t"
                          style={{
                            height: `${(data.percentage / 100) * 80}px`,
                          }}
                        ></div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {new Date(data.date).toLocaleDateString("en-US", {
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
