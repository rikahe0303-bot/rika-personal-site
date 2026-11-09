"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, X, Menu, Plus, ChevronLeft, ChevronRight, Check, Copy } from "lucide-react";

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

const memories = [
  {image:"image3.jpeg",title:"日落，是今天的句号。",category:"去远方",tag:"INTO THE SUNSET",caption:"山顶的风，和刚刚好的晚霞。"},
  {image:"image6.jpeg",title:"在别人的色彩里，停一会儿。",category:"在日常",tag:"A DAY AT THE GALLERY",caption:"看展，也给自己的生活换一种视角。"},
  {image:"image9.jpeg",title:"把自己还给大自然。",category:"去远方",tag:"A LITTLE CLOSER TO NATURE",caption:"走出去，遇见意料之外的可爱。"},
  {image:"image11.jpeg",title:"今日份的可爱，来自胖虎。",category:"在日常",tag:"MEET MY LITTLE FRIEND",caption:"介绍一下，这是胖虎，我的干儿子。"},
  {image:"image10.jpeg",title:"一点一点，拼出小快乐。",category:"在日常",tag:"SMALL THINGS, BIG JOY",caption:"沉浸在拼豆的时间里，快乐也可以很简单。"}
];
const guide = [
  ["慢一点认识，也没关系。","我有点慢热，表面平静，心里可能已经炸开了花。给彼此一点时间，熟悉之后，你会发现更多的我。"],
  ["真诚，是最好的开场白。","我喜欢自在、真诚的相处。温和，也有自己的边界；尊重彼此，让关系轻松一点。"],
  ["有心事的话，我在听。","愿意认真倾听，也愿意分享我的想法。答应的事情会用心对待，是朋友，也是一个认真负责的倾听者。"],
  ["一起出发，或者一起开局。","去旅行、玩户外，或者试试新游戏。一起做喜欢的事，就是慢慢熟悉彼此的好方式。"]
];

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [category,setCategory] = useState("全部");
  const [active,setActive] = useState(0);
  const [copyState,setCopyState] = useState("复制号码");
  const [photoOpen,setPhotoOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedPhotos = memories.map((photo,index)=>({...photo,index})).filter(photo=>category==="全部" || photo.category===category);
  useEffect(()=>{if(!photoOpen)return;const before=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=before;};},[photoOpen]);
  useEffect(()=>()=>{if(copyTimer.current)clearTimeout(copyTimer.current);},[]);
  function openPhoto(index:number){setActive(index);setPhotoOpen(true);dialog.current?.showModal();}
  function closePhoto(){dialog.current?.close();setPhotoOpen(false);}
  function movePhoto(direction:number){const position=selectedPhotos.findIndex(photo=>photo.index===active);setActive(selectedPhotos[(position+direction+selectedPhotos.length)%selectedPhotos.length].index);}
  async function copyPhone(){try{await navigator.clipboard.writeText("19526880781");setCopyState("已复制，聊聊吧！");}catch{setCopyState("请选中左侧号码复制");}if(copyTimer.current)clearTimeout(copyTimer.current);copyTimer.current=setTimeout(()=>setCopyState("复制号码"),3000);}
  return <>
    <a className="skip" href="#main">跳到主要内容</a>
    <header className="header">
      <a className="brand" href="#" aria-label="Rika 首页">R<span className="brand-flower">✳</span></a>
      <span className="header-note">RIKA’S PERSONAL JOURNAL<br/><b>一个关于我，也关于生活的地方。</b></span>
      <nav className={menuOpen?"nav is-open":"nav"} aria-label="主导航" id="navigation">
        <a href="#about" onClick={()=>setMenuOpen(false)}>关于我 <sup>01</sup></a>
        <a href="#moments" onClick={()=>setMenuOpen(false)}>日常放映 <sup>02</sup></a>
        <a href="#connection" onClick={()=>setMenuOpen(false)}>相处指南 <sup>03</sup></a>
      </nav>
      <a className="header-hello" href="#contact">Say hello <ArrowUpRight size={17}/></a>
      <button className="menu-toggle" aria-label={menuOpen?"关闭导航":"打开导航"} aria-expanded={menuOpen} aria-controls="navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>
    <main id="main">
      <section className="hero" aria-label="嗨，我是 Rika">
        <div className="edition"><span>VOL. 01 — THE EVERYDAY EDITION</span><span>云南出发 · 西安生活</span></div>
        <h1 className="giant-name">RIKA<span className="name-star" aria-hidden="true">✳</span><span className="sr-only">的个人网站</span></h1>
        <div className="hero-composition">
          <div className="hero-aside"><span className="hello-label">HELLO, WORLD!</span><p>慢热的外表，<br/>装着一颗好奇的心。</p><span className="handwriting">a little quiet,<br/>a lot of wonder.</span><a href="#about" className="round-down" aria-label="继续认识 Rika"><ArrowDown size={24}/></a></div>
          <figure className="cover-photo"><img src={assetPath("/photos/image2.jpeg")} alt="Rika 在山间草地上，倚着木围栏" fetchPriority="high"/><figcaption><span>FIG. 01 / ME, OUTSIDE</span><span>山野里的我 ↗</span></figcaption><span className="cover-tape" aria-hidden="true"/></figure>
          <div className="hero-statement"><span className="red-label">LIFE, IN MY OWN WAY</span><h2>把日子，<br/>过成<span>喜欢的</span><br/>样子。</h2><p>爱出走，也爱宅着。<br/>在真实的日常里，收集属于我的快乐。</p><a href="#moments" className="text-link">进入我的生活放映室 <ArrowUpRight size={21}/></a></div>
          <div className="round-sticker" aria-hidden="true"><span>永远对世界</span><b>好奇！</b><span>STAY CURIOUS</span></div>
        </div>
        <div className="hero-bottom"><span>这不是一份标准答案，而是一些真实的我。</span><span>SCROLL TO GET TO KNOW ME <ArrowDown size={13}/></span></div>
      </section>
      <div className="ticker" aria-label="个人关键词"><span>云南 → 西安</span><i>✳</i><span>INFJ</span><i>✳</i><span>户外充电</span><i>✳</i><span>游戏探索</span><i>✳</i><span>浪漫双鱼</span><i>✳</i><span>认真生活</span><i>✳</i></div>
      <section className="about section" id="about">
        <div className="section-label"><span>01 — THE PERSON BEHIND THE NAME</span><span>关于我</span></div>
        <div className="about-grid"><div className="about-title"><h2>不急着定义，<br/>先<span className="underline">认识一下。</span></h2><div className="little-id"><span>名字 / NAME</span><b>Rika <small>何丽江</small></b><div className="id-line"/><span>PERSONAL NOTES, ALWAYS UNFINISHED.</span></div></div>
        <div className="about-copy"><p className="lead">嗨，我是 Rika。<br/>来自云南，现在在西安生活。</p><p>毕业于西南科技大学，主修信息管理。比起用一连串标签介绍自己，我更喜欢让你从生活里的小事认识我。</p><p>喜欢旅行，喜欢户外，喜欢和大自然亲密接触。也会看展、拼豆，或者宅着打游戏。安静和热闹，出走和停留，都是我的一部分。</p><div className="fact-row"><span><b>INFJ</b>性格底色</span><span><b>双鱼座</b>浪漫一点</span><span><b>信息管理</b>我的专业</span></div></div></div>
        <div className="margin-note"><span>✳</span><p>不需要时刻精彩，<br/>喜欢自己的生活就很好。</p><span className="note-credit">A NOTE TO MYSELF ↗</span></div>
      </section>
      <section className="moments section" id="moments"><div className="section-label"><span>02 — COLLECT MOMENTS, NOT THINGS</span><span>日常放映</span></div>
        <div className="moments-heading"><h2>一些瞬间，<br/><span>很值得。</span></h2><div><p>按下快门，把喜欢留下来。<br/>这些照片，拼成了我的小世界。</p><div className="filters" role="group" aria-label="按生活主题筛选照片">{["全部","去远方","在日常"].map(item=><button key={item} className={category===item?"selected":""} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}<span>{item==="全部"?"05":item==="去远方"?"02":"03"}</span></button>)}</div></div></div>
        <div className={`memory-grid ${category!=="全部"?"is-filtered":""}`}>{selectedPhotos.map(photo=><button className={`memory memory-${photo.index}`} key={photo.image} aria-label={`放大照片：${photo.title}`} onClick={()=>openPhoto(photo.index)}><div className="memory-image"><img src={assetPath(`/photos/${photo.image}`)} alt={photo.title} loading="lazy"/><span className="photo-plus"><Plus size={23}/></span><span className="photo-number">0{photo.index+1}</span></div><div className="memory-caption"><span>{photo.tag}</span><h3>{photo.title}</h3><ArrowUpRight size={22}/></div></button>)}</div>
        <div className="gallery-end"><span>生活不设限，快乐不止一种。</span><span>END OF THIS ROLL. MORE LIFE AHEAD. ↗</span></div>
      </section>
      <section className="connection section" id="connection"><div className="section-label"><span>03 — HOW TO GET ALONG WITH ME</span><span>相处指南</span></div><div className="connection-grid"><div><span className="connection-star" aria-hidden="true">✳</span><h2>认识我，<br/>不用说明书。</h2><p>但这几件小事，<br/>可能会让我们更快熟悉。</p><span className="handwriting">let’s be ourselves.</span></div><div className="guide-list">{guide.map(([title,body],index)=><details key={title} open={index===0}><summary><span className="guide-number">0{index+1}</span><h3>{title}</h3><Plus size={22}/></summary><p>{body}</p></details>)}</div></div></section>
      <section className="quote"><span className="quote-label">WORDS I KEEP CLOSE</span><blockquote>“生活给了我多少积雪，<br/>我就能遇到多少个<span>春天。</span>”</blockquote><span className="quote-credit">—— 写在我的个人说明书里</span><span className="quote-flower" aria-hidden="true">✳</span></section>
      <section className="contact section" id="contact"><div className="section-label"><span>04 — THE NEXT CHAPTER STARTS WITH A HELLO</span><span>保持联系</span></div><div className="contact-title"><h2>HELLO<span>!</span></h2><a href="tel:19526880781" className="call-arrow" aria-label="给 Rika 打电话"><ArrowUpRight strokeWidth={1.2}/></a></div><div className="contact-bottom"><div><h3>下一段故事，从一句你好开始。</h3><p>聊旅行，聊游戏，也聊生活里那些小事。</p></div><div className="phone-block"><a className="phone" href="tel:19526880781">195 2688 0781</a><button className="copy" onClick={copyPhone}>{copyState.startsWith("已")?<Check size={15}/>:<Copy size={15}/>}<span aria-live="polite">{copyState}</span></button></div></div><div className="contact-links"><a href="https://my.feishu.cn/wiki/PwFMwXy47i7csPkxGR7cD1k86Pf?from=from_copylink" target="_blank" rel="noreferrer">翻阅完整个人说明书 <ArrowUpRight size={16}/></a><a href="#">回到开头 ↑</a></div></section>
    </main>
    <footer><a href="#" aria-label="Rika 首页">RIKA ✳</a><span>© {new Date().getFullYear()} Rika</span><span>一边生活，一边成为自己。</span></footer>
    <dialog ref={dialog} className="photo-dialog" aria-label="生活照片查看器" onClose={()=>setPhotoOpen(false)} onClick={event=>{if(event.target===event.currentTarget)closePhoto();}} onKeyDown={event=>{if(event.key==="ArrowRight"){event.preventDefault();movePhoto(1);}if(event.key==="ArrowLeft"){event.preventDefault();movePhoto(-1);}}}><div className="dialog-content"><button className="close-photo" aria-label="关闭照片" onClick={closePhoto}><X/></button><img src={assetPath(`/photos/${memories[active].image}`)} alt={memories[active].title}/><div className="dialog-caption"><div><h3>{memories[active].title}</h3><p>{memories[active].caption}</p></div><span>{selectedPhotos.findIndex(photo=>photo.index===active)+1} / {selectedPhotos.length}</span></div><div className="dialog-controls"><button aria-label="上一张照片" onClick={()=>movePhoto(-1)}><ChevronLeft/> 上一张</button><span>← → 切换 · ESC 关闭</span><button aria-label="下一张照片" onClick={()=>movePhoto(1)}>下一张 <ChevronRight/></button></div></div></dialog>
  </>;
}
