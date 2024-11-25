// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "@app/App.css";
import { useNavigate } from "react-router-dom";

export function App() {
    return <>
        <div className="bg">
            <div className="landing-page">
                <VehicleRegistry />

                <KeyFeatures />

                <Benefits />

                <Cta />
            </div>
        </div>
    </>;
}

function VehicleRegistry() {
    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return <>
        <section
            className="vehicle-registry flex flex-column align-items-center justify-content-center text-center"
        >
            <div className="text">
                <h1>
                    Welcome to Vehicle Registry
                </h1>

                <p className="description">
                    A powerful, modern solution for managing vehicles,
                    drivers, and tracking real-time entry
                    and exit logs.
                </p>
            </div>

            <Button
                className="getting-started p-button-raised p-button-rounded p-button-primary"
                label="Getting Started"
                onClick={ scrollToNextSection }
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

function Benefits() {
    const benefits = [
        {
            title: "Secure and Reliable Data Storage",
            icon: "pi-shield",
            description: "Ensure your vehicle and driver information is stored safely with robust data security measures.",
        },
        {
            title: "Real-Time Tracking",
            icon: "pi-clock",
            description: "Monitor vehicle entry and exit times accurately with our state-of-the-art tracking system.",
        },
        {
            title: "User-Friendly Interface",
            icon: "pi-user",
            description: "Navigate effortlessly with an intuitive and modern interface designed for ease of use, supporting mobile and other devices seamlessly.",
        },
    ];

    return <>
        <section className="benefits">
            <h2>Why Choose Vehicle Registry?</h2>

            <div className="container grid p-justify-center">
                { benefits.map(({ title, description, icon }, index) => (
                    <div key={ index } className="py-4 md:px-4 col-12 md:col-6">
                        <Card
                            className="text-center p-2 lg:p-4"
                            title={ title }
                        >
                            <i className={ `pi ${ icon }` }></i>

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

function Cta() {
    const navigate = useNavigate();

    return <>
        <section className="cta">
            <h2> Ready to transform your vehicle management?</h2>

            <Button
                label="Request a Demo"
                className="p-button-raised p-button-rounded"
                onClick={ () => { navigate("/access");} }
            />
        </section>
    </>;
}
