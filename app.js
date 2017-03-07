
/**
 * Module dependencies.
 */
var Prismic = require('prismic-nodejs');
var app = require('./config');
var PORT = app.get('port');
var PConfig = require('./prismic-configuration');

/**
* Start the server
*/
app.listen(PORT, function() {
  console.log('Point your browser to http://localhost:' + PORT);
});


/**
* Middleware to connect to the API
*/
app.use((req, res, next) => {
  Prismic.api(PConfig.apiEndpoint,{accessToken: PConfig.accessToken, req: req})
  .then((api) => {
    req.prismic = {api: api};
    res.locals.ctx = {
      endpoint: PConfig.apiEndpoint,
      linkResolver: PConfig.linkResolver
    };
    next();
  }).catch(function(err) {
    if (err.status == 404) {
      res.status(404).send('There was a problem connecting to your API, please check your configuration file for errors.');
    } else {
      res.status(500).send('Error 500: ' + err.message);
    }
  });
});


/**
* Preconfigured prismic preview
*/
app.get('/preview', function(req, res) {
  return Prismic.preview(req.prismic.api, PConfig.linkResolver, req, res);
});


/**
* Query the navigation with every route
*/
app.use((req, res, next) => {
  
  // Set the language for the navigation
  var lang = 'en-us';
  if (req.url.match(/\/fr-fr\/*/g)) {
    lang = 'fr-fr';
  } else if (req.url.match(/\/es-es\/*/g)) {
    lang = 'es-es';
  }
  
  // Query the navigation by language
  req.prismic.api.getSingle('navigation', {lang : lang}).then(function(navContent){
    
    // Give an error if no layout custom type is found
    if (!navContent) {
      res.status(500).send('No Layout document was found.');
    }
    
    // Define the layout content
    res.locals.navContent = navContent;
    next();
  });
});


/**************************** FRENCH SITE ****************************/

/**
* Route for the french homepage
*/
app.route('/fr-fr').get(function(req, res){
  req.prismic.api.getSingle("homepage", {lang : 'fr-fr'}).then(function(pageContent) {
    res.render('homepage', { pageContent: pageContent });
  });
});

/**
* Route for french pages
*/
app.route('/fr-fr/:uid').get(function(req, res) {
  var uid = req.params.uid;
  req.prismic.api.getByUID("page", uid, {lang : 'fr-fr'}).then(function(pageContent) {
    res.render('page', { pageContent: pageContent });
  });
});


/**************************** SPANISH SITE ****************************/

/**
* Route for the spanish homepage
*/
app.route('/es-es').get(function(req, res){
  req.prismic.api.getSingle("homepage", {lang : 'es-es'}).then(function(pageContent) {
    res.render('homepage', { pageContent: pageContent });
  });
});

/**
* Route for spanish pages
*/
app.route('/es-es/:uid').get(function(req, res) {
  var uid = req.params.uid;
  req.prismic.api.getByUID("page", uid, {lang : 'es-es'}).then(function(pageContent) {
    res.render('page', { pageContent: pageContent });
  });
});


/**************************** ENGLISH SITE ****************************/

/**
* Route for english pages
*/
app.route('/:uid').get(function(req, res) {
  var uid = req.params.uid;
  req.prismic.api.getByUID("page", uid, {lang : 'en-us'}).then(function(pageContent) {
    res.render('page', { pageContent: pageContent });
  });
});


/**
* Route for the homepage
*/
app.route('/').get(function(req, res){
  req.prismic.api.getSingle("homepage", {lang : 'en-us'}).then(function(pageContent) {
    res.render('homepage', { pageContent: pageContent });
  });
});


