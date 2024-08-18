import type { Metadata } from "next";
import Header from "@/components/layouts/header/Header";
import Sidebar from "@/components/navigation/SideBar";

export const metadata: Metadata = {
  title: "Time Log",
  description: "출퇴근 시간을 기록하고 관리하는 웹 애플리케이션",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </div>
    </div>
  );
}
