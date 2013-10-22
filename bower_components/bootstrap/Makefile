BOOTSTRAP = ./docs/assets/css/bootstrap.css
BOOTSTRAP_LESS = ./less/bootstrap.less
BOOTSTRAP_RESPONSIVE = ./docs/assets/css/bootstrap-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less/responsive.less
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
export PATH=$PATH:/bin:/usr/bin:/sbin:/usr/sbin:/usr/local/bin:/usr/local/sbin
all:
	make clean
	make curapps

#
# CLEAN ASSETS DIR
#
clean:
	-rm -rf assets


curapps:
	@echo "\n${HR}"
	@echo "Building bootstrap for curapps"
	@echo "${HR}\n"
	mkdir -p assets/img
	mkdir -p assets/css
	mkdir -p assets/js
	mkdir -p assets/font
	cp js/jquery.js assets/js/
	cp js/retina.js assets/js/
	cp js/less-1.3.3.min.js assets/js/
	cp img/* assets/img/
	cp font/* assets/font/
	/usr/local/bin/recess --compile ${BOOTSTRAP_LESS} > assets/css/bootstrap.css
	/usr/local/bin/recess --compress ${BOOTSTRAP_LESS} > assets/css/bootstrap.min.css
	/usr/local/bin/recess --compile ${BOOTSTRAP_RESPONSIVE_LESS} > assets/css/bootstrap-responsive.css
	/usr/local/bin/recess --compress ${BOOTSTRAP_RESPONSIVE_LESS} > assets/css/bootstrap-responsive.min.css
	cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js > assets/js/bootstrap.js
	uglifyjs -nc assets/js/bootstrap.js > assets/js/bootstrap.min.tmp.js
	echo "/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > assets/js/copyright.js
	cat assets/js/copyright.js assets/js/bootstrap.min.tmp.js > assets/js/bootstrap.min.js
	rm assets/js/copyright.js assets/js/bootstrap.min.tmp.js
#	@echo "\n${HR}"
#	@echo "	Generating demo pages"
#	@echo "${HR}\n"
#	utils/genicons.sh assets/css/bootstrap.css
#	utils/genbuttons.sh assets/css/bootstrap.css
#	utils/gennav.sh
#	/usr/local/bin/jade tests/{index,icons,buttons,navs,layouts,curapps,less}.jade -P -O assets/
#	open assets/less.html


#
# WATCH LESS FILES
#

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"


.PHONY: clean curapps
