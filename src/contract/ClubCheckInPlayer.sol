pragma solidity ^0.4.24;

contract ClubData {
    function clubName() public pure returns (string) {}
}

contract ClubCheckInPlayer {

    struct Player {
        address playerAddress;
        string name;
        string icon;
        address[] clubs;
        mapping(address => bool) isJoin;
    }

    mapping(address => Player) public players;

    uint256 public size;

    function setName(string name) 
        public 
    {
        require(players[msg.sender].playerAddress == msg.sender);
        players[msg.sender].name = name;
    }

    function setIcon(string icon) 
        public 
    {
        require(players[msg.sender].playerAddress == msg.sender);
        players[msg.sender].icon = icon;
    }

    function signIn(string name, string icon) 
        public 
    {
        require(players[msg.sender].playerAddress != msg.sender);
        require(bytes(name).length > 0 && bytes(name).length <= 30);
        players[msg.sender].playerAddress = msg.sender;
        players[msg.sender].name = name;
        players[msg.sender].icon = icon;
        size = size + 1;
    }

    function joinClub(address player, address clubAddress) 
        public 
    {
        ClubData data = ClubData(clubAddress);
        require(bytes(data.clubName()).length > 0);
        require(!players[player].isJoin[clubAddress]);
        bool isJoined = false;
        for (uint256 i = 0; i < players[player].clubs.length; i++) {
            if (players[player].isJoin[players[player].clubs[i]])
                isJoined = true;
        }
        if (!isJoined)
            players[player].clubs.push(clubAddress);
        players[player].isJoin[clubAddress] = true;
    }

    function exitClub(address clubAddress) 
        private 
    {
        require(players[msg.sender].isJoin[clubAddress]);
        players[msg.sender].isJoin[clubAddress] = false;
    }

    function getPlayerAddress(address _address) 
        view 
        public 
        returns (address)
    {
        return players[_address].playerAddress;
    }
}
