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
    <Button
      onClick={onToggleClick}
      variant="default"
      size="icon"
      className="w-10 h-10 rounded-lg flex-shrink-0 text-black bg-slate-100 hover:bg-slate-200 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition focus-visible:[box-shadow:none]"
    >
      <Sun className="w-5 h-5" />
    </Button>
  ) : (
    <Button
      onClick={onToggleClick}
      variant="default"
      size="icon"
      className="w-10 h-10 rounded-lg flex-shrink-0 text-black bg-slate-100 hover:bg-slate-200 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition focus-visible:[box-shadow:none]"
    >
      <Moon className="w-5 h-5" />
    </Button>
  );
}
