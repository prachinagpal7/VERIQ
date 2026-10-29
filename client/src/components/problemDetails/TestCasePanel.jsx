import React from "react";

// Number of cases a submission is checked against (used for "passed/total").
// If the API sends runResult.total, that value is used instead.
const HIDDEN_TEST_TOTAL = 200;
const SUCCESS = ["Accepted", "Executed"];

const Spinner = () => (
  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
);

const Block = ({ label, children }) => (
  <div className="min-w-0">
    <p className="font-mono text-xs text-zinc-500">{label}</p>
    <pre className="mt-1.5 whitespace-pre-wrap break-words rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-2 font-mono text-xs leading-5 text-zinc-200">
      {children}
    </pre>
  </div>
);

const TestCasePanel = ({
  problem,
  runResult,
  activeCase,
  setActiveCase,
  running,
  submitting,
  executeCode,
}) => {
  const busy = running || submitting;
  const testCases = problem.testCases ?? [];
  const testCase = testCases[activeCase];

  const ok = runResult ? SUCCESS.includes(runResult.status) : false;
  const total = runResult?.total ?? HIDDEN_TEST_TOTAL;
  const passed = ok ? total : runResult?.passed;
  const showCases = runResult?.type === "submit" && passed != null;

  return (
    <div className="flex h-[30%] min-h-[11rem] shrink-0 flex-col border-t border-zinc-800 bg-zinc-950">
      {/* Case tabs + actions */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-800 pl-2 pr-3">
        <div
          role="tablist"
          aria-label="Test cases"
          className="flex min-w-0 overflow-x-auto"
        >
          {testCases.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeCase === index}
              onClick={() => setActiveCase(index)}
              className={`shrink-0 border-b-2 px-3 py-2.5 text-sm ${
                activeCase === index
                  ? "border-indigo-400 text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Case {index + 1}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 py-1.5">
          <button
            type="button"
            onClick={() => executeCode("run")}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {running && <Spinner />}
            {running ? "Running…" : "Run"}
          </button>
          <button
            type="button"
            onClick={() => executeCode("submit")}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <Spinner />}
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>

      {/* Result */}
      {runResult && (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-zinc-800 px-4 py-2.5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  ok ? "bg-emerald-400" : "bg-red-400"
                }`}
              />
              <span
                className={`font-medium ${
                  ok ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {runResult.status}
              </span>
            </span>
            {showCases && (
              <span className="font-mono text-xs text-zinc-500">
                {passed}/{total} test cases passed
              </span>
            )}
          </p>

          <p className="flex items-center gap-4 font-mono text-xs text-zinc-500">
            {runResult.complexity && (
              <span className="text-zinc-300">~{runResult.complexity}</span>
            )}
            {runResult.cpuTime != null && <span>{runResult.cpuTime}s</span>}
            {runResult.memory && <span>{runResult.memory}</span>}
          </p>
        </div>
      )}

      {/* Case details */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {testCase ? (
          <>
            <Block label="input">{testCase.input}</Block>
            <div className={`grid gap-4 ${runResult ? "sm:grid-cols-2" : ""}`}>
              <Block label="expected output">{testCase.expectedOutput}</Block>
              {runResult && <Block label="your output">{runResult.output}</Block>}
            </div>
            {!runResult && (
              <p className="font-mono text-xs text-zinc-600">
                Run tests the selected case. Submit tests all cases.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-zinc-500">
            No test cases for this problem.
          </p>
        )}
      </div>
    </div>
  );
};

export default TestCasePanel;
