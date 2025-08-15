export type OneOrMany<T> = T | T[];

/**
 * Plugin options for user api
 */
export interface Options {
  /** Include files whose path starts with one of these */
  include?: OneOrMany<string>;

  /** Exclude files whose path starts with one of these */
  exclude?: OneOrMany<string>;

  /** Paths to css files you want to auto reference */
  references?: OneOrMany<string>;
}

/**
 * Plugin options with normalized paths and non-null fields
 */
export interface NormalizedOptions {
  include: string[];
  exclude: string[];
  references: string[];
}
