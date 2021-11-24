import {Connector} from '../../weather/connector';
import {Coordinates, WeatherPayload} from '../../weather/weather';
import {WeatherConnectorFactory} from '../../weatherFactory/weatherFactory';

export class WeatherController {
  private readonly weatherConnector: Connector<WeatherPayload>;

  constructor(
    private readonly accessToken: string = '',
    private readonly provider: string = '',
  ) {
    this.weatherConnector = WeatherConnectorFactory.createWeatherConnector(
      this.provider,
      this.accessToken,
    );
  }

  async getWeatherByCity(cityName: string) {
    return await this.weatherConnector.getWeather(cityName);
  }

  async getWeatherByCoordinates(lat: number, lon: number) {
    const coordinates: Coordinates = {
      lat,
      lon,
    };

    return await this.weatherConnector.getWeather(coordinates);
  }

  async isCityTemperatureGreaterThan(cityName: string, temperature: number) {
    const weather = await this.weatherConnector.getWeather(cityName);

    return weather.temperature > temperature;
  }

  async isCoordinatesTemperatureGreaterThan(
    lat: number,
    lon: number,
    temperature: number,
  ) {
    const coordinates: Coordinates = {
      lat,
      lon,
    };

    const weather = await this.weatherConnector.getWeather(coordinates);

    return weather.temperature > temperature;
  }
}
