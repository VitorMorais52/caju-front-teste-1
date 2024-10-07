import styled, { keyframes } from "styled-components";

const spinnerBorder = keyframes`
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: text-bottom;
  border: 2px solid rgba(255, 117, 0, 1);
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
