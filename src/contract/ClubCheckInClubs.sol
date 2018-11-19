pragma solidity ^0.4.24;

contract ClubCheckInClubs {

    uint256 public number;
    mapping(address => uint256) public clubs;

    constructor() public{
        number = 10000;
    }

    function add(address _club) public {
        require(clubs[_club] == 0);
        number = number + 1;
        clubs[_club] = number;
    }

}
