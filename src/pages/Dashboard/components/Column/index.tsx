import { Registration } from "@/models/registration";
import RegistrationCard from "../RegistrationCard";
import * as S from "./styles";

interface ColumnProps {
  title: string;
  status: string;
  registrations: Registration[];
}

const Column = ({ title, status, registrations }: ColumnProps) => (
  <S.Column status={status} aria-labelledby={`column-${status}`}>
    <S.TitleColumn id={`column-${status}`} status={status}>
      {title}
    </S.TitleColumn>
    <S.ColumnContent>
      {registrations.map((registration) => (
        <RegistrationCard data={registration} key={registration.id} />
      ))}
    </S.ColumnContent>
  </S.Column>
);

export default Column;
