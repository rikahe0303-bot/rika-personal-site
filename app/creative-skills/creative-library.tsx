"use client";

import { useState } from "react";
import { categories, creativeSkills, type CategoryId } from "./data";
import styles from "./creative-skills.module.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
const repository = "https://github.com/rikahe0303-bot/rika-personal-site/tree/main/public/creative-skills/source";

export default function CreativeLibrary() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  async function copyExample(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setCopyError(null);
    } catch {
      setCopyError(id);
      setCopied(null);
    }
  }
  const visibleCategories = categories.filter(category => filter === "all" || category.id === filter);
  const count = creativeSkills.filter(skill => filter === "all" || skill.category === filter).length;
  return <div className={styles.page}>
    <a className={styles.skip} href="#library">跳到技能列表</a>
    <header className={styles.header}>
      <a className={styles.brand} href={asset("/")}>何丽江<span>创作与日常</span></a>
      <nav aria-label="工具箱导航"><a href={asset("/")}>个人首页</a><a href="https://rikahe0303-bot.github.io/mg-styles-15/?lang=zh">MG 风格库</a><a href={repository}>GitHub 源码</a></nav>
    </header>
    <main>
      <section className={styles.hero} aria-labelledby="toolbox-title">
        <div><p className={styles.eyebrow}>MY CREATIVE TOOLBOX</p><h1 id="toolbox-title">创作有想法<br/><em>也有方法</em></h1><p className={styles.intro}>把镜头、故事和商品视觉，<br/>整理成随时能用的创作工具。</p></div>
        <div className={styles.heroSide}><span className={styles.edition}>Codex 本地适配版</span><p className={styles.stats}><strong>7</strong> 个 Skill <span>·</span> <strong>3</strong> 个分类</p><a className={styles.downloadAll} href={asset("/creative-skills/downloads/rika-creative-skills.zip")} download>下载全部 Skill</a><a className={styles.installLink} href="#install">查看安装方法</a></div>
      </section>
      <section id="library" className={styles.library} aria-labelledby="library-title">
        <div className={styles.libraryHeading}><h2 id="library-title">选一个，开始创作</h2><p aria-live="polite">当前显示 {count} 项 Skill</p></div>
        <div className={styles.filters} role="group" aria-label="技能分类">
          <button aria-pressed={filter === "all"} onClick={() => setFilter("all")}>全部 <span>7</span></button>
          {categories.map(category => <button key={category.id} aria-pressed={filter === category.id} onClick={() => setFilter(category.id)}>{category.name}<span>{category.count}</span></button>)}
        </div>
        {visibleCategories.map(category => <section className={styles.group} key={category.id} aria-labelledby={`category-${category.id}`}>
          <div className={styles.groupHeading}><h3 id={`category-${category.id}`}>{category.name}</h3><p>{category.note}</p></div>
          <div className={styles.cards}>{creativeSkills.filter(skill => skill.category === category.id).map(skill => <article className={styles.card} key={skill.id}>
            <p className={styles.cardType}>CODEX SKILL</p><h4>{skill.title}</h4><p className={styles.description}>{skill.description}</p>
            <p className={styles.outputs}>{skill.outputs.join(" / ")}</p>
            <details className={styles.usage}><summary>使用示例</summary><p className={styles.example}>{skill.example}</p><button className={styles.copyButton} onClick={() => copyExample(skill.id, skill.example)}>{copied === skill.id ? "已复制" : "复制示例"}</button><span className={styles.copyStatus} role="status">{copied === skill.id ? "可以粘贴到 Codex 使用" : copyError === skill.id ? "请选中上方文字手动复制" : ""}</span></details>
            <div className={styles.cardActions}><a href={asset(`/creative-skills/downloads/${skill.id}.zip`)} download>下载 Skill</a><a href={`${repository.replace("/tree/", "/blob/")}/${skill.id}/SKILL.md`}>查看完整指令</a></div>
          </article>)}</div>
        </section>)}
      </section>
      <section id="install" className={styles.install} aria-labelledby="install-title"><div><p className={styles.eyebrow}>READY FOR CODEX</p><h2 id="install-title">下载之后<br/>这样使用</h2></div><ol><li><strong>解压安装包</strong><span>保留每个 Skill 文件夹及其内部文件。</span></li><li><strong>放进 Codex 技能目录</strong><span>复制到 <code>~/.codex/skills/</code>，已有同名文件时先备份。</span></li><li><strong>发送你的创作需求</strong><span>在下一条消息中粘贴使用示例，并提供素材。若列表未刷新，重新打开 Codex。</span></li></ol></section>
      <p className={styles.provenance}>这些是参考 <a href="https://vibepaper-ai.com/skills">VibePaper 公开功能说明</a>独立编写的本地适配版，并非平台官方导出包。图片和视频的实际生成取决于所用工具及授权。</p>
    </main>
    <footer className={styles.footer}><span>何丽江 · 创作工具箱</span><a href={asset("/")}>回到个人网站</a></footer>
  </div>;
}
