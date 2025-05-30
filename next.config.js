/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // 1. Keep `transpilePackages` - it's essential for Next.js to process these packages.
  transpilePackages: ['onnxruntime-web'],

  webpack: (config, { isServer }) => {
    // 2. Enable experimental Webpack 5 features for modern module handling.
    //    `topLevelAwait`: Allows using `await` outside of async functions (often used by WASM modules).
    //    `asyncWebAssembly`: Enables proper handling of asynchronous WebAssembly modules.
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      asyncWebAssembly: true,
    };

    // 3. Add a specific rule for .mjs files within `onnxruntime-web`.
    //    The error message indicates problems with `ort.node.min.mjs` and `ort.webgpu.bundle.min.mjs`.
    //    These are typically located in `node_modules/onnxruntime-web/dist/`.
    //    `type: 'javascript/esm'` explicitly tells Webpack to parse these files as ES Modules.
    //    `parser: { fullySpecified: false }` can help resolve internal imports within .mjs files
    //    that might not include full file extensions, which sometimes causes issues with Webpack 5's strictness.
    config.module.rules.push({
      test: /\.mjs$/,
      // Apply this rule specifically to files within the 'onnxruntime-web' package's 'dist' directory.
      // Adjust the `include` path if the problematic files are located elsewhere within the package.
      include: /node_modules[/\\]onnxruntime-web[/\\]dist/,
      type: 'javascript/esm', // Explicitly treat as ES Module
      parser: {
        // This is crucial for `import.meta.url` and similar internal ESM features
        // that might not be handled gracefully by default parsing.
        fullySpecified: false,
      },
    });

    // 4. Ensure .wasm files are correctly handled as assets.
    //    While Next.js usually handles this, explicit configuration ensures consistency
    //    and correct URL generation for the WASM binaries.
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        // Defines how the output file name will be generated for .wasm assets.
        // This is important for the `onnxruntime-web` library to locate its WASM binaries at runtime.
        filename: 'static/chunks/[name].[contenthash][ext]',
      },
    });

    // Important: For server-side (Node.js) builds, you often want to exclude
    // node_modules from bundling where possible, especially for libraries
    // that might try to access Node.js native modules.
    // However, onnxruntime-web is complex and might contain code that needs to be bundled.
    // `transpilePackages` already ensures it is processed.
    // The current error is about *parsing* the bundled files, not externalizing.

    return config;
  },
};

export default config;
