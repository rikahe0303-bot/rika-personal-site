import React,{useContext} from 'react';
import {CanvasImage,Easing,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {SceneMotionContext} from './Transitions';
import {pixelFont} from './PixelFont';
export const C={cream:'#f5efdf',ink:'#222f4c',mint:'#9ae1cd',peach:'#ffb98b',lavender:'#cbb9ef'};
export const sans=`"${pixelFont}",monospace`;
const ease={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)} as const;
export const Stage=({children}:{children:React.ReactNode})=>{const f=useCurrentFrame();const {fps}=useVideoConfig();return <div style={{position:'absolute',inset:0,opacity:interpolate(f,[0,.18*fps],[0,1],ease)}}>{children}</div>};
export const Text=({children,x=240,y,w=1440,size=76,color=C.cream,delay=0,center=false,motion='roll',accentWords=[]}:{children:React.ReactNode;x?:number;y:number;w?:number;size?:number;color?:string;delay?:number;center?:boolean;motion?:'roll'|'split'|'spring';accentWords?:string[]})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const scene=useContext(SceneMotionContext);const startDelay=delay+scene.lead;let characterIndex=0;
 const fontSize=Math.max(36,Math.round(size/12)*12);
 const big=fontSize>=72;const candy=big&&color!==C.ink;
 const candyColors=['#ffe28d','#ffb4d9','#a4eed0','#d6baff','#a9e6ff'];
 const content=React.Children.toArray(children).filter(c=>typeof c==='string'||typeof c==='number').join('');
 const highlights=accentWords.flatMap((word,wordIndex)=>{const start=content.indexOf(word);return start<0?[]:[{start,end:start+word.length,color:wordIndex%2===0?C.mint:C.peach}];});
 const exit=scene.last?0:interpolate(f,[scene.duration-.7*fps,scene.duration-.18*fps],[0,1],ease);
 const letters=React.Children.toArray(children).flatMap<React.ReactNode>((child)=>{
  if(typeof child!=='string'&&typeof child!=='number')return [child];
  return Array.from(String(child)).map((character)=>{
   const index=characterIndex++;const stagger=motion==='spring'?.065:motion==='split'?.035:.028;
   const local=f-(startDelay+index*stagger)*fps;
   const pop=spring({frame:local,fps,config:{damping:9,stiffness:190,mass:.7}});
   const highlight=highlights.find(word=>index>=word.start&&index<word.end);
   // Repeating staggered hops follow the 144 BPM score. Larger text takes
   // bigger jumps; small copy keeps longer rests between its two small hops.
   const age=local/fps;const period=big?60/144*2:1.5;
   const phase=((age-.8)%period+period)%period/period;
   const gate=interpolate(local,[.7*fps,1*fps],[0,1],ease);
   const main=phase<.55?Math.sin(phase/.55*Math.PI):0;
   const echo=phase>.68&&phase<.88?.28*Math.sin((phase-.68)/.2*Math.PI):0;
   const hop=(main+echo)*gate;
   const squash=(phase>.55&&phase<.67?Math.sin((phase-.55)/.12*Math.PI):0)*gate;
   const height=fontSize>=120?28:big?18:fontSize>=48?10:5;
   const sway=Math.sin(phase*Math.PI*2+index*.65)*(big?3:1.2)*gate;
   const horizontal=motion==='split'?(1-pop)*(index%2===0?-24:24):0;
   const letterColor=candy?candyColors[(index+(highlight?2:0))%candyColors.length]:highlight?highlight.color:color;
   const shadow=candy?'-2px 0 #fff8e6,2px 0 #fff8e6,0 -2px #fff8e6,0 2px #fff8e6,5px 5px 0 #583764,7px 7px 0 #583764':color===C.ink?undefined:'3px 3px 0 #332442';
   return <span key={index} data-kinetic-letter style={{display:'inline-block',whiteSpace:'pre',position:'relative',transformOrigin:'50% 85%',color:letterColor,textShadow:shadow,opacity:interpolate(local,[0,.12*fps],[0,1],ease)*(1-exit),translate:`${horizontal}px ${(1-pop)*Math.min(54,fontSize*.6)-hop*height+squash*2-exit*fontSize*.3}px`,scale:`${(.68+.32*pop)*(1+.10*squash-.045*hop)} ${(.68+.32*pop)*(1-.14*squash+.075*hop)}`,rotate:`${(1-pop)*(index%2===0?-8:8)+sway}deg`}}>{character===' '?'\u00a0':character}</span>;
  });
 });
 return <div data-pixel-text style={{position:'absolute',left:x,top:y,width:w,fontFamily:sans,fontSize,fontWeight:400,fontSynthesis:'none',lineHeight:1.35,letterSpacing:big?4:2,color,textAlign:center?'center':'left'}}>{letters}</div>;
};
export const Panel=({x,y,w,h,children,accent=C.mint}:{x:number;y:number;w:number;h:number;children:React.ReactNode;accent?:string})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,background:C.cream,color:C.ink,boxShadow:`8px 8px 0 ${accent},16px 16px 0 #05091dcc`,clipPath:'polygon(0 12px,12px 12px,12px 0,calc(100% - 12px) 0,calc(100% - 12px) 12px,100% 12px,100% calc(100% - 12px),calc(100% - 12px) calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,12px calc(100% - 12px),0 calc(100% - 12px))'}}>{children}</div>;
export const Photo=({file,x,y,w,h,position='center',delay=.16,direction=1}:{file:string;x:number;y:number;w:number;h:number;position?:string;delay?:number;direction?:number})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const scene=useContext(SceneMotionContext);const local=f-(delay+scene.lead)*fps;
 const pop=spring({frame:local,fps,config:{damping:17,stiffness:155,mass:.85}});
 const settled=interpolate(local,[.65*fps,1.2*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const t=Math.max(0,local)/fps;
 return <div data-lively-photo style={{position:'absolute',left:x,top:y,width:w,height:h,opacity:interpolate(local,[0,.16*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:`${(1-pop)*direction*55+settled*Math.sin(t*1.6)*3}px ${(1-pop)*70+settled*Math.sin(t*2+direction)*5}px`,scale:.8+.2*pop,rotate:`${(1-pop)*direction*7+settled*Math.sin(t*1.7+direction)*.8}deg`,transformOrigin:'50% 65%',border:'8px solid #f5efdf',boxSizing:'border-box',boxShadow:'12px 12px 0 #7462a3',overflow:'hidden'}}><CanvasImage src={staticFile('photos/'+file)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:position,scale:interpolate(f,[0,5*fps],[1,1.04],ease)}}/></div>;
};
export const PixelHeart=({x,y,size=80}:{x:number;y:number;size?:number})=><svg viewBox="0 0 12 11" width={size} height={size} shapeRendering="crispEdges" style={{position:'absolute',left:x,top:y}}><path d="M1 1H5V3H7V1H11V2H12V6H10V8H8V10H7V11H5V10H4V8H2V6H0V2H1Z" fill="#ed92b7"/><path d="M2 2H4V3H2Z" fill="#ffe4ec"/></svg>;
