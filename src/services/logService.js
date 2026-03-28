import api from "./api";

/**
 * Fetch all system audit logs (System Admin only).
 * @returns {Array<{ _id, action, user, role, status, message, timestamp }>}
 */
export const getLogs = async () => {
  const response = await api.get("/api/admin/logs");
  return response.data; // array of log documents
};
