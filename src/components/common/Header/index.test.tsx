import { Header } from ".";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("Should render Header", () => {
    const { debug } = render(<Header>Caju test</Header>);
    expect(screen.getByText("Caju test"));
    debug();
  });
});
