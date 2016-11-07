(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['slick'] };
  }

  define('slick', [], vendorModule);
})();
