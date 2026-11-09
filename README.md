# Rika 个人网站 · 生活杂志

柠檬黄与珊瑚红配色、杂志大字号和错落照片排版的独立个人网站。使用 Next.js、React、TypeScript 和 Tailwind CSS，静态部署于 GitHub Pages。

- 网站：https://rikahe0303-bot.github.io/rika-personal-site/
- 源码：https://github.com/rikahe0303-bot/rika-personal-site

## 本地开发

需要 Node.js 22.13 或更新版本。

```sh
npm ci
npm run dev
```

打开终端显示的本地地址。网站不需要登录、数据库或任何密钥。

## 构建与部署

```sh
npm run build:pages
```

生成 `out/` 静态网站。构建脚本自动适配 GitHub 项目路径，包含所有照片、样式、字体图标和交互代码；根域名仓库 `用户名.github.io` 使用空前缀。

推送 `main` 后，`.github/workflows/pages.yml` 会自动安装依赖、构建和部署。仓库 Settings → Pages 的 Source 应为 **GitHub Actions**。

普通静态服务器部署可运行 `npm run build`，生成无项目路径前缀的 `out/`。

## 源码结构

- `app/page.tsx`：个人介绍、相册分类与弹窗、相处指南、联系信息。
- `app/globals.css`：页面样式与手机适配。
- `app/layout.tsx`：网页标题、简介与图标。
- `public/photos/`：网站使用的六张照片。
- `public/favicon.svg`：网站图标。
- `scripts/build-pages.mjs`：GitHub Pages 静态构建。
- `.github/workflows/pages.yml`：自动发布流程。

电话：19526880781。网站不收集访客数据，不嵌套其他网站，不依赖 Sites 或 ChatGPT 登录。未使用的托管模板和服务器代码已移除。
