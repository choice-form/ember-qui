/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (window, document, undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        extend = $.extend,
        util = ms.util,
        datetime = util.datetime,
        adjustedDate = datetime.adjustedDate,
        presets = ms.presets.scroller,
        defaults = {
            // Localization
            labelsShort: ['Yrs', 'Mths', 'Days', 'Hrs', 'Mins', 'Secs'],
            eventText: 'event',
            eventsText: 'events'
        };

    ms.presetShort('eventcalendar');

    presets.eventcalendar = function (inst) {

        // Private functions
        // ---

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

        function formatDuration(time) {
            var lbl = s.labelsShort,
                seconds = Math.abs(time) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365;

            return seconds < 45 && (Math.round(seconds) + ' ' + lbl[5].toLowerCase()) ||
                //seconds < 90 && '1 minute' ||
                minutes < 45 && (Math.round(minutes) + ' ' + lbl[4].toLowerCase()) ||
                //minutes < 90 && '1 hour' ||
                hours < 24 && (Math.round(hours) + ' ' + lbl[3].toLowerCase()) ||
                //hours < 42 && '1 day' ||
                days < 30 && (Math.round(days) + ' ' + lbl[2].toLowerCase()) ||
                //days < 45 && '1 month' ||
                days < 365 && (Math.round(days / 30) + ' ' + lbl[1].toLowerCase()) ||
                //years < 1.5 && '1 year' ||
                (Math.round(years) + ' ' + lbl[0].toLowerCase());
        }

        function sortEvents(events) {
            return events.sort(function (a, b) {
                var dt1 = a.d || a.start,
                    dt2 = b.d || b.start,
                    weight1 = !dt1.getTime ? 0 : (a.start && a.end && a.start.toDateString() !== a.end.toDateString() ? 1 : dt1.getTime()),
                    weight2 = !dt2.getTime ? 0 : (b.start && b.end && b.start.toDateString() !== b.end.toDateString() ? 1 : dt2.getTime());

                return weight1 - weight2;
            });
        }

        function positionEvents(cell) {
            var maxHeight,
                calHeight = $('.mbsc-cal-c', ctx)[0].offsetHeight,
                cellHeight = cell[0].offsetHeight,
                cellWidth = cell[0].offsetWidth,
                top = cell.offset().top - $('.mbsc-cal-c', ctx).offset().top,
                bottom = cell.closest('.mbsc-cal-row').index() < 2;

            maxHeight = evc.addClass('mbsc-cal-events-t').css({
                top: bottom ? top + cellHeight : '0',
                bottom: bottom ? '0' : calHeight - top
            }).addClass('mbsc-cal-events-v').height();

            evc.css(bottom ? 'bottom' : 'top', 'auto').removeClass('mbsc-cal-events-t');
            evci.css('max-height', maxHeight);

            eventScroll.refresh();
            eventScroll.scroll(0);

            // Calculate bubble position
            if (bottom) {
                evc.addClass('mbsc-cal-events-b');
            } else {
                evc.removeClass('mbsc-cal-events-b');
            }

            $('.mbsc-cal-events-arr', evc).css('left', cell.offset().left - evc.offset().left + cellWidth / 2);
        }

        function showEvents(d, cell) {
            var events = eventObj[d];

            if (events) {
                var ariaFrom, ariaTo, bg, dt, multiDay, txt,
                    html = '<ul class="mbsc-cal-event-list">';

                pos = 0;
                evd = cell;

                cell.addClass(selClass).find('.mbsc-cal-day-i').addClass(activeClass);

                if (cell.hasClass(highlightClass)) {
                    cell.attr('data-hl', 'true').removeClass(highlightClass);
                }

                sortEvents(events);

                $.each(events, function (i, e) {
                    dt = e.d || e.start;
                    multiDay = e.start && e.end && e.start.toDateString() !== e.end.toDateString();
                    bg = e.color;
                    txt = getTextColor(bg);
                    ariaFrom = '';
                    ariaTo = '';

                    if (dt.getTime) {
                        ariaFrom = datetime.formatDate((multiDay ? 'MM d yy ' : '') + s.timeFormat, dt);
                    }

                    if (e.end) {
                        ariaTo = datetime.formatDate((multiDay ? 'MM d yy ' : '') + s.timeFormat, e.end);
                    }

                    html += '<li role="button" aria-label="' + e.text +
                        (ariaFrom ? ', ' + s.fromText + ' ' + ariaFrom : '') +
                        (ariaTo ? ', ' + s.toText + ' ' + ariaTo : '') + '" class="mbsc-cal-event">' +
                        '<div class="mbsc-cal-event-color" style="' + (bg ? 'background:' + bg + ';' : '') + '"></div>' +
                        '<div class="mbsc-cal-event-text">' +
                        (dt.getTime && !multiDay ? '<div class="mbsc-cal-event-time">' + datetime.formatDate(s.timeFormat, dt) + '</div>' : '') +
                        e.text + '</div>' +
                        (e.start && e.end ? '<div class="mbsc-cal-event-dur">' + formatDuration(e.end - e.start) + '</div>' : '') +
                        '</li>';
                });

                html += '</ul>';

                evsc.html(html);

                inst.trigger('onEventBubbleShow', {
                    target: evd[0],
                    eventList: evc[0]
                });

                positionEvents(evd);

                // Assign event click
                inst.tap($('.mbsc-cal-event', evsc), function (e) {
                    if (!eventScroll.scrolled) {
                        inst.trigger('onEventSelect', {
                            domEvent: e,
                            event: events[$(this).index()],
                            date: d
                        });
                    }
                });

                evVisible = true;
            }
        }

        function hideEvents() {
            if (evc) {
                evc.removeClass('mbsc-cal-events-v');
            }
            if (evd) {
                evd.removeClass(selClass).find('.mbsc-cal-day-i').removeClass(activeClass);
                if (evd.attr('data-hl')) {
                    evd.removeAttr('data-hl').addClass(highlightClass);
                }
            }
            evVisible = false;
        }

        function refresh() {
            hideEvents();
            inst.redraw();
        }

        function getDateOnly(d) {
            return adjustedDate(d.getFullYear(), d.getMonth(), d.getDate());
        }

        // ---

        var base,
            ctx,
            evc,
            evd,
            eventObj,
            eventScroll,
            evci,
            evsc,
            evVisible,
            pos,
            ret,
            showEvent,
            textColors = {},
            orig = extend({}, inst.settings),
            s = extend(inst.settings, defaults, orig),
            selClass = 'mbsc-cal-day-sel mbsc-cal-day-ev',
            highlightClass = 'mbsc-cal-day-hl',
            activeClass = s.activeClass || '',
            markedText = s.showEventCount,
            eventID = 0,
            eventList = extend(true, [], s.data);

        ret = presets.calbase.call(this, inst);
        base = extend({}, ret);

        $.each(eventList, function (i, e) {
            if (e._id === undefined) {
                e._id = eventID++;
            }
        });

        // Extended methods
        // ---

        inst.onGenMonth = function (y, m) {
            eventObj = inst.prepareObj(eventList, y, m);
        };

        inst.getDayProps = function (d) {
            var i,
                marked = eventObj[d] ? eventObj[d] : false,
                txt = marked ? eventObj[d].length + ' ' + (eventObj[d].length > 1 ? s.eventsText : s.eventText) : 0,
                bgColor = marked && marked[0] && marked[0].color,
                txtColor = markedText && txt ? getTextColor(bgColor) : '',
                iconMarkup = '',
                markedMarkup = ''; //<div class="mbsc-cal-day-m"' + (bgColor ? ' style="background-color:' + bgColor + ';border-color:' + bgColor + ' ' + bgColor + ' transparent transparent"' : '') + '></div>';

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
                selected: false,
                cssClass: marked ? 'mbsc-cal-day-marked' : '',
                ariaLabel: markedText ? txt : '',
                markup: markedText && txt ?
                    '<div class="mbsc-cal-day-txt-c"><div class="mbsc-cal-day-txt" title="' + $('<div>' + txt + '</div>').text() + '"' + (bgColor ? ' style="background:' + bgColor + ';color:' + txtColor + ';text-shadow:none;"' : '') + '>' + iconMarkup + txt + '</div></div>' : markedText && iconMarkup ?
                    '<div class="mbsc-cal-day-ic-c">' + iconMarkup + '</div>' : marked ?
                    markedMarkup : ''
            };
        };

        inst.addEvent = function (events) {
            var ret = [];
            events = extend(true, [], $.isArray(events) ? events : [events]);
            $.each(events, function (i, e) {
                if (e._id === undefined) {
                    e._id = eventID++;
                }
                eventList.push(e);
                ret.push(e._id);
            });
            refresh();
            return ret;
        };

        inst.removeEvent = function (eids) {
            eids = $.isArray(eids) ? eids : [eids];
            $.each(eids, function (i, eid) {
                $.each(eventList, function (j, e) {
                    if (e._id === eid) {
                        eventList.splice(j, 1);
                        return false;
                    }
                });
            });
            refresh();
        };

        inst.getEvents = function (d) {
            var obj;
            if (d) {
                d.setHours(0, 0, 0, 0);
                obj = inst.prepareObj(eventList, d.getFullYear(), d.getMonth());
                return obj[d] ? sortEvents(obj[d]) : [];
            }
            return extend(true, [], eventList);
        };

        inst.setEvents = function (events) {
            var ret = [];
            eventList = extend(true, [], events);
            $.each(eventList, function (i, e) {
                if (e._id === undefined) {
                    e._id = eventID++;
                }
                ret.push(e._id);
            });
            refresh();
            return ret;
        };

        // ---

        extend(ret, {
            highlight: false,
            outerMonthChange: false,
            headerText: false,
            buttons: s.display !== 'inline' ? ['cancel'] : s.buttons,
            onMarkupReady: function (ev) {
                base.onMarkupReady.call(this, ev);

                ctx = $(ev.target);

                if (markedText) {
                    $('.mbsc-cal', ctx).addClass('mbsc-cal-ev');
                }

                ctx.addClass('mbsc-cal-em');
                evc = $('<div class="mbsc-cal-events ' + (s.eventBubbleClass || '') + '"><div class="mbsc-cal-events-arr"></div><div class="mbsc-cal-events-i"><div class="mbsc-cal-events-sc"></div></div></div>').appendTo($('.mbsc-cal-c', ctx));

                evci = $('.mbsc-cal-events-i', evc);
                evsc = $('.mbsc-cal-events-sc', evc);

                eventScroll = new ms.classes.ScrollView(evci[0]);

                evVisible = false;

                inst.tap(evci, function () {
                    if (!eventScroll.scrolled) {
                        hideEvents();
                    }
                });
            },
            onMonthChange: function () {
                hideEvents();
            },
            onSelectShow: function () {
                hideEvents();
            },
            onMonthLoaded: function () {
                if (showEvent) {
                    showEvents(showEvent.d, $('.mbsc-cal-day-v[data-full="' + showEvent.full + '"]:not(.mbsc-cal-day-diff)', ctx));
                    showEvent = false;
                }
            },
            onDayChange: function (day) {
                var dtime = day.date,
                    d = getDateOnly(dtime),
                    cell = $(day.target);

                hideEvents();
                if (!cell.hasClass('mbsc-cal-day-ev')) {
                    setTimeout(function () {
                        if (inst.changing) {
                            showEvent = {
                                d: d,
                                full: cell.attr('data-full')
                            };
                        } else {
                            showEvents(d, cell);
                        }
                    }, 10);
                }

                return false;
            },
            onCalResize: function () {
                if (evVisible) {
                    positionEvents(evd);
                }
            }
        });

        return ret;
    };

})(window, document);
