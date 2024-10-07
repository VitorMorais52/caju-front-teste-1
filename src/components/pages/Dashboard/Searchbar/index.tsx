import { ChangeEvent, useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useMask } from "@react-input/mask";
import { cpf } from "cpf-cnpj-validator";

import { apiGetRegistrations } from "@/services/api";
import { extractNumber } from "@/utils/functions";
import { showActionFeedback } from "@/utils/sweetAlert2";
import { Registration } from "@/models/registration";
import routes from "@/router/routes";

import { IconButton } from "@/components/common/Buttons/IconButton";
import Button from "@/components/common/Buttons";
import TextField from "@/components/common/TextField";
import Spinner from "../Spinner";

import { HiRefresh, HiOutlineX } from "react-icons/hi";
import * as S from "./styles";

export const SearchBar = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [cpfInput, setCpfInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showClear, setShowClear] = useState(false);

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
    onSuccess: (registrations) => {
      showActionFeedback({
        type: "success",
        title: "Dados carregados com sucesso.",
        settings: { timer: 4000 },
      }),
        updateAllLocalRegistrations(registrations);
      setIsLoading(false);
      setShowClear(true);
    },
    onError: () => {
      showActionFeedback({
        type: "error",
        title: "Houve um erro ao carregar os dados.",
        settings: { timer: 4000 },
      });
      setIsLoading(false);
      setShowClear(true);
    },
  });

  const handleCpf = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value.length === 14 && cpf.isValid(value)) {
        setIsLoading(true);
        setShowClear(false);
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

    const queryState = queryClient.getQueryState(["registrations"]);

    if (queryState?.status === "error") {
      showActionFeedback({
        type: "error",
        title: "Houve um erro ao atualizar os dados.",
      });
    } else {
      showActionFeedback({
        type: "success",
        title: "Dados atualizados com sucesso.",
      });
    }
  };

  return (
    <S.Container>
      <S.InputCpfWrapper>
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
        {isLoading && <Spinner />}
        {showClear && cpfInput.length > 0 && (
          <IconButton
            aria-label="Limpar o campo do CPF"
            title="Limpar CPF"
            onClick={() => setCpfInput("")}
          >
            <HiOutlineX />
          </IconButton>
        )}
      </S.InputCpfWrapper>
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
