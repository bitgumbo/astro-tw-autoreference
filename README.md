> **Warning** This package is still in development and unpublished. The install directions below will not work and it should not be used yet in production.

# astro-tw-autoreference
This package will automatically inject Tailwind 4 `@reference` directives at the top of your Astro components style blocks.

It is currently implemented as a Vite plugin, but future versions may be implemented as an Astro integration.

## Why?
With Tailwind4, it is now required to use the `@reference` directive at the top of your components style blocks if you wish to use the `@apply` directive, or otherwise access tailwind utilities or your theme/configuration.

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

Otherwise, you will recieve an error that an unknown utility class cannot be applied.

Without this package, you would have to manually added the `@reference` directive at the top of each component style block.

## Quick Start

### Installation
```bash
npm install -D astro-tw-autoreference
```

Then add it to your `astro.config.ts` as a Vite plugin.  Make sure it comes before the tailwindcss plugin.
```ts
// astro.config.ts
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import twAutoReference from 'astro-tw-autoreference';

export default defineConfig({
  vite: {
    plugins: [
      twAutoReference(),
      tailwindcss()
    ],
  },
});

```

## Usage
That's all you need to do.  Simply use your Astro components as normal and enjoy the usage of your tailwind setup in your style blocks!

