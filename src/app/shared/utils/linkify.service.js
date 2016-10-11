;(function() {
    'use strict';

    angular
        .module('utils')
        .factory('linkify', linkifyService);

    /* ngInject */
    function linkifyService(Assert) {

        return {
            /**
             * @public
             * @param {String} string
             */
            linkifyString: function(string) {
                Assert.isString(string, 'Invalid "string" type');

                var missNext = false;
                var words = string
                            .replace(/</g, " < ")
                            .replace(/>/g, " > ")
                            .replace(/http/g, " http")
                            .split(' ');
                var exp1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
                var arr = [];
                for (var i = 0, l = words.length; i < l; i++) {
                    if (words[i].indexOf("href") != -1) {
                        missNext = true;
                        arr.push(words[i]);
                    } else if (words[i].indexOf("/a") != -1) {
                        missNext = false;
                        arr.push(words[i]);
                    } else if (words[i].match(exp1) && !missNext) {
                        var elm = '<a target="_blank" href="' + words[i] + '"> ' + words[i] + '</a>'
                        arr.push(elm);
                    } else if (words[i].match(exp2) && !missNext) {
                        var elm = '<a target="_blank" href="http://' + words[i] + '"> ' + words[i] + '</a>'
                        arr.push(elm);
                    } else {
                        arr.push(words[i]);
                    }
                }
                return arr.join(' ').replace(/< /g, "<").replace(/ >/g, ">");
            }
        };
    }
})();