import { ethers } from 'hardhat';

async function main() {
  const DisarrayFactory = await ethers.getContractFactory('Disarray');
  const disarray = await DisarrayFactory.deploy();
  console.log(
    'deploying disarray with tx hash ',
    disarray.deployTransaction.hash
  );

  await disarray.deployed();

  console.log('Disarray deployed to:', disarray.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
