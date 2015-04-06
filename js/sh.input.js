var SH;
!function (SH) {
    !function (Input) {
        !function (EventTypes) {
            EventTypes[EventTypes.Scrub = 0] = 'Scrub',
                EventTypes[EventTypes.JumpForward = 1] = 'JumpForward',
                EventTypes[EventTypes.JumpBack = 2] = 'JumpBack',
                EventTypes[EventTypes.SingleFrame = 3] = 'SingleFrame';
        }(Input.EventTypes || (Input.EventTypes = {}));
        var EventTypes = Input.EventTypes,
            mousewheelTarget = $(window).add($('#sonynav')[0].contentWindow).add('html,body');
        Input.COOLDOWN_TIME = 100, Input.WAIT_TIME = 150;
        var EventKeys, MouseWheelHandler = function () {
            function MouseWheelHandler(stream) {
                this.waitTimer = null,
                    this.cooldownTimer = null,
                    this.scrubbing = !1,
                    this.queuedDelta = null,
                    this.stream = stream,
                    mousewheelTarget.bind('mousewheel', $.proxy(this, 'handleWheel'));
            }
            return MouseWheelHandler.prototype.handleWheel = function (e, d, dx, dy) {
                e.preventDefault(),
                    e.stopPropagation(),
                    this.waitTimer ? (this.cancelWait(), this.stream.pump(0, this.queuedDelta),
                        his.stream.pump(0, dy), this.resetCooldownTimer()) : this.waitForSecondEvent(dy);
            }, MouseWheelHandler.prototype.cancelWait = function () {
                clearTimeout(this.waitTimer), this.waitTimer = null;
            }, MouseWheelHandler.prototype.waitForSecondEvent = function (dy) {
                var _this = this;
                this.queuedDelta = dy, this.waitTimer = setTimeout(function () {
                    _this.stream.pump(3, dy), _this.waitTimer = null;
                }, Input.WAIT_TIME);
            }, MouseWheelHandler.prototype.resetCooldownTimer = function () {
                var _this = this;
                clearTimeout(this.cooldownTimer), this.cooldownTimer = setTimeout(function () {
                    _this.scrubbing = !1;
                }, Input.COOLDOWN_TIME);
            }, MouseWheelHandler;
        }();
        !function (EventKeys) {
            EventKeys[EventKeys.Space = 32] = 'Space',
                EventKeys[EventKeys.ArrowUp = 38] = 'ArrowUp',
                EventKeys[EventKeys.ArrowDown = 40] = 'ArrowDown';
        }(EventKeys || (EventKeys = {}));
        var KeyboardHandler = function () {
            function KeyboardHandler(stream) {
                this.keysDown = {}, this.stream = stream,
                    $(window).on('keydown', $.proxy(this, 'handleKeyDown')),
                    $(window).on('keyup', $.proxy(this, 'handleKeyUp'));
            }
            return KeyboardHandler.prototype.handleKeyDown = function (e) {
                var scrubbing = !1, delta = -1.1, matched = !1;
                this.keysDown[e.which] && (scrubbing = !0),
                (40 == e.which || 32 == e.which) && (matched = !0),
                38 == e.which && (matched = !0, delta = -1 * delta),
                matched && (e.preventDefault(), scrubbing ? this.stream.pump(0, delta) : this.stream.pump(3, delta),
                    this.keysDown[e.which] = !0);
            }, KeyboardHandler.prototype.handleKeyUp = function (e) {
                this.keysDown[e.which] = !1;
            }, KeyboardHandler;
        }(), touchTarget = $('#full-content').add($('#sonynav')[0].contentWindow).add(window).add('html,body'),
            TouchHandler = function () {
            function TouchHandler(stream) {
                this.lastY = 0,
                    this.lastDeltaY = 0,
                    this.staticIsVisible = !1,
                    this.touchInProgress = !1,
                    this.eventCount = 0,
                    this.averageDelta = 1,
                    this.stream = stream,
                    touchTarget.on('touchstart', $.proxy(this, 'handleTouchStart')),
                    touchTarget.on('touchend', $.proxy(this, 'handleTouchEnd'));
            }
            return TouchHandler.prototype.handleTouchStart = function (e) {
                var _this = this;
                this.touchInProgress || (this.lastY = e.originalEvent.touches[0].clientY, this.staticIsVisible = !!$('.static:visible').length, touchTarget.on('touchmove', function (e) {
                    return _this.handleTouchMove(e);
                }), this.touchInProgress = !0);
            }, TouchHandler.prototype.handleTouchMove = function (e) {
                if (!this.staticIsVisible) {
                    e.preventDefault();
                    var thisY = e.originalEvent.touches[0].clientY, deltaY = thisY - this.lastY;
                    this.lastY = thisY, this.lastDeltaY = deltaY;
                    var absDelta = Math.abs(deltaY);
                    this.averageDelta = (absDelta + this.averageDelta * this.eventCount) / (this.eventCount + 1), this.eventCount += 1, deltaY /= this.averageDelta, Math.abs(deltaY) > 0 && this.stream.pump(0, deltaY);
                }
            }, TouchHandler.prototype.handleTouchEnd = function () {
                touchTarget.off('touchmove'), this.touchInProgress = !1;
            }, TouchHandler;
        }(), EventStream = function () {
            function EventStream() {
                this.acceptingInput = !1,
                    this.handlers = [new KeyboardHandler(this)],
                    this.handlers.push(Modernizr.hasEvent('touchstart') ? new TouchHandler(this) : new MouseWheelHandler(this));
            }
            return EventStream.prototype.pump = function (eventType) {
                for (var args = [], _i = 0; _i < arguments.length - 1; _i++)
                    args[_i] = arguments[_i + 1];
                return this.acceptingInput ? void $(this).triggerHandler(EventTypes[eventType], args) : (args.unshift(EventTypes[eventType]), void $(this).triggerHandler('muted', args));
            }, EventStream;
        }();
        Input.EventStream = EventStream;
    }(SH.Input || (SH.Input = {}));
    SH.Input;
}(SH || (SH = {}));