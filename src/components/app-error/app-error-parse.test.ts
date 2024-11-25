// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: MIT
// This file is part of https://github.com/tobiasbriones/vehicle-registry-web

import { objToString } from "@common/utils.ts";
import { replaceMessageOf } from "@components/app-error/app-error-parse.ts";

describe("replaceMessageOf", () => {
    it("should replace a single MessageOf object", () => {
        const input = { message: "Test message", target: { foo: "bar" } };
        const result = replaceMessageOf(input);

        expect(result).toBe(`Test message: ${ objToString({ foo: "bar" }) }.`);
    });

    it("should process nested MessageOf objects", () => {
        const input = {
            context: { message: "Nested message", target: { id: 123 } },
        };
        const result = replaceMessageOf(input);

        expect(result).toEqual({
            context: `Nested message: ${ objToString({ id: 123 }) }.`,
        });
    });

    it("should handle arrays with MessageOf objects", () => {
        const input = [
            { message: "Array message 1", target: { a: 1 } },
            { message: "Array message 2", target: { b: 2 } },
        ];
        const result = replaceMessageOf(input);

        expect(result).toEqual([
            `Array message 1: ${ objToString({ a: 1 }) }.`,
            `Array message 2: ${ objToString({ b: 2 }) }.`,
        ]);
    });

    it("should handle mixed types in arrays", () => {
        const input = [
            { message: "Array message", target: { a: 1 } },
            "not a MessageOf",
            123,
        ];
        const result = replaceMessageOf(input);

        expect(result).toEqual([
            `Array message: ${ objToString({ a: 1 }) }.`,
            "not a MessageOf",
            123,
        ]);
    });

    it("should handle objects without MessageOf correctly", () => {
        const input = { foo: "bar", nested: { baz: "qux" } };
        const result = replaceMessageOf(input);

        expect(result).toEqual({ foo: "bar", nested: { baz: "qux" } });
    });

    it("should process deeply nested objects", () => {
        const input = {
            level1: {
                level2: {
                    message: "Deep message",
                    target: { key: "value" },
                },
            },
        };
        const result = replaceMessageOf(input);

        expect(result).toEqual({
            level1: {
                level2: `Deep message: ${ objToString({ key: "value" }) }.`,
            },
        });
    });

    it("should handle primitive values", () => {
        expect(replaceMessageOf("string")).toBe("string");
        expect(replaceMessageOf(123)).toBe(123);
        expect(replaceMessageOf(true)).toBe(true);
        expect(replaceMessageOf(null)).toBe(null);
    });

    it("should handle empty objects and arrays", () => {
        expect(replaceMessageOf({})).toEqual({});
        expect(replaceMessageOf([])).toEqual([]);
    });

    it("should handle arrays with empty objects", () => {
        const input = [ {}, [] ];
        const result = replaceMessageOf(input);

        expect(result).toEqual([ {}, [] ]);
    });
});
