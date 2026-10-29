# 워크플로우 단계별 상세 가이드

## Step 1: 유튜브 자막 추출 — 상세

### URL 패턴별 ID 추출

| URL 형식 | ID 추출 |
|----------|---------|
| `youtube.com/watch?v=ABC123` | `ABC123` |
| `youtu.be/ABC123` | `ABC123` |
| `youtube.com/shorts/ABC123` | `ABC123` |

### 자막 언어 우선순위

```python
# 1순위: 수동 한국어 자막
# 2순위: 자동 생성 한국어 자막
# 3순위: 영어 → 한국어 번역
languages_priority = ['ko', 'ko-auto', 'en']
```

### 자막 없는 경우 대응

자막이 없으면 영상 다운로드 후 `ffmpeg-analyse-video` 스킬로 프레임 추출하여 시각적 분석 진행.

---

## Step 2: 포렌식 분석 — 상세

### 감정 곡선 매핑 예시

```
시간축 →  00:00   00:10   00:20   00:30   00:40   00:50   00:60
감정   →  호기심 → 공감 → 긴장 → 슬픔 → 놀라움 → 감동 → 여운
         ┃       ┃      ┃      ┃      ┃       ┃      ┃
         Hook   공감    행동   발견   반전    클라이맥스  페이드
```

### 바이럴 계수 평가 기준

| 항목 | 1점 | 5점 | 10점 |
|------|-----|-----|------|
| 공유 욕구 | 없음 | 약간 | "이거 꼭 보세요" 수준 |
| 댓글 유도 | 없음 | 의견 표현 | 자기 경험 공유 |
| 감정 강도 | 무덤덤 | 공감 | 눈물/소름 |
| 재시청률 | 한 번만 | 두 번 | "또 보러 옴" |
| 범용성 | 특정 그룹만 | 세대 | 전 연령대 |

---

## Step 3: 각색 — 상세 프로세스

### Phase 3-A: 원본 뼈대 추출

```markdown
## 원본 뼈대
1. [Hook] {누가} {어떤 상황에서} 등장
2. [발견] {무엇을} 발견
3. [행동] {어떤 행동을} 조용히 수행 (Silent Hero)
4. [반전] 마지막에 {어떤 장치}로 감동 전달
```

### Phase 3-B: 각색 변환표

```markdown
## 변환 매핑
| 원본 요소 | 역할 | 각색 후 | 감정 유지 여부 |
|----------|------|---------|--------------|
| 남편 | 주인공 | 성인 자녀 | ✅ 동일 |
| 아내 | 수혜자 | 노인 아버지 | ✅ 동일 |
| 세탁/청소 | 행동 | 설거지/약통정리 | ✅ 동일 |
| 잠든 모습 발견 | 발견 | 소파 수면 발견 | ✅ 동일 |
| 편지/메모 | Payoff | 냉장고 메모 | ✅ 동일 |
```

### Phase 3-C: 신규 디테일 추가

원본에 없는 한국 가정 특유의 디테일을 추가하여 차별화:
- **약통**: 노인 1인 가구의 현실적 소품
- **빈 냉장고**: 혼자 사시는 아버지의 외로움 암시
- **된장찌개**: 한국적 정서의 상징적 음식
- **냉장고 메모**: "밥 먹었어. 고마워." 한 줄로 감정 폭발

---

## Step 4: Story JSON — 프롬프트 작성 팁

### 좋은 이미지 프롬프트 패턴

```
[피사체 상세 묘사], [행동/포즈], [표정/감정],
[배경/환경], [조명], [카메라 앵글],
Korean drama style, K-drama cinematography,
Korean drama lighting, cinematic vertical 9:16,
[색감], hyperrealistic
```

### 나쁜 프롬프트 → 좋은 프롬프트

**나쁨:** `Korean man sleeping on sofa`
**좋음:** `Elderly Korean grandfather in his 70s lying asleep on an old worn fabric sofa, eyes fully closed, mouth slightly open in deep sleep, white hair, wrinkled face, dressed in casual home clothes, TV glowing softly in the background, afternoon light filtering through faded floral curtains typical of Korean home`

### 네거티브 프롬프트 활용

프레임이 의도와 다르게 생성될 때:
```
NO face visible, NO skincare, NO cosmetics, NO makeup
NOT a young person, NOT standing, NOT looking at camera
```

---

## Step 5~7: 이미지 → HTML → 영상 통합 흐름

```bash
# 1. Story JSON 작성 완료
# 2. Dry-run으로 비용 확인
cd rfn_generator
python scripts/run.py stories/{slug}.json --dry-run

# 3. Phase 1: 이미지 생성
python scripts/run.py stories/{slug}.json

# 4. 이미지 검증 (각 프레임 시각 확인)
# 5. 불량 프레임 수정 후 재생성
rm output/{slug}/frames/frame_000X.png
python scripts/run.py stories/{slug}.json --resume

# 6. HTML 스토리보드에 이미지 주입 (Python 스크립트)
# 7. 사용자 최종 확인

# 8. Phase 2: 영상 생성
python scripts/run.py stories/{slug}.json --resume

# 9. 자막 추가
python scripts/add_subtitles.py stories/{slug}.json

# 최종 결과물: output/{slug}/final_subtitled.mp4
```
