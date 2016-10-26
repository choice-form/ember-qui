(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Clipboard'] };
  }

  define('clipboard', [], vendorModule);
})();
