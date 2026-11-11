import type { Metadata } from "next";
import "./globals.css";
import "./atelier.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata: Metadata = {
  title: "何丽江 · 慢慢生活，保持好奇",
  description: "嗨，我是何丽江，也可以叫我水水。IP 操盘手、情感陪伴师，来自云南，生活在西安。这里有我的个人介绍、生活相册、相处指南，以及抖音和小红书的小角落。",
  icons: { icon: `${basePath}/favicon.svg` },
  openGraph: { title: "何丽江 · 慢慢生活，保持好奇", description: "也可以叫我水水。来自云南，生活在西安。一起旅行、看展、拼豆，慢慢认识真实的我。", type: "website", locale: "zh_CN" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }
