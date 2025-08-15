export type OneOrMany<T> = T | T[];

/** Options for the plugin */
export interface Options {
  /** Include files whose path starts with one of these */
  include?: OneOrMany<string>;

  /** Exclude files whose path starts with one of these */
  exclude?: OneOrMany<string>;

  /** Paths to css files you want to auto reference */
  references?: OneOrMany<string>;
}

export interface NormalizedOptions {
  include: string[];
  exclude: string[];
  references: string[];
}
