# polakapi landing

Single-page Astro site for [polakapi](https://github.com/rafaelje/polakapi), built as a static Cloudflare asset deployment.

## Local development

```sh
pnpm install
pnpm dev
```

## Quality checks

```sh
pnpm test
pnpm check
pnpm doctor
pnpm build
```

## Cloudflare deployment

The site is configured in `wrangler.jsonc` to publish the generated `dist` directory.

```sh
pnpm deploy
```

The same settings work with Cloudflare Pages using `pnpm build` as the build command and `dist` as the output directory.
