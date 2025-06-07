export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Country {
  name: string;
  cities: City[];
}

export const countries: Country[] = [
  {
    name: "대한민국",
    cities: [
      { name: "서울", latitude: 37.5665, longitude: 126.9780 },
      { name: "부산", latitude: 35.1796, longitude: 129.0756 },
      { name: "인천", latitude: 37.4563, longitude: 126.7052 },
      { name: "대구", latitude: 35.8714, longitude: 128.6014 },
      { name: "대전", latitude: 36.3504, longitude: 127.3845 }
    ]
  },
  {
    name: "일본",
    cities: [
      { name: "도쿄", latitude: 35.6762, longitude: 139.6503 },
      { name: "오사카", latitude: 34.6937, longitude: 135.5023 },
      { name: "나고야", latitude: 35.1815, longitude: 136.9066 },
      { name: "삿포로", latitude: 43.0618, longitude: 141.3545 },
      { name: "후쿠오카", latitude: 33.5902, longitude: 130.4017 },
      { name: "오키나와", latitude: 26.5019, longitude: 127.9454 }
    ]
  },
  {
    name: "중국",
    cities: [
      { name: "베이징", latitude: 39.9042, longitude: 116.4074 },
      { name: "상하이", latitude: 31.2304, longitude: 121.4737 },
      { name: "광저우", latitude: 23.1291, longitude: 113.2644 },
      { name: "선전", latitude: 22.5431, longitude: 114.0579 },
      { name: "청두", latitude: 30.5728, longitude: 104.0668 }
    ]
  },
  {
    name: "태국",
    cities: [
      { name: "방콕", latitude: 13.7563, longitude: 100.5018 },
      { name: "치앙마이", latitude: 18.7061, longitude: 98.9817 },
      { name: "푸켓", latitude: 7.8804, longitude: 98.3923 },
      { name: "파타야", latitude: 12.9236, longitude: 100.8824 },
      { name: "코사무이", latitude: 9.5120, longitude: 100.0136 }
    ]
  },
  {
    name: "베트남",
    cities: [
      { name: "하노이", latitude: 21.0285, longitude: 105.8542 },
      { name: "호치민", latitude: 10.8231, longitude: 106.6297 },
      { name: "다낭", latitude: 16.0544, longitude: 108.2022 },
      { name: "하이퐁", latitude: 20.8449, longitude: 106.6881 },
      { name: "푸꾸옥", latitude: 10.3460, longitude: 103.9844 }
    ]
  },
  {
    name: "싱가포르",
    cities: [
      { name: "싱가포르", latitude: 1.3521, longitude: 103.8198 }
    ]
  },
  {
    name: "말레이시아",
    cities: [
      { name: "쿠알라룸푸르", latitude: 3.1390, longitude: 101.6869 },
      { name: "조호바루", latitude: 1.4927, longitude: 103.7414 },
      { name: "페낭", latitude: 5.4141, longitude: 100.3288 },
      { name: "랑카위", latitude: 6.3500, longitude: 99.8000 }
    ]
  },
  {
    name: "인도네시아",
    cities: [
      { name: "자카르타", latitude: 6.2088, longitude: 106.8456 },
      { name: "발리", latitude: 8.3405, longitude: 115.0920 },
      { name: "수라바야", latitude: 7.2575, longitude: 112.7521 },
      { name: "반둥", latitude: 6.9175, longitude: 107.6191 },
      { name: "요그야카르타", latitude: 7.7956, longitude: 110.3695 }
    ]
  },
  {
    name: "필리핀",
    cities: [
      { name: "마닐라", latitude: 14.5995, longitude: 120.9842 },
      { name: "세부", latitude: 10.3157, longitude: 123.8854 },
      { name: "다바오", latitude: 7.1907, longitude: 125.4553 },
      { name: "보라카이", latitude: 11.9674, longitude: 121.9248 }
    ]
  },
  {
    name: "인도",
    cities: [
      { name: "뉴델리", latitude: 28.6139, longitude: 77.2090 },
      { name: "뭄바이", latitude: 19.0760, longitude: 72.8777 },
      { name: "방갈로르", latitude: 12.9716, longitude: 77.5946 },
      { name: "첸나이", latitude: 13.0827, longitude: 80.2707 },
      { name: "콜카타", latitude: 22.5726, longitude: 88.3639 }
    ]
  },
  {
    name: "미국",
    cities: [
      { name: "뉴욕", latitude: 40.7128, longitude: -74.0060 },
      { name: "로스앤젤레스", latitude: 34.0522, longitude: -118.2437 },
      { name: "시카고", latitude: 41.8781, longitude: -87.6298 },
      { name: "휴스턴", latitude: 29.7604, longitude: -95.3698 },
      { name: "마이애미", latitude: 25.7617, longitude: -80.1918 },
      { name: "솔트레이크시티", latitude: 40.7608, longitude: -111.8910 }
    ]
  },
  {
    name: "영국",
    cities: [
      { name: "런던", latitude: 51.5074, longitude: -0.1278 },
      { name: "맨체스터", latitude: 53.4808, longitude: -2.2426 },
      { name: "버밍엄", latitude: 52.4862, longitude: -1.8904 },
      { name: "리버풀", latitude: 53.4084, longitude: -2.9916 },
      { name: "에딘버러", latitude: 55.9533, longitude: -3.1883 }
    ]
  },
  {
    name: "프랑스",
    cities: [
      { name: "파리", latitude: 48.8566, longitude: 2.3522 },
      { name: "마르세유", latitude: 43.2965, longitude: 5.3698 },
      { name: "리옹", latitude: 45.7578, longitude: 4.8320 },
      { name: "툴루즈", latitude: 43.6047, longitude: 1.4442 },
      { name: "니스", latitude: 43.7102, longitude: 7.2620 },
      { name: "낭트", latitude: 47.2184, longitude: -1.5536 },
      { name: "스트라스부르", latitude: 48.5734, longitude: 7.7521 },
      { name: "몽펠리에", latitude: 43.6108, longitude: 3.8767 }
    ]
  }
]; 