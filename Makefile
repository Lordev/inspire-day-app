# Infra helper Makefile
# Usage: make up | down | build | test | logs | exec

COMPOSE_DIR=.

up:
	docker compose -f docker-compose.yml up -d --build

test:
	docker compose -p inspireday_test -f docker-compose.yml -f docker-compose.test.yml run --rm --no-deps laravel.app php artisan test

down:
	docker compose -f docker-compose.yml down --volumes

build:
	docker compose -f docker-compose.yml build

logs:
	docker compose -f docker-compose.yml logs -f

exec:
	docker compose -f docker-compose.yml exec laravel.app bash

test:
	docker compose -f docker-compose.yml -f docker-compose.test.yml run --rm laravel.app php artisan test

migrate:
	docker compose -f docker-compose.yml exec laravel.app php artisan migrate
