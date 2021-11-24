import chai from 'chai';
import {OpenWeatherConnector} from '../../../src/openWeather/openWeatherConnector';
import sinon, {stubInterface} from 'ts-sinon';
import axios, {AxiosInstance} from 'axios';
import {getOpenWeatherInstance} from './mockData';
import {
  OpenWeatherCityParser,
  OpenWeatherCoordinatesParser,
} from '../../../src/openWeather/openWeatherParser';
import {Coordinates} from '../../../src/weather/weather';

const expect = chai.expect;

describe('OpenWeatherConnector', () => {
  function restoreWrappedMethod(method: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (method.restore) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      method.restore();
    }
  }

  it('should create an OpenWeatherConnector', async () => {
    const accessToken = 'Some access Token';
    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    expect(openWeatherConnector instanceof OpenWeatherConnector).to.be.equal(
      true,
    );
  });

  it('should get weather from OpenWeather by city', async () => {
    const accessToken = 'Some access Token';
    const location = 'Some location';
    const openWeather = getOpenWeatherInstance();

    const mockAxiosInstance = stubInterface<AxiosInstance>();
    sinon.stub(axios, 'create').returns(mockAxiosInstance);
    mockAxiosInstance.get.returns(Promise.resolve(openWeather));

    sinon
      .stub(OpenWeatherCityParser.prototype, 'parseWeather')
      .returns(openWeather);

    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    const weather = await openWeatherConnector.getWeather(location);

    expect(weather).to.be.deep.equal(openWeather);

    restoreWrappedMethod(axios.create);
    restoreWrappedMethod(OpenWeatherCityParser.prototype.parseWeather);
  });

  it('should get weather from OpenWeather by geo coordinates', async () => {
    const accessToken = 'Some access Token';
    const location = stubInterface<Coordinates>();
    const openWeather = getOpenWeatherInstance();

    const mockAxiosInstance = stubInterface<AxiosInstance>();
    sinon.stub(axios, 'create').returns(mockAxiosInstance);
    mockAxiosInstance.get.returns(Promise.resolve(openWeather));

    sinon
      .stub(OpenWeatherCoordinatesParser.prototype, 'parseWeather')
      .returns(openWeather);

    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    const weather = await openWeatherConnector.getWeather(location);

    expect(weather).to.be.deep.equal(openWeather);

    restoreWrappedMethod(axios.create);
    restoreWrappedMethod(OpenWeatherCoordinatesParser.prototype.parseWeather);
  });

  it('should fail getting weather from OpenWeather by city for parsing errors', async () => {
    const accessToken = 'Some access Token';
    const location = 'Some location';
    const openWeather = getOpenWeatherInstance();

    const mockAxiosInstance = stubInterface<AxiosInstance>();
    sinon.stub(axios, 'create').returns(mockAxiosInstance);
    mockAxiosInstance.get.returns(Promise.resolve(openWeather));

    sinon
      .stub(OpenWeatherCityParser.prototype, 'parseWeather')
      .throws(new Error('Error parsing'));

    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    try {
      await openWeatherConnector.getWeather(location);
      expect.fail(
        'openWeatherConnector.getWeather() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(
          error.message.includes('Error Gettiong weather from OpenWeather: '),
        ).to.be.equal(true);
      } else {
        expect.fail(
          'openWeatherConnector.getWeather() should have thrown an error but it did not',
        );
      }
    }

    restoreWrappedMethod(axios.create);
    restoreWrappedMethod(OpenWeatherCityParser.prototype.parseWeather);
  });

  it('should fail getting weather from OpenWeather by geo coordinates for parsing errors', async () => {
    const accessToken = 'Some access Token';
    const location = stubInterface<Coordinates>();
    const openWeather = getOpenWeatherInstance();

    const mockAxiosInstance = stubInterface<AxiosInstance>();
    sinon.stub(axios, 'create').returns(mockAxiosInstance);
    mockAxiosInstance.get.returns(Promise.resolve(openWeather));

    sinon
      .stub(OpenWeatherCoordinatesParser.prototype, 'parseWeather')
      .throws(new Error('Error parsing'));

    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    try {
      await openWeatherConnector.getWeather(location);
      expect.fail(
        'openWeatherConnector.getWeather() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(
          error.message.includes('Error Gettiong weather from OpenWeather: '),
        ).to.be.equal(true);
      } else {
        expect.fail(
          'openWeatherConnector.getWeather() should have thrown an error but it did not',
        );
      }
    }

    restoreWrappedMethod(axios.create);
    restoreWrappedMethod(OpenWeatherCoordinatesParser.prototype.parseWeather);
  });

  it('should fail getting weather from OpenWeather by city for OpenWeather API errors', async () => {
    const accessToken = 'Some access Token';
    const location = 'Some location';

    const mockAxiosInstance = stubInterface<AxiosInstance>();
    sinon.stub(axios, 'create').returns(mockAxiosInstance);
    mockAxiosInstance.get.returns(Promise.reject(new Error('Error with api')));

    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    try {
      await openWeatherConnector.getWeather(location);
      expect.fail(
        'openWeatherConnector.getWeather() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(
          error.message.includes('Error Gettiong weather from OpenWeather: '),
        ).to.be.equal(true);
      } else {
        expect.fail(
          'openWeatherConnector.getWeather() should have thrown an error but it did not',
        );
      }
    }

    restoreWrappedMethod(axios.create);
  });

  it('should fail getting weather from OpenWeather by geo coordinates for OpenWeather API errors', async () => {
    const accessToken = 'Some access Token';
    const location = stubInterface<Coordinates>();

    const mockAxiosInstance = stubInterface<AxiosInstance>();
    sinon.stub(axios, 'create').returns(mockAxiosInstance);
    mockAxiosInstance.get.returns(Promise.reject(new Error('Error with api')));

    const openWeatherConnector = new OpenWeatherConnector(accessToken);

    try {
      await openWeatherConnector.getWeather(location);
      expect.fail(
        'openWeatherConnector.getWeather() should have thrown an error but it executed correctly',
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error).to.be.an('Error');
        expect(
          error.message.includes('Error Gettiong weather from OpenWeather: '),
        ).to.be.equal(true);
      } else {
        expect.fail(
          'openWeatherConnector.getWeather() should have thrown an error but it did not',
        );
      }
    }

    restoreWrappedMethod(axios.create);
  });
});
