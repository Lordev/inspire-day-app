# InspireDay

Mono-repo for the InspireDay project. Contains the Laravel/Inertia web app and the Python AI service.

## Quick Start (Local)

1. Make sure you have Docker and Docker Compose installed.
2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Build and run:

   ```bash
   # from repo root
   make up
   ```

## Notes

- The repo is organized so you can work on each service independently. If you use submodules, the parent repo tracks commit pointers for each service.
- Keep secrets out of the repo: do not commit `.env`.

## Files of Interest

- `InspireDay-app/` — Laravel + Inertia (web)
- `InspireDay-ai-service/` — Python AI service
- `docker-compose.yml` — dev compose that brings services together
- `docker-compose.test.yml` — test overrides
- `Makefile` — convenient commands to run the stack and tests

## Infra Commands (From Repo Root)

- Start dev stack:
  ```bash
  make up
  ```

- Start test stack (includes test overrides):
  ```bash
  make up-test
  ```

- Run tests:
  ```bash
  make test
  ```

- Stop and remove volumes:
  ```bash
  make down
  ```

## Contributing

This is a personal side project. If you want to contribute, open an issue or a PR.

## License

This project is licensed under the MIT License — see `LICENSE`.
