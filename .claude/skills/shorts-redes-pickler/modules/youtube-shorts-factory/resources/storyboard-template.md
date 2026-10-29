# 스토리보드 HTML 템플릿

## 기본 구조

스토리보드 HTML은 다크/라이트 테마를 지원하며, 각 장면(Scene)을 카드 형태로 시각화.

### HTML 뼈대

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{영상 제목} — AI Shorts Storyboard</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0f0f0f; --card: #1a1a2e; --accent: #e94560;
  --text: #eaeaea; --muted: #888; --border: #2a2a3e;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Noto Sans KR',sans-serif; background:var(--bg); color:var(--text); padding:24px; }

.header { text-align:center; padding:40px 0; }
.header h1 { font-size:2rem; font-weight:700; }
.header .subtitle { color:var(--muted); margin-top:8px; }

.scene-grid { max-width:900px; margin:0 auto; display:flex; flex-direction:column; gap:24px; }

.scene-card {
  background:var(--card); border:1px solid var(--border);
  border-radius:16px; overflow:hidden; transition:transform .2s;
}
.scene-card:hover { transform:translateY(-2px); }

.scene-header {
  display:flex; justify-content:space-between; align-items:center;
  padding:16px 20px; border-bottom:1px solid var(--border);
}
.scene-num { font-weight:700; color:var(--accent); }
.scene-time { color:var(--muted); font-size:0.85rem; }
.scene-emotion {
  display:inline-block; padding:4px 12px; border-radius:20px;
  font-size:0.75rem; font-weight:600;
}

.scene-body { padding:20px; }
.scene-body-inner { }

.scene-img-wrap { margin-bottom:16px; }
.scene-img-wrap img { width:100%; border-radius:12px; }

.scene-desc { margin-bottom:12px; line-height:1.6; }
.scene-subtitle {
  background:#111; border-left:3px solid var(--accent);
  padding:12px 16px; border-radius:0 8px 8px 0;
  font-size:0.95rem; margin-bottom:16px; white-space:pre-line;
}

.prompt-toggle {
  cursor:pointer; color:var(--accent); font-size:0.85rem;
  display:flex; align-items:center; gap:6px;
}
.prompt-content {
  display:none; margin-top:12px; padding:12px;
  background:#111; border-radius:8px; font-size:0.8rem;
  line-height:1.5; font-family:monospace;
}
.prompt-content.open { display:block; }

.badge-row { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
.badge {
  padding:4px 10px; border-radius:12px; font-size:0.7rem; font-weight:600;
  background:#2a2a3e; border:1px solid #3a3a5e;
}

/* 감정별 색상 */
.emotion-warmth { background:#ff6b3520; color:#ff6b35; border:1px solid #ff6b3540; }
.emotion-suspense { background:#7b2ff720; color:#7b2ff7; border:1px solid #7b2ff740; }
.emotion-climax { background:#e9456020; color:#e94560; border:1px solid #e9456040; }
.emotion-reflection { background:#00b4d820; color:#00b4d8; border:1px solid #00b4d840; }
.emotion-establishing { background:#90be6d20; color:#90be6d; border:1px solid #90be6d40; }
</style>
</head>
<body>

<div class="header">
  <h1>{영상 제목}</h1>
  <div class="subtitle">{한 줄 설명} | {총 장면 수}장면 | ~{타겟 초}초</div>
</div>

<div class="scene-grid">
  <!-- 장면 카드 반복 -->
</div>

<script>
document.querySelectorAll('.prompt-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.classList.toggle('open');
    btn.textContent = content.classList.contains('open') ? '▲ 프롬프트 접기' : '▼ AI 프롬프트 보기';
  });
});
</script>
</body>
</html>
```

### 장면 카드 템플릿

```html
<div class="scene-card" id="sc{N}">
  <div class="scene-header">
    <span class="scene-num">Scene {N}</span>
    <span class="scene-time">{timestamp} | {duration}초</span>
    <span class="scene-emotion emotion-{class}">{emotion}</span>
  </div>
  <div class="scene-body">
    <div class="scene-body-inner">
      <!-- 이미지가 여기에 주입됨 -->
      <div class="scene-img-wrap">
        <img src="data:image/png;base64,{BASE64}" alt="Scene {N}">
      </div>
    </div>
    <div class="scene-desc">{description}</div>
    <div class="scene-subtitle">{subtitle}</div>

    <div class="prompt-toggle">▼ AI 프롬프트 보기</div>
    <div class="prompt-content">
      <strong>이미지:</strong> {prompt}<br><br>
      <strong>영상:</strong> {video_prompt}<br><br>
      <strong>카메라:</strong> {camera_motion}
    </div>

    <div class="badge-row">
      <span class="badge">엔진: {video_engine}</span>
      <span class="badge">우선도: {video_priority}</span>
      <span class="badge">Act {act}</span>
    </div>
  </div>
</div>
```

---

## Story JSON → HTML 자동 변환

스토리 JSON에서 HTML 스토리보드를 자동 생성하는 Python 스크립트:

```python
import json, base64, os

def generate_storyboard_html(story_path, output_html, frames_dir=None):
    with open(story_path) as f:
        story = json.load(f)

    emotion_classes = {
        'warmth': 'warmth', 'suspense': 'suspense',
        'emotional_climax': 'climax', 'reflection': 'reflection',
        'establishing_character': 'establishing', 'sacrifice': 'climax',
        'joy': 'warmth', 'hope': 'establishing',
    }

    cards_html = []
    for scene in story['scenes']:
        # 이미지 로드 (있으면)
        img_html = ''
        if frames_dir:
            img_path = os.path.join(frames_dir, f"frame_{scene['frame']:04d}.png")
            if os.path.exists(img_path):
                with open(img_path, 'rb') as f:
                    b64 = base64.b64encode(f.read()).decode()
                img_html = f'<div class="scene-img-wrap"><img src="data:image/png;base64,{b64}" alt="Scene {scene["frame"]}"></div>'

        emotion_class = emotion_classes.get(scene.get('emotion', ''), 'establishing')

        card = f'''
        <div class="scene-card" id="sc{scene['frame']}">
          <div class="scene-header">
            <span class="scene-num">Scene {scene['frame']}</span>
            <span class="scene-time">{scene.get('timestamp','')} | {scene.get('video_duration',6)}초</span>
            <span class="scene-emotion emotion-{emotion_class}">{scene.get('emotion','')}</span>
          </div>
          <div class="scene-body">
            <div class="scene-body-inner">{img_html}</div>
            <div class="scene-desc">{scene.get('description','')}</div>
            <div class="scene-subtitle">{scene.get('subtitle','')}</div>
            <div class="prompt-toggle">▼ AI 프롬프트 보기</div>
            <div class="prompt-content">
              <strong>이미지:</strong> {scene.get('prompt','')}<br><br>
              <strong>영상:</strong> {scene.get('video_prompt','')}<br><br>
              <strong>카메라:</strong> {scene.get('camera_motion','')}
            </div>
            <div class="badge-row">
              <span class="badge">엔진: {scene.get('video_engine','auto')}</span>
              <span class="badge">우선도: {scene.get('video_priority','medium')}</span>
              <span class="badge">Act {scene.get('act',1)}</span>
            </div>
          </div>
        </div>'''
        cards_html.append(card)

    # HTML 템플릿에 카드 삽입 (template은 SKILL.md의 HTML 뼈대 참조)
    # ... 생략: 실제 사용 시 위의 HTML 뼈대에 cards_html을 scene-grid 안에 삽입
    print(f"Generated {len(cards_html)} scene cards → {output_html}")
```

---

## 이미지 주입 스크립트

이미 생성된 스토리보드 HTML에 이미지를 후속 주입할 때:

```python
import base64, re

def inject_images_to_html(html_path, frames_dir, scene_frame_map):
    """
    scene_frame_map 예시:
    {
        "sc1": [1],       # Scene 1 → frame 1
        "sc2": [2],       # Scene 2 → frame 2
        "sc3": [3, 4, 5], # Scene 3 → frames 3,4,5 (서브클립)
        "sc4": [6, 7],    # Scene 4 → frames 6,7
        "sc5": [8],
        "sc6": [9]
    }
    """
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    for scene_id, frame_nums in scene_frame_map.items():
        images_html = ''
        for fn in frame_nums:
            img_path = f"{frames_dir}/frame_{fn:04d}.png"
            if not os.path.exists(img_path):
                continue
            with open(img_path, 'rb') as f:
                b64 = base64.b64encode(f.read()).decode()
            images_html += f'<div class="scene-img-wrap"><img src="data:image/png;base64,{b64}" style="width:100%;border-radius:12px;margin-bottom:8px;"></div>\n'

        # scene-body-inner에 삽입
        pattern = rf'(id="{scene_id}".*?class="scene-body-inner"[^>]*>)'
        html = re.sub(pattern, f'\\1\n{images_html}', html, count=1, flags=re.DOTALL)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Injected images into {html_path}")
```

---

## 텍스트 오버레이 (AI 텍스트 한계 보완)

한국어 텍스트가 중요한 프레임에는 CSS 오버레이를 추가:

```python
def add_text_overlay(html, scene_id, text, font_family="'Nanum Pen Script',cursive"):
    """메모, 편지 등 텍스트가 핵심인 프레임에 CSS 오버레이 추가"""
    overlay = f'''<div style="position:absolute; bottom:20%; left:50%; transform:translateX(-50%);
      background:rgba(255,255,240,0.92); padding:16px 28px;
      font-family:{font_family}; font-size:1.5rem;
      color:#333; border-radius:8px; text-align:center;
      box-shadow:0 2px 12px rgba(0,0,0,0.15);">
      {text}
    </div>'''
    # scene-img-wrap을 position:relative로 감싸고 오버레이 추가
    # ... 구현
```
