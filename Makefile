COMPOSE=docker compose -f docker-compose.yml

# Setup CI environment - handle all the complex setup tasks
setup-ci:
	# Prepare all env files from their examples
	find . -name ".env.example" -exec sh -c 'dir=$$(dirname "$$1"); [ ! -f "$$dir/.env" ] && cp "$$1" "$$dir/.env"' _ {} \;

up:
	$(COMPOSE) up -d --build

# Run Laravel tests using the test override compose file
test:
	$(COMPOSE) -p inspireday_test -f docker-compose.test.yml run --rm --no-deps laravel.app sh -c "php artisan test --do-not-cache-result --env=testing"

# Stop and remove containers + volumes
down:
	$(COMPOSE) down --volumes

build:
	$(COMPOSE) build

logs:
	$(COMPOSE) logs -f

# Exec into the Laravel container
exec:
	$(COMPOSE) exec laravel.app bash

# Exec into the AI service container
exec-ai:
	$(COMPOSE) exec api bash

# Run migrations inside the Laravel container
migrate:
	$(COMPOSE) exec laravel.app php artisan migrate

# Start only the AI service
ai-up:
	$(COMPOSE) up -d api

# Run AI service tests (assumes pytest inside the ai image)
ai-test:
	$(COMPOSE) run --rm api pytest

# Clear Laravel caches
clear-cache:
	$(COM