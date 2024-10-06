import { Container } from "./styles";

const CardSkeleton = () => (
  <Container aria-busy="true" role="alert">
    <span id="forScreenReaders">Carregando registro...</span>
  </Container>
);

export default CardSkeleton;
