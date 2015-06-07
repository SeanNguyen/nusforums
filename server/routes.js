/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var controllers = require('./controllers');

module.exports = function(app) {

  // Routing for the server
  app.use('/api/things', require('./api/thing'));

  /* User */
  app.get('/users', controllers.user.retrieveAll);
  app.get('/users/:id', controllers.auth.requireUser(), controllers.user.retrieve);
  app.post('/users', controllers.user.create);
  app.post('/users/login', controllers.user.login);
  app.post('/users/logout', controllers.auth.requireUser(), controllers.user.logout);
  app.put('/users/:id', controllers.auth.requireUser(), controllers.user.update);
  app.delete('/users/:id', controllers.auth.requireUser(), controllers.user.delete);
  
  /* Article */
  app.get('/articles', controllers.article.retrieveAll);
  app.post('/articles', controllers.article.create);
  app.get('/articles/:id', controllers.article.retrieve);
  app.put('/articles/:id', controllers.article.update);
  app.delete('/articles/:id', controllers.article.delete);

  /* Asset */
  app.get('/assets', controllers.asset.retrieveAll);
  app.post('/assets', controllers.asset.create);
  app.get('/assets/:id', controllers.asset.retrieve);
  app.put('/assets/:id', controllers.asset.update);
  app.delete('/assets/:id', controllers.asset.delete);

  /* Price */
  app.get('/prices', controllers.price.retrieveAll);
  app.post('/prices', controllers.price.create);
  app.get('/prices/:id', controllers.price.retrieve);
  app.put('/prices/:id', controllers.price.update);
  app.delete('/prices/:id', controllers.price.delete);

  /* Company */
  app.get('/companies', controllers.company.retrieveAll);
  app.post('/companies', controllers.company.create);
  app.get('/companies/:id', controllers.company.retrieve);
  app.put('/companies/:id', controllers.company.update);
  app.delete('/companies/:id', controllers.company.delete);

  /* People */
  app.get('/people', controllers.person.retrieveAll);
  app.post('/people', controllers.person.create);
  app.get('/people/:id', controllers.person.retrieve);
  app.put('/people/:id', controllers.person.update);
  app.delete('/people/:id', controllers.person.delete);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
