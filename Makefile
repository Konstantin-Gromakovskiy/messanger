#Установка зависомотей в корневой деррикотрии и фронтенда
install:
	npm ci
	npm run postinstall

#Билд фронтенда
build:
	rm -rf fronten/dist
	npm run build

#Старт сервера
make start-backend:
	npm run start

make develop:
	npm run develop


