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
  app.get('/api/articles', controllers.article.retrieveAll);
  app.post('/api/articles', controllers.article.create);
  app.get('/api/articles/:id', controllers.article.retrieve);
  app.put('/api/articles/:id', controllers.article.update);
  app.delete('/api/articles/:id', controllers.article.delete);

  /* Asset */
  app.get('/api/assets', controllers.asset.retrieveAll);
  app.post('/api/assets', controllers.asset.create);
  app.get('/api/assets/:id', controllers.asset.retrieve);
  app.put('/api/assets/:id', controllers.asset.update);
  app.delete('/api/assets/:id', controllers.asset.delete);

  /* Price */
  app.get('/api/prices', controllers.price.retrieveAll);
  app.post('/api/prices', controllers.price.create);
  app.get('/api/prices/:id', controllers.price.retrieve);
  app.put('/api/prices/:id', controllers.price.update);
  app.delete('/api/prices/:id', controllers.price.delete);

  /* Company */
  app.get('/companies', controllers.company.retrieveAll);
  app.post('/companies', controllers.company.create);
  app.get('/companies/:id', controllers.company.retrieve);
  app.put('/companies/:id', controllers.company.update);
  app.delete('/companies/:id', controllers.company.delete);

  /* People */
  app.get('/api/people', controllers.person.retrieveAll);
  app.post('/api/people', controllers.person.create);
  app.get('/api/people/:id', controllers.person.retrieve);
  app.put('/api/people/:id', controllers.person.update);
  app.delete('/api/people/:id', controllers.person.delete);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
