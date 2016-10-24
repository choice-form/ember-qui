/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
var mobiscroll = mobiscroll || {};

if (!Ember) {
    Function.prototype.property = function () {};
}

var Ember = Ember || {
    Handlebars: {
        helper: function () {},
        compile: function () {}
    },
    View: {
        extend: function () {}
    },
    CollectionView: {
        extend: function () {}
    }
};

(function ($) {
    mobiscroll.ember = {
        formOptions: {},
        preventUpdate: {},
        getEmberMobiscrollView: function (control, renderer, reader, markupTemplate, elementSelector, initExtends, arrayObserve, inherit) {
            var template = markupTemplate || mobiscroll.ember.defaultMarkupTemplate,
                selector = elementSelector === null ? null : (elementSelector || 'input'),
                // control can be a string, the mobiscroll will be initialized with as a preset option
                // OR can be the initialization function called with the element and options as parameters
                generalInitFn = control instanceof Function ? control : mobiscroll.ember.generalInitFn;

            var templ;
            if (markupTemplate && markupTemplate('').layout) {
                templ = {
                    layout: function () {}
                };
            } else {
                templ = {
                    template: function () {}
                };
            }
            return Ember.View.extend(templ, {
                init: function () {
                    //this.extend(template());
                    this._super();
                    var t = template.call(this, this.get('value'), this.get('controller.model'));
                    if (t.template) {
                        this.template = t.template;
                    } else if (t.layout) {
                        this.layout = t.layout;
                    }
                },
                attributeBindings: [],
                options: '',
                value: '',
                didInsertElement: function () {
                    var render = renderer || genericRenderer,
                        read = reader || genericReader,
                        inp = selector === null ? this.$() : this.$().find(selector),
                        // get the initialization object and initialize mobiscroll
                        optObj = {},
                        formID = inherit ? inp.closest('[mbsc-form-opt]').attr('id') : null,
                        inheritedOptions = inherit && formID ? mobiscroll.ember.formOptions[formID] : {};

                    if (this.options) {
                        var fn = 'return ' + this.options;
                        optObj = (new Function('controller', fn))(this.get('controller'));
                    }

                    if (inherit) {
                        optObj = $.extend({}, inheritedOptions, optObj);
                        //console.log('didInsertElement:', optObj);
                    }

                    generalInitFn(inp, optObj, control, initExtends, this);

                    // add handler to the markup change event
                    if (selector !== null) {
                        inp.on('change', elementChange);
                    }
                    // add observer to the model's field to track changes
                    var field = this.get('value');
                    if (field) {
                        if (arrayObserve) {
                            this.observerOptions = {
                                willChange: willChange,
                                didChange: didChange
                            };
                            this.get('controller.model.' + field).addArrayObserver(this, this.observerOptions);
                        } else {
                            this.observerOptions = modelChanged;
                            this.get('controller.model').addObserver(field, this, modelChanged);
                        }
                        // set the first value to mobiscroll
                        render(inp, this, field);
                    }


                    // save the this reference
                    var that = this;

                    function elementChange() {
                        read(inp, that, field);
                    }

                    function modelChanged(observedObj, start, removeCount, addCount) {
                        render(inp, that, field, observedObj, start, removeCount, addCount);
                    }

                    function willChange(observedObj, start, removeCount, addCount) {
                        arrayObserve.willChange(inp, that, field, observedObj, start, removeCount, addCount);
                    }

                    function didChange(observedObj, start, removeCount, addCount) {
                        arrayObserve.didChange(inp, that, field, observedObj, start, removeCount, addCount);
                    }

                },
                willDestroyElement: function () {
                    var field = this.get('value');
                    if (arrayObserve) {
                        this.get('controller.model.' + field).removeArrayObserver(this, this.observerOptions);
                    } else {
                        this.get('controller.model.' + field).removeObserver(this, field, this.observerOptions);
                    }
                }
            });
        },
        defaultMarkupTemplate: function () {
            return {
                template: Ember.Handlebars.compile('<input type="text" />')
            };
        },
        generalInitFn: function (inp, optObj, control, initExtends) {
            $.extend(optObj, {
                preset: control
            }, initExtends);
            inp.mobiscroll(optObj);
        },
        arrayTransformer: function () {
            return DS.Transform.extend({
                //# If the outgoing json is already a valid javascript array
                //# then pass it through untouched. In all other cases, replace it
                //# with an empty array.  This means null or undefined values
                //# automatically become empty arrays when serializing this type.
                serialize: function (jsonData) {
                    if (Ember.typeOf(jsonData) == 'array') {
                        return jsonData;
                    } else {
                        return [];
                    }
                },
                //# If the incoming data is a javascript array, pass it through.
                //# If it is a string, then coerce it into an array by splitting
                //# it on commas and trimming whitespace on each element.
                //# Otherwise pass back an empty array.  This has the effect of
                //# turning all other data types (including nulls and undefined
                //# values) into empty arrays.
                deserialize: function (externalData) {
                    switch (Em.typeOf(externalData)) {
                        case 'array':
                            return externalData;
                        case 'string':
                            return externalData.split(',').map(function (item) {
                                return $.trim(item);
                            });
                        default:
                            return [];
                    }
                }
            });
        }
    };

    function genericReader(element, view) {
        var field = view.get('value');
        var model = view.get('controller.model');
        mobiscroll.ember.preventUpdate[element.attr('id')] = true;
        model.set(field, element.mobiscroll('getVal'));
        delete mobiscroll.ember.preventUpdate[element.attr('id')];
    }

    function genericRenderer(element, view, field) {
        var value = view.get('controller.model.' + field);
        if (!mobiscroll.ember.preventUpdate[element.attr('id')]) {
            element.mobiscroll('setVal', value, true, false);
        }
    }

    mobiscroll.ember.scroller = function () {
        return mobiscroll.ember.getEmberMobiscrollView('scroller');
    };

    Ember.Handlebars.helper('mobiscroll-scroller', mobiscroll.ember.scroller());

})(jQuery);
