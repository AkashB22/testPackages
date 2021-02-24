const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require('axios');

const getUser = require("./app").getUser;
let axiosGet;

describe("Get User tests", () => {
  beforeEach(() => {
      axiosGet = sinon.stub(axios, 'get')
        .resolves({id:1, name: "The Octocat", company: "GitHub", location: "San Francisco"});
  });

  it("Get a user by username", () => {
    return getUser("octoca").then((response) => {
      //expect an object back
      expect(typeof response).to.equal("object");

      //Test result of name, company and location for the response
      expect(response.name).to.equal("The Octocat");
      expect(response.company).to.equal("GitHub");
      expect(response.location).to.equal("San Francisco");
        sinon.assert.calledOnce(axiosGet);
        sinon.assert.calledWith(axiosGet, "https://api.github.com/users/octoca");
      
    });
  });

  afterEach(()=>{
    axiosGet.restore();
  })
});


