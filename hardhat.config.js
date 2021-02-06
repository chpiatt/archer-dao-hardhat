require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const FORK_URL = process.env.FORK_URL
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.4",
  networks: {
    hardhat: {
      chainId: 1,
      forking: {
        url: FORK_URL,
        blockNumber: parseInt(FORK_BLOCK_NUMBER)
      }
    },
    localhost: {
      chainId: 1,
      url: 'http://localhost:8545',
      live: false,
      saveDeployments: true,
      accounts: [DEPLOYER_PRIVATE_KEY], // Issue is here
      forking: {
        url: FORK_URL,
        blockNumber: parseInt(FORK_BLOCK_NUMBER)
      }
    }
  }
};

