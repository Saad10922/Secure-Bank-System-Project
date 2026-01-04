import { Shield, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import universityLogo from "../../assets/b18bf1a04d9f32e470e578a75ab6097d419d5f11.png";
export function HomeScreen({ onSelectRole }) {
  return <div className="min-h-screen bg-gradient-to-br from-[#0f3460] via-[#1e5a8e] to-[#16a34a] flex items-center justify-center p-6">
    <div className="w-full max-w-5xl">
      {
        /* Header */
      }
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-6 mb-6">
          {
            /* University Logo */
          }
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center">
            <img src={universityLogo} alt="University of Sargodha" className="w-full h-full object-contain" />
          </div>

          {
            /* SecureBankCloud Logo */
          }
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Shield className="w-12 h-12 text-[#0f3460]" />
          </div>
        </div>
        <h1 className="text-white mb-3">SecureBankCloud</h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Multi-cloud encrypted storage with role-based administration for enterprise banking security
        </p>
      </div>

      {
        /* Role Selection Cards */
      }
      <div className="grid md:grid-cols-2 gap-6">
        {
          /* Bank Administrator Card */
        }
        <Card className="bg-white p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#0f3460]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0f3460] rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-[#0f3460] mb-2">Bank Administrator</h2>
            <p className="text-muted-foreground mb-6">
              Full access to sensitive bank data management, including upload, fetch, update, and delete operations
            </p>
            <div className="w-full space-y-2 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#0f3460] rounded-full mr-3" />
                <span>Data Upload & Storage</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#0f3460] rounded-full mr-3" />
                <span>Data Retrieval & Export</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#0f3460] rounded-full mr-3" />
                <span>Update & Delete Operations</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#0f3460] rounded-full mr-3" />
                <span>Encrypted Multi-Cloud Storage</span>
              </div>
            </div>
            <Button
              onClick={() => onSelectRole("bank")}
              className="w-full bg-[#0f3460] hover:bg-[#1e5a8e] text-white"
            >
              Login as Bank Administrator
            </Button>
          </div>
        </Card>

        {
          /* System Administrator Card */
        }
        <Card className="bg-white p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#16a34a]">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#16a34a] rounded-xl flex items-center justify-center mb-4">
              <Settings className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-[#16a34a] mb-2">System Administrator</h2>
            <p className="text-muted-foreground mb-6">
              Read-only monitoring and inspection access for system health, logs, and compliance auditing
            </p>
            <div className="w-full space-y-2 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mr-3" />
                <span>System Health Monitoring</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mr-3" />
                <span>Encryption Event Logs</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mr-3" />
                <span>Cloud Service Status</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-[#16a34a] rounded-full mr-3" />
                <span>Inspection Only – No Data Access</span>
              </div>
            </div>
            <Button
              onClick={() => onSelectRole("system")}
              className="w-full bg-[#16a34a] hover:bg-[#22c55e] text-white"
            >
              Login as System Administrator
            </Button>
          </div>
        </Card>
      </div>

      {
        /* Security Notice */
      }
      <div className="mt-8 text-center text-white/70 text-sm">
        <p>🔒 Enterprise-grade security with end-to-end encryption</p>
      </div>
    </div>
  </div>;
}
