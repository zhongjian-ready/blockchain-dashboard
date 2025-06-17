import { ethers } from 'ethers';

const MAINNET_URL = // 'https://rpc.ankr.com/eth';
  // 'https://mainnet.infura.io/v3/14b69e87e4d242c8843896341ef56952';
  'https://eth-mainnet.g.alchemy.com/v2/oB9MmiNAkmhqDyn5QJXYByhUZZWbTDyk';
const HOLESKY_URL =
  'https://holesky.infura.io/v3/14b69e87e4d242c8843896341ef56952';

const providerETH = new ethers.JsonRpcProvider(MAINNET_URL);
const providerHolesky = new ethers.JsonRpcProvider(HOLESKY_URL);

const main = async () => {
  const balance = await providerETH.getBalance('vitalik.eth');
  console.log(`ETH balance: ${ethers.formatEther(balance)} ETH`);

  const balanceHolesky = await providerHolesky.getBalance(
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
  );
  console.log(`Holesky ETH balance: ${ethers.formatEther(balanceHolesky)} ETH`);

  const network = await providerETH.getNetwork();
  console.log(`ETH network: ${network.name}`);

  const blockNumber = await providerETH.getBlockNumber();
  console.log(`ETH blockNumber: ${blockNumber}`);

  // 转账不算交易
  const txCount = await providerETH.getTransactionCount(
    '0xe8A335a8502625Fb6c6e900a547694770D764484'
  );
  console.log(`ETH txCount: ${txCount}`);

  const feeData = await providerETH.getFeeData();
  console.log(`ETH feeData: ${JSON.stringify(feeData)}`);

  const block = await providerETH.getBlock(0);
  console.log(`ETH block: ${JSON.stringify(block)}`);

  // 获取的为合约部署代码
  const code = await providerETH.getCode(
    '0x2eC37d45FCAE65D9787ECf71dc85a444968f6646'
  );
  console.log(`ETH code: ${code}`);
};

main();
