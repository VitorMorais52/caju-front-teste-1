import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMask } from "@react-input/mask";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useCreateRegistration } from "@/hooks/useCreateRegistration";
import { RegistrationInput } from "@/models/registration";
import routes from "@/router/routes";
import { IconButton } from "@/components/common/Buttons/IconButton";
import TextField from "@/components/common/TextField";
import Button from "@/components/common/Buttons";

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
  const { createRegistration, error } = useCreateRegistration();
  const refInputCPF = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const handleNavigateToPage = () => history.push(routes.dashboard);

  const handleChangeRegistration =
    (key: keyof RegistrationInput) => (e: ChangeEvent<HTMLInputElement>) =>
      setRegistration((prevRegistration) => ({
        ...prevRegistration,
        [key]: e.target.value,
      }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await createRegistration(registration);
    if (response?.status === 201) {
      setRegistration(initial_registration_value);
      handleNavigateToPage();
    }
  };

  return (
    <S.Container>
      <S.Card onSubmit={handleSubmit}>
        <IconButton
          onClick={handleNavigateToPage}
          title="Voltar"
          aria-label="Voltar para o dashboard"
        >
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          type="text"
          required
          value={registration.employeeName}
          onChange={handleChangeRegistration("employeeName")}
          error={error.employeeName}
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
          required
          value={registration.cpf}
          onChange={handleChangeRegistration("cpf")}
          error={error.cpf}
        />
        <TextField
          label="Data de admissão"
          type="date"
          required
          value={registration.admissionDate}
          onChange={handleChangeRegistration("admissionDate")}
        />
        <Button aria-label="Cadastrar registro" type="submit">
          Cadastrar
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default CreateRegistrationPage;
