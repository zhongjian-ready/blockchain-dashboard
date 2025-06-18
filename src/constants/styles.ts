import { cn } from '@/lib/utils';

export const bgGradient =
  'bg-gradient-to-r from-[#D762B8] via-[#806DEA] to-[#67B4F3]';

export const bgGradientDark =
  'bg-gradient-to-r from-[#D762B8]/40 via-[#806DEA]/40 to-[#67B4F3]/40';
export const bgGradientSlanted =
  'bg-gradient-to-br from-[#080F22] via-[#0B152E] to-[#5741BC]';
export const textGradient = cn('bg-clip-text text-transparent', bgGradient);
export const bgNetwork =
  'bg-network-500 hover:bg-network-600 active:bg-network-800';
export const bgDialog = 'bg-[#fafbff] dark:bg-[#162131]';
export const currentDialog = 'text-[#fafbff] dark:text-[#162131]';
