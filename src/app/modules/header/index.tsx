import { LocaleSwitcher } from '@/components/display/local-switcher';
import { ThemeSwitcher } from '@/components/display/theme-switcher';
import { Menu } from '../menu';

export function Header() {
  return (
    <div className="flex justify-between items-center bg-slate-50 dark:bg-black px-4 py-2 shadow-sm">
      <Menu />
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </div>
  );
}
