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

export const showSuccessAlert = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'Aceptar',
    });
};

export const showErrorAlert = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'Aceptar',
    });
};

export const showWarningAlert = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
    });
};

export const showInteractiveAlert = async (title, text) => {
    const { isConfirmed } = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ir a completar',
        cancelButtonText: 'Cancelar',
        timer: 10000, // 10 segundos
        timerProgressBar: true,
    });

    return isConfirmed; // Retorna true si el usuario confirma
};