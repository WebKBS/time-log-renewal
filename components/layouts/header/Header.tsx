import React from "react";
import { ThemeToggleButton } from "@/components/theme/ThemeToogleButton";
import LogOut from "@/components/buttons/LogOut";
import dynamic from "next/dynamic";
import Today from "@/features/Today";
import MobileSidebar from "@/components/navigation/MobileSidebar";
import { cn } from "@/lib/utils";

const CurrentTime = dynamic(() => import("@/features/CurrentTime"), {
  ssr: false,
});

const Header = () => {
  return (
    <header>
      <nav className="flex items-center justify-between md:block">
        <div className={cn("block ml-4 md:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="flex items-center px-4 py-3 md:px-8 gap-4 justify-between">
          <div className="flex-1 flex gap-[4px_8px] md:gap-4 items-center flex-wrap">
            <CurrentTime />
            <Today />
          </div>
          <div className="flex gap-2 items-center">
            <LogOut className="hidden md:block" />
            <ThemeToggleButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
