'use client';

import { useGlobalSettingsStore } from '@/contexts/use-global-settings-store';

export function useColorScheme() {
  const ColorScheme = useGlobalSettingsStore(state => state.colorScheme);
  const setColorScheme = useGlobalSettingsStore(state => state.setColorScheme);
  return [ColorScheme, setColorScheme] as const;
}
