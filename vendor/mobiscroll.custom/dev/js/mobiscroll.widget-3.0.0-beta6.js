/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (undefined) {

    var ms = mobiscroll,
        $ = ms.$,
        classes = ms.classes;

    classes.Widget = function (el, settings, inherit) {

        function addContent($m) {
            

            if (!$('.mbsc-fr-c', $m).hasClass('mbsc-wdg-c')  ) {
                $('.mbsc-fr-c', $m).addClass('mbsc-wdg-c').append($elm.show());

                if (!$('.mbsc-w-p', $m).length) {
                    $('.mbsc-fr-c', $m).addClass('mbsc-w-p');
                }
            }
        }

        var s,
            $parent,
            $prev,
            $elm = $(el),
            that = this;

        // Call the parent constructor
        classes.Frame.call(this, el, settings, true);

        

        that._generateContent = function () {
            return '';
        };

        that._markupReady = function ($m) {
            if (s.display != 'inline') {
                addContent($m);
            }
        };

        that._markupInserted = function ($m) {

            if (s.display == 'inline') {
                addContent($m);
            }

            $m.trigger('mbsc-enhance', [{
                theme: s.theme,
                lang: s.lang
            }]);
        };

        that._markupRemove = function () {
            $elm.hide();

            if ($parent) {
                $parent.prepend($elm);
            } else {
                $prev.after($elm);
            }
        };

        that._processSettings = function () {
            s = that.settings;

            that.buttons.close = {
                text: s.closeText,
                handler: 'cancel'
            };

            that.buttons.ok = {
                text: s.okText,
                handler: 'set'
            };

            s.buttons = s.buttons || (s.display == 'inline' ? [] : ['ok']);
            s.cssClass = (s.cssClass || '') + ' mbsc-wdg';

            if (!$parent && !$prev) {
                $prev = $elm.prev();

                if (!$prev.length) {
                    $parent = $elm.parent();
                }
            }

            $elm.hide();
        };

        // Constructor
        if (!inherit) {
            that.init(settings);
        }
    };

    classes.Widget.prototype = {
        _hasDef: true,
        _hasTheme: true,
        _hasContent: true,
        _class: 'widget',
        _defaults: $.extend({}, classes.Frame.prototype._defaults, {
            okText: 'OK'
        })
    };

    ms.themes.widget = ms.themes.frame;

    ms.presetShort('widget', 'Widget', false);

})();
