import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import { LabCharts } from "../components/LabCharts";
import {
  Upload,
  FileText,
  Brain,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Share,
  Eye,
  Calendar,
  Clock,
  Zap,
  X,
  RefreshCw,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function Labs() {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(
    new File(["sample lab report"], "Lab_Report_2024-01-15.pdf", {
      type: "application/pdf",
    }),
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(100);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file) {
      // Validate file type and size
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or image file (JPG, PNG).",
          variant: "destructive",
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
      setIsAnalyzing(true);
      setAnalysisProgress(0);

      try {
        await analyzeLabReport(file);
      } catch (error) {
        console.error("Analysis failed:", error);
        toast({
          title: "Analysis Failed",
          description: "Unable to analyze the lab report. Please try again.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        setUploadedFile(null);
      }
    }
  };

  const analyzeLabReport = async (file: File) => {
    const formData = new FormData();
    formData.append("labReport", file);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const response = await fetch("/api/analyze-lab", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result = await response.json();

      // Complete the progress
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        toast({
          title: "Analysis Complete",
          description: "Your lab report has been successfully analyzed.",
        });
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      throw error;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisProgress(0);
  };

  const handleRequestDoctorReview = () => {
    toast({
      title: "Doctor Review Requested",
      description:
        "Your lab results have been sent to Dr. Smith for review. You'll receive feedback within 24 hours.",
    });
  };
  const labResults = [
    {
      test: "Glucose (Fasting)",
      value: "95",
      unit: "mg/dL",
      range: "70-100",
      status: "normal",
      interpretation:
        "Your fasting glucose level is within the normal range, indicating good blood sugar control.",
      risk: "low",
      trending: "stable",
      history: [
        { date: "2024-01-15", value: 95, status: "normal" },
        { date: "2023-12-15", value: 92, status: "normal" },
        { date: "2023-09-15", value: 89, status: "normal" },
        { date: "2023-06-15", value: 91, status: "normal" },
        { date: "2023-03-15", value: 94, status: "normal" },
      ],
      lastChange: 0,
      changeDirection: "stable",
      aiInsights: {
        riskFactors: ["Family history of diabetes", "Sedentary lifestyle"],
        recommendations: [
          "Maintain current diet",
          "Continue regular exercise",
          "Monitor quarterly",
        ],
        correlations: [
          "Strongly correlated with A1C levels",
          "Inversely related to physical activity",
        ],
        predictiveAnalysis:
          "Glucose levels are stable and well-controlled. Low risk of developing diabetes in the next 5 years based on current trends.",
        confidence: 92,
      },
    },
    {
      test: "Total Cholesterol",
      value: "205",
      unit: "mg/dL",
      range: "<200",
      status: "borderline",
      interpretation:
        "Your cholesterol is slightly elevated. Consider dietary modifications and increased exercise.",
      risk: "medium",
      trending: "increasing",
      history: [
        { date: "2024-01-15", value: 205, status: "borderline" },
        { date: "2023-12-15", value: 198, status: "normal" },
        { date: "2023-09-15", value: 195, status: "normal" },
        { date: "2023-06-15", value: 189, status: "normal" },
        { date: "2023-03-15", value: 185, status: "normal" },
      ],
      lastChange: +7,
      changeDirection: "increasing",
      aiInsights: {
        riskFactors: [
          "Increasing trend over 12 months",
          "Age factor",
          "Potential dietary patterns",
        ],
        recommendations: [
          "Reduce saturated fat intake",
          "Increase fiber consumption",
          "Consider statin consultation",
        ],
        correlations: [
          "Correlates with LDL cholesterol trends",
          "Related to dietary habits",
          "Influenced by exercise frequency",
        ],
        predictiveAnalysis:
          "Current trend suggests continued elevation. Intervention recommended to prevent cardiovascular complications.",
        confidence: 87,
      },
    },
    {
      test: "HDL Cholesterol",
      value: "58",
      unit: "mg/dL",
      range: ">40 (M), >50 (F)",
      status: "normal",
      interpretation:
        "Good HDL levels provide cardiovascular protection. Maintain current lifestyle habits.",
      risk: "low",
      trending: "stable",
      history: [
        { date: "2024-01-15", value: 58, status: "normal" },
        { date: "2023-12-15", value: 59, status: "normal" },
        { date: "2023-09-15", value: 57, status: "normal" },
        { date: "2023-06-15", value: 56, status: "normal" },
        { date: "2023-03-15", value: 58, status: "normal" },
      ],
      lastChange: -1,
      changeDirection: "stable",
      aiInsights: {
        riskFactors: ["Slight decline in protective cholesterol"],
        recommendations: [
          "Increase omega-3 fatty acids",
          "Regular aerobic exercise",
          "Maintain healthy weight",
        ],
        correlations: [
          "Inversely related to cardiovascular risk",
          "Positively affected by exercise",
        ],
        predictiveAnalysis:
          "HDL levels are adequate but could be optimized for better cardiovascular protection.",
        confidence: 85,
      },
    },
    {
      test: "LDL Cholesterol",
      value: "135",
      unit: "mg/dL",
      range: "<100",
      status: "high",
      interpretation:
        "LDL cholesterol is elevated, increasing cardiovascular risk. Consider statin therapy discussion with your doctor.",
      risk: "high",
      trending: "increasing",
      history: [
        { date: "2024-01-15", value: 135, status: "high" },
        { date: "2023-12-15", value: 128, status: "high" },
        { date: "2023-09-15", value: 122, status: "high" },
        { date: "2023-06-15", value: 115, status: "high" },
        { date: "2023-03-15", value: 108, status: "high" },
      ],
      lastChange: +7,
      changeDirection: "increasing",
      aiInsights: {
        riskFactors: [
          "Consistently elevated above target",
          "Progressive worsening trend",
          "Major cardiovascular risk factor",
        ],
        recommendations: [
          "Urgent cardiology consultation",
          "Consider statin therapy",
          "Strict dietary intervention",
          "Regular cardiovascular monitoring",
        ],
        correlations: [
          "Primary driver of cardiovascular risk",
          "Strongly linked to total cholesterol elevation",
        ],
        predictiveAnalysis:
          "High priority for intervention. Current trajectory significantly increases cardiovascular event risk within 5-10 years.",
        confidence: 94,
      },
    },
    {
      test: "Hemoglobin A1C",
      value: "5.4",
      unit: "%",
      range: "<5.7",
      status: "normal",
      interpretation:
        "Excellent long-term blood sugar control. Continue current management.",
      risk: "low",
      trending: "stable",
      history: [
        { date: "2024-01-15", value: 5.4, status: "normal" },
        { date: "2023-12-15", value: 5.3, status: "normal" },
        { date: "2023-09-15", value: 5.5, status: "normal" },
        { date: "2023-06-15", value: 5.2, status: "normal" },
        { date: "2023-03-15", value: 5.4, status: "normal" },
      ],
      lastChange: +0.1,
      changeDirection: "stable",
      aiInsights: {
        riskFactors: ["Excellent diabetes control reduces other risk factors"],
        recommendations: [
          "Maintain current diabetes management",
          "Continue regular monitoring",
          "Lifestyle maintenance",
        ],
        correlations: [
          "Excellent correlation with glucose control",
          "Predictive of long-term complications",
        ],
        predictiveAnalysis:
          "Excellent diabetes control significantly reduces risk of complications. Continue current management approach.",
        confidence: 96,
      },
    },
    {
      test: "Thyroid Stimulating Hormone",
      value: "2.1",
      unit: "mIU/L",
      range: "0.4-4.0",
      status: "normal",
      interpretation: "Thyroid function is normal. No intervention needed.",
      risk: "low",
      trending: "stable",
      history: [
        { date: "2024-01-15", value: 2.1, status: "normal" },
        { date: "2023-12-15", value: 2.0, status: "normal" },
        { date: "2023-09-15", value: 2.2, status: "normal" },
        { date: "2023-06-15", value: 1.9, status: "normal" },
        { date: "2023-03-15", value: 2.1, status: "normal" },
      ],
      lastChange: +0.1,
      changeDirection: "stable",
      aiInsights: {
        riskFactors: ["Age-related thyroid function changes"],
        recommendations: [
          "Annual thyroid monitoring",
          "Watch for symptoms of dysfunction",
        ],
        correlations: [
          "Affects metabolic rate",
          "Influences cardiovascular health",
        ],
        predictiveAnalysis:
          "Thyroid function is optimal. Low risk of thyroid-related complications.",
        confidence: 91,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-700 bg-green-50 border-green-200";
      case "borderline":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "borderline":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
        );
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Lab Results Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Upload and analyze your lab reports with AI-powered insights
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </div>

        {/* Compact Upload Section */}
        {
          <Card className="mb-6">
            <CardContent className="p-4">
              {!uploadedFile ? (
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      Upload Lab Report
                    </h3>
                    <p className="text-sm text-gray-600">
                      Add new lab results for AI analysis
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {uploadedFile.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetUpload}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {isAnalyzing ? (
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-xs text-gray-600">
                          Analyzing...
                        </span>
                      </div>
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-1">
                      <Progress value={analysisProgress} className="h-1" />
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Brain className="w-3 h-3 text-primary" />
                        <span>
                          {analysisProgress < 30 && "Extracting text..."}
                          {analysisProgress >= 30 &&
                            analysisProgress < 60 &&
                            "Identifying values..."}
                          {analysisProgress >= 60 &&
                            analysisProgress < 90 &&
                            "Comparing ranges..."}
                          {analysisProgress >= 90 && "Generating insights..."}
                        </span>
                        <span className="ml-auto text-primary">
                          {Math.round(analysisProgress)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        }

        {/* Enhanced AI Analysis Results */}
        <LabCharts
          labResults={labResults}
          isAnalyzing={isAnalyzing}
          analysisComplete={analysisComplete}
          onRequestDoctorReview={handleRequestDoctorReview}
        />

        {/* Detailed Lab Results Grid */}
        {analysisComplete && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Individual Lab Results
              </h2>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </div>

            {/* Lab Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {labResults.map((result, index) => (
                <Card
                  key={index}
                  className={`border-2 ${getStatusColor(result.status)}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{result.test}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        {getRiskBadge(result.risk)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {result.value}{" "}
                          <span className="text-sm font-normal text-gray-600">
                            {result.unit}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Reference: {result.range}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`text-sm font-medium flex items-center ${
                              result.changeDirection === "increasing"
                                ? "text-red-600"
                                : result.changeDirection === "decreasing"
                                  ? "text-green-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {result.changeDirection === "increasing" && "↗"}
                            {result.changeDirection === "decreasing" && "↘"}
                            {result.changeDirection === "stable" && "→"}
                            <span className="ml-1">
                              {result.lastChange > 0 ? "+" : ""}
                              {result.lastChange}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          vs. last test
                        </div>
                      </div>
                    </div>

                    {/* Mini trend chart */}
                    <div className="relative h-8 bg-gray-50 rounded-lg overflow-hidden">
                      <div className="flex items-end h-full space-x-1 px-2">
                        {result.history.slice(-5).map((point, idx) => {
                          const maxValue = Math.max(
                            ...result.history.map((h) => h.value),
                          );
                          const minValue = Math.min(
                            ...result.history.map((h) => h.value),
                          );
                          const range = maxValue - minValue || 1;
                          const height =
                            ((point.value - minValue) / range) * 24 + 4;
                          return (
                            <div
                              key={idx}
                              className={`flex-1 rounded-t transition-all ${
                                point.status === "normal"
                                  ? "bg-green-400"
                                  : point.status === "borderline"
                                    ? "bg-yellow-400"
                                    : "bg-red-400"
                              }`}
                              style={{ height: `${height}px` }}
                              title={`${new Date(point.date).toLocaleDateString()}: ${point.value}`}
                            />
                          );
                        })}
                      </div>
                      <div className="absolute bottom-0 left-2 right-2 text-xs text-gray-400 flex justify-between">
                        <span>
                          {new Date(
                            result.history[result.history.length - 5]?.date ||
                              result.history[0].date,
                          ).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span>
                          {new Date(
                            result.history[result.history.length - 1].date,
                          ).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </div>
                    </div>

                    <Accordion type="single" collapsible>
                      <AccordionItem
                        value="interpretation"
                        className="border-none"
                      >
                        <AccordionTrigger className="text-sm text-primary hover:no-underline py-2">
                          What does this mean?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-700 pt-2">
                          {result.interpretation}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trending Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cholesterol Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Cholesterol Trends
                  </CardTitle>
                  <CardDescription>
                    Monitor your cardiovascular health markers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {labResults
                      .filter((r) => r.test.includes("Cholesterol"))
                      .map((result, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">
                              {result.test}
                            </h4>
                            <div
                              className={`text-sm font-medium ${
                                result.changeDirection === "increasing"
                                  ? "text-red-600"
                                  : result.changeDirection === "decreasing"
                                    ? "text-green-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {result.changeDirection === "increasing" &&
                                "↗ Increasing"}
                              {result.changeDirection === "decreasing" &&
                                "↘ Decreasing"}
                              {result.changeDirection === "stable" &&
                                "→ Stable"}
                            </div>
                          </div>
                          <div className="flex items-end space-x-1 h-12">
                            {result.history.map((point, pidx) => {
                              const maxValue = Math.max(
                                ...result.history.map((h) => h.value),
                              );
                              const minValue = Math.min(
                                ...result.history.map((h) => h.value),
                              );
                              const range = maxValue - minValue || 1;
                              const height =
                                ((point.value - minValue) / range) * 40 + 8;
                              return (
                                <div
                                  key={pidx}
                                  className="flex-1 flex flex-col items-center"
                                >
                                  <div
                                    className={`w-full rounded-t transition-all ${
                                      point.status === "normal"
                                        ? "bg-green-400"
                                        : point.status === "borderline"
                                          ? "bg-yellow-400"
                                          : "bg-red-400"
                                    }`}
                                    style={{ height: `${height}px` }}
                                    title={`${new Date(point.date).toLocaleDateString()}: ${point.value}`}
                                  />
                                  <span className="text-xs text-gray-500 mt-1">
                                    {new Date(point.date).toLocaleDateString(
                                      "en-US",
                                      { month: "short", day: "numeric" },
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-2 text-xs text-gray-600 flex justify-between">
                            <span>Range: {result.range}</span>
                            <span>
                              Current: {result.value} {result.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Blood Sugar & Metabolic Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-primary" />
                    Metabolic Health Trends
                  </CardTitle>
                  <CardDescription>
                    Track blood sugar and metabolic markers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {labResults
                      .filter(
                        (r) =>
                          r.test.includes("Glucose") || r.test.includes("A1C"),
                      )
                      .map((result, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm">
                              {result.test}
                            </h4>
                            <div
                              className={`text-sm font-medium ${
                                result.changeDirection === "increasing"
                                  ? "text-red-600"
                                  : result.changeDirection === "decreasing"
                                    ? "text-green-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {result.changeDirection === "increasing" &&
                                "↗ Increasing"}
                              {result.changeDirection === "decreasing" &&
                                "↘ Decreasing"}
                              {result.changeDirection === "stable" &&
                                "→ Stable"}
                            </div>
                          </div>
                          <div className="flex items-end space-x-1 h-12">
                            {result.history.map((point, pidx) => {
                              const maxValue = Math.max(
                                ...result.history.map((h) => h.value),
                              );
                              const minValue = Math.min(
                                ...result.history.map((h) => h.value),
                              );
                              const range = maxValue - minValue || 1;
                              const height =
                                ((point.value - minValue) / range) * 40 + 8;
                              return (
                                <div
                                  key={pidx}
                                  className="flex-1 flex flex-col items-center"
                                >
                                  <div
                                    className={`w-full rounded-t transition-all ${
                                      point.status === "normal"
                                        ? "bg-green-400"
                                        : point.status === "borderline"
                                          ? "bg-yellow-400"
                                          : "bg-red-400"
                                    }`}
                                    style={{ height: `${height}px` }}
                                    title={`${new Date(point.date).toLocaleDateString()}: ${point.value}`}
                                  />
                                  <span className="text-xs text-gray-500 mt-1">
                                    {new Date(point.date).toLocaleDateString(
                                      "en-US",
                                      { month: "short", day: "numeric" },
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-2 text-xs text-gray-600 flex justify-between">
                            <span>Range: {result.range}</span>
                            <span>
                              Current: {result.value} {result.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overall Health Score */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-600" />
                  Health Score Analysis
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of your lab trends and health trajectory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      85/100
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Overall Health Score
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      Improving
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      6-Month Trend
                    </div>
                    <div className="text-xs text-gray-500">
                      Blood sugar control excellent, cholesterol needs attention
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      3
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Recommendations
                    </div>
                    <div className="text-xs text-gray-500">
                      Dietary changes, exercise, doctor consultation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
