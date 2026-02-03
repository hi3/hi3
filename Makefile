NJ1  := ron@nj1-01.cloud.ronpinz.com
SOURCE := public/
DESTINATION := ${NJ1}:/var/www/html

.phony: build push

ifeq (, $(shell which npm))
	$(error "No NPM in $(PATH)")
endif

all: build

start:
	@echo "starting ..."
	@npm run start

build:
	@echo "building ..."
	@npm run build

push: build
	@echo "pushing ..."
	@rsync -avze 'ssh' ${SOURCE} ${DESTINATION}

clean:
	@echo "cleaning ..."
	@rm -rf public resources/_gen/assets/css
