import {AbsoluteFill,CanvasImage,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
const colors=['#ed707b','#f4ab68','#f5d977','#8bcf9a','#6db8d2','#8c91df','#a77dd1'];
const hash=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
export const PixelWorld=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <AbsoluteFill style={{background:'#090e27',overflow:'hidden'}}>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(#171b43,#342454 70%,#634172)'}}/>
 <CanvasImage src={staticFile('pixel-story/nebula.png')} style={{position:'absolute',width:3840,height:1080,top:-90,left:-Math.floor(f*.35)*4,imageRendering:'pixelated',opacity:.55}}/>
 <CanvasImage src={staticFile('pixel-story/planet.png')} style={{position:'absolute',width:384,height:320,top:80,left:1480-Math.floor(f*.05)*4,imageRendering:'pixelated',opacity:.75}}/>
 <svg viewBox="0 0 480 270" shapeRendering="crispEdges" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
 {Array.from({length:95},(_,i)=>{const x=(hash(i)*520-t*(i%3+1)*1.8+520)%520-20;const y=hash(i+300)*255;const s=i%9===0?2:1;return <rect key={i} x={Math.round(x)} y={Math.round(y)} width={s} height={s} fill={i%4===0?'#9bbfd8':'#e8dcff'} opacity={.25+.5*(.5+.5*Math.sin(t*1.5+i))}/>;})}
 {Array.from({length:4},(_,i)=>{const x=480-((t*75+i*141)%650);const y=22+i*35;return <g key={i} opacity={.6}><rect x={Math.round(x)} y={y} width="13" height="1" fill="#aaa4dc"/><rect x={Math.round(x+10)} y={y} width="4" height="1" fill="#fff5df"/></g>;})}
 {Array.from({length:68},(_,i)=>{const x=i*8-(Math.floor(f*.65)%8)-16;const y=219+Math.round(3*Math.sin((x+f*.65)/55));return <g key={i}>{colors.map((c,j)=><rect key={c} x={x} y={y+j*3} width="8" height="3" fill={c}/>)}<rect x={x} y={y+21} width="8" height="4" fill="#423564"/></g>;})}
 {Array.from({length:25},(_,i)=><rect key={i} x={(i*23-Math.floor(f*1.2)%23)} y={250+Math.round(hash(i)*17)} width="1" height="1" fill={colors[i%7]} opacity=".7"/>)}
 </svg>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 45% 40%,transparent 45%,#05081945 100%)'}}/>
 </AbsoluteFill>;
};
export const Runner=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const beat=Math.floor(f/5)%4;const finish=interpolate(f,[25*fps,28.5*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const jump=[5,10,15,20,25].reduce((height,second)=>{const phase=(f/fps-second+.65)/.55;return height+(phase>0&&phase<1?Math.sin(phase*Math.PI)*64:0);},0);
 const x=320+finish*650;const y=724+Math.round(Math.sin(f*.32)*3)*(1-finish)-jump;
 return <>
 <svg viewBox="0 0 32 40" width={128} height={160} shapeRendering="crispEdges" style={{position:'absolute',left:x,top:y}}>
 <rect x="9" y="2" width="14" height="5" fill="#332641"/><rect x="6" y="7" width="20" height="14" fill="#332641"/><rect x="12" y="8" width="11" height="12" fill="#f6c4a1"/><rect x="7" y="6" width="18" height="4" fill="#d8b58c"/><rect x="5" y="10" width="22" height="2" fill="#f2d49d"/><rect x="21" y="12" width="2" height="2" fill="#242039"/>
 <rect x="10" y="21" width="14" height="11" fill="#3c8d95"/><rect x="12" y="21" width="4" height="11" fill="#66bdba"/><rect x="6" y="22" width="4" height="9" fill="#b08c61"/><rect x="23" y={beat%2===0?23:25} width="5" height="4" fill="#f6c4a1"/>
 <rect x={beat%2===0?10:13} y="32" width="5" height={beat%2===0?7:5} fill="#d2b6a0"/><rect x={beat%2===0?20:17} y="32" width="5" height={beat%2===0?5:7} fill="#d2b6a0"/><rect x={beat%2===0?8:12} y={beat%2===0?38:36} width="7" height="2" fill="#453249"/><rect x={beat%2===0?20:17} y={beat%2===0?36:38} width="7" height="2" fill="#453249"/>
 </svg>
 <svg viewBox="0 0 32 25" width={128} height={100} shapeRendering="crispEdges" style={{position:'absolute',left:x-145,top:780+Math.round(Math.sin(f*.4)*3),opacity:interpolate(f,[19.8*fps,20.6*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
 <path d="M4 8H24V20H4Z M19 2H29V14H19Z M1 5H6V12H1Z" fill="#dcab76"/><path d="M19 2H24V8H19Z M28 8H32V13H28Z M5 9H19V14H5Z" fill="#fff0d6"/><rect x="25" y="5" width="2" height="2" fill="#30253e"/><rect x="30" y="10" width="2" height="2" fill="#30253e"/><rect x={beat%2===0?5:8} y="19" width="4" height="6" fill="#dcab76"/><rect x={beat%2===0?20:17} y="19" width="4" height="6" fill="#dcab76"/>
 </svg>
 </>;
};
