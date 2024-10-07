import { useRegistrationsByStatus } from "@/hooks/useRegistrations";
import { Status } from "@/models/registration";
import Column from "../Column";
import * as S from "./styles";

type Column = { status: Status; title: string };

const columnList: Column[] = [
  { status: "review", title: "Pronto para revisar" },
  { status: "approved", title: "Aprovado" },
  { status: "rejected", title: "Reprovado" },
];

const Columns = () => {
  const { registrationsByStatus, isLoading } = useRegistrationsByStatus();

  return (
    <S.Container>
      {columnList.map((column) => (
        <Column
          key={column.title}
          title={column.title}
          status={column.status}
          isLoading={isLoading}
          registrations={registrationsByStatus[column.status] || []}
        />
      ))}
    </S.Container>
  );
};

export default Columns;
