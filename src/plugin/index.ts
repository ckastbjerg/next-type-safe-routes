import generateTypeScriptFile from "./generateTypeScriptFile";

import mkdirp from "mkdirp";
import fs from "fs";
import chokidar from "chokidar";
import path from "path";

const packageName = "next-type-safe-routes";
const defaultDesintaionFolder = path.join("@types", packageName);

const log = (message: string) => {
  console.log(`\x1b[36m${packageName}\x1b[0m: ${message}`);
};


const writeTypesToDisc = ({ source, destination }: {
  source: string;
  destination: string;
}) => {
  const typeScriptFile = generateTypeScriptFile(source);
  mkdirp.sync(destination);
  fs.writeFileSync(path.join(destination, "index.d.ts"), typeScriptFile);
  log(`types written to ${destination}`);
};

const watchRoutes = ({ source, destination }: {
  source: string;
  destination: string;
}) => {
      // Generate the types file when the app is being compiled
      writeTypesToDisc({
         source: pagesDir,
         destination
      });
  
      // Generate the types file again when page files are added/removed
      const watcher = chokidar.watch(pagesDir, { ignoreInitial: true });
        watcher.on("add", () => writeTypesToDisc({
         source: pagesDir,
         destination
      }));
      watcher.on("unlink", () => writeTypesToDisc({
         source: pagesDir,
         destination
      }));
}

const run = (nextConfig: any = {}) => {  
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      
      watchRoutes({
        // This seems to be the way to get the path to the pages
        // directory in a Next.js app. Since it's possible to have a
        // `/src` folder (https://nextjs.org/docs/advanced-features/src-directory)
        // we cannot assume that it just in a `/pages` folder directly
        // in the root of the project
        source: config.resolve.alias["private-next-pages"],
        destination: nextConfig?.nextTypeSafeRoutes?.destination || defaultDesintaionFolder; 
      })
      
      // if other webpack customizations exist, run them
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      // Return the un-modified config
      return config;
    },
  });
};

export default run;
