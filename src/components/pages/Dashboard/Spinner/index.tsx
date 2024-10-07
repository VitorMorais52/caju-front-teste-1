import { Container } from "./styles";

interface SpinnerProps {
  size?: string;
  color?: string;
}
const Spinner = ({ size, color }: SpinnerProps) => (
  <Container className="spinner" role="status" size={size} color={color}>
    <span className="srOnly">Loading...</span>
  </Container>
);
export default Spinner;
