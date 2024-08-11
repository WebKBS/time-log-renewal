import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full  p-4 md:px-8">{children}</div>;
};

export default PageContainer;
