import type { Request, Response } from 'express';
import userServices from '../services/UserServices.js';

const userService = new userServices();

export default class UserControllers {
	static async create(req: Request, res: Response): Promise<Response> {
		try {
			const { name, email, password } = req.body;

			if (
				typeof name !== 'string' ||
				typeof email !== 'string' ||
				typeof password !== 'string'
			)
				throw new Error('Missing user information.');

			const user = await userService.createUser({ name, email, password });

			return res.status(201).json(user);
		} catch (err) {
			if (err instanceof Error)
				return res.status(400).json({ error: err.message });

			return res.status(500).json({ error: 'An unknoum error has occoured!' });
		}
	}
		static async read(req: Request, res: Response): Promise<Response> {
        	try {
            const {id} = req.params;

			if (!id) {
        return res.status(400).json({ error: 'User ID is required.' });
      }

            
            const user = await userService.findById(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found!' });
            }
            
            const { password, ...safeUser } = user;
            return res.status(200).json(safeUser);
        } catch (err) {
            return res.status(500).json({ error: 'An unknoum error has occoured!' });
        }
    }

	static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

			if (!id) {
        return res.status(400).json({ error: 'User ID is required.' });
      }


            const updateData = req.body;

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ error: 'No update data provided.' });
            }

            const updatedUser = await userService.updateUser(id, updateData);

            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(500).json({ error: 'An unknoum error has occoured!' });
        }
    }
	static async remove(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

			if (!id) {
        return res.status(400).json({ error: 'User ID is required.' });
      }


            await userService.deleteUser(id);
            
            return res.status(204).send(); 
        } catch (err) {
            return res.status(500).json({ error: 'An unknoum error has occoured!' });
        }
    }
}