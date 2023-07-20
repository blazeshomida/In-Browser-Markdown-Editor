"use client";

import SidebarNav from "../components/SidebarNav";
import SplitPane from "@/components/SplitPane";
import ReactMarkdown from "react-markdown";
import { ChangeEvent, ReactNode, isValidElement } from "react";
import remarkGfm from "remark-gfm";
import {
  useActivePanel,
  useDarkMode,
  useSetActivePanel,
} from "@/hooks/useAppStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  useCurrentDocument,
  useUpdateCurrentDocument,
} from "@/hooks/useDocumentStore";
import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";

export default function App() {
  const document = useCurrentDocument();
  const updateCurrentDocument = useUpdateCurrentDocument();
  const darkMode = useDarkMode();
  const setActivePanel = useSetActivePanel();
  const activePanel = useActivePanel();

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

type ChildrenType = {
  children: ReactNode;
};

const PreviewH1 = ({ children }: ChildrenType) => {
  return <h1 className="text-preview-h1 font-bold">{children}</h1>;
};
const PreviewH2 = ({ children }: ChildrenType) => {
  return <h2 className="text-preview-h2 font-light">{children}</h2>;
};
const PreviewH3 = ({ children }: ChildrenType) => {
  return <h3 className="text-preview-h3 font-bold">{children}</h3>;
};
const PreviewH4 = ({ children }: ChildrenType) => {
  return <h4 className="text-preview-h4 font-bold">{children}</h4>;
};
const PreviewH5 = ({ children }: ChildrenType) => {
  return <h5 className="text-preview-h5 font-bold">{children}</h5>;
};
const PreviewH6 = ({ children }: ChildrenType) => {
  return <h6 className="text-preview-h6 font-bold text-orange">{children}</h6>;
};
const PreviewParagraph = ({ children }: ChildrenType) => {
  return (
    <p className="text-preview-paragraph text-neutral-500 dark:text-neutral-400">
      {children}
    </p>
  );
};
const PreviewPre = ({ children }: ChildrenType) => {
  return <div>{children}</div>;
};

type PreviewCodeProps = {
  className?: string;
  inline?: boolean;
  children: ReactNode;
};

const PreviewCode = ({
  inline,
  className,
  children,
  ...props
}: PreviewCodeProps): JSX.Element => {
  const language = className?.split("-")[1];
  const childString = isValidElement(children)
    ? ""
    : Array.isArray(children)
    ? children.join("")
    : String(children);
  const { theme } = useTheme();

  return (
    <SyntaxHighlighter
      {...props}
      style={theme === "dark" ? vscDarkPlus : vs}
      language={language}
      wrapLines
      wrapLongLines
    >
      {childString?.replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

const PreviewBlockquote = ({ children }: ChildrenType) => {
  return (
    <blockquote className="prose border-l-4 border-orange bg-neutral-200 p-6 pl-6 text-preview-paragraph prose-p:text-neutral-700 dark:bg-neutral-800">
      {children}
    </blockquote>
  );
};
const PreviewUList = ({ children }: ChildrenType) => {
  return (
    <ul className="list-inside list-[revert] pl-6 marker:text-orange ">
      {children}
    </ul>
  );
};
const PreviewOList = ({ children }: ChildrenType) => {
  return <ol className="list-inside list-[revert] pl-6 ">{children}</ol>;
};

const PreviewComponents = {
  h1({ children }: ChildrenType) {
    return <PreviewH1>{children}</PreviewH1>;
  },
  h2({ children }: ChildrenType) {
    return <PreviewH2>{children}</PreviewH2>;
  },
  h3({ children }: ChildrenType) {
    return <PreviewH3>{children}</PreviewH3>;
  },
  h4({ children }: ChildrenType) {
    return <PreviewH4>{children}</PreviewH4>;
  },
  h5({ children }: ChildrenType) {
    return <PreviewH5>{children}</PreviewH5>;
  },
  h6({ children }: ChildrenType) {
    return <PreviewH6>{children}</PreviewH6>;
  },
  p({ children }: ChildrenType) {
    return <PreviewParagraph>{children}</PreviewParagraph>;
  },
  pre({ children }: ChildrenType) {
    return <PreviewPre>{children}</PreviewPre>;
  },
  code({ children, className }: PreviewCodeProps) {
    return <PreviewCode className={className}>{children}</PreviewCode>;
  },
  blockquote({ children }: ChildrenType) {
    return <PreviewBlockquote>{children}</PreviewBlockquote>;
  },
  ul({ children }: ChildrenType) {
    return <PreviewUList>{children}</PreviewUList>;
  },
  ol({ children }: ChildrenType) {
    return <PreviewOList>{children}</PreviewOList>;
  },
};
