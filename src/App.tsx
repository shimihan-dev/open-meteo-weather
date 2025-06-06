import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import FavoriteCities from './components/FavoriteCities';
import { countries, City } from './data/cities';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteCities');
    return saved ? JSON.parse(saved) : [];
  });

  // 모든 도시 데이터를 하나의 배열로 합치기
  const allCities = countries.reduce<City[]>((acc, country) => {
    return [...acc, ...country.cities];
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const selectedCountryData = countries.find(country => country.name === selectedCountry);

  const handleFavoriteChange = (cityName: string) => {
    const newFavorites = favoriteCities.includes(cityName)
      ? favoriteCities.filter(name => name !== cityName)
      : [...favoriteCities, cityName];
    setFavoriteCities(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>전 세계 날씨 정보</h1>
        
        {/* 즐겨찾기한 도시 표시 */}
        <FavoriteCities favoriteCities={favoriteCities} allCities={allCities} onFavoriteChange={handleFavoriteChange} />

        <div className="country-selector">
          <select 
            value={selectedCountry} 
            onChange={handleCountryChange}
            className="country-select"
          >
            <option value="">국가를 선택하세요</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCountryData && (
          <div className="country-weather">
            <h2>{selectedCountryData.name} 주요 도시 날씨</h2>
            <WeatherDisplay 
              cities={selectedCountryData.cities}
              onFavoriteChange={(cityName: string) => {
                const newFavorites = favoriteCities.includes(cityName)
                  ? favoriteCities.filter(name => name !== cityName)
                  : [...favoriteCities, cityName];
                setFavoriteCities(newFavorites);
                localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
              }}
              favoriteCities={favoriteCities}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
