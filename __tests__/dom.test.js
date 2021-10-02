import { $ } from "../factory";
import { attr, html, text, find, closest } from "../dom";

describe("dom", () => {
  beforeEach(() => {
    $.fn.attr = attr;
    $.fn.html = html;
    $.fn.text = text;
    $.fn.find = find;
    $.fn.closest = closest;
  });

  afterEach(() => {
    document.write("");
  });

  test("attr", () => {
    document.write(`<div class="test" />`);

    expect($(".test").attr("foo", "bar").attr("foo")).toEqual("bar");
  });

  test("html", () => {
    document.write(`<p id="html" /><strong>foo</strong></p>`);

    expect($("#html").html()).toMatch("<strong>foo</strong>");
    expect($("#html").html("<em>html</em>").html()).toEqual("<em>html</em>");
  });

  test("text", () => {
    document.write(`<p id="text" />foo</p>`);

    expect($("#text").text()).toEqual("foo");
    expect($("#text").text("bar").text()).toEqual("bar");
  });

  describe("traversal", () => {
    beforeEach(() => {
      document.write(`<div id="parent"><div id="child" /></div>`);
    });

    test("find", () => {
      expect($("#parent").find("#child").attr("id")).toEqual("child");
    });

    test("closest", () => {
      expect($("#child").closest("#parent").attr("id")).toEqual("parent");
    });
  });
});
