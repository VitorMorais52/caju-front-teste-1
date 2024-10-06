import axios, { AxiosResponse } from "axios";

import { Status, Registration, RegistrationInput } from "@/models/registration";

type UpdatePropertyParams = {
  id: number;
  property: {
    name: keyof RegistrationInput | "status";
    value: string | Status;
  };
};

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiGetRegistrations = async (
  params?: Partial<RegistrationInput>
) => {
  try {
    const response = await api.get("/registrations", { params });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
  }
};

export const apiUpdateRegistrationProperty = async ({
  id,
  property,
}: UpdatePropertyParams) => {
  try {
    const { name, value } = property;
    const response: AxiosResponse<Registration> = await api.patch(
      `/registrations/${id}`,
      {
        [name]: value,
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
