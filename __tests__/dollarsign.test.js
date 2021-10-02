import { $ } from "../factory";

describe("Dollarsign", () => {
  beforeEach(() => {
    document.write(`<div id="test" />`);
  });

  afterEach(() => {
    document.write("");
  });

  test("elements", () => {
    expect($("#test").elements).toHaveLength(1);
  });

  test("length", () => {
    document.write(`<div class="test" /><div class="test" />`);

    expect($(".test")).toHaveLength(2);
  });

  test("each", () => {
    document.write(`<div class="test" /><div class="test" />`);

    const iterator = jest.fn();

    $(".test").each(iterator);

    expect(iterator).toHaveBeenCalled();
  });

  test("plugins", () => {
    $.fn.foo = () => "bar";

    expect($("#test").foo()).toEqual("bar");
  });

  test("toString", () => {
    expect($("#test").toString()).toEqual("[object Dollarsign]");
  });
});
