import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useMask } from "@react-input/mask";
import { cpf } from "cpf-cnpj-validator";

import { apiGetRegistrations } from "@/services/api";
import { extractNumber } from "@/utils/functions";
import { Registration } from "@/models/registration";
import routes from "@/router/routes";

import Button from "@/components/Buttons";
import { IconButton } from "@/components/Buttons/IconButton";
import TextField from "@/components/TextField";

import { HiRefresh } from "react-icons/hi";
import * as S from "./styles";

export const SearchBar = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [cpfInput, setCpfInput] = useState("");

  const refInputCPF = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const updateAllLocalRegistrations = (
    registrations: Registration[] | undefined
  ) => queryClient.setQueryData(["registrations"], () => registrations);

  const updateMutation = useMutation({
    mutationFn: apiGetRegistrations,
    onSuccess: updateAllLocalRegistrations,
  });

  const handleCpf = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length === 14 && cpf.isValid(value)) {
      updateMutation.mutate({ cpf: extractNumber(value) });
    }
    setCpfInput(value);
  };

  const handleNavigateToPage = () => history.push(routes.createRegistration);

  const handleRefecthRegistrations = async () =>
    await queryClient.refetchQueries({
      queryKey: ["registrations"],
    });

  return (
    <S.Container>
      <TextField
        ref={refInputCPF}
        maxLength={14}
        placeholder="Digite um CPF válido"
        type="text"
        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
        required
        value={cpfInput}
        onChange={(e) => handleCpf(e)}
      />
      <S.Actions>
        <IconButton
          aria-label="refetch"
          onClick={() => handleRefecthRegistrations()}
        >
          <HiRefresh />
        </IconButton>
        <Button onClick={() => handleNavigateToPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
