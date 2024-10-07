import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  apiUpdateRegistrationProperty,
  apiDeleteRegistration,
} from "@/services/api";
import { deleteItemById, replaceItemById } from "@/utils/functions";
import { Registration } from "@/models/registration";
import { showActionFeedback } from "@/utils/sweetAlert2";

type UpdateRegistrationsType = "delete" | "update";

export const useUpdateRegistration = () => {
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
    mutationFn: apiUpdateRegistrationProperty,
    onSuccess: (data) => {
      updateLocalRegistration(data, "update");
      showActionFeedback({
        type: "success",
        title: "Registro atualizado com sucesso.",
      });
    },
    onError: () =>
      showActionFeedback({
        type: "error",
        title: "Houve um erro ao atualizar o registro.",
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: apiDeleteRegistration,
    onSuccess: (data) => {
      updateLocalRegistration(data, "delete");
      showActionFeedback({
        type: "success",
        title: "Registro atualizado com sucesso.",
      });
    },
    onError: () =>
      showActionFeedback({
        type: "error",
        title: "Houve um erro ao excluir o registro.",
      }),
  });

  return { updateMutation, deleteMutation };
};
