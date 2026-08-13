<script setup>
import { RouterLink } from 'vue-router'
import AssignmentSection from '../components/weather/AssignmentSection.vue'
import WeatherMockup from '../components/weather/WeatherMockup.vue'
import WeatherComposition from '../components/weather/WeatherComposition.vue'
import WeatherParent from '../components/weather/WeatherParent.vue'

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <nav class="toc-nav">
    <a href="#assignment-1" class="toc-item" @click.prevent="scrollToSection('assignment-1')">과제1</a>
    <a href="#assignment-2" class="toc-item" @click.prevent="scrollToSection('assignment-2')">과제2</a>
    <a href="#assignment-3" class="toc-item" @click.prevent="scrollToSection('assignment-3')">과제3</a>
    <a href="#assignment-4" class="toc-item" @click.prevent="scrollToSection('assignment-4')">과제4</a>
  </nav>

  <AssignmentSection id="assignment-1" title="⛅ 과제 1: 날씨 (Mockup)" description="ref로 정적 목데이터를 선언하고 v-for / v-if로 목록을 화면에 그려보는 기초 실습입니다.">
    <WeatherMockup />
  </AssignmentSection>

  <AssignmentSection
    id="assignment-2"
    title="⛅ 과제 2: 날씨 (컴포지션)"
    description="computed로 실시간 검색 필터링을, watch / watchEffect로 상태 변화 추적을 다루는 Composition API 실습입니다."
  >
    <WeatherComposition />
  </AssignmentSection>

  <AssignmentSection
    id="assignment-3"
    title="⛅ 과제 3: 날씨 (컴포넌트 분리)"
    description="props / emit을 기준으로 BaseDashboardCard, SearchBar, WeatherCard 컴포넌트를 분리해 재사용 가능한 구조로 리팩터링한 실습입니다."
  >
    <WeatherParent />
  </AssignmentSection>

  <AssignmentSection
    id="assignment-4"
    title="⛅ 과제 4: 라우터 + 스토어 + Axios 연동"
    description="Vue Router로 화면 전환을, Pinia로 섭씨/화씨 단위를 전역 상태로, Axios로 OpenWeatherMap 실시간 데이터를 연동한 종합 실습입니다. 여기서 익힌 것들을 조합해 실제 서비스인 메인 대시보드를 만들었습니다."
  >
    <RouterLink to="/coursework/demo" class="demo-link-card">
      🔗 과제 4 라우터 데모 열어보기 (검색 · 시/도 지도 · 상세보기 · 단위 전환)
    </RouterLink>
  </AssignmentSection>
</template>

<style scoped>
.demo-link-card {
  display: block;
  text-align: center;
  padding: 16px;
  background: #eef6ff;
  border: 1px solid #b8dcff;
  border-radius: 8px;
  color: #1c6fd8;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s ease;
}
.demo-link-card:hover {
  background: #dcecff;
}
</style>
