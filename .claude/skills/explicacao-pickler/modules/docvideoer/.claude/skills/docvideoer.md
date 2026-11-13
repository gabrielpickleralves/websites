---
name: docvideoer
description: 文档转视频技能 — 将文档内容自动分析、生成分镜、合成语音、渲染为讲解视频
type: skill
---

# docvideoer — 文档转视频技能

## 技能概述

将任意文档内容（URL 或文本）自动转换为结构化的讲解视频。编排文档抓取 → 内容分析 → 分镜生成 → TTS 语音合成 → Remotion 视频渲染的完整流水线。

## 适用场景

- 技术文章/博客转视频讲解
- 产品文档转演示视频
- 新闻/资讯内容转短视频
- 教程/指南转教学视频

## 核心能力

### 1. 文档获取
- 支持 URL 网页抓取（自动提取正文，去除广告和无关内容）
- 支持直接粘贴 Markdown/纯文本
- 支持简单的中文翻译（如果源文档是英文）

### 2. 内容分析与分镜
- 智能提取文档核心要点
- 自动生成结构化的分镜脚本
- 为每个场景生成讲解文案
- 估算场景时长（中文按 ~4 字/秒）

### 3. 语音合成（免费 TTS）
- 使用 `scripts/tts.mjs` 统一调用 Edge TTS 或 macOS `say`
- Edge TTS 支持多种中文音色（男声/女声等）
- 支持语速、音量、音调调节
- 自动按场景分段合成
- 生成音频，并尽量获取实际音频时长用于精确同步

### 4. 视频生成（Remotion）
- Remotion 相关实现依赖官方 `remotion-best-practices` skill
- 如果该 skill 未安装，提示用户运行：
  `npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices`
- 基于 React 的声明式视频组件
- 预设场景模板：标题、内容、列表、图片、结尾
- 音频驱动的精确时间同步
- 平滑的场景过渡动画
- 输出 1080p/30fps MP4

## 场景类型与视觉效果

| 类型 | 组件 | 视觉效果 |
|------|------|---------|
| `title` | TitleScene | 大标题 + 副标题，缩放淡入动画 |
| `content` | ContentScene | 标题 + 图文，滑入动画 |
| `bullet` | BulletListScene | 要点列表，逐条飞入 |
| `image` | ImageScene | 全屏图片 + 文字叠加 |
| `end` | EndScene | 总结 + 关注引导 |

## 分镜生成原则

1. **场景粒度**：每个场景 5-20 秒，对应 1-2 句话
2. **文案节奏**：中文正常语速约 4 字/秒，文案长度 = 目标时长 × 4
3. **信息密度**：每个场景传达 1 个核心要点
4. **视觉匹配**：根据内容自动选择最合适的场景类型
5. **结构完整**：包含 开头(title) → 主体(content/bullet/image...) → 结尾(end)

## 使用流程

```
用户: /docvideo https://example.com/article
→ 1. 抓取文档内容
→ 2. 分析内容，生成分镜
→ 3. 确认分镜（用户可修改）
→ 4. 合成 TTS 语音
→ 5. 搭建 Remotion 项目
→ 6. 渲染输出视频
→ 7. 返回视频文件和描述
```

## 依赖检查清单

执行前确认：
- [ ] Node.js >= 18 已安装
- [ ] 官方 Remotion skill 已安装：`remotion-best-practices`
- [ ] Edge TTS 已安装（推荐：`pip3 install edge-tts`），或当前系统可使用 macOS `say`
- [ ] 如需自定义音色，已在 `.env` 中配置 `TTS_VOICE`
- [ ] `node_modules/` 已安装（`npm install`）
