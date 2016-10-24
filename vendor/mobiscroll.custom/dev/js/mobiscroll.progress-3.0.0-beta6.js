/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var empty = function () {},
        mbsc = mobiscroll,
        $ = mbsc.$;

    mbsc.util.addIcon = function ($control, ic) {
        var icons = {},
            $parent = $control.parent(),
            errorMsg = $parent.find('.mbsc-err-msg'),
            align = $control.attr('data-icon-align') || 'left',
            icon = $control.attr('data-icon');

        // Wrap input
        $('<span class="mbsc-input-wrap"></span>').insertAfter($control).append($control);

        if (errorMsg) {
            $parent.find('.mbsc-input-wrap').append(errorMsg);
        }

        if (icon) {
            if (icon.indexOf('{') !== -1) {
                icons = JSON.parse(icon);
            } else {
                icons[align] = icon;
            }
        }

        if (icon || ic) {
            $.extend(icons, ic);

            $parent
                .addClass((icons.right ? 'mbsc-ic-right ' : '') + (icons.left ? ' mbsc-ic-left' : ''))
                .find('.mbsc-input-wrap')
                .append(icons.left ? '<span class="mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' + icons.left + '"></span>' : '')
                .append(icons.right ? '<span class="mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + icons.right + '"></span>' : '');
        }
    };

    mbsc.classes.Progress = function (elm, settings, inherit) {
        var $display,
            $elm,
            $parent,
            $progress,
            $target,
            $track,
            cssClass,
            min,
            max,
            s,
            template,
            value,
            valueText,
            that = this;

        function onChange() {
            var v = getAttr('value', min);
            if (v !== value) {
                updateValue(v);
            }
        }

        function getAttr(attr, def) {
            var v = $elm.attr(attr);
            return v === undefined || v === '' ? def : +v;
        }

        function updateValue(v, refresh, fill, change) {
            v =  Math.min(max, Math.max(v, min));

            $progress.css('width', (v - min) * 100 / (max - min) + '%');

            if (fill === undefined) {
                fill = true;
            }

            if (change === undefined) {
                change = fill;
            }


            if (v !== value || refresh) {
                // Display value
                that._display(v);
            }

            if (v !== value) {
                // Set new value
                value = v;

                // Put new value in the progress element
                if (fill) {
                    $elm.attr('value', value);
                }

                // Trigger change on the element
                if (change) {
                    $elm.trigger('change');
                }
            }
        }

        // Call the parent constructor
        mbsc.classes.Base.call(this, elm, settings, true);

        

        that._onInit = empty;

        that._onDestroy = empty;

        that._display = function (v) {
            valueText = template && s.returnAffix ? template.replace(/\{value\}/, v).replace(/\{max\}/, max) : v;

            if ($target) {
                $target.html(valueText);
            }

            if ($display) {
                $display.html(valueText);
            }
        };

        that._attachChange = function () {
            $elm.on('change', onChange);
        };

        that.init = function (ss) {

            var displayValue,
                i,
                stepLabels,
                wasInit;

            

            that._init(ss);

            s = that.settings;

            $elm = $(elm);

            // check if the element was already initialized
            wasInit = $elm.parent().hasClass('mbsc-input-wrap');

            $parent = that._$parent = wasInit ? $parent : $elm.parent();

            // Read settings from data attributes or settings object
            min = that._min = ss.min === undefined ? getAttr('min', s.min) : ss.min;
            max = that._max = ss.max === undefined ? getAttr('max', s.max) : ss.max;
            value = getAttr('value', min);
            displayValue = $elm.attr('data-val') || s.val;
            stepLabels = $elm.attr('data-step-labels');
            stepLabels = stepLabels ? JSON.parse(stepLabels) : s.stepLabels;
            template = $elm.attr('data-template') || (max == 100 && !s.template ? '{value}%' : s.template);

            if (!wasInit) {
                if (that._wrap) {
                    mbsc.util.addIcon($elm);
                }

                // Generate track and progress
                $parent
                    .find('.mbsc-input-wrap')
                    .append('<span class="mbsc-progress-cont"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-progress-bar"></span></span></span>');

                $progress = that._$progress = $parent.find('.mbsc-progress-bar');
                $track = that._$track = $parent.find('.mbsc-progress-track');
            } else {
                if (displayValue) {
                    $display.remove();
                    $parent.removeClass('mbsc-progress-value-' + (displayValue == 'right' ? 'right' : 'left'));
                }

                if (stepLabels) {
                    $('.mbsc-progress-step-label', $track).remove();
                }
            }

            if (cssClass) {
                $parent.removeClass(cssClass);
            }

            cssClass = that._css + ' mbsc-progress-w mbsc-control-w mbsc-' + s.theme + (s.baseTheme ? ' mbsc-' + s.baseTheme : '') + (s.rtl ? ' mbsc-rtl' : ' mbsc-ltr');

            $parent.addClass(cssClass);

            // Set attributes
            $elm
                .attr('min', min)
                .attr('max', max);

            // Generate value container on left or right side
            if (displayValue) {
                $display = $('<span class="mbsc-progress-value"></span>');
                $parent
                    .addClass('mbsc-progress-value-' + (displayValue == 'right' ? 'right' : 'left'))
                    .find('.mbsc-input-wrap')
                    .append($display);
            }

            // Generate step labels
            if (stepLabels) {
                for (i = 0; i < stepLabels.length; ++i) {
                    $track.append('<span class="mbsc-progress-step-label" style="' + (s.rtl ? 'right' : 'left') + ': ' + (((stepLabels[i] - min) * 100) / (max - min)) + '%" >' + stepLabels[i] + '</span>');
                }
            }

            $target = $($elm.attr('data-target') || s.target);

            that._onInit(ss);

            if (!wasInit) {
                that._attachChange();
            }

            // Show initial value
            that.refresh();

            that.trigger('onInit');
        };

        that.refresh = function () {
            updateValue(getAttr('value', min), true, false);
        };

        that.destroy = function (reInit) {

            that._onDestroy();

            $parent
                .find('.mbsc-progress-cont')
                .remove();

            $parent
                .removeClass(cssClass)
                .find('.mbsc-input-wrap')
                .before($elm)
                .remove();

            $elm
                .removeClass('mbsc-control')
                .off('change', onChange);

            if (!reInit) {
                that._destroy();
            }
        };

        that.getVal = function () {
            return value;
        };

        that.setVal = function (v, fill, change) {
            updateValue(v, true, fill, change);
        };

        if (!inherit) {
            that.init(settings);
        }
    };

    mbsc.classes.Progress.prototype = {
        _class: 'progress',
        _css: 'mbsc-progress',
        _hasTheme: true,
        _hasLang: true,
        _wrap: true,
        _defaults: {
            min: 0,
            max: 100,
            returnAffix: true
        }
    };

    mbsc.presetShort('progress', 'Progress');

})();
