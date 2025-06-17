import dotenv from 'dotenv';
import { ethers } from 'ethers';

// 加载.env文件中的变量
dotenv.config();

const ALCHEMY_URL = `https://eth-holesky.g.alchemy.com/v2/${process.env.ALCHEEMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);

// 创建随机的wallet对象
const wallet1 = ethers.Wallet.createRandom();
const WalletWithProvider = wallet1.connect(provider);
const mnemonic = wallet1.mnemonic;

// 通过私钥创建wallet对象
const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// 通过助记词创建wallet对象
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase); // fromMnemonic(mnemonic.phrase);

const main = async () => {
  console.log(`wallet1 address: ${wallet1.address}`);
  console.log(`wallet2 address: ${wallet2.address}`);
  console.log(`wallet3 address: ${wallet3.address}`);

  console.log(`wallet1 mnemonic: ${wallet1.mnemonic.phrase}`);

  console.log(`wallet1 privateKey: ${wallet1.privateKey}`);
  console.log(`wallet2 privateKey: ${wallet2.privateKey}`);
  console.log(`wallet3 privateKey: ${wallet3.privateKey}`);

  // 获取链上交易次数
  const txCount1 = await provider.getTransactionCount(WalletWithProvider);
  const txCount2 = await provider.getTransactionCount(wallet2);

  console.log(`wallet1 txCount: ${txCount1}`);
  console.log(`wallet2 txCount: ${txCount2}`);

  const balance1 = await provider.getBalance(wallet1.address);
  console.log(`wallet1 balance: ${ethers.formatEther(balance1)}`);

  const balance2 = await provider.getBalance(wallet2.address);
  console.log(`wallet2 balance: ${ethers.formatEther(balance2)}`);

  const balance3 = await provider.getBalance(wallet3.address);
  console.log(`wallet3 balance: ${ethers.formatEther(balance3)}`);

  const tx = {
    to: wallet1.getAddress(),
    value: ethers.parseEther('0.0001'),
  };

  const txResponse = await wallet2.sendTransaction(tx);
  console.log(`txResponse: ${JSON.stringify(txResponse)}`);

  const receipt = await txResponse.wait();
  console.log(`receipt: ${JSON.stringify(receipt)}`);

  const balance1After = await provider.getBalance(wallet1.address);
  console.log(`wallet1 balance after: ${ethers.formatEther(balance1After)}`);

  const balance2After = await provider.getBalance(wallet2.address);
  console.log(`wallet2 balance after: ${ethers.formatEther(balance2After)}`);
};

main();
