var SH;
!function (SH) {
    !function (Config) {
        Config.hiResOnPause = !0,
            Config.hiResDelay = 200,
            Config.AFramesOnly = !1,
            Config.isFirefox = !!navigator.userAgent.match(/Firefox/i),
            Config.transitionEasing = 'ease',
            Config.hasTransitions = !0,
            Config.isMobile = $('html').hasClass('mobile'),
            Config.isTablet = $('html').hasClass('tablet'),
            Config.isIE = -1 != navigator.userAgent.indexOf('MSIE') || -1 != navigator.userAgent.toLowerCase().indexOf('trident'),
            Config.showMobileStories = !1;
    }(SH.Config || (SH.Config = {}));
    SH.Config;
}(SH || (SH = {})), Modernizr.hasEvent('touchstart') && (SH.Config.AFramesOnly = !0), $.support.transition || ($.fn.transition = $.fn.animate, SH.Config.transitionEasing = 'swing', SH.Config.hasTransitions = !1);

var SH;
!function (SH) {
    !function (Main) {
        Main.loader, Main.controller, Main.playhead, Main.overlays, Main.scrollbar, Main.nav;
        {
            var DEFAULT_ASSET_VERSION = 'FINAL_W_MOBILE',
                ASSET_VERSION = (location.search.match(/a(?:sset_version)?=([^&]+)/) || [])[1] || DEFAULT_ASSET_VERSION,
                DEFAULT_DEEPLINK = null, QUERYSTRING_DEEPLINK = (location.search.match(/p?=([^&]+)/) || [])[1] || DEFAULT_DEEPLINK,
                hash = location.hash.replace('#', '') || QUERYSTRING_DEEPLINK;
            new SH.Interface.StaticFallback();
        }
        Main.app = new SH.Core.App(ASSET_VERSION, hash), Main.app.stateLoadConfig();
        var videoViewer = new SH.Interface.VideoViewer($('.video-overlay'));
        $('.viewport-inner').on('click', '.video-link', function (e) {
            e.preventDefault();
            var isMobile = SH.Config.isMobile,
                openDirectLinkInMobile = (-1 != navigator.userAgent.toLowerCase().indexOf('android'), !1);
            if (isMobile && openDirectLinkInMobile)
                videoViewer.openVideo($(e.currentTarget).attr('href'));
            else {
                var d;
                videoViewer.currentOverlay ? d = videoViewer.hideVideo() : (d = $.Deferred(), d.resolve()), d.then(function () {
                    var linkElement = $(e.currentTarget);
                    videoViewer.showVideo(linkElement.attr('href'), 'true' == linkElement.attr('data-is-youtube'),
                        parseInt(linkElement.attr('data-video-width')),
                        parseInt(linkElement.attr('data-video-height')),
                        linkElement.attr('data-video-share-parent'));
                });
            }
        }), $('.video-overlay .mask, .video-overlay .close-button').on('click', function (e) {
            e.preventDefault(), videoViewer.hideVideo();
        }), $(Main.app).on('init', function () {
        });
    }(SH.Main || (SH.Main = {}));
    SH.Main;
}(SH || (SH = {})), window.sonyapp = SH.Main.app;