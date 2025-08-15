/** Options for the plugin */
export interface Options {
  /** Include files whose path starts with one of these */
  include?: string[];

  /** Exclude files whose path starts with one of these */
  exclude?: string[];

  /** Paths to css files you want to auto reference */
  references?: string[];
}
