import {AbsoluteFill,Easing,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import type {TransitionPresentation,TransitionPresentationComponentProps} from '@remotion/transitions';

// The scene changes only while the illustrated transition covers the content.
// The foreground, background and audio remain continuous around that point.
const CoveredCut=({children,presentationProgress,presentationDirection}:TransitionPresentationComponentProps<Record<string,never>>)=><AbsoluteFill style={{opacity:presentationDirection==='entering'?(presentationProgress>=.5?1:0):(presentationProgress<.5?1:0)}}>{children}</AbsoluteFill>;
export const gameCut=():TransitionPresentation<Record<string,never>>=>({component:CoveredCut,props:{}});
type Kind='blocks'|'coin'|'stairs'|'pipe'|'star';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const soft=(n:number)=>{const x=clamp(n);return x*x*(3-2*x);};
// Hold the small, recognizable game item before it expands to hide the cut.
const burstSize=(p:number,maximum:number)=>{
 if(p<.2)return 240*soft(p/.2);
 if(p<.48)return 240+(maximum-240)*Math.pow((p-.2)/.28,3);
 if(p<.52)return maximum;
 if(p<.8)return 240+(maximum-240)*Math.pow(1-(p-.52)/.28,3);
 return 240*(1-soft((p-.8)/.2));
};
const palette=['#f6c879','#b6e6c5','#c4b2f1','#f3b7d3','#91dce7'];

const Star=({x,y,size,face=false}:{x:number;y:number;size:number;face?:boolean})=><svg x={x-size/2} y={y-size/2} width={size} height={size} viewBox="0 0 24 24" shapeRendering="crispEdges"><path d="M10 0H14V4H16V7H24V11H21V14H18V18H20V24H16V22H12V20H8V22H4V24H4V18H6V14H3V11H0V7H8V4H10Z" fill="#ffe49a"/><path d="M10 2H12V5H10V8H4V10H2V8H9V5H10Z" fill="#fff8d9"/>{face&&<><rect x="9" y="10" width="2" height="4" fill="#78558f"/><rect x="14" y="10" width="2" height="4" fill="#78558f"/><rect x="11" y="16" width="3" height="1" fill="#e595a0"/></>}</svg>;

export const GameCover=({kind}:{kind:Kind})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const p=clamp(f/(fps-1));
 return <AbsoluteFill style={{pointerEvents:'none',overflow:'hidden'}}>
 <svg viewBox="0 0 1920 1080" shapeRendering="crispEdges" width="100%" height="100%">
 {kind==='blocks'&&Array.from({length:144},(_,i)=>{
  const col=i%16,row=Math.floor(i/16),delay=((col+row)%8)*.018;
  const s=p<.5?soft((p-delay)/(.43-delay)):1-soft((p-.54-delay)/(.46-delay));
  const side=122*s;const x=col*120+(120-side)/2,y=row*120+(120-side)/2;
  return <g key={i}><rect x={x} y={y} width={side} height={side} fill={palette[(col+row*2)%5]}/>{s>.35&&<><rect x={x+8*s} y={y+8*s} width={side-16*s} height={7*s} fill="#fff7df" opacity=".7"/><rect x={x+8*s} y={y+side-15*s} width={side-16*s} height={7*s} fill="#7158a9" opacity=".2"/>{i%19===0&&<path d={`M${x+40*s} ${y+48*s}h${8*s}v${10*s}h${-8*s}z M${x+72*s} ${y+48*s}h${8*s}v${10*s}h${-8*s}z M${x+49*s} ${y+77*s}h${24*s}v${6*s}h${-24*s}z`} fill="#71588a"/>}</>}</g>;
 })}
 {kind==='coin'&&(()=>{
  const size=burstSize(p,3400);const spin=Math.max(.22,Math.abs(Math.cos(p*Math.PI*2)));
  return <g transform={`translate(960 540) scale(${spin} 1)`}><svg x={-size/2} y={-size/2} width={size} height={size} viewBox="0 0 24 24"><path d="M7 0H17V2H21V6H24V18H21V22H17V24H7V22H3V18H0V6H3V2H7Z" fill="#e8a34c"/><path d="M8 2H16V4H20V7H22V17H20V20H16V22H8V20H4V17H2V7H4V4H8Z" fill="#ffe69a"/><path d="M9 5H13V7H11V17H15V19H9Z" fill="#fff8dc"/><path d="M14 6H17V18H14Z" fill="#e7b367"/></svg></g>;
 })()}
 {kind==='stairs'&&Array.from({length:12},(_,col)=>{
  const delay=col*.012;
  const amount=p<.5?soft((p-delay)/.29):1-soft((p-.54-(11-col)*.012)/.32);
  const height=Math.ceil(amount*1120/12)*12;
  return <g key={col}><rect x={col*160} y={1080-height} width="161" height={height} fill={palette[(col+2)%5]}/><rect x={col*160} y={1080-height} width="161" height="16" fill="#fff1cb"/><rect x={col*160+12} y={1100-height} width="12" height={Math.max(0,height-20)} fill="#fff8e5" opacity=".32"/></g>;
 })}
 {kind==='pipe'&&(()=>{
  const y=interpolate(p,[0,.44,.56,1],[1100,-90,-90,-1320],{easing:Easing.bezier(.45,0,.3,1)});
  return <g transform={`translate(0 ${Math.round(y/4)*4})`}><rect x="0" y="0" width="1920" height="1240" fill="#69c49c"/><rect x="96" y="0" width="240" height="1240" fill="#a8ecc2"/><rect x="1620" y="0" width="200" height="1240" fill="#459a84"/><rect x="0" y="0" width="1920" height="140" fill="#3d8c80"/><rect x="0" y="16" width="1920" height="100" fill="#94e2b0"/><rect x="40" y="24" width="1780" height="20" fill="#d3f4c6"/><rect x="0" y="1210" width="1920" height="30" fill="#3d8c80"/></g>;
 })()}
 {kind==='star'&&<><Star x={960} y={540} size={burstSize(p,9500)} face={burstSize(p,9500)<500}/>{p>.53&&Array.from({length:18},(_,i)=>{const t=(p-.53)/.47;const a=i*Math.PI*2/18;return <g key={i} opacity={Math.sin(t*Math.PI)}><Star x={960+Math.cos(a)*t*1150} y={540+Math.sin(a)*t*740} size={36+12*(i%3)}/></g>;})}</>}
 </svg>
 </AbsoluteFill>;
};
