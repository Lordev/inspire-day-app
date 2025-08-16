# InspireDay

Mono-repo for the InspireDay project. Contains the Laravel/Inertia web app and the Python AI service.

Quick start (local)

1. Make sure you have Docker and Docker Compose installed.
2. Copy environment file:

   cp .env.example .env

3. Build and run:

   # from repo root
   make up

Notes

- The repo is organized so you can work on each service independently. If you use submodules, the parent repo tracks commit pointers for each service.
- Keep secrets out of the repo: do not commit `.env`.

Files of interest

- `InspireDay-app/` — Laravel + Inertia (web)
- `InspireDay-ai-service/` — Python AI service
- `infra/docker-compose.yml` — dev compose that brings services together
- `infra/docker-compose.test.yml` — test overrides
- `infra/Makefile` — convenient commands to run the stack and tests

Infra commands (from repo root)

- Start dev stack:

  make up

- Start test stack (includes test overrides):

  make up-test

- Run tests:

  make test

- Stop and remove volumes:

  make down

Contributing

This is a personal side project. If you want to contribute, open an issue or a PR.

License

This project is licensed under the MIT License — see `LICENSE`.
