import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import weatherRoutes from '../routes/routes';

const port = process.env.PORT || 3800;

export function startApp() {
  const server = fastify();

  server.register(fastifyCors, {
    origin: '*',
    methods: ['GET'],
  });
  server.register(weatherRoutes);

  server.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}
