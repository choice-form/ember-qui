/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (window, document, undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        extend = $.extend,
        classes = ms.classes;

    classes.MenuStrip = function (e, settings) {
        var $activeItem,
            $cont,
            $firstItem,
            $wnd,
            contWidth,
            hasIcons,
            hasText,
            itemWidth,
            multiple,
            oldWidth,
            posDebounce,
            select,
            selectedClass,
            scrollView,
            style,
            s,
            totalWidth,
            trigger,
            animTime = 1000,
            that = this,
            $elm = $(e);

        function onResize(ev) {
            clearTimeout(posDebounce);
            posDebounce = setTimeout(function () {
                size(ev.type !== 'load');
            }, 200);
        }

        function onItemTap($item, toggle) {
            if (!$item.length) {
                return;
            }

            var bl = $item.offset().left,
                bp = $item[0].offsetLeft,
                bw = $item[0].offsetWidth,
                cl = $cont.offset().left;

            $activeItem = $item;

            if (toggle === undefined) {
                toggle = !multiple;
            }

            if (select && toggle) {
                if (multiple) {
                    if ($item.attr('data-selected')) {
                        deselectItem($item);
                    } else {
                        selectItem($item);
                    }
                } else {
                    deselectItem($('.mbsc-ms-item-sel', $elm));
                    selectItem($item);
                }
            }

            // Scroll item to view
            if (style == 'a') {
                if (bl < cl) {
                    scrollView.scroll(-bp, animTime, true);
                } else if (bl + bw > cl + contWidth) {
                    scrollView.scroll(contWidth - bp - bw, animTime, true);
                }
            } else {
                // Scroll item to center
                scrollView.scroll(contWidth / 2 - bp - bw / 2, animTime, true);
            }

            if (toggle) {
                // Trigger tap event
                trigger('onItemTap', {
                    target: $item[0]
                });
            }
        }

        function selectItem($item) {
            $item.addClass(selectedClass).attr('data-selected', 'true').attr('aria-selected', 'true');
        }

        function deselectItem($item) {
            $item.removeClass(selectedClass).removeAttr('data-selected').removeAttr('aria-selected');
        }

        function getItemByID(item) {
            if (typeof item !== 'object') {
                item = $elm.children('[data-id="' + item + '"]');
            }
            return $(item);
        }

        function initMarkup() {
            trigger('onMarkupInit');

            $elm.children().each(function (i) {
                var content,
                    wrapper,
                    $item = $(this),
                    selected = select && $item.attr('data-selected') == 'true',
                    disabled = $item.attr('data-disabled') == 'true',
                    icon = $item.attr('data-icon');

                if (i === 0) {
                    $firstItem = $item;
                }

                if (select && !multiple && selected) {
                    $activeItem = $item;
                }

                if ($item.children().length !== 1) {
                    $('<span></span>').append($item.contents()).appendTo($item);
                }

                //$item
                //    .addClass('mbsc-ms-item mbsc-btn')
                //    .children().eq(0)
                //    .addClass('mbsc-ms-item-i' + (icon ? ' mbsc-ms-ic mbsc-ic mbsc-ic-' + icon : ''));

                wrapper = $item.children().eq(0);

                if (icon) {
                    hasIcons = true;
                }

                if (wrapper.hasClass('mbsc-ms-item-i')) {
                    return;
                }

                if (wrapper.html()) {
                    hasText = true;
                }

                content = $('<span class="mbsc-ms-item-i-t"><span class="mbsc-ms-item-i-c"></span></span>');

                content
                    .find('.mbsc-ms-item-i-c')
                    .append(wrapper.contents());

                wrapper
                    .addClass('mbsc-ms-item-i' + (icon ? ' mbsc-ms-ic mbsc-ic mbsc-ic-' + icon : ''))
                    .append(content);

                $item
                    .attr('data-role', 'button')
                    .attr('aria-selected', selected ? 'true' : null)
                    .attr('aria-disabled', disabled ? 'true' : null)
                    .addClass('mbsc-ms-item mbsc-btn-e ' + (s.itemClass || '') + (selected ? selectedClass : '') + (disabled ? ' mbsc-btn-d ' + (s.disabledClass || '') : ''));

                
            });

            if (hasIcons) {
                $cont.addClass('mbsc-ms-icons');
            }

            if (hasText) {
                $cont.addClass('mbsc-ms-txt');
            }
        }

        function size(check, noScroll) {
            var w = s.itemWidth,
                layout = s.layout;

            that.contWidth = contWidth = $cont.width();

            if ((check && oldWidth === contWidth) || !contWidth) {
                // Don't do anything if container width has not changed
                return;
            }

            oldWidth = contWidth;

            if (ms.util.isNumeric(layout)) {
                itemWidth = contWidth ? contWidth / layout : w;
                if (itemWidth < w) {
                    layout = 'liquid';
                }
            }

            if (w) {
                if (layout == 'liquid') {
                    // The specified itemWidth will be handled as min width
                    itemWidth = contWidth ? contWidth / Math.min(Math.floor(contWidth / w), $elm.children().length) : w;
                } else if (layout == 'fixed') {
                    // Fixed width
                    itemWidth = w;
                }
            }

            if (itemWidth) {
                $elm.children().css('width', itemWidth + 'px');
            }

            // Remove white scpaces
            $elm.contents().filter(function () {
                return this.nodeType == 3 && !/\S/.test(this.nodeValue);
            }).remove();

            that.totalWidth = totalWidth = $elm.width();

            extend(scrollView.settings, {
                contSize: contWidth,
                maxSnapScroll: s.paging ? 1 : false,
                maxScroll: 0,
                minScroll: totalWidth > contWidth ? contWidth - totalWidth : 0,
                snap: s.paging ? contWidth : (s.snap ? itemWidth || '.mbsc-ms-item' : false),
                elastic: totalWidth > contWidth ? itemWidth || contWidth : false
            });

            // Pass new values to scrollview
            scrollView.refresh(noScroll);
        }

        // Call the parent constructor
        classes.Base.call(this, e, settings, true);

        

        that.navigate = function ($item, toggle) {
            onItemTap(getItemByID($item), toggle);
        };

        that.next = function (toggle) {
            var $next = $activeItem ? $activeItem.next() : $firstItem;
            if ($next.length) {
                $activeItem = $next;
                onItemTap($activeItem, toggle);
            }
        };

        that.prev = function (toggle) {
            var $prev = $activeItem ? $activeItem.prev() : $firstItem;
            if ($prev.length) {
                $activeItem = $prev;
                onItemTap($activeItem, toggle);
            }
        };

        that.select = function ($item) {
            if (!multiple) {
                deselectItem($('.mbsc-ms-item-sel', $elm));
            }
            selectItem(getItemByID($item));
        };

        that.deselect = function ($item) {
            deselectItem(getItemByID($item));
        };

        that.enable = function ($item) {
            getItemByID($item)
                .removeClass('mbsc-btn-d')
                .removeAttr('data-disabled')
                .removeAttr('aria-disabled');
        };

        that.disable = function ($item) {
            getItemByID($item)
                .addClass('mbsc-btn-d')
                .attr('data-disabled', 'true')
                .attr('aria-disabled', 'true');
        };

        /**
         * Recalculates sizes.
         */
        that.refresh = that.position = function (noScroll) {
            $elm.height('');
            initMarkup();
            size(false, noScroll);
            $elm.height($elm.height());
        };

        /**
         * Menustrip initialization.
         */
        that.init = function (ss) {
            var contClass;

            // Prepare settings
            // ---

            that._init(ss);

            // ---

            $wnd = $(s.context == 'body' ? window : s.context);

            if (s.type == 'tabs') {
                s.select = s.select || 'single';
                s.variant = s.variant || 'b';
            } else if (s.type == 'options') {
                s.select = s.select || 'multiple';
                s.variant = s.variant || 'a';
            } else if (s.type == 'menu') {
                s.select = s.select || 'off';
                s.variant = s.variant || 'a';
            }

            if (s.itemWidth && s.snap === undefined) {
                s.snap = true;
            }

            style = s.variant;
            select = s.select != 'off';
            multiple = s.select == 'multiple';
            selectedClass = ' mbsc-ms-item-sel ' + (s.activeClass || '');

            // Add classes and extra markup
            // ---

            contClass = 'mbsc-ms-c' + ' mbsc-ms-' + style + ' mbsc-ms-' + s.display + ' mbsc-' + s.theme + ' ' + (s.baseTheme ? ' mbsc-' + s.baseTheme : '') + ' ' + (s.cssClass || '') + ' ' + (s.wrapperClass || '') + (s.rtl ? ' mbsc-ms-rtl' : ' mbsc-ms-ltr') + (s.itemWidth ? ' mbsc-ms-hasw' : '') + (s.context == 'body' ? '' : ' mbsc-ms-ctx') + (select ? '' : ' mbsc-ms-nosel');

            if (!$cont) {
                $cont = $('<div class="' + contClass + '"><div class="mbsc-ms-sc"></div></div>')
                    .insertAfter($elm);

                $cont
                    .find('.mbsc-ms-sc')
                    .append($elm);

                scrollView = new ms.classes.ScrollView($cont[0], {
                    axis: 'X',
                    contSize: 0,
                    maxScroll: 0,
                    maxSnapScroll: 1,
                    minScroll: 0,
                    snap: 1,
                    elastic: 1,
                    rtl: s.rtl,
                    mousewheel: s.mousewheel,
                    onBtnTap: function (ev) {
                        onItemTap($(ev.target), true);
                    },
                    onGestureStart: function (ev) {
                        trigger('onGestureStart', ev);
                    },
                    onGestureEnd: function (ev) {
                        trigger('onGestureEnd', ev);
                    },
                    onMove: function (ev) {
                        trigger('onMove', ev);
                    },
                    onAnimationStart: function (ev) {
                        trigger('onAnimationStart', ev);
                    },
                    onAnimationEnd: function (ev) {
                        trigger('onAnimationEnd', ev);
                    }
                });
            } else {
                $elm.height('');
                $cont.attr('class', contClass);
            }

            // Prepare markup
            $elm.css('display', '').addClass('mbsc-ms ' + (s.groupClass || ''));

            initMarkup();

            trigger('onMarkupReady', {
                target: $cont[0]
            });

            // Element needs explicit height for equal item heights (height 100% is not working otherwise)
            $elm.height($elm.height());

            // ---

            size();

            // Attach events
            // ---

            // When images are loaded, size migth change
            $cont.find('img').on('load', onResize);

            $wnd.on('orientationchange resize', onResize);

            // ---

            trigger('onInit');
        };

        /**
         * Menustrip destroy
         */
        that.destroy = function () {
            $wnd.off('orientationchange resize', onResize);

            $elm.height('').insertAfter($cont).find('.mbsc-ms-item').width('');

            // $cont.off().remove();
            $cont.remove();

            scrollView.destroy();

            that._destroy();
        };

        // ---


        // Constructor

        s = that.settings;
        trigger = that.trigger;

        that.init(settings);
    };

    // Defaults
    classes.MenuStrip.prototype = {
        _class: 'menustrip',
        _hasDef: true,
        _hasTheme: true,
        _defaults: {
            context: 'body',
            type: 'options',
            display: 'inline',
            layout: 'liquid'
        }
    };

    ms.presetShort('menustrip', 'MenuStrip');

})(window, document);
