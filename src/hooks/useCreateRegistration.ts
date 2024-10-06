import { useState } from "react";
import { cpf } from "cpf-cnpj-validator";
import { apiCreateRegistration } from "@/services/api";
import { RegistrationInput } from "@/models/registration";

export const useCreateRegistration = () => {
  const [error, setError] = useState<string | null>(null);

  const createRegistration = async (registration: RegistrationInput) => {
    if (!cpf.isValid(registration.cpf)) {
      setError("CPF inválido");
      return null;
    }

    setError(null);
    return await apiCreateRegistration(registration);
  };

  return { createRegistration, error };
};
