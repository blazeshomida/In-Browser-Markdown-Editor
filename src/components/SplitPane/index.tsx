import React, { useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  useActivePanel,
  useDarkMode,
  useMenuOpen,
  useResizing,
  useSetActivePanel,
  useSetResizing,
} from "@/hooks/useAppStore";
import { useSeparator } from "@react-aria/separator";
import { Button } from "react-aria-components";

const SplitPane = ({
  splitPoints = [20, 50, 80],
  defaultSplit = 50,
  range = 15,
  collapseThreshold = 5, // New prop to define the collapse threshold
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

  function handleMouseDown() {
    if (menuOpen) return;
    setResizing(true);
  }

  useEffect(() => {
    console.log(activePanel);
    if (activePanel === "none") return split.set(50);
    if (activePanel === "left") return split.set(100);
    if (activePanel === "right") return split.set(0);
  }, [activePanel, split, setActivePanel]);

  useEffect(() => {
    if (!isResizing) return;
    function handleMouseUp() {
      // Check if the pane should be collapsed
      if (split.get() < collapseThreshold) {
        split.set(0);
        setActivePanel("right");
        return setResizing(false);
      }
      if (split.get() > 100 - collapseThreshold) {
        split.set(100);
        setActivePanel("left");
        return setResizing(false);
      }
      // Snap to the nearest split point if not collapsing
      const closestSplit = splitPoints.reduce((prev, curr) =>
        Math.abs(curr - split.get()) < Math.abs(prev - split.get())
          ? curr
          : prev,
      );
      split.set(closestSplit);
      setResizing(false);
    }

    function handleMouseMove(e: MouseEvent) {
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
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, split, splitPoints, range, collapseThreshold, setResizing]);

  return (
    <div
      className={`${
        menuOpen ? "translate-x-64" : "translate-x-0  duration-300"
      } flex overflow-y-hidden bg-neutral-100 transition-transform ease-out  dark:bg-neutral-1000 `}
    >
      {activePanel !== "right" && (
        <motion.div
          className={`grid  ${
            isResizing ? "cursor-col-resize select-none " : ""
          }`}
          style={{ flexBasis: splitPercentage }}
        >
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
          } grid  flex-1`}
        >
          {children?.[1]}
        </div>
      )}
    </div>
  );
};

export default SplitPane;
