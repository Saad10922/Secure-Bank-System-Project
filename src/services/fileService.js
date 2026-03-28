import api from "./api";

/**
 * Upload a file to the backend (Bank Admin only).
 * Sends multipart/form-data.
 * @param {File} file – Browser File object from <input type="file">
 * @returns {{ fileId: string, fragments: number, message: string }}
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/api/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // { message, fileId, fragments, ... }
};

/**
 * Reconstruct (download) a file by its fileId (Bank Admin only).
 * @param {string} fileId – MongoDB ObjectId of the file
 * @param {string} filename – original file name for the download prompt
 */
export const reconstructFile = async (fileId, filename = "download") => {
  const response = await api.get(`/api/files/reconstruct/${fileId}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Fetch all uploaded file records (Bank Admin only).
 * @returns {Array<{ id, name, type, fragments, cloudDistribution, encrypted, uploaded }>}
 */
export const listFiles = async () => {
  const response = await api.get("/api/files/list");
  return response.data;
};

/**
 * Delete a file record by ID (Bank Admin only).
 * @param {string} fileId – MongoDB ObjectId of the file
 */
export const deleteFile = async (fileId) => {
  const response = await api.delete(`/api/files/${fileId}`);
  return response.data;
};

