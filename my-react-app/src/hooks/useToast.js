import { useState } from "react"

const useToast = () => {
    const [toasts, setToasts] = useState([]);
  
    const showToast = (message, type = 'success') => {
      const id = Date.now();
      const newToast = { id, message, type };
      
      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, 3000)
    }
  
    return  [toasts, showToast];
  };
  
  export default useToast;