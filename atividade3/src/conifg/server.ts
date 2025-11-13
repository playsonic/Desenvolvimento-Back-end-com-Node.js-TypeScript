import express from 'express';
import userRouter from '../routes/UserRoutes.js';

const server = express();

server.use(express.json());

server.use(userRouter);

server.get('/', (_req, res) => {res.json({ message: 'Hello World!' }); });

server.use(
    (err: any, _req: express.Request, res: express.Response, _next: any) => {
        console.log(err);
        res.status(500).json({error: 'Internal server error!'});
        
    }
);

server.listen(3000, () => console.log("Server running"))

export default server;
