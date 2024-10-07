import styled, { keyframes } from "styled-components";

const spinnerBorder = keyframes`
  to { transform: rotate(360deg); }
`;

interface ContainerProps {
  size?: string;
  color?: string;
}
export const Container = styled.div<ContainerProps>`
  display: inline-block;
  width: ${({ size }) => size || "18px"};
  height: ${({ size }) => size || "18px"};
  vertical-align: text-bottom;
  border: 2px solid ${({ color }) => color || "rgba(255, 117, 0, 1)"};
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spinnerBorder} 0.75s linear infinite;

  .srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
