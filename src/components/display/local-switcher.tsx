'use client';

import { bgDialog } from '@/constants/styles';
import {
  LocaleEnum,
  useGlobalSettingsStore,
} from '@/contexts/use-global-settings-store';
import { locales } from '@/i18n/helper';
import { useTranslationSWR } from '@/i18n/use-translation';
import { cn } from '@/lib/utils';
import { Globe, Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function LocaleSwitcher() {
  const locale = useGlobalSettingsStore(state => state.locale);
  const setLocale = useGlobalSettingsStore(state => state.setLocale);

  const { isLoading } = useTranslationSWR();

  const onLocaleChange = useCallback(
    (locale: string) => {
      setLocale(locale as LocaleEnum);
    },
    [setLocale]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="w-10 h-10 rounded-lg flex-shrink-0 text-white bg-slate-800 hover:bg-slate-700 transition focus-visible:[box-shadow:none]"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Globe className="w-5 h-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={6}
        className={cn(bgDialog, '!w-[12.5rem] rounded-lg p-2')}
      >
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={onLocaleChange}
          className="flex flex-col gap-2"
        >
          {locales.map(locale => (
            <DropdownMenuRadioItem
              key={locale}
              value={locale}
              className="text-base py-2 bg-[#ECF1FE] dark:bg-black dark:hover:bg-opacity-30 transition rounded-xl"
            >
              <LocaleDisplayName locale={locale} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LocaleDisplayName({ locale }: { locale: LocaleEnum }) {
  switch (locale) {
    case LocaleEnum.EN_US:
      return <>English</>;
    case LocaleEnum.ZH_CN:
      return <>简体中文</>;
    default:
      return <>{locale}</>;
  }
}
