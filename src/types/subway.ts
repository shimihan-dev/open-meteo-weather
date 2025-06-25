export interface SubwayTimeTableItem {
  LINE_NUM: string;
  STATION_CD: string;
  STATION_NM: string;
  TRAIN_NO: string;
  ARRIVETIME: string;
  DEPARTTIME: string;
  DESTINATION_STATION: string;
  UPDN_TAG: string;
  WEEK_TAG: string;
  // 'SUBWAY_ID' is not explicitly mentioned in the sample but might be useful if present in full XML.
  // It's also not clear if 'REMARKS' is always present or needed.
}

export interface SubwayTimeTableResponse {
  SearchSTNTimeTableByIDService?: {
    row: SubwayTimeTableItem[];
    list_total_count: number;
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
  };
} 