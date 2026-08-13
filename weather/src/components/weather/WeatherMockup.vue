<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 29, status: '맑음' },
  { id: 'city_02', name: '부산', temp: 27, status: '흐림' },
  { id: 'city_03', name: '대구', temp: 31, status: '비' },
  { id: 'city_04', name: '광주', temp: 26, status: '눈' },
  { id: 'city_05', name: '대전', temp: 24, status: '맑음' },
  { id: 'city_06', name: '울산', temp: 23, status: '흐림' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 날씨는 *${status}* 입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>도시 검색</h3>
      <input type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)" placeholder="검색할 도시 이름을 입력하세요." />
      <p>
        검색 중인 도시 : <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h3>지역별 날씨 현황</h3>

      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="showDetail(item.name, item.status)"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 온도 : {{ item.temp }}°C</p>

        <span v-if="item.temp >= 27" class="badge hot">🔥 더움 (27도 이상)</span>
        <span v-else class="badge cool">❄️ 시원함 (27도 이하)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>
