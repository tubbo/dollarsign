import $ from "../";

describe("Dollarsign", () => {
  beforeEach(() => {
    document.write(`<div id="test" /><div class="test" /><div class="test" />`);
  });

  test("elements", () => {
    expect($("#test").elements).toHaveLength(1);
  });

  test("length", () => {
    expect($(".test")).toHaveLength(2);
  });

  test("each", () => {
    const iterator = jest.fn();

    $(".test").each(iterator);

    expect(iterator).toHaveBeenCalledOnce();
  });

  test("events", () => {
    const handler = jest.fn();
    const element = $(".test");

    element.on("click", handler);

    expect(element.events.click).toEqual(handler);

    element.off("click", handler);

    expect(element.events.click).not.toBeDefined();

    element.fire("click");

    expect(handler).toHaveBeenCalledOnce();
  });

  test("css", () => {
    $(".test").css("color", "#ff0000");

    expect($("#test").css("color")).toEqual("#ff0000");
  });

  test("attr", () => {
    $(".test").attr("foo", "bar");

    expect($("#test").attr("foo")).toEqual("bar");
  });

  test("classes", () => {
    expect($(".test").hasClass("test")).toBe(true);

    $(".test").addClass("foo");

    expect($(".test").hasClass("foo")).toBe(true);

    $(".test").removeClass("foo");

    expect($(".test").hasClass("foo")).toBe(false);
  });
});
