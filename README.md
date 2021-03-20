# `next-type-safe-pages` (alpha)

> **Important note!** This is work in progress. The API is prone to changes

The `next-type-safe-pages` plugin is a **type generator**. It parses the `/pages` folder in your Next.js application and generates types for all the **pages** and **API routes** in your application.

#### Features

- Ensure that you only link to **pages** that _actually_ exists
- Ensure that you only use **API routes** that _actually_ exists
- Avoid having to maintain a list of existing pages for your application
- Compile-time validation for all you internal page links
- Simple & composable utilities. Create the abstraction that works for your team and application.
- Take advantage of autocompletion when linking between pages

<img src="./gif.gif" />

## Table of Contents

1. [Motivation](#motivation)
2. [Usage](#usage)
3. [How it works](#how-it-works)

## Motivation

At my company, [Proper](https://helloproper.com/), we like having pages. We maintain a fairly large Next.js app consisting of ~70 pages. And we have internal page links ~200 place in the application.

The [Next.js file-system based router](https://nextjs.org/docs/routing/introduction) help us stay consistent and organized. And it makes our features discoverable by new developers.

However, we've had some accidents where our application was released with broken links. In one case, a page file was renamed and we failed to correct all the links to that page. In another case, we had been a bit _too_ clever while using string concatenation.

We now use the `next-type-safe-pages` plugin to mitigate this issue. Cause we don't wanna have to worry about breaking links to pages when refactoring our application.

## Usage

> For an example setup, see the [`/example`](/example) folder

The easiest way to use `next-type-safe-pages`, is with `next-compose-plugins`. To do so, simply add a `next.config.js` file.

> See [`/example/src/next.config.js`](/example/src/next.config.js)

```js
const withPlugins = require("next-compose-plugins");
const nextTypeSafePages = require("next-type-safe-pages/dist/plugin").default;

module.exports = withPlugins([nextTypeSafePages]);
```

When you run your application, this will generate a file containing the following type declarations:

> See [`/example/src/@types/next-type-safe-pages/index.d.ts`](/example/src/@types/next-type-safe-pages/index.d.ts)

```ts
declare module "next-type-safe-pages" {
  export type TypeSafePage // all your pages
  export type TypeSafeApiRoute // all your routes
  export const getPathname // typed based on your routes
  export const getRoute // typed based on your routes
}
```

The file will be written to `@types/next-type-safe-pages/index.d.ts` in the root of your project. And you probably want to commit this file to your project.

#### The `TypeSafePage` and `TypeSafeApiRoute` types

These can either be of the type `string` (for non-dynamic routes) or `{ route: string, [...params] }` for dynamic routes:

For instance:

```ts
export type TypeSafePage =
  | "/users"
  | { route: "/users/[userId]"; userId: string | string[] | number };
```

> Note, the `TypeSafePage` and `TypeSafeApiRoute` I kept separate even though they are essentially the same type. But you may want to distinguish between them in your application.

How you ensure that only links to existing pages is essentially up to you, but we do expose a few utils to help you do this.

#### The `getPathname` method

TODO

#### The `getRoute` method

TODO

## How it works

Since Next.js router is strictly based on the file-system, we can easily determine which pages and API routes exists. And we can also determine which query parameters are need to link to a dynamic route.

For instance, the real url for the file `/users/[userId]/index.ts` would be `/users/some-1`. And it requires a `userId`. TODO...
