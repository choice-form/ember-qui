/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        datetime = ms.util.datetime,
        util = ms.util,
        testTouch = util.testTouch,
        defaults = {
            autoCorrect: true,
            showSelector: true,
            minRange: 1,
            rangeTap: true,
            // Localization
            fromText: 'Start',
            toText: 'End'
        };

    ms.presetShort('range');

    presets.range = function (inst) {

        // Private functions
        // ---

        function normalize(d, ref) {
            if (d) {
                d.setFullYear(ref.getFullYear());
                d.setMonth(ref.getMonth());
                d.setDate(ref.getDate());
            }
        }

        function updateInputs(change) {
            inst._startDate = startDate = tempStartDate;
            inst._endDate = endDate = tempEndDate;

            if (s.startInput) {
                $(s.startInput).val(startVal);
                if (change) {
                    $(s.startInput).trigger('change');
                }
            }

            if (s.endInput) {
                $(s.endInput).val(endVal);
                if (change) {
                    $(s.endInput).trigger('change');
                }
            }
        }

        function validate(dates, ui) {
            var ret = true;

            if (dates && tempStartDate && tempEndDate) {
                if (tempEndDate - tempStartDate > s.maxRange - 1) {
                    //ret = false;
                    if (curr) {
                        tempStartDate = new Date(tempEndDate - s.maxRange + 1);
                    } else {
                        tempEndDate = new Date(+tempStartDate + s.maxRange - 1);
                    }
                }
                if (tempEndDate - tempStartDate < s.minRange - 1) {
                    //ret = false;
                    if (curr) {
                        tempStartDate = new Date(tempEndDate - s.minRange + 1);
                    } else {
                        tempEndDate = new Date(+tempStartDate + s.minRange - 1);
                    }
                }
            }

            if (!tempStartDate || !tempEndDate) {
                ret = false;
            }

            if (ui) {
                highlightDays();
            }

            return ret;
        }

        function calcDayNr() {
            return tempStartDate && tempEndDate ? Math.max(1, Math.round((new Date(tempEndDate).setHours(0, 0, 0, 0) - new Date(tempStartDate).setHours(0, 0, 0, 0)) / 86400000) + 1) : 0;
        }

        function selectTab(tab) {
            tab.addClass('mbsc-range-btn-sel').attr('aria-checked', 'true').find('.mbsc-range-btn').addClass(activeClass);
        }

        function setActiveTab() {
            if (showSelector && ctx) {
                $('.mbsc-range-btn-c', ctx).removeClass('mbsc-range-btn-sel').removeAttr('aria-checked').find('.mbsc-range-btn', ctx).removeClass(activeClass);

                // if (autoChange) {
                //     if (tempStartDate) {
                //         selectTab($('.mbsc-range-btn-c', ctx).eq(0));
                //     }
                //     if (tempEndDate) {
                //         selectTab($('.mbsc-range-btn-c', ctx).eq(1));
                //     }
                // } else {
                selectTab($('.mbsc-range-btn-c', ctx).eq(curr));
                // }
            }
        }

        function highlightDays() {
            var start,
                startT,
                end,
                endT,
                hl,
                nr = 0,
                startClass = autoChange || !curr ? ' mbsc-cal-day-hl mbsc-cal-sel-start' : ' mbsc-cal-sel-start',
                endClass = autoChange || curr ? ' mbsc-cal-day-hl mbsc-cal-sel-end' : ' mbsc-cal-sel-end';

            startVal = tempStartDate ? datetime.formatDate(format, tempStartDate, s) : '';
            endVal = tempEndDate ? datetime.formatDate(format, tempEndDate, s) : '';

            if (ctx) {
                $('.mbsc-range-btn-v-start', ctx).html(startVal || '&nbsp;');
                $('.mbsc-range-btn-v-end', ctx).html(endVal || '&nbsp;');

                // Highlight dates
                start = tempStartDate ? new Date(tempStartDate) : null;
                end = tempEndDate ? new Date(tempEndDate) : null;

                if (!start && end) {
                    start = new Date(end);
                }

                if (!end && start) {
                    end = new Date(start);
                }

                hl = curr ? end : start;

                $('.mbsc-cal-table .mbsc-cal-day-sel .mbsc-cal-day-i', ctx).removeClass(activeClass);
                $('.mbsc-cal-table .mbsc-cal-day-hl', ctx).removeClass(highlightClass);
                $('.mbsc-cal-table .mbsc-cal-day-sel', ctx).removeClass('mbsc-cal-day-sel mbsc-cal-sel-start mbsc-cal-sel-end').removeAttr('aria-selected');

                if (start && end) {
                    startT = start.setHours(0, 0, 0, 0);
                    endT = end.setHours(0, 0, 0, 0);
                    while (end >= start && nr < 84) {
                        $('.mbsc-cal-day[data-full="' + hl.getFullYear() + '-' + hl.getMonth() + '-' + hl.getDate() + '"]', ctx)
                            .addClass('mbsc-cal-day-sel' + (hl.getTime() === startT ? startClass : '') + (hl.getTime() === endT ? endClass : ''))
                            .attr('aria-selected', 'true')
                            .find('.mbsc-cal-day-i ').addClass(activeClass);

                        hl.setDate(hl.getDate() + (curr ? -1 : 1));
                        nr++;
                    }
                }
            }
        }

        // ---

        var base,
            ctx,
            dayChange,
            format,
            ret,
            init,
            set,
            startVal,
            endVal,
            tempStartDate,
            tempEndDate,
            timeOnly,
            readOnlyStart,
            readOnlyEnd,
            showSelector,
            startDate = inst._startDate,
            endDate = inst._endDate,
            curr = 0,
            now = new Date(),
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            startAnchor = s.anchor,
            autoChange = s.rangeTap,
            activeClass = s.activeClass || '',
            disabledClass = 'mbsc-fr-btn-d ' + (s.disabledClass || ''),
            highlightClass = 'mbsc-cal-day-hl',
            def = s.defaultValue === null ? [] : (s.defaultValue || [new Date(now.setHours(0, 0, 0, 0)), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59, 59, 999)]);

        if (autoChange) {
            s.tabs = true;
        }

        ret = presets.calbase.call(this, inst);
        base = $.extend({}, ret);
        format = inst.format;
        timeOnly = s.controls.join('') === 'time';
        showSelector = (s.controls.length == 1 && s.controls[0] == 'calendar') ? s.showSelector : true; // Allow hide start/end if only calendar is visible

        if (s.startInput) {
            readOnlyStart = $(s.startInput).prop('readonly');
            inst.attachShow($(s.startInput).prop('readonly', true), function () {
                curr = 0;
                s.anchor = startAnchor || $(s.startInput);
            });
        }

        if (s.endInput) {
            readOnlyEnd = $(s.endInput).prop('readonly');
            inst.attachShow($(s.endInput).prop('readonly', true), function () {
                curr = 1;
                s.anchor = startAnchor || $(s.endInput);

            });
        }

        // Extended methods
        // ---

        inst.setVal = function (values, fill, change, temp, time) {
            var v = values || [],
                d = values;

            if (v[0] === undefined || v[0] === null || v[0].getTime) {
                set = true;
                tempStartDate = v[0] || null;
                startVal = tempStartDate ? datetime.formatDate(format, tempStartDate, s) : '';
                if (!curr) {
                    d = base.parseValue(startVal, inst);
                }
            }

            if (v[1] === undefined || v[1] === null || v[1].getTime) {
                set = true;
                tempEndDate = v[1] || null;
                endVal = tempEndDate ? datetime.formatDate(format, tempEndDate, s) : '';
                if (curr) {
                    d = base.parseValue(endVal, inst);
                }
            }

            if (!temp) {
                inst._startDate = startDate = tempStartDate;
                inst._endDate = endDate = tempEndDate;
            }

            inst._setVal(d, fill, change, temp, time);
        };

        inst.getVal = function (temp) {
            return temp ? [tempStartDate, tempEndDate] : (inst._hasValue ? [startDate, endDate] : null);
        };

        inst.getDayProps = function (d) {
            var start = tempStartDate ? new Date(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate()) : null,
                end = tempEndDate ? new Date(tempEndDate.getFullYear(), tempEndDate.getMonth(), tempEndDate.getDate()) : null;

            return {
                selected: start && end && d >= start && d <= tempEndDate,
                cssClass: (((autoChange || !curr) && start && start.getTime() === d.getTime()) || ((autoChange || curr) && end && end.getTime() === d.getTime()) ? highlightClass : '') +
                    (start && start.getTime() === d.getTime() ? ' mbsc-cal-sel-start' : '') +
                    (end && end.getTime() === d.getTime() ? ' mbsc-cal-sel-end' : '')
            };
        };

        inst.setActiveDate = function (active) {
            var hl;

            //if (!autoChange) {
            curr = active == 'start' ? 0 : 1;
            //}

            hl = active == 'start' ? tempStartDate : tempEndDate;

            if (inst.isVisible()) {
                //if (!autoChange) {

                setActiveTab();

                if (!autoChange) {
                    $('.mbsc-cal-table .mbsc-cal-day-hl', ctx).removeClass(highlightClass);

                    if (hl) {
                        $('.mbsc-cal-day[data-full="' + hl.getFullYear() + '-' + hl.getMonth() + '-' + hl.getDate() + '"]', ctx).addClass(highlightClass);
                    }
                }

                if (hl) {
                    init = true;
                    inst.setDate(hl, false, 1000, true);
                }
            }
        };

        inst.getValue = inst.getVal;
        // ---

        // ---

        $.extend(ret, {
            highlight: false,
            outerMonthChange: false,
            formatValue: function () {
                return startVal + (s.endInput ? '' : (endVal ? ' - ' + endVal : ''));
            },
            parseValue: function (v) {
                var parts = v ? v.split(' - ') : [];

                s.defaultValue = def[1]; // used by parseDate

                if (s.endInput) {
                    endDate = $(s.endInput).val() ? datetime.parseDate(format, $(s.endInput).val(), s) : def[1];
                } else {
                    endDate = parts[1] ? datetime.parseDate(format, parts[1], s) : def[1];
                }

                s.defaultValue = def[0]; // used by parseDate

                if (s.startInput) {
                    startDate = $(s.startInput).val() ? datetime.parseDate(format, $(s.startInput).val(), s) : def[0];
                } else {
                    startDate = parts[0] ? datetime.parseDate(format, parts[0], s) : def[0];
                }

                s.defaultValue = def[curr];

                startVal = startDate ? datetime.formatDate(format, startDate, s) : '';
                endVal = endDate ? datetime.formatDate(format, endDate, s) : '';

                inst._startDate = startDate;
                inst._endDate = endDate;

                return base.parseValue(curr ? endVal : startVal, inst);
            },
            onFill: function (ev) {
                updateInputs(ev.change);
            },
            onBeforeClose: function (ev) {
                // Don't allow invalid selection
                if (ev.button === 'set' && !validate(true, true)) {
                    inst.setActiveDate(curr ? 'start' : 'end');
                    return false;
                }
            },
            onHide: function () {
                base.onHide.call(inst);
                curr = 0;
                ctx = null;
                s.anchor = startAnchor;
            },
            onClear: function () {
                if (autoChange) {
                    curr = 0;
                }
            },
            onBeforeShow: function () {
                s.headerText = false;

                tempStartDate = startDate;
                tempEndDate = endDate;

                if (s.counter) {
                    s.headerText = function () {
                        var nr = calcDayNr();
                        return (nr > 1 ? s.selectedPluralText || s.selectedText : s.selectedText).replace(/{count}/, nr);
                    };
                }

                set = true;
            },
            onMarkupReady: function (ev) {

                var html;

                ctx = $(ev.target);

                // Validate start end end dates
                if (tempStartDate) {
                    init = true;
                    inst.setDate(tempStartDate, false, 0, true);
                    tempStartDate = inst.getDate(true);
                }

                if (tempEndDate) {
                    init = true;
                    inst.setDate(tempEndDate, false, 0, true);
                    tempEndDate = inst.getDate(true);
                }

                // Set the current date (start or end)
                if ((curr && tempEndDate) || (!curr && tempStartDate)) {
                    init = true;
                    inst.setDate(curr ? tempEndDate : tempStartDate, false, 0, true);
                }

                // Call calbase
                base.onMarkupReady.call(this, ev);

                ctx.addClass('mbsc-range');

                if (showSelector) {
                    html = '<div class="mbsc-range-btn-t" role="radiogroup">' +
                        '<div class="mbsc-range-btn-c mbsc-range-btn-start"><div role="radio" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' + s.fromText + '<div class="mbsc-range-btn-v mbsc-range-btn-v-start">' + (startVal || '&nbsp;') + '</div></div></div>' +
                        '<div class="mbsc-range-btn-c mbsc-range-btn-end"><div role="radio" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn">' + s.toText + '<div class="mbsc-range-btn-v mbsc-range-btn-v-end">' + (endVal || '&nbsp;') + '</div></div></div>' +
                        '</div>';

                    $('.mbsc-cal-tabs', ctx).before(html);

                    setActiveTab();
                }

                $('.mbsc-range-btn-c', ctx).on('touchstart click', function (e) {
                    if (testTouch(e, this)) {
                        inst.showMonthView();
                        inst.setActiveDate($(this).index() ? 'end' : 'start');
                    }
                });
            },
            onDayChange: function (day) {
                day.active = curr ? 'end' : 'start';
                dayChange = true;
            },
            onSetDate: function (day) {
                var d = day.date,
                    o = inst.order;

                if (!init) {

                    // Normalize time
                    // ---
                    if (o.h === undefined) {
                        d.setHours(curr ? 23 : 0);
                    }

                    if (o.i === undefined) {
                        d.setMinutes(curr ? 59 : 0);
                    }

                    if (o.s === undefined) {
                        d.setSeconds(curr ? 59 : 0);
                    }

                    d.setMilliseconds(curr ? 999 : 0);
                    // ---

                    if (!set || dayChange) {

                        if (autoChange && dayChange) {
                            if (curr == 1 && d < tempStartDate) {
                                curr = 0;
                            }
                            if (curr) {
                                d.setHours(23, 59, 59, 999);
                            } else {
                                d.setHours(0, 0, 0, 0);
                            }
                        }

                        if (curr) {
                            tempEndDate = new Date(d);
                        } else {
                            tempStartDate = new Date(d);
                        }

                        // Make sure times are on the same day for comparison
                        if (timeOnly) {
                            normalize(tempStartDate, d);
                            normalize(tempEndDate, d);
                        }

                        // Set end date on start selection if rangeTap is enabled
                        if (autoChange && dayChange && !curr) {
                            //tempEndDate = new Date(d.setHours(23, 59, 59, 999));
                            tempEndDate = null;
                        }
                    }
                }

                // Validate min/max ranges
                inst._isValid = validate(set || dayChange || s.autoCorrect, !init);

                day.active = curr ? 'end' : 'start';

                // Toggle start/end if rangeTap is enabled
                if (!init && autoChange) {
                    if (dayChange) {
                        curr = curr ? 0 : 1;
                    }
                    setActiveTab();
                }

                if (inst.isVisible()) {
                    // Disable set button
                    if (inst._isValid) {
                        $('.mbsc-fr-btn-s .mbsc-fr-btn', inst._markup).removeClass(disabledClass);
                    } else {
                        $('.mbsc-fr-btn-s .mbsc-fr-btn', inst._markup).addClass(disabledClass);
                    }
                }

                dayChange = false;
                set = false;
                init = false;
            },
            onTabChange: function (ev) {
                if (ev.tab != 'calendar') {
                    inst.setDate(curr ? tempEndDate : tempStartDate, false, 1000, true);
                }
                validate(true, true);
            },
            onDestroy: function () {
                $(s.startInput).prop('readonly', readOnlyStart);
                $(s.endInput).prop('readonly', readOnlyEnd);
            }
        });

        return ret;
    };

})();
