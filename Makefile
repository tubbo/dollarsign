all: clean test build docs

build: index.js

node_modules:
	@yarn install

clean:
	@rm -rf index.js docs

index.js: node_modules
	@node_modules/.bin/webpack --config config/webpack.js

docs: node_modules
	@node_modules/.bin/jsdoc src --out=./docs
