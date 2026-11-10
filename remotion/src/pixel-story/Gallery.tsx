import {C,Photo,Stage,Text} from './Kit';
export const PixelGallery=()=> <Stage>
 <Text y={143} size={82} motion="split" accentWords={['喜欢']}>生活相册：收藏小小的喜欢。</Text>
 <Photo file="image6.jpeg" x={240} y={302} w={432} h={330} position="60% 50%" delay={.12} direction={-1}/>
 <Photo file="image10.jpeg" x={744} y={302} w={432} h={330} delay={.3} direction={1}/>
 <Photo file="image11.jpeg" x={1248} y={302} w={432} h={330} position="50% 65%" delay={.48} direction={-1}/>
 <Text x={240} y={665} w={432} size={35} color={C.mint} center>看展，保持好奇</Text>
 <Text x={744} y={665} w={432} size={35} color={C.peach} center>拼豆，拼起快乐</Text>
 <Text x={1248} y={665} w={432} size={35} color={C.lavender} center>和胖虎，一起慢慢走</Text>
 </Stage>;
