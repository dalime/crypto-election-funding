import { use, expect } from 'chai';
import { solidity } from 'ethereum-waffle';
import pkg from 'hardhat';

const { ethers } = pkg;
use(solidity);
new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);

describe('PresidentialCrowdfunding', function () {
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

  it('Should accept donations, take a 3% fee, and update correctly', async function () {
    const donationAmount = ethers.utils.parseEther('1.0');
    const fee = donationAmount.mul(3).div(100); // Calculate fee
    const amountAfterFee = donationAmount.sub(fee); // Amount after fee

    // Address 1 sends 1 ETH to Trump
    await crowdfunding
      .connect(address1)
      .support('Trump', { value: donationAmount });

    expect(await crowdfunding.amountTrump()).to.equal(amountAfterFee);
    expect(await crowdfunding.numTrump()).to.equal(1);

    // Verify owner's balance increased by fee amount
    const ownerBalance = await ethers.provider.getBalance(owner.address);
    expect(ownerBalance).to.be.above(fee); // Should be at least the fee amount

    // Address 2 sends 2 ETH to Kamala
    const donationAmount2 = ethers.utils.parseEther('2.0');
    const fee2 = donationAmount2.mul(3).div(100);
    const amountAfterFee2 = donationAmount2.sub(fee2);

    await crowdfunding
      .connect(address2)
      .support('Kamala', { value: donationAmount2 });

    expect(await crowdfunding.amountKamala()).to.equal(amountAfterFee2);
    expect(await crowdfunding.numKamala()).to.equal(1);

    // Verify owner's balance increased again by the second fee amount
    const ownerBalanceAfterSecondDonation = await ethers.provider.getBalance(
      owner.address
    );
    expect(ownerBalanceAfterSecondDonation).to.be.above(ownerBalance.add(fee)); // Should have increased by the second fee amount

    // Should read the correct details
    const details = await crowdfunding.readDetails();

    expect(details.trumpAmount).to.equal(amountAfterFee);
    expect(details.trumpNum.toNumber()).to.equal(1);
    expect(details.kamalaAmount).to.equal(amountAfterFee2);
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
