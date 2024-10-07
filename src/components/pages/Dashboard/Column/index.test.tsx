import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Registration } from "@/models/registration";
import Column from "./index";

const queryClient = new QueryClient();

describe("Column component", () => {
  const mockRegistrations: Registration[] = [
    {
      admissionDate: "22/10/2023",
      email: "luiz@caju.com.br",
      employeeName: "Luiz Filho",
      status: "approved",
      cpf: "56642105087",
      id: 3,
    },
    {
      id: 1,
      admissionDate: "22/10/2023",
      email: "filipe@caju.com.br",
      employeeName: "Filipe Marins",
      status: "review",
      cpf: "78502270001",
    },
    {
      id: 2,
      admissionDate: "22/10/2023",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: "rejected",
      cpf: "78502270001",
    },
  ];

  test("should render column with correct title", () => {
    render(
      <Column
        key="Aprovado"
        title="Aprovado"
        status="approved"
        registrations={[]}
        isLoading={false}
      />
    );

    expect(screen.getByText("Aprovado")).toBeInTheDocument();
  });

  test("should render registrations when isLoading is false", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Column
          title="Aprovado"
          key="Aprovado"
          status="approved"
          registrations={mockRegistrations}
          isLoading={false}
        />
      </QueryClientProvider>
    );

    expect(screen.getByText("luiz@caju.com.br")).toBeInTheDocument();
    expect(screen.getByText("filipe@caju.com.br")).toBeInTheDocument();
  });

  test("should display loading skeleton when isLoading is true", () => {
    render(
      <Column
        title="Aprovado"
        status="approved"
        registrations={[]}
        isLoading={true}
      />
    );

    const container = screen.getByRole("alert");
    expect(container).toBeInTheDocument();

    const srOnlyText = screen.getByText("Carregando registro...");
    expect(srOnlyText).toBeInTheDocument();
  });
});
