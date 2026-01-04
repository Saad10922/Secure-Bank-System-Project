import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { BankAdminLogin } from "./components/BankAdminLogin";
import { SystemAdminLogin } from "./components/SystemAdminLogin";
import { BankAdminAuthSuccess } from "./components/BankAdminAuthSuccess";
import { SystemAdminAuthSuccess } from "./components/SystemAdminAuthSuccess";
import { BankAdminDashboard } from "./components/BankAdminDashboard";
import { SystemAdminDashboard } from "./components/SystemAdminDashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const handleRoleSelection = (role) => {
    if (role === "bank") {
      setCurrentScreen("bank-login");
    } else {
      setCurrentScreen("system-login");
    }
  };

  const handleBankLogin = () => {
    setCurrentScreen("bank-auth-success");
  };

  const handleSystemLogin = () => {
    setCurrentScreen("system-auth-success");
  };

  const handleBankContinue = () => {
    setCurrentScreen("bank-dashboard");
  };

  const handleSystemContinue = () => {
    setCurrentScreen("system-dashboard");
  };

  const handleLogout = () => {
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
      {currentScreen === "bank-dashboard" && <BankAdminDashboard onLogout={handleLogout} />}
      {currentScreen === "system-dashboard" && <SystemAdminDashboard onLogout={handleLogout} />}
    </div>
  );
}