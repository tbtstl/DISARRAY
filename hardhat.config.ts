import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'tsconfig-paths/register';

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
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

export default config;
