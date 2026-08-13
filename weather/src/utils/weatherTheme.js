// 날씨 상태에 따라 카드/패널에 입힐 색 테마 클래스를 계산합니다.
// OpenWeatherMap의 weatherId / icon(day·night 접미사)이 있으면 그것을 우선 사용하고,
// 목데이터처럼 코드가 없는 경우 한글 상태 문구(맑음/흐림/비/눈)로 대체 판별합니다.
export function getWeatherTheme(statusText, { weatherId, icon } = {}) {
  const isNight = typeof icon === 'string' && icon.endsWith('n')

  let theme
  if (typeof weatherId === 'number') {
    if (weatherId === 800) theme = 'clear'
    else if (weatherId >= 801 && weatherId <= 804) theme = 'cloudy'
    else if (weatherId >= 600 && weatherId < 700) theme = 'snow'
    else if (weatherId >= 200 && weatherId < 600) theme = 'rain'
    else theme = 'cloudy' // 700번대(안개 등 대기 현상)
  } else {
    const text = statusText || ''
    if (text.includes('눈')) theme = 'snow'
    else if (text.includes('비') || text.includes('소나기')) theme = 'rain'
    else if (text.includes('흐') || text.includes('구름')) theme = 'cloudy'
    else theme = 'clear'
  }

  // 야간에는 날씨 상태와 무관하게 어두운 테마를 우선 적용
  return isNight ? 'night' : theme
}

export const weatherThemeClass = (statusText, options) => `weather-theme-${getWeatherTheme(statusText, options)}`

// weatherId / icon(day·night 접미사)에 어울리는 대표 이모지를 반환합니다.
export function getWeatherEmoji(weatherId, icon) {
  const isNight = typeof icon === 'string' && icon.endsWith('n')
  if (typeof weatherId !== 'number') return isNight ? '🌙' : '⛅'

  if (weatherId === 800) return isNight ? '🌙' : '☀️'
  if (weatherId >= 801 && weatherId <= 802) return isNight ? '☁️' : '🌤️'
  if (weatherId >= 803 && weatherId <= 804) return '☁️'
  if (weatherId >= 200 && weatherId < 300) return '⛈️'
  if (weatherId >= 300 && weatherId < 400) return '🌦️'
  if (weatherId >= 500 && weatherId < 600) return '🌧️'
  if (weatherId >= 600 && weatherId < 700) return '❄️'
  if (weatherId >= 700 && weatherId < 800) return '🌫️'
  return '⛅'
}

// 체감을 짧은 한 단어로 요약합니다(카드의 뉘앙스 배지용).
export function getTempDescriptor(celsius) {
  if (typeof celsius !== 'number') return ''
  if (celsius >= 33) return '매우 더움'
  if (celsius >= 28) return '더움'
  if (celsius >= 20) return '포근함'
  if (celsius >= 10) return '선선함'
  if (celsius >= 0) return '쌀쌀함'
  return '매우 추움'
}
