// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { App } from "@app/App.tsx";
import { Drivers } from "@app/drivers/Drivers.tsx";
import { Layout } from "@app/Layout.tsx";
import { NotFound } from "@app/NotFound.tsx";
import { Vehicles } from "@app/vehicles/Vehicles.tsx";
import { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router/dist/lib/context";

function layoutOf(node: ReactNode) {
    return <>
        <Layout>
            { node }
        </Layout>
    </>;
}

const wrapView = (route: RouteObject) => ({
    ...route,
    element: layoutOf(route.element),
});

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/vehicles",
            element: <Vehicles />,
        },
        {
            path: "/drivers",
            element: <Drivers />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]
        .map(wrapView),
);
