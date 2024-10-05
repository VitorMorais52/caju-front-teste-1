import axios, { AxiosResponse } from "axios";

import { Status, Registration, RegistrationInput } from "@/models/registration";

type UpdateStatusParams = { id: number; newStatus: Status };

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRegistrations = async () => {
  try {
    const response = await api.get("/registrations");
    return response.data;
  } catch (error) {
    console.error("API error:", error);
  }
};

export const apiUpdateRegistrationStatus = async ({
  id,
  newStatus,
}: UpdateStatusParams) => {
  try {
    const response: AxiosResponse<Registration> = await api.patch(
      `/registrations/${id}`,
      {
        status: newStatus,
      }
    );
    return response;
  } catch (error) {
    console.error("API error:", error);
  }
};

export const apiDeleteRegistration = async (id: number) => {
  try {
    const response: AxiosResponse<Registration> = await api.delete(
      `/registrations/${id}`
    );
    return response;
  } catch (error) {
    console.error("API error:", error);
  }
};

export const apiCreateRegistration = async (
  registration: RegistrationInput
) => {
  try {
    const response: AxiosResponse<Registration> = await api.post(
      "/registrations/",
      { ...registration, status: "review" }
    );
    return response;
  } catch (error) {
    console.error("API error:", error);
  }
};

export default api;
