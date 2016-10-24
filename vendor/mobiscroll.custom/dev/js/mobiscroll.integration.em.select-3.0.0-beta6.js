/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    function selectRenderer(element, view, field) {
        var value = view.get('controller.model.' + field);
        element.mobiscroll('setVal', value, true, false);
    }

    function selectReader(element, view, field) {
        var model = view.get('controller.model');
        model.set(field, element.mobiscroll('getVal'));
    }

    mobiscroll.ember.select = function () {
        return Ember.CollectionView.extend({
            tagName: 'select',
            didInsertElement: function () {
                var optObj = {},
                    element = this.$(),
                    that = this,
                    field = this.get('selection');

                function modelChanged() {
                    selectRenderer(element, that, field);
                }

                function selectChanged() {
                    if (field) {
                        selectReader(element, that, field);
                    }
                }

                this._super();

                if (this.options) {
                    optObj = (new Function('controller', 'return ' + this.options))(this.get('controller'));
                }

                Ember.run.scheduleOnce('afterRender', this, function () {
                    var element = this.$(),
                        value;

                    element.mobiscroll().select(optObj);
                    element.mobiscroll('setVal', value, true, false);

                    selectReader(element, this, this.get('selection'));
                });

                element.on('change', selectChanged);

                this.get('controller.model').addObserver(field, this, modelChanged);
                this.addEnumerableObserver(this, {
                    willChange: function () {},
                    didChange: function () {
                        element.mobiscroll('refresh');
                    }
                });
            },
            itemViewClass: Ember.View.extend({
                tagName: 'option',

                value: function () {
                    var path = this.get('_parentView').get('optionValuePath');

                    if (!path) {
                        path = 'content';
                    }

                    return this.get(path);
                }.property('content'),

                label: function () {
                    var path = this.get('_parentView').get('optionLabelPath');

                    if (!path) {
                        path = 'content';
                    }

                    return this.get(path);
                }.property('content'),

                attributeBindings: ['value'],
                template: Ember.Handlebars.compile('{{view.label}}')
            })
        });
    };

    Ember.Handlebars.helper('mobiscroll-select', mobiscroll.ember.select());

})();
