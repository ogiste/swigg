// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;9ok,l0   

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SwiggEvent is ERC1155, Ownable, Pausable {

    struct Event {
        string name;
        string description;
        uint date; // Timestamp
        uint time; // 24 hour format
        string venue; // Can specify if virtual or physical
        uint capacity;
        uint price; // 0 indicates a free event
        bool isActive; // if false, the event has been canceled or completed
    }

    mapping(uint => Event) public events;
    uint public eventCounter = 0;

    event NewEvent(uint eventId, string name, uint date, uint time, string venue);

    constructor() ERC1155("https://myapi.com/api/token/{id}.json") {}

    function createEvent(
        string memory _name,
        string memory _description,
        uint _date,
        uint _time,
        string memory _venue,
        uint _capacity,
        uint _price
    ) external onlyOwner whenNotPaused returns(uint) {
        eventCounter++;

        events[eventCounter] = Event({
            name: _name,
            description: _description,
            date: _date,
            time: _time,
            venue: _venue,
            capacity: _capacity,
            price: _price,
            isActive: true
        });

        _mint(msg.sender, eventCounter, _capacity, "");

        emit NewEvent(eventCounter, _name, _date, _time, _venue);
        return eventCounter;
    }

    function getEventDetails(uint _eventId) external view returns (Event memory) {
        return events[_eventId];
    }

    function buyTicket(uint _eventId, uint _amount) external payable whenNotPaused {
        require(events[_eventId].isActive, "Event is not active");
        require(events[_eventId].price * _amount == msg.value, "Incorrect Ether sent");
        require(balanceOf(msg.sender, _eventId) + _amount <= events[_eventId].capacity, "Exceeds available tickets");

        _safeTransferFrom(owner(), msg.sender, _eventId, _amount, "");
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal override whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
