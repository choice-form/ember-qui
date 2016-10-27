/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        defaults = {
            inputClass: '',
            values: 5,
            order: 'desc',
            style: 'icon',
            invalid: [],
            //layout: 'fixed',
            icon: {
                filled: 'star3',
                empty: 'star3'
            }
        };

    ms.presetShort('rating');

    ms.presets.scroller.rating = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            elm = $(this),
            id = this.id + '_dummy',
            lbl = $('label[for="' + this.id + '"]').attr('for', id),
            label = s.label !== undefined ? s.label : (lbl.length ? lbl.text() : elm.attr('name')),
            def = s.defaultValue,
            w = [
                []
            ],
            wheel = {
                data: [],
                label: label,
                circular: false
            },
            main = {},
            values = [],
            input,
            text = false,
            i,
            j,
            html,
            key,
            value,
            order,
            nr,
            p,
            N,
            style = s.style === 'grade' ? 'circle' : 'icon'; // Currently supporting only two kinds of shapes

        if (elm.is('select')) {
            s.values = {};
            $('option', elm).each(function () { // Create text from the select options
                s.values[$(this).val()] = $(this).text();
            });
            // Create a textinput before the select, which will hold the selected value
            $('#' + id).remove();
        }

        if ($.isArray(s.values)) {
            for (i = 0; i < s.values.length; i++) {
                nr = +s.values[i];
                if (isNaN(nr)) {
                    nr = i + 1;
                    text = true;
                }
                values.push({
                    order: nr,
                    key: s.values[i],
                    value: s.values[i]
                });
            }
        } else if ($.isPlainObject(s.values)) {
            i = 1;
            text = true;
            for (p in s.values) {
                nr = +p;
                if (isNaN(nr)) {
                    nr = i;
                }
                values.push({
                    order: nr,
                    key: p,
                    value: s.values[p]
                });
                i++;
            }
        } else {
            for (i = 1; i <= s.values; i++) {
                values.push({
                    order: i,
                    key: i,
                    value: i
                });
            }
        }

        if (s.showText === undefined && text) {
            s.showText = true;
        }

        if (s.icon.empty === undefined) {
            s.icon.empty = s.icon.filled;
        }

        values.sort(function (a, b) {
            return s.order == 'desc' ? b.order - a.order : a.order - b.order;
        });

        N = s.order == 'desc' ? values[0].order : values[values.length - 1].order; // Number of icons

        for (i = 0; i < values.length; i++) {
            order = values[i].order;
            key = values[i].key;
            value = values[i].value;
            html = '';
            for (j = 1; j < order + 1; j++) {
                html += '<span class="mbsc-rating-' + style + (style === 'circle' ? '' : ' mbsc-ic mbsc-ic-' + s.icon.filled) + ' ">' + (style == 'circle' ? j : ' ') + '</span>';
            }
            for (j = order + 1; j <= N; j++) {
                html += '<span class="mbsc-rating-' + style + (style === 'circle' ? ' mbsc-rating-circle-unf' : ' mbsc-ic mbsc-ic-' + (s.icon.empty ? s.icon.empty + ' mbsc-rating-icon-unf' : '') + (s.icon.empty === s.icon.filled ? ' mbsc-rating-icon-same' : '')) + '"></span>';
            }
            if (def === undefined) {
                def = key;
            }
            html += s.showText ? '<span class="mbsc-rating-txt">' + value + '</span>' : '';
            wheel.data.push({
                value: key,
                display: html,
                label: value
            });
            main[key] = value;
        }
        if (elm.is('select')) {
            input = $('<input type="text" id="' + id + '" value="' + main[elm.val()] + '" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />').insertBefore(elm);
        }

        w[0].push(wheel);

        if (input) {
            inst.attachShow(input);
        }

        if (elm.is('select')) {
            elm.hide().closest('.ui-field-contain').trigger('create');
        }

        // Extended methods
        // ---

        inst.getVal = function (temp) {
            var v = inst._hasValue ? inst[temp ? '_tempWheelArray' : '_wheelArray'][0] : null;
            return ms.util.isNumeric(v) ? +v : v;
        };

        // ---

        return {
            anchor: input,
            wheels: w,
            headerText: false,
            compClass: 'mbsc-rating',
            setOnTap: true,
            formatValue: function (d) {
                return main[d[0]];
            },
            parseValue: function (v) {
                // Find the value
                var i;

                for (i in main) {
                    if ((input && i == v) || (!input && main[i] == v)) {
                        return [i];
                    }
                }

                return [def];
            },
            validate: function () {
                return {
                    disabled: [s.invalid]
                };
            },
            onFill: function (ev) {
                if (input) {
                    input.val(ev.valueText);
                    elm.val(inst._tempWheelArray[0]);
                }
            },
            onDestroy: function () {
                if (input) {
                    input.remove();
                }
                elm.show();
            }
        };
    };

})();
