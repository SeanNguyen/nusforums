/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var article = require('./controllers/ArticleController.js');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  /* Article */
  app.get('/articles', article.index);
  app.post('/articles', article.create);
  app.get('/articles/:id', article.show);
  app.put('/articles/:id', article.update);
  app.delete('/articles/:id', article.delete);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
