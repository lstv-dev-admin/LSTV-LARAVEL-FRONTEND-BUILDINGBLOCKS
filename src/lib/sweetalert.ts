import Swal from 'sweetalert2';

export const sweetAlert = {
  loading: (message: string = 'Processing...') => {
    return Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: { container: 'swal-high-z' },
      didOpen: () => {
        Swal.showLoading();
      }
    });
  },

  confirm: async (options: {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
  } = {}) => {
    const result = await Swal.fire({
      title: options.title || 'Are you sure?',
      text: options.text || 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: options.confirmButtonText || 'Yes, proceed',
      cancelButtonText: options.cancelButtonText || 'Cancel',
      customClass: {
        container: 'swal-high-z'
      }
    });
    
    return result.isConfirmed;
  },

  success: (message: string = 'Success!', title?: string) => {
    return Swal.fire({
      title: title || 'Success!',
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      customClass: { container: 'swal-high-z' }
    });
  },

  error: (message: string = 'Something went wrong!', title?: string) => {
    return Swal.fire({
      title: title || 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: { container: 'swal-high-z' }
    });
  },

  close: () => {
    Swal.close();
  }
};
