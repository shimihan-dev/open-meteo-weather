import React from 'react';

interface SubwayScheduleTableProps {
  schedule: string;
}

const SubwayScheduleTable: React.FC<SubwayScheduleTableProps> = ({ schedule }) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(schedule, "text/xml");
  const rows = xmlDoc.getElementsByTagName("row");

  const scheduleData = Array.from(rows).map(row => ({
    stationName: row.getElementsByTagName("STATION_NM")[0]?.textContent || '',
    arrivalTime: row.getElementsByTagName("ARRIVETIME")[0]?.textContent || '',
    destination: row.getElementsByTagName("DESTINATION")[0]?.textContent || '',
    lineNumber: row.getElementsByTagName("LINE_NUM")[0]?.textContent || '',
    weekTag: row.getElementsByTagName("WEEK_TAG")[0]?.textContent || '',
    updnTag: row.getElementsByTagName("UPDN_TAG")[0]?.textContent || ''
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">시간표</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">역명</th>
              <th className="px-4 py-2 border">도착시간</th>
              <th className="px-4 py-2 border">행선지</th>
              <th className="px-4 py-2 border">호선</th>
              <th className="px-4 py-2 border">요일구분</th>
              <th className="px-4 py-2 border">상하행</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.stationName}</td>
                <td className="px-4 py-2 border">{item.arrivalTime}</td>
                <td className="px-4 py-2 border">{item.destination}</td>
                <td className="px-4 py-2 border">{item.lineNumber}</td>
                <td className="px-4 py-2 border">
                  {item.weekTag === '1' ? '평일' : item.weekTag === '2' ? '토요일' : '일요일/공휴일'}
                </td>
                <td className="px-4 py-2 border">
                  {item.updnTag === '1' ? '상행' : '하행'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubwayScheduleTable; 