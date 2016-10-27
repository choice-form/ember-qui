/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        defaults = {
            batch: 50,
            min: 0,
            max: 100,
            defaultUnit: '',
            units: null,
            unitNames: null,
            invalid: [],
            sign: false,
            step: 0.05,
            scale: 2,
            convert: function (val) {
                return val;
            },
            // Localization
            signText: '&nbsp;',
            wholeText: 'Whole',
            fractionText: 'Fraction',
            unitText: 'Unit'
        };

    ms.presets.scroller.measurement = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            wheel = {},
            w = [
                []
            ],
            wholeInvalids = {},
            wholeWheel = {},
            fractionWheel = {},
            fractions = [],
            useSign = s.sign,
            useUnits = s.units && s.units.length,
            baseUnit = useUnits ? (s.defaultUnit || s.units[0]) : '',
            units = [],
            useFract = s.step < 1,
            wholeStep = s.step > 1 ? s.step : 1,
            fractLength = useFract ? Math.max(s.scale, (s.step + '').split('.')[1].length) : 1,
            one = Math.pow(10, fractLength),
            steps = Math.round(useFract ? s.step * one : s.step),
            fractNr,
            realValue,
            oldUnit,
            idxSign = -1,
            idxFract,
            idxWhole,
            idxUnit,
            minVal,
            maxVal,
            minWhole,
            maxWhole,
            minFract,
            maxFract,
            wholeOffset = 0,
            fractOffset = 0,
            v,
            j,
            i = 0;

        function getWhole(k) {
            return Math.max(minWhole, Math.min(maxWhole, useFract ? (k < 0 ? Math.ceil(k) : Math.floor(k)) : step(Math.round(k - wholeOffset), steps) + wholeOffset));
        }

        function getFract(k) {
            return useFract ? step((Math.abs(k) - Math.abs(getWhole(k))) * one - fractOffset, steps) + fractOffset : 0;
        }

        function getParts(v) {
            var whole = getWhole(v),
                fract = getFract(v),
                sign = v < 0 ? '-' : '+';

            if (fract >= one) {
                if (v < 0) {
                    whole--;
                } else {
                    whole++;
                }
                fract = 0;
            }
            return [sign, whole, fract];
        }

        function getNr(d) {
            var whole = +d[idxWhole],
                fract = useFract ? (d[idxFract] / one * (whole < 0 ? -1 : 1)) : 0;
            return (useSign && d[0] == '-' ? -1 : 1) * (whole + fract);
        }

        function step(v, st) {
            return Math.round(v / st) * st;
        }

        function pad(num, size) {
            num = num + '';
            while (num.length < size) {
                num = '0' + num;
            }
            return num;
        }

        function convert(v, u1, u2) {
            if (u1 === u2 || !s.convert) {
                return v;
            }
            return s.convert.call(this, v, u1, u2);
        }

        function constrain(val, min, max) {
            val = val > max ? max : val;
            val = val < min ? min : val;
            return val;
        }

        function setMinMax(unit) {
            var minv,
                maxv;

            minVal = convert(s.min, baseUnit, unit);
            maxVal = convert(s.max, baseUnit, unit);

            if (useFract) {
                minWhole = minVal < 0 ? Math.ceil(minVal) : Math.floor(minVal);
                maxWhole = maxVal < 0 ? Math.ceil(maxVal) : Math.floor(maxVal);
                minFract = getFract(minVal);
                maxFract = getFract(maxVal);
            } else {
                minWhole = Math.round(minVal);
                maxWhole = Math.round(maxVal);
                maxWhole = minWhole + Math.floor((maxWhole - minWhole) / steps) * steps;
                wholeOffset = minWhole % steps;
            }

            minv = minWhole;
            maxv = maxWhole;

            if (useSign) {
                maxv = Math.abs(minv) > Math.abs(maxv) ? Math.abs(minv) : Math.abs(maxv);
                minv = minv < 0 ? 0 : minv;
            }

            wholeWheel.min = minv < 0 ? Math.ceil(minv / wholeStep) : Math.floor(minv / wholeStep);
            wholeWheel.max = maxv < 0 ? Math.ceil(maxv / wholeStep) : Math.floor(maxv / wholeStep);
        }

        function format(d) {
            return getNr(d).toFixed(useFract ? fractLength : 0) + (useUnits ? ' ' + units[d[idxUnit]] : '');
        }

        // Extended methods
        // ---

        inst.setVal = function (val, fill, change, temp, time) {
            // Force parse if value is passed as an array
            inst._setVal($.isArray(val) ? format(val) : val, fill, change, temp, time);
        };

        // ---

        // Inits

        // generate array from unitNames
        if (s.units) {
            for (j = 0; j < s.units.length; ++j) {
                v = s.units[j];
                units.push(s.unitNames ? s.unitNames[v] || v : v);
            }
        }

        // Check if sign is needed
        if (useSign) {
            useSign = false;
            if (useUnits) {
                for (j = 0; j < s.units.length; j++) {
                    if (convert(s.min, baseUnit, s.units[j]) < 0) {
                        useSign = true;
                    }
                }
            } else {
                useSign = s.min < 0;
            }
        }

        // Sign wheel (if enabled)
        if (useSign) {
            w[0].push({
                data: ['-', '+'],
                label: s.signText
            });
            idxSign = i++;
        }

        // Whole wheel (later generated)
        wholeWheel = {
            label: s.wholeText,
            data: function (i) {
                return minWhole % wholeStep + i * wholeStep;
            },
            getIndex: function (i) {
                return Math.round((i - minWhole % wholeStep) / wholeStep);
            }
        };
        w[0].push(wholeWheel);
        idxWhole = i++;

        setMinMax(baseUnit);

        // Fraction wheel
        if (useFract) {
            w[0].push(fractionWheel);
            fractionWheel.data = [];
            fractionWheel.label = s.fractionText;
            for (j = fractOffset; j < one; j += steps) {
                fractions.push(j);
                fractionWheel.data.push({
                    value: j,
                    display: '.' + pad(j, fractLength)
                });
            }

            idxFract = i++;
            fractNr = Math.ceil(100 / steps);

            if (s.invalid && s.invalid.length) { // Calculate whole invalids
                $.each(s.invalid, function (i, v) {
                    var w = v > 0 ? Math.floor(v) : Math.ceil(v);
                    if (w === 0) { // We need to track +0 and -0 sepparately
                        w = v <= 0 ? -0.001 : 0.001;
                    }
                    wholeInvalids[w] = (wholeInvalids[w] || 0) + 1;
                    if (v === 0) {
                        w = 0.001;
                        wholeInvalids[w] = (wholeInvalids[w] || 0) + 1;
                    }
                });

                $.each(wholeInvalids, function (i, v) {
                    if (v < fractNr) {
                        delete wholeInvalids[i];
                    } else {
                        wholeInvalids[i] = i;
                    }
                });
            }
        }

        // Unit wheel
        if (useUnits) {
            wheel = {
                data: [],
                label: s.unitText,
                circular: false
            };
            for (j = 0; j < s.units.length; j++) {
                wheel.data.push({
                    value: j,
                    display: units[j]
                });
            }
            w[0].push(wheel);
        }
        idxUnit = i;

        return {
            wheels: w,
            minWidth: useSign && useFract ? 70 : 80,
            showLabel: false,
            formatValue: format,
            parseValue: function (v) {
                var vv = (typeof v === 'number' ? v + '' : v) || s.defaultValue,
                    d = (vv + '').split(' '),
                    val = +d[0],
                    ret = [],
                    parts,
                    unit = '';

                if (useUnits) {
                    unit = $.inArray(d[1], units);
                    unit = unit == -1 ? $.inArray(baseUnit, s.units) : unit;
                    unit = unit == -1 ? 0 : unit;
                }

                oldUnit = useUnits ? s.units[unit] : '';

                setMinMax(oldUnit);

                val = isNaN(val) ? 0 : val;

                val = constrain(val, minVal, maxVal);

                parts = getParts(val);

                parts[1] = constrain(parts[1], minWhole, maxWhole);

                realValue = val;

                if (useSign) {
                    ret[0] = parts[0];
                    parts[1] = Math.abs(parts[1]);
                }

                ret[idxWhole] = parts[1];

                if (useFract) {
                    ret[idxFract] = parts[2];
                }

                if (useUnits) {
                    ret[idxUnit] = unit;
                }

                return ret;
            },
            onCancel: function () {
                realValue = undefined;
            },
            validate: function (data) {
                var minus,
                    parts,
                    whole,
                    iparts,
                    from,
                    values = data.values,
                    index = data.index,
                    dir = data.direction,
                    dis = {},
                    disabled = [],
                    wheels = {},
                    newUnit = useUnits ? s.units[values[idxUnit]] : '';

                // Sign changed
                if (useSign && index === 0) {
                    realValue = Math.abs(realValue) * (values[0] == '-' ? -1 : 1);
                }

                // Set real value if numbers changed
                if (index === idxWhole || (index === idxFract && useFract) || realValue === undefined || (index === undefined)) {
                    realValue = getNr(values);
                    oldUnit = newUnit;
                }

                // Convert value if unit changed
                if ((useUnits && (index === idxUnit && oldUnit !== newUnit)) || (index === undefined)) {
                    setMinMax(newUnit);
                    realValue = convert(realValue, oldUnit, newUnit);
                    oldUnit = newUnit;
                    parts = getParts(realValue);

                    if (index !== undefined) {
                        //wholeWheel._refresh();
                        wheels[idxWhole] = wholeWheel;
                        inst.changeWheel(wheels);
                    }

                    if (useSign) {
                        values[0] = parts[0];
                    }
                }

                // Disable invalid values

                disabled[idxWhole] = [];

                if (useSign) {
                    // Disable +/- signs
                    disabled[0] = [];
                    if (minVal > 0) {
                        disabled[0].push('-');
                        values[0] = '+';
                    }
                    if (maxVal < 0) {
                        disabled[0].push('+');
                        values[0] = '-';
                    }

                    from = Math.abs(values[0] == '-' ? minWhole : maxWhole);
                    for (i = from + wholeStep; i < from + 20 * wholeStep; i += wholeStep) {
                        disabled[idxWhole].push(i);
                        dis[i] = true;
                    }
                }

                realValue = constrain(realValue, minVal, maxVal);
                parts = getParts(realValue);
                whole = useSign ? Math.abs(parts[1]) : parts[1];
                minus = useSign ? values[0] == '-' : realValue < 0;

                values[idxWhole] = whole;

                if (minus) { // Need this for 0
                    parts[0] = '-';
                }

                if (useFract) {
                    values[idxFract] = parts[2];
                }

                // Disable invalid values on whole wheel
                $.each(useFract ? wholeInvalids : s.invalid, function (i, v) { // disable whole user values
                    if (useSign && minus) {
                        if (v <= 0) {
                            v = Math.abs(v);
                        } else {
                            return;
                        }
                    }
                    v = step(convert(v, baseUnit, newUnit), useFract ? 1 : steps);
                    dis[v] = true;
                    disabled[idxWhole].push(v);
                });

                // Find nearest valid whole value
                values[idxWhole] = inst.getValidValue(idxWhole, whole, dir, dis);
                parts[1] = values[idxWhole] * (useSign && minus ? -1 : 1);

                // Validate fraction wheel values
                if (useFract) {
                    disabled[idxFract] = [];

                    // We need to make difference between +0 and -0, so we compare the strings instead of numbers
                    var p1 = useSign ? (values[0] + values[1]) : ((realValue < 0 ? '-' : '+') + Math.abs(parts[1])),
                        p2 = (minVal < 0 ? '-' : '+') + Math.abs(minWhole),
                        p3 = (maxVal < 0 ? '-' : '+') + Math.abs(maxWhole);

                    // Disable out of range fraction values
                    if (p1 === p2) {
                        $(fractions).each(function (i, v) {
                            if (minus ? v > minFract : v < minFract) {
                                disabled[idxFract].push(v);
                            }
                        });
                    }
                    if (p1 === p3) {
                        $(fractions).each(function (i, v) {
                            if (minus ? v < maxFract : v > maxFract) {
                                disabled[idxFract].push(v);
                            }
                        });
                    }

                    // Disable invalid fraction values
                    $.each(s.invalid, function (i, v) {
                        iparts = getParts(convert(v, baseUnit, newUnit));
                        // Sign and whole part matches
                        if ((parts[0] === iparts[0] || (parts[1] === 0 && iparts[1] === 0 && iparts[2] === 0)) && parts[1] === iparts[1]) {
                            disabled[idxFract].push(iparts[2]);
                        }
                    });
                }

                return {
                    disabled: disabled,
                    valid: values
                };
            }
        };
    };

    ms.presetShort('measurement');

})();
