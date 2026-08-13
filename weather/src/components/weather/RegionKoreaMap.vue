<script setup>
defineProps({
  regions: {
    type: Array,
    required: true,
  },
  selectedId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select'])
</script>

<template>
  <svg class="korea-map" viewBox="0 0 320 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="대한민국 시/도별 날씨 지도">
    <!-- 실제 행정구역 경계가 아닌, 지역을 한눈에 배치하기 위한 단순화된 반도 실루엣입니다 (남한 해안선 저해상도 근사) -->
    <path
      class="map-outline"
      d="M100,10 L145,6 L170,18 L195,42 L215,80 L235,125 L250,170 L265,210 L282,245 L300,275 L298,305 L278,330 L250,340 L225,328 L205,345 L175,352 L145,340 L115,355 L85,345 L55,360 L10,335 L2,300 L12,265 L0,225 L15,195 L2,165 L20,140 L5,110 L22,80 L8,50 L30,25 Z"
    />
    <ellipse class="map-outline" cx="60" cy="440" rx="38" ry="17" />

    <g
      v-for="region in regions"
      :key="region.id"
      class="region-node"
      :class="{ 'is-selected': region.id === selectedId }"
      tabindex="0"
      role="button"
      :aria-label="`${region.name} 날씨 보기`"
      @click="emit('select', region.id)"
      @keyup.enter="emit('select', region.id)"
    >
      <rect :x="region.x - 22" :y="region.y - 16" width="44" height="32" rx="8" />
      <text :x="region.x" :y="region.y">{{ region.short }}</text>
    </g>
  </svg>
</template>
