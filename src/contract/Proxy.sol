pragma solidity ^0.4.24;

import "./ClubCheckInControl.sol";
import "./ClubCheckInData.sol";

contract ClubPlayer {
    function getPlayerAddress(address _address) view public returns (address);

    function joinClub(address player, address clubAddress) public;
}

contract Proxy {

    address public clubDataAddress;
    address public clubControlAddress;

    ClubCheckInControl clubControl;
    ClubCheckInData clubData;

    constructor (address clubsAddress, address tokenAddress, address playAddress, string _ClubName, string _ClubDescribe, uint256 _reportLimit, uint256 _singleBonus, uint256 _punishBonus, uint256 _supportBonus) public{
        require(bytes(_ClubName).length > 0 && bytes(_ClubName).length <= 30);
        require(bytes(_ClubDescribe).length > 0 && bytes(_ClubDescribe).length <= 540);

        ClubPlayer clubPlayer = ClubPlayer(playAddress);
        require(clubPlayer.getPlayerAddress(msg.sender) == msg.sender);

        clubDataAddress = new ClubCheckInData(tokenAddress);
        clubControlAddress = new ClubCheckInControl(clubsAddress, clubDataAddress, playAddress);

        clubData = ClubCheckInData(clubDataAddress);
        clubData.setClubName(_ClubName);
        clubData.setClubDescribe(_ClubDescribe);
        clubData.setReportLimit(_reportLimit);
        clubData.setSingleBonus(_singleBonus);
        clubData.setPunishBonus(_punishBonus);
        clubData.setSupportBonus(_supportBonus);
        clubData.setRound(1);
        clubData.addMember(msg.sender);
        clubData.setOwner(msg.sender);
        clubData.changeAccess(clubControlAddress);

        clubPlayer.joinClub(msg.sender, clubDataAddress);
    }
}
