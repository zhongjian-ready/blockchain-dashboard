'use client';

import { useGlobalSettingsStore } from '@/contexts/use-global-settings-store';
import { ethers } from 'ethers';
import { get, GetFieldType, PropertyPath } from 'lodash';
import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import { en_US, getDictionary } from './get-dictionary';
import { LocaleEnum, TranslationType } from './helper';

export function useTranslationSWR() {
  const locale = useGlobalSettingsStore(state => state.locale);
  return useSWRImmutable(
    [locale, ethers.id('use-translation')],
    ([locale]: [LocaleEnum]) => getDictionary(locale)
  );
}

export function useTranslation<TObject extends TranslationType>(): TObject;
export function useTranslation<
  TObject extends TranslationType,
  TPath extends string
>(path: TPath): string extends TPath ? unknown : GetFieldType<TObject, TPath>;
export function useTranslation<
  TObject extends TranslationType,
  TKey extends keyof TObject
>(path: TKey | [TKey]): TObject[TKey];
export function useTranslation<
  TObject extends TranslationType,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1]
>(path: [TKey1, TKey2]): TObject[TKey1][TKey2];
export function useTranslation<
  TObject extends TranslationType,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2]
>(path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3];

export function useTranslation(path?: PropertyPath) {
  const { data } = useTranslationSWR();
  const translation = data ?? en_US;
  return useMemo(() => {
    if (path != null) {
      return get(translation, path);
    } else {
      return translation;
    }
  }, [translation, path]);
}
