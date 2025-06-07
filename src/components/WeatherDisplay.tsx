import React, { useEffect, useState } from 'react';
import { getWeather, getWeatherCodeDescription } from '../services/weatherService';
import { City } from '../data/cities';
import WeatherIcon from './WeatherIcon';
import { formatInTimeZone } from 'date-fns-tz';

interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  time: string;
  humidity: number;
  precipitation: number;
  feels_like: number;
}

interface CityWeather extends WeatherData {
  cityName: string;
  localTime: string;
  timezone: string;
}

interface WeatherDisplayProps {
  cities: City[];
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ cities }) => {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // 위도/경도로 타임존 계산
  const getTimezoneFromCoordinates = (latitude: number, longitude: number): string => {
    // 주요 도시들의 타임존 매핑
    const timezoneMap: { [key: string]: string } = {
      // 한국
      '서울': 'Asia/Seoul',
      '부산': 'Asia/Seoul',
      '인천': 'Asia/Seoul',
      '대구': 'Asia/Seoul',
      '대전': 'Asia/Seoul',
      // 일본
      '도쿄': 'Asia/Tokyo',
      '오사카': 'Asia/Tokyo',
      '나고야': 'Asia/Tokyo',
      '삿포로': 'Asia/Tokyo',
      '후쿠오카': 'Asia/Tokyo',
      // 중국
      '베이징': 'Asia/Shanghai',
      '상하이': 'Asia/Shanghai',
      '광저우': 'Asia/Shanghai',
      '선전': 'Asia/Shanghai',
      '청두': 'Asia/Shanghai',
      // 태국
      '방콕': 'Asia/Bangkok',
      '치앙마이': 'Asia/Bangkok',
      '푸켓': 'Asia/Bangkok',
      '파타야': 'Asia/Bangkok',
      '코사무이': 'Asia/Bangkok',
      // 베트남
      '하노이': 'Asia/Ho_Chi_Minh',
      '호치민': 'Asia/Ho_Chi_Minh',
      '다낭': 'Asia/Ho_Chi_Minh',
      '하이퐁': 'Asia/Ho_Chi_Minh',
      '푸꾸옥': 'Asia/Ho_Chi_Minh',
      // 싱가포르
      '싱가포르': 'Asia/Singapore',
      // 말레이시아
      '쿠알라룸푸르': 'Asia/Kuala_Lumpur',
      '조호바루': 'Asia/Kuala_Lumpur',
      '페낭': 'Asia/Kuala_Lumpur',
      '랑카위': 'Asia/Kuala_Lumpur',
      // 인도네시아
      '자카르타': 'Asia/Jakarta',
      '발리': 'Asia/Makassar',
      '수라바야': 'Asia/Jakarta',
      '반둥': 'Asia/Jakarta',
      '요그야카르타': 'Asia/Jakarta',
      // 필리핀
      '마닐라': 'Asia/Manila',
      '세부': 'Asia/Manila',
      '다바오': 'Asia/Manila',
      '보라카이': 'Asia/Manila',
      // 인도
      '뉴델리': 'Asia/Kolkata',
      '뭄바이': 'Asia/Kolkata',
      '방갈로르': 'Asia/Kolkata',
      '첸나이': 'Asia/Kolkata',
      '콜카타': 'Asia/Kolkata',
      // 미국
      '뉴욕': 'America/New_York',
      '로스앤젤레스': 'America/Los_Angeles',
      '시카고': 'America/Chicago',
      '휴스턴': 'America/Chicago',
      '마이애미': 'America/New_York',
      // 영국
      '런던': 'Europe/London',
      '맨체스터': 'Europe/London',
      '버밍엄': 'Europe/London',
      '리버풀': 'Europe/London',
      '에딘버러': 'Europe/London',
      // 프랑스
      '파리': 'Europe/Paris',
      '마르세유': 'Europe/Paris',
      '리옹': 'Europe/Paris',
      '툴루즈': 'Europe/Paris',
      '니스': 'Europe/Paris',
      '낭트': 'Europe/Paris',
      '스트라스부르': 'Europe/Paris',
      '몽펠리에': 'Europe/Paris'
    };

    // 도시 이름으로 타임존 찾기
    const cityName = Object.keys(timezoneMap).find(city => 
      Math.abs(Number(timezoneMap[city].split('/')[1].split('_')[0]) - latitude) < 1 &&
      Math.abs(Number(timezoneMap[city].split('/')[1].split('_')[1]) - longitude) < 1
    );

    return cityName ? timezoneMap[cityName] : 'UTC';
  };

  // 현지 시간 계산 함수
  const getLocalTime = (latitude: number, longitude: number): { time: string; timezone: string } => {
    try {
      const timezone = getTimezoneFromCoordinates(latitude, longitude);
      const now = new Date();
      const time = formatInTimeZone(now, timezone, 'yyyy-MM-dd HH:mm:ss');
      return { time, timezone };
    } catch (error) {
      console.error('시간 계산 중 오류 발생:', error);
      return { time: '시간 정보를 가져올 수 없습니다.', timezone: 'UTC' };
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const weatherPromises = cities.map(async (city) => {
          const data = await getWeather(city.latitude, city.longitude);
          const { time, timezone } = getLocalTime(city.latitude, city.longitude);
          return {
            ...data,
            cityName: city.name,
            localTime: time,
            timezone
          };
        });

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
      } catch (err) {
        setError('날씨 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // 1초마다 시간 업데이트
    const timeInterval = setInterval(() => {
      setWeatherData(prevData => 
        prevData.map(data => {
          const city = cities.find(city => city.name === data.cityName);
          if (!city) return data;
          const { time } = getLocalTime(city.latitude, city.longitude);
          return { ...data, localTime: time };
        })
      );
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [cities]);

  if (loading) {
    return <div className="loading">날씨 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="weather-grid">
      {weatherData.map((weather, index) => (
        <div key={index} className="weather-card">
          <div className="weather-card-header">
            <h3>{weather.cityName}</h3>
          </div>
          <div className="weather-icon">
            <WeatherIcon code={weather.weathercode} size={60} />
          </div>
          <div className="weather-info">
            <p className="weather-description">
              {getWeatherCodeDescription(weather.weathercode)}
            </p>
            <p className="temperature">
              {weather.temperature}°C
              <span className="feels-like">(체감 {weather.feels_like}°C)</span>
            </p>
            <p>습도: {weather.humidity}%</p>
            <p>강수량: {weather.precipitation}mm</p>
            <p>풍속: {weather.windspeed} km/h</p>
            <p className="local-time">
              현지 시간: {weather.localTime}
              <span className="timezone">({weather.timezone})</span>
            </p>
            <p className="update-time">
              마지막 업데이트: {new Date(weather.time).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay; 