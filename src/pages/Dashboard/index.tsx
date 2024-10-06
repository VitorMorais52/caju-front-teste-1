import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
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
