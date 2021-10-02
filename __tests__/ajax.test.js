import { $ } from "../factory";
import { load } from "../ajax";

describe("ajax", () => {
  beforeEach(() => {
    $.fn.load = load;
  });

  afterEach(() => {
    document.write("");
  });

  test("load", async () => {
    document.write(`<div id="test" />`);

    await $("#test").load("http://example.com");
    await $("#test").load("http://example.com", "foo");

    expect($("#test").html()).toMatch("Example Domain");
  });
});
