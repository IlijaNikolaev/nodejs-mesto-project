import { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

export default notFoundHandler;
