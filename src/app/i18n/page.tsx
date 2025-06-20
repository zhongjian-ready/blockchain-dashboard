'use client';

import { Translation, useTranslation } from '@/i18n';

export default function Page() {
  const translation = useTranslation();
  return (
    <div className="dark:bg-black flex flex-col gap-2">
      <h1 className="text-2xl font-bold">i18n Demo</h1>
      <div className="flex flex-col gap-2">
        <Translation path="global.appName" />
        <div>{translation.global.welcomeMessage}</div>
        <div>
          <Translation
            path={'global.num'}
            params={{
              num: 1214,
            }}
          />
        </div>
        <div>
          <Translation
            path={'global.walletAddress'}
            components={{
              WalletAddress: () => (
                <span className="text-blue-500 font-bold">{1234567890}</span>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
