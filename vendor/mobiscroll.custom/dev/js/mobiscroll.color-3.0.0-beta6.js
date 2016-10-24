/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    /**
     * Convert rgb color to hex
     */
    function rgb2hex(rgb) {
        var hex = [
            Math.round(rgb.r).toString(16),
            Math.round(rgb.g).toString(16),
            Math.round(rgb.b).toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length == 1) {
                hex[nr] = '0' + val;
            }
        });
        return '#' + hex.join('');
    }

    /**
     * Convert hex color to rgb
     */
    function hex2rgb(hex) {
        hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {
            r: hex >> 16,
            g: (hex & 0x00FF00) >> 8,
            b: (hex & 0x0000FF)
        };
    }

    /**
     * Convert hsv color to rgb
     */
    function hsv2rgb(hsv) {
        var r, g, b,
            h = hsv.h,
            s = hsv.s * 255 / 100,
            v = hsv.v * 255 / 100;

        if (s === 0) {
            r = g = b = v;
        } else {
            var t1 = v,
                t2 = (255 - s) * v / 255,
                t3 = (t1 - t2) * (h % 60) / 60;

            if (h == 360) {
                h = 0;
            }
            if (h < 60) {
                r = t1;
                b = t2;
                g = t2 + t3;
            } else if (h < 120) {
                g = t1;
                b = t2;
                r = t1 - t3;
            } else if (h < 180) {
                g = t1;
                r = t2;
                b = t2 + t3;
            } else if (h < 240) {
                b = t1;
                r = t2;
                g = t1 - t3;
            } else if (h < 300) {
                b = t1;
                g = t2;
                r = t2 + t3;
            } else if (h < 360) {
                r = t1;
                g = t2;
                b = t1 - t3;
            } else {
                r = g = b = 0;
            }
        }
        //return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
        return {
            r: r,
            g: g,
            b: b
        };
    }

    /**
     * Convert rgb color to hsv
     */
    function rgb2hsv(rgb) {
        var h = 0,
            s,
            v,
            min = Math.min(rgb.r, rgb.g, rgb.b),
            max = Math.max(rgb.r, rgb.g, rgb.b),
            delta = max - min;

        v = max;
        s = max ? 255 * delta / max : 0;

        if (s) {
            if (rgb.r == max) {
                h = (rgb.g - rgb.b) / delta;
            } else if (rgb.g == max) {
                h = 2 + (rgb.b - rgb.r) / delta;
            } else {
                h = 4 + (rgb.r - rgb.g) / delta;
            }
        } else {
            h = -1;
        }

        h *= 60;

        if (h < 0) {
            h += 360;
        }

        s *= 100 / 255;
        v *= 100 / 255;

        //return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
        return {
            h: h,
            s: s,
            v: v
        };
    }

    /**
     * Convert hsv color to hex
     */
    function hsv2hex(hsv) {
        return rgb2hex(hsv2rgb(hsv));
    }

    /**
     * Convert hex color to hsv
     */
    function hex2hsv(hex) {
        return rgb2hsv(hex2rgb(hex));
    }

    var mbsc = mobiscroll,
        $ = mbsc.$,
        prefix = mbsc.util.prefix,
        presets = mbsc.presets.scroller,
        defaults = {
            preview: true,
            previewText: true,
            label: 'Color',
            refineLabel: 'Refine',
            step: 10,
            nr: 10,
            format: 'hex', // 'rgb', 'hsv'
            hueText: 'Hue',
            saturationText: 'Saturation',
            valueText: 'Value'
        };

    mbsc.presetShort('color');

    presets.color = function (inst) {

        /**
         * Calculate number rounded to a step
         */
        function step(v, st) {
            return Math.floor(v / st) * st;
        }

        /**
         * Convert value to number
         */
        function toNumber(v) {
            return isNaN(+v) ? 0 : +v;
        }

        /**
         * Format wheel values to color string
         */
        function formatValue(d) {
            if (format == 'hsv') {
                // HSV
                return d.join(',');
            } else if (format == 'rgb') {
                // RGB
                var rgb = hsv2rgb({
                    h: d[0],
                    s: d[1],
                    v: d[2]
                });
                return Math.round(rgb.r) + ',' + Math.round(rgb.g) + ',' + Math.round(rgb.b);
            }
            // HEX
            return hsv2hex({
                h: d[0],
                s: d[1],
                v: d[2]
            });
        }

        /**
         * Generate gradient background to an element
         */
        function genGradient(e, c1, c2) {
            e[0].style.backgroundImage = prefix + (prefix == '-webkit-' ? ('gradient(linear,left top,left bottom,from(' + c1 + '),to(' + c2 + '))') : ('linear-gradient(' + c1 + ',' + c2 + ')'));
        }

        /**
         * Generate the saturation and value gradients
         */
        function genGradients(dw, i) {
            var t = inst._tempWheelArray;

            if (i !== 1 && i !== 2) {
                genGradient($('.mbsc-sc-whl-sc', dw).eq(1), hsv2hex({
                    h: t[0],
                    s: 0,
                    v: 100
                }), hsv2hex({
                    h: t[0],
                    s: 100,
                    v: 100
                }));
            }

            if (i !== 2) {
                genGradient($('.mbsc-sc-whl-sc', dw).eq(2), hsv2hex({
                    h: t[0],
                    s: t[1],
                    v: 0
                }), hsv2hex({
                    h: t[0],
                    s: t[1],
                    v: 100
                }));
            }

            if (preview) {
                // Determine text color
                var rgb = hsv2rgb({
                        h: t[0],
                        s: t[1],
                        v: t[2]
                    }),
                    delta = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;

                $('.mbsc-color-preview', dw)
                    .attr('style', 'background:' + hsv2hex({
                        h: t[0],
                        s: t[1],
                        v: t[2]
                    }) + ';color:' + (delta > 130 ? '#000' : '#fff'))
                    .text(previewText ? formatValue(t) : '');
            }
        }

        /**
         * Generate HSV wheel values and markup
         */
        function genHSVWheels() {
            var i = 0,
                h = {
                    data: [],
                    label: hueText
                },
                s = {
                    circular: false,
                    data: [],
                    label: saturationText
                },
                v = {
                    circular: false,
                    data: [],
                    label: valueText
                };

            for (; i < 360; i += 3) {
                h.data.push({
                    value: i,
                    label: i,
                    display: '<div class="mbsc-color-itm" style="background:' + hsv2hex({
                        h: i,
                        s: 100,
                        v: 100
                    }) + '"><div class="mbsc-color-itm-a"></div></div>'
                });
            }


            for (i = 0; i < 101; i += 1) {
                s.data.push({
                    value: i,
                    label: i,
                    display: '<div class="mbsc-color-itm"><div class="mbsc-color-itm-a"></div></div>'
                });
                v.data.push({
                    value: i,
                    label: i,
                    display: '<div class="mbsc-color-itm"><div class="mbsc-color-itm-a"></div></div>'
                });
            }

            return [
                [h, s, v]
            ];
        }

        // Private variables
        var w,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            colors = $.isArray(s.colors) ? s.colors : [s.colors],
            def = s.defaultValue || colors[0],
            format = s.format,
            preview = s.preview,
            previewText = s.previewText,
            hueText = s.hueText,
            saturationText = s.saturationText,
            valueText = s.valueText;

        // Init
        w = genHSVWheels();

        // Return settings
        return {
            minWidth: 70,
            height: 15,
            rows: 13,
            speedUnit: 0.006,
            timeUnit: 0.05,
            showLabel: true,
            scroll3d: false,
            wheels: w,
            compClass: 'mbsc-color',
            parseValue: function (v) {
                var rgb,
                    hsv;

                v = v || def;
                if (v) {
                    if (format == 'hsv') {
                        v = v.split(',');
                        hsv = {
                            h: toNumber(v[0]),
                            s: toNumber(v[1]),
                            v: toNumber(v[2])
                        };
                    } else if (format == 'rgb') {
                        rgb = v.split(',');
                        hsv = rgb2hsv({
                            r: toNumber(rgb[0]),
                            g: toNumber(rgb[1]),
                            b: toNumber(rgb[2])
                        });
                    } else {
                        v = v.replace('#', '');
                        if (v.length == 3) {
                            v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2];
                        }
                        hsv = hex2hsv(v);
                    }
                    return [step(Math.round(hsv.h), 3), Math.round(hsv.s), Math.round(hsv.v)];
                }
                // Default value
                return [0, 100, 100];
            },
            formatValue: formatValue,
            onBeforeShow: function () {
                if (preview) {
                    // Hide header if color preview is active
                    s.headerText = false;
                }
            },
            onMarkupReady: function (ev) {
                var $markup = $(ev.target);

                if (preview) {
                    $markup.find('.mbsc-sc-whl-gr-c').before('<div class="mbsc-color-preview"></div>');
                }

                genGradients($markup);
            },
            validate: function (data) {
                if (inst._isVisible) {
                    genGradients(inst._markup, data.index);
                }
            }
        };
    };

    // Expose utility functions
    mbsc.util.color = {
        hsv2hex: hsv2hex,
        hsv2rgb: hsv2rgb,
        rgb2hsv: rgb2hsv,
        rgb2hex: rgb2hex,
        hex2rgb: hex2rgb,
        hex2hsv: hex2hsv
    };

})();
