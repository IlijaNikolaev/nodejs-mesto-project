import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Card from '../models/card';
import { ID_INCORRECT, CARD_INCORRECT, CARD_NOT_FOUND } from '../constants/errorMessages';

const isObjectIdValid = (id: string | Types.ObjectId) => mongoose.Types.ObjectId.isValid(id);

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create(({ name, link, owner: _id }))
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: CARD_INCORRECT });
        return;
      }
      res.status(500).send(err);
    });
};

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));
};

export const deleteCardById = (req: Request, res: Response) => {
  const { id: _id } = req.params;

  return Card.findByIdAndDelete({ _id })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: CARD_NOT_FOUND });
      }
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send(err));
};

export const likeCard = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  if (!isObjectIdValid(cardId)) {
    return res.status(400).send({ message: ID_INCORRECT });
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: CARD_NOT_FOUND });
      }
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send(err));
};

export const unlikeCard = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  if (!isObjectIdValid(cardId)) {
    return res.status(400).send({ message: ID_INCORRECT });
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: CARD_NOT_FOUND });
      }
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send(err));
};
