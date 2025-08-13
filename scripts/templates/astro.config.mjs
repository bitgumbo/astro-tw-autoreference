// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import twAutoReference from 'astro-tw-autoreference/vite';

export default defineConfig({
  vite: {
    plugins: [
      twAutoReference({
        references: ['../styles/tailwind.css'],
      }),
      tailwindcss(),
    ],
  },
});
