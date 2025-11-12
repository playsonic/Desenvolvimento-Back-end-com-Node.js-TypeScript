import 'reflect-metadata';
import { AppDataSource } from './infra/database/typeorm/data-source.js';
import { server } from './infra/http/server.js';
import { env } from './config/env.js';

const start = () => {
    try {
          AppDataSource.initialize();
        
        console.log('data source was initilized!');

         server.listen({
            port: env.PORT, host: '0.0.0.0'
        });
        console.log(`Server is listening at http://localhost:${env.PORT}`)
    } catch (error) {
        console.error(error);
        server.log.error(error);
        process.exit();
        
    }
};

start()