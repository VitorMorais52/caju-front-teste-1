import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationCard from "@/components/pages/Dashboard/RegistrationCard"; // Ajuste o caminho conforme necessário
import { useUpdateRegistration } from "@/hooks/useUpdateRegistration";
import { showConfirmationModal } from "@/utils/sweetAlert2";
import { Registration } from "@/models/registration";
import DashboardPage from "@/pages/Dashboard";

jest.mock("@/hooks/useUpdateRegistration");
jest.mock("@/utils/sweetAlert2", () => ({
  showConfirmationModal: jest.fn(),
}));

const queryClient = new QueryClient();

const mockUpdateMutation = {
  mutate: jest.fn(),
  isPending: false,
};

const mockDeleteMutation = {
  mutate: jest.fn(),
  isPending: false,
};

beforeEach(() => {
  (useUpdateRegistration as jest.Mock).mockReturnValue({
    updateMutation: mockUpdateMutation,
    deleteMutation: mockDeleteMutation,
  });
  jest.clearAllMocks();
});

const renderWithProviders = () =>
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
      </QueryClientProvider>
    </MemoryRouter>
  );

describe("DashboardPage", () => {
  const mockData: Registration[] = [
    {
      id: 1,
      cpf: "56642105087",
      status: "review",
      employeeName: "Filipe Marins",
      email: "filipe@caju.com.br",
      admissionDate: "22/10/2023",
    },
    {
      id: 2,
      cpf: "12345678901",
      status: "approved",
      employeeName: "José Leão",
      email: "jose@caju.com.br",
      admissionDate: "22/10/2023",
    },
    {
      id: 3,
      cpf: "56642105087",
      status: "approved",
      employeeName: "Luiz Filho",
      email: "luiz@caju.com.br",
      admissionDate: "22/10/2023",
    },
  ];

  test("renders the data after API call", async () => {
    renderWithProviders();

    // Aguarda que os elementos estejam no documento
    const filipeMarins = await screen.findByText("Filipe Marins");
    const joseLeao = await screen.findByText("José Leão");
    const luizFilho = await screen.findByText("Luiz Filho");

    // Verifica se os elementos estão no documento
    expect(filipeMarins).toBeInTheDocument();
    expect(joseLeao).toBeInTheDocument();
    expect(luizFilho).toBeInTheDocument();
  });

  test("approves a registration", async () => {
    render(<RegistrationCard data={mockData[0]} />);

    expect(screen.getByText("Filipe Marins")).toBeInTheDocument();

    const approveButton = screen.getByLabelText("Aprovar");
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(showConfirmationModal).toHaveBeenCalled();
    });

    const confirmAction = (showConfirmationModal as jest.Mock).mock.calls[0][0]
      .confirmAction;
    confirmAction();

    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith({
      id: 1,
      property: { name: "status", value: "approved" },
    });
  });
});
