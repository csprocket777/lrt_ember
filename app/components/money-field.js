/**
 * Created by chshipma on 3/13/14.
 */
export default Ember.Component.extend({
    didInsertElement: function(evt){
        var self = this;

        this.$().find('input[type="text"]')
        .keypress(function(evt){
            return self.restrictCharacters( this, evt, self.get('digitsOnly') );
        })
        .autoNumeric();
    },

    digitsOnly: /[1234567890]/g,
    floatOnly: /[0-9\.]/g,
    alphaOnly: /[A-Za-z]/g,

    restrictCharacters: function(myfield, e, restrictionType) {
//        if (!e) var e = window.event

        var code;

        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code);
        // if they pressed esc... remove focus from field...
        if (code===27) { this.blur(); return false; }
        // ignore if they are press other keys
        // strange because code: 39 is the down key AND ' key...
        // and DEL also equals .
        if (!e.ctrlKey && code!==9 && code!==8 && code!==36 && code!==37 && code!==38 && (code!==39 || (code===39 && character==="'")) && code!==40) {
            if (character.match(restrictionType)) {
                return true;
            } else {
                return false;
            }
        }
    }
});