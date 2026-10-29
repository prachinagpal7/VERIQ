import React from "react";
import { difficultyText } from "../../utils/problemUi";

const tabs = [
  { key: "description", label: "Description" },
  { key: "hints", label: "Hints" },
  { key: "tags", label: "Tags" },
  { key: "companies", label: "Companies" },
];

// Works whether acceptanceRate is stored as 52, "52" or "52%"
const formatPct = (value) => {
  if (value === undefined || value === null || value === "") return "–";
  const text = String(value);
  return text.includes("%") ? text : `${text}%`;
};

const Label = ({ children }) => (
  <p className="font-mono text-xs text-zinc-500">{children}</p>
);

const Chip = ({ children }) => (
  <span className="rounded-md border border-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-400">
    {children}
  </span>
);

const ProblemDescription = ({problem, activeTab, setActiveTab, visibleHints, setVisibleHints,}) => {
  const examples = problem.examples ?? [];
  const constraints = problem.constraints ?? [];
  const hints = problem.hints ?? [];
  const tags = problem.tags ?? [];
  const companies = problem.companies ?? [];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-zinc-950 lg:w-[46%] lg:flex-none">
      {/* Tabs */}
      <div role="tablist" aria-label="Problem sections" className="flex shrink-0 overflow-x-auto border-b border-zinc-800 px-2">
        {tabs.map(({ key, label }) => (
          <button key={key} type="button" role="tab" aria-selected={activeTab === key} onClick={() => setActiveTab(key)} className={`shrink-0 border-b-2 px-3 py-3 text-sm ${ activeTab === key ? "border-indigo-400 text-zinc-100" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto px-5 py-5">
        {activeTab === "description" && (
          <>
            <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
              <span className={difficultyText(problem.difficulty)}> {problem.difficulty} </span>
              <span className="text-zinc-500">{problem.topic}</span>
              <span className="text-zinc-500"> {formatPct(problem.acceptanceRate)} acceptance </span>
            </p>
            <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-300"> {problem.description} </p>
            {examples.length > 0 && (
              <section>
                <Label>examples</Label>
                <div className="mt-3 space-y-3">
                  {examples.map((item, index) => (
                    <div key={index} className="rounded-md border border-zinc-900 bg-zinc-900/40 py-2 px-4">
                      <p className="font-mono text-xs text-zinc-500"> example {index + 1} </p>
                      <dl className="mt-1 space-y-1 font-mono text-xs leading-5">
                        <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3">
                          <dt className="text-zinc-500">input</dt>
                          <dd className="whitespace-pre-wrap break-words text-zinc-200"> {item.input} </dd>
                        </div>
                        <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3">
                          <dt className="text-zinc-500">output</dt>
                          <dd className="whitespace-pre-wrap break-words text-zinc-200"> {item.output} </dd>
                        </div>
                        {item.explanation && (
                          <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3">
                            <dt className="text-zinc-500">explanation</dt>
                            <dd className="whitespace-pre-wrap break-words text-zinc-400"> {item.explanation} </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {constraints.length > 0 && (
              <section>
                <Label>constraints</Label>
                <ul className="mt-3 space-y-1.5">
                  {constraints.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 font-mono text-xs leading-5 text-zinc-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {problem.followUp && (
              <section>
                <Label>follow-up</Label>
                <p className="mt-3 text-sm leading-6 text-zinc-400"> {problem.followUp} </p>
              </section>
            )}
          </>
        )}

        {activeTab === "hints" && (
          <section>
            {hints.length === 0 ? (
              <p className="text-sm text-zinc-500">No hints for this problem.</p>
            ) : (
              <>
                <p className="text-sm text-zinc-400"> Reveal hints one at a time. </p>
                {visibleHints > 0 && (
                  <ol className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                    {hints.slice(0, visibleHints).map((hint, index) => (
                      <li key={index} className="py-3">
                        <p className="font-mono text-xs text-zinc-500"> hint {index + 1} </p>
                        <p className="mt-1 text-sm leading-6 text-zinc-300"> {hint} </p>
                      </li>
                    ))}
                  </ol>
                )}

                {visibleHints < hints.length && (
                  <div className="mt-4 flex items-center gap-4">
                    <button type="button" onClick={() => setVisibleHints((prev) => prev + 1)} className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-zinc-100">
                      {visibleHints === 0 ? "Show first hint" : "Show next hint"}
                    </button>
                    <span className="font-mono text-xs text-zinc-500"> {visibleHints} of {hints.length} shown </span>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {activeTab === "tags" && (
          <section>
            <p className="text-sm text-zinc-400"> Concepts and patterns this problem tests. </p>
            {tags.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">No tags.</p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Chip key={index}>{tag}</Chip>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "companies" && (
          <>
            <section>
              <Label>companies</Label>
              {companies.length === 0 ? (
                <p className="mt-3 text-sm text-zinc-500">No company data.</p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {companies.map((company, index) => (
                    <Chip key={index}>{company}</Chip>
                  ))}
                </div>
              )}
            </section>

            {problem.frequency && (
              <section className="border-t border-zinc-800 pt-6">
                <Label>interview frequency</Label>
                <p className="mt-3 text-sm text-zinc-200">{problem.frequency}</p>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;