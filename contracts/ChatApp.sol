// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract ChatApp{

    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    //contiene tutti gli utenti
    struct AllUserStruck{
        string name;
        address accountAddress;
    }
    AllUserStruck[] getAllUsers;

    mapping(address => user ) userList; //ad ogni utente è associato un indirizzo
    mapping(bytes32 => message[]) allMessages; //map  messaggi tra utenti

    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length> 0;
    }

    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User alredy exist");
        require(bytes(name).length >0 , "username cannot be empty");

        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not register");
        return userList[pubkey].name;
    }    

    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(msg.sender != friend_key, "cannot add themselves as friend");
        require(checkAlredyFriends(msg.sender, friend_key) == false, "these users are alredy friend");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function checkAlredyFriends(address pubkey1, address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2 ) return  true;
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //funzione per avere la chat, quindi identifico i messaggi da visualizzare
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkUserExists(msg.sender), "create account first");
        require(checkUserExists(friend_key), "user is not registered");
        require(checkAlredyFriends(msg.sender, friend_key), "you are not friend");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    function readMessage(address friend_key) external view  returns (message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }
}