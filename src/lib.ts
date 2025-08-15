import path from 'node:path';
import type { NormalizedOptions, Options } from './types.js';

const tailwindDirectivePattern = /@(apply|variant|utility)\b/i;

/**
 * Convert a relative path to an absolute path
 *
 * @param p the path to resolve
 * @param root the root to resolve from
 * @returns the absolute path
 */
export const toAbsolutePath = (p: string, root: string = process.cwd()) => {
  return path.resolve(root, p);
};

/**
 * Convert a list of relative paths to absolute paths
 *
 * @param paths list of paths to resolve
 * @param root the root to resolve from
 * @returns a list of absolute paths
 */
export const toAbsolutePaths = (
  paths: string[],
  root: string = process.cwd(),
) => {
  return paths.map((p) => toAbsolutePath(p, root));
};

/**
 * Determine if a file should have references injected
 *
 * @param id file id as returned by Vite
 * @param code file contents as returned by Vite
 * @returns true if the file should have references injected
 *
 */
export const shouldInjectReferences = (
  id: string,
  code: string,
  options: NormalizedOptions,
) => {
  const isIncluded = options.include.some((prefix) => id.startsWith(prefix));
  const isExcluded = options.exclude.some((prefix) => id.startsWith(prefix));

  const asUrl = new URL(id, 'file://');

  const isAstroFile = asUrl.pathname.endsWith('.astro');
  const isTypeStyle = asUrl.searchParams.get('type') === 'style';
  const hasAstroFlag = asUrl.searchParams.has('astro');
  const hasLangFlag = asUrl.searchParams.has('lang.css');
  const hasTwDirectives = tailwindDirectivePattern.test(code);

  return (
    isIncluded &&
    !isExcluded &&
    isAstroFile &&
    isTypeStyle &&
    hasAstroFlag &&
    hasLangFlag &&
    hasTwDirectives
  );
};

/**
 * Generate a list of reference directives
 *
 * @param references css files to autoreference
 * @returns a list of reference directives
 */
export const generateReferences = (references: string[]): string[] => {
  return references.map((reference) => `@reference "${reference}";`);
};

/**
 * Ensure that a value is an array, or convert it to an array if it is a single value.
 *
 * @param value the value to enforce as an array
 * @returns the value if it is an array, otherwise an array containing the value
 *
 */
export const enforceArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

/**
 * Normalize plugin options
 *
 * The function takes an object of options and returns a new object with the
 * `include`, `exclude`, and `references` properties normalized to arrays of
 * absolute paths.
 *
 * @param options plugin options
 * @returns normalized plugin options
 *
 */

export const normalizeOptions = (
  options: Required<Options>,
): NormalizedOptions => ({
  include: toAbsolutePaths(enforceArray(options.include)),
  exclude: toAbsolutePaths(enforceArray(options.exclude)),
  references: toAbsolutePaths(enforceArray(options.references)),
});
