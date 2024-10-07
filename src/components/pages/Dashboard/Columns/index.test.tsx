import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as useRegistrations from "@/hooks/useRegistrations";
import Columns from "./";

jest.mock("@/hooks/useRegistrations", () => ({
  useRegistrationsByStatus: jest.fn(),
}));

const mockRegistrationsByStatus = {
  review: [{ id: 1, employeeName: "Ronaldo" }],
  approved: [{ id: 2, employeeName: "Ronald" }],
  rejected: [{ id: 3, employeeName: "Robson" }],
};

const queryClient = new QueryClient();

describe("Columns component", () => {
  test("should render columns with correct data", () => {
    (useRegistrations.useRegistrationsByStatus as jest.Mock).mockReturnValue({
      registrationsByStatus: mockRegistrationsByStatus,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Columns />
      </QueryClientProvider>
    );

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();

    expect(screen.getByText("Ronaldo")).toBeInTheDocument();
    expect(screen.getByText("Ronald")).toBeInTheDocument();
    expect(screen.getByText("Robson")).toBeInTheDocument();
  });

  test("should show loading when isLoading is true", () => {
    (useRegistrations.useRegistrationsByStatus as jest.Mock).mockReturnValue({
      registrationsByStatus: {},
      isLoading: true,
    });

    render(<Columns />);

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();

    expect(screen.queryByText("Ronaldo")).not.toBeInTheDocument();
  });
});
