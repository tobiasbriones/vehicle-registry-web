// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "@app/App.css";

export function App() {
    return <>
        <div className="landing-page">
            <VehicleRegistry />

            <KeyFeatures />
        </div>
    </>;
}

function VehicleRegistry() {
    return <>
        <section
            className="vehicle-registry flex flex-column align-items-center justify-content-center text-center"
        >
            <h1>
                Welcome to Vehicle Registry
            </h1>

            <p className="description">
                A powerful, modern solution for managing vehicles,
                drivers, and tracking real-time entry
                and exit logs.
            </p>

            <Button
                className="getting-started p-button-raised p-button-rounded p-button-primary"
                label="Getting Started"
            />
        </section>
    </>;
}

function KeyFeatures() {
    type Feature = {
        name: string,
        description: string,
    }

    const keyFeatures: Feature[] = [
        {
            name: "Vehicle Management",
            description: "Effortlessly create, read, update, and delete vehicle information.",
        },
        {
            name: "Driver Management",
            description: "Assign drivers to vehicles with ease and manage their details.",
        },
        {
            name: "Clock In/Out Tracking",
            description: "Track vehicle entry and exit times with precision and reliability.",
        },
    ];

    return <>
        <section className="key-features">
            <h2>Key Features</h2>

            <div className="container grid p-justify-center">
                { keyFeatures.map(({ name, description }, index) => (
                    <div key={ index } className="py-4 md:px-4 col-12 md:col-6">
                        <Card
                            className="text-center p-2 lg:p-4"
                            title={ name }
                        >
                            <p>
                                { description }
                            </p>
                        </Card>
                    </div>
                )) }
            </div>
        </section>
    </>;
}
