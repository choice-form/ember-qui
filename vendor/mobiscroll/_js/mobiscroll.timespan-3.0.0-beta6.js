/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        defaults = {
            wheelOrder: 'hhiiss',
            useShortLabels: false,
            min: 0,
            max: Infinity,
            // Localization
            labels: ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds'], //, ''],
            labelsShort: ['Yrs', 'Mths', 'Days', 'Hrs', 'Mins', 'Secs'] //, '']
        };

    ms.presetShort('timespan');

    ms.presets.scroller.timespan = function (inst) {

        /**
         * Calculates the parts of the time differnce.
         * @param {Integer} time - Time in milliseconds.
         * @return {Object} - Time splitted to the required parts (years, months, days, hours, minutes, seconds).
         */
        function getParts(time) {
            var ret = {};

            $(unique).each(function (i, v) {
                ret[v] = wheels[v] ? Math.floor(time / obj[v].limit) : 0;
                time -= ret[v] * obj[v].limit;
            });

            return ret;
        }

        /**
         * Generates a specific wheel.
         * @param {String} v - Unique identifier.
         */
        function genWheel(v) {
            var leading = false,
                st = steps[wheels[v] - 1] || 1,
                o = obj[v],
                lbl = o.label,
                w = o.wheel;

            w.data = [];
            w.label = o.label;

            if (ord.match(new RegExp(o.re + o.re, 'i'))) {
                leading = true;
            }

            if (v == max) {
                w.min = minParts[v];
                w.max = maxParts[v];
                w.data = function (i) {
                    return {
                        value: i,
                        display: genValue(i * st, leading, lbl)
                    };
                };
                w.getIndex = function (v) {
                    return Math.round(v / st);
                };
            } else {
                for (i = 0; i <= o.until; i += st) {
                    w.data.push({
                        value: i,
                        display: genValue(i, leading, lbl)
                    });
                }
            }
        }

        function genValue(i, leading, lbl) {
            return (i < 10 && leading ? '0' : '') + i + '<span class="mbsc-ts-lbl">' + lbl + '</span>';
        }

        function calcTime(arr) {
            var j = 0,
                time = 0;

            $.each(o, function (i, v) {
                if (!isNaN(+arr[j])) {
                    time += obj[v.v].limit * arr[i];
                }
            });

            return time;
        }

        function step(v, st) {
            return Math.floor(v / st) * st;
        }

        var i,
            j,
            p,
            minParts,
            maxParts,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            ord = s.wheelOrder,
            lbls = s.useShortLabels ? s.labelsShort : s.labels,
            unique = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'], //, 'fract'],
            obj = {
                'years': {
                    ord: 0,
                    index: 6,
                    until: 10,
                    limit: 1000 * 60 * 60 * 24 * 365,
                    label: lbls[0],
                    re: 'y',
                    wheel: {}
                },
                'months': {
                    ord: 1,
                    index: 5,
                    until: 11,
                    limit: 1000 * 60 * 60 * 24 * 30,
                    label: lbls[1],
                    re: 'm',
                    wheel: {}
                },
                'days': {
                    ord: 2,
                    index: 4,
                    until: 31,
                    limit: 1000 * 60 * 60 * 24,
                    label: lbls[2],
                    re: 'd',
                    wheel: {}
                },
                'hours': {
                    ord: 3,
                    index: 3,
                    until: 23,
                    limit: 1000 * 60 * 60,
                    label: lbls[3],
                    re: 'h',
                    wheel: {}
                },
                'minutes': {
                    ord: 4,
                    index: 2,
                    until: 59,
                    limit: 1000 * 60,
                    label: lbls[4],
                    re: 'i',
                    wheel: {}
                },
                'seconds': {
                    ord: 5,
                    index: 1,
                    until: 59,
                    limit: 1000,
                    label: lbls[5],
                    re: 's',
                    wheel: {}
                } //,
                //'fract': { index: 0, until: 99, limit: 10, label: lbls[6], prefix: '.', short: 'u' }
            },
            o = [],
            steps = s.steps || [],
            wheels = {},
            max = 'seconds',
            defaultVal = s.defaultValue || Math.max(s.min, Math.min(0, s.max)),
            w = [
                []
            ];

        // Constructor

        // Generate wheels
        $(unique).each(function (i, v) {
            j = ord.search(new RegExp(obj[v].re, 'i'));
            if (j > -1) {
                o.push({
                    o: j,
                    v: v
                });

                if (obj[v].index > obj[max].index) {
                    max = v;
                }
            }
        });

        o.sort(function (a, b) {
            return a.o > b.o ? 1 : -1;
        });

        $.each(o, function (i, v) {
            wheels[v.v] = i + 1;
            w[0].push(obj[v.v].wheel);
        });

        minParts = getParts(s.min);
        maxParts = getParts(s.max);

        $.each(o, function (i, v) {
            genWheel(v.v);
        });

        // Extended methods
        // ---

        inst.getVal = function (temp, formatted) {
            return formatted ? inst._getVal(temp) : (inst._hasValue || temp ? calcTime(inst.getArrayVal(temp)) : null);
        };

        // ---

        // Return settings
        return {
            showLabel: true,
            wheels: w,
            compClass: 'mbsc-ts',
            parseValue: function (val) {
                var ret = [],
                    m;

                if (ms.util.isNumeric(val) || !val) {
                    p = getParts(val || defaultVal);
                    $.each(o, function (i, v) {
                        ret.push(p[v.v]);
                    });
                } else {
                    $.each(o, function (i, v) {
                        m = new RegExp('(\\d+)\\s?(' + s.labels[obj[v.v].ord] + '|' + s.labelsShort[obj[v.v].ord] + ')', 'gi').exec(val);
                        ret.push(m ? m[1] : 0);
                    });
                }

                $(ret).each(function (i, v) { // Steps
                    ret[i] = step(v, steps[i] || 1);
                });

                return ret;
            },
            formatValue: function (d) {
                var ret = '';

                $.each(o, function (i, v) {
                    ret += (+d[i]) ? d[i] + ' ' + obj[v.v].label + ' ' : '';
                });

                return ret ? ret.replace(/\s+$/g, '') : 0;
            },
            validate: function (data) {
                var p,
                    i,
                    index,
                    dis,
                    values = data.values,
                    dir = data.direction,
                    disabled = [],
                    maxprop = true,
                    minprop = true;

                $(unique).each(function (x, v) {
                    if (wheels[v] !== undefined) {
                        index = wheels[v] - 1;
                        disabled[index] = [];
                        dis = {};

                        if (v != max) {
                            if (maxprop) {
                                for (i = maxParts[v] + 1; i <= obj[v].until; i++) {
                                    dis[i] = true;
                                }
                            }

                            if (minprop) {
                                for (i = 0; i < minParts[v]; i++) {
                                    dis[i] = true;
                                }
                            }
                        }

                        values[index] = inst.getValidValue(index, values[index], dir, dis);

                        p = getParts(calcTime(values));

                        maxprop = maxprop && (p[v] == maxParts[v]);
                        minprop = minprop && (p[v] == minParts[v]);

                        $.each(dis, function (i) {
                            disabled[index].push(i);
                        });
                    }
                });

                return {
                    disabled: disabled
                };
            }
        };
    };

})();
