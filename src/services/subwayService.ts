import { SubwayTimeTableItem } from '../types/subway';

const API_KEY = '45786f636973636639397046796141';
const BASE_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchSTNTimeTableByIDService/1/5`;

export const fetchSubwaySchedule = async (
  stationCode: string,
  weekTag: 1 | 2 | 3, // 1: 평일, 2: 토요일, 3: 일요일/공휴일
  updnTag: 1 | 2 // 1: 상행, 2: 하행
): Promise<SubwayTimeTableItem[]> => {
  const url = `/api/subway?stationCode=${stationCode}&weekTag=${weekTag}&updnTag=${updnTag}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();

    // XML 파싱
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const resultNode = xmlDoc.querySelector('SearchSTNTimeTableByIDService > RESULT > CODE');
    if (resultNode && resultNode.textContent !== 'INFO-000') {
      const messageNode = xmlDoc.querySelector('SearchSTNTimeTableByIDService > RESULT > MESSAGE');
      throw new Error(messageNode?.textContent || 'API Error');
    }

    const rows = Array.from(xmlDoc.querySelectorAll('SearchSTNTimeTableByIDService > row'));
    const schedule: SubwayTimeTableItem[] = rows.map(row => ({
      LINE_NUM: row.querySelector('LINE_NUM')?.textContent || '',
      STATION_CD: row.querySelector('STATION_CD')?.textContent || '',
      STATION_NM: row.querySelector('STATION_NM')?.textContent || '',
      TRAIN_NO: row.querySelector('TRAIN_NO')?.textContent || '',
      ARRIVETIME: row.querySelector('ARRIVETIME')?.textContent || '',
      DEPARTTIME: row.querySelector('DEPARTTIME')?.textContent || '',
      DESTINATION_STATION: row.querySelector('DESTINATION_STATION')?.textContent || '',
      UPDN_TAG: row.querySelector('UPDN_TAG')?.textContent || '',
      WEEK_TAG: row.querySelector('WEEK_TAG')?.textContent || '',
    }));

    return schedule;
  } catch (error) {
    console.error("Failed to fetch subway schedule:", error);
    throw error;
  }
}; 