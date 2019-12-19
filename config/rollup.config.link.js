import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import olaf from '@olaf-mix/rollup-plugin-olaf-mix';
module.exports = () => {
    return {
        input: './src/index.ts',
        output: {
            sourceMap: true,
            name: 'icemilk',
            globals: {
                moment: 'moment',
                axios: 'axios'
            },
            file: './lib/index.js',
            format: 'cjs'
        },
        plugins: [
            olaf(),
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
            sourcemaps()
        ],
        external: [ 'moment', 'axios' ],
        treeshake: false
    }
};