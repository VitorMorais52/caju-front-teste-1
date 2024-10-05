import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { useMask } from "@react-input/mask";
import { cpf } from "cpf-cnpj-validator";

import { apiCreateRegistration } from "@/services/api";
import routes from "@/router/routes";

import { RegistrationInput } from "@/models/registration";

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

  const refInputCPF = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const goToHome = () => history.push(routes.dashboard);

  const handleChangeRegistration =
    (key: keyof RegistrationInput) => (e: ChangeEvent<HTMLInputElement>) => {
      setRegistration((prevRegistration) => ({
        ...prevRegistration,
        [key]: e.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cpf.isValid(registration.cpf)) return;

    const response = await apiCreateRegistration(registration);
    if (response?.status === 201) {
      setRegistration(initial_registration_value);
    }
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
          ref={refInputCPF}
          maxLength={14}
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
