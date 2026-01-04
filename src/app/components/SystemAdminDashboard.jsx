import { useState } from "react";
import { Settings, Activity, Eye, AlertCircle, Cloud, Lock, LogOut, TrendingUp, Server, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export function SystemAdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("monitoring");
  const encryptionData = [
    { time: "00:00", encryptions: 45, decryptions: 32 },
    { time: "04:00", encryptions: 38, decryptions: 28 },
    { time: "08:00", encryptions: 62, decryptions: 48 },
    { time: "12:00", encryptions: 78, decryptions: 65 },
    { time: "16:00", encryptions: 85, decryptions: 72 },
    { time: "20:00", encryptions: 68, decryptions: 55 }
  ];
  const cloudUsageData = [
    { cloud: "AWS", usage: 324 },
    { cloud: "Azure", usage: 289 },
    { cloud: "GCP", usage: 256 }
  ];
  const logEntries = [
    {
      id: "1",
      timestamp: "2026-01-03 14:32:15",
      event: "File encrypted and stored",
      type: "encryption",
      cloud: "AWS S3"
    },
    {
      id: "2",
      timestamp: "2026-01-03 14:28:42",
      event: "Data retrieved successfully",
      type: "decryption",
      cloud: "Azure Blob"
    },
    {
      id: "3",
      timestamp: "2026-01-03 14:15:23",
      event: "Admin user logged in",
      type: "access",
      cloud: "System"
    },
    {
      id: "4",
      timestamp: "2026-01-03 14:05:17",
      event: "Connection timeout (retry successful)",
      type: "error",
      cloud: "GCP Storage"
    },
    {
      id: "5",
      timestamp: "2026-01-03 13:58:09",
      event: "Batch encryption completed",
      type: "encryption",
      cloud: "Multi-cloud"
    }
  ];
  const getTypeColor = (type) => {
    switch (type) {
      case "encryption":
        return "bg-[#16a34a]";
      case "decryption":
        return "bg-[#3b82f6]";
      case "access":
        return "bg-[#f59e0b]";
      case "error":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };
  return <div className="min-h-screen bg-background">
    {
      /* Header */
    }
    <header className="bg-[#16a34a] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white">SecureBankCloud</h1>
            <p className="text-white/70 text-sm">System Administrator Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-white/20 hover:bg-white/20 text-white border-0">
            <Eye className="w-3 h-3 mr-1" />
            Read-Only Mode
          </Badge>
          <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>

    <div className="max-w-7xl mx-auto p-6">
      {
        /* Status Cards */
      }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-l-4 border-l-[#16a34a]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">System Status</p>
              <h3 className="text-[#16a34a]">Operational</h3>
            </div>
            <Activity className="w-8 h-8 text-[#16a34a]/30" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-[#3b82f6]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Cloud Nodes</p>
              <h3 className="text-[#3b82f6]">3/3 Active</h3>
            </div>
            <Cloud className="w-8 h-8 text-[#3b82f6]/30" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-[#f59e0b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Uptime</p>
              <h3 className="text-[#f59e0b]">99.98%</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-[#f59e0b]/30" />
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Alerts</p>
              <h3 className="text-destructive">2 Warnings</h3>
            </div>
            <AlertCircle className="w-8 h-8 text-destructive/30" />
          </div>
        </Card>
      </div>

      {
        /* Navigation Tabs */
      }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <Button
          onClick={() => setActiveTab("monitoring")}
          variant={activeTab === "monitoring" ? "default" : "outline"}
          className={activeTab === "monitoring" ? "bg-[#16a34a] hover:bg-[#22c55e]" : "hover:bg-[#dcfce7]"}
        >
          <Activity className="w-4 h-4 mr-2" />
          Monitoring
        </Button>
        <Button
          onClick={() => setActiveTab("logs")}
          variant={activeTab === "logs" ? "default" : "outline"}
          className={activeTab === "logs" ? "bg-[#16a34a] hover:bg-[#22c55e]" : "hover:bg-[#dcfce7]"}
        >
          <Eye className="w-4 h-4 mr-2" />
          Event Logs
        </Button>
        <Button
          onClick={() => setActiveTab("health")}
          variant={activeTab === "health" ? "default" : "outline"}
          className={activeTab === "health" ? "bg-[#16a34a] hover:bg-[#22c55e]" : "hover:bg-[#dcfce7]"}
        >
          <Server className="w-4 h-4 mr-2" />
          Cloud Health
        </Button>
        <Button
          onClick={() => setActiveTab("alerts")}
          variant={activeTab === "alerts" ? "default" : "outline"}
          className={activeTab === "alerts" ? "bg-[#16a34a] hover:bg-[#22c55e]" : "hover:bg-[#dcfce7]"}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Alerts
        </Button>
        <Button
          onClick={() => setActiveTab("servers")}
          variant={activeTab === "servers" ? "default" : "outline"}
          className={activeTab === "servers" ? "bg-[#16a34a] hover:bg-[#22c55e]" : "hover:bg-[#dcfce7]"}
        >
          <Server className="w-4 h-4 mr-2" />
          Servers
        </Button>
      </div>

      {
        /* Content Area */
      }
      {activeTab === "monitoring" && <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-[#16a34a]" />
            <h2 className="text-[#16a34a]">Encryption/Decryption Activity</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={encryptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="encryptions" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="decryptions" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#16a34a] rounded-full" />
              <span className="text-sm text-slate-500">Encryptions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3b82f6] rounded-full" />
              <span className="text-sm text-slate-500">Decryptions</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-5 h-5 text-[#16a34a]" />
            <h2 className="text-[#16a34a]">Cloud Storage Distribution</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cloudUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf0" />
                <XAxis dataKey="cloud" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="usage" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>}

      {activeTab === "logs" && <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#16a34a]" />
            <h2 className="text-[#16a34a]">System Event Logs</h2>
          </div>
          <Badge className="bg-[#dcfce7] text-[#16a34a] hover:bg-[#dcfce7]">
            Read-Only Access
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#dcfce7]">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Event</th>
                <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Type</th>
                <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Cloud Service</th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map((log) => <tr key={log.id} className="border-b hover:bg-muted/50">
                <td className="px-4 py-3 text-sm text-slate-500">{log.timestamp}</td>
                <td className="px-4 py-3 text-sm">{log.event}</td>
                <td className="px-4 py-3">
                  <Badge className={`${getTypeColor(log.type)} hover:${getTypeColor(log.type)} capitalize`}>
                    {log.type}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">{log.cloud}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </Card>}

      {activeTab === "health" && <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-[#16a34a]" />
            <h2 className="text-[#16a34a]">Cloud Service Health</h2>
          </div>
          <div className="space-y-6">
            {
              /* AWS */
            }
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ff9900]/10 rounded-lg flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-[#ff9900]" />
                  </div>
                  <div>
                    <h3 className="text-[#16a34a]">Amazon Web Services (AWS)</h3>
                    <p className="text-sm text-slate-500">Region: us-east-1</p>
                  </div>
                </div>
                <Badge className="bg-[#16a34a] hover:bg-[#16a34a]">Operational</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Storage Utilization</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Latency</p>
                  <p>24ms</p>
                </div>
                <div>
                  <p className="text-slate-500">Uptime</p>
                  <p>99.99%</p>
                </div>
                <div>
                  <p className="text-slate-500">Last Sync</p>
                  <p>2 min ago</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0078d4]/10 rounded-lg flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-[#0078d4]" />
                  </div>
                  <div>
                    <h3 className="text-[#16a34a]">Microsoft Azure</h3>
                    <p className="text-sm text-slate-500">Region: eastus</p>
                  </div>
                </div>
                <Badge className="bg-[#16a34a] hover:bg-[#16a34a]">Operational</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Storage Utilization</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Latency</p>
                  <p>28ms</p>
                </div>
                <div>
                  <p className="text-slate-500">Uptime</p>
                  <p>99.97%</p>
                </div>
                <div>
                  <p className="text-slate-500">Last Sync</p>
                  <p>1 min ago</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4285f4]/10 rounded-lg flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-[#4285f4]" />
                  </div>
                  <div>
                    <h3 className="text-[#16a34a]">Google Cloud Platform (GCP)</h3>
                    <p className="text-sm text-slate-500">Region: us-central1</p>
                  </div>
                </div>
                <Badge className="bg-[#16a34a] hover:bg-[#16a34a]">Operational</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Storage Utilization</span>
                  <span>64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Latency</p>
                  <p>22ms</p>
                </div>
                <div>
                  <p className="text-slate-500">Uptime</p>
                  <p>99.98%</p>
                </div>
                <div>
                  <p className="text-slate-500">Last Sync</p>
                  <p>3 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>}

      {activeTab === "alerts" && <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[#16a34a]" />
            <h2 className="text-[#16a34a]">System Alerts & Notifications</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-[#fff8e1] border border-[#f59e0b]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#f59e0b] mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#f59e0b]">High Storage Utilization - Azure</h4>
                    <span className="text-xs text-slate-500">10 min ago</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Azure Blob Storage has reached 72% capacity. Consider scaling or archiving old data.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fff8e1] border border-[#f59e0b]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#f59e0b] mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#f59e0b]">Elevated Latency Detected</h4>
                    <span className="text-xs text-slate-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    GCP connection latency increased to 45ms during peak hours. Monitoring for performance degradation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#dcfce7] border border-[#16a34a]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#16a34a] mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#16a34a]">Security Audit Completed</h4>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Monthly security audit completed successfully. All encryption protocols verified and compliant.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#e8f1f5] border border-[#3b82f6]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-[#3b82f6] mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#3b82f6]">System Maintenance Scheduled</h4>
                    <span className="text-xs text-slate-500">Yesterday</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Scheduled maintenance for AWS S3 on January 5, 2026 at 02:00 UTC. Expected downtime: 30 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>}

      {activeTab === "servers" && <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-[#16a34a]" />
            <h2 className="text-[#16a34a]">Server Health Monitoring</h2>
          </div>
          <div className="space-y-6">
            {
              /* Main Server */
            }
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#16a34a]/10 rounded-lg flex items-center justify-center">
                    <Server className="w-7 h-7 text-[#16a34a]" />
                  </div>
                  <div>
                    <h3 className="text-[#16a34a]">Main Application Server</h3>
                    <p className="text-sm text-slate-500">Location: Primary Data Center</p>
                  </div>
                </div>
                <Badge className="bg-[#16a34a] hover:bg-[#16a34a]">Operational</Badge>
              </div>

              {
                /* CPU Usage */
              }
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">CPU Usage</span>
                  <span>58%</span>
                </div>
                <Progress value={58} className="h-3" />
              </div>

              {
                /* Memory Usage */
              }
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Memory Usage</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-3" />
              </div>

              {
                /* Disk Usage */
              }
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Disk Usage</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>

              {
                /* Network Usage */
              }
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Network Usage</span>
                  <span>42%</span>
                </div>
                <Progress value={42} className="h-3" />
              </div>

              {
                /* Server Details Grid */
              }
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-slate-500">Uptime</p>
                  <p className="font-medium">45 days</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Temperature</p>
                  <p className="font-medium">62°C</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Load Average</p>
                  <p className="font-medium">2.4</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Last Check</p>
                  <p className="font-medium">2 min ago</p>
                </div>
              </div>

              {
                /* Additional Metrics */
              }
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="bg-[#dcfce7] border border-[#16a34a]/20 rounded-lg p-3">
                  <p className="text-sm text-slate-500 mb-1">Active Connections</p>
                  <p className="text-xl font-medium text-[#16a34a]">247</p>
                </div>
                <div className="bg-[#e8f1f5] border border-[#3b82f6]/20 rounded-lg p-3">
                  <p className="text-sm text-slate-500 mb-1">Processes Running</p>
                  <p className="text-xl font-medium text-[#3b82f6]">128</p>
                </div>
                <div className="bg-[#fff8e1] border border-[#f59e0b]/20 rounded-lg p-3">
                  <p className="text-sm text-slate-500 mb-1">Response Time</p>
                  <p className="text-xl font-medium text-[#f59e0b]">145ms</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>}
    </div>
  </div>;
}
