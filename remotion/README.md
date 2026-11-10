# 水水的像素小宇宙

最新版 30 秒横屏 Remotion 视频源码。包含中文像素跳跳字、五种闯关转场、原创童趣配乐、游戏音效及中文口播。

- 在线播放：https://rikahe0303-bot.github.io/rika-personal-site/video/
- 画布：1920×1080，30 fps，900 帧。
- Composition：`RikaPixelStory`。
- `public/` 已包含本片需要的照片、字体和音频，可以离线渲染素材。

## 编辑和导出

需要 Node.js 22.13 或更新的受支持版本。在本目录运行：

```sh
npm ci
npm run dev
```

Studio 中选择 `RikaPixelStory` 即可预览。正式导出：

```sh
npm run lint
npm run render:hevc
npm run render:mp4
```

文件生成在 `out/`，分别为 H.265 主文件和 H.264 兼容版，均包含 AAC 音频。

## 修改入口

- `src/pixel-story/Film.tsx`：30 秒时间轴、口播与配乐。
- `src/pixel-story/Kit.tsx`：字体、逐字跳跃、照片入场。
- `src/pixel-story/GameTransitions.tsx`：方块、金币、阶梯、水管和星星转场。
- `src/pixel-story/World.tsx`：星空、彩虹路与像素角色。
- `src/pixel-story/Home.tsx` 至 `Ending.tsx`：六个分镜的文字和照片。
- `scripts/playful-score.py`：原创 144 BPM 配乐及音效生成器，只使用 Python 标准库。
- `public/voiceover/script.json`：口播文案；对应 WAV 已准备好。

视频中的照片与人物内容属于 Rika 的个人素材。Fusion Pixel 字体采用 SIL OFL 1.1，完整许可保存在 `public/fonts/FusionPixel-LICENSE-OFL.txt`。配乐与音效为本项目自行合成，未复用参考游戏的音轨。

网页播放器与已导出成片位于仓库根目录的 `public/video/`。修改视频后需要重新渲染，再替换该目录内的 MP4；仅推送 TSX 不会自动重新渲染视频。根目录 GitHub Actions 会发布已准备好的网页与成片。
