import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import FilmCtrl from './controllers/film';
import Cat from './models/cat';
import User from './models/user';
import Film from './models/film';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const filmCtrl = new FilmCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);
  // notre route
  router.route('/films').get(filmCtrl.getAll);
  router.route('/films/count').get(filmCtrl.count);
  router.route('/film/:id').get(filmCtrl.getbyurltorrent);
  router.route('/filmssr/:id').get(filmCtrl.getbyplusnom);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
