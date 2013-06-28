ifdef SystemRoot
	WINDOWS = 1
endif

ifdef WINDOWS
	NODE = node
	NPM = npm
	BOWER = .\node_modules\.bin\bower.cmd
	INSTALLSH =
else
	UNAME_S := $(shell uname -s)
	ifeq ($(UNAME_S),Darwin)
		NODE = node
		NPM = npm
		BOWER = $(NODE) ./node_modules/.bin/bower
		INSTALLSH =
	else
		NODE = /opt/nodejs/v0.8/bin/node
		NPM = /opt/nodejs/v0.8/bin/npm
		BOWER = $(NODE) ./node_modules/.bin/bower
		INSTALLSH = ./install.sh
	endif
endif

NODE_ENV = production

install:
	@$(NPM) install
	@$(BOWER) install
	@$(INSTALLSH)
test:
	karma start


.PHONY: install
