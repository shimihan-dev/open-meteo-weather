import React from 'react';
import { City } from '../data/cities';
import WeatherDisplay from './WeatherDisplay';

interface FavoriteCitiesProps {
  favoriteCities: string[];
  allCities: City[];
  onFavoriteChange: (cityName: string) => void;
}

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({ favoriteCities, allCities, onFavoriteChange }) => {
  const favoriteCityData = allCities.filter(city => favoriteCities.includes(city.name));

  if (favoriteCityData.length === 0) {
    return null;
  }

  return (
    <div className="favorite-cities">
      <h2>즐겨찾기한 도시</h2>
      <WeatherDisplay 
        cities={favoriteCityData} 
        favoriteCities={favoriteCities}
        onFavoriteChange={onFavoriteChange}
      />
    </div>
  );
};

export default FavoriteCities; 