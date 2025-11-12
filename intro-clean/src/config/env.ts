import z from 'zod/v4';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	PORT: z.coerce.number<number>().default(3000),
	DB_HOST: z.string(),
	DP_PORT: z.coerce.number<number>().default(5432),
	DB_NAME: z.string(),
	DB_USER: z.string(),
	DP_PASS: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	
console.error('invalid environment variables:', _env.error.issues);
	
	throw new Error('Invalid environment variables.');
}

export const env = _env.data;

export const isDev = env.NODE_ENV === 'development';

export const isPRod = env.NODE_ENV === 'production';
