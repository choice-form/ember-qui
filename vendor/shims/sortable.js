(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Sortable'] };
  }

  define('sortable', [], vendorModule);
})();
