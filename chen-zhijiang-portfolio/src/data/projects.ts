export type Project = {
  id: string;
  title: string;
  name: string;
  categories: string[];
  description: string;
  results: string[];
  image: string;
  visual: string;
  placeholder: boolean;
};
export const projects: Project[] = [
  {
    id: "01",
    title: "PERSONAL IP GROWTH",
    name: "企业IP增长项目",
    categories: [
      "Brand Strategy",
      "Content Strategy",
      "Personal IP",
      "Short Video",
    ],
    description:
      "负责企业个人IP账号从定位规划、内容策划、脚本撰写、拍摄剪辑到运营优化的完整流程，建立品牌线上内容体系和个人IP影响力入口。",
    results: ["500K → 700K+ FOLLOWERS", "1M+ VIDEO VIEWS"],
    image: "",
    visual: "ip",
    placeholder: false,
  },
  {
    id: "02",
    title: "DIGITAL MARKETING GROWTH",
    name: "门店数字营销增长",
    categories: [
      "Digital Marketing",
      "Social Media",
      "Advertising",
      "Livestream",
      "Growth",
    ],
    description:
      "通过内容矩阵、直播带货、达人合作、广告投放和私域运营形成组合增长策略，建立线上曝光到商业转化的完整链路。",
    results: ["10M+ IMPRESSIONS", "+50% SALES", "+20% ROI"],
    image: "",
    visual: "growth",
    placeholder: false,
  },
  {
    id: "03",
    title: "AI CREATIVE",
    name: "AI内容创新与品牌应用",
    categories: ["AI", "Creative", "Visual", "Content"],
    description:
      "作品待补充。未来用于展示 AI视觉、AI广告、AI视频、AI Campaign 与 AI内容创意。",
    results: [],
    image: "",
    visual: "ai",
    placeholder: true,
  },
  {
    id: "04",
    title: "BRAND VISUAL",
    name: "品牌视觉与营销设计",
    categories: ["Brand", "Visual", "Campaign"],
    description:
      "作品待补充。未来用于展示品牌海报、Campaign KV、Social Media Visual、商业营销视觉、活动视觉与AI视觉实验。",
    results: [],
    image: "",
    visual: "brand",
    placeholder: true,
  },
];
