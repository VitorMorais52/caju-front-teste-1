import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardSkeleton from "./";

describe("CardSkeleton", () => {
  it("renders correctly and has accessible text", () => {
    render(<CardSkeleton />);

    const container = screen.getByRole("alert");
    expect(container).toBeInTheDocument();

    const srOnlyText = screen.getByText("Carregando registro...");
    expect(srOnlyText).toBeInTheDocument();
  });
});
