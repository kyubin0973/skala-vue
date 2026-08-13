import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { findRegionById } from '@/data/regions'

// .env(로컬 전용, git 미포함)의 VITE_OPENWEATHER_API_KEY를 사용합니다. .env.example 참고
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

// 지역(regionId)별 실시간 날씨를 한 번만 불러와 캐싱해서
// 대시보드 카드 / 상세 페이지 / 지도 패널이 같은 데이터를 공유하도록 하는 스토어
export const useWeatherStore = defineStore('weather', () => {
  const cache = reactive({})
  const loadingIds = reactive({})
  const forecastCache = reactive({})
  const forecastLoadingIds = reactive({})

  async function fetchCity(regionId, { force = false } = {}) {
    if (!regionId) return null
    if (cache[regionId] && !force) return cache[regionId]

    const region = findRegionById(regionId)
    if (!region) return null

    loadingIds[regionId] = true
    try {
      // 🟡 도시 이름(q=)으로 조회하면 일부 소도시(예: 통영)가 OpenWeatherMap 구형 지오코딩에서
      // "city not found"로 실패하는 경우가 있어, 미리 지오코딩해 둔 위/경도(lat/lon)로 직접 조회합니다.
      const response = await axios.get(`${BASE_URL}?lat=${region.lat}&lon=${region.lon}&appid=${API_KEY}&units=metric&lang=kr`)
      const raw = response.data
      cache[regionId] = {
        temp: raw.main.temp,
        feelsLike: raw.main.feels_like,
        status: raw.weather[0].description,
        weatherId: raw.weather[0].id,
        icon: raw.weather[0].icon,
        humidity: raw.main.humidity,
        wind: raw.wind.speed,
      }
    } catch (error) {
      console.error(`🔴 ${region.name} 날씨 연동 실패:`, error)
      cache[regionId] = null
    } finally {
      loadingIds[regionId] = false
    }
    return cache[regionId]
  }

  // 🟢 OpenWeatherMap 5일/3시간 예보 API 하나로 "5일 일별 예보"와 "24시간 시간별 강수" 두 가지를 함께 뽑아냅니다.
  async function fetchForecast(regionId, { force = false } = {}) {
    if (!regionId) return null
    if (forecastCache[regionId] && !force) return forecastCache[regionId]

    const region = findRegionById(regionId)
    if (!region) return null

    forecastLoadingIds[regionId] = true
    try {
      const response = await axios.get(`${FORECAST_URL}?lat=${region.lat}&lon=${region.lon}&appid=${API_KEY}&units=metric&lang=kr`)
      const list = response.data.list

      const daily = list
        .filter((entry) => entry.dt_txt.includes('12:00:00'))
        .slice(0, 5)
        .map((entry) => ({
          date: entry.dt_txt.slice(0, 10),
          temp: entry.main.temp,
          status: entry.weather[0].description,
          weatherId: entry.weather[0].id,
          icon: entry.weather[0].icon,
        }))

      // 🟢 [신규] 3시간 간격 데이터 중 앞으로 24시간(8칸)을 시간별 강수확률(pop) · 강수량(rain/snow)과 함께 저장
      const hourly = list.slice(0, 8).map((entry) => ({
        time: entry.dt_txt.slice(11, 16),
        date: entry.dt_txt.slice(0, 10),
        temp: entry.main.temp,
        pop: Math.round((entry.pop ?? 0) * 100),
        precipitation: (entry.rain?.['3h'] ?? 0) + (entry.snow?.['3h'] ?? 0),
        status: entry.weather[0].description,
        weatherId: entry.weather[0].id,
        icon: entry.weather[0].icon,
      }))

      forecastCache[regionId] = { daily, hourly }
    } catch (error) {
      console.error(`🔴 ${region.name} 예보 연동 실패:`, error)
      forecastCache[regionId] = { daily: [], hourly: [] }
    } finally {
      forecastLoadingIds[regionId] = false
    }
    return forecastCache[regionId]
  }

  return { cache, loadingIds, fetchCity, forecastCache, forecastLoadingIds, fetchForecast }
})
