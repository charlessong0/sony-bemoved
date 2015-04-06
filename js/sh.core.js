var SH;
!function (SH) {
    !function (Core) {
        function positive(n) {
            return n >= 0;
        }
        Core.TIME_SCALE = 1;
        var Playhead = function () {
            function Playhead(introController, videoController, stream) {
                this.velocity = 0, this.position = 0, this.acceleration = 1.05, this.deceleration = 0.85, this.braking = 0.8, this.inertia = 0.95, this.frameInterval = function () {
                    return 1000 / 30 * Core.TIME_SCALE;
                }, this.lastDecay = null, this.lastPosition = null, this.lastInput = null, this.keyframeCounter = 0, this.keyframeRepeat = 21, this.approachingKeyFrame = !1, this.targetFrame = null, this.targetFromFrame = null, this.targetDistance = 0, this.targetStartTime = 0, this.speedLimited = !0, this.isRunning = !1, this.events = $({}), this.introController = introController, this.videoController = videoController, this.length = introController.offset + videoController.length, this.stream = stream, this.bind();
            }
            return Playhead.now = function () {
                return new Date().getTime();
            }, Playhead.prototype.positionInMain = function () {
                return Math.max(0, this.position - this.introController.offset);
            }, Playhead.prototype.bind = function () {
                var _this = this, $stream = $(this.stream);
                $stream.on('Scrub', $.proxy(this, 'handleScrub')), $stream.on('JumpForward', $.proxy(this, 'jumpForward')), $stream.on('JumpBack', $.proxy(this, 'jumpBack')), $stream.on('SingleFrame', $.proxy(this, 'singleFrame')), this.introController.setProgressCallback(function (p, f) {
                    _this.events.triggerHandler('progress', [
                        f / _this.length,
                        f,
                        _this.length
                    ]);
                }), this.videoController.setProgressCallback(function (p, f) {
                    var newF = f + _this.introController.offset;
                    _this.events.triggerHandler('progress', [
                        newF / _this.length,
                        newF,
                        _this.length
                    ]);
                });
            }, Playhead.prototype.handleScrub = function (e, d) {
                if (d = -d, !(this.position <= 0 && 0 >= d)) {
                    this.targetFrame = null;
                    var range = Playhead.maxVelocity - Playhead.minVelocity, newV = 0.8 * d * range;
                    Math.abs(newV) < Math.abs(this.velocity) || (0 > newV ? newV -= Playhead.minVelocity : newV += Playhead.minVelocity, this.velocity = SH.Util.clamp(-Playhead.maxVelocity, newV, Playhead.maxVelocity), this.lastDecay = null, this.lastInput = Playhead.now(), requestAnimationFrame($.proxy(this, 'start')));
                }
            }, Playhead.prototype.decayVelocity = function (now) {
                if ('undefined' == typeof now && (now = Playhead.now()), !this.lastDecay)
                    return void (this.lastDecay = now);
                var framesElapsed = (now - this.lastDecay) / (this.frameInterval() / Core.TIME_SCALE);
                this.lastDecay = now, this.velocity = this.velocity * Math.pow(this.inertia, framesElapsed), this.approachingKeyFrame && (this.velocity = positive(this.velocity) ? (20 + this.velocity) / 2 : (-20 + this.velocity) / 2), this.keyframeCounter && now - this.lastInput > 400 && (this.velocity = 0, this.keyframeCounter = this.keyframeRepeat - 2);
            }, Playhead.prototype.updatePosition = function (now) {
                var _this = this;
                if ('undefined' == typeof now && (now = Playhead.now()), !this.lastPosition)
                    return void (this.lastPosition = now);
                var framesElapsed = (now - this.lastPosition) / this.frameInterval();
                this.lastPosition = now;
                var velocity = Math.abs(this.velocity), minKeyFrameDist = 1 / 0, closestKeyFrame = null, o = this.introController.offset;
                _.each(this.videoController.keyFrames, function (k) {
                    var newPosition = Math.abs(k + o - (_this.position + _this.videoController.assetConfig.zeroFrameNumber));
                    minKeyFrameDist = Math.min(minKeyFrameDist, newPosition), minKeyFrameDist == newPosition && (closestKeyFrame = k);
                }), this.approachingKeyFrame = positive(this.velocity) == positive(closestKeyFrame - this.positionInMain()) && 15 > minKeyFrameDist, velocity *= Math.min(minKeyFrameDist / 30 + 0.333333, 1), velocity = Math.max(velocity, Playhead.minVelocity), this.velocity < 0 && (velocity = -velocity);
                var finalVelocity = velocity / 30 * framesElapsed;
                0 == Math.round(minKeyFrameDist) && this.keyframeCounter < this.keyframeRepeat && closestKeyFrame > this.introController.offset ? (this.position = Math.round(this.position), this.keyframeCounter++) : this.keyframeCounter ? (this.position += this.velocity >= 0 ? 1 : -1, this.keyframeCounter = 0) : this.position = this.position + finalVelocity, this.position <= 0 && this.velocity < 0 && (this.velocity = -1e-9, this.position = 0);
            }, Playhead.prototype.updateVelocity = function (delta) {
                this.velocity = SH.Util.clamp(-Playhead.maxVelocity, this.velocity + delta, Playhead.maxVelocity);
            }, Playhead.prototype.playTo = function (frameNumber, speedLimited) {
                'undefined' == typeof speedLimited && (speedLimited = !0), 1 > frameNumber && (frameNumber = Math.round(frameNumber * (this.length - 1))), this.speedLimited = speedLimited, this.targetFrame = frameNumber, this.targetFromFrame = this.position, this.targetDistance = this.targetFrame - this.targetFromFrame, this.targetStartTime = Playhead.now(), this.keyframeCounter = this.keyframeRepeat - 1;
            }, Playhead.prototype.start = function () {
                this.isRunning || (this.lastDecay = null, this.lastPosition = null, this.velocity || (this.velocity = Playhead.minVelocity), this.step());
            }, Playhead.prototype.step = function () {
                var _this = this;
                this.isRunning = !0;
                var now = Playhead.now(), progressToTarget = 0;
                if (null === this.targetFrame)
                    this.decayVelocity(now);
                else {
                    var frameProgress = this.position - this.targetFromFrame;
                    progressToTarget = frameProgress / this.targetDistance;
                    var shouldAccelerate = !0, framesToSlow = Math.sqrt((Math.abs(this.velocity) - 12) / 0.6), framesRemaining = Math.abs(this.position - this.targetFrame);
                    1.7 * framesToSlow >= framesRemaining && (shouldAccelerate = !1), this.velocity *= positive(this.velocity) == positive(this.targetFrame - this.position) ? shouldAccelerate ? this.acceleration : this.deceleration : Math.abs(this.velocity) <= Playhead.minVelocity ? -1 : this.braking, this.velocity = (positive(this.velocity) ? 1 : -1) * SH.Util.clamp(Playhead.minVelocity, Math.abs(this.velocity), this.speedLimited ? 40 : 240);
                }
                this.position <= 0 && this.velocity < 0 && (this.velocity = 0), this.updatePosition(now), this.position = SH.Util.clamp(0, this.position, this.length - 1), (this.velocity < 0 && this.position - this.targetFrame < 0 || this.velocity > 0 && this.position - this.targetFrame > 0) && null !== this.targetFrame && Math.abs(this.position - this.targetFrame) < 8 && (this.position = this.targetFrame, this.velocity = 0), this.seekTo(this.position), null === this.targetFrame && Math.abs(this.velocity) >= Playhead.minVelocity && this.position >= 0 && this.position <= this.length - 1 ? requestAnimationFrame(function () {
                    return _this.step();
                }) : null !== this.targetFrame && Math.round(this.position) != this.targetFrame && 1 > progressToTarget ? requestAnimationFrame(function () {
                    return _this.step();
                }) : (null !== this.targetFrame && (this.position = this.targetFrame, this.seekTo(this.position)), this.targetFrame = null, this.isRunning = !1, this.velocity = 0, this.events.triggerHandler('stop', this.position)), this.videoController.currentVelocity = this.velocity;
            }, Playhead.prototype.singleFrame = function (e, d) {
                this.isRunning || (0 > d ? this.position += 1 : this.position -= 1, this.position = SH.Util.clamp(0, this.position, this.length - 1), this.seekTo(this.position));
            }, Playhead.prototype.seekTo = function (position, silent) {
                'undefined' == typeof silent && (silent = !1), this.position = position, this.position < this.introController.offset, this.position >= this.introController.offset ? (this.introController.seekTo(Math.min(this.position, this.introController.length - 1), !0), this.videoController.seekTo(this.positionInMain())) : (this.introController.seekTo(this.position), this.videoController.seekTo(this.positionInMain(), !0));
            }, Playhead.prototype.getNextKeyFrame = function () {
                var f, c, offset = 0;
                return this.positionInMain() >= 0 ? (c = this.videoController, offset = this.introController.offset) : c = this.introController, f = this.videoController.nextKeyFrame() + this.introController.offset, f == this.introController.offset && (f = 0), [
                    f,
                    offset,
                    c
                ];
            }, Playhead.prototype.jumpForward = function () {
                var f_offset = this.getNextKeyFrame();
                this.playTo(f_offset[0]), f_offset[2].upscale(Math.max(0, f_offset[0] - f_offset[1])), this.start();
            }, Playhead.prototype.getPrevKeyFrame = function () {
                var c, offset = 0;
                this.positionInMain() > 0 ? (c = this.videoController, offset = this.introController.offset) : c = this.introController;
                var p = c.prevKeyFrame();
                return null === p ? null : (p += offset, p == this.introController.offset && (p = 0), [
                    p,
                    offset,
                    c
                ]);
            }, Playhead.prototype.jumpBack = function () {
                var p_offset = this.getPrevKeyFrame();
                p_offset && (this.playTo(p_offset[0]), p_offset[2].upscale(Math.max(0, p_offset[0] - p_offset[1])), this.start());
            }, Playhead.maxVelocity = 60, Playhead.minVelocity = 12, Playhead;
        }();
        Core.Playhead = Playhead;
    }(SH.Core || (SH.Core = {}));
    SH.Core;
}(SH || (SH = {}));
var SH;
!function (SH) {
    !function (Core) {
        var ConfigLoader = function () {
            function ConfigLoader(assetVersion) {
                this.assetVersion = assetVersion;
            }
            return ConfigLoader.prototype.loadConfig = function () {
                var _this = this, configPromise = $.Deferred(), loadConfig = this.loadMember('config.json'), loadOverlays = this.loadMember('overlays.json'), loadNavColors = this.loadMember('nav_colors.json');
                return SH.Util.whenAll([
                    loadConfig,
                    loadOverlays,
                    loadNavColors
                ]).then(function (config, overlays, colors) {
                    config.overlays = overlays, config.navColors = colors, config.path || (config.path = 'assets/' + _this.assetVersion), configPromise.resolve(config);
                }), configPromise;
            }, ConfigLoader.prototype.loadMember = function (name) {
                var d = $.Deferred();
                return $.getJSON('/js/' + name, function (data) {
                    d.resolve(data);
                }), d;
            }, ConfigLoader;
        }();
        Core.ConfigLoader = ConfigLoader;
    }(SH.Core || (SH.Core = {}));
    SH.Core;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Core) {
        var App = function () {
            function App(assetName, hash) {
                'undefined' == typeof hash && (hash = null),
                    this.hash = null,
                    this.startFrame = 0,
                    this.isTinyScreen = !1,
                    this.tinyScreenOffset = 6,
                    this.windowInnerHeight = window.innerHeight,
                    this.assetName = assetName,
                    this.hash = hash;
            }
            return App.prototype.stateLoadConfig = function () {
                var _this = this,
                    configLoader = new SH.Core.ConfigLoader(this.assetName),
                    domReady = $.Deferred();
                $(function () {
                    domReady.resolve();
                }), SH.Util.whenAll([
                    configLoader.loadConfig(),
                    domReady
                ]).then(function (config) {
                    _this.config = config, _this.stateInit();
                });
            }, App.prototype.stateInit = function () {
                var _this = this;
                this.viewport = new SH.Interface.Viewport(16 / 9, document.getElementById('content')),
                    this.isTinyScreen = SH.Config.isMobile,
                    this.stream = new SH.Input.EventStream();
                var sourceClass = SH.Video.ImageFrameSource;
                this.config.sourceClass && (sourceClass = SH.Video[this.config.sourceClass]);
                var frameSource = new sourceClass(this.config),
                    videoController = new SH.Video.Controller(frameSource, this.viewport.el, this.config);
                videoController.hide();
                var introController = new SH.Interface.Intro(this.isTinyScreen ? this.tinyScreenOffset : 0);
                this.playhead = new SH.Core.Playhead(introController, videoController, this.stream),
                    this.loader = new SH.Interface.Loader($('<div></div>')[0]),
                    this.overlays = new SH.Interface.Overlays(this.config.overlays, this.config.sections, introController.offset - this.config.zeroFrameNumber),
                    this.scrollbar = new SH.Interface.Scrollbar($('.scrollbar'), this.playhead),
                    this.nav = new SH.Interface.LocalNav($('#section-nav'), this.playhead, this.config.sections, introController.offset - this.config.zeroFrameNumber, this.config.navColors);
                var preloadClasses = '';
                if (this.hash) {
                    var frame = _.find(this.config.sections, function (i) {
                        for (var hashFound = !1, targetHashTags = i[0].split(','), j = 0; j < targetHashTags.length; j++)
                            if (targetHashTags[j].toLowerCase() == _this.hash.toLowerCase()) {
                                hashFound = !0;
                                break;
                            }
                        return hashFound;
                    });
                    frame && (this.startFrame = frame[1] + this.playhead.introController.offset - this.config.zeroFrameNumber, preloadClasses = frame[3]);
                }
                this.preloadAnimation = new SH.Interface.PreloadAnimation($('#preloader'), this.hash), this.preloadAnimation.addClassString(preloadClasses);
                var startImageNumber = Math.max(0, this.startFrame - this.playhead.introController.offset),
                    preloaderReady = this.preloadLoaderElements(),
                    firstFrameReady = frameSource.loadFrame(startImageNumber, !0);
                SH.Util.whenAll([
                    firstFrameReady,
                    preloaderReady
                ]).then(function () {
                    $('#loader').hide(),
                        _this.stateStartPreloading(),
                        _this.playhead.videoController.seekTo(startImageNumber, !0),
                        $('.viewport-inner').transition({
                            opacity: 1,
                            duration: 600
                        });
                }), $(this).triggerHandler('init'), SH.Config.isMobile && setInterval($.proxy(this, 'testForIos7Resize'), 500);
            }, App.prototype.testForIos7Resize = function () {
                (90 == window.orientation || -90 == window.orientation) && this.windowInnerHeight != window.innerHeight && (this.windowInnerHeight = window.innerHeight, $(window).trigger('resize'), window.scrollTo(0, 0));
            },
                App.prototype.preloadLoaderElements = function () {
                    return this.preloadAnimation.loadElements();
                }, App.prototype.stateStartPreloading = function () {
                var _this = this;
                this.playhead.introController.seekTo(this.isTinyScreen ? this.tinyScreenOffset : 0, !0), this.loader.events.on('loadProgress', $.proxy(this, 'handleLoadProgress')), this.preloadAnimation.animationComplete.then(function () {
                    _this.stateAcceptingInput();
                }), this.statePreloadWait();
            }, App.prototype.handleLoadProgress = function (e, percent) {
                return this.preloadAnimation.advanceTo(percent), 1 == percent ? this.statePreloadFinal() : void 0;
            }, App.prototype.statePreloadWait = function () {
                this.playhead.videoController.source.load(this.loader, this.startFrame);
            }, App.prototype.statePreloadFinal = function () {
            }, App.prototype.stateAcceptingInput = function () {
                var _this = this;
                this.playhead.videoController.show(),
                    this.playhead.events.on('progress', function (ev, p, f, l) {
                        _this.nav.setProgress(f), _this.overlays.setProgress(f), _this.scrollbar.setProgress(f / l);
                    }), this.hash ? ($(this.stream).one('muted', function () {
                    $('#preloader').transition({ top: '-1000px' }, 1000, function () {
                        $('#preloader').attr('class', 'preloader');
                    }), $('#sonynav').transition({ top: '-1000px' }, 1000), _this.stream.acceptingInput = !0;
                }), this.playhead.seekTo(this.startFrame), this.playhead.introController.seekTo(this.isTinyScreen ? this.tinyScreenOffset : 0, !0),
                    this.scrollbar.setProgress(this.startFrame / this.playhead.length),
                    this.nav.setProgress(this.startFrame)) : (this.stream.acceptingInput = !0, this.playhead.seekTo(this.isTinyScreen ? this.tinyScreenOffset : 0), this.scrollbar.setProgress(0),
                    this.nav.setProgress(0)), $('body').on('click', 'button.scroll-down', function (e) {
                    e.preventDefault(),
                    $(e.currentTarget).parents('nav').length || $(e.currentTarget).transition({ opacity: 0 }), _this.playhead.jumpForward();
                }), $('.scrollbar').show().transition({
                    opacity: 1,
                    marginRight: 0
                }), this.nav.hide();
            }, App;
        }();
        Core.App = App;
    }(SH.Core || (SH.Core = {}));
    SH.Core;
}(SH || (SH = {}));