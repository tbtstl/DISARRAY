import chai, { expect } from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { Disarray } from '../typechain';

chai.use(asPromised);

describe('Disarray', () => {
  let owner: Signer;
  let minter: Signer;
  let otherUser: Signer;
  let disarray: Disarray;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    minter = signers[1];
    otherUser = signers[2];

    const DisarrayFactory = await ethers.getContractFactory('Disarray');
    disarray = (await DisarrayFactory.deploy()) as Disarray;
    await disarray.deployed();
  });

  it('should have deployed correctly', async () => {
    const maxSupply = (await disarray.maxSupply()).toNumber();
    const name = await disarray.name();
    const symbol = await disarray.symbol();
    expect(maxSupply).to.eq(10000);
    expect(name).to.eq('DISARRAY');
    expect(symbol).to.eq('DISARRAY');
  });

  describe('#tokenURI', () => {
    it('should return the correct token URI', async () => {
      await disarray.mint(await minter.getAddress(), 'GOOD');
      await disarray.mint(await minter.getAddress(), 'BAD');

      expect(await disarray.tokenURI(0)).to.eq('GOOD');
      expect(await disarray.tokenURI(1)).to.eq('BAD');
    });
  });

  describe('#setMaxSupply', () => {
    it('should revert if not called by the owner', async () => {
      await expect(
        disarray.connect(otherUser).setMaxSupply(100000)
      ).eventually.rejectedWith('onlyOwner');
    });

    it('should revert if the new max supply is less than the current total supply', async () => {
      await disarray.mint(await minter.getAddress(), 'AAA');
      await expect(disarray.setMaxSupply(1)).eventually.rejectedWith(
        'must be greater than current total supply'
      );
    });

    it('should set the max supply', async () => {
      await disarray.setMaxSupply(99);

      const newMax = await disarray.maxSupply();
      expect(newMax.toNumber()).to.eq(99);
    });
  });

  describe('#setOwner', async () => {
    it('should only be callable by the owner', async () => {
      await expect(
        disarray.connect(otherUser).setOwner(await otherUser.getAddress())
      ).eventually.rejectedWith('onlyOwner');
    });

    it('should set the new owner', async () => {
      await disarray.setOwner(await otherUser.getAddress());

      expect(await disarray.owner()).to.eq(await otherUser.getAddress());
    });
  });

  describe('#mint', async () => {
    it('should mint a new token', async () => {
      const minterAddress = await minter.getAddress();
      await disarray.connect(minter).mint(minterAddress, 'aaaa');

      expect((await disarray.totalSupply()).toNumber()).to.eq(1);
      expect(
        (await disarray.tokenOfOwnerByIndex(minterAddress, 0)).toNumber()
      ).to.eq(0);
      expect((await disarray.tokenByIndex(0)).toNumber()).to.eq(0);
      expect(await disarray.tokenURI(0)).to.eq('aaaa');
      expect((await disarray.balanceOf(minterAddress)).toNumber()).to.eq(1);
      expect(await disarray.ownerOf(0)).to.eq(minterAddress);
    });

    it('should revert if the max supply has already been reached', async () => {
      await disarray.setMaxSupply(1);
      await disarray.connect(minter).mint(await minter.getAddress(), 'aaa');
      await expect(
        disarray.connect(minter).mint(await minter.getAddress(), 'aasd')
      ).eventually.rejectedWith('max supply reached');
    });
  });
});
