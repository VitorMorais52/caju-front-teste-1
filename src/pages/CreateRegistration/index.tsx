import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { apiCreateRegistration } from "@/services/api";
import routes from "@/router/routes";

import { Registration, RegistrationInput } from "@/models/registration";

import TextField from "@/components/TextField";
import Button from "@/components/Buttons";
import { IconButton } from "@/components/Buttons/IconButton";

import { HiOutlineArrowLeft } from "react-icons/hi";
import * as S from "./styles";

const initial_registration_value: RegistrationInput = {
  cpf: "",
  employeeName: "",
  email: "",
  admissionDate: "",
};

const CreateRegistrationPage = () => {
  const history = useHistory();
  const [registration, setRegistration] = useState<RegistrationInput>(
    initial_registration_value
  );

  const goToHome = () => history.push(routes.dashboard);

  const handleChangeRegistration =
    (key: keyof Registration) => (e: ChangeEvent<HTMLInputElement>) => {
      setRegistration((prevRegistration) => ({
        ...prevRegistration,
        [key]: e.target.value,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistration(initial_registration_value);
    apiCreateRegistration(registration);
  };

  return (
    <S.Container>
      <S.Card onSubmit={handleSubmit}>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          type="text"
          required
          value={registration.employeeName}
          onChange={handleChangeRegistration("employeeName")}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          required
          value={registration.email}
          onChange={handleChangeRegistration("email")}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          type="text"
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          required
          value={registration.cpf}
          onChange={handleChangeRegistration("cpf")}
        />
        <TextField
          label="Data de admissão"
          type="date"
          required
          value={registration.admissionDate}
          onChange={handleChangeRegistration("admissionDate")}
        />
        <Button type="submit">Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default CreateRegistrationPage;
