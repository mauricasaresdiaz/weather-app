import chai from 'chai';
import {WeatherConnectorFactory} from '../../../src/weatherFactory/weatherFactory';
import {OpenWeatherConnector} from '../../../src/openWeather/openWeatherConnector';
const expect = chai.expect;

describe('WeatherFactory', () => {
  it('should create an OpenWeatherConnector by default', async () => {
    const accessToken = 'some access Token';
    const notProvider = '';

    const openWeatherConnector = WeatherConnectorFactory.createWeatherConnector(
      notProvider,
      accessToken,
    );

    expect(openWeatherConnector instanceof OpenWeatherConnector).to.be.equal(
      true,
    );
  });

  it('should fail with invalid token creating OpenWeatherConnector by default', async () => {
    const notProvider = '';

    try {
      WeatherConnectorFactory.createWeatherConnector(notProvider);
      expect.fail(
        'WeatherConnectorFactory.createWeatherConnector() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(error.message).to.be.equal(
          'Error creating WeatherConnector: OpenWeatherConnector needs an access token',
        );
      } else {
        expect.fail(
          'WeatherConnectorFactory.createWeatherConnector() should have thrown an error but it did not',
        );
      }
    }
  });

  it('should create an OpenWeatherConnector passing OpenWeather as provider', async () => {
    const accessToken = 'some access Token';
    const notProvider = 'OpenWeather';

    const openWeatherConnector = WeatherConnectorFactory.createWeatherConnector(
      notProvider,
      accessToken,
    );

    expect(openWeatherConnector instanceof OpenWeatherConnector).to.be.equal(
      true,
    );
  });

  it('should fail with invalid token creating OpenWeatherConnector passing OpenWeather as provide', async () => {
    const notProvider = 'OpenWeather';

    try {
      WeatherConnectorFactory.createWeatherConnector(notProvider);
      expect.fail(
        'WeatherConnectorFactory.createWeatherConnector() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(error.message).to.be.equal(
          'Error creating WeatherConnector: OpenWeatherConnector needs an access token',
        );
      } else {
        expect.fail(
          'WeatherConnectorFactory.createWeatherConnector() should have thrown an error but it did not',
        );
      }
    }
  });

  it('should create an OpenWeatherConnector calling createOpenWeatherConnector', async () => {
    const accessToken = 'some access Token';

    const openWeatherConnector =
      WeatherConnectorFactory.createOpenWeatherConnector(accessToken);

    expect(openWeatherConnector instanceof OpenWeatherConnector).to.be.equal(
      true,
    );
  });
});
