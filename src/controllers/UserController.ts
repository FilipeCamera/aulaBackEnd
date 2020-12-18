import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import User from '../db/models/User';

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async create(req: Request, resp: Response) {
    const repository = getRepository(User);

    const { name, email, password } = req.body;

    const existsUser = await repository.findOne({ where: { email } });

    if (existsUser) {
      return resp.status(400).json({ message: 'Esse email já existe' });
    }

    const user = repository.create({ name, email, password });

    await repository.save(user);

    return resp.status(200).json(user);
  }

  // eslint-disable-next-line class-methods-use-this
  async index(req: Request, res: Response) {
    res.json({ message: 'Olá, seja bem-vindo!' });
  }

  // eslint-disable-next-line class-methods-use-this
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Usuário n existe' });
    }

    const verifyPasswordValid = await Bcrypt.compare(password, user.password);

    if (!verifyPasswordValid) {
      return res.json({ message: 'Senha incorreta!' });
    }

    const token = JWT.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    return res.json({ token });
  }
}

const userController = new UserController();

export default userController;
