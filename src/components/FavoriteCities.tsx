import React, { useEffect, useState } from 'react';
import { City } from '../data/cities';
import { getWeather } from '../services/weatherService';
import { WeatherData } from '../types/weather';

const FavoriteCities: React.FC = () => {
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData }>({});

  useEffect(() => {
    // Load favorite cities from localStorage
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      setFavoriteCities(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Fetch weather data for favorite cities
    const fetchWeatherData = async () => {
      const newWeatherData: { [key: string]: WeatherData } = {};
      
      for (const city of favoriteCities) {
        try {
          const data = await getWeather(city.latitude, city.longitude);
          newWeatherData[city.name] = data;
        } catch (error) {
          console.error(`Error fetching weather for ${city.name}:`, error);
        }
      }
      
      setWeatherData(newWeatherData);
    };

    if (favoriteCities.length > 0) {
      fetchWeatherData();
    }
  }, [favoriteCities]);

  if (favoriteCities.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">즐겨찾기한 도시가 없습니다</h2>
        <p className="text-gray-600">도시를 즐겨찾기에 추가하면 여기에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">즐겨찾기한 도시</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteCities.map((city) => {
          const weather = weatherData[city.name];
          return (
            <div key={city.name} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
              {weather ? (
                <div>
                  <p className="text-gray-600">현재 기온: {weather.current.temperature_2m}°C</p>
                  <p className="text-gray-600">습도: {weather.current.relative_humidity_2m}%</p>
                  <p className="text-gray-600">풍속: {weather.current.wind_speed_10m} m/s</p>
                </div>
              ) : (
                <p className="text-gray-500">날씨 정보를 불러오는 중...</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteCities; 