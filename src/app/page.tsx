"use client";
import { PreviewComponents } from "../components/PreviewComponents/index";

import SidebarNav from "../components/SidebarNav";
import SplitPane from "@/components/SplitPane";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDarkMode } from "@/hooks/useAppStore";
import useMounted from "@/hooks/useMounted";
import { useCurrentDocument } from "@/hooks/useDocumentStore";

export default function App() {
  const darkMode = useDarkMode();
  const currentDoc = useCurrentDocument();

  const mounted = useMounted();

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
              onChange={(e) => {
                if (!currentDoc) return;
                currentDoc.content = e.target.value;
              }}
              value={currentDoc?.content}
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
              {currentDoc.content}
            </ReactMarkdown>
          )}
        </div>
      </SplitPane>
    </div>
  );
}
