import chai from 'chai';
import {stubInterface, StubbedInstance} from 'ts-sinon';
import {
  Weather,
  WeatherPayload,
  Coordinates,
} from '../../../src/weather/weather';
import {Connector} from '../../../src/weather/connector';
const expect = chai.expect;

describe('Connector', () => {
  const mockWeather = stubInterface<Weather<WeatherPayload>>();

  let connector: StubbedInstance<Connector<WeatherPayload>>;

  beforeEach(() => {
    connector = stubInterface<Connector<WeatherPayload>>();
  });

  it('should get Weather by city name', async () => {
    const location = 'some location name';
    connector.getWeather
      .withArgs(location)
      .returns(Promise.resolve(mockWeather));

    expect(await connector.getWeather(location)).to.deep.equal(mockWeather);
  });

  it('should get Weather by geo coordinates', async () => {
    const location = stubInterface<Coordinates>();
    connector.getWeather
      .withArgs(location)
      .returns(Promise.resolve(mockWeather));

    expect(await connector.getWeather(location)).to.deep.equal(mockWeather);
  });
});
