import generateTypeScriptFile from "./generateTypeScriptFile";

import mkdirp from "mkdirp";
import fs from "fs";

const run = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config) {
      // TODO: Is this the best way to get the pages dir?
      const pagesDir = config.resolve.alias["private-next-pages"];
      // It's allows to have a `src` folder in Next.js
      // TODO: Is it possible to just get the src folder?
      const srcDir = pagesDir.replace("/pages", "");
      const typeFolder = `${srcDir}/@types/next-type-safe-routes`;
      const typeScriptFile = generateTypeScriptFile(pagesDir);
      mkdirp.sync(typeFolder);
      fs.writeFileSync(`${typeFolder}/index.d.ts`, typeScriptFile);
      console.info(`next-type-safe-routes: Wrote types to ${typeFolder}`);
      return config;
    },
  });
};

export default run;
