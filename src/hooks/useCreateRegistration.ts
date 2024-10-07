import { useState } from "react";
import { cpf } from "cpf-cnpj-validator";
import { apiCreateRegistration } from "@/services/api";
import { extractNumber, validateEmployeeName } from "@/utils/functions";
import { Registration, RegistrationInput } from "@/models/registration";
import { AxiosResponse } from "axios";

export const useCreateRegistration = () => {
  const [error, setError] = useState({ employeeName: "", cpf: "" });

  const createRegistration = async (
    registration: RegistrationInput
  ): Promise<AxiosResponse<Registration, any> | undefined | null> => {
    const validationErrors = { employeeName: "", cpf: "" };

    if (!validateEmployeeName(registration.employeeName)) {
      validationErrors.employeeName =
        "Nome inválido: deve conter pelo menos duas letras, um espaço, e não iniciar com número";
    }

    if (!cpf.isValid(registration.cpf)) {
      validationErrors.cpf = "CPF inválido";
    }

    if (validationErrors.employeeName || validationErrors.cpf) {
      setError(validationErrors);
      return null;
    }

    setError({ employeeName: "", cpf: "" });

    try {
      const formattedRegistration = {
        ...registration,
        cpf: extractNumber(registration.cpf),
      };
      const response = await apiCreateRegistration(formattedRegistration);
      return response;
    } catch (err) {
      return err as any;
    }
  };

  return { createRegistration, error };
};
