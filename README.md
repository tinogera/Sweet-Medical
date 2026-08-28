# Sweet Medical 🏥

Sweet Medical is a web application for booking and managing medical appointments (turnos). Patients can search for doctors and services, book an appointment, check their upcoming appointments, and receive notifications. It was built as a university project for the Software Development course (Desarrollo de Software) at UTN.

**Live demo:**
- Frontend: https://earnest-crisp-5dfe13.netlify.app/
- Backend API: https://sweet-medical-backend-4rke.onrender.com
- API docs (Swagger): https://sweet-medical-backend-4rke.onrender.com/api-doc

## Tech stack

**Backend** (`server/`)
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/) for request validation
- [Swagger UI](https://github.com/scottie1984/swagger-ui-express) for API documentation
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) for testing
- [Biome](https://biomejs.dev/) for linting

**Frontend** (`frontend/`)
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) + [HeroUI](https://www.heroui.com/)
- [Axios](https://axios-http.com/) for HTTP requests
- [Vitest](https://vitest.dev/) for unit tests, [Cypress](https://www.cypress.io/) for end-to-end tests

**Database**
- MongoDB, run locally via Docker Compose or hosted on MongoDB Atlas in production

## Project structure

```
Sweet-Medical/
├── server/          # Express backend (API)
│   ├── controllers/     # Handle HTTP requests
│   ├── services/        # Business logic
│   ├── repositories/    # Database access (Mongoose)
│   ├── domain/           # Domain models/entities
│   ├── routes/           # API route definitions
│   ├── schemas/          # Zod validation schemas
│   ├── middlewares/      # Express middlewares (error handling, validation)
│   └── server.js         # Entry point
├── frontend/         # React app (Vite)
│   ├── src/
│   │   ├── features/      # Page-level feature modules
│   │   ├── components/    # Reusable UI components
│   │   ├── service/       # API calls (axios)
│   │   └── hooks/         # Custom React hooks
│   └── cypress/           # End-to-end tests
├── db/                # Database setup and seed scripts
│   ├── docker-compose.yml # Local MongoDB instance
│   ├── seed.js            # Seed data (used with Docker)
│   └── seed-node.js       # Seed script for remote databases (e.g. Atlas)
├── tests/            # Backend integration tests (Jest)
├── docs/              # Diagrams and deployment notes
├── render.yaml        # Render deployment config (backend)
└── netlify.toml        # Netlify deployment config (frontend)
```

## Prerequisites

- [Node.js](https://nodejs.org/) 22 or higher
- [Docker](https://www.docker.com/) (to run MongoDB locally, recommended)

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/ddso-utn/2026-1C-MA-TN-grupo-02.git
cd 2026-1C-MA-TN-grupo-02
```

### 2. Start the database

The easiest way to get a local MongoDB running is with Docker Compose:

```bash
cd db
docker compose up -d
cd ..
```

This starts MongoDB on `localhost:27017` and [Mongoman](https://github.com/aientech/mongoman) (a web UI to browse the DB) on `http://localhost:8081`.

### 3. Configure and run the backend

Install dependencies from the project root:

```bash
npm install
```

Copy the example environment file and adjust it if needed:

```bash
cp .env.example .env
```

`.env` variables:

| Variable | Description | Default (example) |
| --- | --- | --- |
| `PORT` | Port the API listens on | `3000` |
| `ENV` | Environment name (`dev`, `production`) | `dev` |
| `DB_CONNECTION_STRING` | MongoDB connection string | `mongodb://localhost:27017` |
| `MONGODB_DB_NAME` | Database name | `sweetmedical` |

Seed the database with sample data:

```bash
npm run seed
```

Start the backend in development mode (auto-restarts on file changes):

```bash
npm run dev
```

The API will be available at `http://localhost:3000`, and the interactive API docs at `http://localhost:3000/api-doc`.

### 4. Configure and run the frontend

In a separate terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

`frontend/.env` variables:

| Variable | Description | Default (example) |
| --- | --- | --- |
| `VITE_API_BASE_URL` | URL of the backend API | `http://localhost:3000` |
| `VITE_DEMO_PACIENTE_ID` | (Optional) a patient ID used to pre-fill demo data | — |

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

## Running tests

**Backend tests** (from the project root):

```bash
npm test
```

**Frontend unit tests**:

```bash
cd frontend
npm test
```

**Frontend end-to-end tests** (Cypress, requires both frontend and backend running):

```bash
cd frontend
npx cypress open
```

## Linting

```bash
npm run lint
```

## Deployment

The app is deployed as three separate pieces:

- **Backend** → [Render](https://render.com/), configured via [`render.yaml`](./render.yaml)
- **Frontend** → [Netlify](https://www.netlify.com/), configured via [`netlify.toml`](./netlify.toml)
- **Database** → [MongoDB Atlas](https://www.mongodb.com/atlas)

A detailed, step-by-step log of how the deployment was set up can be found in [`docs/proceso_despliegue.md`](./docs/proceso_despliegue.md) (in Spanish).

## Team

- Pedro Martín Camicia Pozzo
- Nahuel Alejandro Garcia
- Santino Gerardi
- Franco Losasso
- Eduardo Ariel Onishi

## Assignment

- [Pre-entrega](https://docs.google.com/document/d/1Ytqtm7hJdTK3DPiv-6Z5EkwqWf8UeKy5c9B6Nkj0tCY/edit?usp=sharing)
