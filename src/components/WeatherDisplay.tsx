import React, { useEffect, useState } from 'react';
import { getWeather, getWeatherCodeDescription } from '../services/weatherService';
import { City } from '../data/cities';
import WeatherIcon from './WeatherIcon';

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
}

interface WeatherDisplayProps {
  cities: City[];
  favoriteCities: string[];
  onFavoriteChange: (cityName: string) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ cities, favoriteCities, onFavoriteChange }) => {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const weatherPromises = cities.map(async (city) => {
          const data = await getWeather(city.latitude, city.longitude);
          return {
            ...data,
            cityName: city.name
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
  }, [cities]);

  if (loading) {
    return <div className="loading">날씨 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // 즐겨찾기된 도시를 먼저 표시
  const sortedWeatherData = [...weatherData].sort((a, b) => {
    const aIsFavorite = favoriteCities.includes(a.cityName);
    const bIsFavorite = favoriteCities.includes(b.cityName);
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;
    return 0;
  });

  return (
    <div className="weather-grid">
      {sortedWeatherData.map((weather, index) => (
        <div key={index} className="weather-card">
          <div className="weather-card-header">
            <h3>{weather.cityName}</h3>
            <button
              className={`favorite-button ${favoriteCities.includes(weather.cityName) ? 'active' : ''}`}
              onClick={() => onFavoriteChange(weather.cityName)}
              title={favoriteCities.includes(weather.cityName) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            >
              {favoriteCities.includes(weather.cityName) ? '★' : '☆'}
            </button>
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
            <p className="update-time">
              {new Date(weather.time).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay; 