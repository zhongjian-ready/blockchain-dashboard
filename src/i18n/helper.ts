import en_US from './dictionaries/en-US.json';

export type TranslationType = typeof en_US;

export enum LocaleEnum {
  EN_US = 'en-US',
  ZH_CN = 'zh-CN',
}

export const locales = Object.values(LocaleEnum);

export const defaultLocale = LocaleEnum.EN_US;
