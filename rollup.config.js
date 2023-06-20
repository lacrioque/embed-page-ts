import { emptyDir } from "rollup-plugin-empty-dir";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/es6/index.js",
      format: "es",
      name: "embed-page"
    },
    plugins: [
      emptyDir(),
      typescript(),
      nodeResolve(),
      commonjs(),
      terser()
    ],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/commonjs/index.js",
      format: "cjs",
      name: "embed-page"
    },
    plugins: [
      emptyDir(),
      typescript(),
      nodeResolve(),
      commonjs(),
      terser()
    ],
  }
];