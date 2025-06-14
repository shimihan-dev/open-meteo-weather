import React, { useState } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import VersionInfo from './components/VersionInfo';
import { countries, City } from './data/cities';
import CityCard from './components/CityCard';
import FavoriteCities from './components/FavoriteCities';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  // 모든 도시 데이터를 하나의 배열로 합치기
  const allCities = countries.reduce<City[]>((acc, country) => {
    return [...acc, ...country.cities];
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const selectedCountryData = countries.find(country => country.name === selectedCountry);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">날씨 정보</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                전체 도시
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'favorites'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                즐겨찾기
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {activeTab === 'all' ? (
          <div>
            {countries.map((country) => (
              <div key={country.name} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{country.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {country.cities.map((city) => (
                    <CityCard key={city.name} city={city} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <FavoriteCities />
        )}
      </main>
      <VersionInfo />
    </div>
  );
}

export default App;
