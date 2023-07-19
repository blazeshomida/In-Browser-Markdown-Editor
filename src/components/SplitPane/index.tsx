import React, { useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  useMenuOpen,
  useResizing,
  useStartResizing,
  useStopResizing,
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
  const startResizing = useStartResizing();
  const stopResizing = useStopResizing();
  const splitPercentage = useTransform(split, (value) => `${value}%`);

  useEffect(() => {
    function handleMouseUp() {
      // Check if the pane should be collapsed
      if (split.get() < collapseThreshold) {
        split.set(0);
      } else if (split.get() > 100 - collapseThreshold) {
        split.set(100);
      } else {
        // Snap to the nearest split point if not collapsing
        const closestSplit = splitPoints.reduce((prev, curr) =>
          Math.abs(curr - split.get()) < Math.abs(prev - split.get())
            ? curr
            : prev,
        );

        split.set(closestSplit);
      }

      stopResizing();
    }

    function handleMouseMove(e: MouseEvent) {
      if (e.button !== 0) return;
      if (!isResizing) return;

      let newSplit = (e.clientX / window.innerWidth) * 100;

      for (let i = 0; i < splitPoints.length; i++) {
        // Check if the new split is within the range of this split point
        if (
          newSplit > splitPoints[i] - range &&
          newSplit < splitPoints[i] + range
        ) {
          // Compute a dampening factor based on the distance to the snap point
          let distanceToSnap = Math.abs(newSplit - splitPoints[i]);
          let dampeningFactor = distanceToSnap / range;

          // Apply the dampening factor
          newSplit =
            splitPoints[i] + (newSplit - splitPoints[i]) * dampeningFactor;
        }
      }

      split.set(newSplit);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, split, splitPoints, range, stopResizing, collapseThreshold]);

  return (
    <div
      className={`${
        menuOpen ? "translate-x-64" : "translate-x-0  duration-300"
      } flex overflow-y-auto transition-transform ease-out`}
    >

      <motion.div
        className={`grid ${
          isResizing ? " cursor-col-resize select-none" : ""
        } h-full overflow-y-auto`} // Added overflow-y-auto here
        style={{ flexBasis: splitPercentage }}
      >
        {children?.[0]}
      </motion.div>
      <div
        className={`peer relative w-[1px] cursor-col-resize bg-neutral-600 after:absolute after:top-0 after:z-10 after:h-full after:bg-orange-hover hover:after:w-0.5  hover:after:left-0${
          isResizing ? "after:-left-1  after:w-1" : ""
        }`}
        onMouseDown={startResizing}
      ></div>
      <div
        className={`${
          isResizing ? "cursor-col-resize select-none " : ""
        } h-full flex-1 overflow-y-auto`} // Added overflow-y-auto here
      >
        {children?.[1]}
      </div>
    </div>
  );
};

export default SplitPane;
