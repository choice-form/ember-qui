'use strict';

const fs = require('fs');
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const LessCompiler = require('broccoli-less-single');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoPrefixPlugin = new LessPluginAutoPrefix();

module.exports = {
  name: '@choiceform/ember-cform-ui',

  options: {
    lessOptions: {
      plugins: [autoPrefixPlugin],
      sourceMap: false,
    },
  },

  isDevelopingAddon() {
    return !this.app.isProduction;
  },

  isAddon() {
    const keywords = this.project.pkg.keywords;
    return keywords && keywords.indexOf('ember-addon') !== -1;
  },

  contentFor(type) {
    return 'body-footer' === type
      ? [
          `<link rel="stylesheet" href="/assets/mobiscroll.css?node={{node}}">`,
          `<script defer src="/assets/mobiscroll.js?node={{node}}"></script>`,
          this.contentForSVGIcons(),
        ].join('\n')
      : '';
  },

  contentForSVGIcons() {
    const iconPath = this.isAddon()
      ? path.resolve(this.project.root, 'icons', 'index.html')
      : path.resolve(
          'node_modules',
          '@choiceform',
          'ember-cform-ui',
          'icons',
          'index.html'
        );

    return fs.readFileSync(iconPath, 'utf-8').replace(/\n\r?/g, '');
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/bowser/src/bowser.js');

    app.import('node_modules/device.js/dist/device.umd.js', {
      using: [{ transformation: 'amd', as: 'device' }],
    });

    app.import('node_modules/@shopify/draggable/lib/draggable.bundle.js', {
      using: [{ transformation: 'amd', as: 'draggable' }],
    });

    app.import('node_modules/masonry-layout/dist/masonry.pkgd.js', {
      using: [{ transformation: 'amd', as: 'masonry' }],
    });

    app.import('node_modules/nouislider/distribute/nouislider.css');
    app.import('node_modules/nouislider/distribute/nouislider.js', {
      using: [{ transformation: 'amd', as: 'nouislider' }],
    });

    app.import('node_modules/qrcode.js/lib/qrcode.js', {
      using: [{ transformation: 'amd', as: 'qrcode' }],
    });

    app.import('node_modules/swiper/dist/css/swiper.css');
    app.import('node_modules/swiper/dist/js/swiper.min.js', {
      using: [{ transformation: 'amd', as: 'swiper' }],
    });

    app.import('node_modules/photoswipe/dist/photoswipe.css');
    app.import('node_modules/photoswipe/dist/default-skin/default-skin.css');
    app.import('node_modules/photoswipe/dist/photoswipe.js', {
      using: [{ transformation: 'amd', as: 'photoswipe' }],
    });
    app.import('node_modules/photoswipe/dist/photoswipe-ui-default.js', {
      using: [{ transformation: 'amd', as: 'photoswipeui-default' }],
    });

    app.import('vendor/pinyin/index.js');
    app.import('vendor/shims/pinyin.js');

    app.import('vendor/mobiscroll/css/mobiscroll.custom.min.css', {
      outputFile: 'assets/mobiscroll.css',
    });
    app.import('vendor/mobiscroll/js/mobiscroll.custom.min.js', {
      outputFile: 'assets/mobiscroll.js',
    });
    app.import('vendor/shims/mobiscroll.js', {
      outputFile: 'assets/mobiscroll.js',
    });
  },

  treeForPublic() {
    const publicTree = this._super.treeForPublic.apply(this, arguments);
    const trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    const prefix = this.project.isEmberCLIAddon()
      ? '.'
      : './node_modules/@choiceform/ember-cform-ui';

    // default theme
    trees.push(
      LessCompiler(
        `${prefix}/addon/styles/themes`,
        'flat-concept.less',
        'assets/themes/flat-concept.css',
        { paths: [`${prefix}/addon/styles`, `${prefix}/addon/styles/themes`] }
      )
    );

    // milk theme
    trees.push(
      LessCompiler(
        `${prefix}/addon/styles/themes`,
        'milk.less',
        'assets/themes/milk.css',
        { paths: [`${prefix}/addon/styles`, `${prefix}/addon/styles/themes`] }
      )
    );

    return mergeTrees(trees, { overwrite: true });
  },
};
