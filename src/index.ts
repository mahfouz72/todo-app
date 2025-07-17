import express, {Request, Response} from 'express';
import {todoRouter} from "./todo/todo.route";
import {userRouter} from "./user/user.route";
import {errorHandler} from "./middlewares/errorHandler";
import dotenv from "dotenv";
import {authenticationFilter} from "./middlewares/authenticationFilter";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(authenticationFilter);

app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

