import { Request, Response } from 'express';
import User from '../models/user';
import {
  AVATAR_INCORRECT, ID_INCORRECT, PROFILE_INCORRECT, USER_NOT_FOUND,
} from '../constants/errorMessages';

export function getUsers(req: Request, res: Response) {
  return User.find({})
    .then((users) => res
      .status(200).send(users))
    .catch((err) => res.status(500).json(err));
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: USER_NOT_FOUND });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: ID_INCORRECT });
        return;
      }
      res.status(500).json(err);
    });
}

export function createUser(req: Request, res: Response) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: PROFILE_INCORRECT });
        return;
      }
      res.status(500).send(err);
    });
}

export function updateUser(req: Request, res: Response) {
  const { name, about } = req.body;
  const { _id: id } = req.user;

  return User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: USER_NOT_FOUND });
        return;
      }
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: PROFILE_INCORRECT });
        return;
      } if (err.name === 'CastError') {
        res.status(400).send({ message: ID_INCORRECT });
        return;
      }
      res.status(500).send(err);
    });
}

export function updateAvatar(req: Request, res: Response) {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: USER_NOT_FOUND });
        return;
      }
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: AVATAR_INCORRECT });
        return;
      }
      res.status(500).send(err);
    });
}
