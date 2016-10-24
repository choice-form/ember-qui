/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        defaults = {
            min: 0,
            max: 100,
            defaultUnit: 'kph',
            units: ['kph', 'mph', 'mps', 'fps', 'knot'],
            unitNames: {
                kph: 'km/h',
                mph: 'mi/h',
                mps: 'm/s',
                fps: 'ft/s',
                knot: 'knot'
            }
        },
        cobj = {
            kph: 1,
            mph: 1.60934,
            mps: 3.6,
            fps: 1.09728,
            knot: 1.852
        };

    ms.presetShort('speed');

    presets.speed = function (inst) {
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
