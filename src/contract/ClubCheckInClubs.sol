pragma solidity ^0.4.24;

contract ClubCheckInClubs {

    uint256 public number;
    mapping(address => bool) public clubs;
    mapping(uint256 => address) public clubsInfo;

    constructor() public{
        number = 10000;
    }

    function add(address _club) public {
        require(!clubs[_club]);
        number = number + 1;
        clubsInfo[number] = _club;
    }

}
