import { css, hasClass, addClass, removeClass, toggleClass } from "../css";
import { $ } from "../factory";

describe("css", () => {
  beforeEach(() => {
    $.fn.css = css;
    $.fn.hasClass = hasClass;
    $.fn.addClass = addClass;
    $.fn.removeClass = removeClass;
    $.fn.toggleClass = toggleClass;
    document.write(`<div id="test" class="test" style="color: red" />`);
  });

  afterEach(() => {
    document.write("");
  });

  test("get", () => {
    expect($("#test").css("color")).toEqual("red");
  });

  test("set", () => {
    expect($("#test").css("color", "#ff0000").css("color")).toEqual(
      "rgb(255, 0, 0)"
    );
  });

  test("hasClass", () => {
    expect($("#test").hasClass("test")).toBe(true);
    expect($("#test").hasClass("bogus")).toBe(false);
  });

  test("addClass", () => {
    expect($("#test").addClass("foo").hasClass("foo")).toBe(true);
  });

  test("removeClass", () => {
    expect($("#test").removeClass("foo").hasClass("foo")).toBe(false);
  });

  test("toggleClass", () => {
    expect($("#test").toggleClass("bar").hasClass("bar")).toBe(true);
    expect($("#test").toggleClass("bar").hasClass("bar")).toBe(false);
  });
});
