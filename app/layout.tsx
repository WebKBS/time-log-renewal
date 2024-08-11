import type { Metadata } from "next";
import {
  Inter,
  Nanum_Gothic,
  Nanum_Gothic_Coding,
  Noto_Sans,
  Noto_Sans_KR,
  Noto_Sans_NKo,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { cn } from "@/lib/utils";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/navigation/SideBar";
import NextTopLoader from "nextjs-toploader";

const notoSans = Noto_Sans_KR({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Time Log",
  description: "출퇴근 시간을 기록하고 관리하는 웹 애플리케이션",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("min-h-screen", notoSans.className)}>
        <NextTopLoader showSpinner={false} color={"#6d28d9"} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className={"flex min-h-dvh flex-col"}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
