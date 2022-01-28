<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" height="100">
  <h1 align="center">next-type-safe-routes</h1>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/next-type-safe-routes">
    <img alt="" src="https://img.shields.io/npm/v/next-type-safe-routes.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/ckastbjerg/next-type-safe-routes/license.md">
    <img alt="" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

`next-type-safe-routes` parses the `/pages` folder in your Next.js app and generates types for all the **pages** and **API routes** in the application. These types can then be used to ensure that you only link to pages (and only use API routes) that _actually_ exists in your application.

With the types generated, you can use the `getRoute` utility to retrieve **links that are guaranteed to exist** in your the application:

<img src="./getRoute.gif" />

## Features

- **Automatic route listing**. Avoid having to maintain a list of existing pages for your application
- **Compile time route validation**. Avoid having to run your application to verify if links are correct, just use types
- **Unopinionated**. Use our simple and composable utils or create your own abstraction

## Installation

Install using yarn:

```bash
yarn add next-type-safe-routes
```

Or using npm:

```bash
npm install next-type-safe-routes --save
```

## Usage

> For an example setup, see the [`/example`](/example) folder

The easiest way to use `next-type-safe-routes`, is with [`next-compose-plugins`](https://github.com/cyrilwanner/next-compose-plugins). With `next-compose-plugins` installed, you can add a `next.config.js` file with the following content:

```js
const withPlugins = require("next-compose-plugins");
const nextTypeSafePages = require("next-type-safe-routes/plugin");

module.exports = withPlugins([nextTypeSafePages]);
```

When you start up your application, we will generate types for all of your pages and API routes and save them to the file `@types/next-type-safe-routes/index.d.ts` in the root of your project. The file will be updated whenever you add or remove pages and API routes.

> Note, you should commit this file as part of your project. And if you're using a code formatter or linter, you may want to add this file to your ignore files. E.g. `.eslintignore` and `.prettierignore` files.

You can now import the `getRoute` util from `next-type-safe-routes` and use it to retrieve a route that's is guaranteed to exist in your application.

```ts
import { getRoute } from "next-type-safe-routes";

// for simple routes (e.g. the file `/pages/users.tsx`)
getRoute("/users");
// for dynamic routes (e.g. the file `/pages/users/[userId]/index.tsx`)
getRoute({ route: "/users/[userId]", params: { userId: "1" } });
// for catch all routes (e.g. the file `/pages/catch-all/[[...slug]].tsx`)
getRoute({ route: "/catch-all", path: "/a/b/c" });
```

Now you just need to decide how you want to integrate `next-type-safe-routes` in your project. If you want inspiration, we demonstrate how to create a simple abstraction for the Next.js `Link` and `router` in [the example project](/example/src).

<img src="./example.gif" />

## Configuration

You can configure the plugin by adding values to the `nextTypeSafeRoutes` object
in `next.config.js`:

```js
const withPlugins = require("next-compose-plugins");
const nextTypeSafePages = require("next-type-safe-routes/plugin");

module.exports = withPlugins([nextTypeSafePages], {
  outDir: "@types/custom-page-type-directory",
});
```

Available options:

### `outDir`

**Default:** `@types/next-type-safe-routes`

If provided, will save the types to a file called `index.d.ts` in the provided
directory. Paths are placed relative to the `src/` directory, and absolute paths
are also supported.

## How it works

Since the Next.js router is based (strictly) on the file-system, we can determine which pages and API routes exists in an application simply by parsing the `/pages` folder. And due to the strictness, we can also determine which parameters are needed for dynamic routes.

As mentioned in the usage section, we generate a module declaration specific to your project when running your project. The output looks like this:

```ts
declare module "next-type-safe-routes" {
  export type TypeSafePage = ... // all your pages
  export type TypeSafeApiRoute = ... // all your routes
  export const getPathname = ... // typed based on your routes
  export const getRoute = ... // typed based on your routes
}
```

> See [`/example/src/@types/next-type-safe-routes/index.d.ts`](/example/src/@types/next-type-safe-routes/index.d.ts) for a real example

The trick here is, that we override the types for `next-type-safe-routes`. And we (re)define the args accepted by the `getRoute` and `getPathname` to match the types for your project.

The declaration will be written to `@types/next-type-safe-routes/index.d.ts` in the root (determined by Next.js) of your project.

## API reference

How you ensure that only links to existing pages is essentially up to you, but we do expose a few _tiny_ util methods to help you do this.

#### The `getRoute` method

A simple method that converts a type-safe route to an "actual" route.

**Examples:**

```ts
import { getRoute } from "next-type-safe-routes";

// For simple (non-dynamic) routes
const route = getRoute("/users"); // => "/users"

// With query params
const route = getRoute({
  route: "/users",
  query: { "not-typed": "whatevs" },
}); // => "/users?not-typed=whatevs"

// For dynamic routes
const route = getRoute({
  route: "/users/[userId]",
  params: { userId: 1234 },
}); // => "/users/1234"

// For catch all routes
const route = getRoute({
  route: "/catch-all",
  path: "/can/be/anything",
}); // => "/catch-all/can/be/anything"
```

> [Optional catch all routes](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) are also supported.

#### The `getPathname` method

The `getPathname` works similarly to the `getRoute`. It just returs a [Next.js pathname](https://nextjs.org/docs/api-reference/next/router#router-object). For instance:

```ts
import { getPathname } from "next-type-safe-routes";

const path = getPathname({
  route: "/users/[userId]",
  params: { userId: 1234 },
}); // => `/users/[userId]`
```

#### The `TypeSafePage` and `TypeSafeApiRoute` types

These can be useful for making your own abstraction. For instance, if you want to make a tiny abstraction ontop of the `next/router`:

```ts
import { TypeSafePage, getRoute } from "next-type-safe-routes";
import { useRouter as useNextRouter } from "next/router";

const useRouter = () => {
  const router = useNextRouter();

  // Say you only want to allow links to pages (and not API routes)
  const push = (typeSafeUrl: TypeSafePage) => {
    router.push(getRoute(typeSafeUrl));
  };

  return { ...router, push };
};

export default useRouter;
```

For basic routes, the type can be of the type `string` or:

```ts
{
  route: string,
  query?: { ... } // any key value pairs (not type-safe)
}
```

And for dynamic routes, the type is always:

```ts
{
  route: string,
  params: { ... }, // based on the file name
  query?: { ... } // any key value pairs (not type-safe)
}
```

And for [catch all routes](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes), a (non-typed) `path` will also be required (or optional for [optional catch all routes](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes)):

```ts
{
  route: string,
  path: string,
  params: { ... }, // based on the file name
  query?: { ... } // any key value pairs (not type-safe)
}
```

**Examples**:

```ts
type Query = { [key: string]: any };
export type TypeSafePage =
  | "/users"
  | { route: "/users"; query?: Query }
  | {
      route: "/users/[userId]";
      params: { userId: string | number };
      query?: Query;
    }
  | {
      route: "/users/[userId]/catch-all-route";
      params: { userId: string | number };
      path="/catch/all/path"
      query?: Query;
    };
```

> Note, the `TypeSafePage` and `TypeSafeApiRoute` are kept separate even though they are essentially the same type. We do this, as you may potentially want to distinguish between them in your application.

## Motivation

At my company, [Proper](https://helloproper.com/), we like pages. Like...a lot! Our platform is a fairly large Next.js application consisting of ~70 pages. And we link between pages ~200 places in the application.

We find that having pages make features easily discoverable by end-users and developers alike. And having pages (urls) for each of our features help us maintain a sane information architecture throughout our platform.

The [Next.js file-system based router](https://nextjs.org/docs/routing/introduction) help us stay consistent and organised around our pages. But we've had some incidents where our application was released with dead links.

At one point, a file in the `/pages` folder was renamed and we simply overlooked (forgot to change) some of the links to that page. Another time, a bit of "clever" string concatenation caused an issue. In this case, we had moved a page, and failed to update all links to the page correctly due to the concatenated links.

With the `next-type-safe-routes`, we're trying to mitigate this issue. The plugin gives us confidence when refactoring as well as a top notch developer experience.

> We considered something like the [`next-routes`](https://github.com/fridays/next-routes) approach, but we don't want to manually have to maintain a list of routes in the application. We prefer conventions to be enforced when possible.
