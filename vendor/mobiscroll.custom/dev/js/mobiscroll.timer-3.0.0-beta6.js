/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        defaults = {
            autostart: false,
            step: 1, // in seconds
            useShortLabels: false,
            // Localization
            labels: ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds', ''],
            labelsShort: ['Yrs', 'Mths', 'Days', 'Hrs', 'Mins', 'Secs', ''],
            startText: 'Start',
            stopText: 'Stop',
            resetText: 'Reset',
            lapText: 'Lap',
            hideText: 'Hide'
        };

    ms.presetShort('timer');

    ms.presets.scroller.timer = function (inst) {

        /**
         * Converts a date to UTC
         * @param   d   (Date)  Date to convert
         * @return      (Date)  Date converted to UTC
         */
        function toUtc(d) {
            return new Date(
                d.getUTCFullYear(),
                d.getUTCMonth(),
                d.getUTCDate(),
                d.getUTCHours(),
                d.getUTCMinutes(),
                d.getUTCSeconds(),
                d.getUTCMilliseconds()
            );
        }

        /**
         * Calculates the parts of the time differnce
         * @param   time    (Integer)   Time in milliseconds
         * @return          (Object)    Time splitted to the required parts (years, months, days, hours, minutes, seconds)
         */
        function getParts(time) {
            var ret = {};

            if (dateMode && obj[max].index > obj.days.index) {
                var i, v, o, prev,
                    now = new Date(),
                    d2 = up ? now : origTime,
                    d1 = up ? origTime : now;

                d1 = toUtc(d1);
                d2 = toUtc(d2);

                ret.years = d2.getFullYear() - d1.getFullYear();
                ret.months = d2.getMonth() - d1.getMonth();
                ret.days = d2.getDate() - d1.getDate();
                ret.hours = d2.getHours() - d1.getHours();
                ret.minutes = d2.getMinutes() - d1.getMinutes();
                ret.seconds = d2.getSeconds() - d1.getSeconds();
                ret.fract = (d2.getMilliseconds() - d1.getMilliseconds()) / 10;

                for (i = unique.length; i > 0; i--) {
                    v = unique[i - 1];
                    o = obj[v];
                    prev = unique[$.inArray(v, unique) - 1];
                    if (obj[prev] && ret[v] < 0) {
                        ret[prev]--;
                        ret[v] += (prev == 'months' ? (32 - new Date(d2.getFullYear(), d2.getMonth(), 32).getDate()) : (o.until + 1));

                    }
                }

                if (max == 'months') {
                    ret.months += ret.years * 12;
                    delete ret.years;
                }

            } else {
                $(unique).each(function (i, v) {
                    if (obj[v].index <= obj[max].index) {
                        ret[v] = Math.floor(time / obj[v].limit);
                        time -= ret[v] * obj[v].limit;
                    }
                });
            }

            return ret;
        }

        /**
         * Generates a specific wheel
         * @param   v   (String)  Unique identifier
         */
        function genWheel(v) {
            var st = 1,
                o = obj[v],
                wh = o.wheel,
                prefix = o.prefix,
                from = 0,
                until = o.until,
                next = obj[unique[$.inArray(v, unique) - 1]];

            if (o.index <= obj[max].index && (!next || next.limit > step)) {

                if (!wheels[v]) {
                    w[0].push(wh);
                }

                wheels[v] = 1;

                wh.data = [];
                wh.label = o.label || '';
                wh.cssClass = 'mbsc-timer-whl-' + v;

                if (step >= o.limit) { // Calculate steps on last wheel
                    st = Math.max(Math.round(step / o.limit), 1);
                    tstep = st * o.limit; // Timer is calculated with rounded step
                }

                if (v == max) {
                    wh.min = 0;
                    wh.data = function (i) {
                        return {
                            value: i,
                            display: genValue(i, prefix, o.label)
                        };
                    };
                    wh.getIndex = function (v) {
                        return v;
                    };
                } else {

                    for (i = from; i <= until; i += st) {
                        wh.data.push({
                            value: i,
                            display: genValue(i, prefix, o.label)
                        });
                    }
                }
            }
        }

        function genValue(i, prefix, lbl) {
            return (prefix || '') + (i < 10 ? '0' : '') + i + '<span class="mbsc-timer-lbl">' + lbl + '</span>';
        }

        /**
         * Converts the time into array containing the parts
         * @param   time    (Integer)   Time in milliseconds
         * @return          (Array)     Time splitted to the required parts (years, months, days, hours, minutes, seconds)
         */
        function getArray(time) {
            var arr = [],
                st,
                p = getParts(time);

            $(unique).each(function (i, v) {
                if (wheels[v]) {
                    st = Math.max(Math.round(step / obj[v].limit), 1);
                    arr.push(Math.round(p[v] / st) * st);
                }
            });

            return arr;
        }

        /**
         * Calculates the time
         * @param   reset   (Boolean)   Reset the timer or not
         */
        function calcTime(reset) {
            if (dateMode) {
                time = origTime - new Date();
                if (time < 0) {
                    time *= -1;
                    up = true;
                } else {
                    up = false;
                }
                timer = 0;
                infinit = true;
            } else if (origTime !== undefined) {
                infinit = false;
                time = origTime * 1000;
                up = s.mode != 'countdown';
                if (reset) {
                    timer = 0;
                }
            } else {
                time = 0;
                up = s.mode != 'countdown';
                infinit = up;
                if (reset) {
                    timer = 0;
                }
            }
        }

        function updateUI() {
            if (running) {
                $('.mbsc-fr-w', ctx).addClass('mbsc-timer-running mbsc-timer-locked');
                $('.mbsc-timer-btn-toggle-c > div', ctx).text(s.stopText);

                if (inst.buttons.start.icon) {
                    $('.mbsc-timer-btn-toggle-c > div', ctx).removeClass('mbsc-ic-' + inst.buttons.start.icon);
                }

                if (inst.buttons.stop.icon) {
                    $('.mbsc-timer-btn-toggle-c > div', ctx).addClass('mbsc-ic-' + inst.buttons.stop.icon);
                }

                if (s.mode == 'stopwatch') {
                    $('.mbsc-timer-btn-resetlap-c > div', ctx).text(s.lapText);

                    if (inst.buttons.reset.icon) {
                        $('.mbsc-timer-btn-resetlap-c > div', ctx).removeClass('mbsc-ic-' + inst.buttons.reset.icon);
                    }

                    if (inst.buttons.lap.icon) {
                        $('.mbsc-timer-btn-resetlap-c > div', ctx).addClass('mbsc-ic-' + inst.buttons.lap.icon);
                    }
                }
            } else {
                $('.mbsc-fr-w', ctx).removeClass('mbsc-timer-running');
                $('.mbsc-timer-btn-toggle-c > div', ctx).text(s.startText);

                if (inst.buttons.start.icon) {
                    $('.mbsc-timer-btn-toggle-c > div', ctx).addClass('mbsc-ic-' + inst.buttons.start.icon);
                }

                if (inst.buttons.stop.icon) {
                    $('.mbsc-timer-btn-toggle-c > div', ctx).removeClass('mbsc-ic-' + inst.buttons.stop.icon);
                }

                if (s.mode == 'stopwatch') {
                    $('.mbsc-timer-btn-resetlap-c > div', ctx).text(s.resetText);

                    if (inst.buttons.reset.icon) {
                        $('.mbsc-timer-btn-resetlap-c > div', ctx).addClass('mbsc-ic-' + inst.buttons.reset.icon);
                    }

                    if (inst.buttons.lap.icon) {
                        $('.mbsc-timer-btn-resetlap-c > div', ctx).removeClass('mbsc-ic-' + inst.buttons.lap.icon);
                    }
                }
            }
        }

        var i,
            interval,
            tstep,
            startTime,
            started,
            ellapsed,
            time,
            timer,
            up,
            ctx,
            lap,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            lbls = s.useShortLabels ? s.labelsShort : s.labels,
            buttons = ['toggle', 'resetlap'],
            unique = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'fract'],
            obj = {
                'years': {
                    index: 6,
                    until: 10,
                    limit: 1000 * 60 * 60 * 24 * 365,
                    label: lbls[0],
                    wheel: {}
                },
                'months': {
                    index: 5,
                    until: 11,
                    limit: 1000 * 60 * 60 * 24 * 30,
                    label: lbls[1],
                    wheel: {}
                },
                'days': {
                    index: 4,
                    until: 31,
                    limit: 1000 * 60 * 60 * 24,
                    label: lbls[2],
                    wheel: {}
                },
                'hours': {
                    index: 3,
                    until: 23,
                    limit: 1000 * 60 * 60,
                    label: lbls[3],
                    wheel: {}
                },
                'minutes': {
                    index: 2,
                    until: 59,
                    limit: 1000 * 60,
                    label: lbls[4],
                    wheel: {}
                },
                'seconds': {
                    index: 1,
                    until: 59,
                    limit: 1000,
                    label: lbls[5],
                    wheel: {}
                },
                'fract': {
                    index: 0,
                    until: 99,
                    limit: 10,
                    label: lbls[6],
                    prefix: '.',
                    wheel: {}
                }
            },
            wheels = {},
            laps = [],
            lastLap = 0,
            running = false,
            stopped = true,
            infinit = false,
            step = Math.max(10, s.step * 1000),
            max = s.maxWheel,
            locked = s.mode == 'stopwatch' || dateMode,
            origTime = s.targetTime,
            dateMode = origTime && origTime.getTime !== undefined,
            w = [
                []
            ];

        // Extended methods
        // ---

        // Start the counter
        inst.start = function () {
            if (stopped) {
                inst.reset();
            }
            if (!running) {
                calcTime();

                if (!infinit && timer >= time) {
                    return;
                }

                running = true;
                stopped = false;
                started = new Date();
                startTime = timer;

                s.readonly = true;
                inst.setVal(getArray(up ? timer : time - timer), true, true, false, 100);

                interval = setInterval(function () {

                    timer = new Date() - started + startTime;

                    inst.setVal(getArray(up ? timer : time - timer), true, true, false, Math.min(100, tstep - 10));

                    if (!infinit && timer + tstep >= time) {
                        clearInterval(interval);
                        setTimeout(function () { // Do last tick with precision
                            inst.stop();
                            timer = time;
                            inst.setVal(getArray(up ? timer : 0), true, true, false, 100);
                            inst.trigger('onFinish', {
                                time: time
                            });
                            stopped = true;
                        }, time - timer);
                    }
                }, tstep);

                updateUI();

                inst.trigger('onStart');
            }
        };

        // Stop the counter
        inst.stop = function () {
            if (running) {
                running = false;
                clearInterval(interval);

                // Time correction
                timer = new Date() - started + startTime;

                updateUI();

                inst.trigger('onStop', {
                    ellapsed: timer
                });
            }
        };

        inst.toggle = function () {
            if (running) {
                inst.stop();
            } else {
                inst.start();
            }
        };

        // Reset the counter
        inst.reset = function () {
            inst.stop();
            timer = 0;
            laps = [];
            lastLap = 0;
            inst.setVal(getArray(up ? 0 : time), true, true, false, 100);
            inst.settings.readonly = locked;
            stopped = true;

            if (!locked) {
                $('.mbsc-fr-w', ctx).removeClass('mbsc-timer-locked');
            }

            inst.trigger('onReset');
        };

        // Lap
        inst.lap = function () {
            if (running) {
                ellapsed = new Date() - started + startTime;
                lap = ellapsed - lastLap;
                lastLap = ellapsed;
                laps.push(ellapsed);
                inst.trigger('onLap', {
                    ellapsed: ellapsed,
                    lap: lap,
                    laps: laps
                });
            }
        };

        inst.resetlap = function () {
            if (running && s.mode == 'stopwatch') {
                inst.lap();
            } else {
                inst.reset();
            }
        };

        inst.getTime = function () {
            return time;
        };

        inst.setTime = function (t) {
            origTime = t / 1000;
            time = t;
        };

        inst.getElapsedTime = inst.getEllapsedTime = function () {
            return running ? new Date() - started + startTime : 0;
        };

        inst.setElapsedTime = inst.setEllapsedTime = function (t, change) {
            if (!stopped) {
                startTime = timer = t;
                started = new Date();
                inst.setVal(getArray(up ? timer : time - timer), true, change, false, 100);
            }
        };

        // ---

        // Constructor

        calcTime(true);

        if (!max && !time) {
            max = 'minutes';
        }

        if (s.display !== 'inline') {
            buttons.push('hide');
        }

        // Determine maximum wheel
        if (!max) {
            $(unique).each(function (i, v) {
                if (!max && time >= obj[v].limit) {
                    max = v;
                    return false;
                }
            });
        }

        // Generate wheels
        $(unique).each(function (i, v) {
            genWheel(v);
        });

        tstep = Math.max(87, tstep); // timer step cannot be less then 100 ms

        if (s.autostart) {
            setTimeout(function () {
                inst.start();
            }, 0);
        }

        inst.handlers.toggle = inst.toggle;
        inst.handlers.start = inst.start;
        inst.handlers.stop = inst.stop;
        inst.handlers.resetlap = inst.resetlap;
        inst.handlers.reset = inst.reset;
        inst.handlers.lap = inst.lap;

        inst.buttons.toggle = {
            parentClass: 'mbsc-timer-btn-toggle-c',
            text: s.startText,
            handler: 'toggle'
        };

        inst.buttons.start = {
            text: s.startText,
            handler: 'start'
        };

        inst.buttons.stop = {
            text: s.stopText,
            handler: 'stop'
        };

        inst.buttons.reset = {
            text: s.resetText,
            handler: 'reset'
        };

        inst.buttons.lap = {
            text: s.lapText,
            handler: 'lap'
        };

        inst.buttons.resetlap = {
            parentClass: 'mbsc-timer-btn-resetlap-c',
            text: s.resetText,
            handler: 'resetlap'
        };

        inst.buttons.hide = {
            parentClass: 'mbsc-timer-btn-hide-c',
            text: s.hideText,
            handler: 'cancel'
        };

        // Return settings
        return {
            wheels: w,
            headerText: false,
            readonly: locked,
            buttons: buttons,
            mode: 'countdown',
            compClass: 'mbsc-timer',
            parseValue: function () {
                return getArray(up ? 0 : time);
            },
            formatValue: function (d) {
                var ret = '',
                    j = 0;
                $(unique).each(function (i, v) {
                    if (v == 'fract') {
                        return;
                    }
                    if (wheels[v]) {
                        ret += d[j] + (v == 'seconds' && wheels.fract ? '.' + d[j + 1] : '') + ' ' + lbls[i] + ' ';
                        j++;
                    }
                });
                return ret;
            },
            validate: function (data) {
                var values = data.values,
                    i = data.index,
                    j = 0;

                if (stopped && i !== undefined) {
                    origTime = 0;
                    $(unique).each(function (i, v) {
                        if (wheels[v]) {
                            origTime += obj[v].limit * values[j];
                            j++;
                        }
                    });
                    origTime /= 1000;
                    calcTime(true);
                }
            },
            onBeforeShow: function () {
                s.showLabel = true;
            },
            onMarkupReady: function (ev) {
                ctx = $(ev.target);

                updateUI();

                if (locked) {
                    $('.mbsc-fr-w', ctx).addClass('mbsc-timer-locked');
                }
            },
            onPosition: function (ev) {
                // Force width to fit buttons
                $('.mbsc-fr-w', ev.target).css('min-width', 0).css('min-width', $('.mbsc-fr-btn-cont', ev.target)[0].offsetWidth);
            },
            onDestroy: function () {
                clearInterval(interval);
            }
        };
    };

})();
