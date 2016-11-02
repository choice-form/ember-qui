(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Masonry'] };
  }

  define('masonry', [], vendorModule);
})();
