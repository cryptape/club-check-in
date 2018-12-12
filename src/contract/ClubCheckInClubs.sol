pragma solidity ^0.4.24;

/**
* the contract is to store all club information and relied by contract data and control.
**/

contract ClubCheckInClubs {

    //number is self-increment club Id which starts from 1000
    uint256 public number;

    //check if the club registered
    mapping(address => bool) public clubs;

    //club id => club address
    mapping(uint256 => address) public clubsInfo;

    //club address => club id
    mapping(address => uint256) public clubsIds; 

    constructor() public {
        number = 10000;
    }

    //add a club address 
    function add(address _club) public {
        require(!clubs[_club]);
        number = number + 1;
        clubsInfo[number] = _club;
        clubsIds[_club] = number;
        clubs[_club] = true;
    }
}
