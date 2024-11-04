// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

/// <reference types="vite/client" />

type ImportMetaEnv = {
    readonly VITE_API_HOSTNAME?: string;
}

type ImportMeta = {
    readonly env: ImportMetaEnv;
}
