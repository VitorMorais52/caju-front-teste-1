import Swal, { SweetAlertOptions } from "sweetalert2";

interface ActionFeedback {
  type: "success" | "error";
  title?: string;
  text?: string;
  confirmAction?: () => void;
  settings?: SweetAlertOptions;
}

export const showActionFeedback = ({
  type,
  title,
  text,
  confirmAction,
  settings,
}: ActionFeedback) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    ...settings,
  });
  Toast.fire({
    icon: type,
    title: title,
    text: text,
    preConfirm: confirmAction,
  }).then(
    (result) =>
      result.dismiss === Swal.DismissReason.timer &&
      confirmAction &&
      confirmAction()
  );
};

interface ConfirmationModal {
  title: string;
  text: string;
  confirmAction?: () => void;
}

export const showConfirmationModal = ({
  title,
  text,
  confirmAction,
}: ConfirmationModal) => {
  Swal.fire({
    title: title,
    text: text,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
    preConfirm: confirmAction,
  });
};
