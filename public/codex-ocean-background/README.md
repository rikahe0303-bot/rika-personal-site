# Codex 写实浅海动态背景

真实浅海影像、WebGL 折射波纹和 macOS 透明窗口伴随应用。当前目录同时用于 GitHub Pages 在线预览和保留可构建源码。

## 在线预览

部署后访问：`https://rikahe0303-bot.github.io/rika-personal-site/codex-ocean-background/`

网页演示支持浅海镜头轮播、鱼群视频层、鼠标水波、四项参数调节和随机鱼群奇遇。按 `H` 可收起/展开参数面板。

## macOS 伴随应用

此工具通过透明、鼠标穿透的本机窗口覆盖 Codex 窗口，不修改 Codex 应用本体。要在 Mac 上构建：

```bash
cd public/codex-ocean-background
chmod +x native/build.sh
native/build.sh
open "$HOME/Applications/Codex Ocean Overlay.app"
```

菜单栏 `≋` 可暂停背景、召唤鱼群、修改参数或退出应用。需要 macOS 和 Xcode Command Line Tools（提供 Swift 编译器）。

## 视频与授权记录

在线版本使用 720p H.264 视频以适应网页加载；来源页面、创作者和许可链接见 `assets/manifest.json` 与 `assets/授权与来源清单.csv`。视频只作为动态海洋场景的一部分呈现，未提供独立素材下载入口。素材遵循 [Pexels License](https://www.pexels.com/license/)。

## 本地网页预览

在本目录运行静态服务：

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173/`。
