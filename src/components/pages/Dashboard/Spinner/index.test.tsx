import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Spinner from ".";

describe("Spinner", () => {
  it("should render Spinner with default size and color", () => {
    render(<Spinner />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render Spinner with custom size and color", () => {
    const customSize = "40px";
    const customColor = "red";

    render(<Spinner size={customSize} color={customColor} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const spinnerElement = screen.getByRole("status");

    expect(spinnerElement).toHaveStyle({
      width: customSize,
      height: customSize,
      borderColor: customColor,
    });
  });
});
