/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        defaults = {
            min: 0,
            max: 100,
            defaultUnit: 'N',
            units: ['N', 'kp', 'lbf', 'pdl']
        },
        cobj = {
            N: 1,
            kp: 9.80665,
            lbf: 4.448222,
            pdl: 0.138255
        };

    ms.presetShort('force');

    presets.force = function (inst) {
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
