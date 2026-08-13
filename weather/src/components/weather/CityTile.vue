<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { weatherThemeClass, getWeatherEmoji, getTempDescriptor } from '@/utils/weatherTheme'

const props = defineProps({
  region: {
    type: Object,
    required: true,
  },
  weather: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  // 'manage' = 대시보드의 "내 도시" 카드(삭제/즐겨찾기), 'explore' = 탐색 탭의 검색 결과 카드(추가/등록됨)
  mode: {
    type: String,
    default: 'manage',
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['open', 'remove', 'toggle-favorite', 'add', 'set-primary'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  if (!props.weather) return null
  const raw = props.weather.temp
  return configStore.unit === 'fahrenheit' ? Math.round((raw * 9) / 5 + 32) : Math.round(raw)
})

const themeClass = computed(() => {
  if (!props.weather) return ''
  return weatherThemeClass(props.weather.status, {
    weatherId: props.weather.weatherId,
    icon: props.weather.icon,
  })
})

const emoji = computed(() => (props.weather ? getWeatherEmoji(props.weather.weatherId, props.weather.icon) : '⛅'))
const descriptor = computed(() => (props.weather ? getTempDescriptor(props.weather.temp) : ''))
</script>

<template>
  <div class="city-tile" :class="themeClass" @click="emit('open')">
    <template v-if="mode === 'manage'">
      <button class="tile-remove" title="내 도시에서 삭제" @click.stop="emit('remove')">✕</button>
      <button class="tile-favorite" :class="{ 'is-active': isFavorite }" title="즐겨찾기" @click.stop="emit('toggle-favorite')">
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </template>

    <p class="tile-eyebrow">{{ region.name }} · KR</p>

    <p v-if="loading" class="tile-loading">🔄 불러오는 중...</p>
    <template v-else-if="weather">
      <div class="tile-head">
        <p class="tile-region">📍 {{ region.short }}</p>
        <span class="tile-emoji">{{ emoji }}</span>
      </div>
      <p class="tile-temp">{{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <div class="tile-status-row">
        <span class="tile-status">{{ weather.status }}</span>
        <span class="tile-descriptor">{{ descriptor }}</span>
      </div>
      <p class="tile-meta">💧 {{ weather.humidity }}% · 🍃 {{ weather.wind }}m/s</p>
    </template>
    <p v-else class="tile-error">날씨 정보를 불러오지 못했습니다.</p>

    <div v-if="mode === 'manage'" class="tile-primary-row">
      <span v-if="isPrimary" class="tile-primary-badge">📌 대표 도시</span>
      <button v-else class="tile-primary-btn" @click.stop="emit('set-primary')">📌 대표로 설정</button>
    </div>

    <div v-if="mode === 'explore'" class="tile-explore-action">
      <span v-if="isRegistered" class="explore-registered-badge">✓ 등록됨</span>
      <button v-else class="explore-add-btn" @click.stop="emit('add')">+ 내 도시에 추가</button>
    </div>
  </div>
</template>
