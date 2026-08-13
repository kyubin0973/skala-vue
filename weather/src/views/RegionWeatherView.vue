<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useConfigStore } from '@/stores/configStore'
import { regions, findRegionById } from '@/data/regions'
import { weatherThemeClass } from '@/utils/weatherTheme'
import RegionKoreaMap from '../components/weather/RegionKoreaMap.vue'

const configStore = useConfigStore()

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const selectedId = ref('seoul')
const weatherData = ref(null)
const isLoading = ref(false)
const errorMsg = ref('')

const selectedRegion = computed(() => findRegionById(selectedId.value))

const fetchWeather = async (region) => {
  if (!region) return
  isLoading.value = true
  errorMsg.value = ''
  try {
    const response = await axios.get(`${BASE_URL}?q=${region.query},KR&appid=${API_KEY}&units=metric&lang=kr`)
    const raw = response.data
    weatherData.value = {
      temp: raw.main.temp,
      feelsLike: raw.main.feels_like,
      status: raw.weather[0].description,
      weatherId: raw.weather[0].id,
      icon: raw.weather[0].icon,
      humidity: `${raw.main.humidity}%`,
      wind: `${raw.wind.speed}m/s`,
    }
  } catch (error) {
    console.error('🔴 시/도별 날씨 연동 실패:', error)
    weatherData.value = null
    errorMsg.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
  } finally {
    isLoading.value = false
  }
}

const selectRegion = (id) => {
  selectedId.value = id
}

watch(selectedId, () => fetchWeather(selectedRegion.value))
onMounted(() => fetchWeather(selectedRegion.value))

const displayTemp = computed(() => {
  if (!weatherData.value) return 0
  const rawTemp = weatherData.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})

const displayFeelsLike = computed(() => {
  if (!weatherData.value) return 0
  const rawTemp = weatherData.value.feelsLike
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})

// 🎨 맑음(하늘색) / 흐림·구름(회색) / 비(짙은 회청색) / 눈(아이스블루) / 야간(어두운 남색)
const themeClass = computed(() => {
  if (!weatherData.value) return ''
  return weatherThemeClass(weatherData.value.status, {
    weatherId: weatherData.value.weatherId,
    icon: weatherData.value.icon,
  })
})
</script>

<template>
  <div class="region-page">
    <div class="region-info-panel" :class="themeClass">
      <p>📍 시/도를 선택하면 실시간 날씨를 보여줍니다.</p>

      <div v-if="isLoading">🔄 불러오는 중...</div>

      <template v-else-if="weatherData">
        <div class="region-name">{{ selectedRegion?.name }}</div>
        <div class="region-temp">{{ displayTemp }}{{ configStore.unitSymbol }}</div>
        <p>{{ weatherData.status }} · 체감 {{ displayFeelsLike }}{{ configStore.unitSymbol }}</p>
        <p>💧 습도 {{ weatherData.humidity }} · 🍃 풍속 {{ weatherData.wind }}</p>
      </template>

      <p v-else style="color: #e74c3c">{{ errorMsg }}</p>
    </div>

    <div class="region-map-panel">
      <RegionKoreaMap :regions="regions" :selected-id="selectedId" @select="selectRegion" />
      <p class="map-hint">🗺️ 지도를 눌러 시/도별 실시간 날씨를 확인해 보세요.</p>
    </div>
  </div>
</template>

<style scoped>
.map-hint {
  margin-top: 8px;
  text-align: center;
  font-size: 13px;
  color: #7f8c8d;
}
</style>
