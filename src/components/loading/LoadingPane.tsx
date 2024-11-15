// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import "./LoadingPane.css";
import { LoadingIndicator } from "./LoadingIndicator.tsx";
import { LoadingContent } from "./loading-content.ts";

type LoadingPaneProps = {
    content: LoadingContent,
}

export function LoadingPane({ content }: LoadingPaneProps) {
    const { type, message } = content;

    return <>
        <LoadingIndicator
            show={ type === "Loading" }
            message={ message }
        />

        <div
            className={
                `error ${ type === "Error" ? "" : "opacity-0" }`
            }
        >
            { message }
        </div>
    </>;
}
