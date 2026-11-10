# Rika · 好奇心收藏家

Rika 的独立个人网站。参考 Flamingo 示例图的桃橙色、珊瑚粉、黑色描边与硬阴影，用原创页面代码呈现个人介绍、生活相册、兴趣、相处指南和联系方式。

- 网站：https://rikahe0303-bot.github.io/rika-personal-site/
- 源码：https://github.com/rikahe0303-bot/rika-personal-site
- 视觉参考：https://www.framer.com/marketplace/templates/flamingo/

使用 Next.js、React、TypeScript 和 Tailwind CSS，静态部署到 GitHub Pages。页面使用 Rika 自己的生活照片，没有嵌套 Framer 或其他网页，不需要登录或后端服务。

## 本地开发

需要 Node.js 22.13 或更新版本。

```sh
npm ci
npm run dev
```

## 构建与发布

```sh
npm run typecheck
npm run build:pages
```

静态产物位于 `out/`。构建脚本自动根据 GitHub 仓库名称添加项目路径前缀；推送 `main` 后 GitHub Actions 自动构建和发布。仓库 Settings → Pages 的 Source 为 **GitHub Actions**。

普通静态服务器可执行 `npm run build`，生成无项目路径前缀的 `out/`。

## 主要文件

- `app/page.tsx`：完整页面与交互逻辑。
- `app/globals.css`：视觉样式、手机布局、减少动态效果设置。
- `app/layout.tsx`：网页标题、简介与图标。
- `public/photos/`：六张生活照片。
- `public/favicon.svg`：站点图标。
- `scripts/build-pages.mjs`：GitHub Pages 构建脚本。
- `.github/workflows/pages.yml`：自动发布流程。

## 交互

相册支持主题筛选、更多照片、放大查看、键盘左右切换和 Escape 关闭；关闭后焦点回到原照片。手机菜单支持展开与收起，相处指南可折叠。电话 19526880781 支持点击拨号与复制，复制失败时提供手动复制提示。

网站不收集访客数据。个人资料沿用已有个人说明书内容，照片沿用 Rika 已提供的素材。参考模板的插画、人物肖像及付费源码不包含在此项目内。
