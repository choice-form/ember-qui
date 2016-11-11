'use strict';

const mergeTrees = require('broccoli-merge-trees');
const LessCompiler = require('broccoli-less-single');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoprefixPlugin = new LessPluginAutoPrefix();

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
      plugins: [autoprefixPlugin]
    },
    nodeAssets: {
      bowser: { import: ['bowser.js'] },
      fastclick: { import: ['lib/fastclick.js'] },
      imagesloaded: { import: ['imagesloaded.pkgd.js'] },
      'masonry-layout': { import: ['dist/masonry.pkgd.js'] },
      sortablejs: { import: ['Sortable.js'] },
      'slick-carousel': {
        srcDir: 'slick',
        import: ['slick.js', 'slick.css', 'slick-theme.css'],
        public: ['ajax-loader.gif', 'fonts/*']
      }
    }
  },

  isDevelopingAddon() {
    return 'development' === process.env.EMBER_ENV;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import(`./vendor/shims/bowser.js`);
    app.import(`${app.bowerDirectory}/device.js/lib/device.js`);
    app.import(`./vendor/shims/device.js`);
    app.import(`./vendor/shims/imagesloaded.js`);
    app.import(`./vendor/shims/masonry.js`);
    app.import(`./vendor/shims/sortable.js`);

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

    const themesTree = LessCompiler(
      './public/themes', 'theme-basic.less', 'assets/theme-basic.css', {
        plugins: [autoprefixPlugin]
      }
    );
    trees.push(themesTree);

    return mergeTrees(trees, { overwrite: true });
  }
};
