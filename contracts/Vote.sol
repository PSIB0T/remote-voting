pragma solidity ^0.4.19;

import "./erc721.sol";

contract Vote is ERC721 {
    uint private tokenCount = 0;
    mapping (uint => address) private voteOwner;
    mapping (address => uint) private voteCount;
    mapping (uint => address) private voteApprovals;

    function add() public returns (uint){
        voteOwner[tokenCount] = msg.sender;
        voteCount[msg.sender] = 1;
        tokenCount++;
        return tokenCount;
    }

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return voteCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return voteOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        voteCount[_to]++;
        voteCount[_from]--;
        voteOwner[_tokenId] = _to;
    }

    function transfer(address _to, uint256 _tokenId) public {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public {
        voteApprovals[_tokenId] = _to;
    }

    function takeOwnership(uint256 _tokenId) public {
        require(voteApprovals[_tokenId] == msg.sender, "Vote not approved");
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }    
}