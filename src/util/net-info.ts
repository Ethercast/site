export interface NetInfo {
  readonly networkId: number;
  readonly networkName: string;
  readonly apiUrl: string;
  readonly enabled: boolean;
  readonly etherscanUrl: string;
}

export interface NetInfoMapping {
  readonly [hostname: string]: NetInfo
}

const MAINNET: NetInfo = {
  networkId: 1,
  networkName: 'mainnet',
  apiUrl: 'https://api.ethercast.io',
  enabled: true,
  etherscanUrl: 'https://etherscan.io'
};

const ROPSTEN: NetInfo = {
  networkId: 3,
  networkName: 'ropsten',
  apiUrl: 'https://ropsten.api.ethercast.io',
  enabled: false,
  etherscanUrl: 'https://ropsten.etherscan.io'
};

const RINKEBY: NetInfo = {
  networkId: 4,
  networkName: 'rinkeby',
  apiUrl: 'https://rinkeby.api.ethercast.io',
  enabled: false,
  etherscanUrl: 'https://rinkeby.etherscan.io'
};

const KOVAN: NetInfo = {
  networkId: 42,
  networkName: 'kovan',
  apiUrl: 'https://kovan.api.ethercast.io',
  enabled: true,
  etherscanUrl: 'https://kovan.etherscan.io'
};

export const URL_MAPPING: NetInfoMapping = {
  'localhost:3000': KOVAN,
  'ropsten.ethercast.io': ROPSTEN,
  'kovan.ethercast.io': KOVAN,
  'rinkeby.ethercast.io': RINKEBY,
  'mainnet.ethercast.io': MAINNET,
  'ethercast.io': MAINNET
};

export const NETWORKS = {
  'Mainnet': MAINNET,
  'Ropsten': ROPSTEN,
  'Kovan': KOVAN,
  'Rinkeby': RINKEBY
};

export const netInfo: NetInfo | undefined = URL_MAPPING[ window.location.host.toLowerCase() ];