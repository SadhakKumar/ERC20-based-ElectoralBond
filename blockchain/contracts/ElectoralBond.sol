// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ElectoralBond {
    
    address private owner;
    mapping (address => uint256) private balances;
    address[] private totalDonators;

    string private name;
    string private symbol; 

    constructor(string memory _name, string memory _symbol, address _owner) {
        owner = _owner;
        balances[_owner] = 1000000000;
        name = _name;
        symbol = _symbol;
        totalDonators.push(_owner);
    }


    function getName () public view returns (string memory) {
        return name;
    }

    function getSymbol () public view returns (string memory) {
        return symbol;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 value) private returns (bool) {
        require(balances[owner] >= value, "Insufficient balance");
        balances[owner] -= value;
        balances[to] += value;
        return true;
    }


    function mint(uint256 value) public {
        require(msg.sender == owner, "Only owner can mint");
        balances[owner] += value;
    }

    function buyToken(uint256 value) public payable{
        require(balances[owner] >= value, "Insufficient Tokens");
        // require(msg.value == value * 10, "Incorrect value");
        payable(owner).transfer(msg.value);
        if(balances[msg.sender] == 0) {
            totalDonators.push(msg.sender);
        }
        balances[msg.sender] += value;
        balances[owner] -= value;
    }

    function getAllDonations() public view returns (address[] memory, uint256[] memory) {
        
        address[] memory addresses = new address[](totalDonators.length);
        uint256[] memory values = new uint256[](totalDonators.length);
        for(uint i = 0; i < totalDonators.length; i++) {
            addresses[i] = totalDonators[i];
            values[i] = balances[totalDonators[i]];
        }

        return (addresses, values);
    }
    
}
