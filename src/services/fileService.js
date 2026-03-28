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
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // { message, fileId, fragments, ... }
};

/**
 * Reconstruct (download) a file by its fileId (Bank Admin only).
 * Returns a Blob so the browser can trigger a file download.
 * @param {string} fileId – MongoDB ObjectId of the file
 * @param {string} filename – original file name for the download prompt
 */
export const reconstructFile = async (fileId, filename = "download") => {
  const response = await api.get(`/api/files/reconstruct/${fileId}`, {
    responseType: "blob",
  });

  // Strip any existing extension and always save as .csv
  const baseName = filename.replace(/\.[^/.]+$/, "");
  const csvFilename = `${baseName}.csv`;

  // Use text/csv MIME type so the browser treats the file correctly
  const blob = new Blob([response.data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", csvFilename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};
