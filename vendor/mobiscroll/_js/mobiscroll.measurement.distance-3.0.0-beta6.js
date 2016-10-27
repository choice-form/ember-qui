/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        defaults = {
            min: 0,
            max: 100,
            defaultUnit: 'km',
            units: ['m', 'km', 'in', 'ft', 'yd', 'mi']
        },
        cobj = {
            mm: 0.001,
            cm: 0.01,
            dm: 0.1,
            m: 1,
            dam: 10,
            hm: 100,
            km: 1000,
            'in': 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            ch: 20.1168,
            fur: 201.168,
            mi: 1609.344,
            lea: 4828.032
        };

    ms.presetShort('distance');

    presets.distance = function (inst) {
        var s = $.extend({}, defaults, inst.settings);

        $.extend(inst.settings, s, {
            sign: false,
            convert: function (val, unit1, unit2) {
                return val * cobj[unit1] / cobj[unit2];
            }
        });

        return presets.measurement.call(this, inst);
    };

})();
