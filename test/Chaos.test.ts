import chai, { expect } from 'chai';
import asPromised from 'chai-as-promised';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { Chaos } from '../typechain';

chai.use(asPromised);

describe('Chaos', () => {
  let owner: Signer;
  let minter: Signer;
  let otherUser: Signer;
  let chaos: Chaos;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    minter = signers[1];
    otherUser = signers[2];

    const ChaosFactory = await ethers.getContractFactory('Chaos');
    chaos = (await ChaosFactory.deploy()) as Chaos;
    await chaos.deployed();
  });

  it('should have deployed correctly', async () => {
    const maxSupply = (await chaos.maxSupply()).toNumber();
    const name = await chaos.name();
    const symbol = await chaos.symbol();
    expect(maxSupply).to.eq(10000);
    expect(name).to.eq('CHAOS');
    expect(symbol).to.eq('CHAOS');
  });

  describe('#tokenURI', () => {
    it('should return the correct token URI', async () => {
      await chaos.mint(await minter.getAddress(), 'GOOD');
      await chaos.mint(await minter.getAddress(), 'BAD');

      expect(await chaos.tokenURI(0)).to.eq('GOOD');
      expect(await chaos.tokenURI(1)).to.eq('BAD');
    });
  });

  describe('#setMaxSupply', () => {
    it('should revert if not called by the owner', async () => {
      await expect(
        chaos.connect(otherUser).setMaxSupply(100000)
      ).eventually.rejectedWith('onlyOwner');
    });

    it('should revert if the new max supply is less than the current total supply', async () => {
      await chaos.mint(await minter.getAddress(), 'AAA');
      await expect(chaos.setMaxSupply(1)).eventually.rejectedWith(
        'must be greater than current total supply'
      );
    });

    it('should set the max supply', async () => {
      await chaos.setMaxSupply(99);

      const newMax = await chaos.maxSupply();
      expect(newMax.toNumber()).to.eq(99);
    });
  });

  describe('#setOwner', async () => {
    it('should only be callable by the owner', async () => {
      await expect(
        chaos.connect(otherUser).setOwner(await otherUser.getAddress())
      ).eventually.rejectedWith('onlyOwner');
    });

    it('should set the new owner', async () => {
      await chaos.setOwner(await otherUser.getAddress());

      expect(await chaos.owner()).to.eq(await otherUser.getAddress());
    });
  });

  describe('#mint', async () => {
    it('should mint a new token', async () => {
      const minterAddress = await minter.getAddress();
      await chaos.connect(minter).mint(minterAddress, 'aaaa');

      expect((await chaos.totalSupply()).toNumber()).to.eq(1);
      expect(
        (await chaos.tokenOfOwnerByIndex(minterAddress, 0)).toNumber()
      ).to.eq(0);
      expect((await chaos.tokenByIndex(0)).toNumber()).to.eq(0);
      expect(await chaos.tokenURI(0)).to.eq('aaaa');
      expect((await chaos.balanceOf(minterAddress)).toNumber()).to.eq(1);
      expect(await chaos.ownerOf(0)).to.eq(minterAddress);
    });

    it('should revert if the max supply has already been reached', async () => {
      await chaos.setMaxSupply(1);
      await chaos.connect(minter).mint(await minter.getAddress(), 'aaa');
      await expect(
        chaos.connect(minter).mint(await minter.getAddress(), 'aasd')
      ).eventually.rejectedWith('max supply reached');
    });
  });
});
