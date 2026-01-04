import { useState } from "react";
import { Settings, Eye, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
export function SystemAdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#16a34a] to-[#22c55e] flex items-center justify-center p-6">
    <div className="w-full max-w-md">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:bg-white/10 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <Card className="p-8 shadow-2xl">
        {
          /* Header */
        }
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#16a34a] rounded-xl mb-4">
            <Settings className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-[#16a34a] mb-2">System Administrator Login</h2>
          <p className="text-slate-500 text-sm">
            Read-only access for monitoring and inspection
          </p>
        </div>

        {
          /* Access Badge */
        }
        <div className="bg-[#dcfce7] border border-[#16a34a]/20 rounded-lg p-3 mb-6">
          <div className="flex items-center text-sm text-[#16a34a]">
            <Eye className="w-4 h-4 mr-2" />
            <span>Inspection Only – No Data Access</span>
          </div>
        </div>

        {
          /* Login Form */
        }
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
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#16a34a] hover:bg-[#22c55e] mt-6"
          >
            Secure Login
          </Button>
        </form>

        {
          /* Footer Notice */
        }
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-slate-500 text-center">
            All monitoring activities are logged for audit compliance
          </p>
        </div>
      </Card>
    </div>
  </div>;
}
