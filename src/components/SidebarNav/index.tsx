"use client";
import { Button, Switch } from "react-aria-components";
import { DarkModeIcon, DocumentIcon, LightModeIcon, Logo } from "@/assets/svg";
import {
  DocumentType,
  useCreateDocument,
  useDocuments,
  useSetCurrentDocument,
} from "@/hooks/useDocumentStore";
import { motion } from "framer-motion";
import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import { useMenuOpen } from "@/hooks/useMenuOpen";

export default function SidebarNav({}) {
  const [isMenuOpen] = useMenuOpen();
  const createDocument = useCreateDocument();
  const documents = useDocuments();
  const setCurrentDocument = useSetCurrentDocument();
  const sortedDocs = [...documents].sort(
    (a, z) =>
      new Date(z.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
  );

  return (
    <nav
      className={`${
        isMenuOpen ? "translate-x-0" : "-translate-x-64 duration-300"
      } fixed inset-y-0 left-0 flex h-full w-64 flex-col justify-between bg-neutral-900 px-6 py-4 transition-transform ease-out`}
    >
      <div>
        <Logo className="my-4 text-neutral-100 md:hidden" />
        <p className="text-heading-s uppercase text-neutral-500">
          My documents
        </p>
        <Button
          onPress={() => createDocument()}
          className="my-6 w-full rounded bg-orange py-3 text-neutral-100  transition-all duration-150 data-[hovered]:bg-orange-hover"
        >
          + New Document
        </Button>
        <div>
          {sortedDocs.map((document: DocumentType) => (
            <Button
              key={document.id}
              className="duration-250 flex w-full items-center justify-start gap-4 rounded-lg p-3 text-neutral-100 transition-all hover:bg-neutral-800"
              onPress={() => setCurrentDocument(document)}
            >
              <DocumentIcon />
              <div className="text-left">
                <p className="text-body-m text-neutral-500">
                  {new Date(document.lastUpdated).toLocaleString(undefined, {
                    dateStyle: "long",
                  })}
                </p>
                <p className="text-heading-m ">{document.title}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;
  return (
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
  );
}
