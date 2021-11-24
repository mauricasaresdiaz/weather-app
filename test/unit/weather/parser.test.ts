import chai from 'chai';
import {stubInterface, StubbedInstance} from 'ts-sinon';
import {Weather, WeatherPayload} from '../../../src/weather/weather';
import {Parser} from '../../../src/weather/parser';
const expect = chai.expect;

describe('Parser', () => {
  const mockWeather = stubInterface<Weather<WeatherPayload>>();

  let parser: StubbedInstance<Parser<WeatherPayload>>;

  beforeEach(() => {
    parser = stubInterface<Parser<WeatherPayload>>();
  });

  it('should parse raw weather to a Weather instance', async () => {
    const rawWeather = stubInterface<any>();
    parser.parseWeather.withArgs(rawWeather).returns(mockWeather);

    expect(parser.parseWeather(rawWeather)).to.deep.equal(mockWeather);
  });
});
