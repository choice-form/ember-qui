/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    var theme,
        found,
        ms = mobiscroll,
        platform = ms.platform,
        themes = ms.themes,
        $ = ms.$;

    if (platform.name == 'android') {
        theme = platform.majorVersion >= 5 ? 'material' : 'android-holo';
    } else if (platform.name == 'ios') {
        theme = 'ios';
    } else if (platform.name == 'wp') {
        theme = 'wp';
    }

    // Check themes
    $.each(themes, function (key, comp) {
        $.each(comp, function (key, settings) {
            // Stop at the first custom theme with the OS base theme
            if (settings.baseTheme == theme && key != 'android-holo-light' && key != 'material-dark' && key != 'wp-light' && key != 'ios-dark') {
                ms.autoTheme = key;
                found = true;
                return false;
            } else if (key == theme) {
                ms.autoTheme = key;
            }
        });

        if (found) {
            return false;
        }
    });

})();
