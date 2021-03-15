#!/usr/bin/env node

"use strict";

process.title = "type-safe-next-pages";

var fs = require("fs");
var program = require("commander");

var generateTypeScriptFile = require("../dist/generateTypeScriptFile").default;
var packageJson = require("../package.json");

program
  .version(packageJson.version)
  .usage("[options] <nextPagesDirectory>")
  .option("-i, --input <dir>", "path to Next.js pages directory")
  .option(
    "-o, --output <dir>",
    "the directory where the .ts file should be placed"
  )
  .parse(process.argv);

program.parse(process.argv);
const options = program.opts();

var input = options.input;
var output = options.output;

var config = program.config;

if (!input) {
  program.help();
  return;
}

if (!fs.existsSync(input)) {
  console.error("no such input '%s'", input);
  return;
}

var data = generateTypeScriptFile(fs.realpathSync(input));
fs.writeFileSync(output, data);
