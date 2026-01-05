import { useState } from "react";
import { Shield, Lock, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
export function BankAdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#0f3460] to-[#1e5a8e] flex items-center justify-center p-6">
    <div className="w-full max-w-md">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:bg-white/10 mb-6"
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
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0f3460] hover:bg-[#1e5a8e] mt-6"
          >
            Secure Login
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            All login attempts are logged and monitored for security compliance
          </p>
        </div>
      </Card>
    </div>
  </div>;
}
