<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weatherStore'
import { useConfigStore } from '@/stores/configStore'
import { useCityListStore } from '@/stores/cityListStore'
import { findRegionById } from '@/data/regions'
import { weatherThemeClass, getWeatherEmoji, getTempDescriptor } from '@/utils/weatherTheme'

const route = useRoute()
const router = useRouter()
const weatherStore = useWeatherStore()
const configStore = useConfigStore()
const cityListStore = useCityListStore()

const region = computed(() => findRegionById(route.params.regionId))
const weather = computed(() => (region.value ? weatherStore.cache[region.value.id] : null))
const isLoading = computed(() => (region.value ? !!weatherStore.loadingIds[region.value.id] : false))

// 🟢 [신규] 5일 예보(정오 기준) — OpenWeatherMap 5 day / 3 hour forecast API
const forecast = computed(() => (region.value ? weatherStore.forecastCache[region.value.id] : null))
const isForecastLoading = computed(() => (region.value ? !!weatherStore.forecastLoadingIds[region.value.id] : false))

onMounted(() => {
  if (region.value) {
    weatherStore.fetchCity(region.value.id)
    weatherStore.fetchForecast(region.value.id)
  }
})

const formatWeekday = (dateStr) => new Date(`${dateStr}T12:00:00`).toLocaleDateString('ko-KR', { weekday: 'short' })

const convert = (celsius) => (configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius))

const displayTemp = computed(() => (weather.value ? convert(weather.value.temp) : 0))
const displayFeelsLike = computed(() => (weather.value ? convert(weather.value.feelsLike) : 0))

const themeClass = computed(() => {
  if (!weather.value) return ''
  return weatherThemeClass(weather.value.status, { weatherId: weather.value.weatherId, icon: weather.value.icon })
})
const emoji = computed(() => (weather.value ? getWeatherEmoji(weather.value.weatherId, weather.value.icon) : '⛅'))
const descriptor = computed(() => (weather.value ? getTempDescriptor(weather.value.temp) : ''))

const isRegistered = computed(() => region.value && cityListStore.registeredIds.includes(region.value.id))
const toggleRegistered = () => {
  if (!region.value) return
  if (isRegistered.value) cityListStore.removeCity(region.value.id)
  else cityListStore.addCity(region.value.id)
}
</script>

<template>
  <div class="city-detail">
    <button class="back-link" @click="router.push('/')">← 대시보드로</button>

    <div v-if="!region" class="detail-hero">
      <p>존재하지 않는 지역입니다.</p>
    </div>

    <template v-else>
      <div class="detail-hero" :class="themeClass">
        <p class="hero-region">📍 {{ region.name }}</p>

        <p v-if="isLoading" class="hero-loading">🔄 실시간 데이터를 불러오는 중...</p>
        <template v-else-if="weather">
          <div class="detail-hero-icon">{{ emoji }}</div>
          <p class="hero-temp">{{ displayTemp }}{{ configStore.unitSymbol }}</p>
          <p class="hero-status">{{ weather.status }} · 체감 {{ displayFeelsLike }}{{ configStore.unitSymbol }}</p>
          <span class="tile-descriptor">{{ descriptor }}</span>
        </template>
        <p v-else class="hero-error">날씨 정보를 불러오지 못했습니다.</p>
      </div>

      <div v-if="weather" class="detail-metrics">
        <div class="metric-tile">
          <span>💧 습도</span>
          <strong>{{ weather.humidity }}%</strong>
        </div>
        <div class="metric-tile">
          <span>🍃 풍속</span>
          <strong>{{ weather.wind }}m/s</strong>
        </div>
      </div>

      <button class="toggle-register-btn" @click="toggleRegistered">
        {{ isRegistered ? '✓ 내 도시에 등록됨 (삭제)' : '+ 내 도시에 추가' }}
      </button>

      <section class="hourly-section">
        <p class="eyebrow">HOURLY</p>
        <h2 class="forecast-title">시간별 강수</h2>

        <p v-if="isForecastLoading" class="dash-sub">🔄 예보를 불러오는 중...</p>
        <div v-else-if="forecast && forecast.hourly.length" class="hourly-list">
          <div v-for="hour in forecast.hourly" :key="hour.date + hour.time" class="hourly-row">
            <span class="hourly-time">{{ hour.time }}</span>
            <span class="hourly-emoji">{{ getWeatherEmoji(hour.weatherId, hour.icon) }}</span>
            <span class="hourly-temp">{{ convert(hour.temp) }}°</span>
            <span class="hourly-pop">💧 강수확률 {{ hour.pop }}%</span>
            <span class="hourly-rain">{{ hour.precipitation > 0 ? `☔ ${hour.precipitation.toFixed(1)}mm` : '-' }}</span>
          </div>
        </div>
        <p v-else class="dash-sub">예보 정보를 불러오지 못했습니다.</p>
      </section>

      <section class="forecast-section">
        <p class="eyebrow">5-DAY FORECAST</p>
        <h2 class="forecast-title">앞으로의 날씨</h2>

        <p v-if="isForecastLoading" class="dash-sub">🔄 예보를 불러오는 중...</p>
        <div v-else-if="forecast && forecast.daily.length" class="forecast-strip">
          <div v-for="day in forecast.daily" :key="day.date" class="forecast-day">
            <p class="forecast-weekday">{{ formatWeekday(day.date) }}</p>
            <p class="forecast-emoji">{{ getWeatherEmoji(day.weatherId, day.icon) }}</p>
            <p class="forecast-temp">{{ convert(day.temp) }}{{ configStore.unitSymbol }}</p>
          </div>
        </div>
        <p v-else class="dash-sub">예보 정보를 불러오지 못했습니다.</p>
      </section>
    </template>
  </div>
</template>
