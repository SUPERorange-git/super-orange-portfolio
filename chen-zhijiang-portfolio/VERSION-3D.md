# 3D Creator 版本 · 2026-09-06

## 粒子与交互更新

Hero 新增按需加载的 Three.js 背景：15,000 粒子、530 条 LineMaterial 能量线、UnrealBloomPass，以及指针排斥/回弹和局部黄绿色混色。CSS 底色 #030014。离屏、后台暂停；WebGL 不可用时回退深色底。Hero 层级 0 / 10 / 20 / 30；详情抽屉通过 Portal 位于 50 层。

磁吸改为 0.3s / 0.6s 的进入/复位过渡。Marquee 使用指定像素公式 `(scrollY - sectionTop + innerHeight) * 0.3`，两排方向相反，图片尺寸固定 420×270。

EXPERIENCE 锚点保留，显示标题改为 Project；Live Project 打开真实经历详情抽屉，支持 Escape、焦点约束和关闭后返回按钮。三图布局的本地占位 SVG 位于 `public/media/experience/{1..3}-{1..3}.svg`，可在 CreatorExperience.tsx 替换地址。无新增虚构作品。

桌面卡片使用 85vh 堆叠区间和 28px 偏移；小屏与低高度设备采用可完整阅读的静态布局。新增 FadeIn 支持动态元素、x/y、delay/duration；AnimatedText 使用 0.2→1 透明度及指定滚动区间。

本文件记录当前运行版本，取代早期 V1 的版式说明。

## 当前结构

`Navbar → CreatorHero → MarqueeSection → CreatorAbout → Capabilities → WorkSection → CreatorExperience → Achievements → Education → Contact → Footer`

导航与主内容均为 ABOUT → WORK → EXPERIENCE → CONTACT。用户提示中的 Price、模板年限和模板客户没有写入，保留真实简介、项目、经历、数据及联系方式。首屏和浏览器标题使用本次指定的 3D Creator 文案。

## 技术和视觉

React 19、TypeScript、Vite、Tailwind CSS 3、Framer Motion 12、Lucide React。Kanit 300–900 随项目本地加载。

背景 #0C0C0C，主文本 #D7E2EA；标题使用 #646973 → #BBCCD7 的垂直渐变。WORK 为白底黑字的大编号列表；EXPERIENCE 为三张圆角深色堆叠卡片。完整姓名采用两行首屏排版，以避免长名称被裁切。

`src/styles/global.css` 保留共用布局；`src/styles/creator.css` 定义当前 3D Creator 视觉。Tailwind 禁用重复 preflight，沿用工程全局 reset。

## 素材

- 艺术头像：`public/media/art-portrait.png`，原图复制，页面 CSS 裁切与遮罩。
- 原人物照片仍保留：`public/media/portrait.png`。
- About 四个装饰图：`public/media/reference/decor-1.png` 至 `decor-4.png`。
- 动效：20 个可用来源转成 `motion-01.mp4` 至 `motion-20.mp4`，附同名 JPG 封面，合计约 3.3 MB。原始 GIF 留在被 git 忽略的 `.qa/original-gifs/`。
- 第 21 个来源返回 404：数据保留空地址，页面显示占位，不请求无效链接。
- 参考动效明确标注为视觉参考，不是个人项目。实际项目图片仍待提供。

## 交互

- 首屏分批进入、头像附近 150px 范围磁吸（strength 3，限制位移）。
- 双排参考图随滚动相反方向移动；仅可见视频播放，可暂停，后台标签停止播放。
- About 简介逐字显现，保留原文字；WORK 项目可展开。
- 经历三卡随滚动缩放堆叠，移动端、短屏和减少动态效果模式切换为静态布局。
- 导航活动状态、Contact 锚点、邮箱和电话链接保留。

## 验证

1440 / 1920 / 2560 / 768 / 390 / 320px 无页面横向溢出、无 console error。人物图加载、导航顺序、项目展开和 Contact 状态通过。普通动态模式验证磁吸位移、视频播放/暂停与卡片缩放；减少动态效果模式通过。TypeScript 和生产构建通过。

运行命令：`npm install`，`npm run dev`；构建：`npm run build`。当前机器使用已提供的 pnpm 执行等价脚本。
