// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { router } from "@app/router.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@app/index.css";
import { RouterProvider } from "react-router-dom";

const rootEl = document.getElementById("root");

if (rootEl === null) {
    console.error("Root element not found");
}
else {
    render(rootEl);
}

function render(rootEl: HTMLElement) {
    createRoot(rootEl)
        .render(
            <StrictMode>
                <RouterProvider router={ router } />
            </StrictMode>,
        );
}
