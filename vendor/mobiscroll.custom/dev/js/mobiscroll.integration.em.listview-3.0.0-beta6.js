/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {

    mobiscroll.ember.listItemHelper = function () {
        return Ember.View.extend({
            tagName: 'li',
            init: function () {
                this._super();
                var html;
                var tID = this.get('_parentView.templateID');
                var ca = this.dataAttributeBindings = this.get('_parentView.childAttributes');
                html = $('#' + tID).html();
                if (this.getModel().children) {
                    html += '{{#if view.content.children.length}}{{#with view.content.children}}{{mobiscroll-listview templateID="' + tID + '" childAttributes="' + ca + '"}}{{/with}}{{/if}}</li>';
                }
                this.layout = Ember.Handlebars.compile(html);
            },
            layout: function () {},
            didInsertElement: function () {
                var li = this.$();

                // we need to process the attributeBindings string
                var attrs = this.get('dataAttributeBindings');
                if (attrs) {
                    // lets remove multiple spaces and split
                    attrs = attrs.replace(/\s{2,}/g, ' ');
                    if ((attrs = attrs.split(' ')).length) {
                        for (var i = 0; i < attrs.length; i++) { // process the syntax for each bindings
                            var args = attrs[i].split(':'),
                                name = args[0],
                                value = this.get('content.' + name);
                            if (args.length == 2) {
                                name = args[1];
                            }
                            li.attr('data-' + name, value);
                        }
                    }
                }
            },
            getModel: function () {
                return this.get('content'); //this.get('_parentView').get('content').objectAt(this.get('contentIndex'));
            },
            isTopLevel: function () {
                var pv = this.get('parentView');
                if (pv && pv.isTopLevel) {
                    return false;
                }
                return true;
            },
            isInitialized: function () {
                var pv = this.get('parentView');
                return pv.isInitialized();
            }
        });
    };

    mobiscroll.ember.listHelper = function () {
        return Ember.CollectionView.extend({
            tagName: 'ul',
            init: function () {
                this.set('content', this.getModel());
                this._super();
            },
            getModel: function () {
                var pv = this.get('parentView');
                if (pv && pv.getModel) {
                    return pv.getModel().children;
                }
                return this.get('controller.model.' + this.get('value'));
            },
            isInitialized: function () {
                var pv = this.get('parentView');
                if (pv && pv.isInitialized) {
                    return pv.isInitialized();
                }
                return this.get('mobiscrollInitialized');
            },
            isTopLevel: function () {
                var pv = this.get('parentView');
                return !(pv && pv.isTopLevel);
            },
            createChildView: function (viewClass, attrs) {
                return this._super(mobiscroll.ember.listItemHelper(), attrs);
            },
            didInsertElement: function () {
                if (this.isTopLevel()) {
                    Ember.run.scheduleOnce('afterRender', this, function () {
                        var optObj = {};
                        if (this.options) {
                            var fn = 'return ' + this.options;
                            optObj = (new Function('controller', fn))(this.get('controller'));
                        }

                        this.$().mobiscroll().listview(optObj);
                        this.set('mobiscrollInitialized', true);
                    });
                }
            },
            removing: null,
            arrayWillChange: function (content, start, removed) {
                if (this.isInitialized()) {
                    if (removed > 0) {
                        var li = this.$().children('li').not('.mbsc-lv-removing').not('.mbsc-lv-back').slice(start, start + removed);
                        this.removing = {
                            li: li,
                            index: start
                        };
                    }
                }
                return this._super(content, start, removed);
            },
            arrayDidChange: function (content, start, removed, added) {
                if (this.isInitialized()) {
                    if (added > 0) {
                        Ember.run.scheduleOnce('afterRender', this, function () {
                            var root = this.$().closest('.mbsc-lv-cont').find('ul.mbsc-lv-root'),
                                ul = this.$(),
                                p = ul.parent('li');

                            if (ul.hasClass('mbsc-lv-sl-curr')) {
                                var pv = this.get('parentView').$();
                                if (pv.is('li')) {
                                    p = pv;
                                }
                            }

                            for (var i = 0; i < added; i++) {
                                var li = ul.children('li').not('.mbsc-lv-back').eq(start + i); // try children selector
                                root.mobiscroll('add', null, li, false, undefined, p.length ? p : ul);
                            }
                        });
                    } else if (removed > 0) {
                        var saved = this.removing;

                        if (saved) {

                            saved.li.addClass('mbsc-lv-removing');
                            if (saved.index === 0) {
                                this.$().append(saved.li);
                            } else {
                                // ember wraps li's into script tags and we need to put outside of them to prevent removing when multiple removal is in order
                                var prevElement = this.$().children('li').not('.mbsc-lv-removing').not('.mbsc-lv-back').eq(saved.index - 1);
                                var nextEl = prevElement.next();
                                if (nextEl.length && nextEl.is('script') && nextEl.attr('id').indexOf('-end') >= 0) {
                                    nextEl.after(saved.li);
                                } else {
                                    prevElement.after(saved.li);
                                }
                            }
                            var root = this.$().closest('.mbsc-lv-cont').find('ul.mbsc-lv-root');
                            for (var i = 0; i < saved.li.length; i++) {
                                root.mobiscroll('remove', saved.li.eq(i));
                            }
                        }
                    }
                }
                return this._super(content, start, removed, added);
            }
        });
    };

    Ember.Handlebars.helper('mobiscroll-listview', mobiscroll.ember.listHelper());
    Ember.Handlebars.helper('mobiscroll-listitem-helper', mobiscroll.ember.listItemHelper());

})(jQuery);
