import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Message from '../db/models/Message';

class MessageController {
  // eslint-disable-next-line class-methods-use-this
  async create(req: Request, res: Response) {
    const repository = getRepository(Message);

    const { userId } = req;

    const { title, desc } = req.body;

    const message = repository.create({ title, desc, user: { id: userId } });

    repository.save(message);

    return res.json(message);
  }
}

const messageController = new MessageController();

export default messageController;
