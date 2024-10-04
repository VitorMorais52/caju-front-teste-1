import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: any) => {
  console.error("API error:", error);
  throw error;
};

export const getRegistrations = async () => {
  try {
    const response = await api.get("/registrations");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default api;
