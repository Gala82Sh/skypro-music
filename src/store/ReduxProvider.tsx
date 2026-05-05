'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(makeStore());  
  return <Provider store={storeRef.current}>{children}</Provider>;
}