import { useCallback } from "react";
import { showConfirmationModal } from "@/utils/sweetAlert2";
import { useUpdateRegistration } from "@/hooks/useUpdateRegistration";
import { Registration, Status } from "@/models/registration";
import { ButtonSmall } from "@/components/common/Buttons";
import Spinner from "../Spinner";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import * as S from "./styles";
import { IconButton } from "@/components/common/Buttons/IconButton";

type RegistrationCardProps = {
  data: Registration;
};

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const { id, status, employeeName, email, admissionDate } = data;
  const { updateMutation, deleteMutation } = useUpdateRegistration();

  const handleDelete = useCallback(
    () =>
      showConfirmationModal({
        title: "Tem certeza?",
        text: "Esse registro será excluído permanentemente.",
        confirmAction: () => deleteMutation.mutate(id),
      }),
    [deleteMutation, id]
  );

  const handleStatusUpdate = useCallback(
    (newStatus: Status) =>
      showConfirmationModal({
        title: "Tem certeza?",
        text: "O status desse registro será alterado permanentemente.",
        confirmAction: () =>
          updateMutation.mutate({
            id,
            property: { name: "status", value: newStatus },
          }),
      }),
    [updateMutation, id]
  );

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {status === "review" ? (
          <>
            <ButtonSmall
              type="button"
              bgcolor="rgb(255, 145, 154)"
              onClick={() => handleStatusUpdate("rejected")}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Spinner size="12px" color="white" />
              ) : (
                "Reprovar"
              )}
            </ButtonSmall>
            <ButtonSmall
              type="button"
              bgcolor="rgb(155, 229, 155)"
              onClick={() => handleStatusUpdate("approved")}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Spinner size="12px" color="white" />
              ) : (
                "Aprovar"
              )}
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            type="button"
            bgcolor="#ff8858"
            onClick={() => handleStatusUpdate("review")}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Spinner size="12px" color="white" />
            ) : (
              "Revisar novamente"
            )}
          </ButtonSmall>
        )}
        {deleteMutation.isPending ? (
          <Spinner size="12px" />
        ) : (
          <IconButton
            aria-label="Deletar registro"
            title="Deletar"
            onClick={handleDelete}
            className="deleteButton"
          >
            <HiOutlineTrash />
          </IconButton>
        )}
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
