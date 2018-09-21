pragma solidity ^0.4.0;
contract Login
{
 
    
  
    address[] public candidateList;
    validateCandidate(msg.sender);
    function validCandidate(address candidate) public view returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
    
     function checkLogin(address candidate) public 
     {
         require(validCandidate(candidate),"Not Registered");
     }
    
    function regCandidate(address candidate)
    {
         require(!validCandidate(candidate),"Already Registered");
         candidateList.push(candidate);
    }
    
    
}