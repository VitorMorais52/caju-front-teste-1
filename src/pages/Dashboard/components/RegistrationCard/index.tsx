import { useCallback } from "react";
import { useUpdateRegistrations } from "@/hooks/useUpdateRegistrations";
import { Registration, Status } from "@/models/registration";
import { ButtonSmall } from "@/components/Buttons";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import * as S from "./styles";

type RegistrationCardProps = {
  data: Registration;
};

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const { id, status, employeeName, email, admissionDate } = data;
  const { updateMutation, deleteMutation } = useUpdateRegistrations();

  const handleDelete = useCallback(
    () => deleteMutation.mutate(id),
    [deleteMutation, id]
  );
  const handleStatusUpdate = useCallback(
    (newStatus: Status) => updateMutation.mutate({ id, newStatus }),
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
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              type="button"
              bgcolor="rgb(155, 229, 155)"
              onClick={() => handleStatusUpdate("approved")}
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            type="button"
            bgcolor="#ff8858"
            onClick={() => handleStatusUpdate("review")}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <button
          type="button"
          aria-label="Deletar registro"
          title="Deletar"
          onClick={handleDelete}
        >
          <HiOutlineTrash />
        </button>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
