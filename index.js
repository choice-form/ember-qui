'use strict';

const mergeTrees = require('broccoli-merge-trees');
const LessCompiler = require('broccoli-less-single');

module.exports = {
  name: 'ember-cform-ui',

  options: {
    outputPaths: {
      app: {
        css: {'app': '/assets/bundle.css'},
        js: '/assets/bundle.js',
      },
    // },
    // cssModules: {
    //   plugins: [
    //     require('postcss-import'),
    //     require('postcss-extend'),
    //     require('postcss-fallback'),
    //     require('postcss-sassy-mixins'),
    //     require('rucksack-css')({ alias: false, hexRGBA: false, fallbacks: true }),
    //     require('postcss-cssnext'),
    //     require('postcss-browser-reporter')
    //   ],
    //   virtualModules: {
    //     'ui-colors': {
    //       'ui-white': '#fff',
    //       'ui-purple': '#5940aa',
    //       'ui-blue': '#1894f2',
    //       'ui-green': '#2ecc71',
    //       'ui-tomato': '#e74c3c',
    //       'ui-golden': '#f1c40f',
    //       'ui-light': 'color(#bdc3c7 a(24%))',
    //       'ui-fade-silver': 'color(#bdc3c7 a(48%))',
    //       'ui-silver': '#bdc3c7',
    //       'ui-gray': '#919ba2',
    //       'ui-slate': '#4e5b68',
    //       'ui-dark-slate': '#34495e'
    //     },
    //     'ui-radius': {
    //       'radius-s': '2px',
    //       'radius-m': '3px',
    //       'radius-l': '4px'
    //     },
    //     'ui-spacing': {
    //       'spacing-xs': '6px',
    //       'spacing-s': '8px',
    //       'spacing-m': '12px',
    //       'spacing-l': '24px',
    //       'spacing-xl': '48px'
    //     },
    //     'ui-zindex': {
    //       'ui-loading': 60,
    //       'ui-notify': 50,
    //       'ui-dialog': 40,
    //       'ui-curtain': 30,
    //       'ui-dropdown': 20,
    //       'ui-menu': 10
    //     }
    //   }
    // },
    // nodeAssets: {
    //   ['device.js']: {
    //     import: {
    //       include: [{ path: 'device.js' }]
    //     }
    //   }
    }
  },

  isDevelopingAddon() {
    return 'development' === process.env.EMBER_ENV;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import(`${app.bowerDirectory}/device.js/lib/device.js`);
    app.import(`./vendor/shims/device.js`);

    app.import(`./vendor/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js`);
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
    app.import(`./vendor/mobiscroll/_css/mobiscroll.eventcalendar-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.forms-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.timespan-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.image-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.numpad-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.icons-3.0.0-beta6.css`);
    app.import(`./vendor/mobiscroll/_css/mobiscroll.range-3.0.0-beta6.css`);
    app.import(`./vendor/shims/mobiscroll.js`);
  },

  treeForPublic(tree) {
    const trees = [];

    const publicTree = this._super.treeForPublic.apply(this, arguments);
    publicTree && trees.push(publicTree);

    trees.push(LessCompiler(
      './public/themes', 'theme-basic.less', 'assets/theme-basic.css'
    ));

    return mergeTrees(trees, { overwrite: true });
  }
};
