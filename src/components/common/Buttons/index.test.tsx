import Button, { ButtonSmall } from ".";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("Should default Button", () => {
    const { debug } = render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i }));
    debug();
  });

  it("Should render Small Button", () => {
    const { debug } = render(<ButtonSmall>Small</ButtonSmall>);
    expect(screen.getByRole("button", { name: /Small/i }));
    debug();
  });
});
