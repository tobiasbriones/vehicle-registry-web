// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { useCallback, useState } from "react";
import { noneLoadingContent } from "./loading-content.ts";

export function useLoadingPane() {
    const [ loadingContent, setLoadingContent ] = useState(noneLoadingContent);

    const setLoading = useCallback(
        (message: string) => {
            setLoadingContent({ type: "Loading", message });
        },
        [],
    );

    const setError = useCallback(
        (error: unknown) => {
            setLoadingContent({
                type: "Error",
                message: String(error),
            });
        },
        [],
    );

    const stopLoading = useCallback(
        () => {
            setLoadingContent(noneLoadingContent);
        },
        [],
    );

    return { loadingContent, setLoading, setError, stopLoading };
}
