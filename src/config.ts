// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

const API_HOSTNAME_ANY: unknown = import.meta.env.VITE_API_HOSTNAME ?? "";
const API_HOSTNAME = String(API_HOSTNAME_ANY);

export const apiUrl = `https://${ API_HOSTNAME }`;
