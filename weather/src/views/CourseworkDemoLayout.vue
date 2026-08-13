<script setup>
import AssignmentSection from '../components/weather/AssignmentSection.vue'
import UnitToggler from '../components/weather/UnitToggler.vue'
</script>

<template>
  <AssignmentSection
    title="⛅ 과제 4 데모: 라우터 + 스토어 + Axios 연동 (+ 시/도별 날씨 지도)"
    description="Vue Router로 화면 전환을, Pinia로 섭씨/화씨 단위를 전역 상태로, Axios로 OpenWeatherMap 실시간 데이터를 연동한 종합 실습 데모입니다."
  >
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/coursework/demo" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/coursework/demo/regions" class="nav-item">🗺️ 시/도별 지도</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/coursework/demo/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </AssignmentSection>
</template>
