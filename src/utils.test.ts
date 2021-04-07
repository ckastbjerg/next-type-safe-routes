import { getRoute, getPathname } from "./utils";

describe("utils/getRoute", () => {
  it("works as expected for basic routes", () => {
    expect(getRoute("/routes")).toBe("/routes");
  });

  it("works as expected when having (untyped) query params", () => {
    expect(getRoute({ route: "/routes", query: { a: "b", 1: 2 } })).toBe(
      "/routes?1=2&a=b"
    );
  });

  it("works as expected for dynamic routes", () => {
    const route = getRoute({
      route: "/routes/[routeId]",
      params: { routeId: 1 },
    });
    expect(route).toBe("/routes/1");
  });

  it("works as expected when having (untyped) query params for dynamic routes", () => {
    const route = getRoute({
      route: "/routes/[routeId]",
      params: { routeId: 1 },
      query: { a: "b" },
    });
    expect(route).toBe("/routes/1?a=b");
  });
});

describe("utils/getPathname", () => {
  it("works as expected for basic routes", () => {
    expect(getPathname("/routes")).toBe("/routes");
  });

  it("works as expected for dynamic routes", () => {
    const route = getPathname({
      route: "/routes/[routeId]",
      params: { routeId: 1 },
    });
    expect(route).toBe("/routes/[routeId]");
  });
});
