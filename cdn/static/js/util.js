/*!
 * jQuery Browser Plugin v0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */

(function(jQuery, window, undefined) {
  "use strict";

  var matched, browser;

  jQuery.uaMatch = function(ua) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
      /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

    var platform_match = /(ipad)/.exec(ua) ||
      /(iphone)/.exec(ua) ||
      /(android)/.exec(ua) ||
      /(windows phone)/.exec(ua) ||
      /(win)/.exec(ua) ||
      /(mac)/.exec(ua) ||
      /(linux)/.exec(ua) ||
      /(cros)/i.exec(ua) || [];

    return {
      browser: match[3] || match[1] || "",
      version: match[2] || "0",
      platform: platform_match[0] || ""
    };
  };

  matched = jQuery.uaMatch(window.navigator.userAgent);
  browser = {};

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (browser.android || browser.ipad || browser.iphone || browser["windows phone"]) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if (browser.cros || browser.mac || browser.linux || browser.win) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if (browser.chrome || browser.opr || browser.safari) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if (browser.rv) {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if (browser.opr) {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if (browser.safari && browser.android) {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  jQuery.browser = browser;
})(jQuery, window);

var Sony = Sony || {};

Sony.util = (function() {
  var $window = $('window'),
    $html = $('html'),
    touch = false,
    theBrowser;

  var init = function() {
    if ($html.hasClass('touch')) {
      touch = true;
    }
    setBrowser();
    setParameterClasses();
  };

  // for some specific use cases
  var setBrowser = function() {
    $html.addClass($.browser.name);
    if ($.browser.webkit) {
      $html.addClass('webkit');
      theBrowser = 'webkit';
    }
    if ($.browser.mozilla) {
      $html.addClass('mozilla');
      theBrowser = 'mozilla';
    }
    if ($.browser.ipad) {
      $html.addClass('ipad');
      theBrowser = 'ipad';
    }
    if ($.browser.iphone) {
      $html.addClass('iphone');
      theBrowser = 'iphone';
    }
    if ($.browser.android) {
      $html.addClass('android');
      theBrowser = 'android';
    }
    if ($.browser.msie) {
      if ($.browser.versionNumber > 8) {
        $html.addClass('ie' + $.browser.versionNumber);
        theBrowser = 'ie' + $.browser.versionNumber;
      }
    }
  };

  var setParameterClasses = function() {
    $html.addClass('hero-' + getParameter('hero'));
    $html.addClass('wide-' + getParameter('wide'));
    $html.addClass('youTubeEmbed-' + getParameter('youTubeEmbed'));
  };

  // http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
  var getParameter = function(param) {
    var pageURL = window.location.search.substring(1),
      urlVariables = pageURL.split('&');

    for (var i = 0; i < urlVariables.length; i++) {
      var parameterName = urlVariables[i].split('=');
      if (parameterName[0] == param) {
        return parameterName[1];
      }
    }
  };

  var getBrowser = function() {
    return theBrowser;
  };

  var isTouch = function() {
    return touch;
  };

  init();

  // make select variables and methods public
  return {
    isTouch: isTouch,
    getBrowser: getBrowser,
    getParameter: getParameter
  };

})();
