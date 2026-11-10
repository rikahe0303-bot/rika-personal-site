import {Composition} from 'remotion';
import {PixelStory} from './pixel-story/Film';

export const RemotionRoot=()=> <Composition id="RikaPixelStory" component={PixelStory} durationInFrames={900} fps={30} width={1920} height={1080}/>;
