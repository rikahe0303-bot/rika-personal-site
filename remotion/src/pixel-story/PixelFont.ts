import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

export const pixelFont='FusionPixel';
// loadFont holds rendering until the local CJK pixel face is ready.
void loadFont({family:pixelFont,url:staticFile('fonts/fusion-pixel-12px-zh-hans.woff2'),weight:'400'});
