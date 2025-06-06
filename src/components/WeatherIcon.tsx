import React from 'react';

interface WeatherIconProps {
  code: number;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 50 }) => {
  const getIcon = (code: number) => {
    switch (code) {
      case 0:
        return '☀️'; // 맑음
      case 1:
      case 2:
        return '🌤️'; // 대체로 맑음, 약간 흐림
      case 3:
        return '☁️'; // 흐림
      case 45:
      case 48:
        return '🌫️'; // 안개
      case 51:
      case 53:
      case 55:
        return '🌧️'; // 이슬비
      case 61:
      case 63:
      case 65:
        return '🌧️'; // 비
      case 71:
      case 73:
      case 75:
      case 77:
        return '🌨️'; // 눈
      case 80:
      case 81:
      case 82:
        return '🌧️'; // 소나기
      case 85:
      case 86:
        return '🌨️'; // 눈 소나기
      case 95:
      case 96:
      case 99:
        return '⛈️'; // 천둥번개
      default:
        return '❓';
    }
  };

  return (
    <span style={{ fontSize: size }}>
      {getIcon(code)}
    </span>
  );
};

export default WeatherIcon; 