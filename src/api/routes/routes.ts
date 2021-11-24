import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from 'fastify';
import fp from 'fastify-plugin';
import {WeatherController} from '../controllers/weatherControllers';

interface WeatherByCityParams {
  name: string;
  temperature?: number;
}

interface WeatherByCoordinatesParams {
  lat: number;
  lon: number;
  temperature?: number;
}

interface ProviderQueryString {
  accessToken?: string;
  provider?: string;
}

const WeatherRoutes: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions,
) => {
  server.get<{Params: WeatherByCityParams; Querystring: ProviderQueryString}>(
    '/api/weather/city/:name',
    {},
    async (request, reply) => {
      try {
        const {accessToken, provider} = request.query;
        const {name} = request.params;

        const weatherController = new WeatherController(accessToken, provider);
        const weather = await weatherController.getWeatherByCity(name);

        return reply.code(200).send(weather);
      } catch (error) {
        request.log.error(error);
        return reply.send(500);
      }
    },
  );

  server.get<{Params: WeatherByCityParams; Querystring: ProviderQueryString}>(
    '/api/weather/city/:name/greaterThan/:temperature',
    {},
    async (request, reply) => {
      try {
        const {accessToken, provider} = request.query;
        const {name, temperature} = request.params;

        const weatherController = new WeatherController(accessToken, provider);
        if (!temperature) {
          throw new Error('');
        }
        const isGreater = await weatherController.isCityTemperatureGreaterThan(
          name,
          temperature,
        );

        return reply.code(200).send(isGreater);
      } catch (error) {
        request.log.error(error);
        return reply.send(500);
      }
    },
  );

  server.get<{
    Params: WeatherByCoordinatesParams;
    Querystring: ProviderQueryString;
  }>('/api/weather/lat/:lat/lon/:lon', {}, async (request, reply) => {
    try {
      const {accessToken, provider} = request.query;
      const {lat, lon} = request.params;

      const weatherController = new WeatherController(accessToken, provider);
      const weather = await weatherController.getWeatherByCoordinates(lat, lon);

      return reply.code(200).send(weather);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });

  server.get<{
    Params: WeatherByCoordinatesParams;
    Querystring: ProviderQueryString;
  }>(
    '/api/weather/lat/:lat/lon/:lon/greaterThan/:temperature',
    {},
    async (request, reply) => {
      try {
        const {accessToken, provider} = request.query;
        const {lat, lon, temperature} = request.params;

        const weatherController = new WeatherController(accessToken, provider);
        if (!temperature) {
          throw new Error('');
        }
        const isGreater =
          await weatherController.isCoordinatesTemperatureGreaterThan(
            lat,
            lon,
            temperature,
          );

        return reply.code(200).send(isGreater);
      } catch (error) {
        request.log.error(error);
        return reply.send(500);
      }
    },
  );
};

export default fp(WeatherRoutes);
