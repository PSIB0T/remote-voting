pragma solidity ^0.4.19;

contract Registration
{
    address[] public candidateList;
    function validCandidate(address candidate) public view returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
    
    function regCandidate() public {
        require(!validCandidate(msg.sender),"Already Registered");
        candidateList.push(msg.sender);
    }
    
    
}