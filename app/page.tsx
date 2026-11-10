"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, Check, ChevronLeft, ChevronRight, Copy, Gamepad2, Heart, MapPin, Menu, Mountain, Palette, Phone, Plus, Sparkles, X, Zap } from "lucide-react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
const phone = "19526880781";
const source = "https://my.feishu.cn/wiki/PwFMwXy47i7csPkxGR7cD1k86Pf";
const moments = [
  { image: "image3.jpeg", title: "把日落装进口袋", type: "在路上", caption: "山顶的风，和刚刚好的晚霞。", label: "SUNSET COLLECTOR" },
  { image: "image6.jpeg", title: "在色彩里停留一下", type: "小日常", caption: "去看展，在别人的色彩里待一会儿。", label: "A LITTLE ART BREAK" },
  { image: "image9.jpeg", title: "和大自然打个招呼", type: "在路上", caption: "出门走走，总会遇见意料之外的可爱。", label: "OUTSIDE IS A GOOD IDEA" },
  { image: "image11.jpeg", title: "我的可爱搭子：胖虎", type: "小日常", caption: "介绍一下，这是胖虎，我的干儿子。", label: "MEET MY LITTLE FRIEND" },
  { image: "image10.jpeg", title: "一点一点，拼出快乐", type: "小日常", caption: "拼豆的时间里，快乐也可以很简单。", label: "SMALL THINGS, BIG JOY" },
];
const interests = [
  { icon: Mountain, name: "去山野充电", english: "OUTDOOR DAYS", text: "走进山野，吹吹风。旅行和户外，是我亲近世界的方式。" },
  { icon: Gamepad2, name: "在游戏里冒险", english: "PLAYER MODE", text: "爱出门，也能宅得很开心。试试新游戏，探索另一个世界。" },
  { icon: Palette, name: "看展，也看生活", english: "ART & CURIOSITY", text: "在不同的色彩和表达里，给自己留一点好奇和想象的空间。" },
  { icon: Heart, name: "收藏小小快乐", english: "LITTLE HAPPY THINGS", text: "拼豆、陪胖虎、记录日常。那些不起眼的小事，也很值得。" },
];
const questions = [
  ["你是一个什么样的人？", "我是一个慢热的 INFJ，双鱼座。表面可能很平静，心里却已经炸开了花。温和、认真，也重视彼此的边界。"],
  ["从哪里来，现在在哪里生活？", "我来自云南，现在在西安生活。毕业于西南科技大学，主修信息管理。"],
  ["怎样才能和你快速熟悉？", "一起做喜欢的事就很好。约旅行、玩户外，或者一起试试新游戏。自然一点，真诚一点，不用急着熟悉。"],
  ["可以找你聊些什么？", "旅行、游戏、看展、拼豆，或者生活里的小事，都可以。也愿意认真听你说说心事，做一个朋友和倾听者。"],
  ["怎么联系你？", "电话是 19526880781。页面底部可以点击拨号或复制号码，也可以继续翻阅我的飞书个人说明书。"],
];

function Star({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="m50 3 8 28 25-16-15 26 29 9-29 9 15 26-25-16-8 28-8-28-25 16 15-26L3 50l29-9-15-26 25 16Z" stroke="#201f1d" strokeWidth="3" strokeLinejoin="round"/></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("全部");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtered = moments.map((item, index) => ({ ...item, index })).filter(item => filter === "全部" || item.type === filter);
  const visible = filter === "全部" && !showAll ? filtered.slice(0, 4) : filtered;
  useEffect(() => { if (!isOpen) return; const value = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = value; }; }, [isOpen]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function openPhoto(index: number, button: HTMLButtonElement) { trigger.current = button; setSelected(index); modal.current?.showModal(); setIsOpen(true); }
  function closePhoto() { modal.current?.close(); }
  function shiftPhoto(direction: number) { const position = filtered.findIndex(item => item.index === selected); setSelected(filtered[(position + direction + filtered.length) % filtered.length].index); }
  async function copyPhone() { try { await navigator.clipboard.writeText(phone); setCopied(true); setCopyError(false); } catch { setCopyError(true); } if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 3000); }
  const nav = [["首页", "home"], ["生活相册", "moments"], ["关于我", "about"], ["相处指南", "faq"]];
  return <>
    <a className="skip-link" href="#main">跳到正文</a>
    <div className="hero-shell" id="home">
      <header className="header wrap">
        <a className="logo" href="#home" aria-label="Rika 首页">Rika<Star/></a>
        <nav id="main-navigation" className={menuOpen ? "nav open" : "nav"} aria-label="主导航">{nav.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <a className="header-contact" href="#contact">打个招呼 <ArrowUpRight size={17}/></a>
        <button className="menu-toggle" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "关闭菜单" : "打开菜单"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <div className="hero-doodles" aria-hidden="true"><Palette className="doodle-palette"/><Zap className="doodle-zap"/><span className="doodle-circle"/></div>
            <p className="hero-greeting">Hello there! <span>你好呀 👋</span></p>
            <h1 id="hero-heading">我是 Rika，<br/><span>好奇心收藏家。</span></h1>
            <p className="hero-description">来自云南，现在在西安。<br/>一个慢热的 INFJ，喜欢旅行、户外，也喜欢宅着打游戏。<br/>认真收集日常的小快乐，偶尔放空，永远保持好奇。</p>
            <div className="hero-actions"><a className="button pink" href="#moments">看看我的小世界 <ArrowUpRight size={19}/></a><a className="button cream" href="#about">认识我 <ArrowRight size={18}/></a></div>
            <div className="hero-meta"><span><MapPin size={16}/> 西安 · 中国</span><span className="meta-separator"/><span>慢热，但对世界充满热情。</span></div>
            <div className="bottom-doodles" aria-hidden="true"><Plus/><svg viewBox="0 0 100 50"><path d="M0 10q12-16 25 0t25 0t25 0t25 0M0 25q12-16 25 0t25 0t25 0t25 0M0 40q12-16 25 0t25 0t25 0t25 0"/></svg><span/></div>
          </div>
          <div className="portrait-stage"><div className="dot-patch" aria-hidden="true"/><figure className="portrait-card"><span className="portrait-stripes" aria-hidden="true"/><span className="portrait-orbit" aria-hidden="true"/><div className="portrait-photo"><img src={asset("/photos/image2.jpeg")} alt="Rika 在山野草地间，倚着木围栏" fetchPriority="high" width="700" height="1000"/></div><span className="portrait-tag">THIS IS ME.</span><Star className="portrait-star"/><figcaption><span>一点安静，一点野。</span><Heart size={22}/></figcaption></figure><span className="portrait-sticker">保持好奇<br/><b>STAY CURIOUS!</b></span></div>
          <a href="#moments" className="scroll-down"><ArrowDown size={17}/> 向下探索我的日常</a>
        </section>
        <section className="moments-section dotted" id="moments"><div className="wrap section">
          <div className="section-heading"><p className="eyebrow">LIFE IS MY FAVORITE COLLECTION</p><h2>生活里的高光时刻<Star/></h2><p>不用特别盛大，喜欢的瞬间就值得被记住。</p></div>
          <div className="filters" role="group" aria-label="筛选生活照片">{["全部", "在路上", "小日常"].map(type => <button key={type} className={filter === type ? "active" : ""} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type}<span>{type === "全部" ? "05" : type === "在路上" ? "02" : "03"}</span></button>)}</div>
          <div className="gallery-grid">{visible.map(item => <button key={item.image} className={`photo-card photo-${item.index}`} aria-label={`放大照片：${item.title}`} onClick={event => openPhoto(item.index, event.currentTarget)}><div className="photo-image"><img src={asset(`/photos/${item.image}`)} alt={item.title} loading="lazy" width="800" height="600"/><span className="photo-label">{item.label}</span><span className="photo-zoom"><ArrowUpRight/></span></div><div className="photo-caption"><div><h3>{item.title}</h3><span>{item.type} · 生活记录</span></div><span className="photo-index">0{item.index + 1}</span></div></button>)}</div>
          {filter === "全部" && <div className="gallery-more"><button className="button black" onClick={() => setShowAll(!showAll)}>{showAll ? "收起部分照片" : "还有一个小快乐，继续看看"}{showAll ? <ChevronLeft size={18}/> : <ArrowRight size={18}/>}</button><span>{showAll ? "05 / 05" : "04 / 05"}</span></div>}
        </div></section>
        <section className="interest-section diagonal"><div className="wrap section"><div className="section-heading"><p className="eyebrow">THINGS THAT MAKE ME, ME</p><h2>我喜欢的那些事</h2><p>出走和停留，都有让人心动的理由。</p></div><div className="interest-grid">{interests.map(({ icon: Icon, name, english, text }) => <article className="interest-card" key={name}><div className="interest-icon"><Icon size={35} strokeWidth={1.7}/></div><h3>{name}</h3><p>{text}</p><span>{english}</span></article>)}</div></div></section>
        <section className="about-section" id="about"><div className="wrap section"><div className="section-heading"><p className="eyebrow">MORE THAN A FEW LABELS</p><h2>标签之外，还有很多我<Plus/></h2></div><div className="about-grid"><figure className="about-photo"><img src={asset("/photos/image6.jpeg")} alt="Rika 的看展日常" loading="lazy" width="600" height="800"/><figcaption><span>Rika / 何丽江</span><Sparkles size={22}/></figcaption><span className="about-sticker">INFJ<br/>双鱼座 ♡</span></figure><div className="about-notes"><article className="about-note pink-note"><h3>慢热的外表，热闹的内心。</h3><p>我是 Rika，也叫何丽江。来自云南，现在在西安生活。表面波澜不惊，心里可能已经炸开了花。</p><p>比起一份标准的自我介绍，我更想让你从这些生活的小事里，认识真实的我。</p></article><article className="about-note"><h3>我的人生坐标</h3><dl className="journey"><div><dt>01 · 来处</dt><dd>彩云之南，云南</dd></div><div><dt>02 · 学习</dt><dd>西南科技大学 · 信息管理</dd></div><div><dt>03 · 此刻</dt><dd>在西安，继续好好生活</dd></div></dl></article><a className="text-link" href={source} target="_blank" rel="noreferrer">完整个人说明书 <ArrowUpRight size={19}/></a></div></div></div></section>
        <section className="connection-section"><div className="wrap section"><div className="section-heading"><p className="eyebrow">GOOD CONNECTIONS START SMALL</p><h2>和我相处，可以很简单</h2></div><div className="connection-grid">{[{ icon: Heart, title: "1. 真诚地认识", text: "不必急着熟悉。给彼此一点时间，从一句自然的“你好”开始。", color: "rose" }, { icon: Gamepad2, title: "2. 一起做喜欢的事", text: "去旅行，玩户外，或者一起开局。在共同的快乐里，慢慢靠近。", color: "yellow" }, { icon: Sparkles, title: "3. 自在地做自己", text: "认真倾听，也尊重边界。不用刻意迎合，轻松一点就很好。", color: "blue" }].map(({ icon: Icon, title, text, color }) => <article className="connection-card" key={title}><div className={`connection-art ${color}`} aria-hidden="true"><span className="art-circle"/><Icon size={84} strokeWidth={1.3}/><Star/><span className="art-dots"/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="faq-section diagonal" id="faq"><div className="wrap section faq-layout"><div><p className="eyebrow">A LITTLE USER MANUAL</p><h2>你可能<br/>想问的事<em>？</em></h2><p className="faq-intro">先聊几句，<br/>慢慢认识就好。</p><Star className="faq-star"/></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><Plus size={20}/></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="quote-section"><div className="wrap"><span>一句想留在这里的话</span><blockquote>“生活给了我多少积雪，<br/>我就能遇到多少个<span>春天。</span>”</blockquote><p>—— 写在我的个人说明书里</p></div></section>
        <section className="contact-section dotted" id="contact"><div className="wrap section"><div className="contact-box"><div className="contact-title"><p className="eyebrow">LET’S MAKE A LITTLE CONNECTION</p><h2>下一段故事，<br/>从一句<span>你好</span>开始。</h2><p>聊旅行、聊游戏，也聊日常里那些有趣的小事。</p><Star className="contact-star"/></div><div className="contact-details"><span className="phone-label">给 Rika 打个电话</span><a className="phone-number" href={`tel:${phone}`}>195 2688 0781</a><div className="contact-actions"><a className="button black" href={`tel:${phone}`}><Phone size={17}/> 点击拨号</a><button className="button cream" onClick={copyPhone}>{copied ? <Check size={17}/> : <Copy size={17}/>}<span aria-live="polite">{copied ? "号码已复制" : "复制号码"}</span></button></div>{copyError && <p className="copy-error" role="status">请选中号码手动复制：19526880781</p>}<a className="contact-source" href={source} target="_blank" rel="noreferrer">继续读我的个人说明书 <ArrowUpRight size={16}/></a></div></div></div></section>
      </main>
    </div>
    <footer className="footer"><div className="wrap"><a className="logo" href="#home" aria-label="回到首页">Rika<Star/></a><span>© {new Date().getFullYear()} Rika · 认真生活，保持好奇。</span><a href="#home">回到顶部 <ArrowUpRight size={16}/></a></div></footer>
    <dialog ref={modal} className="lightbox" aria-label="生活相册" onClose={() => { setIsOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.currentTarget === event.target) closePhoto(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); shiftPhoto(1); } if (event.key === "ArrowLeft") { event.preventDefault(); shiftPhoto(-1); } }}><div className="lightbox-inner"><button className="lightbox-close" aria-label="关闭照片" onClick={closePhoto}><X/></button><img src={asset(`/photos/${moments[selected].image}`)} alt={moments[selected].title}/><div className="lightbox-caption"><div><h3>{moments[selected].title}</h3><p>{moments[selected].caption}</p></div><span>{filtered.findIndex(item => item.index === selected) + 1} / {filtered.length}</span></div><div className="lightbox-navigation"><button onClick={() => shiftPhoto(-1)} aria-label="上一张照片"><ChevronLeft size={19}/> 上一张</button><span>← → 切换 · ESC 关闭</span><button onClick={() => shiftPhoto(1)} aria-label="下一张照片">下一张 <ChevronRight size={19}/></button></div></div></dialog>
  </>;
}
