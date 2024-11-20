// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web


import { noneLoadingContent } from "@components/loading/loading-content.ts";
import { useLoadingPane } from "@components/loading/loading-pane.hook.ts";
import { act, renderHook } from "@testing-library/react";

describe("useLoadingPane", () => {
    test("initially sets loadingContent to noneLoadingContent", () => {
        const { result } = renderHook(() => useLoadingPane());

        expect(result.current.loadingContent).toEqual(noneLoadingContent);
    });

    test(
        "setLoading sets loadingContent to Loading with provided message",
        () => {
            const { result } = renderHook(() => useLoadingPane());

            act(() => {
                result.current.setLoading("Loading data...");
            });

            expect(result.current.loadingContent).toEqual({
                type: "Loading",
                info: "Loading data...",
            });
        },
    );

    test("setError sets loadingContent to Error with error message", () => {
        const { result } = renderHook(() => useLoadingPane());

        act(() => {
            result.current.setError("An error occurred");
        });

        expect(result.current.loadingContent).toEqual({
            type: "Error",
            info: "An error occurred",
        });
    });

    test("stopLoading resets loadingContent to noneLoadingContent", () => {
        const { result } = renderHook(() => useLoadingPane());

        // Set a loading state
        act(() => {
            result.current.setLoading("Loading data...");
        });

        // Now stop loading
        act(() => {
            result.current.stopLoading();
        });

        expect(result.current.loadingContent).toEqual(noneLoadingContent);
    });
});
