import { $ } from "../factory";
import { map, reduce } from "../enumeration";
import { attr } from "../dom";

describe("enumeration", () => {
  beforeEach(() => {
    $.fn.map = map;
    $.fn.reduce = reduce;
    $.fn.attr = attr;

    document.write(
      `<div id="one" class="test" /><div id="two" class="test" />`
    );
  });

  afterEach(() => {
    document.write("");
  });

  test("map", () => {
    const ids = $(".test").map((element) => $(element).attr("id"));

    expect(ids).toEqual(["one", "two"]);
  });

  test("reduce", () => {
    const reduced = $(".test").reduce((element, accumulator) => {
      if (accumulator) {
        accumulator = `${accumulator} and ${$(element).attr("id")}`;
      } else {
        accumulator = $(element).attr("id");
      }

      return accumulator;
    }, "");

    expect(reduced).toEqual("one and two");
  });
});
