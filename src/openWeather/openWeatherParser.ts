import {Parser} from '../weather/parser';
import {WeatherPayload, Weather} from '../weather/weather';

export class OpenWeatherCoordinatesParser
  implements Parser<OpenWeatherPayload>
{
  parseWeather(rawWeather: any): Weather<OpenWeatherPayload> {
    try {
      const weather: Weather<OpenWeatherPayload> = {
        city: rawWeather.timezone,
        coordinates: {
          lat: rawWeather.lat,
          lon: rawWeather.lon,
        },
        temperature: rawWeather.current.temp,
        feelsLike: rawWeather.current.feels_like,
        payload: {
          visibility: rawWeather.current.visibility,
          pressure: rawWeather.current.pressure,
          humidity: rawWeather.current.humidity,
          uvi: rawWeather.current.uvi,
          clouds: rawWeather.current.clouds,
          windSpeed: rawWeather.current.wind_speed,
        },
      };

      return weather;
    } catch (error) {
      throw new Error(
        'Error parsing in OpenWeatherCoordinatesParser: ' + error,
      );
    }
  }
}

export class OpenWeatherCityParser implements Parser<OpenWeatherPayload> {
  parseWeather(rawWeather: any): Weather<OpenWeatherPayload> {
    try {
      const weather: Weather<OpenWeatherPayload> = {
        city: rawWeather.name,
        coordinates: {
          lat: rawWeather.coord.lat,
          lon: rawWeather.coord.lon,
        },
        temperature: rawWeather.main.temp,
        feelsLike: rawWeather.main.feels_like,
        payload: {
          visibility: rawWeather.visibility,
          pressure: rawWeather.main.pressure,
          humidity: rawWeather.main.humidity,
          clouds: rawWeather.clouds.all,
          windSpeed: rawWeather.wind.speed,
        },
      };

      return weather;
    } catch (error) {
      throw new Error('Error parsing in OpenWeatherCityParser: ' + error);
    }
  }
}

export interface OpenWeatherPayload extends WeatherPayload {
  visibility: number;
  pressure: number;
  humidity: number;
  clouds: number;
  windSpeed: number;
  uvi?: number;
}
