import {C,Photo,Stage,Text} from './Kit';
export const PixelHome=()=> <Stage>
 <Text y={165} w={900} size={39} color={C.mint}>欢迎进入我的个人世界</Text>
 <Text y={278} w={950} size={156} motion="spring">何丽江</Text>
 <Text y={512} w={900} size={55} color={C.peach} delay={.3} accentWords={['水水']}>也可以叫我，水水。</Text>
 <Text y={645} w={900} size={38} delay={.6}>认真表达，也认真倾听。</Text>
 <Photo file="image2.jpeg" x={1190} y={184} w={450} h={532} position="50% 48%"/>
 </Stage>;
