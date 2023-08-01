
import React, { useEffect, ReactNode, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Panels,
  useActivePanel,
  useMenuOpen,
  useResizing,
  useSetActivePanel,
  useSetResizing,
} from "@/hooks/useAppStore";
import { HidePreviewIcon, ShowPreviewIcon } from "../../../public/assets/svg";
import useMediaQuery from "@/hooks/useMediaQuery";

const SplitPane = ({
  splitPoints = [20, 50, 80],
  defaultSplit = 50,
  range = 15,
  collapseThreshold = 5,
  children,
}: {
  splitPoints: number[];
  defaultSplit: number;
  range: number;
  collapseThreshold: number;
  children: ReactNode[];
}) => {
  const split = useMotionValue(defaultSplit);
  const menuOpen = useMenuOpen();
  const isResizing = useResizing();
  const setResizing = useSetResizing();
  const splitPercentage = useTransform(split, (value) => `${value}%`);
  const activePanel = useActivePanel();
  const setActivePanel = useSetActivePanel();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMouseDown = useCallback(() => {
    if (!menuOpen) setResizing(true);
  }, [menuOpen, setResizing]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0) return;
      let newSplit = (e.clientX / window.innerWidth) * 100;
      const snapPoint = splitPoints.find(
        (point) => Math.abs(newSplit - point) < range,
      );
      if (snapPoint) {
        const distanceToSnap = Math.abs(newSplit - snapPoint);
        const dampeningFactor = distanceToSnap / range;
        newSplit = snapPoint + (newSplit - snapPoint) * dampeningFactor;
      }
      split.set(newSplit);
    },
    [range, splitPoints, split],
  );

  const handleMouseUp = useCallback(() => {
    if (split.get() < collapseThreshold) {
      setActivePanel("right");
    }
    if (split.get() > 100 - collapseThreshold) {
      setActivePanel("left");
    }
    if (
      split.get() > collapseThreshold &&
      split.get() < 100 - collapseThreshold
    ) {
      const closestSplit = splitPoints.reduce((prev, curr) =>
        Math.abs(curr - split.get()) < Math.abs(prev - split.get())
          ? curr
          : prev,
      );
      split.set(closestSplit);
    }
    setResizing(false);
  }, [collapseThreshold, splitPoints, split, setActivePanel, setResizing]);

  const handleMouseOperations = useCallback(
    (e: MouseEvent, operation: string) => {
      switch (operation) {
        case "down":
          handleMouseDown();
          break;
        case "move":
          handleMouseMove(e);
          break;
        case "up":
          handleMouseUp();
          break;
        default:
          break;
      }
    },
    [handleMouseDown, handleMouseMove, handleMouseUp],
  );

  function handleShowHide(panel: Panels) {
    if (isMobile) {
      setActivePanel(activePanel === "right" ? "left" : "right");
    }
    if (!isMobile) {
      setActivePanel(activePanel === panel ? "none" : panel);
    }
  }

  useEffect(() => {
    if (isMobile) {
      setActivePanel("left");
    }
  }, [isMobile, setActivePanel]);

  useEffect(() => {
    if (activePanel === "none") return split.set(50);
    if (activePanel === "left") return split.set(100);
    if (activePanel === "right") return split.set(0);
  }, [activePanel, split]);

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => handleMouseOperations(e, "move");
    const handleMouseUp = (e: MouseEvent) => handleMouseOperations(e, "up");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isResizing,
    split,
    splitPoints,
    range,
    collapseThreshold,
    setResizing,
    handleMouseOperations,
  ]);

  return (
    <div
      className={`${
        menuOpen ? "translate-x-64" : "translate-x-0  duration-300"
      } flex overflow-y-hidden bg-neutral-100 transition-transform ease-out  dark:bg-neutral-1000 `}
    >
      {activePanel !== "right" && (
        <motion.div
          className={`grid h-full grid-rows-[min-content_1fr] overflow-y-auto ${
            isResizing ? "cursor-col-resize select-none " : ""
          }`}
          style={{ flexBasis: splitPercentage }}
        >
          <div className=" sticky top-0 z-10 flex justify-between bg-neutral-200 px-4 py-3 text-heading-s uppercase text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <p>Markdown</p>
            <button onClick={() => handleShowHide("left")}>
              {activePanel === "left" ? (
                <HidePreviewIcon />
              ) : (
                <ShowPreviewIcon />
              )}
            </button>
          </div>
          {children?.[0]}
        </motion.div>
      )}

      {activePanel === "none" && (
        <div
          className={`peer relative w-[1px] cursor-col-resize bg-neutral-300 after:absolute after:top-0 after:z-20 after:h-full after:bg-orange-hover  hover:after:left-0 hover:after:w-0.5  dark:bg-neutral-600 ${
            isResizing ? "after:-left-1  after:w-1" : ""
          }`}
          onMouseDown={handleMouseDown}
        ></div>
      )}

      {activePanel !== "left" && (
        <div
          className={`${
            isResizing ? "cursor-col-resize select-none " : ""
          } grid  h-full flex-1 grid-rows-[min-content_1fr] overflow-hidden`}
        >
          <div className="sticky top-0 z-10 flex  justify-between bg-neutral-200 px-4 py-3 text-heading-s uppercase text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <p>Preview</p>
            <button onClick={() => handleShowHide("right")}>
              {activePanel === "right" ? (
                <HidePreviewIcon />
              ) : (
                <ShowPreviewIcon />
              )}
            </button>
          </div>
          {children?.[1]}
        </div>
      )}
    </div>
  );
};

export default SplitPane;
