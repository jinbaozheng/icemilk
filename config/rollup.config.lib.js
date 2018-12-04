import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from "rollup-plugin-uglify";
module.exports = () => {
    return {
        input: './src/index.ts',
        output: {
            file: './lib/index.js',
            format: 'cjs'
        },
        plugins: [
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
            uglify()
        ]
    }
};