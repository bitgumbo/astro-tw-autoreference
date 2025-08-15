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

export const shouldInjectTestCases: ShouldInjectTestCase[] = [
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
