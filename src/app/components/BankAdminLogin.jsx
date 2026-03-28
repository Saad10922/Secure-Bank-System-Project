import { useState } from "react";
import { Shield, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login as loginApi } from "../../services/authService";

export function BankAdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginApi(username, password);
      // Verify the returned role is the expected one
      if (data.role !== "BANK_ADMIN") {
        setError("Access denied. This login is for Bank Administrators only.");
        return;
      }
      toast.success("Login successful! Welcome, Bank Administrator.");
      onLogin({ token: data.token, role: data.role });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3460] to-[#1e5a8e] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/10 mb-6"
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-2xl bg-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0f3460] rounded-xl mb-4">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-[#0f3460] mb-2">Bank Administrator Login</h2>
            <p className="text-muted-foreground text-sm">
              Secure access to sensitive bank data management
            </p>
          </div>

          <div className="bg-[#e8f1f5] border border-[#0f3460]/20 rounded-lg p-3 mb-6">
            <div className="flex items-center text-sm text-[#0f3460]">
              <Lock className="w-4 h-4 mr-2" />
              <span>256-bit AES encryption enabled</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-[#0f3460]/20 focus:border-[#0f3460]"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#0f3460]/20 focus:border-[#0f3460]"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0f3460] hover:bg-[#1e5a8e] mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating…
                </>
              ) : (
                "Secure Login"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-muted-foreground text-center">
              All login attempts are logged and monitored for security compliance
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
