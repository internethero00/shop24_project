<h1 align="center">Shop24 — Full-Stack Marketplace</h1>
<div align="center">
  <h3>Built with NestJS · Next.js 16 · PostgreSQL · Prisma · Docker</h3>

  <p>
    <img src="https://img.shields.io/badge/NestJS-11-red?logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
    <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/Prisma-ORM-black?logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" />
  </p>

  <p>A modern marketplace where every user can act as both a buyer and a seller.</p>
</div>

---

<h2 align="center">📌 Overview</h2>

Shop24 is a full-stack marketplace platform built as a personal project to master:

- NestJS backend architecture with Prisma ORM
- SSR/ISR patterns in Next.js 16
- OAuth authentication (Google, Yandex)
- Payment integration with YooKassa
- Docker-based full-stack infrastructure with Nginx

**Status:** MVP Completed

---

<h2 align="center">✨ Features</h2>

### 👤 User Functionality

- Email/password authentication
- OAuth login via Google and Yandex
- JWT auth (access + httpOnly refresh tokens)
- Favorites
- Cart stored with redux-persist
- Reviews & ratings
- Viewing purchased items

---

### 🛍️ Seller Functionality

- Create/manage a store
- Add products, categories, colors
- Upload images
- View sold items
- Store analytics (Recharts charts)
- Store settings

---

### 🛒 Catalog & Payments

- Product catalog
- Sorting & searching
- Product pages with reviews
- Add to cart → checkout
- Full payment flow via YooKassa

---

<h2 align="center">🧰 Tech Stack</h2>

### 🔹 Backend

<div>
  <img src="https://nestjs.com/img/logo-small.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="45" />
</div>

- NestJS 11 (modular architecture)
- Prisma ORM
- PostgreSQL
- OAuth: Google, Yandex
- JWT + httpOnly refresh cookies
- File uploads & static hosting
- Swagger documentation

---

### 🔹 Frontend

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="45" />
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="45" />
</div>

- Next.js 16 (App Router)
- React 19 + TypeScript
- Redux Toolkit + redux-persist
- TailwindCSS, Radix UI, shadcn components
- React Query (custom hooks)
- React Hook Form

---

### 🔹 DevOps

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="45" />
</div>

- Docker & docker-compose
- Nginx reverse proxy
- PostgreSQL container
- ENV-based configuration

---

<h2 align="center">📂 Project Structure</h2>

```text
shop24_project/
│
├── client-side/          
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── .env
│
├── server-side/         
│   ├── prisma/
│   ├── src/
│   ├── uploads/         
│   ├── Dockerfile
│   └── .env
│
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
└── README.md
```

---

<h2 align="center">⚙️ Getting Started</h2>

To run the project locally using Docker:

```md
docker-compose up --build
```

**Services:**

| Service | URL |
|--------|------|
| Frontend (Next.js) | http://localhost |
| Backend (NestJS API) | http://localhost:5000 |
| PostgreSQL | localhost:5432 |

---

<h2 align="center">🔧 Environment Variables</h2>

### 🔵 Frontend (`client-side/.env`)
```env
APP_ENV=development
APP_URL=http://localhost:3000
APP_DOMAIN=localhost
SERVER_URL_INTERNAL=http://server:5000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```
### 🔴 Backend (server-side/.env)
```env
DATABASE_URL="postgresql://postgres:postgresql@postgres:5432/shop24_project?schema=public"

CLIENT_URL=http://localhost:3000

JWT_SECRET=your_secret_here

GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****

YANDEX_CLIENT_ID=*****
YANDEX_CLIENT_SECRET=*****

YOOKASSA_SHOP_ID=*****
YOOKASSA_SECRET_KEY=*****

SERVER_URL=http://localhost:5000
SERVER_DOMAIN=localhost
```
<h2 align="center">🐳 Dockerfile Overview</h2>

### 🟦 Docker-compose.yml
```docker-compose
version: "3.9"

services:
  postgres:
    image: postgres:15
    container_name: shop24_postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgresql
      POSTGRES_DB: shop24_project
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  server:
    build: ./server-side
    container_name: shop24_server
    restart: always
    env_file:
      - ./server-side/.env
    ports:
      - "5000:5000"
    depends_on:
      - postgres

  client:
    build: ./client-side
    container_name: shop24_client
    restart: always
    env_file:
      - ./client-side/.env
    ports:
      - "3000:3000"
    depends_on:
      - server

  nginx:
    build: ./nginx
    container_name: shop24_nginx
    restart: always
    ports:
      - "80:80"
    depends_on:
      - client

volumes:
  pg_data:

```

### 🔵 Frontend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]
```
### 🔴 Backend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```
### 🟢 Nginx Dockerfile
```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
```
---

<h2 align="center">📈 What I Learned</h2>

- NestJS + Prisma architecture
- Modular backend design
- JWT auth with httpOnly refresh cookies
- OAuth flows
- SSR + ISR in Next.js
- YooKassa payment flow
- File uploads & static hosting
- Analytics dashboards
- Docker orchestration
- React Query + Redux Toolkit integration
---

<h2 align="center">🚧 Future Improvements</h2>
- Add backend test coverage
- Introduce roles & permissions
- Extract payments/notifications into microservices
- Add CI/CD
- Improve admin panel UI
- Deploy to VPS/cloud