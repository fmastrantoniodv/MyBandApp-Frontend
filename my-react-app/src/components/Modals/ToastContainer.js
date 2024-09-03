import React from 'react'
import './Modal.css'

const ToastContainer = ({ toasts }) => {
    console.log(`ToastContainer.toasts=`, toasts)
  return (
    <div className="toast-container">
    {(toasts || []).map((toast) => (
      <div key={toast.id} className={`toast ${toast.type}`}>
        {toast.message}
      </div>    
    ))}
  </div>
  );
};

export default ToastContainer;