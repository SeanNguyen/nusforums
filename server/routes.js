/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var controllers = require('./controllers');

module.exports = function(app) {

  // Routing for the server
  //app.use('/api/things', require('./api/thing'));

  /* User */
  app.get('/api/users', controllers.user.retrieveAll);
  app.get('/api/users/:id', controllers.auth.requireUser(), controllers.user.retrieve);
  app.post('/api/users', controllers.user.create);
  app.post('/api/users/login', controllers.user.login);
  app.post('/api/users/logout', controllers.auth.requireUser(), controllers.user.logout);
  app.put('/api/users/:id', controllers.auth.requireUser(), controllers.user.update);
  app.delete('/users/:id', controllers.auth.requireUser(), controllers.user.delete);
  
  /* Article */
  app.get('/api/news', controllers.news.retrieveAll);
  app.post('/api/news', controllers.news.create);
  app.get('/api/news/:id', controllers.news.retrieve);
  app.put('/api/news/:id', controllers.news.update);
  app.delete('/api/news/:id', controllers.news.delete);

  /* Asset */
  app.get('/api/assets', controllers.asset.retrieveAll);
  app.post('/api/assets', controllers.asset.create);
  app.get('/api/assets/:id', controllers.asset.retrieve);
  app.put('/api/assets/:id', controllers.asset.update);
  app.delete('/api/assets/:id', controllers.asset.delete);

  /* Price */
  app.get('/api/prices', controllers.assetprice.retrieveAll);
  app.post('/api/prices', controllers.assetprice.create);
  app.get('/api/prices/:id', controllers.assetprice.retrieve);
  app.put('/api/prices/:id', controllers.assetprice.update);
  app.delete('/api/prices/:id', controllers.assetprice.delete);

  /* Predictor */
  app.get('/api/predictors', controllers.predictor.retrieveAll);
  app.post('/api/predictors', controllers.predictor.create);
  app.get('/api/predictors/:id', controllers.predictor.retrieve);
  app.put('/api/predictors/:id', controllers.predictor.update);
  app.delete('/api/predictors/:id', controllers.predictor.delete);

  /* Checked News */
  app.get('/api/checked_news', controllers.news_checked.retrieveAll);
  app.post('/api/checked_news', controllers.news_checked.create);
  app.get('/api/checked_news/:id', controllers.news_checked.retrieve);
  app.put('/api/checked_news/:id', controllers.news_checked.update);
  app.delete('/api/checked_news/:id', controllers.news_checked.delete);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
