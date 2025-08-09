import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Progress } from "../../components/ui/progress";
import {
  UserPlus,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Shield,
  Camera,
  Upload,
  Download,
  Eye,
  Edit,
  Save,
  ArrowLeft,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Users,
  Activity,
  Star,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock patient data
const recentIntakes = [
  {
    id: "INT001",
    patientName: "Sarah Johnson",
    status: "completed",
    completedAt: "2024-02-15 10:30 AM",
    assignedTo: "Dr. Smith",
    priority: "standard",
    forms: 5,
    completedForms: 5
  },
  {
    id: "INT002", 
    patientName: "Michael Chen",
    status: "in-progress",
    startedAt: "2024-02-15 2:15 PM",
    assignedTo: "Nurse Williams",
    priority: "urgent",
    forms: 5,
    completedForms: 3
  },
  {
    id: "INT003",
    patientName: "Emily Rodriguez",
    status: "pending",
    scheduledFor: "2024-02-16 9:00 AM",
    assignedTo: "Dr. Johnson",
    priority: "standard",
    forms: 5,
    completedForms: 0
  }
];

const intakeStats = [
  {
    title: "Today's Intakes",
    value: "12",
    change: "+3 from yesterday",
    icon: UserPlus,
    color: "#10b981"
  },
  {
    title: "Completion Rate",
    value: "94%",
    change: "+2.5% this week",
    icon: CheckCircle,
    color: "#3b82f6"
  },
  {
    title: "Avg. Time",
    value: "18 min",
    change: "-3 min improved",
    icon: Clock,
    color: "#f59e0b"
  },
  {
    title: "Patient Satisfaction",
    value: "4.8/5",
    change: "+0.2 this month",
    icon: Star,
    color: "#ef4444"
  }
];

export function Intake() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showNewIntake, setShowNewIntake] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const intakeSteps = [
    { id: 1, title: "Patient Information", icon: UserPlus },
    { id: 2, title: "Medical History", icon: FileText },
    { id: 3, title: "Insurance & Payment", icon: Shield },
    { id: 4, title: "Consent & Authorization", icon: CheckCircle },
    { id: 5, title: "Review & Submit", icon: Save }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <UserPlus className="w-8 h-8 text-primary" />
              Patient Intake & Onboarding
            </h1>
            <p className="text-muted-foreground">Streamlined patient registration and onboarding process</p>
          </div>

          <Button onClick={() => setShowNewIntake(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Patient Intake
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intakeStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* New Intake Form */}
        {showNewIntake && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>New Patient Intake</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowNewIntake(false)}
                >
                  Cancel
                </Button>
              </CardTitle>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-4">
                {intakeSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center gap-2 ${
                        isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-primary text-white' : 
                          isCompleted ? 'bg-green-600 text-white' : 'bg-muted'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <span className="text-sm font-medium hidden md:block">{step.title}</span>
                      </div>
                      {idx < intakeSteps.length - 1 && (
                        <div className="w-12 h-0.5 mx-2 bg-muted"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Step 1: Patient Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input placeholder="Enter last name" />
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <select className="w-full p-2 border rounded">
                        <option>Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input placeholder="patient@email.com" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Address</Label>
                      <Input placeholder="Street address" />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input placeholder="City" />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input placeholder="State" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Medical History */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Medical History</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Chief Complaint</Label>
                      <Textarea placeholder="What brings you in today?" />
                    </div>
                    <div>
                      <Label>Current Medications</Label>
                      <Textarea placeholder="List current medications, dosages, and frequency" />
                    </div>
                    <div>
                      <Label>Allergies</Label>
                      <Textarea placeholder="List any known allergies (medications, food, environmental)" />
                    </div>
                    <div>
                      <Label>Past Medical History</Label>
                      <Textarea placeholder="Previous surgeries, hospitalizations, chronic conditions" />
                    </div>
                    <div>
                      <Label>Family History</Label>
                      <Textarea placeholder="Relevant family medical history" />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => {
                    if (currentStep < intakeSteps.length) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      setShowNewIntake(false);
                      setCurrentStep(1);
                    }
                  }}
                >
                  {currentStep === intakeSteps.length ? 'Complete Intake' : 'Next'}
                  {currentStep < intakeSteps.length && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Intakes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Patient Intakes</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIntakes.map((intake) => (
                <div key={intake.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{intake.patientName}</h4>
                      <p className="text-sm text-muted-foreground">ID: {intake.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Assigned to</p>
                      <p className="font-medium">{intake.assignedTo}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(intake.completedForms / intake.forms) * 100} className="w-16 h-2" />
                        <span className="text-sm">{intake.completedForms}/{intake.forms}</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={
                        intake.status === 'completed' ? 'bg-green-100 text-green-700' :
                        intake.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }>
                        {intake.status.replace('-', ' ')}
                      </Badge>
                      {intake.priority === 'urgent' && (
                        <Badge className="bg-red-100 text-red-700 ml-2">Urgent</Badge>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Intake Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Intake Form Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "General Medicine", forms: 5, time: "15-20 min", icon: Activity },
                { name: "Pediatric", forms: 6, time: "20-25 min", icon: Heart },
                { name: "Specialty Care", forms: 8, time: "25-30 min", icon: Building }
              ].map((template, idx) => {
                const Icon = template.icon;
                return (
                  <div key={idx} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">{template.name}</h4>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{template.forms} forms included</p>
                      <p>Est. completion: {template.time}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Use Template
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
