import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateRegistrationPage from "./"; // ajuste o caminho conforme necessário
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCreateRegistration } from "@/hooks/useCreateRegistration";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("@/hooks/useCreateRegistration");

const mockUseCreateRegistration = useCreateRegistration as jest.Mock;

const queryClient = new QueryClient();

const renderWithProviders = () =>
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <CreateRegistrationPage />
      </QueryClientProvider>
    </MemoryRouter>
  );

describe("CreateRegistrationPage", () => {
  const mockCreateRegistration = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCreateRegistration.mockReturnValue({
      createRegistration: mockCreateRegistration,
      error: {},
    });
  });

  test("should submit the form when valid data is entered", async () => {
    mockCreateRegistration.mockResolvedValue({ status: 201 });

    renderWithProviders();

    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const cpfInput = screen.getByLabelText(/cpf/i);
    const dateInput = screen.getByLabelText(/data de admissão/i);
    const submitButton = screen.getByRole("button", { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "joao@example.com" } });
    fireEvent.change(cpfInput, { target: { value: "566.421.050-87" } });
    fireEvent.change(dateInput, { target: { value: "2023-01-01" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockCreateRegistration).toHaveBeenCalledWith({
        cpf: "566.421.050-87",
        employeeName: "João Silva",
        email: "joao@example.com",
        admissionDate: "2023-01-01",
      })
    );
  });
});
