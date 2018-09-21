pragma solidity ^0.4.19;

contract Registration
{
    struct Voter {
        string name;
        uint tokenId;
        bool isVoted;
    }

    struct Candidate {
        Voter voter;
        uint votes;
    }

    address[] public voters;
    mapping (address => Voter) voterMap;
    mapping (address => Candidate) candidateMap;

    function validVoter(address voter) public view returns (bool) {
        for(uint i = 0; i < voters.length; i++) {
            if (voters[i] == voter) {
                return true;
            }
        }
        return false;
    }
    
    function getVoter(address voterAddress) public view returns (string, uint, bool) {
        Voter memory voter = voterMap[voterAddress];
        return (voter.name, voter.tokenId, voter.isVoted);
    }

    function regVoter(string name) public {
        require(!validVoter(msg.sender),"Already Registered");
        voters.push(msg.sender);
        voterMap[msg.sender] = Voter(name, 0, false);
    }

    function regCandidate() public {
        require(validVoter(msg.sender),"Voter not registered");
        candidateMap[msg.sender] = Candidate(voterMap[msg.sender], 0);
    }
}