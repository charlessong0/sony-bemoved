var SH;
!function (SH) {
    !function (Util) {
        function whenAll(ps) {
            return $.when.apply($, ps);
        }
        function zeroPad(d, tpl) {
            return tpl.replace(new RegExp('.{' + ('' + d.toString()).length + '}$'), d.toString());
        }
        function clamp(min, n, max) {
            return Math.max(min, Math.min(n, max));
        }
        Util.whenAll = whenAll, Util.zeroPad = zeroPad, Util.clamp = clamp;
    }(SH.Util || (SH.Util = {}));
    SH.Util;
}(SH || (SH = {})), function () {
    window.console || (window.console = {});
    for (var m = [
        'log',
        'info',
        'warn',
        'error',
        'debug',
        'trace',
        'dir',
        'group',
        'groupCollapsed',
        'groupEnd',
        'time',
        'timeEnd',
        'profile',
        'profileEnd',
        'dirxml',
        'assert',
        'count',
        'markTimeline',
        'timeStamp',
        'clear'
    ], i = 0; i < m.length; i++)
        window.console[m[i]] || (window.console[m[i]] = function () {
        });
}();