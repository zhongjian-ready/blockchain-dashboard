import { Translation } from '@/i18n';

export default function Page() {
  return (
    <div className="dark:bg-black">
      <Translation path="global.appName" />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to your dashboard!</p>
    </div>
  );
}
