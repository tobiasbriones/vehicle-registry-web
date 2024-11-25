// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { valToString } from "@common/utils.ts";
import { useCallback, useState } from "react";
import { noneLoadingContent } from "./loading-content.ts";

export function useLoadingPane() {
    const [ loadingContent, setLoadingContent ] = useState(noneLoadingContent);

    const setLoading = useCallback(
        (message: string) => {
            setLoadingContent({ type: "Loading", info: message });
        },
        [],
    );

    const setError = useCallback(
        (error: unknown) => {
            const isObject = typeof error === "object" && error !== null;
            const errorVal = isObject ? error : valToString(error);

            setLoadingContent({
                type: "Error",
                info: errorVal,
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
