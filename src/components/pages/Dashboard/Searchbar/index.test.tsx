import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "./";
import "@testing-library/jest-dom";
import * as api from "@/services/api";
import { act } from "react";

import { MemoryRouter } from "react-router-dom";

const queryClient = new QueryClient();

describe("SearchBar Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SearchBar />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  test("should render input and buttons", () => {
    expect(screen.getByLabelText(/digite um cpf válido/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /nova admissão/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /recarregar admissões/i })
    ).toBeInTheDocument();
  });

  test("should call refetch when reload button is clicked", async () => {
    const mockApiGetRegistrations = jest
      .spyOn(api, "apiGetRegistrations")
      .mockImplementation(() => Promise.resolve([]));

    const reloadButton = screen.getByLabelText(/recarregar admissões/i);
    fireEvent.click(reloadButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockApiGetRegistrations).toHaveBeenCalledWith({});

    mockApiGetRegistrations.mockRestore();
  });

  test("should update CPF input value", () => {
    const cpfInput: HTMLInputElement =
      screen.getByLabelText(/digite um cpf válido/i);
    fireEvent.change(cpfInput, { target: { value: "785.022.700-01" } });

    expect(cpfInput.value).toBe("785.022.700-01");
  });

  test("should call API when valid CPF is entered", async () => {
    const mockApiGetRegistrations = jest
      .spyOn(api, "apiGetRegistrations")
      .mockImplementation(() => Promise.resolve([]));

    const cpfInput = screen.getByLabelText(/digite um cpf válido/i);

    fireEvent.change(cpfInput, { target: { value: "785.022.700-01" } });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockApiGetRegistrations).toHaveBeenCalledWith({
      cpf: "78502270001",
    });

    mockApiGetRegistrations.mockRestore();
  });

  test("should navigate to create registration page", () => {
    const navigateButton = screen.getByLabelText(/adicionar nova admissão/i);
    fireEvent.click(navigateButton);
  });
});
