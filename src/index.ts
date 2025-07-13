import express, {Request, Response} from 'express';
import {todoRouter} from "./todo/todo.route";
import {userRouter} from "./user/user.route";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
})

app.use(express.json());
app.use('/todos', todoRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

