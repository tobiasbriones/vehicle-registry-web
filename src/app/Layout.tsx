// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Footer } from "@app/footer/Footer.tsx";
import { Nav } from "@app/nav/Nav.tsx";
import { PrimeReactProvider } from "primereact/api";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const value = {
        ripple: true,
    };

    return <>
        <PrimeReactProvider value={ value }>
            <Nav />

            <div style={ { marginTop: "var(--nav-height)" } }>
                { children }
            </div>

            <Footer />
        </PrimeReactProvider>
    </>;
}
