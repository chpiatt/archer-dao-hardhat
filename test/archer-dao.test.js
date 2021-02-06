const { ethers } = require("hardhat");

describe("Archer DAO", function() {
  it("Impersonate account(s)", async function () {
    // the original address provided in the sample scrit throws `revert Prism::setPendingProxyImp: caller must be admin`
    // below code gets the actual admin address to impersonate so that `setPendingProxyImplementation` can pass
    const vppAddress = '0x000100bB517E0c003200502A822083000a3B005d'; // contract address
    const accountToImpersonate = '0x13d5b8fc84f73fc5a0a5832aa8373044371314d3'

    // need to fund the accountToImpersonate with some eth
    const minerAccount = '0x04668ec2f57cc15c381b461b9fedab5d451c8f7f';
    await ethers.provider.send('hardhat_impersonateAccount', [minerAccount]); // get some eth from a miner
    const miner = await ethers.provider.getSigner(minerAccount);
    const resp = await miner.sendTransaction({
      to: accountToImpersonate,
      value: ethers.utils.parseEther('1.0'),
    });
    console.log('funded from miner account, @ blocknum:', resp.blockNumber);
    

    await ethers.provider.send('hardhat_impersonateAccount', [accountToImpersonate]);
    const admin = await ethers.provider.getSigner(accountToImpersonate);
    const VotingPowerPrism = await ethers.getContractAt('VotingPowerPrism', vppAddress, admin);
    await VotingPowerPrism.connect(admin).setPendingProxyImplementation(accountToImpersonate);
    console.log('I THINK I DID SMTH :)');
  });
});
