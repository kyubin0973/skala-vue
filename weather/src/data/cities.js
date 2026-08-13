// 대한민국의 개별 시(市) 데이터 — 지도(RegionKoreaMap)에는 표시되지 않지만
// 탐색(Explore) 탭 검색과 도시 상세 페이지에서 조회할 수 있도록 별도로 관리합니다.
// regionId는 regions.js의 17개 시/도 중 소속 지역을 가리킵니다(테마·그룹 표시용).
export const cities = [
  // 경기도
  { id: 'suwon', name: '경기도 수원시', short: '수원', query: 'Suwon', regionId: 'gyeonggi', lat: 37.2633, lon: 127.0287 },
  { id: 'seongnam', name: '경기도 성남시', short: '성남', query: 'Seongnam', regionId: 'gyeonggi', lat: 37.4202, lon: 127.1262 },
  { id: 'goyang', name: '경기도 고양시', short: '고양', query: 'Goyang', regionId: 'gyeonggi', lat: 37.6582, lon: 126.8319 },
  { id: 'yongin', name: '경기도 용인시', short: '용인', query: 'Yongin', regionId: 'gyeonggi', lat: 37.2406, lon: 127.1786 },
  { id: 'bucheon', name: '경기도 부천시', short: '부천', query: 'Bucheon', regionId: 'gyeonggi', lat: 37.5014, lon: 126.766 },
  { id: 'ansan', name: '경기도 안산시', short: '안산', query: 'Ansan', regionId: 'gyeonggi', lat: 37.3217, lon: 126.8309 },
  { id: 'anyang', name: '경기도 안양시', short: '안양', query: 'Anyang', regionId: 'gyeonggi', lat: 37.3939, lon: 126.9571 },
  { id: 'namyangju', name: '경기도 남양주시', short: '남양주', query: 'Namyangju', regionId: 'gyeonggi', lat: 37.6359, lon: 127.2165 },
  { id: 'hwaseong', name: '경기도 화성시', short: '화성', query: 'Hwaseong', regionId: 'gyeonggi', lat: 37.1995, lon: 126.8313 },
  { id: 'pyeongtaek', name: '경기도 평택시', short: '평택', query: 'Pyeongtaek', regionId: 'gyeonggi', lat: 36.9925, lon: 127.1127 },
  { id: 'uijeongbu', name: '경기도 의정부시', short: '의정부', query: 'Uijeongbu', regionId: 'gyeonggi', lat: 37.7381, lon: 127.034 },
  { id: 'siheung', name: '경기도 시흥시', short: '시흥', query: 'Siheung', regionId: 'gyeonggi', lat: 37.3799, lon: 126.8032 },
  { id: 'paju', name: '경기도 파주시', short: '파주', query: 'Paju', regionId: 'gyeonggi', lat: 37.7599, lon: 126.7802 },
  { id: 'gimpo', name: '경기도 김포시', short: '김포', query: 'Gimpo', regionId: 'gyeonggi', lat: 37.6156, lon: 126.7158 },
  { id: 'gwangmyeong', name: '경기도 광명시', short: '광명', query: 'Gwangmyeong', regionId: 'gyeonggi', lat: 37.4811, lon: 126.8631 },
  { id: 'gunpo', name: '경기도 군포시', short: '군포', query: 'Gunpo', regionId: 'gyeonggi', lat: 37.3615, lon: 126.9349 },
  { id: 'icheon', name: '경기도 이천시', short: '이천', query: 'Icheon', regionId: 'gyeonggi', lat: 37.2809, lon: 127.4429 },
  { id: 'yangju', name: '경기도 양주시', short: '양주', query: 'Yangju', regionId: 'gyeonggi', lat: 37.7849, lon: 127.0458 },
  { id: 'osan', name: '경기도 오산시', short: '오산', query: 'Osan', regionId: 'gyeonggi', lat: 37.1499, lon: 127.0775 },
  { id: 'guri', name: '경기도 구리시', short: '구리', query: 'Guri', regionId: 'gyeonggi', lat: 37.5936, lon: 127.1298 },
  { id: 'anseong', name: '경기도 안성시', short: '안성', query: 'Anseong', regionId: 'gyeonggi', lat: 37.0078, lon: 127.28 },
  { id: 'pocheon', name: '경기도 포천시', short: '포천', query: 'Pocheon', regionId: 'gyeonggi', lat: 37.8948, lon: 127.2007 },
  { id: 'uiwang', name: '경기도 의왕시', short: '의왕', query: 'Uiwang', regionId: 'gyeonggi', lat: 37.3449, lon: 126.969 },
  { id: 'hanam', name: '경기도 하남시', short: '하남', query: 'Hanam', regionId: 'gyeonggi', lat: 37.5393, lon: 127.2149 },
  { id: 'yeoju', name: '경기도 여주시', short: '여주', query: 'Yeoju', regionId: 'gyeonggi', lat: 37.2983, lon: 127.637 },
  { id: 'dongducheon', name: '경기도 동두천시', short: '동두천', query: 'Dongducheon', regionId: 'gyeonggi', lat: 37.9031, lon: 127.0605 },

  // 강원특별자치도
  { id: 'chuncheon', name: '강원특별자치도 춘천시', short: '춘천', query: 'Chuncheon', regionId: 'gangwon', lat: 37.8811, lon: 127.7298 },
  { id: 'wonju', name: '강원특별자치도 원주시', short: '원주', query: 'Wonju', regionId: 'gangwon', lat: 37.3421, lon: 127.9198 },
  { id: 'gangneung', name: '강원특별자치도 강릉시', short: '강릉', query: 'Gangneung', regionId: 'gangwon', lat: 37.7525, lon: 128.876 },
  { id: 'donghae', name: '강원특별자치도 동해시', short: '동해', query: 'Donghae', regionId: 'gangwon', lat: 37.5245, lon: 129.1146 },
  { id: 'taebaek', name: '강원특별자치도 태백시', short: '태백', query: 'Taebaek', regionId: 'gangwon', lat: 37.1638, lon: 128.9857 },
  { id: 'sokcho', name: '강원특별자치도 속초시', short: '속초', query: 'Sokcho', regionId: 'gangwon', lat: 38.207, lon: 128.5913 },
  { id: 'samcheok', name: '강원특별자치도 삼척시', short: '삼척', query: 'Samcheok', regionId: 'gangwon', lat: 37.4499, lon: 129.1653 },

  // 충청북도
  { id: 'cheongju', name: '충청북도 청주시', short: '청주', query: 'Cheongju', regionId: 'chungbuk', lat: 36.6421, lon: 127.4892 },
  { id: 'chungju', name: '충청북도 충주시', short: '충주', query: 'Chungju', regionId: 'chungbuk', lat: 36.9907, lon: 127.926 },
  { id: 'jecheon', name: '충청북도 제천시', short: '제천', query: 'Jecheon', regionId: 'chungbuk', lat: 37.1326, lon: 128.1914 },

  // 충청남도
  { id: 'cheonan', name: '충청남도 천안시', short: '천안', query: 'Cheonan', regionId: 'chungnam', lat: 36.815, lon: 127.1141 },
  { id: 'gongju', name: '충청남도 공주시', short: '공주', query: 'Gongju', regionId: 'chungnam', lat: 36.4726, lon: 127.0912 },
  { id: 'boryeong', name: '충청남도 보령시', short: '보령', query: 'Boryeong', regionId: 'chungnam', lat: 36.334, lon: 126.6132 },
  { id: 'asan', name: '충청남도 아산시', short: '아산', query: 'Asan', regionId: 'chungnam', lat: 36.7899, lon: 127.0027 },
  { id: 'seosan', name: '충청남도 서산시', short: '서산', query: 'Seosan', regionId: 'chungnam', lat: 36.7845, lon: 126.4503 },
  { id: 'nonsan', name: '충청남도 논산시', short: '논산', query: 'Nonsan', regionId: 'chungnam', lat: 36.1868, lon: 127.0988 },
  { id: 'gyeryong', name: '충청남도 계룡시', short: '계룡', query: 'Gyeryong', regionId: 'chungnam', lat: 36.2755, lon: 127.2473 },
  { id: 'dangjin', name: '충청남도 당진시', short: '당진', query: 'Dangjin', regionId: 'chungnam', lat: 36.8904, lon: 126.6462 },

  // 전북특별자치도
  { id: 'jeonju', name: '전북특별자치도 전주시', short: '전주', query: 'Jeonju', regionId: 'jeonbuk', lat: 35.8238, lon: 127.1473 },
  { id: 'gunsan', name: '전북특별자치도 군산시', short: '군산', query: 'Gunsan', regionId: 'jeonbuk', lat: 35.968, lon: 126.7369 },
  { id: 'iksan', name: '전북특별자치도 익산시', short: '익산', query: 'Iksan', regionId: 'jeonbuk', lat: 35.9479, lon: 126.9578 },
  { id: 'jeongeup', name: '전북특별자치도 정읍시', short: '정읍', query: 'Jeongeup', regionId: 'jeonbuk', lat: 35.5698, lon: 126.856 },
  { id: 'namwon', name: '전북특별자치도 남원시', short: '남원', query: 'Namwon', regionId: 'jeonbuk', lat: 35.4163, lon: 127.3904 },
  { id: 'gimje', name: '전북특별자치도 김제시', short: '김제', query: 'Gimje', regionId: 'jeonbuk', lat: 35.8038, lon: 126.8806 },

  // 전라남도
  { id: 'mokpo', name: '전라남도 목포시', short: '목포', query: 'Mokpo', regionId: 'jeonnam', lat: 34.7903, lon: 126.3848 },
  { id: 'yeosu', name: '전라남도 여수시', short: '여수', query: 'Yeosu', regionId: 'jeonnam', lat: 34.7546, lon: 127.6599 },
  { id: 'suncheon', name: '전라남도 순천시', short: '순천', query: 'Suncheon', regionId: 'jeonnam', lat: 34.9505, lon: 127.4873 },
  { id: 'naju', name: '전라남도 나주시', short: '나주', query: 'Naju', regionId: 'jeonnam', lat: 35.0159, lon: 126.7108 },
  { id: 'gwangyang', name: '전라남도 광양시', short: '광양', query: 'Gwangyang', regionId: 'jeonnam', lat: 34.9406, lon: 127.696 },

  // 경상북도
  { id: 'pohang', name: '경상북도 포항시', short: '포항', query: 'Pohang', regionId: 'gyeongbuk', lat: 36.0189, lon: 129.3429 },
  { id: 'gyeongju', name: '경상북도 경주시', short: '경주', query: 'Gyeongju', regionId: 'gyeongbuk', lat: 35.8557, lon: 129.2249 },
  { id: 'gimcheon', name: '경상북도 김천시', short: '김천', query: 'Gimcheon', regionId: 'gyeongbuk', lat: 36.1398, lon: 128.114 },
  { id: 'andong', name: '경상북도 안동시', short: '안동', query: 'Andong', regionId: 'gyeongbuk', lat: 36.5635, lon: 128.7261 },
  { id: 'gumi', name: '경상북도 구미시', short: '구미', query: 'Gumi', regionId: 'gyeongbuk', lat: 36.1196, lon: 128.3445 },
  { id: 'yeongju', name: '경상북도 영주시', short: '영주', query: 'Yeongju', regionId: 'gyeongbuk', lat: 36.8057, lon: 128.6241 },
  { id: 'yeongcheon', name: '경상북도 영천시', short: '영천', query: 'Yeongcheon', regionId: 'gyeongbuk', lat: 35.9884, lon: 128.942 },
  { id: 'sangju', name: '경상북도 상주시', short: '상주', query: 'Sangju', regionId: 'gyeongbuk', lat: 36.4104, lon: 128.1591 },
  { id: 'mungyeong', name: '경상북도 문경시', short: '문경', query: 'Mungyeong', regionId: 'gyeongbuk', lat: 36.5859, lon: 128.1871 },
  { id: 'gyeongsan', name: '경상북도 경산시', short: '경산', query: 'Gyeongsan', regionId: 'gyeongbuk', lat: 35.8251, lon: 128.7413 },

  // 경상남도
  { id: 'changwon', name: '경상남도 창원시', short: '창원', query: 'Changwon', regionId: 'gyeongnam', lat: 35.228, lon: 128.6819 },
  { id: 'jinju', name: '경상남도 진주시', short: '진주', query: 'Jinju', regionId: 'gyeongnam', lat: 35.1803, lon: 128.108 },
  { id: 'tongyeong', name: '경상남도 통영시', short: '통영', query: 'Tongyeong', regionId: 'gyeongnam', lat: 34.8543, lon: 128.4332 },
  { id: 'sacheon', name: '경상남도 사천시', short: '사천', query: 'Sacheon', regionId: 'gyeongnam', lat: 35.0035, lon: 128.0646 },
  { id: 'gimhae', name: '경상남도 김해시', short: '김해', query: 'Gimhae', regionId: 'gyeongnam', lat: 35.2311, lon: 128.8908 },
  { id: 'miryang', name: '경상남도 밀양시', short: '밀양', query: 'Miryang', regionId: 'gyeongnam', lat: 35.5038, lon: 128.7467 },
  { id: 'geoje', name: '경상남도 거제시', short: '거제', query: 'Geoje', regionId: 'gyeongnam', lat: 34.8805, lon: 128.6212 },
  { id: 'yangsan', name: '경상남도 양산시', short: '양산', query: 'Yangsan', regionId: 'gyeongnam', lat: 35.335, lon: 129.0371 },

  // 제주특별자치도
  { id: 'jeju-si', name: '제주특별자치도 제주시', short: '제주시', query: 'Jeju', regionId: 'jeju', lat: 33.4998, lon: 126.5314 },
  { id: 'seogwipo', name: '제주특별자치도 서귀포시', short: '서귀포', query: 'Seogwipo', regionId: 'jeju', lat: 33.2528, lon: 126.561 },
]

export const findCityById = (id) => cities.find((city) => city.id === id)
