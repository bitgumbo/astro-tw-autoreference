import type { Plugin } from 'vite';
import {
  generateReferences,
  shouldInjectReferences,
  toAbsolutePaths,
} from './lib.js';
import type { Options } from './types.ts';

/** Default options for the plugin */
const DEFAULTS: Required<Options> = {
  include: ['src/components', 'src/layouts', 'src/pages'],
  exclude: [],
  references: [],
};

/**
 * Generate a vite plugin that will automatically inject Tailwind directives at the top of your Astro components style blocks
 *
 * @param options Options for the plugin
 * @returns A vite plugin
 *
 */
export default function astroTwAutoreference(options: Options = {}): Plugin {
  const config = { ...DEFAULTS, ...options };

  const includePrefixes = toAbsolutePaths(config.include);
  const excludePrefixes = toAbsolutePaths(config.exclude);
  const absoluteReferences = toAbsolutePaths(config.references);
  const referenceLines = generateReferences(absoluteReferences);

  return {
    name: 'vite-plugin-astro-tw-autoreference',
    enforce: 'pre',

    transform(code, id) {
      if (!shouldInjectReferences(id, code, includePrefixes, excludePrefixes))
        return;

      let result = '';

      for (const refline of referenceLines) {
        if (!code.includes(refline)) {
          result += `${refline}\n`;
        }
      }

      result += code;

      return {
        code: result,
        map: null,
      };
    },
  };
}
