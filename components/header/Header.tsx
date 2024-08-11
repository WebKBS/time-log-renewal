import React from "react";
import { ThemeToggleButton } from "@/components/shadcn/ThemeToogleButton";
import LogOut from "@/components/buttons/LogOut";

const Header = () => {
  return (
    <header className="">
      <div className="flex items-center p-3 gap-4 justify-between">
        <div className="ml-auto flex gap-2 items-center">
          <LogOut />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
