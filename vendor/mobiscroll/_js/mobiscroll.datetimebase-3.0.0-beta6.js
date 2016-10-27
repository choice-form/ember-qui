/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {
    var ms = mobiscroll,
        $ = ms.$,
        datetime = ms.util.datetime,
        adjustedDate = datetime.adjustedDate,
        now = new Date(),
        defaults = {
            startYear: now.getFullYear() - 100,
            endYear: now.getFullYear() + 1,
            separator: ' ',
            // Localization
            dateFormat: 'mm/dd/yy',
            dateDisplay: 'MMddyy',
            timeFormat: 'h:ii A',
            dayText: 'Day',
            monthText: 'Month',
            yearText: 'Year',
            hourText: 'Hours',
            minuteText: 'Minutes',
            ampmText: '&nbsp;',
            secText: 'Seconds',
            nowText: 'Now',
            todayText: 'Today' // TODO: translations
        },
        preset = function (inst) {

            function step(v, st, min, max) {
                return Math.min(max, Math.floor(v / st) * st + min);
            }

            function pad(num) {
                return num < 10 ? '0' + num : num;
            }

            function convertRanges(arr) {
                var i, v, start,
                    ret = [];

                if (arr) {
                    for (i = 0; i < arr.length; i++) {
                        v = arr[i];
                        if (v.start && v.start.getTime) {
                            start = new Date(v.start);
                            while (start <= v.end) {
                                ret.push(adjustedDate(start.getFullYear(), start.getMonth(), start.getDate()));
                                start.setDate(start.getDate() + 1);
                            }
                        } else {
                            ret.push(v);
                        }
                    }
                    return ret;
                }
                return arr;
            }

            function getMax(step, min, max) {
                return Math.floor((max - min) / step) * step + min;
            }

            function getYearValue(i) {
                return {
                    value: i,
                    display: (/yy/i.test(dateDisplay) ? i : (i + '').substr(2, 2)) + (s.yearSuffix || '')
                };
            }

            function getYearIndex(v) {
                return v;
            }

            function getYear(d) {
                return s.getYear(d);
            }

            function getMonth(d) {
                return s.getMonth(d);
            }

            function getDay(d) {
                return s.getDay(d);
            }

            function getHours(d) {
                var hour = d.getHours();
                hour = hasAmPm && hour >= 12 ? hour - 12 : hour;
                return step(hour, stepHour, minHour, maxHour);
            }

            function getMinutes(d) {
                return step(d.getMinutes(), stepMinute, minMinute, maxMinute);
            }

            function getSeconds(d) {
                return step(d.getSeconds(), stepSecond, minSecond, maxSecond);
            }

            function getMilliseconds(d) {
                return d.getMilliseconds();
            }

            function getAmPm(d) {
                return d.getHours() > 11 ? 1 : 0;
            }

            function getFullDate(d) {
                return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
            }

            function getFullTime(d) {
                return step(Math.round((d.getTime() - new Date(d).setHours(0, 0, 0, 0)) / 1000), timeStep, 0, 86400);
            }

            function getArrayPart(data, part, d, def) {
                var ret;

                if (wheelOrder[part] !== undefined) {
                    ret = +data[wheelOrder[part]];
                    if (!isNaN(ret)) {
                        return ret;
                    }
                }

                if (d) {
                    return getDatePart[part](d);
                }

                if (innerValues[part] !== undefined) {
                    return innerValues[part];
                }

                return getDatePart[part](def);
            }

            function getDate(data) {
                var d,
                    def = new Date(new Date().setHours(0, 0, 0, 0));

                if (data === null) {
                    return data;
                }

                if (wheelOrder.dd !== undefined) {
                    d = data[wheelOrder.dd].split('-');
                    d = new Date(d[0], d[1] - 1, d[2]);
                }

                if (wheelOrder.tt !== undefined) {
                    d = d || def;
                    d = new Date(d.getTime() + (data[wheelOrder.tt] % 86400) * 1000);
                }

                var year = getArrayPart(data, 'y', d, def),
                    month = getArrayPart(data, 'm', d, def),
                    day = Math.min(getArrayPart(data, 'd', d, def), s.getMaxDayOfMonth(year, month)),
                    hour = getArrayPart(data, 'h', d, def);

                return s.getDate(
                    year,
                    month,
                    day,
                    hasAmPm && getArrayPart(data, 'a', d, def) ? hour + 12 : hour,
                    getArrayPart(data, 'i', d, def),
                    getArrayPart(data, 's', d, def),
                    getArrayPart(data, 'u', d, def)
                );
            }

            function getArray(d, fillInner) {
                var i,
                    part,
                    parts = ['y', 'm', 'd', 'a', 'h', 'i', 's', 'u', 'dd', 'tt'],
                    ret = [];

                if (d === null || d === undefined) {
                    return d;
                }

                for (i = 0; i < parts.length; i++) {
                    part = parts[i];
                    if (wheelOrder[part] !== undefined) {
                        ret[wheelOrder[part]] = getDatePart[part](d);
                    }
                    if (fillInner) {
                        innerValues[i] = getDatePart[part](d);
                    }
                }

                return ret;
            }

            function getDateIndex(d, hasDay) {
                return hasDay ?
                    // Number of days since 1970-01-01
                    Math.floor(new Date(d) / 8.64e7) :
                    // Number of month since 1970-01-01
                    d.getMonth() + 12 * (d.getFullYear() - 1970);
            }

            function getDateWheel(template) {
                var hasDay = /d/i.test(template);
                return {
                    label: '',
                    cssClass: 'mbsc-dt-whl-date',
                    min: getDateIndex(getFullDate(minDate), hasDay),
                    max: getDateIndex(getFullDate(maxDate), hasDay),
                    data: function (i) {
                        var today = new Date(new Date().setHours(0, 0, 0, 0)),
                            d = hasDay ? new Date(i * 8.64e7) : new Date(1970, i, 1);

                        if (hasDay) {
                            d = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                        }

                        return {
                            invalid: hasDay && !isValid(d, true),
                            value: getFullDate(d),
                            display: today.getTime() == d.getTime() ? s.todayText : datetime.formatDate(template, d, s)
                        };
                    },
                    getIndex: function (v) {
                        return getDateIndex(v, hasDay);
                    }
                };
            }

            function getTimeWheel(template) {
                var i,
                    step,
                    time,
                    values = [];

                if (/s/i.test(template)) {
                    step = stepSecond;
                } else if (/i/i.test(template)) {
                    step = stepMinute * 60;
                } else if (/h/i.test(template)) {
                    step = stepHour * 3600;
                }

                timeStep = steps.tt = step;

                for (i = 0; i < 86400; i += step) {
                    time = new Date(new Date().setHours(0, 0, 0, 0) + i * 1000);
                    values.push({
                        value: i,
                        display: datetime.formatDate(template, time, s)
                    });
                }

                return {
                    label: '',
                    cssClass: 'mbsc-dt-whl-time',
                    data: values

                    //min: 0,
                    //max: Math.floor(60 * 60 * 24 / step) - 1,
                    // data: function (i) {
                    //     var time = new Date(new Date().setHours(0, 0, 0, 0) + i * step * 1000);
                    //     return {
                    //         value: i * step,
                    //         display: datetime.formatDate(template, time)
                    //     };
                    // },
                    // getIndex: function (v) {
                    //     return Math.round(v / step);
                    // }
                };
            }

            function getWheels() {
                var dateParts,
                    timeParts,
                    template,
                    i,
                    j,
                    types,
                    values,
                    monthStr,
                    nr = 0,
                    wheels = [],
                    dateGroup = [],
                    timeGroup = [];

                if (preset.match(/date/i)) {
                    dateParts = dateWheels.split(/\|/.test(dateWheels) ? '|' : '');

                    for (i = 0; i < dateParts.length; i++) {
                        template = dateParts[i];
                        types = 0;
                        if (template.length) {
                            // If contains different characters
                            if (/y/i.test(template)) {
                                types++;
                            }

                            if (/m/i.test(template)) {
                                types++;
                            }

                            if (/d/i.test(template)) {
                                types++;
                            }

                            if (types > 1 && wheelOrder.dd === undefined) {
                                wheelOrder.dd = nr;
                                nr++;
                                dateGroup.push(getDateWheel(template));
                                timeGroup = dateGroup; // TODO ???
                                oneDateWheel = true;
                            } else if (/y/i.test(template) && wheelOrder.y === undefined) {
                                wheelOrder.y = nr;
                                nr++;

                                // Year wheel
                                dateGroup.push({
                                    cssClass: 'mbsc-dt-whl-y',
                                    label: s.yearText,
                                    min: s.getYear(minDate),
                                    max: s.getYear(maxDate),
                                    data: getYearValue,
                                    getIndex: getYearIndex
                                });
                            } else if (/m/i.test(template) && wheelOrder.m === undefined) {
                                // Month wheel
                                wheelOrder.m = nr;
                                values = [];
                                nr++;

                                for (j = 0; j < 12; j++) {
                                    monthStr = dateDisplay
                                        .replace(/[dy]/gi, '')
                                        .replace(/mm/, pad(j + 1) + (s.monthSuffix || ''))
                                        .replace(/m/, j + 1 + (s.monthSuffix || ''));

                                    values.push({
                                        value: j,
                                        display: /MM/.test(monthStr) ?
                                            monthStr.replace(/MM/, '<span class="mbsc-dt-month">' + s.monthNames[j] + '</span>') : monthStr.replace(/M/, '<span class="mbsc-dt-month">' + s.monthNamesShort[j] + '</span>')
                                    });
                                }

                                dateGroup.push({
                                    cssClass: 'mbsc-dt-whl-m',
                                    label: s.monthText,
                                    data: values
                                });
                            } else if (/d/i.test(template) && wheelOrder.d === undefined) {
                                // Day wheel
                                wheelOrder.d = nr;
                                values = [];
                                nr++;

                                for (j = 1; j < 32; j++) {
                                    values.push({
                                        value: j,
                                        display: (/dd/i.test(dateDisplay) ? pad(j) : j) + (s.daySuffix || '')
                                    });
                                }

                                dateGroup.push({
                                    cssClass: 'mbsc-dt-whl-d',
                                    label: s.dayText,
                                    data: values
                                });
                            }
                        }
                    }

                    wheels.push(dateGroup);
                }

                if (preset.match(/time/i)) {
                    timeParts = timeWheels.split(/\|/.test(timeWheels) ? '|' : '');

                    for (i = 0; i < timeParts.length; i++) {
                        template = timeParts[i];
                        types = 0;
                        if (template.length) {
                            // If contains different characters
                            if (/h/i.test(template)) {
                                types++;
                            }

                            if (/i/i.test(template)) {
                                types++;
                            }

                            if (/s/i.test(template)) {
                                types++;
                            }

                            if (/a/i.test(template)) {
                                types++;
                            }
                        }

                        if (types > 1 && wheelOrder.tt === undefined) {
                            wheelOrder.tt = nr;
                            nr++;
                            timeGroup.push(getTimeWheel(template));
                        } else if (/h/i.test(template) && wheelOrder.h === undefined) {
                            // Hours wheel
                            values = [];
                            wheelOrder.h = nr;
                            nr++;

                            for (j = minHour; j < (hasAmPm ? 12 : 24); j += stepHour) {
                                values.push({
                                    value: j,
                                    display: hasAmPm && j === 0 ? 12 : /hh/i.test(timeDisplay) ? pad(j) : j
                                });
                            }

                            timeGroup.push({
                                cssClass: 'mbsc-dt-whl-h',
                                label: s.hourText,
                                data: values
                            });
                        } else if (/i/i.test(template) && wheelOrder.i === undefined) {
                            // Minutes wheel
                            values = [];
                            wheelOrder.i = nr;
                            nr++;

                            for (j = minMinute; j < 60; j += stepMinute) {
                                values.push({
                                    value: j,
                                    display: /ii/i.test(timeDisplay) ? pad(j) : j
                                });
                            }

                            timeGroup.push({
                                cssClass: 'mbsc-dt-whl-i',
                                label: s.minuteText,
                                data: values
                            });
                        } else if (/s/i.test(template) && wheelOrder.s === undefined) {
                            // Seconds wheel
                            values = [];
                            wheelOrder.s = nr;
                            nr++;

                            for (j = minSecond; j < 60; j += stepSecond) {
                                values.push({
                                    value: j,
                                    display: /ss/i.test(timeDisplay) ? pad(j) : j
                                });
                            }

                            timeGroup.push({
                                cssClass: 'mbsc-dt-whl-s',
                                label: s.secText,
                                data: values
                            });
                        } else if (/a/i.test(template) && wheelOrder.a === undefined) {
                            wheelOrder.a = nr;
                            nr++;

                            timeGroup.push({
                                cssClass: 'mbsc-dt-whl-a',
                                label: s.ampmText,
                                data: /A/.test(template) ? [{
                                    value: 0,
                                    display: s.amText.toUpperCase()
                                }, {
                                    value: 1,
                                    display: s.pmText.toUpperCase()
                                }] : [{
                                    value: 0,
                                    display: s.amText
                                }, {
                                    value: 1,
                                    display: s.pmText
                                }]
                            });
                        }
                    }

                    if (timeGroup != dateGroup) {
                        wheels.push(timeGroup);
                    }
                }

                return wheels;
            }

            function getHtml5Options($elm) {
                var format,
                    min,
                    max,
                    ret = {};

                // Force format for html5 date inputs (experimental)
                if ($elm.is('input')) {
                    switch ($elm.attr('type')) {
                        case 'date':
                            format = 'yy-mm-dd';
                            break;
                        case 'datetime':
                            format = 'yy-mm-ddTHH:ii:ssZ';
                            break;
                        case 'datetime-local':
                            format = 'yy-mm-ddTHH:ii:ss';
                            break;
                        case 'month':
                            format = 'yy-mm';
                            ret.dateOrder = 'mmyy';
                            break;
                        case 'time':
                            format = 'HH:ii:ss';
                            break;
                    }

                    ret.format = format;

                    // Check for min/max attributes
                    min = $elm.attr('min');
                    max = $elm.attr('max');

                    if (min) {
                        ret.min = datetime.parseDate(format, min);
                    }

                    if (max) {
                        ret.max = datetime.parseDate(format, max);
                    }
                }

                return ret;
            }

            function getClosestValidDate(d, dir) {
                var next,
                    prev,
                    nextValid = false,
                    prevValid = false,
                    up = 0,
                    down = 0;

                // Normalize min and max dates for comparing later (set default values where there are no values from wheels)
                minDate = getDate(getArray(minDate));
                maxDate = getDate(getArray(maxDate));

                if (isValid(d)) {
                    return d;
                }

                if (d < minDate) {
                    d = minDate;
                }

                if (d > maxDate) {
                    d = maxDate;
                }

                next = d;
                prev = d;

                if (dir !== 2) {
                    nextValid = isValid(next);

                    while (!nextValid && next < maxDate) {
                        next = new Date(next.getTime() + 1000 * 60 * 60 * 24);
                        nextValid = isValid(next);
                        up++;
                    }
                }

                if (dir !== 1) {
                    prevValid = isValid(prev);

                    while (!prevValid && prev > minDate) {
                        prev = new Date(prev.getTime() - 1000 * 60 * 60 * 24);
                        prevValid = isValid(prev);
                        down++;
                    }
                }

                if (dir === 1 && nextValid) {
                    return next;
                }

                if (dir === 2 && prevValid) {
                    return prev;
                }

                return down <= up && prevValid ? prev : next;
            }

            function isValid(d, skip) {
                if (!skip && d < minDate) {
                    return false;
                }

                if (!skip && d > maxDate) {
                    return false;
                }

                if (isInObj(d, valid)) {
                    return true;
                }

                if (isInObj(d, invalid)) {
                    return false;
                }

                return true;
            }

            function isInObj(d, obj) {
                var curr,
                    j,
                    v;

                if (obj) {
                    for (j = 0; j < obj.length; j++) {
                        curr = obj[j];
                        v = curr + '';
                        if (!curr.start) {
                            if (curr.getTime) { // Exact date
                                if (d.getFullYear() == curr.getFullYear() && d.getMonth() == curr.getMonth() && d.getDate() == curr.getDate()) {
                                    return true;
                                }
                            } else if (!v.match(/w/i)) { // Day of month
                                v = v.split('/');
                                if (v[1]) {
                                    if ((v[0] - 1) == d.getMonth() && v[1] == d.getDate()) {
                                        return true;
                                    }
                                } else if (v[0] == d.getDate()) {
                                    return true;
                                }
                            } else { // Day of week
                                v = +v.replace('w', '');
                                if (v == d.getDay()) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }

            function validateDates(obj, y, m, first, maxdays, invalids, val) {
                var d, j, k, v;

                if (obj) {
                    for (j = 0; j < obj.length; j++) {
                        d = obj[j];
                        v = d + '';
                        if (!d.start) {
                            if (d.getTime) { // Exact date
                                if (s.getYear(d) == y && s.getMonth(d) == m) {
                                    invalids[s.getDay(d)] = val;
                                }
                            } else if (!v.match(/w/i)) { // Day of month
                                v = v.split('/');
                                if (v[1]) {
                                    if (v[0] - 1 == m) {
                                        invalids[v[1]] = val;
                                    }
                                } else {
                                    invalids[v[0]] = val;
                                }
                            } else { // Day of week
                                v = +v.replace('w', '');
                                for (k = v - first; k < maxdays; k += 7) {
                                    if (k >= 0) {
                                        invalids[k + 1] = val;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            function validateTimes(vobj, index, v, y, m, d, invalids, valid) {
                var add, all, dd, hours1, hours2, hours3, i, i1, i2, j, obj, parts1, parts2, prop1, prop2, remove, ss, str, v1, v2,
                    spec = {},
                    day = s.getDate(y, m, d),
                    w = ['a', 'h', 'i', 's'];

                if (vobj) {
                    // Check if rules apply to the selected date
                    for (i = 0; i < vobj.length; i++) {
                        obj = vobj[i];
                        if (obj.start) {
                            obj.apply = false;
                            dd = obj.d;
                            ss = dd + '';
                            str = ss.split('/');
                            if (dd && ((dd.getTime && y == s.getYear(dd) && m == s.getMonth(dd) && d == s.getDay(dd)) || // Exact date
                                    (!ss.match(/w/i) && ((str[1] && d == str[1] && m == str[0] - 1) || (!str[1] && d == str[0]))) || // Day of month
                                    (ss.match(/w/i) && day.getDay() == +ss.replace('w', '')) // Day of week
                                )) {
                                obj.apply = true;
                                spec[day] = true; // Prevent applying generic rule on day, if specific exists
                            }
                        }
                    }

                    // Apply rules
                    for (i = 0; i < vobj.length; i++) {
                        obj = vobj[i];
                        add = 0;
                        remove = 0;
                        i1 = mins[v];
                        i2 = maxs[v];
                        prop1 = true;
                        prop2 = true;
                        all = false;

                        if (obj.start && (obj.apply || (!obj.d && !spec[day]))) {
                            // Define time parts
                            parts1 = obj.start.split(':');
                            parts2 = obj.end.split(':');

                            for (j = 0; j < 3; j++) {
                                if (parts1[j] === undefined) {
                                    parts1[j] = 0;
                                }
                                if (parts2[j] === undefined) {
                                    parts2[j] = 59;
                                }
                                parts1[j] = +parts1[j];
                                parts2[j] = +parts2[j];
                            }

                            if (v == 'tt') {
                                // Wheel containing full time
                                i1 = step(Math.round((new Date(day).setHours(parts1[0], parts1[1], parts1[2]) - new Date(day).setHours(0, 0, 0, 0)) / 1000), timeStep, 0, 86400);
                                i2 = step(Math.round((new Date(day).setHours(parts2[0], parts2[1], parts2[2]) - new Date(day).setHours(0, 0, 0, 0)) / 1000), timeStep, 0, 86400);
                            } else {

                                parts1.unshift(parts1[0] > 11 ? 1 : 0);
                                parts2.unshift(parts2[0] > 11 ? 1 : 0);

                                if (hasAmPm) {
                                    if (parts1[1] >= 12) {
                                        parts1[1] = parts1[1] - 12;
                                    }

                                    if (parts2[1] >= 12) {
                                        parts2[1] = parts2[1] - 12;
                                    }
                                }

                                // Look behind
                                for (j = 0; j < index; j++) {
                                    if (validValues[j] !== undefined) {
                                        v1 = step(parts1[j], steps[w[j]], mins[w[j]], maxs[w[j]]);
                                        v2 = step(parts2[j], steps[w[j]], mins[w[j]], maxs[w[j]]);
                                        hours1 = 0;
                                        hours2 = 0;
                                        hours3 = 0;
                                        if (hasAmPm && j == 1) {
                                            hours1 = parts1[0] ? 12 : 0;
                                            hours2 = parts2[0] ? 12 : 0;
                                            hours3 = validValues[0] ? 12 : 0;
                                        }
                                        if (!prop1) {
                                            v1 = 0;
                                        }
                                        if (!prop2) {
                                            v2 = maxs[w[j]];
                                        }
                                        if ((prop1 || prop2) && (v1 + hours1 < validValues[j] + hours3 && validValues[j] + hours3 < v2 + hours2)) {
                                            all = true;
                                        }
                                        if (validValues[j] != v1) {
                                            prop1 = false;
                                        }
                                        if (validValues[j] != v2) {
                                            prop2 = false;
                                        }
                                    }
                                }

                                // Look ahead
                                if (!valid) {
                                    for (j = index + 1; j < 4; j++) {
                                        if (parts1[j] > 0) {
                                            add = steps[v];
                                        }
                                        if (parts2[j] < maxs[w[j]]) {
                                            remove = steps[v];
                                        }
                                    }
                                }

                                if (!all) {
                                    // Calculate min and max values
                                    v1 = step(parts1[index], steps[v], mins[v], maxs[v]) + add;
                                    v2 = step(parts2[index], steps[v], mins[v], maxs[v]) - remove;

                                    if (prop1) {
                                        i1 = v1;
                                    }

                                    if (prop2) {
                                        i2 = v2;
                                    }
                                }
                            }

                            // Disable values
                            if (prop1 || prop2 || all) {
                                for (j = i1; j <= i2; j += steps[v]) {
                                    invalids[j] = !valid;
                                }
                            }
                        }
                    }
                }
            }

            var timeStep,
                oneDateWheel,
                wheels,
                wheelOrder = {},
                innerValues = {},
                validValues = [],
                html5def = getHtml5Options($(this)),
                orig = $.extend({}, inst.settings),
                s = $.extend(inst.settings, ms.util.datetime.defaults, defaults, html5def, orig),
                invalid = convertRanges(s.invalid),
                valid = convertRanges(s.valid),
                preset = s.preset,
                displayFormat = preset == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : preset == 'time' ? s.timeFormat : s.dateFormat,
                format = html5def.format || displayFormat,
                dateWheels = s.dateWheels || s.dateFormat,
                timeWheels = s.timeWheels || s.timeFormat,
                //dateWheels = '|D M d|', // TODO settings
                //timeWheels = '|h|ii|A|',
                dateDisplay = s.dateWheels || s.dateDisplay,
                timeDisplay = timeWheels,
                baseTheme = s.baseTheme || s.theme,
                minDate = s.min || adjustedDate(s.startYear, 0, 1),
                maxDate = s.max || adjustedDate(s.endYear, 11, 31, 23, 59, 59),
                hasTime = /time/i.test(preset),
                hasAmPm = /h/.test(timeDisplay),
                genDayNames = /D/.test(dateDisplay),
                stepParts = s.steps || {},
                stepHour = stepParts.hour || s.stepHour || 1,
                stepMinute = stepParts.minute || s.stepMinute || 1,
                stepSecond = stepParts.second || s.stepSecond || 1,
                zeroBased = stepParts.zeroBased,
                minHour = zeroBased ? 0 : minDate.getHours() % stepHour,
                minMinute = zeroBased ? 0 : minDate.getMinutes() % stepMinute,
                minSecond = zeroBased ? 0 : minDate.getSeconds() % stepSecond,
                maxHour = getMax(stepHour, minHour, (hasAmPm ? 11 : 23)),
                maxMinute = getMax(stepMinute, minMinute, 59),
                maxSecond = getMax(stepMinute, minMinute, 59),
                mins = {
                    y: minDate.getFullYear(),
                    m: 0,
                    d: 1,
                    h: minHour,
                    i: minMinute,
                    s: minSecond,
                    a: 0,
                    tt: 0
                },
                maxs = {
                    y: maxDate.getFullYear(),
                    m: 11,
                    d: 31,
                    h: maxHour,
                    i: maxMinute,
                    s: maxSecond,
                    a: 1,
                    tt: 86400
                },
                steps = {
                    y: 1,
                    m: 1,
                    d: 1,
                    h: stepHour,
                    i: stepMinute,
                    s: stepSecond,
                    a: 1,
                    tt: 1
                },
                widths = {
                    'android-holo': 40,
                    bootstrap: 46,
                    ios: 50,
                    jqm: 46,
                    material: 46,
                    mobiscroll: 46,
                    wp: 50
                },
                getDatePart = {
                    y: getYear,
                    m: getMonth,
                    d: getDay,
                    h: getHours,
                    i: getMinutes,
                    s: getSeconds,
                    u: getMilliseconds,
                    a: getAmPm,
                    dd: getFullDate,
                    tt: getFullTime
                };

            // Extended methods
            // ---

            /**
             * Returns the selected date.
             *
             * @param {Boolean} [temp=false] If true, return the currently shown date on the picker, otherwise the last selected one.
             * @return {Date}
             */
            inst.getDate = inst.getVal = function (temp) {
                return inst._hasValue || temp ? getDate(inst.getArrayVal(temp)) : null;
            };

            /**
             * Sets the selected date
             *
             * @param {Date} d Date to select.
             * @param {Boolean} [fill=false] Also set the value of the associated input element. Default is true.
             * @param {Number} [time=0] Animation time to scroll to the selected date.
             * @param {Boolean} [temp=false] Set temporary value only.
             * @param {Boolean} [change=fill] Trigger change on input element.
             */
            inst.setDate = function (d, fill, time, temp, change) {
                inst.setArrayVal(getArray(d), fill, change, temp, time);
            };

            // ---

            // Initializations
            // ---

            wheels = getWheels();

            inst.format = displayFormat;
            inst.order = wheelOrder;

            inst.handlers.now = function () {
                inst.setDate(new Date(), inst.live, 1000, true, true);
            };

            inst.buttons.now = {
                text: s.nowText,
                handler: 'now'
            };

            // ---

            return {
                minWidth: oneDateWheel && hasTime ? widths[baseTheme] : undefined,
                compClass: 'mbsc-dt',
                wheels: wheels,
                headerText: s.headerText ? function () {
                    return datetime.formatDate(displayFormat, getDate(inst.getArrayVal(true)), s);
                } : false,
                formatValue: function (d) {
                    return datetime.formatDate(format, getDate(d), s);
                },
                parseValue: function (val) {
                    if (!val) {
                        innerValues = {};
                    }
                    return getArray(val ?
                        datetime.parseDate(format, val, s) :
                        (s.defaultValue && s.defaultValue.getTime ? s.defaultValue : new Date()), !!val && !!val.getTime);
                },
                validate: function (data) {
                    var i,
                        j,
                        dayStr,
                        weekDay,
                        values = data.values,
                        index = data.index,
                        dir = data.direction,
                        dayWheel = inst.settings.wheels[0][wheelOrder.d],
                        validated = getClosestValidDate(getDate(values), dir),
                        temp = getArray(validated),
                        disabled = [],
                        wheels = {},
                        y = getDatePart.y(validated), //get(temp, 'y'),
                        m = getDatePart.m(validated), //get(temp, 'm'),
                        maxdays = s.getMaxDayOfMonth(y, m),
                        minprop = true,
                        maxprop = true;

                    $.each(['dd', 'y', 'm', 'd', 'tt', 'a', 'h', 'i', 's'], function (x, i) {
                        if (wheelOrder[i] !== undefined) {
                            var min = mins[i],
                                max = maxs[i],
                                val = getDatePart[i](validated);

                            disabled[wheelOrder[i]] = [];

                            if (minprop && minDate) {
                                min = getDatePart[i](minDate);
                            }
                            if (maxprop && maxDate) {
                                max = getDatePart[i](maxDate);
                            }
                            if (i != 'y' && i != 'dd') {
                                for (j = mins[i]; j <= maxs[i]; j += steps[i]) {
                                    if (j < min || j > max) {
                                        disabled[wheelOrder[i]].push(j);
                                    }
                                }
                            }
                            if (val < min) {
                                val = min;
                            }
                            if (val > max) {
                                val = max;
                            }
                            if (minprop) {
                                minprop = val == min;
                            }
                            if (maxprop) {
                                maxprop = val == max;
                            }

                            // Disable some days
                            if (i == 'd') {
                                var first = s.getDate(y, m, 1).getDay(),
                                    invalids = {};

                                // Set invalid indexes
                                validateDates(invalid, y, m, first, maxdays, invalids, 1);
                                // Delete indexes which are valid
                                validateDates(valid, y, m, first, maxdays, invalids, 0);

                                $.each(invalids, function (j, v) {
                                    if (v) {
                                        disabled[wheelOrder[i]].push(j);
                                    }
                                });
                            }
                        }
                    });

                    // Invalid times
                    if (hasTime) {
                        $.each(['a', 'h', 'i', 's', 'tt'], function (i, v) {
                            var val = getDatePart[v](validated),
                                d = getDatePart.d(validated),
                                invalids = {};

                            if (wheelOrder[v] !== undefined) {
                                validateTimes(invalid, i, v, y, m, d, invalids, 0);
                                validateTimes(valid, i, v, y, m, d, invalids, 1);

                                $.each(invalids, function (j, x) {
                                    if (x) {
                                        disabled[wheelOrder[v]].push(j);
                                    }
                                });

                                // Get valid value
                                validValues[i] = inst.getValidValue(wheelOrder[v], val, dir, invalids);
                            }
                        });
                    }

                    // Regenerate day wheel if number of days in month changes
                    // or if day names needs to be regenerated
                    if (dayWheel && (dayWheel._length !== maxdays || (genDayNames && (index === undefined || index === wheelOrder.y || index === wheelOrder.m)))) {
                        wheels[wheelOrder.d] = dayWheel;
                        dayWheel.data = [];
                        for (i = 1; i <= maxdays; i++) {
                            weekDay = s.getDate(y, m, i).getDay();
                            dayStr = dateDisplay.replace(/[my]/gi, '').replace(/dd/, (i < 10 ? '0' + i : i) + (s.daySuffix || '')).replace(/d/, i + (s.daySuffix || ''));
                            dayWheel.data.push({
                                value: i,
                                display: dayStr.match(/DD/) ? dayStr.replace(/DD/, '<span class="mbsc-dt-day">' + s.dayNames[weekDay] + '</span>') : dayStr.replace(/D/, '<span class="mbsc-dt-day">' + s.dayNamesShort[weekDay] + '</span>')
                            });
                        }
                        // Need to update day value, if out of month
                        inst._tempWheelArray[wheelOrder.d] = temp[wheelOrder.d];
                        inst.changeWheel(wheels);
                    }

                    return {
                        disabled: disabled,
                        valid: temp
                    };
                }
            };
        };

    $.each(['date', 'time', 'datetime'], function (i, v) {
        ms.presets.scroller[v] = preset;
    });
})();
