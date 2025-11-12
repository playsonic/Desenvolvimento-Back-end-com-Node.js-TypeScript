import z from 'zod/v4';

export const createUserBodySchema = z.object({
	name: z.string().min(3, 'Name must be least 3 characters long'),
	email: z.email(),
	password: z.string().min(8, 'Password must be least 8 characters long'),
});

export type createUserBody = z.infer<typeof createUserBodySchema>;

export const createUserSchema = {
	body: createUserBodySchema,
};
