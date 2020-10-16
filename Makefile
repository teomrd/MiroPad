.DEFAULT_GOAL := dev
.PHONY : install dev deploy

MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

install:
	yarn

dev: install
	yarn dev

build: install
	yarn build

serve: build
	open http://localhost:8080 && serve $(MAKE_DIR)/dist

deploy:
	$(MAKE_DIR)/scripts/deploy.sh