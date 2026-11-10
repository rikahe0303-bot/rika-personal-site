import {C,Photo,Stage,Text} from './Kit';
export const PixelTravel=()=> <Stage>
 <svg viewBox="0 0 480 270" shapeRendering="crispEdges" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.45}}><path d="M0 213V200H20V185H40V165H60V151H85V173H110V193H145V180H166V163H188V138H209V167H235V186H265V201H300V223Z" fill="#304b69"/><path d="M0 218V210H35V199H60V188H85V199H110V214H155V198H185V188H215V208H250V220H280V225H0Z" fill="#518080"/><path d="M174 158H188V138H201V155H208V167H194V158Z" fill="#9bc2c1"/></svg>
 <Text y={174} w={900} size={105} accentWords={['山野']}>把自己，<br/>还给山野。</Text>
 <Text y={518} w={860} size={42} color={C.mint} delay={.4}>旅行 · 户外 · 自然</Text>
 <Text y={619} w={870} size={37} delay={.6}>吹吹风，走走路。找回自己的节奏。</Text>
 <Photo file="image3.jpeg" x={1160} y={164} w={490} h={550} position="50% 48%"/>
 </Stage>;
