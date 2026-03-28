import api from "./api";

/**
 * Login a user.
 * @param {string} username
 * @param {string} password
 * @returns {{ token: string, role: string }}
 */
export const login = async (username, password) => {
  const response = await api.post("/api/auth/login", { username, password });
  return response.data; // { token, role }
};

/**
 * Register a new user (initial setup / admin creation).
 * @param {string} username
 * @param {string} password
 * @param {string} role  – "BANK_ADMIN" | "SYSTEM_ADMIN"
 */
export const register = async (username, password, role) => {
  const response = await api.post("/api/auth/register", {
    username,
    password,
    role,
  });
  return response.data;
};
