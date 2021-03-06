ifdef SystemRootre # Windows
	NODE = node
	NPM = npm
	BOWER = .\node_modules\.bin\bower.cmd
else
	UNAME_S := $(shell uname -s)
	NODE = node
	NPM = npm
	BOWER = $(NODE) ../node_modules/.bin/bower
endif

NODE_ENV = production

install:
	@if [ -e "node_modules" ]; then mv ./node_modules ./configs/node_modules; fi
	@(cd ./configs && $(NPM) install)
	@if [ -e "./configs/node_modules" ]; then mv ./configs/node_modules ./node_modules; fi
	@(cd ./configs && $(BOWER) install)
test:
	@(cd ./configs && karma start)
docs:
	@(jsdoc -c bower_components/dexter-docs/jsdoc.json ./README.md)
release: | config
	@(cd ./bower_components/dexter-core/build/ && $(NODE) ./build.js)
	@$(NODE) ./bower_components/dexter-core/build/r.js -o ./configs/dXBuild.min.js logLevel=1
	@$(NODE) ./bower_components/dexter-core/build/link.js set
	@rm ./configs/dXBuild.min.js
unrelease:
	@$(NODE) ./bower_components/dexter-core/build/link.js reset
config:
	@(cd ./bower_components/dexter-core/build/ && $(NODE) ./config.js)



.PHONY: install docs release unrelease viewlist