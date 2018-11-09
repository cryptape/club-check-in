pragma solidity ^0.4.24;

contract ClubCheckInClubs {

    uint256 public number;
    mapping(address => uint256) public clubs;

    constructor() public{
        number = 10000;
    }

    function add() public {
        require(clubs[msg.sender] == 0);
        number = number + 1;
        clubs[msg.sender] = number;
    }

}
