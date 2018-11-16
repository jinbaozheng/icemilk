import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
module.exports = {
    input: './src/index.ts',
    output: {
        name: 'jbzwebsdk',
        globals: {
            moment: 'moment',
            axios: 'axios'
        },
        file: './dist/index.js',
        // dir: './dist',
        format: 'umd'
    },
    plugins: [
        json(),
        resolve(),
        commonjs(),
        typescript({lib: ["es5", "es6", "dom"], target: "es5"})
    ],
    external: [ 'moment', 'axios' ]
};