"use client";
import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { Button, Input, TextField } from "react-aria-components";
import {
  CloseIcon,
  DeleteIcon,
  DocumentIcon,
  Logo,
  MenuIcon,
  SaveIcon,
} from "../../../public/assets/svg";
import SidebarNav from "../SidebarNav";
import { useMenuOpen, useToggleMenu } from "@/hooks/useAppStore";

const Header = () => {
  const menuOpen = useMenuOpen();
  const setMenuOpen = useToggleMenu();

  return (
    <header
      className={`${
        menuOpen ? "translate-x-64" : "transition-transform"
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
          <Button className="self-stretch rounded text-neutral-500 transition-all duration-150 focus:outline-none data-[hovered]:text-orange data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange ">
            <DeleteIcon />
          </Button>
          <Button className="flex items-center justify-center gap-2 rounded bg-orange p-3 transition-all duration-150 focus:outline-none data-[hovered]:bg-orange-hover data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-4 data-[focus-visible]:outline-orange">
            <SaveIcon />
            <span className="hidden md:inline">Save Changes</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

function TitleCard({}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("welcome.md");

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    setTitle(e.target.value);
  }

  function handleKeydown(e: KeyboardEvent<HTMLInputElement>) {
    console.log(e.code);
    if (e.code === "Enter" || e.code === "Escape") setIsEditing(false);
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
              value={title}
              className="border-b bg-transparent focus:outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-orange "
              onChange={handleInput}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeydown}
            />
          </TextField>
        ) : (
          <p className="text-heading-m">{title}</p>
        )}
      </div>
    </div>
  );
}
