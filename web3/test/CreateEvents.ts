// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expect } = require("chai");
import { ethers } from "hardhat";

describe("EventCreation", function () {
  it("Should create a new event", async function () {
    const EventCreation = await ethers.getContractFactory("SwiggEvent");
    const eventCreation = await EventCreation.deploy();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await eventCreation.deployed();

    const tx = await eventCreation.createEvent("Test Event", "Description", Date.now() + 1000000, "15:00", "Virtual", 100, 0);
    await tx.wait();

    const eventDetails = await eventCreation.getEventDetails(1);

    expect(eventDetails.name).to.equal("Test Event");
  });
});
