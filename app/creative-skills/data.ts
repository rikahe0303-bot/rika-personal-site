export const categories = [
  { id: "video", name: "视频创作与运镜", note: "把想法变成镜头", count: 4 },
  { id: "story", name: "口播与商品短剧", note: "把卖点讲成故事", count: 2 },
  { id: "image", name: "电商图片设计", note: "让商品清楚出场", count: 1 },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export const creativeSkills: { id: string; title: string; category: CategoryId; description: string; outputs: string[]; example: string }[] = [
  { id: "rika-camera-direction", title: "导演运镜与机位构图", category: "video", description: "从情绪出发，确定机位、焦段、构图和运动。", outputs: ["镜头表", "运镜提示词"], example: "使用 $rika-camera-direction，为山间旅行片设计一组安静、自然的镜头。" },
  { id: "rika-natural-vlog", title: "真人 Vlog 短片生成", category: "video", description: "用自然光、手持镜头和生活互动，记录真实日常。", outputs: ["Vlog 分镜", "视频提示词"], example: "使用 $rika-natural-vlog，把我的旅行照片规划成一支自然的日常 Vlog。" },
  { id: "rika-action-choreography", title: "高燃打戏设计", category: "video", description: "编排动作节奏、人物位置和清晰连贯的打戏镜头。", outputs: ["动作节拍", "逐镜方案"], example: "使用 $rika-action-choreography，为原创武侠故事设计一段空间清楚的动作戏。" },
  { id: "rika-3d-animation-short", title: "皮克斯风格动画短片", category: "video", description: "设计有表情、有故事的原创三维动画角色与分镜。", outputs: ["角色设定", "动画分镜"], example: "使用 $rika-3d-animation-short，为胖虎设计一个温暖、有趣的原创三维动画故事。" },
  { id: "rika-product-talk", title: "短视频带货口播", category: "story", description: "围绕真实卖点和使用场景，写出像聊天的口播。", outputs: ["口播文案", "拍摄脚本"], example: "使用 $rika-product-talk，根据我提供的商品资料写一段自然、不夸大的试用分享。" },
  { id: "rika-palace-product-drama", title: "宫斗商品短剧", category: "story", description: "用献礼、验货和反转，让商品融入原创宫廷剧情。", outputs: ["短剧脚本", "商品分镜"], example: "使用 $rika-palace-product-drama，把这款商品的真实卖点写进一段原创宫廷短剧。" },
  { id: "rika-product-image-set", title: "电商商品套图视觉生成", category: "image", description: "统一商品外观和光线，规划主图、场景与细节套图。", outputs: ["图片清单", "套图提示词"], example: "使用 $rika-product-image-set，根据我的商品照片规划主图、场景图和细节图。" },
];
