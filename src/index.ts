import type { Plugin } from 'vite';
import {
  generateReferences,
  shouldInjectReferences,
  toAbsolutePaths,
} from './lib.js';

/** Options for the plugin */
export interface Options {
  /** Include files whose path starts with one of these */
  include?: string[];

  /** Exclude files whose path starts with one of these */
  exclude?: string[];

  /** Paths to css files you want to auto reference */
  references?: string[];
}

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

  return {
    name: 'vite-plugin-astro-tw-autoreference',
    enforce: 'pre',

    transform(code, id) {
      if (!shouldInjectReferences(id, code, includePrefixes, excludePrefixes))
        return;

      let result = '';

      for (const refline of generateReferences(absoluteReferences)) {
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
