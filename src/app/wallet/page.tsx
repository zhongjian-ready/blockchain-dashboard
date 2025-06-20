'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { parseEther } from 'viem';
import {
  useAccount,
  useBalance,
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

// ERC20 ABI (简化版)
const ERC20_ABI = [
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const;

export default function Home() {
  // 1. 钱包连接状态
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  // 2. 查询 ETH 余额
  const { data: ethBalance } = useBalance({ address });

  // 3. 代币转账配置
  const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Mainnet USDT
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  // 4. 合约写入
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();

  // 5. 交易状态跟踪
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // 提交交易
  const handleTransfer = () => {
    writeContract({
      address: USDT_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [toAddress as `0x${string}`, parseEther(amount)],
    });
  };

  // 查询 USDT 余额
  const {
    data: balance,
    isLoading,
    isError,
  } = useBalance({
    address,
    token: '0x55d398326f99059fF775485246999027B3197955', // BSC 上的 USDT 地址
    chainId: 56, // 明确指定 BSC 链
  });

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Wagmi DApp Demo</h1>
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="space-y-4">
          {/* 账户信息 */}
          <div className="card bg-base-100 p-4 shadow">
            <h2 className="text-lg font-semibold">账户信息</h2>
            <p>地址: {address}</p>
            <p>当前链ID: {chainId}</p>
            <p>
              余额: {ethBalance?.formatted} {ethBalance?.symbol}
            </p>
          </div>

          <div className="card bg-base-100 p-4 shadow">
            <div>
              <h2 className="text-lg font-semibold">USDT 余额</h2>
              {isLoading ? (
                <div className="loading">加载中...</div>
              ) : isError ? (
                <div className="text-error">查询失败</div>
              ) : (
                <>
                  <p>
                    余额: {balance?.formatted} {balance?.symbol}
                  </p>
                  <p className="text-sm opacity-70">
                    原始值: {balance?.value.toString()} 最小单位
                  </p>
                </>
              )}
            </div>
            <h2 className="text-lg font-semibold mb-2">USDT 转账</h2>
            <input
              type="text"
              placeholder="接收地址 0x..."
              className="input input-bordered w-full mb-2"
              value={toAddress}
              onChange={e => setToAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="金额"
              className="input input-bordered w-full mb-2"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button
              onClick={handleTransfer}
              disabled={isPending}
              className="btn btn-primary w-full"
            >
              {isPending ? '发送中...' : '转账'}
            </button>

            {/* 交易状态反馈 */}
            {hash && <p className="mt-2">交易哈希: {hash}</p>}
            {isConfirming && <p>等待交易确认...</p>}
            {isConfirmed && <p className="text-success">交易成功!</p>}
            {writeError && (
              <p className="text-error">
                错误: {writeError.shortMessage || writeError.message}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
