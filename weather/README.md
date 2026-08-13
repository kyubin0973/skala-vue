# SKALA Weather

Vue 3 + Vite로 만든 실시간 날씨 대시보드입니다. 과제 1~4에서 익힌 Composition API / 컴포넌트 분리 / Vue Router / Pinia / Axios를 바탕으로, 실제 배포 가능한 수준의 서비스로 다시 구성했습니다.

## 서비스 구조

| 경로 | 설명 |
| --- | --- |
| `/` | **메인 대시보드.** 내가 등록한 시/도 날씨 카드 목록 + 우측 한반도 지도. 지도를 클릭해 지역을 추가하거나, 검색으로 추가할 수 있습니다. |
| `/city/:regionId` | 도시 상세 페이지. 날씨 상태에 따라 배경색이 바뀌는 카드 + 습도/풍속 지표. |
| `/coursework` | **학습 기록.** 과제 1~4를 만든 순서 그대로 모아둔 아카이브 페이지(라이트 테마 유지). |
| `/coursework/demo/*` | 과제 4에서 만든 라우터 데모(검색 · 지도 · 상세보기 · 단위 전환)를 그대로 열람할 수 있는 서브 라우트. |
| `/explore` | 17개 시/도 + 75개 개별 시(김천, 나주, 통영 등) 검색 탭. 실시간 날씨를 미리 보고 "내 도시"에 추가. |
| `/worldmap` | **세계 날씨 지도.** Ventusky 실시간 기상 지도(바람/기온/강수/구름/강풍)를 임베드. |



## 변경 내역

### 날씨 상태별 컴포넌트 색 테마


- `src/utils/weatherTheme.js` 추가: OpenWeatherMap의 `weather.id` / `icon`(일몰·일출 접미사 d·n) 값을 기준으로 `clear`(맑음) / `cloudy`(흐림·구름) / `rain`(비) / `snow`(눈) / `night`(야간) 테마를 판별합니다. 목데이터처럼 코드가 없는 경우 한글 상태 문구(맑음/흐림/비/눈)로 대체 판별합니다.
- `weather.css`에 라이트 테마용 그라디언트를, `dashboard.css`에 다크 테마용 그라디언트를 각각 추가 — **같은 판별 로직, 같은 클래스명**을 쓰되 카드 배경색만 페이지 톤에 맞게 다르게 오버라이드했습니다. 맑음: 하늘색, 흐림/구름: 회색, 비: 짙은 회청색, 눈: 아이스 블루, 야간: 어두운 남색. 야간 여부(`icon`이 `n`으로 끝나는 경우)가 최우선으로 적용됩니다.
- `WeatherCard.vue`(학습 기록), `WeatherDetailView.vue`(학습 기록), `RegionWeatherView.vue`(학습 기록), `CityTile.vue` / `CityDetailView.vue`(메인 서비스)에 테마 클래스를 동적으로 적용. 과제 1·2(Mockup/컴포지션)는 학습 초기 단계 그대로 유지하기 위해 이번 변경에서 제외했습니다.

### 세계지도(Ventusky) 탭 + 시간별 강수확률

- **세계지도 탭 신규**: `/worldmap` 경로 추가, 헤더 네비게이션에 `대시보드 · 탐색 · 세계지도 · 학습기록` 순서로 배치했습니다. [Ventusky](https://www.ventusky.com/)의 공식 임베드 엔드포인트(`embed.ventusky.com`)를 iframe으로 붙였습니다 — Ventusky 자체 공개 데이터 API가 아니라, 그들이 공식 제공하는 iframe 임베드 방식(`p=위도;경도;줌`, `l=레이어`)을 사용합니다. 레이어(바람/기온/강수/구름/강풍) · 지역(세계 전체/대한민국/아시아/유럽/북미) 버튼을 누르면 iframe의 `src`가 즉시 바뀝니다. 하단에 "지도 제공: Ventusky" 출처 표기를 남겼습니다.
- **시간별 강수확률 · 강수량 (상세 페이지)**: 이미 연동해 둔 OpenWeatherMap 5일/3시간 예보 API 응답에 포함된 `pop`(강수확률)과 `rain.3h`/`snow.3h`(3시간 누적 강수량) 필드를 추가로 파싱했습니다. `weatherStore.fetchForecast()`가 이제 `{ daily, hourly }` 형태로 일별 예보와 향후 24시간(3시간 간격 8칸) 시간별 강수 데이터를 함께 반환하며, 도시 상세 페이지에 `HOURLY · 시간별 강수` 섹션으로 시간 / 아이콘 / 기온 / 강수확률(%) / 강수량(mm)을 표로 보여줍니다. 새 API 호출 없이 기존 예보 응답을 재활용했습니다.

### 레이아웃 버그 수정 + 탐색(Explore) 탭 추가

- **콘텐츠가 왼쪽으로 쏠리던 문제 수정**: `.dash-main`(도시 카드 영역)에 `flex-grow`가 빠져 있어서 콘텐츠 실제 크기만큼만 차지하고, 오른쪽 지도 패널과의 사이에 큰 빈 공간이 남아 전체가 왼쪽으로 몰려 보였습니다. `.dash-main { flex: 1 1 0; min-width: 0; }`을 추가해 항상 남은 폭을 정확히 채우도록 고쳤습니다. 1440px·1920px 와이드 화면에서 좌우 대칭 확인했습니다.
- **[보너스] 모바일 히어로 카드가 비어 보이던 버그 수정**: 위 작업 중 발견 — 모바일 폭에서는 `.hero-row`가 `flex-direction: column`으로 바뀌는데, 가로 배치 전용이던 `flex: 1.6 1 0`(`flex-basis: 0`)을 그대로 세로 배치에 써서 카드 높이가 0으로 수축, `overflow: hidden`에 온도·아이콘이 통째로 잘려 안 보이던 문제였습니다. 모바일 미디어쿼리에서 `.hero-card`/`.overview-panel`을 `flex: 1 1 auto`로 재설정해 해결했습니다.
- **탐색(Explore) 탭 신규**: `/explore` 경로 추가, 헤더 네비게이션에 `대시보드 · 탐색 · 학습기록` 순서로 배치했습니다. 전국 17개 시/도를 검색창으로 필터링하며 실시간 날씨를 미리 보고, 카드에서 바로 "내 도시에 추가"할 수 있습니다. `CityTile.vue`에 `mode="explore"` 모드를 추가해 대시보드의 관리용 카드(삭제/즐겨찾기)와 탐색용 카드(추가/등록됨 배지)를 하나의 컴포넌트로 재사용했습니다.

### 기능 추가: 즐겨찾기 · 정렬 · 새로고침 · 5일 예보

레퍼런스(`skala-vue-olive.vercel.app`)의 "내 도시" 툴바 기능과, 외부 API를 하나 더 붙인 상세 예보 기능을 추가했습니다.

- **즐겨찾기**: 카드 우상단 `☆/★` 버튼으로 지역별 즐겨찾기를 토글합니다. `cityListStore`에 `favoriteIds`를 추가해 등록 도시 목록과 별도로 `localStorage`에 저장합니다.
- **정렬**: `CITIES` 섹션에 등록순 / 이름순 / 기온순 드롭다운을 추가했습니다.
- **즐겨찾기만 보기 필터** + **"N / M개 도시 표시" 카운터**로 지금 몇 개 중 몇 개가 보이는지 바로 알 수 있게 했습니다.
- **새로고침 버튼**: 등록된 모든 도시의 날씨를 강제로 다시 불러옵니다(`weatherStore.fetchCity(id, { force: true })`).
- **기본 도시 복원 버튼**: 등록 목록을 서울/경기/부산 기본값으로 되돌립니다.
- **5일 예보 (신규 외부 API)**: 도시 상세 페이지에 OpenWeatherMap의 **5 day / 3 hour forecast API**를 새로 연동해 요일별 아이콘 + 정오 기준 기온을 카드 스트립으로 보여줍니다. `weatherStore`에 `forecastCache` / `fetchForecast()`를 추가했고, 기존 실시간 날씨와 같은 API 키를 그대로 재사용합니다.

### 지도 배색·모양·고정, 레이아웃 정렬

자동화 미리보기에서는 안 보였던 문제들을 실제 브라우저 기준으로 다시 잡았습니다.

- **좌우 여백 불일치 수정**: `html { scrollbar-gutter: stable both-edges; }` 추가. 세로 스크롤바가 있을 때/없을 때 콘텐츠 폭이 달라져 `margin: 0 auto`로 가운데 정렬한 대시보드가 한쪽으로 쏠려 보이던 문제를 해결했습니다.
- **지도 다크 테마 적용**: 흰 배경 지도가 다크 대시보드와 어울리지 않던 문제 — `.dash-map-panel` 스코프에 남색 바다(`#0b1622`) + 슬레이트블루 육지 타일 + 앰버(`--dash-accent`) 선택 색상을 오버라이드해 다크 UI와 통일했습니다. 학습 기록(`/coursework/demo/regions`)의 라이트 테마 지도는 원래 배색 그대로 유지됩니다.
- **지도 실루엣 재작업**: 기존에 손으로 대충 그린 뭉툭한 윤곽선을 서해안 굴곡·동해안 곡선·남동쪽(부산) 돌출부가 실제 지형과 비슷하게 느껴지도록 좌표를 다시 잡았습니다.
- **지역 타일 재배치**: 서울/인천, 세종/대전 등 좁은 간격이었던 타일 좌표를 조금씩 벌려 라벨이 겹치지 않게 했습니다.
- **지도 "고정" 보강**: `.dash-map-panel`에 `max-height: calc(100vh - 96px); overflow-y: auto;`를 추가해, 도시를 많이 등록해 목록이 길어져도 지도 패널 자체가 뷰포트를 벗어나지 않고 화면에 계속 붙어있도록(sticky) 했습니다.

### 디자인 다듬기: 대시보드를 더 우아하게

레퍼런스(`skala-vue-olive.vercel.app`)의 타이포그래피 위계와 여백감을 참고해 대시보드 상단부를 다시 짰습니다.

- **eyebrow 라벨** 도입(`WEATHER · OVERVIEW`, `CITIES`, `OVERVIEW`, `REGIONS`): 옅은 회색 대문자 + 자간을 넓힌 작은 라벨로 섹션을 구분 — `dashboard.css`의 `.eyebrow` 공용 클래스.
- **대표 도시 히어로 카드** 신규: 내가 등록한 도시 중 첫 번째를 큼직하게 보여줍니다. 날씨 이모지, 68px 크기의 큰 기온, 체감/습도/풍속을 한 줄로 요약, "상세 날씨 →" 버튼까지 — 기존에 흩어져 있던 통계 3칸을 이 히어로 + 오른쪽 `OVERVIEW` 패널 2단 구성으로 재배치했습니다.
- **`OVERVIEW` 패널**: 초록 점이 깜빡이는 `LIVE` 배지 + 2×2 통계 그리드(등록 도시 / 평균 기온 / 가장 더운 지역 / 전체 시·도).
- **날씨 이모지 & 체감 배지**: `weatherTheme.js`에 `getWeatherEmoji()`(맑음 ☀️ / 흐림 ☁️ / 비 🌧️ / 눈 ❄️ / 야간 🌙 등), `getTempDescriptor()`(매우 더움/더움/포근함/선선함/쌀쌀함/매우 추움) 추가. 도시 카드와 상세 페이지 양쪽에 재사용해 온도만이 아니라 "체감 뉘앙스"까지 한눈에 보이게 했습니다.
- **도시 카드 리디자인**: `지역명 · KR` eyebrow, 아이콘+도시명 헤더, 큰 기온, 상태+체감 배지 묶음 순으로 정보 위계를 정리했습니다.
- **상단 시계**: `오늘의 날씨` 헤더 아래 "2026년 8월 12일 수 오후 5시 · 업데이트" 형태로 현재 시각을 표시하고 1분마다 갱신합니다.

### 시/도별 날씨 지도 (과제 4 데모에 최초 추가했던 기능)

- `RegionKoreaMap.vue` 추가: 대한민국 17개 시/도를 각 지역의 대략적인 위/경도 비율로 배치한 단순화된 SVG 지도 컴포넌트. 실제 행정구역 경계선이 아닌, 클릭 가능한 지역 노드를 위/경도 축에 맞춰 배치한 형태입니다. 지역을 클릭(또는 키보드 Enter)하면 `select` 이벤트로 지역 id를 전달합니다.
- `RegionWeatherView.vue` 추가: `/regions` 경로의 새 페이지. 좌측에는 선택된 지역의 실시간 날씨 정보 패널, **우측에는 한반도 지도**를 배치했습니다(`region-page` flex 레이아웃). 지도에서 지역을 클릭할 때마다 Axios로 해당 지역 대표 도시의 OpenWeatherMap 데이터를 호출합니다.
- `src/data/regions.js` 추가: 17개 시/도의 이름, 지도 좌표(x, y), OpenWeatherMap 조회용 대표 도시(query)를 관리하는 데이터 모듈
- `WeatherHomeView.vue` / `WeatherDetailView.vue`의 Axios 응답 매핑에 `weatherId`, `icon` 필드를 추가로 저장해 테마 판별에 사용

### 탐색 탭에서 개별 시(市)까지 검색 + 소도시 날씨 조회 실패 버그 수정

- **개별 시 데이터 75곳 추가**: `src/data/cities.js` 신규. 기존에는 17개 시/도(광역 단위)만 검색·조회할 수 있었는데, 김천·나주·통영을 포함해 경기/강원/충청/전라/경상/제주의 자치시 75곳을 추가해 탐색 탭에서 총 92곳을 검색할 수 있습니다. `regions.js`의 `findRegionById()`가 시/도(regions)와 개별 시(cities)를 함께 조회하도록 통합되어, 대시보드·상세 페이지·즐겨찾기 등 기존 기능이 개별 시에 대해서도 그대로 동작합니다.
- **`ExploreView.vue` 검색 범위 확장**: 검색어가 없을 땐 기존처럼 17개 시/도만 보여주고(불필요한 API 호출 방지), 검색어를 입력하면 92곳 전체(시/도 + 개별 시)를 대상으로 찾습니다. 화면에 실제로 나타난 결과만 그때그때 날씨를 불러옵니다.
- **🐛 소도시 날씨 조회 404 버그 수정**: 통영 등 일부 도시를 추가했을 때 "날씨 정보를 불러오지 못했습니다" 오류가 발생했습니다. 원인은 OpenWeatherMap의 구형 도시명 검색(`q=Tongyeong,KR`)이 일부 소도시명을 인식하지 못해 `404 city not found`를 반환하기 때문이었습니다. OpenWeatherMap의 **Geocoding API**로 92개 지역의 정확한 위도/경도를 미리 조회해 `regions.js`/`cities.js`에 좌표로 저장해 두고, `weatherStore.js`의 날씨·예보 조회를 도시명(`q=`) 대신 좌표(`lat`/`lon`) 기반으로 바꿔 근본적으로 해결했습니다 — 좌표 조회는 이름 매칭과 달리 실패할 일이 없습니다.

### 대표 도시를 직접 선택 가능하도록 변경

- 대시보드 히어로 카드의 "대표 도시"가 항상 첫 번째 등록 도시(서울)로 고정되어 있던 것을 사용자가 원하는 도시로 바꿀 수 있게 했습니다.
- `cityListStore`에 `primaryId`(선택값) + `primaryRegionId`(선택값이 없거나 등록 목록에서 빠졌을 때 자동으로 첫 번째 등록 도시로 대체하는 계산된 값) 추가, `localStorage`에 별도 저장되어 새로고침해도 유지됩니다.
- 각 도시 카드 하단에 대표 도시가 아니면 `📌 대표로 설정` 버튼을, 대표 도시면 `📌 대표 도시` 배지를 표시합니다(`CityTile.vue`의 `isPrimary` prop / `set-primary` 이벤트).
- 대표로 지정한 도시를 "내 도시"에서 삭제하거나 "기본 도시 복원"을 누르면 자동으로 다음 등록 도시로 대체됩니다.

### 🐛 도시 카드의 ☆ 즐겨찾기 / ✕ 삭제 버튼이 안 눌리던 버그 수정

- **증상**: 대시보드 "내 도시" 카드의 별(☆ 즐겨찾기)·X(삭제) 버튼을 클릭하면 아무 반응이 없거나, 의도치 않게 상세 페이지로 이동해 버렸습니다.
- **원인**: 카드 맨 위의 `지역명 · KR` 라벨(`.tile-eyebrow`)에 준 `opacity: 0.65` 스타일이 CSS 스펙상 별도의 스태킹 컨텍스트를 만듭니다. 이 라벨이 DOM상 별/삭제 버튼보다 뒤에 있다 보니, `position: absolute`로 카드 우측 상단에 떠 있던 별·삭제 버튼 위를 (눈에는 안 보이지만) 라벨의 보이지 않는 영역이 덮어버려 클릭이 버튼 대신 카드 전체 클릭(상세 페이지 이동)으로 새는 문제였습니다.
- **수정**: `.tile-remove`, `.tile-favorite`에 `z-index: 2`를 명시해 항상 카드 콘텐츠보다 위에 오도록 고정했습니다. 실제 마우스 좌표 기준 클릭으로 별 토글·삭제·대표 도시 자동 대체까지 모두 재현 후 정상 동작을 확인했습니다.

### 🐛 시인성 개선 — "오늘의 날씨" 제목이 사실상 안 보이던 버그 수정

- **가장 큰 문제**: 대시보드/탐색/세계지도 페이지의 `<h1>` 제목(`.dash-h1`)이 배경색과 거의 구분되지 않는 짙은 남색(`#1a252f`, 명암비 약 1.2:1)으로 렌더링되고 있었습니다. 원인은 `weather.css`에 남아있던 범용 `h1 { color: #1a252f; }` 규칙 — 원래 라이트 테마(학습기록) 페이지용으로 만든 규칙인데, 전역 셀렉터라 다크 테마 페이지의 `<h1>`까지 함께 덮어썼습니다. `.app-container h1`이라는 더 구체적인 규칙이 이미 라이트 테마를 전담하고 있어서 이 전역 규칙은 완전히 죽은 코드였고, 삭제해도 라이트 테마엔 영향이 없습니다. 삭제 후 명암비 **1.2:1 → 16:1**로 개선.
- **비슷한 문제 하나 더**: 도시 상세 페이지와 대시보드 히어로 카드가 똑같이 `.hero-status` 클래스를 쓰다 보니, 대시보드 쪽에서 정의한 `color: var(--dash-text-muted)`가 상세 페이지에도 새어 들어가 있었습니다(날씨 테마색을 못 따라가고 항상 회색). 중복 정의를 하나로 합쳐 테마 색을 그대로 물려받도록 고쳤습니다.
- **전반적인 톤 조정**: `--dash-text-muted`를 조금 더 밝게(`#8b949e` → `#9aa4b1`), 카드의 지역명 라벨/메타 정보(습도·풍속)의 opacity를 올리고(0.65→0.8, 0.75→0.85), 체감 뉘앙스 배지(`더움`/`포근함` 등)의 배경을 반투명 흰색 대신 반투명 검정으로 바꿔서 밝은 테마(맑음/눈) 카드 위에서도 배지 경계가 또렷하게 보이도록 했습니다.

### 그 외

- `AssignmentSection.vue` 추가: 과제별 `제목 + 설명 + hr` 반복 마크업을 하나의 재사용 컴포넌트로 통합
- `configStore.js`(Pinia)로 섭씨/화씨 단위를 전역 상태로 관리 — 새 대시보드/상세 페이지와 학습 기록 데모가 동일한 스토어를 공유합니다
- `router/index.js`에 `NotFoundView` 캐치올 라우트 추가, 잘못된 주소는 새 메인 대시보드(`/`)로 안내
- `.dashboard-wrapper` 최대 너비를 600px → 720px로 확장 (지도 + 정보 패널 2단 레이아웃 공간 확보)

> 다음 계획: 지도에 지역별 날씨 아이콘 미리보기, 즐겨찾기 지역 순서 변경, 상세 페이지에 시간대별 예보 추가

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### 환경 변수 (OpenWeatherMap API 키)

이 프로젝트는 OpenWeatherMap API 키를 코드에 직접 넣지 않고 `.env`로 관리합니다. `.env`는 `.gitignore`에 등록되어 git에 올라가지 않습니다.

```sh
cp .env.example .env
# .env를 열어 VITE_OPENWEATHER_API_KEY 값을 본인의 OpenWeatherMap API 키로 교체
```

키 발급: [openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
