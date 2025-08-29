import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import userRouter from './routes/user'
import cardRouter from './routes/card'
import notFoundHandler from "./middleware/404";

const app = express()
const port = 3000;
mongoose.connect('mongodb://localhost:27017/mestodb')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '68b0043352d6b98e4e781ddd'
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log('Listening on port ' + port);
})