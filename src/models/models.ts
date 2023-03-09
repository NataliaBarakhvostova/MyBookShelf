export type CityProps = {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
};

export type AirQualityProps = {
  title: string;
  airData?: {
    hourly: AirPollution;
  };
};

export type AirPollution = {
  european_aqi?: number[];
  time?: string[];
};