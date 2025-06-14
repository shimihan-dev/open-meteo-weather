import React, { useState } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import VersionInfo from './components/VersionInfo';
import { countries, City } from './data/cities';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // 모든 도시 데이터를 하나의 배열로 합치기
  const allCities = countries.reduce<City[]>((acc, country) => {
    return [...acc, ...country.cities];
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const selectedCountryData = countries.find(country => country.name === selectedCountry);

  return (
    <div className="App">
      <header className="App-header">
        <h1>전 세계 날씨 정보</h1>
        
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
            />
          </div>
        )}
      </header>
      <VersionInfo />
    </div>
  );
}

export default App;
