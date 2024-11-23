// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Button } from "primereact/button";
import "@app/App.css";

function App() {
    return <>
        <div className="landing-page">
            <VehicleRegistry />
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

export default App;