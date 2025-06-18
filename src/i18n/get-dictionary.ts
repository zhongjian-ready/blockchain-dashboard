import { defaultsDeep } from 'lodash';
import en_US from './dictionaries/en-US.json';
import { LocaleEnum, locales, TranslationType } from './helper';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type Dictionaries = Record<
  LocaleEnum,
  () => Promise<RecursivePartial<TranslationType>>
>;

const dictionaries = Object.fromEntries(
  locales.map(locale => [
    locale,
    async () => (await import(`./dictionaries/${locale}.json`)).default,
  ])
) as Dictionaries;

export { en_US };

export const getDictionary = async (locale: LocaleEnum | null) => {
  if (
    locale != null &&
    locale != LocaleEnum.EN_US &&
    dictionaries[locale] != null
  ) {
    const translation = await dictionaries[locale]();
    return defaultsDeep(translation, en_US) as TranslationType;
  }
  return en_US;
};
