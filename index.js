'use strict';

const fs = require('fs');
const path = require('path');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoPrefixPlugin = new LessPluginAutoPrefix();

module.exports = {
  name: 'ember-cform-ui',

  options: {
    outputPaths: {
      app: {
        css: {'app': '/assets/bundle.css'},
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
        import: [{ path: 'dist/masonry.pkgd.js', outputFile: 'assets/masonry.js' }]
      },
      sortablejs: {
        import: [{ path: 'Sortable.js', outputFile: 'assets/sortable.js' }]
      },
      swiper: {
        srcDir: 'dist',
        import: [
          'css/swiper.min.css',
          { path: 'js/swiper.min.js',
            outputFile: 'assets/swiper.js',
            sourceMap: 'js/maps/swiper.min.js.map' }
        ]
      }
    }
  },

  isDevelopingAddon() {
    return 'development' === process.env.EMBER_ENV;
  },

  isAddon() {
    const keywords = this.project.pkg.keywords;
    return (keywords && keywords.indexOf('ember-addon') !== -1);
  },

  contentFor(type, config, content) {
    return ('body-footer' === type)
      ? [
        `<script async src="/assets/masonry.js?node={{node}}"></script>`,
        `<script async src="/assets/mobiscroll.js?node={{node}}"></script>`,
        `<link rel="stylesheet" href="/assets/mobiscroll.css?node={{node}}">`,
        `<script async src="/assets/qrcode.js?node={{node}}"></script>`,
        `<script async src="/assets/sortable.js?node={{node}}"></script>`,
        `<script async src="/assets/swiper.js?node={{node}}"></script>`,
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

    app.import(`./vendor/shims/masonry.js`,
               { outputFile: 'assets/masonry.js' });
    app.import(`${app.bowerDirectory}/qrcode/lib/qrcode.js`,
               { outputFile: 'assets/qrcode.js' });
    app.import(`./vendor/shims/qrcode.js`,
               { outputFile: 'assets/qrcode.js' });
    app.import(`./vendor/shims/sortable.js`,
               { outputFile: 'assets/sortable.js' });
    app.import(`./vendor/shims/swiper.js`,
               { outputFile: 'assets/swiper.js' });

    app.import(`./vendor/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css`,
               { outputFile: 'assets/mobiscroll.css' });
    app.import(`./vendor/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js`,
               { outputFile: 'assets/mobiscroll.js' });
    app.import(`./vendor/shims/mobiscroll.js`, { outputFile: 'assets/mobiscroll.js' });
  }
};
