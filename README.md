# `next-type-safe-pages`

Ensure that the pages and API routes in you Next.js app actually exists.

## Usage

The easiest way to use `next-type-safe-pages`, is with `next-compose-plugins`. To do so, simply add a `next.config.js` file.

```js
const withPlugins = require("next-compose-plugins");
const nextTypeSafePages = require("next-type-safe-pages/dist/plugin").default;

module.exports = withPlugins([nextTypeSafePages]);
```

This will generate a file containing the following type declarations:

```ts
declare module "next-type-safe-pages" {
  export type TypeSafePage = [...] // all your pages
  export type TypeSafeApiRoute =  [...] // all your routes
  export const getPathname = (typeSafeUrl: TypeSafePage | TypeSafeApiRoute) => string;
  export const getSearchParams = (query: any) => string;
  export const getApiRoute = (typeSafeUrl: TypeSafeApiRoute, query?: any) => string;
  export const getAsPath = (typeSafeUrl: TypeSafePage | TypeSafeApiRoute, query?: any) => string;
}
```

The file will be written to `@types/next-type-safe-pages/index.d.ts` in the root of your project. And you probably want to commit the file.

####

## How it works

## TODO

- Should option `esModuleInterop` be required in tsconfig?
