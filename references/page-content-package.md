# 逐页内容包

这是交给 `guliai-visual-design` 的唯一页面级交接格式。它描述每页要讲清什么，不规定页面长什么样。

## 整套输出

```yaml
narrative_arc: 受众从什么理解起点，经过哪些认知变化，到达什么结论或行动。
recommended_page_count: 6
pages: []
coverage:
  - source_id: A1
    page_no: 2
fact_constraints:
  - 数字、单位、年份、人名和专有术语必须原样呈现
```

## `pages` 字段

```yaml
- page_no: 1
  page_title: 课程为什么从这个问题开始
  core_message: 先识别业务问题，才能决定 AI 应用的价值优先级。
  bullets:
    - 业务问题识别
    - 价值优先级
    - 应用边界
  key_terms:
    - 业务问题
    - 价值优先级
  must_preserve:
    - AI+OPC
  speaker_notes: 可选；仅记录来源支持的讲解补充。
```

字段规则：

- `page_no`、`page_title`、`core_message`、`bullets`、`key_terms`、`must_preserve` 必填。
- `bullets` 只写必须被理解的支撑内容；不能安全压缩的长内容应拆页。
- `key_terms` 放入需要精确识别的术语、名称或短语。
- `must_preserve` 放入不得被改写的数字、单位、日期、原话、名称和专有术语；没有时填空数组。
- `speaker_notes` 可选，且不能包含来源外的新事实。
- `structure_hint` 为可选字段，仅在用户明确指定某页必须采用某种表达形式时提供；未指定时必须省略。

## 交接规则

将 `pages` 原样提供给 `guliai-visual-design`。视觉设计可决定构图、图形类型、层级、配色、素材和整图生成方式，但不能遗漏或改写 `must_preserve`，也不能添加没有来源的事实。
