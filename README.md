# astro-tw-autoreference
This package will automatically inject Tailwind 4 `@reference` directives at the top of your Astro components style blocks.

It is currently implemented as a Vite plugin, but future versions may offer as an Astro integration as well.

> ⚠️ Early development (v0.x) — the plugin is small and stable, but API changes are still possible.  
> There may be edge cases I haven’t considered based on different workflows,  
> but it is already being used in several production projects without issues.

## Why?
With Tailwind v4, it is now required to use the `@reference` directive at the top of your components style blocks if you wish to use the `@apply` directive, or otherwise access Tailwind utilities or your theme/configuration.

```html
<!-- SomeComponent.astro -->
<p>Lorem ipsum dolor sit amet.</p>

<style>
  @reference "@styles/tailwind.css";

  p {
    @apply text-2xl; 
  }
</style>
```

Otherwise, you will receive an error that an unknown utility class cannot be applied.

Without this package, you would have to manually add the `@reference` directive at the top of each component style block.

## Quick Start

### Installation
```bash
npm install -D astro-tw-autoreference
```

### Usage
Then add it to your `astro.config.ts` as a Vite plugin.  Make sure it comes before the tailwindcss plugin.
```ts
// astro.config.ts
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import twAutoReference from 'astro-tw-autoreference';

export default defineConfig({
  vite: {
    plugins: [
      twAutoReference({
        references: 'src/styles/tailwind.css'
      }),
      tailwindcss()
    ],
  },
});

```
That's all you need to do.  Simply use your Astro components as normal and enjoy the usage of your tailwind setup in your style blocks!

## Options
**Note:** *any relative paths provided will be resolved against the current working directory - glob patterns are not currently supported*

The plugin options are defined as such:
```ts
export interface Options {
  include?: string | string[];
  exclude?: string | string[];
  references: string | string[];
}
```

### `Options["include"]`
An array of file patterns to determine which files should receive reference injections.

Resolved paths will be used as prefixes and, as such, files will be included if they start with any of the prefixes.

### `Options["exclude"]`
An array of paths to determine which files should not receive reference injections. Same as `Options["include"]`, but files will be excluded if they start with any of the prefixes.

### `Options["references"]`
An single string, or array of strings of CSS files for which reference directives will be injected. Each file in this array will result in a reference directive injected into any files allowed by the above options.


