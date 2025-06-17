import { ethers } from 'ethers';

const provider = ethers.getDefaultProvider();
const main = async () => {
  const balance = await provider.getBalance('vitalik.eth'); // ENS域名，ethers.js会自动解析
  console.log(`ETH balance: ${ethers.formatEther(balance)} ETH`);
  console.log(`ETH balance: ${ethers.formatUnits(balance, 18)} ETH`);
};

main();
