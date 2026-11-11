"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Menu, Minus, Plus, X } from "lucide-react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
const source = "https://my.feishu.cn/wiki/PwFMwXy47i7csPkxGR7cD1k86Pf";
const phone = "19526880781";
const socialLinks = [
  { name: "抖音", english: "DOUYIN", href: "https://v.douyin.com/0zft5Ls1Bcs/", description: "存放情绪的小角落，来这里看看我。" },
  { name: "小红书", english: "XIAOHONGSHU", href: "https://xhslink.cn/o/8XtYPcQDwvC", description: "换一个小角落，继续慢慢认识。" },
];
const photographs = [
  { image: "image3.jpeg", title: "把日落，留在心里。", english: "THE LAST LIGHT", type: "在路上", caption: "山顶的风，和刚刚好的晚霞。" },
  { image: "image6.jpeg", title: "在别人的色彩里，停留。", english: "A QUIET AFTERNOON", type: "小日常", caption: "假装文艺青年去看展，给好奇心留一点空间。" },
  { image: "image10.jpeg", title: "小小的事，也值得投入。", english: "MADE OF LITTLE JOYS", type: "小日常", caption: "紧跟潮流，拼豆！一颗一颗拼起来的，是简单而具体的快乐。" },
  { image: "image11.jpeg", title: "和胖虎，一起慢慢走。", english: "MY LITTLE COMPANION", type: "小日常", caption: "这是胖虎，我的干儿子，也是日常里可爱的陪伴。" },
  { image: "image9.jpeg", title: "出发，就有新的相遇。", english: "SOMEWHERE OUTSIDE", type: "在路上", caption: "走进山野，总会碰见计划之外的可爱。" },
  { image: "image2.jpeg", title: "把自己，还给山野。", english: "A LITTLE CLOSER TO NATURE", type: "在路上", caption: "吹吹风，走走路。在大自然里，找回自己的节奏。" },
  { image: "friends.jpeg", title: "碰个杯，认识新朋友。", english: "GOOD COMPANY", type: "小日常", caption: "出去玩，见到不同的人，也多一些可以聊的故事。" },
  { image: "food.jpeg", title: "认真研究，怎么填饱肚子。", english: "A TABLE OF HAPPINESS", type: "小日常", caption: "吃点喜欢的，把普通的一餐过得有滋有味。" },
  { image: "mahjong.jpeg", title: "和朋友，一起学点国粹。", english: "AROUND THE TABLE", type: "小日常", caption: "凑一桌，摸摸牌。我的日常，也有这样热闹的一面。" },
];
const interests = [
  { title: "走进山野", english: "WANDER", text: "爱旅游，去过很多城市，也爱玩户外。和大自然亲密接触，在路上认识不同的人，见到计划之外的风景。", tags: ["旅行", "户外", "自然"], photo: 4 },
  { title: "留一点艺术", english: "NOTICE", text: "假装文艺青年去看展，是我的日常之一。在一幅画前停一停，看看别人的色彩，也给自己留一点慢下来的时间。", tags: ["看展", "色彩", "好奇心"], photo: 1 },
  { title: "享受小日常", english: "SLOW DOWN", text: "各类游戏都想尝尝鲜，也喜欢跟着潮流拼豆。和朋友学点国粹，再研究怎么填饱肚子，日常就这样有滋有味。", tags: ["游戏", "拼豆", "麻将", "美食"], photo: 2 },
  { title: "与可爱作伴", english: "CONNECT", text: "遛遛狗，和胖虎一起慢慢走。哦，他叫胖虎，是我的干儿子！和大自然亲密接触，也和这些可爱的小日常待在一起。", tags: ["胖虎", "陪伴", "倾听"], photo: 3 },
];
const faqs = [
  ["可以怎么称呼你？", "我是何丽江，也可以叫我水水。一个慢热的 INFJ，浪漫的双鱼座。表面波澜不惊，心里可能已经炸开了花。"],
  ["从哪里来，现在在哪里？", "我来自云南，现在在西安生活。毕业于西南科技大学，主修信息管理。"],
  ["和你相处，有什么小提示？", "我是一个非常温和的人，但边界感很强，主打尊重他人命运。慢热、不主动、不拒绝，但非常负责。心里可能已经炸开了花，表面还是波澜不惊。更多的，就留给你慢慢体会。"],
  ["怎么介绍自己的经历？", "毕业于西南科技大学，主修信息管理。我在个人说明书里写下的身份是 IP 操盘手、情感陪伴师，也坦诚地把自己叫作职场小白：毕业后还没有上过班。不过，出去玩见到的人多，人情世故也在这些相遇里慢慢学。"],
  ["怎样才能和你慢慢熟悉？", "一起做喜欢的事就很好：旅行、户外、看展，或者一起试试新游戏。给彼此一点时间，自然一点，真诚一点。"],
  ["可以找你聊些什么？", "旅行、游戏、拼豆、美食，或者日常的小事都可以。我愿意做一个知心好朋友，听你说心事、陪你梳理情绪。我的想法通常只说一遍，也尊重你的选择。胖虎是我常遛的狗狗，也是我的干儿子。"],
  ["怎么看待低落和重新出发？", "我是浪漫的双鱼座，也是 INFJ。我在个人说明书里打趣自己是‘放弃型人格’：‘我时常万念俱灰，又经常死灰复燃！生活给了我多少积雪，我就能遇到多少个春天。’"],
  ["怎么联系你？", "电话是 19526880781。你可以在页面下方直接拨号或复制号码，也可以去抖音和小红书，看看我存放情绪的小角落。"],
];

function Emblem({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true"><circle cx="32" cy="32" r="23" stroke="currentColor" strokeWidth=".75"/><path d="M32 4v10M32 50v10M4 32h10M50 32h10" stroke="currentColor" strokeWidth=".75"/><path d="M32 18c0 9-5 14-14 14 9 0 14 5 14 14 0-9 5-14 14-14-9 0-14-5-14-14Z" stroke="currentColor" strokeWidth=".75"/><circle cx="32" cy="4" r="1.4" fill="currentColor"/><circle cx="60" cy="32" r="1.4" fill="currentColor"/><circle cx="32" cy="60" r="1.4" fill="currentColor"/><circle cx="4" cy="32" r="1.4" fill="currentColor"/></svg>;
}

export default function PersonalSite({ page }: { page: "skills" | "about" }) {
  const isHome = page === "skills";
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
    <section className={isHome ? "cover-hero" : "personal-top"} id="home" aria-labelledby="hero-title">
      {isHome && <><img className="cover-image" src={asset("/photos/image2.jpeg")} alt="何丽江在山野草地间，倚着木围栏" width="1080" height="1440" fetchPriority="high"/><div className="cover-shade"/></>}
      <header className="header">
        <a className="brand cover-brand" href={asset("/")} aria-label="何丽江首页"><span>何丽江<small>HE LIJIANG</small></span></a>
        <nav className={menuOpen ? "navigation open" : "navigation"} id="navigation" aria-label="主导航">
          <a href={asset("/")} aria-current={isHome ? "page" : undefined} onClick={() => setMenuOpen(false)}>首页 · 技能</a>
          <a href={asset("/about/")} aria-current={!isHome ? "page" : undefined} onClick={() => setMenuOpen(false)}>关于我</a>
          <a href={isHome ? asset("/about/#journal") : "#journal"} onClick={() => setMenuOpen(false)}>生活相册</a>
          <a href={asset("/video/")} onClick={() => setMenuOpen(false)}>像素短片</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>联系我</a>
        </nav>
        <button ref={menuButton} className="menu-button" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? "关闭菜单" : "打开菜单"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      </header>
      {isHome ? <>
        <div className="cover-content">
          <span className="cover-eyebrow">PERSONAL SPACE / 01</span>
          <div className="cover-card"><span className="cover-greeting">你好 我是</span><h1 id="hero-title">何丽江</h1><div className="cover-roles"><a href="#skills">IP 操盘手</a><span aria-hidden="true">/</span><a href="#skills">情感陪伴师</a></div><p>认真表达 也认真倾听<br/>温和有边界 自在做自己</p></div>
          <div className="cover-actions"><a className="cover-button" href="#skills">了解我的技能 <ArrowUpRight size={16}/></a><a className="cover-button outline" href={asset("/about/")}>关于我 <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="cover-bottom"><a className="cover-story" href={asset("/about/#journal")}><img src={asset("/photos/image6.jpeg")} alt="何丽江看展的生活片段" width="956" height="1274"/><span><small>A LITTLE OF MY LIFE</small><strong>在日常里<br/>慢慢认识我</strong></span><ArrowUpRight size={17}/></a><div className="cover-location"><span>云南出发 · 西安生活</span><a href="#skills" aria-label="向下浏览技能介绍"><ArrowDown size={18}/></a></div></div>
      </> : <div className="personal-page-heading wrap"><a href={asset("/")} className="underlined-link"><ArrowLeft size={15}/> 返回技能首页</a><div><h1 id="hero-title">关于何丽江</h1><p>也可以叫我水水<br/>性格 所爱 还有值得留下的日常</p></div></div>}
    </section>
    <main id="main">
      {isHome ? <>
        <section className="skills-section section wrap" id="skills" aria-labelledby="skills-title">
          <div className="section-kicker"><span>01 / MY SKILLS</span><span>表达与陪伴</span></div>
          <div className="skills-layout">
            <div className="skills-intro"><span className="editorial-label">WHAT I DO</span><h2 id="skills-title">认真表达<br/><em>用心陪伴</em></h2><p>我是何丽江，也可以叫我水水。<br/>温和，有边界，认真对待每一次交流。</p></div>
            <div className="skill-list">
              <article className="skill-row"><span className="skill-number">01</span><div><span className="eyebrow">PERSONAL IP</span><h3>IP 操盘手</h3><p>欢迎和我聊聊 IP 相关的想法。你也可以从我的抖音、小红书出发，认识我的表达与日常。</p><a className="underlined-link" href="#social">看看我的内容 <ArrowUpRight size={16}/></a></div></article>
              <article className="skill-row"><span className="skill-number">02</span><div><span className="eyebrow">EMOTIONAL COMPANIONSHIP</span><h3>情感陪伴师</h3><p>做一个知心好朋友，听你说心事，陪你梳理情绪。温和，也有边界；我的想法通常只说一遍，尊重你的选择。</p><a className="underlined-link" href="#contact">找我聊聊 <ArrowUpRight size={16}/></a></div></article>
            </div>
          </div>
        </section>
        <section className="personal-preview"><div className="wrap section personal-preview-layout"><figure><img src={asset("/photos/image6.jpeg")} alt="何丽江在展览中欣赏画作" width="956" height="1274" loading="lazy"/></figure><div><span className="eyebrow">02 / THE PERSONAL SIDE</span><h2>走进山野<br/><em>也走进生活</em></h2><p>26 岁，来自云南，现在在西安生活。<br/>毕业于西南科技大学，主修信息管理。<br/>慢热的 INFJ，浪漫的双鱼座。<br/>爱旅行、户外和各种游戏，<br/>也爱看展、拼豆，和胖虎一起散步。</p><a className="pill" href={asset("/about/")}>翻开「关于我」 <ArrowUpRight size={16}/></a></div></div></section>
      </> : <>
      <div className="ribbon" aria-hidden="true"><div>{[0, 1].map(i => <span key={i}>走进山野 <i>✳</i> 感受日常 <i>✳</i> 保持好奇 <i>✳</i> 认真生活 <i>✳</i> 慢慢认识 <i>✳</i> 自在一点 <i>✳</i> </span>)}</div></div>
      <section className="about section wrap" id="about">
        <div className="section-kicker"><span>01 / ABOUT ME</span><span>比标签多一点</span></div>
        <div className="about-intro"><h2>安静的外表，<br/><em>热闹的内心。</em></h2><div className="about-copy"><p className="nickname">Hi，我是何丽江。<br/>也可以叫我，<strong>水水。</strong></p><p>26 岁，来自彩云之南，现在在西安生活。<br/>毕业于西南科技大学，主修信息管理。<br/>一个慢热的 INFJ，浪漫的双鱼座。</p><p>我是一个非常温和的人，但边界感很强。<br/>慢热、不主动、不拒绝，却非常负责。<br/>心里炸开了花，表面也可以波澜不惊。</p><p>毕业后还没有上过班，是个职场小白。<br/>不过，出去玩见到的人多，<br/>也在不同的相遇里学着理解人情世故。</p><p>喜欢旅游，去过很多城市，也爱玩户外。<br/>各类游戏都想尝尝鲜。<br/>来看看这些日常，慢慢认识真实的我。</p><a className="underlined-link" href="#manual">翻开我的相处指南 <ArrowDown size={16}/></a></div></div>
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
        {filter === "全部" && <div className="journal-more"><button className="pill" onClick={() => setShowAll(!showAll)}>{showAll ? "收起生活片段" : "翻开更多日常"}{showAll ? <Minus size={15}/> : <Plus size={15}/>}</button><span>{String(visible.length).padStart(2, "0")} / {String(photographs.length).padStart(2, "0")} MOMENTS</span></div>}
      </section>
      <section className="faq-section" id="manual"><div className="wrap section faq-grid"><div className="faq-intro"><span className="eyebrow">04 / A LITTLE USER MANUAL</span><h2>慢慢来，<br/><em>慢慢认识。</em></h2><p>这是我的个人说明书，<br/>快速了解和我相处的方法。<br/>还有些说不完的，留给日常慢慢体会。</p><Emblem/></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span className="faq-number">0{index + 1}</span><span>{question}</span><Plus size={17}/></summary><p>{answer}</p></details>)}</div></div></section>
      </>}
      <section className="social-section section wrap" id="social" aria-labelledby="social-title">
        <div className="section-kicker"><span>{isHome ? "03" : "05"} / MY LITTLE CORNERS</span><span>还有一些话，想慢慢说</span></div>
        <div className="social-layout">
          <div className="social-intro"><h2 id="social-title">存放情绪的<br/><em>小角落。</em></h2><p>话太多了，有些说不完。<br/>在这里之外，也留了两个认识我的入口。</p></div>
          <div className="social-links">{socialLinks.map((item, index) => <a key={item.name} className="social-entry" href={item.href} target="_blank" rel="noreferrer" aria-label={`打开${item.name}（新窗口）`}><span className="social-number">0{index + 1}</span><div><span className="eyebrow">{item.english}</span><h3>{item.name}</h3><p>{item.description}</p></div><ArrowUpRight size={27}/></a>)}</div>
        </div>
      </section>
      <section className="contact-section dark-section" id="contact"><div className="wrap section"><div className="section-kicker"><span>{isHome ? "04" : "06"} / SAY HELLO</span><span>故事，从一句你好开始</span></div><div className="contact-main"><div><p className="eyebrow">WHENEVER YOU FEEL LIKE IT.</p><h2>很高兴，<br/><em>在这里遇见你。</em></h2><p className="contact-description">聊旅行、聊游戏，也听听你的心事。<br/>很高兴认识你，我是水水。</p></div><div className="contact-details"><span>给何丽江打个电话</span><a className="phone" href={`tel:${phone}`}>195 2688 0781<ArrowUpRight/></a><div className="contact-actions"><a className="pill filled" href={`tel:${phone}`}>打个招呼 <ArrowUpRight size={16}/></a><button className="copy-button" onClick={copyPhone}>{copied ? <Check size={15}/> : <Copy size={15}/>}<span aria-live="polite">{copied ? "号码已复制" : "复制号码"}</span></button></div>{copyError && <p className="copy-error" role="status">请选中号码手动复制：19526880781</p>}<a className="source-link" href={source} target="_blank" rel="noreferrer">我的飞书个人说明书 <ArrowUpRight size={14}/></a></div></div></div></section>
    </main>
    <footer className="footer dark-section"><div className="wrap"><div className="footer-top"><a className="brand" href={asset("/")} aria-label="返回何丽江首页"><Emblem/><span>何丽江<small>IN MY OWN TIME.</small></span></a><p>生活给了我多少积雪，就能遇到多少个春天。<br/>最后，祝大家发财，也祝你开心！</p><a href="#home" className="back-top">回到顶部 <ArrowUpRight size={15}/></a></div><div className="footer-wordmark" aria-hidden="true">HE LIJIANG</div><div className="footer-bottom"><span>© {new Date().getFullYear()} 何丽江</span><span>云南出发 · 西安生活</span><span>MADE OF LITTLE MOMENTS.</span></div></div></footer>
    {!isHome && <dialog className="lightbox" ref={dialog} aria-label="生活相册" onClose={() => { setPhotoOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); shiftPhoto(1); } if (event.key === "ArrowLeft") { event.preventDefault(); shiftPhoto(-1); } }}><div className="lightbox-inner"><button className="lightbox-close" aria-label="关闭照片" onClick={() => dialog.current?.close()}><X size={23}/></button><img src={asset(`/photos/${photographs[photo].image}`)} alt={photographs[photo].caption}/><div className="lightbox-caption"><div><span>{photographs[photo].english}</span><h3>{photographs[photo].title}</h3><p>{photographs[photo].caption}</p></div><span>{filtered.findIndex(item => item.index === photo) + 1} / {filtered.length}</span></div><div className="lightbox-navigation"><button onClick={() => shiftPhoto(-1)} aria-label="上一张照片"><ArrowLeft size={17}/> 上一张</button><span>← → 切换 · ESC 关闭</span><button onClick={() => shiftPhoto(1)} aria-label="下一张照片">下一张 <ArrowRight size={17}/></button></div></div></dialog>}
  </>;
}
