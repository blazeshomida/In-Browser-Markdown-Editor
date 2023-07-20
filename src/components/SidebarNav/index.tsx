"use client";
import React, { useEffect, useState } from "react";
import { Button, Switch, ToggleButton } from "react-aria-components";
import {
  DarkModeIcon,
  DocumentIcon,
  LightModeIcon,
  Logo,
} from "../../../public/assets/svg";
import {
  useCurrentLocale,
  useDarkMode,
  useMenuOpen,
  useSetCurrentLocale,
  useToggleDarkMode,
} from "@/hooks/useAppStore";
import {
  DocumentType,
  useCreateDocument,
  useCurrentDocument,
  useDocuments,
  useResetCurrentDocument,
  useSetCurrentDocument,
} from "@/hooks/useDocumentStore";
import { motion } from "framer-motion";
import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";

export default function SidebarNav({}) {
  const menuOpen = useMenuOpen();
  const toggleDarkMode = useToggleDarkMode();
  const createDocument = useCreateDocument();
  const documents = useDocuments();
  const setCurrentDocument = useSetCurrentDocument();
  const currentLocale = useCurrentLocale();
  const { theme, setTheme } = useTheme();

  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  function handleCreate() {
    createDocument();
  }

  function handleSetCurrent(document: DocumentType) {
    setCurrentDocument(document);
  }

  return (
    <nav
      className={`${
        menuOpen ? "translate-x-0" : "-translate-x-64 duration-300"
      } fixed inset-y-0 left-0 flex w-64  flex-col justify-between bg-neutral-900 px-6 py-4 transition-transform ease-out`}
    >
      <div>
        <Logo className=" my-4 md:hidden" />
        <p className="text-heading-s uppercase text-neutral-500">
          My documents
        </p>
        <Button
          onPress={handleCreate}
          className="my-6 w-full rounded bg-orange py-3 text-neutral-100  transition-all duration-150 data-[hovered]:bg-orange-hover"
        >
          + New Document
        </Button>
        <div>
          {documents.map((document: DocumentType) => (
            <Button
              key={document.id}
              className="duration-250 flex w-full items-center justify-start gap-4 rounded-lg p-3 text-neutral-100 transition-all hover:bg-neutral-800"
              onPress={() => handleSetCurrent(document)}
            >
              <DocumentIcon />
              <div className="text-left">
                <p className="text-body-m text-neutral-500">
                  {Intl.DateTimeFormat(currentLocale, {
                    dateStyle: "long",
                  }).format(new Date(document.lastUpdated))}
                </p>
                <p className="text-heading-m ">{document.title}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Switch
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex w-min cursor-pointer items-center gap-3"
      >
        <DarkModeIcon className="text-neutral-600 transition-all duration-75 dark:text-neutral-100" />
        <div className="relative h-6 w-12 rounded-full bg-neutral-600  transition-all duration-500">
          <motion.div
            animate={
              theme === "dark"
                ? { left: 0, right: "unset" }
                : { left: "unset", right: 0 }
            }
            transition={{ duration: 0.15 }}
            className="absolute h-6 w-6 scale-75 rounded-full bg-neutral-100"
          ></motion.div>
        </div>
        <LightModeIcon className="text-neutral-100 transition-all duration-75 dark:text-neutral-600" />
      </Switch>
    </nav>
  );
}
