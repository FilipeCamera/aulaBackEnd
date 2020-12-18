import express from 'express';
import messageController from './controllers/MessageController';
import userController from './controllers/UserController';
import Authentication from './middlewares/auth';

const routes = express.Router();

routes.post('/user', userController.create);
routes.post('/auth', userController.authenticate);
routes.get('/index', Authentication, userController.index);
routes.post('/message', Authentication, messageController.create);
export default routes;
