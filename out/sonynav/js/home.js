/* scripts-home.js */

/* alerts.js */

var alerts = (function() {
    var $alert,
        $closeBtn,
        alertTitle;

    return {
        init: function() {
            $alert = $('#alert');
            $closeBtn = $alert.find('.close-btn').children('a');
            alertTitle = $alert.find('h1').text();
            buildAlert();
        }
    };

    function buildAlert() {
        if($.cookie(alertTitle) != 'hide') {
            $alert.children('.content').removeClass('visually-hidden');
            $alert.data('origText', $alert.find('.description').html());
            $alert.find('.description').ellipsis();
            $closeBtn.click(function() {
                $alert.children('.content').animate({
                    opacity:0
                    }, 200, function() {
                        $alert.children('.content').slideUp('normal', function() {
                            $alert.removeClass('loaded');
                        });
                });
                $.cookie(alertTitle, 'hide');
                return false;
            });
            $alert.attr('data-size',controler.size);
            $.cookie(alertTitle, 'show');
            $(window).resize(function() {
                if($alert.attr('data-size') != controler.size) {
                    $alert.find('.description').html($alert.data('origText'));
                    if(controler.size != 's') {
                        $alert.find('.description').ellipsis();
                    }
                    $alert.attr('data-size',controler.size);
                }
            });
        };
    }

})();

/* controler.js - modified */

var controler = (function() {
    var $body,
        $nav,
        ie6 = false;

    return {
        ie6: false,
        size: 's',
        windowWidth: $(window).width(),
        init: function() {
            $body = $('body');
            // $search = $('#search').find('#search-input');
            if($('html').hasClass('ie6')) {
                controler.ie6 = true;
            }
            $(window).resize(function() {
                resizeWindow();
            });
            resizeWindow();

            //search.init();
            alerts.init();
            //nav.init();
            //sidenav.init();
            //hero.init();
            //tabs.init();
            //promos.init();
            //footer.init();
        }
    };

    function resizeWindow() {
        controler.windowWidth = $(window).width();

        // If width width is below 600px, switch to the mobile stylesheet
        if(ie6 == false) {
            if(controler.windowWidth < 740) {
                controler.size = 's';
                $body.addClass('s').removeClass('m').removeClass('l');
            }
            else if(controler.windowWidth >= 740 && controler.windowWidth < 960) {
                controler.size = 'm';
                $body.addClass('m').removeClass('s').removeClass('l');
            }
            else if(controler.windowWidth >= 960) {
                controler.size = 'l';
                $body.addClass('l').addClass('m').removeClass('s');
            }
        }
    }

})();

/* menu.js */

Sony.navTrayModule = function(module) {
    var $this = $(module.obj),
         $header = $this.find('.menu-toggle'),
         $menuItem;

    var init = function() {
        bind();
    }

    var bind = function() {
        $header.click(function(e) {
            e.preventDefault();
            toggle();
        });

        if(!Sony.util.isTouch()) {
            $this.hover(
                function() {
                    if(Sony.menu.isHorizontal()) {
                        Sony.menu.activateItem(module.index);
                    }
                },
                function() {
                    if(Sony.menu.isHorizontal()) {
                        Sony.menu.deactivateItem(module.index);
                        close();
                    }
                }
            );
        }
    };

    var toggle = function() {
        if($this.hasClass('open')) {
            close();
        }
        else {
            open();
        }
    };

    var open = function() {
        $this.addClass('open');
        Sony.menu.closeTrays(module.index);
    };

    var close = function() {
        $this.removeClass('open');
    };

    init();

    // make select variables and methods public
    return {
        open: open,
        close: close
    };

};

Sony.menu_func = (function() {
    var $window = $(window),
         $pageWrapperOuter = $('#page-wrapper-outer'),
         $header = $('#sony-header'),
         $menuBtn = $header.find('.btn-menu').find('a'),
         $menu = $header.find('#nav-main-list'),
         $menuItems = $menu.find('li'),
         $menuLinks = $menu.find('a'),
         $navTrayWrapper = $('#nav-trays'),
         $navTrays = $navTrayWrapper.find('.nav-tray'),
         navTrayArray = [],
         horizontalStart = 768,
         horizontal,
         $screen = $('#screen');

    var init = function() {
        checkWidth();
        createModules();
        bind();
    }

    var bind = function() {
        $menuBtn.click(function(e) {
            e.preventDefault();
            toggleSidePanel();
        });

        $screen.click(function(e) {
            if($screen.hasClass('open')) {
                if(!isHorizontal()) {
                    toggleSidePanel();
                }
            }
        });

        $window.resize(function(event) {
            checkWidth();
        });

        // close nav tray if clicked outside
        $(document).click(function(e) {
            if(!$(e.target).closest($menu).length && !$(e.target).closest($navTrayWrapper).length) {
                closeTrays();
            }
        });

        $menuLinks.each(function(i) {
            var $this = $(this),
                 $parent = $this.parent(),
                 target = $this.attr('href');

            if(Sony.util.isTouch()) {
                $this.click(function(e) {
                    e.preventDefault();
                    if($parent.hasClass('active')) {
                        closeTray(i);
                    }
                    else {
                        openTray(target);
                    }
                });
            }
            else {
                $this.click(function(e) {
                    e.preventDefault();
                });

                $this.hover(
                    function() {
                        openTray(target);
                        Sony.search.close();
                    },
                    function() {
                        setTimeout(function() {
                            if(!$parent.hasClass('open')) {
                                closeTray(i);
                            }
                        },100);
                    }
                );
            }
        });
    };

    var checkWidth = function() {
        if($window.width() >= horizontalStart) {
            horizontal = true;
        }
        else {
            horizontal = false;
            if($pageWrapperOuter.hasClass('open')) {
                $pageWrapperOuter.removeClass('open');
            }
        }
    };

    var isHorizontal = function() {
        return horizontal;
    };

    var openTray = function(target) {
        var id = target.replace('#','');

        $navTrays.each(function(i) {
            if($(this).attr('id') == id) {
                navTrayArray[i].open();
                $($menuItems[i]).addClass('active');
            }
        });
    };

    var closeTray = function(index) {
        navTrayArray[index].close();
        $($menuItems[index]).removeClass('active');
    };

    var createModules = function() {
        $navTrays.each(function(i) {
            navTrayArray[i] = new Sony.navTrayModule({obj:this, index:i});
        });
    };

    var toggleSidePanel = function() {
        if($screen.hasClass('open')) {
            $pageWrapperOuter.removeClass('open');
            $screen.removeClass('open');
        }
        else {
            $pageWrapperOuter.addClass('open');
            $screen.addClass('open');
        }
    };

    var closeTrays = function(index) {
        $navTrays.each(function(i) {
            if(i != index) {
                navTrayArray[i].close();
                $($menuItems[i]).removeClass('active');
            }
        });
    };

    var activateItem = function(index) {
        $($menuItems[index]).addClass('open');
    };
    var deactivateItem = function(index) {
        $($menuItems[index]).removeClass('open active');
    };

    init();

    // make select variables and methods public
    return {
        closeTrays: closeTrays,
        activateItem: activateItem,
        deactivateItem: deactivateItem,
        isHorizontal: isHorizontal
    };

});

/* search.js */

Sony.search_func = (function() {
    var $header = $('#sony-header'),
         $search = $header.find('.search'),
         $searchBtn = $search.find('.btn-search').find('a'),
         $inputWrapper = $search.find('.input'),
         $input = $search.find('#nav-search-input'),
         $clearBtn = $search.find('.btn-clear');

    var init = function() {
        bind();
    };

    var bind = function() {
        $searchBtn.click(function(e) {
            e.preventDefault();
            if($search.hasClass('open')) {
                close();
            }
            else {
                open();
            }
        });

        // close nav try if clicked outside
        $(document).click(function(e) {
            if(!$(e.target).closest($search).length) {
                close();
            }
        });

        $input.keyup(function(e) {
            if($input.val() != "") {
                $inputWrapper.addClass('value');
            }
            else {
                $inputWrapper.removeClass('value');
            }
        });

        $clearBtn.click(function(e) {
            e.preventDefault();
            clear();
        });

        $search.submit(function(e) {
            e.preventDefault();
            submitSearch();
        });
    };

    var submitSearch = function() {
        window.open ('http://www.sony.com/search/?st=' + encode($input.val()) + '&submit.x=0&submit.y=0&submit=submit','_parent', false);
    };

    var encode = function(val) {
        return encodeURIComponent(val).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/%20/g, '+');
    };

    var open = function() {
        $search.addClass('open');
        $header.addClass('search-open');
        $input.focus();
    };

    var close = function() {
        $search.removeClass('open');
        $header.removeClass('search-open');
    };

    var clear = function() {
        $input.val('');
        $input.focus();
        $inputWrapper.removeClass('value');
    };

    init();

    // make select variables and methods public
    return {
        close: close
    };

});

var Sony = Sony || {};

$(document).ready(function() {

    controler.init();
    Sony.menu = Sony.menu_func();
    Sony.search = Sony.search_func();

    // Function to check url parameters
    $.urlParam = function(name){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results===null){
           return null;
        }
        else{
           return results[1] || 0;
        }
    };

    /* GEOFILTER */

    // open geofilter panel when page loads
    var cookie_value = $.cookie('geofilter_country');
    var debug_value = $.urlParam('geofilter_debug');

    // Update list of options in the flag pull down if there is another country option
    var country_value = debug_value || cookie_value || 'US';

    // set element variables
    var geowindow = $(window);
    var geobody = $('body');

    var geofilter = $('#geofilter');

    var geoheader = $('#sony-header');
    var geocontent = $('#page-wrapper-outer');
    var geotray = $('#nav-trays');
    var geotrays = geotray.find('.nav-tray');

    // set geofilter offset based on element height
    var geofilteroffset = 0;

    // set var for open/closed state
    var geofilterstate = 1;

    var geonavoffset = geoheader.height();

    // current option show in mini-nav
    var $langcurrentindicator = $('.geofilter-link > a');

    // the dropdown container with options
    var $langdropdown = $('#choose-language');

    // language options within the dropdown
    var $langselectionoption = $('ul li', $langdropdown);

    // current option within the dropdown
    var $langcurrentselection = $('ul li.active', $langdropdown);

    // switch to keep track of open/close state
    var langdropdownstate = 0;

    // Hide the language filter drop down
    var languagefilterhide = function() {
        $langcurrentindicator.css('cursor', 'default');
        $langcurrentindicator.unbind('click');
        $langcurrentindicator.click( function (e) {
            e.preventDefault();
        });
        $langcurrentindicator.off('click');
    };

    if (country_value.toLowerCase() != 'us') {

        // set methods for hiding and showing the geofilter
        var geofiltershow = function() {
            geofilter_html = $.get(
                '/geofilter/' + country_value + '.json',
                function(data, textStatus, xhr) {
                    geofilter.html(data.html);

                    geofilteroffset = geofilter.outerHeight();

                    geofilter.css({
                        'top': -geofilteroffset
                    }).animate({
                        'top': 0
                    }, {
                        queue: false,
                        complete: function() {
                            // force scroll to top
                            geowindow.scrollTop(0);
                            // trigger listener for scrolling
                            geoscroll();
                        }
                    });

                    geocontent.animate({
                        'top': geofilteroffset
                    }, {
                        queue: false
                    });

                    geoheader.animate({
                        'top': geofilteroffset
                    }, {
                        queue: false,
                        complete: function() {
                            geoheader.css({
                                'position': 'absolute',
                                'top': 0
                            });
                            geotrays.css({
                                'position': 'absolute'
                            });
                            georesize();
                        }
                    });

                    // Fire omniture tracking
                    s.linkTrackVars="hier3,eVar18,eVar30,events";
                    s.linkTrackEvents="event20";
                    s.hier3 = data.region_code;
                    s.eVar18="D=pageName";
                    s.eVar30="D=h3";
                    s.events="event20";
                    s.tl(this,'o','geo-filter load');
                }
            )
            .fail( function() {
                languagefilterhide();
            });
        };

        var geofilterhide = function() {
            geotray.css({
                'top': ''
            })

            geotrays.css({
                'position': ''
            });

            geofilter.animate({
                'top': -geofilteroffset
            }, {
                queue: false
            });

            geocontent.animate({
                'top': 0
            }, {
                queue: false,
                complete: function() {
                    geocontent.css({
                        'top': 0
                    });
                }
            });

            geoheader.animate({
                'top': 0
            }, {
                queue: false,
                complete: function() {
                    geoheader.css({
                        'position': '',
                        'top': ''
                    });
                }
            });

            geofilterstate = 0;

            geowindow.off('scroll.geofilter');
            geowindow.off('resize.geofilter');
        };

        var geofilterhidesmooth = function() {
            geotray.css({
                'top': ''
            })

            geotrays.css({
                'position': ''
            });

            geofilter.animate({
                'top': -geofilteroffset
            }, {
                queue: false
            });

            geocontent.animate({
                'top': 0
            }, {
                queue: false,
                complete: function() {
                    geocontent.css({
                        'top': 0
                    });
                }
            });

            geoheader.css({
                'position': '',
                'top': ''
            });

            geofilterstate = 0;

            geowindow.off('scroll.geofilter');
            geowindow.off('resize.geofilter');
        };

        var georesize = function() {
            if (geobody.outerWidth() < 760) {
                geofilteroffset = geofilter.outerHeight();
                geocontent.css({
                    'top': geofilteroffset
                });
                geotray.css({
                    'top': geofilteroffset
                });
                geotrays.css({
                    'position': ''
                });
            }
        };

        // recalculate and reposition elements when the window is resized
        geowindow.on('resize.geofilter', $.throttle(100, function() {
                if (geofilterstate == 1) {
                    georesize();
                }
            })
        );

        // hide geofilter panel if user scrolls beyond bottom edge
        var geoscroll = function() {
            geowindow.on('scroll.geofilter', $.throttle(100, function() {
                    if (geowindow.scrollTop() > geofilteroffset) {
                        geofilterhidesmooth();
                    }
                })
            );
        };

        // hide geofilter panel after 15s
        // setTimeout(geofilterhide, 15000);

        // hide geofilter panel when clicking on X button
        geofilter.on('click', 'a.geo-close', function(e) {
            e.preventDefault();
            geofilterhide();
        });

        // hide geofilter panel if user clicks on US Flag / Sony.com link
        geofilter.on('click', 'a.geofilter-sonydotcomus', function(e) {
            e.preventDefault();
            geofilterhide();
        });

        // hide geofilter panel if user clicks anywhere outside the panel while it is still visible
        // if ( geofilterstate == 1 ) {
        //     content.click( function(e) {
        //         geofilterhide();
        //     });
        // }

        var languagefiltershow = function() {
            $.get(
                '/geofilter/language/' + country_value + '.json',
                function(data, textStatus, xhr) {
                    $langselectionoption.eq(0).after(data.html);
                    $langcurrentindicator.addClass('usable');
                }
            )
            .fail( function() {
                languagefilterhide();
            });
        };

        // methods to open and close the dropdown

        var languagedropdownopen = function() {
            $langdropdown.show();
            langdropdownstate = 1;
        }

        var languagedropdownclose = function() {
            $langdropdown.hide();
            langdropdownstate = 0;
        }

        // open/close drowndown when clicking on indicator in mini-nav
        $langcurrentindicator.click( function(e) {
            e.preventDefault();
            if (langdropdownstate == 0) {
                languagedropdownopen();

                // set omniture vars
                //s.linkTrackVars="hier3,eVar18,eVar30,events";
                //s.linkTrackEvents="event23";
                //s.hier3 = data.region_code;
                //s.eVar18="D=pageName";
                //s.eVar30="D=h3";
                //s.events="event23";
                //s.tl(this,'o','geo-filter drop-down open');
                s.linkTrackVars='events';
                s.linkTrackEvents='event23';
                s.events='event23';
                s.tl(this,'o', 'geo-filter drop-down open',null);
                s.manageVars("clearVars");
                s.linkTrackEvents=s.linkTrackVars=s.events='';
            } else if (langdropdownstate == 1) {
                languagedropdownclose();
            }
        });

        // close dropdown and do nothing when clicking on the active selection
        // other clicks will take the user to new destination
        $langselectionoption.click( function(e) {
            if ($(this).hasClass('active')) {
                e.preventDefault();
                languagedropdownclose();
            }
        });

        geofiltershow();
        languagefiltershow();
    }
    else {
        languagefilterhide();
    }

});

//pinterest
$(document).ready(function() {
    var a = $(".pin-it-button");
    openModal = function(b) {
        window.open(b, "signin", "width=665,height=300");
    };
    a.each(function() {
        var c = $(this),
            b = c.attr("href");
        c.click(function() {
            openModal(b);
            return false
        });
    });
});
