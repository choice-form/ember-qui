/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var empty = function () {},
        mbsc = mobiscroll,
        $ = mbsc.$,
        util = mbsc.util,
        getCoord = util.getCoord,
        testTouch = util.testTouch;

    mbsc.classes.Slider = function (elm, settings, inherit) {
        var $elm,
            $handle,
            $handleCont,
            $handles,
            $listener,
            $parent,
            $progress,
            $tooltips,
            $track,
            action,
            changed,
            diffX,
            diffY,
            diff,
            endX,
            endY,
            handleIndex,
            hasProgress,
            hasTooltip,
            isRange,
            isRtl,
            live,
            max,
            min,
            moved,
            multiple,
            step,
            s,
            scale,
            startX,
            startY,
            stepDecimal,
            timer,
            totalWidth,
            value,
            that = this,
            lastUpdate = new Date();

        function onStart(ev) {
            if (testTouch(ev, this) && !action && !elm.disabled  ) {
                if (s.stopProp) {
                    ev.stopPropagation();
                }

                action = true;
                moved = false;
                changed = false;
                startX = getCoord(ev, 'X');
                startY = getCoord(ev, 'Y');
                endX = startX;

                $track.removeClass('mbsc-progress-anim');
                $handle = multiple ? $('.mbsc-slider-handle', this) : $handles;
                $handleCont = $handle.parent().addClass('mbsc-active');

                handleIndex = +$handle.attr('data-index');
                totalWidth = $track[0].offsetWidth;
                diff = $track[0].getBoundingClientRect().left;

                if (ev.type === 'mousedown') {
                    ev.preventDefault();
                    $(document).on('mousemove', onMove).on('mouseup', onEnd);
                }
            }
        }

        function onMove(ev) {
            if (action) {
                endX = getCoord(ev, 'X');
                endY = getCoord(ev, 'Y');
                diffX = endX - startX;
                diffY = endY - startY;

                if (Math.abs(diffX) > 5 || moved) {

                    moved = true;

                    if (Math.abs(lastUpdate - new Date()) > 50) {
                        lastUpdate = new Date();
                        updateSlider(endX, s.round, live);
                    }
                }

                if (moved) {
                    ev.preventDefault();
                } else if (Math.abs(diffY) > 7) {
                    cleanUp(ev);
                }
            }
        }

        function onEnd(ev) {
            if (action) {
                ev.preventDefault();

                if (!multiple) {
                    $track.addClass('mbsc-progress-anim');
                }

                updateSlider(endX, true, true);

                if (!moved && !changed) {

                    // Prevent ghost click
                    util.preventClick();

                    that._onTap(value[handleIndex]);
                }

                cleanUp();
            }
        }

        function onCancel() {
            if (action) {
                cleanUp();
            }
        }

        function onChange() {
            var v = that._readValue($(this)),
                i = +$(this).attr('data-index');

            if (v !== value[i]) {
                value[i] = v; // Prevents re-fill to input
                updateValue(v, i);
            }
        }

        function onClick(ev) {
            // Prevent propagating click to label
            ev.stopPropagation();
        }

        function onLabelClick(ev) {
            // Prevent change on label click for swithes
            ev.preventDefault();
        }

        function onKeyDown(ev) {
            var dir;

            if (!elm.disabled) {

                switch (ev.keyCode) {
                    case 38:
                    case 39:
                        dir = 1;
                        break;
                    case 40:
                    case 37:
                        dir = -1;
                        break;
                }

                if (dir) {
                    ev.preventDefault();

                    if (!timer) {

                        handleIndex = +$(this).attr('data-index');

                        updateValue(value[handleIndex] + step * dir, handleIndex, true);

                        timer = setInterval(function () {
                            updateValue(value[handleIndex] + step * dir, handleIndex, true);
                        }, 200);
                    }
                }
            }
        }

        function onKeyUp(ev) {
            ev.preventDefault();
            clearInterval(timer);
            timer = null;
        }

        function cleanUp() {
            action = false;

            $handleCont.removeClass('mbsc-active');

            // Detach document events
            $(document).off('mousemove', onMove).off('mouseup', onEnd);
        }

        function updateSlider(pos, round, fill) {
            var percent = round ?
                Math.min((Math.round((Math.max((pos - diff) * 100 / totalWidth, 0) / scale) / step) * step) * 100 / (max - min), 100) :
                Math.max(0, Math.min((pos - diff) * 100 / totalWidth, 100));

            if (isRtl) {
                percent = 100 - percent;
            }

            updateValue(Math.round((min + percent / scale) * stepDecimal) / stepDecimal, handleIndex, fill, percent);
        }

        function getPercent(v) {
            return (v - min) * 100 / (max - min);
        }

        function getBoolAttr(attr, def) {
            var v = $elm.attr(attr);
            return v === undefined || v === '' ? def : v === 'true';
        }

        function updateValue(v, index, fill, percent, refresh, change) {
            var $handle = $handles.eq(index),
                $handleCont = $handle.parent();

            v = Math.min(max, Math.max(v, min));

            if (change === undefined) {
                change = fill;
            }

            if (isRange) {
                if (index === 0) {
                    v = Math.min(v, value[1]);
                    $progress.css({
                        width: getPercent(value[1]) - getPercent(v) + '%',
                        left: isRtl ? 'auto' : getPercent(v) + '%',
                        right: isRtl ? getPercent(v) + '%' : 'auto'
                    });
                } else {
                    v = Math.max(v, value[0]);
                    $progress.css({
                        width: getPercent(v) - getPercent(value[0]) + '%'
                    });
                }
            } else if (multiple || !hasProgress) {
                $handleCont.css({
                    left: isRtl ? 'auto' : (percent || getPercent(v)) + '%',
                    right: isRtl ? (percent || getPercent(v)) + '%' : 'auto'
                });
            } else {
                $progress.css('width', (percent || getPercent(v)) + '%');
            }

            if (hasTooltip) {
                $tooltips.eq(index).html(v);
            }

            if (v > min) {
                $handleCont.removeClass('mbsc-slider-start');
            } else if (value[index] > min || refresh) {
                $handleCont.addClass('mbsc-slider-start');
            }

            // Display value in the specified container(s)
            if (!multiple && (value[index] != v || refresh)) {
                that._display(v);
            }

            // Check if value changed
            if (fill && value[index] != v) {
                changed = true;

                // Store new value
                value[index] = v;

                // Set new value to the input
                that._fillValue(v, index, change);
            }

            $handle.attr('aria-valuenow', v);
        }

        // Call the parent constructor
        mbsc.classes.Progress.call(this, elm, settings, true);

        that._onTap = empty;

        that.__onInit = empty;

        that._readValue = function ($elm) {
            return +$elm.val();
        };

        that._fillValue = function (v, index, change) {
            $elm.eq(index).val(v);

            if (change) {
                $elm.eq(index).trigger('change');
            }
        };

        that._attachChange = function () {
            $elm.on(s.changeEvent, onChange);
        };

        that._onInit = function (ss) {
            var i,
                stepNr,
                wasInit;

            if ($parent) {
                $parent.removeClass('mbsc-slider-has-tooltip');
                if (step != 1) {
                    $('.mbsc-slider-step', $track).remove();
                }
            }

            that.__onInit();
            $parent = that._$parent;
            $track = that._$track;
            $progress = that._$progress;
            $elm = $parent.find('input');

            s = that.settings;
            min = that._min;
            max = that._max;
            step = ss.step === undefined ? +$elm.attr('step') || s.step : ss.step;
            live = getBoolAttr('data-live', s.live);
            hasTooltip = getBoolAttr('data-tooltip', s.tooltip);
            hasProgress = getBoolAttr('data-highlight', s.highlight) && $elm.length < 3;
            stepDecimal = step % 1 !== 0 ? (100 / (+(step % 1).toFixed(2) * 100)) : 1;
            scale = 100 / (max - min) || 100;
            multiple = $elm.length > 1;
            isRange = hasProgress && $elm.length == 2;
            isRtl = s.rtl;
            value = [];

            if (hasTooltip) {
                $parent.addClass('mbsc-slider-has-tooltip');
            }

            // Generate step marks
            if (step != 1) {
                stepNr = (max - min) / step;
                for (i = 0; i <= stepNr; ++i) {
                    $track.append('<span class="mbsc-slider-step" style="' + (isRtl ? 'right' : 'left') + ':' + (100 / stepNr * i) + '%"></span>');
                }
            }

            if ($handles) {
                wasInit = true;
                $handles.parent().remove();
            }

            // Generate slider handles

            $elm.each(function (i) {
                value[i] = that._readValue($(this));

                $(this)
                    .attr('data-index', i)
                    // Set min / max / step properties for all inputs
                    .attr('min', min)
                    .attr('max', max)
                    .attr('step', step);

                if (s.handle) {
                    (hasProgress ? $progress : $track).append(
                        '<span class="mbsc-slider-handle-cont' + (isRange && !i ? ' mbsc-slider-handle-left' : '') + '">' +
                        '<span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + min + '" aria-valuemax="' + max + '" data-index="' + i + '"></span>' +
                        (hasTooltip ? '<span class="mbsc-slider-tooltip"></span>' : '') +
                        '</span>'
                    );
                }
            });

            $handles = $parent.find('.mbsc-slider-handle');
            $tooltips = $parent.find('.mbsc-slider-tooltip');
            $listener = $parent.find(multiple ? '.mbsc-slider-handle-cont' : '.mbsc-progress-cont');

            // Attach events
            $handles
                .on('keydown', onKeyDown)
                .on('keyup', onKeyUp)
                .on('blur', onKeyUp);

            $listener
                .on('touchstart mousedown', onStart)
                .on('touchmove', onMove)
                .on('touchend touchcancel', onEnd)
                .on('pointercancel', onCancel);

            if (!wasInit) {
                $elm
                    .on('click', onClick);

                $parent
                    .on('click', onLabelClick);
            }

        };

        that._onDestroy = function () {
            $parent
                .off('click', onLabelClick);

            $elm
                .off(s.changeEvent, onChange)
                .off('click', onClick);

            $handles
                .off('keydown', onKeyDown)
                .off('keyup', onKeyUp)
                .off('blur', onKeyUp);

            $listener
                .off('touchstart mousedown', onStart)
                .off('touchmove', onMove)
                .off('touchend', onEnd)
                .off('touchcancel pointercancel', onCancel);
        };

        that.refresh = function () {
            $elm.each(function (i) {
                updateValue(that._readValue($(this)), i, true, false, true, false);
            });
        };

        that.getVal = function () {
            return multiple ? value.slice(0) : value[0];
        };

        that.setVal = that._setVal = function (val, fill, change) {
            if (!$.isArray(val)) {
                val = [val];
            }

            $.each(val, function (i, v) {
                updateValue(v, i, true, false, true, change);
            });
        };

        if (!inherit) {
            that.init(settings);
        }

    };

    mbsc.classes.Slider.prototype = {
        _class: 'progress',
        _css: 'mbsc-progress mbsc-slider',
        _hasTheme: true,
        _hasLang: true,
        _wrap: true,
        _defaults: {
            changeEvent: 'change',
            stopProp: true,
            min: 0,
            max: 100,
            step: 1,
            live: true,
            highlight: true,
            handle: true,
            round: true,
            returnAffix: true
        }
    };

    mbsc.presetShort('slider', 'Slider');

})();
