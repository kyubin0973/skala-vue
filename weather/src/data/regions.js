import { cities } from './cities'

// 대한민국 17개 시/도 데이터
// x, y 좌표는 실제 위/경도를 단순화하여 SVG 다이어그램(KoreaMap)에 배치하기 위한 값입니다.
// query는 OpenWeatherMap 조회에 사용하는 대표 관측 도시(영문)입니다.
export const regions = [
  { id: 'seoul', name: '서울특별시', short: '서울', query: 'Seoul', x: 75, y: 48, lat: 37.5667, lon: 126.9783 },
  { id: 'incheon', name: '인천광역시', short: '인천', query: 'Incheon', x: 28, y: 80, lat: 37.456, lon: 126.7052 },
  { id: 'gyeonggi', name: '경기도', short: '경기', query: 'Suwon', x: 100, y: 95, lat: 37.2633, lon: 127.0287 },
  { id: 'gangwon', name: '강원특별자치도', short: '강원', query: 'Chuncheon', x: 150, y: 40, lat: 37.8811, lon: 127.7298 },
  { id: 'chungbuk', name: '충청북도', short: '충북', query: 'Cheongju', x: 145, y: 150, lat: 36.6421, lon: 127.4892 },
  { id: 'chungnam', name: '충청남도', short: '충남', query: 'Cheonan', x: 80, y: 150, lat: 36.815, lon: 127.1141 },
  { id: 'sejong', name: '세종특별자치시', short: '세종', query: 'Sejong', x: 115, y: 190, lat: 36.48, lon: 127.289 },
  { id: 'daejeon', name: '대전광역시', short: '대전', query: 'Daejeon', x: 112, y: 230, lat: 36.3497, lon: 127.3849 },
  { id: 'jeonbuk', name: '전북특별자치도', short: '전북', query: 'Jeonju', x: 58, y: 258, lat: 35.8238, lon: 127.1473 },
  { id: 'gwangju', name: '광주광역시', short: '광주', query: 'Gwangju', x: 55, y: 300, lat: 35.1595, lon: 126.8515 },
  { id: 'jeonnam', name: '전라남도', short: '전남', query: 'Mokpo', x: 25, y: 340, lat: 34.7903, lon: 126.3848 },
  { id: 'gyeongbuk', name: '경상북도', short: '경북', query: 'Andong', x: 235, y: 165, lat: 36.5635, lon: 128.7261 },
  { id: 'daegu', name: '대구광역시', short: '대구', query: 'Daegu', x: 225, y: 230, lat: 35.8713, lon: 128.6018 },
  { id: 'gyeongnam', name: '경상남도', short: '경남', query: 'Changwon', x: 230, y: 295, lat: 35.228, lon: 128.6819 },
  { id: 'busan', name: '부산광역시', short: '부산', query: 'Busan', x: 278, y: 308, lat: 35.18, lon: 129.0752 },
  { id: 'ulsan', name: '울산광역시', short: '울산', query: 'Ulsan', x: 290, y: 255, lat: 35.5392, lon: 129.3119 },
  { id: 'jeju', name: '제주특별자치도', short: '제주', query: 'Jeju', x: 60, y: 440, lat: 33.4998, lon: 126.5314 },
]

// 17개 시/도(regions)와 개별 시(cities)를 아우르는 통합 조회 — weatherStore, 상세 페이지 등
// 대부분의 소비자는 대상이 광역 시/도인지 개별 시인지 신경 쓰지 않고 id 하나로 조회합니다.
export const findRegionById = (id) => regions.find((region) => region.id === id) ?? cities.find((city) => city.id === id)
