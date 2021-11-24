import {Coordinates, Weather} from '../weather/weather';
import {Connector} from '../weather/connector';
import axios, {AxiosInstance} from 'axios';
import {
  OpenWeatherCityParser,
  OpenWeatherCoordinatesParser,
  OpenWeatherPayload,
} from './openWeatherParser';

/**
 * Specific class that represents the connection with the
 * external weather provider OpenWeatherMap https://openweathermap.org/
 */
export class OpenWeatherConnector implements Connector<OpenWeatherPayload> {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly accessToken: string) {
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 2000,
    });
  }

  /**
   * Obtains the current weather for a location from https://openweathermap.org/
   * @param location location for which we must obtain the weather
   * @returns current weather of the indicated location from OpenWeather
   */
  async getWeather(
    location: string | Coordinates,
  ): Promise<Weather<OpenWeatherPayload>> {
    let weather: Weather<OpenWeatherPayload>;

    try {
      if (typeof location === 'string') {
        weather = await this.getWeatherByCity(location);
      } else {
        weather = await this.getWeatherByCoordinates(location);
      }
    } catch (error) {
      throw new Error('Error Gettiong weather from OpenWeather: ' + error);
    }

    return weather;
  }

  /**
   * Obtains the current weather for a location indicated as a city name
   * @param location name of the city for which we must obtain the weather
   * @returns current weather of the indicated location from OpenWeather
   */
  private async getWeatherByCity(
    location: string,
  ): Promise<Weather<OpenWeatherPayload>> {
    const weather = await this.axiosInstance
      .get(`weather?q=${location}&units=metric&appid=${this.accessToken}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(
          'Error consuming OpenWeather API in getWeatherByCity method ' + err,
        );
      });

    const parser = new OpenWeatherCityParser();

    return parser.parseWeather(weather);
  }

  /**
   * Obtains the current weather for a location indicated as geographical coordinates
   * @param location lat and lon of the location for which we must obtain the weather
   * @returns current weather of the indicated location from OpenWeather
   */
  private async getWeatherByCoordinates(
    location: Coordinates,
  ): Promise<Weather<OpenWeatherPayload>> {
    const weather = await this.axiosInstance
      .get(
        `onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${this.accessToken}`,
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(
          'Error consuming OpenWeather API in getWeatherByCoordinates method  ' +
            err,
        );
      });

    const parser = new OpenWeatherCoordinatesParser();

    return parser.parseWeather(weather);
  }
}
