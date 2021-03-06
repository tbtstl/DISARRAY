import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'tsconfig-paths/register';
import dotenv from 'dotenv';

const d = dotenv.config();
const env = d.parsed;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.5',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

if (process.env.NODE_ENV === 'development') {
  config.networks = {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: env?.RINKEBY_NETWORK_URL || ' ',
      accounts: [`0x${env?.RINKEBY_PRIVATE_KEY}`],
    },
    mainnet: {
      url: env?.MAINNET_NETWORK_URL || ' ',
      accounts: [`0x${env?.MAINNET_PRIVATE_KEY}`],
    },
  };
}

export default config;
