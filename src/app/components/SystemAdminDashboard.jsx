import { useState, useEffect, useCallback } from "react";
import {
  Settings, Activity, Eye, AlertCircle, Cloud, Lock, LogOut,
  TrendingUp, Server, Shield, Loader2, RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { getLogs } from "../../services/logService";
import { getCloudHealth } from "../../services/cloudService";

export function SystemAdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("monitoring");

  // ── Cloud health state ────────────────────────────────────────────────────
  const [cloudHealth, setCloudHealth] = useState([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudError, setCloudError] = useState("");

  const fetchCloudHealth = useCallback(async () => {
    setCloudLoading(true);
    setCloudError("");
    try {
      const data = await getCloudHealth();
      setCloudHealth(data);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch cloud health. Please try again.";
      setCloudError(message);
      toast.error(message);
    } finally {
      setCloudLoading(false);
    }
  }, []);

  // Fetch cloud health when the health tab is opened
  useEffect(() => {
    if (activeTab === "health") {
      fetchCloudHealth();
    }
  }, [activeTab, fetchCloudHealth]);

  // ── Real logs state ───────────────────────────────────────────────────────
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState("");

  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    setLogsError("");
    try {
      const data = await getLogs();
      setLogs(data);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch logs. Please try again.";
      setLogsError(message);
      toast.error(message);
    } finally {
      setLogsLoading(false);
    }
  }, []);

  // Fetch logs automatically when the logs tab is opened
  useEffect(() => {
    if (activeTab === "logs") {
      fetchLogs();
    }
  }, [activeTab, fetchLogs]);

  // ── Static chart data (unchanged) ─────────────────────────────────────────
  const encryptionData = [
    { time: "00:00", encryptions: 45, decryptions: 32 },
    { time: "04:00", encryptions: 38, decryptions: 28 },
    { time: "08:00", encryptions: 62, decryptions: 48 },
    { time: "12:00", encryptions: 78, decryptions: 65 },
    { time: "16:00", encryptions: 85, decryptions: 72 },
    { time: "20:00", encryptions: 68, decryptions: 55 },
  ];
  // Derive bar-chart data from live cloud health (falls back to 0 when loading)
  const cloudUsageData = cloudHealth.length > 0
    ? cloudHealth.map((c) => ({
        cloud: c.name === "Amazon Web Services (AWS)" ? "AWS"
             : c.name === "Microsoft Azure" ? "Azure"
             : "GCP",
        usage: c.totalSizeMB ?? 0,
      }))
    : [
        { cloud: "AWS",   usage: 0 },
        { cloud: "Azure", usage: 0 },
        { cloud: "GCP",   usage: 0 },
      ];

  // ── Log display helpers ────────────────────────────────────────────────────
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS": return "bg-[#16a34a]";
      case "FAILED":  return "bg-destructive";
      default:        return "bg-[#f59e0b]";
    }
  };

  const getActionColor = (action) => {
    switch (action?.toUpperCase()) {
      case "UPLOAD":   return "bg-[#3b82f6]";
      case "DOWNLOAD": return "bg-[#16a34a]";
      case "LOGIN":    return "bg-[#f59e0b]";
      default:         return "bg-muted text-foreground";
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  };

  return (
    <div className="min-h-screen bg-background">

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

        {/* Stats */}
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

        {/* Tab navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          {[
            { key: "monitoring", icon: <Activity className="w-4 h-4 mr-2" />, label: "Monitoring" },
            { key: "logs",       icon: <Eye     className="w-4 h-4 mr-2" />, label: "Event Logs" },
            { key: "health",     icon: <Server  className="w-4 h-4 mr-2" />, label: "Cloud Health" },
            { key: "alerts",     icon: <AlertCircle className="w-4 h-4 mr-2" />, label: "Alerts" },
            { key: "servers",    icon: <Server  className="w-4 h-4 mr-2" />, label: "Servers" },
          ].map(({ key, icon, label }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key)}
              variant={activeTab === key ? "default" : "outline"}
              className={activeTab === key ? "bg-[#16a34a] hover:bg-[#22c55e]" : "hover:bg-[#dcfce7]"}
            >
              {icon}
              {label}
            </Button>
          ))}
        </div>

        {/* ── MONITORING TAB ─────────────────────────────────────────────────── */}
        {activeTab === "monitoring" && (
          <div className="space-y-6">
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
                <h2 className="text-[#16a34a]">Cloud Storage Distribution (MB)</h2>
              </div>
              {cloudLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#16a34a] animate-spin mr-2" />
                  <span className="text-slate-500 text-sm">Fetching cloud storage data…</span>
                </div>
              )}
              {!cloudLoading && (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cloudUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf0" />
                      <XAxis dataKey="cloud" stroke="#64748b" />
                      <YAxis stroke="#64748b" unit=" MB" />
                      <Tooltip formatter={(value) => [`${value} MB`, "Storage Used"]} />
                      <Bar dataKey="usage" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ── LOGS TAB ───────────────────────────────────────────────────────── */}
        {activeTab === "logs" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#16a34a]" />
                <h2 className="text-[#16a34a]">System Event Logs</h2>
                {logs.length > 0 && (
                  <Badge className="bg-[#dcfce7] text-[#16a34a] hover:bg-[#dcfce7]">
                    {logs.length} entries
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#dcfce7] text-[#16a34a] hover:bg-[#dcfce7]">
                  Read-Only Access
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={fetchLogs}
                  disabled={logsLoading}
                  className="text-[#16a34a] border-[#16a34a]/20 hover:bg-[#dcfce7]"
                >
                  {logsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Loading state */}
            {logsLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-[#16a34a] animate-spin mr-3" />
                <span className="text-slate-500">Fetching logs from server…</span>
              </div>
            )}

            {/* Error state */}
            {logsError && !logsLoading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 font-medium text-sm">Failed to load logs</p>
                  <p className="text-red-500 text-sm">{logsError}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={fetchLogs}
                    className="mt-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!logsLoading && !logsError && logs.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No log entries found.</p>
              </div>
            )}

            {/* Logs table */}
            {!logsLoading && !logsError && logs.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#dcfce7]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Action</th>
                      <th className="px-4 py-3 text-left text-sm text-[#16a34a]">User ID</th>
                      <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Role</th>
                      <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Status</th>
                      <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Message</th>
                      <th className="px-4 py-3 text-left text-sm text-[#16a34a]">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log._id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <Badge className={`${getActionColor(log.action)} capitalize`}>
                            {log.action}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-slate-500 max-w-[120px] truncate">
                          {log.user}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className="capitalize text-xs">
                            {log.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`${getStatusColor(log.status)} capitalize`}>
                            {log.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 max-w-[220px]">
                          <span title={log.message} className="line-clamp-2">
                            {log.message}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                          {formatTimestamp(log.timestamp || log.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* ── CLOUD HEALTH TAB ───────────────────────────────────────────────── */}
        {activeTab === "health" && (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#16a34a]" />
                  <h2 className="text-[#16a34a]">Cloud Service Health</h2>
                  <Badge className="bg-[#dcfce7] text-[#16a34a] hover:bg-[#dcfce7]">Live Data</Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={fetchCloudHealth}
                  disabled={cloudLoading}
                  className="text-[#16a34a] border-[#16a34a]/20 hover:bg-[#dcfce7]"
                >
                  {cloudLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Loading */}
              {cloudLoading && (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-[#16a34a] animate-spin mr-3" />
                  <span className="text-slate-500">Connecting to cloud providers…</span>
                </div>
              )}

              {/* Error */}
              {cloudError && !cloudLoading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium text-sm">Failed to load cloud health</p>
                    <p className="text-red-500 text-sm">{cloudError}</p>
                    <Button size="sm" variant="outline" onClick={fetchCloudHealth} className="mt-2 text-red-600 border-red-300 hover:bg-red-50">
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              {/* Cloud rows */}
              {!cloudLoading && (
                <div className="space-y-6">
                  {(cloudHealth.length > 0 ? cloudHealth : [
                    { name: "Amazon Web Services (AWS)",    region: "us-east-1",  color: "#ff9900", status: "Loading…", latency: "—", totalObjects: 0, totalSizeMB: 0, lastSync: null, source: "live" },
                    { name: "Microsoft Azure",              region: "eastus",     color: "#0078d4", status: "Loading…", latency: "—", totalObjects: 0, totalSizeMB: 0, lastSync: null, source: "live" },
                    { name: "Google Cloud Platform (GCP)",  region: "us-central1",color: "#4285f4", status: "Not Configured", latency: "N/A", totalObjects: 0, totalSizeMB: 0, lastSync: null, source: "static" },
                  ]).map((cloud, i) => {
                    const isGCP = cloud.source === "static";
                    const isError = cloud.status === "Error";
                    const statusBg = isError
                      ? "bg-destructive hover:bg-destructive"
                      : isGCP
                      ? "bg-slate-400 hover:bg-slate-400"
                      : "bg-[#16a34a] hover:bg-[#16a34a]";
                    const lastSyncLabel = cloud.lastSync
                      ? new Date(cloud.lastSync).toLocaleTimeString()
                      : "N/A";
                    // usage% = cap totalSizeMB at some reasonable max (e.g. 500 MB)
                    const usagePct = isGCP ? 0 : Math.min(100, Math.round((cloud.totalSizeMB / 500) * 100));

                    return (
                      <div key={cloud.name} className={i > 0 ? "border-t pt-6 space-y-3" : "space-y-3"}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cloud.color}1a` }}>
                              <Cloud className="w-6 h-6" style={{ color: cloud.color }} />
                            </div>
                            <div>
                              <h3 className="text-[#16a34a]">{cloud.name}</h3>
                              <p className="text-sm text-slate-500">Region: {cloud.region}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!isGCP && (
                              <Badge variant="outline" className="text-xs text-slate-500 border-slate-300">Live</Badge>
                            )}
                            <Badge className={statusBg}>{cloud.status}</Badge>
                          </div>
                        </div>

                        {/* Error detail */}
                        {isError && cloud.error && (
                          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-1">
                            {cloud.error}
                          </p>
                        )}

                        {/* Storage bar */}
                        {!isGCP && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Storage Used</span>
                              <span>{cloud.totalSizeMB} MB ({cloud.totalObjects} objects)</span>
                            </div>
                            <Progress value={usagePct} className="h-2" />
                          </div>
                        )}
                        {isGCP && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Storage Used</span>
                              <span className="text-slate-400 italic">Not configured</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div><p className="text-slate-500">Latency</p><p>{cloud.latency}</p></div>
                          <div><p className="text-slate-500">Objects</p><p>{isGCP ? "—" : cloud.totalObjects}</p></div>
                          <div><p className="text-slate-500">Last Sync</p><p>{lastSyncLabel}</p></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ── ALERTS TAB ─────────────────────────────────────────────────────── */}
        {activeTab === "alerts" && (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#16a34a]" />
                <h2 className="text-[#16a34a]">System Alerts &amp; Notifications</h2>
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
                      <p className="text-sm text-slate-500">Azure Blob Storage has reached 72% capacity. Consider scaling or archiving old data.</p>
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
                      <p className="text-sm text-slate-500">GCP connection latency increased to 45ms during peak hours.</p>
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
                      <p className="text-sm text-slate-500">Monthly security audit completed successfully. All encryption protocols verified and compliant.</p>
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
                      <p className="text-sm text-slate-500">Scheduled maintenance for AWS S3 on January 5, 2026 at 02:00 UTC. Expected downtime: 30 minutes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── SERVERS TAB ────────────────────────────────────────────────────── */}
        {activeTab === "servers" && (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-[#16a34a]" />
                <h2 className="text-[#16a34a]">Server Health Monitoring</h2>
              </div>
              <div className="space-y-6">
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
                  {[
                    { label: "CPU Usage",     value: 58 },
                    { label: "Memory Usage",  value: 72 },
                    { label: "Disk Usage",    value: 85 },
                    { label: "Network Usage", value: 42 },
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{label}</span>
                        <span>{value}%</span>
                      </div>
                      <Progress value={value} className="h-3" />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div><p className="text-sm text-slate-500">Uptime</p><p className="font-medium">45 days</p></div>
                    <div><p className="text-sm text-slate-500">Temperature</p><p className="font-medium">62°C</p></div>
                    <div><p className="text-sm text-slate-500">Load Average</p><p className="font-medium">2.4</p></div>
                    <div><p className="text-sm text-slate-500">Last Check</p><p className="font-medium">2 min ago</p></div>
                  </div>
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
          </div>
        )}
      </div>
    </div>
  );
}
