import { shouldInjectTestCases } from './data.js';
import * as lib from '@/lib.js';

describe('lib functions', () => {
  test('toAbsolutePath', () => {
    expect(lib.toAbsolutePath('foo')).toBe(`${process.cwd()}/foo`);
    expect(lib.toAbsolutePath('foo', '/bar')).toBe('/bar/foo');
  });

  test('toAbsolutePaths', () => {
    const paths = ['foo', 'bar'];
    expect(lib.toAbsolutePaths(paths)).toEqual([
      `${process.cwd()}/foo`,
      `${process.cwd()}/bar`,
    ]);
    expect(lib.toAbsolutePaths(paths, '/baz')).toEqual([
      '/baz/foo',
      '/baz/bar',
    ]);
  });

  describe('shouldInjectReferences', () => {
    const options = lib.normalizeOptions({
      include: ['foo'],
      exclude: ['foo/baz'],
      references: 'dummy.css',
    });

    test.each(shouldInjectTestCases)(
      '$description',
      ({ file, code, expected }) => {
        expect(
          lib.shouldInjectReferences(lib.toAbsolutePath(file), code, options),
        ).toBe(expected);
      },
    );
  });

  test('generateReferences', () => {
    expect(lib.generateReferences(['foo.css'])).toEqual([
      '@reference "foo.css";',
    ]);
    expect(lib.generateReferences(['foo.css', 'bar.css'])).toEqual([
      '@reference "foo.css";',
      '@reference "bar.css";',
    ]);
  });
});
