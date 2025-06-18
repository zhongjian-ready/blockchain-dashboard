import { LocaleSwitcher } from '@/components/display/local-switcher';
import { ThemeSwitcher } from '@/components/display/theme-switcher';
import { Menu } from '../menu';

export function Header() {
  return (
    <div>
      <Menu />
      <ThemeSwitcher />
      <LocaleSwitcher />
    </div>
  );
}
