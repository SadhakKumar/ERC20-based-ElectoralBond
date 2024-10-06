const ElectoralBonds = artifacts.require("./ElectoralBond.sol");

module.exports = function (deployer) {
  deployer.deploy(
    ElectoralBonds,
    "Electoral Bonds Token",
    "EBT",
    "0xB274f3F61b04C0d04593Aa4e0c3A2CE67942AD2C"
  );
};
