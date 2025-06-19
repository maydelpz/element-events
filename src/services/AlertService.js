import Swal from "sweetalert2";

export const confirmDelete = (entityName = "registro") => {
  return Swal.fire({
    title: `¿Estás seguro de eliminar esta ${entityName}?`,
    showCancelButton: true,
    confirmButtonColor: "#9e2f2faf",
    cancelButtonColor: "#122c4fc4",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: "!rounded-full",
      cancelButton: "!rounded-full",
    },
  });
};

export const showSuccess = (message = "Operación exitosa") => {
  return Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showError = (message = "Ocurrió un error") => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#3085d6",
    customClass: {
      confirmButton: "!rounded-full",
    },
  });
};
