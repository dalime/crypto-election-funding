import { use, expect } from 'chai';
import { solidity } from "ethereum-waffle";
import pkg from 'hardhat';

const { ethers } = pkg;
use(solidity);
new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);

describe('Crowdfunding', function () {
  let Crowdfunding;
  let crowdfunding;
  let owner;
  let address1;
  let address2;

  beforeEach(async function () {
    Crowdfunding = await ethers.getContractFactory('PresidentialCrowdfunding');
    [owner, address1, address2] = await ethers.getSigners();
    crowdfunding = await Crowdfunding.deploy(
      address1.address,
      address2.address
    );
    await crowdfunding.deployed();
  });

  it('Should initialize the correct wallet addresses', async function () {
    expect(await crowdfunding.readWalletAddress('Trump')).to.equal(
      address1.address
    );
    expect(await crowdfunding.readWalletAddress('Kamala')).to.equal(
      address2.address
    );
  });

  it('Should accept donations and update correctly', async function () {
    // Address 1 sends 1 ETH to Trump
    await crowdfunding
      .connect(address1)
      .support('Trump', { value: ethers.utils.parseEther('1.0') });
    expect(await crowdfunding.amountTrump()).to.equal(
      ethers.utils.parseEther('1.0')
    );
    expect(await crowdfunding.numTrump()).to.equal(1);

    // Address 2 sends 1 ETH to Kamala
    await crowdfunding
      .connect(address2)
      .support('Kamala', { value: ethers.utils.parseEther('2.0') });
    expect(await crowdfunding.amountKamala()).to.equal(
      ethers.utils.parseEther('2.0')
    );
    expect(await crowdfunding.numKamala()).to.equal(1);


    // Should read the correct details
    const details = await crowdfunding.readDetails();

    expect(details.trumpAmount).to.equal(ethers.utils.parseEther('1.0'));
    expect(details.trumpNum.toNumber()).to.equal(1);
    expect(details.kamalaAmount).to.equal(ethers.utils.parseEther('2.0'));
    expect(details.kamalaNum.toNumber()).to.equal(1);
  });

  it('Should only allow owner to update wallet addresses', async function () {
    // Should fail if trying to update wallet address by non-owner
    await expect(
      crowdfunding
        .connect(address1)
        .updateWalletAddress('Trump', address2.address)
    ).to.be.revertedWith('Only the owner can call this function.');

    // Should succeed if owner updates wallet address
    await crowdfunding
      .connect(owner)
      .updateWalletAddress('Trump', address2.address);
    expect(await crowdfunding.readWalletAddress('Trump')).to.equal(
      address2.address
    );
  });
});
