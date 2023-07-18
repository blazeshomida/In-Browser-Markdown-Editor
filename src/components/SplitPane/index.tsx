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
  defaultSplit = 50,
  minSizeLeft = 20,
  maxSizeLeft = 80,
  range = 15,
  children,
}: {
  defaultSplit: number;
  minSizeLeft: number;
  maxSizeLeft: number;
  range: number;
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
      if (
        split.get() > defaultSplit - range &&
        split.get() < defaultSplit + range
      ) {
        split.set(defaultSplit);
      }
      if (split.get() < minSizeLeft + range) {
        split.set(minSizeLeft);
      }
      if (split.get() > maxSizeLeft - range) {
        split.set(maxSizeLeft);
      }
      stopResizing();
    }
    function handleMouseMove(e: MouseEvent) {
      if (e.button !== 0) return;
      if (!isResizing) return;

      let newSplit = (e.clientX / window.innerWidth) * 100;

      // Compute distance to nearest snap point
      let distanceToSnap = Math.min(
        Math.abs(newSplit - defaultSplit),
        Math.abs(newSplit - minSizeLeft),
        Math.abs(newSplit - maxSizeLeft),
      );

      // Compute a dampening factor based on the distance to the snap point
      // This will be a number between 0 and 1
      let dampeningFactor = distanceToSnap / range;

      // If the new split point is too close to a snap point, reduce the amount it changes
      if (newSplit < minSizeLeft + range) {
        newSplit = minSizeLeft + (newSplit - minSizeLeft) * dampeningFactor;
      } else if (newSplit > maxSizeLeft - range) {
        newSplit = maxSizeLeft - (maxSizeLeft - newSplit) * dampeningFactor;
      } else if (
        newSplit > defaultSplit - range &&
        newSplit < defaultSplit + range
      ) {
        newSplit = defaultSplit + (newSplit - defaultSplit) * dampeningFactor;
      }

      split.set(newSplit);
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isResizing,
    split,
    minSizeLeft,
    maxSizeLeft,
    defaultSplit,
    range,
    stopResizing,
  ]);

  return (
    <div
      className={`${
        menuOpen ? "translate-x-64" : "translate-x-0"
      } flex h-full transition-transform ease-out`}
    >
      <motion.div
        className={isResizing ? "cursor-col-resize select-none" : ""}
        style={{ flexBasis: splitPercentage }}
      >
        {children?.[0]}
      </motion.div>
      <div
        className={`peer relative w-[1px] cursor-col-resize bg-neutral-300 after:absolute after:top-0 after:z-10 after:h-full after:bg-orange-hover hover:after:w-0.5  hover:after:left-0${
          isResizing ? "after:-left-1  after:w-1" : ""
        }`}
        onMouseDown={startResizing}
      />
      <div
        className={`${
          isResizing ? "cursor-col-resize select-none" : ""
        } flex-1`}
      >
        {children?.[1]}
      </div>
    </div>
  );
};

export default SplitPane;
