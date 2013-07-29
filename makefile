ifdef SystemRoot
	WINDOWS = 1
endif

ifdef WINDOWS
	NODE = node
	NPM = npm
	BOWER = .\node_modules\.bin\bower.cmd
else
	UNAME_S := $(shell uname -s)
	ifeq ($(UNAME_S),Darwin)
		NODE = node
		NPM = npm
		BOWER = $(NODE) ./node_modules/.bin/bower
	else
		NODE = /opt/nodejs/v0.8/bin/node
		NPM = /opt/nodejs/v0.8/bin/npm
		BOWER = $(NODE) ./node_modules/.bin/bower
	endif
endif

NODE_ENV = production

install:
	@$(NPM) install
	@$(BOWER) install
test:
	karma start


.PHONY: install
