'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(makeStore());
  return (
    <Provider store={storeRef.current}>
      {children}
      <ToastContainer
        toastClassName="custom-toast"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  );
}
