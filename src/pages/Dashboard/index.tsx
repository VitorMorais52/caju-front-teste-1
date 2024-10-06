import Columns from "../../components/pages/Dashboard/Columns";
import { SearchBar } from "../../components/pages/Dashboard/Searchbar";
import * as S from "./styles";

const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Columns />
    </S.Container>
  );
};
export default DashboardPage;
