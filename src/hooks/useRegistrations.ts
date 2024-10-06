import { useQuery } from "@tanstack/react-query";
import { apiGetRegistrations } from "@/services/api";
import { groupByStatus } from "@/utils/functions";

export const useRegistrationsByStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => apiGetRegistrations(),
  });

  const registrationsByStatus = groupByStatus(data);

  return { registrationsByStatus, isLoading, error };
};
