/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var $active,
        empty = function () {},
        mbsc = mobiscroll,
        $ = mbsc.$,
        util = mbsc.util,
        getCoord = util.getCoord,
        testTouch = util.testTouch;

    // Form
    // ---

    mbsc.classes.Form = function (el, settings) {

        var s,
            sizeDebounce,
            trigger,
            cssClass = '',
            $ctx = $(el),
            that = this;

        function addIcon($control) {
            var icons = {},
                control = $control[0],
                $parent = $control.parent(),
                toggle = $control.attr('data-password-toggle'),
                iconShow = $control.attr('data-icon-show') || 'eye',
                iconHide = $control.attr('data-icon-hide') || 'eye-blocked';

            if (toggle) {
                icons.right = control.type == 'password' ? iconShow : iconHide;
            }

            util.addIcon($control, icons);

            if (toggle) {
                that.tap($parent.find('.mbsc-right-ic'), function () {
                    if (control.type == "text") {
                        control.type = "password";
                        $(this).addClass('mbsc-ic-' + iconShow).removeClass('mbsc-ic-' + iconHide);
                    } else {
                        control.type = "text";
                        $(this).removeClass('mbsc-ic-' + iconShow).addClass('mbsc-ic-' + iconHide);
                    }
                });
            }
        }

        function scrollTextarea() {
            var control = this;

            if (!$(control).hasClass('mbsc-textarea-scroll')) {
                var line = control.scrollHeight - control.offsetHeight,
                    height = control.offsetHeight + line;

                control.scrollTop = 0;
                control.style.height = height + 'px';
            }
        }

        function sizeTextarea(control) {
            var height,
                lineNr,
                line;

            if (control.offsetHeight) {
                control.style.height = '';

                line = control.scrollHeight - control.offsetHeight;
                height = control.offsetHeight + (line > 0 ? line : 0);
                lineNr = Math.round(height / 24);

                if (lineNr > 10) {
                    control.scrollTop = height;
                    height = 240 + (height - lineNr * 24);
                    $(control).addClass('mbsc-textarea-scroll');
                } else {
                    $(control).removeClass('mbsc-textarea-scroll');
                }

                if (height) {
                    control.style.height = height + 'px';
                }
            }
        }

        function sizeTextareas() {
            clearTimeout(sizeDebounce);
            sizeDebounce = setTimeout(function () {
                $('textarea.mbsc-control', $ctx).each(function () {
                    sizeTextarea(this);
                });
            }, 100);
        }

        function instanceExists(elm) {
            return !!(elm.id && mbsc.instances[elm.id]);
        }

        // Call the parent constructor
        mbsc.classes.Base.call(this, el, settings, true);

        

        that.refresh = function (shallow) {
            $('input,select,textarea,progress,button', $ctx).each(function () {

                function setSelectedText() {
                    $('input', $parent).val(control.selectedIndex != -1 ? control.options[control.selectedIndex].text : '');
                }

                var $input,
                    hasIcon,
                    isActive,
                    startX,
                    startY,
                    control = this,
                    $control = $(control),
                    $parent = $control.parent(),
                    role = $control.attr('data-role'),
                    type = $control.attr('type') || control.nodeName.toLowerCase();

                

                // Skip elements with data-enhance="false"
                if ($control.attr('data-enhance') != 'false'  ) {

                    if (/(switch|range|segmented|stepper)/.test(role)) {
                        type = role;
                    }

                    if ($control.hasClass('mbsc-control')) {
                        if (/(switch|range|progress)/.test(type) && instanceExists(control) && !shallow) {
                            mbsc.instances[control.id].option({
                                theme: s.theme,
                                lang: s.lang,
                                onText: s.onText,
                                offText: s.offText,
                                stopProp: s.stopProp
                            });
                        }
                    } else {

                        // Wrap non-empty text nodes in span with mbsc-label class
                        if (type != 'button' && type != 'submit' && type != 'segmented') {
                            $parent.find('label').addClass('mbsc-label');
                            $parent.contents().filter(function () {
                                return this.nodeType == 3 && this.nodeValue && /\S/.test(this.nodeValue);
                            }).each(function () {
                                $('<span class="mbsc-label"></span>').insertAfter(this).append(this);
                            });
                        }

                        $control.addClass('mbsc-control');

                        switch (type) {
                            case 'button':
                            case 'submit':

                                hasIcon = $control.attr('data-icon');
                                $control.addClass('mbsc-btn');

                                if (hasIcon) {
                                    $control.prepend('<span class="mbsc-btn-ic mbsc-ic mbsc-ic-' + hasIcon + '"></span>');
                                    if ($control.text() === "") {
                                        $control.addClass('mbsc-btn-icon-only');
                                    }
                                }


                                break;
                            case 'switch':
                                if (!instanceExists(control)) {
                                    new mbsc.classes.Switch(control, {
                                        theme: s.theme,
                                        lang: s.lang,
                                        rtl: s.rtl,
                                        onText: s.onText,
                                        offText: s.offText,
                                        stopProp: s.stopProp
                                    });
                                }

                                break;
                            case 'checkbox':
                                $parent
                                    .prepend($control)
                                    .addClass('mbsc-checkbox mbsc-control-w');

                                $control.after('<span class="mbsc-checkbox-box"></span>');
                                break;
                            case 'range':
                                if (!$parent.hasClass('mbsc-slider') && !instanceExists(control)) {
                                    new mbsc.classes.Slider(control, {
                                        theme: s.theme,
                                        lang: s.lang,
                                        rtl: s.rtl,
                                        stopProp: s.stopProp
                                    });
                                }
                                break;
                            case 'progress':
                                if (!instanceExists(control)) {
                                    new mbsc.classes.Progress(control, {
                                        theme: s.theme,
                                        lang: s.lang,
                                        rtl: s.rtl
                                    });
                                }
                                break;
                            case 'radio':
                                $parent.addClass('mbsc-radio mbsc-control-w');
                                $control.after('<span class="mbsc-radio-box"><span></span></span>');
                                break;
                            case 'select':
                            case 'select-one':
                            case 'select-multiple':
                                if ($control.prev().is('input.mbsc-control')) {
                                    $input = $control.prev();
                                } else {
                                    $input = $('<input tabindex="-1" type="text" class="mbsc-control mbsc-control-ev" readonly>');
                                }

                                addIcon($control);

                                $parent.addClass('mbsc-input mbsc-select mbsc-control-w');

                                $control.after($input);

                                $input.after('<span class="mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"></span>');
                                break;
                            case 'textarea':
                                addIcon($control);

                                $parent.addClass('mbsc-input mbsc-textarea mbsc-control-w');
                                break;
                            case 'segmented':
                                var $segment,
                                    $segmentCont;

                                if (!$control.parent().hasClass('mbsc-segmented-item')) {
                                    $segmentCont = $('<div class="mbsc-segmented"></div>');

                                    $parent.after($segmentCont);

                                    $('input[name="' + $control.attr('name') + '"]', $ctx).each(function (i, v) {
                                        $segment = $(v).parent().addClass('mbsc-segmented-item');

                                        $('<span class="mbsc-segmented-content">' +
                                            ($(v).attr('data-icon') ? ' <span class="mbsc-ic mbsc-ic-' + $(v).attr('data-icon') + '"></span> ' : '') +
                                            '</span>').append($segment.contents()).appendTo($segment);

                                        $segment.prepend(v);

                                        $segmentCont.append($segment);
                                    });
                                }

                                break;
                            case 'stepper':
                                if (!instanceExists(control)) {
                                    new mbsc.classes.Stepper(control, {
                                        form: that
                                    });
                                }

                                break;
                            case 'hidden':
                                break;
                            default:
                                addIcon($control);
                                $parent.addClass('mbsc-input mbsc-control-w');

                                break;
                        }
                    }

                    // Attach events
                    if (!$control.hasClass('mbsc-control-ev')) {
                        // Check if select and mobiscroll select was not initialized
                        if (/select/.test(type) && !$control.hasClass('mbsc-comp')) {
                            $control.on('change.mbsc-form', setSelectedText);
                            setSelectedText();
                        }

                        if (type == 'textarea') {
                            $control
                                .on('keydown.mbsc-form input.mbsc-form', function () {
                                    clearTimeout(sizeDebounce);
                                    sizeDebounce = setTimeout(function () {
                                        sizeTextarea(control);
                                    }, 100);
                                })
                                .on('scroll.mbsc-form', scrollTextarea);
                        }

                        // Prevent 300ms click latency
                        $control.addClass('mbsc-control-ev').on('touchstart.mbsc-form mousedown.mbsc-form', function (ev) {
                            if (testTouch(ev, this)) {
                                startX = getCoord(ev, 'X');
                                startY = getCoord(ev, 'Y');

                                if ($active) {
                                    $active.removeClass('mbsc-active');
                                }

                                if (!control.disabled) {
                                    isActive = true;
                                    $active = $(this);
                                    $(this).addClass('mbsc-active');
                                    trigger('onControlActivate', {
                                        target: this,
                                        domEvent: ev
                                    });
                                }
                            }
                        }).on('touchmove.mbsc-form mousemove.mbsc-form', function (ev) {
                            // If movement is more than 9px, don't fire the click event handler
                            if (isActive && Math.abs(getCoord(ev, 'X') - startX) > 9 || Math.abs(getCoord(ev, 'Y') - startY) > 9) {
                                $control.removeClass('mbsc-active');
                                trigger('onControlDeactivate', {
                                    target: $control[0],
                                    domEvent: ev
                                });
                                isActive = false;
                            }
                        }).on('touchend.mbsc-form touchcancel.mbsc-form mouseleave.mbsc-form mouseup.mbsc-form', function (ev) {
                            if (isActive && ev.type == 'touchend' && !control.readOnly) {
                                control.focus();

                                if (/(button|submit|checkbox|switch|radio)/.test(type)) {
                                    ev.preventDefault();
                                }

                                if (!/select/.test(type)) {
                                    var touch = (ev.originalEvent || ev).changedTouches[0],
                                        evt = document.createEvent('MouseEvents');

                                    evt.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                                    evt.tap = true;

                                    control.dispatchEvent(evt);

                                    // Prevent ghost click
                                    util.preventClick();
                                }
                            }

                            if (isActive) {
                                setTimeout(function () {
                                    $control.removeClass('mbsc-active');
                                    trigger('onControlDeactivate', {
                                        target: $control[0],
                                        domEvent: ev
                                    });
                                }, 100);
                            }

                            isActive = false;

                            $active = null;
                        });
                    }
                }

            });

            // Set initial height for textareas
            if (!shallow) {
                sizeTextareas();
            }
        };

        /**
         * Form initialization.
         */
        that.init = function (ss) {
            that._init(ss);

            if (!mbsc.themes.form[s.theme]) {
                s.theme = 'mobiscroll';
            }

            if (!$ctx.hasClass('mbsc-form')) {
                // Touchstart needed for active stylings to work on iOS
                $ctx.on('touchstart', empty).show();
                $(window).on('resize orientationchange', sizeTextareas);
            }

            if (cssClass) {
                $ctx.removeClass(cssClass);
            }

            cssClass = 'mbsc-form mbsc-' + s.theme + (s.baseTheme ? ' mbsc-' + s.baseTheme : '') + (s.rtl ? ' mbsc-rtl' : ' mbsc-ltr');

            $ctx.addClass(cssClass);

            that.refresh();
            that.trigger('onInit');
        };

        /**
         * Destroys the mobiscroll instance.
         */
        that.destroy = function () {
            $ctx.removeClass(cssClass).off('touchstart', empty);

            $(window).off('resize orientationchange', sizeTextareas);

            $('.mbsc-control', $ctx).off('.mbsc-form').removeClass('mbsc-control-ev');

            that._destroy();

            $('.mbsc-progress progress', $ctx).mobiscroll('destroy');
            $('.mbsc-slider input', $ctx).mobiscroll('destroy');
            $('.mbsc-stepper input', $ctx).mobiscroll('destroy');
            $('.mbsc-switch input', $ctx).mobiscroll('destroy');

        };

        // Constructor

        s = that.settings;
        trigger = that.trigger;

        that.init(settings);
    };

    // Extend defaults
    mbsc.classes.Form.prototype = {
        _hasDef: true,
        _hasTheme: true,
        _hasLang: true,
        _class: 'form',
        _defaults: {
            tap: true,
            stopProp: true,
            // Localization
            lang: 'en'
        }
    };

    mbsc.themes.form.mobiscroll = {};

    mbsc.presetShort('form', 'Form');

    // ---
    // Form end


    // Stepper
    // ---

    mbsc.classes.Stepper = function (control, settings) {
        var $btn,
            $btnPlus,
            $btnMinus,
            $controls,
            action,
            changed,
            diffX,
            diffY,
            displayValue,
            eX,
            eY,
            interval,
            max,
            min,
            step,
            s,
            sX,
            sY,
            val,
            that = this,
            $control = $(control),
            ready,
            $parent,
            old = val,
            form = settings.form;

        function onKeyDown(ev) {
            if (ev.keyCode == 32) {
                ev.preventDefault();
                if (!action && !control.disabled) {
                    $btn = $(this).addClass('mbsc-active');
                    updateStepper(ev);
                }
            }
        }

        function onKeyUp(ev) {
            if (action) {
                ev.preventDefault();
                stopStepper(true);
            }
        }

        function onStart(ev) {
            if (testTouch(ev, this) && !control.disabled  ) {

                $btn = $(this).addClass('mbsc-active').trigger('focus');

                if (form) {
                    form.trigger('onControlActivate', {
                        target: $btn[0],
                        domEvent: ev
                    });
                }

                updateStepper(ev);

                if (ev.type === 'mousedown') {
                    $(document)
                        .on('mousemove', onMove)
                        .on('mouseup', onEnd);
                }
            }
        }

        function onEnd(ev) {
            if (action) {

                ev.preventDefault();

                stopStepper(true, ev);

                if (ev.type === 'mouseup') {
                    $(document)
                        .off('mousemove', onMove)
                        .off('mouseup', onEnd);
                }
            }
        }

        function onMove(ev) {
            if (action) {
                eX = getCoord(ev, 'X');
                eY = getCoord(ev, 'Y');
                diffX = eX - sX;
                diffY = eY - sY;

                if (Math.abs(diffX) > 7 || Math.abs(diffY) > 7) {
                    stopStepper();
                }
            }
        }

        function onChange() {
            var v;

            if (!control.disabled) {
                v = parseFloat($(this).val());
                moveStepper(isNaN(v) ? val : v);
            }
        }

        function moveStepper(v, fill, change) {

            old = val;

            if (fill === undefined) {
                fill = true;
            }

            if (change === undefined) {
                change = fill;
            }

            if (v !== undefined) {
                val = Math.min(max, Math.max(Math.round(v / step) * step, min));
            } else {
                val = Math.min(max, Math.max(val + ($btn.hasClass('mbsc-stepper-minus') ? -step : step), min));
            }

            changed = true;

            $controls.removeClass('mbsc-step-disabled');

            if (fill) {
                $control.val(val);
            }

            if (val == min) {
                $btnMinus.addClass('mbsc-step-disabled');
            } else if (val == max) {
                $btnPlus.addClass('mbsc-step-disabled');
            }

            if (val !== old && change) {
                $control.trigger('change');
            }
        }

        function updateStepper(ev) {
            if (!action) {

                action = true;
                changed = false;

                sX = getCoord(ev, 'X');
                sY = getCoord(ev, 'Y');

                clearInterval(interval);
                clearTimeout(interval);

                interval = setTimeout(function () {
                    moveStepper();
                    interval = setInterval(function () {
                        moveStepper();
                    }, 150);
                }, 300);

            }
        }

        function stopStepper(change, ev) {
            clearInterval(interval);
            clearTimeout(interval);

            if (!changed && change) {
                moveStepper();
            }

            action = false;
            changed = false;

            $btn.removeClass('mbsc-active');

            if (form) {
                setTimeout(function () {
                    form.trigger('onControlDeactivate', {
                        target: $btn[0],
                        domEvent: ev
                    });
                }, 100);
            }
        }

        function getAttr(attr, def) {
            var v = $control.attr(attr);
            return v === undefined || v === '' ? def : +v;
        }

        // Call the parent constructor
        mbsc.classes.Base.call(this, control, settings, true);

        

        that.getVal = function () {
            var v = parseFloat($control.val());
            v = isNaN(v) ? val : v;
            return Math.min(max, Math.max(Math.round(v / step) * step, min));
        };

        that.setVal = function (v, fill, change) {
            v = parseFloat(v);
            moveStepper(isNaN(v) ? val : v, fill, change);
        };

        that.init = function (ss) {
            ready = $control.parent().hasClass('mbsc-stepper');
            $parent = ready ? $control.closest('.mbsc-stepper-cont') : $control.parent();

            that._init(ss);

            s = that.settings;

            min = ss.min === undefined ? getAttr('min', s.min) : ss.min;
            max = ss.max === undefined ? getAttr('max', s.max) : ss.max;
            step = ss.step === undefined ? getAttr('step', s.step) : ss.step;
            displayValue = $control.attr('data-val') || s.val;
            val = Math.min(max, Math.max(Math.round(+control.value / step) * step || 0, min));

            if (!ready) {
                $parent
                    .addClass('mbsc-stepper-cont mbsc-control-w')
                    .append('<span class="mbsc-segmented mbsc-stepper"></span>')
                    .find('.mbsc-stepper')
                    .append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' + (val == min ? 'mbsc-step-disabled' : '') + '"  tabindex="0"><span class="mbsc-segmented-content"><span class="mbsc-ic mbsc-ic-minus"></span></span></span>')
                    .append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' + (val == max ? 'mbsc-step-disabled' : '') + '"  tabindex="0"><span class="mbsc-segmented-content"> <span class="mbsc-ic mbsc-ic-plus"></span> </span></span>')
                    .prepend($control);
            }

            $btnMinus = $('.mbsc-stepper-minus', $parent);
            $btnPlus = $('.mbsc-stepper-plus', $parent);

            if (!ready) {
                if (displayValue == 'left') {
                    $parent.addClass('mbsc-stepper-val-left');
                    $control.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>');
                } else if (displayValue == 'right') {
                    $parent.addClass('mbsc-stepper-val-right');
                    $btnPlus.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>');
                } else {
                    $btnMinus.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content mbsc-stepper-val"></span></span>');
                }
            }

            $control
                .val(val)
                .attr('data-role', 'stepper')
                .attr('min', min)
                .attr('max', max)
                .attr('step', step)
                .on('change', onChange);

            $controls = $('.mbsc-stepper-control', $parent)
                .on('keydown', onKeyDown)
                .on('keyup', onKeyUp)
                .on('mousedown touchstart', onStart)
                .on('touchmove', onMove)
                .on('touchend touchcancel', onEnd);

            $control.addClass('mbsc-stepper-ready mbsc-control');

            
        };

        that.destroy = function () {
            $control.removeClass('mbsc-control').off('change', onChange);

            $controls
                .off('keydown', onKeyDown)
                .off('keyup', onKeyUp)
                .off('mousedown touchstart', onStart)
                .off('touchmove', onMove)
                .off('touchend touchcancel', onEnd);

            that._destroy();
        };

        that.init(settings);

    };

    mbsc.classes.Stepper.prototype = {
        _class: 'stepper',
        _defaults: {
            min: 0,
            max: 100,
            step: 1
        }
    };

    mbsc.presetShort('stepper', 'Stepper');

    // ---
    // Stepper end


    // Switch
    // ---

    mbsc.classes.Switch = function (elm, settings) {
        var $elm,
            $parent,
            s,
            that = this;

        settings = settings || {};

        $.extend(settings, {
            changeEvent: 'click',
            min: 0,
            max: 1,
            step: 1,
            live: false,
            round: false,
            handle: false,
            highlight: false
        });

        // Call the parent constructor
        mbsc.classes.Slider.call(this, elm, settings, true);

        that._readValue = function () {
            return elm.checked ? 1 : 0;
        };

        that._fillValue = function (v, index, change) {
            $elm.prop('checked', !!v);

            if (change) {
                $elm.trigger('change');
            }
        };

        that._onTap = function (v) {
            that._setVal(v ? 0 : 1);
        };

        that.__onInit = function () {
            s = that.settings;
            $elm = $(elm);
            $parent = $elm.parent();

            $parent.find('.mbsc-switch-track').remove();
            $parent.prepend($elm);

            $elm.attr('data-role', 'switch').after(
                '<span class="mbsc-progress-cont mbsc-switch-track">' +
                '<span class="mbsc-progress-track mbsc-progress-anim">' +
                '<span class="mbsc-slider-handle-cont">' +
                '<span class="mbsc-slider-handle mbsc-switch-handle" data-index="0">' +
                '<span class="mbsc-switch-txt-off">' + s.offText + '</span>' +
                '<span class="mbsc-switch-txt-on">' + s.onText + '</span>' +
                '</span></span></span></span>'
            );

            that._$track = $parent.find('.mbsc-progress-track');
        };

        that.getVal = function () {
            return elm.checked;
        };

        that.setVal = function (val, fill, change) {
            that._setVal(val ? 1 : 0, fill, change);
        };

        that.init(settings);
    };

    mbsc.classes.Switch.prototype = {
        _class: 'switch',
        _css: 'mbsc-switch',
        _hasTheme: true,
        _hasLang: true,
        _defaults: {
            stopProp: true,
            offText: 'Off',
            onText: 'On'
        }
    };

    mbsc.presetShort('switch', 'Switch');

    // Switch end
    // ---

    // Init mbsc-enhance elements on page load
    // ---

    $(function () {

        $('[mbsc-enhance]').each(function () {
            $(this).mobiscroll().form();
        });

        $(document).on('mbsc-enhance', function (ev, settings) {
            if ($(ev.target).is('[mbsc-enhance]')) {
                $(ev.target).mobiscroll().form(settings);
            } else {
                $('[mbsc-enhance]', ev.target).each(function () {
                    $(this).mobiscroll().form(settings);
                });
            }
        });

        $(document).on('mbsc-refresh', function (ev) {
            if ($(ev.target).is('[mbsc-enhance]')) {
                $(ev.target).mobiscroll('refresh');
            } else {
                $('[mbsc-enhance]', ev.target).each(function () {
                    $(this).mobiscroll('refresh');
                });
            }
        });
    });

    // ---
    // Init end

})();
