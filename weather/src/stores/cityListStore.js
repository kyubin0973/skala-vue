import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'skala-weather-my-cities'
const FAVORITES_KEY = 'skala-weather-favorites'
const PRIMARY_KEY = 'skala-weather-primary-city'
const DEFAULT_IDS = ['seoul', 'gyeonggi', 'busan']

function loadStoredList(key) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (error) {
    console.warn(`🟡 저장된 목록(${key})을 불러오지 못했습니다:`, error)
  }
  return null
}

function loadInitialIds() {
  return loadStoredList(STORAGE_KEY) ?? [...DEFAULT_IDS]
}

// 대시보드에 등록해 둔 "내 도시" 목록 + 즐겨찾기 + 대표 도시를 관리하고 localStorage에 저장하는 스토어
export const useCityListStore = defineStore('cityList', () => {
  const registeredIds = ref(loadInitialIds())
  const favoriteIds = ref(loadStoredList(FAVORITES_KEY) ?? [])
  // 사용자가 직접 고른 대표 도시. 아직 고르지 않았거나(null) 등록 목록에서 빠졌다면
  // primaryRegionId가 자동으로 registeredIds의 첫 번째 도시로 대신합니다.
  const primaryId = ref(localStorage.getItem(PRIMARY_KEY) || null)

  const primaryRegionId = computed(() => {
    if (primaryId.value && registeredIds.value.includes(primaryId.value)) {
      return primaryId.value
    }
    return registeredIds.value[0] ?? null
  })

  watch(
    registeredIds,
    (ids) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    },
    { deep: true },
  )
  watch(
    favoriteIds,
    (ids) => {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
    },
    { deep: true },
  )
  watch(primaryId, (id) => {
    if (id) localStorage.setItem(PRIMARY_KEY, id)
    else localStorage.removeItem(PRIMARY_KEY)
  })

  function addCity(id) {
    if (!registeredIds.value.includes(id)) {
      registeredIds.value.push(id)
    }
  }

  function removeCity(id) {
    registeredIds.value = registeredIds.value.filter((existing) => existing !== id)
    favoriteIds.value = favoriteIds.value.filter((existing) => existing !== id)
    if (primaryId.value === id) primaryId.value = null
  }

  function resetDefault() {
    registeredIds.value = [...DEFAULT_IDS]
    primaryId.value = null
  }

  function isFavorite(id) {
    return favoriteIds.value.includes(id)
  }

  function toggleFavorite(id) {
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter((existing) => existing !== id)
    } else {
      favoriteIds.value.push(id)
    }
  }

  function setPrimary(id) {
    primaryId.value = id
  }

  return {
    registeredIds,
    favoriteIds,
    primaryRegionId,
    addCity,
    removeCity,
    resetDefault,
    isFavorite,
    toggleFavorite,
    setPrimary,
  }
})
