# DSI Cloudflare Password

This package can be used to add simple password-based authentication to a static
website running on Cloudflare Workers. It does so by injecting a worker script
that listens to incoming connections and prompts for a password if a JWT cookie
is not set.

## Usage

### How to password protect a site

In your static site repo, install this package:

```bash
npm i @designsystemsinternational/cloudflare-password
```

Then, add the following two environment variables in Cloudflare Workers and set
it to the desired values.

```
SECRET=supersecret
PASSWORD=something
```

Then, make sure that your build process copies the auth templates into an `auth`
folder in your build output. Here's an example of what this looks like for a
Vite site:

```json
{
  "scripts": {
    "build": "vite build && cp -r node_modules/@designsystemsinternational/cloudflare-password/dist/auth dist/auth/"
  }
}
```

Then, add the following to your `wrangler.jsonc` file, on top of your existing
config for the static site.

```jsonc
{
  // This makes sure that the worker runs as a part of the deployment
  "main": "./node_modules/@designsystemsinternational/cloudflare-password/worker/index.ts",
  "assets": {
    // This is needed because the binding is hard coded in the worker
    "binding": "ASSETS",
    // This makes sure that the worker runs before serving static assets
    // Can use array of globs to only protect certain files
    "run_worker_first": true
  }
}
```

## Development

### Local development

Because of the way Cloudflare workers operate, it's hard to have a single local
development command to test the entire flow while preserving the Vite hot module
reloading. So, the development scripts are divided into two:

- `npm run dev` runs the cloudflare worker in a local environment that matches
  the production environment. With this, you can test the entire login flow, but
  the auth templates will use `vite build` and not run via hot module reloading.
- `npm run dev:templates` will run the Vite dev server, so it's possible to
  design the templates with hot module reloading. The worker won't run, so the
  actual login won't work.

All you need is to add a `.env.local` file with the required environment
variables above.
