import { CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
export function BankAdminAuthSuccess({ onContinue }) {
  return <div className="min-h-screen bg-gradient-to-br from-[#003d82] to-[#0066cc] flex items-center justify-center p-4">
    <Card className="w-full max-w-md p-8 text-center">

      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#16a34a]/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-[#16a34a]" />
        </div>
      </div>


      <h1 className="text-[#003d82] mb-2">Authentication Successful</h1>
      <p className="text-slate-500 mb-6">
        You have been successfully authenticated as a Bank Administrator
      </p>


      <div className="bg-[#003d82]/5 border border-[#003d82]/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-[#003d82]" />
          <span className="text-sm font-medium text-[#003d82]">Secure Access Granted</span>
        </div>
        <p className="text-xs text-slate-500">
          You now have full administrative access to manage bank data files
        </p>
      </div>


      <div className="space-y-2 mb-6 text-left">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
          <span className="text-slate-500">Upload & Download Files</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
          <span className="text-slate-500">Update & Delete Records</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-[#16a34a] rounded-full" />
          <span className="text-slate-500">Multi-Cloud Encrypted Storage</span>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="w-full bg-[#003d82] hover:bg-[#0066cc] text-white"
      >
        Continue to Dashboard
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>


      <p className="text-xs text-slate-500 mt-6">
        Session secured with end-to-end encryption
      </p>
    </Card>
  </div>;
}
