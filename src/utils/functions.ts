import { Registration } from "@/models/registration";

interface GroupedRegistrations {
  review: Registration[];
  approved: Registration[];
  rejected: Registration[];
}

export const groupByStatus = (
  registrations: Registration[]
): GroupedRegistrations => {
  const initialValue = { review: [], approved: [], rejected: [] };

  if (!registrations) return initialValue;

  const groupedRegistrations = registrations.reduce<GroupedRegistrations>(
    (accumulator, registration) => {
      const status = registration.status as keyof GroupedRegistrations;
      if (status in accumulator) {
        accumulator[status].push(registration);
      }
      return accumulator;
    },
    initialValue
  );
  return groupedRegistrations;
};

export const replaceItemById = (
  registrations: Registration[],
  updatedRegistration: Registration
) =>
  registrations.map((currentRegistration) =>
    currentRegistration.id === updatedRegistration.id
      ? updatedRegistration
      : currentRegistration
  );

export const deleteItemById = (
  registrations: Registration[],
  updatedRegistration: Registration
) =>
  registrations.filter(
    (currentRegistration) => currentRegistration.id !== updatedRegistration.id
  );
