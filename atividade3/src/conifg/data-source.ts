import { DataSource } from "typeorm";
import User from "../models/User.js";

if (typeof process.env.DB_HOST === 'undefined') throw new Error('var mãe não definida!');

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5342', 10),
    username: process.env.DB_USER ?? 'docker',
    password: process.env.DB_PASS ?? 'docker',
    database: process.env.DB_NAME ?? 'intro_aula3',

    synchronize: true,
    logging: false,

    entities:[User],
    migrations: [],
    subscribers: [],
})

