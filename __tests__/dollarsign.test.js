import $ from "../";

describe("Dollarsign", () => {
  beforeEach(() => {
    document.write(
      `<div id="test" /></div><div class="test" /><div class="test" /><div id="parent"><div id="child" /></div><div id="html"><strong>foo</strong></div><div id="text">foo</div>`
    );
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

    expect(iterator).toHaveBeenCalled();
  });

  test("events", () => {
    const handler = jest.fn();
    const element = $(".test");

    element.on("click", handler);

    expect(element.events.click).toEqual(handler);

    element.fire("click");

    expect(handler).toHaveBeenCalled();

    element.off("click", handler);

    expect(element.events.click).not.toBeDefined();
  });

  test("css", () => {
    const element = $(".test");

    element.css("color", "#ff0000");

    expect(element.css("color")).toEqual("rgb(255, 0, 0)");
  });

  test("attr", () => {
    const element = $(".test");

    element.attr("foo", "bar");

    expect(element.attr("foo")).toEqual("bar");
  });

  test("classes", () => {
    expect($(".test").hasClass("test")).toBe(true);

    $(".test").addClass("foo");

    expect($(".test").hasClass("foo")).toBe(true);

    $(".test").removeClass("foo");

    expect($(".test").hasClass("foo")).toBe(false);
  });

  test("content", () => {
    expect($("#html").html()).toEqual("<strong>foo</strong>");
  });

  test("traversal", () => {
    const parent = $("#parent");
    const child = $("#child");

    expect(parent.find("#child").attr("id")).toEqual("child");
    expect(child.closest("#parent").attr("id")).toEqual("parent");
  });
});
