// Universal module definition
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser
        root.jsId = factory();
    }
})(this, function() {
    'use strict';

    var generateObjectId = function(n, diff) {
        var a = function(_d) {return _d.getTime() + (_d.getTimezoneOffset() * 60 * 1000);}
        var b = function(_n) {return Math.floor(_n / 1000);}
        var c = function(_n) {return (_n | 0).toString(16);}
        var d = function(_n) {
            var _x = ""; // "xxxxxxxxxxxxxxxx"
            for (var i = 0; i < _n; i++) {_x += "x";}
            return _x.replace(/[x]/g, function() {
                return (Math.random() * 16 | 0).toString(16);
            }).toLowerCase();
        }
        return c(b(a(new Date())+(diff || 0))) + d(n || 0);
    }
    var parseObjectId = function(id) {
        return {
            timestamp: new Date(parseInt(id.substring(0, 8), 16) * 1000),
            hex: id.substring(8)
        }
    }
    var generateUUID4 = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return {
        generate: generateObjectId,
        parse: parseObjectId,
        uuid: generateUUID4
    }
});