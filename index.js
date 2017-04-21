'use strict';

const fs = require('fs');
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const LessCompiler = require('broccoli-less-single');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoPrefixPlugin = new LessPluginAutoPrefix();

module.exports = {
  name: 'ember-cform-ui',

  options: {
    outputPaths: {
      app: {
        css: {
          'app': '/assets/bundle.css',
        },
        js: '/assets/bundle.js',
      },
    },
    lessOptions: {
      plugins: [autoPrefixPlugin]
    },
    nodeAssets: {
      bowser: { import: ['bowser.js'] },
      fastclick: { import: [{ path: 'lib/fastclick.js' }] },
      'masonry-layout': {
        import: [{ path: 'dist/masonry.pkgd.js' }]
      },
      sortablejs: {
        import: [{ path: 'Sortable.js' }]
      },
      swiper: {
        srcDir: 'dist',
        import: [
          'css/swiper.min.css',
          { path: 'js/swiper.min.js', sourceMap: 'js/maps/swiper.min.js.map' }
        ]
      },
      photoswipe: {
        srcDir: 'dist',
        import: [
          'photoswipe.min.js',
          'photoswipe-ui-default.min.js',
          'photoswipe.css',
          'default-skin/default-skin.css',
        ]
      }
    }
  },

  isDevelopingAddon() {
    return !this.app.isProduction
  },

  isAddon() {
    const keywords = this.project.pkg.keywords;
    return (keywords && keywords.indexOf('ember-addon') !== -1);
  },

  contentFor(type, config, content) {
    return ('body-footer' === type)
      ? [
        // `<script async src="/assets/masonry.js?node={{node}}"></script>`,
        `<link rel="stylesheet" href="/assets/mobiscroll.css?node={{node}}">`,
        `<script defer src="/assets/mobiscroll.js?node={{node}}"></script>`,
        // `<script async src="/assets/qrcode.js?node={{node}}"></script>`,
        // `<script async src="/assets/sortable.js?node={{node}}"></script>`,
        // `<script async src="/assets/swiper.js?node={{node}}"></script>`,
        this.contentForSVGIcons()
      ].join('\n')
      : '';
  },

  contentForSVGIcons(prefix) {
    const iconPath = this.isAddon()
          ? path.join(this.project.root, 'icons', 'index.html')
          : path.join(this.project.nodeModulesPath, '@choiceform', 'ember-cform-ui', 'icons', 'index.html');

    return fs.readFileSync(iconPath, 'utf-8').replace(/\n\r?/g, '')
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import(`./vendor/shims/bowser.js`);
    app.import(`${app.bowerDirectory}/device.js/lib/device.js`);
    app.import(`./vendor/shims/device.js`);

    app.import(`./vendor/shims/masonry.js`);
    app.import(`${app.bowerDirectory}/qrcode/lib/qrcode.js`);
    app.import(`./vendor/shims/qrcode.js`);
    app.import(`./vendor/shims/sortable.js`);
    app.import(`./vendor/shims/swiper.js`);

    app.import(`./vendor/mobiscroll/css/mobiscroll.custom-3.0.0.min.css`,
               { outputFile: 'assets/mobiscroll.css' });
    app.import(`./vendor/mobiscroll/js/mobiscroll.custom-3.0.0.min.js`,
               { outputFile: 'assets/mobiscroll.js' });
    app.import(`./vendor/shims/mobiscroll.js`, { outputFile: 'assets/mobiscroll.js' });
  },

  treeForPublic(tree) {
    const publicTree = this._super.treeForPublic.apply(this, arguments);
    const trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    const prefix = this.project.isEmberCLIAddon()
          ? '.' : './node_modules/@choiceform/ember-cform-ui';

    // default theme
    trees.push(LessCompiler(
      `${prefix}/addon/styles/themes`,
      'flat-concept.less',
      'assets/themes/flat-concept.css',
      { paths: [`${prefix}/addon/styles`, `${prefix}/addon/styles/themes`] }
    ));

    // milk theme
    trees.push(LessCompiler(
      `${prefix}/addon/styles/themes`,
      'milk.less',
      'assets/themes/milk.css',
      { paths: [`${prefix}/addon/styles`, `${prefix}/addon/styles/themes`] }
    ));

    return mergeTrees(trees, { overwrite: true });
  }
};
