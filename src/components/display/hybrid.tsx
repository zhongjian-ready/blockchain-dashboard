'use client';

import { createContext, useContext } from 'react';
import { useMedia } from 'react-use';

export const TouchContext = createContext<boolean | undefined>(undefined);

export function TouchProvider({
  children,
  isTouchDevice,
}: {
  children: React.ReactNode;
  isTouchDevice?: boolean;
}) {
  const isTouch = useMedia('(pointer: coarse)', false);
  const isDesktop = useMedia('(min-width: 768px)', true) || isTouchDevice;
  return (
    <TouchContext.Provider value={isTouch || !isDesktop}>
      {children}
    </TouchContext.Provider>
  );
}

export const useTouch = () => {
  const isTouch = useContext(TouchContext);
  return isTouch !== undefined ? isTouch : false;
};
