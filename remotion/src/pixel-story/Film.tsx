import {AbsoluteFill,Sequence,staticFile,useVideoConfig} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {MotionScene} from './Transitions';
import {GameCover,gameCut} from './GameTransitions';
import {Audio} from '@remotion/media';
import {PixelWorld,Runner} from './World';
import {PixelHome} from './Home';
import {PixelAbout} from './About';
import {PixelSkills} from './Skills';
import {PixelTravel} from './Travel';
import {PixelGallery} from './Gallery';
import {PixelEnding} from './Ending';
export const PixelStory=()=>{const {fps}=useVideoConfig();const overlap=fps;const edge=Math.round(5.5*fps);const middle=6*fps;const timing=linearTiming({durationInFrames:overlap});return <AbsoluteFill>
 <PixelWorld/>
 <Audio name="原创童趣掌机配乐" src={staticFile('pixel-story/playful-music.wav')} volume={1} premountFor={fps}/>
 <Audio name="跳跃 / 金币 / 水管 / 星星音效" src={staticFile('pixel-story/playful-sfx.wav')} volume={.7} premountFor={fps}/>
 <Audio name="口播 / 首页" src={staticFile('voiceover/01.wav')} from={Math.round(.65*fps)} premountFor={fps}/>
 <Audio name="口播 / 关于我" src={staticFile('voiceover/02.wav')} from={Math.round(5.65*fps)} premountFor={fps}/>
 <Audio name="口播 / 技能" src={staticFile('voiceover/03.wav')} from={Math.round(10.65*fps)} premountFor={fps}/>
 <Audio name="口播 / 旅行" src={staticFile('voiceover/04.wav')} from={Math.round(15.65*fps)} premountFor={fps}/>
 <Audio name="口播 / 相册" src={staticFile('voiceover/05.wav')} from={Math.round(20.65*fps)} premountFor={fps}/>
 <Audio name="口播 / 你好" src={staticFile('voiceover/06.wav')} from={Math.round(25.65*fps)} premountFor={fps}/>
 <TransitionSeries>
 <TransitionSeries.Sequence name="进入个人世界" durationInFrames={edge} premountFor={fps}><MotionScene duration={edge}><PixelHome/></MotionScene></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={gameCut()} timing={timing}/>
 <TransitionSeries.Sequence name="关于我 / 云南到西安" durationInFrames={middle} premountFor={fps}><MotionScene duration={middle} lead={.5}><PixelAbout/></MotionScene></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={gameCut()} timing={timing}/>
 <TransitionSeries.Sequence name="技能 / 表达与陪伴" durationInFrames={middle} premountFor={fps}><MotionScene duration={middle} lead={.5}><PixelSkills/></MotionScene></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={gameCut()} timing={timing}/>
 <TransitionSeries.Sequence name="旅行 / 走进山野" durationInFrames={middle} premountFor={fps}><MotionScene duration={middle} lead={.5}><PixelTravel/></MotionScene></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={gameCut()} timing={timing}/>
 <TransitionSeries.Sequence name="生活相册 / 胖虎作伴" durationInFrames={middle} premountFor={fps}><MotionScene duration={middle} lead={.5}><PixelGallery/></MotionScene></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={gameCut()} timing={timing}/>
 <TransitionSeries.Sequence name="你好 / 慢慢认识" durationInFrames={edge} premountFor={fps}><MotionScene duration={edge} last lead={.5}><PixelEnding/></MotionScene></TransitionSeries.Sequence>
 </TransitionSeries>
 <Runner/>
 <Sequence name="糖果方块拼接" from={4.5*fps} durationInFrames={fps} premountFor={fps}><GameCover kind="blocks"/></Sequence>
 <Sequence name="金币翻转开门" from={9.5*fps} durationInFrames={fps} premountFor={fps}><GameCover kind="coin"/></Sequence>
 <Sequence name="彩色阶梯闯关" from={14.5*fps} durationInFrames={fps} premountFor={fps}><GameCover kind="stairs"/></Sequence>
 <Sequence name="绿色水管穿越" from={19.5*fps} durationInFrames={fps} premountFor={fps}><GameCover kind="pipe"/></Sequence>
 <Sequence name="幸运星星绽开" from={24.5*fps} durationInFrames={fps} premountFor={fps}><GameCover kind="star"/></Sequence>
 </AbsoluteFill>};
