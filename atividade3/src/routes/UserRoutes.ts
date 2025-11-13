import { Router } from "express";
import UserControllers from "../controllers/UserControllers.js";

const userRouter = Router();

userRouter.post('/users', UserControllers.create);

userRouter.get('/users/:id', UserControllers.read);

userRouter.put('/users/:id', UserControllers.update);

userRouter.delete('/users/:id', UserControllers.remove);

export default userRouter;