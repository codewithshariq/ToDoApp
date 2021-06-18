const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiaspromised = require("chai-as-promised");
chai.use(chaiaspromised);

const TaskRepo = require("");

describe("TaskRepo test suit", function () {
  it("spy createConnection method of mongoose", function () {
    const spy = sinon.spy(mongooseConnection, "connectToDb");
    mongooseConnection.connectToDb();
    expect(spy.calledOnce).to.be.true;
  });
});
