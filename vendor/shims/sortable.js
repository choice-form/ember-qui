(function() {
  function vendorModule() {
    'use strict';
    return self['Draggable'];
  }

  define('sortable', [], vendorModule);
})();
