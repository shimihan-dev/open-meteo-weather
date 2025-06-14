import React, { useEffect, useState } from 'react';
import { City } from '../data/cities';
import { getWeather } from '../services/weatherService';
import { WeatherData } from '../types/weather';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city.latitude, city.longitude);
        setWeather(data as WeatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    // Check if city is in favorites
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.some((fav: City) => fav.name === city.name));
    }
  }, [city.name]);

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    let favorites: City[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.name !== city.name);
    } else {
      favorites.push(city);
    }

    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{city.name}</h3>
        <button
          onClick={toggleFavorite}
          className={`text-2xl ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
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
};

export default CityCard; 