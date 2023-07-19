"use client";

import { Button } from "react-aria-components";
import SidebarNav from "../components/SidebarNav";
import { useMenuOpen } from "@/hooks/useAppStore";
import SplitPane from "@/components/SplitPane";
import ReactMarkdown from "react-markdown";
import { MouseEvent, ReactNode, useState } from "react";
import { type } from "os";
import remarkGfm from "remark-gfm";

export default function App() {
  const [markdown, setMarkdown] = useState("");
  return (
    <div className="grid flex-1 overflow-y-auto bg-neutral-1000 text-neutral-400">
      <SidebarNav />
      <SplitPane
        range={10}
        defaultSplit={50}
        splitPoints={[30, 50, 70]}
        collapseThreshold={5}
      >
        <form className="font-mono text-preview-paragraph">
          <textarea
            name=""
            id=""
            className="h-full  w-full resize-none bg-[inherit] p-6"
            autoFocus
            onChange={(e) => setMarkdown(e.target.value)}
            value={markdown}
            onClick={(e: MouseEvent<HTMLTextAreaElement>) =>
              e.currentTarget.focus()
            }
          />
        </form>
        <div className="">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className=" p-6 font-serif"
            components={PreviewComponents}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </SplitPane>
    </div>
  );
}

type childrenType = {
  children: ReactNode;
};

const PreviewH1 = ({ children }: childrenType) => {
  return <h1 className="text-preview-h1 font-bold">{children}</h1>;
};
const PreviewH2 = ({ children }: childrenType) => {
  return <h2 className="text-preview-h2 font-light">{children}</h2>;
};
const PreviewH3 = ({ children }: childrenType) => {
  return <h3 className="text-preview-h3 font-bold">{children}</h3>;
};
const PreviewH4 = ({ children }: childrenType) => {
  return <h4 className="text-preview-h4 font-bold">{children}</h4>;
};
const PreviewH5 = ({ children }: childrenType) => {
  return <h5 className="text-preview-h5 font-bold">{children}</h5>;
};
const PreviewH6 = ({ children }: childrenType) => {
  return <h6 className="text-preview-h6 font-bold">{children}</h6>;
};

const PreviewComponents = {
  h1({ children }: childrenType) {
    return <PreviewH1>{children}</PreviewH1>;
  },
  h2({ children }: childrenType) {
    return <PreviewH2>{children}</PreviewH2>;
  },
  h3({ children }: childrenType) {
    return <PreviewH3>{children}</PreviewH3>;
  },
  h4({ children }: childrenType) {
    return <PreviewH4>{children}</PreviewH4>;
  },
  h5({ children }: childrenType) {
    return <PreviewH5>{children}</PreviewH5>;
  },
  h6({ children }: childrenType) {
    return <PreviewH6>{children}</PreviewH6>;
  },
};
