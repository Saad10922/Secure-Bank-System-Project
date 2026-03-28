import { useState } from "react";
import { Settings, Eye, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login as loginApi } from "../../services/authService";

export function SystemAdminLogin({ onLogin, onBack }) {
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
      if (data.role !== "SYSTEM_ADMIN") {
        setError("Access denied. This login is for System Administrators only.");
        return;
      }
      toast.success("Login successful! Welcome, System Administrator.");
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
    <div className="min-h-screen bg-gradient-to-br from-[#16a34a] to-[#22c55e] flex items-center justify-center p-6">
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

        <Card className="p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#16a34a] rounded-xl mb-4">
              <Settings className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-[#16a34a] mb-2">System Administrator Login</h2>
            <p className="text-slate-500 text-sm">
              Read-only access for monitoring and inspection
            </p>
          </div>

          <div className="bg-[#dcfce7] border border-[#16a34a]/20 rounded-lg p-3 mb-6">
            <div className="flex items-center text-sm text-[#16a34a]">
              <Eye className="w-4 h-4 mr-2" />
              <span>Inspection Only – No Data Access</span>
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
                className="border-[#16a34a]/20 focus:border-[#16a34a]"
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
                className="border-[#16a34a]/20 focus:border-[#16a34a]"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#22c55e] mt-6"
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
            <p className="text-xs text-slate-500 text-center">
              All monitoring activities are logged for audit compliance
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
