<div align="center">

<img src="assets/guliai-logo-on-light.png" alt="GULIAI｜谷粒AI" width="320">

# PPT 逐页内容编导

**把复杂材料编排成清晰、可直接交给视觉设计的 PPT 逐页内容包**

[![Version](https://img.shields.io/badge/version-2.0.0-4C6FFF.svg)](VERSION)
[![Language](https://img.shields.io/badge/language-中文-2F855A.svg)](SKILL.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

> **定位**：面向课程、培训、咨询、汇报和销售演示的 PPT 内容编导 Skill，负责决定整套内容怎么讲、每页必须讲清什么。<br>
> **不做什么**：不设计页面版式、图形结构、视觉系统、品牌资产、提示词或页面图片；不交付可编辑 PPTX。

## 导航

- [为什么需要它](#为什么需要它)
- [快速开始](#快速开始)
- [工作流程](#工作流程)
- [输入与输出](#输入与输出)
- [质量与边界](#质量与边界)

## 为什么需要它

内容拆页不应由固定字数或固定页面模板决定。课程、方法论、流程、案例和行动计划常常需要在同一页形成完整理解，也常常需要拆开才能避免混淆。

本 Skill 先梳理事实、关系与受众理解路径，再生成逐页内容包。页面最终长什么样，由下游的 `guliai-visual-design` 根据品牌视觉 DNA 与页面内容自行完成。

## 快速开始

仓库名称、安装目录与调用名均为 `ppt-page-content-director`。

```bash
git clone https://github.com/OWENWANG-GULIAI/ppt-page-content-director.git ~/.codex/skills/ppt-page-content-director
```

```text
使用 $ppt-page-content-director，把这份课程材料整理成 12 页 PPT 逐页内容包。
保留原始数字、案例名称与术语；不要设计页面版式，也不要生图。
```

## 调用方式

默认交付“总叙事＋`pages`＋覆盖表＋事实边界”。用户已指定页数时遵守页数；未指定时给出推荐页数及其内容理由。

要生成最终页面图片时，将生成的 `pages` 内容包交给视觉设计 Skill：

```text
使用 $guliai-visual-design，基于以下 pages 生成一套 GULIAI 品牌 PPT 页面图片。
```

## 工作流程

```text
原始材料 → 内容原子与事实边界 → 页序与逐页内容包 → guliai-visual-design → 最终页面图片
```

本 Skill 输出：

- 总叙事与推荐页数；
- `pages`：每页标题、核心信息、支撑要点、关键术语和不可改写内容；
- 内容覆盖表：每一条核心材料的去向；
- 事实边界与缺失项。

## 核心能力

- 按受众理解路径决定内容聚合、拆页与页序；
- 保护数字、单位、名称、术语和用户原话；
- 让数据、流程、理论、架构、案例和行动内容在不补造事实的前提下进入对应页面；
- 输出可由视觉设计 Skill 直接消费的标准化 `pages` 内容包。

## 适用场景

- 课程与培训 PPT 的内容编排；
- 咨询方案、项目汇报和销售演示；
- 已有文章、笔记、访谈纪要或逐页草稿的结构化整理；
- 需要将内容与品牌视觉生成分离协作的 PPT 工作流。

## 示例

输入（虚构）：

```text
把 AI 讲师培养整理成 3 页逐页内容包：战略判断、课程设计、场景实施、交付表达、复盘迭代。
受众是企业培训讲师。不要生图。
```

输出会将五项能力按理解路径安排到 `pages` 中，并对每页给出 `page_title`、`core_message`、`bullets`、`key_terms` 与 `must_preserve`。它不会指定中心辐射、矩阵、流程图、颜色、Logo 或页面布局。

## 输入与输出

| 类型 | 内容 |
|---|---|
| 输入 | 原始文章、课程材料、汇报内容、逐页草稿、页数约束与必显事实 |
| 输出 | 总叙事、推荐页数、逐页内容包、内容覆盖表、事实边界 |
| 下游交接 | 由 `guliai-visual-design` 决定视觉表达与最终页面图片 |
| 不输出 | 构图、结构图选择、色彩、字体、Logo、提示词、页面图片、可编辑 PPTX |

逐页字段格式见[逐页内容包](references/page-content-package.md)。

## 质量与边界

- 内容关系服务于拆页和页序，不强制决定页面结构；
- 数字、单位、年份、人名、机构、产品、专有术语和用户原话不得擅改；
- 无法从来源确认的内容标记为 `[待提供：字段名]`，不得补造；
- 未经用户明确指定，不提供 `structure_hint`；
- 静态页面图片不等于可编辑 PPTX。

## 当前版本边界

- 当前版本名称、GitHub 仓库名称与调用名均为 `ppt-page-content-director`；
- 不生成页面图片，也不替代 `guliai-visual-design` 的品牌与图像生成职责；
- 不生成可编辑 PPTX。

## 仓库结构与验证

- [`SKILL.md`](SKILL.md)：入口、边界与工作流
- [`references/`](references/)：需求与事实边界、内容分解与交接格式
- [`tests/skill.test.mjs`](tests/skill.test.mjs)：可发现性、链接和交接边界检查
- [`VERSION`](VERSION)：当前版本

运行验证：

```bash
node --test tests/skill.test.mjs
```

## 隐私、授权与许可证

- 示例使用虚构或充分匿名化的数据；不要提交私聊、客户材料、凭证或本机绝对路径。
- 本仓库的 GULIAI Logo 仅用于 README 的品牌展示，不代表任何合作、认证或商标授权；详见[品牌资产说明](BRAND-ASSETS.md)。
- 代码与文档采用 [MIT License](LICENSE)。

## 参与贡献

欢迎提交 Issue 或 Pull Request。请使用虚构或充分匿名化的示例，不要上传私人聊天、客户材料、内部数据、凭证或未授权品牌资产。

---

让内容先被讲清楚，再让视觉自由发挥。
