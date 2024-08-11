import React from "react";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/shadcn/ThemeToogleButton";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center p-3 gap-4 justify-between">
        <Link href={"/"} className="font-extrabold">
          TIME LOG
        </Link>
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
