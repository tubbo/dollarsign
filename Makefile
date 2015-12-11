SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)
PKG = $(LIB:lib/%.js=pkg/%.js)

all: clean lib pkg doc

clean:
	@rm -rf lib pkg doc

node_modules:
	@npm install

lib: $(LIB)
lib/%.js: node_modules src/%.js
	@mkdir -p $(@D)
	@babel $< -o $@

pkg: $(PKG)
pkg/%.min.js: node_modules lib/%.js
	@mkdir -p $(@D)
	@cat txt/preamble.txt > $@
	@uglifyjs %< >> $@

doc: node_modules lib
	@mkdir -p doc
	@jsdoc

.PHONY: all clean
