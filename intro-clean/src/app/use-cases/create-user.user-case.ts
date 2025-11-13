import { User } from '../entities/user.entity.js';
import { EmailAlreadyExist } from '../errors/aplication/email-already-exitst.js';
import type { IUserRepository } from '../repositories/user.repository.js';

interface CreateUserInputDTO {
	name: string;
	email: string;
	password: string;
}

interface CreateUserOutputDTO {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
}

export class CreateUserUseCase {
	constructor(private readonly UsersRepository: IUserRepository) {}

	async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
		const existing = await this.UsersRepository.findByEmail(input.email);

		if (existing) throw new EmailAlreadyExist(input.email);

		const user = await User.create(input);

		await this.UsersRepository.save(user);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createAt,
		};
	}
}
