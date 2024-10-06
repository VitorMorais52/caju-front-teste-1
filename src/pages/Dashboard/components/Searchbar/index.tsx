import { ChangeEvent, useState, useCallback } from "react";
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

  const updateAllLocalRegistrations = useCallback(
    (registrations: Registration[]) =>
      queryClient.setQueryData(["registrations"], () => registrations),
    [queryClient]
  );

  const updateMutation = useMutation({
    mutationFn: apiGetRegistrations,
    onSuccess: updateAllLocalRegistrations,
  });

  const handleCpf = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value.length === 14 && cpf.isValid(value)) {
        updateMutation.mutate({ cpf: extractNumber(value) });
      }
      setCpfInput(value);
    },
    [updateMutation]
  );

  const handleNavigateToPage = () => history.push(routes.createRegistration);

  const handleRefetchRegistrations = async () => {
    await queryClient.refetchQueries({
      queryKey: ["registrations"],
    });
  };

  return (
    <S.Container>
      <TextField
        ref={refInputCPF}
        maxLength={14}
        aria-label="Digite um CPF válido"
        placeholder="Digite um CPF válido"
        type="text"
        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
        required
        value={cpfInput}
        onChange={handleCpf}
      />
      <S.Actions>
        <IconButton
          aria-label="recarregar admissões"
          title="Recarregar"
          onClick={handleRefetchRegistrations}
        >
          <HiRefresh />
        </IconButton>
        <Button
          aria-label="Adicionar nova admissão"
          onClick={handleNavigateToPage}
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
