// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expect } = require("chai");
import { ethers } from "hardhat";

describe("SwiggEventManager", function () {
  let swiggEventManager: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Deploy the SwiggEventManager contract before each test
    const SwiggEventManager = await ethers.getContractFactory("SwiggEventManager");
    swiggEventManager = await SwiggEventManager.deploy();
    await swiggEventManager.deployed();

    // Get signers from ethers provider
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should create an event", async function () {
    // Call the createEvent function
    await swiggEventManager.createEvent("Event name", 100, "Event description");

    // Get the event details
    const eventDetails = await swiggEventManager.getEventDetails(0);

    // Check if the event was created with the correct details
    expect(eventDetails[0]).to.equal("Event name");
    expect(eventDetails[1]).to.equal(100);
    expect(eventDetails[2]).to.equal("Event description");
    expect(eventDetails[3]).to.equal(owner.address);
  });

  it("Should buy a ticket", async function () {
    // Create an event
    await swiggEventManager.createEvent("Event name", 100, "Event description");

    // Buy a ticket for the event
    await swiggEventManager.connect(addr1).buyTicket(0, { value: 100 });

    // Check if the ticket was purchased successfully
    const allowedToAttend = await swiggEventManager.isAllowedToAttend(0, addr1.address);
    expect(allowedToAttend).to.be.true;
  });

  it("Should add address to whitelist", async function () {
    // Create an event
    await swiggEventManager.createEvent("Event name", 100, "Event description");

    // Add address to whitelist
    await swiggEventManager.addToWhitelist(0, addr1.address);

    // Check if the address was added to the whitelist
    const isAllowed = await swiggEventManager.isAllowedToAttend(0, addr1.address);
    expect(isAllowed).to.be.true;
  });

  it("Should transfer event ownership", async function () {
    // Create an event
    await swiggEventManager.createEvent("Event name", 100, "Event description");

    // Transfer event ownership to addr1
    await swiggEventManager.transferEventOwnership(0, addr1.address);

    // Check if the event ownership was transferred successfully
    const eventOwner = await swiggEventManager.getEventOwner(0);
    expect(eventOwner).to.equal(addr1.address);
  });

  it("Should withdraw pending withdrawals", async function () {
    // Create an event
    await swiggEventManager.createEvent("Event name", 100, "Event description");

    // Buy a ticket for the event
    await swiggEventManager.connect(addr1).buyTicket(0, { value: 100 });

    // Pause the contract
    await swiggEventManager.pause();

    // Withdraw pending withdrawals
    await swiggEventManager.connect(addr1).withdraw();

    // Check if the pending withdrawal was withdrawn successfully
    const pendingWithdrawals = await swiggEventManager.pendingWithdrawals(addr1.address);
    expect(pendingWithdrawals).to.equal(0);
  });

  it("Should pause and unpause the contract", async function () {
    // Pause the contract
    await swiggEventManager.pause();

    // Check if the contract is paused
    const isPaused = await swiggEventManager.paused();
    expect(isPaused).to.be.true;

    // Unpause the contract
    await swiggEventManager.unpause();

    // Check if the contract is unpaused
    const isUnpaused = await swiggEventManager.paused();
    expect(isUnpaused).to.be.false;
  });
});
