# Vehicle Registry Web

[![GitHub Repository](https://img.shields.io/static/v1?label=GITHUB&message=REPOSITORY&labelColor=555&color=0277bd&style=for-the-badge&logo=GITHUB)](https://github.com/tobiasbriones/vehicle-registry-web)

[![GitHub Project License](https://img.shields.io/github/license/tobiasbriones/vehicle-registry-web.svg?style=flat-square)](https://github.com/tobiasbriones/vehicle-registry-web/blob/main/LICENSE)

![GitHub Release](https://img.shields.io/github/v/release/tobiasbriones/vehicle-registry-web?style=flat-square)

⚙ Production
[![Netlify Status](https://api.netlify.com/api/v1/badges/d9c63f9f-6f80-445f-b900-e62849904183/deploy-status)](https://app.netlify.com/sites/vehicle-registry/deploys)

Frontend client for a vehicle registration web app that allows entrance and
leave.

## Getting Started

Install project dependencies via `npm install`.

To completely integrate the application either in production or locally, you
will need to  
[set up the API server and database](https://github.com/tobiasbriones/vehicle-registry-api)
and ensure to set your [environment variables](#environment-variables)
accordingly.

Run development mode via `npm run dev`.

Run tests via `npm run test`.

Build for production via `npm run build`.

Run ESLint via `npx eslint .` or `npm run lint`.

## Environment Variables

The app utilizes environment variables to set production values.

Ensure *not to commit any environment variable* files (e.g., `.env`, `.dev.env`,
etc.) to the repository, even if they are for testing purposes, or they (still)
don't contain any sensitive information.

The environment file is `.env` and must be at the root of the project when
testing or deploying. You should also consider adding environment variables
directly into your deployment environment (e.g. Netlify, etc.) instead of using
a `.env` file.

### Setting Variables

The following variables work for production and development modes. Ensure to set
the proper values in a `.env` file (recommended for development) or directly
into your production environment.

| Variable            | Description                                          | Value               | Dev Value        |
|---------------------|------------------------------------------------------|---------------------|------------------|
| `VITE_API_HOSTNAME` | Hostname for the API server used by the application. | `${ api_hostname }` | `localhost:3000` |

## Contact

Tobias Briones: [GitHub](https://github.com/tobiasbriones)
[LinkedIn](https://linkedin.com/in/tobiasbriones)

## About

**Vehicle Registry Web**

Vehicle registration web client application.

Copyright © 2024 Tobias Briones. All rights reserved.

### License

This project is licensed under the [MIT](LICENSE).
