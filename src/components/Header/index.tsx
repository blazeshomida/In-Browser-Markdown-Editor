"use client";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Button, Input, TextField } from "react-aria-components";
import {
  CloseIcon,
  DeleteIcon,
  DocumentIcon,
  Logo,
  MenuIcon,
  SaveIcon,
} from "@/assets/svg";
import { useMenuOpen, useToggleMenu } from "@/hooks/useAppStore";
import {
  useCurrentDocument,
  useDeleteDocument,
  useUpdateCurrentDocument,
  useSaveDocument,
} from "@/hooks/useDocumentStore";
import useMounted from "@/hooks/useMounted";

const Header = () => {
  const menuOpen = useMenuOpen();
  const setMenuOpen = useToggleMenu();
  const saveDocument = useSaveDocument();
  const deleteDocument = useDeleteDocument();

  function handleSave() {
    saveDocument();
  }

  return (
    <header
      className={`${
        menuOpen ? "translate-x-64" : "translate-x-0 duration-300"
      } flex bg-neutral-800 text-neutral-100  transition-transform ease-out`}
    >
      <Button
        className="grid aspect-square w-min place-content-center bg-neutral-700 p-4 transition-all duration-200 focus:outline-none data-[hovered]:bg-orange data-[focus-visible]:ring-4 data-[focus-visible]:ring-inset data-[focus-visible]:ring-orange md:p-5"
        aria-label="Open Menu"
        onPress={() => setMenuOpen()}
      >
        {menuOpen ? (
          <CloseIcon className="object-contain" />
        ) : (
          <MenuIcon className="object-contain" />
        )}
      </Button>

      <div className="mx-auto flex w-full items-center justify-between p-2  md:p-4 ">
        <div className="flex items-center gap-6 divide-neutral-600 pl-2 md:divide-x">
          <Logo className=" hidden md:block " />
          <TitleCard />
        </div>
        <div className={`flex gap-6`}>
          <Button
            onPress={deleteDocument}
            className="self-stretch rounded text-neutral-500 transition-all duration-150 focus:outline-none data-[hovered]:text-orange data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange "
          >
            <DeleteIcon />
          </Button>
          <Button
            onPress={handleSave}
            className="flex items-center justify-center gap-2 rounded bg-orange p-3 transition-all duration-150 focus:outline-none data-[hovered]:bg-orange-hover data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-4 data-[focus-visible]:outline-orange"
          >
            <SaveIcon />
            <span className="hidden md:inline">Save Changes</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

function TitleCard() {
  const [isEditing, setIsEditing] = useState(false);
  const document = useCurrentDocument();
  const setCurrentDocument = useUpdateCurrentDocument();
  const saveDocument = useSaveDocument();
  const mounted = useMounted();

  function handleEdit() {
    setIsEditing((prev) => !prev);
    saveDocument();
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    setCurrentDocument("title", e.target.value);
  }

  function handleKeydown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.code !== "Enter" && e.code !== "Escape") return;
    setIsEditing(false);
    saveDocument();
  }

  return (
    <div className="flex items-center gap-4 md:px-6">
      <Button
        className="self-stretch rounded focus:outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange "
        aria-label="Edit Document Name"
        onPress={handleEdit}
      >
        <DocumentIcon />
      </Button>
      <div>
        <p className="hidden text-body-m text-neutral-500 md:block">
          Document Name:
        </p>
        {isEditing ? (
          <TextField>
            <Input
              value={document.title}
              className="border-b bg-transparent focus:outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange "
              onChange={handleInput}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeydown}
            />
          </TextField>
        ) : mounted ? (
          <p className="cursor-pointer text-heading-m" onClick={handleEdit}>
            {document.title}
          </p>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
