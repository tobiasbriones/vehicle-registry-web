// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { Footer } from "@app/Footer.tsx";
import { Nav } from "@app/Nav.tsx";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return <>
        <Nav />

        <div style={ { marginTop: "var(--nav-height)" } }>
            { children }
        </div>

        <Footer />
    </>;
}

export default Layout;
