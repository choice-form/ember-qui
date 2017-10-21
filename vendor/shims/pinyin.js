(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['pinyin'] };
  }

  define('pinyin', [], vendorModule);
})();
