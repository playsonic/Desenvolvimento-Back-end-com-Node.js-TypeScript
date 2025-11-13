import bycrypt from 'bcrypt';
import { AppDataSource } from "../conifg/data-source.js";
import User from "../models/User.js";

interface CreateUserDTO {email: string; name: string; password: string;}

interface UpdateUserDTO {name?: string; email?: string; password?: string;}


export default class userServices {
    private repo = () => AppDataSource.getRepository(User);

    async createUser({email, name, password}: CreateUserDTO): Promise<Omit<CreateUserDTO, 'password'>> { 
        
        const repository = this.repo();

        const existing = await repository.findOneBy({ email });

        if (existing) throw new Error('Email has already in use!')

        const saltRounds = 10;

        const hashed = await bycrypt.hash(password, saltRounds)

        const user = repository.create({name, email, password: hashed})

        await repository.save(user);

        const {password: _password, ...safeUser} = user;

        return safeUser;
    }

    async findById(id: string): Promise<User | null> {
        const repository = this.repo();
        const user = await repository.findOneBy({ id });
        return user; 
    }

    async updateUser(id: string, updateData: UpdateUserDTO): Promise<Omit<CreateUserDTO, 'password'>> {
        const repository = this.repo();
        const user = await repository.findOneBy({ id });

        if (!user) throw new Error('User not found!');

        if (updateData.name) user.name = updateData.name;
        if (updateData.email) user.email = updateData.email;
        if (updateData.password) {
            const saltRounds = 10;
            user.password = await bycrypt.hash(updateData.password, saltRounds);
        }

        const updatedUser = await repository.save(user);

        const {password: _password, ...safeUser} = updatedUser;
        return safeUser;
    }

        async deleteUser(id: string): Promise<void> {
        const repository = this.repo();
        const result = await repository.delete(id);

        if (result.affected === 0) {
            throw new Error('User not found!');
}
        
}
};