import chai from 'chai';
import {getRawWeatherByCity, getRawWeatherByGeoCoordinates} from './mockData';
import {
  OpenWeatherCityParser,
  OpenWeatherCoordinatesParser,
} from '../../../src/openWeather/openWeatherParser';
import {Coordinates} from '../../../src/weather/weather';

const expect = chai.expect;

describe('OpenWeatherParser', () => {
  it('should parse weather with OpenWeatherCityParser', async () => {
    const parser = new OpenWeatherCityParser();
    const location = 'some location';
    const rawWeatherData = getRawWeatherByCity(location);
    const weather = parser.parseWeather(rawWeatherData);

    expect(weather.temperature).to.be.equal(rawWeatherData.main.temp);
    expect(weather.feelsLike).to.be.equal(rawWeatherData.main.feels_like);
    expect(weather.coordinates.lat).to.be.equal(rawWeatherData.coord.lat);
    expect(weather.coordinates.lon).to.be.equal(rawWeatherData.coord.lon);
    expect(weather.payload.windSpeed).to.be.equal(rawWeatherData.wind.speed);
    expect(weather.city).to.be.equal(rawWeatherData.name);
    expect(weather.payload.visibility).to.be.equal(rawWeatherData.visibility);
  });

  it('should parse weather with OpenWeatherCoordinatesParser', async () => {
    const parser = new OpenWeatherCoordinatesParser();
    const location: Coordinates = {lat: -33.2727, lon: -64.2727};
    const rawWeatherData = getRawWeatherByGeoCoordinates(location);
    const weather = parser.parseWeather(rawWeatherData);

    expect(weather.temperature).to.be.equal(rawWeatherData.current.temp);
    expect(weather.feelsLike).to.be.equal(rawWeatherData.current.feels_like);
    expect(weather.coordinates.lat).to.be.equal(rawWeatherData.lat);
    expect(weather.coordinates.lon).to.be.equal(rawWeatherData.lon);
    expect(weather.payload.windSpeed).to.be.equal(
      rawWeatherData.current.wind_speed,
    );
    expect(weather.city).to.be.equal(rawWeatherData.timezone);
    expect(weather.payload.visibility).to.be.equal(
      rawWeatherData.current.visibility,
    );
  });

  it('should fail parsing weather with OpenWeatherCityParser', async () => {
    const parser = new OpenWeatherCityParser();

    try {
      parser.parseWeather({});
      expect.fail(
        'parser.parseWeather() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(
          error.message.includes('Error parsing in OpenWeatherCityParser:'),
        ).to.be.equal(true);
      } else {
        expect.fail(
          'parser.parseWeather() should have thrown an error but it did not',
        );
      }
    }
  });

  it('should fail parsing weather with OpenWeatherCoordinatesParser', async () => {
    const parser = new OpenWeatherCoordinatesParser();

    try {
      parser.parseWeather({});
      expect.fail(
        'parser.parseWeather() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(
          error.message.includes(
            'Error parsing in OpenWeatherCoordinatesParser:',
          ),
        ).to.be.equal(true);
      } else {
        expect.fail(
          'parser.parseWeather() should have thrown an error but it did not',
        );
      }
    }
  });
});
