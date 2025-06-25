import React, { useState } from 'react';
import './App.css';
import { countries } from './data/cities';
import WeatherDisplay from './components/WeatherDisplay';
import SubwaySchedulePage from './components/SubwaySchedulePage';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'subway'>('all');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">정보 확인</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                날씨 정보
              </button>
              <button
                onClick={() => setActiveTab('subway')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'subway'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                지하철 시간표
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
                  <WeatherDisplay cities={country.cities} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SubwaySchedulePage />
        )}
      </main>
    </div>
  );
}

export default App;