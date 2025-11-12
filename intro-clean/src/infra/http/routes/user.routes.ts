import type { FastifyInstance } from 'fastify';
import { CreateUserUseCase } from '../../../app/use-cases/create-user.user-case.js';
import { AppDataSource } from '../../database/typeorm/data-source.js';
import { UserModel } from '../../database/typeorm/models/user.model.js';
import { TypeORMUserRepository } from '../../database/typeorm/repositories/user.repository.js';
import { CreateUserController } from '../controlles/create-user.controller.js';
import { createUserSchema } from '../dtos/user.dto.js';

export async function userRouts(app: FastifyInstance) {
	const typeOrmRepository = new TypeORMUserRepository(
		AppDataSource.getRepository(UserModel),
	), 
    createUserUserCase = new CreateUserUseCase(typeOrmRepository), 
    createUserController = new CreateUserController(createUserUserCase);

	app.post(
		'/users',
		{
			schema: createUserSchema,
		},
		createUserController.handle.bind(createUserController),
	);
}
