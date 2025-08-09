import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "patient" | "doctor" | "pharmacist" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
  organization?: string;
  license?: string;
  specialization?: string;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  switchRole: (newRole: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Mock user database with different roles
const mockUsers: Record<string, User> = {
  "patient@telecheck.com": {
    id: "1",
    email: "patient@telecheck.com",
    name: "John Patient",
    role: "patient",
    avatar: "/avatars/patient.jpg",
    permissions: [
      "view_own_records",
      "book_appointments",
      "order_medications",
      "view_lab_results",
    ],
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  "doctor@telecheck.com": {
    id: "2",
    email: "doctor@telecheck.com",
    name: "Dr. Sarah Wilson",
    role: "doctor",
    avatar: "/avatars/doctor.jpg",
    permissions: [
      "view_all_patients",
      "prescribe_medications",
      "review_labs",
      "telehealth_consults",
      "approve_treatments",
    ],
    organization: "Telecheck Medical Center",
    license: "MD-123456",
    specialization: "Internal Medicine",
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  "pharmacist@telecheck.com": {
    id: "3",
    email: "pharmacist@telecheck.com",
    name: "PharmD Mike Chen",
    role: "pharmacist",
    avatar: "/avatars/pharmacist.jpg",
    permissions: [
      "dispense_medications",
      "review_prescriptions",
      "drug_interactions",
      "inventory_management",
      "patient_counseling",
    ],
    organization: "Telecheck Pharmacy",
    license: "PharmD-789012",
    specialization: "Clinical Pharmacy",
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  "admin@telecheck.com": {
    id: "4",
    email: "admin@telecheck.com",
    name: "Admin User",
    role: "admin",
    avatar: "/avatars/admin.jpg",
    permissions: [
      "full_access",
      "user_management",
      "system_settings",
      "audit_logs",
      "platform_analytics",
      "security_controls",
    ],
    organization: "Telecheck Platform",
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem("telecheck_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("telecheck_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers[email];

    if (user && user.role === role && user.isActive) {
      // Update last login
      user.lastLogin = new Date().toISOString();

      setUser(user);
      localStorage.setItem("telecheck_user", JSON.stringify(user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("telecheck_user");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return (
      user.permissions.includes(permission) ||
      user.permissions.includes("full_access")
    );
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const switchRole = async (newRole: UserRole): Promise<boolean> => {
    // Only admins can switch roles for testing purposes
    if (!user || user.role !== "admin") return false;

    const targetUser = Object.values(mockUsers).find((u) => u.role === newRole);
    if (targetUser) {
      setUser({ ...targetUser });
      localStorage.setItem("telecheck_user", JSON.stringify(targetUser));
      return true;
    }
    return false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    hasPermission,
    hasRole,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
