// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract RemoteVoting {

    struct Candidate {
        uint256 ID;
        string name;
        string party;
        string imageUrl;
    }

    modifier candidateExists(uint256 id) {
        require(id > 0, "Candidate doesn't exist");
        require(id <= candidateCount, "Candidate doesn't exist");
        _;
    }

        mapping(uint256 => Candidate) public IDtoCandidate;
        mapping(uint256 => uint256) public IDtoVotes;

        uint256 public totalVotes;
        uint256 public candidateCount;
        address owner;

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(uint256 ID, string calldata name, string calldata party, string calldata imageUrl) public {
        require(msg.sender == owner, "Not the owner");
        candidateCount++;
        Candidate memory person = Candidate({ ID: ID, name: name, party: party, imageUrl: imageUrl });
        IDtoCandidate[candidateCount] = person;
    }

    function vote(uint256 id) public candidateExists(id) {
        IDtoVotes[id]++;
        totalVotes++;
    }

    function removeCandidate(uint256 id) public candidateExists(id){
        require(msg.sender == owner, "Not the owner");
        delete IDtoCandidate[id];
        candidateCount--;
        IDtoVotes[id] = 0;
    }

    function viewVotes(uint256 id) public view candidateExists(id) returns (uint256) {
        return IDtoVotes[id];
    }


}