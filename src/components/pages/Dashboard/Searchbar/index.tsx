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
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isRefetchLoading, setIsRefetchLoading] = useState(false);
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
        title: `Dados ${
          isRefetchLoading ? "recarregados" : "carregados"
        } com sucesso.`,
        settings: { timer: 2000 },
      }),
        updateAllLocalRegistrations(registrations);
    },
    onError: () => {
      showActionFeedback({
        type: "error",
        title: `Houve um erro ao ${
          isRefetchLoading ? "recarregar" : "carregar"
        } os dados.`,
        settings: { timer: 4000 },
      });
    },
    onSettled: () => {
      setIsFilterLoading(false);
      setIsRefetchLoading(false);
      setShowClear(cpfInput.length ? true : false);
    },
  });

  const handleCpf = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value.length === 14 && cpf.isValid(value)) {
        setIsFilterLoading(true);
        setShowClear(false);
        updateMutation.mutate({ cpf: extractNumber(value) });
      }

      const filterWasCleanedAfterSearch =
        !value.length && cpfInput.length > 0 && showClear;

      if (filterWasCleanedAfterSearch) {
        setIsFilterLoading(true);
        updateMutation.mutate({});
      }

      setCpfInput(value);
    },
    [cpfInput.length, showClear, updateMutation]
  );

  const clearCpfInput = () => {
    setCpfInput("");
    setIsFilterLoading(true);
    updateMutation.mutate({});
  };

  const handleNavigateToPage = () => history.push(routes.createRegistration);

  const handleRefetchRegistrations = async () => {
    setIsRefetchLoading(true);
    updateMutation.mutate({});
  };

  return (
    <S.Container>
      <S.InputCpfWrapper>
        <TextField
          ref={refInputCPF}
          title="Busque por CPF"
          maxLength={14}
          aria-label="Digite um CPF válido"
          placeholder="Digite um CPF válido"
          type="text"
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          required
          value={cpfInput}
          onChange={handleCpf}
        />
        {isFilterLoading && <Spinner />}
        {showClear && cpfInput.length > 0 && (
          <IconButton
            aria-label="Limpar o campo do CPF"
            title="Limpar CPF"
            onClick={clearCpfInput}
          >
            <HiOutlineX />
          </IconButton>
        )}
      </S.InputCpfWrapper>
      <S.Actions>
        {isRefetchLoading ? (
          <Spinner />
        ) : (
          <IconButton
            aria-label="recarregar admissões"
            title="Recarregar dados"
            onClick={handleRefetchRegistrations}
          >
            <HiRefresh />
          </IconButton>
        )}
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
