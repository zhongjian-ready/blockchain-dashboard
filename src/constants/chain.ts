import { Chain } from '@/types';

export enum CategoryEnum {
  ALL = 'All',
  MAINNET = 'Mainnet',
  ETH_L2 = 'ETH L2',
  BTC_L2 = 'BTC L2',
  TESTNET = 'Testnet',
}

export enum SupportOptionsEnum {
  STAKE = 'stake',
  SWAP = 'swap',
  BRIDGE = 'bridge',
  REDEEM = 'redeem',
}

export enum SymbolEnum {
  NativeBTC = 'BTC',
  FBTC = 'FBTC',
  CBBTC = 'cbBTC', // Coinbase Wrapped BTC (cbBTC)
  WBTC = 'WBTC',
  MBTC = 'M-BTC',
  BTCBTC = 'BTC.BTC', // ZetaChain BTC
  BTCB = 'BTCB',
}

export enum SwapDepositSymbolEnum {
  USDT = 'USDT',
  USDC = 'USDC',
  DAI = 'DAI',
  NativeETH = 'ETH',
  BUSD = 'BUSD',
  UNIBTC = 'uniBTC',
}

export enum SiteSymbolEnum {
  Ignition = 'ignition',
  VelodromeUni = 'velodrome-uni',
  Pancakeswap = 'pancakeswap',
  PancakeswapUni = 'pancakeswap-uni',
  UniswapUni = 'uniswap-uni',
  Glowswap = 'glowswap',
  Macaron = 'macaron',
  Merlinswap = 'merlinswap',
  MerlinswapUni = 'merlinswap-uni',
  Bootnet = 'bootnet',
}

const INFURA_KEY = '98564e54b5914e1f87e7658d523217e5';
const ALCHEMY_KEY = 'RcUHTsyhnRAfj2z9n1lpu4MeVsTvGvkX';

/**
 * ----------------------------------------------
 *  List of supported chains
 *  ----------------------------------------------
 */

const HOMESTEAD: Chain<
  | SymbolEnum.FBTC
  | SymbolEnum.WBTC
  | SymbolEnum.CBBTC
  | SwapDepositSymbolEnum.DAI
  | SwapDepositSymbolEnum.NativeETH
  | SwapDepositSymbolEnum.USDC
  | SwapDepositSymbolEnum.USDT
> = {
  id: 1,
  network: 'homestead',
  name: 'Ethereum',
  category: CategoryEnum.MAINNET,
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        `https://eth.w3node.com/df4dc39d7db001dc94a244bba9365982021fb438873bcf76a829089eab2cb31f/api`,
        `https://mainnet.infura.io/v3/${INFURA_KEY}`, // fallback
        `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`, // fallback
      ],
      webSocket: [
        'wss://eth.w3node.com/df4dc39d7db001dc94a244bba9365982021fb438873bcf76a829089eab2cb31f/ws',
      ],
    },
    public: {
      http: [],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
  contracts: {
    [SymbolEnum.FBTC]: {
      address: '0xC96dE26018A54D51c097160568752c4E3BD6C364',
      swap: {
        url: 'https://fbtc.com/swap',
        description: 'Don’t have FBTC? Get it from official FBTC website!',
        siteName: 'ignition',
        siteSymbol: SiteSymbolEnum.Ignition,
      },
    },
    [SymbolEnum.WBTC]: {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      supportOptions: [SupportOptionsEnum.REDEEM],
    },
    [SymbolEnum.CBBTC]: {
      address: '0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf',
    },
    [SwapDepositSymbolEnum.USDT]: {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      supportOptions: [SupportOptionsEnum.SWAP],
    },
    [SwapDepositSymbolEnum.USDC]: {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      supportOptions: [SupportOptionsEnum.SWAP],
    },
    [SwapDepositSymbolEnum.DAI]: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      supportOptions: [SupportOptionsEnum.SWAP],
    },
    [SwapDepositSymbolEnum.NativeETH]: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      supportOptions: [SupportOptionsEnum.SWAP],
    },
    vault: {
      address: '0x047D41F2544B7F63A8e991aF2068a363d210d6Da',
    },
    uniBTC: {
      address: '0x004E9C3EF86bc1ca1f0bB5C7662861Ee93350568',
      swap: {
        url: 'https://app.uniswap.org/explore/pools/ethereum/0x3a32F5040Bc4d8417e78E236eb2C48c90e003FDa',
        // label: 'Get uniBTC',
        siteName: 'uniswap',
        siteSymbol: SiteSymbolEnum.UniswapUni,
      },
    },
    redeem: {
      address: '0xAA732c9c110A84d090a72da230eAe1E779f89246',
    },
  },
  rewardMultiples: 21,
  transferTokens: {
    chainSelector: '5009297550715157269',
    router: {
      address: '0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D',
      version: '1.2.0',
    },
    armProxy: {
      address: '0x411dE17f12D1A34ecC7F45f49844626267c75e81',
      version: '1.0.0',
    },
    deprecated_tokenPool: {
      address: '0xDE71a07e0619EEaDd7e6A3aeCf4E57E5d5e86f12',
      version: '1.5.0',
    },
    feeTokens: ['GHO', 'LINK', 'WETH', 'ETH'],
  },
};

export { HOMESTEAD };

export const supportedChains = [HOMESTEAD];
