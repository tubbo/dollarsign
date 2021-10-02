import $ from "../";

describe("default build", () => {
  test("all functionality in place", () => {
    const element = $(document);

    expect(element).toHaveProperty("on");
    expect(element).toHaveProperty("off");
    expect(element).toHaveProperty("fire");
    expect(element).toHaveProperty("css");
    expect(element).toHaveProperty("hasClass");
    expect(element).toHaveProperty("addClass");
    expect(element).toHaveProperty("removeClass");
    expect(element).toHaveProperty("toggleClass");
    expect(element).toHaveProperty("html");
    expect(element).toHaveProperty("text");
    expect(element).toHaveProperty("attr");
    expect(element).toHaveProperty("find");
    expect(element).toHaveProperty("closest");
    expect(element).toHaveProperty("map");
    expect(element).toHaveProperty("reduce");
  });
});
