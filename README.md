# DSI Auth

This package can be used to add simple password-based authentication to a static
website running on Cloudflare Workers.

## Usage

In your static website repo, install this package:

```bash
npm i @designsystemsinternational/cloudflare-auth
```

Then, make sure that your build process copies the auth templates into an `auth`
folder in your build output:

```json
{
  "scripts": {
    "build": "vite build && mkdir -p dist/auth && cp -r node_modules/@designsystemsinternational/cloudflare-auth/dist/* dist/auth/"
  }
}
```

Then, add the following to your `wrangler.jsonc` file:

```jsonc
{
  "name": "my-website",
  "compatibility_date": "2025-12-08",
  // This makes sure that the worker runs as a part of the deployment
  "main": "./node_modules/@designsystemsinternational/cloudflare-auth/src/worker.ts",
  "assets": {
    // This should be your normal build directory
    "directory": "./dist",
    // This is to serve the website as an SPA
    "not_found_handling": "single-page-application",
    // This name cannot be changed
    "binding": "ASSETS",
    // This makes sure that the worker runs before serving static assets
    // Can use array of globs to protect certain files
    "run_worker_first": true
  }
}
```

## Local testing

The package is set up to run a local instance of
