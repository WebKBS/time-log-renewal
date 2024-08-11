import React from "react";
import { ThemeToggleButton } from "@/components/shadcn/ThemeToogleButton";
import LogOut from "@/components/buttons/LogOut";
import dynamic from "next/dynamic";
import Today from "@/components/features/Today";

const CurrentTime = dynamic(() => import("@/components/features/CurrentTime"), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="">
      <div className="flex items-center px-4 py-3 md:px-8 gap-4 justify-between">
        <Today />
        <CurrentTime />
        <div className=" flex gap-2 items-center">
          <LogOut />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
