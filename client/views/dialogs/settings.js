define([
    "Underscore",
    "jQuery",
    "hr/hr",
    "views/dialogs/base",
    "core/user"
], function(_, $, hr, DialogView, user) {

    var DialogSettingsView = DialogView.extend({
        className: "component-dialog component-dialog-settings modal fade",
        defaults: _.extend({}, DialogView.prototype.defaults,{
            dialog: "settings",
            open: true,

        }),
        events: _.extend({}, DialogView.prototype.events,{
            "submit form": "submit"
        }),

        initialize: function(options) {
            DialogSettingsView.__super__.initialize.apply(this, arguments);
            return this;
        },

        finish: function() {
            return DialogSettingsView.__super__.finish.apply(this, arguments);
        },

        /* (event) create box */
        submit: function(e) {
            var that = this;

            if (e != null) {
                e.preventDefault();
                e.stopPropagation();
            }

            var data = {
                "theme":                this.$("select[name='editor_theme']").val(),
                "keyboard":             this.$("select[name='editor_keyboard']").val(),
                "fontsize":             this.$("input[name='editor_fontsize']").val(),
                "printmargincolumn":    this.$("input[name='editor_printmargincolumn']").val(),
                "wraplimitrange":       this.$("input[name='editor_wraplimitrange']").val(),
                "showprintmargin":      this.$("input[name='editor_showprintmargin']").is(":checked"),
                "highlightactiveline":  this.$("input[name='editor_highlightactiveline']").is(":checked"),
                "enablesoftwrap":       this.$("input[name='editor_enablesoftwrap']").is(":checked"),
            };

            user.saveSettings(data).always(function() {
                that.close();
            });
        }
    });

    return DialogSettingsView;
});