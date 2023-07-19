"use client";
import React from "react";
import { Button } from "react-aria-components";
import { Logo } from "../../../public/assets/svg";
import { useMenuOpen } from "@/hooks/useAppStore";

export default function SidebarNav({}) {
  const menuOpen = useMenuOpen();

  return (
    <nav
      className={`${
        menuOpen ? "translate-x-0" : "-translate-x-64 duration-300"
      } fixed inset-y-0 left-0 w-64 bg-neutral-900 px-6 py-4 transition-transform ease-out`}
    >
      <Logo className=" my-4 md:hidden" />
      <p className="text-heading-s uppercase text-neutral-500">My documents</p>
      <Button className="my-6 w-full rounded bg-orange py-3 text-neutral-100  transition-all duration-150 data-[hovered]:bg-orange-hover">
        + New Document
      </Button>
    </nav>
  );
}
