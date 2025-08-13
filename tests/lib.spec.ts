import * as lib from '@/lib.js';

const codeWithDirective = `
p {
    @apply bg-black;
}
`;

const codeWithoutDirective = `
p {
    background-color: black;
}
`;

type ShouldInjectTestCase = {
  description: string;
  file: string;
  code: string;
  expected: boolean;
};

const shouldInjectTestCases: ShouldInjectTestCase[] = [
  {
    description: 'included file with directive',
    file: 'foo/file1.astro?astro&type=style&lang.css',
    code: codeWithDirective,
    expected: true,
  },
  {
    description: 'included nested file with directive',
    file: 'foo/bar/file.astro?astro&type=style&lang.css',
    code: codeWithDirective,
    expected: true,
  },
  {
    description: 'excluded file with directive',
    file: 'foo/baz/file.astro?astro&type=style&lang.css',
    code: codeWithDirective,
    expected: false,
  },
  {
    description: 'included file without directive',
    file: 'foo/file1.astro?astro&type=style&lang.css',
    code: codeWithoutDirective,
    expected: false,
  },
  {
    description: 'non-style file',
    file: 'foo/file.astro',
    code: codeWithDirective,
    expected: false,
  },
];

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
    const includePrefixes = ['foo'];
    const excludePrefixes = ['foo/baz'];

    test.each(shouldInjectTestCases)(
      '$description',
      ({ file, code, expected }) => {
        expect(
          lib.shouldInjectReferences(
            file,
            code,
            includePrefixes,
            excludePrefixes,
          ),
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
