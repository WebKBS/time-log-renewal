import React from "react";
import NextTopLoader from "nextjs-toploader";
import LogOut from "@/components/buttons/LogOut";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <div>
      <NextTopLoader showSpinner={false} color={"#6d28d9"} />
      <LogOut />
      <Input type="datetime-local" />
    </div>
  );
};

export default Page;
