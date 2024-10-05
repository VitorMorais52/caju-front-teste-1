import { useHistory } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import routes from "@/router/routes";

import Button from "@/components/Buttons";
import { IconButton } from "@/components/Buttons/IconButton";
import TextField from "@/components/TextField";

import { HiRefresh } from "react-icons/hi";
import * as S from "./styles";

export const SearchBar = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const refecthRegistrations = async () =>
    await queryClient.refetchQueries({
      queryKey: ["registrations"],
    });

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => refecthRegistrations()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
