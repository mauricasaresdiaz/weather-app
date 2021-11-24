import {Connector} from '../weather/connector';
import {OpenWeatherConnector} from '../openWeather/openWeatherConnector';
import {WeatherPayload} from '../weather/weather';

export class WeatherConnectorFactory {
  /**
   * returns the appropriate Connector instance for the indicated provider
   * @param provider the name of the wather provider to create the proper connector
   * @param accessToken access token to request waether info to the provider if necessary
   * @returns proper weather connector
   */
  static createWeatherConnector(
    provider: string,
    accessToken?: string,
  ): Connector<WeatherPayload> {
    switch (provider) {
      case 'OpenWeather':
        if (!accessToken) {
          throw new Error(
            'Error creating WeatherConnector: OpenWeatherConnector needs an access token',
          );
        }
        return WeatherConnectorFactory.createOpenWeatherConnector(accessToken);
      default:
        if (!accessToken) {
          throw new Error(
            'Error creating WeatherConnector: OpenWeatherConnector needs an access token',
          );
        }
        return WeatherConnectorFactory.createOpenWeatherConnector(accessToken);
    }
  }

  static createOpenWeatherConnector(accessToken: string): OpenWeatherConnector {
    return new OpenWeatherConnector(accessToken);
  }
}
