import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 16px;
  margin-top: 40px;
  gap: 4px;

  height: 141.5px;

  border-radius: 8px;
  background-color: #e6e6e6;

  animation: ${shine} 1.5s infinite linear;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255),
    rgba(255, 255, 255, 0.4)
  );
  background-size: 200% 100%;

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
