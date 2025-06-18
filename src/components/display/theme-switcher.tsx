'use client';

import { ColorScheme } from '@/contexts/use-global-settings-store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Moon, Sun } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '../ui/button';

export function ThemeSwitcher() {
  const [colorScheme, setColorScheme] = useColorScheme();
  const onToggleClick = useCallback(() => {
    setColorScheme(
      colorScheme !== ColorScheme.LIGHT ? ColorScheme.LIGHT : ColorScheme.DARK
    );
  }, [colorScheme, setColorScheme]);

  return colorScheme === ColorScheme.LIGHT ? (
    <Button onClick={onToggleClick}>
      <Sun className="w-5 h-5" />
    </Button>
  ) : (
    <Button onClick={onToggleClick}>
      <Moon className="w-5 h-5" />
    </Button>
  );
}
