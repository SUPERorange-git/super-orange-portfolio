# 超级橘橘 · 网站总站

GitHub Pages 根目录为网站总入口，`/shoot/` 为拍摄作品，`/portfolio/` 为 CHEN ZHIJIANG 个人作品集，`/campus-bid/` 为校竞标界面图册。各子站独立构建，保留原始内容。线上地址以 GitHub Pages 的仓库地址为前缀。

## 总站构建

运行 `pnpm install`、`pnpm --dir chen-zhijiang-portfolio install`，然后 `pnpm build:sites`。完整部署输出在 `dist/`，使用 `pnpm preview` 预览总站。GitHub Actions 会在推送 main 后构建并发布全部网站。

## 添加子网站

将新的 Vite 工程放到独立目录，在 `sites.json` 中添加 slug、name、subtitle、description、directory 和 image；在 Pages workflow 中加入该目录的依赖安装步骤，在 build:sites 中加入对应类型检查。slug 必须唯一，使用小写字母、数字或连字符。素材请用相对路径或 `import.meta.env.BASE_URL`，避免以 `/` 开头。子站构建时统一使用相对 base，总站自动生成入口并为子站添加返回链接。不要覆盖已有子站目录。

## 校竞标子站

`/campus-bid/` 为校园商业竞标平台的界面初稿图册，包含 90 张桌面界面、代表性手机界面、分端 PDF 和图片包。账户、作品与支付状态均为模拟，不提供真实交易。纯静态子站在 `sites.json` 中设置 `"type": "static"`，构建时直接复制该目录，无需安装额外依赖。子站所有资源使用相对路径，兼容 GitHub Pages 仓库路径。

## 拍摄子站说明

本次网站只使用 D:/Backup/Desktop/拍摄资料 中的内容。两页顺序为：模卡、自我介绍、案例 → 个人简介、联系方式。原项目使用 React、Vite 和 TypeScript，沿用该运行方式；参考餐厅模板的黑金视觉，未引入其餐厅内容或外部影像。

第一页面 #work，第二页面 #about。11 段视频采用 H.264/AAC MP4 和 faststart，按需播放；两张图片可放大；案例支持三类筛选；微信号支持复制。素材路径为 public/shoot。

运行 pnpm dev，构建 pnpm build。浏览器验证记录位于 .qa/shoot-results.json。
