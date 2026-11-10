# 何丽江 · 慢慢生活，保持好奇

何丽江的独立个人网站。参考 Calmco 示例图的全屏照片、大幅姓名、深棕与奶油色、细线条和留白，用原创页面代码呈现个人介绍、兴趣、生活相册、相处指南和联系方式。

- 网站：https://rikahe0303-bot.github.io/rika-personal-site/
- 源码：https://github.com/rikahe0303-bot/rika-personal-site
- 视觉参考：https://www.framer.com/marketplace/templates/calmco/
- 个人说明书：https://my.feishu.cn/wiki/PwFMwXy47i7csPkxGR7cD1k86Pf

使用 Next.js、React、TypeScript 和 Tailwind CSS，静态部署到 GitHub Pages。页面独立运行，使用何丽江已提供的六张生活照片，不嵌套 Framer 或其他网页，也不依赖模板的付费源码。

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

静态产物位于 `out/`。构建脚本根据 GitHub 仓库名称添加项目路径前缀；推送 `main` 后 GitHub Actions 自动构建和发布。仓库 Settings → Pages 的 Source 为 **GitHub Actions**。

普通静态服务器可执行 `npm run build`，生成无项目路径前缀的 `out/`。

## 主要文件

- `app/page.tsx`：页面内容、导航、兴趣切换、相册和电话交互。
- `app/globals.css`：响应式布局、配色、字体和减少动态效果设置。
- `app/layout.tsx`：网页标题、简介和图标。
- `public/photos/`：六张本地生活照片。
- `public/favicon.svg`：站点图标。
- `scripts/build-pages.mjs`：GitHub Pages 构建脚本。
- `.github/workflows/pages.yml`：自动发布流程。

## 交互

- 手机导航可展开与收起，Escape 关闭。
- 四组兴趣切换文字与照片。
- 生活相册支持分类筛选、展开全部、放大查看、键盘左右切换和 Escape 关闭；关闭后焦点回到原照片。
- 相处指南可折叠。
- 电话 19526880781 支持点击拨号和复制；复制失败提供手动复制提示。
- 动画尊重系统的减少动态效果设置。

网站不收集访客数据。个人资料和照片沿用用户此前提供的素材；本次飞书读取需要重新授权，因此未声称已同步文档的最新修改。人物经历、学校、城市和兴趣均沿用已有资料，不添加职业资历、商业服务或客户评价。
