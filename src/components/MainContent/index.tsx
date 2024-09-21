"use client";

import React, { useEffect, useRef } from "react";
import { HidePreviewIcon, ShowPreviewIcon } from "@/assets/svg";
import {
  useCurrentDocument,
  useUpdateCurrentDocument,
} from "@/hooks/useDocumentStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PreviewComponents } from "../PreviewComponents";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { useCookies } from "@/hooks/useCookies";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useMenuOpen } from "@/hooks/useMenuOpen";

type Panels = "editor" | "preview" | "none";

const MainContent = ({
  defaultLayout = [50, 50],
}: {
  defaultLayout: number[] | undefined;
}) => {
  const [isMenuOpen] = useMenuOpen();
  const [activePanel, setActivePanel] = useCookies<Panels>(
    "activePanel",
    "none",
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  const currentDoc = useCurrentDocument();
  const updateCurrentDocument = useUpdateCurrentDocument();
  const editorPanelRef = useRef<ImperativePanelHandle>(null);
  const previewPanelRef = useRef<ImperativePanelHandle>(null);

  function handleShowHide(panel: Panels) {
    const isPanelActive = (targetPanel: Panels) => activePanel === targetPanel;

    if (isMobile) {
      // Mobile logic: toggle between "editor" and "preview"
      const newPanel = isPanelActive("preview") ? "editor" : "preview";
      setActivePanel(newPanel);
      previewPanelRef.current?.resize(50);
      return;
    }

    // Desktop logic
    if (isPanelActive(panel)) {
      // If active panel is already the clicked one, hide it
      setActivePanel("none");
      panel === "editor"
        ? editorPanelRef.current?.resize(50)
        : previewPanelRef.current?.resize(50);
    } else {
      // If another panel is active, switch to the clicked one
      setActivePanel(panel);
      panel === "editor"
        ? previewPanelRef.current?.collapse()
        : editorPanelRef.current?.collapse();
    }
  }

  useEffect(() => {
    if (isMobile) setActivePanel("editor");
  }, [isMobile, setActivePanel]);

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <PanelGroup
      direction="horizontal"
      onLayout={onLayout}
      className={`${
        isMenuOpen ? "translate-x-64" : "translate-x-0 duration-300"
      } overflow-y-hidden bg-neutral-100 transition-transform ease-out dark:bg-neutral-1000`}
    >
      <Panel
        id="editor"
        ref={editorPanelRef}
        collapsible
        onCollapse={() => setActivePanel("preview")}
        onExpand={() => setActivePanel("none")}
        defaultSize={defaultLayout[0]}
        className="grid grid-rows-[min-content_1fr]"
      >
        <div className="flex justify-between bg-neutral-200 px-4 py-3 text-heading-s uppercase text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <p>Markdown</p>
          <button
            onClick={() => {
              handleShowHide("editor");
            }}
          >
            {activePanel === "editor" ? (
              <HidePreviewIcon />
            ) : (
              <ShowPreviewIcon />
            )}
          </button>
        </div>
        <form className="mx-auto h-full w-full font-mono text-preview-paragraph text-neutral-700 dark:text-neutral-400">
          <textarea
            className="h-full w-full resize-none bg-[inherit] px-6 pb-32 pt-8"
            autoFocus
            onChange={(e) => {
              updateCurrentDocument("content", e.target.value);
            }}
            value={currentDoc?.content}
          />
        </form>
      </Panel>

      <PanelResizeHandle className="w-[1px] cursor-col-resize bg-neutral-300 data-[resize-handle-state='drag']:bg-orange-hover data-[resize-handle-state='hover']:bg-orange-hover dark:[&:not([data-resize-handle-state='drag'],[data-resize-handle-state='hover'])]:bg-neutral-600" />
      <Panel
        id="preview"
        ref={previewPanelRef}
        collapsible
        onCollapse={() => setActivePanel("editor")}
        onExpand={() => setActivePanel("none")}
        defaultSize={defaultLayout[1]}
        className="grid grid-rows-[min-content_1fr]"
      >
        <div className="flex justify-between bg-neutral-200 px-4 py-3 text-heading-s uppercase text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          <p>Preview</p>
          <button
            onClick={() => {
              handleShowHide("preview");
            }}
          >
            {activePanel === "preview" ? (
              <HidePreviewIcon />
            ) : (
              <ShowPreviewIcon />
            )}
          </button>
        </div>
        <div className="h-full w-full overflow-y-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="_markdown-preview mx-auto h-full max-w-2xl  overscroll-contain p-6 font-serif text-neutral-700 prose-a:text-[inherit] prose-li:text-neutral-500 dark:text-neutral-100"
            components={PreviewComponents}
          >
            {currentDoc.content}
          </ReactMarkdown>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default MainContent;
