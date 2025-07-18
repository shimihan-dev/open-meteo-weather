interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  time: string;
  humidity: number;
  precipitation: number;
  feels_like: number;
}

interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export const searchLocation = async (cityName: string): Promise<LocationData[]> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=ko&format=json`
  );
  
  if (!response.ok) {
    throw new Error('위치 검색에 실패했습니다.');
  }

  const data = await response.json();
  return data.results.map((result: any) => ({
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country
  }));
};

export const getWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,precipitation,apparent_temperature&timezone=auto`
  );
  
  if (!response.ok) {
    throw new Error('날씨 정보를 가져오는데 실패했습니다.');
  }

  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    weathercode: data.current.weathercode,
    windspeed: data.current.windspeed_10m,
    time: data.current.time,
    humidity: data.current.relativehumidity_2m,
    precipitation: data.current.precipitation,
    feels_like: data.current.apparent_temperature
  };
};

export const getWeatherCodeDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: '맑음',
    1: '대체로 맑음',
    2: '약간 흐림',
    3: '흐림',
    45: '안개',
    48: '짙은 안개',
    51: '가벼운 이슬비',
    53: '이슬비',
    55: '짙은 이슬비',
    61: '약한 비',
    63: '비',
    65: '강한 비',
    71: '약한 눈',
    73: '눈',
    75: '강한 눈',
    77: '눈알',
    80: '약한 소나기',
    81: '소나기',
    82: '강한 소나기',
    85: '약한 눈 소나기',
    86: '강한 눈 소나기',
    95: '천둥번개',
    96: '약한 우박과 천둥번개',
    99: '강한 우박과 천둥번개'
  };

  return weatherCodes[code] || '알 수 없음';
}; 