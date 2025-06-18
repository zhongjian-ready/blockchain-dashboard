import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum LocaleEnum {
  EN_US = 'en-US',
  ZH_CN = 'zh-CN',
}

export enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type GlobalSettingsStore = {
  locale: LocaleEnum;
  setLocale: (locale: LocaleEnum) => void;
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
};
export const useGlobalSettingsStore = create<GlobalSettingsStore>()(
  persist(
    set => ({
      locale: LocaleEnum.EN_US,
      setLocale: (locale: LocaleEnum) => set({ locale }),
      colorScheme: ColorScheme.LIGHT,
      setColorScheme: (colorScheme: ColorScheme) => set({ colorScheme }),
    }),
    {
      name: 'global-settings-storage',
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          // Add migration logic here if needed
        }
        return persistedState;
      },
    }
  )
);
