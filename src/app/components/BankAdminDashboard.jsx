import { useState, useRef } from "react";
import {
  Shield, Upload, Download, Edit, Trash2, Lock, Cloud, LogOut,
  AlertTriangle, CheckCircle2, Loader2, FileText
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "./ui/alert-dialog";
import { uploadFile, reconstructFile } from "../../services/fileService";

export function BankAdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("fetch");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // ── Upload state ──────────────────────────────────────────────────────────
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null); // { fileId, fragments }
  const fileInputRef = useRef(null);

  // ── Download state ────────────────────────────────────────────────────────
  const [downloadFileId, setDownloadFileId] = useState("");
  const [downloadFilename, setDownloadFilename] = useState("");
  const [downloading, setDownloading] = useState(null); // fileId being downloaded

  // ── Static demo records (kept – real upload history shown below) ──────────
  const [dataRecords] = useState([
    {
      id: "1",
      name: "Customer_Transactions_Q1_2026.csv",
      type: "CSV",
      size: "24.5 MB",
      uploaded: "2026-01-02",
      encrypted: true,
      cloudDistribution: ["AWS", "Azure", "GCP"],
    },
    {
      id: "2",
      name: "Account_Balances_Jan.xlsx",
      type: "Excel",
      size: "12.3 MB",
      uploaded: "2026-01-01",
      encrypted: true,
      cloudDistribution: ["AWS", "Azure"],
    },
    {
      id: "3",
      name: "Transaction_History_Dec.csv",
      type: "CSV",
      size: "18.9 MB",
      uploaded: "2025-12-31",
      encrypted: true,
      cloudDistribution: ["Azure", "GCP"],
    },
    {
      id: "4",
      name: "Financial_Summary_2025.xlsx",
      type: "Excel",
      size: "6.2 MB",
      uploaded: "2025-12-30",
      encrypted: true,
      cloudDistribution: ["AWS", "GCP"],
    },
  ]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    setUploading(true);
    setUploadResult(null);
    try {
      const data = await uploadFile(selectedFile);
      setUploadResult({ fileId: data.fileId, fragments: data.fragments, name: selectedFile.name });
      toast.success(`File uploaded successfully! File ID: ${data.fileId}`);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || "Upload failed. Please try again.";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (fileId, filename) => {
    if (!fileId) {
      toast.error("Please enter a File ID to download.");
      return;
    }
    setDownloading(fileId);
    try {
      await reconstructFile(fileId, filename || "downloaded_file");
      toast.success("File downloaded successfully!");
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || "Download failed. Please check the File ID.";
      toast.error(message);
    } finally {
      setDownloading(null);
    }
  };

  const handleDelete = (record) => {
    setSelectedRecord(record);
    setShowDeleteDialog(true);
  };

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setShowUpdateDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">

      <header className="bg-[#0f3460] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white">SecureBankCloud</h1>
              <p className="text-white/70 text-sm">Bank Administrator Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-l-4 border-l-[#0f3460]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Files</p>
                <h3 className="text-[#0f3460]">1,247</h3>
              </div>
              <Cloud className="w-8 h-8 text-[#0f3460]/30" />
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-[#16a34a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Encrypted</p>
                <h3 className="text-[#16a34a]">100%</h3>
              </div>
              <Lock className="w-8 h-8 text-[#16a34a]/30" />
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-[#3b82f6]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Storage Used</p>
                <h3 className="text-[#3b82f6]">847 GB</h3>
              </div>
              <Upload className="w-8 h-8 text-[#3b82f6]/30" />
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-[#f59e0b]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Cloud Nodes</p>
                <h3 className="text-[#f59e0b]">3 Active</h3>
              </div>
              <Cloud className="w-8 h-8 text-[#f59e0b]/30" />
            </div>
          </Card>
        </div>

        {/* Tab navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {[
            { key: "upload", icon: <Upload className="w-4 h-4 mr-2" />, label: "Upload Data" },
            { key: "fetch", icon: <Download className="w-4 h-4 mr-2" />, label: "Fetch Data" },
            { key: "update", icon: <Edit className="w-4 h-4 mr-2" />, label: "Update Data" },
            { key: "delete", icon: <Trash2 className="w-4 h-4 mr-2" />, label: "Delete Data" },
          ].map(({ key, icon, label }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key)}
              variant={activeTab === key ? "default" : "outline"}
              className={activeTab === key ? "bg-[#0f3460] hover:bg-[#1e5a8e]" : "hover:bg-[#e8f1f5]"}
            >
              {icon}
              {label}
            </Button>
          ))}
        </div>

        {/* ── UPLOAD TAB ────────────────────────────────────────────────────── */}
        <Card className="p-6">
          {activeTab === "upload" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-[#0f3460]" />
                <h2 className="text-[#0f3460]">Upload New Data</h2>
              </div>

              {/* File picker */}
              <div className="space-y-3">
                <Label htmlFor="file-input">Select File</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="file-input"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="border-[#0f3460]/20 focus:border-[#0f3460] cursor-pointer"
                    disabled={uploading}
                  />
                  <Button
                    onClick={handleUpload}
                    className="bg-[#0f3460] hover:bg-[#1e5a8e] whitespace-nowrap"
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading…
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </>
                    )}
                  </Button>
                </div>
                {selectedFile && (
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {/* Drop zone hint */}
              <div className="bg-[#e8f1f5] border-2 border-dashed border-[#0f3460]/30 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-[#0f3460]/50 mx-auto mb-3" />
                <h3 className="text-[#0f3460] mb-2">Drag &amp; Drop CSV/Excel Files Here</h3>
                <p className="text-slate-500 text-sm mb-4">Supported formats: .csv, .xlsx, .xls, or any file</p>
                <Button
                  className="bg-[#0f3460] hover:bg-[#1e5a8e]"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  Select Files
                </Button>
              </div>

              {/* Success result */}
              {uploadResult && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-green-700">Upload successful!</p>
                      <p className="text-slate-600">
                        <span className="font-medium">File:</span> {uploadResult.name}
                      </p>
                      <p className="text-slate-600">
                        <span className="font-medium">File ID:</span>{" "}
                        <code className="bg-green-100 px-1.5 py-0.5 rounded text-green-800 font-mono text-xs">
                          {uploadResult.fileId}
                        </code>
                      </p>
                      <p className="text-slate-600">
                        <span className="font-medium">Fragments:</span> {uploadResult.fragments} (distributed across multi-cloud)
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Copy the File ID above to download this file from the "Fetch Data" tab.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#fff8e1] border border-[#f59e0b]/30 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-[#f59e0b] mt-0.5" />
                  <div>
                    <h4 className="text-[#f59e0b] mb-1">Automatic Encryption</h4>
                    <p className="text-sm text-slate-500">
                      All uploaded files are automatically encrypted with AES-256 and distributed across AWS &amp; Azure for redundancy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── FETCH / DOWNLOAD TAB ──────────────────────────────────────────── */}
          {activeTab === "fetch" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Download className="w-5 h-5 text-[#0f3460]" />
                <h2 className="text-[#0f3460]">Fetch &amp; View Data</h2>
              </div>

              {/* Download by File ID */}
              <div className="bg-[#e8f1f5] border border-[#0f3460]/20 rounded-lg p-4 mb-4">
                <h3 className="text-[#0f3460] text-sm font-semibold mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download File by ID
                </h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Paste File ID here (e.g. 6612a3f4b…)"
                    value={downloadFileId}
                    onChange={(e) => setDownloadFileId(e.target.value)}
                    className="border-[#0f3460]/20 focus:border-[#0f3460] font-mono text-sm"
                  />
                  <Input
                    placeholder="Filename (optional)"
                    value={downloadFilename}
                    onChange={(e) => setDownloadFilename(e.target.value)}
                    className="border-[#0f3460]/20 focus:border-[#0f3460] sm:max-w-[200px]"
                  />
                  <Button
                    onClick={() => handleDownload(downloadFileId, downloadFilename)}
                    className="bg-[#0f3460] hover:bg-[#1e5a8e] whitespace-nowrap"
                    disabled={!downloadFileId || !!downloading}
                  >
                    {downloading === downloadFileId ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading…
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  After uploading a file you will receive a File ID. Paste it here to reconstruct and download it from the multi-cloud storage.
                </p>

                {/* Quick download from last upload */}
                {uploadResult && (
                  <div className="mt-3 flex items-center gap-2">
                    <p className="text-xs text-[#0f3460] font-medium">Last uploaded:</p>
                    <code className="text-xs bg-[#0f3460]/10 px-2 py-0.5 rounded font-mono text-[#0f3460]">
                      {uploadResult.fileId}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[#0f3460] border-[#0f3460]/30 hover:bg-[#0f3460]/10 h-6 text-xs px-2"
                      onClick={() => handleDownload(uploadResult.fileId, uploadResult.name)}
                      disabled={!!downloading}
                    >
                      {downloading === uploadResult.fileId ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Static records table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#e8f1f5]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">File Name</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Type</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Size</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Uploaded</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Status</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Cloud</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{record.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline">{record.type}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{record.size}</td>
                        <td className="px-4 py-3 text-sm">{record.uploaded}</td>
                        <td className="px-4 py-3">
                          {record.encrypted && (
                            <Badge className="bg-[#16a34a] hover:bg-[#16a34a]">
                              <Lock className="w-3 h-3 mr-1" />
                              Encrypted
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-1">
                            {record.cloudDistribution.map((cloud) => (
                              <Badge key={cloud} variant="outline" className="text-xs">
                                {cloud}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="ghost" className="text-[#0f3460] hover:bg-[#e8f1f5]">
                            <Download className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── UPDATE TAB ────────────────────────────────────────────────────── */}
          {activeTab === "update" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Edit className="w-5 h-5 text-[#0f3460]" />
                <h2 className="text-[#0f3460]">Update Data</h2>
              </div>
              <div className="bg-[#fff8e1] border border-[#f59e0b]/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#f59e0b] mt-0.5" />
                  <div>
                    <h4 className="text-[#f59e0b] mb-1">Warning: Sensitive Operation</h4>
                    <p className="text-sm text-slate-500">
                      Updating data will modify the encrypted records. All changes are logged for audit compliance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#e8f1f5]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">File Name</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Type</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Size</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{record.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline">{record.type}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{record.size}</td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdate(record)}
                            className="text-[#f59e0b] border-[#f59e0b] hover:bg-[#fff8e1]"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── DELETE TAB ────────────────────────────────────────────────────── */}
          {activeTab === "delete" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Trash2 className="w-5 h-5 text-red-600" />
                <h2 className="text-red-600">Delete Data</h2>
              </div>
              <div className="bg-[#fee2e2] border border-red-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="text-red-600 mb-1">Critical Warning: Permanent Deletion</h4>
                    <p className="text-sm text-slate-500">
                      Deleting data is permanent and cannot be undone. This action will remove the encrypted data from all cloud storage locations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#e8f1f5]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">File Name</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Type</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Size</th>
                      <th className="px-4 py-3 text-left text-sm text-[#0f3460]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{record.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline">{record.type}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{record.size}</td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(record)}
                            className="text-red-600 border-red-600 hover:bg-red-600/10"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete "{selectedRecord?.name}"? This action cannot be undone and will remove the file from all cloud storage locations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-600/90">
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update dialog */}
      <AlertDialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#f59e0b] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Update Data
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to update "{selectedRecord?.name}". This operation will modify the encrypted data and is logged for compliance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>File Name</Label>
              <Input defaultValue={selectedRecord?.name} />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Enter update notes for audit trail..." />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#f59e0b] hover:bg-[#f59e0b]/90">
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
