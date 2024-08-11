import React from "react";
import { ThemeToggleButton } from "@/components/shadcn/ThemeToogleButton";

const Header = () => {
  return (
    <header className="">
      <div className="flex items-center p-3 gap-4 justify-between">
        <div className="ml-auto">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
