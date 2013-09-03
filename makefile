ifdef SystemRoot
	WINDOWS = 1
endif

ifdef WINDOWS
	NODE = node
	NPM = npm
	BOWER = .\node_modules\.bin\bower.cmd
	CLEARTMP =
else
	UNAME_S := $(shell uname -s)
	ifeq ($(UNAME_S),Darwin)
		NODE = node
		NPM = npm
		BOWER = $(NODE) ./node_modules/.bin/bower
		CLEARTMP =
	else
		NODE = /opt/nodejs/v0.8/bin/node
		NPM = /opt/nodejs/v0.8/bin/npm
		BOWER = $(NODE) ./node_modules/.bin/bower
		CLEARTMP = sudo rm -rf /tmp/bower
	endif
endif

NODE_ENV = production

install:
	@$(CLEARTMP)
	@$(NPM) install
	@$(BOWER) install
test:
	karma start
update:
	@$(NPM) update
	@$(BOWER) update
list:
	@$(NPM) list
	@$(BOWER) list
deploy:
	@$(NODE) ./build/r.js -o ./build/build.js

.PHONY: install
