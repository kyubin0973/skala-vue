import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 🌟 메인 서비스: 등록 도시 대시보드 + 시/도별 날씨 지도
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/city/:regionId',
      name: 'CityDetail',
      component: () => import('../views/CityDetailView.vue'),
    },
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('../views/ExploreView.vue'),
    },
    {
      path: '/worldmap',
      name: 'WorldMap',
      component: () => import('../views/WorldMapView.vue'),
    },

    // 📚 학습 기록: 과제 1~4 실습 아카이브
    {
      path: '/coursework',
      name: 'Coursework',
      component: () => import('../views/CourseworkView.vue'),
    },
    {
      path: '/coursework/demo',
      component: () => import('../views/CourseworkDemoLayout.vue'),
      children: [
        {
          path: '',
          name: 'WeatherHome',
          component: () => import('../views/WeatherHomeView.vue'),
        },
        {
          path: 'about',
          name: 'WeatherAbout',
          component: () => import('../views/WeatherAboutView.vue'),
        },
        {
          path: 'regions',
          name: 'RegionMap',
          component: () => import('../views/RegionWeatherView.vue'),
        },
        {
          path: 'weather/:cityId',
          name: 'WeatherDetail',
          component: () => import('../views/WeatherDetailView.vue'),
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
