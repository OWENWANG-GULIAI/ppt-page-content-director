---
name: ppt-page-content-director
description: Use when users need course, training, consulting, reporting, or sales material broken into a coherent PPT page-by-page content plan, especially when deciding what belongs on each page without making page-layout or image-generation decisions.
---

# PPT 逐页内容编导

将原始材料编排成可以直接交给视觉设计 Skill 的 PPT 逐页内容包。核心是让每页回答一个清楚的问题、让整套页面形成理解路径；不设计版式、不指定图形结构、不生成页面图片。

## 工作边界

- **本 Skill 决定**：叙事顺序、页数建议、内容聚合或拆分、每页核心信息、必显事实与内容覆盖。
- **本 Skill 不决定**：页面构图、流程图/矩阵/卡片等视觉结构、字体、色彩、Logo、素材、提示词和图片生成。
- **下游交接**：需要最终图片时，将本 Skill 的 `pages` 内容包原样交给 `guliai-visual-design`。下游可在不改写 `must_preserve` 的前提下自行决定视觉表达。
- 不交付可编辑 `.pptx`。

## 工作流

1. 建立内容简报：用途、受众、讲解或阅读场景、材料范围、页数约束、必显内容与事实边界。详见[需求与事实边界](references/brief-and-content-contract.md)。
2. 将材料拆成内容原子，识别关系和理解依赖，据此决定聚合、拆页与叙事顺序；关系只用于内容编排，不转写成页面结构。详见[内容分解](references/content-decomposition.md)。
3. 输出总叙事、`pages`、内容覆盖表和事实边界。`pages` 必须符合[逐页内容包](references/page-content-package.md)。
4. 若用户需要页面图片，将完整内容包交给 `guliai-visual-design`；本 Skill 到此结束，不补充视觉方案。

## 内容判断

- 一页一个核心问题，不等于一页只有一个信息点。共同回答同一问题、需要同时比较或形成闭环的内容优先放在同页。
- 当一页包含多个独立结论、跨越不同理解阶段，或文字已无法扫读时拆页；必要时采用“总览页＋后续展开页”。
- 数据、流程、理论、架构、案例和行动材料都先核实其事实关系；不得为了完整而补造数字、案例、角色、日期、客户或结论。
- 标题可用有证据支持的结论句；证据不足时使用中性主题句。

## 输出要求

- 默认输出逐页内容包，不输出提示词、页面布局、视觉系统或图片。
- 数字、单位、年份、人名、机构、产品、专有术语和用户引号内原话必须原样保留。
- 缺失事实写作 `[待提供：字段名]`；不要用虚构内容补齐。
- 用户指定固定页数时在该约束内编排；未指定时给出推荐页数和理由。

## 禁止做法

- 不把“流程、矩阵、能力模型”等内容关系强制翻译成指定图形或构图。
- 不输出字体、色板、标题轨道、卡片、Logo、安全区、素材计划或生图提示词。
- 不把静态页面图片说成可编辑 PPTX，也不自行生成页面图片。
