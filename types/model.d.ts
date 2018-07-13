export declare interface CityModel {
  id: number,
  name: string;
  latin: string;
}

export declare interface PageModel {
  index: number;
  size: number;
}

export declare interface SeatParasModel {
  cinemaId: string;
  showId: string;
  hallId: string;
}

export declare interface SmartSeatModel {
  row: number;
  col: number;
  status: number;
  loveIndex: number;
  rowNumber: number;
  colNumber: number;
  rowLocation: number;
  colLocation: number;
}
