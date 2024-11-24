// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./Nav.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import "primeflex/primeflex.css";

export const Nav = () => {
    const navigate = useNavigate();

    const items: MenuItem[] = [
        {
            label: "Home",
            icon: "pi pi-home",
            command: () => { navigate("/"); },
        },
        {
            label: "Vehicles",
            icon: "pi pi-car",
            command: () => { navigate("/vehicles"); },
        },
    ];
    const start = (
        <img
            className="mx-4"
            src="/vite.svg"
            alt="Vehicle Registry"
            height="32px"
            style={ { cursor: "pointer" } }
            onClick={ () => { navigate("/"); } }
        />
    );
    return (
        <Menubar
            className="custom-menubar"
            model={ items }
            start={ start }
        />
    );
};
