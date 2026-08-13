<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCityListStore } from '@/stores/cityListStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { useConfigStore } from '@/stores/configStore'
import { regions, findRegionById } from '@/data/regions'
import { weatherThemeClass, getWeatherEmoji } from '@/utils/weatherTheme'
import RegionKoreaMap from '../components/weather/RegionKoreaMap.vue'
import CityTile from '../components/weather/CityTile.vue'

const router = useRouter()
const cityListStore = useCityListStore()
const weatherStore = useWeatherStore()
const configStore = useConfigStore()

const searchQuery = ref('')
const selectedMapId = ref(cityListStore.registeredIds[0] ?? 'seoul')
const sortMode = ref('registered') // registered | name | temp
const favoritesOnly = ref(false)
const isRefreshing = ref(false)

// 헤더에 표시할 "오늘 · 지금 시각" — 1분마다 갱신
const now = ref(new Date())
let clockTimer = null
onMounted(() => {
  clockTimer = setInterval(() => {
    now.value = new Date()
  }, 60_000)
})
onUnmounted(() => clearInterval(clockTimer))
const formattedNow = computed(() =>
  now.value.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }),
)

const registeredRegions = computed(() => cityListStore.registeredIds.map((id) => findRegionById(id)).filter(Boolean))

// 즐겨찾기 필터 + 정렬(등록순/이름순/기온순)을 적용한 실제 카드 목록
const displayedRegions = computed(() => {
  let list = registeredRegions.value
  if (favoritesOnly.value) {
    list = list.filter((region) => cityListStore.isFavorite(region.id))
  }
  if (sortMode.value === 'name') {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  } else if (sortMode.value === 'temp') {
    list = [...list].sort((a, b) => {
      const tempA = weatherStore.cache[a.id]?.temp ?? -999
      const tempB = weatherStore.cache[b.id]?.temp ?? -999
      return tempB - tempA
    })
  }
  return list
})

const searchSuggestions = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return []
  return regions.filter((region) => !cityListStore.registeredIds.includes(region.id) && (region.name.includes(query) || region.short.includes(query)))
})

const loadedWeatherList = computed(() =>
  registeredRegions.value.map((region) => weatherStore.cache[region.id]).filter((weather) => !!weather),
)

const averageTemp = computed(() => {
  if (!loadedWeatherList.value.length) return 0
  const sum = loadedWeatherList.value.reduce((acc, weather) => acc + weather.temp, 0)
  return Math.round(sum / loadedWeatherList.value.length)
})

const hottestRegionShort = computed(() => {
  if (!loadedWeatherList.value.length) return '-'
  let hottestIndex = 0
  loadedWeatherList.value.forEach((weather, index) => {
    if (weather.temp > loadedWeatherList.value[hottestIndex].temp) hottestIndex = index
  })
  return registeredRegions.value[hottestIndex]?.short ?? '-'
})

// 대표 도시 = 사용자가 직접 고른 도시(없으면 등록한 도시 중 첫 번째로 자동 대체)
const heroRegion = computed(() => findRegionById(cityListStore.primaryRegionId))
const heroWeather = computed(() => (heroRegion.value ? weatherStore.cache[heroRegion.value.id] : null))
const heroTemp = computed(() => {
  if (!heroWeather.value) return null
  const raw = heroWeather.value.temp
  return configStore.unit === 'fahrenheit' ? Math.round((raw * 9) / 5 + 32) : Math.round(raw)
})
const heroFeelsLike = computed(() => {
  if (!heroWeather.value) return null
  const raw = heroWeather.value.feelsLike
  return configStore.unit === 'fahrenheit' ? Math.round((raw * 9) / 5 + 32) : Math.round(raw)
})
const heroEmoji = computed(() => (heroWeather.value ? getWeatherEmoji(heroWeather.value.weatherId, heroWeather.value.icon) : '⛅'))
const heroThemeClass = computed(() => (heroWeather.value ? weatherThemeClass(heroWeather.value.status, { weatherId: heroWeather.value.weatherId, icon: heroWeather.value.icon }) : ''))

const selectedMapRegion = computed(() => findRegionById(selectedMapId.value))
const selectedMapWeather = computed(() => weatherStore.cache[selectedMapId.value])
const isSelectedRegistered = computed(() => cityListStore.registeredIds.includes(selectedMapId.value))

const addCity = (id) => {
  cityListStore.addCity(id)
  weatherStore.fetchCity(id)
  searchQuery.value = ''
}
const removeCity = (id) => cityListStore.removeCity(id)
const openDetail = (id) => router.push(`/city/${id}`)
const selectMapRegion = (id) => {
  selectedMapId.value = id
  weatherStore.fetchCity(id)
}

const refreshAll = async () => {
  isRefreshing.value = true
  await Promise.all(registeredRegions.value.map((region) => weatherStore.fetchCity(region.id, { force: true })))
  isRefreshing.value = false
}
const restoreDefault = () => {
  cityListStore.resetDefault()
  registeredRegions.value.forEach((region) => weatherStore.fetchCity(region.id))
}

onMounted(() => {
  registeredRegions.value.forEach((region) => weatherStore.fetchCity(region.id))
  weatherStore.fetchCity(selectedMapId.value)
})
</script>

<template>
  <div class="dash">
    <header class="dash-topbar">
      <p class="eyebrow">WEATHER · OVERVIEW</p>
      <div class="dash-topbar-row">
        <div>
          <h1 class="dash-h1">오늘의 날씨</h1>
          <p class="dash-sub">{{ formattedNow }} 업데이트</p>
        </div>
      </div>
    </header>

    <div class="dash-body">
      <div class="dash-main">
        <div class="hero-row">
          <div class="hero-card" :class="heroThemeClass">
            <template v-if="heroRegion">
              <p class="hero-eyebrow">대표 도시 · {{ heroRegion.name }}</p>
              <div class="hero-main">
                <div>
                  <p class="hero-city">{{ heroRegion.short }}</p>
                  <p class="hero-status">{{ heroWeather?.status ?? '불러오는 중...' }}</p>
                </div>
                <div class="hero-icon">{{ heroEmoji }}</div>
              </div>
              <p class="hero-temp" v-if="heroWeather">{{ heroTemp }}<span class="hero-unit">{{ configStore.unitSymbol }}</span></p>
              <p class="hero-temp hero-temp--loading" v-else>--</p>

              <div v-if="heroWeather" class="hero-metrics">
                <span>체감 {{ heroFeelsLike }}{{ configStore.unitSymbol }}</span>
                <span class="dot">·</span>
                <span>습도 {{ heroWeather.humidity }}%</span>
                <span class="dot">·</span>
                <span>풍속 {{ heroWeather.wind }}m/s</span>
              </div>

              <button class="hero-detail-btn" @click="openDetail(heroRegion.id)">상세 날씨 →</button>
            </template>
            <p v-else class="hero-empty">등록된 도시가 없습니다. 아래에서 도시를 추가해 보세요.</p>
          </div>

          <aside class="overview-panel">
            <div class="overview-head">
              <p class="eyebrow">OVERVIEW</p>
              <span class="live-pill"><span class="live-dot"></span>LIVE</span>
            </div>
            <h2 class="overview-title">한눈에 보기</h2>
            <div class="overview-grid">
              <div class="overview-cell">
                <span>등록 도시</span>
                <strong>{{ registeredRegions.length }}</strong>
              </div>
              <div class="overview-cell">
                <span>평균 기온</span>
                <strong>{{ averageTemp }}{{ configStore.unitSymbol }}</strong>
              </div>
              <div class="overview-cell">
                <span>가장 더운 지역</span>
                <strong>{{ hottestRegionShort }}</strong>
              </div>
              <div class="overview-cell">
                <span>전체 시/도</span>
                <strong>{{ regions.length }}</strong>
              </div>
            </div>
          </aside>
        </div>

        <section class="cities-section">
          <div class="cities-head">
            <div>
              <p class="eyebrow">CITIES</p>
              <h2 class="cities-title">내 도시</h2>
              <p class="dash-sub">등록한 도시의 실시간 날씨를 검색하고 정렬할 수 있습니다.</p>
            </div>
            <div class="cities-actions">
              <button class="ghost-btn" :disabled="isRefreshing" @click="refreshAll">{{ isRefreshing ? '🔄 갱신 중...' : '🔄 새로고침' }}</button>
              <button class="ghost-btn" @click="restoreDefault">기본 도시 복원</button>
            </div>
          </div>

          <div class="cities-toolbar">
            <label class="sort-select">
              정렬
              <select v-model="sortMode">
                <option value="registered">등록순</option>
                <option value="name">이름순</option>
                <option value="temp">기온순</option>
              </select>
            </label>
            <button class="filter-toggle" :class="{ 'is-active': favoritesOnly }" @click="favoritesOnly = !favoritesOnly">
              {{ favoritesOnly ? '★' : '☆' }} 즐겨찾기만
            </button>
            <span class="cities-count">{{ displayedRegions.length }} / {{ registeredRegions.length }}개 도시 표시</span>
          </div>

          <div class="dash-search">
            <input v-model="searchQuery" type="text" placeholder="추가할 시/도 검색 (예: 대구, 전남, 제주)" />
            <ul v-if="searchSuggestions.length" class="dash-suggestions">
              <li v-for="region in searchSuggestions" :key="region.id" @click="addCity(region.id)">+ {{ region.name }}</li>
            </ul>
          </div>

          <div class="dash-cities">
            <CityTile
              v-for="region in displayedRegions"
              :key="region.id"
              :region="region"
              :weather="weatherStore.cache[region.id]"
              :loading="!!weatherStore.loadingIds[region.id]"
              :is-favorite="cityListStore.isFavorite(region.id)"
              :is-primary="region.id === cityListStore.primaryRegionId"
              @open="openDetail(region.id)"
              @remove="removeCity(region.id)"
              @toggle-favorite="cityListStore.toggleFavorite(region.id)"
              @set-primary="cityListStore.setPrimary(region.id)"
            />
            <p v-if="!registeredRegions.length" class="dash-empty">등록된 도시가 없습니다. 위 검색창이나 오른쪽 지도에서 지역을 추가해 보세요.</p>
            <p v-else-if="!displayedRegions.length" class="dash-empty">즐겨찾기한 도시가 없습니다. 카드의 ☆를 눌러 즐겨찾기에 추가해 보세요.</p>
          </div>
        </section>
      </div>

      <aside class="dash-map-panel">
        <p class="eyebrow">REGIONS</p>
        <h2 class="map-title">시/도별 지도</h2>
        <RegionKoreaMap :regions="regions" :selected-id="selectedMapId" @select="selectMapRegion" />

        <div v-if="selectedMapRegion" class="dash-map-preview">
          <p class="preview-name">📍 {{ selectedMapRegion.name }}</p>
          <p v-if="selectedMapWeather" class="preview-weather">{{ Math.round(selectedMapWeather.temp) }}℃ · {{ selectedMapWeather.status }}</p>
          <p v-else class="preview-weather">🔄 불러오는 중...</p>

          <button v-if="!isSelectedRegistered" class="preview-btn" @click="addCity(selectedMapId)">+ 내 도시에 추가</button>
          <button v-else class="preview-btn preview-btn--ghost" @click="openDetail(selectedMapId)">상세보기 →</button>
        </div>
      </aside>
    </div>
  </div>
</template>
