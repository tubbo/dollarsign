import { $ } from "../factory";
import { load, serialize } from "../ajax";

describe("ajax", () => {
  beforeEach(() => {
    $.fn.load = load;
    $.fn.serialize = serialize;
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

  test("serialize", () => {
    document.write(`<form id="test"><input name="foo" value="bar" /></form>`);

    expect($("#test").serialize()).toEqual("foo=bar");
  });
});
