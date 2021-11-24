import {OpenWeatherPayload} from '../../../src/openWeather/openWeatherParser';
import {Coordinates, Weather} from '../../../src/weather/weather';

export function getRawWeatherByCity(location: string): any {
  return {
    coord: {
      lon: -64.1811,
      lat: -31.4135,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 29.02,
      feels_like: 28.15,
      temp_min: 24.14,
      temp_max: 30.42,
      pressure: 1014,
      humidity: 34,
    },
    visibility: 10000,
    wind: {
      speed: 1.79,
      deg: 315,
      gust: 3.58,
    },
    clouds: {
      all: 1,
    },
    dt: 1637762468,
    sys: {
      type: 2,
      id: 2036678,
      country: 'AR',
      sunrise: 1637744776,
      sunset: 1637794867,
    },
    timezone: -10800,
    id: 3860259,
    name: location,
    cod: 200,
  };
}

export function getRawWeatherByGeoCoordinates(coordinates: Coordinates): any {
  return {
    lat: coordinates.lat,
    lon: coordinates.lon,
    timezone: 'Etc/GMT+2',
    timezone_offset: -7200,
    current: {
      dt: 1637763135,
      sunrise: 1637727312,
      sunset: 1637796599,
      temp: -1.66,
      feels_like: -4.8,
      pressure: 986,
      humidity: 79,
      dew_point: -4.46,
      uvi: 12.01,
      clouds: 99,
      visibility: 10000,
      wind_speed: 2.33,
      wind_deg: 333,
      wind_gust: 2.74,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
    },
  };
}

export function getOpenWeatherInstance(): Weather<OpenWeatherPayload> {
  return {
    city: 'Río Cuarto',
    coordinates: {
      lat: -33.1307,
      lon: -64.3499,
    },
    temperature: 25.49,
    feelsLike: 25.17,
    payload: {
      visibility: 10000,
      pressure: 1009,
      humidity: 41,
      clouds: 0,
      windSpeed: 9.77,
    },
  };
}
