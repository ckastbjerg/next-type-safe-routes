import generateTypeScriptFile from "./index";

const pagesDir = __dirname + "/mocks/pages";

describe("plugin/generateTypeScriptFile", () => {
  it("works as expected", () => {
    expect(generateTypeScriptFile(pagesDir)).toMatchSnapshot();
  });
});
