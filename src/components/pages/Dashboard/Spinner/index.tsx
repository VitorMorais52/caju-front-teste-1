import { Container } from "./styles";

const Spinner = () => (
  <Container className="spinner" role="status">
    <span className="srOnly">Loading...</span>
  </Container>
);
export default Spinner;
