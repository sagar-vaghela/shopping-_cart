import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
const Toastify = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        className={'toastify'}
      />
    </div>
  );
};

export default Toastify;
