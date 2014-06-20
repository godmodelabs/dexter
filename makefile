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
release: | viewlist
	@$(NODE) ./bower_components/dexter-core/build/build.js
	@$(NODE) ./bower_components/dexter-core/build/r.js -o ./configs/dXBuild.min.js logLevel=4
	@$(NODE) ./bower_components/dexter-core/build/link.js set
unrelease:
	@$(NODE) ./bower_components/dexter-core/build/link.js reset
viewlist:
	@$(NODE) ./bower_components/dexter-core/build/viewlist.js

.PHONY: install docs release unrelease viewlist