import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {C,Panel,Photo,Stage,Text} from './Kit';
export const PixelAbout=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();return <Stage>
 <Text y={149} size={81} accentWords={['慢热','浪漫']}>关于我：慢热，也浪漫。</Text>
 <Panel x={240} y={310} w={900} h={390}>
 <Text x={48} y={38} w={800} size={49} color={C.ink}>云南出发，在西安生活。</Text>
 <svg width="810" height="170" viewBox="0 0 810 170" shapeRendering="crispEdges" style={{position:'absolute',left:45,top:130}}><path d="M70 120H190V90H300V115H410V70H550V40H710" fill="none" stroke="#9475bf" strokeWidth="8" pathLength={1} strokeDasharray="1" strokeDashoffset={interpolate(f,[10,2*fps],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/><rect x="60" y="110" width="20" height="20" fill="#558b91"/><rect x="700" y="30" width="20" height="20" fill="#e49773"/></svg>
 <Text x={50} y={302} w={800} size={33} color={C.ink} delay={.5}>INFJ · 双鱼座 · 温和而有边界</Text>
 </Panel>
 <Photo file="image6.jpeg" x={1260} y={310} w={400} h={390} position="65% 50%" delay={.2} direction={-1}/>
 </Stage>};
