#Установка зависомотей в корневой деррикотрии и фронтенда
install:
	npm ci
	npm run postinstall

#Билд фронтенда
build:
	rm -rf fronten/dist
	npm run build

#Старт сервера
start-backend:
	npm run start

develop:
	npm run develop


