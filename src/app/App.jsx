import { useState } from "react";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { HomeScreen } from "./components/HomeScreen";
import { BankAdminLogin } from "./components/BankAdminLogin";
import { SystemAdminLogin } from "./components/SystemAdminLogin";
import { BankAdminAuthSuccess } from "./components/BankAdminAuthSuccess";
import { SystemAdminAuthSuccess } from "./components/SystemAdminAuthSuccess";
import { BankAdminDashboard } from "./components/BankAdminDashboard";
import { SystemAdminDashboard } from "./components/SystemAdminDashboard";

function AppContent() {
  const { role, login, logout, isAuthenticated } = useAuth();

  // Derive initial screen from persisted role
  const getInitialScreen = () => {
    if (!isAuthenticated) return "home";
    if (role === "BANK_ADMIN") return "bank-dashboard";
    if (role === "SYSTEM_ADMIN") return "system-dashboard";
    return "home";
  };

  const [currentScreen, setCurrentScreen] = useState(getInitialScreen);

  const handleRoleSelection = (selectedRole) => {
    if (selectedRole === "bank") {
      setCurrentScreen("bank-login");
    } else {
      setCurrentScreen("system-login");
    }
  };

  // Called by BankAdminLogin after a successful API login
  const handleBankLogin = ({ token, role: userRole }) => {
    login(token, userRole);
    setCurrentScreen("bank-auth-success");
  };

  // Called by SystemAdminLogin after a successful API login
  const handleSystemLogin = ({ token, role: userRole }) => {
    login(token, userRole);
    setCurrentScreen("system-auth-success");
  };

  const handleBankContinue = () => {
    setCurrentScreen("bank-dashboard");
  };

  const handleSystemContinue = () => {
    setCurrentScreen("system-dashboard");
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen("home");
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  return (
    <div className="size-full">
      {currentScreen === "home" && <HomeScreen onSelectRole={handleRoleSelection} />}
      {currentScreen === "bank-login" && (
        <BankAdminLogin onLogin={handleBankLogin} onBack={handleBack} />
      )}
      {currentScreen === "system-login" && (
        <SystemAdminLogin onLogin={handleSystemLogin} onBack={handleBack} />
      )}
      {currentScreen === "bank-auth-success" && (
        <BankAdminAuthSuccess onContinue={handleBankContinue} />
      )}
      {currentScreen === "system-auth-success" && (
        <SystemAdminAuthSuccess onContinue={handleSystemContinue} />
      )}
      {currentScreen === "bank-dashboard" && (
        <BankAdminDashboard onLogout={handleLogout} />
      )}
      {currentScreen === "system-dashboard" && (
        <SystemAdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}