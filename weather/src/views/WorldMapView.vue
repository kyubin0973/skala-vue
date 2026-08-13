<script setup>
import { ref, computed } from 'vue'

// Ventusky embed(https://embed.ventusky.com/)는 p(위치;경도;줌), l(레이어) 쿼리 파라미터로
// 지도 상태를 제어하는 공식 iframe 임베드 엔드포인트입니다.
const layers = [
  { id: 'wind', label: '바람' },
  { id: 'temperature-2m', label: '기온' },
  { id: 'rain-3h', label: '강수' },
  { id: 'clouds-total', label: '구름' },
  { id: 'gust', label: '강풍' },
]

const spots = [
  { id: 'world', label: '세계 전체', lat: 20, lon: 10, zoom: 2 },
  { id: 'korea', label: '대한민국', lat: 36.5, lon: 127.8, zoom: 6 },
  { id: 'asia', label: '아시아', lat: 34, lon: 100, zoom: 3 },
  { id: 'europe', label: '유럽', lat: 50, lon: 10, zoom: 4 },
  { id: 'namerica', label: '북미', lat: 40, lon: -100, zoom: 3 },
]

const activeLayer = ref('wind')
const activeSpot = ref(spots[1]) // 기본은 대한민국

const mapSrc = computed(() => `https://embed.ventusky.com/?p=${activeSpot.value.lat};${activeSpot.value.lon};${activeSpot.value.zoom}&l=${activeLayer.value}`)
</script>

<template>
  <div class="dash">
    <header class="dash-topbar">
      <p class="eyebrow">WORLD</p>
      <div class="dash-topbar-row">
        <div>
          <h1 class="dash-h1">세계 날씨 지도</h1>
          <p class="dash-sub">Ventusky 실시간 기상 지도로 전 세계 날씨를 살펴보세요.</p>
        </div>
      </div>
    </header>

    <div class="worldmap-controls">
      <div class="worldmap-control-group">
        <span class="worldmap-control-label">레이어</span>
        <button v-for="layer in layers" :key="layer.id" class="filter-toggle" :class="{ 'is-active': activeLayer === layer.id }" @click="activeLayer = layer.id">
          {{ layer.label }}
        </button>
      </div>
      <div class="worldmap-control-group">
        <span class="worldmap-control-label">지역</span>
        <button v-for="spot in spots" :key="spot.id" class="filter-toggle" :class="{ 'is-active': activeSpot.id === spot.id }" @click="activeSpot = spot">
          {{ spot.label }}
        </button>
      </div>
    </div>

    <div class="worldmap-frame-wrap">
      <iframe :src="mapSrc" class="worldmap-frame" title="Ventusky 세계 날씨 지도" loading="lazy" allowfullscreen></iframe>
    </div>

    <p class="worldmap-credit">
      지도 제공: <a href="https://www.ventusky.com/" target="_blank" rel="noopener noreferrer">Ventusky</a>
    </p>
  </div>
</template>
