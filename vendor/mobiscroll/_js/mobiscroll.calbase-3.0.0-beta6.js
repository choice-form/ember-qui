/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (window, document, undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        presets = ms.presets.scroller,
        util = ms.util,
        adjustedDate = util.datetime.adjustedDate,
        pr = util.jsPrefix,
        testTouch = util.testTouch,
        getCoord = util.getCoord,
        animEnd = 'webkitAnimationEnd animationend',
        defaults = {
            controls: ['calendar'],
            firstDay: 0,
            weekDays: 'short',
            maxMonthWidth: 170,
            months: 1,
            preMonths: 1,
            highlight: true,
            outerMonthChange: true,
            quickNav: true,
            yearChange: true,
            // CSS classes
            todayClass: 'mbsc-cal-today',
            btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left6',
            btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right6',
            // Localization
            dateText: 'Date',
            timeText: 'Time',
            calendarText: 'Calendar',
            todayText: 'Today',
            prevMonthText: 'Previous Month',
            nextMonthText: 'Next Month',
            prevYearText: 'Previous Year',
            nextYearText: 'Next Year'
        };

    presets.calbase = function (inst) {

        function onBtnStart(ev) {
            var proceed;

            monthBtn = $(this);

            monthChanged = false;

            if (ev.type != 'keydown') {
                //e.preventDefault();
                monthBtnX = getCoord(ev, 'X');
                monthBtnY = getCoord(ev, 'Y');
                proceed = testTouch(ev, this);
            } else {
                proceed = ev.keyCode === 32;
            }

            if (!monthChangeRunning && proceed && !monthBtn.hasClass('mbsc-fr-btn-d')) {
                monthChangeRunning = true;

                setTimeout(btnChange, 100);

                if (ev.type == 'mousedown') {
                    $(document)
                        .on('mousemove', onBtnMove)
                        .on('mouseup', onBtnEnd);
                }
            }
        }

        function onBtnMove(ev) {
            if (Math.abs(monthBtnX - getCoord(ev, 'X')) > 7 || Math.abs(monthBtnY - getCoord(ev, 'Y')) > 7) {
                monthChangeRunning = false;
                monthBtn.removeClass('mbsc-fr-btn-a');
            }
        }

        function onBtnEnd(ev) {
            if (ev.type == 'touchend') {
                // Prevents iOS scroll on double tap
                ev.preventDefault();
            }

            if (monthBtn && !monthChanged) {
                btnChange();
            }

            monthChangeRunning = false;

            if (ev.type == 'mouseup') {
                $(document)
                    .off('mousemove', onBtnMove)
                    .off('mouseup', onBtnEnd);
            }
        }

        function btnChange() {
            monthChanged = true;

            if (monthBtn.hasClass('mbsc-cal-prev-m')) {
                prevMonth();
            } else if (monthBtn.hasClass('mbsc-cal-next-m')) {
                nextMonth();
            } else if (monthBtn.hasClass('mbsc-cal-prev-y')) {
                prevYear(monthBtn);
            } else if (monthBtn.hasClass('mbsc-cal-next-y')) {
                nextYear(monthBtn);
            }
        }

        function isValid(d) {
            if (d < adjustedDate(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate())) {
                return false;
            }

            if (d > maxDateTime) {
                return false;
            }

            return invalidObj[d] === undefined || validObj[d] !== undefined;
        }

        function prepareObj(list, y, m) {
            var d, v, t, startTime,
                obj = {},
                n = preMonth + monthDiff;

            if (list) {
                $.each(list, function (i, ev) {
                    d = ev.d || ev.start || ev;
                    v = d + '';

                    if (ev.start && ev.end) {
                        startTime = new Date(ev.start);
                        while (startTime <= ev.end) {
                            t = adjustedDate(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
                            obj[t] = obj[t] || [];
                            obj[t].push(ev);
                            startTime.setDate(startTime.getDate() + 1);
                        }
                    } else if (d.getTime) { // Exact date
                        t = adjustedDate(d.getFullYear(), d.getMonth(), d.getDate());
                        obj[t] = obj[t] || [];
                        obj[t].push(ev);
                    } else if (!v.match(/w/i)) { // Day of month
                        v = v.split('/');
                        if (v[1]) {
                            if (m + n >= 11) {
                                t = s.getDate(y + 1, v[0] - 1, v[1]);
                                obj[t] = obj[t] || [];
                                obj[t].push(ev);
                            }
                            if (m - n <= 1) {
                                t = s.getDate(y - 1, v[0] - 1, v[1]);
                                obj[t] = obj[t] || [];
                                obj[t].push(ev);
                            }

                            t = s.getDate(y, v[0] - 1, v[1]);
                            obj[t] = obj[t] || [];
                            obj[t].push(ev);

                        } else {
                            for (j = 0; j < totalMonth; j++) {
                                t = s.getDate(y, m - preMonth - moveMonth + j, v[0]);
                                if (s.getDay(t) == v[0]) {
                                    obj[t] = obj[t] || [];
                                    obj[t].push(ev);
                                }
                            }

                        }
                    } else { // Day of week
                        var x = +v.replace('w', ''),
                            offset = 0,
                            w = s.getDate(y, m - preMonth - moveMonth, 1).getDay();

                        if (s.firstDay - w + 1 > 1) {
                            offset = 7;
                        }

                        for (j = 0; j < totalMonth * 5; j++) {
                            t = s.getDate(y, m - preMonth - moveMonth, j * 7 - offset - w + 1 + x);
                            obj[t] = obj[t] || [];
                            obj[t].push(ev);
                        }
                    }
                });
            }
            return obj;
        }

        function onGenMonth(y, m) {
            invalidObj = prepareObj(s.invalid, y, m);
            validObj = prepareObj(s.valid, y, m);
            inst.onGenMonth(y, m);
        }

        function genScrollCont(name, total, max, offset, suffix, labels, values) {
            var html = '<div class="mbsc-cal-h mbsc-cal-sc-c mbsc-cal-' + name + '-c ' + (s.calendarClass || '') + '"><div class="mbsc-cal-sc"><div class="mbsc-cal-sc-p"><div class="mbsc-cal-sc-tbl"><div class="mbsc-cal-sc-row">';

            for (i = 1; i <= total; i++) {
                if (i <= 12 || i > max) {
                    html += '<div class="mbsc-cal-sc-m-cell mbsc-cal-sc-cell mbsc-cal-sc-empty"><div class="mbsc-cal-sc-cell-i">&nbsp;</div></div>';
                } else {
                    html += '<div tabindex="0" role="button"' + (labels ? ' aria-label="' + labels[i - 13] + '"' : '') + ' class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-cal-sc-m-cell mbsc-cal-sc-cell mbsc-cal-' + name + '-s" data-val=' + (offset + i - 13) + '><div class="mbsc-cal-sc-cell-i mbsc-cal-sc-tbl"><div class="mbsc-cal-sc-cell">' + (values ? values[i - 13] : (offset + i - 13 + suffix)) + '</div></div></div>';
                }
                if (i < total) {
                    if (i % 12 === 0) {
                        html += '</div></div></div><div class="mbsc-cal-sc-p" style="' + (vertical ? 'top' : (isRTL ? 'right' : 'left')) + ':' + (Math.round(i / 12) * 100) + '%"><div class="mbsc-cal-sc-tbl"><div class="mbsc-cal-sc-row">';
                    } else if (i % 3 === 0) {
                        html += '</div><div class="mbsc-cal-sc-row">';
                    }
                }
            }
            html += '</div></div></div></div></div>';

            return html;
        }

        function genMonth(yr, mo) {
            var curr,
                cssClass,
                y,
                m,
                d,
                jm,
                jd,
                full,
                props,
                valid,
                selected,
                today,
                other,
                maxdays,
                i,
                j,
                k = 1,
                offset = 0,
                real = s.getDate(yr, mo, 1), // Get real year and month (if month < 0 or > 11)
                year = s.getYear(real),
                month = s.getMonth(real),
                sel = s.defaultValue === null && !inst._hasValue ? null : inst.getDate(true),
                w = s.getDate(year, month, 1).getDay(), // Get the weekday of the month
                html = '<div class="mbsc-cal-table">',
                weeknrs = '<div class="mbsc-cal-week-nr-c">';

            if (s.firstDay - w + 1 > 1) {
                offset = 7;
            }

            for (j = 0; j < 42; j++) {
                i = j + s.firstDay - offset;
                curr = s.getDate(year, month, i - w + 1);
                y = curr.getFullYear();
                m = curr.getMonth();
                d = curr.getDate();
                jm = s.getMonth(curr);
                jd = s.getDay(curr);
                maxdays = s.getMaxDayOfMonth(y, m);
                full = y + '-' + m + '-' + d;
                props = $.extend({
                    valid: isValid(curr),
                    selected: sel && sel.getFullYear() === y && sel.getMonth() === m && sel.getDate() === d
                }, inst.getDayProps(curr, sel));
                valid = props.valid;
                selected = props.selected;
                cssClass = props.cssClass;
                // Compare dates at noon, in some timezones 0:00 doesn't exists on daylight saving day
                today = new Date(curr).setHours(12, 0, 0, 0) === new Date().setHours(12, 0, 0, 0);
                other = jm !== month; // Day is from another month

                dayProps[full] = props;

                if (j % 7 === 0) {
                    html += (j ? '</div>' : '') + '<div class="mbsc-cal-row' + (s.highlight && sel && sel - curr >= 0 && sel - curr < 1000 * 60 * 60 * 24 * 7 ? ' mbsc-cal-week-hl' : '') + '">';
                }

                if (weeks && curr.getDay() == 1) {
                    // If displaying days from next month, reset month counter
                    if (weeks == 'month' && other && k > 1) {
                        k = d == 1 ? 1 : 2;
                    } else if (weeks == 'year') {
                        k = s.getWeekNumber(curr);
                    }
                    weeknrs += '<div class="mbsc-cal-week-nr"><div class="mbsc-cal-week-nr-i">' + k + '</div></div>';
                    k++;
                }

                html += '<div role="button" tabindex="-1"' +
                    // Aria attributes
                    ' aria-label="' + (today ? s.todayText + ', ' : '') + s.dayNames[curr.getDay()] + ', ' + s.monthNames[jm] + ' ' + jd + ' ' + (props.ariaLabel ? ', ' + props.ariaLabel : '') + '"' +
                    (other && !showdiff ? ' aria-hidden="true"' : '') +
                    (selected ? ' aria-selected="true"' : '') +
                    (valid ? '' : ' aria-disabled="true"') +
                    // Data attributes
                    ' data-day="' + (i % 7) + '"' +
                    ' data-full="' + full + '"' +
                    // Classes
                    'class="mbsc-cal-day ' +
                    (s.dayClass || '') +
                    (selected ? ' mbsc-cal-day-sel' : '') +
                    (today ? ' ' + s.todayClass : '') +
                    (cssClass ? ' ' + cssClass : '') +
                    (jd == 1 ? ' mbsc-cal-day-first' : '') +
                    (jd == maxdays ? ' mbsc-cal-day-last' : '') +
                    (other ? ' mbsc-cal-day-diff' : '') +
                    (valid ? ' mbsc-cal-day-v mbsc-fr-btn-e mbsc-fr-btn-nhl' : ' mbsc-cal-day-inv') + '"><div class="mbsc-cal-day-i ' +
                    (selected ? activeClass : '') + ' ' +
                    (s.innerDayClass || '') + '">' +
                    // Day date
                    '<div class="mbsc-cal-day-fg">' + jd  + '</div>' +
                    // Extra markup
                    (props.markup || '') +
                    '<div class="mbsc-cal-day-frame"></div></div></div>';
            }

            html += '</div></div>' + weeknrs + '</div>';

            return html;
        }

        function setTitle(year, month, time) {
            var d = s.getDate(year, month, 1),
                y = s.getYear(d),
                m = s.getMonth(d),
                yy = y + yearSuffix;

            // Highlight selected year and month
            if (quickNav) {
                if (yearSel) {
                    yearSel.removeClass('mbsc-cal-sc-sel').removeAttr('aria-selected').find('.mbsc-cal-sc-cell-i').removeClass(activeClass);
                }

                if (monthSel) {
                    monthSel.removeClass('mbsc-cal-sc-sel').removeAttr('aria-selected').find('.mbsc-cal-sc-cell-i').removeClass(activeClass);
                }

                yearSel = $('.mbsc-cal-year-s[data-val="' + y + '"]', ctx).addClass('mbsc-cal-sc-sel').attr('aria-selected', 'true');
                monthSel = $('.mbsc-cal-month-s[data-val="' + m + '"]', ctx).addClass('mbsc-cal-sc-sel').attr('aria-selected', 'true');

                yearSel.find('.mbsc-cal-sc-cell-i').addClass(activeClass);
                monthSel.find('.mbsc-cal-sc-cell-i').addClass(activeClass);

                if (yearScroll) {
                    // Scroll to selected year
                    yearScroll.scroll(yearSel, time);
                }

                // Disable unselectable months
                $('.mbsc-cal-month-s', ctx).removeClass('mbsc-fr-btn-d');

                if (y === minYear) {
                    for (i = 0; i < minMonth; i++) {
                        $('.mbsc-cal-month-s[data-val="' + i + '"]', ctx).addClass('mbsc-fr-btn-d');
                    }
                }

                if (y === maxYear) {
                    for (i = maxMonth + 1; i <= 12; i++) {
                        $('.mbsc-cal-month-s[data-val="' + i + '"]', ctx).addClass('mbsc-fr-btn-d');
                    }
                }
            }

            // Update year
            if (yearTitle.length == 1) {
                yearTitle.attr('aria-label', y).html(yy);
            }

            // Update month and year
            for (i = 0; i < monthNr; ++i) {
                d = s.getDate(year, month - moveMonth + i, 1);
                y = s.getYear(d);
                m = s.getMonth(d);
                yy = y + yearSuffix;

                $(monthTitle[i])
                    .attr('aria-label', s.monthNames[m] + (yearBtn ? '' : ' ' + y))
                    .html((!yearBtn && yearIndex < monthIndex ? yy + ' ' : '') + months[m] + (!yearBtn && yearIndex > monthIndex ? ' ' + yy : ''));

                if (yearTitle.length > 1) {
                    $(yearTitle[i]).html(yy);
                }
            }

            // Disable/enable prev/next buttons
            if (s.getDate(year, month - moveMonth - 1, 1) < minDate) {
                disableBtn($('.mbsc-cal-prev-m', ctx));
            } else {
                enableBtn($('.mbsc-cal-prev-m', ctx));
            }
            if (s.getDate(year, month + monthNr - moveMonth, 1) > maxDate) {
                disableBtn($('.mbsc-cal-next-m', ctx));
            } else {
                enableBtn($('.mbsc-cal-next-m', ctx));
            }
            if (s.getDate(year, month, 1).getFullYear() <= minDate.getFullYear()) {
                disableBtn($('.mbsc-cal-prev-y', ctx));
            } else {
                enableBtn($('.mbsc-cal-prev-y', ctx));
            }
            if (s.getDate(year, month, 1).getFullYear() >= maxDate.getFullYear()) {
                disableBtn($('.mbsc-cal-next-y', ctx));
            } else {
                enableBtn($('.mbsc-cal-next-y', ctx));
            }
        }

        function enableBtn(btn) {
            btn.removeClass(disabled).find('.mbsc-cal-btn-txt').removeAttr('aria-disabled');
        }

        function disableBtn(btn) {
            btn.addClass(disabled).find('.mbsc-cal-btn-txt').attr('aria-disabled', 'true');
        }

        function highlightDate(d) {
            inst.trigger('onDayHighlight', {
                date: d
            });
            if (s.highlight) {
                $('.mbsc-cal-day-sel .mbsc-cal-day-i', anim).removeClass(activeClass);
                $('.mbsc-cal-day-sel', anim).removeClass('mbsc-cal-day-sel').removeAttr('aria-selected');
                $('.mbsc-cal-week-hl', anim).removeClass('mbsc-cal-week-hl');

                if (s.defaultValue !== null || inst._hasValue) {
                    $('.mbsc-cal-day[data-full="' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '"]', anim)
                        .addClass('mbsc-cal-day-sel').attr('aria-selected', 'true')
                        .find('.mbsc-cal-day-i').addClass(activeClass)
                        .closest('.mbsc-cal-row').addClass('mbsc-cal-week-hl');
                }
            }
        }

        function setDate(d, nav) {
            if (hasCal && (visibleTab === 'calendar' || nav)) {
                var dir,
                    load,
                    curr = s.getDate(currYear, currMonth, 1),
                    diff = Math.abs((s.getYear(d) - s.getYear(curr)) * 12 + s.getMonth(d) - s.getMonth(curr));

                if (inst.needsSlide && diff) {
                    currYear = s.getYear(d);
                    currMonth = s.getMonth(d);
                    if (d > curr) {
                        load = diff > preMonth - moveMonth + monthNr - 1;
                        currMonth -= load ? 0 : diff - preMonth;
                        dir = 'next';
                    } else if (d < curr) {
                        load = diff > preMonth + moveMonth;
                        currMonth += load ? 0 : diff - preMonth;
                        dir = 'prev';
                    }
                    changeMonth(currYear, currMonth, dir, Math.min(diff, preMonth), load, true);
                }
                if (!nav) {
                    prevDate = d;
                    highlightDate(d);
                }
                inst.needsSlide = true;
            }
        }

        function preload(y, m, render) {
            if (!render) {
                inst.trigger('onMonthLoading', {
                    year: y,
                    month: m
                });
            }

            onGenMonth(y, m);

            for (i = 0; i < totalMonth; i++) {
                slidesArray[i].html(genMonth(y, m - moveMonth - preMonth + i));
            }

            activateMonth();

            needsRefresh = undefined;

            inst.trigger('onMonthLoaded', {
                year: y,
                month: m
            });
        }

        function refreshScrollView(y, m, recalc) {
            var plus = preMonth,
                minus = preMonth;

            if (recalc) {
                while (minus && s.getDate(y, m + plus + monthNr - moveMonth - 1, 1) > maxDate) {
                    minus--;
                }

                while (plus && s.getDate(y, m - minus - moveMonth, 1) < minDate) {
                    plus--;
                }
            }

            $.extend(mainScroll.settings, {
                contSize: monthNr * animw,
                snap: animw,
                minScroll: animPos - (isRTL ? plus : minus) * animw,
                maxScroll: animPos + (isRTL ? minus : plus) * animw
            });

            mainScroll.refresh();
        }

        function activateMonth() {
            if (weeks) {
                weeknr.html($('.mbsc-cal-week-nr-c', slidesArray[preMonth]).html());
            }
            $('.mbsc-cal-slide-a .mbsc-cal-day', animc).attr('tabindex', 0);
        }

        function changeMonth(y, m, dir, slideNr, load, active, callback) {
            // If called with any parameter, push into queue
            if (y) {
                queue.push({
                    y: y,
                    m: m,
                    dir: dir,
                    slideNr: slideNr,
                    load: load,
                    active: active,
                    callback: callback
                });
            }

            // Delay change if currently in transition
            if (trans) {
                return;
            }

            // Load params from queue
            var params = queue.shift(),
                d;

            y = params.y;
            m = params.m;
            dir = params.dir === 'next';
            slideNr = params.slideNr;
            load = params.load;
            active = params.active;
            callback = params.callback || empty;
            d = s.getDate(y, m, 1);
            y = s.getYear(d);
            m = s.getMonth(d);
            trans = true;

            inst.changing = true;
            inst.trigger('onMonthChange', {
                year: y,
                month: m
            });
            inst.trigger('onMonthLoading', {
                year: y,
                month: m
            });

            onGenMonth(y, m);

            if (load) {
                for (i = 0; i < monthNr; i++) {
                    slidesArray[dir ? totalMonth - monthNr + i : i].html(genMonth(y, m - moveMonth + i));
                }
            }

            // Remove opacity from month during transition (if changed by button)
            if (active) {
                slides.addClass('mbsc-cal-slide-a');
            }

            setTimeout(function () {

                inst.ariaMessage(s.monthNames[m] + ' ' + y);

                setTitle(y, m, 200);

                animPos = dir ? animPos - animw * slideNr * rtl : animPos + animw * slideNr * rtl;

                mainScroll.scroll(animPos, active ? 200 : 0, false, function () {
                    var tempArray;

                    if (slidesArray.length) {
                        slides.removeClass('mbsc-cal-slide-a').attr('aria-hidden', 'true');

                        // Reorder the slides array
                        if (dir) {
                            tempArray = slidesArray.splice(0, slideNr);
                            for (i = 0; i < slideNr; i++) {
                                slidesArray.push(tempArray[i]);
                                change(slidesArray[slidesArray.length - 1], +slidesArray[slidesArray.length - 2].attr('data-curr') + 100 * rtl);
                            }
                        } else {
                            tempArray = slidesArray.splice(totalMonth - slideNr, slideNr);
                            for (i = slideNr - 1; i >= 0; i--) {
                                slidesArray.unshift(tempArray[i]);
                                change(slidesArray[0], +slidesArray[1].attr('data-curr') - 100 * rtl);
                            }
                        }

                        // Generate new months
                        for (i = 0; i < slideNr; i++) {
                            slidesArray[dir ? totalMonth - slideNr + i : i].html(genMonth(y, m - moveMonth - preMonth + i + (dir ? totalMonth - slideNr : 0)));
                            if (load) {
                                slidesArray[dir ? i : totalMonth - slideNr + i].html(genMonth(y, m - moveMonth - preMonth + i + (dir ? 0 : totalMonth - slideNr)));
                            }
                        }

                        for (i = 0; i < monthNr; i++) {
                            slidesArray[preMonth + i].addClass('mbsc-cal-slide-a').removeAttr('aria-hidden');
                        }

                        refreshScrollView(y, m, true);

                        trans = false;
                    }

                    if (queue.length) {
                        setTimeout(function () {
                            changeMonth();
                        }, 10);
                    } else {
                        currYear = y;
                        currMonth = m;

                        inst.changing = false;

                        $('.mbsc-cal-day', animc).attr('tabindex', -1);

                        activateMonth();

                        if (needsRefresh !== undefined) {
                            preload(y, m, needsRefresh);
                        } else {
                            inst.trigger('onMonthLoaded', {
                                year: y,
                                month: m
                            });
                        }

                        callback();
                    }
                });
            }, 10);
        }

        function selectDay() {
            var cell = $(this),
                fill = inst.live,
                curr = inst.getDate(true),
                full = cell.attr('data-full'),
                parts = full.split('-'),
                d = adjustedDate(parts[0], parts[1], parts[2]),
                dtime = adjustedDate(d.getFullYear(), d.getMonth(), d.getDate(), curr.getHours(), curr.getMinutes(), curr.getSeconds()),
                selected = cell.hasClass('mbsc-cal-day-sel');

            if (!showdiff && cell.hasClass('mbsc-cal-day-diff')) {
                return;
            }

            // Call onDayChange event
            if (inst.trigger('onDayChange', $.extend(dayProps[full], {
                    date: dtime,
                    target: this,
                    selected: selected
                })) !== false) {
                // Prevents month slide in setDate
                inst.needsSlide = false;

                // Set date on scroller
                dayClick = true;
                inst.setDate(dtime, fill, 0.2, !fill, true);

                // Slide one month left or right
                if (s.outerMonthChange) {
                    monthChangeRunning = true;
                    if (d < s.getDate(currYear, currMonth - moveMonth, 1)) { // Prev month
                        prevMonth();
                    } else if (d > s.getDate(currYear, currMonth - moveMonth + monthNr, 0)) { // Next month
                        nextMonth();
                    }
                    monthChangeRunning = false;
                }

                if (inst.live) {
                    inst.trigger('onSet', {
                        valueText: inst._value
                    });
                }
            }
        }

        function change(el, curr) {
            el.attr('data-curr', curr);
            el[0].style[pr + 'Transform'] = 'translate3d(' + (vertical ? '0,' + curr + '%,' : curr + '%,' + '0,') + '0)'; //'translate3d(' + curr + '%,0,0)';

        }

        function refresh(render) {
            if (inst.isVisible() && hasCal) {
                // Postpone refresh if currently changing month
                if (!inst.changing) {
                    preload(currYear, currMonth, render);
                } else {
                    needsRefresh = render;
                }
            }
        }

        function nextMonth() {
            if (monthChangeRunning && s.getDate(currYear, currMonth + monthNr - moveMonth, 1) <= maxDate  ) {
                changeMonth(currYear, ++currMonth, 'next', 1, false, true, nextMonth);
            }
        }

        function prevMonth() {
            if (monthChangeRunning && s.getDate(currYear, currMonth - moveMonth - 1, 1) >= minDate  ) {
                changeMonth(currYear, --currMonth, 'prev', 1, false, true, prevMonth);
            }
        }

        function nextYear(btn) {
            if (monthChangeRunning && s.getDate(currYear, currMonth, 1) <= s.getDate(s.getYear(maxDate) - 1, s.getMonth(maxDate) - monthDiff, 1)  ) {
                changeMonth(++currYear, currMonth, 'next', preMonth, true, true, function () {
                    nextYear(btn);
                });
            } else if (monthChangeRunning && !btn.hasClass('mbsc-fr-btn-d')  ) {
                changeMonth(s.getYear(maxDate), s.getMonth(maxDate) - monthDiff, 'next', preMonth, true, true);
            }
        }

        function prevYear(btn) {
            if (monthChangeRunning && s.getDate(currYear, currMonth, 1) >= s.getDate(s.getYear(minDate) + 1, s.getMonth(minDate) + moveMonth, 1)  ) {
                changeMonth(--currYear, currMonth, 'prev', preMonth, true, true, function () {
                    prevYear(btn);
                });
            } else if (monthChangeRunning && !btn.hasClass('mbsc-fr-btn-d')  ) {
                changeMonth(s.getYear(minDate), s.getMonth(minDate) + moveMonth, 'prev', preMonth, true, true);
            }
        }

        function showCont(cont, prevAnim) {
            if (!cont.hasClass('mbsc-cal-v')) {
                //trans = true;
                cont.addClass('mbsc-cal-v' + (prevAnim ? '' : ' mbsc-cal-p-in')).removeClass('mbsc-cal-p-out mbsc-cal-h');
                //setTimeout(function () { trans = false; }, 500);
                inst.trigger('onSelectShow');
            }
        }

        function hideCont(cont, prevAnim) {
            if (cont.hasClass('mbsc-cal-v')) {
                //trans = true;
                cont.removeClass('mbsc-cal-v mbsc-cal-p-in').addClass('mbsc-cal-h' + (prevAnim ? '' : ' mbsc-cal-p-out'));
                //setTimeout(function () { trans = false; }, 500);
            }
        }

        function toggleCont(cont, ctrl) {
            if ((ctrl || cont).hasClass('mbsc-cal-v')) {
                hideCont(cont);
            } else {
                showCont(cont);
            }
        }

        function clearCont() {
            $(this).removeClass('mbsc-cal-p-out mbsc-cal-p-in');
        }

        function getWidth(el) {
            return el[0].innerWidth || el.innerWidth();
        }

        var d,
            i,
            j,
            ret,
            cont,
            ctx,
            context,
            anim,
            animc,
            animw,
            animPos,
            dayClick,
            hasCal,
            html,
            initTabs,
            weeknr,
            monthCont,
            monthContVisible,
            months,
            mainScroll,
            monthScroll,
            monthTitle,
            monthIndex,
            yearTitle,
            yearIndex,
            minYear,
            maxYear,
            minMonth,
            maxMonth,
            minDate,
            maxDate,
            minDateTime,
            maxDateTime,
            prevDate,
            currYear,
            currMonth,
            scrollOpt,
            scrollPageNr,
            validObj,
            invalidObj,
            panels,
            visibleTab,
            trans,
            monthBtnX,
            monthBtnY,
            monthBtn,
            monthChanged,
            monthChangeRunning,
            monthNr,
            totalMonth,
            monthDiff,
            moveMonth,
            needsRefresh,
            showdiff,
            yearPages,
            yearScroll,
            yearSel,
            monthSel,
            that = this,
            slides = [],
            slidesArray = [],
            queue = [],
            controls = {},
            dayProps = {},
            empty = function () {},
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            weekDays = s.weekDays == 'full' ? '' : (s.weekDays == 'min' ? 'Min' : 'Short'),
            weeks = s.weekCounter,
            layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
            isLiquid = layout == 'liquid' && s.display !== 'bubble',
            isModal = s.display == 'center',
            isRTL = s.rtl,
            rtl = isRTL ? -1 : 1, // Change month slide direction if RTL
            calWidth = isLiquid ? null : s.calendarWidth,
            vertical = s.calendarScroll == 'vertical',
            quickNav = s.quickNav,
            preMonth = s.preMonths,
            yearBtn = s.yearChange,
            ctrls = s.controls.join(','),
            showTabs = (s.tabs === true || (s.tabs !== false && isLiquid)) && s.controls.length > 1,
            checkTabs = (!showTabs && s.tabs === undefined && !isLiquid && s.controls.length > 1),
            yearSuffix = s.yearSuffix || '',
            activeClass = s.activeClass || '',
            activeTabClass = 'mbsc-cal-tab-sel ' + (s.activeTabClass || ''),
            activeTabInnerClass = s.activeTabInnerClass || '',
            disabled = 'mbsc-fr-btn-d ' + (s.disabledClass || ''),
            monthScrollCont = '',
            yearScrollCont = '';

        if (ctrls.match(/calendar/)) {
            hasCal = true;
        } else {
            quickNav = false;
        }

        if (ctrls.match(/date/)) {
            controls.date = 1;
        }

        if (ctrls.match(/time/)) {
            controls.time = 1;
        }

        if (hasCal && controls.date) {
            showTabs = true;
            checkTabs = false;
        }

        s.layout = layout; // Pass back to core if set to liquid
        s.preset = (controls.date || hasCal ? 'date' : '') + (controls.time ? 'time' : '');

        // Call position on pageshow
        if (s.display == 'inline') {
            $(this).closest('[data-role="page"]').on('pageshow', function () {
                inst.position();
            });
        }

        // Extended methods
        // ---

        inst.changing = false;

        inst.needsSlide = true;

        inst.getDayProps = empty;

        inst.onGenMonth = empty;

        inst.prepareObj = prepareObj;

        inst.refresh = function () {
            refresh(false);
        };

        inst.redraw = function () {
            refresh(true);
        };

        inst.navigate = function (d, anim) {
            var y,
                m,
                visible = inst.isVisible();

            if (anim && visible) {
                setDate(d, true);
            } else {
                y = s.getYear(d);
                m = s.getMonth(d);

                if (visible && (y != currYear || m != currMonth)) {
                    inst.trigger('onMonthChange', {
                        year: y,
                        month: m
                    });
                    setTitle(y, m);
                    preload(y, m);
                    refreshScrollView(d.getFullYear(), d.getMonth(), true);
                }

                currYear = y;
                currMonth = m;
            }
        };

        inst.showMonthView = function () {
            if (quickNav && !monthContVisible) {
                hideCont(yearScrollCont, true);
                hideCont(monthScrollCont, true);
                showCont(monthCont, true);
                monthContVisible = true;
            }
        };

        inst.changeTab = function (tab) {
            if (!inst._isVisible || !controls[tab] || visibleTab == tab) {
                return;
            }

            visibleTab = tab;

            $('.mbsc-cal-pnl', ctx)
                .removeClass('mbsc-cal-p-in')
                .addClass('mbsc-cal-pnl-h');

            $('.mbsc-cal-tab', ctx)
                .removeClass(activeTabClass)
                .removeAttr('aria-selected')
                .find('.mbsc-cal-tab-i')
                .removeClass(activeTabInnerClass);

            $('.mbsc-cal-tab[data-control="' + tab + '"]', ctx)
                .addClass(activeTabClass)
                .attr('aria-selected', 'true')
                .find('.mbsc-cal-tab-i')
                .addClass(activeTabInnerClass);

            controls[visibleTab]
                .removeClass('mbsc-cal-pnl-h')
                .addClass('mbsc-cal-p-in');

            if (visibleTab == 'calendar') {
                d = inst.getDate(true);
                // Set the date of the calendar if date changed from the scroller
                if (d.getFullYear() !== prevDate.getFullYear() || d.getMonth() !== prevDate.getMonth() || d.getDate() !== prevDate.getDate()) {
                    setDate(d);
                }
            } // else {
            //inst.setDate(inst.getDate(true), false, 0, true);
            //}

            // Hide
            inst.showMonthView();

            inst.trigger('onTabChange', {
                tab: visibleTab
            });
        };

        // ---

        ret = presets.datetime.call(this, inst);

        monthIndex = s.dateFormat.search(/m/i);
        yearIndex = s.dateFormat.search(/y/i);

        $.extend(ret, {
            ariaMessage: s.calendarText,
            onMarkupReady: function (ev) {
                var tabs,
                    monthBtns,
                    yearBtns = '';

                ctx = $(ev.target);

                context = s.display == 'inline' ? ($(this).is('div') ? $(this) : $(this).parent()) : inst._window;

                prevDate = inst.getDate(true);

                if (!currYear) {
                    currYear = s.getYear(prevDate);
                    currMonth = s.getMonth(prevDate);
                }

                animPos = 0;

                initTabs = true;

                // Reset transition if previously closed during transition
                trans = false;

                months = s.monthNames;

                visibleTab = 'calendar';

                if (s.min) {
                    minDate = adjustedDate(s.min.getFullYear(), s.min.getMonth(), 1);
                    minDateTime = s.min;
                } else {
                    minDate = adjustedDate(s.startYear, 0, 1);
                    minDateTime = minDate;
                }

                if (s.max) {
                    maxDate = adjustedDate(s.max.getFullYear(), s.max.getMonth(), 1);
                    maxDateTime = s.max;
                } else {
                    maxDate = adjustedDate(s.endYear, 11, 31, 23, 59, 59);
                    maxDateTime = maxDate;
                }

                ctx.addClass('mbsc-calendar');

                cont = $('.mbsc-fr-popup', ctx);
                panels = $('.mbsc-fr-c', ctx);

                if (controls.date) {
                    controls.date = $('.mbsc-sc-whl-gr-c', ctx).eq(0);
                } else if (hasCal) {
                    $('.mbsc-sc-whl-gr-c', ctx).eq(0).addClass('mbsc-cal-hdn');
                }

                if (controls.time) {
                    controls.time = $('.mbsc-sc-whl-gr-c', ctx).eq(1);
                }

                // Generate calendar markup
                if (hasCal) {
                    // Calculate monthNr
                    monthNr = s.months == 'auto' ? // Exact month number from setting
                        Math.max(1, // Min 1 month
                            Math.min(3, // Max 3 months
                                Math.floor((calWidth || getWidth(context)) / 280))) : s.months;

                    totalMonth = monthNr + 2 * preMonth;
                    monthDiff = Math.floor(monthNr / 2);
                    moveMonth = Math.round(monthNr / 2) - 1;
                    showdiff = s.showOuterDays === undefined ? monthNr < 2 : s.showOuterDays;
                    vertical = vertical && monthNr < 2; // Don't allow vertical scroll with multiple months

                    // Generate month buttons
                    monthBtns = '<div class="mbsc-cal-btnw"><div class="' + (isRTL ? 'mbsc-cal-next-m' : 'mbsc-cal-prev-m') + ' mbsc-cal-prev mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (s.btnCalPrevClass || '') + '"' + ' aria-label="' + s.prevMonthText + '"></div></div>';
                    for (i = 0; i < monthNr; ++i) {
                        monthBtns += '<div class="mbsc-cal-btnw-m" style="width: ' + 100 / monthNr + '%"><span role="button" class="mbsc-cal-month"></span></div>';
                    }
                    monthBtns += '<div class="' + (isRTL ? 'mbsc-cal-prev-m' : 'mbsc-cal-next-m') + ' mbsc-cal-next mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (s.btnCalNextClass || '') + '"' + ' aria-label="' + s.nextMonthText + '"></div></div></div>';

                    // Generate year buttons
                    if (yearBtn) {
                        yearBtns = '<div class="mbsc-cal-btnw"><div class="' + (isRTL ? 'mbsc-cal-next-y' : 'mbsc-cal-prev-y') + ' mbsc-cal-prev mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (s.btnCalPrevClass || '') + '"' + ' aria-label="' + s.prevYearText + '"></div></div>' +
                            '<span role="button" class="mbsc-cal-year"></span>' +
                            '<div class="' + (isRTL ? 'mbsc-cal-prev-y' : 'mbsc-cal-next-y') + ' mbsc-cal-next mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"><div role="button" tabindex="0" class="mbsc-cal-btn-txt ' + (s.btnCalNextClass || '') + '"' + ' aria-label="' + s.nextYearText + '"></div></div></div>';
                    }

                    // Generate month scrollview
                    if (quickNav) {
                        // Generate year and month scrollview
                        minYear = s.getYear(minDate);
                        maxYear = s.getYear(maxDate);
                        minMonth = s.getMonth(minDate);
                        maxMonth = s.getMonth(maxDate);
                        scrollPageNr = Math.ceil((maxYear - minYear + 1) / 12) + 2;

                        monthScrollCont = genScrollCont('month', 36, 24, 0, '', s.monthNames, s.monthNamesShort);
                        yearScrollCont = genScrollCont('year', scrollPageNr * 12, maxYear - minYear + 13, minYear, yearSuffix);
                    }

                    // Generate calendar header
                    html = '<div class="mbsc-w-p mbsc-cal-c"><div class="mbsc-cal mbsc-cal-hl-now' +
                        (monthNr > 1 ? ' mbsc-cal-multi ' : '') +
                        (weeks ? ' mbsc-cal-weeks ' : '') +
                        (vertical ? ' mbsc-cal-vertical' : '') +
                        (showdiff ? '' : ' mbsc-cal-hide-diff ') +
                        (s.calendarClass || '') + '">' +
                        '<div class="mbsc-cal-header"><div class="mbsc-cal-btnc ' + (yearBtn ? 'mbsc-cal-btnc-ym' : 'mbsc-cal-btnc-m') + '">' +
                        ((yearIndex < monthIndex || monthNr > 1) ? yearBtns + monthBtns : monthBtns + yearBtns) +
                        '</div></div><div class="mbsc-cal-body"><div class="mbsc-cal-m-c mbsc-cal-v"><div class="mbsc-cal-days-c">';

                    for (j = 0; j < monthNr; ++j) {
                        // Generate week days
                        html += '<div aria-hidden="true" class="mbsc-cal-days" style="width: ' + 100 / monthNr + '%"><table cellpadding="0" cellspacing="0"><tr>';
                        for (i = 0; i < 7; i++) {
                            html += '<th>' + s['dayNames' + weekDays][(i + s.firstDay) % 7] + '</th>';
                        }
                        html += '</tr></table></div>';
                    }

                    html += '</div>' +
                        '<div class="mbsc-cal-week-nrs-c ' + (s.weekNrClass || '') + '">' +
                        '<div class="mbsc-cal-week-nrs"></div>' +
                        '</div>' +
                        '<div class="mbsc-cal-anim-c ' + (s.calendarClass || '') + '">' +
                        '<div class="mbsc-cal-anim">';

                    for (i = 0; i < monthNr + 2 * preMonth; i++) {
                        html += '<div class="mbsc-cal-slide" aria-hidden="true"></div>';
                    }

                    html += '</div></div></div>' + monthScrollCont + yearScrollCont + '</div></div></div>';

                    controls.calendar = $(html);
                }

                // Insert controls in the required order
                $.each(s.controls, function (i, v) {
                    controls[v] = $('<div class="mbsc-cal-pnl" id="' + (that.id + '_dw_pnl_' + i) + '"></div>')
                        .append($('<div class="mbsc-cal-pnl-i"></div>').append(controls[v]))
                        .appendTo(panels);
                });

                // Generate tabs
                tabs = '<div class="mbsc-cal-tabs"><ul role="tablist">';

                $.each(s.controls, function (i, v) {
                    if (controls[v]) {
                        tabs += '<li role="tab" aria-controls="' + (that.id + '_dw_pnl_' + i) + '" class="mbsc-cal-tab ' + (i ? '' : activeTabClass) + '" data-control="' + v + '"><a href="#" class="mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-cal-tab-i ' + (!i ? activeTabInnerClass : '') + '">' + s[v + 'Text'] + '</a></li>';
                    }
                });
                tabs += '</ul></div>';

                panels.before(tabs);

                // Init slide animation containers
                anim = $('.mbsc-cal-anim-c', ctx);
                animc = $('.mbsc-cal-anim', anim);
                weeknr = $('.mbsc-cal-week-nrs', ctx);

                if (hasCal) {
                    monthContVisible = true;
                    slides = $('.mbsc-cal-slide', animc).each(function (i, v) {
                        slidesArray.push($(v));
                    });
                    slides.slice(preMonth, preMonth + monthNr).addClass('mbsc-cal-slide-a').removeAttr('aria-hidden');

                    for (i = 0; i < totalMonth; i++) {
                        change(slidesArray[i], 100 * (i - preMonth) * rtl);
                    }

                    preload(currYear, currMonth);

                    // Change month on swipe
                    mainScroll = new ms.classes.ScrollView(anim[0], {
                        axis: vertical ? 'Y' : 'X',
                        easing: '',
                        contSize: 0,
                        snap: 1,
                        maxSnapScroll: preMonth,
                        moveElement: animc,
                        mousewheel: s.mousewheel,
                        time: 200,
                        lock: true,
                        stopProp: false,
                        // onGestureStart: function (ev, that) {
                        //     that.settings.scrollLock = inst.scrollLock;
                        // },
                        onAnimationEnd: function (ev) {
                            var slideNr = Math.round(((vertical ? ev.posY : ev.posX) - animPos) / animw) * rtl;

                            if (slideNr) {
                                changeMonth(currYear, currMonth - slideNr, slideNr > 0 ? 'prev' : 'next', slideNr > 0 ? slideNr : -slideNr);
                            }
                        }
                    });
                }

                // Cache selectors
                monthTitle = $('.mbsc-cal-month', ctx);
                yearTitle = $('.mbsc-cal-year', ctx);

                monthCont = $('.mbsc-cal-m-c', ctx);

                if (quickNav) {
                    monthCont.on(animEnd, clearCont);
                    monthScrollCont = $('.mbsc-cal-month-c', ctx).on(animEnd, clearCont);
                    yearScrollCont = $('.mbsc-cal-year-c', ctx).on(animEnd, clearCont);
                    yearPages = $('.mbsc-cal-sc-p', ctx);

                    scrollOpt = {
                        axis: vertical ? 'Y' : 'X',
                        contSize: 0,
                        snap: 1,
                        maxSnapScroll: 1,
                        rtl: s.rtl,
                        mousewheel: s.mousewheel,
                        time: 200
                    };

                    yearScroll = new ms.classes.ScrollView(yearScrollCont[0], scrollOpt);
                    monthScroll = new ms.classes.ScrollView(monthScrollCont[0], scrollOpt);
                }

                // Init calendar width
                if (isLiquid) {
                    ctx.addClass('mbsc-cal-liq');
                } else {
                    $('.mbsc-cal', ctx).width(calWidth || 280 * monthNr);
                }

                // Init calendar height
                if (s.calendarHeight) {
                    $('.mbsc-cal-anim-c', ctx).height(s.calendarHeight);
                }

                // Attach events
                // ---

                // Init day tap/click
                inst.tap(anim, function (e) {
                    var day = $(e.target);
                    if (!trans && !mainScroll.scrolled && s.readonly !== true) {
                        day = day.closest('.mbsc-cal-day', this);
                        if (day.hasClass('mbsc-cal-day-v')) {
                            selectDay.call(day[0]);
                        }
                    }
                });

                // Init prev/next month and year tap/click
                $('.mbsc-cal-btn', ctx)
                    .on('touchstart mousedown keydown', onBtnStart)
                    .on('touchmove', onBtnMove)
                    .on('touchend touchcancel keyup', onBtnEnd);

                // Init Tabs
                $('.mbsc-cal-tab', ctx).on('touchstart click', function (e) {
                    if (testTouch(e, this)  ) {
                        inst.changeTab($(this).attr('data-control'));
                    }
                });

                // Init month / year selector
                if (quickNav) {

                    inst.tap($('.mbsc-cal-month', ctx), function () {
                        if (!yearScrollCont.hasClass('mbsc-cal-v')) {
                            toggleCont(monthCont);
                            monthContVisible = monthCont.hasClass('mbsc-cal-v');
                        }
                        toggleCont(monthScrollCont);
                        hideCont(yearScrollCont);
                    });

                    inst.tap($('.mbsc-cal-year', ctx), function () {
                        if (!yearScrollCont.hasClass('mbsc-cal-v')) {
                            // Scroll to selected year
                            yearScroll.scroll(yearSel);
                        }
                        if (!monthScrollCont.hasClass('mbsc-cal-v')) {
                            toggleCont(monthCont);
                            monthContVisible = monthCont.hasClass('mbsc-cal-v');
                        }
                        toggleCont(yearScrollCont);
                        hideCont(monthScrollCont);
                    });

                    inst.tap($('.mbsc-cal-month-s', ctx), function () {
                        if (!monthScroll.scrolled && !$(this).hasClass('mbsc-fr-btn-d')) {
                            inst.navigate(s.getDate(currYear, $(this).attr('data-val'), 1));
                        }
                    });

                    inst.tap($('.mbsc-cal-year-s', ctx), function () {
                        if (!yearScroll.scrolled) {
                            d = s.getDate($(this).attr('data-val'), currMonth, 1);
                            inst.navigate(new Date(util.constrain(d, minDate, maxDate)));
                        }
                    });

                    inst.tap(yearScrollCont, function () {
                        if (!yearScroll.scrolled) {
                            hideCont(yearScrollCont);
                            showCont(monthCont);
                            monthContVisible = true;
                        }
                    });

                    inst.tap(monthScrollCont, function () {
                        if (!monthScroll.scrolled) {
                            hideCont(monthScrollCont);
                            showCont(monthCont);
                            monthContVisible = true;
                        }
                    });
                }

                // ---
            },
            onShow: function () {
                if (hasCal) {
                    setTitle(currYear, currMonth);
                }
            },
            onPosition: function (ev) {
                var w,
                    hasTabs,
                    nr,
                    mh,
                    oldw,
                    scrollw,
                    maxw = 0,
                    maxh = 0,
                    totalw = 0,
                    wh = ev.windowHeight;

                // If liquid mode, reset heigths
                if (isLiquid) {
                    if (isModal) {
                        anim.height('');
                    }
                    panels.height('');
                    animc.width('');
                }

                if (animw) {
                    oldw = animw;
                }

                if (hasCal) {
                    animw = Math.round(Math.round(anim[0][vertical ? 'offsetHeight' : 'offsetWidth']) / monthNr);
                }

                if (animw) {
                    // Determine font size
                    ctx.removeClass('mbsc-cal-m mbsc-cal-l');

                    if (animw > 1024) {
                        ctx.addClass('mbsc-cal-l');
                    } else if (animw > 640) {
                        ctx.addClass('mbsc-cal-m');
                    }
                }

                // Check if tabs needed, and search for max width and height
                if ((showTabs && (initTabs || isLiquid)) || checkTabs) {
                    $('.mbsc-cal-pnl', ctx).removeClass('mbsc-cal-pnl-h');

                    $.each(controls, function (i, v) {
                        w = v[0].offsetWidth;
                        maxw = Math.max(maxw, w);
                        maxh = Math.max(maxh, v[0].offsetHeight);
                        totalw += w;
                    });

                    if (showTabs || (checkTabs && totalw > getWidth(context))) {
                        hasTabs = true;
                        visibleTab = $('.mbsc-cal-tabs .mbsc-cal-tab-sel', ctx).attr('data-control');
                        cont.addClass('mbsc-cal-tabbed');
                    } else {
                        visibleTab = 'calendar';
                        maxw = '';
                        maxh = '';
                        cont.removeClass('mbsc-cal-tabbed');
                        panels.css({
                            width: '',
                            height: ''
                        });
                    }
                }

                // Full height calendar
                if (isLiquid && isModal && hasCal) {

                    inst._isFullScreen = true;

                    if (hasTabs) {
                        panels.height(controls.calendar[0].offsetHeight);
                    }

                    mh = cont[0].offsetHeight;

                    // Don't set fixed height if calendar height is bigger than viewport height
                    if (wh >= mh) {
                        anim.height(wh - mh + anim[0].offsetHeight);
                    }

                    maxh = Math.max(maxh, controls.calendar[0].offsetHeight);
                }

                // Set tab panel container width and height
                if (hasTabs) {
                    panels.css({
                        width: isLiquid ? '' : maxw,
                        height: maxh
                    });
                    if (hasCal) {
                        // Width might have changed
                        animw = Math.round(Math.round(anim[0][vertical ? 'offsetHeight' : 'offsetWidth']) / monthNr);
                    }
                }

                // Do things only if calendar is visible (we have a width)
                if (animw) {

                    animc[vertical ? 'height' : 'width'](animw);

                    if (animw !== oldw) {
                        // Short or long month names
                        if (yearBtn) {
                            months = s.maxMonthWidth > $('.mbsc-cal-btnw-m', ctx).width() ? s.monthNamesShort : s.monthNames;
                            for (i = 0; i < monthNr; ++i) {
                                $(monthTitle[i]).text(months[s.getMonth(s.getDate(currYear, currMonth - moveMonth + i, 1))]);
                            }
                        }

                        if (quickNav) {

                            scrollw = yearScrollCont[0][vertical ? 'offsetHeight' : 'offsetWidth'];

                            $.extend(yearScroll.settings, {
                                contSize: scrollw,
                                snap: scrollw,
                                minScroll: (2 - scrollPageNr) * scrollw,
                                maxScroll: -scrollw
                            });

                            $.extend(monthScroll.settings, {
                                contSize: scrollw,
                                snap: scrollw,
                                minScroll: -scrollw,
                                maxScroll: -scrollw
                            });

                            yearScroll.refresh();
                            monthScroll.refresh();

                            if (yearScrollCont.hasClass('mbsc-cal-v')) {
                                // Scroll to selected year (only if year selector is visible)
                                yearScroll.scroll(yearSel);
                            }
                        }

                        // Recalcultae slide position
                        if (isLiquid && !initTabs && oldw) {
                            nr = animPos / oldw;
                            animPos = nr * animw;
                        }

                        refreshScrollView(currYear, currMonth, !oldw);
                    }
                } else {
                    animw = oldw;
                }

                // Show only current tab
                if (hasTabs) {
                    $('.mbsc-cal-pnl', ctx).addClass('mbsc-cal-pnl-h');
                    controls[visibleTab].removeClass('mbsc-cal-pnl-h');
                }

                inst.trigger('onCalResize');

                initTabs = false;
            },
            onHide: function () {
                queue = [];
                slidesArray = [];
                visibleTab = null;
                currYear = null;
                currMonth = null;
                trans = true;
                animw = 0;

                if (mainScroll) {
                    mainScroll.destroy();
                }

                if (quickNav && yearScroll && monthScroll) {
                    yearScroll.destroy();
                    monthScroll.destroy();
                }
            },
            onValidated: function (i) {
                var ctrl, d, j;

                d = inst.getDate(true);

                // Find out on which control was the selection made
                if (dayClick) {
                    ctrl = 'calendar';
                } else {
                    for (j in inst.order) {
                        if (j && inst.order[j] === i) {
                            ctrl = /[mdy]/.test(j) ? 'date' : 'time';
                        }
                    }
                }

                inst.trigger('onSetDate', {
                    date: d,
                    control: ctrl
                });

                // Set date on calendar
                setDate(d);

                dayClick = false;
            }
        });

        return ret;
    };

})(window, document);
