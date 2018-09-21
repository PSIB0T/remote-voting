pragma solidity ^0.4.19;

import "./erc721.sol";
import "./Registration.sol";

contract Vote is ERC721, Registration {
    uint private tokenCount = 1;
    mapping (uint => address) private voteOwner;
    mapping (uint => address) private voteApprovals;

    function add() public returns (uint){
        require(validVoter(msg.sender),"Candidate not registered");
        require(voterMap[msg.sender].isVoted == false, "The voter has already voted");
        voterMap[msg.sender].tokenId = tokenCount;
        voteOwner[tokenCount] = msg.sender;
        tokenCount++;
        return tokenCount;
    }

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        require(validVoter(msg.sender),"Candidate not registered");
        return candidateMap[_owner].votes;
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        require(validVoter(msg.sender),"Candidate not registered");
        return voteOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        require(voterMap[_from].tokenId != 0, "The tokenId is not owned by this account");
        require(validVoter(msg.sender),"Voter not registered");
        candidateMap[_to].votes++;
        voteOwner[_tokenId] = _to;
        voterMap[_from].tokenId = 0;
        voterMap[_from].isVoted = true;
    }

    function transfer(address _to) public {
        require(validVoter(msg.sender),"Candidate not registered");
        _transfer(msg.sender, _to, voterMap[msg.sender].tokenId);
    }

    function approve(address _to) public {
        require(validVoter(msg.sender),"Candidate not registered");
        voteApprovals[voterMap[msg.sender].tokenId] = _to;
    }

    function takeOwnership(uint256 _tokenId) public {
        require(validVoter(msg.sender),"Candidate not registered");
        require(voteApprovals[_tokenId] == msg.sender, "Vote not approved");
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }    
}