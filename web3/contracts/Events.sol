pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SwiggEventManager is Ownable, Pausable {
    struct SwiggEvent {
        string name;
        uint256 ticketPrice;
        string description;
        address eventOwner;
    }

    mapping(uint256 => SwiggEvent) public events;
    uint256 public eventCount;
    mapping(uint256 => mapping(address => bool)) public paidTickets;
    mapping(uint256 => mapping(address => bool)) public whitelist;
    mapping(uint256 => uint256) public eventFees;
    mapping(address => uint256) public pendingWithdrawals;

    function createEvent(string memory _name, uint256 _ticketPrice, string memory _description) public whenNotPaused {
        events[eventCount] = SwiggEvent(_name, _ticketPrice, _description, msg.sender);
        eventCount++;
    }
    
    function buyTicket(uint256 _eventId) public payable whenNotPaused {
        require(_eventId < eventCount, "Invalid event ID");
        
        SwiggEvent storage swiggEvent = events[_eventId];
        require(swiggEvent.ticketPrice == msg.value, "Incorrect ticket price");
        require(swiggEvent.eventOwner != address(0), "Event owner not set");
        paidTickets[_eventId][msg.sender] = true;
        
        // Calculate and add fee amount to eventFees
        uint256 feeAmount = (swiggEvent.ticketPrice * 5) / 1000; // 0.5% fee
        eventFees[_eventId] += feeAmount;
        // Add fee amount to pendingWithdrawals of contract Owner
        pendingWithdrawals[owner()] += feeAmount;
    }

    function addToWhitelist(uint256 _eventId, address _address) public {
        require(_eventId < eventCount, "Invalid event ID");
        
        SwiggEvent storage swiggEvent = events[_eventId];
        require(swiggEvent.eventOwner == msg.sender, "Only event owner can add to whitelist");
        
        whitelist[_eventId][_address] = true;
    }


    function isAllowedToAttend(uint256 _eventId, address _address) public view returns (bool) {
        return paidTickets[_eventId][_address] || whitelist[_eventId][_address];
    }
    
    function getEventOwner(uint256 _eventId) public view returns (address) {
        require(_eventId < eventCount, "Invalid event ID");
        
        SwiggEvent storage swiggEvent = events[_eventId];
        return swiggEvent.eventOwner;
    }
    
    function transferEventOwnership(uint256 _eventId, address _newOwner) public onlyOwner {
        require(_eventId < eventCount, "Invalid event ID");
        require(_newOwner != address(0), "Invalid new owner address");
        
        SwiggEvent storage swiggEvent = events[_eventId];
        swiggEvent.eventOwner = _newOwner;
    }
    
    function withdraw() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No pending withdrawals");
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function getEventDetails(uint256 _eventId) public view returns (string memory, uint256, string memory, address) {
        require(_eventId < eventCount, "Invalid event ID");
        
        SwiggEvent storage swiggEvent = events[_eventId];
        return (swiggEvent.name, swiggEvent.ticketPrice, swiggEvent.description, swiggEvent.eventOwner);
    }
    
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
}
