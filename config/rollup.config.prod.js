import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
// import olaf from '@olaf-mix/rollup-plugin-olaf-mix';
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
            format: 'umd',
            sourcemap: false,
        },
        plugins: [
            // olaf(),
            json(),
            resolve(),
            commonjs(),
            typescript({sourceMap: false}),
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
            format: 'umd',
            sourcemap: false,
        },
        plugins: [
            // olaf(),
            json(),
            resolve(),
            commonjs(),
            typescript({sourceMap: false}),
            terser()
        ],
        external: [ 'moment', 'axios' ],
        treeshake: true
    }]
};