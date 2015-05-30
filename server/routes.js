/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var article = require('./controllers/ArticleController');
var asset = require('./controllers/AssetController');
var assetprice = require('./controllers/AssetPriceController');
var company = require('./controllers/CompanyController');
var person = require('./controllers/PersonController');

module.exports = function(app) {

  // Routing for the server
  app.use('/api/things', require('./api/thing'));

  /* Article */
  app.get('/articles', article.index);
  app.post('/articles', article.create);
  app.get('/articles/:id', article.show);
  app.put('/articles/:id', article.update);
  app.delete('/articles/:id', article.delete);

  /* Asset */
  app.get('/assets', asset.index);
  app.post('/assets', asset.create);
  app.get('/assets/:id', asset.show);
  app.put('/assets/:id', asset.update);
  app.delete('/assets/:id', asset.delete);

  /* AssetPrice */
  app.get('/assetprices', assetprice.index);
  app.post('/assetprices', assetprice.create);
  app.get('/assetprices/:id', assetprice.show);
  app.put('/assetprices/:id', assetprice.update);
  app.delete('/assetprices/:id', assetprice.delete);

  /* Company */
  app.get('/companies', company.index);
  app.post('/companies', company.create);
  app.get('/companies/:id', company.show);
  app.put('/companies/:id', company.update);
  app.delete('/companies/:id', company.delete);

  /* People */
  app.get('/people', person.index);
  app.post('/people', person.create);
  app.get('/people/:id', person.show);
  app.put('/people/:id', person.update);
  app.delete('/people/:id', person.delete);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
