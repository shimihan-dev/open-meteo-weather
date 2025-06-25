import React, { useState } from 'react';
import { SubwayStation, subwayLines } from '../data/subwayStations';
import SubwayScheduleTable from './SubwayScheduleTable';

interface ScheduleOptions {
  weekTag: '1' | '2' | '3';  // 1: 평일, 2: 토요일, 3: 일요일/공휴일
  updnTag: '1' | '2';        // 1: 상행, 2: 하행
}

const SubwaySchedulePage: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<SubwayStation | null>(null);
  const [scheduleOptions, setScheduleOptions] = useState<ScheduleOptions>({
    weekTag: '1',
    updnTag: '1'
  });
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLineChange = (lineId: string) => {
    console.log('선택된 호선:', lineId);
    setSelectedLine(lineId);
    setSelectedStation(null);
    setSchedule(null);
  };

  const handleStationChange = (station: SubwayStation) => {
    console.log('handleStationChange: 선택된 역:', station);
    setSelectedStation(station);
    setSchedule(null);
  };

  const handleOptionChange = (key: keyof ScheduleOptions, value: string) => {
    console.log(`${key} 변경:`, value);
    setScheduleOptions(prev => ({ ...prev, [key]: value }));
    setSchedule(null);
  };

  const parseXmlResponse = (xmlText: string): { code: string; message: string } | null => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const code = xmlDoc.getElementsByTagName("CODE")[0]?.textContent;
      const message = xmlDoc.getElementsByTagName("MESSAGE")[0]?.textContent;
      
      if (code && message) {
        return { code, message };
      }
      return null;
    } catch (err) {
      console.error('XML 파싱 에러:', err);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!selectedStation) {
      console.log('역이 선택되지 않았습니다.');
      return;
    }

    console.log('시간표 조회 시작');
    console.log('선택된 역 정보:', selectedStation);
    console.log('선택된 옵션:', scheduleOptions);
    
    setLoading(true);
    setError(null);

    try {
      // API 엔드포인트 URL 구성
      const apiKey = '45786f636973636f39397046796141';
      const url = `http://openapi.seoul.go.kr:8088/${apiKey}/xml/SearchSTNTimeTableByIDService/1/5/${selectedStation.code}/${scheduleOptions.weekTag}/${scheduleOptions.updnTag}/`;
      
      console.log('API 요청 정보:');
      console.log('- 최종 API URL:', url);
      console.log('- 역 코드 (API 호출 시):', selectedStation.code);
      console.log('- 역 이름 (API 호출 시):', selectedStation.name);
      console.log('- 요일구분 (API 호출 시):', scheduleOptions.weekTag);
      console.log('- 상하행구분 (API 호출 시):', scheduleOptions.updnTag);
      
      console.log('API 요청 시작...');
      const response = await fetch(url);
      console.log('API 응답 상태:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('응답 데이터 파싱 시작...');
      const data = await response.text();
      console.log('API 응답 데이터:', data);
      
      // API 응답 파싱
      const parsedResponse = parseXmlResponse(data);
      if (parsedResponse) {
        console.log('파싱된 응답:', parsedResponse);
        if (parsedResponse.code === 'INFO-100') {
          throw new Error('API 인증키가 유효하지 않습니다. 관리자에게 문의해주세요.');
        }
        if (parsedResponse.code === 'INFO-200') {
          throw new Error('해당하는 데이터가 없습니다.');
        }
        if (parsedResponse.code !== 'INFO-000') {
          throw new Error(parsedResponse.message || '알 수 없는 오류가 발생했습니다.');
        }
      }
      
      console.log('시간표 데이터 설정 완료');
      setSchedule(data);
    } catch (err) {
      console.error('에러 발생:', err);
      console.error('에러 상세 정보:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(err instanceof Error ? err.message : '시간표를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      console.log('시간표 조회 프로세스 종료');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">지하철 시간표</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          호선 선택
        </label>
        <select
          value={selectedLine}
          onChange={(e) => handleLineChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">호선을 선택하세요</option>
          {subwayLines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLine && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            역 선택
          </label>
          <select
            value={selectedStation?.code || ''}
            onChange={(e) => {
              const station = subwayLines
                .find(line => line.id === selectedLine)
                ?.stations.find(s => s.code === e.target.value);
              if (station) handleStationChange(station);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">역을 선택하세요</option>
            {subwayLines
              .find(line => line.id === selectedLine)
              ?.stations.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedStation && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요일 구분
              </label>
              <select
                value={scheduleOptions.weekTag}
                onChange={(e) => handleOptionChange('weekTag', e.target.value as '1' | '2' | '3')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1">평일</option>
                <option value="2">토요일</option>
                <option value="3">일요일/공휴일</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상/하행 구분
              </label>
              <select
                value={scheduleOptions.updnTag}
                onChange={(e) => handleOptionChange('updnTag', e.target.value as '1' | '2')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1">상행</option>
                <option value="2">하행</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '시간표 불러오는 중...' : '시간표 조회'}
          </button>
        </>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {schedule && <SubwayScheduleTable schedule={schedule} />}
    </div>
  );
};

export default SubwaySchedulePage; 