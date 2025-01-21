build:
	rm -rf fronten/dist
	npm run build

start:
	npm run start

install:
	npm ci

make start-backend:
	npm run start

make start-backend:
	make -C frontend start

make start:
	make start-backend

make develop:
	make start-backend & make start-frontend


