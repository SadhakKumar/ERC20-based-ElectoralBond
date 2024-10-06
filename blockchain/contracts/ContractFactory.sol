// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ElectoralBond.sol";

contract  ContractFactory {

    struct token{
        string name;
        string symbol;
        address tokenAddress;
    }

    mapping(address => token) private contractsById;
    address[] private contractAddresses;

    function getContractAddress(address creatorAddress) public view returns(address){
        return contractsById[creatorAddress].tokenAddress;
    }

    function createNewERC(string memory name, string memory symbol) public returns (address) {

        // Create a new instance of the "ChildContract" contract and return its address
        address creatorAddress = msg.sender;
        ElectoralBond newChildContract = new ElectoralBond(name,symbol,creatorAddress);

        contractsById[msg.sender] = token(name, symbol, address(newChildContract)); 
        contractAddresses.push(msg.sender);
        return address(newChildContract);

    }

    function getAllContractsDetails() public view returns (token[] memory) {
        token[] memory allContracts = new token[](contractAddresses.length);
        for(uint i = 0; i < contractAddresses.length; i++) {
            allContracts[i] = contractsById[contractAddresses[i]];
        }
        return allContracts;
    }

}