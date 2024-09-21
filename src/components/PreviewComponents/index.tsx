import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import { ReactNode, isValidElement } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// Heading Components

export function H1({ children }: { children: ReactNode }): JSX.Element {
  return <h1 className="text-preview-h1 font-bold">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }): JSX.Element {
  return <h2 className="text-preview-h2 font-light">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }): JSX.Element {
  return <h3 className="text-preview-h3 font-bold">{children}</h3>;
}

export function H4({ children }: { children: ReactNode }): JSX.Element {
  return <h4 className="text-preview-h4 font-bold">{children}</h4>;
}

export function H5({ children }: { children: ReactNode }): JSX.Element {
  return <h5 className="text-preview-h5 font-bold">{children}</h5>;
}

export function H6({ children }: { children: ReactNode }): JSX.Element {
  return <h6 className="text-preview-h6 font-bold text-orange">{children}</h6>;
}

// Paragraph Component

export function Paragraph({ children }: { children: ReactNode }): JSX.Element {
  return (
    <p className="text-preview-paragraph text-neutral-500 dark:text-neutral-400">
      {children}
    </p>
  );
}

// Preformatted Text Component

export function Pre({ children }: { children: ReactNode }): JSX.Element {
  return <div>{children}</div>;
}

// Code Component

type CodeProps = {
  className?: string;
  inline?: boolean;
  children: ReactNode;
};

export function Code({
  inline,
  className,
  children,
  ...props
}: CodeProps): JSX.Element {
  const language = className?.split("-")[1];
  const childString = isValidElement(children)
    ? ""
    : Array.isArray(children)
      ? children.join("")
      : String(children);

  const { theme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return <></>;

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

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
}

// Blockquote Component

export function Blockquote({ children }: { children: ReactNode }): JSX.Element {
  return (
    <blockquote className="prose border-l-4 border-orange bg-neutral-200 p-6 pl-6 text-preview-paragraph prose-p:text-neutral-700 dark:bg-neutral-800">
      {children}
    </blockquote>
  );
}

// Unordered List Component

export function UList({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ul className="list-inside list-[revert] pl-6 marker:text-orange">
      {children}
    </ul>
  );
}

// Ordered List Component

export function OList({ children }: { children: ReactNode }): JSX.Element {
  return <ol className="list-inside list-[revert] pl-6">{children}</ol>;
}

// Mapping markdown elements to custom components

export const PreviewComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
  ul: UList,
  ol: OList,
};
