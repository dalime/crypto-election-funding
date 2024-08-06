import hre from 'hardhat';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  const trumpAddress = process.env.TRUMP_ADDRESS;
  const kamalaAddress = process.env.KAMALA_ADDRESS;
  console.log('Trump address:', trumpAddress);
  console.log('Kamala address:', kamalaAddress);

  if (trumpAddress === undefined || kamalaAddress === undefined) {
    throw new Error('Missing addresses');
  }

  const Contract = await hre.ethers.getContractFactory(
    'PresidentialCrowdfunding'
  );
  const contract = await Contract.deploy(trumpAddress, kamalaAddress);

  await contract.deployed();
  console.log('Contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
