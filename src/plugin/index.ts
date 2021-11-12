import generateTypeScriptFile from "./generateTypeScriptFile";

import mkdirp from "mkdirp";
import fs from "fs";
import chokidar from "chokidar";

const packageName = "next-type-safe-routes";
const typeFolder = `@types/${packageName}`;

const log = (message: string) => {
  console.log(`\x1b[36m${packageName}\x1b[0m: ${message}`);
};

const writeTypesToDisc = (nextPagesDirectory: string) => {
  const srcDir = nextPagesDirectory.replace("/pages", "");
  const typeFolderPath = `${srcDir}/${typeFolder}`;
  const typeScriptFile = generateTypeScriptFile(nextPagesDirectory);

  mkdirp.sync(typeFolderPath);
  fs.writeFileSync(`${typeFolderPath}/index.d.ts`, typeScriptFile);

  log(`types written to ${typeFolder}`);
};

const run = (nextConfig: any = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // This seems to be the way to get the path to the pages
      // directory in a Next.js app. Since it's possible to have a
      // `/src` folder (https://nextjs.org/docs/advanced-features/src-directory)
      // we cannot assume that it just in a `/pages` folder directly
      // in the root of the project
      const pagesDir = config.resolve.alias["private-next-pages"];
      // Generate the types file when the app is being compiled
      writeTypesToDisc(pagesDir);
      // Generate the types file again when page files are added/removed
      const watcher = chokidar.watch(pagesDir, { ignoreInitial: true });
      watcher.on("add", () => writeTypesToDisc(pagesDir));
      watcher.on("unlink", () => writeTypesToDisc(pagesDir));

      // if other webpack customizations exist, run them
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      // Return the un-modified config
      return config;
    },
  });
};

export default run;
