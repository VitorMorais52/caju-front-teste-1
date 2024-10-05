import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import {
  apiUpdateRegistrationStatus,
  apiDeleteRegistration,
} from "@/services/api";
import { deleteItemById, replaceItemById } from "@/utils/functions";

import { Registration } from "@/models/registration";
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

type UpdateRegistrationsType = "delete" | "update";

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const { id, status, employeeName, email, admissionDate } = data;
  const queryClient = useQueryClient();

  const updateLocalRegistration = (
    response: AxiosResponse<Registration, any> | undefined,
    type: UpdateRegistrationsType
  ) => {
    if (response?.statusText !== "OK") return;

    const updatedRegistration = response.data;
    const actionsByType = {
      delete: deleteItemById,
      update: replaceItemById,
    };

    queryClient.setQueryData(
      ["registrations"],
      (registrations: Registration[]) => {
        const updatedRegistrations = actionsByType[type](
          registrations,
          updatedRegistration
        );
        return updatedRegistrations;
      }
    );
  };

  const updateMutation = useMutation({
    mutationFn: apiUpdateRegistrationStatus,
    onSuccess: (data) => updateLocalRegistration(data, "update"),
  });

  const deleteMutation = useMutation({
    mutationFn: apiDeleteRegistration,
    onSuccess: (data) => updateLocalRegistration(data, "delete"),
  });

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
              onClick={() =>
                updateMutation.mutate({ id, newStatus: "rejected" })
              }
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              type="button"
              bgcolor="rgb(155, 229, 155)"
              onClick={() =>
                updateMutation.mutate({ id, newStatus: "approved" })
              }
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            type="button"
            bgcolor="#ff8858"
            onClick={() => updateMutation.mutate({ id, newStatus: "review" })}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <button type="button" onClick={() => deleteMutation.mutate(id)}>
          <HiOutlineTrash />
        </button>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
