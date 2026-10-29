import React from "react";
import Editor from "@monaco-editor/react";
import { ChevronDown, RotateCcw } from "lucide-react";

const THEME = "veriq";

// Custom Monaco theme so the editor matches the zinc UI
// (the built-in "vs-dark" background is #1e1e1e, which clashes with zinc-950)
const defineTheme = (monaco) => {
  monaco.editor.defineTheme(THEME, {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#09090b",
      "editor.foreground": "#e4e4e7",
      "editor.lineHighlightBackground": "#18181b",
      "editor.lineHighlightBorder": "#00000000",
      "editorLineNumber.foreground": "#52525b",
      "editorLineNumber.activeForeground": "#a1a1aa",
      "editorCursor.foreground": "#818cf8",
      "editor.selectionBackground": "#818cf833",
      "editor.inactiveSelectionBackground": "#818cf81a",
      "editorIndentGuide.background1": "#27272a",
      "editorIndentGuide.activeBackground1": "#3f3f46",
      "editorWidget.background": "#18181b",
      "editorWidget.border": "#27272a",
      "editorSuggestWidget.background": "#18181b",
      "editorSuggestWidget.border": "#27272a",
      "scrollbarSlider.background": "#3f3f4666",
      "scrollbarSlider.hoverBackground": "#52525b99",
      "scrollbarSlider.activeBackground": "#71717a99",
    },
  });
};

const CodeEditor = ({
  lang,
  setLang,
  setCodeByLanguage,
  problem,
  setRunResult,
  currentCode,
  languageMap,
  languages,
}) => {
  const key = languageMap[lang];

  // Reset restores the starter code if the problem has one, otherwise clears
  const reset = () => {
    const starter = problem.starterCode?.[key];
    setCodeByLanguage((prev) => ({
      ...prev,
      [key]: typeof starter === "string" ? starter : "",
    }));
    setRunResult(null);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex h-11.5 shrink-0 items-center justify-between border-b border-zinc-800 px-4">
        <div className="relative">
          <label htmlFor="language" className="sr-only">
            Language
          </label>
          <select
            id="language"
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
              setRunResult(null);
            }}
            className="cursor-pointer appearance-none rounded-md border border-zinc-800 bg-zinc-950 py-1.5 pl-3 pr-8 text-sm text-zinc-100 outline-none focus:border-indigo-400"
          >
            {languages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
        </div>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Editor */}
      <div className="min-h-0 flex-1 bg-zinc-950">
        <Editor
          height="100%"
          language={key}
          value={currentCode}
          theme={THEME}
          beforeMount={defineTheme}
          loading={
            <span className="font-mono text-xs text-zinc-500">
              loading editor…
            </span>
          }
          onChange={(value) =>
            setCodeByLanguage((prev) => ({ ...prev, [key]: value || "" }))
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
            lineHeight: 22,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            automaticLayout: true,
            renderLineHighlight: "line",
            overviewRulerLanes: 0,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;