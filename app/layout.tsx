import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Rika — 把日子，过成喜欢的样子",
  description: "Rika 的个人生活杂志。来自云南，生活在西安；爱旅行、户外、看展和游戏。在这里认识我，看看我的日常，和我打个招呼。",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg` },
  openGraph: { title: "Rika — 把日子，过成喜欢的样子", description: "一些真实的我，一些值得记住的瞬间。", type:"website", locale:"zh_CN" },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="zh-CN"><body>{children}</body></html>;}
