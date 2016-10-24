/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.color = function () {
        return mobiscroll.ember.getEmberMobiscrollView('color');
    };

    Ember.Handlebars.helper('mobiscroll-color', mobiscroll.ember.color());

})();
