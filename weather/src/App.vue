<script setup>
import UnitToggler from './components/weather/UnitToggler.vue'
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="site-brand-group">
        <RouterLink to="/" class="site-brand">☁️ SKALA Weather</RouterLink>
        <span class="site-author">울산 2반 김규빈 U041</span>
      </div>
      <nav class="site-nav">
        <RouterLink to="/" class="site-nav-item">대시보드</RouterLink>
        <RouterLink to="/explore" class="site-nav-item">탐색</RouterLink>
        <RouterLink to="/worldmap" class="site-nav-item">세계지도</RouterLink>
        <RouterLink to="/coursework" class="site-nav-item">학습기록</RouterLink>
        <UnitToggler />
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style>
@import '@/assets/weather.css';
@import '@/assets/dashboard.css';
</style>
