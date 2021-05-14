import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/schema-form.js',
    output: {
        file: 'dist/schema-form.js',
        format: 'iife',
        name: 'SchemaForm'
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        babel(),
    ],
};
