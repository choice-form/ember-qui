'use strict';

const fs = require('fs');
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
      fastclick: { srcDir: 'lib', import: ['fastclick.js'] },
      imagesloaded: { import: ['imagesloaded.pkgd.js'] },
      'masonry-layout': { srcDir: 'dist', import: ['masonry.pkgd.js'] },
      sortablejs: { import: ['Sortable.js'] },
      swiper: {
        srcDir: 'dist',
        import: {
          include: [
            'css/swiper.min.css',
            { path: 'js/swiper.min.js', sourceMap: 'js/maps/swiper.min.js.map' }
          ]
        }
      }
    }
  },

  isDevelopingAddon() {
    return 'development' === process.env.EMBER_ENV;
  },

  contentFor(type, config, content) {
    if ('body-footer' === type) {
      if ('@choiceform/ember-cform-ui' === config.APP.name) {
        return this.contentForSVGIcons('./')
      } else {
        return this.contentForSVGIcons('./node_modules/@choiceform/ember-cform-ui/');
      }
    }

    return '';
  },

  contentForSVGIcons(prefix) {
    return fs.readFileSync(prefix + 'icons/index.html', 'utf-8')
      .replace(/\n\r?/g, '');
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import(`./vendor/shims/bowser.js`);
    app.import(`${app.bowerDirectory}/device.js/lib/device.js`);
    app.import(`./vendor/shims/device.js`);
    app.import(`./vendor/shims/imagesloaded.js`);
    app.import(`./vendor/shims/masonry.js`);
    app.import(`${app.bowerDirectory}/qrcode/lib/qrcode.js`);
    app.import(`./vendor/shims/qrcode.js`);
    app.import(`./vendor/shims/sortable.js`);
    app.import(`./vendor/shims/swiper.js`);

    app.import(`./vendor/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js`);
    // app.import(`./vendor/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.animation-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.color-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.mobiscroll-dark-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.rating-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.progress-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.listview-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.menustrip-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.slider-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.animation-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.calbase-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.timer-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.frame-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.scroller-3.0.0-beta6.css`);
    app.import(
      `./vendor/mobiscroll/_css/mobiscroll.eventcalendar-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.forms-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.timespan-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.image-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.numpad-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.icons-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.range-3.0.0-beta6.css`);
    app.import(`./vendor/shims/mobiscroll.js`);
  }
};
