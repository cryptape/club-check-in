pragma solidity ^0.4.24;

contract ClubCheckInData {
    struct Message {
        string imgUrl;
        string text;
        address[] supports;
        address[] reports;
        address author;
        uint256 id;
        bool punished;
    }

    struct Rounds {
        uint256 totalBonus;
        uint256 totalToken;
    }

    //admin of the control contract for which the data contract serves
    //admin has no special permission to modify data, while it is possible for admin to modify data through control contract
    address public owner;
    address public controlAddress;
    string public clubName;
    string public clubDesc;
    uint256 public reportLimit;

    //list of members
    address[] public members;
    //list to show if the address is registered
    mapping(address => bool) public signUps;

    //(round => (memberAddr => bonus))
    mapping(uint256 => mapping(address => uint256)) public memberBonus;

    //round number auto-increment
    uint256 public round;

    uint256 public eventSize;

    //(round => roundInfo)
    mapping(uint256 => Rounds) public history;

    //(round => Ids checkin events)
    mapping(uint256 => uint256[]) public checkinEventIds;

    //(round => (checkin event id => checkin event message))
    mapping(uint256 => mapping(uint256 => Message)) public checkinEvents;

    //points for a checkinEvent
    uint256 public singleBonus;

    //punish for a report
    uint256 public punishBonus;

    //points for a suppport
    uint256 public supportBonus;

    //erc20 token contract address
    address public tokenAddress;

    constructor (address _tokenAddress) public {
        controlAddress = msg.sender;
        owner = msg.sender;
        tokenAddress = _tokenAddress;
        eventSize = 0;
    }

    modifier platform() {
        require(controlAddress == msg.sender);
        _;
    }

    //change the control contract address
    function changeAccess(address _address)
    public
    platform
    {
        controlAddress = _address;
    }

    function setOwner(address newOwner)
    public
    platform
    {
        owner = newOwner;
    }

    function setClubName(string name)
    public
    platform
    {
        clubName = name;
    }

    function setClubDescribe(string describe)
    public
    platform
    {
        clubDesc = describe;
    }

    function setReportLimit(uint256 _reportLimit)
    public
    platform
    {
        reportLimit = _reportLimit;
    }

    function setRound(uint256 _round)
    public
    platform
    {
        round = _round;
    }

    function setEventSize(uint _eventSize) 
        public 
        platform
    {
        eventSize = _eventSize;
    }

    function setSingleBonus(uint256 bonus)
    public
    platform
    {
        singleBonus = bonus;
    }

    function setPunishBonus(uint256 bonus)
    public
    platform
    {
        punishBonus = bonus;
    }

    function setSupportBonus(uint256 bonus)
    public
    platform
    {
        supportBonus = bonus;
    }

    function setMemberBonus(address _address, uint256 bonus)
    public
    platform
    {
        memberBonus[round][_address] = bonus;
    }

    function getCurrentEventByRound(uint256 roundToSearch) 
        public 
        view 
        returns (uint256[])
    {
        return checkinEventIds[roundToSearch];
    }

    //funcs to manipulate members
    function addMember(address _player)
    public
    platform
    {
        members.push(_player);
        signUps[_player] = true;
    }

    function removeMember(address _player)
    public
    platform
    {
        signUps[_player] = false;
    }

    function deleteMember()
    public
    platform
    {
        delete members;
    }

    function addCheckinEventId(uint256 id)
    public
    platform
    {
        checkinEventIds[round].push(id);
        eventSize = eventSize + 1;
    }

    function addCheckinEvent(address author, string text, string imgUrl, uint256 time)
    public
    platform
    {
        checkinEvents[round][time].author = author;
        checkinEvents[round][time].text = text;
        checkinEvents[round][time].imgUrl = imgUrl;
        checkinEvents[round][time].id = time;
        checkinEvents[round][time].punished = false;
    }

    function supportEvent(uint256 id, address _address)
    public
    platform
    {
        checkinEvents[round][id].supports.push(_address);
    }

    function reportEvent(uint256 id, address _address)
    public
    platform
    {
        checkinEvents[round][id].reports.push(_address);
    }

    function punish(uint256 id)
    public
    platform
    {
        checkinEvents[round][id].punished = true;
    }

    function addHistory(uint256 totalBonus, uint256 totalToken)
    public
    platform
    {
        history[round].totalBonus = totalBonus;
        history[round].totalToken = totalToken;
    }

    function getEventImg(uint256 _round, uint256 id)
    public
    view
    returns (string)
    {
        return checkinEvents[_round][id].imgUrl;
    }

    function getEventText(uint256 _round, uint256 id)
    public
    view
    returns (string)
    {
        return checkinEvents[_round][id].text;
    }

    function getEventSupports(uint256 _round, uint256 id)
    public
    view
    returns (address[])
    {
        return checkinEvents[_round][id].supports;
    }

    function getEventReports(uint256 _round, uint256 id)
    public
    view
    returns (address[])
    {
        return checkinEvents[_round][id].reports;
    }

    function getEventPunishState(uint256 _round, uint256 id)
    public
    view
    platform
    returns (bool)
    {
        return checkinEvents[_round][id].punished;
    }

    function getEventAuthor(uint256 _round, uint256 id)
    public
    view
    returns (address)
    {
        return checkinEvents[_round][id].author;
    }

    function getEventId(uint256 _round, uint256 id)
    public
    view
    returns (uint256)
    {
        return checkinEvents[_round][id].id;
    }

    function getHistoryBonus(uint256 _round)
    public
    view
    returns (uint256)
    {
        return history[_round].totalBonus;
    }

    function getHistoryToken(uint256 _round)
    public
    view
    returns (uint256)
    {
        return history[_round].totalToken;
    }

    function getMemberBonus(uint256 _round, address _address)
    public
    view
    returns (uint256)
    {
        return memberBonus[_round][_address];
    }

    function getMemberLength()
    public
    view
    returns (uint256)
    {
        return members.length;
    }

    function getMembers()
    public
    view
    returns (address[])
    {
        return members;
    }

    function getCheckinEventIdsLength()
    public
    view
    returns (uint256)
    {
        return checkinEventIds[round].length;
    }
}
