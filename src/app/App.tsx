// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import viteLogo from "/vite.svg";
import { useState } from "react";
import reactLogo from "@app/assets/react.svg";
import "@app/App.css";

function App() {
    const [ count, setCount ] = useState(0);

    return (
        <>
            <div>
                <a rel="noreferrer" href="https://vite.dev" target="_blank">
                    <img src={ viteLogo } className="logo" alt="Vite logo" />
                </a>
                <a rel="noreferrer" href="https://react.dev" target="_blank">
                    <img
                        src={ reactLogo }
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={ () => { setCount((count) => count + 1); } }>
                    count is { count }
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
