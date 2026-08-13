<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { regions } from '@/data/regions'
import { cities } from '@/data/cities'
import { useCityListStore } from '@/stores/cityListStore'
import { useWeatherStore } from '@/stores/weatherStore'
import CityTile from '../components/weather/CityTile.vue'

const router = useRouter()
const cityListStore = useCityListStore()
const weatherStore = useWeatherStore()

// 17개 시/도 + 개별 시(김천, 나주, 통영 등)를 모두 검색 대상으로 합칩니다.
const allLocations = [...regions, ...cities]

const query = ref('')

// 검색어가 없을 땐 기본 17개 시/도만 보여주고(불필요한 API 호출 방지),
// 검색어가 있으면 시/도 + 개별 시 전체(약 90여 곳)를 대상으로 찾습니다.
const filteredResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return regions
  return allLocations.filter((location) => location.name.toLowerCase().includes(q) || location.short.toLowerCase().includes(q) || location.query.toLowerCase().includes(q))
})

// 검색 결과로 화면에 나타난 곳들의 날씨만 그때그때 불러옵니다.
watch(
  filteredResults,
  (list) => {
    list.forEach((location) => weatherStore.fetchCity(location.id))
  },
  { immediate: true },
)

const addCity = (id) => {
  cityListStore.addCity(id)
  weatherStore.fetchCity(id)
}
const openDetail = (id) => router.push(`/city/${id}`)
</script>

<template>
  <div class="dash">
    <header class="dash-topbar">
      <p class="eyebrow">EXPLORE</p>
      <div class="dash-topbar-row">
        <div>
          <h1 class="dash-h1">도시 탐색</h1>
          <p class="dash-sub">17개 시/도는 물론 김천·나주·통영 같은 개별 시까지 검색해 실시간 날씨를 확인해 보세요.</p>
        </div>
      </div>
    </header>

    <div class="explore-search">
      <input v-model="query" type="text" placeholder="🔍 시/도 또는 개별 시로 검색 (예: 김천, 나주, 통영, 전주)" autofocus />
    </div>

    <p class="cities-count explore-count">{{ filteredResults.length }} / {{ query ? allLocations.length : regions.length }}개 지역 표시</p>

    <div class="dash-cities explore-grid">
      <CityTile
        v-for="location in filteredResults"
        :key="location.id"
        mode="explore"
        :region="location"
        :weather="weatherStore.cache[location.id]"
        :loading="!!weatherStore.loadingIds[location.id]"
        :is-registered="cityListStore.registeredIds.includes(location.id)"
        @open="openDetail(location.id)"
        @add="addCity(location.id)"
      />
      <p v-if="!filteredResults.length" class="dash-empty">"{{ query }}"와(과) 일치하는 지역이 없습니다.</p>
    </div>
  </div>
</template>
