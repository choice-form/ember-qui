/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        defaults = {
            min: 0,
            max: 1000,
            defaultUnit: 'kg',
            units: ['g', 'kg', 'oz', 'lb'],
            unitNames: {
                tlong: 't (long)',
                tshort: 't (short)'
            }
        },
        cobj = {
            mg: 0.001,
            cg: 0.01,
            dg: 0.1,
            g: 1,
            dag: 10,
            hg: 100,
            kg: 1000,
            t: 1000000,
            drc: 1.7718452,
            oz: 28.3495,
            lb: 453.59237,
            st: 6350.29318,
            qtr: 12700.58636,
            cwt: 50802.34544,
            tlong: 1016046.9088,
            tshort: 907184.74
        };

    ms.presetShort('mass');

    presets.mass = function (inst) {
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
