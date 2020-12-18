import { Request, Response, NextFunction } from 'express';

import JWT from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function Authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Não autorizado!' });
    }

    const token = authorization.replace('Bearer', '').trim();

    const data = JWT.verify(token, 'secret');

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401);
  }
}
