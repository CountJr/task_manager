start:
	DEBUG="application:*" npm run gulp -- server

init:
	npm run gulp init

lint:
	npm run eslint -- src __tests__
