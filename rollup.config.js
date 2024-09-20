// import dts from "rollup-plugin-dts";
// import tsPlugin from "@rollup/plugin-typescript";
// import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: `./src/index.ts`,
    plugins: [esbuild()],
    ignoreFiles: ['**/tests', 'node_modules'],
    output: [
      {
        file: `dist/bundle.js`,
        format: 'cjs',
        sourcemap: true,
        exports: 'default',
      },
    ],
  },
];
