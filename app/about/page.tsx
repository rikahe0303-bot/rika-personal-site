import type { Metadata } from "next";
import PersonalSite from "../components/personal-site";

export const metadata: Metadata = {
  title: "关于何丽江 · 个人说明书",
  description: "一个慢热的 INFJ，浪漫的双鱼座。认识何丽江的性格、兴趣与生活，看看旅行、看展、拼豆和胖虎的九个日常片段。",
  openGraph: { title: "关于何丽江 · 个人说明书", description: "安静的外表，热闹的内心。慢慢认识生活中的何丽江。" },
};

export default function About() {
  return <PersonalSite page="about" />;
}
