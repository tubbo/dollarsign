import { $ } from "../factory";
import { on, off, fire } from "../events";

describe("events", () => {
  beforeEach(() => {
    $.fn.on = on;
    $.fn.off = off;
    $.fn.fire = fire;

    document.write(`<div id="test" />`);
  });

  afterEach(() => {
    document.write("");
  });

  test("on", () => {
    const handler = jest.fn();
    const element = $("#test");

    element.on("click", handler);

    expect(element.events.click).toEqual(handler);
  });

  test("fire", () => {
    const handler = jest.fn();
    const element = $("#test");

    element.on("click", handler);
    element.fire("click");

    expect(handler).toHaveBeenCalled();
  });

  test("off", () => {
    const handler = jest.fn();
    const element = $("#test");

    element.on("click", handler);
    element.off("click", handler);

    expect(element.events.click).not.toBeDefined();
  });
});
