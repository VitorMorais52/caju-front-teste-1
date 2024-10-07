import { useQuery } from "@tanstack/react-query";
import { apiGetRegistrations } from "@/services/api";
import { groupByStatus } from "@/utils/functions";
import { showActionFeedback } from "@/utils/sweetAlert2";

export const useRegistrationsByStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => apiGetRegistrations(),
  });

  const registrationsByStatus = groupByStatus(data);

  if (error)
    showActionFeedback({
      type: "error",
      title: "Houve um erro ao carregar os dados.",
      settings: { timer: 4000 },
    });

  return { registrationsByStatus, isLoading, error };
};
