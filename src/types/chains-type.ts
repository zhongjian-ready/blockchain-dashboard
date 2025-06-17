import {
  CategoryEnum,
  SwapDepositSymbolEnum,
  SymbolEnum,
} from '@/constants/chain';
import { ContractInterface } from 'ethers';

export type Address = `0x${string}`;

export type SupportOptionsType = 'stake' | 'swap' | 'bridge' | 'redeem';

export type ExternalUrl = {
  url: string;
  label?: string;
  description?: string;
  siteName?: string;
  siteSymbol?: string;
};

export type Contract = {
  address: Address;
  swap?: ExternalUrl;
  bridge?: ExternalUrl;
  blockCreated?: number;
  abi?: ContractInterface;
  supportOptions?: SupportOptionsType[];
};

export type TransferTokens = {
  destinations?: BaseChain[]; // supported chains
  chainSelector: string;
  router: {
    address: Address;
    version: string;
  };
  /**
   * @deprecated Use `tokenAdminRegistry` to retrieve the address
   */
  deprecated_tokenPool: {
    address: Address;
    version: string;
  };
  armProxy: {
    address: Address;
    version: string;
  };
  registryModule?: {
    address: Address;
    version: string;
  };
  tokenAdminRegistry?: {
    address: Address;
    version: string;
  };
  feeTokens: string[];
};

export type NativeCurrency = {
  name: string;
  /** 2-6 characters long */
  symbol: string;
  decimals: number;
};

export type RpcUrls = {
  http: readonly string[];
  webSocket?: readonly string[];
};

export type BlockExplorer = {
  name: string;
  url: string;
};

export type BaseChain = {
  /** ID in number form */
  id: number;
  /** Human-readable name */
  name: string;
  /** Internal network name */
  network: string;
  /**  Category of chain */
  category: CategoryEnum;
  /** Currency used by chain */
  nativeCurrency: NativeCurrency;
  /** Collection of RPC endpoints */
  rpcUrls: {
    [key: string]: RpcUrls;
    default: RpcUrls;
    public: RpcUrls;
  };
  /** Collection of block explorers */
  blockExplorers: {
    // [key: string]: BlockExplorer;
    // etherscan: BlockExplorer;
    default: BlockExplorer;
  };
  /** Flag for test networks */
  testnet?: boolean;
  /** Flag for Bitcoin Network */
  isNativeBTC?: boolean;
};

export type Chain<T extends SymbolEnum | SwapDepositSymbolEnum = never> =
  BaseChain & {
    contracts: {
      vault: Contract;
      uniBTC: Contract;
      redeem?: Contract;
    } & Record<T, Contract>;
    transferTokens?: TransferTokens;
    rewardMultiples?: number;
    asMainnet?: boolean;
  };
