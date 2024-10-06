import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  apiUpdateRegistrationStatus,
  apiDeleteRegistration,
} from "@/services/api";
import { deleteItemById, replaceItemById } from "@/utils/functions";
import { Registration } from "@/models/registration";

type UpdateRegistrationsType = "delete" | "update";

export const useUpdateRegistrations = () => {
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

  return { updateMutation, deleteMutation };
};
