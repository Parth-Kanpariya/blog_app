import { toast } from 'react-toastify';

export const successToast = (data) => {
  return toast.success(data, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500
  });
};

export const errorToast = (data) => {
  return toast.error(data, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500
  });
};
