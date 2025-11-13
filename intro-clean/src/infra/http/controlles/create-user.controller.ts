import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateUserUseCase } from '../../../app/use-cases/create-user.user-case.js';
import type { createUserBody } from '../dtos/user.dto.js';

export class CreateUserController {
	constructor(private readonly createUseCase: CreateUserUseCase) {}

	async handle(
		request: FastifyRequest<{ Body: createUserBody }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
				const { email, name, password } = request.body;

			const output = await this.createUseCase.execute({
				email,
				name,
				password,
			});

			return reply.status(201).send(output);
		}
}
