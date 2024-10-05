export type Status = "review" | "approved" | "rejected";

export interface Registration {
  id: number;
  status: Status;
  cpf: string;
  employeeName: string;
  email: string;
  admissionDate: string;
}

export type RegistrationInput = Omit<Registration, "id" | "status">;
