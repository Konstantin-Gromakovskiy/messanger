#Установка зависомотей в корневой деррикотрии и у фронтенда
install:
	npm ci

#Билд фронтенда
build:
	rm -rf frontend/dist
	npm run build

#Старт сервера
start-backend:
	npm run start
start:
	make start-backend

develop:
	npm run develop

preview:
	npm run preview

