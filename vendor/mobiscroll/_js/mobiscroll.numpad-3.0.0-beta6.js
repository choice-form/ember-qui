/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        util = ms.util,
        isNumeric = util.isNumeric,
        empty = function () {},
        classes = ms.classes;

    classes.Numpad = function (el, settings, inherit) {
        var $markup,
            disabledClass,
            ph,
            pos,
            s,
            mask,
            tempValueArray,
            tempTotal,
            trigger,
            total,
            valueArray,
            $elm = $(el),
            that = this,
            actions = [],
            tempActions = [],
            tempVariables = {},
            variables = {},
            numericKeys = {
                48: 0,
                49: 1,
                50: 2,
                51: 3,
                52: 4,
                53: 5,
                54: 6,
                55: 7,
                56: 8,
                57: 9,
                96: 0,
                97: 1,
                98: 2,
                99: 3,
                100: 4,
                101: 5,
                102: 6,
                103: 7,
                104: 8,
                105: 9
            };

        function display(manual) {
            // Validate
            var i,
                ret = s.validate.call(el, {
                    values: tempValueArray.slice(0),
                    variables: tempVariables
                }, that) || [],
                disabled = (ret && ret.disabled) || [];

            that._isValid = ret.invalid ? false : true;

            // Generate formatted value
            that._tempValue = s.formatValue.call(el, tempValueArray.slice(0), tempVariables, that);
            pos = tempValueArray.length;
            tempTotal = ret.length || total;

            if (that._isVisible  ) {

                // Fill template with numbers
                $('.mbsc-np-ph', $markup).each(function (i) {
                    $(this).html(s.fill == 'ltr' ? (i >= pos ? ph : mask || tempValueArray[i]) : (i >= total - tempTotal ? (i + pos < total ? ph : (mask || tempValueArray[i + pos - total])) : ''));
                });

                // Fill variable placeholders
                $('.mbsc-np-cph', $markup).each(function () {
                    $(this).html(tempVariables[$(this).attr('data-var')] || $(this).attr('data-ph'));
                });

                // Disable all numeric buttons if template is full
                if (pos === total) {
                    for (i = 0; i <= 9; i++) {
                        disabled.push(i);
                    }
                }

                // Disable invalid buttons
                $('.mbsc-np-btn', $markup).removeClass(disabledClass);
                for (i = 0; i < disabled.length; i++) {
                    $('.mbsc-np-btn[data-val="' + disabled[i] + '"]', $markup).addClass(disabledClass);
                }

                // Disable set button
                if (that._isValid) {
                    $('.mbsc-fr-btn-s .mbsc-fr-btn', $markup).removeClass(disabledClass);
                } else {
                    $('.mbsc-fr-btn-s .mbsc-fr-btn', $markup).addClass(disabledClass);
                }

                // Fill input if in live mode
                if (that.live) {
                    that._hasValue = manual || that._hasValue;
                    fillValue(manual, false, manual);
                    if (manual) {
                        trigger('onSet', {
                            valueText: that._value
                        });
                    }
                }
            }
        }

        function fillValue(fill, disp, change, temp) {
            if (disp) {
                display();
            }

            if (!temp) {
                valueArray = tempValueArray.slice(0);
                variables = $.extend({}, tempVariables);
                actions = tempActions.slice(0);

                that._value = that._hasValue ? that._tempValue : null;
            }

            if (fill) {
                if (that._isInput) {
                    $elm.val(that._hasValue && that._isValid ? that._value : '');
                }

                trigger('onFill', {
                    valueText: that._hasValue ? that._tempValue : '',
                    change: change
                });

                if (change) {
                    that._preventChange = true;
                    $elm.trigger('change');
                }
            }
        }

        function loadValues(values) {
            var i,
                vars,
                val = values || [],
                ret = [];

            tempActions = [];
            tempVariables = {};

            for (i = 0; i < val.length; i++) {
                //if (isNaN(parseInt(val[i]))) {
                if (/:/.test(val[i])) {
                    vars = val[i].split(':');
                    tempVariables[vars[0]] = vars[1];
                    tempActions.push(vars[0]);
                } else {
                    ret.push(val[i]);
                    tempActions.push('digit');
                }
            }

            return ret;
        }

        function onNumberTap(btn, val) {
            if ((!pos && !val && !s.allowLeadingZero) || btn.hasClass('mbsc-fr-btn-d') || btn.hasClass('mbsc-np-btn-empty')) {
                return;
            }

            if (pos < total  ) {
                tempActions.push('digit');
                tempValueArray.push(val);
                display(true);
            }
        }

        function onCustomTap(btn, val) {
            var i, v,
                variable = btn.attr('data-var');

            if (!btn.hasClass('mbsc-fr-btn-d')) {
                if (variable) {
                    v = variable.split(':');
                    tempActions.push(v[0]);
                    tempVariables[v[0]] = v[1];
                }

                if (val.length + pos <= tempTotal) {
                    for (i = 0; i < val.length; ++i) {
                        tempActions.push('digit');
                        tempValueArray.push(isNumeric(val[i]) ? +val[i] : val[i]);
                    }
                }
                display(true);
            }
        }

        function onDeleteTap() {
            var i,
                old,
                act = tempActions.pop();

            if (pos || act !== 'digit') {
                if (act !== 'digit' && tempVariables[act]) {
                    delete tempVariables[act];
                    old = tempActions.slice(0);
                    tempActions = [];
                    for (i = 0; i < old.length; i++) {
                        if (old[i] !== act) {
                            tempActions.push(old[i]);
                        }
                    }
                } else {
                    tempValueArray.pop();
                }
                display(true);
            }
        }

        // Call the parent constructor
        classes.Frame.call(this, el, settings, true);

        // Public functions

        /**
         * Sets the value
         */
        that.setVal = that._setVal = function (val, fill, change, temp) {
            that._hasValue = val !== null && val !== undefined;
            tempValueArray = loadValues($.isArray(val) ? val.slice(0) : s.parseValue.call(el, val, that));
            fillValue(fill, true, change === undefined ? fill : change, temp);
        };

        /**
         * Returns the selected value
         */
        that.getVal = that._getVal = function (temp) {
            return that._hasValue || temp ? that[temp ? '_tempValue' : '_value'] : null;
        };

        /*
         * Sets the value (passed as an array)
         */
        that.setArrayVal = that.setVal;

        /*
         * Returns the selected wheel values as an array
         */
        that.getArrayVal = function (temp) {
            return temp ? tempValueArray.slice(0) : that._hasValue ? valueArray.slice(0) : null;
        };


        // Protected overrides

        

        that._readValue = function () {
            var v = $elm.val() || '';

            if (v !== '') {
                that._hasValue = true;
            }

            if (mask) {
                tempVariables = {};
                tempActions = [];
                tempValueArray = [];
            } else {
                tempVariables = that._hasValue ? variables : {};
                tempActions = that._hasValue ? actions : [];
                tempValueArray = that._hasValue && valueArray ? valueArray.slice(0) : loadValues(s.parseValue.call(el, v, that));
                fillValue(false, true);
            }
        };

        that._fillValue = function () {
            that._hasValue = true;
            fillValue(true, false, true);
        };

        that._generateContent = function () {
            var i, j, v,
                k = 1,
                template = '',
                html = '';

            // Display
            html += '<div class="mbsc-np-hdr"><div role="button" tabindex="0" aria-label="' + s.deleteText + '" class="mbsc-np-del mbsc-fr-btn-e mbsc-ic mbsc-ic-' + s.deleteIcon + '"></div><div class="mbsc-np-dsp">';

            // Process template
            template = s.template.replace(/d/g, '<span class="mbsc-np-ph">' + ph + '</span>').replace(/&#100;/g, 'd');

            // Generate the template for custom buttons
            template = template.replace(/{([a-zA-Z0-9]*)\:?([a-zA-Z0-9\-\_]*)}/g, '<span class="mbsc-np-cph" data-var="$1" data-ph="$2">$2</span>');

            html += template;

            html += '</div></div>';

            // Digit buttons
            html += '<div class="mbsc-np-tbl-c mbsc-w-p"><div class="mbsc-np-tbl">';

            for (i = 0; i < 4; i++) {
                html += '<div class="mbsc-np-row">';
                for (j = 0; j < 3; j++) {
                    v = k;
                    if (k == 10 || k == 12) {
                        v = '';
                    } else if (k == 11) {
                        v = 0;
                    }
                    if (v === '') {
                        if (k == 10 && s.leftKey) {
                            html += '<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom mbsc-fr-btn-e" ' + (s.leftKey.variable ? 'data-var="' + s.leftKey.variable + '"' : '') + ' data-val="' + (s.leftKey.value || '') + '" >' + s.leftKey.text + '</div>';
                        } else if (k == 12 && s.rightKey) {
                            html += '<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom mbsc-fr-btn-e" ' + (s.rightKey.variable ? 'data-var="' + s.rightKey.variable + '"' : '') + ' data-val="' + (s.rightKey.value || '') + '" >' + s.rightKey.text + '</div>';
                        } else {
                            html += '<div class="mbsc-np-btn mbsc-np-btn-empty"></div>';
                        }
                    } else {
                        html += '<div tabindex="0" role="button" class="mbsc-np-btn mbsc-fr-btn-e" data-val="' + v + '">' + v  + '</div>';
                    }
                    k++;
                }
                html += '</div>';
            }

            html += '</div></div>';

            return html;
        };

        that._markupReady = function () {
            $markup = that._markup;
            display();
        };

        that._attachEvents = function ($m) {

            $m.on('keydown', function (e) {
                if (numericKeys[e.keyCode] !== undefined) {
                    onNumberTap($('.mbsc-np-btn[data-val="' + numericKeys[e.keyCode] + '"]'), numericKeys[e.keyCode]);
                } else if (e.keyCode == 8) {
                    e.preventDefault();
                    onDeleteTap();
                }
            });

            that.tap($('.mbsc-np-btn', $m), function () {
                var btn = $(this);
                if (btn.hasClass('mbsc-np-btn-custom')) {
                    onCustomTap(btn, btn.attr('data-val'));
                } else {
                    onNumberTap(btn, +btn.attr('data-val'));
                }
            }, undefined, 30);

            that.tap($('.mbsc-np-del', $m), onDeleteTap, undefined, 30);
        };

        that._processSettings = function () {
            s = that.settings;
            s.headerText = (s.headerText || '').replace('{value}', '');
            s.cssClass = (s.cssClass || '') + ' mbsc-np';
            s.template = s.template.replace(/\\d/, '&#100;');

            ph = s.placeholder;
            total = (s.template.match(/d/g) || []).length;
            disabledClass = 'mbsc-fr-btn-d ' + (s.disabledClass || '');
            mask = s.mask;

            trigger = that.trigger;

            if (mask && $elm.is('input')) {
                $elm.attr('type', 'password');
            }
        };

        that._indexOf = function (cont, v) {
            var i;
            for (i = 0; i < cont.length; ++i) {
                if (cont[i].toString() === v.toString()) {
                    return i;
                }
            }
            return -1;
        };

        // Constructor
        if (!inherit) {
            that.init(settings);
        }
    };

    // Extend defaults
    classes.Numpad.prototype = {
        _hasDef: true,
        _hasTheme: true,
        _hasLang: true,
        _hasPreset: true,
        _class: 'numpad',
        _defaults: $.extend({}, classes.Frame.prototype._defaults, {
            template: 'dd.dd',
            placeholder: '0',
            deleteIcon: 'backspace',
            allowLeadingZero: false,
            fill: 'rtl',
            // Localization
            deleteText: 'Delete',
            decimalSeparator: '.',
            thousandsSeparator: ',',
            // @todo
            // ---
            //fillFullTemplate: true,
            // ---
            validate: empty,
            parseValue: empty,
            formatValue: function (value, variables, inst) {
                var i,
                    j = 1,
                    s = inst.settings,
                    ph = s.placeholder,
                    template = s.template,
                    valueLen = value.length,
                    tempLen = template.length,
                    res = '';

                for (i = 0; i < tempLen; i++) {
                    if (template[tempLen - i - 1] == 'd') {
                        if (j <= valueLen) {
                            res = value[valueLen - j] + res;
                        } else {
                            res = ph + res;
                        }
                        j++;
                    } else {
                        res = template[tempLen - i - 1] + res;
                    }
                }

                $.each(variables, function (i, v) {
                    res = res.replace('{' + i + '}', v);
                });

                return $('<div>' + res + '</div>').text();
            }
        })
    };

    ms.themes.numpad = ms.themes.frame;

    ms.presetShort('numpad', 'Numpad', false);

})();

// Decimal preset
// ---

(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.numpad,
        defaults = {
            min: 0,
            max: 99.99,
            scale: 2,
            prefix: '',
            suffix: '',
            returnAffix: false
        };

    presets.decimal = function (inst) {

        function getNumber(value) {
            var i,
                v = value.slice(0),
                ret = 0;

            while (v.length) {
                ret = ret * 10 + v.shift();
            }

            for (i = 0; i < s.scale; i++) {
                ret /= 10;
            }

            return ret;
        }

        function getFormatted(value) {
            var nr = getNumber(value)
                .toFixed(s.scale)
                .replace('.', s.decimalSeparator)
                .replace(/\B(?=(\d{3})+(?!\d))/g, s.thousandsSeparator);
            return nr;
        }

        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig);

        // Extended methods
        // ---

        inst.getVal = function (temp) {
            var val = inst._getVal(temp);
            return ms.util.isNumeric(val) ? +val : val;
        };

        // ---

        return {
            template: s.prefix.replace(/d/g, '\\d') + Array((Math.floor(s.max) + '').length + 1).join('d') + (s.scale ? '.' + Array(s.scale + 1).join('d') : '') + s.suffix.replace(/d/g, '\\d'),
            parseValue: function (value) {
                var i, m,
                    v = value || s.defaultValue,
                    ret = [];

                if (v) {
                    v = v + '';
                    m = v.match(/\d+\.?\d*/g);
                    if (m) {
                        m = (+m[0]).toFixed(s.scale);
                        for (i = 0; i < m.length; i++) {
                            if (m[i] != '.') {
                                if (+m[i]) {
                                    ret.push(+m[i]);
                                } else if (ret.length) { // No leading 0s
                                    ret.push(0);
                                }
                            }
                        }
                    }
                }
                return ret;
            },
            formatValue: function (value) {
                var nr = getFormatted(value);
                return s.returnAffix ? (s.prefix + nr + s.suffix) : nr;
            },
            validate: function (data) {
                var value = data.values,
                    v = getFormatted(value),
                    nr = getNumber(value),
                    disabled = [];

                if (!value.length && !s.allowLeadingZero) {
                    disabled.push(0);
                }

                // Display the formatted value
                if (inst.isVisible()) {
                    $('.mbsc-np-dsp', inst._markup).html(s.prefix + v + s.suffix);
                }

                return {
                    disabled: disabled,
                    invalid: (nr > s.max || nr < s.min) || (s.invalid ? inst._indexOf(s.invalid, nr) != -1 : false)
                };
            }
        };
    };

})();

// ---

// Timespan preset
// ---

(function () {

    function getSeconds(value) {
        var i = 0,
            m = 1,
            ret = 0;

        while (value.length) {
            if (i > 3) {
                m = 60 * 60;
            } else if (i > 1) {
                m = 60;
            }
            ret = ret + value.pop() * m * (i % 2 ? 10 : 1);
            i++;
        }

        return ret;
    }

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.numpad,
        parts = ['h', 'm', 's'],
        defaults = {
            min: 0,
            max: 362439, //99 * 60 * 60 + 99 * 60 + 99
            defaultValue: 0,
            hourTextShort: 'h',
            minuteTextShort: 'm',
            secTextShort: 's'
        };

    presets.timespan = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            labels = {
                h: s.hourTextShort.replace(/d/g, '\\d'),
                m: s.minuteTextShort.replace(/d/g, '\\d'),
                s: s.secTextShort.replace(/d/g, '\\d')
            },
            template = 'd<span class="mbsc-np-sup mbsc-np-time">' + labels.s + '</span>';

        function formatTime(seconds) {
            var p,
                ret = '',
                m = 60 * 60;

            $(parts).each(function (i, v) {
                p = Math.floor(seconds / m);
                seconds -= p * m;
                m /= 60;
                if (p > 0 || (v == 's' && !ret)) {
                    ret = ret + (ret ? ' ' : '') + p + labels[v];
                }
            });

            return ret;
        }

        if (s.max > 9) {
            template = 'd' + template;
        }

        if (s.max > 99) {
            template = '<span class="mbsc-np-ts-m">' + (s.max > 639 ? 'd' : '') + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + labels.m + '</span>' + template;
        }

        if (s.max > 6039) {
            template = '<span class="mbsc-np-ts-h">' + (s.max > 38439 ? 'd' : '') + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + labels.h + '</span>' + template;
        }

        // Extended methods
        // ---

        inst.setVal = function (val, fill, change, temp) {
            if (ms.util.isNumeric(val)) {
                val = formatTime(val);
            }
            return inst._setVal(val, fill, change, temp);
        };

        inst.getVal = function (temp) {
            return inst._hasValue || temp ? getSeconds(inst.getArrayVal(temp)) : null;
        };

        // ---

        return {
            template: template,
            parseValue: function (value) {
                var p,
                    vv = value || formatTime(s.defaultValue),
                    ret = [];

                if (vv) {
                    $(parts).each(function (i, v) {
                        p = new RegExp('(\\d+)' + labels[v], 'gi').exec(vv);
                        if (p) {
                            p = +p[1];
                            if (p > 9) {
                                ret.push(Math.floor(p / 10));
                                ret.push(p % 10);
                            } else {
                                if (ret.length) { // No leading 0s
                                    ret.push(0);
                                }
                                if (p || ret.length) { // No leading 0s
                                    ret.push(p);
                                }
                            }
                        } else if (ret.length) {
                            ret.push(0);
                            ret.push(0);
                        }
                    });
                }
                return ret;
            },
            formatValue: function (value) {
                return formatTime(getSeconds(value));
            },
            validate: function (data) {
                var value = data.values,
                    v = getSeconds(value.slice(0)),
                    disabled = [];

                if (!value.length) {
                    disabled.push(0);
                }

                return {
                    disabled: disabled,
                    invalid: v > s.max || v < s.min || (s.invalid ? inst._indexOf(s.invalid, +v) != -1 : false)
                };
            }
        };
    };

})();

// ---


// Time preset
// ---

(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.numpad,
        defaults = {
            timeFormat: 'hh:ii A',
            amText: 'am',
            pmText: 'pm'
        };

    presets.time = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            timeFormat = s.timeFormat.split(':'),
            isAmPM = s.timeFormat.match(/a/i),
            am = isAmPM ? (isAmPM[0] == 'a' ? s.amText : s.amText.toUpperCase()) : '',
            pm = isAmPM ? (isAmPM[0] == 'a' ? s.pmText : s.pmText.toUpperCase()) : '',
            l = 0,
            minH = s.min ? '' + s.min.getHours() : '',
            maxH = s.max ? '' + s.max.getHours() : '',
            minM = s.min ? '' + (s.min.getMinutes() < 10 ? '0' + s.min.getMinutes() : s.min.getMinutes()) : '',
            maxM = s.max ? '' + (s.max.getMinutes() < 10 ? '0' + s.max.getMinutes() : s.max.getMinutes()) : '',
            minS = s.min ? '' + (s.min.getSeconds() < 10 ? '0' + s.min.getSeconds() : s.min.getSeconds()) : '',
            maxS = s.max ? '' + (s.max.getSeconds() < 10 ? '0' + s.max.getSeconds() : s.max.getSeconds()) : '';

        s.min ? s.min.setFullYear(2014, 7, 20) : '';
        s.max ? s.max.setFullYear(2014, 7, 20) : '';

        function getFormattedTime(value, variables) {
            var i,
                ret = '';

            for (i = 0; i < value.length; ++i) {
                ret += value[i] + (i % 2 == (value.length % 2 == 1 ? 0 : 1) && i != value.length - 1 ? ':' : '');
            }

            $.each(variables, function (i, v) {
                ret += ' ' + v;
            });

            return ret;
        }

        function disableButtons(value) {
            var i,
                isMinH, isMaxH, isMinM, isMaxM,
                invH, invM, invS,
                hour, minutes,
                disabled = [],
                digitNr = 2 * timeFormat.length;

            l = digitNr;

            if (!value.length) {
                if (isAmPM) {
                    disabled.push(0);
                    disabled.push(s.leftKey.value);
                }
                disabled.push(s.rightKey.value);
            }

            if (!isAmPM && (digitNr - value.length < 2 || ((value[0] != 1 && (value[0] > 2 || value[1] > 3)) && digitNr - value.length <= 2))) {
                disabled.push('30');
                disabled.push('00');
            }

            if ((isAmPM ? value[0] > 1 || value[1] > 2 : value[0] != 1 && (value[0] > 2 || value[1] > 3)) && value[0]) { // if the hour number is not a two digit number
                value.unshift(0);
                l = digitNr - 1;
            }

            if (value.length == digitNr) {
                for (i = 0; i <= 9; ++i) {
                    disabled.push(i);
                }
            } else if ((value.length == 1 && isAmPM && value[0] == 1) || (value.length && value.length % 2 === 0) || (!isAmPM && value[0] == 2 && value[1] > 3 && value.length % 2 == 1)) {
                for (i = 6; i <= 9; ++i) {
                    disabled.push(i);
                }
            }

            hour = value[1] !== undefined ? '' + value[0] + value[1] : '';
            minutes = +maxM == +(value[3] !== undefined ? '' + value[2] + value[3] : '');

            if (s.invalid) {
                for (i = 0; i < s.invalid.length; ++i) {
                    invH = s.invalid[i].getHours();
                    invM = s.invalid[i].getMinutes();
                    invS = s.invalid[i].getSeconds();

                    if (invH == +hour) {
                        if (timeFormat.length == 2 && (invM < 10 ? 0 : +('' + invM)[0]) == +value[2]) { // disable invalid minutes
                            disabled.push(invM < 10 ? invM : +('' + invM)[1]);
                            break;

                        } else if ((invS < 10 ? 0 : +('' + invS)[0]) == +value[4]) { // disable invalid sec
                            disabled.push(invS < 10 ? invS : +('' + invS)[1]);
                            break;
                        }
                    }
                }
            }

            if (s.min || s.max) {
                isMinH = +minH == +hour;
                isMaxH = +maxH == +hour;
                isMaxM = isMaxH && minutes;
                isMinM = isMinH && minutes;

                if (value.length === 0) {
                    for (i = isAmPM ? 2 : (minH > 19 ? minH[0] : 3); i <= (minH[0] == 1 ? 9 : minH[0] - 1); ++i) { // disables values lower than min and leves the 1,2 buttons
                        disabled.push(i);
                    }
                    if (minH >= 10) {
                        disabled.push(0);
                        if (minH[0] == 2) { //if 2x hour is min
                            for (i = 3; i <= 9; ++i) {
                                disabled.push(i);
                            }
                        }
                    }
                    if (maxH && maxH < 10 || minH && minH >= 10) { //disables values between min and max values
                        for (i = (maxH && maxH < 10 ? +maxH[0] + 1 : 0); i < (minH && minH >= 10 ? minH[0] : 10); ++i) {
                            disabled.push(i);
                        }
                    }
                }

                if (value.length == 1) {
                    if (value[0] === 0) { // disable min values if 24h format, and starts with 0
                        for (i = 0; i < minH[0]; ++i) { //kiveve minH[0] == 1 ? 9 :
                            disabled.push(i);
                        }
                    }
                    if (minH && (value[0] !== 0 && (isAmPM ? value[0] == 1 : value[0] == 2))) { // don't allow lower values entered, ex. 2:56
                        for (i = isAmPM ? 3 : 4; i <= 9; ++i) {
                            disabled.push(i);
                        }
                    }
                    if (value[0] == minH[0]) { // is min value
                        for (i = 0; i < minH[1]; ++i) {
                            disabled.push(i);
                        }
                    }
                    if (value[0] == maxH[0] && !isAmPM) { // is max value
                        for (i = +maxH[1] + 1; i <= 9; ++i) {
                            disabled.push(i);
                        }
                    }
                }
                if (value.length == 2 && (isMinH || isMaxH)) {
                    for (i = (isMaxH ? +maxM[0] + 1 : 0); i < (isMinH ? +minM[0] : 10); ++i) {
                        disabled.push(i);
                    }
                }
                if (value.length == 3 && (isMaxH && value[2] == maxM[0] || isMinH && value[2] == minM[0])) {
                    for (i = (isMaxH && value[2] == maxM[0] ? +maxM[1] + 1 : 0); i < (isMinH && value[2] == minM[0] ? +minM[1] : 10); ++i) {
                        disabled.push(i);
                    }
                }
                if (value.length == 4 && (isMinM || isMaxM)) {
                    for (i = (isMaxM ? +maxS[0] + 1 : 0); i < (isMinM ? +minS[0] : 10); ++i) {
                        disabled.push(i);
                    }
                }
                if (value.length == 5 && (isMinM && value[4] == minS[0] || isMaxM && value[4] == maxS[0])) {
                    for (i = (isMaxM && value[4] == maxS[0] ? +maxS[1] + 1 : 0); i < (isMinM && value[4] == minS[0] ? +minS[1] : 10); ++i) {
                        disabled.push(i);
                    }
                }
            }

            return disabled;
        }

        return {
            placeholder: '-',
            allowLeadingZero: true,
            template: ((timeFormat.length == 3 ? 'dd:dd:dd' : timeFormat.length == 2 ? 'dd:dd' : 'dd') + (isAmPM ? '<span class="mbsc-np-sup">{ampm:--}</span>' : '')),
            leftKey: isAmPM ? {
                text: am,
                variable: 'ampm:' + am,
                value: '00'
            } : {
                text: ':00',
                value: '00'
            },
            rightKey: isAmPM ? {
                text: pm,
                variable: 'ampm:' + pm,
                value: '00'
            } : {
                text: ':30',
                value: '30'
            },
            parseValue: function (value) {
                var i, m,
                    v = value || s.defaultValue,
                    ret = [];

                if (v) {
                    v = v + '';
                    m = v.match(/\d/g);
                    if (m) {
                        for (i = 0; i < m.length; i++) {
                            ret.push(+m[i]);
                        }
                    }
                    if (isAmPM) {
                        ret.push('ampm:' + (v.match(new RegExp(s.pmText, 'gi')) ? pm : am));
                    }
                }

                return ret;
            },
            formatValue: function (value, variables) {
                return getFormattedTime(value, variables);
            },
            validate: function (data) {
                var value = data.values,
                    variables = data.variables,
                    formattedTime = getFormattedTime(value, variables),
                    d = value.length >= 3 ? new Date(2014, 7, 20, ('' + value[0] + (value.length % 2 === 0 ? value[1] : '')), ('' + value[value.length % 2 === 0 ? 2 : 1] + value[value.length % 2 === 0 ? 3 : 2])) : '';
                return {
                    disabled: disableButtons(value),
                    length: l,
                    invalid: (isAmPM ? !new RegExp('^(0?[1-9]|1[012])(:[0-5]\\d)?(:[0-5][0-9])' + ' (?:' + s.amText + '|' + s.pmText + ')$', 'i').test(formattedTime) : !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(formattedTime)) || (s.invalid ? inst._indexOf(s.invalid, d) != -1 : false) || (!((s.min ? s.min <= d : true) && (s.max ? d <= s.max : true)))
                };
            }
        };
    };

})();


// Date preset 
// ---

(function () {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.numpad,
        defaults = {
            dateOrder: 'mdy',
            dateFormat: 'mm/dd/yy',
            delimiter: '/'
        };

    presets.date = function (inst) {
        var yi, mi, di, i,
            indexArray = [],
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, ms.util.datetime.defaults, defaults, orig),
            templ = s.dateOrder,
            minM = s.min ? '' + (s.getMonth(s.min) + 1) : 0,
            maxM = s.max ? '' + (s.getMonth(s.max) + 1) : 0,
            minD = s.min ? '' + s.getDay(s.min) : 0,
            maxD = s.max ? '' + s.getDay(s.max) : 0,
            minY = s.min ? '' + s.getYear(s.min) : 0,
            maxY = s.max ? '' + s.getYear(s.max) : 0;

        templ = templ.replace(/y+/gi, 'yyyy');
        templ = templ.replace(/m+/gi, 'mm');
        templ = templ.replace(/d+/gi, 'dd');
        yi = templ.toUpperCase().indexOf('Y');
        mi = templ.toUpperCase().indexOf('M');
        di = templ.toUpperCase().indexOf('D');
        templ = '';
        indexArray.push({
            val: yi,
            n: 'yyyy'
        }, {
            val: mi,
            n: 'mm'
        }, {
            val: di,
            n: 'dd'
        });
        indexArray.sort(function (a, b) {
            return a.val - b.val;
        });

        $.each(indexArray, function (i, v) {
            templ += v.n;
        });

        yi = templ.indexOf('y');
        mi = templ.indexOf('m');
        di = templ.indexOf('d');

        templ = '';
        for (i = 0; i < 8; ++i) {
            templ += 'd';
            if (i + 1 == yi || i + 1 == mi || i + 1 == di) {
                templ += s.delimiter;
            }
        }

        function isleapYear(year) {
            return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        }

        function disableButtons(value) {
            var i, j,
                invY, invM, invD,
                disabled = [],
                year = value[yi + 3] !== undefined ? '' + value[yi] + value[yi + 1] + value[yi + 2] + value[yi + 3] : '',
                month = value[mi + 1] !== undefined ? '' + value[mi] + value[mi + 1] : '',
                day = value[di + 1] !== undefined ? '' + value[di] + value[di + 1] : '',
                maxDay = '' + s.getMaxDayOfMonth(year || 2012, (month - 1) || 0), // Use a leap year if no year present to allow day 29 to be enetered
                isMin = minY === year && +minM === +month,
                isMax = maxY === year && +maxM === +month;

            if (s.invalid) {
                for (i = 0; i < s.invalid.length; ++i) {
                    invY = s.getYear(s.invalid[i]);
                    invM = s.getMonth(s.invalid[i]);
                    invD = s.getDay(s.invalid[i]);

                    if (invY == +year && invM + 1 == +month) { //disable the ivalid day
                        if ((invD < 10 ? 0 : +('' + invD)[0]) == +value[di]) {
                            disabled.push(invD < 10 ? invD : +('' + invD)[1]);
                            break;
                        }
                    }
                    if (invM + 1 == +month && invD == +day) { //disable invalid year
                        if (('' + invY).substring(0, 3) == ('' + value[yi] + value[yi + 1] + value[yi + 2])) {
                            disabled.push(('' + invY)[3]);
                            break;
                        }
                    }
                    if (invY == +year && invD == +day) { //disable the ivalid month
                        if ((invM < 10 ? 0 : +('' + (invM + 1))[0]) == +value[mi]) {
                            disabled.push(invM < 10 ? invM : +('' + (invM + 1))[1]);
                            break;
                        }
                    }
                }
            }

            // month check
            if (day == '31' && (value.length == mi || value.length == mi + 1)) { // disable 30 day months
                if (value[mi] != 1) {
                    disabled.push(2, 4, 6, 9, 11);
                } else {
                    disabled.push(1);
                }
            }

            if (day == '30' && value[mi] === 0 && value.length <= mi + 1) { // disable february
                disabled.push(2);
            }

            if (value.length == mi) { // before month's first digit set, disable values outside min/max
                for (i = (maxY === year && +maxM < 10) ? 1 : 2; i <= 9; ++i) {
                    disabled.push(i);
                }
                if (minY === year && +minM >= 10) {
                    disabled.push(0);
                }
            }

            if (value.length == mi + 1) { // before month's second digit set 
                if (value[mi] == 1) { // if two digit month number
                    for (i = maxY === year ? +maxM[1] + 1 : 3; i <= 9; ++i) {
                        disabled.push(i);
                    }
                    if (minY == year) { // if min year diable lower values
                        for (i = 0; i < +minM[1]; ++i) {
                            disabled.push(i);
                        }
                    }
                }
                if (value[mi] === 0) { //if month number starts with 0
                    disabled.push(0);
                    if (maxY === year || minY === year) { // if min/max diable lower/greater values
                        for (i = (maxY === year ? (+day > +maxD ? +maxM : +maxM + 1) : 0); i <= (minY === year ? (+day < +minD ? +minM - 1 : +minM - 1) : 9); ++i) {
                            disabled.push(i);
                        }
                    }
                }
            }

            // day check
            if (value.length == di) { // before day first digit set 
                for (i = isMax ? (+maxD > 10 ? +maxD[0] : 0) + 1 : +maxDay[0] + 1; i <= 9; ++i) {
                    disabled.push(i);
                }
                if (isMin) { // if is min year and month disable lower values
                    for (i = 0; i < (+minD < 10 ? 0 : minD[0]); ++i) {
                        disabled.push(i);
                    }
                }
            }

            if (value.length == di + 1) { // before day second digit set 
                if (value[di] >= 3 || month == '02') { //disable greater values than the maxDay's second digit
                    for (i = +maxDay[1] + 1; i <= 9; ++i) {
                        disabled.push(i);
                    }
                }
                if (isMax && +maxD[0] == value[di]) { //if max year and month disable greater values 
                    for (i = +maxD[1] + 1; i <= 9; ++i) {
                        disabled.push(i);
                    }
                }
                if (isMin && minD[0] == value[di]) { //if min year and month disable lower values
                    for (i = 0; i < +minD[1]; ++i) {
                        disabled.push(i);
                    }
                }
                if (value[di] === 0) { // if month first digit 0 
                    disabled.push(0);
                    if (isMax || isMin) { // disable greater/lower valies if min or max
                        for (i = (isMax ? +maxD + 1 : 1); i <= (isMin ? +minD - 1 : 9); ++i) {
                            disabled.push(i);
                        }
                    }
                }
            }

            // year check
            if (value[yi + 2] !== undefined && month == '02' && day == '29') { // if 29th and february than just leap years allowed
                for (j = +('' + value[yi] + value[yi + 1] + value[yi + 2] + 0); j <= +('' + value[yi] + value[yi + 1] + value[yi + 2] + 9); ++j) {
                    disabled.push(!isleapYear(j) ? j % 10 : '');
                }
            }

            if (value.length == yi) { // before year's first digit set 
                if (s.min) { // disable lower values
                    for (i = 0; i < +minY[0]; ++i) {
                        disabled.push(i);
                    }
                }
                if (s.max) { //disable greater values
                    for (i = +maxY[0] + 1; i <= 9; ++i) {
                        disabled.push(i);
                    }
                }
                disabled.push(0);
            }

            if (s.min || s.max) {
                for (j = 1; j < 4; ++j) {
                    if (value.length == yi + j) { // before year's i-th digit set 
                        if (value[yi + j - 1] == +minY[j - 1] && (j == 3 ? value[yi + j - 2] == +minY[j - 2] : true)) {
                            for (i = 0; i < +minY[j] + (j == 3 && value[mi + 1] && +minM > +month ? 1 : 0); ++i) { //if month less than min-month than doesn't allow minYear
                                disabled.push(i);
                            }
                        }
                        if (value[yi + j - 1] == +maxY[j - 1] && (j == 3 ? value[yi + j - 2] == +maxY[j - 2] : true)) {
                            for (i = +maxY[j] + (j == 3 && +maxM < +month ? 0 : 1); i <= 9; ++i) { //if month greater than max-month than doesn't allow maxYear
                                disabled.push(i);
                            }
                        }
                    }
                }
            }

            return disabled;
        }

        function calcDate(value) {
            return new Date(+('' + value[yi] + value[yi + 1] + value[yi + 2] + value[yi + 3]), +('' + value[mi] + value[mi + 1]) - 1, +('' + value[di] + value[di + 1]));
        }

        // Extended methods
        // ---

        inst.getVal = function (temp) {
            return inst._hasValue || temp ? calcDate(inst.getArrayVal(temp)) : null;
        };

        // ---

        return {
            placeholder: '-',
            fill: 'ltr',
            allowLeadingZero: true,
            template: templ,
            parseValue: function (value) {
                var i,
                    ret = [],
                    v = value || s.defaultValue,
                    d = ms.util.datetime.parseDate(s.dateFormat, v, s);

                if (v) {
                    for (i = 0; i < indexArray.length; ++i) {
                        if (/m/i.test(indexArray[i].n)) {
                            ret = ret.concat(((s.getMonth(d) < 9 ? '0' : '') + (s.getMonth(d) + 1)).split(''));
                        } else if (/d/i.test(indexArray[i].n)) {
                            ret = ret.concat(((s.getDay(d) < 10 ? '0' : '') + s.getDay(d)).split(''));
                        } else {
                            ret = ret.concat((s.getYear(d) + '').split(''));
                        }
                    }
                }

                return ret;
            },
            formatValue: function (value) {
                return ms.util.datetime.formatDate(s.dateFormat, calcDate(value), s);
            },
            validate: function (data) {
                var value = data.values,
                    d = calcDate(value);
                return {
                    disabled: disableButtons(value),
                    invalid: !(d != 'Invalid Date' && (s.min ? s.min <= d : true) && (s.max ? d <= s.max : true)) || (s.invalid ? inst._indexOf(s.invalid, d) != -1 : false)
                };
            }
        };
    };

})();

// ---
