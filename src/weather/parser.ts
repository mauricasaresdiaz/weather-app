import {Weather, WeatherPayload} from './weather';

/**
 * Generic interface that represents the parsing of raw
 * weather data to an instance of the class Weather.
 */
export interface Parser<P extends WeatherPayload> {
  /**
   * Parses the raw weather data to a Weather object.
   * @param rawWeather object with the raw weather data obtained from some external provider
   * @returns an instance of the class Weather
   */
  parseWeather(rawWeather: any): Weather<P>;
}
