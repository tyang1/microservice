const server = require("./server");
const should = require("should");

describe("Server", () => {
  it("should require a port to start", () => {
    let result = server.start({
      repo: {},
    });
    return should(result).be.rejectedWith(/port/);
  });

  it("should require a repository to start", () => {
    let result = server.start({
      port: {},
    });
    return should(result).be.rejectedWith(/repo/);
  });
});
