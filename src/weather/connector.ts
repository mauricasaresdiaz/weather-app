import {Coordinates, Weather, WeatherPayload} from './weather';

/**
 * Generic interface that represents the connection with an
 * external weather provider from which we will obtain weather
 * information.
 */
export interface Connector<P extends WeatherPayload> {
  /**
   * Obtains the current weather for a location from some weather provider
   * @param location location for which we must obtain the weather
   * @returns current weather of the indicated location from a weather provider
   */
  getWeather(location: string | Coordinates): Promise<Weather<P>>;
}
