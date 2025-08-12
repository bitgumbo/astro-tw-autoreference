/**
 * Returns the same value that was passed in.
 *
 * This function is primarily used for testing,
 * type inference experiments, or as a placeholder
 * for functions that need to satisfy a contract.
 *
 * @example
 * ```ts
 * identity(42); // => 42
 * identity({ foo: 'bar' }); // => { foo: 'bar' }
 * ```
 *
 * @remarks
 * This is a generic function and will preserve
 * the type of the argument passed to it.
 */
export const identity = <T>(value: T): T => value;
