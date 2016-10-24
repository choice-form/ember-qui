(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['faker'] };
  }

  define('faker', [], vendorModule);
})();
