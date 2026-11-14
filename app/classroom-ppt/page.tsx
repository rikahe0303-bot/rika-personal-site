import type { Metadata } from "next";
import styles from "./classroom-ppt.module.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
const pptPath = "/classroom/2026年11月9日至13日课堂教学版（含图片与动效）.pptx";

export const metadata: Metadata = {
  title: "2026 年 11 月 9 日至 13 日课堂教学 PPT",
  description: "含图片、动效、透明 PNG、视频和音效示例的课堂教学演示文稿。",
};

export default function ClassroomPptPage() {
  const downloadUrl = asset(pptPath);

  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#download">跳到下载</a>
      <header className={styles.header}>
        <a href={asset("/")} className={styles.brand}>何丽江 · 个人网站</a>
        <a href={asset("/")} className={styles.back}>返回主页</a>
      </header>

      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>CLASSROOM DECK · 2026.11.09—11.13</p>
          <h1 id="page-title">五天课堂教学 PPT</h1>
          <p className={styles.intro}>把 GitHub、账号定位、选题拍摄、A-roll 与 B-roll、动效、声音、封面与导出，整理成可直接授课的 26 页教学课件。</p>
          <div className={styles.tags} aria-label="课件包含的示例">
            <span>图片示例</span><span>动效示意</span><span>透明 PNG</span><span>可播放视频</span><span>音效与 BGM</span>
          </div>
          <a id="download" className={styles.download} href={downloadUrl} download>
            下载可播放 PPT（17 MB）
          </a>
          <p className={styles.note}>下载后请使用 WPS 或 Microsoft PowerPoint 的“放映”模式打开，即可播放课件内嵌的视频、GIF 与音频示例。</p>
        </div>
        <figure className={styles.preview}>
          <img src={asset("/classroom/preview.png")} alt="课堂教学 PPT 封面预览" width="1920" height="1080" />
          <figcaption>26 页 · 适合 40—60 分钟授课</figcaption>
        </figure>
      </section>

      <section className={styles.outline} aria-labelledby="outline-title">
        <p className={styles.eyebrow}>COURSE OUTLINE</p>
        <h2 id="outline-title">课程按日期展开</h2>
        <ol>
          <li><strong>11 月 9 日</strong><span>GitHub 与个人网站</span></li>
          <li><strong>11 月 10 日</strong><span>账号定位与主页四件套</span></li>
          <li><strong>11 月 11 日</strong><span>选题、文案与拍摄</span></li>
          <li><strong>11 月 12 日</strong><span>A-roll、B-roll 与剪辑结构</span></li>
          <li><strong>11 月 13 日</strong><span>动效、声音、封面与导出</span></li>
        </ol>
      </section>
    </main>
  );
}
