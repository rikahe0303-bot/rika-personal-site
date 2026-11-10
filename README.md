# 何丽江 · 慢慢生活，保持好奇

何丽江的独立个人网站。参考 Calmco 示例图的全屏照片、大幅姓名、深棕与奶油色、细线条和留白，用原创页面代码呈现技能首页与独立的个人生活页。

- 技能首页：https://rikahe0303-bot.github.io/rika-personal-site/
- 关于我：https://rikahe0303-bot.github.io/rika-personal-site/about/
- 像素短片：https://rikahe0303-bot.github.io/rika-personal-site/video/
- 源码：https://github.com/rikahe0303-bot/rika-personal-site
- 视觉参考：https://www.framer.com/marketplace/templates/calmco/
- 个人说明书：https://my.feishu.cn/wiki/PwFMwXy47i7csPkxGR7cD1k86Pf

使用 Next.js、React、TypeScript 和 Tailwind CSS，静态部署到 GitHub Pages。页面独立运行，使用何丽江提供的九张生活照片，不嵌套 Framer 或其他网页，也不依赖模板的付费源码。

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

- `app/page.tsx`：技能首页入口与页面元数据。
- `app/about/page.tsx`：个人生活页入口与页面元数据。
- `app/components/personal-site.tsx`：两页共用导航、页面内容、相册和电话交互。
- `app/globals.css`：响应式布局、配色、字体和减少动态效果设置。
- `app/layout.tsx`：网页标题、简介和图标。
- `public/photos/`：九张本地生活照片。
- `public/favicon.svg`：站点图标。
- `scripts/build-pages.mjs`：GitHub Pages 构建脚本。
- `.github/workflows/pages.yml`：自动发布流程。
- `public/video/`：最新像素跳跳字版的在线播放页面、H.264 / H.265 成片与字幕。
- `remotion/`：可独立安装和编辑的视频源码、照片、中文像素字体、口播和配乐生成器。

## 页面与交互

- 首页首屏突出 IP 操盘手与情感陪伴师，正文展示两项技能及联系入口。
- 关于我页单独展示性格、兴趣、九张照片与相处指南；支持直接打开与刷新。
- 两页通过导航互相访问，静态链接包含 GitHub Pages 仓库前缀。

- 手机导航可展开与收起，Escape 关闭。
- 四组兴趣切换文字与照片。
- 生活相册支持分类筛选、展开全部、放大查看、键盘左右切换和 Escape 关闭；关闭后焦点回到原照片。
- 相处指南可折叠。
- 抖音和小红书入口在新窗口打开用户提供的分享链接。
- 电话 19526880781 支持点击拨号和复制；复制失败提供手动复制提示。
- 动画尊重系统的减少动态效果设置。

网站不收集访客数据。2026 年 11 月 10 日依据用户提供的《何丽江个人说明.pptx》（9 页）补充昵称“水水”、个人身份、相处方式、经历、社交分享链接与三张生活照片。年龄 26 岁为该资料中的自述，未推算出生日期。IP 操盘手、情感陪伴师为用户自我介绍，不另行添加资质、服务承诺或客户评价。原始 PPT 不随源码发布；新增照片从 PPT 提取并压缩为网页图片。飞书链接保留为外部参考入口，本次内容更新依据本地 PPT，而非在线飞书同步。
