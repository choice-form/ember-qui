/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        defaults = {
            min: -20,
            max: 40,
            defaultUnit: 'c',
            units: ['c', 'k', 'f', 'r'],
            unitNames: {
                c: '°C',
                k: 'K',
                f: '°F',
                r: '°R'
            }
        },
        cobj = {
            c2k: function (c) {
                return c + 273.15;
            },
            c2f: function (c) {
                return c * 9 / 5 + 32;
            },
            c2r: function (c) {
                return (c + 273.15) * 9 / 5;
            },
            k2c: function (k) {
                return k - 273.15;
            },
            k2f: function (k) {
                return k * 9 / 5 - 459.67;
            },
            k2r: function (k) {
                return k * 9 / 5;
            },
            f2c: function (f) {
                return (f - 32) * 5 / 9;
            },
            f2k: function (f) {
                return (f + 459.67) * 5 / 9;
            },
            f2r: function (f) {
                return f + 459.67;
            },
            r2c: function (r) {
                return (r - 491.67) * 5 / 9;
            },
            r2k: function (r) {
                return r * 5 / 9;
            },
            r2f: function (r) {
                return r - 459.67;
            }
        };

    ms.presetShort('temperature');

    presets.temperature = function (inst) {
        var s = $.extend({}, defaults, inst.settings);

        $.extend(inst.settings, s, {
            sign: true,
            convert: function (val, unit1, unit2) {
                return cobj[unit1 + '2' + unit2](val);
            }
        });

        return presets.measurement.call(this, inst);
    };

})();
