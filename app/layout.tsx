import type { Metadata } from "next";
import "./globals.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata: Metadata = {
  title: "Rika · 好奇心收藏家",
  description: "嗨，我是 Rika！来自云南，生活在西安。喜欢旅行、户外、看展，也喜欢宅着打游戏。来看看我的生活相册，认识一个慢热但对世界充满热情的我。",
  icons: { icon: `${basePath}/favicon.svg` },
  openGraph: { title: "Rika · 好奇心收藏家", description: "一点安静，一点野。认真生活，永远保持好奇。", type: "website", locale: "zh_CN" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }
