/**
 * Generic interface to represent weather data of a location
 */
export interface Weather<P extends WeatherPayload> {
  city: string;
  coordinates: Coordinates;
  temperature: number;
  feelsLike: number;
  payload: P;
}

/**
 * Generic payload to extend for different providers
 */
export interface WeatherPayload {}

/**
 * Specific interfece to repesent geographical coordinates
 */
export interface Coordinates {
  lat: number;
  lon: number;
}
