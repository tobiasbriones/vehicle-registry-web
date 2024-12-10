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

## Production

The web app is deployed at
[Vehicle Registry \| Dev \| MathSoftware.Engineer](https://vehicle-registry.dev.mathsoftware.engineer)
via Netlify.

## Screenshots

Vehicle Registry is a modern web app with responsive styles for mobile, desktop,
and other devices.

### Landing Page

It presents the product with a landing page featuring a parallax background and
modern navigation bar with blur translucent background.

![](docs/screenshots/landing-page.png)

The CTA (Call to Action) section leads the user to the main feature of the
application.

![](docs/screenshots/landing-page-cta.png)

It features a footer section with all the detailed links and information.

![](docs/screenshots/landing-page-footer.png)

### Vehicle Logs

It provides a system to register robust vehicle logs with driver, event
(`entry` or `exit`), timestamp, and mileage. It facilitates a filter by vehicle,
driver, and date (day) to target specific logs.

**Vehicle Logs**

![](docs/screenshots/vehicle-logs.png)

**Adding a New Log**

![](docs/screenshots/adding-a-new-log.png)

**Event Validation**

Events must be coherent, so if a vehicle is outside it'll need to enter and vice
versa. For example, a vehicle which last event was `entry` cannot enter again
until it logs `exit`.

![](docs/screenshots/event-validation.png)

**Mileage Validation**

Vehicle mileage is increasing or can be reset to zero.

![](docs/screenshots/event-validation.png)

**Filtering Logs by Date**

![](docs/screenshots/filtering-logs-by-date.png)

**Filtering Logs by Date and Driver**

![](docs/screenshots/filtering-logs-by-date-and-driver.png)

**Filtering Logs by Date, Driver, and Vehicle**

![](docs/screenshots/filtering-logs-by-date-driver-and-vehicle.png)

### CRUD

It implements reliable CRUD (Create Read Update Delete) operations to define and
manage domain data.

**Vehicles CRUD**

![](docs/screenshots/vehicles-crud.png)

**Adding a New Vehicle with Validation**

![](docs/screenshots/adding-a-new-vehicle-with-validation.png)

**Editing Vehicles**

![](docs/screenshots/editing-vehicles.png)

**Robust Validation**

![](docs/screenshots/robust-validation.png)

**Delete Confirm Dialog**

![](docs/screenshots/delete-confirm-dialog.png)

**Drivers CRUD**

![](docs/screenshots/drivers-crud.png)

**Adding a New Driver with Validation**

![](docs/screenshots/adding-a-new-driver-with-validation.png)

## Contact

Tobias Briones: [GitHub](https://github.com/tobiasbriones)
[LinkedIn](https://linkedin.com/in/tobiasbriones)

## About

**Vehicle Registry Web**

Vehicle registration web client application.

Copyright © 2024 Tobias Briones. All rights reserved.

### License

This project is licensed under the [MIT](LICENSE).
