import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Progress } from "../components/ui/progress";
import {
  Settings,
  Users,
  Shield,
  Bell,
  Database,
  FileText,
  CreditCard,
  Lock,
  Monitor,
  Globe,
  Palette,
  Mail,
  Phone,
  Upload,
  Download,
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Key,
  Activity,
  BarChart3,
  Calendar,
  Clock,
  HardDrive,
  Server,
  Wifi,
  Zap,
  Building,
  MapPin,
  Flag,
  Plus,
  Stethoscope,
  Brain,
} from "lucide-react";

// Mock data for settings
const systemStats = {
  totalUsers: 2847,
  activeUsers: 347,
  totalStorage: "2.4 TB",
  usedStorage: "1.8 TB",
  uptime: "99.9%",
  lastBackup: "2024-02-15 02:00 AM",
};

const mockUsers = [
  { id: "1", name: "Dr. Sarah Johnson", email: "sarah@hospital.com", role: "doctor", status: "active", lastLogin: "2024-02-15" },
  { id: "2", name: "John Smith", email: "john@email.com", role: "patient", status: "active", lastLogin: "2024-02-14" },
  { id: "3", name: "Emily Davis", email: "emily@pharmacy.com", role: "pharmacist", status: "active", lastLogin: "2024-02-13" },
  { id: "4", name: "Michael Brown", email: "michael@clinic.com", role: "nurse", status: "pending", lastLogin: "Never" },
];

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "Telecheck AI Healthcare",
    systemDescription: "Comprehensive AI-powered healthcare management platform",
    timezone: "UTC-8",
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    
    // Security Settings
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorRequired: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceNotifications: true,
    securityAlerts: true,
    
    // System Settings
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "7",
    auditLogging: true,
    performanceMonitoring: true,
    
    // Integration Settings
    enableAPI: true,
    apiRateLimit: 1000,
    webhookEnabled: false,
    
    // Compliance Settings
    hipaaCompliance: true,
    gdprCompliance: true,
    dataEncryption: true,
    auditTrail: true,

    // AI Management Settings
    primaryLLMProvider: "openai",
    openaiKey: "",
    anthropicKey: "",
    medicalModel: "gpt-4-medical",
    medicalDisclaimer: true,
    humanOversight: true,
    contentFiltering: true,
    confidenceThreshold: 85,
    maxTokens: 2048,
    drugInteractionChecks: true,
    diagnosisAssistance: true,
    treatmentSuggestions: true,
    clinicalDatabase: "pubmed",
    specialtyFocus: "general",
    usageAlerts: true,
    monthlyBudget: 500,
    autoModelUpdate: true,
    performanceLogging: true,
    aiAuditLogging: true,
    biasMonitoring: true,
    explainableAI: true,
    complianceFramework: "fda",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleBackupNow = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              System Settings
            </h1>
            <p className="text-muted-foreground">Manage system configuration and administrative settings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold text-foreground">{systemStats.usedStorage}</p>
                  <Progress value={75} className="mt-2 h-2" />
                </div>
                <HardDrive className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold text-foreground">{systemStats.uptime}</p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Backup</p>
                  <p className="text-2xl font-bold text-foreground">2h ago</p>
                </div>
                <Database className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="ai">AI Management</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Organization Information
                  </CardTitle>
                  <CardDescription>Basic system and organization settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={settings.systemName}
                      onChange={(e) => handleSettingChange("systemName", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="systemDescription">Description</Label>
                    <Textarea
                      id="systemDescription"
                      value={settings.systemDescription}
                      onChange={(e) => handleSettingChange("systemDescription", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Regional Settings
                  </CardTitle>
                  <CardDescription>Currency, date format, and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-3">System Theme</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border-2 border-primary rounded-lg p-3 text-center cursor-pointer">
                        <div className="w-8 h-8 bg-white border rounded mx-auto mb-2"></div>
                        <span className="text-sm">Light</span>
                      </div>
                      <div className="border-2 border-muted rounded-lg p-3 text-center cursor-pointer">
                        <div className="w-8 h-8 bg-slate-800 rounded mx-auto mb-2"></div>
                        <span className="text-sm">Dark</span>
                      </div>
                      <div className="border-2 border-muted rounded-lg p-3 text-center cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-white to-slate-800 rounded mx-auto mb-2"></div>
                        <span className="text-sm">Auto</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">User Management</h3>
                <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account with role and permissions</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="pharmacist">Pharmacist</SelectItem>
                          <SelectItem value="patient">Patient</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Create User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="border-b border-border p-4">
                  <div className="flex items-center gap-4">
                    <Input placeholder="Search users..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="divide-y">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Last login: {user.lastLogin}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Password Policy
                  </CardTitle>
                  <CardDescription>Configure password requirements for all users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleSettingChange("passwordMinLength", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                      <Switch
                        id="requireUppercase"
                        checked={settings.passwordRequireUppercase}
                        onCheckedChange={(checked) => handleSettingChange("passwordRequireUppercase", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireNumbers">Require Numbers</Label>
                      <Switch
                        id="requireNumbers"
                        checked={settings.passwordRequireNumbers}
                        onCheckedChange={(checked) => handleSettingChange("passwordRequireNumbers", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireSymbols">Require Special Characters</Label>
                      <Switch
                        id="requireSymbols"
                        checked={settings.passwordRequireSymbols}
                        onCheckedChange={(checked) => handleSettingChange("passwordRequireSymbols", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Session & Access Control
                  </CardTitle>
                  <CardDescription>Manage user sessions and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange("maxLoginAttempts", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorRequired">Require Two-Factor Authentication</Label>
                    <Switch
                      id="twoFactorRequired"
                      checked={settings.twoFactorRequired}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorRequired", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Security
                  </CardTitle>
                  <CardDescription>Manage API keys and access tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Master API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value="sk_live_1234567890abcdef"
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleSettingChange("apiRateLimit", parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Regenerate Key
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Channels
                  </CardTitle>
                  <CardDescription>Configure how system notifications are delivered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                  
                  <Button onClick={handleTestEmail} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    Send Test Email
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Alert Types
                  </CardTitle>
                  <CardDescription>Configure which events trigger notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceNotifications">Maintenance Alerts</Label>
                    <Switch
                      id="maintenanceNotifications"
                      checked={settings.maintenanceNotifications}
                      onCheckedChange={(checked) => handleSettingChange("maintenanceNotifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <Switch
                      id="securityAlerts"
                      checked={settings.securityAlerts}
                      onCheckedChange={(checked) => handleSettingChange("securityAlerts", checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email Recipients</Label>
                    <div className="space-y-2">
                      <Input placeholder="admin@example.com" />
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Recipient
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Management */}
          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LLM Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    LLM Configuration
                  </CardTitle>
                  <CardDescription>Configure AI model providers and API keys</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryProvider">Primary LLM Provider</Label>
                    <Select value={settings.primaryLLMProvider || "openai"} onValueChange={(value) => handleSettingChange("primaryLLMProvider", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                        <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                        <SelectItem value="azure">Azure OpenAI</SelectItem>
                        <SelectItem value="google">Google (Gemini)</SelectItem>
                        <SelectItem value="local">Local Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="openaiKey">OpenAI API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={settings.openaiKey || "sk-..."}
                        onChange={(e) => handleSettingChange("openaiKey", e.target.value)}
                        placeholder="sk-..."
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anthropicKey">Anthropic API Key</Label>
                    <Input
                      type="password"
                      value={settings.anthropicKey || ""}
                      onChange={(e) => handleSettingChange("anthropicKey", e.target.value)}
                      placeholder="sk-ant-..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalModel">Medical-Specific Model</Label>
                    <Select value={settings.medicalModel || "gpt-4-medical"} onValueChange={(value) => handleSettingChange("medicalModel", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4-medical">GPT-4 Medical Tuned</SelectItem>
                        <SelectItem value="claude-3-medical">Claude 3 Medical</SelectItem>
                        <SelectItem value="med-palm">Med-PaLM 2</SelectItem>
                        <SelectItem value="custom">Custom Medical Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* AI Safety & Ethics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    AI Safety & Ethics
                  </CardTitle>
                  <CardDescription>Configure safety protocols and ethical guidelines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="medicalDisclaimer">Medical Disclaimer Required</Label>
                    <Switch
                      id="medicalDisclaimer"
                      checked={settings.medicalDisclaimer !== false}
                      onCheckedChange={(checked) => handleSettingChange("medicalDisclaimer", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="humanOversight">Human Oversight Required</Label>
                    <Switch
                      id="humanOversight"
                      checked={settings.humanOversight !== false}
                      onCheckedChange={(checked) => handleSettingChange("humanOversight", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="contentFiltering">Content Filtering</Label>
                    <Switch
                      id="contentFiltering"
                      checked={settings.contentFiltering !== false}
                      onCheckedChange={(checked) => handleSettingChange("contentFiltering", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confidenceThreshold">Minimum Confidence Threshold</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={settings.confidenceThreshold || 85}
                        onChange={(e) => handleSettingChange("confidenceThreshold", parseInt(e.target.value))}
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Response Tokens</Label>
                    <Input
                      type="number"
                      value={settings.maxTokens || 2048}
                      onChange={(e) => handleSettingChange("maxTokens", parseInt(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Clinical Decision Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Clinical Decision Support
                  </CardTitle>
                  <CardDescription>Configure AI-powered clinical recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="drugInteractionChecks">Drug Interaction Checks</Label>
                    <Switch
                      id="drugInteractionChecks"
                      checked={settings.drugInteractionChecks !== false}
                      onCheckedChange={(checked) => handleSettingChange("drugInteractionChecks", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="diagnosisAssistance">Diagnosis Assistance</Label>
                    <Switch
                      id="diagnosisAssistance"
                      checked={settings.diagnosisAssistance !== false}
                      onCheckedChange={(checked) => handleSettingChange("diagnosisAssistance", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="treatmentSuggestions">Treatment Suggestions</Label>
                    <Switch
                      id="treatmentSuggestions"
                      checked={settings.treatmentSuggestions !== false}
                      onCheckedChange={(checked) => handleSettingChange("treatmentSuggestions", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicalDatabase">Clinical Knowledge Database</Label>
                    <Select value={settings.clinicalDatabase || "pubmed"} onValueChange={(value) => handleSettingChange("clinicalDatabase", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pubmed">PubMed + Medical Literature</SelectItem>
                        <SelectItem value="uptodate">UpToDate Integration</SelectItem>
                        <SelectItem value="mayo">Mayo Clinic Guidelines</SelectItem>
                        <SelectItem value="custom">Custom Knowledge Base</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialtyFocus">Medical Specialty Focus</Label>
                    <Select value={settings.specialtyFocus || "general"} onValueChange={(value) => handleSettingChange("specialtyFocus", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Medicine</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="emergency">Emergency Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Monitoring & Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage Monitoring
                  </CardTitle>
                  <CardDescription>Monitor AI usage, costs, and performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">12.4K</p>
                      <p className="text-sm text-muted-foreground">API Calls Today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">$247.80</p>
                      <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Token Usage</span>
                      <span>2.8M / 5M tokens</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usageAlerts">Usage Alerts</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alert at 80% of monthly limit</span>
                      <Switch
                        checked={settings.usageAlerts !== false}
                        onCheckedChange={(checked) => handleSettingChange("usageAlerts", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyBudget">Monthly Budget Limit</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={settings.monthlyBudget || 500}
                        onChange={(e) => handleSettingChange("monthlyBudget", parseInt(e.target.value))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Usage Report
                  </Button>
                </CardContent>
              </Card>

              {/* Model Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Model Performance
                  </CardTitle>
                  <CardDescription>Monitor AI model accuracy and response quality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Diagnostic Accuracy</span>
                        <span className="text-sm text-muted-foreground">94.2%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Response Time</span>
                        <span className="text-sm text-muted-foreground">1.3s avg</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">User Satisfaction</span>
                        <span className="text-sm text-muted-foreground">4.7/5</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoModelUpdate">Auto Model Updates</Label>
                    <Switch
                      id="autoModelUpdate"
                      checked={settings.autoModelUpdate !== false}
                      onCheckedChange={(checked) => handleSettingChange("autoModelUpdate", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="performanceLogging">Performance Logging</Label>
                    <Switch
                      id="performanceLogging"
                      checked={settings.performanceLogging !== false}
                      onCheckedChange={(checked) => handleSettingChange("performanceLogging", checked)}
                    />
                  </div>

                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recalibrate Models
                  </Button>
                </CardContent>
              </Card>

              {/* Compliance & Audit */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    AI Compliance & Audit
                  </CardTitle>
                  <CardDescription>Ensure AI systems meet regulatory requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="aiAuditLogging">AI Decision Audit Logging</Label>
                    <Switch
                      id="aiAuditLogging"
                      checked={settings.aiAuditLogging !== false}
                      onCheckedChange={(checked) => handleSettingChange("aiAuditLogging", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="biasMonitoring">Bias Monitoring</Label>
                    <Switch
                      id="biasMonitoring"
                      checked={settings.biasMonitoring !== false}
                      onCheckedChange={(checked) => handleSettingChange("biasMonitoring", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="explainableAI">Explainable AI Outputs</Label>
                    <Switch
                      id="explainableAI"
                      checked={settings.explainableAI !== false}
                      onCheckedChange={(checked) => handleSettingChange("explainableAI", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complianceFramework">Compliance Framework</Label>
                    <Select value={settings.complianceFramework || "fda"} onValueChange={(value) => handleSettingChange("complianceFramework", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fda">FDA Medical Device</SelectItem>
                        <SelectItem value="eu-mdr">EU MDR</SelectItem>
                        <SelectItem value="iso13485">ISO 13485</SelectItem>
                        <SelectItem value="hipaa">HIPAA Compliant</SelectItem>
                        <SelectItem value="custom">Custom Framework</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      AI Audit Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Compliance Check
                    </Button>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Last compliance audit: February 10, 2024
                    </p>
                    <p className="text-xs text-green-600">
                      ✓ All AI systems compliant
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Backup & Recovery
                  </CardTitle>
                  <CardDescription>Configure automatic backups and data recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBackup">Enable Automatic Backups</Label>
                    <Switch
                      id="autoBackup"
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange("backupFrequency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (years)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleBackupNow} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Backup Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    System Monitoring
                  </CardTitle>
                  <CardDescription>Performance monitoring and logging settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auditLogging">Enable Audit Logging</Label>
                    <Switch
                      id="auditLogging"
                      checked={settings.auditLogging}
                      onCheckedChange={(checked) => handleSettingChange("auditLogging", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="performanceMonitoring">Performance Monitoring</Label>
                    <Switch
                      id="performanceMonitoring"
                      checked={settings.performanceMonitoring}
                      onCheckedChange={(checked) => handleSettingChange("performanceMonitoring", checked)}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Disk Usage</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Detailed Metrics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Settings */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Healthcare Compliance
                  </CardTitle>
                  <CardDescription>HIPAA and healthcare-specific compliance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="hipaaCompliance">HIPAA Compliance</Label>
                      <p className="text-sm text-muted-foreground">Enable HIPAA-compliant data handling</p>
                    </div>
                    <Switch
                      id="hipaaCompliance"
                      checked={settings.hipaaCompliance}
                      onCheckedChange={(checked) => handleSettingChange("hipaaCompliance", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataEncryption">Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt all data at rest and in transit</p>
                    </div>
                    <Switch
                      id="dataEncryption"
                      checked={settings.dataEncryption}
                      onCheckedChange={(checked) => handleSettingChange("dataEncryption", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auditTrail">Audit Trail</Label>
                      <p className="text-sm text-muted-foreground">Maintain comprehensive audit logs</p>
                    </div>
                    <Switch
                      id="auditTrail"
                      checked={settings.auditTrail}
                      onCheckedChange={(checked) => handleSettingChange("auditTrail", checked)}
                    />
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">HIPAA Compliant</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      All required HIPAA safeguards are properly configured
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="w-5 h-5" />
                    Privacy Regulations
                  </CardTitle>
                  <CardDescription>GDPR and other privacy compliance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="gdprCompliance">GDPR Compliance</Label>
                      <p className="text-sm text-muted-foreground">Enable GDPR data protection features</p>
                    </div>
                    <Switch
                      id="gdprCompliance"
                      checked={settings.gdprCompliance}
                      onCheckedChange={(checked) => handleSettingChange("gdprCompliance", checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Privacy Policy</Label>
                    <div className="flex gap-2">
                      <Input placeholder="https://yoursite.com/privacy" className="flex-1" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Terms of Service</Label>
                    <div className="flex gap-2">
                      <Input placeholder="https://yoursite.com/terms" className="flex-1" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Data Purge Request
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Data Purge Request</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all data older than the retention period. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Confirm Purge
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
