'use client';

import { ColorScheme } from '@/contexts/use-global-settings-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';

export function ThemeWatcher() {
  const [colorScheme] = useColorScheme();
  useEffect(() => {
    const isLight = colorScheme !== ColorScheme.LIGHT;
    if (isLight) {
      document.documentElement.classList.add('dark');
    }
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [colorScheme]);

  return null;
}
