// Hidden test cases used only for the "Submit" flow (never shown to the user,
// unlike the visible/hidden examples that already live inside problems.js's
// own `testCases` array, which power "Run").
//
// Each entry is matched to its problem via `slug` (the same slug used in
// problems.js). Input/output formats follow the same competitive-programming
// style used across problems.js: sizes are given explicitly, values are
// space/newline separated, and there are no brackets, commas, or quotes to
// parse or build — see the convention notes on each group below.
//
//   - array (+ scalar):        n \n values \n scalar?
//   - two arrays:               n1 \n values1 \n n2 \n values2
//   - string(s):                raw line(s), no quotes
//   - grid:                     rows cols \n one plain "01..." string per row
//   - tree (level order):       n \n n tokens, each an int or the word "null"
//   - flat array output:        space-separated values on one line
//   - list-of-groups output:    a count line, then one line per group
//     (each group line is itself space-separated; variable-length groups —
//     tree levels, subsets — are prefixed with their own size)

const hiddenTestCases = [
  // ─── ARRAYS ──────────────────────────────────────────────────────────────
  {
    slug: "two-sum",
    testCases: [
      { input: "4\n0 4 3 0\n0",    expectedOutput: "0 3" },
      { input: "4\n-3 4 3 90\n0",  expectedOutput: "0 2" },
      { input: "4\n1 5 9 13\n18",  expectedOutput: "1 3" },
      { input: "5\n1 2 3 4 5\n9",   expectedOutput: "3 4" },
    ],
  },
  {
    slug: "best-time-to-buy-and-sell-stock",
    testCases: [
      { input: "8\n3 3 5 0 0 3 1 4", expectedOutput: "4" },
      { input: "1\n1",                expectedOutput: "0" },
      { input: "7\n2 1 2 1 0 1 2",    expectedOutput: "2" },
      { input: "4\n2 4 1 7", expectedOutput: "6" },
    ],
  },
  {
    slug: "maximum-subarray",
    testCases: [
      { input: "3\n-3 -2 -1",     expectedOutput: "-1" },
      { input: "5\n8 -19 5 -4 20",expectedOutput: "21" },
      { input: "4\n0 0 0 0",      expectedOutput: "0"  },
      { input: "5\n5 4 -1 7 8", expectedOutput: "23" },
    ],
  },
  {
    slug: "3sum",
    testCases: [
      { input: "4\n0 0 0 0",   expectedOutput: "1\n0 0 0"  },
      { input: "4\n1 2 -2 -1", expectedOutput: "0"          },
      { input: "4\n-1 0 1 0",  expectedOutput: "1\n-1 0 1"  },
    ],
  },
  {
    slug: "trapping-rain-water",
    testCases: [
      { input: "4\n5 4 1 2", expectedOutput: "1" },
      { input: "4\n0 0 0 0", expectedOutput: "0" },
      { input: "3\n4 2 3",   expectedOutput: "1" },
    ],
  },

  // ─── STRINGS ─────────────────────────────────────────────────────────────
  {
    slug: "valid-anagram",
    testCases: [
      { input: "listen\nsilent", expectedOutput: "true"  },
      { input: "aacc\nccac",     expectedOutput: "false" },
      { input: "ab\nba",         expectedOutput: "true"  },
    ],
  },
  {
    slug: "longest-substring-without-repeating-characters",
    testCases: [
      { input: "dvdf",    expectedOutput: "3" },
      { input: "tmmzuxt", expectedOutput: "5" },
      { input: " ",       expectedOutput: "1" },
    ],
  },
  {
    slug: "longest-palindromic-substring",
    testCases: [
      { input: "forgeeksskeegfor", expectedOutput: "geeksskeeg" },
      { input: "ac",               expectedOutput: "a"          },
      { input: "aaaa",             expectedOutput: "aaaa"       },
    ],
  },

  // ─── LINKED LIST ─────────────────────────────────────────────────────────
  {
    slug: "reverse-linked-list",
    testCases: [
      { input: "1\n1",             expectedOutput: "1"             },
      { input: "3\n1 2 3",         expectedOutput: "3 2 1"         },
      { input: "5\n-5 -3 0 4 8",   expectedOutput: "8 4 0 -3 -5"   },
    ],
  },
  {
    slug: "merge-two-sorted-lists",
    testCases: [
      { input: "3\n2 3 5\n3\n1 4 6",   expectedOutput: "1 2 3 4 5 6"     },
      { input: "1\n5\n0",               expectedOutput: "5"                },
      { input: "3\n-3 -1 0\n3\n-2 2 4", expectedOutput: "-3 -2 -1 0 2 4"  },
    ],
  },
  {
    slug: "linked-list-cycle",
    testCases: [
      { input: "6\n1 2 3 4 5 6\n-1", expectedOutput: "false" },
      { input: "2\n10 20\n1",         expectedOutput: "true"  },
      { input: "1\n7\n0",             expectedOutput: "true"  },
    ],
  },
  {
    slug: "remove-nth-node-from-end-of-list",
    testCases: [
      { input: "7\n1 2 3 4 5 6 7\n3", expectedOutput: "1 2 3 4 6 7" },
      { input: "2\n9 1\n2",            expectedOutput: "1"           },
      { input: "3\n3 4 5\n3",          expectedOutput: "4 5"         },
    ],
  },

  // ─── STACK / QUEUE ───────────────────────────────────────────────────────
  {
    slug: "valid-parentheses",
    testCases: [
      { input: "{[]}",    expectedOutput: "true"  },
      { input: "{[(])}",  expectedOutput: "false" },
      { input: "((()))",  expectedOutput: "true"  },
      { input: "([)]",   expectedOutput: "false" },
    ],
  },
  {
    slug: "min-stack",
    testCases: [
      {
        input: "7\npush 5\npush 3\npush 7\ngetMin\npop\ngetMin\ntop",
        expectedOutput: "3\n3\n3",
      },
    ],
  },
  {
    slug: "next-greater-element-i",
    testCases: [
      { input: "2\n4 2\n5\n2 4 1 3 5", expectedOutput: "5 4" },
      { input: "2\n2 4\n4\n1 2 3 4",   expectedOutput: "3 -1" },
    ],
  },

  // ─── TREES ───────────────────────────────────────────────────────────────
  {
    slug: "maximum-depth-of-binary-tree",
    testCases: [
      { input: "7\n1 2 3 4 5 6 7",              expectedOutput: "3" },
      { input: "0",                              expectedOutput: "0" },
      { input: "8\n1 2 null 3 null 4 null 5",   expectedOutput: "5" },
    ],
  },
  {
    slug: "binary-tree-level-order-traversal",
    testCases: [
      { input: "7\n1 2 3 4 5 6 7",     expectedOutput: "3\n1 1\n2 2 3\n4 4 5 6 7" },
      { input: "0",                     expectedOutput: "0"                          },
      { input: "5\n1 null 2 null 3",   expectedOutput: "3\n1 1\n1 2\n1 3"           },
    ],
  },
  {
    slug: "lowest-common-ancestor-bst",
    testCases: [
      { input: "11\n6 2 8 0 4 7 9 null null 3 5\n0\n5", expectedOutput: "2" },
      { input: "2\n2 1\n2\n1",             expectedOutput: "2" },
      { input: "7\n6 2 8 0 4 7 9\n7\n9",   expectedOutput: "8" },
    ],
  },
  {
    slug: "validate-binary-search-tree",
    testCases: [
      { input: "1\n1",                       expectedOutput: "true"  },
      { input: "7\n10 5 15 null null 6 20", expectedOutput: "false" },
      { input: "7\n3 1 5 0 2 4 6",           expectedOutput: "true"  },
    ],
  },

  // ─── GRAPHS ──────────────────────────────────────────────────────────────
  {
    slug: "number-of-islands",
    testCases: [
      { input: "2 3\n000\n000",           expectedOutput: "0" },
      { input: "1 5\n10101",              expectedOutput: "3" },
      { input: "3 4\n1101\n1101\n0001",   expectedOutput: "2" },
    ],
  },
  {
    slug: "course-schedule",
    testCases: [
      { input: "3 2\n1 0\n2 1",             expectedOutput: "true"  },
      { input: "4 4\n1 0\n2 1\n3 2\n0 3",   expectedOutput: "false" },
      { input: "1 0",                        expectedOutput: "true"  },
    ],
  },

  // ─── DYNAMIC PROGRAMMING ─────────────────────────────────────────────────
  {
    slug: "climbing-stairs",
    testCases: [
      { input: "1", expectedOutput: "1" },
      { input: "4", expectedOutput: "5" },
      { input: "5", expectedOutput: "8" },
    ],
  },
  {
    slug: "coin-change",
    testCases: [
      { input: "3\n1 3 4\n6",     expectedOutput: "2" },
      { input: "4\n2 5 10 1\n27", expectedOutput: "4" },
      { input: "2\n3 7\n12",       expectedOutput: "4" },
    ],
  },
  {
    slug: "longest-common-subsequence",
    testCases: [
      { input: "abcba\nabcbea",   expectedOutput: "5" },
      { input: "aggtab\ngxtxayb", expectedOutput: "4" },
      { input: "x\ny",            expectedOutput: "0" },
    ],
  },

  // ─── SORTING / BINARY SEARCH ─────────────────────────────────────────────
  {
    slug: "merge-intervals",
    testCases: [
      { input: "2\n1 4\n0 4",           expectedOutput: "1\n0 4"             },
      { input: "4\n6 8\n1 9\n2 4\n4 7", expectedOutput: "1\n1 9"             },
      { input: "3\n1 2\n3 4\n5 6",      expectedOutput: "3\n1 2\n3 4\n5 6"   },
    ],
  },
  {
    slug: "search-in-rotated-sorted-array",
    testCases: [
      { input: "3\n5 1 3\n5",           expectedOutput: "0"  },
      { input: "7\n6 7 1 2 3 4 5\n2",   expectedOutput: "3"  },
      { input: "5\n1 2 3 4 5\n6",       expectedOutput: "-1" },
    ],
  },

  // ─── RECURSION / BACKTRACKING ─────────────────────────────────────────────
  {
    slug: "generate-parentheses",
    testCases: [
      { input: "2", expectedOutput: "2\n(())\n()()" },
      { input: "3", expectedOutput: "5\n((()))\n(()())\n(())()\n()(())\n()()()" },
    ],
  },
  {
    slug: "subsets",
    testCases: [
      { input: "2\n1 2",   expectedOutput: "4\n0\n1 1\n1 2\n2 1 2" },
      { input: "3\n4 5 6", expectedOutput: "8\n0\n1 4\n1 5\n2 4 5\n1 6\n2 4 6\n2 5 6\n3 4 5 6" },
    ],
  },
];

export default hiddenTestCases;
