import styled from "styled-components";
const registrationStatusStyles: {
  [key in string]: { background: string; title: string };
} = {
  review: {
    background: "#FDF8E9",
    title: "#EFC24D",
  },
  approved: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  rejected: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};

export const Column = styled.section<{ status: any }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 70vh;
  max-height: 70vh;

  @media (max-width: 867px) {
    overflow: auto;
    min-height: 50vh;
    max-height: 50vh;
  }
`;

export const TitleColumn = styled.h3<{ status: any }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: 24px;
`;

export const ColumnContent = styled.ul`
  overflow: auto;
  max-height: 80%;
`;
