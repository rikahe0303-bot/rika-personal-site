import type { Metadata } from "next";
import CreativeLibrary from "./creative-library";

export const metadata: Metadata = {
  title: "创作工具箱 · 何丽江",
  description: "何丽江的 7 项 Codex 本地适配 Skill：视频创作与运镜、口播与商品短剧、电商图片设计。分类查看、复制使用示例并下载。",
};

export default function CreativeSkillsPage() {
  return <CreativeLibrary />;
}
