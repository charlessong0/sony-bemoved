!function(window, undefined) {
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.split(core_rspace), function(_, flag) {
            object[flag] = !0
        }), object
    }
    function dataAttr(elem, key, data) {
        if (data === undefined && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {
                }
                jQuery.data(elem, key, data)
            } else
                data = undefined
        }
        return data
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj)
            if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name)
                return !1;
        return !0
    }
    function returnFalse() {
        return !1
    }
    function returnTrue() {
        return !0
    }
    function isDisconnected(node) {
        return !node || !node.parentNode || 11 === node.parentNode.nodeType
    }
    function sibling(cur, dir) {
        do
            cur = cur[dir];
        while (cur && 1 !== cur.nodeType);
        return cur
    }
    function winnow(elements, qualifier, keep) {
        if (qualifier = qualifier || 0, jQuery.isFunction(qualifier))
            return jQuery.grep(elements, function(elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep
            });
        if (qualifier.nodeType)
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier === keep
            });
        if ("string" == typeof qualifier) {
            var filtered = jQuery.grep(elements, function(elem) {
                return 1 === elem.nodeType
            });
            if (isSimple.test(qualifier))
                return jQuery.filter(qualifier, filtered, !keep);
            qualifier = jQuery.filter(qualifier, filtered)
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 === keep
        })
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement)
            for (; list.length; )
                safeFrag.createElement(list.pop());
        return safeFrag
    }
    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events)
                    for (i = 0, l = events[type].length; l > i; i++)
                        jQuery.event.add(dest, type, events[type][i])
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data))
        }
    }
    function cloneFixAttributes(src, dest) {
        var nodeName;
        1 === dest.nodeType && (dest.clearAttributes && dest.clearAttributes(), dest.mergeAttributes && dest.mergeAttributes(src), nodeName = dest.nodeName.toLowerCase(), "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.selected = src.defaultSelected : "input" === nodeName || "textarea" === nodeName ? dest.defaultValue = src.defaultValue : "script" === nodeName && dest.text !== src.text && (dest.text = src.text), dest.removeAttribute(jQuery.expando))
    }
    function getAll(elem) {
        return "undefined" != typeof elem.getElementsByTagName ? elem.getElementsByTagName("*") : "undefined" != typeof elem.querySelectorAll ? elem.querySelectorAll("*") : []
    }
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
    }
    function vendorPropName(style, name) {
        if (name in style)
            return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; )
            if (name = cssPrefixes[i] + capName, name in style)
                return name;
        return origName
    }
    function isHidden(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }
    function showHide(elements, show) {
        for (var elem, display, values = [], index = 0, length = elements.length; length > index; index++)
            elem = elements[index], elem.style && (values[index] = jQuery._data(elem, "olddisplay"), show ? (values[index] || "none" !== elem.style.display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : (display = curCSS(elem, "display"), values[index] || "none" === display || jQuery._data(elem, "olddisplay", display)));
        for (index = 0; length > index; index++)
            elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2)
            "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0)), isBorderBox ? ("content" === extra && (val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0), "margin" !== extra && (val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0)) : (val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0, "padding" !== extra && (val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0));
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var val = "width" === name ? elem.offsetWidth : elem.offsetHeight, valueIsBorderBox = !0, isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing");
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val))
                return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox) + "px"
    }
    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName])
            return elemdisplay[nodeName];
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body), display = elem.css("display");
        return elem.remove(), ("none" === display || "" === display) && (iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {frameBorder: 0,width: 0,height: 0})), iframeDoc && iframe.createElement || (iframeDoc = (iframe.contentWindow || iframe.contentDocument).document, iframeDoc.write("<!doctype html><html><body>"), iframeDoc.close()), elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName)), display = curCSS(elem, "display"), document.body.removeChild(iframe)), elemdisplay[nodeName] = display, display
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj))
            jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
            });
        else if (traditional || "object" !== jQuery.type(obj))
            add(prefix, obj);
        else
            for (name in obj)
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
            if (jQuery.isFunction(func))
                for (; length > i; i++)
                    dataType = dataTypes[i], placeBefore = /^\+/.test(dataType), placeBefore && (dataType = dataType.substr(1) || "*"), list = structure[dataType] = structure[dataType] || [], list[placeBefore ? "unshift" : "push"](func)
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0], inspected = inspected || {}, inspected[dataType] = !0;
        for (var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = structure === prefilters; length > i && (executeOnly || !selection); i++)
            selection = list[i](options, originalOptions, jqXHR), "string" == typeof selection && (!executeOnly || inspected[selection] ? selection = undefined : (options.dataTypes.unshift(selection), selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)));
        return !executeOnly && selection || inspected["*"] || (selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)), selection
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src)
            src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        deep && jQuery.extend(!0, target, deep)
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
        for (type in responseFields)
            type in responses && (jqXHR[responseFields[type]] = responses[type]);
        for (; "*" === dataTypes[0]; )
            dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("content-type"));
        if (ct)
            for (type in contents)
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
        if (dataTypes[0] in responses)
            finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
    }
    function ajaxConvert(s, response) {
        var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
        if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1])
            for (conv in s.converters)
                converters[conv.toLowerCase()] = s.converters[conv];
        for (; current = dataTypes[++i]; )
            if ("*" !== current) {
                if ("*" !== prev && prev !== current) {
                    if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                        for (conv2 in converters)
                            if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.splice(i--, 0, current));
                                break
                            }
                    if (conv !== !0)
                        if (conv && s["throws"])
                            response = conv(response);
                        else
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {state: "parsererror",error: conv ? e : "No conversion from " + prev + " to " + current}
                            }
                }
                prev = current
            }
        return {state: "success",data: response}
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest
        } catch (e) {
        }
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }, 0), fxNow = jQuery.now()
    }
    function createTweens(animation, props) {
        jQuery.each(props, function(prop, value) {
            for (var collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++)
                if (collection[index].call(animation, prop, value))
                    return
        })
    }
    function Animation(elem, properties, options) {
        var result, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }), tick = function() {
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++)
                animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
        }, animation = deferred.promise({elem: elem,props: jQuery.extend({}, properties),opts: jQuery.extend(!0, {specialEasing: {}}, options),originalProperties: properties,originalOptions: options,startTime: fxNow || createFxNow(),duration: options.duration,tweens: [],createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween
            },stop: function(gotoEnd) {
                for (var index = 0, length = gotoEnd ? animation.tweens.length : 0; length > index; index++)
                    animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
            }}), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++)
            if (result = animationPrefilters[index].call(animation, elem, props, animation.opts))
                return result;
        return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {anim: animation,queue: animation.opts.queue,elem: elem})), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props)
            if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
                value = hooks.expand(value), delete props[name];
                for (index in value)
                    index in props || (props[index] = value[index], specialEasing[index] = easing)
            } else
                specialEasing[name] = easing
    }
    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire()
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
            })
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.done(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
        }));
        for (index in props)
            if (value = props[index], rfxtypes.exec(value)) {
                if (delete props[index], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show"))
                    continue;
                handled.push(index)
            }
        if (length = handled.length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {}), "hidden" in dataShow && (hidden = dataShow.hidden), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide()
            }), anim.done(function() {
                var prop;
                jQuery.removeData(elem, "fxshow", !0);
                for (prop in orig)
                    jQuery.style(elem, prop, orig[prop])
            });
            for (index = 0; length > index; index++)
                prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] : 0), orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }
    function genFx(type, includeWidth) {
        var which, attrs = {height: type}, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth)
            which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1
    }
    var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery)
    }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return (letter + "").toUpperCase()
    }, DOMContentLoaded = function() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", DOMContentLoaded, !1), jQuery.ready()) : "complete" === document.readyState && (document.detachEvent("onreadystatechange", DOMContentLoaded), jQuery.ready())
    }, class2type = {};
    jQuery.fn = jQuery.prototype = {constructor: jQuery,init: function(selector, context, rootjQuery) {
            var match, elem, doc;
            if (!selector)
                return this;
            if (selector.nodeType)
                return this.context = this[0] = selector, this.length = 1, this;
            if ("string" == typeof selector) {
                if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context)
                    return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1])
                    return context = context instanceof jQuery ? context[0] : context, doc = context && context.nodeType ? context.ownerDocument || context : document, selector = jQuery.parseHTML(match[1], doc, !0), rsingleTag.test(match[1]) && jQuery.isPlainObject(context) && this.attr.call(selector, context, !0), jQuery.merge(this, selector);
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    if (elem.id !== match[2])
                        return rootjQuery.find(selector);
                    this.length = 1, this[0] = elem
                }
                return this.context = document, this.selector = selector, this
            }
            return jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
        },selector: "",jquery: "1.8.3",length: 0,size: function() {
            return this.length
        },toArray: function() {
            return core_slice.call(this)
        },get: function(num) {
            return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num]
        },pushStack: function(elems, name, selector) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, "find" === name ? ret.selector = this.selector + (this.selector ? " " : "") + selector : name && (ret.selector = this.selector + "." + name + "(" + selector + ")"), ret
        },each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },ready: function(fn) {
            return jQuery.ready.promise().done(fn), this
        },eq: function(i) {
            return i = +i, -1 === i ? this.slice(i) : this.slice(i, i + 1)
        },first: function() {
            return this.eq(0)
        },last: function() {
            return this.eq(-1)
        },slice: function() {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","))
        },map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },end: function() {
            return this.prevObject || this.constructor(null)
        },push: core_push,sort: [].sort,splice: [].splice}, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), length === i && (target = this, --i); length > i; i++)
            if (null != (options = arguments[i]))
                for (name in options)
                    src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        return target
    }, jQuery.extend({noConflict: function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        },isReady: !1,readyWait: 1,holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0)
        },ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body)
                    return setTimeout(jQuery.ready, 1);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"))
            }
        },isFunction: function(obj) {
            return "function" === jQuery.type(obj)
        },isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj)
        },isWindow: function(obj) {
            return null != obj && obj == obj.window
        },isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj)
        },type: function(obj) {
            return null == obj ? String(obj) : class2type[core_toString.call(obj)] || "object"
        },isPlainObject: function(obj) {
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj))
                return !1;
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (e) {
                return !1
            }
            var key;
            for (key in obj)
                ;
            return key === undefined || core_hasOwn.call(obj, key)
        },isEmptyObject: function(obj) {
            var name;
            for (name in obj)
                return !1;
            return !0
        },error: function(msg) {
            throw new Error(msg)
        },parseHTML: function(data, context, scripts) {
            var parsed;
            return data && "string" == typeof data ? ("boolean" == typeof context && (scripts = context, context = 0), context = context || document, (parsed = rsingleTag.exec(data)) ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts ? null : []), jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes))) : null
        },parseJSON: function(data) {
            return data && "string" == typeof data ? (data = jQuery.trim(data), window.JSON && window.JSON.parse ? window.JSON.parse(data) : rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data)) : null
        },parseXML: function(data) {
            var xml, tmp;
            if (!data || "string" != typeof data)
                return null;
            try {
                window.DOMParser ? (tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data))
            } catch (e) {
                xml = undefined
            }
            return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml
        },noop: function() {
        },globalEval: function(data) {
            data && core_rnotwhite.test(data) && (window.execScript || function(data) {
                window.eval.call(window, data)
            })(data)
        },camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },each: function(obj, callback, args) {
            var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
            if (args)
                if (isObj) {
                    for (name in obj)
                        if (callback.apply(obj[name], args) === !1)
                            break
                } else
                    for (; length > i && callback.apply(obj[i++], args) !== !1; )
                        ;
            else if (isObj) {
                for (name in obj)
                    if (callback.call(obj[name], name, obj[name]) === !1)
                        break
            } else
                for (; length > i && callback.call(obj[i], i, obj[i++]) !== !1; )
                    ;
            return obj
        },trim: core_trim && !core_trim.call("﻿ ") ? function(text) {
            return null == text ? "" : core_trim.call(text)
        } : function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "")
        },makeArray: function(arr, results) {
            var type, ret = results || [];
            return null != arr && (type = jQuery.type(arr), null == arr.length || "string" === type || "function" === type || "regexp" === type || jQuery.isWindow(arr) ? core_push.call(ret, arr) : jQuery.merge(ret, arr)), ret
        },inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf)
                    return core_indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++)
                    if (i in arr && arr[i] === elem)
                        return i
            }
            return -1
        },merge: function(first, second) {
            var l = second.length, i = first.length, j = 0;
            if ("number" == typeof l)
                for (; l > j; j++)
                    first[i++] = second[j];
            else
                for (; second[j] !== undefined; )
                    first[i++] = second[j++];
            return first.length = i, first
        },grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            for (inv = !!inv; length > i; i++)
                retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
            return ret
        },map: function(elems, callback, arg) {
            var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && "number" == typeof length && (length > 0 && elems[0] && elems[length - 1] || 0 === length || jQuery.isArray(elems));
            if (isArray)
                for (; length > i; i++)
                    value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value);
            else
                for (key in elems)
                    value = callback(elems[key], key, arg), null != value && (ret[ret.length] = value);
            return ret.concat.apply([], ret)
        },guid: 1,proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                return fn.apply(context, args.concat(core_slice.call(arguments)))
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined
        },access: function(elems, fn, key, value, chainable, emptyGet, pass) {
            var exec, bulk = null == key, i = 0, length = elems.length;
            if (key && "object" == typeof key) {
                for (i in key)
                    jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
                chainable = 1
            } else if (value !== undefined) {
                if (exec = pass === undefined && jQuery.isFunction(value), bulk && (exec ? (exec = fn, fn = function(elem, key, value) {
                    return exec.call(jQuery(elem), value)
                }) : (fn.call(elems, value), fn = null)), fn)
                    for (; length > i; i++)
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                chainable = 1
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        },now: function() {
            return (new Date).getTime()
        }}), jQuery.ready.promise = function(obj) {
        if (!readyList)
            if (readyList = jQuery.Deferred(), "complete" === document.readyState)
                setTimeout(jQuery.ready, 1);
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, !1), window.addEventListener("load", jQuery.ready, !1);
            else {
                document.attachEvent("onreadystatechange", DOMContentLoaded), window.attachEvent("onload", jQuery.ready);
                var top = !1;
                try {
                    top = null == window.frameElement && document.documentElement
                } catch (e) {
                }
                top && top.doScroll && !function doScrollCheck() {
                    if (!jQuery.isReady) {
                        try {
                            top.doScroll("left")
                        } catch (e) {
                            return setTimeout(doScrollCheck, 50)
                        }
                        jQuery.ready()
                    }
                }()
            }
        return readyList.promise(obj)
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    }), rootjQuery = jQuery(document);
    var optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++)
                if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                    memory = !1;
                    break
                }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
        }, self = {add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                        })
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                }
                return this
            },remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; )
                        list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
                }), this
            },has: function(fn) {
                return jQuery.inArray(fn, list) > -1
            },empty: function() {
                return list = [], this
            },disable: function() {
                return list = stack = memory = undefined, this
            },disabled: function() {
                return !list
            },lock: function() {
                return stack = undefined, memory || self.disable(), this
            },locked: function() {
                return !stack
            },fireWith: function(context, args) {
                return args = args || [], args = [context, args.slice ? args.slice() : args], !list || fired && !stack || (firing ? stack.push(args) : fire(args)), this
            },fire: function() {
                return self.fireWith(this, arguments), this
            },fired: function() {
                return !!fired
            }};
        return self
    }, jQuery.extend({Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]], state = "pending", promise = {state: function() {
                    return state
                },always: function() {
                    return deferred.done(arguments).fail(arguments), this
                },then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0], fn = fns[i];
                            deferred[tuple[1]](jQuery.isFunction(fn) ? function() {
                                var returned = fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === deferred ? newDefer : this, [returned])
                            } : newDefer[action])
                        }), fns = null
                    }).promise()
                },promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise
                }}, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = list.fire, deferred[tuple[0] + "With"] = list.fireWith
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
        },when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                }
            };
            if (length > 1)
                for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++)
                    resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
        }}), jQuery.support = function() {
        var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement("div");
        if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], !all || !a || !all.length)
            return {};
        select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px;float:left;opacity:.5", support = {leadingWhitespace: 3 === div.firstChild.nodeType,tbody: !div.getElementsByTagName("tbody").length,htmlSerialize: !!div.getElementsByTagName("link").length,style: /top/.test(a.getAttribute("style")),hrefNormalized: "/a" === a.getAttribute("href"),opacity: /^0.5/.test(a.style.opacity),cssFloat: !!a.style.cssFloat,checkOn: "on" === input.value,optSelected: opt.selected,getSetAttribute: "t" !== div.className,enctype: !!document.createElement("form").enctype,html5Clone: "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,boxModel: "CSS1Compat" === document.compatMode,submitBubbles: !0,changeBubbles: !0,focusinBubbles: !1,deleteExpando: !0,noCloneEvent: !0,inlineBlockNeedsLayout: !1,shrinkWrapBlocks: !1,reliableMarginRight: !0,boxSizingReliable: !0,pixelPosition: !1}, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, select.disabled = !0, support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch (e) {
            support.deleteExpando = !1
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent && (div.attachEvent("onclick", clickFn = function() {
            support.noCloneEvent = !1
        }), div.cloneNode(!0).fireEvent("onclick"), div.detachEvent("onclick", clickFn)), input = document.createElement("input"), input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value, input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), fragment = document.createDocumentFragment(), fragment.appendChild(div.lastChild), support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, support.appendChecked = input.checked, fragment.removeChild(input), fragment.appendChild(div), div.attachEvent)
            for (i in {submit: !0,change: !0,focusin: !0})
                eventName = "on" + i, isSupported = eventName in div, isSupported || (div.setAttribute(eventName, "return;"), isSupported = "function" == typeof div[eventName]), support[i + "Bubbles"] = isSupported;
        return jQuery(function() {
            var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;", body = document.getElementsByTagName("body")[0];
            body && (container = document.createElement("div"), container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", body.insertBefore(container, body.firstChild), div = document.createElement("div"), container.appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {width: "4px"}).width, marginDiv = document.createElement("div"), marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", div.appendChild(marginDiv), support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), "undefined" != typeof div.style.zoom && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", div.style.overflow = "visible", div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, container.style.zoom = 1), body.removeChild(container), container = div = tds = marginDiv = null)
        }), fragment.removeChild(div), all = a = select = opt = input = fragment = div = null, support
    }();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({cache: {},deletedIds: [],uuid: 0,expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),noData: {embed: !0,object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet: !0},hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem)
        },data: function(elem, name, data, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, ret, internalKey = jQuery.expando, getByName = "string" == typeof name, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
                if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined)
                    return id || (isNode ? elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++ : id = internalKey), cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret
            }
        },removeData: function(elem, name, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
                if (cache[id]) {
                    if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                        jQuery.isArray(name) || (name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(" ")));
                        for (i = 0, l = name.length; l > i; i++)
                            delete thisCache[name[i]];
                        if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache))
                            return
                    }
                    (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null)
                }
            }
        },_data: function(elem, name, data) {
            return jQuery.data(elem, name, data, !0)
        },acceptData: function(elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== !0 && elem.getAttribute("classid") === noData
        }}), jQuery.fn.extend({data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
            if (key === undefined) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (attr = elem.attributes, l = attr.length; l > i; i++)
                        name = attr[i].name, name.indexOf("data-") || (name = jQuery.camelCase(name.substring(5)), dataAttr(elem, name, data[name]));
                    jQuery._data(elem, "parsedAttrs", !0)
                }
                return data
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key)
            }) : (parts = key.split(".", 2), parts[1] = parts[1] ? "." + parts[1] : "", part = parts[1] + "!", jQuery.access(this, function(value) {
                return value === undefined ? (data = this.triggerHandler("getData" + part, [parts[0]]), data === undefined && elem && (data = jQuery.data(elem, key), data = dataAttr(elem, key, data)), data === undefined && parts[1] ? this.data(parts[0]) : data) : (parts[1] = value, void this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts), jQuery.data(this, key, value), self.triggerHandler("changeData" + part, parts)
                }))
            }, null, value, arguments.length > 1, null, !1))
        },removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }}), jQuery.extend({queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
        },dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type)
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
        },_queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery.removeData(elem, type + "queue", !0), jQuery.removeData(elem, key, !0)
                })})
        }}), jQuery.fn.extend({queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            })
        },dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },delay: function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        },clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [elements])
            };
            for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--; )
                tmp = jQuery._data(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj)
        }});
    var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        },removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        },prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        },removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = undefined, delete this[name]
                } catch (e) {
                }
            })
        },addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                });
            if (value && "string" == typeof value)
                for (classNames = value.split(core_rspace), i = 0, l = this.length; l > i; i++)
                    if (elem = this[i], 1 === elem.nodeType)
                        if (elem.className || 1 !== classNames.length) {
                            for (setClass = " " + elem.className + " ", c = 0, cl = classNames.length; cl > c; c++)
                                setClass.indexOf(" " + classNames[c] + " ") < 0 && (setClass += classNames[c] + " ");
                            elem.className = jQuery.trim(setClass)
                        } else
                            elem.className = value;
            return this
        },removeClass: function(value) {
            var removes, className, elem, c, cl, i, l;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                });
            if (value && "string" == typeof value || value === undefined)
                for (removes = (value || "").split(core_rspace), i = 0, l = this.length; l > i; i++)
                    if (elem = this[i], 1 === elem.nodeType && elem.className) {
                        for (className = (" " + elem.className + " ").replace(rclass, " "), c = 0, cl = removes.length; cl > c; c++)
                            for (; className.indexOf(" " + removes[c] + " ") >= 0; )
                                className = className.replace(" " + removes[c] + " ", " ");
                        elem.className = value ? jQuery.trim(className) : ""
                    }
            return this
        },toggleClass: function(value, stateVal) {
            var type = typeof value, isBool = "boolean" == typeof stateVal;
            return this.each(jQuery.isFunction(value) ? function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            } : function() {
                if ("string" === type)
                    for (var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace); className = classNames[i++]; )
                        state = isBool ? state : !self.hasClass(className), self[state ? "addClass" : "removeClass"](className);
                else
                    ("undefined" === type || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "")
            })
        },hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0)
                    return !0;
            return !1
        },val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length)
                    return isFunction = jQuery.isFunction(value), this.each(function(i) {
                        var val, self = jQuery(this);
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null == value ? "" : value + ""
                        })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val))
                    });
                if (elem)
                    return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
            }
        }}), jQuery.extend({valHooks: {option: {get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text
                }},select: {get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                        if (option = options[i], !(!option.selected && i !== index || (jQuery.support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(), one)
                                return value;
                            values.push(value)
                        }
                    return values
                },set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    return jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                    }), values.length || (elem.selectedIndex = -1), values
                }}},attrFn: {},attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
                return pass && jQuery.isFunction(jQuery.fn[name]) ? jQuery(elem)[name](value) : "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)), value !== undefined ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), value) : hooks && "get" in hooks && notxml && null !== (ret = hooks.get(elem, name)) ? ret : (ret = elem.getAttribute(name), null === ret ? undefined : ret))
        },removeAttr: function(elem, value) {
            var propName, attrNames, name, isBool, i = 0;
            if (value && 1 === elem.nodeType)
                for (attrNames = value.split(core_rspace); i < attrNames.length; i++)
                    name = attrNames[i], name && (propName = jQuery.propFix[name] || name, isBool = rboolean.test(name), isBool || jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name : propName), isBool && propName in elem && (elem[propName] = !1))
        },attrHooks: {type: {set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode)
                        jQuery.error("type property can't be changed");
                    else if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value
                    }
                }},value: {get: function(elem, name) {
                    return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.get(elem, name) : name in elem ? elem.value : null
                },set: function(elem, value, name) {
                    return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.set(elem, value, name) : void (elem.value = value)
                }}},propFix: {tabindex: "tabIndex",readonly: "readOnly","for": "htmlFor","class": "className",maxlength: "maxLength",cellspacing: "cellSpacing",cellpadding: "cellPadding",rowspan: "rowSpan",colspan: "colSpan",usemap: "useMap",frameborder: "frameBorder",contenteditable: "contentEditable"},prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType)
                return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
        },propHooks: {tabIndex: {get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
                }}}}), boolHook = {get: function(elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === !0 || "boolean" != typeof property && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== !1 ? name.toLowerCase() : undefined
        },set: function(elem, value, name) {
            var propName;
            return value === !1 ? jQuery.removeAttr(elem, name) : (propName = jQuery.propFix[name] || name, propName in elem && (elem[propName] = !0), elem.setAttribute(name, name.toLowerCase())), name
        }}, getSetAttribute || (fixSpecified = {name: !0,id: !0,coords: !0}, nodeHook = jQuery.valHooks.button = {get: function(elem, name) {
            var ret;
            return ret = elem.getAttributeNode(name), ret && (fixSpecified[name] ? "" !== ret.value : ret.specified) ? ret.value : undefined
        },set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || (ret = document.createAttribute(name), elem.setAttributeNode(ret)), ret.value = value + ""
        }}, jQuery.each(["width", "height"], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0
            }})
    }), jQuery.attrHooks.contenteditable = {get: nodeHook.get,set: function(elem, value, name) {
            "" === value && (value = "false"), nodeHook.set(elem, value, name)
        }}), jQuery.support.hrefNormalized || jQuery.each(["href", "src", "width", "height"], function(i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {get: function(elem) {
                var ret = elem.getAttribute(name, 2);
                return null === ret ? undefined : ret
            }})
    }), jQuery.support.style || (jQuery.attrHooks.style = {get: function(elem) {
            return elem.style.cssText.toLowerCase() || undefined
        },set: function(elem, value) {
            return elem.style.cssText = value + ""
        }}), jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null
        }})), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.support.checkOn || jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {get: function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value
            }}
    }), jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
            }})
    });
    var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/, rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function(events) {
        return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
    };
    jQuery.event = {add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
            if (3 !== elem.nodeType && 8 !== elem.nodeType && types && handler && (elemData = jQuery._data(elem))) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), events = elemData.events, events || (elemData.events = events = {}), eventHandle = elemData.handle, eventHandle || (elemData.handle = eventHandle = function(e) {
                    return "undefined" == typeof jQuery || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                }, eventHandle.elem = elem), types = jQuery.trim(hoverHack(types)).split(" "), t = 0; t < types.length; t++)
                    tns = rtypenamespace.exec(types[t]) || [], type = tns[1], namespaces = (tns[2] || "").split(".").sort(), special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({type: type,origType: tns[1],data: data,handler: handler,guid: handler.guid,selector: selector,needsContext: selector && jQuery.expr.match.needsContext.test(selector),namespace: namespaces.join(".")}, handleObjIn), handlers = events[type], handlers || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0;
                elem = null
            }
        },global: {},remove: function(elem, types, handler, selector, mappedTypes) {
            var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = jQuery.trim(hoverHack(types || "")).split(" "), t = 0; t < types.length; t++)
                    if (tns = rtypenamespace.exec(types[t]) || [], type = origType = tns[1], namespaces = tns[2], type) {
                        for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, eventType = events[type] || [], origCount = eventType.length, namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, j = 0; j < eventType.length; j++)
                            handleObj = eventType[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || namespaces && !namespaces.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (eventType.splice(j--, 1), handleObj.selector && eventType.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                        0 === eventType.length && origCount !== eventType.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                    } else
                        for (type in events)
                            jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery.removeData(elem, "events", !0))
            }
        },customEvent: {getData: !0,setData: !0,changeData: !0},trigger: function(event, data, elem, onlyHandlers) {
            if (!elem || 3 !== elem.nodeType && 8 !== elem.nodeType) {
                var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
                if (!rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf("!") >= 0 && (type = type.slice(0, -1), exclusive = !0), type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), elem && !jQuery.event.customEvent[type] || jQuery.event.global[type]))
                    if (event = "object" == typeof event ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type), event.type = type, event.isTrigger = !0, event.exclusive = exclusive, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, ontype = type.indexOf(":") < 0 ? "on" + type : "", elem) {
                        if (event.result = undefined, event.target || (event.target = elem), data = null != data ? jQuery.makeArray(data) : [], data.unshift(event), special = jQuery.event.special[type] || {}, !special.trigger || special.trigger.apply(elem, data) !== !1) {
                            if (eventPath = [[elem, special.bindType || type]], !onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                                for (bubbleType = special.delegateType || type, cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode, old = elem; cur; cur = cur.parentNode)
                                    eventPath.push([cur, bubbleType]), old = cur;
                                old === (elem.ownerDocument || document) && eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
                            }
                            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++)
                                cur = eventPath[i][0], event.type = eventPath[i][1], handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                            return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, data) !== !1 || "click" === type && jQuery.nodeName(elem, "a") || !jQuery.acceptData(elem) || ontype && elem[type] && ("focus" !== type && "blur" !== type || 0 !== event.target.offsetWidth) && !jQuery.isWindow(elem) && (old = elem[ontype], old && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = undefined, old && (elem[ontype] = old)), event.result
                        }
                    } else {
                        cache = jQuery.cache;
                        for (i in cache)
                            cache[i].events && cache[i].events[type] && jQuery.event.trigger(event, data, cache[i].handle.elem, !0)
                    }
            }
        },dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, handlers = (jQuery._data(this, "events") || {})[event.type] || [], delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                if (delegateCount && (!event.button || "click" !== event.type))
                    for (cur = event.target; cur != this; cur = cur.parentNode || this)
                        if (cur.disabled !== !0 || "click" !== event.type) {
                            for (selMatch = {}, matches = [], i = 0; delegateCount > i; i++)
                                handleObj = handlers[i], sel = handleObj.selector, selMatch[sel] === undefined && (selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), selMatch[sel] && matches.push(handleObj);
                            matches.length && handlerQueue.push({elem: cur,matches: matches})
                        }
                for (handlers.length > delegateCount && handlerQueue.push({elem: this,matches: handlers.slice(delegateCount)}), i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++)
                    for (matched = handlerQueue[i], event.currentTarget = matched.elem, j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++)
                        handleObj = matched.matches[j], (run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) && (event.data = handleObj.data, event.handleObj = handleObj, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), ret !== undefined && (event.result = ret, ret === !1 && (event.preventDefault(), event.stopPropagation())));
                return special.postDispatch && special.postDispatch.call(this, event), event.result
            }
        },props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks: {},keyHooks: {props: "char charCode key keyCode".split(" "),filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
            }},mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter: function(event, original) {
                var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
            }},fix: function(event) {
            if (event[jQuery.expando])
                return event;
            var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            for (event = jQuery.Event(originalEvent), i = copy.length; i; )
                prop = copy[--i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },special: {load: {noBubble: !0},focus: {delegateType: "focusin"},blur: {delegateType: "focusout"},beforeunload: {setup: function(data, namespaces, eventHandle) {
                    jQuery.isWindow(this) && (this.onbeforeunload = eventHandle)
                },teardown: function(namespaces, eventHandle) {
                    this.onbeforeunload === eventHandle && (this.onbeforeunload = null)
                }}},simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event, event, {type: type,isSimulated: !0,originalEvent: {}});
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
        }}, jQuery.event.handle = jQuery.event.dispatch, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1)
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && ("undefined" == typeof elem[name] && (elem[name] = null), elem.detachEvent(name, handle))
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
    }, jQuery.Event.prototype = {preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
        },isDefaultPrevented: returnFalse,isPropagationStopped: returnFalse,isImmediatePropagationStopped: returnFalse}, jQuery.each({mouseenter: "mouseover",mouseleave: "mouseout"}, function(orig, fix) {
        jQuery.event.special[orig] = {delegateType: fix,bindType: fix,handle: function(event) {
                {
                    var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                    handleObj.selector
                }
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
            }}
    }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                form && !jQuery._data(form, "_submit_attached") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0
                }), jQuery._data(form, "_submit_attached", !0))
            })
        },postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0))
        },teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit")
        }}), jQuery.support.changeBubbles || (jQuery.event.special.change = {setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0)
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0)
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0)
                }), jQuery._data(elem, "_change_attached", !0))
            })
        },handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0
        },teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName)
        }}), jQuery.support.focusinBubbles || jQuery.each({focus: "focusin",blur: "focusout"}, function(orig, fix) {
        var attaches = 0, handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
        };
        jQuery.event.special[fix] = {setup: function() {
                0 === attaches++ && document.addEventListener(orig, handler, !0)
            },teardown: function() {
                0 === --attaches && document.removeEventListener(orig, handler, !0)
            }}
    }), jQuery.fn.extend({on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = undefined);
                for (type in types)
                    this.on(type, selector, data, types[type], one);
                return this
            }
            if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1)
                fn = returnFalse;
            else if (!fn)
                return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments)
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj)
                return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
            if ("object" == typeof types) {
                for (type in types)
                    this.off(type, selector, types[type]);
                return this
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined), fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },unbind: function(types, fn) {
            return this.off(types, null, fn)
        },live: function(types, data, fn) {
            return jQuery(this.context).on(types, this.selector, data, fn), this
        },die: function(types, fn) {
            return jQuery(this.context).off(types, this.selector || "**", fn), this
        },delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        },trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },triggerHandler: function(type, data) {
            return this[0] ? jQuery.event.trigger(type, data, this[0], !0) : void 0
        },toggle: function(fn) {
            var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function(event) {
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                return jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1), event.preventDefault(), args[lastToggle].apply(this, arguments) || !1
            };
            for (toggler.guid = guid; i < args.length; )
                args[i++].guid = guid;
            return this.click(toggler)
        },hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }}), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return null == fn && (fn = data, data = null), arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }, rkeyEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.keyHooks), rmouseEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.mouseHooks)
    }), function(window, undefined) {
        function Sizzle(selector, context, results, seed) {
            results = results || [], context = context || document;
            var match, elem, xml, m, nodeType = context.nodeType;
            if (!selector || "string" != typeof selector)
                return results;
            if (1 !== nodeType && 9 !== nodeType)
                return [];
            if (xml = isXML(context), !xml && !seed && (match = rquickExpr.exec(selector)))
                if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode)
                            return results;
                        if (elem.id === m)
                            return results.push(elem), results
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m)
                        return results.push(elem), results
                } else {
                    if (match[2])
                        return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), results;
                    if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName)
                        return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), results
                }
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml)
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; )
                        seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                })
            })
        }
        function siblingCheck(a, b, ret) {
            if (a === b)
                return ret;
            for (var cur = a.nextSibling; cur; ) {
                if (cur === b)
                    return -1;
                cur = cur.nextSibling
            }
            return 1
        }
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + " "];
            if (cached)
                return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (tokens.push(matched = new Token(match.shift())), soFar = soFar.slice(matched.length), matched.type = match[0].replace(rtrim, " "));
                for (type in Expr.filter)
                    !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (tokens.push(matched = new Token(match.shift())), soFar = soFar.slice(matched.length), matched.type = type, matched.matches = match);
                if (!matched)
                    break
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === combinator.dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (; elem = elem[dir]; )
                    if (checkNonElements || 1 === elem.nodeType)
                        return matcher(elem, context, xml)
            } : function(elem, context, xml) {
                if (xml) {
                    for (; elem = elem[dir]; )
                        if ((checkNonElements || 1 === elem.nodeType) && matcher(elem, context, xml))
                            return elem
                } else
                    for (var cache, dirkey = dirruns + " " + doneName + " ", cachedkey = dirkey + cachedruns; elem = elem[dir]; )
                        if (checkNonElements || 1 === elem.nodeType) {
                            if ((cache = elem[expando]) === cachedkey)
                                return elem.sizset;
                            if ("string" == typeof cache && 0 === cache.indexOf(dirkey)) {
                                if (elem.sizset)
                                    return elem
                            } else {
                                if (elem[expando] = cachedkey, matcher(elem, context, xml))
                                    return elem.sizset = !0, elem;
                                elem.sizset = !1
                            }
                        }
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; )
                    if (!matchers[i](elem, context, xml))
                        return !1;
                return !0
            } : matchers[0]
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)
                (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                    for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--; )
                        (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; )
                                (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml)
                        }
                        for (i = matcherOut.length; i--; )
                            (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                } else
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
            })
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1
            }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                    return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                }]; len > i; i++)
                if (matcher = Expr.relative[tokens[i].type])
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                        for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++)
                            ;
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && tokens.join(""))
                    }
                    matchers.push(matcher)
                }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = null != expandContext, contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.E;
                for (outermost && (outermostContext = context !== document && context, cachedruns = superMatcher.el); null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j]; j++)
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break
                            }
                        outermost && (dirruns = dirrunsUnique, cachedruns = ++superMatcher.el)
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j]; j++)
                        matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0)
                            for (; i--; )
                                unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
            };
            return superMatcher.el = 0, bySet ? markFunction(superMatcher) : superMatcher
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++)
                Sizzle(selector, contexts[i], results);
            return results
        }
        function select(selector, context, results, seed, xml) {
            {
                var i, tokens, token, type, find, match = tokenize(selector);
                match.length
            }
            if (!seed && 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && !xml && Expr.relative[tokens[1].type]) {
                    if (context = Expr.find.ID(token.matches[0].replace(rbackslash, ""), context, xml)[0], !context)
                        return results;
                    selector = selector.slice(tokens.shift().length)
                }
                for (i = matchExpr.POS.test(selector) ? -1 : tokens.length - 1; i >= 0 && (token = tokens[i], !Expr.relative[type = token.type]); i--)
                    if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                        if (tokens.splice(i, 1), selector = seed.length && tokens.join(""), !selector)
                            return push.apply(results, slice.call(seed, 0)), results;
                        break
                    }
            }
            return compile(selector, match)(seed, context, xml, results, rsibling.test(selector)), results
        }
        function setFilters() {
        }
        var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = !0, strundefined = "undefined", expando = ("sizcache" + Math.random()).replace(".", ""), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, indexOf = [].indexOf || function(elem) {
            for (var i = 0, len = this.length; len > i; i++)
                if (this[i] === elem)
                    return i;
            return -1
        }, markFunction = function(fn, value) {
            return fn[expando] = null == value || value, fn
        }, createCache = function() {
            var cache = {}, keys = [];
            return markFunction(function(key, value) {
                return keys.push(key) > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
            }, cache)
        }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)", pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rsibling = /[\x20\t\r\n\f]*[+~]/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {ID: new RegExp("^#(" + characterEncoding + ")"),CLASS: new RegExp("^\\.(" + characterEncoding + ")"),NAME: new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),ATTR: new RegExp("^" + attributes),PSEUDO: new RegExp("^" + pseudos),POS: new RegExp(pos, "i"),CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),needsContext: new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")}, assert = function(fn) {
            var div = document.createElement("div");
            try {
                return fn(div)
            } catch (e) {
                return !1
            }finally {
                div = null
            }
        }, assertTagNameNoComments = assert(function(div) {
            return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length
        }), assertHrefNotNormalized = assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", div.firstChild && typeof div.firstChild.getAttribute !== strundefined && "#" === div.firstChild.getAttribute("href")
        }), assertAttributes = assert(function(div) {
            div.innerHTML = "<select></select>";
            var type = typeof div.lastChild.getAttribute("multiple");
            return "boolean" !== type && "string" !== type
        }), assertUsableClassName = assert(function(div) {
            return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", div.getElementsByClassName && div.getElementsByClassName("e").length ? (div.lastChild.className = "e", 2 === div.getElementsByClassName("e").length) : !1
        }), assertUsableName = assert(function(div) {
            div.id = expando + 0, div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>", docElem.insertBefore(div, docElem.firstChild);
            var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
            return assertGetIdNotName = !document.getElementById(expando), docElem.removeChild(div), pass
        });
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType
        } catch (e) {
            slice = function(i) {
                for (var elem, results = []; elem = this[i]; i++)
                    results.push(elem);
                return results
            }
        }
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        }, Sizzle.matchesSelector = function(elem, expr) {
            return Sizzle(expr, null, null, [elem]).length > 0
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent)
                        return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        ret += getText(elem)
                } else if (3 === nodeType || 4 === nodeType)
                    return elem.nodeValue
            } else
                for (; node = elem[i]; i++)
                    ret += getText(node);
            return ret
        }, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1
        }, contains = Sizzle.contains = docElem.contains ? function(a, b) {
            var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
            return a === bup || !!(bup && 1 === bup.nodeType && adown.contains && adown.contains(bup))
        } : docElem.compareDocumentPosition ? function(a, b) {
            return b && !!(16 & a.compareDocumentPosition(b))
        } : function(a, b) {
            for (; b = b.parentNode; )
                if (b === a)
                    return !0;
            return !1
        }, Sizzle.attr = function(elem, name) {
            var val, xml = isXML(elem);
            return xml || (name = name.toLowerCase()), (val = Expr.attrHandle[name]) ? val(elem) : xml || assertAttributes ? elem.getAttribute(name) : (val = elem.getAttributeNode(name), val ? "boolean" == typeof elem[name] ? elem[name] ? name : null : val.specified ? val.value : null : null)
        }, Expr = Sizzle.selectors = {cacheLength: 50,createPseudo: markFunction,match: matchExpr,attrHandle: assertHrefNotNormalized ? {} : {href: function(elem) {
                    return elem.getAttribute("href", 2)
                },type: function(elem) {
                    return elem.getAttribute("type")
                }},find: {ID: assertGetIdNotName ? function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                } : function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : []
                    }
                },TAG: assertTagNameNoComments ? function(tag, context) {
                    return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
                } : function(tag, context) {
                    var results = context.getElementsByTagName(tag);
                    if ("*" === tag) {
                        for (var elem, tmp = [], i = 0; elem = results[i]; i++)
                            1 === elem.nodeType && tmp.push(elem);
                        return tmp
                    }
                    return results
                },NAME: assertUsableName && function(tag, context) {
                    return typeof context.getElementsByName !== strundefined ? context.getElementsByName(name) : void 0
                },CLASS: assertUsableClassName && function(className, context, xml) {
                    return typeof context.getElementsByClassName === strundefined || xml ? void 0 : context.getElementsByClassName(className)
                }},relative: {">": {dir: "parentNode",first: !0}," ": {dir: "parentNode"},"+": {dir: "previousSibling",first: !0},"~": {dir: "previousSibling"}},preFilter: {ATTR: function(match) {
                    return match[1] = match[1].replace(rbackslash, ""), match[3] = (match[4] || match[5] || "").replace(rbackslash, ""), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                },CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1] ? (match[2] || Sizzle.error(match[0]), match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * ("even" === match[2] || "odd" === match[2])), match[4] = +(match[6] + match[7] || "odd" === match[2])) : match[2] && Sizzle.error(match[0]), match
                },PSEUDO: function(match) {
                    var unquoted, excess;
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[3] : (unquoted = match[4]) && (rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (unquoted = unquoted.slice(0, excess), match[0] = match[0].slice(0, excess)), match[2] = unquoted), match.slice(0, 3))
                }},filter: {ID: assertGetIdNotName ? function(id) {
                    return id = id.replace(rbackslash, ""), function(elem) {
                        return elem.getAttribute("id") === id
                    }
                } : function(id) {
                    return id = id.replace(rbackslash, ""), function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id
                    }
                },TAG: function(nodeName) {
                    return "*" === nodeName ? function() {
                        return !0
                    } : (nodeName = nodeName.replace(rbackslash, "").toLowerCase(), function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    })
                },CLASS: function(className) {
                    var pattern = classCache[expando][className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                    })
                },ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.substr(result.length - check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.substr(0, check.length + 1) === check + "-" : !1) : !0
                    }
                },CHILD: function(type, argument, first, last) {
                    return "nth" === type ? function(elem) {
                        var node, diff, parent = elem.parentNode;
                        if (1 === first && 0 === last)
                            return !0;
                        if (parent)
                            for (diff = 0, node = parent.firstChild; node && (1 !== node.nodeType || (diff++, elem !== node)); node = node.nextSibling)
                                ;
                        return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                    } : function(elem) {
                        var node = elem;
                        switch (type) {
                            case "only":
                            case "first":
                                for (; node = node.previousSibling; )
                                    if (1 === node.nodeType)
                                        return !1;
                                if ("first" === type)
                                    return !0;
                                node = elem;
                            case "last":
                                for (; node = node.nextSibling; )
                                    if (1 === node.nodeType)
                                        return !1;
                                return !0
                        }
                    }
                },PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; )
                            idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                    }) : function(elem) {
                        return fn(elem, 0, args)
                    }) : fn
                }},pseudos: {not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; )
                            (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                    }
                }),has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),enabled: function(elem) {
                    return elem.disabled === !1
                },disabled: function(elem) {
                    return elem.disabled === !0
                },checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                },selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                },parent: function(elem) {
                    return !Expr.pseudos.empty(elem)
                },empty: function(elem) {
                    var nodeType;
                    for (elem = elem.firstChild; elem; ) {
                        if (elem.nodeName > "@" || 3 === (nodeType = elem.nodeType) || 4 === nodeType)
                            return !1;
                        elem = elem.nextSibling
                    }
                    return !0
                },header: function(elem) {
                    return rheader.test(elem.nodeName)
                },text: function(elem) {
                    var type, attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === (type = elem.type) && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === type)
                },radio: createInputPseudo("radio"),checkbox: createInputPseudo("checkbox"),file: createInputPseudo("file"),password: createInputPseudo("password"),image: createInputPseudo("image"),submit: createButtonPseudo("submit"),reset: createButtonPseudo("reset"),button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                },input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },focus: function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },active: function(elem) {
                    return elem === elem.ownerDocument.activeElement
                },first: createPositionalPseudo(function() {
                    return [0]
                }),last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0 > argument ? argument + length : argument]
                }),even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }),odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }),lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; )
                        matchIndexes.push(i);
                    return matchIndexes
                }),gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; )
                        matchIndexes.push(i);
                    return matchIndexes
                })}}, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
            return a === b ? (hasDuplicate = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
        } : function(a, b) {
            if (a === b)
                return hasDuplicate = !0, 0;
            if (a.sourceIndex && b.sourceIndex)
                return a.sourceIndex - b.sourceIndex;
            var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
            if (aup === bup)
                return siblingCheck(a, b);
            if (!aup)
                return -1;
            if (!bup)
                return 1;
            for (; cur; )
                ap.unshift(cur), cur = cur.parentNode;
            for (cur = bup; cur; )
                bp.unshift(cur), cur = cur.parentNode;
            al = ap.length, bl = bp.length;
            for (var i = 0; al > i && bl > i; i++)
                if (ap[i] !== bp[i])
                    return siblingCheck(ap[i], bp[i]);
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
        }, [0, 0].sort(sortOrder), baseHasDuplicate = !hasDuplicate, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], i = 1, j = 0;
            if (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate) {
                for (; elem = results[i]; i++)
                    elem === results[i - 1] && (j = duplicates.push(i));
                for (; j--; )
                    results.splice(duplicates[j], 1)
            }
            return results
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        }, compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector + " "];
            if (!cached) {
                for (group || (group = tokenize(selector)), i = group.length; i--; )
                    cached = matcherFromTokens(group[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
            }
            return cached
        }, document.querySelectorAll && !function() {
            var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [":focus"], rbuggyMatches = [":active"], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
            assert(function(div) {
                div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
            }), assert(function(div) {
                div.innerHTML = "<p test=''></p>", div.querySelectorAll("[test^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"), div.innerHTML = "<input type='hidden'/>", div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled")
            }), rbuggyQSA = new RegExp(rbuggyQSA.join("|")), select = function(selector, context, results, seed, xml) {
                if (!seed && !xml && !rbuggyQSA.test(selector)) {
                    var groups, i, old = !0, nid = expando, newContext = context, newSelector = 9 === context.nodeType && selector;
                    if (1 === context.nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--; )
                            groups[i] = nid + groups[i].join("");
                        newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",")
                    }
                    if (newSelector)
                        try {
                            return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), results
                        } catch (qsaError) {
                        }finally {
                            old || context.removeAttribute("id")
                        }
                }
                return oldSelect(selector, context, results, seed, xml)
            }, matches && (assert(function(div) {
                disconnectedMatch = matches.call(div, "div");
                try {
                    matches.call(div, "[test!='']:sizzle"), rbuggyMatches.push("!=", pseudos)
                } catch (e) {
                }
            }), rbuggyMatches = new RegExp(rbuggyMatches.join("|")), Sizzle.matchesSelector = function(elem, expr) {
                if (expr = expr.replace(rattributeQuotes, "='$1']"), !isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr))
                    try {
                        var ret = matches.call(elem, expr);
                        if (ret || disconnectedMatch || elem.document && 11 !== elem.document.nodeType)
                            return ret
                    } catch (e) {
                    }
                return Sizzle(expr, null, null, [elem]).length > 0
            })
        }(), Expr.pseudos.nth = Expr.pseudos.eq, Expr.filters = setFilters.prototype = Expr.pseudos, Expr.setFilters = new setFilters, Sizzle.attr = jQuery.attr, jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains
    }(window);
    var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {children: !0,contents: !0,next: !0,prev: !0};
    jQuery.fn.extend({find: function(selector) {
            var i, l, length, n, r, ret, self = this;
            if ("string" != typeof selector)
                return jQuery(selector).filter(function() {
                    for (i = 0, l = self.length; l > i; i++)
                        if (jQuery.contains(self[i], this))
                            return !0
                });
            for (ret = this.pushStack("", "find", selector), i = 0, l = this.length; l > i; i++)
                if (length = ret.length, jQuery.find(selector, this[i], ret), i > 0)
                    for (n = length; n < ret.length; n++)
                        for (r = 0; length > r; r++)
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break
                            }
            return ret
        },has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++)
                    if (jQuery.contains(this, targets[i]))
                        return !0
            })
        },not: function(selector) {
            return this.pushStack(winnow(this, selector, !1), "not", selector)
        },filter: function(selector) {
            return this.pushStack(winnow(this, selector, !0), "filter", selector)
        },is: function(selector) {
            return !!selector && ("string" == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
        },closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType; ) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break
                    }
                    cur = cur.parentNode
                }
            return ret = ret.length > 1 ? jQuery.unique(ret) : ret, this.pushStack(ret, "closest", selectors)
        },index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },add: function(selector, context) {
            var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all))
        },addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
        }}), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null
        },parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },next: function(elem) {
            return sibling(elem, "nextSibling")
        },prev: function(elem) {
            return sibling(elem, "previousSibling")
        },nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }}, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return runtil.test(name) || (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), this.pushStack(ret, name, core_slice.call(arguments).join(","))
        }
    }), jQuery.extend({filter: function(expr, elems, not) {
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
        },dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until)); )
                1 === cur.nodeType && matched.push(cur), cur = cur[dir];
            return matched
        },sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling)
                1 === n.nodeType && n !== elem && r.push(n);
            return r
        }});
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rcheckableType = /^(?:checkbox|radio)$/, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {option: [1, "<select multiple='multiple'>", "</select>"],legend: [1, "<fieldset>", "</fieldset>"],thead: [1, "<table>", "</table>"],tr: [2, "<table><tbody>", "</tbody></table>"],td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],area: [1, "<map>", "</map>"],_default: [0, "", ""]}, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.support.htmlSerialize || (wrapMap._default = [1, "X<div>", "</div>"]), jQuery.fn.extend({text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        },wrapAll: function(html) {
            if (jQuery.isFunction(html))
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; )
                        elem = elem.firstChild;
                    return elem
                }).append(this)
            }
            return this
        },wrapInner: function(html) {
            return this.each(jQuery.isFunction(html) ? function(i) {
                jQuery(this).wrapInner(html.call(this, i))
            } : function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            })
        },wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        },append: function() {
            return this.domManip(arguments, !0, function(elem) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(elem)
            })
        },prepend: function() {
            return this.domManip(arguments, !0, function(elem) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(elem, this.firstChild)
            })
        },before: function() {
            if (!isDisconnected(this[0]))
                return this.domManip(arguments, !1, function(elem) {
                    this.parentNode.insertBefore(elem, this)
                });
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector)
            }
        },after: function() {
            if (!isDisconnected(this[0]))
                return this.domManip(arguments, !1, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling)
                });
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector)
            }
        },remove: function(selector, keepData) {
            for (var elem, i = 0; null != (elem = this[i]); i++)
                (!selector || jQuery.filter(selector, [elem]).length) && (keepData || 1 !== elem.nodeType || (jQuery.cleanData(elem.getElementsByTagName("*")), jQuery.cleanData([elem])), elem.parentNode && elem.parentNode.removeChild(elem));
            return this
        },empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++)
                for (1 === elem.nodeType && jQuery.cleanData(elem.getElementsByTagName("*")); elem.firstChild; )
                    elem.removeChild(elem.firstChild);
            return this
        },clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined)
                    return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                if (!("string" != typeof value || rnoInnerhtml.test(value) || !jQuery.support.htmlSerialize && rnoshimcache.test(value) || !jQuery.support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()])) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; l > i; i++)
                            elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(elem.getElementsByTagName("*")), elem.innerHTML = value);
                        elem = 0
                    } catch (e) {
                    }
                }
                elem && this.empty().append(value)
            }, null, value, arguments.length)
        },replaceWith: function(value) {
            return isDisconnected(this[0]) ? this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this : jQuery.isFunction(value) ? this.each(function(i) {
                var self = jQuery(this), old = self.html();
                self.replaceWith(value.call(this, i, old))
            }) : ("string" != typeof value && (value = jQuery(value).detach()), this.each(function() {
                var next = this.nextSibling, parent = this.parentNode;
                jQuery(this).remove(), next ? jQuery(next).before(value) : jQuery(parent).append(value)
            }))
        },detach: function(selector) {
            return this.remove(selector, !0)
        },domManip: function(args, table, callback) {
            args = [].concat.apply([], args);
            var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
            if (!jQuery.support.checkClone && l > 1 && "string" == typeof value && rchecked.test(value))
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback)
                });
            if (jQuery.isFunction(value))
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined), self.domManip(args, table, callback)
                });
            if (this[0]) {
                if (results = jQuery.buildFragment(args, this, scripts), fragment = results.fragment, first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)
                    for (table = table && jQuery.nodeName(first, "tr"), iNoClone = results.cacheable || l - 1; l > i; i++)
                        callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, !0, !0));
                fragment = first = null, scripts.length && jQuery.each(scripts, function(i, elem) {
                    elem.src ? jQuery.ajax ? jQuery.ajax({url: elem.src,type: "GET",dataType: "script",async: !1,global: !1,"throws": !0}) : jQuery.error("no ajax") : jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "")), elem.parentNode && elem.parentNode.removeChild(elem)
                })
            }
            return this
        }}), jQuery.buildFragment = function(args, context, scripts) {
        var fragment, cacheable, cachehit, first = args[0];
        return context = context || document, context = !context.nodeType && context[0] || context, context = context.ownerDocument || context, !(1 === args.length && "string" == typeof first && first.length < 512 && context === document && "<" === first.charAt(0)) || rnocache.test(first) || !jQuery.support.checkClone && rchecked.test(first) || !jQuery.support.html5Clone && rnoshimcache.test(first) || (cacheable = !0, fragment = jQuery.fragments[first], cachehit = fragment !== undefined), fragment || (fragment = context.createDocumentFragment(), jQuery.clean(args, context, fragment, scripts), cacheable && (jQuery.fragments[first] = cachehit && fragment)), {fragment: fragment,cacheable: cacheable}
    }, jQuery.fragments = {}, jQuery.each({appendTo: "append",prependTo: "prepend",insertBefore: "before",insertAfter: "after",replaceAll: "replaceWith"}, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = 1 === this.length && this[0].parentNode;
            if ((null == parent || parent && 11 === parent.nodeType && 1 === parent.childNodes.length) && 1 === l)
                return insert[original](this[0]), this;
            for (; l > i; i++)
                elems = (i > 0 ? this.clone(!0) : this).get(), jQuery(insert[i])[original](elems), ret = ret.concat(elems);
            return this.pushStack(ret, name, insert.selector)
        }
    }), jQuery.extend({clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                for (cloneFixAttributes(elem, clone), srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i)
                    destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
            if (dataAndEvents && (cloneCopyEvent(elem, clone), deepDataAndEvents))
                for (srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i)
                    cloneCopyEvent(srcElements[i], destElements[i]);
            return srcElements = destElements = null, clone
        },clean: function(elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
            for (context && "undefined" != typeof context.createDocumentFragment || (context = document), i = 0; null != (elem = elems[i]); i++)
                if ("number" == typeof elem && (elem += ""), elem) {
                    if ("string" == typeof elem)
                        if (rhtml.test(elem)) {
                            for (safe = safe || createSafeFragment(context), div = context.createElement("div"), safe.appendChild(div), elem = elem.replace(rxhtmlTag, "<$1></$2>"), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div.innerHTML = wrap[1] + elem + wrap[2]; depth--; )
                                div = div.lastChild;
                            if (!jQuery.support.tbody)
                                for (hasBody = rtbody.test(elem), tbody = "table" !== tag || hasBody ? "<table>" !== wrap[1] || hasBody ? [] : div.childNodes : div.firstChild && div.firstChild.childNodes, j = tbody.length - 1; j >= 0; --j)
                                    jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length && tbody[j].parentNode.removeChild(tbody[j]);
                            !jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild), elem = div.childNodes, div.parentNode.removeChild(div)
                        } else
                            elem = context.createTextNode(elem);
                    elem.nodeType ? ret.push(elem) : jQuery.merge(ret, elem)
                }
            if (div && (elem = div = safe = null), !jQuery.support.appendChecked)
                for (i = 0; null != (elem = ret[i]); i++)
                    jQuery.nodeName(elem, "input") ? fixDefaultChecked(elem) : "undefined" != typeof elem.getElementsByTagName && jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
            if (fragment)
                for (handleScript = function(elem) {
                    return !elem.type || rscriptType.test(elem.type) ? scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem) : void 0
                }, i = 0; null != (elem = ret[i]); i++)
                    jQuery.nodeName(elem, "script") && handleScript(elem) || (fragment.appendChild(elem), "undefined" != typeof elem.getElementsByTagName && (jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript), ret.splice.apply(ret, [i + 1, 0].concat(jsTags)), i += jsTags.length));
            return ret
        },cleanData: function(elems, acceptData) {
            for (var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++)
                if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
                    if (data.events)
                        for (type in data.events)
                            special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : elem.removeAttribute ? elem.removeAttribute(internalKey) : elem[internalKey] = null, jQuery.deletedIds.push(id))
                }
        }}), function() {
        var matched, browser;
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {browser: match[1] || "",version: match[2] || "0"}
        }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0), jQuery.browser = browser, jQuery.sub = function() {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context)
            }
            jQuery.extend(!0, jQuerySub, this), jQuerySub.superclass = this, jQuerySub.fn = jQuerySub.prototype = this(), jQuerySub.fn.constructor = jQuerySub, jQuerySub.sub = this.sub, jQuerySub.fn.init = function(selector, context) {
                return context && context instanceof jQuery && !(context instanceof jQuerySub) && (context = jQuerySub(context)), jQuery.fn.init.call(this, selector, context, rootjQuerySub)
            }, jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub
        }
    }();
    var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"), elemdisplay = {BODY: "block"}, cssShow = {position: "absolute",visibility: "hidden",display: "block"}, cssNormalTransform = {letterSpacing: 0,fontWeight: 400}, cssExpand = ["Top", "Right", "Bottom", "Left"], cssPrefixes = ["Webkit", "O", "Moz", "ms"], eventsToggle = jQuery.fn.toggle;
    jQuery.fn.extend({css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },show: function() {
            return showHide(this, !0)
        },hide: function() {
            return showHide(this)
        },toggle: function(state, fn2) {
            var bool = "boolean" == typeof state;
            return jQuery.isFunction(state) && jQuery.isFunction(fn2) ? eventsToggle.apply(this, arguments) : this.each(function() {
                (bool ? state : isHidden(this)) ? jQuery(this).show() : jQuery(this).hide()
            })
        }}), jQuery.extend({cssHooks: {opacity: {get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret
                    }
                }}},cssNumber: {fillOpacity: !0,fontWeight: !0,lineHeight: !0,opacity: !0,orphans: !0,widows: !0,zIndex: !0,zoom: !0},cssProps: {"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"},style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined)
                    return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined)))
                    try {
                        style[name] = value
                    } catch (e) {
                    }
            }
        },css: function(elem, name, numeric, extra) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), val === undefined && (val = curCSS(elem, name)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), numeric || extra !== undefined ? (num = parseFloat(val), numeric || jQuery.isNumeric(num) ? num || 0 : val) : val
        },swap: function(elem, options, callback) {
            var ret, name, old = {};
            for (name in options)
                old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.call(elem);
            for (name in options)
                elem.style[name] = old[name];
            return ret
        }}), window.getComputedStyle ? curCSS = function(elem, name) {
        var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
        return computed && (ret = computed.getPropertyValue(name) || computed[name], "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), ret
    } : document.documentElement.currentStyle && (curCSS = function(elem, name) {
        var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
        return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rsLeft = elem.runtimeStyle && elem.runtimeStyle.left, rsLeft && (elem.runtimeStyle.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (elem.runtimeStyle.left = rsLeft)), "" === ret ? "auto" : ret
    }), jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {get: function(elem, computed, extra) {
                return computed ? 0 === elem.offsetWidth && rdisplayswap.test(curCSS(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra)
                }) : getWidthOrHeight(elem, name, extra) : void 0
            },set: function(elem, value, extra) {
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing")) : 0)
            }}
    }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
        },set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, value >= 1 && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
        }}), jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {get: function(elem, computed) {
                return jQuery.swap(elem, {display: "inline-block"}, function() {
                    return computed ? curCSS(elem, "marginRight") : void 0
                })
            }}), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function(i, prop) {
            jQuery.cssHooks[prop] = {get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, prop);
                        return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" : ret
                    }
                }}
        })
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
        return 0 === elem.offsetWidth && 0 === elem.offsetHeight || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || curCSS(elem, "display"))
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem)
    }), jQuery.each({margin: "",padding: "",border: "Width"}, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
                var i, parts = "string" == typeof value ? value.split(" ") : [value], expanded = {};
                for (i = 0; 4 > i; i++)
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }}, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({serialize: function() {
            return jQuery.param(this.serializeArray())
        },serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {name: elem.name,value: val.replace(rCRLF, "\r\n")}
                }) : {name: elem.name,value: val.replace(rCRLF, "\r\n")}
            }).get()
        }}), jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        };
        if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a))
            jQuery.each(a, function() {
                add(this.name, this.value)
            });
        else
            for (prefix in a)
                buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load)
            return _load.apply(this, arguments);
        if (!this.length)
            return this;
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), jQuery.ajax({url: url,type: type,dataType: "html",data: params,complete: function(jqXHR, status) {
                callback && self.each(callback, response || [jqXHR.responseText, status, jqXHR])
            }}).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
        }), this
    }, jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f)
        }
    }), jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), jQuery.ajax({type: method,url: url,data: data,success: callback,dataType: type})
        }
    }), jQuery.extend({getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        },getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(target, jQuery.ajaxSettings) : (settings = target, target = jQuery.ajaxSettings), ajaxExtend(target, settings), target
        },ajaxSettings: {url: ajaxLocation,isLocal: rlocalProtocol.test(ajaxLocParts[1]),global: !0,type: "GET",contentType: "application/x-www-form-urlencoded; charset=UTF-8",processData: !0,async: !0,accepts: {xml: "application/xml, text/xml",html: "text/html",text: "text/plain",json: "application/json, text/javascript","*": allTypes},contents: {xml: /xml/,html: /html/,json: /json/},responseFields: {xml: "responseXML",text: "responseText"},converters: {"* text": window.String,"text html": !0,"text json": jQuery.parseJSON,"text xml": jQuery.parseXML},flatOptions: {context: !0,url: !0}},ajaxPrefilter: addToPrefiltersOrTransports(prefilters),ajaxTransport: addToPrefiltersOrTransports(transports),ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), status >= 200 && 300 > status || 304 === status ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[ifModifiedKey] = modified), modified = jqXHR.getResponseHeader("Etag"), modified && (jQuery.etag[ifModifiedKey] = modified)), 304 === status ? (statusText = "notmodified", isSuccess = !0) : (isSuccess = ajaxConvert(s, response), statusText = isSuccess.state, success = isSuccess.data, error = isSuccess.error, isSuccess = !error)) : (error = statusText, (!statusText || status) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }
            "object" == typeof url && (options = url, url = undefined), options = options || {};
            var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {readyState: 0,setRequestHeader: function(name, value) {
                    if (!state) {
                        var lname = name.toLowerCase();
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value
                    }
                    return this
                },getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null
                },getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders)
                            for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); )
                                responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return match === undefined ? null : match
                },overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this
                },abort: function(statusText) {
                    return statusText = statusText || strAbort, transport && transport.abort(statusText), done(0, statusText), this
                }};
            if (deferred.promise(jqXHR), jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, jqXHR.complete = completeDeferred.add, jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (2 > state)
                        for (tmp in map)
                            statusCode[tmp] = [statusCode[tmp], map[tmp]];
                    else
                        tmp = map[jqXHR.status], jqXHR.always(tmp)
                }
                return this
            }, s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace), null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? 80 : 443)) == (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? 80 : 443)))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state)
                return jqXHR;
            if (fireGlobals = s.global, s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), !s.hasContent && (s.data && (s.url += (rquery.test(s.url) ? "&" : "?") + s.data, delete s.data), ifModifiedKey = s.url, s.cache === !1)) {
                var ts = jQuery.now(), ret = s.url.replace(rts, "$1_=" + ts);
                s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
            }
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), s.ifModified && (ifModifiedKey = ifModifiedKey || s.url, jQuery.lastModified[ifModifiedKey] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]), jQuery.etag[ifModifiedKey] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers)
                jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state))
                return jqXHR.abort();
            strAbort = "abort";
            for (i in {success: 1,error: 1,complete: 1})
                jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout")
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done)
                } catch (e) {
                    if (!(2 > state))
                        throw e;
                    done(-1, e)
                }
            } else
                done(-1, "No Transport");
            return jqXHR
        },active: 0,lastModified: {},etag: {}});
    var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
    jQuery.ajaxSetup({jsonp: "callback",jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback
        }}), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== !1, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && "string" == typeof data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
        return "jsonp" === s.dataTypes[0] || replaceInUrl || replaceInData ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, overwritten = window[callbackName], replaceInUrl ? s.url = url.replace(rjsonp, "$1" + callbackName) : replaceInData ? s.data = data.replace(rjsonp, "$1" + callbackName) : hasCallback && (s.url += (rquestion.test(url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
        }, s.dataTypes[0] = "json", window[callbackName] = function() {
            responseContainer = arguments
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = undefined
        }), "script") : void 0
    }), jQuery.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents: {script: /javascript|ecmascript/},converters: {"text script": function(text) {
                return jQuery.globalEval(text), text
            }}}), jQuery.ajaxPrefilter("script", function(s) {
        s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1)
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {send: function(_, callback) {
                    script = document.createElement("script"), script.async = "async", s.scriptCharset && (script.charset = s.scriptCharset), script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, head && script.parentNode && head.removeChild(script), script = undefined, isAbort || callback(200, "success"))
                    }, head.insertBefore(script, head.firstChild)
                },abort: function() {
                    script && script.onload(0, 1)
                }}
        }
    });
    var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function() {
        for (var key in xhrCallbacks)
            xhrCallbacks[key](0, 1)
    } : !1, xhrId = 0;
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR()
    } : createStandardXHR, function(xhr) {
        jQuery.extend(jQuery.support, {ajax: !!xhr,cors: !!xhr && "withCredentials" in xhr})
    }(jQuery.ajaxSettings.xhr()), jQuery.support.ajax && jQuery.ajaxTransport(function(s) {
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {send: function(headers, complete) {
                    var handle, i, xhr = s.xhr();
                    if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), s.xhrFields)
                        for (i in s.xhrFields)
                            xhr[i] = s.xhrFields[i];
                    s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in headers)
                            xhr.setRequestHeader(i, headers[i])
                    } catch (_) {
                    }
                    xhr.send(s.hasContent && s.data || null), callback = function(_, isAbort) {
                        var status, statusText, responseHeaders, responses, xml;
                        try {
                            if (callback && (isAbort || 4 === xhr.readyState))
                                if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort)
                                    4 !== xhr.readyState && xhr.abort();
                                else {
                                    status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), responses = {}, xml = xhr.responseXML, xml && xml.documentElement && (responses.xml = xml);
                                    try {
                                        responses.text = xhr.responseText
                                    } catch (e) {
                                    }
                                    try {
                                        statusText = xhr.statusText
                                    } catch (e) {
                                        statusText = ""
                                    }
                                    status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                                }
                        } catch (firefoxAccessException) {
                            isAbort || complete(-1, firefoxAccessException)
                        }
                        responses && complete(status, statusText, responses, responseHeaders)
                    }, s.async ? 4 === xhr.readyState ? setTimeout(callback, 0) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback()
                },abort: function() {
                    callback && callback(0, 1)
                }}
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {"*": [function(prop, value) {
                var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
                if (parts) {
                    if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), "px" !== unit && start) {
                        start = jQuery.css(tween.elem, prop, !0) || end || 1;
                        do
                            scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit);
                        while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                    }
                    tween.unit = unit, tween.start = start, tween.end = parts[1] ? start + (parts[1] + 1) * end : end
                }
                return tween
            }]};
    jQuery.Animation = jQuery.extend(Animation, {tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++)
                prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
        },prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
        }}), jQuery.Tween = Tween, Tween.prototype = {constructor: Tween,init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
        }}, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {_default: {get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, !1, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
            },set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
            }}}, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }}, jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
        }
    }), jQuery.fn.extend({fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback)
        },animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                empty && anim.stop(!0)
            };
            return empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd)
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index)
                    data[index] && data[index].stop && stopQueue(data[index]);
                else
                    for (index in data)
                        data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; )
                    timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
            })
        }}), jQuery.each({slideDown: genFx("show"),slideUp: genFx("hide"),slideToggle: genFx("toggle"),fadeIn: {opacity: "show"},fadeOut: {opacity: "hide"},fadeToggle: {opacity: "toggle"}}, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,duration: speed,easing: fn && easing || easing && !jQuery.isFunction(easing) && easing};
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
        }, opt
    }, jQuery.easing = {linear: function(p) {
            return p
        },swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        }}, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++)
            timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = undefined
    }, jQuery.fx.timer = function(timer) {
        timer() && jQuery.timers.push(timer) && !timerId && (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }, jQuery.fx.interval = 13, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null
    }, jQuery.fx.speeds = {slow: 600,fast: 200,_default: 400}, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }).length
    });
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function(options) {
        if (arguments.length)
            return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            });
        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {top: 0,left: 0}, elem = this[0], doc = elem && elem.ownerDocument;
        if (doc)
            return (body = doc.body) === elem ? jQuery.offset.bodyOffset(elem) : (docElem = doc.documentElement, jQuery.contains(docElem, elem) ? ("undefined" != typeof elem.getBoundingClientRect && (box = elem.getBoundingClientRect()), win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = win.pageYOffset || docElem.scrollTop, scrollLeft = win.pageXOffset || docElem.scrollLeft, {top: box.top + scrollTop - clientTop,left: box.left + scrollLeft - clientLeft}) : box)
    }, jQuery.offset = {bodyOffset: function(body) {
            var top = body.offsetTop, left = body.offsetLeft;
            return jQuery.support.doesNotIncludeMarginInBodyOffset && (top += parseFloat(jQuery.css(body, "marginTop")) || 0, left += parseFloat(jQuery.css(body, "marginLeft")) || 0), {top: top,left: left}
        },setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            "static" === position && (elem.style.position = "relative");
            var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1, props = {}, curPosition = {};
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
        }}, jQuery.fn.extend({position: function() {
            if (this[0]) {
                var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {top: 0,left: 0} : offsetParent.offset();
                return offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0, offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0, parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0, parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0, {top: offset.top - parentOffset.top,left: offset.left - parentOffset.left}
            }
        },offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || document.body; offsetParent && !rroot.test(offsetParent.nodeName) && "static" === jQuery.css(offsetParent, "position"); )
                    offsetParent = offsetParent.offsetParent;
                return offsetParent || document.body
            })
        }}), jQuery.each({scrollLeft: "pageXOffset",scrollTop: "pageYOffset"}, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val)
            }, method, val, arguments.length, null)
        }
    }), jQuery.each({Height: "height",Width: "width"}, function(name, type) {
        jQuery.each({padding: "inner" + name,content: type,"": "outer" + name}, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    }), window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return jQuery
    })
}(window), function() {
    var root = this, previousUnderscore = root._, breaker = {}, ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty, nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, _ = function(obj) {
        return obj instanceof _ ? obj : this instanceof _ ? void (this._wrapped = obj) : new _(obj)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), exports._ = _) : root._ = _, _.VERSION = "1.5.2";
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (null != obj)
            if (nativeForEach && obj.forEach === nativeForEach)
                obj.forEach(iterator, context);
            else if (obj.length === +obj.length) {
                for (var i = 0, length = obj.length; length > i; i++)
                    if (iterator.call(context, obj[i], i, obj) === breaker)
                        return
            } else
                for (var keys = _.keys(obj), i = 0, length = keys.length; length > i; i++)
                    if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
                        return
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        return null == obj ? results : nativeMap && obj.map === nativeMap ? obj.map(iterator, context) : (each(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list))
        }), results)
    };
    var reduceError = "Reduce of empty array with no initial value";
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce)
            return context && (iterator = _.bind(iterator, context)), initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        if (each(obj, function(value, index, list) {
            initial ? memo = iterator.call(context, memo, value, index, list) : (memo = value, initial = !0)
        }), !initial)
            throw new TypeError(reduceError);
        return memo
    }, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight)
            return context && (iterator = _.bind(iterator, context)), initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length
        }
        if (each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length, initial ? memo = iterator.call(context, memo, obj[index], index, list) : (memo = obj[index], initial = !0)
        }), !initial)
            throw new TypeError(reduceError);
        return memo
    }, _.find = _.detect = function(obj, iterator, context) {
        var result;
        return any(obj, function(value, index, list) {
            return iterator.call(context, value, index, list) ? (result = value, !0) : void 0
        }), result
    }, _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        return null == obj ? results : nativeFilter && obj.filter === nativeFilter ? obj.filter(iterator, context) : (each(obj, function(value, index, list) {
            iterator.call(context, value, index, list) && results.push(value)
        }), results)
    }, _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list)
        }, context)
    }, _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = !0;
        return null == obj ? result : nativeEvery && obj.every === nativeEvery ? obj.every(iterator, context) : (each(obj, function(value, index, list) {
            return (result = result && iterator.call(context, value, index, list)) ? void 0 : breaker
        }), !!result)
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = !1;
        return null == obj ? result : nativeSome && obj.some === nativeSome ? obj.some(iterator, context) : (each(obj, function(value, index, list) {
            return result || (result = iterator.call(context, value, index, list)) ? breaker : void 0
        }), !!result)
    };
    _.contains = _.include = function(obj, target) {
        return null == obj ? !1 : nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) : any(obj, function(value) {
            return value === target
        })
    }, _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2), isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            return (isFunc ? method : value[method]).apply(value, args)
        })
    }, _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key]
        })
    }, _.where = function(obj, attrs, first) {
        return _.isEmpty(attrs) ? first ? void 0 : [] : _[first ? "find" : "filter"](obj, function(value) {
            for (var key in attrs)
                if (attrs[key] !== value[key])
                    return !1;
            return !0
        })
    }, _.findWhere = function(obj, attrs) {
        return _.where(obj, attrs, !0)
    }, _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535)
            return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj))
            return -1 / 0;
        var result = {computed: -1 / 0,value: -1 / 0};
        return each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed > result.computed && (result = {value: value,computed: computed})
        }), result.value
    }, _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535)
            return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj))
            return 1 / 0;
        var result = {computed: 1 / 0,value: 1 / 0};
        return each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed < result.computed && (result = {value: value,computed: computed})
        }), result.value
    }, _.shuffle = function(obj) {
        var rand, index = 0, shuffled = [];
        return each(obj, function(value) {
            rand = _.random(index++), shuffled[index - 1] = shuffled[rand], shuffled[rand] = value
        }), shuffled
    }, _.sample = function(obj, n, guard) {
        return arguments.length < 2 || guard ? obj[_.random(obj.length - 1)] : _.shuffle(obj).slice(0, Math.max(0, n))
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value]
        }
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {value: value,index: index,criteria: iterator.call(context, value, index, list)}
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            if (a !== b) {
                if (a > b || void 0 === a)
                    return 1;
                if (b > a || void 0 === b)
                    return -1
            }
            return left.index - right.index
        }), "value")
    };
    var group = function(behavior) {
        return function(obj, value, context) {
            var result = {}, iterator = null == value ? _.identity : lookupIterator(value);
            return each(obj, function(value, index) {
                var key = iterator.call(context, value, index, obj);
                behavior(result, key, value)
            }), result
        }
    };
    _.groupBy = group(function(result, key, value) {
        (_.has(result, key) ? result[key] : result[key] = []).push(value)
    }), _.indexBy = group(function(result, key, value) {
        result[key] = value
    }), _.countBy = group(function(result, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1
    }), _.sortedIndex = function(array, obj, iterator, context) {
        iterator = null == iterator ? _.identity : lookupIterator(iterator);
        for (var value = iterator.call(context, obj), low = 0, high = array.length; high > low; ) {
            var mid = low + high >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid
        }
        return low
    }, _.toArray = function(obj) {
        return obj ? _.isArray(obj) ? slice.call(obj) : obj.length === +obj.length ? _.map(obj, _.identity) : _.values(obj) : []
    }, _.size = function(obj) {
        return null == obj ? 0 : obj.length === +obj.length ? obj.length : _.keys(obj).length
    }, _.first = _.head = _.take = function(array, n, guard) {
        return null == array ? void 0 : null == n || guard ? array[0] : slice.call(array, 0, n)
    }, _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (null == n || guard ? 1 : n))
    }, _.last = function(array, n, guard) {
        return null == array ? void 0 : null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0))
    }, _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null == n || guard ? 1 : n)
    }, _.compact = function(array) {
        return _.filter(array, _.identity)
    };
    var flatten = function(input, shallow, output) {
        return shallow && _.every(input, _.isArray) ? concat.apply(output, input) : (each(input, function(value) {
            _.isArray(value) || _.isArguments(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value)
        }), output)
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, [])
    }, _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1))
    }, _.uniq = _.unique = function(array, isSorted, iterator, context) {
        _.isFunction(isSorted) && (context = iterator, iterator = isSorted, isSorted = !1);
        var initial = iterator ? _.map(array, iterator, context) : array, results = [], seen = [];
        return each(initial, function(value, index) {
            (isSorted ? index && seen[seen.length - 1] === value : _.contains(seen, value)) || (seen.push(value), results.push(array[index]))
        }), results
    }, _.union = function() {
        return _.uniq(_.flatten(arguments, !0))
    }, _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0
            })
        })
    }, _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value)
        })
    }, _.zip = function() {
        for (var length = _.max(_.pluck(arguments, "length").concat(0)), results = new Array(length), i = 0; length > i; i++)
            results[i] = _.pluck(arguments, "" + i);
        return results
    }, _.object = function(list, values) {
        if (null == list)
            return {};
        for (var result = {}, i = 0, length = list.length; length > i; i++)
            values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result
    }, _.indexOf = function(array, item, isSorted) {
        if (null == array)
            return -1;
        var i = 0, length = array.length;
        if (isSorted) {
            if ("number" != typeof isSorted)
                return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
            i = 0 > isSorted ? Math.max(0, length + isSorted) : isSorted
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf)
            return array.indexOf(item, isSorted);
        for (; length > i; i++)
            if (array[i] === item)
                return i;
        return -1
    }, _.lastIndexOf = function(array, item, from) {
        if (null == array)
            return -1;
        var hasIndex = null != from;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf)
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        for (var i = hasIndex ? from : array.length; i--; )
            if (array[i] === item)
                return i;
        return -1
    }, _.range = function(start, stop, step) {
        arguments.length <= 1 && (stop = start || 0, start = 0), step = arguments[2] || 1;
        for (var length = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = new Array(length); length > idx; )
            range[idx++] = start, start += step;
        return range
    };
    var ctor = function() {
    };
    _.bind = function(func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind)
            return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func))
            throw new TypeError;
        return args = slice.call(arguments, 2), bound = function() {
            if (!(this instanceof bound))
                return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            return Object(result) === result ? result : self
        }
    }, _.partial = function(func) {
        var args = slice.call(arguments, 1);
        return function() {
            return func.apply(this, args.concat(slice.call(arguments)))
        }
    }, _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (0 === funcs.length)
            throw new Error("bindAll must be passed function names");
        return each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj)
        }), obj
    }, _.memoize = function(func, hasher) {
        var memo = {};
        return hasher || (hasher = _.identity), function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments)
        }
    }, _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args)
        }, wait)
    }, _.defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)))
    }, _.throttle = function(func, wait, options) {
        var context, args, result, timeout = null, previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === !1 ? 0 : new Date, timeout = null, result = func.apply(context, args)
        };
        return function() {
            var now = new Date;
            previous || options.leading !== !1 || (previous = now);
            var remaining = wait - (now - previous);
            return context = this, args = arguments, 0 >= remaining ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : timeout || options.trailing === !1 || (timeout = setTimeout(later, remaining)), result
        }
    }, _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function() {
            context = this, args = arguments, timestamp = new Date;
            var later = function() {
                var last = new Date - timestamp;
                wait > last ? timeout = setTimeout(later, wait - last) : (timeout = null, immediate || (result = func.apply(context, args)))
            }, callNow = immediate && !timeout;
            return timeout || (timeout = setTimeout(later, wait)), callNow && (result = func.apply(context, args)), result
        }
    }, _.once = function(func) {
        var memo, ran = !1;
        return function() {
            return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, memo)
        }
    }, _.wrap = function(func, wrapper) {
        return function() {
            var args = [func];
            return push.apply(args, arguments), wrapper.apply(this, args)
        }
    }, _.compose = function() {
        var funcs = arguments;
        return function() {
            for (var args = arguments, i = funcs.length - 1; i >= 0; i--)
                args = [funcs[i].apply(this, args)];
            return args[0]
        }
    }, _.after = function(times, func) {
        return function() {
            return --times < 1 ? func.apply(this, arguments) : void 0
        }
    }, _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj))
            throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj)
            _.has(obj, key) && keys.push(key);
        return keys
    }, _.values = function(obj) {
        for (var keys = _.keys(obj), length = keys.length, values = new Array(length), i = 0; length > i; i++)
            values[i] = obj[keys[i]];
        return values
    }, _.pairs = function(obj) {
        for (var keys = _.keys(obj), length = keys.length, pairs = new Array(length), i = 0; length > i; i++)
            pairs[i] = [keys[i], obj[keys[i]]];
        return pairs
    }, _.invert = function(obj) {
        for (var result = {}, keys = _.keys(obj), i = 0, length = keys.length; length > i; i++)
            result[obj[keys[i]]] = keys[i];
        return result
    }, _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj)
            _.isFunction(obj[key]) && names.push(key);
        return names.sort()
    }, _.extend = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source)
                for (var prop in source)
                    obj[prop] = source[prop]
        }), obj
    }, _.pick = function(obj) {
        var copy = {}, keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        return each(keys, function(key) {
            key in obj && (copy[key] = obj[key])
        }), copy
    }, _.omit = function(obj) {
        var copy = {}, keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj)
            _.contains(keys, key) || (copy[key] = obj[key]);
        return copy
    }, _.defaults = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source)
                for (var prop in source)
                    void 0 === obj[prop] && (obj[prop] = source[prop])
        }), obj
    }, _.clone = function(obj) {
        return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj
    }, _.tap = function(obj, interceptor) {
        return interceptor(obj), obj
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b)
            return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b)
            return a === b;
        a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className != toString.call(b))
            return !1;
        switch (className) {
            case "[object String]":
                return a == String(b);
            case "[object Number]":
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof b)
            return !1;
        for (var length = aStack.length; length--; )
            if (aStack[length] == a)
                return bStack[length] == b;
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor))
            return !1;
        aStack.push(a), bStack.push(b);
        var size = 0, result = !0;
        if ("[object Array]" == className) {
            if (size = a.length, result = size == b.length)
                for (; size-- && (result = eq(a[size], b[size], aStack, bStack)); )
                    ;
        } else {
            for (var key in a)
                if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))))
                    break;
            if (result) {
                for (key in b)
                    if (_.has(b, key) && !size--)
                        break;
                result = !size
            }
        }
        return aStack.pop(), bStack.pop(), result
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], [])
    }, _.isEmpty = function(obj) {
        if (null == obj)
            return !0;
        if (_.isArray(obj) || _.isString(obj))
            return 0 === obj.length;
        for (var key in obj)
            if (_.has(obj, key))
                return !1;
        return !0
    }, _.isElement = function(obj) {
        return !(!obj || 1 !== obj.nodeType)
    }, _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" == toString.call(obj)
    }, _.isObject = function(obj) {
        return obj === Object(obj)
    }, each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) == "[object " + name + "]"
        }
    }), _.isArguments(arguments) || (_.isArguments = function(obj) {
        return !(!obj || !_.has(obj, "callee"))
    }), "function" != typeof /./ && (_.isFunction = function(obj) {
        return "function" == typeof obj
    }), _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj))
    }, _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj
    }, _.isBoolean = function(obj) {
        return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj)
    }, _.isNull = function(obj) {
        return null === obj
    }, _.isUndefined = function(obj) {
        return void 0 === obj
    }, _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key)
    }, _.noConflict = function() {
        return root._ = previousUnderscore, this
    }, _.identity = function(value) {
        return value
    }, _.times = function(n, iterator, context) {
        for (var accum = Array(Math.max(0, n)), i = 0; n > i; i++)
            accum[i] = iterator.call(context, i);
        return accum
    }, _.random = function(min, max) {
        return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1))
    };
    var entityMap = {escape: {"&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#x27;"}};
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {escape: new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),unescape: new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")};
    _.each(["escape", "unescape"], function(method) {
        _[method] = function(string) {
            return null == string ? "" : ("" + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match]
            })
        }
    }), _.result = function(object, property) {
        if (null == object)
            return void 0;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value
    }, _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                return push.apply(args, arguments), result.call(this, func.apply(_, args))
            }
        })
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id
    }, _.templateSettings = {evaluate: /<%([\s\S]+?)%>/g,interpolate: /<%=([\s\S]+?)%>/g,escape: /<%-([\s\S]+?)%>/g};
    var noMatch = /(.)^/, escapes = {"'": "'","\\": "\\","\r": "r","\n": "n","	": "t","\u2028": "u2028","\u2029": "u2029"}, escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"), index = 0, source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            return source += text.slice(index, offset).replace(escaper, function(match) {
                return "\\" + escapes[match]
            }), escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"), interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"), evaluate && (source += "';\n" + evaluate + "\n__p+='"), index = offset + match.length, match
        }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            render = new Function(settings.variable || "obj", "_", source)
        } catch (e) {
            throw e.source = source, e
        }
        if (data)
            return render(data, _);
        var template = function(data) {
            return render.call(this, data, _)
        };
        return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", template
    }, _.chain = function(obj) {
        return _(obj).chain()
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj
    };
    _.mixin(_), each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            return method.apply(obj, arguments), "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0], result.call(this, obj)
        }
    }), each(["concat", "join", "slice"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments))
        }
    }), _.extend(_.prototype, {chain: function() {
            return this._chain = !0, this
        },value: function() {
            return this._wrapped
        }})
}.call(this), function() {
    for (var lastTime = 0, vendors = ["webkit", "moz"], x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
        var currTime = (new Date).getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
            callback(currTime + timeToCall)
        }, timeToCall);
        return lastTime = currTime + timeToCall, id
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
        clearTimeout(id)
    })
}(), function(k) {
    function b(v) {
        if (v in d.style)
            return v;
        var u = ["Moz", "Webkit", "O", "ms"], r = v.charAt(0).toUpperCase() + v.substr(1);
        if (v in d.style)
            return v;
        for (var t = 0; t < u.length; ++t) {
            var s = u[t] + r;
            if (s in d.style)
                return s
        }
    }
    function e() {
        return d.style[q.transform] = "", d.style[q.transform] = "rotateY(90deg)", "" !== d.style[q.transform]
    }
    function j(r) {
        return "string" == typeof r && this.parse(r), this
    }
    function m(s, r, t) {
        r === !0 ? s.queue(t) : r ? s.queue(r, t) : t()
    }
    function h(s) {
        var r = [];
        return k.each(s, function(t) {
            t = k.camelCase(t), t = k.transit.propertyMap[t] || k.cssProps[t] || t, t = c(t), -1 === k.inArray(t, r) && r.push(t)
        }), r
    }
    function g(s, v, x, r) {
        var t = h(s);
        k.cssEase[x] && (x = k.cssEase[x]);
        var w = "" + l(v) + " " + x;
        parseInt(r, 10) > 0 && (w += " " + l(r));
        var u = [];
        return k.each(t, function(z, y) {
            u.push(y + " " + w)
        }), u.join(", ")
    }
    function n(s, r) {
        r || (k.cssNumber[s] = !0), k.transit.propertyMap[s] = q.transform, k.cssHooks[s] = {get: function(v) {
                var u = k(v).css("transit:transform");
                return u.get(s)
            },set: function(v, w) {
                var u = k(v).css("transit:transform");
                u.setFromString(s, w), k(v).css({"transit:transform": u})
            }}
    }
    function c(r) {
        return r.replace(/([A-Z])/g, function(s) {
            return "-" + s.toLowerCase()
        })
    }
    function o(s, r) {
        return "string" != typeof s || s.match(/^[\-0-9\.]+$/) ? "" + s + r : s
    }
    function l(s) {
        var r = s;
        return k.fx.speeds[r] && (r = k.fx.speeds[r]), o(r, "ms")
    }
    k.transit = {version: "0.9.9",propertyMap: {marginLeft: "margin",marginRight: "margin",marginBottom: "margin",marginTop: "margin",paddingLeft: "padding",paddingRight: "padding",paddingBottom: "padding",paddingTop: "padding"},enabled: !0,useTransitionEnd: !1};
    var d = document.createElement("div"), q = {}, a = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    q.transition = b("transition"), q.transitionDelay = b("transitionDelay"), q.transform = b("transform"), q.transformOrigin = b("transformOrigin"), q.transform3d = e();
    var i = {transition: "transitionEnd",MozTransition: "transitionend",OTransition: "oTransitionEnd",WebkitTransition: "webkitTransitionEnd",msTransition: "MSTransitionEnd"}, f = q.transitionEnd = i[q.transition] || null;
    for (var p in q)
        q.hasOwnProperty(p) && "undefined" == typeof k.support[p] && (k.support[p] = q[p]);
    d = null, k.cssEase = {_default: "ease","in": "ease-in",out: "ease-out","in-out": "ease-in-out",snap: "cubic-bezier(0,1,.5,1)",easeOutCubic: "cubic-bezier(.215,.61,.355,1)",easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",easeInCirc: "cubic-bezier(.6,.04,.98,.335)",easeOutCirc: "cubic-bezier(.075,.82,.165,1)",easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",easeInExpo: "cubic-bezier(.95,.05,.795,.035)",easeOutExpo: "cubic-bezier(.19,1,.22,1)",easeInOutExpo: "cubic-bezier(1,0,0,1)",easeInQuad: "cubic-bezier(.55,.085,.68,.53)",easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",easeInQuart: "cubic-bezier(.895,.03,.685,.22)",easeOutQuart: "cubic-bezier(.165,.84,.44,1)",easeInOutQuart: "cubic-bezier(.77,0,.175,1)",easeInQuint: "cubic-bezier(.755,.05,.855,.06)",easeOutQuint: "cubic-bezier(.23,1,.32,1)",easeInOutQuint: "cubic-bezier(.86,0,.07,1)",easeInSine: "cubic-bezier(.47,0,.745,.715)",easeOutSine: "cubic-bezier(.39,.575,.565,1)",easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",easeInBack: "cubic-bezier(.6,-.28,.735,.045)",easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"}, k.cssHooks["transit:transform"] = {get: function(r) {
            return k(r).data("transform") || new j
        },set: function(s, r) {
            var t = r;
            t instanceof j || (t = new j(t)), s.style[q.transform] = "WebkitTransform" !== q.transform || a ? t.toString() : t.toString(!0), k(s).data("transform", t)
        }}, k.cssHooks.transform = {set: k.cssHooks["transit:transform"].set}, k.fn.jquery < "1.8" && (k.cssHooks.transformOrigin = {get: function(r) {
            return r.style[q.transformOrigin]
        },set: function(r, s) {
            r.style[q.transformOrigin] = s
        }}, k.cssHooks.transition = {get: function(r) {
            return r.style[q.transition]
        },set: function(r, s) {
            r.style[q.transition] = s
        }}), n("scale"), n("translate"), n("rotate"), n("rotateX"), n("rotateY"), n("rotate3d"), n("perspective"), n("skewX"), n("skewY"), n("x", !0), n("y", !0), j.prototype = {setFromString: function(t, s) {
            var r = "string" == typeof s ? s.split(",") : s.constructor === Array ? s : [s];
            r.unshift(t), j.prototype.set.apply(this, r)
        },set: function(s) {
            var r = Array.prototype.slice.apply(arguments, [1]);
            this.setter[s] ? this.setter[s].apply(this, r) : this[s] = r.join(",")
        },get: function(r) {
            return this.getter[r] ? this.getter[r].apply(this) : this[r] || 0
        },setter: {rotate: function(r) {
                this.rotate = o(r, "deg")
            },rotateX: function(r) {
                this.rotateX = o(r, "deg")
            },rotateY: function(r) {
                this.rotateY = o(r, "deg")
            },scale: function(r, s) {
                void 0 === s && (s = r), this.scale = r + "," + s
            },skewX: function(r) {
                this.skewX = o(r, "deg")
            },skewY: function(r) {
                this.skewY = o(r, "deg")
            },perspective: function(r) {
                this.perspective = o(r, "px")
            },x: function(r) {
                this.set("translate", r, null)
            },y: function(r) {
                this.set("translate", null, r)
            },translate: function(r, s) {
                void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== r && void 0 !== r && (this._translateX = o(r, "px")), null !== s && void 0 !== s && (this._translateY = o(s, "px")), this.translate = this._translateX + "," + this._translateY
            }},getter: {x: function() {
                return this._translateX || 0
            },y: function() {
                return this._translateY || 0
            },scale: function() {
                var r = (this.scale || "1,1").split(",");
                return r[0] && (r[0] = parseFloat(r[0])), r[1] && (r[1] = parseFloat(r[1])), r[0] === r[1] ? r[0] : r
            },rotate3d: function() {
                for (var t = (this.rotate3d || "0,0,0,0deg").split(","), r = 0; 3 >= r; ++r)
                    t[r] && (t[r] = parseFloat(t[r]));
                return t[3] && (t[3] = o(t[3], "deg")), t
            }},parse: function(s) {
            var r = this;
            s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(t, v, u) {
                r.setFromString(v, u)
            })
        },toString: function(t) {
            var s = [];
            for (var r in this)
                if (this.hasOwnProperty(r)) {
                    if (!q.transform3d && ("rotateX" === r || "rotateY" === r || "perspective" === r || "transformOrigin" === r))
                        continue;
                    "_" !== r[0] && s.push(t && "scale" === r ? r + "3d(" + this[r] + ",1)" : t && "translate" === r ? r + "3d(" + this[r] + ",0)" : r + "(" + this[r] + ")")
                }
            return s.join(" ")
        }}, k.fn.transition = k.fn.transit = function(z, s, y, C) {
        var D = this, u = 0, w = !0;
        "function" == typeof s && (C = s, s = void 0), "function" == typeof y && (C = y, y = void 0), "undefined" != typeof z.easing && (y = z.easing, delete z.easing), "undefined" != typeof z.duration && (s = z.duration, delete z.duration), "undefined" != typeof z.complete && (C = z.complete, delete z.complete), "undefined" != typeof z.queue && (w = z.queue, delete z.queue), "undefined" != typeof z.delay && (u = z.delay, delete z.delay), "undefined" == typeof s && (s = k.fx.speeds._default), "undefined" == typeof y && (y = k.cssEase._default), s = l(s);
        var E = g(z, s, y, u), B = k.transit.enabled && q.transition, t = B ? parseInt(s, 10) + parseInt(u, 10) : 0;
        if (0 === t) {
            var A = function(F) {
                D.css(z), C && C.apply(D), F && F()
            };
            return m(D, w, A), D
        }
        var x = {}, r = function(H) {
            var G = !1, F = function() {
                G && D.unbind(f, F), t > 0 && D.each(function() {
                    this.style[q.transition] = x[this] || null
                }), "function" == typeof C && C.apply(D), "function" == typeof H && H()
            };
            t > 0 && f && k.transit.useTransitionEnd ? (G = !0, D.bind(f, F)) : window.setTimeout(F, t), D.each(function() {
                t > 0 && (this.style[q.transition] = E), k(this).css(z)
            })
        }, v = function(F) {
            this.offsetWidth, r(F)
        };
        return m(D, w, v), this
    }, k.transit.getTransitionValue = g
}(jQuery), function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? module.exports = factory : factory(jQuery)
}(function($) {
    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, absDeltaXY = 0;
        return event = $.event.fix(orgEvent), event.type = "mousewheel", orgEvent.wheelDelta && (delta = orgEvent.wheelDelta), orgEvent.detail && (delta = -1 * orgEvent.detail), deltaY = delta, void 0 !== orgEvent.axis && orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaY = 0, deltaX = -1 * delta), orgEvent.deltaY && (deltaY = -1 * orgEvent.deltaY, delta = deltaY), orgEvent.deltaX && (deltaX = orgEvent.deltaX, delta = -1 * deltaX), void 0 !== orgEvent.wheelDeltaY && (deltaY = orgEvent.wheelDeltaY), void 0 !== orgEvent.wheelDeltaX && (deltaX = -1 * orgEvent.wheelDeltaX), absDelta = Math.abs(delta), absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX)), lowestDelta = (absDelta + lowestDelta * eventCount) / (eventCount + 1), lowestDeltaXY = (absDeltaXY + lowestDeltaXY * eventCount) / (eventCount + 1), lowestDelta || (lowestDelta = 1), lowestDeltaXY || (lowestDeltaXY = 1), eventCount += 1, delta /= lowestDelta, deltaY /= lowestDeltaXY, deltaX /= lowestDeltaXY, args.unshift(event, delta, deltaX, deltaY), ($.event.dispatch || $.event.handle).apply(this, args)
    }
    var toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], lowestDelta = 0, lowestDeltaXY = 0, eventCount = 0;
    if ($.event.fixHooks)
        for (var i = toFix.length; i; )
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    $.event.special.mousewheel = {setup: function() {
            if (this.addEventListener)
                for (var i = toBind.length; i; )
                    this.addEventListener(toBind[--i], handler, !1);
            else
                this.onmousewheel = handler
        },teardown: function() {
            if (this.removeEventListener)
                for (var i = toBind.length; i; )
                    this.removeEventListener(toBind[--i], handler, !1);
            else
                this.onmousewheel = null
        }}, $.fn.extend({mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
        },unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn)
        }})
});
var MobileEsp = {initCompleted: !1,isWebkit: !1,isMobilePhone: !1,isIphone: !1,isAndroid: !1,isAndroidPhone: !1,isTierTablet: !1,isTierIphone: !1,isTierRichCss: !1,isTierGenericMobile: !1,engineWebKit: "webkit",deviceIphone: "iphone",deviceIpod: "ipod",deviceIpad: "ipad",deviceMacPpc: "macintosh",deviceAndroid: "android",deviceGoogleTV: "googletv",deviceHtcFlyer: "htc_flyer",deviceWinPhone7: "windows phone os 7",deviceWinPhone8: "windows phone 8",deviceWinMob: "windows ce",deviceWindows: "windows",deviceIeMob: "iemobile",devicePpc: "ppc",enginePie: "wm5 pie",deviceBB: "blackberry",deviceBB10: "bb10",vndRIM: "vnd.rim",deviceBBStorm: "blackberry95",deviceBBBold: "blackberry97",deviceBBBoldTouch: "blackberry 99",deviceBBTour: "blackberry96",deviceBBCurve: "blackberry89",deviceBBCurveTouch: "blackberry 938",deviceBBTorch: "blackberry 98",deviceBBPlaybook: "playbook",deviceSymbian: "symbian",deviceSymbos: "symbos",deviceS60: "series60",deviceS70: "series70",deviceS80: "series80",deviceS90: "series90",devicePalm: "palm",deviceWebOS: "webos",deviceWebOShp: "hpwos",engineBlazer: "blazer",engineXiino: "xiino",deviceNuvifone: "nuvifone",deviceBada: "bada",deviceTizen: "tizen",deviceMeego: "meego",deviceKindle: "kindle",engineSilk: "silk-accelerated",vndwap: "vnd.wap",wml: "wml",deviceTablet: "tablet",deviceBrew: "brew",deviceDanger: "danger",deviceHiptop: "hiptop",devicePlaystation: "playstation",devicePlaystationVita: "vita",deviceNintendoDs: "nitro",deviceNintendo: "nintendo",deviceWii: "wii",deviceXbox: "xbox",deviceArchos: "archos",engineOpera: "opera",engineNetfront: "netfront",engineUpBrowser: "up.browser",engineOpenWeb: "openweb",deviceMidp: "midp",uplink: "up.link",engineTelecaQ: "teleca q",engineObigo: "obigo",devicePda: "pda",mini: "mini",mobile: "mobile",mobi: "mobi",maemo: "maemo",linux: "linux",mylocom2: "sony/com",manuSonyEricsson: "sonyericsson",manuericsson: "ericsson",manuSamsung1: "sec-sgh",manuSony: "sony",manuHtc: "htc",svcDocomo: "docomo",svcKddi: "kddi",svcVodafone: "vodafone",disUpdate: "update",uagent: "",InitDeviceScan: function() {
        this.initCompleted = !1, navigator && navigator.userAgent && (this.uagent = navigator.userAgent.toLowerCase()), this.isWebkit = this.DetectWebkit(), this.isIphone = this.DetectIphone(), this.isAndroid = this.DetectAndroid(), this.isAndroidPhone = this.DetectAndroidPhone(), this.isTierIphone = this.DetectTierIphone(), this.isTierTablet = this.DetectTierTablet(), this.isMobilePhone = this.DetectMobileQuick(), this.isTierRichCss = this.DetectTierRichCss(), this.isTierGenericMobile = this.DetectTierOtherPhones(), this.initCompleted = !0
    },DetectIphone: function() {
        return this.initCompleted || this.isIphone ? this.isIphone : this.uagent.search(this.deviceIphone) > -1 ? this.DetectIpad() || this.DetectIpod() ? !1 : !0 : !1
    },DetectIpod: function() {
        return this.uagent.search(this.deviceIpod) > -1 ? !0 : !1
    },DetectIphoneOrIpod: function() {
        return this.DetectIphone() || this.DetectIpod() ? !0 : !1
    },DetectIpad: function() {
        return this.uagent.search(this.deviceIpad) > -1 && this.DetectWebkit() ? !0 : !1
    },DetectIos: function() {
        return this.DetectIphoneOrIpod() || this.DetectIpad() ? !0 : !1
    },DetectAndroid: function() {
        return this.initCompleted || this.isAndroid ? this.isAndroid : this.uagent.search(this.deviceAndroid) > -1 || this.DetectGoogleTV() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },DetectAndroidPhone: function() {
        return this.initCompleted || this.isAndroidPhone ? this.isAndroidPhone : this.DetectAndroid() && this.uagent.search(this.mobile) > -1 ? !0 : this.DetectOperaAndroidPhone() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },DetectAndroidTablet: function() {
        return this.DetectAndroid() ? this.DetectOperaMobile() ? !1 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !1 : this.uagent.search(this.mobile) > -1 ? !1 : !0 : !1
    },DetectAndroidWebKit: function() {
        return this.DetectAndroid() && this.DetectWebkit() ? !0 : !1
    },DetectGoogleTV: function() {
        return this.uagent.search(this.deviceGoogleTV) > -1 ? !0 : !1
    },DetectWebkit: function() {
        return this.initCompleted || this.isWebkit ? this.isWebkit : this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },DetectWindowsPhone: function() {
        return this.DetectWindowsPhone7() || this.DetectWindowsPhone8() ? !0 : !1
    },DetectWindowsPhone7: function() {
        return this.uagent.search(this.deviceWinPhone7) > -1 ? !0 : !1
    },DetectWindowsPhone8: function() {
        return this.uagent.search(this.deviceWinPhone8) > -1 ? !0 : !1
    },DetectWindowsMobile: function() {
        return this.DetectWindowsPhone() ? !1 : this.uagent.search(this.deviceWinMob) > -1 || this.uagent.search(this.deviceIeMob) > -1 || this.uagent.search(this.enginePie) > -1 ? !0 : this.uagent.search(this.devicePpc) > -1 && !(this.uagent.search(this.deviceMacPpc) > -1) ? !0 : this.uagent.search(this.manuHtc) > -1 && this.uagent.search(this.deviceWindows) > -1 ? !0 : !1
    },DetectBlackBerry: function() {
        return this.uagent.search(this.deviceBB) > -1 || this.uagent.search(this.vndRIM) > -1 ? !0 : this.DetectBlackBerry10Phone() ? !0 : !1
    },DetectBlackBerry10Phone: function() {
        return this.uagent.search(this.deviceBB10) > -1 && this.uagent.search(this.mobile) > -1 ? !0 : !1
    },DetectBlackBerryTablet: function() {
        return this.uagent.search(this.deviceBBPlaybook) > -1 ? !0 : !1
    },DetectBlackBerryWebKit: function() {
        return this.DetectBlackBerry() && this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },DetectBlackBerryTouch: function() {
        return this.DetectBlackBerry() && (this.uagent.search(this.deviceBBStorm) > -1 || this.uagent.search(this.deviceBBTorch) > -1 || this.uagent.search(this.deviceBBBoldTouch) > -1 || this.uagent.search(this.deviceBBCurveTouch) > -1) ? !0 : !1
    },DetectBlackBerryHigh: function() {
        return this.DetectBlackBerryWebKit() ? !1 : this.DetectBlackBerry() && (this.DetectBlackBerryTouch() || this.uagent.search(this.deviceBBBold) > -1 || this.uagent.search(this.deviceBBTour) > -1 || this.uagent.search(this.deviceBBCurve) > -1) ? !0 : !1
    },DetectBlackBerryLow: function() {
        return this.DetectBlackBerry() ? this.DetectBlackBerryHigh() || this.DetectBlackBerryWebKit() ? !1 : !0 : !1
    },DetectS60OssBrowser: function() {
        return this.DetectWebkit() && (this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbian) > -1) ? !0 : !1
    },DetectSymbianOS: function() {
        return this.uagent.search(this.deviceSymbian) > -1 || this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbos) > -1 && this.DetectOperaMobile || this.uagent.search(this.deviceS70) > -1 || this.uagent.search(this.deviceS80) > -1 || this.uagent.search(this.deviceS90) > -1 ? !0 : !1
    },DetectPalmOS: function() {
        return this.DetectPalmWebOS() ? !1 : this.uagent.search(this.devicePalm) > -1 || this.uagent.search(this.engineBlazer) > -1 || this.uagent.search(this.engineXiino) > -1 ? !0 : !1
    },DetectPalmWebOS: function() {
        return this.uagent.search(this.deviceWebOS) > -1 ? !0 : !1
    },DetectWebOSTablet: function() {
        return this.uagent.search(this.deviceWebOShp) > -1 && this.uagent.search(this.deviceTablet) > -1 ? !0 : !1
    },DetectOperaMobile: function() {
        return this.uagent.search(this.engineOpera) > -1 && (this.uagent.search(this.mini) > -1 || this.uagent.search(this.mobi) > -1) ? !0 : !1
    },DetectOperaAndroidPhone: function() {
        return this.uagent.search(this.engineOpera) > -1 && this.uagent.search(this.deviceAndroid) > -1 && this.uagent.search(this.mobi) > -1 ? !0 : !1
    },DetectOperaAndroidTablet: function() {
        return this.uagent.search(this.engineOpera) > -1 && this.uagent.search(this.deviceAndroid) > -1 && this.uagent.search(this.deviceTablet) > -1 ? !0 : !1
    },DetectKindle: function() {
        return this.uagent.search(this.deviceKindle) > -1 && !this.DetectAndroid() ? !0 : !1
    },DetectAmazonSilk: function() {
        return this.uagent.search(this.engineSilk) > -1 ? !0 : !1
    },DetectGarminNuvifone: function() {
        return this.uagent.search(this.deviceNuvifone) > -1 ? !0 : !1
    },DetectBada: function() {
        return this.uagent.search(this.deviceBada) > -1 ? !0 : !1
    },DetectTizen: function() {
        return this.uagent.search(this.deviceTizen) > -1 ? !0 : !1
    },DetectMeego: function() {
        return this.uagent.search(this.deviceMeego) > -1 ? !0 : !1
    },DetectDangerHiptop: function() {
        return this.uagent.search(this.deviceDanger) > -1 || this.uagent.search(this.deviceHiptop) > -1 ? !0 : !1
    },DetectSonyMylo: function() {
        return this.uagent.search(this.manuSony) > -1 && (this.uagent.search(this.qtembedded) > -1 || this.uagent.search(this.mylocom2) > -1) ? !0 : !1
    },DetectMaemoTablet: function() {
        return this.uagent.search(this.maemo) > -1 ? !0 : this.uagent.search(this.linux) > -1 && this.uagent.search(this.deviceTablet) > -1 && !this.DetectWebOSTablet() && !this.DetectAndroid() ? !0 : !1
    },DetectArchos: function() {
        return this.uagent.search(this.deviceArchos) > -1 ? !0 : !1
    },DetectGameConsole: function() {
        return this.DetectSonyPlaystation() || this.DetectNintendo() || this.DetectXbox() ? !0 : !1
    },DetectSonyPlaystation: function() {
        return this.uagent.search(this.devicePlaystation) > -1 ? !0 : !1
    },DetectGamingHandheld: function() {
        return this.uagent.search(this.devicePlaystation) > -1 && this.uagent.search(this.devicePlaystationVita) > -1 ? !0 : !1
    },DetectNintendo: function() {
        return this.uagent.search(this.deviceNintendo) > -1 || this.uagent.search(this.deviceWii) > -1 || this.uagent.search(this.deviceNintendoDs) > -1 ? !0 : !1
    },DetectXbox: function() {
        return this.uagent.search(this.deviceXbox) > -1 ? !0 : !1
    },DetectBrewDevice: function() {
        return this.uagent.search(this.deviceBrew) > -1 ? !0 : !1
    },DetectSmartphone: function() {
        return this.DetectTierIphone() || this.DetectS60OssBrowser() || this.DetectSymbianOS() || this.DetectWindowsMobile() || this.DetectBlackBerry() || this.DetectPalmOS() ? !0 : !1
    },DetectMobileQuick: function() {
        return this.DetectTierTablet() ? !1 : this.initCompleted || this.isMobilePhone ? this.isMobilePhone : this.DetectSmartphone() ? !0 : this.uagent.search(this.mobile) > -1 ? !0 : this.DetectKindle() || this.DetectAmazonSilk() ? !0 : this.uagent.search(this.deviceMidp) > -1 || this.DetectBrewDevice() ? !0 : this.DetectOperaMobile() || this.DetectArchos() ? !0 : this.uagent.search(this.engineObigo) > -1 || this.uagent.search(this.engineNetfront) > -1 || this.uagent.search(this.engineUpBrowser) > -1 || this.uagent.search(this.engineOpenWeb) > -1 ? !0 : !1
    },DetectMobileLong: function() {
        return this.DetectMobileQuick() ? !0 : this.DetectGameConsole() ? !0 : this.DetectDangerHiptop() || this.DetectMaemoTablet() || this.DetectSonyMylo() || this.DetectGarminNuvifone() ? !0 : this.uagent.search(this.devicePda) > -1 && !(this.uagent.search(this.disUpdate) > -1) ? !0 : this.uagent.search(this.manuSamsung1) > -1 || this.uagent.search(this.manuSonyEricsson) > -1 || this.uagent.search(this.manuericsson) > -1 ? !0 : this.uagent.search(this.svcDocomo) > -1 || this.uagent.search(this.svcKddi) > -1 || this.uagent.search(this.svcVodafone) > -1 ? !0 : !1
    },DetectTierTablet: function() {
        return this.initCompleted || this.isTierTablet ? this.isTierTablet : this.DetectIpad() || this.DetectAndroidTablet() || this.DetectBlackBerryTablet() || this.DetectWebOSTablet() ? !0 : !1
    },DetectTierIphone: function() {
        return this.initCompleted || this.isTierIphone ? this.isTierIphone : this.DetectIphoneOrIpod() || this.DetectAndroidPhone() || this.DetectWindowsPhone() || this.DetectBlackBerry10Phone() || this.DetectPalmWebOS() || this.DetectBada() || this.DetectTizen() || this.DetectGamingHandheld() ? !0 : this.DetectBlackBerryWebKit() && this.DetectBlackBerryTouch() ? !0 : !1
    },DetectTierRichCss: function() {
        return this.initCompleted || this.isTierRichCss ? this.isTierRichCss : this.DetectTierIphone() || this.DetectKindle() || this.DetectTierTablet() ? !1 : this.DetectMobileQuick() ? this.DetectWebkit() ? !0 : this.DetectS60OssBrowser() || this.DetectBlackBerryHigh() || this.DetectWindowsMobile() || this.uagent.search(this.engineTelecaQ) > -1 ? !0 : !1 : !1
    },DetectTierOtherPhones: function() {
        return this.initCompleted || this.isTierGenericMobile ? this.isTierGenericMobile : this.DetectTierIphone() || this.DetectTierRichCss() || this.DetectTierTablet() ? !1 : this.DetectMobileLong() ? !0 : !1
    }};
MobileEsp.InitDeviceScan(), !function(e) {
    function n(n, t) {
        var o = "obj" + ("" + Math.random()).slice(2, 15), i = '<object class="fp-engine" id="' + o + '" name="' + o + '" ';
        i += e.browser.msie ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' : ' data="' + n + '" type="application/x-shockwave-flash">';
        var r = {width: "100%",height: "100%",allowscriptaccess: "always",wmode: "transparent",quality: "high",flashvars: "",movie: n + (e.browser.msie ? "?" + o : ""),name: o};
        return e.each(t, function(e, n) {
            r.flashvars += e + "=" + n + "&"
        }), e.each(r, function(e, n) {
            i += '<param name="' + e + '" value="' + n + '"/>'
        }), i += "</object>", e(i)
    }
    function t(e, n) {
        return n = n || 100, Math.round(e * n) / n
    }
    function o(e) {
        return /mpegurl/i.test(e) ? "application/x-mpegurl" : "video/" + e
    }
    function i(e) {
        return /^(video|application)/.test(e) || (e = o(e)), !!h.canPlayType(e).replace("no", "")
    }
    function r(n, t) {
        var o = e.grep(n, function(e) {
            return e.type === t
        });
        return o.length ? o[0] : null
    }
    function a(e) {
        var n = e.attr("src"), t = e.attr("type") || "", o = n.split(w)[1];
        return t = /mpegurl/.test(t) ? "mpegurl" : t.replace("video/", ""), {src: n,suffix: o || t,type: t || o}
    }
    function s(n) {
        var t = this, o = [];
        e("source", n).each(function() {
            o.push(a(e(this)))
        }), o.length || o.push(a(n)), t.initialSources = o, t.resolve = function(n) {
            return n ? (e.isArray(n) ? n = {sources: e.map(n, function(n) {
                    var t, o = e.extend({}, n);
                    return e.each(n, function(e) {
                        t = e
                    }), o.type = t, o.src = n[t], delete o[t], o
                })} : "string" == typeof n && (n = {src: n,sources: []}, e.each(o, function(e, t) {
                "flash" != t.type && n.sources.push({type: t.type,src: n.src.replace(w, "." + t.suffix + "$2")})
            })), n) : {sources: o}
        }
    }
    function l(e) {
        return e = parseInt(e, 10), e >= 10 ? e : "0" + e
    }
    function c(e) {
        e = e || 0;
        var n = Math.floor(e / 3600), t = Math.floor(e / 60);
        return e -= 60 * t, n >= 1 ? (t -= 60 * n, n + ":" + l(t) + ":" + l(e)) : l(t) + ":" + l(e)
    }
    !function(e) {
        if (!e.browser) {
            var n = e.browser = {}, t = navigator.userAgent.toLowerCase(), o = /(chrome)[ \/]([\w.]+)/.exec(t) || /(safari)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
            o[1] && (n[o[1]] = !0, n.version = o[2] || "0")
        }
    }(jQuery), e(function() {
        "function" == typeof e.fn.flowplayer && e("video").parent(".flowplayer").flowplayer()
    });
    var d = [], u = [], f = window.navigator.userAgent;
    window.flowplayer = function(n) {
        return e.isFunction(n) ? u.push(n) : "number" == typeof n || void 0 === n ? d[n || 0] : e(n).data("flowplayer")
    }, e(window).on("beforeunload", function() {
        e.each(d, function(n, t) {
            t.conf.splash ? t.unload() : t.bind("error", function() {
                e(".flowplayer.is-error .fp-message").remove()
            })
        })
    });
    var p = !1;
    try {
        "object" == typeof window.localStorage && (window.localStorage.flowplayerTestStorage = "test", p = !0)
    } catch (m) {
    }
    e.extend(flowplayer, {version: "5.4.6",engine: {},conf: {},support: {},defaults: {debug: !1,disabled: !1,engine: "html5",fullscreen: window == window.top,keyboard: !0,ratio: 9 / 16,adaptiveRatio: !1,flashfit: !1,rtmp: 0,splash: !1,live: !1,swf: "//releases.flowplayer.org/5.4.6/commercial/flowplayer.swf",speeds: [.25, .5, 1, 1.5, 2],tooltip: !0,volume: p ? "true" == localStorage.muted ? 0 : isNaN(localStorage.volume) ? 1 : localStorage.volume || 1 : 1,errors: ["", "Video loading aborted", "Network error", "Video not properly encoded", "Video file not found", "Unsupported video", "Skin not found", "SWF file not found", "Subtitles not found", "Invalid RTMP URL", "Unsupported video format. Try installing Adobe Flash."],errorUrls: ["", "", "", "", "", "", "", "", "", "", "http://get.adobe.com/flashplayer/"],playlist: []}});
    var g = 1;
    e.fn.flowplayer = function(n, t) {
        return "string" == typeof n && (n = {swf: n}), e.isFunction(n) && (t = n, n = {}), !n && this.data("flowplayer") || this.each(function() {
            var o, i, r = e(this).addClass("is-loading"), a = e.extend({}, flowplayer.defaults, flowplayer.conf, n, r.data()), l = e("video", r).addClass("fp-engine").removeAttr("controls"), c = l.length ? new s(l) : null, f = {};
            if (a.playlist.length) {
                var p, m = l.attr("preload");
                l.length && l.replaceWith(p = e("<p />")), l = e("<video />").addClass("fp-engine"), p ? p.replaceWith(l) : r.prepend(l), flowplayer.support.video && l.attr("preload", m), "string" == typeof a.playlist[0] ? l.attr("src", a.playlist[0]) : e.each(a.playlist[0], function(n, t) {
                    for (var o in t)
                        t.hasOwnProperty(o) && l.append(e("<source />").attr({type: "video/" + o,src: t[o]}))
                }), c = new s(l)
            }
            var v = r.data("flowplayer");
            v && v.unload(), r.data("fp-player_id", r.data("fp-player_id") || g++);
            try {
                f = window.localStorage || f
            } catch (h) {
            }
            var b = this.currentStyle && "rtl" === this.currentStyle.direction || window.getComputedStyle && "rtl" === window.getComputedStyle(this, null).getPropertyValue("direction");
            b && r.addClass("is-rtl");
            var y = v || {conf: a,currentSpeed: 1,volumeLevel: "undefined" == typeof a.volume ? 1 * f.volume : a.volume,video: {},disabled: !1,finished: !1,loading: !1,muted: "true" == f.muted || a.muted,paused: !1,playing: !1,ready: !1,splash: !1,rtl: b,load: function(n, t) {
                    if (!(y.error || y.loading || y.disabled)) {
                        if (n = c.resolve(n), e.extend(n, i.pick(n.sources)), n.src) {
                            var o = e.Event("load");
                            r.trigger(o, [y, n, i]), o.isDefaultPrevented() ? y.loading = !1 : (i.load(n), e.isFunction(n) && (t = n), t && r.one("ready", t))
                        }
                        return y
                    }
                },pause: function(e) {
                    return !y.ready || y.seeking || y.disabled || y.loading || (i.pause(), y.one("pause", e)), y
                },resume: function() {
                    return y.ready && y.paused && !y.disabled && (i.resume(), y.finished && (y.trigger("resume", [y]), y.finished = !1)), y
                },toggle: function() {
                    return y.ready ? y.paused ? y.resume() : y.pause() : y.load()
                },seek: function(n, t) {
                    if (y.ready) {
                        if ("boolean" == typeof n) {
                            var a = .1 * y.video.duration;
                            n = y.video.time + (n ? a : -a)
                        }
                        n = o = Math.min(Math.max(n, 0), y.video.duration).toFixed(1);
                        var s = e.Event("beforeseek");
                        r.trigger(s, [y, n]), s.isDefaultPrevented() ? (y.seeking = !1, r.toggleClass("is-seeking", y.seeking)) : (i.seek(n), e.isFunction(t) && r.one("seek", t))
                    }
                    return y
                },seekTo: function(e, n) {
                    var t = void 0 === e ? o : .1 * y.video.duration * e;
                    return y.seek(t, n)
                },mute: function(e) {
                    return void 0 === e && (e = !y.muted), f.muted = y.muted = e, f.volume = isNaN(f.volume) ? a.volume : f.volume, y.volume(e ? 0 : f.volume, !0), y.trigger("mute", e), y
                },volume: function(e, n) {
                    return y.ready && (e = Math.min(Math.max(e, 0), 1), n || (f.volume = e), i.volume(e)), y
                },speed: function(n, t) {
                    return y.ready && ("boolean" == typeof n && (n = a.speeds[e.inArray(y.currentSpeed, a.speeds) + (n ? 1 : -1)] || y.currentSpeed), i.speed(n), t && r.one("speed", t)), y
                },stop: function() {
                    return y.ready && (y.pause(), y.seek(0, function() {
                        r.trigger("stop")
                    })), y
                },unload: function() {
                    return r.hasClass("is-embedding") || (a.splash ? (y.trigger("unload"), i.unload()) : y.stop()), y
                },disable: function(e) {
                    return void 0 === e && (e = !y.disabled), e != y.disabled && (y.disabled = e, y.trigger("disable", e)), y
                }};
            y.conf = e.extend(y.conf, a), e.each(["bind", "one", "unbind"], function(e, n) {
                y[n] = function(e, t) {
                    return r[n](e, t), y
                }
            }), y.trigger = function(e, n) {
                return r.trigger(e, [y, n]), y
            }, r.data("flowplayer") || r.bind("boot", function() {
                return e.each(["autoplay", "loop", "preload", "poster"], function(e, n) {
                    var t = l.attr(n);
                    void 0 !== t && (a[n] = t ? t : !0)
                }), (a.splash || r.hasClass("is-splash") || !flowplayer.support.firstframe) && (y.forcedSplash = !a.splash && !r.hasClass("is-splash"), y.splash = a.splash = a.autoplay = !0, r.addClass("is-splash"), flowplayer.support.video && l.attr("preload", "none")), (a.live || r.hasClass("is-live")) && (y.live = a.live = !0, r.addClass("is-live")), e.each(u, function() {
                    this(y, r)
                }), i = flowplayer.engine[a.engine], i && (i = i(y, r)), i.pick(c.initialSources) ? y.engine = a.engine : e.each(flowplayer.engine, function(e) {
                    return e != a.engine ? (i = this(y, r), i.pick(c.initialSources) && (y.engine = e), !1) : void 0
                }), d.push(y), y.engine ? (a.splash ? y.unload() : y.load(), a.disabled && y.disable(), i.volume(y.volumeLevel), void r.one("ready", t)) : y.trigger("error", {code: flowplayer.support.flashVideo ? 5 : 10})
            }).bind("load", function(n, t) {
                a.splash && e(".flowplayer").filter(".is-ready, .is-loading").not(r).each(function() {
                    var n = e(this).data("flowplayer");
                    n.conf.splash && n.unload()
                }), r.addClass("is-loading"), t.loading = !0
            }).bind("ready", function(e, n, t) {
                function o() {
                    r.removeClass("is-loading"), n.loading = !1
                }
                t.time = 0, n.video = t, a.splash ? r.one("progress", o) : o(), n.muted ? n.mute(!0) : n.volume(n.volumeLevel)
            }).bind("unload", function() {
                a.splash && l.remove(), r.removeClass("is-loading"), y.loading = !1
            }).bind("ready unload", function(e) {
                var n = "ready" == e.type;
                r.toggleClass("is-splash", !n).toggleClass("is-ready", n), y.ready = n, y.splash = !n
            }).bind("progress", function(e, n, t) {
                n.video.time = t
            }).bind("speed", function(e, n, t) {
                n.currentSpeed = t
            }).bind("volume", function(e, n, t) {
                n.volumeLevel = Math.round(100 * t) / 100, n.muted ? t && n.mute(!1) : f.volume = t
            }).bind("beforeseek seek", function(e) {
                y.seeking = "beforeseek" == e.type, r.toggleClass("is-seeking", y.seeking)
            }).bind("ready pause resume unload finish stop", function(e, n, t) {
                y.paused = /pause|finish|unload|stop/.test(e.type), "ready" == e.type && (y.paused = "none" == a.preload, t && (y.paused = !t.duration || !a.autoplay && "none" != a.preload)), y.playing = !y.paused, r.toggleClass("is-paused", y.paused).toggleClass("is-playing", y.playing), y.load.ed || y.pause()
            }).bind("finish", function() {
                y.finished = !0
            }).bind("error", function() {
                l.remove()
            }), r.trigger("boot", [y, r]).data("flowplayer", y)
        })
    }, !function() {
        var n = function(e) {
            var n = /Version\/(\d\.\d)/.exec(e);
            return n && n.length > 1 ? parseFloat(n[1], 10) : 0
        }, t = flowplayer.support, o = e.browser, i = e("<video loop autoplay preload/>")[0], r = o.msie, a = navigator.userAgent, s = /iPad|MeeGo/.test(a) && !/CriOS/.test(a), l = /iPad/.test(a) && /CriOS/.test(a), c = /iP(hone|od)/i.test(a) && !/iPad/.test(a), d = /Android/.test(a) && !/Firefox/.test(a), u = /Android/.test(a) && /Firefox/.test(a), f = /Silk/.test(a), p = /IEMobile/.test(a), m = (s ? n(a) : 0, d ? parseFloat(/Android\ (\d\.\d)/.exec(a)[1], 10) : 0);
        e.extend(t, {subtitles: !!i.addTextTrack,fullscreen: !d && ("function" == typeof document.webkitCancelFullScreen && !/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(a) || document.mozFullScreenEnabled || "function" == typeof document.exitFullscreen),inlineBlock: !(r && o.version < 8),touch: "ontouchstart" in window,dataload: !s && !c && !p,zeropreload: !r && !d,volume: !(s || d || c || f || l),cachedVideoTag: !(s || c || l || p),firstframe: !(c || s || d || f || l || p || u),inlineVideo: !c && !p && (!d || m >= 3),hlsDuration: !o.safari || s || c || l,seekable: !s && !l});
        try {
            var g = navigator.plugins["Shockwave Flash"], v = r ? new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version") : g.description;
            r || g[0].enabledPlugin ? (v = v.split(/\D+/), v.length && !v[0] && (v = v.slice(1)), t.flashVideo = v[0] > 9 || 9 == v[0] && v[3] >= 115) : t.flashVideo = !1
        } catch (h) {
        }
        try {
            t.video = !!i.canPlayType, t.video && i.canPlayType("video/mp4")
        } catch (b) {
            t.video = !1
        }
        t.animation = function() {
            for (var n = ["", "Webkit", "Moz", "O", "ms", "Khtml"], t = e("<p/>")[0], o = 0; o < n.length; o++)
                if ("undefined" !== t.style[n[o] + "AnimationName"])
                    return !0
        }()
    }(), window.attachEvent && window.attachEvent("onbeforeunload", function() {
        __flash_savedUnloadHandler = __flash_unloadHandler = function() {
        }
    }), flowplayer.engine.flash = function(t, o) {
        var i, r, a, s = t.conf;
        t.video;
        var l = {pick: function(n) {
                if (flowplayer.support.flashVideo) {
                    var t = e.grep(n, function(e) {
                        return "flash" == e.type
                    })[0];
                    if (t)
                        return t;
                    for (var o, i = 0; i < n.length; i++)
                        if (o = n[i], /mp4|flv/.test(o.type))
                            return o
                }
            },load: function(l) {
                function c(e) {
                    return e.replace(/&amp;/g, "%26").replace(/&/g, "%26").replace(/=/g, "%3D")
                }
                var d = e("video", o), u = c(l.src);
                is_absolute = /^https?:/.test(u);
                try {
                    d.length > 0 && flowplayer.support.video && d[0].pause()
                } catch (f) {
                }
                var p = function() {
                    d.remove()
                }, m = function(n) {
                    return e.grep(n, function(e) {
                        return !!d[0].canPlayType("video/" + e.type)
                    }).length > 0
                };
                if (flowplayer.support.video && d.prop("autoplay") && m(l.sources) ? d.one("timeupdate", p) : p(), is_absolute || s.rtmp || (u = e("<img/>").attr("src", u)[0].src), a)
                    a.__play(u);
                else {
                    i = "fp" + ("" + Math.random()).slice(3, 15);
                    var g = {hostname: s.embedded ? s.hostname : location.hostname,url: u,callback: "jQuery." + i};
                    o.data("origin") && (g.origin = o.data("origin")), is_absolute && delete s.rtmp, e.each(["key", "autoplay", "preload", "rtmp", "loop", "debug", "preload", "splash", "bufferTime"], function(e, n) {
                        s[n] && (g[n] = s[n])
                    }), g.rtmp && (g.rtmp = c(g.rtmp)), r = n(s.swf, g), r.prependTo(o), a = r[0], setTimeout(function() {
                        try {
                            if (!a.PercentLoaded())
                                return o.trigger("error", [t, {code: 7,url: s.swf}])
                        } catch (e) {
                        }
                    }, 5e3), setTimeout(function() {
                        "undefined" == typeof a.PercentLoaded && o.trigger("flashdisabled", [t])
                    }, 1e3), e[i] = function(n, o) {
                        s.debug && "status" != n && console.log("--", n, o);
                        var i = e.Event(n);
                        switch (n) {
                            case "ready":
                                o = e.extend(l, o);
                                break;
                            case "click":
                                i.flash = !0;
                                break;
                            case "keydown":
                                i.which = o;
                                break;
                            case "seek":
                                l.time = o;
                                break;
                            case "status":
                                t.trigger("progress", o.time), o.buffer < l.bytes && !l.buffered ? (l.buffer = o.buffer / l.bytes * l.duration, t.trigger("buffer", l.buffer)) : l.buffered || (l.buffered = !0, t.trigger("buffered"))
                        }
                        "buffered" != n && setTimeout(function() {
                            t.trigger(i, o)
                        }, 1)
                    }
                }
            },speed: e.noop,unload: function() {
                a && a.__unload && a.__unload(), delete e[i], e("object", o).remove(), a = 0
            }};
        e.each("pause,resume,seek,volume".split(","), function(e, n) {
            l[n] = function(e) {
                try {
                    t.ready && ("seek" == n && t.video.time && !t.paused && t.trigger("beforeseek"), void 0 === e ? a["__" + n]() : a["__" + n](e))
                } catch (i) {
                    if ("undefined" == typeof a["__" + n])
                        return o.trigger("flashdisabled", [t]);
                    throw i
                }
            }
        });
        var c = e(window);
        return t.bind("ready fullscreen fullscreen-exit", function(n) {
            var i = o.height(), r = o.width();
            if (t.conf.flashfit || /full/.test(n.type)) {
                var a, s, l = t.isFullscreen, d = l && E, u = !flowplayer.support.inlineBlock, f = l ? d ? screen.width : c.width() : r, p = l ? d ? screen.height : c.height() : i, m = 0, g = 0, v = u ? r : "", h = u ? i : "";
                (t.conf.flashfit || "fullscreen" === n.type) && (a = t.video.width / t.video.height, s = t.video.height / t.video.width, h = Math.max(s * f), v = Math.max(a * p), h = h > p ? v * s : h, h = Math.min(Math.round(h), p), v = v > f ? h * a : v, v = Math.min(Math.round(v), f), g = Math.max(Math.round((p + g - h) / 2), 0), m = Math.max(Math.round((f + m - v) / 2), 0)), e("object", o).css({width: v,height: h,marginTop: g,marginLeft: m})
            }
        }), l
    };
    var v, h = e("<video/>")[0], b = {ended: "finish",pause: "pause",play: "resume",progress: "buffer",timeupdate: "progress",volumechange: "volume",ratechange: "speed",seeked: "seek",loadeddata: "ready",error: "error",dataunavailable: "error"}, y = function(n) {
        return v ? v.attr({type: o(n.type),src: n.src}) : v = e("<video/>", {src: n.src,type: o(n.type),"class": "fp-engine",autoplay: "autoplay",preload: "none","x-webkit-airplay": "allow"})
    };
    flowplayer.engine.html5 = function(n, o) {
        function a(r, a, s) {
            r.listeners && r.listeners.hasOwnProperty(o.data("fp-player_id")) || ((r.listeners || (r.listeners = {}))[o.data("fp-player_id")] = !0, a.bind("error", function(t) {
                try {
                    if (t.originalEvent && e(t.originalEvent.originalTarget).is("img"))
                        return t.preventDefault();
                    i(e(t.target).attr("type")) && n.trigger("error", {code: 4})
                } catch (o) {
                }
            }), e.each(b, function(i, a) {
                r.addEventListener(i, function(c) {
                    if ("progress" == a && c.srcElement && 0 === c.srcElement.readyState && setTimeout(function() {
                        n.video.duration || (a = "error", n.trigger(a, {code: 4}))
                    }, 1e4), p.debug && !/progress/.test(a) && console.log(i, "->", a, c), (n.ready || /ready|error/.test(a)) && a && e("video", o).length) {
                        var d, f = e.Event(a);
                        switch (a) {
                            case "ready":
                                d = e.extend(s, {duration: r.duration,width: r.videoWidth,height: r.videoHeight,url: r.currentSrc,src: r.currentSrc});
                                try {
                                    d.seekable = r.seekable && r.seekable.end(null)
                                } catch (m) {
                                }
                                if (l = l || setInterval(function() {
                                    try {
                                        d.buffer = r.buffered.end(null)
                                    } catch (e) {
                                    }
                                    d.buffer && (t(d.buffer, 1e3) < t(d.duration, 1e3) && !d.buffered ? n.trigger("buffer", c) : d.buffered || (d.buffered = !0, n.trigger("buffer", c).trigger("buffered", c), clearInterval(l), l = 0))
                                }, 250), !p.live && !d.duration && !u.hlsDuration && "loadeddata" === i) {
                                    var g = function() {
                                        d.duration = r.duration;
                                        try {
                                            d.seekable = r.seekable && r.seekable.end(null)
                                        } catch (e) {
                                        }
                                        n.trigger(f, d), r.removeEventListener("durationchange", g)
                                    };
                                    return void r.addEventListener("durationchange", g)
                                }
                                break;
                            case "progress":
                            case "seek":
                                if (n.video.duration, r.currentTime > 0) {
                                    d = Math.max(r.currentTime, 0);
                                    break
                                }
                                if ("progress" == a)
                                    return;
                            case "speed":
                                d = t(r.playbackRate);
                                break;
                            case "volume":
                                d = t(r.volume);
                                break;
                            case "error":
                                try {
                                    d = (c.srcElement || c.originalTarget).error
                                } catch (v) {
                                    return
                                }
                        }
                        n.trigger(f, d)
                    }
                }, !1)
            }))
        }
        var s, l, c, d = e("video", o), u = flowplayer.support, f = e("track", d), p = n.conf;
        return s = {pick: function(e) {
                if (u.video) {
                    if (p.videoTypePreference) {
                        var n = r(e, p.videoTypePreference);
                        if (n)
                            return n
                    }
                    for (var t = 0; t < e.length; t++)
                        if (i(e[t].type))
                            return e[t]
                }
            },load: function(t) {
                if (p.splash && !c)
                    d = y(t).prependTo(o), u.inlineVideo || d.css({position: "absolute",top: "-9999em"}), f.length && d.append(f.attr("default", "")), p.loop && d.attr("loop", "loop"), c = d[0];
                else {
                    c = d[0];
                    var i = d.find("source");
                    !c.src && i.length && (c.src = t.src, i.remove()), n.video.src && t.src != n.video.src ? (d.attr("autoplay", "autoplay"), c.src = t.src) : "none" != p.preload && u.dataload || (u.zeropreload ? n.trigger("ready", t).trigger("pause").one("ready", function() {
                        o.trigger("resume", [n])
                    }) : n.one("ready", function() {
                        o.trigger("pause", [n])
                    }))
                }
                a(c, e("source", d).add(d), t), "none" == p.preload && u.zeropreload && u.dataload || c.load(), p.splash && c.load()
            },pause: function() {
                c.pause()
            },resume: function() {
                c.play()
            },speed: function(e) {
                c.playbackRate = e
            },seek: function(e) {
                try {
                    var t = n.paused;
                    c.currentTime = e, t && c.pause()
                } catch (o) {
                }
            },volume: function(e) {
                c.volume = e
            },unload: function() {
                e("video.fp-engine", o).remove(), u.cachedVideoTag || (v = null), l = clearInterval(l), c = 0
            }}
    };
    var w = /\.(\w{3,4})(\?.*)?$/i;
    e.throttle = function(e, n) {
        var t;
        return function() {
            t || (e.apply(this, arguments), t = 1, setTimeout(function() {
                t = 0
            }, n))
        }
    }, e.fn.slider2 = function(n) {
        var t = /iPad/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
        return this.each(function() {
            var o, i, r, a, s, l, c, d, u = e(this), f = e(document), p = u.children(":last"), m = !1, g = function() {
                i = u.offset(), r = u.width(), a = u.height(), l = s ? a : r, d = y(c)
            }, v = function(e) {
                o || e == w.value || c && !(c > e) || (u.trigger("slide", [e]), w.value = e)
            }, h = function(e) {
                var t = e.pageX;
                !t && e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length && (t = e.originalEvent.touches[0].pageX);
                var o = s ? e.pageY - i.top : t - i.left;
                o = Math.max(0, Math.min(d || l, o));
                var r = o / l;
                return s && (r = 1 - r), n && (r = 1 - r), b(r, 0, !0)
            }, b = function(e, n) {
                void 0 === n && (n = 0), e > 1 && (e = 1);
                var o = Math.round(1e3 * e) / 10 + "%";
                return (!c || c >= e) && (t || p.stop(), m ? p.css("width", o) : p.animate(s ? {height: o} : {width: o}, n, "linear")), e
            }, y = function(e) {
                return Math.max(0, Math.min(l, s ? (1 - e) * a : e * r))
            }, w = {max: function(e) {
                    c = e
                },disable: function(e) {
                    o = e
                },slide: function(e, n, t) {
                    g(), t && v(e), b(e, n)
                },disableAnimation: function(e) {
                    m = e !== !1
                }};
            g(), u.data("api", w).bind("mousedown.sld touchstart", function(n) {
                if (n.preventDefault(), !o) {
                    var t = e.throttle(v, 100);
                    g(), w.dragging = !0, u.addClass("is-dragging"), v(h(n)), f.bind("mousemove.sld touchmove", function(e) {
                        e.preventDefault(), t(h(e))
                    }).one("mouseup touchend", function() {
                        w.dragging = !1, u.removeClass("is-dragging"), f.unbind("mousemove.sld touchmove")
                    })
                }
            })
        })
    }, flowplayer(function(n, t) {
        function o(n) {
            return e(".fp-" + n, t)
        }
        function i(n) {
            ("0px" === t.css("width") || "0px" === t.css("height") || n !== flowplayer.defaults.ratio) && (parseInt(b, 10) || g.css("paddingTop", 100 * n + "%")), l.inlineBlock || e("object", t).height(t.height())
        }
        function r(e) {
            t.toggleClass("is-mouseover", e).toggleClass("is-mouseout", !e)
        }
        var a, s = n.conf, l = flowplayer.support;
        t.find(".fp-ratio,.fp-ui").remove(), t.addClass("flowplayer").append('      <div class="ratio"/>      <div class="ui">         <div class="waiting"><em/><em/><em/></div>         <a class="fullscreen"/>         <a class="unload"/>         <p class="speed"/>         <div class="controls">            <a class="play"></a>            <div class="timeline">               <div class="buffer"/>               <div class="progress"/>            </div>            <div class="volume">               <a class="mute"></a>               <div class="volumeslider">                  <div class="volumelevel"/>               </div>            </div>         </div>         <div class="time">            <em class="elapsed">00:00</em>            <em class="remaining"/>            <em class="duration">00:00</em>         </div>         <div class="message"><h2/><p/></div>      </div>'.replace(/class="/g, 'class="fp-'));
        var d = o("progress"), u = o("buffer"), f = o("elapsed"), p = o("remaining"), m = o("waiting"), g = o("ratio"), v = o("speed"), h = o("duration"), b = g.css("paddingTop"), y = o("timeline").slider2(n.rtl), w = y.data("api"), k = (o("volume"), o("fullscreen")), x = o("volumeslider").slider2(n.rtl), C = x.data("api"), T = t.is(".fixed-controls, .no-toggle");
        w.disableAnimation(t.hasClass("is-touch")), l.animation || m.html("<p>loading &hellip;</p>"), i(s.ratio);
        try {
            s.fullscreen || k.remove()
        } catch (S) {
            k.remove()
        }
        n.bind("ready", function() {
            var e = n.video.duration;
            w.disable(n.disabled || !e), s.adaptiveRatio && i(n.video.height / n.video.width), h.add(p).html(c(e)), e >= 3600 && t.addClass("is-long") || t.removeClass("is-long"), C.slide(n.volumeLevel)
        }).bind("unload", function() {
            b || g.css("paddingTop", "")
        }).bind("buffer", function() {
            var e = n.video, t = e.buffer / e.duration;
            !e.seekable && l.seekable && w.max(t), 1 > t ? u.css("width", 100 * t + "%") : u.css({width: "100%"})
        }).bind("speed", function(e, n, t) {
            v.text(t + "x").addClass("fp-hilite"), setTimeout(function() {
                v.removeClass("fp-hilite")
            }, 1e3)
        }).bind("buffered", function() {
            u.css({width: "100%"}), w.max(1)
        }).bind("progress", function() {
            var e = n.video.time, t = n.video.duration;
            w.dragging || w.slide(e / t, n.seeking ? 0 : 250), f.html(c(e)), p.html("-" + c(t - e))
        }).bind("finish resume seek", function(e) {
            t.toggleClass("is-finished", "finish" == e.type)
        }).bind("stop", function() {
            f.html(c(0)), w.slide(0, 100)
        }).bind("finish", function() {
            f.html(c(n.video.duration)), w.slide(1, 100), t.removeClass("is-seeking")
        }).bind("beforeseek", function() {
            d.stop()
        }).bind("volume", function() {
            C.slide(n.volumeLevel)
        }).bind("disable", function() {
            var e = n.disabled;
            w.disable(e), C.disable(e), t.toggleClass("is-disabled", n.disabled)
        }).bind("mute", function(e, n, o) {
            t.toggleClass("is-muted", o)
        }).bind("error", function(n, o, i) {
            if (t.removeClass("is-loading").addClass("is-error"), i) {
                i.message = s.errors[i.code], o.error = !0;
                var r = e(".fp-message", t);
                e("h2", r).text((o.engine || "html5") + ": " + i.message), e("p", r).text(i.url || o.video.url || o.video.src || s.errorUrls[i.code]), t.unbind("mouseenter click").removeClass("is-mouseover")
            }
        }).bind("mouseenter mouseleave", function(e) {
            if (!T) {
                var n, o = "mouseenter" == e.type;
                r(o), o ? (t.bind("pause.x mousemove.x volume.x", function() {
                    r(!0), n = new Date
                }), a = setInterval(function() {
                    new Date - n > 5e3 && (r(!1), n = new Date)
                }, 100)) : (t.unbind(".x"), clearInterval(a))
            }
        }).bind("mouseleave", function() {
            (w.dragging || C.dragging) && t.addClass("is-mouseover").removeClass("is-mouseout")
        }).bind("click.player", function(t) {
            return e(t.target).is(".fp-ui, .fp-engine") || t.flash ? (t.preventDefault(), n.toggle()) : void 0
        }).bind("contextmenu", function(n) {
            n.preventDefault();
            var o = t.offset(), i = e(window), r = n.clientX - o.left, a = n.clientY - o.top + i.scrollTop(), s = t.find(".fp-context-menu").css({left: r + "px",top: a + "px",display: "block"}).on("click", function(e) {
                e.stopPropagation()
            });
            e("html").on("click.outsidemenu", function() {
                s.hide(), e("html").off("click.outsidemenu")
            })
        }).bind("flashdisabled", function() {
            t.addClass("is-flash-disabled").one("ready", function() {
                t.removeClass("is-flash-disabled").find(".fp-flash-disabled").remove()
            }).append('<div class="fp-flash-disabled">Adobe Flash is disabled for this page, click player area to enable.</div>')
        }), s.poster && t.css("backgroundImage", "url(" + s.poster + ")");
        var F = t.css("backgroundColor"), _ = "none" != t.css("backgroundImage") || F && "rgba(0, 0, 0, 0)" != F && "transparent" != F;
        !_ || s.splash || s.autoplay || n.bind("ready stop", function() {
            t.addClass("is-poster").one("progress", function() {
                t.removeClass("is-poster")
            })
        }), !_ && n.forcedSplash && t.css("backgroundColor", "#555"), e(".fp-toggle, .fp-play", t).click(n.toggle), e.each(["mute", "fullscreen", "unload"], function(e, t) {
            o(t).click(function() {
                n[t]()
            })
        }), y.bind("slide", function(e, t) {
            n.seeking = !0, n.seek(t * n.video.duration)
        }), x.bind("slide", function(e, t) {
            n.volume(t)
        }), o("time").click(function() {
            e(this).toggleClass("is-inverted")
        }), r(T)
    });
    var k, x, C = "is-help";
    e(document).bind("keydown.fp", function(n) {
        var t = k, o = n.ctrlKey || n.metaKey || n.altKey, i = n.which, r = t && t.conf;
        if (t && r.keyboard && !t.disabled) {
            if (-1 != e.inArray(i, [63, 187, 191]))
                return x.toggleClass(C), !1;
            if (27 == i && x.hasClass(C))
                return x.toggleClass(C), !1;
            if (!o && t.ready) {
                if (n.preventDefault(), n.shiftKey)
                    return void (39 == i ? t.speed(!0) : 37 == i && t.speed(!1));
                if (58 > i && i > 47)
                    return t.seekTo(i - 48);
                switch (i) {
                    case 38:
                    case 75:
                        t.volume(t.volumeLevel + .15);
                        break;
                    case 40:
                    case 74:
                        t.volume(t.volumeLevel - .15);
                        break;
                    case 39:
                    case 76:
                        t.seeking = !0, t.seek(!0);
                        break;
                    case 37:
                    case 72:
                        t.seeking = !0, t.seek(!1);
                        break;
                    case 190:
                        t.seekTo();
                        break;
                    case 32:
                        t.toggle();
                        break;
                    case 70:
                        r.fullscreen && t.fullscreen();
                        break;
                    case 77:
                        t.mute();
                        break;
                    case 81:
                        t.unload()
                }
            }
        }
    }), flowplayer(function(n, t) {
        n.conf.keyboard && (t.bind("mouseenter mouseleave", function(e) {
            k = n.disabled || "mouseenter" != e.type ? 0 : n, k && (x = t)
        }), t.append('      <div class="fp-help">         <a class="fp-close"></a>         <div class="fp-help-section fp-help-basics">            <p><em>space</em>play / pause</p>            <p><em>q</em>unload | stop</p>            <p><em>f</em>fullscreen</p>            <p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster <small>(latest Chrome and Safari)</small></p>         </div>         <div class="fp-help-section">            <p><em>&#8593;</em><em>&#8595;</em>volume</p>            <p><em>m</em>mute</p>         </div>         <div class="fp-help-section">            <p><em>&#8592;</em><em>&#8594;</em>seek</p>            <p><em>&nbsp;. </em>seek to previous            </p><p><em>1</em><em>2</em>&hellip;<em>6</em> seek to 10%, 20%, &hellip;60% </p>         </div>      </div>   '), n.conf.tooltip && e(".fp-ui", t).attr("title", "Hit ? for help").on("mouseout.tip", function() {
            e(this).removeAttr("title").off("mouseout.tip")
        }), e(".fp-close", t).click(function() {
            t.toggleClass(C)
        }))
    });
    var T, S = e.browser.mozilla ? "moz" : "webkit", F = "fullscreen", _ = "fullscreen-exit", E = flowplayer.support.fullscreen, M = "function" == typeof document.exitFullscreen, j = navigator.userAgent.toLowerCase(), A = /(safari)[ \/]([\w.]+)/.exec(j) && !/(chrome)[ \/]([\w.]+)/.exec(j);
    e(document).bind(M ? "fullscreenchange" : S + "fullscreenchange", function(n) {
        var t = e(document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullscreenElement || n.target);
        t.length && !T ? T = t.trigger(F, [t]) : (T.trigger(_, [T]), T = null)
    }), flowplayer(function(n, t) {
        if (n.conf.fullscreen) {
            var o, i = e(window), r = {index: 0,pos: 0,play: !1};
            n.isFullscreen = !1, n.fullscreen = function(a) {
                return n.disabled ? void 0 : (void 0 === a && (a = !n.isFullscreen), a && (o = i.scrollTop()), "webkit" != S && !A || "flash" != n.engine || (r.index = n.video.index, n.conf.rtmp && e.extend(r, {pos: n.video.time,play: n.playing})), E ? a ? M ? t[0].requestFullscreen() : (t[0][S + "RequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT), !A || document.webkitCurrentFullScreenElement || document.mozFullScreenElement || t[0][S + "RequestFullScreen"]()) : M ? document.exitFullscreen() : document[S + "CancelFullScreen"]() : n.trigger(a ? F : _, [n]), n)
            };
            var a;
            t.bind("mousedown.fs", function() {
                +new Date - a < 150 && n.ready && n.fullscreen(), a = +new Date
            }), n.bind(F, function() {
                t.addClass("is-fullscreen"), n.isFullscreen = !0
            }).bind(_, function() {
                var e;
                E || "html5" !== n.engine || (e = t.css("opacity") || "", t.css("opacity", 0)), t.removeClass("is-fullscreen"), E || "html5" !== n.engine || setTimeout(function() {
                    t.css("opacity", e)
                }), n.isFullscreen = !1, i.scrollTop(o)
            }).bind("ready", function() {
                if (r.index > 0)
                    n.play(r.index), r.index = 0;
                else if (r.pos && !isNaN(r.pos)) {
                    var t = function() {
                        r.play || n.pause(), e.extend(r, {pos: 0,play: !1})
                    };
                    n.conf.live ? (n.resume(), t()) : n.resume().seek(r.pos, t)
                }
            })
        }
    }), flowplayer(function(n, t) {
        function o() {
            return e(r.query, t)
        }
        function i() {
            return e(r.query + "." + a, t)
        }
        var r = e.extend({active: "is-active",advance: !0,query: ".fp-playlist a"}, n.conf), a = r.active;
        n.play = function(t) {
            return void 0 === t ? n.resume() : "number" != typeof t || n.conf.playlist[t] ? ("number" != typeof t && n.load.apply(null, arguments), n.unbind("resume.fromfirst"), n.video.index = t, n.load("string" == typeof n.conf.playlist[t] ? n.conf.playlist[t].toString() : e.map(n.conf.playlist[t], function(n) {
                return e.extend({}, n)
            })), n) : n
        }, n.next = function(e) {
            e && e.preventDefault();
            var t = n.video.index;
            return -1 != t && (t = t === n.conf.playlist.length - 1 ? 0 : t + 1, n.play(t)), n
        }, n.prev = function(e) {
            e && e.preventDefault();
            var t = n.video.index;
            return -1 != t && (t = 0 === t ? n.conf.playlist.length - 1 : t - 1, n.play(t)), n
        }, e(".fp-next", t).click(n.next), e(".fp-prev", t).click(n.prev), r.advance && t.unbind("finish.pl").bind("finish.pl", function(e, n) {
            var o = n.video.index + 1;
            o < n.conf.playlist.length || r.loop ? (o = o === n.conf.playlist.length ? 0 : o, t.removeClass("is-finished"), setTimeout(function() {
                n.play(o)
            })) : (t.addClass("is-playing"), n.conf.playlist.length > 1 && n.one("resume.fromfirst", function() {
                return n.play(0), !1
            }))
        });
        var s = !1;
        if (n.conf.playlist.length) {
            s = !0;
            var l = t.find(".fp-playlist");
            if (!l.length) {
                l = e('<div class="fp-playlist"></div>');
                var c = e(".fp-next,.fp-prev", t);
                c.length ? c.eq(0).before(l) : e("video", t).after(l)
            }
            l.empty(), e.each(n.conf.playlist, function(n, t) {
                var o;
                if ("string" == typeof t)
                    o = t;
                else
                    for (var i in t[0])
                        if (t[0].hasOwnProperty(i)) {
                            o = t[0][i];
                            break
                        }
                l.append(e("<a />").attr({href: o,"data-index": n}))
            })
        }
        if (o().length) {
            s || (n.conf.playlist = [], o().each(function() {
                var t = e(this).attr("href");
                e(this).attr("data-index", n.conf.playlist.length), n.conf.playlist.push(t)
            })), t.on("click", r.query, function(t) {
                t.preventDefault();
                var o = e(t.target).closest(r.query), i = Number(o.attr("data-index"));
                -1 != i && n.play(i)
            });
            var d = o().filter("[data-cuepoints]").length;
            n.bind("load", function(o, r, s) {
                var l = i().removeClass(a), c = l.attr("data-index"), u = s.index = n.video.index || 0, f = e('a[data-index="' + u + '"]', t).addClass(a), p = u == n.conf.playlist.length - 1;
                t.removeClass("video" + c).addClass("video" + u).toggleClass("last-video", p), s.index = r.video.index = u, s.is_last = r.video.is_last = p, d && (n.cuepoints = f.data("cuepoints"))
            }).bind("unload.pl", function() {
                i().toggleClass(a)
            })
        }
        n.conf.playlist.length && (n.conf.loop = !1)
    });
    var D = / ?cue\d+ ?/;
    flowplayer(function(n, t) {
        function o(e) {
            t[0].className = t[0].className.replace(D, " "), e >= 0 && t.addClass("cue" + e)
        }
        var i = 0;
        n.cuepoints = n.conf.cuepoints || [], n.bind("progress", function(e, r, a) {
            if (i && .015 > a - i)
                return i = a;
            i = a;
            for (var s, l = n.cuepoints || [], c = 0; c < l.length; c++)
                s = l[c], isNaN(s) || (s = {time: s}), s.time < 0 && (s.time = n.video.duration + s.time), s.index = c, Math.abs(s.time - a) < .125 * n.currentSpeed && (o(c), t.trigger("cuepoint", [n, s]))
        }).bind("unload seek", o), n.conf.generate_cuepoints && n.bind("load", function() {
            e(".fp-cuepoint", t).remove()
        }).bind("ready", function() {
            var o = n.cuepoints || [], i = n.video.duration, r = e(".fp-timeline", t).css("overflow", "visible");
            e.each(o, function(t, o) {
                var a = o.time || o;
                0 > a && (a = i + o);
                var s = e("<a/>").addClass("fp-cuepoint fp-cuepoint" + t).css("left", 100 * (a / i) + "%");
                s.appendTo(r).mousedown(function() {
                    return n.seek(a), !1
                })
            })
        })
    }), flowplayer(function(n, t) {
        function o(e) {
            var n = e.split(":");
            return 2 == n.length && n.unshift(0), 3600 * n[0] + 60 * n[1] + parseFloat(n[2].replace(",", "."))
        }
        var i = e("track", t), r = n.conf;
        if (!flowplayer.support.subtitles || (n.subtitles = i.length && i[0].track, !r.nativesubtitles || "html5" != r.engine)) {
            i.remove();
            var a = /^(([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> (([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)/;
            n.subtitles = [];
            var s = i.attr("src");
            if (s) {
                setTimeout(function() {
                    e.get(s, function(t) {
                        for (var i, r, s, l, c = 0, d = t.split("\n"), u = d.length, f = {}; u > c; c++)
                            if (r = a.exec(d[c])) {
                                for (i = d[c - 1], s = "<p>" + d[++c] + "</p><br/>"; e.trim(d[++c]) && c < d.length; )
                                    s += "<p>" + d[c] + "</p><br/>";
                                f = {title: i,startTime: o(r[1]),endTime: o(r[2] || r[3]),text: s}, l = {time: f.startTime,subtitle: f}, n.subtitles.push(f), n.cuepoints.push(l), n.cuepoints.push({time: f.endTime,subtitleEnd: i}), 0 === f.startTime && n.trigger("cuepoint", l)
                            }
                    }).fail(function() {
                        return n.trigger("error", {code: 8,url: s}), !1
                    })
                });
                var l, c = e("<div class='fp-subtitle'/>").appendTo(t);
                n.bind("cuepoint", function(e, n, t) {
                    t.subtitle ? (l = t.index, c.html(t.subtitle.text).addClass("fp-active")) : t.subtitleEnd && (c.removeClass("fp-active"), l = t.index)
                }).bind("seek", function(t, o, i) {
                    l && n.cuepoints[l] && n.cuepoints[l].time > i && (c.removeClass("fp-active"), l = null), e.each(n.cuepoints || [], function(e, t) {
                        var o = t.subtitle;
                        o && l != t.index ? i >= t.time && (!o.endTime || i <= o.endTime) && n.trigger("cuepoint", t) : t.subtitleEnd && i >= t.time && t.index == l + 1 && n.trigger("cuepoint", t)
                    })
                })
            }
        }
    }), flowplayer(function(n, t) {
        function o() {
            if (r && "undefined" != typeof _gat) {
                var e = _gat._getTracker(i), o = n.video;
                e._setAllowLinker(!0), e._trackEvent("Video / Seconds played", n.engine + "/" + o.type, t.attr("title") || o.src.split("/").slice(-1)[0].replace(w, ""), Math.round(r / 1e3)), r = 0
            }
        }
        var i = n.conf.analytics, r = 0, a = 0;
        i && ("undefined" == typeof _gat && e.getScript("//google-analytics.com/ga.js"), n.bind("load unload", o).bind("progress", function() {
            n.seeking || (r += a ? +new Date - a : 0, a = +new Date)
        }).bind("pause", function() {
            a = 0
        }), e(window).unload(o))
    });
    var P = /IEMobile/.test(f);
    (flowplayer.support.touch || P) && flowplayer(function(n, t) {
        var o = /Android/.test(f) && !/Firefox/.test(f) && !/Opera/.test(f), i = /Silk/.test(f), r = o ? parseFloat(/Android\ (\d\.\d)/.exec(f)[1], 10) : 0;
        if (o && (n.conf.videoTypePreference = "mp4", !/Chrome/.test(f) && 4 > r)) {
            var a = n.load;
            n.load = function() {
                var e = a.apply(n, arguments);
                return n.trigger("ready", [n, n.video]), e
            }
        }
        flowplayer.support.volume || t.addClass("no-volume no-mute"), t.addClass("is-touch"), t.find(".fp-timeline").data("api").disableAnimation();
        var s = !1;
        t.bind("touchmove", function() {
            s = !0
        }).bind("touchend click", function() {
            return s ? void (s = !1) : n.playing && !t.hasClass("is-mouseover") ? (t.addClass("is-mouseover").removeClass("is-mouseout"), !1) : (n.paused && t.hasClass("is-mouseout") && !n.splash && n.toggle(), void (n.paused && P && e("video.fp-engine", t)[0].play()))
        }), n.conf.native_fullscreen && "function" == typeof e("<video />")[0].webkitEnterFullScreen && (n.fullscreen = function() {
            var n = e("video.fp-engine", t);
            n[0].webkitEnterFullScreen(), n.one("webkitendfullscreen", function() {
                n.prop("controls", !0).prop("controls", !1)
            })
        }), (o || i) && n.bind("ready", function() {
            var o = e("video.fp-engine", t);
            o.one("canplay", function() {
                o[0].play()
            }), o[0].play(), n.bind("progress.dur", function() {
                var i = o[0].duration;
                1 !== i && (n.video.duration = i, e(".fp-duration", t).html(c(i)), n.unbind("progress.dur"))
            })
        })
    }), flowplayer(function(n, t) {
        if (n.conf.embed !== !1) {
            var o = n.conf, i = e(".fp-ui", t), r = e("<a/>", {"class": "fp-embed",title: "Copy to your site"}).appendTo(i), a = e("<div/>", {"class": "fp-embed-code"}).append("<label>Paste this HTML code on your site to embed.</label><textarea/>").appendTo(i), s = e("textarea", a);
            n.embedCode = function() {
                var i = n.video, r = i.width || t.width(), a = i.height || t.height(), s = e("<div/>", {"class": "flowplayer",css: {width: r,height: a}}), l = e("<video/>").appendTo(s);
                e.each(["origin", "analytics", "key", "rtmp"], function(e, n) {
                    o[n] && s.attr("data-" + n, o[n])
                }), o.logo && s.attr("data-logo", e("<img />").attr("src", o.logo)[0].src), e.each(i.sources, function(n, t) {
                    var i = t.src;
                    (!/^https?:/.test(t.src) && "flash" !== t.type || !o.rtmp) && (i = e("<img/>").attr("src", t.src)[0].src), l.append(e("<source/>", {type: "video/" + t.type,src: i}))
                });
                var c = {src: "//embed.flowplayer.org/5.4.6/embed.min.js"};
                e.isPlainObject(o.embed) && (c["data-swf"] = o.embed.swf, c["data-library"] = o.embed.library, c.src = o.embed.script || c.src, o.embed.skin && (c["data-skin"] = o.embed.skin));
                var d = e("<foo/>", c).append(s);
                return e("<p/>").append(d).html().replace(/<(\/?)foo/g, "<$1script")
            }, t.fptip(".fp-embed", "is-embedding"), s.click(function() {
                this.select()
            }), r.click(function() {
                s.text(n.embedCode()), s[0].focus(), s[0].select()
            })
        }
    }), e.fn.fptip = function(n, t) {
        return this.each(function() {
            function o() {
                i.removeClass(t), e(document).unbind(".st")
            }
            var i = e(this);
            e(n || "a", this).click(function(n) {
                n.preventDefault(), i.toggleClass(t), i.hasClass(t) && e(document).bind("keydown.st", function(e) {
                    27 == e.which && o()
                }).bind("click.st", function(n) {
                    e(n.target).parents("." + t).length || o()
                })
            })
        })
    }
}(jQuery), flowplayer(function(e, n) {
    function t(e) {
        var n = r("<a/>")[0];
        return n.href = e, n.hostname
    }
    function o(e) {
        var n = "ab.ca,ac.ac,ac.at,ac.be,ac.cn,ac.il,ac.in,ac.jp,ac.kr,ac.th,ac.uk,adm.br,adv.br,ah.cn,am.br,arq.br,art.br,arts.ro,asn.au,asso.fr,asso.mc,bc.ca,bio.br,biz.pl,biz.tr,bj.cn,br.com,cn.com,cng.br,cnt.br,co.ac,co.at,co.gl,co.id,co.il,co.in,co.jp,co.kr,com.ag,com.ai,com.ar,com.au,com.br,com.cn,com.cy,com.de,com.do,com.ec,com.es,com.fj,com.fr,co.mg,com.gl,com.gt,com.hk,com.hr,com.hu,com.kg,com.ki,com.lc,com.mg,com.mm,com.ms,com.mt,com.mu,com.mx,com.my,com.nf,com.ng,com.ni,com.pa,com.ph,com.pl,com.pt,com.qa,com.ro,com.ru,co.ms,com.sb,com.sc,com.sg,com.sv,com.tr,com.tw,com.ua,com.uy,com.ve,com.vn,co.nz,co.th,co.uk,co.ve,co.vi,co.za,cq.cn,de.com,de.org,ecn.br,edu.au,edu.cn,edu.hk,edu.mm,edu.my,edu.pt,edu.qa,edu.tr,eng.br,ernet.in,esp.br,etc.br,eti.br,eu.com,eu.int,eu.lv,firm.in,firm.ro,fm.br,fot.br,fst.br,g12.br,gb.com,gb.net,gd.cn,gen.in,go.jp,go.kr,go.th,gov.au,gov.az,gov.br,gov.cn,gov.il,gov.in,gov.mm,gov.my,gov.qa,gov.sg,gov.tr,gov.tw,gs.cn,gv.ac,gv.at,gx.cn,gz.cn,he.cn,hi.cn,hk.cn,hl.cn,hu.com,id.au,idv.tw,ind.br,ind.in,inf.br,info.pl,info.ro,info.tr,info.ve,in.ua,iwi.nz,jl.cn,jor.br,js.cn,k12.il,k12.tr,kr.com,lel.br,ln.cn,ltd.uk,maori.nz,mb.ca,med.br,me.uk,mil.br,mi.th,mo.cn,muni.il,nb.ca,ne.jp,ne.kr,net.ag,net.ai,net.au,net.br,net.cn,net.do,net.gl,net.hk,net.il,net.in,net.kg,net.ki,net.lc,net.mg,net.mm,net.mu,net.ni,net.nz,net.pl,net.ru,net.sb,net.sc,net.sg,net.th,net.tr,net.tw,net.uk,net.ve,nf.ca,nm.cn,nm.kr,no.com,nom.br,nom.ni,nom.ro,ns.ca,nt.ca,ntr.br,nt.ro,nx.cn,odo.br,off.ai,on.ca,or.ac,or.at,org.ag,org.ai,org.au,org.br,org.cn,org.do,org.es,org.gl,org.hk,org.in,org.kg,org.ki,org.lc,org.mg,org.mm,org.ms,org.nf,org.ni,org.nz,org.pl,org.ro,org.ru,org.sb,org.sc,org.sg,org.tr,org.tw,org.uk,org.ve,or.jp,or.kr,or.th,pe.ca,plc.uk,ppg.br,presse.fr,pro.br,psc.br,psi.br,qc.ca,qc.com,qh.cn,rec.br,rec.ro,res.in,sa.com,sc.cn,sch.ul,se.com,se.net,sh.cn,sk.ca,slg.br,sn.cn,store.ro,tj.cn,tm.fr,tm.mc,tmp.br,tm.ro,tur.br,tv.br,tv.tr,tw.cn,uk.com,uk.net,us.com,uy.com,vet.br,waw.pl,web.ve,www.ro,xj.cn,xz.cn,yk.ca,yn.cn,zj.cn,zlg.br".split(",");
        e = e.toLowerCase();
        var t = e.split("."), o = t.length;
        if (2 > o)
            return e;
        var i = t.slice(-2).join(".");
        return o >= 3 && r.inArray(i, n) >= 0 ? t.slice(-3).join(".") : i
    }
    function i(e, n) {
        "localhost" == n || parseInt(n.split(".").slice(-1)) || (n = o(n));
        for (var t = 0, i = n.length - 1; i >= 0; i--)
            t += 2983723987 * n.charCodeAt(i);
        for (t = ("" + t).substring(0, 7), i = 0; i < e.length; i++)
            if (t === e[i].substring(1, 8))
                return 1
    }
    var r = jQuery, a = e.conf, s = a.swf.indexOf("flowplayer.org") && a.e && n.data("origin"), l = s ? t(s) : location.hostname, c = a.key;
    if ("file:" == location.protocol && (l = "localhost"), e.load.ed = 1, a.hostname = l, a.origin = s || location.href, s && n.addClass("is-embedded"), "string" == typeof c && (c = c.split(/,\s*/)), c && "function" == typeof i && i(c, l))
        a.logo && n.append(r("<a>", {"class": "fp-logo",href: s}).append(r("<img/>", {src: a.logo})));
    else {
        var d = r("<a/>").attr("href", "http://flowplayer.org").appendTo(n);
        r(".fp-controls", n);
        var u = r('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2013</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(n);
        e.bind("pause resume finish unload", function(e, t) {
            var o = -1;
            t.video.src && r.each([["org", "flowplayer", "drive"], ["org", "flowplayer", "my"]], function(e, n) {
                return o = t.video.src.indexOf("://" + n.reverse().join(".")), -1 === o
            }), /pause|resume/.test(e.type) && "flash" != t.engine && 4 != o && 5 != o ? (d.show().css({position: "absolute",left: 16,bottom: 36,zIndex: 99999,width: 100,height: 20,backgroundImage: "url(" + [".png", "logo", "/", ".net", ".cloudfront", "d32wqyuo10o653", "//"].reverse().join("") + ")"}), t.load.ed = d.is(":visible") && r.contains(n[0], u[0]), t.load.ed || t.pause()) : d.hide()
        })
    }
});
var sodium;
!function(sodium) {
    function attr(el, name, value) {
        return el ? _.isUndefined(value) ? el.getAttribute(name) : (el.setAttribute(name, value), value) : void 0
    }
    function text(el, text) {
        return el ? (_.isUndefined(text) || (el.textContent = text), el.textContent) : void 0
    }
    function hasClass(el, className) {
        return el.className.indexOf(className) >= 0
    }
    function addClass(el, className) {
        return hasClass(el, className) || (el.className += " " + className), el
    }
    function removeClass(el, className) {
        return el.className = el.className.replace(className, " "), el
    }
    function toggleClass(el, className) {
        return (hasClass(el, className) ? removeClass : addClass)(el, className)
    }
    function isChild(child, parent) {
        return child === parent ? !0 : null === child.parentNode || void 0 === child.parentNode ? !1 : isChild(child.parentNode, parent)
    }
    var Wrap = function() {
        function Wrap(wrapped) {
            this.wrapped = wrapped
        }
        return Wrap.prototype.map = function(f) {
            return new Wrap(f(this.wrapped))
        }, Wrap.of = function(x) {
            return new Wrap(x)
        }, Wrap.prototype.chain = function(f) {
            return f(this.wrapped)
        }, Wrap.prototype.doto = function(f) {
            return f(this.wrapped), this
        }, Wrap
    }();
    sodium.Wrap = Wrap, sodium.attr = attr, sodium.text = text, sodium.hasClass = hasClass, sodium.addClass = addClass, sodium.removeClass = removeClass, sodium.toggleClass = toggleClass, sodium.isChild = isChild
}(sodium || (sodium = {}));