import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import olaf from '@olaf-mix/rollup-plugin-olaf-mix';
module.exports = () => {
    return [{
        input: './src/index.ts',
        output: {
            name: 'icemilk',
            globals: {
                moment: 'moment',
                axios: 'axios'
            },
            file: './dist/index.js',
            format: 'umd'
        },
        plugins: [
            olaf(),
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"})
        ],
        external: [ 'moment', 'axios' ],
        treeshake: true
    }, {
        input: './src/index.ts',
        output: {
            name: 'icemilk',
            globals: {
                moment: 'moment',
                axios: 'axios'
            },
            file: './dist/index.min.js',
            // dir: './dist',
            format: 'umd'
        },
        plugins: [
            olaf(),
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
            uglify()
        ],
        external: [ 'moment', 'axios' ],
        treeshake: true
    }]
};