(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['bowser'] };
  }

  define('bowser', [], vendorModule);
})();
