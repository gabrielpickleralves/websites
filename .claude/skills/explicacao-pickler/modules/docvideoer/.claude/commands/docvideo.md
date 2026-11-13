---
name: docvideo
description: 将文档内容（URL 或文本）转换为讲解视频
argument: 文档 URL 或文本内容
---

# /docvideo — 文档转视频

## 使用方法

```
/docvideo <文档URL或文本内容>
```

## 参数

- `<url>` — 文档的 URL 地址（支持任何公开网页）
- `<text>` — 直接粘贴的文档文本内容

## 示例

```
/docvideo https://example.com/article
/docvideo 这是一段关于 AI 技术的介绍文章……
```

## 执行流程

1. **获取内容**：如果提供 URL，抓取网页正文；如果提供文本，直接使用
2. **分析分镜**：提取要点，生成分镜脚本（展示给用户确认）
3. **语音合成**：使用 `scripts/tts.mjs` 为每段文案生成语音
4. **视频制作**：搭建 Remotion 项目，生成场景组件
5. **渲染输出**：渲染 MP4 视频文件
6. **结果展示**：显示视频路径、描述文案、渲染统计

## 用户需要确认的事项

- 分镜脚本（可以修改场景顺序、文案、时长等）
- 视频风格偏好（音色、是否需要背景音乐等）

## 首次使用 TTS

默认使用 Edge TTS，推荐先安装：

```bash
pip3 install edge-tts
```

也可以复制 `.env.example` 为 `.env`，按需调整 `TTS_BACKEND`、`TTS_VOICE`、`TTS_RATE`。如果 Edge TTS 不可用，macOS 可回退到系统 `say`。
