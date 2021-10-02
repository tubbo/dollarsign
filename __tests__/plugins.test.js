import { $ } from "../factory";

describe("plugins", () => {
  beforeEach(() => {
    document.write(`<div id="test" />`);
  });

  afterEach(() => {
    document.write("");
  });
  test("define and use plugin", () => {
    $.fn.foo = () => "bar";

    expect($("#test").foo()).toEqual("bar");
  });

  test("plugin not found", () => {
    $.fn.bogus = null;

    expect(() => {
      $("#test").bogus();
    }).toThrow(`Couldn't load plugin "bogus"`);
  });
});
