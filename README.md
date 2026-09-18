# E-commerce frontend

React e-commerce frontend with Redux Toolkit, product browsing, cart and order flows, authentication, and admin screens backed by REST APIs.

[Website](https://e-com-app-ecru.vercel.app)

## Project scope

This repository contains the frontend. Its account, catalog, cart, and order screens depend on a separately configured API. Copy `.env.example` to a local environment file and configure the API URL. See [QUICK_START.md](QUICK_START.md) and [API_MIGRATION_GUIDE.md](API_MIGRATION_GUIDE.md) for the existing integration notes.

## Run locally

Install Node.js and the package manager used below. Run each command block from the repository root; separate frontend/backend processes use separate terminals.

Root application:

```sh
npm install
npm run dev
```

Other package scripts: `npm run build`, `npm run lint`.

## Source guide

- [src/App.jsx](src/App.jsx)
- [index.html](index.html)
- [src/components/common/Button.jsx](src/components/common/Button.jsx)
- [src/components/common/Input.jsx](src/components/common/Input.jsx)
- [src/components/common/Logo.jsx](src/components/common/Logo.jsx)
- [src/components/common/Modal.jsx](src/components/common/Modal.jsx)
