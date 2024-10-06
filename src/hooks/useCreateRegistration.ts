import { useState } from "react";
import { cpf } from "cpf-cnpj-validator";
import { apiCreateRegistration } from "@/services/api";
import { validateEmployeeName } from "@/utils/functions";
import { RegistrationInput } from "@/models/registration";

export const useCreateRegistration = () => {
  const [error, setError] = useState({ employeeName: "", cpf: "" });

  const createRegistration = async (registration: RegistrationInput) => {
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

    return await apiCreateRegistration(registration);
  };

  return { createRegistration, error };
};
