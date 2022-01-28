import generateTypeScriptFile from "./generateTypeScriptFile";

import fs from "fs";
import chokidar from "chokidar";
import path from "path";
import { NextConfig } from "next";

const packageName = "next-type-safe-routes";
const defaultOutDir = path.join("@types", packageName);

const log = (message: string) => {
  console.log(`\x1b[36m${packageName}\x1b[0m: ${message}`);
};

interface PathConfig {
  srcDir: string;
  outDir: string;
}

const writeTypesToDisc = ({ srcDir, outDir }: PathConfig) => {
  const typeScriptFile = generateTypeScriptFile(srcDir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.d.ts"), typeScriptFile);
  log(`types written to ${outDir}`);
};

const watchRoutes = ({ srcDir, outDir }: PathConfig) => {
  // Generate the types file when the app is being compiled
  writeTypesToDisc({ srcDir, outDir });

  // Generate the types file again when page files are added/removed
  const watcher = chokidar.watch(srcDir, { ignoreInitial: true });
  watcher.on("add", () => writeTypesToDisc({ srcDir, outDir }));
  watcher.on("unlink", () => writeTypesToDisc({ srcDir, outDir }));
};

const run = (nextConfig: NextConfig = {}): NextConfig => {
  const webpack: Exclude<NextConfig["webpack"], undefined> = (
    config,
    context
  ) => {
    watchRoutes({
      // This seems to be the way to get the path to the pages
      // directory in a Next.js app. Since it's possible to have a
      // `/src` folder (https://nextjs.org/docs/advanced-features/src-directory)
      // we cannot assume that it just in a `/pages` folder directly
      // in the root of the project
      srcDir: config.resolve.alias["private-next-pages"],
      outDir: nextConfig["nextTypeSafeRoutes"]?.destination || defaultOutDir,
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
