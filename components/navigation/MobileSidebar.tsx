"use client";

import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { DashboardNav } from "@/components/navigation/dashboard-nav";
import LogOut from "@/components/buttons/LogOut";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <SheetHeader className={"hidden"}>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>모바일 네비게이션</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4 flex flex-col flex-1 h-full">
            <div className="px-3 py-2 flex-1">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <DashboardNav
                  items={navItems}
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
            <LogOut className="w-full" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
