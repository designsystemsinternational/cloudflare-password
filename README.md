# DSI Auth

This package can be used to add simple password-based authentication to a static
website running on Cloudflare Workers.

## Usage

In your static website repo, install this package:

```bash
npm i @designsystemsinternational/cloudflare-password
```

Then, make sure that your build process copies the auth templates into an `auth`
folder in your build output:

```json
{
  "scripts": {
    "build": "vite build && mkdir -p dist/auth && cp -r node_modules/@designsystemsinternational/cloudflare-password/dist/* dist/auth/"
  }
}
```

Then, add the following to your `wrangler.jsonc` file:

```jsonc
{
  "name": "my-website",
  "compatibility_date": "2025-12-08",
  // This makes sure that the worker runs as a part of the deployment
  "main": "./node_modules/@designsystemsinternational/cloudflare-password/src/worker.ts",
  "assets": {
    // This should be your normal build directory
    "directory": "./dist",
    // This is to serve the website as an SPA
    "not_found_handling": "single-page-application",
    "binding": "ASSETS",
    // This makes sure that the worker runs before serving static assets
    // Can use array of globs to protect certain files
    "run_worker_first": true
  }
}
```

## Local testing

Because of the way Cloudflare workers operate, it's hard to have a single local
development command to test the entire flow while preserving hot module
reloading. So, the development scripts are divided into two:

If you want to design the auth templates, run the normal Vite dev server, which
serves the login page on the root path. The actual login won't work, but you can
use this for a nice development environment for the HTML, CSS and JS:

```bash
npm run dev:templates
```

Once the templates are done, you can test the entire login flow using the normal
dev script:

```bash
npm run dev
```
