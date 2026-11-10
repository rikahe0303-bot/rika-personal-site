import {C,Panel,PixelHeart,Stage,Text} from './Kit';
export const PixelSkills=()=> <Stage>
 <Text y={145} size={82} motion="split" accentWords={['表达','陪伴']}>表达与陪伴，都是我的一面。</Text>
 <Panel x={240} y={325} w={680} h={370}><Text x={48} y={44} w={590} size={68} color={C.ink}>IP 操盘手</Text><Text x={48} y={162} w={590} size={38} color={C.ink} delay={.3}>记录想法，分享日常。<br/>让表达，自然发生。</Text><svg width="90" height="90" viewBox="0 0 18 18" shapeRendering="crispEdges" style={{position:'absolute',right:42,top:44}}><path d="M2 2H16V13H8L4 17V13H2Z" fill="#6ba49f"/><path d="M5 6H13M5 9H10" stroke="#fff2d7" strokeWidth="2"/></svg></Panel>
 <Panel x={1000} y={325} w={680} h={370} accent={C.peach}><Text x={48} y={44} w={590} size={68} color={C.ink}>情感陪伴师</Text><Text x={48} y={162} w={590} size={38} color={C.ink} delay={.55}>认真倾听，尊重边界。<br/>让交流，舒服一点。</Text><PixelHeart x={540} y={46} size={80}/></Panel>
 </Stage>;
