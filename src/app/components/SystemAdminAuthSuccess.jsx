import { CheckCircle2, Eye, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
export function SystemAdminAuthSuccess({ onContinue }) {
  return <div className="min-h-screen bg-gradient-to-br from-[#0d4d2d] to-[#16a34a] flex items-center justify-center p-4">
    <Card className="w-full max-w-md p-8 text-center">
      {
        /* Success Icon */
      }
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#16a34a]/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-[#16a34a]" />
        </div>
      </div>

      {
        /* Success Message */
      }
      <h1 className="text-[#16a34a] mb-2">Authentication Successful</h1>
      <p className="text-slate-500 mb-6">
        You have been successfully authenticated as a System Administrator
      </p>

      {
        /* Security Badge */
      }
      <div className="bg-[#16a34a]/5 border border-[#16a34a]/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Eye className="w-5 h-5 text-[#16a34a]" />
          <span className="text-sm font-medium text-[#16a34a]">Read-Only Access Granted</span>
        </div>
        <p className="text-xs text-slate-500">
          You have monitoring and inspection privileges for system oversight
        </p>
      </div>

      {
        /* Access Details */
      }
      <div className="space-y-2 mb-6 text-left">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
          <span className="text-slate-500">Monitor Encryption Activity</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
          <span className="text-slate-500">View System Event Logs</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
          <span className="text-slate-500">Inspect Cloud & Server Health</span>
        </div>
      </div>

      {
        /* Continue Button */
      }
      <Button
        onClick={onContinue}
        className="w-full bg-[#16a34a] hover:bg-[#22c55e] text-white"
      >
        Continue to Dashboard
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      {
        /* Footer */
      }
      <p className="text-xs text-slate-500 mt-6">
        Monitoring session secured with restricted access
      </p>
    </Card>
  </div>;
}
