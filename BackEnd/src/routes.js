import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import MovimentController from './app/controllers/MovimentController';
import MovimentFileController from './app/controllers/MovimentFileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas que não necessitam login
routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

// Rotas que necessitam de login
routes.use(authMiddleware);

// Rotas User

routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Rotas Moviment
routes.get('/moviments/', MovimentController.list);
routes.get('/moviments/', MovimentController.typeList);
routes.get('/moviments/:id', MovimentController.index);
routes.post('/moviments', MovimentController.store);
routes.put('/moviments/:id', MovimentController.update);
routes.delete('/moviments/:id', MovimentController.delete);

// Rotas moviment File
routes.post(
  '/moviment-files',
  upload.single('movimentFile'),
  MovimentFileController.store
);
routes.delete('/moviment-files/:id', MovimentFileController.delete);

export default routes;
