/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (window, document, undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        extend = $.extend,
        util = ms.util,
        datetime = util.datetime,
        adjustedDate = datetime.adjustedDate,
        presets = ms.presets.scroller,
        defaults = {};

    ms.presetShort('calendar');

    presets.calendar = function (inst) {

        function getTextColor(color) {
            if (color) {
                // Cache calculated text colors, because it is slow
                if (textColors[color]) {
                    return textColors[color];
                }
                var div = $('<div style="background-color:' + color + ';"></div>').appendTo('body'),
                    style = window.getComputedStyle ? getComputedStyle(div[0]) : div[0].style,
                    rgb = style.backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, '').split(','),
                    delta = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114,
                    txt = delta > 130 ? '#000' : '#fff';

                div.remove();

                textColors[color] = txt;

                return txt;
            }
        }

        function getDateOnly(d) {
            return adjustedDate(d.getFullYear(), d.getMonth(), d.getDate());
        }

        function setValues(values) {
            selectedValues = {};
            if (values && values.length) {
                for (i = 0; i < values.length; i++) {
                    selectedValues[getDateOnly(values[i])] = values[i];
                }
            }
        }

        function refresh() {
            inst.refresh();
        }

        // ---

        var base,
            ctx,
            firstSelectDay,
            i,
            markedObj,
            origValues,
            ret,
            textColors = {},
            orig = extend({}, inst.settings),
            s = extend(inst.settings, defaults, orig),
            activeClass = s.activeClass || '',
            multi = s.select == 'multiple' || s.select > 1 || s.selectType == 'week',
            maxSelect = util.isNumeric(s.select) ? s.select : Infinity,
            markedText = !!s.events,
            selectedValues = {};

        ret = presets.calbase.call(this, inst);
        base = extend({}, ret);

        firstSelectDay = s.firstSelectDay === undefined ? s.firstDay : s.firstSelectDay;

        if (multi && s.defaultValue && s.defaultValue.length) {
            for (i = 0; i < s.defaultValue.length; i++) {
                selectedValues[getDateOnly(s.defaultValue[i])] = s.defaultValue[i];
            }
        }

        // Extended methods
        // ---

        inst.onGenMonth = function (y, m) {
            markedObj = inst.prepareObj(s.events || s.marked, y, m);
        };

        inst.getDayProps = function (d) {
            var i,
                selected = multi ? selectedValues[d] !== undefined : undefined,
                marked = markedObj[d] ? markedObj[d] : false,
                txt = marked && marked[0] && marked[0].text,
                bgColor = marked && marked[0] && marked[0].color,
                txtColor = markedText && txt ? getTextColor(bgColor) : '',
                iconMarkup = '',
                markedMarkup = '';

            if (marked) {
                for (i = 0; i < marked.length; i++) {
                    if (marked[i].icon) {
                        iconMarkup += '<span class="mbsc-ic mbsc-ic-' + marked[i].icon + '"' + (marked[i].text ? '' : (marked[i].color ? ' style="color:' + marked[i].color + ';"' : '')) + '></span>\n';
                    }
                }

                // Multicolor
                markedMarkup = '<div class="mbsc-cal-day-m"><div class="mbsc-cal-day-m-t">';
                for (i = 0; i < marked.length; i++) {
                    markedMarkup += '<div class="mbsc-cal-day-m-c"' + (marked[i].color ? ' style="background:' + marked[i].color + ';"' : '') + '></div>';
                }
                markedMarkup += '</div></div>';
            }

            return {
                marked: marked,
                selected: selected,
                cssClass: marked ? 'mbsc-cal-day-marked' : '',
                ariaLabel: markedText ? txt : '',
                markup: markedText && txt ?
                    '<div class="mbsc-cal-day-txt-c"><div class="mbsc-cal-day-txt" title="' + $('<div>' + txt + '</div>').text() + '"' + (bgColor ? ' style="background:' + bgColor + ';color:' + txtColor + ';text-shadow:none;"' : '') + '>' + iconMarkup + txt + '</div></div>' : markedText && iconMarkup ?
                    '<div class="mbsc-cal-day-ic-c">' + iconMarkup + '</div>' : marked ?
                    markedMarkup : ''
            };
        };

        inst.addValue = function (v) {
            selectedValues[getDateOnly(v)] = v;
            refresh();
        };

        inst.removeValue = function (v) {
            delete selectedValues[getDateOnly(v)];
            refresh();
        };

        inst.setVal = function (val, fill, change, temp, time) {
            if (multi) {
                setValues(val);
                val = val ? val[0] : null;
            }
            inst._setVal(val, fill, change, temp, time);
            refresh();
        };

        inst.getVal = function (temp) {
            if (multi) {
                return util.objectToArray(selectedValues);
            }
            return inst.getDate(temp);
        };

        // ---

        extend(ret, {
            highlight: !multi,
            outerMonthChange: !multi,
            parseValue: function (v) {
                var i, d;

                if (multi && v && typeof v === 'string') {
                    selectedValues = {};
                    v = v.split(',');
                    for (i = 0; i < v.length; i++) {
                        d = datetime.parseDate(inst.format, v[i].replace(/^\s+|\s+$/g, ''), s);
                        selectedValues[getDateOnly(d)] = d;
                    }
                    v = v[0];
                }

                if (multi && s.defaultValue && s.defaultValue.length) {
                    s.defaultValue = s.defaultValue[0];
                }

                return base.parseValue.call(this, v);
            },
            formatValue: function (d) {
                var i,
                    ret = [];

                if (multi) {
                    for (i in selectedValues) {
                        ret.push(datetime.formatDate(inst.format, selectedValues[i], s));
                    }
                    return ret.join(', ');
                }
                return base.formatValue.call(this, d);
            },
            onClear: function () {
                if (multi) {
                    selectedValues = {};
                    inst.refresh();
                }
            },
            onBeforeShow: function () {
                if (s.setOnDayTap === undefined && (!s.buttons || !s.buttons.length)) {
                    s.setOnDayTap = true;
                }
                if (s.setOnDayTap && s.display != 'inline') {
                    s.outerMonthChange = false;
                }
                if (s.counter && multi) {
                    s.headerText = function () {
                        var length = 0,
                            w = (s.selectType == 'week') ? 7 : 1;

                        $.each(selectedValues, function () {
                            length++;
                        });

                        length = Math.round(length / w);

                        return (length > 1 ? s.selectedPluralText || s.selectedText : s.selectedText).replace(/{count}/, length);
                    };
                }
            },
            onMarkupReady: function (ev) {
                base.onMarkupReady.call(this, ev);

                ctx = $(ev.target);

                if (multi) {
                    $('.mbsc-fr-hdr', ctx).attr('aria-live', 'off');
                    origValues = extend({}, selectedValues);
                }

                if (markedText) {
                    $('.mbsc-cal', ctx).addClass('mbsc-cal-ev');
                }
            },
            onDayChange: function (day) {
                var dtime = day.date,
                    d = getDateOnly(dtime),
                    cell = $(day.target),
                    selected = day.selected;

                if (multi) {
                    if (s.selectType == 'week') { // Select whole week
                        var i,
                            sel,
                            diff = d.getDay() - firstSelectDay;

                        diff = diff < 0 ? 7 + diff : diff;

                        if (s.select != 'multiple') { // Only one week can be selected
                            selectedValues = {};
                        }
                        for (i = 0; i < 7; i++) {
                            sel = adjustedDate(d.getFullYear(), d.getMonth(), d.getDate() - diff + i);
                            if (selected) {
                                delete selectedValues[sel];
                            } else if (util.objectToArray(selectedValues).length / 7 < maxSelect) {
                                selectedValues[sel] = sel;
                            }
                        }
                        refresh();
                    } else { // Select day only
                        var days = $('.mbsc-cal .mbsc-cal-day[data-full="' + cell.attr('data-full') + '"]', ctx);

                        if (selected) {
                            days.removeClass('mbsc-cal-day-sel').removeAttr('aria-selected').find('.mbsc-cal-day-i').removeClass(activeClass);
                            delete selectedValues[d];
                        } else if (util.objectToArray(selectedValues).length < maxSelect) {
                            days.addClass('mbsc-cal-day-sel').attr('aria-selected', 'true').find('.mbsc-cal-day-i').addClass(activeClass);
                            selectedValues[d] = d;
                        }
                    }
                }

                if (s.setOnDayTap && s.select != 'multiple' && s.display != 'inline') {
                    inst.needsSlide = false;
                    inst.setDate(dtime);
                    inst.select();
                    return false;
                }
            },
            onCancel: function () {
                if (!inst.live && multi) {
                    selectedValues = extend({}, origValues);
                }
            }
        });

        return ret;
    };

})(window, document);
