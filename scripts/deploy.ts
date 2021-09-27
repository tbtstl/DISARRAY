import { ethers } from 'hardhat';

async function main() {
  const ChaosFactory = await ethers.getContractFactory('Chaos');
  const chaos = await ChaosFactory.deploy();
  console.log('deploying chaos with tx hash ', chaos.deployTransaction.hash);

  await chaos.deployed();

  console.log('Chaos deployed to:', chaos.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
