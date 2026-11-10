"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Menu, Minus, Plus, X } from "lucide-react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
const source = "https://my.feishu.cn/wiki/PwFMwXy47i7csPkxGR7cD1k86Pf";
const phone = "19526880781";
const photographs = [
  { image: "image3.jpeg", title: "把日落，留在心里。", english: "THE LAST LIGHT", type: "在路上", caption: "山顶的风，和刚刚好的晚霞。" },
  { image: "image6.jpeg", title: "在别人的色彩里，停留。", english: "A QUIET AFTERNOON", type: "小日常", caption: "去看展，给好奇心留一点空间。" },
  { image: "image10.jpeg", title: "小小的事，也值得投入。", english: "MADE OF LITTLE JOYS", type: "小日常", caption: "一颗一颗拼起来的，是简单而具体的快乐。" },
  { image: "image11.jpeg", title: "和胖虎，一起慢慢走。", english: "MY LITTLE COMPANION", type: "小日常", caption: "这是胖虎，我的干儿子，也是日常里可爱的陪伴。" },
  { image: "image9.jpeg", title: "出发，就有新的相遇。", english: "SOMEWHERE OUTSIDE", type: "在路上", caption: "走进山野，总会碰见计划之外的可爱。" },
  { image: "image2.jpeg", title: "把自己，还给山野。", english: "A LITTLE CLOSER TO NATURE", type: "在路上", caption: "吹吹风，走走路。在大自然里，找回自己的节奏。" },
];
const interests = [
  { title: "走进山野", english: "WANDER", text: "喜欢旅行，也喜欢户外。让脚步离开熟悉的日常，在山风、晚霞和陌生的路上，遇见更自在的自己。", tags: ["旅行", "户外", "自然"], photo: 4 },
  { title: "留一点艺术", english: "NOTICE", text: "去看展，在一幅画前停留。喜欢观察不同的色彩和表达，也愿意为生活里微小的美多看一眼。", tags: ["看展", "色彩", "好奇心"], photo: 1 },
  { title: "享受小日常", english: "SLOW DOWN", text: "爱出门，也能宅得很开心。游戏里的冒险，拼豆时的专注，都是给自己充电的方式。", tags: ["游戏", "拼豆", "放松"], photo: 2 },
  { title: "与可爱作伴", english: "CONNECT", text: "和胖虎待在一起，认真听朋友分享。舒服的陪伴不必热闹，真诚、自然，有彼此的空间就很好。", tags: ["胖虎", "陪伴", "倾听"], photo: 3 },
];
const faqs = [
  ["你是一个什么样的人？", "我是何丽江，一个慢热的 INFJ，双鱼座。表面可能很平静，心里却已经炸开了花。温和、认真，也重视彼此的边界。"],
  ["从哪里来，现在在哪里？", "我来自云南，现在在西安生活。毕业于西南科技大学，主修信息管理。"],
  ["怎样才能和你慢慢熟悉？", "一起做喜欢的事就很好：旅行、户外、看展，或者一起试试新游戏。给彼此一点时间，自然一点，真诚一点。"],
  ["可以找你聊些什么？", "旅行、游戏、拼豆，或者日常的小事都可以。也愿意认真听你说说心事，做一个朋友和倾听者。"],
  ["怎么联系你？", "电话是 19526880781。你可以在页面下方直接拨号或复制号码，也可以打开飞书里的完整个人说明书。"],
];

function Emblem({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true"><circle cx="32" cy="32" r="23" stroke="currentColor" strokeWidth=".75"/><path d="M32 4v10M32 50v10M4 32h10M50 32h10" stroke="currentColor" strokeWidth=".75"/><path d="M32 18c0 9-5 14-14 14 9 0 14 5 14 14 0-9 5-14 14-14-9 0-14-5-14-14Z" stroke="currentColor" strokeWidth=".75"/><circle cx="32" cy="4" r="1.4" fill="currentColor"/><circle cx="60" cy="32" r="1.4" fill="currentColor"/><circle cx="32" cy="60" r="1.4" fill="currentColor"/><circle cx="4" cy="32" r="1.4" fill="currentColor"/></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interest, setInterest] = useState(0);
  const [filter, setFilter] = useState("全部");
  const [showAll, setShowAll] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtered = photographs.map((item, index) => ({ ...item, index })).filter(item => filter === "全部" || item.type === filter);
  const visible = filter === "全部" && !showAll ? filtered.slice(0, 3) : filtered;
  const featured = photographs[interests[interest].photo];

  useEffect(() => {
    if (!photoOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [photoOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function openPhoto(index: number, button: HTMLButtonElement) { trigger.current = button; setPhoto(index); dialog.current?.showModal(); setPhotoOpen(true); }
  function shiftPhoto(direction: number) { const index = filtered.findIndex(item => item.index === photo); setPhoto(filtered[(index + direction + filtered.length) % filtered.length].index); }
  async function copyPhone() {
    try { await navigator.clipboard.writeText(phone); setCopied(true); setCopyError(false); }
    catch { setCopied(false); setCopyError(true); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 3000);
  }

  return <>
    <a href="#main" className="skip-link">跳到正文</a>
    <section className="hero" id="home" aria-labelledby="hero-title">
      <img className="hero-image" src={asset("/photos/image2.jpeg")} alt="何丽江在山野草地间，倚着木围栏" width="1080" height="1440" fetchPriority="high"/>
      <div className="hero-shade"/>
      <header className="header">
        <a className="brand" href="#home" aria-label="何丽江首页"><Emblem/><span>何丽江<small>PERSONAL JOURNAL</small></span></a>
        <nav className={menuOpen ? "navigation open" : "navigation"} id="navigation" aria-label="主导航">
          {[["关于我", "about"], ["所爱之事", "interests"], ["生活片段", "journal"], ["联系我", "contact"]].map(([label, id], i) => <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>{label}{i === 1 && <sup>04</sup>}</a>)}
        </nav>
        <button ref={menuButton} className="menu-button" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? "关闭菜单" : "打开菜单"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      </header>
      <div className="hero-name"><p>IN MY OWN TIME, IN MY OWN WAY.</p><h1 id="hero-title">何丽江</h1><span>HE LIJIANG</span></div>
      <div className="hero-bottom"><span className="hero-coordinate">FROM YUNNAN<br/>BASED IN XI’AN</span><div className="hero-intro"><p>慢一点，去感受生活。</p><a className="pill light" href="#about">走进我的小世界 <ArrowUpRight size={15}/></a></div><a className="scroll-link" href="#about">向下探索 <ArrowDown size={15}/></a></div>
    </section>
    <main id="main">
      <div className="ribbon" aria-hidden="true"><div>{[0, 1].map(i => <span key={i}>走进山野 <i>✳</i> 感受日常 <i>✳</i> 保持好奇 <i>✳</i> 认真生活 <i>✳</i> 慢慢认识 <i>✳</i> 自在一点 <i>✳</i> </span>)}</div></div>
      <section className="about section wrap" id="about">
        <div className="section-kicker"><span>01 / ABOUT ME</span><span>比标签多一点</span></div>
        <div className="about-intro"><h2>安静的外表，<br/><em>热闹的内心。</em></h2><div className="about-copy"><p>我是何丽江，来自云南，现在在西安生活。<br/>一个慢热的 INFJ，双鱼座。<br/>表面波澜不惊，心里可能已经炸开了花。</p><p>喜欢走进山野，也享受安静的日常。<br/>比起一份标准的自我介绍，我更想让你从这些<br className="desktop-break"/>喜欢的小事里，认识真实的我。</p><a className="underlined-link" href={source} target="_blank" rel="noreferrer">阅读完整个人说明书 <ArrowUpRight size={16}/></a></div></div>
        <div className="about-images"><figure className="about-wide"><img src={asset("/photos/image9.jpeg")} alt="在山间道路上，和牛群不期而遇" loading="lazy" width="1220" height="1080"/><figcaption>在路上，总有新的相遇。<span>OUTSIDE & ALIVE</span></figcaption></figure><figure className="about-tall"><img src={asset("/photos/image6.jpeg")} alt="何丽江在展览中欣赏画作" loading="lazy" width="956" height="1274"/><figcaption>停下来，也是一种发现。<span>LOOK A LITTLE CLOSER</span></figcaption></figure><div className="image-note"><Emblem/><span>一点安静。<br/>一点野。</span></div></div>
        <div className="personal-coordinates"><div><span>来处 / ORIGIN</span><p>云南</p></div><div><span>学习 / EDUCATION</span><p>西南科技大学 · 信息管理</p></div><div><span>此刻 / CURRENTLY</span><p>在西安，好好生活</p></div></div>
      </section>
      <section className="interests dark-section" id="interests"><div className="wrap section">
        <div className="section-kicker"><span>02 / THINGS I LOVE</span><span>生活，有很多种打开方式</span></div>
        <div className="interests-heading"><h2>让日子，<br/><em>有一点喜欢。</em></h2><p>在出走与停留之间，<br/>找到让自己舒服的节奏。</p></div>
        <div className="interests-grid"><div className="interest-list">{interests.map((item, index) => <div className={interest === index ? "interest-item active" : "interest-item"} key={item.title}><button aria-expanded={interest === index} aria-controls={`interest-detail-${index}`} onClick={() => setInterest(index)}><span className="interest-number">0{index + 1}</span><span className="interest-title">{item.title}<small>{item.english}</small></span><span className="interest-toggle">{interest === index ? <Minus size={19}/> : <Plus size={19}/>}</span></button><div className="interest-description" id={`interest-detail-${index}`} hidden={interest !== index}><p>{item.text}</p><div>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>)}</div><figure className="interest-photo"><img key={featured.image} src={asset(`/photos/${featured.image}`)} alt={featured.caption} loading="lazy" width="1080" height="1440"/><figcaption><span>{interests[interest].english}</span><span>0{interest + 1} / 04</span></figcaption></figure></div>
      </div></section>
      <section className="quote-section" aria-label="写给自己的话"><img src={asset("/photos/image3.jpeg")} alt="山顶暮色与晚霞" loading="lazy" width="1080" height="1440"/><div className="quote-shade"/><div className="quote-content"><Emblem/><span className="eyebrow">A NOTE TO MYSELF</span><blockquote>生活给了我多少积雪，<br/>我就能遇到多少个<span>春天。</span></blockquote><p>— 写在我的个人说明书里</p></div></section>
      <section className="journal section wrap" id="journal"><div className="section-kicker"><span>03 / MOMENTS OF LIFE</span><span>把喜欢的瞬间留下</span></div><div className="journal-heading"><h2>日常，<em>也值得收藏。</em></h2><p>不必盛大。喜欢的，就是好风景。</p></div><div className="journal-toolbar"><span>生活片段 / PERSONAL MOMENTS</span><div className="journal-filters" role="group" aria-label="筛选生活照片">{["全部", "在路上", "小日常"].map(type => <button className={filter === type ? "active" : ""} aria-pressed={filter === type} key={type} onClick={() => { setFilter(type); setShowAll(false); }}>{type}</button>)}</div></div>
        <div className="journal-grid">{visible.map(item => <button key={item.image} className="journal-card" onClick={event => openPhoto(item.index, event.currentTarget)} aria-label={`放大照片：${item.title}`}><div className={`journal-photo journal-photo-${item.index}`}><img src={asset(`/photos/${item.image}`)} alt={item.caption} loading="lazy" width="1080" height="1440"/><span className="photo-arrow"><ArrowUpRight size={20}/></span></div><div className="journal-meta"><span>{item.type}</span><span>0{item.index + 1}</span></div><h3>{item.title}</h3><span className="journal-english">{item.english}</span></button>)}</div>
        {filter === "全部" && <div className="journal-more"><button className="pill" onClick={() => setShowAll(!showAll)}>{showAll ? "收起生活片段" : "翻开更多日常"}{showAll ? <Minus size={15}/> : <Plus size={15}/>}</button><span>{showAll ? "06" : "03"} / 06 MOMENTS</span></div>}
      </section>
      <section className="faq-section"><div className="wrap section faq-grid"><div className="faq-intro"><span className="eyebrow">04 / A LITTLE USER MANUAL</span><h2>慢慢来，<br/><em>慢慢认识。</em></h2><p>一些关于我的小小答案，<br/>也许就是我们聊天的开始。</p><Emblem/></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span className="faq-number">0{index + 1}</span><span>{question}</span><Plus size={17}/></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="contact-section dark-section" id="contact"><div className="wrap section"><div className="section-kicker"><span>05 / SAY HELLO</span><span>故事，从一句你好开始</span></div><div className="contact-main"><div><p className="eyebrow">WHENEVER YOU FEEL LIKE IT.</p><h2>很高兴，<br/><em>在这里遇见你。</em></h2><p className="contact-description">聊旅行、聊游戏，<br/>也聊生活里那些有趣的小事。</p></div><div className="contact-details"><span>给何丽江打个电话</span><a className="phone" href={`tel:${phone}`}>195 2688 0781<ArrowUpRight/></a><div className="contact-actions"><a className="pill filled" href={`tel:${phone}`}>打个招呼 <ArrowUpRight size={16}/></a><button className="copy-button" onClick={copyPhone}>{copied ? <Check size={15}/> : <Copy size={15}/>}<span aria-live="polite">{copied ? "号码已复制" : "复制号码"}</span></button></div>{copyError && <p className="copy-error" role="status">请选中号码手动复制：19526880781</p>}<a className="source-link" href={source} target="_blank" rel="noreferrer">我的飞书个人说明书 <ArrowUpRight size={14}/></a></div></div></div></section>
    </main>
    <footer className="footer dark-section"><div className="wrap"><div className="footer-top"><a className="brand" href="#home" aria-label="返回何丽江首页"><Emblem/><span>何丽江<small>IN MY OWN TIME.</small></span></a><p>认真生活，保持好奇。<br/>也记得，给自己一点慢下来的时间。</p><a href="#home" className="back-top">回到顶部 <ArrowUpRight size={15}/></a></div><div className="footer-wordmark" aria-hidden="true">HE LIJIANG</div><div className="footer-bottom"><span>© {new Date().getFullYear()} 何丽江</span><span>云南出发 · 西安生活</span><span>MADE OF LITTLE MOMENTS.</span></div></div></footer>
    <dialog className="lightbox" ref={dialog} aria-label="生活相册" onClose={() => { setPhotoOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); shiftPhoto(1); } if (event.key === "ArrowLeft") { event.preventDefault(); shiftPhoto(-1); } }}><div className="lightbox-inner"><button className="lightbox-close" aria-label="关闭照片" onClick={() => dialog.current?.close()}><X size={23}/></button><img src={asset(`/photos/${photographs[photo].image}`)} alt={photographs[photo].caption}/><div className="lightbox-caption"><div><span>{photographs[photo].english}</span><h3>{photographs[photo].title}</h3><p>{photographs[photo].caption}</p></div><span>{filtered.findIndex(item => item.index === photo) + 1} / {filtered.length}</span></div><div className="lightbox-navigation"><button onClick={() => shiftPhoto(-1)} aria-label="上一张照片"><ArrowLeft size={17}/> 上一张</button><span>← → 切换 · ESC 关闭</span><button onClick={() => shiftPhoto(1)} aria-label="下一张照片">下一张 <ArrowRight size={17}/></button></div></div></dialog>
  </>;
}
