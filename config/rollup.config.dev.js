import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
// import olaf from '@olaf-mix/rollup-plugin-olaf-mix';
module.exports = () => {
    return {
        input: './src/index.ts',
        output: {
            name: 'icemilk',
            globals: {
                moment: 'moment',
                axios: 'axios'
            },
            file: './dist/index.js',
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            // olaf(),
            json(),
            resolve(),
            commonjs(),
            typescript(),
        ],
        external: [ 'moment', 'axios' ],
        treeshake: false
    }
};