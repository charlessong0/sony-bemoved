var SH;
!function (SH) {
    !function (Video) {
        function schedule(f, distance) {
            setTimeout(f, 5 * distance);
        }
        var ImageFrameSource = function () {
            function ImageFrameSource(config) {
                this.frames = {},
                    this.largeFrames = {},
                    this.startFrame = 0,
                    this.currentFrameNumber = null,
                    this.length = config.frameCount,
                    this.frameLoads = new Array(this.length),
                    this.urlFunc = function (n) {
                        n += config.zeroFrameNumber;
                        var fileDir = '/small/';
                        return  SH.Config.isMobile ? fileDir = '/small_256/' : SH.Config.isTablet && (fileDir = '/small_512/'),
                        config.path + fileDir + config.prefix + SH.Util.zeroPad(n, config.frameNumberTemplate || '' + n) + '.' + config.extension;
                    }, this.largeUrlFunc = function (n) {
                    n += config.zeroFrameNumber;
                    var fileDir = '/large/';
                    return SH.Config.isMobile ? fileDir = '/large_960/' : SH.Config.isTablet && (fileDir = '/large_960/'),
                    config.path + fileDir + config.prefix + SH.Util.zeroPad(n, config.frameNumberTemplate || '' + n) + '.' + config.extension;
                }, this.el = document.createElement('div'),
                    this.currentFrame = null, this.loadGauge = new SH.Interface.FrameLoadGauge($('#frameLoads'), this.length);
            }
            return ImageFrameSource.prototype.loadFrame = function (n, immediately) {
                var _this = this;
                'undefined' == typeof immediately && (immediately = !1);
                var scheduleFunc = immediately ? function (f) {
                    return f();
                } : schedule;
                if (SH.Config.AFramesOnly && (n = n >> 1 << 1), this.frameLoads[n])
                    return this.frameLoads[n];
                var i = new Image();
                this.frameLoads[n] = $.Deferred(), this.loadGauge.setLoading(n), i.onload = function () {
                    _this.frames[n] = i, _this.frameLoads[n].resolve(i), _this.loadGauge.setLoaded(n);
                };
                var distanceFromStart = Math.abs(n - this.startFrame);
                return 0 == n || n == this.length - 1 ? scheduleFunc(function () {
                    i.src = _this.largeUrlFunc(n);
                }, distanceFromStart) : scheduleFunc(function () {
                    i.src = _this.urlFunc(n);
                }, distanceFromStart), this.frameLoads[n];
            },
                ImageFrameSource.prototype.allFramesLoading = function () {
                    for (var i = 0, l = this.frameLoads.length; l > i; i++) {
                        if (!this.frameLoads[i])
                            return !1;
                        SH.Config.AFramesOnly && i++;
                    }
                    return !0;
                },
                ImageFrameSource.prototype.load = function (loader, startFrame) {
                    var _this = this;
                    'undefined' == typeof loader && (loader = null), 'undefined' == typeof startFrame && (startFrame = 0);
                    var inBounds = function (n) {
                        return n >= 0 && n < _this.length;
                    };
                    this.startFrame = startFrame;
                    var preloadFramesAhead = 40, reverseDecay = 2;
                    SH.Config.isMobile && (preloadFramesAhead = 90, reverseDecay = 1);
                    for (var firstPhasePreloads = [], counter = 0, counterBack = 0, l = this.length, incrExtra = 0, incrBack = 0; l > counter; counterBack++, counter++) {
                        incrExtra = Math.max(0, 2 * Math.floor(counter / preloadFramesAhead) - 1),
                            incrBack = Math.max(0, 2 * Math.floor(counterBack / preloadFramesAhead) - 1),
                            counter += incrExtra, counterBack += (incrBack + 1) * reverseDecay - 1;
                        var idxF = startFrame + counter, idxB = startFrame - 1 - counterBack, eitherInBounds = !1;
                        if (_.each([
                                idxF,
                                idxB
                            ], function (idx_) {
                                if (inBounds(idx_)) {
                                    eitherInBounds = !0;
                                    var p = _this.loadFrame(idx_, !0);
                                    firstPhasePreloads.push(p), loader && (loader.incrTarget(), p.then(function () {
                                        loader.incrLoads();
                                    }));
                                }
                            }), !eitherInBounds)
                            break;
                    }
                    console.log('preloading: ' + firstPhasePreloads.length);
                    var loadMore = function () {
                        var nextLoads = [];
                        if (!_this.allFramesLoading()) {
                            for (var idx = startFrame, l = _this.length, firstEmpty = !1; l > idx; idx += 2) {
                                if (SH.Config.AFramesOnly && (idx = idx >> 1 << 1), !firstEmpty) {
                                    for (; _this.frameLoads[idx] && l > idx;)
                                        idx++, SH.Config.AFramesOnly && idx++;
                                    firstEmpty = !0;
                                }
                                if (!inBounds(idx))
                                    break;
                                nextLoads.push(_this.loadFrame(idx));
                            }
                            if (startFrame > 0)
                                for (var idx = startFrame, firstEmpty = !1; idx >= 0; idx -= 2) {
                                    if (!firstEmpty) {
                                        for (; _this.frameLoads[idx] && idx >= 0;)
                                            idx--;
                                        firstEmpty = !0;
                                    }
                                    if (!inBounds(idx))
                                        break;
                                    nextLoads.push(_this.loadFrame(idx));
                                }
                            if (!nextLoads.length) {
                                var d = $.Deferred();
                                return d.resolve(), d;
                            }
                            return SH.Util.whenAll(nextLoads).then(loadMore);
                        }
                    };
                    return SH.Util.whenAll(firstPhasePreloads).then(function () {
                        loadMore(), $('.static .rotation-prompt').transition({ marginTop: 0 }),
                            $('.rotate-prompt-close').on('click', function (e) {
                                e.preventDefault(), $('.static .rotation-prompt').transition({ marginTop: -180 });
                            });
                    }), SH.Util.whenAll(firstPhasePreloads);
                }, ImageFrameSource.prototype.getFrame = function (n) {
                this.currentFrame = this.frames[n];
                for (var back, forward, i = 1; i < this.length && !this.currentFrame;)
                    back = this.frames[n - i], forward = this.frames[n + i], this.currentFrame = back || forward, i++;
                return this.currentFrame;
            }, ImageFrameSource.prototype.getLargeFrame = function (n) {
                var p = $.Deferred(), i = new Image();
                return i.onload = function () {
                    return p.resolve(i);
                }, i.src = this.largeUrlFunc(n), p;
            }, ImageFrameSource;
        }();
        Video.ImageFrameSource = ImageFrameSource;
    }(SH.Video || (SH.Video = {}));
    SH.Video;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Video) {
        !function (Renderer) {
            var ImageToElement = function () {
                function ImageToElement(element) {
                    this.element = element, this.previousFrame = null;
                }
                return ImageToElement.prototype.render = function (image) {
                    this.previousFrame && this.element.removeChild(this.previousFrame), this.element.appendChild(image);
                }, ImageToElement;
            }();
            Renderer.ImageToElement = ImageToElement;
            var ImageToCanvas = function () {
                function ImageToCanvas(element) {
                    this.element = element,
                        this.prevImage = null,
                        this.drawBox = null,
                        this.aspect = null,
                        this.resizeQueued = !1,
                        this.canvas = document.createElement('canvas'),
                        this.canvas.height = $(element).height(),
                        this.canvas.width = $(element).width(), this.drawBox = [
                        0,
                        0,
                        this.canvas.width,
                        this.canvas.height
                    ], this.aspect = this.canvas.width / this.canvas.height,
                        element.appendChild(this.canvas),
                        this.context = this.canvas.getContext('2d'),
                        $(window).on('viewportResize', $.proxy(this, 'handleResize')),
                        $(window).trigger('resize');
                }
                return ImageToCanvas.prototype.handleResize = function (e, w, h, ww, wh) {
                    var _this = this;
                    this.canvas.width = ww, this.canvas.height = wh;
                    var marginLeft = (w - ww) / 2, marginTop = (h - wh) / 2;
                    this.resizeQueued || requestAnimationFrame(function () {
                        _this.canvas.style.marginLeft = '' + marginLeft + 'px',
                            _this.canvas.style.marginTop = '' + marginTop + 'px', _this.drawBox = [
                            -marginLeft,
                            -marginTop,
                            w,
                            h
                        ], _this.aspect = ww / wh, _this.prevImage && _this.render(_this.prevImage), _this.resizeQueued = !1;
                    });
                }, ImageToCanvas.prototype.render = function (image) {
                    if (image) {
                        var sx, sy, sw, sh, w = (this.drawBox, image.width), h = image.height, srcAspect = w / h;
                        srcAspect < this.aspect ? (sx = 0, sw = w, sh = sw / this.aspect, sy = (h - sh) / 2) : (sy = 0, sh = h, sw = sh * this.aspect, sx = (w - sw) / 2), this.context.drawImage(image, sx, sy, sw, sh, 0, 0, this.canvas.width, this.canvas.height), this.prevImage = image;
                    }
                }, ImageToCanvas;
            }();
            Renderer.ImageToCanvas = ImageToCanvas;
            var CompositeToCanvas = function () {
                function CompositeToCanvas(element) {
                    this.element = element, this.prevImage = null, this.canvas = document.createElement('canvas'), this.canvas.height = $(element).height(), this.canvas.width = $(element).width(), element.appendChild(this.canvas), this.context = this.canvas.getContext('2d'), $(window).on('viewportResize', $.proxy(this, 'handleResize'));
                }
                return CompositeToCanvas.prototype.handleResize = function (e, w, h) {
                    this.canvas.width = w, this.canvas.height = h, this.context.drawImage(this.prevImage, 0, 0, w, h);
                }, CompositeToCanvas.prototype.render = function (frame) {
                    this.prevImage = frame, this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);
                }, CompositeToCanvas;
            }();
            Renderer.CompositeToCanvas = CompositeToCanvas;
        }(Video.Renderer || (Video.Renderer = {}));
        Video.Renderer;
    }(SH.Video || (SH.Video = {}));
    SH.Video;
}(SH || (SH = {}));

var SH;
!function (SH) {
    !function (Video) {
        var Controller = function () {
            function Controller(source, destEl, assetConfig) {
                this.assetConfig = assetConfig,
                    this.currentProgress = 0,
                    this.lastFrameNumber = -1, this.playTimer = null,
                    this.canJumpNow = !0,
                    this.offset = 0,
                    this.frameQueued = null,
                    this.progressCallback = null,
                    this.scrubTimer = null,
                    this.currentVelocity = 0,
                    this.source = source,
                    this.length = this.source.length,
                    this.el = destEl,
                    this.renderer = assetConfig.rendererClass ? new SH.Video.Renderer[assetConfig.rendererClass](destEl) : new SH.Video.Renderer.ImageToCanvas(destEl),
                    this.keyFrames = _.map(assetConfig.sections, function (el) {
                    return el[2];
                }), this.keyFrames.unshift(0), this.hiResDelay = assetConfig.hiResDelay || SH.Config.hiResDelay, this.currentProgress = (assetConfig.startFrame || 0) / (this.length - 1);
            }
            return Controller.prototype.setProgressCallback = function (fun) {
                this.progressCallback = fun;
            }, Controller.prototype.calculateCurrentFrame = function () {
                var frameNumber = Math.round((this.length - 1) * this.currentProgress);
                return SH.Config.AFramesOnly && (frameNumber = frameNumber >> 1 << 1), frameNumber;
            }, Controller.prototype.setCurrentFrame = function (frameNumber) {
                this.currentProgress = SH.Util.clamp(0, frameNumber / (this.length - 1), 1);
            }, Controller.prototype.renderCurrentFrame = function (silent) {
                var _this = this;
                'undefined' == typeof silent && (silent = !1);
                var f = this.calculateCurrentFrame(), rawProgress = Math.round((this.length - 1) * this.currentProgress);
                rawProgress != this.lastFrameNumber && (this.resetScrubTimer(), !silent && this.progressCallback && this.progressCallback(this.currentProgress, rawProgress, this.length), this.lastFrameNumber = rawProgress, requestAnimationFrame(function () {
                    _this.renderer.render(_this.source.getFrame(f));
                }), this.frameQueued = null);
            }, Controller.prototype.seekTo = function (frameNumber, silent) {
                'undefined' == typeof silent && (silent = !1), this.setCurrentFrame(frameNumber), this.renderCurrentFrame(silent);
            }, Controller.prototype.resetScrubTimer = function () {
                clearTimeout(this.scrubTimer), this.scrubTimer = Math.abs(this.currentVelocity) > 1 ? setTimeout($.proxy(this, 'resetScrubTimer'), 100) : setTimeout($.proxy(this, 'upscale'), this.hiResDelay);
            }, Controller.prototype.upscale = function (n) {
                var _this = this;
                if ('undefined' == typeof n && (n = null), SH.Config.hiResOnPause) {
                    var upscaleFrameNumber = n || this.lastFrameNumber, framePromise = this.source.getLargeFrame(upscaleFrameNumber);
                    framePromise.then(function (im) {
                        upscaleFrameNumber !== _this.lastFrameNumber || _this.frameQueued && upscaleFrameNumber !== _this.frameQueued || _this.renderer.render(im);
                    });
                }
            }, Controller.prototype.nextKeyFrame = function () {
                var f = Math.round((this.length - 1) * this.currentProgress) + this.assetConfig.zeroFrameNumber, nextKeyFrame = _.find(this.keyFrames, function (frameNum) {
                    return +frameNum > f;
                });
                return nextKeyFrame ? nextKeyFrame - this.assetConfig.zeroFrameNumber : 0;
            }, Controller.prototype.prevKeyFrame = function () {
                var f = this.calculateCurrentFrame() + this.assetConfig.zeroFrameNumber, keyFramesReversed = Array.prototype.slice.call(this.keyFrames);
                keyFramesReversed.reverse();
                var prevKeyFrame = _.find(keyFramesReversed, function (frameNum) {
                    return f > +frameNum;
                });
                return prevKeyFrame || 0 === +prevKeyFrame ? +prevKeyFrame - this.assetConfig.zeroFrameNumber : null;
            }, Controller.prototype.show = function () {
                $(this.el).transition({ opacity: 1 });
            }, Controller.prototype.hide = function () {
                this.el.style.opacity = '0';
            }, Controller;
        }();
        Video.Controller = Controller;
    }(SH.Video || (SH.Video = {}));
    SH.Video;
}(SH || (SH = {}));