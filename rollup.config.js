import {terser} from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

process.chdir(__dirname);

const defaultCfg = {
  input: './src/index.js',
  output: {
    file: './dist/exit-event.min.js',
    format: 'iife'
  },
  plugins: [
    resolve({browser: true, preferBuiltins: false}),
    commonjs(),
    terser(),
  ]
};

export default [defaultCfg];