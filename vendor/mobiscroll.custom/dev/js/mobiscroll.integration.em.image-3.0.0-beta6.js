/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.image = function () {
        return mobiscroll.ember.getEmberMobiscrollView('image', undefined, undefined, imageTemplate, 'ul');
    };

    Ember.Handlebars.helper('mobiscroll-image', mobiscroll.ember.image());

    function imageTemplate() {
        return {
            layout: Ember.Handlebars.compile('<ul>{{yield}}</ul>')
        };
    }

})();
