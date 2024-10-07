import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextField from ".";

describe("TextField", () => {
  it("renders correctly with the given value", () => {
    render(
      <TextField
        title="Name"
        maxLength={14}
        type="text"
        value={"Caju"}
        onChange={() => {}}
      />
    );
    const inputElement = screen.getByDisplayValue("Caju");
    expect(inputElement).toBeInTheDocument();
  });

  it("allows user to type in the input", () => {
    render(<TextField title="Name" maxLength={14} type="text" />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Laranja" } });
    expect(inputElement).toHaveValue("Laranja");
  });

  it("renders the label when provided", () => {
    render(<TextField label="Name" type="text" />);
    const labelElement = screen.getByLabelText("Name");
    expect(labelElement).toBeInTheDocument();
  });

  it("should respect the maxLength", () => {
    render(<TextField title="Name" maxLength={5} type="text" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxlength", "5");
  });
});
