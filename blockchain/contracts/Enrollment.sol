// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Enrollment{
    
    mapping (address => bool) public politicalParty;

    mapping (address => bool) public user;

    function EnrollAspoliticalParty() public {
        politicalParty[msg.sender] = true;
    }

    function EnrollAsUser() public {
        user[msg.sender] = true;
    }

    function IsPoliticalParty() public view returns(bool) {
        return politicalParty[msg.sender];
    }

    function IsUser() public view returns(bool) {
        return user[msg.sender];
     }
}