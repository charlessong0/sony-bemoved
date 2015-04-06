var SH;
!function (SH) {
    !function (Interface) {
        var Loader = function () {
            function Loader(el) {
                this.el = el, this.target = 0, this.current = 0, this.events = $({});
            }
            return Loader.prototype.start = function () {
                $(this.el).show(), this.target = 0, this.current = 0;
            }, Loader.prototype.stop = function () {
                $(this.el).hide();
            }, Loader.prototype.incrTarget = function (n) {
                'undefined' == typeof n && (n = 1), this.target += n, this.update();
            }, Loader.prototype.incrLoads = function (n) {
                'undefined' == typeof n && (n = 1), this.current += n, this.update(),
                    this.events.triggerHandler('loadProgress', this.current / this.target);
            }, Loader.prototype.update = function () {
                var p;
                this.target ? (p = Math.round(100 * (this.current / this.target)), p = String(p) + '%') : p = 'Loading…', sodium.text(this.el, p);
            }, Loader;
        }();
        Interface.Loader = Loader;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Interface) {
        var FrameLoadGauge = function () {
            function FrameLoadGauge(el, length) {
                return this.el = el, void (this.length = length);
            }
            return FrameLoadGauge.prototype.setLoading = function (n) {
            }, FrameLoadGauge.prototype.setLoaded = function (n) {
            }, FrameLoadGauge;
        }();
        Interface.FrameLoadGauge = FrameLoadGauge;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Interface) {
        var Viewport = function () {
            function Viewport(aspect, contentElement) {
                this.aspect = aspect, this.el = contentElement, $(window).on('resize', $.proxy(function () {
                    requestAnimationFrame($.proxy(this, 'update'));
                }, this)), requestAnimationFrame($.proxy(this, 'update'));
            }
            return Viewport.prototype.update = function () {
                var w = $(window), ww = w.width(), wh = w.height(), wa = ww / wh, dh = wh, dw = ww, scaleFactor = 1;
                wa > this.aspect ? (dh = ww / this.aspect, $(this.el).css({
                    width: '100%',
                    height: dh,
                    left: 0,
                    top: (wh - dh) / 2
                })) : (dw = wh * this.aspect, $(this.el).css({
                    height: '100%',
                    width: dw,
                    left: (ww - dw) / 2,
                    top: 0
                })), scaleFactor = Math.min(dw / 1280, dh / 720), $(window).trigger('viewportResize', [
                    dw,
                    dh,
                    ww,
                    wh
                ]), $('#viewport-override').text('.viewport-inner article {-webkit-transform: scale(' + scaleFactor + ');-ms-transform: scale(' + scaleFactor + ');-moz-transform: scale(' + scaleFactor + ');-o-transform: scale(' + scaleFactor + ');transform: scale(' + scaleFactor + ');}');
            }, Viewport;
        }();
        Interface.Viewport = Viewport;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Interface) {
        var Scrollbar = function () {
            function Scrollbar(el, playhead) {
                this.offsetInThumb = null, this.trackHeight = null, this.el = $(el), this.thumb = this.el.find('.thumb')[0], this.playhead = playhead, this.bind();
            }
            return Scrollbar.prototype.bind = function () {
                var _this = this;
                this.el.on('click touchstart', function (e) {
                    _this.playhead.playTo(SH.Util.clamp(0, (e.clientY - 15) / ($(window).height() - 30), 0.99999), !1), _this.playhead.start();
                }), $(this.thumb).on('mousedown', $.proxy(this, 'beginDrag'));
            }, Scrollbar.prototype.setProgress = function (p) {
                var _this = this;
                requestAnimationFrame(function () {
                    _this.thumb.style.top = '' + 100 * p + '%';
                });
            }, Scrollbar.prototype.beginDrag = function (e) {
                e.preventDefault(), this.offsetInThumb = e.clientY - $(this.thumb).offset().top, this.trackHeight = this.el.find('.track').height(), $(window).on('mousemove.dragging', $.proxy(this, 'continueDrag')), $('body').add(window).on('mouseup.dragging blur.dragging', $.proxy(this, 'endDrag')), this.playhead.targetFrame = null;
            }, Scrollbar.prototype.continueDrag = function (e) {
                var targetOffset = e.clientY - this.offsetInThumb, percentage = targetOffset / this.trackHeight;
                this.playhead.seekTo(SH.Util.clamp(0, percentage * (this.playhead.length - 1), this.playhead.length - 1));
            }, Scrollbar.prototype.endDrag = function () {
                $(window).add('body').off('.dragging'), this.offsetInThumb = null;
            }, Scrollbar;
        }();
        Interface.Scrollbar = Scrollbar;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Interface) {
        var storyData = {
            S01_STORY_1: {
                title: 'Born photographers give birth to a new camera.',
                copy: '<p>An artistic insight can improve engineering. We realized that with the popularity of camera phones, children have grown up taking photos their entire lives. As they want better quality, they don’t want it in a different device. So we made the smartphone better—by making an attachable, detachable lens–style camera.</p>'
            },
            S01_STORY_2: {
                title: 'Separating camera and phone, we brought artistry and engineering together.',
                copy: '<p>Artists thrive on freedom. Engineers unlock the doors of possibility. By separating the camera from the smartphone, photographers have access to new perspectives that were previously impossible. And with DSLR-like quality, the QX100 Lens-Style Camera ensures those new shots also look spectacular.</p>'
            },
            S02_STORY_1: {
                title: 'Engineered with good taste.',
                copy: '<p>With a bento box, you don’t have to choose from any one dish. Instead, the best dishes are assembled in one container. Likewise, the Xperia Z3v brings the best of Sony together—camera technology from our digital imaging group, screen technology expertise from Bravia TVs, audio from our best speakers and, for the first time ever, the ability to play PS4 games through PS4™ Remote Play on our smartphone. However, please don’t add soy sauce.</p>'
            },
            S03_STORY_3: {
                title: 'Running with music used to seem crazy.',
                copy: '<p>The chairman of Sony in 1978 was a huge opera fan. He asked his team for a way to listen to his favorite music during his frequent business flights. The Walkman was born. Since then we’ve found new and better ways for you to take your music with you, wherever you go—even underwater.</p>'
            },
            S03_STORY_1: {
                title: 'When passions collide, they make a splash. ',
                copy: '<p>The idea for the Sony Walkman® Sports MP3 Player started with a triathlete at Sony who wished he could listen to training music in the pool. It was then handed off to an experienced headphone designer who was also a competitive swimmer. Proof that who we are influences what we make.</p>'
            },
            S03_STORY_2: {
                title: 'Form follows function into the deep end. ',
                copy: '<p>Like sculptors, the designers of the Sony Walkman® Sports MP3 Player took inspiration from nature—the body of the orca. This inspiration resulted in graceful curves that while tough to manufacture were pleasing to the eye. It also produced a product with less drag, allowing it to easily slip through the water.</p>'
            },
            S04_STORY_1: {
                title: 'Designed, engineered, grown, built.',
                copy: '<p>Ask any violinist—an instrument’s quality is in the wood. To build the cabinet for the AR1 Loudspeaker, we headed to Japan’s northernmost island. There, we harvested maples, but only when the weather was coldest and the grain tightest. If it worked for Stradivarius, it should work for us too.</p>'
            },
            S04_STORY_2: {
                title: 'The cabinet is as important as what’s in it. ',
                copy: '<p>Sony engineers asked an artisan to leave an AR1 Loudspeaker prototype unglued for inspection. Later, they were disappointed to find an assembled cabinet apparently fully glued. The artisan smiled and, with a mallet, disassembled it in seconds. It wasn’t glued. It was just so well made it appeared to be.</p>'
            },
            S05_STORY_1: {
                title: 'A 4K TV is only as good as what you’re watching on it.',
                copy: '<p>With this in mind, we created the world’s first 4K-download service available for the 4K Ultra HD TV. From new films shot natively in 4K to classic favorites scanned in 4K from 35mm or 65mm film, nobody offers a bigger library of native 4K movies, TV shows and other short-form content.</p>'
            },
            S06_STORY_1: {
                title: 'Revolutions in 3D can start in 2D.',
                copy: '<p>The birth of the Personal 3D Viewer started with a sketch. Our engineers first turned to a designer, a master at drawing. His freehand studies were composed of graceful organic curves, like a futuristic spaceship. His visionary sketches inspired the engineers to build a device as advanced as it looked.</p>'
            },
            S07_STORY_1: {
                title: 'Small enough to smile at.',
                copy: '<p>A Sony product designer believed that a photo should not just reproduce the subject but capture its heart. He found that when he took a photo with a huge camera, subjects would tense up. So he challenged himself to make a smaller, friendlier camera with performance equal to a larger one—the RX1R Premium Compact Camera.</p>'
            },
            S08_STORY_2: {
                title: 'Its best angle is every angle. ',
                copy: '<p>When engineering the PS4, technical concerns like user interface and cooling functions were crucial. Equally important was making a simple, artistic object for the living room. That’s why the PS4 has been designed from every angle. It’s beautiful horizontally, vertically and even from behind.</p>'
            },
            S08_STORY_1: {
                title: 'Making a better world, literally.',
                copy: '<p>Artists imagine new worlds. Engineers bring them to life. DriveClub is a new driving game that takes realism to the next level. Every location is precise down to the angle of light. Flora is detailed to the species. The cars are made of a staggering 250,000 polygons. So the feeling of driving is as real as the world created.</p>'
            },
            S10_STORY_1: {
                title: 'Sound that will blow you away.',
                copy: '<p>From the ricochet of a bullet as it lodges in the chassis of an armored personnel carrier to the splintering of a door frame under the explosive weight of a breaching charge—war movies are a cacophony of drama and complexity. So, in order to let you experience them in the most incredible way possible, we developed our new soundbar with engineers who design sound for award-winning movies.</p>'
            }
        }, storyCache = {}, openStory = null, Story = function () {
            function Story(idString, el) {
                var _this = this;
                this.visible = !1, this.expanded = !1, this.inProgress = !1, this.lastState = -1, this.id = idString, this.el = el, this.$el = $(this.el), this.$el.find('.hotspot').on('click', function (e) {
                    e.preventDefault(), _this.visible ? _this.hide() : _this.show();
                }).css({ cursor: 'pointer' });
            }
            return Story.getStory = function (id) {
                if ('undefined' == typeof storyCache[id]) {
                    var el, data = storyData[id];
                    if (data) {
                        var tpl = document.getElementById('story-template');
                        el = $(tpl).clone().attr({ id: id })[0];
                        var $el = $(el);
                        $el.find('header h1').html(data.title), $el.find('.content').html(data.copy), tpl.parentNode.appendChild(el), storyCache[id] = new Story(id, el);
                    } else
                        el = document.getElementById(id), storyCache[id] = el && $(el).hasClass('story') ? new Story(id, el) : null;
                }
                return storyCache[id];
            }, Story.prototype.setState = function (n) {
                if (this.el) {
                    var inOut = '';
                    inOut = n > this.lastState ? 'state_entry' : 'state_exit';
                    var newClassName = this.el.className.replace(/state_[\w\d]+/g, ' ') + ' ' + inOut + ' ';
                    this.el.className = (newClassName + 'state_' + n).replace(/\s+/g, ' '), this.lastState = n;
                }
            }, Story.prototype.show = function () {
                var _this = this;
                if (openStory && openStory.hide(), openStory = this, !this.visible) {
                    var el = this.$el, header = el.find('header'), content = el.find('.content'), line = el.find('hr.head');
                    requestAnimationFrame(function () {
                        _.each([
                            header,
                            content,
                            line
                        ], function (el) {
                            el[0].style.display = 'block';
                        }), header.height(header.find('h1').height()), content.css({ opacity: 0 }), header.find('h1').stop(!0).transition({ top: '0%' }, 200, 'linear', function () {
                            _this.visible && el.find('.content,.more').stop(!0).transition({ opacity: 1 }, 200);
                        }), el.find('hr.head').stop(!0).transition({ width: '100%' }, 200);
                    }), this.visible = !0, el.addClass('open');
                }
            }, Story.prototype.hide = function () {
                var _this = this;
                if (this.visible) {
                    var el = this.$el, header = el.find('header');
                    requestAnimationFrame(function () {
                        header.height(header.show().find('h1').height()), header.find('h1').stop(!0).transition({ top: '-100%' }, 200, function () {
                            _this.visible || header.hide();
                        }), el.find('hr.head').stop(!0).transition({ width: '0%' }, 200, function () {
                            _this.visible || el.find('hr.head').transition({ display: 'none' }, 0);
                        }), el.find('.content,.more').stop(!0, !0).transition({ opacity: 0 }, 200, function () {
                            _this.visible || el.find('hr.head').transition({ display: 'none' }, 0);
                        });
                    }), this.visible = !1, el.removeClass('open');
                }
            }, Story.prototype.expand = function () {
                this.expanded = !0;
            }, Story.prototype.unexpand = function () {
                this.expanded = !1;
            }, Story.prototype.toggleExpanded = function () {
                this.expanded ? this.unexpand() : this.expand();
            }, Story;
        }();
        Interface.Story = Story;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Interface) {
        var MobilePopup = function () {
            function MobilePopup(templateElement) {
                this.templateElement = $(templateElement);
            }
            return MobilePopup.prototype.showContent = function (content) {
                var _this = this;
                return this.currentOverlay ? void this.dismiss().then(function () {
                    _this.showContent(content);
                }) : (this.currentOverlay = this.templateElement.clone().appendTo('body'), this.currentOverlay.find('.content').html(content.clone().show()), this.currentOverlay.css({ opacity: 0 }).show().transition({ opacity: 1 }), this.bindCurrentOverlay(), void 0);
            }, MobilePopup.prototype.bindCurrentOverlay = function () {
                var _this = this;
                this.currentOverlay.on('click', function (e) {
                    e.preventDefault(), e.stopPropagation(), _this.dismiss();
                });
            }, MobilePopup.prototype.dismiss = function () {
                var _this = this, d = $.Deferred();
                return this.currentOverlay ? this.currentOverlay.transition({ opacity: 0 }, function () {
                    _this.currentOverlay.remove(), _this.currentOverlay = null, d.resolve();
                }) : d.resolve(), d;
            }, MobilePopup;
        }();
        Interface.MobilePopup = MobilePopup;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Interface) {
        function getPoster(id) {
            var lookup = posterCache[id];
            if (lookup)
                return lookup;
            var cls = Poster;
            SH.Config.isMobile && (cls = MobilePoster);
            var el = document.getElementById(id);
            return el.className.match(/poster( |$)/) ? (posterCache[id] = new cls(el), posterCache[id]) : null;
        }
        var Poster = function () {
            function Poster(el) {
                this.el = $(el);
            }
            return Poster;
        }();
        Interface.Poster = Poster;
        var mobilePopup = new SH.Interface.MobilePopup($('.text-overlay')), MobilePoster = function () {
            function MobilePoster(el) {
                this.el = $(el), this.init();
            }
            return MobilePoster.prototype.init = function () {
                this.popupContent = this.el.find('.popup').hide(), this.popupLink = $('<a href=\'#\' class=\'popup-link\'>Read the Story</a>'), this.popupContent.after($('<p></p>').append(this.popupLink)), this.bind();
            }, MobilePoster.prototype.bind = function () {
                var self = this;
                this.popupLink.on('click', function (e) {
                    e.preventDefault(), e.stopPropagation(), self.showPopup();
                });
            }, MobilePoster.prototype.showPopup = function () {
                var content = this.popupContent.clone();
                mobilePopup.showContent(content);
            }, MobilePoster;
        }();
        Interface.MobilePoster = MobilePoster;
        var posterCache = {};
        Interface.getPoster = getPoster;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Interface) {
        function appendOrCreate(obj, key, val) {
            obj[key] ? obj[key].push(val) : obj[key] = [val];
        }
        function inOrder(l, m, h) {
            return m >= l && h >= m;
        }
        var Overlays = function () {
            function Overlays(overlayData, sections, offset) {
                'undefined' == typeof offset && (offset = 0);
                var _this = this;
                this.objectBounds = {}, this.visibleObjects = {}, this.appStoreEnabled = !1, this.appStorePosterID = 'S02_POSTER', this.areAppStoreIconsActive = !1;
                var frameIndex = this.frameIndex = {};
                _.each(overlayData, function (frameData, objectId) {
                    var minFrame = 1 / 0, maxFrame = -1 / 0;
                    _.each(frameData, function (coords, frameNumString) {
                        minFrame = Math.min(+frameNumString, minFrame), maxFrame = Math.max(+frameNumString, maxFrame), appendOrCreate(frameIndex, frameNumString, objectId);
                    });
                    var posterFrame;
                    _.each(sections, function (s) {
                        s[2] >= minFrame && s[2] <= maxFrame && (posterFrame = s[2]);
                    }), _this.objectBounds[objectId] = {
                        start: minFrame,
                        end: maxFrame,
                        posterFrame: posterFrame,
                        startToPoster: posterFrame - minFrame
                    };
                }), this.overlayData = overlayData, this.offset = offset, SH.Config.isTablet && $('.roll_over_txt').css('display', 'none');
            }
            return Overlays.setCoords = function (el, xy) {
                var x = xy[0], y = xy[1];
                el.style.display = 'block';
                var $el = $(el);
                $el.hasClass('poster') || ($el.hasClass('headline') ? y -= 0.25 : $el.hasClass('product-name') && (y -= 0.5));
                var xAnchor = $el.hasClass('left') ? 'right' : 'left', nonAnchor = 'right' == xAnchor ? 'left' : 'right';
                el.style[xAnchor] = '' + 100 * x + '%', el.style[nonAnchor] = 'auto', el.style.top = '' + 100 * y + '%';
            }, Overlays.prototype.setProgress = function (f) {
                var _this = this;
                f -= this.offset;
                var currentObjects = this.frameIndex['' + f] || [], currentObjectsObject = {};
                _.each(currentObjects, function (idString) {
                    var coords = _this.overlayData[idString][f], bounds = _this.objectBounds[idString], story = SH.Interface.Story.getStory(idString);
                    if (!story && idString.match(/POSTER$/i))
                        var poster = SH.Interface.getPoster(idString);
                    var el, fromMin = f - bounds.start, fromMax = bounds.end - f;
                    if (el = story && story.el || poster && poster.el[0] || document.getElementById(idString)) {
                        if (story) {
                            if (SH.Config.isMobile && !SH.Config.showMobileStories)
                                return;
                            story.setState(inOrder(0, fromMin, 13) ? fromMin : inOrder(0, fromMax, 13) ? fromMax : 999), (0 >= fromMin || 0 >= fromMax) && story.hide();
                        } else if (el.className.match('headline')) {
                            var leading = 3 * (Math.max(0, bounds.posterFrame - f) / bounds.startToPoster) + 1.2;
                            el.style.lineHeight = leading;
                        }
                        _this.visibleObjects[idString] = !0, currentObjectsObject[idString] = !0, _this.appStoreEnabled ? idString == _this.appStorePosterID && (f == _this.objectBounds[_this.appStorePosterID].posterFrame ? _this.areAppStoreIconsActive || ($('.appstore_video_link').on('mouseenter', $.proxy(_this, 'onAppStoreIconMouseOver')), $('.appstore_video_link').on('mouseleave', $.proxy(_this, 'onAppStoreIconMouseOut')), $('#S02_IMAGE_OVERLAY').css('display', 'block'), $('.appstore_icons').css('opacity', 1), _this.updateSelectedIcon(''), _this.areAppStoreIconsActive = !0) : _this.areAppStoreIconsActive && ($('.appstore_video_link').off('mouseenter', $.proxy(_this, 'onAppStoreIconMouseOver')), $('.appstore_video_link').off('mouseleave', $.proxy(_this, 'onAppStoreIconMouseOut')), $('.appstore_icon').removeClass('mouse_over'), $('.appstore_icons').css('opacity', 0.5), $('#S02_IMAGE_OVERLAY').css('display', 'none'), $('.appstore_title').empty(), $('.appstore_desc').empty(), _this.areAppStoreIconsActive = !1)) : $('.appstore_block').hide(), requestAnimationFrame(function () {
                            var el = document.getElementById(idString);
                            el && Overlays.setCoords(el, coords);
                        });
                    }
                }), _.each(_.keys(this.visibleObjects), function (idString) {
                    currentObjectsObject[idString] || (delete _this.visibleObjects[idString], requestAnimationFrame(function () {
                        var el = document.getElementById(idString);
                        el && (el.style.display = 'none');
                    }));
                });
            }, Overlays.prototype.onAppStoreIconClick = function (ev) {
                return this.areAppStoreIconsActive ? void 0 : (ev.preventDefault(), !1);
            }, Overlays.prototype.updateSelectedIcon = function (iconID) {
                '' == iconID && (iconID = 'appstore_goldie'), $('.appstore_icon').removeClass('mouse_over'), $('.appstore_title').empty(), $('.appstore_desc').empty(), $('#appstore_image').hide(), $('#appstore_image').removeClass();
                var title = '', desc = '';
                switch (iconID) {
                    case 'appstore_goldie':
                        title = 'GOLDIE', desc = 'Save a fishy friend by dunking him in water.';
                        break;
                    case 'appstore_umbrella':
                        title = 'TINY UMBRELLA', desc = 'Stay dry in the rain or do your best to try.';
                        break;
                    case 'appstore_sub':
                        title = 'SINK SUNK', desc = 'Pilot your very own submarine in your sink.';
                        break;
                    case 'appstore_photo':
                        title = 'PHOTO LAB', desc = 'Process your photos the old-school way.';
                        break;
                    case 'appstore_plantimal':
                        title = 'PLANTIMAL', desc = 'Grow a mutant creature by watering it every day.';
                        break;
                    case 'appstore_showeroke':
                        title = 'RAINY-OKE', desc = 'Sing in the rain without forgetting the lyrics.';
                }
                $('#' + iconID).addClass('mouse_over'), '' != title && (desc = ' &mdash; ' + desc), $('.appstore_title').html(title), $('.appstore_desc').html(desc), $('#appstore_image').addClass(iconID), $('#appstore_image').show();
            }, Overlays.prototype.onAppStoreIconMouseOver = function (ev) {
                var iconDiv = $(ev.currentTarget).find('.appstore_icon'), iconID = iconDiv[0].id;
                this.updateSelectedIcon(iconID);
            }, Overlays.prototype.onAppStoreIconMouseOut = function (ev) {
                $(ev.currentTarget).find('.appstore_icon');
                this.updateSelectedIcon('');
            }, Overlays;
        }();
        Interface.Overlays = Overlays;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Interface) {
        var LocalNav = function () {
            function LocalNav(el, playhead, sections, offset, navColors) {
                'undefined' == typeof offset && (offset = 0), 'undefined' == typeof navColors && (navColors = null);
                var _this = this;
                this.queued = !1, this.lastProgress = null, this.downButtonTimer = null, this.displayed = !1, this.displayAt = 0, this.el = $(el), this.downButton = this.el.find('.scroll-down'), this.playhead = playhead, this.offset = offset, this.sections = sections, this.navColors = navColors, this.navColorsOverride = document.getElementById('nav-override'), this.scrollThumb = $('.scrollbar .thumb')[0], this.redrawFuncMemo = function () {
                    _this.redraw();
                }, this.displayAt = sections[0][2] + offset, this.createItems();
            }
            return LocalNav.createNavItem = function (slug, idx, label) {
                'undefined' == typeof label && (label = null);
                var li = $('<li><a href=\'#' + slug + '\'>' + (label ? '<span>' + label + '</span>' : '') + '</a></li>');
                return li.find('a').attr('data-index', idx), li;
            }, LocalNav.prototype.createItems = function () {
                var ul = this.el.find('ul');
                _.each(this.sections, function (el, idx) {
                    if (el[0] || !idx) {
                        var item = LocalNav.createNavItem(el[0], idx, el[4]);
                        ul.append(item);
                    }
                }), this.items = this.el.find('ul li'), this.bind();
            }, LocalNav.prototype.bind = function () {
                var _this = this;
                this.items.on('click touchend', 'a', function (e) {
                    e.preventDefault(), e.stopPropagation();
                    var i = +$(e.currentTarget).attr('data-index');
                    _this.playhead.playTo(_this.sections[i][2] + _this.offset, !1), _this.playhead.start();
                }), Modernizr.hasEvent('touchend') && this.items.find('span').remove();
            }, LocalNav.prototype.setProgress = function (f) {
                this.lastProgress = f - this.offset, this.queued || (this.queued = !0, requestAnimationFrame(this.redrawFuncMemo));
            }, LocalNav.prototype.showDownButton = function () {
                var _this = this;
                requestAnimationFrame(function () {
                    _this.downButton.stop(!0).show(), SH.Config.isMobile ? _this.downButton.css({ opacity: 1 }) : _this.downButton.transition({ opacity: 1 });
                });
            }, LocalNav.prototype.resetDownButtonTimer = function () {
                this.stopDownButtonTimer(), this.downButtonTimer = setTimeout($.proxy(this, 'showDownButton'), 200);
            }, LocalNav.prototype.stopDownButtonTimer = function () {
                var _this = this;
                clearTimeout(this.downButtonTimer), this.downButtonTimer = null, requestAnimationFrame(function () {
                    _this.downButton.stop(!0), SH.Config.isMobile ? _this.downButton.css({ opacity: 0 }) : _this.downButton.transition({ opacity: 0 });
                });
            }, LocalNav.prototype.hide = function () {
                var _this = this;
                requestAnimationFrame(function () {
                    _this.el[0].style.marginRight = '-100px', _this.el[0].style.opacity = '0';
                });
            }, LocalNav.prototype.show = function () {
                var _this = this;
                requestAnimationFrame(function () {
                    _this.el.show().transition({
                        marginRight: 0,
                        opacity: 1
                    });
                });
            }, LocalNav.prototype.redraw = function () {
                this.queued = !1;
                var f = this.lastProgress;
                0 > f && (f = 0), !this.displayed && f + this.offset >= this.displayAt && (this.show(), this.displayed = !0);
                var idx, prev = this.sections[0], curr = this.sections[0], prevIdx = 0, lengthOfFrames = this.sections.length;
                for (idx = 1; lengthOfFrames > idx && (curr = this.sections[idx], !(f <= prev[2])); idx++)
                    prev = curr, prevIdx = idx;
                for (var c = this.navColors[f] || '#81C9DF', i = 0, l = this.items.length; l > i; i++) {
                    var isCurrent = i == prevIdx, it = this.items[i], it_ = it.firstChild;
                    it_.style.borderColor = c, it_.style.color = c, it_.style.background = isCurrent ? c : 'rgba(255,255,255,0.01)', it.className = isCurrent ? 'current' : '';
                }
                this.scrollThumb.style.backgroundColor = c || '#333', f == prev[2] && f < this.playhead.length - 1 - this.offset ? (f > 10 && 40 > f && (c = 'black'), this.downButton[0].style.color = c || 'white', this.downButton[0].style.borderColor = c || 'white', this.resetDownButtonTimer()) : this.stopDownButtonTimer();
            }, LocalNav;
        }();
        Interface.LocalNav = LocalNav;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Interface) {
        var Intro = function () {
            function Intro(offset) {
                'undefined' == typeof offset && (offset = 0), this.progressCallback = null, this.position = -1, this.kfIdx = 0, this.buttonVisible = !0, this.length = 40, this.offset = offset, this.preloadPoster = $('#preloader')[0], this.globalNav = $('#sonynav')[0], this.keyFrames = [0];
            }
            return Intro.prototype.setProgressCallback = function (fun) {
                this.progressCallback = fun;
            }, Intro.prototype.calculateCurrentFrame = function () {
                return 0;
            }, Intro.prototype.renderCurrentFrame = function (silent) {
                var _this = this;
                return 'undefined' == typeof silent && (silent = !1), !silent && this.progressCallback && this.position < this.offset && this.progressCallback(this.position / this.length, this.position, this.length), requestAnimationFrame(function () {
                    _this.buttonVisible && _this.position > _this.offset && ($(_this.preloadPoster).find('.scroll-down').transition({ opacity: 0 }, 400, function () {
                        $(_this.preloadPoster).find('.scroll-down').hide();
                    }), _this.buttonVisible = !1), _this.preloadPoster.style.top = -5 * (_this.position - _this.offset) + '%', _this.globalNav.style.top = '-' + 5 * _this.position + '%';
                }), null;
            }, Intro.prototype.seekTo = function (n, silent) {
                'undefined' == typeof silent && (silent = !1), this.kfIdx = _.indexOf(this.keyFrames, n) + 1, this.position = Math.round(Math.max(0, n)), this.renderCurrentFrame(silent);
            }, Intro.prototype.nextKeyFrame = function () {
                return void 0;
            }, Intro.prototype.prevKeyFrame = function () {
                return 0;
            }, Intro.prototype.upscale = function () {
            }, Intro.prototype.load = function () {
                return $.Deferred();
            }, Intro;
        }();
        Interface.Intro = Intro;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Interface) {
        var fade = { opacity: 1 }, center = {
            top: 0,
            left: 0
        }, comp = function () {
            for (var objects = [], _i = 0; _i < arguments.length - 0; _i++)
                objects[_i] = arguments[_i + 0];
            return objects.unshift({}), _.extend.apply(_, objects);
        }, fc = comp(fade, center), PreloadAnimation = function () {
            function PreloadAnimation(el, hash) {
                this.el = el, this.hash = hash, this.queue = $.Deferred(), this.keyFrames = [
                    [
                        0,
                        '.artists-engineers',
                        fade
                    ],
                    [
                        0.2,
                        '#intro-text-3',
                        fc
                    ],
                    [
                        0.4,
                        '#intro-text-4',
                        fc
                    ],
                    [
                        0.6,
                        '#intro-text-5',
                        fc
                    ],
                    [
                        0.8,
                        '#intro-p-6-7',
                        fc
                    ],
                    [
                        0.9,
                        '.be-moved',
                        fc
                    ],
                    [
                        0.95,
                        '.sony',
                        fade
                    ],
                    [
                        1,
                        '#intro-scroll-button button',
                        comp(fade, { bottom: 0 })
                    ]
                ], this.keyFramesRun = {}, this.animationComplete = $.Deferred(), this.transitionTime = 600, this.delayTime = 400, location.search.match(/SPEEDY/) && (this.transitionTime = 0, this.delayTime = 0), el.addClass('pre-animation-state'), el.show(), this.queue.resolve();
            }
            return PreloadAnimation.prototype.queueAnimation = function (fun) {
                this.queue = this.queue.then(function () {
                    var d = $.Deferred();
                    return fun(d), d;
                });
            }, PreloadAnimation.prototype.advanceTo = function (progress) {
                var _this = this;
                _.each(this.keyFrames, function (frame) {
                    _this.keyFramesRun[frame[0]] || progress >= frame[0] && (_this.queueAnimation(function (d) {
                        _this.el.find(frame[1]).transition(frame[2], _this.transitionTime, SH.Config.transitionEasing, function () {
                            setTimeout(function () {
                                d.resolve(), frame[0] >= 1 && _this.animationComplete.resolve();
                            }, frame[0] >= 1 ? 0 : _this.delayTime);
                        });
                    }), _this.keyFramesRun[frame[0]] = !0);
                });
            }, PreloadAnimation.prototype.loadElements = function () {
                return SH.Util.whenAll(_.map([
                    'out/img/trans-grad.png?v4',
                    'out/img/trans-grad-black.png',
                    'out/img/trans-grad-blue.png',
                    'out/img/trans-grad-pink.png',
                    'out/img/trans-grad-purple.png',
                    'out/img/hotspot.png?v5',
                    'out/img/hotspot-anim.png',
                    'out/img/read-story.png',
                    'out/img/read-story-dark.png',
                    'out/img/be-moved-logo-white.png',
                    'out/img/be-moved-logo-black.png',
                    'out/img/appstore/goldie.png',
                    'out/img/appstore/umbrella.png',
                    'out/img/appstore/sub.png',
                    'out/img/appstore/photo.png',
                    'out/img/appstore/plantimal.png',
                    'out/img/appstore/showeroke.png',
                    'out/img/appstore/google.png',
                    'out/img/appstore/goldie_over.png',
                    'out/img/appstore/umbrella_over.png',
                    'out/img/appstore/sub_over.png',
                    'out/img/appstore/photo_over.png',
                    'out/img/appstore/plantimal_over.png',
                    'out/img/appstore/showeroke_over.png',
                    'out/img/appstore/google_over.png'
                ], function (u) {
                    var i = new Image(), d = $.Deferred();
                    return i.onload = function () {
                        d.resolve(i);
                    }, i.src = u, d;
                }));
            }, PreloadAnimation.prototype.addClassString = function (s) {
                this.el.addClass(s);
            }, PreloadAnimation;
        }();
        Interface.PreloadAnimation = PreloadAnimation;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Interface) {
        function getYoutubeId(url) {
            var m = url.match(/\?v=([-_\d\w]+)$/);
            return m && m[1] ? m[1] : null;
        }
        var IFRAME_TEMPLATE = '<iframe src="//www.youtube.com/embed/__ID__?autoplay=1&controls=2&fs=1&modestbranding=1&rel=0&showinfo=1&color=white&enablejsapi=1" frameborder="0" allowfullscreen id="youtube_player"></iframe>', VideoViewer = function () {
            function VideoViewer(templateElement) {
                this.currentOverlay = null, this.currentFlowplayerAPI = null, this.currentVideoAspectRatio = 0, this.isVideoPlaying = !1, this.overlayTemplate = $(templateElement);
            }
            return VideoViewer.prototype.openVideo = function (filename) {
                window.location.href = filename;
            }, VideoViewer.prototype.showVideo = function (url, isYouTube, videoW, videoH, shareParentID) {
                this.currentVideoAspectRatio = videoW / videoH, this.currentOverlay = $('.video-overlay').clone(!0).appendTo($('body'));
                var showYoutube = isYouTube;
                if (showYoutube) {
                    var id = getYoutubeId(url), iframe = $(IFRAME_TEMPLATE.replace('__ID__', id));
                    this.currentOverlay.find('.frame').append(iframe);
                    {
                        new YT.Player('youtube_player', {
                            events: {
                                onReady: $.proxy(this, 'onYouTubeVideoReady'),
                                onStateChange: $.proxy(this, 'onYouTubeVideoStateChange')
                            }
                        });
                    }
                    this.currentOverlay.find('.video_complete_menu').remove();
                } else {
                    {
                        var videoURL = url, endFrame = this.currentOverlay.find('.video_complete_menu');
                        $('#' + shareParentID + ' .social').clone(!0).appendTo(endFrame.find('.video_complete_share_buttons'));
                    }
                    endFrame.hide(), $(endFrame).on('click', '.video_replay_link', $.proxy(this, 'onVideoReplayClicked'));
                    var autoplay = !0;
                    SH.Config.isTablet && (autoplay = !1);
                    var queryString = '?url=' + videoURL + '&aspect=' + this.currentVideoAspectRatio + '&autoplay=' + autoplay, iFrameHtml = '<iframe id="videoplayer_iframe" src="video_player_iframe.html' + encodeURI(queryString) + '"';
                    iFrameHtml += 'mozallowfullscreen ', iFrameHtml += 'webkitallowfullscreen ', iFrameHtml += 'allowfullscreen ', iFrameHtml += 'scrolling="no" ', iFrameHtml += 'frameborder="0" ', iFrameHtml += '></iframe>', this.currentOverlay.find('.frame').append(iFrameHtml), this.isVideoPlaying = !0, this.checkVideoStatus();
                }
                return this.layoutVideoElements(), $(window).bind('resize', $.proxy(this, 'onResize')), this.currentOverlay.css({ display: 'block' }).transition({ opacity: 1 }), this.currentOverlay;
            }, VideoViewer.prototype.onResize = function () {
                this.layoutVideoElements();
            }, VideoViewer.prototype.onYouTubeVideoReady = function () {
            }, VideoViewer.prototype.onYouTubeVideoStateChange = function (e) {
                var state = e.data;
                0 == state && this.hideVideo();
            }, VideoViewer.prototype.checkVideoStatus = function () {
                var keepChecking = !0, iframe = document.getElementById('videoplayer_iframe');
                if (iframe) {
                    var innerDoc = iframe.contentDocument || iframe.contentWindow.document, statusElement = innerDoc.getElementById('video_status'), currentStatus = $(statusElement).attr('data-current-status');
                    'FINISHED' == currentStatus && (this.isVideoPlaying = !1, this.showVideoEndOverlay());
                }
                null == this.currentOverlay && (keepChecking = !1), this.isVideoPlaying || (keepChecking = !1), keepChecking && setTimeout($.proxy(this, 'checkVideoStatus'), 200);
            }, VideoViewer.prototype.layoutVideoElements = function () {
                var targH, targW, $w = $(window);
                $w.width() / $w.height() < this.currentVideoAspectRatio ? (targW = $w.width() - 100, targH = targW / this.currentVideoAspectRatio) : (targH = $w.height() - 80, targW = targH * this.currentVideoAspectRatio), $('.video-overlay .frame').css({
                    width: targW,
                    height: targH
                }), $('#videoplayer_iframe').attr({
                    width: targW,
                    height: targH
                });
                var buttonsWidth = 121, idealVideoWidth = 1050, scaleFactor = targW / idealVideoWidth;
                SH.Config.isMobile && (scaleFactor *= 2), this.currentOverlay.find('.video_complete_menu_buttons').css({
                    '-webkit-transform': 'scale(' + scaleFactor + ')',
                    '-ms-transform': 'scale(' + scaleFactor + ')',
                    '-moz-transform': 'scale(' + scaleFactor + ')',
                    '-o-transform': 'scale(' + scaleFactor + ')',
                    transform: 'scale(' + scaleFactor + ')',
                    'margin-left': -buttonsWidth * scaleFactor / 2,
                    'margin-top': 70 * scaleFactor
                });
            }, VideoViewer.prototype.onVideoFinished = function () {
                this.isVideoPlaying = !1, this.currentOverlay.find('.fp-ui').hide(), this.currentOverlay.find('.video_complete_menu').fadeIn();
            }, VideoViewer.prototype.onVideoReplayClicked = function (e) {
                e.preventDefault();
                var iframe = document.getElementById('videoplayer_iframe');
                iframe.contentWindow.replayVideo(), this.hideVideoEndOverlay(), this.isVideoPlaying = !0, this.checkVideoStatus();
            }, VideoViewer.prototype.showVideoEndOverlay = function () {
                this.currentOverlay.find('.video_complete_menu').fadeIn();
            }, VideoViewer.prototype.hideVideoEndOverlay = function () {
                this.currentOverlay.find('.video_complete_menu').hide();
            }, VideoViewer.prototype.hideVideo = function () {
                var _this = this, d = $.Deferred();
                return $('.video_replay_link').off('click', $.proxy(this, 'onVideoReplayClicked')), $(window).unbind('resize', $.proxy(this, 'onResize')), this.currentOverlay.transition({ opacity: 0 }, function () {
                    $('#videoplayer_iframe-player').attr('src', 'about:blank'), $('#videoplayer_iframe').remove(), _this.currentOverlay.remove(), _this.currentOverlay = null, d.resolve();
                }), d;
            }, VideoViewer;
        }();
        Interface.VideoViewer = VideoViewer;
    }(SH.Interface || (SH.Interface = {}));
    SH.Interface;
}(SH || (SH = {}));

var SH;
if (function (SH) {
        !function (Interface) {
            var StaticFallback = function () {
                function StaticFallback() {
                    $('.static *[id]').each(function () {
                        $(this).clone().appendTo('#content').hide(), $(this).attr({ id: '' });
                    }), Modernizr.hasEvent('touchstart') || $('.static').hide();
                }
                return StaticFallback;
            }();
            Interface.StaticFallback = StaticFallback;
        }(SH.Interface || (SH.Interface = {}));
        SH.Interface;
    }(SH || (SH = {})), MobileEsp.DetectTierIphone() ? $('html').addClass('mobile') : MobileEsp.DetectTierTablet() && $('html').addClass('tablet'), $('html').hasClass('oldie') || $('.browser-prompt').remove(), $('html').hasClass('oldie'))
    throw $('.viewport').hide(), $('.rotation-prompt').remove(), $('.static').show(), $('.video-link').each(function (id, linkElement) {
        $(linkElement).attr('href'), parseInt($(linkElement).attr('data-video-width')), parseInt($(linkElement).attr('data-video-height'));
        $(linkElement).attr('target', '_blank');
    }), 'old browser';
var isMobileEnabled = !0;
if ($('html').hasClass('mobile') && !isMobileEnabled)
    throw $('.viewport').hide(), $('.rotation-prompt').remove(), $('.static').show(), 'mobile disabled';
