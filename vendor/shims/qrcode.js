(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['QRCode'] };
  }

  define('qrcode', [], vendorModule);
})();
