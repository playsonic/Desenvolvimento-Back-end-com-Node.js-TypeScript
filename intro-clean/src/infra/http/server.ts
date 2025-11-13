import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { AppError } from '../../app/errors/app-error.js';
import { userRouts } from './routes/user.routes.js';

const server = fastify({
	logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(userRouts);

server.setErrorHandler((error, _request, reply) => {
	if (error instanceof AppError)
		return reply
			.status(error.statusCode)
			.send({ message: error.message });

	server.log.error(error);

	return reply.status(500).send({ message: 'Unknown error' });
});

export { server };
