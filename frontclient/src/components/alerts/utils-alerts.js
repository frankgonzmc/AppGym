import Swal from 'sweetalert2';

export const showAlert = (title, text, icon = 'info') => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Aceptar',
    });
};

export const showConfirmation = async (title, text, icon = 'warning') => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    });

    return result.isConfirmed; // Retorna true si el usuario confirma
};
