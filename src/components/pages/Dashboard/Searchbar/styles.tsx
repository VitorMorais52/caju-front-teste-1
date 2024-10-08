import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const InputCpfWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner,
  button {
    margin-left: 2rem;
  }

  button {
    border: 2px solid rgba(255, 117, 0, 1);
    svg {
      color: rgba(255, 117, 0, 1);
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;
