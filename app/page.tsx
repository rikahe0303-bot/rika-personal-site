import type { Metadata } from "next";
import PersonalSite from "./components/personal-site";

export const metadata: Metadata = {
  title: "何丽江 · IP 操盘手与情感陪伴师",
  description: "我是何丽江，也可以叫我水水。了解我的技能：IP 操盘与情感陪伴。认真表达，也认真倾听。",
  openGraph: { title: "何丽江 · IP 操盘手与情感陪伴师", description: "我是水水，来自云南，生活在西安。欢迎认识我的技能，也走进我的日常。" },
};

export default function Home() {
  return <PersonalSite page="skills" />;
}
