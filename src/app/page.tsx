"use client";
import { PreviewComponents } from "../components/PreviewComponents/index";

import SidebarNav from "../components/SidebarNav";
import SplitPane from "@/components/SplitPane";
import ReactMarkdown from "react-markdown";
import { ChangeEvent } from "react";
import remarkGfm from "remark-gfm";
import { useDarkMode } from "@/hooks/useAppStore";
import {
  useCurrentDocument,
  useUpdateCurrentDocument,
} from "@/hooks/useDocumentStore";
import useMounted from "@/hooks/useMounted";

export default function App() {
  const document = useCurrentDocument();
  const updateCurrentDocument = useUpdateCurrentDocument();
  const darkMode = useDarkMode();

  const mounted = useMounted();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    updateCurrentDocument("content", e.target.value);
  }

  return (
    <div className={`grid flex-1 overflow-clip overflow-y-auto`}>
      <SidebarNav />
      <SplitPane
        range={10}
        defaultSplit={50}
        splitPoints={[30, 50, 70]}
        collapseThreshold={5}
      >
        {mounted && darkMode !== undefined && (
          <form className="mx-auto h-full w-full max-w-2xl pb-32 font-mono text-preview-paragraph text-neutral-700 dark:text-neutral-400">
            <textarea
              name=""
              id=""
              className=" h-full w-full resize-none overflow-clip bg-[inherit] px-6 pt-8"
              autoFocus
              onChange={handleChange}
              value={document?.content}
            />
          </form>
        )}

        <div className="h-full w-full overflow-y-auto">
          {mounted && darkMode !== undefined && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="_markdown-preview mx-auto h-full max-w-2xl  overscroll-contain p-6 font-serif text-neutral-700 prose-a:text-[inherit] prose-li:text-neutral-500 dark:text-neutral-100"
              components={PreviewComponents}
            >
              {document?.content}
            </ReactMarkdown>
          )}
        </div>
      </SplitPane>
    </div>
  );
}
