#Установка зависомотей в корневой деррикотрии и у фронтенда
install:
	npm ci
	npm run frontend-ci

#Билд фронтенда
build:
	rm -rf frontend/dist
	npm run build

#Старт сервера
start-backend:
	npm run start

develop:
	npm run develop

preview:
	npm run preview

