const express = require('express');
const ongController = require('./controllers/ongController');
const incController = require('./controllers/incController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/casos', incController.index);
routes.post('/casos', incController.create);
routes.delete('/casos/:id', incController.delete);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index);
    

        

    module.exports = routes;