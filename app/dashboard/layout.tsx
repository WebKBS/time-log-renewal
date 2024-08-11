import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
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
      <div className={"flex min-h-dvh flex-col flex-1"}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
