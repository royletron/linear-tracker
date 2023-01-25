# Linear like Tracker

I really like the performance of the calendar/tracker on linear.app so I tried to reverse engineer it.

[See a preview](https://royletron.dev/linear-tracker/)

## What I Found

Basically it looks like vertical scrolling is taken care by the browser, but the horizontal scrolling is fudged using css transforms and hijacking the neccesary scrolling events. This means that syncing content is only ever focussed on one single source of truth, and can be done rapidly using transform GPU tricks. The demo sits quite nicely in the 60FPS category, even when under intense scrolling - and that scrolling is infinite!

## Apps and Packages

This is put together as a turbo-repo

- `web`: a [Next.js](https://nextjs.org/) for the docs site 
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: `tailwind.config.js`s used throughout the monorepo
- `tracker`: the main heft of the library.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```
