/**
 * Copyright (c) 2010, Nathan Bubna
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Reads key->text pairs from the text of an element(s) with
 * the class "txt-properties" (by default).  These pairs should be
 * specified in properties file format. These messages can
 * then be retrieved by their key for direct use, or displayed
 * in an alert or confirmation popup (either native or jQuery UI Dialog).
 *
 * Practically speaking, this allows me to hide text content
 * like error and validation messages in my HTML and not
 * worry about i18n and other text customization in my
 * javascript files.  Ask for messages by key like this:
 *
 *   var msg = $.txt('conf.delete');  // returns message
 *   $('span.confirm').txt('conf.delete');  // sets message as text
 *   $.txt.ask('conf.delete', function() { // shows message as confirmation popup
 *      $.txt.say('deleted'); // shows 'deleted' message as simple popup
 *   });
 * 
 * Or, if you want to insert data into your messages, do
 * it like this:
 *
 *   var msg = $.txt('conf.buy', 'foo', 2);
 *   $('span.confirm').txt('conf.buy', 'foo', 2);
 *   $.txt.ask('conf.buy', 'foo', 2, function(msg, key, item, qty) {
 *      $.txt.say('bought', item, qty);
 *   });
 *
 * In this case, if your text was "Buy {1} of '{0}'?", then
 * the final message would be "Buy 2 of 'foo'?". You can
 * have as many arguments as you like and use them as many times in
 * the message as you like.
 * 
 * If you are using the SPRINTF plugin and prefer that message style,
 * you can use it by simply replacing the default function:
 *
 *   $.txt.fill = $.vsprintf;
 *
 * The messages to be used are loaded into $.txt.repository
 * when $.txt, $.fn.txt, $.txt.say or $.txt.ask is first called,
 * or you can load them directly by a call to:
 * 
 *   $.txt.load();
 * 
 * You can force (re)loading anytime by calling that method,
 * and you can clear the cache (not recommended) by doing:
 *
 *  $.txt.repository = {};
 *
 * If you want to select the text-pairs-containing element(s)
 * using a different selector than '.txt-properties',
 * then set the following:
 * 
 *   $.txt.load.properties.selector = '#txtProps';
 *
 * You can also manually set pairs using the
 *
 *   $.txt.put(key, value); or $.txt.putAll(source);
 *
 * These both accept an extra boolean parameter saying whether
 * or not the new pair(s) should override existing ones. The
 * default for that is true. These two methods make it easy to 
 * do things like pre-load the repo from a json request:
 *
 *   $(document).ready(function() {
 *     $.getJSON('/myapp/messages.json', function(data) {
 *         // this assumes the json is just a map of key->text pairs
 *         $.txt.putAll(data);
 *     });
 *   });
 *
 * The $.txt.ask and $.txt.say methods serve as more flexible
 * and stylish replacements for alert($.txt('foo')) and confirm($.txt('bar')).
 * These methods both work just like the standard $.txt method, in
 * that they accept a message key (or message), optionally followed
 * by any arguments that need to be filled into the message.  In addition,
 * both of these methods will watch the last argument provided for
 * either a function to be called once 'OK' is clicked, or a hash object
 * containing configuration options.  Here's a few examples:
 *
 *   $.txt.say('someMessageKey');
 *   $.txt.ask('Do you like {0}?', musician, wasLikedFunction);
 *   $.txt.say('Foo!', { modal: false, title: $.txt('foo.title') });
 *   $.txt.ask('conf.purchase', item, function(txt, key, item) {
 *       purchase(item);
 *       $.txt.say('purchased', item);
 *   });
 *   $.txt.say("Click 'OK' To Begin", { native: true, ok: startItFunction });
 *
 * Notice that to provide a callback and custom options, you need to put
 * the callback in the options as "ok".  Also, take note of how the callback
 * is given the message, message key, and fill arguments as parameters when
 * it is finally called.
 *
 * The main options for this plugin and their defaults are:
 *
 *   ok: null, // function to call when user clicks 'OK'
 *   native: false, // force use of alert/confirm even if jQuery UI is available
 *   noEscape: true, // sets closeOnEscape=false and hides titlebar's close button
 *   html: '<div class="txt-dialog-content"></div>' // UI Dialog content holder
 *
 * You can also include any jQuery UI Dialog options and they will be
 * used when appropriate.  To change defaults for all calls, alter these
 * objects:
 *
 *   $.txt.say.options
 *   $.txt.ask.options
 *
 * You can customize the text of the default "OK" and "Cancel" buttons
 * by replacing the default 'txt.button.ok' and 'txt.button.cancel' messages
 * in the repository.  For instance:
 *
 *   $.txt.put('txt.button.ok', "My OK");
 *   $.txt.put('txt.button.cancel', "My Cancel");
 *
 * The default titles for the $.txt.say and $.txt.ask UI Dialogs are also
 * pulled from the repository.  They are under the keys 'txt.say.title' and
 * 'txt.ask.title'.
 *
 * This is a very extensible plugin; enhancements are welcome.
 *
 * @name txt
 * @supports $.ui.dialog
 * @supports $.place
 * @version 1.0
 * @author Nathan Bubna
 */
(function ($) {

    // retrieves and fills text for specified key
    var T = $.txt = function(key) {
        if (T.isEmpty()) {
            T.load();
        }
        var txt = T.get(key);
        if (txt === undefined) txt = key;
        if (arguments.length > 1) {
            return T.fill(txt, Array.prototype.slice.call(arguments, 1));
        }
        return txt;
    },
    // retrieves and fills text for the specified key
    // then sets it to the text() for the current jQuery selection
    F = $.fn.txt = function(key) {
        var txt = T.apply(this, arguments);
        return this.text(txt);
    },
    R = T.repository = {};

    // all that's configurable and extensible...
    $.extend(true, $.txt, {
        // global properties (config per call is irrelevant)
        version: "1.0",
        loadFrom: '.txt-properties',

        // just pulls from the repo, no loading or filling
        get: function(key) {
            return R[key];
        },

        // loads/finds key. if no match, returns null; otherwise does the usual
        find: function(key) {
            var txt = $.txt(key);
            return txt === key ? null : txt;
        },

        // loads the key->text pairs; by default, this uses T.load.properties
        load: function() {
            T.load.properties(R);
        },

        // tests if the repository is empty
        isEmpty: function() {
            for (var k in R) {
                return false;
            }
            return true;
        },

        // puts a new text pair into the repo
        // if the value is not a string, toString() is called on it
        // if an old value is overridden, that is returned, except
        // when noOverride is true and there is already a value,
        // in which case the new one is returned
        put: function(key, value, noOverride) {
            var old = R[key];
            if (noOverride && old) {
                return value;
            }
            R[key] = value.toString();
            return old;
        },

        // puts all key->value pairs of the specified source object/array
        // into the repository and returns true if the repository was changed
        // if noOverride is true, no existing text pairs are overridden
        putAll: function(source, noOverride) {
            var updated = false;
            $.each(source, function(key, value) {
                var ret = T.put(key, value, noOverride);
                if (!updated && ret != value) {
                    updated = true;
                }
            });
            return updated;
        },

        // resets the repository.  passing in a seed repo is optional
        reset: function(repo) {
            R = T.repository = repo || {};
        },

        // fills holes in the text with arguments
        fill: function(txt, args) {
            for (var i=0,m=args.length; i<m; i++) {
                txt = txt.replace(new RegExp('{'+i+'}'), args[i]);
            }
            return txt;
        }
    });

    function fix(props) {
        //log('Fixing: ', props);
        var vals = [], last;
        for (var i=0,m=props.length; i<m; i++) {
            var str = $.trim(props[i]);
            if (i != 0 && last.charAt(last.length - 1) == '\\') {
                last = last.substring(0, last.length-1) + '=' + str;
                vals[vals.length - 1] = last;
            } else if (str != '') {
                last = str;
                vals.push(str);
            }
        }
        return vals;
    }

    // loads key->text pairs from element text in properties format
    var P = T.load.properties = function() {
        var $txtProps = $(T.load.properties.select);
        if ($txtProps.length > 0) {
            var props = $txtProps.text();
            props = fix(props.split('='));
            var keys = [], entries = [];
            keys[0] = props[0];
            for (var i=1,m=props.length-1; i<m; i++) {
                var prop = props[i],
                    space = prop.lastIndexOf(' ');
                if (space > 0 && prop.charAt(space-1) == '\\') {//watch for escaped spaces in keys
                    prop = props[i] = prop.substring(0,space-1)+prop.substring(space);
                    space = prop.lastIndexOf(' ',space-2);
                }
                keys.push(prop.substring(space+1));
                entries.push($.trim(prop.substring(0, space)));
            }
            entries.push(props[props.length - 1]);
            //log('Keys: ',keys, 'Entries:',entries);
            for (var i=0,m=keys.length; i<m ; i++) {
                T.put(keys[i], entries[i]);
            }
        }
    };

    // optional setting identifying a DOM element(s) that
    // contain text pairs in properties file form as their text
    P.select = '.txt-properties';

    // pops up a display of the specified message and calls the specified
    // function after it is closed, once the message is confirmed
    var show = function() {
        // straighten out the options and arguments
        var args = Array.prototype.slice.call(arguments), opts = args[args.length-1];
        if ($.isFunction(opts)) {
            args = args.slice(0, args.length-1);
            opts = { ok: opts };
        } else if (typeof opts != "object") {
            opts = {};
        } 

        // get the text
        var txt = txt = T.apply(this, args);

        // wrap ok into closure to call it like:
        // ok.apply(this, [txt, key, fillArgs..., opts])
        if (opts.ok) {
            var m = opts.ok, f = this;
            opts.ok = function() { m.apply(f, [txt].concat(args)); };
        }

        // choose and call proper display function
        (opts['native'] || this.options['native'] || !$.fn.dialog ? this['native'] : this.dialog)
        .call(this, txt, opts);
        return txt;
    };

    // $.txt.say('msgKey') and $.txt.ask('msgKey')
    // compare to alert($.txt('msgKey')) and confirm($.txt('msgKey'))
    T.say = function() {
        return show.apply(T.say, arguments);
    };
    T.ask = function() {
        return show.apply(T.ask, arguments);
    };

    // define "native" functions used if jQuery UI Dialog is absent
    T.say['native'] = function(txt, opts) {
        alert(txt);
        if (opts.ok) {
            opts.ok();
        }
    };
    T.ask['native'] = function(txt, opts) {
        if (confirm(txt) && opts.ok) {
            opts.ok();
        }
    };

    // define "dialog" functions that use jQuery UI Dialog
    var D = T.say.dialog = function(txt, opts) {
        var o = $.extend({}, this.options, opts);
        if (!o.buttons) {
            o.buttons = {};
            if (this == T.ask) {
                o.buttons[$.txt('txt.button.cancel')] = o._cancel;
            }
            o.buttons[$.txt('txt.button.ok')] = o._ok;
        }
        if (o.noEscape) {
            o.closeOnEscape = false;
        }
        var $d = $(o.html).html(txt).data('txt.ok', o.ok).dialog(o);
        if (o.noEscape) {
            $d.parents('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
        }
    };
    T.ask.dialog = function() { D.apply(this, arguments); };

    // default options (and a few of our own)
    T.say.options = {
        // for UI Dialog
        autoOpen: true,
        dialogClass: 'txt-dialog',
        modal: true,
        width: 400,
        // for Txt
        ok: null,
        'native': false,
        noEscape: true,
        html: '<div class="txt-dialog-content"></div>',
        _ok: function() {
            var $d = $(this), ok = $d.data('txt.ok');
            $d.dialog('destroy').remove();
            if (ok) {
                ok();
            }
        },
        _cancel: function() {
            $(this).dialog('destroy').remove();
        }
    };
    T.ask.options = $.extend({}, T.say.options);

    // wait till document "ready" for the rest of this,
    // so $.ui.dialog needn't be loaded before $.txt
    $(function() {
        if ($.ui && $.ui.dialog) {
            // prepare dialog/repo stuff
            $.txt.put('txt.button.ok', 'OK');
            $.txt.put('txt.button.cancel', 'Cancel');
            $.txt.put('txt.title.say', 'Alert');
            $.txt.put('txt.title.ask', 'Confirm');
            $.txt.load();
            if (!$.txt.say.options.title) {
                $.txt.say.options.title = $.txt.get('txt.title.say');
            }
            if (!$.txt.ask.options.title) {
                $.txt.ask.options.title = $.txt.get('txt.title.ask');
            }

            //FIX: jQuery UI bug #4309 (will be fixed in 1.8)
            //     since this can easily pop-up secondary modal dialogs
            //     http://dev.jqueryui.com/ticket/4309
            if ($.ui.version.indexOf("1.7") == 0) {
                var p = $.ui.dialog.prototype.close;
                $.ui.dialog.prototype.close = function() {
                    p.apply(this, arguments);

                    // adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
                    var self = this;
                    if (self.options.modal) {
                        var maxZ = 0;
                        $('.ui-dialog').each(function() {
                            if (this != self.uiDialog[0]) {
                                maxZ = Math.max(maxZ, $(this).css('z-index'));
                            }
                        });
                        $.ui.dialog.maxZ = maxZ;
                    }            
                };
                var d = $.ui.dialog.overlay.destroy;
                $.ui.dialog.overlay.destroy = function($el) {
                    d.apply(this, arguments);
                    // adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
                    var maxZ = 0;
                    $.each(this.instances, function() {
                            maxZ = Math.max(maxZ, this.css('z-index'));
                    });
                    this.maxZ = maxZ;
                };
            }
        }
    });
})(jQuery);