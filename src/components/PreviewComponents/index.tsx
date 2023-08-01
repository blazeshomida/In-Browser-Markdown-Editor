import { useTheme } from "next-themes";
import { PropsWithChildren, ReactNode, isValidElement } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const PreviewH1 = ({ children }: PropsWithChildren) => {
  return <h1 className="text-preview-h1 font-bold">{children}</h1>;
};
export const PreviewH2 = ({ children }: PropsWithChildren) => {
  return <h2 className="text-preview-h2 font-light">{children}</h2>;
};
export const PreviewH3 = ({ children }: PropsWithChildren) => {
  return <h3 className="text-preview-h3 font-bold">{children}</h3>;
};
export const PreviewH4 = ({ children }: PropsWithChildren) => {
  return <h4 className="text-preview-h4 font-bold">{children}</h4>;
};
export const PreviewH5 = ({ children }: PropsWithChildren) => {
  return <h5 className="text-preview-h5 font-bold">{children}</h5>;
};
export const PreviewH6 = ({ children }: PropsWithChildren) => {
  return <h6 className="text-preview-h6 font-bold text-orange">{children}</h6>;
};
export const PreviewParagraph = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-preview-paragraph text-neutral-500 dark:text-neutral-400">
      {children}
    </p>
  );
};
export const PreviewPre = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};
export type PreviewCodeProps = {
  className?: string;
  inline?: boolean;
  children: ReactNode;
};
export const PreviewCode = ({
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
export const PreviewBlockquote = ({ children }: PropsWithChildren) => {
  return (
    <blockquote className="prose border-l-4 border-orange bg-neutral-200 p-6 pl-6 text-preview-paragraph prose-p:text-neutral-700 dark:bg-neutral-800">
      {children}
    </blockquote>
  );
};
export const PreviewUList = ({ children }: PropsWithChildren) => {
  return (
    <ul className="list-inside list-[revert] pl-6 marker:text-orange ">
      {children}
    </ul>
  );
};
export const PreviewOList = ({ children }: PropsWithChildren) => {
  return <ol className="list-inside list-[revert] pl-6 ">{children}</ol>;
};
export const PreviewComponents = {
  h1({ children }: PropsWithChildren) {
    return <PreviewH1>{children}</PreviewH1>;
  },

  h2({ children }: PropsWithChildren) {
    return <PreviewH2>{children}</PreviewH2>;
  },

  h3({ children }: PropsWithChildren) {
    return <PreviewH3>{children}</PreviewH3>;
  },

  h4({ children }: PropsWithChildren) {
    return <PreviewH4>{children}</PreviewH4>;
  },

  h5({ children }: PropsWithChildren) {
    return <PreviewH5>{children}</PreviewH5>;
  },

  h6({ children }: PropsWithChildren) {
    return <PreviewH6>{children}</PreviewH6>;
  },

  p({ children }: PropsWithChildren) {
    return <PreviewParagraph>{children}</PreviewParagraph>;
  },

  pre({ children }: PropsWithChildren) {
    return <PreviewPre>{children}</PreviewPre>;
  },

  code({ children, className }: PreviewCodeProps) {
    return <PreviewCode className={className}>{children}</PreviewCode>;
  },

  blockquote({ children }: PropsWithChildren) {
    return <PreviewBlockquote>{children}</PreviewBlockquote>;
  },

  ul({ children }: PropsWithChildren) {
    return <PreviewUList>{children}</PreviewUList>;
  },

  ol({ children }: PropsWithChildren) {
    return <PreviewOList>{children}</PreviewOList>;
  },
};
