import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationCard from ".";
import { useUpdateRegistration } from "@/hooks/useUpdateRegistration";
import { showConfirmationModal } from "@/utils/sweetAlert2";
import "@testing-library/jest-dom";
import { Registration } from "@/models/registration";

jest.mock("@/hooks/useUpdateRegistration");
jest.mock("@/utils/sweetAlert2");

describe("RegistrationCard", () => {
  const mockUpdateMutation = { mutate: jest.fn(), isPending: false };
  const mockDeleteMutation = { mutate: jest.fn(), isPending: false };

  beforeEach(() => {
    (useUpdateRegistration as jest.Mock).mockReturnValue({
      updateMutation: mockUpdateMutation,
      deleteMutation: mockDeleteMutation,
    });
  });

  it("should render registration card with employee details", () => {
    const data: Registration = {
      id: 2,
      admissionDate: "22/10/2023",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: "rejected",
      cpf: "78502270001",
    };

    render(<RegistrationCard data={data} />);

    expect(screen.getByText("José Leão")).toBeInTheDocument();
    expect(screen.getByText("jose@caju.com.br")).toBeInTheDocument();
    expect(screen.getByText("22/10/2023")).toBeInTheDocument();
  });

  it("should call delete mutation when delete button is clicked", () => {
    const data: Registration = {
      id: 2,
      admissionDate: "22/10/2023",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: "rejected",
      cpf: "78502270001",
    };

    render(<RegistrationCard data={data} />);

    (showConfirmationModal as jest.Mock).mockImplementation(
      ({ confirmAction }) => {
        confirmAction();
      }
    );

    const deleteButton = screen.getByRole("button", {
      name: /deletar registro/i,
    });
    fireEvent.click(deleteButton);

    expect(showConfirmationModal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Tem certeza?",
        text: "Esse registro será excluído permanentemente.",
      })
    );
    expect(mockDeleteMutation.mutate).toHaveBeenCalledWith(2);
  });

  it("should call update mutation when approve button is clicked", () => {
    const data: Registration = {
      id: 2,
      admissionDate: "22/10/2023",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: "review",
      cpf: "78502270001",
    };

    render(<RegistrationCard data={data} />);

    (showConfirmationModal as jest.Mock).mockImplementation(
      ({ confirmAction }) => {
        confirmAction();
      }
    );

    const approveButton = screen.getByRole("button", { name: /Aprovar/i });
    fireEvent.click(approveButton);

    expect(showConfirmationModal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Tem certeza?",
        text: "O status desse registro será alterado permanentemente.",
      })
    );
    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith({
      id: 2,
      property: { name: "status", value: "approved" },
    });
  });

  it("should call update mutation when reject button is clicked", () => {
    const data: Registration = {
      id: 2,
      admissionDate: "22/10/2023",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: "review",
      cpf: "78502270001",
    };

    render(<RegistrationCard data={data} />);

    (showConfirmationModal as jest.Mock).mockImplementation(
      ({ confirmAction }) => {
        confirmAction();
      }
    );

    const rejectButton = screen.getByRole("button", { name: /Reprovar/i });
    fireEvent.click(rejectButton);

    expect(showConfirmationModal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Tem certeza?",
        text: "O status desse registro será alterado permanentemente.",
      })
    );
    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith({
      id: 2,
      property: { name: "status", value: "rejected" },
    });
  });
});
