module.exports = {

  apiEndpoint: 'https://i18n-example.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc) {
    if (doc.lang == 'en-us') {
      if (doc.type == 'page') return '/' + doc.uid;
      return '/';
    } else {
      if (doc.type == 'page') return '/' + doc.lang + '/' + doc.uid;
      return '/' + doc.lang;
    }
  }
};
