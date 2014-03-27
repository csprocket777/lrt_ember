module.exports = function (broccoli) {
  var filterTemplates = require('broccoli-template');
  var uglifyJavaScript = require('broccoli-uglify-js');
  var compileES6 = require('broccoli-es6-concatenator');
//  var compileLess = require('broccoli-less');
  var compileSass = require('broccoli-sass');
  var pickFiles = require('broccoli-static-compiler');
  var env = require('broccoli-env').getEnv();

    console.log(env === "production");

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    });
    return tree;
  }

  var app = broccoli.makeTree('app');
  app = pickFiles(app, {
    srcDir: '/',
    destDir: 'appkit' // move under appkit namespace
  });
  app = preprocess(app);

  var styles = broccoli.makeTree('app/styles')
  styles = pickFiles(styles, {
    srcDir: '/',
    destDir: 'appkit'
  });
  styles = preprocess(styles);

//  var tests = broccoli.makeTree('tests')
//  tests = pickFiles(tests, {
//    srcDir: '/',
//    destDir: 'appkit/tests'
//  })
//  tests = preprocess(tests)

  var vendor = broccoli.makeTree('vendor');

  var sourceTrees = [app, styles, vendor];
//  if (env !== 'production') {
//    sourceTrees.push(tests)
//  }
  sourceTrees = sourceTrees.concat(broccoli.bowerTrees());

  var appAndDependencies = new broccoli.MergedTree(sourceTrees);

  var appJs = compileES6(appAndDependencies, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'ember/resolver'
    ],
    inputFiles: [
      'appkit/**/*.js'
    ],
    legacyFilesToAppend: [
        (env === 'production' ? 'appkit/config/production.js' : 'appkit/config/development.js'),
        'jquery/jquery.js',
        'handlebars/handlebars.js',
        'ember/ember.js',
        'ember-data/ember-data.js',
        'ember-resolver/dist/ember-resolver.js',
        "bootstrap/dist/js/bootstrap.js",
        "ember-addons.bs_for_ember/dist/js/bs-core.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-alert.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-badge.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-basic.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-button.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-growl-notifications.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-items-action-bar.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-label.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-list-group.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-modal.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-nav.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-notifications.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-progressbar.max.js",
        "ember-addons.bs_for_ember/dist/js/bs-wizard.max.js",
        "ember-validations/index.js",
        "momentjs/moment.js",
        "bootstrap-multiselect/js/bootstrap-multiselect.js",
        "bootstrap-datepicker/js/bootstrap-datepicker.js",
        "redactor/redactor/redactor.js",
        "bootstrap-switch/dist/js/bootstrap-switch.js",
        "jquery.scrollTo/jquery.scrollTo.js",
        "autoNumeric/autoNumeric.js"
    ],
    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  })

//  var appCss = compileLess(styles, {paths: ['app.less', 'bootstrap.less', './appkit/includes/'], filename: 'app.css'});
  var appCss = compileSass(sourceTrees, "appkit/styles/app.scss", "assets/app.css");

  var vendorCss = pickFiles(appAndDependencies, {
      srcDir: '/',
      files: ['**/*.css'],
      destDir: '/assets'
  });

  if (env === 'production') {
    appJs = uglifyJavaScript(appJs, {
//      mangle: false,
//      compress: false
    })
  }

  var publicFiles = broccoli.makeTree('public');

  return [appJs, appCss, vendorCss, publicFiles];
}
