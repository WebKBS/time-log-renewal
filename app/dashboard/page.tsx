import React from "react";
import NextTopLoader from "nextjs-toploader";
import LogOut from "@/components/buttons/LogOut";

const Page = () => {
  return (
    <div>
      <NextTopLoader showSpinner={false} color={"#6d28d9"} />
      <LogOut />
    </div>
  );
};

export default Page;
