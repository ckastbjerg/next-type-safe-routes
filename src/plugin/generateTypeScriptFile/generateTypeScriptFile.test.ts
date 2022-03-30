import generateTypeScriptFile from "./index";

describe("plugin/generateTypeScriptFile", () => {
  it("works as expected", () => {
    const pagesDir = __dirname + "/mocks/pages";
    expect(generateTypeScriptFile(pagesDir)).toMatchSnapshot();
  });
  it("works for projects not using API routes", () => {
    const pagesDir = __dirname + "/mocks/pages-no-api-routes";
    expect(generateTypeScriptFile(pagesDir)).toMatchSnapshot();
  });
});
