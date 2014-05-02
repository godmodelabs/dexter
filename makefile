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
	@(cd ./configs && $(NPM) install)
	@(mv ./configs/node_modules ./node_modules)
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
