import api from "./api";

/**
 * Fetch live cloud-health data for AWS, Azure, and (static) GCP.
 * Each entry has: name, region, color, status, latency,
 *                 totalObjects, totalSizeMB, lastSync, source, error?
 */
export const getCloudHealth = async () => {
  const response = await api.get("/api/admin/cloud-health");
  return response.data; // array of cloud health objects
};
