import generateTypeScriptFile from "./generateTypeScriptFile";

import fs from "fs";
import chokidar from "chokidar";
import path from "path";
import { NextConfig } from "next";

export interface PluginOptions {
  /**
   * If provided, will save the types to the provided outDir
   */
  outDir?: string;
}

const packageName = "next-type-safe-routes";
/**
 * Expressed as a path from the srcDir
 */
const defaultOutDir = path.join("@types", packageName);

const log = (message: string) => {
  console.log(`\x1b[36m${packageName}\x1b[0m: ${message}`);
};

interface PathConfig {
  pagesDir: string;
  outDir: string;
}

const writeTypesToDisc = ({ pagesDir, outDir: inputOutDir }: PathConfig) => {
  const typeScriptFile = generateTypeScriptFile(pagesDir);
  const srcDir = path.dirname(pagesDir);
  const outDir = path.isAbsolute(inputOutDir)
    ? inputOutDir
    : path.join(srcDir, inputOutDir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.d.ts"), typeScriptFile);
  log(`types written to ${outDir}`);
};

const watchRoutes = ({ pagesDir, outDir }: PathConfig) => {
  // Generate the types file when the app is being compiled
  writeTypesToDisc({ pagesDir, outDir });

  // Generate the types file again when page files are added/removed
  const watcher = chokidar.watch(pagesDir, { ignoreInitial: true });
  watcher.on("add", () => writeTypesToDisc({ pagesDir: pagesDir, outDir }));
  watcher.on("unlink", () => writeTypesToDisc({ pagesDir: pagesDir, outDir }));
};

const run = (nextConfig: NextConfig = {}): NextConfig => {
  const webpack: Exclude<NextConfig["webpack"], undefined> = (
    config,
    context
  ) => {
    const pagesDir = config.resolve.alias["private-next-pages"];
    watchRoutes({
      // This seems to be the way to get the path to the pages
      // directory in a Next.js app. Since it's possible to have a
      // `/src` folder (https://nextjs.org/docs/advanced-features/src-directory)
      // we cannot assume that it just in a `/pages` folder directly
      // in the root of the project
      pagesDir,
      outDir: nextConfig["nextTypeSafeRoutes"]?.outDir || defaultOutDir,
    });

    // if other webpack customizations exist, run them
    if (typeof nextConfig.webpack === "function") {
      return nextConfig.webpack(config, context);
    }

    // Return the un-modified config
    return config;
  };
  return { ...nextConfig, webpack };
};

export default run;
