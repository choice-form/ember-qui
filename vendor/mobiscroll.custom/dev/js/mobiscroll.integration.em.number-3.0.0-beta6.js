/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.number = function () {
        return mobiscroll.ember.getEmberMobiscrollView('number');
    };

    Ember.Handlebars.helper('mobiscroll-number', mobiscroll.ember.number());

})();
