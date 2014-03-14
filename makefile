ifdef SystemRootre
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
		BOWER = $(NODE) ../node_modules/.bin/bower
	else
		NODE = node
		NPM = npm
		BOWER = $(NODE) ../node_modules/.bin/bower
	endif
endif

NODE_ENV = production

install:
	@$(NPM) install
	@(cd ./configs && $(BOWER) install)
test:
	@(cd ./configs && karma start)
update:
	@$(NPM) update
	@(cd ./configs && $(BOWER) update)
list:
	@$(NPM) list
	@(cd ./configs && $(BOWER) list)
release:
	@$(NODE) ./build/build.js
	@$(NODE) ./build/r.js -o ./build/config.js logLevel=4
	@$(NODE) ./build/link.js set
unrelease:
	@$(NODE) ./build/link.js reset

.PHONY: install
