// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import App from "@app/App.tsx";
import { render, screen } from "@testing-library/react";

describe("App tests", () => {
    it("should render the title", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", {
                level: 1,
            }),
        ).toHaveTextContent("Vite + React");
    });
});
