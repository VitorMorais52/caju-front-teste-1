import { useQuery } from "@tanstack/react-query";

import { apiGetRegistrations } from "@/services/api";
import { groupByStatus } from "@/utils/functions";

import RegistrationCard from "../RegistrationCard";

import { Status } from "@/models/registration";

import * as S from "./styles";

type Column = { status: Status; title: string };

const columnList: Column[] = [
  { status: "review", title: "Pronto para revisar" },
  { status: "approved", title: "Aprovado" },
  { status: "rejected", title: "Reprovado" },
];

const Columns = () => {
  const { data } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => apiGetRegistrations(),
  });

  const registrations = groupByStatus(data);

  return (
    <S.Container>
      {columnList.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
            <S.ColumnContent>
              {registrations[column.status].map((registration) => {
                return (
                  <RegistrationCard data={registration} key={registration.id} />
                );
              })}
            </S.ColumnContent>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
