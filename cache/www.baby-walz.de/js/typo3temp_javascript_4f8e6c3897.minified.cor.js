function cookie_set(name, value, expires, path, domain, secure) {
    var cur_cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    document.cookie = cur_cookie;
}

function cookie_get(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) {
            return null;
        }
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function cookie_delete(name, path, domain) {
    if (cookie_get(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function fix_date(date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0) {
        date.setTime(date.getTime() - skew);
    }
}
var doubleclickFormSubmitFlag = false;

function doubleclickCheckFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]');
    if (doubleclickFormSubmitFlag == false) {
        if (form) {
            doubleclickFormSubmitFlag = true;
            form.submit();
        }
    }
}

function changeFormElementvalue(id, newValue) {
    var returnValue = false;
    var formElement = document.getElementById(id);
    if (formElement) {
        formElement.value = newValue;
        returnValue = true;
    }
    return returnValue;
}

function cookieWarning(cookieName, getName, warnText) {
    var cookieSessionId = cookie_get(cookieName);
    var myDiv = false;
    if (typeof document.getElementById('mb3HeaderWarnings') == 'object' &&
        document.getElementById('mb3HeaderWarnings') != null) {
        myDiv = document.getElementById('mb3HeaderWarnings');
        if (!cookieSessionId && document.location.href.indexOf(getName + '=') ==
            -1) {
            myDiv.innerHTML = warnText;
            myDiv.style['visibility'] = 'visible';
            myDiv.style['display'] = 'block';
        }
    }
}

function noCookieRedirect(cookieName, getName, sessionId) {
    var cookieSessionId = cookie_get(cookieName);
    var paramAppend = '&';
    var redirectString = getName + '=' + sessionId;
    if (cookieSessionId == null) {
        if (document.location.href.indexOf('?') == -1) {
            paramAppend = '?&';
        }
        //document.location.href = document.location.href + paramAppend +
            //redirectString;
    }
}
var dmcOnloadFuncs = new Array();

function dmcOnLoad() {
    for (var i = 0; i < dmcOnloadFuncs.length; i++) {
        if (typeof dmcOnloadFuncs[i] == 'function') {
            dmcOnloadFuncs[i]();
        }
    }
}

function addOnloadFunction(func) {
    if (typeof func == 'function') {
        dmcOnloadFuncs.push(func);
    }
}

function openWindow(url, name, parameter) {
    if (parameter) {
        size = parameter;
    }
    var popuphandler = window.open(url, name, size);
    popuphandler.window.focus();
    return popuphandler;
}

function openJQueryPopupWindow(url, name, parameter) {
    name = '<span style="font-size:17px;font-weight:bold">' + name + '</span>';
    popupurl = url + "?TB_iframe=true&";
    if (parameter) {
        size = parameter.replace(/\,/g, "&");
        popupurl = url + "?TB_iframe=true&" + size;
    }
    tb_show(name, popupurl, false);
}
var JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',
    stringify: function(arg) {
        var c, i, l, s = '',
            v;
        var numeric = true;
        switch (typeof arg) {
            case 'object':
                if (arg) {
                    if (Array.prototype.isPrototypeOf(arg)) {
                        for (i in arg) {
                            if (isNaN(i) || !isFinite(i)) {
                                numeric = false;
                                break;
                            }
                        }
                        if (numeric == true) {
                            for (i = 0; i < arg.length; ++i) {
                                if (typeof arg[i] != 'undefined') {
                                    v = this.stringify(arg[i]);
                                    if (s) {
                                        s += ',';
                                    }
                                    s += v;
                                } else {
                                    s += ',null';
                                }
                            }
                            return '[' + s + ']';
                        } else {
                            for (i in arg) {
                                v = arg[i];
                                if (typeof v != 'undefined' && typeof v !=
                                    'function') {
                                    v = this.stringify(v);
                                    if (s) {
                                        s += ',';
                                    }
                                    s += this.stringify(i) + ':' + v;
                                }
                            }
                            return '{' + s + '}';
                        }
                    } else if (typeof arg.toString != 'undefined') {
                        for (i in arg) {
                            v = arg[i];
                            if (typeof v != 'undefined' && typeof v !=
                                'function') {
                                v = this.stringify(v);
                                if (s) {
                                    s += ',';
                                }
                                s += this.stringify(i) + ':' + v;
                            }
                        }
                        return '{' + s + '}';
                    }
                }
                return 'null';
            case 'number':
                return isFinite(arg) ? String(arg) : 'null';
            case 'string':
                l = arg.length;
                s = '"';
                for (i = 0; i < l; i += 1) {
                    c = arg.charAt(i);
                    if (c >= ' ') {
                        if (c == '\\' || c == '"') {
                            s += '\\';
                        }
                        s += c;
                    } else {
                        switch (c) {
                            case '\b':
                                s += '\\b';
                                break;
                            case '\f':
                                s += '\\f';
                                break;
                            case '\n':
                                s += '\\n';
                                break;
                            case '\r':
                                s += '\\r';
                                break;
                            case '\t':
                                s += '\\t';
                                break;
                            default:
                                c = c.charCodeAt();
                                s += '\\u00' + Math.floor(c / 16).toString(
                                    16) + (c % 16).toString(16);
                        }
                    }
                }
                return s + '"';
            case 'boolean':
                return String(arg);
            default:
                return 'null';
        }
    },
    parse: function(text) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch != '' && ch <= ' ') {
                next();
            }
        }

        function str() {
            var i, s = '',
                t, u;
            if (ch == '"') {
                outer: while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                            case 'b':
                                s += '\b';
                                break;
                            case 'f':
                                s += '\f';
                                break;
                            case 'n':
                                s += '\n';
                                break;
                            case 'r':
                                s += '\r';
                                break;
                            case 't':
                                s += '\t';
                                break;
                            case 'u':
                                u = 0;
                                for (i = 0; i < 4; i += 1) {
                                    t = parseInt(next(), 16);
                                    if (!isFinite(t)) {
                                        break outer;
                                    }
                                    u = u * 16 + t;
                                }
                                s += String.fromCharCode(u);
                                break;
                            default:
                                s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function arr() {
            var a = [];
            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(val());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function obj() {
            var k, o = {};
            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = val();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function assoc() {
            var k, a = [];
            if (ch == '<') {
                next();
                white();
                if (ch == '>') {
                    next();
                    return a;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    a[k] = val();
                    white();
                    if (ch == '>') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad associative array");
        }

        function num() {
            var n = '',
                v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                        next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

        function val() {
            white();
            switch (ch) {
                case '{':
                    return obj();
                case '[':
                    return arr();
                case '<':
                    return assoc();
                case '"':
                    return str();
                case '-':
                    return num();
                default:
                    return ch >= '0' && ch <= '9' ? num() : word();
            }
        }
        return val();
    }
};
(function(a, b) {
    function ci(a) {
        return d.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow :
            !1
    }

    function cf(a) {
        if (!b_[a]) {
            var b = d("<" + a + ">").appendTo("body"),
                c = b.css("display");
            b.remove();
            if (c === "none" || c === "") c = "block";
            b_[a] = c
        }
        return b_[a]
    }

    function ce(a, b) {
        var c = {};
        d.each(cd.concat.apply([], cd.slice(0, b)), function() {
            c[this] = a
        });
        return c
    }

    function b$() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function bZ() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function bY() {
        d(a).unload(function() {
            for (var a in bW) bW[a](0, 1)
        })
    }

    function bS(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var e = a.dataTypes,
            f = {},
            g, h, i = e.length,
            j, k = e[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h === "string" && (f[h.toLowerCase()] =
                    a.converters[h]);
            l = k, k = e[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = f[m] || f["* " + k];
                if (!n) {
                    p = b;
                    for (o in f) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = f[j[1] + " " + k];
                            if (p) {
                                o = f[o], o === !0 ? n = p : p === !0 && (n =
                                    o);
                                break
                            }
                        }
                    }
                }!n && !p && d.error("No conversion from " + m.replace(" ",
                    " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function bR(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader(
            "content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function bQ(a, b, c, e) {
        if (d.isArray(b) && b.length) d.each(b, function(b, f) {
            c || bs.test(a) ? e(a, f) : bQ(a + "[" + (typeof f ===
                    "object" || d.isArray(f) ? b : "") + "]", f,
                c, e)
        });
        else if (c || b == null || typeof b !== "object") e(a, b);
        else if (d.isArray(b) || d.isEmptyObject(b)) e(a, "");
        else
            for (var f in b) bQ(a + "[" + f + "]", b[f], c, e)
    }

    function bP(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bJ,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l ===
            "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l =
                bP(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bP(a, c, d, e, "*", g));
        return l
    }

    function bO(a) {
        return function(b, c) {
            typeof b !== "string" && (c = b, b = "*");
            if (d.isFunction(c)) {
                var e = b.toLowerCase().split(bD),
                    f = 0,
                    g = e.length,
                    h, i, j;
                for (; f < g; f++) h = e[f], j = /^\+/.test(h), j && (h =
                    h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ?
                    "unshift" : "push"](c)
            }
        }
    }

    function bq(a, b, c) {
        var e = b === "width" ? bk : bl,
            f = b === "width" ? a.offsetWidth : a.offsetHeight;
        if (c === "border") return f;
        d.each(e, function() {
            c || (f -= parseFloat(d.css(a, "padding" + this)) || 0),
                c === "margin" ? f += parseFloat(d.css(a, "margin" +
                    this)) || 0 : f -= parseFloat(d.css(a, "border" +
                    this + "Width")) || 0
        });
        return f
    }

    function bc(a, b) {
        b.src ? d.ajax({
                url: b.src,
                async: !1,
                dataType: "script"
            }) : d.globalEval(b.text || b.textContent || b.innerHTML || ""),
            b.parentNode && b.parentNode.removeChild(b)
    }

    function bb(a) {
        return "getElementsByTagName" in a ? a.getElementsByTagName("*") :
            "querySelectorAll" in a ? a.querySelectorAll("*") : []
    }

    function ba(a, b) {
        if (b.nodeType === 1) {
            var c = b.nodeName.toLowerCase();
            b.clearAttributes(), b.mergeAttributes(a);
            if (c === "object") b.outerHTML = a.outerHTML;
            else if (c !== "input" || a.type !== "checkbox" && a.type !==
                "radio") {
                if (c === "option") b.selected = a.defaultSelected;
                else if (c === "input" || c === "textarea") b.defaultValue =
                    a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked),
                b.value !== a.value && (b.value = a.value);
            b.removeAttribute(d.expando)
        }
    }

    function _(a, b) {
        if (b.nodeType === 1 && d.hasData(a)) {
            var c = d.expando,
                e = d.data(a),
                f = d.data(b, e);
            if (e = e[c]) {
                var g = e.events;
                f = f[c] = d.extend({}, e);
                if (g) {
                    delete f.handle, f.events = {};
                    for (var h in g)
                        for (var i = 0, j = g[h].length; i < j; i++) d.event
                            .add(b, h + (g[h][i].namespace ? "." : "") + g[
                                h][i].namespace, g[h][i], g[h][i].data)
                }
            }
        }
    }

    function $(a, b) {
        return d.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] ||
            a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function Q(a, b, c) {
        if (d.isFunction(b)) return d.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return d.grep(a, function(a, d) {
            return a === b === c
        });
        if (typeof b === "string") {
            var e = d.grep(a, function(a) {
                return a.nodeType === 1
            });
            if (L.test(b)) return d.filter(b, e, !c);
            b = d.filter(b, e)
        }
        return d.grep(a, function(a, e) {
            return d.inArray(a, b) >= 0 === c
        })
    }

    function P(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function H(a, b) {
        return (a && a !== "*" ? a + "." : "") + b.replace(t, "`").replace(
            u, "&")
    }

    function G(a) {
        var b, c, e, f, g, h, i, j, k, l, m, n, o, p = [],
            q = [],
            s = d._data(this, "events");
        if (a.liveFired !== this && s && s.live && !a.target.disabled && (!
                a.button || a.type !== "click")) {
            a.namespace && (n = new RegExp("(^|\\.)" + a.namespace.split(
                    ".").join("\\.(?:.*\\.)?") + "(\\.|$)")), a.liveFired =
                this;
            var t = s.live.slice(0);
            for (i = 0; i < t.length; i++) g = t[i], g.origType.replace(r,
                "") === a.type ? q.push(g.selector) : t.splice(i--, 1);
            f = d(a.target).closest(q, a.currentTarget);
            for (j = 0, k = f.length; j < k; j++) {
                m = f[j];
                for (i = 0; i < t.length; i++) {
                    g = t[i];
                    if (m.selector === g.selector && (!n || n.test(g.namespace)) &&
                        !m.elem.disabled) {
                        h = m.elem, e = null;
                        if (g.preType === "mouseenter" || g.preType ===
                            "mouseleave") a.type = g.preType, e = d(a.relatedTarget)
                            .closest(g.selector)[0];
                        (!e || e !== h) && p.push({
                            elem: h,
                            handleObj: g,
                            level: m.level
                        })
                    }
                }
            }
            for (j = 0, k = p.length; j < k; j++) {
                f = p[j];
                if (c && f.level > c) break;
                a.currentTarget = f.elem, a.data = f.handleObj.data, a.handleObj =
                    f.handleObj, o = f.handleObj.origHandler.apply(f.elem,
                        arguments);
                if (o === !1 || a.isPropagationStopped()) {
                    c = f.level, o === !1 && (b = !1);
                    if (a.isImmediatePropagationStopped()) break
                }
            }
            return b
        }
    }

    function E(a, c, e) {
        var f = d.extend({}, e[0]);
        f.type = a, f.originalEvent = {}, f.liveFired = b, d.event.handle.call(
            c, f), f.isDefaultPrevented() && e[0].preventDefault()
    }

    function y() {
        return !0
    }

    function x() {
        return !1
    }

    function i(a) {
        for (var b in a)
            if (b !== "toJSON") return !1;
        return !0
    }

    function h(a, c, e) {
        if (e === b && a.nodeType === 1) {
            e = a.getAttribute("data-" + c);
            if (typeof e === "string") {
                try {
                    e = e === "true" ? !0 : e === "false" ? !1 : e ===
                        "null" ? null : d.isNaN(e) ? g.test(e) ? d.parseJSON(
                            e) : e : parseFloat(e)
                } catch (f) {}
                d.data(a, c, e)
            } else e = b
        }
        return e
    }
    var c = a.document,
        d = function() {
            function G() {
                if (!d.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(G, 1);
                        return
                    }
                    d.ready()
                }
            }
            var d = function(a, b) {
                    return new d.fn.init(a, b, g)
                },
                e = a.jQuery,
                f = a.$,
                g, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
                i = /\S/,
                j = /^\s+/,
                k = /\s+$/,
                l = /\d/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p =
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = navigator.userAgent,
                w, x, y, z = Object.prototype.toString,
                A = Object.prototype.hasOwnProperty,
                B = Array.prototype.push,
                C = Array.prototype.slice,
                D = String.prototype.trim,
                E = Array.prototype.indexOf,
                F = {};
            d.fn = d.prototype = {
                    constructor: d,
                    init: function(a, e, f) {
                        var g, i, j, k;
                        if (!a) return this;
                        if (a.nodeType) {
                            this.context = this[0] = a, this.length = 1;
                            return this
                        }
                        if (a === "body" && !e && c.body) {
                            this.context = c, this[0] = c.body, this.selector =
                                "body", this.length = 1;
                            return this
                        }
                        if (typeof a === "string") {
                            g = h.exec(a);
                            if (!g || !g[1] && e) return !e || e.jquery ?
                                (e || f).find(a) : this.constructor(
                                    e).find(a);
                            if (g[1]) {
                                e = e instanceof d ? e[0] : e, k = e ?
                                    e.ownerDocument || e : c, j = m.exec(
                                        a), j ? d.isPlainObject(e) ? (a = [
                                        c.createElement(j[1])
                                    ], d.fn.attr.call(a, e, !0)) : a = [
                                        k.createElement(j[1])
                                    ] : (j = d.buildFragment([g[1]], [k]),
                                        a = (j.cacheable ? d.clone(j.fragment) :
                                            j.fragment).childNodes);
                                return d.merge(this, a)
                            }
                            i = c.getElementById(g[2]);
                            if (i && i.parentNode) {
                                if (i.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = i
                            }
                            this.context = c, this.selector = a;
                            return this
                        }
                        if (d.isFunction(a)) return f.ready(a);
                        a.selector !== b && (this.selector = a.selector,
                            this.context = a.context);
                        return d.makeArray(a, this)
                    },
                    selector: "",
                    jquery: "1.5.2",
                    length: 0,
                    size: function() {
                        return this.length
                    },
                    toArray: function() {
                        return C.call(this, 0)
                    },
                    get: function(a) {
                        return a == null ? this.toArray() : a < 0 ?
                            this[this.length + a] : this[a]
                    },
                    pushStack: function(a, b, c) {
                        var e = this.constructor();
                        d.isArray(a) ? B.apply(e, a) : d.merge(e, a), e
                            .prevObject = this, e.context = this.context,
                            b === "find" ? e.selector = this.selector +
                            (this.selector ? " " : "") + c : b && (e.selector =
                                this.selector + "." + b + "(" + c + ")"
                            );
                        return e
                    },
                    each: function(a, b) {
                        return d.each(this, a, b)
                    },
                    ready: function(a) {
                        d.bindReady(), x.done(a);
                        return this
                    },
                    eq: function(a) {
                        return a === -1 ? this.slice(a) : this.slice(a, +
                            a + 1)
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    slice: function() {
                        return this.pushStack(C.apply(this, arguments),
                            "slice", C.call(arguments).join(","))
                    },
                    map: function(a) {
                        return this.pushStack(d.map(this, function(b, c) {
                            return a.call(b, c, b)
                        }))
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null)
                    },
                    push: B,
                    sort: [].sort,
                    splice: [].splice
                }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend =
                function() {
                    var a, c, e, f, g, h, i = arguments[0] || {},
                        j = 1,
                        k = arguments.length,
                        l = !1;
                    typeof i === "boolean" && (l = i, i = arguments[1] || {},
                        j = 2), typeof i !== "object" && !d.isFunction(
                        i) && (i = {}), k === j && (i = this, --j);
                    for (; j < k; j++)
                        if ((a = arguments[j]) != null)
                            for (c in a) {
                                e = i[c], f = a[c];
                                if (i === f) continue;
                                l && f && (d.isPlainObject(f) || (g = d.isArray(
                                    f))) ? (g ? (g = !1, h = e && d.isArray(
                                    e) ? e : []) : h = e && d.isPlainObject(
                                    e) ? e : {}, i[c] = d.extend(l,
                                    h, f)) : f !== b && (i[c] = f)
                            }
                    return i
                }, d.extend({
                    noConflict: function(b) {
                        a.$ = f, b && (a.jQuery = e);
                        return d
                    },
                    isReady: !1,
                    readyWait: 1,
                    ready: function(a) {
                        a === !0 && d.readyWait--;
                        if (!d.readyWait || a !== !0 && !d.isReady) {
                            if (!c.body) return setTimeout(d.ready,
                                1);
                            d.isReady = !0;
                            if (a !== !0 && --d.readyWait > 0)
                                return;
                            x.resolveWith(c, [d]), d.fn.trigger &&
                                d(c).trigger("ready").unbind(
                                    "ready")
                        }
                    },
                    bindReady: function() {
                        if (!x) {
                            x = d._Deferred();
                            if (c.readyState === "complete") return
                            setTimeout(d.ready, 1);
                            if (c.addEventListener) c.addEventListener(
                                "DOMContentLoaded", y, !1), a.addEventListener(
                                "load", d.ready, !1);
                            else if (c.attachEvent) {
                                c.attachEvent("onreadystatechange",
                                    y), a.attachEvent("onload",
                                    d.ready);
                                var b = !1;
                                try {
                                    b = a.frameElement == null
                                } catch (e) {}
                                c.documentElement.doScroll && b &&
                                    G()
                            }
                        }
                    },
                    isFunction: function(a) {
                        return d.type(a) === "function"
                    },
                    isArray: Array.isArray || function(a) {
                        return d.type(a) === "array"
                    },
                    isWindow: function(a) {
                        return a && typeof a === "object" &&
                            "setInterval" in a
                    },
                    isNaN: function(a) {
                        return a == null || !l.test(a) || isNaN(a)
                    },
                    type: function(a) {
                        return a == null ? String(a) : F[z.call(a)] ||
                            "object"
                    },
                    isPlainObject: function(a) {
                        if (!a || d.type(a) !== "object" || a.nodeType ||
                            d.isWindow(a)) return !1;
                        if (a.constructor && !A.call(a,
                                "constructor") && !A.call(a.constructor
                                .prototype, "isPrototypeOf")) return !
                            1;
                        var c;
                        for (c in a) {}
                        return c === b || A.call(a, c)
                    },
                    isEmptyObject: function(a) {
                        for (var b in a) return !1;
                        return !0
                    },
                    error: function(a) {
                        console.debug("throw "+a);
                        //throw a
                    },
                    parseJSON: function(b) {
                        if (typeof b !== "string" || !b) return null;
                        b = d.trim(b);
                        if (n.test(b.replace(o, "@").replace(p, "]")
                                .replace(q, ""))) return a.JSON &&
                            a.JSON.parse ? a.JSON.parse(b) : (
                                new Function("return " + b))();
                        console.debug(b);
                        d.error("Invalid JSON: " + b)
                    },
                    parseXML: function(b, c, e) {
                        a.DOMParser ? (e = new DOMParser, c = e.parseFromString(
                            b, "text/xml")) : (c = new ActiveXObject(
                                "Microsoft.XMLDOM"), c.async =
                            "false", c.loadXML(b)), e = c.documentElement, (!
                            e || !e.nodeName || e.nodeName ===
                            "parsererror") && d.error(
                            "Invalid XML: " + b);
                        return c
                    },
                    noop: function() {},
                    globalEval: function(a) {
                        if (a && i.test(a)) {
                            var b = c.head || c.getElementsByTagName(
                                    "head")[0] || c.documentElement,
                                e = c.createElement("script");
                            d.support.scriptEval() ? e.appendChild(
                                    c.createTextNode(a)) : e.text =
                                a, b.insertBefore(e, b.firstChild),
                                b.removeChild(e)
                        }
                    },
                    nodeName: function(a, b) {
                        return a.nodeName && a.nodeName.toUpperCase() ===
                            b.toUpperCase()
                    },
                    each: function(a, c, e) {
                        var f, g = 0,
                            h = a.length,
                            i = h === b || d.isFunction(a);
                        if (e) {
                            if (i) {
                                for (f in a)
                                    if (c.apply(a[f], e) === !1)
                                        break
                            } else
                                for (; g < h;)
                                    if (c.apply(a[g++], e) === !1)
                                        break
                        } else if (i) {
                            for (f in a)
                                if (c.call(a[f], f, a[f]) === !1)
                                    break
                        } else
                            for (var j = a[0]; g < h && c.call(j, g,
                                    j) !== !1; j = a[++g]) {}
                        return a
                    },
                    trim: D ? function(a) {
                        return a == null ? "" : D.call(a)
                    } : function(a) {
                        return a == null ? "" : (a + "").replace(j,
                            "").replace(k, "")
                    },
                    makeArray: function(a, b) {
                        var c = b || [];
                        if (a != null) {
                            var e = d.type(a);
                            a.length == null || e === "string" || e ===
                                "function" || e === "regexp" || d.isWindow(
                                    a) ? B.call(c, a) : d.merge(c,
                                    a)
                        }
                        return c
                    },
                    inArray: function(a, b) {
                        if (b.indexOf) return b.indexOf(a);
                        for (var c = 0, d = b.length; c < d; c++)
                            if (b[c] === a) return c;
                        return -1
                    },
                    merge: function(a, c) {
                        var d = a.length,
                            e = 0;
                        if (typeof c.length === "number")
                            for (var f = c.length; e < f; e++) a[d++] =
                                c[e];
                        else
                            while (c[e] !== b) a[d++] = c[e++];
                        a.length = d;
                        return a
                    },
                    grep: function(a, b, c) {
                        var d = [],
                            e;
                        c = !!c;
                        for (var f = 0, g = a.length; f < g; f++) e = !
                            !b(a[f], f), c !== e && d.push(a[f]);
                        return d
                    },
                    map: function(a, b, c) {
                        var d = [],
                            e;
                        for (var f = 0, g = a.length; f < g; f++) e =
                            b(a[f], f, c), e != null && (d[d.length] =
                                e);
                        return d.concat.apply([], d)
                    },
                    guid: 1,
                    proxy: function(a, c, e) {
                        arguments.length === 2 && (typeof c ===
                            "string" ? (e = a, a = e[c], c = b) :
                            c && !d.isFunction(c) && (e = c, c =
                                b)), !c && a && (c = function() {
                            return a.apply(e || this,
                                arguments)
                        }), a && (c.guid = a.guid = a.guid || c
                            .guid || d.guid++);
                        return c
                    },
                    access: function(a, c, e, f, g, h) {
                        var i = a.length;
                        if (typeof c === "object") {
                            for (var j in c) d.access(a, j, c[j], f,
                                g, e);
                            return a
                        }
                        if (e !== b) {
                            f = !h && f && d.isFunction(e);
                            for (var k = 0; k < i; k++) g(a[k], c,
                                f ? e.call(a[k], k, g(a[k], c)) :
                                e, h);
                            return a
                        }
                        return i ? g(a[0], c) : b
                    },
                    now: function() {
                        return (new Date).getTime()
                    },
                    uaMatch: function(a) {
                        a = a.toLowerCase();
                        var b = r.exec(a) || s.exec(a) || t.exec(a) ||
                            a.indexOf("compatible") < 0 && u.exec(a) || [];
                        return {
                            browser: b[1] || "",
                            version: b[2] || "0"
                        }
                    },
                    sub: function() {
                        function a(b, c) {
                            return new a.fn.init(b, c)
                        }
                        d.extend(!0, a, this), a.superclass = this,
                            a.fn = a.prototype = this(), a.fn.constructor =
                            a, a.subclass = this.subclass, a.fn.init =
                            function b(b, c) {
                                c && c instanceof d && !(c instanceof a) &&
                                    (c = a(c));
                                return d.fn.init.call(this, b, c, e)
                            }, a.fn.init.prototype = a.fn;
                        var e = a(c);
                        return a
                    },
                    browser: {}
                }), d.each(
                    "Boolean Number String Function Array Date RegExp Object"
                    .split(" "),
                    function(a, b) {
                        F["[object " + b + "]"] = b.toLowerCase()
                    }), w = d.uaMatch(v), w.browser && (d.browser[w.browser] = !
                    0, d.browser.version = w.version), d.browser.webkit &&
                (d.browser.safari = !0), E && (d.inArray = function(a, b) {
                    return E.call(b, a)
                }), i.test(" ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g =
                d(c), c.addEventListener ? y = function() {
                    c.removeEventListener("DOMContentLoaded", y, !1), d.ready()
                } : c.attachEvent && (y = function() {
                    c.readyState === "complete" && (c.detachEvent(
                        "onreadystatechange", y), d.ready())
                });
            return d
        }(),
        e = "then done fail isResolved isRejected promise".split(" "),
        f = [].slice;
    d.extend({
            _Deferred: function() {
                var a = [],
                    b, c, e, f = {
                        done: function() {
                            if (!e) {
                                var c = arguments,
                                    g, h, i, j, k;
                                b && (k = b, b = 0);
                                for (g = 0, h = c.length; g < h; g++)
                                    i = c[g], j = d.type(i), j ===
                                    "array" ? f.done.apply(f, i) :
                                    j === "function" && a.push(
                                        i);
                                k && f.resolveWith(k[0], k[1])
                            }
                            return this
                        },
                        resolveWith: function(d, f) {
                            if (!e && !b && !c) {
                                f = f || [], c = 1;
                                try {
                                    while (a[0]) a.shift().apply(
                                        d, f)
                                } finally {
                                    b = [d, f], c = 0
                                }
                            }
                            return this
                        },
                        resolve: function() {
                            f.resolveWith(this, arguments);
                            return this
                        },
                        isResolved: function() {
                            return c || b
                        },
                        cancel: function() {
                            e = 1, a = [];
                            return this
                        }
                    };
                return f
            },
            Deferred: function(a) {
                var b = d._Deferred(),
                    c = d._Deferred(),
                    f;
                d.extend(b, {
                        then: function(a, c) {
                            b.done(a).fail(c);
                            return this
                        },
                        fail: c.done,
                        rejectWith: c.resolveWith,
                        reject: c.resolve,
                        isRejected: c.isResolved,
                        promise: function(a) {
                            if (a == null) {
                                if (f) return f;
                                f = a = {}
                            }
                            var c = e.length;
                            while (c--) a[e[c]] = b[e[c]];
                            return a
                        }
                    }), b.done(c.cancel).fail(b.cancel), delete b.cancel,
                    a && a.call(b, b);
                return b
            },
            when: function(a) {
                function i(a) {
                    return function(c) {
                        b[a] = arguments.length > 1 ? f.call(
                            arguments, 0) : c, --g || h.resolveWith(
                            h, f.call(b, 0))
                    }
                }
                var b = arguments,
                    c = 0,
                    e = b.length,
                    g = e,
                    h = e <= 1 && a && d.isFunction(a.promise) ? a :
                    d.Deferred();
                if (e > 1) {
                    for (; c < e; c++) b[c] && d.isFunction(b[c].promise) ?
                        b[c].promise().then(i(c), h.reject) : --g;
                    g || h.resolveWith(h, b)
                } else h !== a && h.resolveWith(h, e ? [a] : []);
                return h.promise()
            }
        }),
        function() {
            d.support = {};
            var b = c.createElement("div");
            b.style.display = "none", b.innerHTML =
                "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
            var e = b.getElementsByTagName("*"),
                f = b.getElementsByTagName("a")[0],
                g = c.createElement("select"),
                h = g.appendChild(c.createElement("option")),
                i = b.getElementsByTagName("input")[0];
            if (e && e.length && f) {
                d.support = {
                        leadingWhitespace: b.firstChild.nodeType === 3,
                        tbody: !b.getElementsByTagName("tbody").length,
                        htmlSerialize: !!b.getElementsByTagName("link").length,
                        style: /red/.test(f.getAttribute("style")),
                        hrefNormalized: f.getAttribute("href") === "/a",
                        opacity: /^0.55$/.test(f.style.opacity),
                        cssFloat: !!f.style.cssFloat,
                        checkOn: i.value === "on",
                        optSelected: h.selected,
                        deleteExpando: !0,
                        optDisabled: !1,
                        checkClone: !1,
                        noCloneEvent: !0,
                        noCloneChecked: !0,
                        boxModel: null,
                        inlineBlockNeedsLayout: !1,
                        shrinkWrapBlocks: !1,
                        reliableHiddenOffsets: !0,
                        reliableMarginRight: !0
                    }, i.checked = !0, d.support.noCloneChecked = i.cloneNode(!
                        0).checked, g.disabled = !0, d.support.optDisabled = !
                    h.disabled;
                var j = null;
                d.support.scriptEval = function() {
                    if (j === null) {
                        var b = c.documentElement,
                            e = c.createElement("script"),
                            f = "script" + d.now();
                        try {
                            e.appendChild(c.createTextNode("window." +
                                f + "=1;"))
                        } catch (g) {}
                        b.insertBefore(e, b.firstChild), a[f] ? (j = !0,
                            delete a[f]) : j = !1, b.removeChild(e)
                    }
                    return j
                };
                try {
                    delete b.test
                } catch (k) {
                    d.support.deleteExpando = !1
                }!b.addEventListener && b.attachEvent && b.fireEvent && (b.attachEvent(
                        "onclick",
                        function l() {
                            d.support.noCloneEvent = !1, b.detachEvent(
                                "onclick", l)
                        }), b.cloneNode(!0).fireEvent("onclick")), b = c.createElement(
                        "div"), b.innerHTML =
                    "<input type='radio' name='radiotest' checked='checked'/>";
                var m = c.createDocumentFragment();
                m.appendChild(b.firstChild), d.support.checkClone = m.cloneNode(!
                    0).cloneNode(!0).lastChild.checked, d(function() {
                    var a = c.createElement("div"),
                        b = c.getElementsByTagName("body")[0];
                    if (b) {
                        a.style.width = a.style.paddingLeft = "1px",
                            b.appendChild(a), d.boxModel = d.support
                            .boxModel = a.offsetWidth === 2, "zoom" in
                            a.style && (a.style.display = "inline",
                                a.style.zoom = 1, d.support.inlineBlockNeedsLayout =
                                a.offsetWidth === 2, a.style.display =
                                "", a.innerHTML =
                                "<div style='width:4px;'></div>", d
                                .support.shrinkWrapBlocks = a.offsetWidth !==
                                2), a.innerHTML =
                            "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
                        var e = a.getElementsByTagName("td");
                        d.support.reliableHiddenOffsets = e[0].offsetHeight ===
                            0, e[0].style.display = "", e[1].style.display =
                            "none", d.support.reliableHiddenOffsets =
                            d.support.reliableHiddenOffsets && e[0]
                            .offsetHeight === 0, a.innerHTML = "",
                            c.defaultView && c.defaultView.getComputedStyle &&
                            (a.style.width = "1px", a.style.marginRight =
                                "0", d.support.reliableMarginRight =
                                (parseInt((c.defaultView.getComputedStyle(
                                    a, null) || {
                                    marginRight: 0
                                }).marginRight, 10) || 0) === 0), b
                            .removeChild(a).style.display = "none",
                            a = e = null
                    }
                });
                var n = function(a) {
                    var b = c.createElement("div");
                    a = "on" + a;
                    if (!b.attachEvent) return !0;
                    var d = a in b;
                    d || (b.setAttribute(a, "return;"), d = typeof b[a] ===
                        "function");
                    return d
                };
                d.support.submitBubbles = n("submit"), d.support.changeBubbles =
                    n("change"), b = e = f = null
            }
        }();
    var g = /^(?:\{.*\}|\[.*\])$/;
    d.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (d.fn.jquery + Math.random()).replace(
            /\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando];
            return !!a && !i(a)
        },
        data: function(a, c, e, f) {
            if (d.acceptData(a)) {
                var g = d.expando,
                    h = typeof c === "string",
                    i, j = a.nodeType,
                    k = j ? d.cache : a,
                    l = j ? a[d.expando] : a[d.expando] && d.expando;
                if ((!l || f && l && !k[l][g]) && h && e === b)
                    return;
                l || (j ? a[d.expando] = l = ++d.uuid : l = d.expando),
                    k[l] || (k[l] = {}, j || (k[l].toJSON = d.noop));
                if (typeof c === "object" || typeof c ===
                    "function") f ? k[l][g] = d.extend(k[l][g],
                    c) : k[l] = d.extend(k[l], c);
                i = k[l], f && (i[g] || (i[g] = {}), i = i[g]),
                    e !== b && (i[c] = e);
                if (c === "events" && !i[c]) return i[g] && i[g]
                    .events;
                return h ? i[c] : i
            }
        },
        removeData: function(b, c, e) {
            if (d.acceptData(b)) {
                var f = d.expando,
                    g = b.nodeType,
                    h = g ? d.cache : b,
                    j = g ? b[d.expando] : d.expando;
                if (!h[j]) return;
                if (c) {
                    var k = e ? h[j][f] : h[j];
                    if (k) {
                        delete k[c];
                        if (!i(k)) return
                    }
                }
                if (e) {
                    delete h[j][f];
                    if (!i(h[j])) return
                }
                var l = h[j][f];
                d.support.deleteExpando || h != a ? delete h[j] :
                    h[j] = null, l ? (h[j] = {}, g || (h[j].toJSON =
                        d.noop), h[j][f] = l) : g && (d.support
                        .deleteExpando ? delete b[d.expando] :
                        b.removeAttribute ? b.removeAttribute(d
                            .expando) : b[d.expando] = null)
            }
        },
        _data: function(a, b, c) {
            return d.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = d.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute(
                    "classid") === b
            }
            return !0
        }
    }), d.fn.extend({
        data: function(a, c) {
            var e = null;
            if (typeof a === "undefined") {
                if (this.length) {
                    e = d.data(this[0]);
                    if (this[0].nodeType === 1) {
                        var f = this[0].attributes,
                            g;
                        for (var i = 0, j = f.length; i < j; i++)
                            g = f[i].name, g.indexOf("data-") ===
                            0 && (g = g.substr(5), h(this[0], g,
                                e[g]))
                    }
                }
                return e
            }
            if (typeof a === "object") return this.each(
                function() {
                    d.data(this, a)
                });
            var k = a.split(".");
            k[1] = k[1] ? "." + k[1] : "";
            if (c === b) {
                e = this.triggerHandler("getData" + k[1] + "!", [
                    k[0]
                ]), e === b && this.length && (e = d.data(
                    this[0], a), e = h(this[0], a, e));
                return e === b && k[1] ? this.data(k[0]) : e
            }
            return this.each(function() {
                var b = d(this),
                    e = [k[0], c];
                b.triggerHandler("setData" + k[1] + "!",
                    e), d.data(this, a, c), b.triggerHandler(
                    "changeData" + k[1] + "!", e)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                d.removeData(this, a)
            })
        }
    }), d.extend({
        queue: function(a, b, c) {
            if (a) {
                b = (b || "fx") + "queue";
                var e = d._data(a, b);
                if (!c) return e || [];
                !e || d.isArray(c) ? e = d._data(a, b, d.makeArray(
                    c)) : e.push(c);
                return e
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = d.queue(a, b),
                e = c.shift();
            e === "inprogress" && (e = c.shift()), e && (b ===
                "fx" && c.unshift("inprogress"), e.call(a,
                    function() {
                        d.dequeue(a, b)
                    })), c.length || d.removeData(a, b +
                "queue", !0)
        }
    }), d.fn.extend({
        queue: function(a, c) {
            typeof a !== "string" && (c = a, a = "fx");
            if (c === b) return d.queue(this[0], a);
            return this.each(function(b) {
                var e = d.queue(this, a, c);
                a === "fx" && e[0] !== "inprogress" &&
                    d.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                d.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = d.fx ? d.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function() {
                var c = this;
                setTimeout(function() {
                    d.dequeue(c, b)
                }, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        }
    });
    var j = /[\n\t\r]/g,
        k = /\s+/,
        l = /\r/g,
        m = /^(?:href|src|style)$/,
        n = /^(?:button|input)$/i,
        o = /^(?:button|input|object|select|textarea)$/i,
        p = /^a(?:rea)?$/i,
        q = /^(?:radio|checkbox)$/i;
    d.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    }, d.fn.extend({
        attr: function(a, b) {
            return d.access(this, a, b, !0, d.attr)
        },
        removeAttr: function(a, b) {
            return this.each(function() {
                d.attr(this, a, ""), this.nodeType ===
                    1 && this.removeAttribute(a)
            })
        },
        addClass: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c.addClass(a.call(this, b, c.attr(
                    "class")))
            });
            if (a && typeof a === "string") {
                var b = (a || "").split(k);
                for (var c = 0, e = this.length; c < e; c++) {
                    var f = this[c];
                    if (f.nodeType === 1)
                        if (f.className) {
                            var g = " " + f.className + " ",
                                h = f.className;
                            for (var i = 0, j = b.length; i < j; i++)
                                g.indexOf(" " + b[i] + " ") < 0 &&
                                (h += " " + b[i]);
                            f.className = d.trim(h)
                        } else f.className = a
                }
            }
            return this
        },
        removeClass: function(a) {
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c.removeClass(a.call(this, b, c.attr(
                    "class")))
            });
            if (a && typeof a === "string" || a === b) {
                var c = (a || "").split(k);
                for (var e = 0, f = this.length; e < f; e++) {
                    var g = this[e];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            var h = (" " + g.className + " ").replace(
                                j, " ");
                            for (var i = 0, l = c.length; i < l; i++)
                                h = h.replace(" " + c[i] + " ",
                                    " ");
                            g.className = d.trim(h)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
                e = typeof b === "boolean";
            if (d.isFunction(a)) return this.each(function(c) {
                var e = d(this);
                e.toggleClass(a.call(this, c, e.attr(
                    "class"), b), b)
            });
            return this.each(function() {
                if (c === "string") {
                    var f, g = 0,
                        h = d(this),
                        i = b,
                        j = a.split(k);
                    while (f = j[g++]) i = e ? i : !h.hasClass(
                        f), h[i ? "addClass" :
                        "removeClass"](f)
                } else if (c === "undefined" || c ===
                    "boolean") this.className && d._data(
                        this, "__className__", this.className
                    ), this.className = this.className ||
                    a === !1 ? "" : d._data(this,
                        "__className__") || ""
            })
        },
        hasClass: function(a) {
            var b = " " + a + " ";
            for (var c = 0, d = this.length; c < d; c++)
                if ((" " + this[c].className + " ").replace(j,
                        " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function(a) {
            if (!arguments.length) {
                var c = this[0];
                if (c) {
                    if (d.nodeName(c, "option")) {
                        var e = c.attributes.value;
                        return !e || e.specified ? c.value : c.text
                    }
                    if (d.nodeName(c, "select")) {
                        var f = c.selectedIndex,
                            g = [],
                            h = c.options,
                            i = c.type === "select-one";
                        if (f < 0) return null;
                        for (var j = i ? f : 0, k = i ? f + 1 :
                                h.length; j < k; j++) {
                            var m = h[j];
                            if (m.selected && (d.support.optDisabled ?
                                    !m.disabled : m.getAttribute(
                                        "disabled") === null) &&
                                (!m.parentNode.disabled || !d.nodeName(
                                    m.parentNode,
                                    "optgroup"))) {
                                a = d(m).val();
                                if (i) return a;
                                g.push(a)
                            }
                        }
                        if (i && !g.length && h.length) return d(
                            h[f]).val();
                        return g
                    }
                    if (q.test(c.type) && !d.support.checkOn)
                        return c.getAttribute("value") === null ?
                            "on" : c.value;
                    return (c.value || "").replace(l, "")
                }
                return b
            }
            var n = d.isFunction(a);
            return this.each(function(b) {
                var c = d(this),
                    e = a;
                if (this.nodeType === 1) {
                    n && (e = a.call(this, b, c.val())),
                        e == null ? e = "" : typeof e ===
                        "number" ? e += "" : d.isArray(
                            e) && (e = d.map(e,
                            function(a) {
                                return a == null ?
                                    "" : a + ""
                            }));
                    if (d.isArray(e) && q.test(this.type))
                        this.checked = d.inArray(c.val(),
                            e) >= 0;
                    else if (d.nodeName(this, "select")) {
                        var f = d.makeArray(e);
                        d("option", this).each(function() {
                            this.selected = d.inArray(
                                d(this).val(),
                                f) >= 0
                        }), f.length || (this.selectedIndex = -
                            1)
                    } else this.value = e
                }
            })
        }
    }), d.extend({
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, e, f) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || a
                .nodeType === 2) return b;
            if (f && c in d.attrFn) return d(a)[c](e);
            var g = a.nodeType !== 1 || !d.isXMLDoc(a),
                h = e !== b;
            c = g && d.props[c] || c;
            if (a.nodeType === 1) {
                var i = m.test(c);
                if (c === "selected" && !d.support.optSelected) {
                    var j = a.parentNode;
                    j && (j.selectedIndex, j.parentNode && j.parentNode
                        .selectedIndex)
                }
                if ((c in a || a[c] !== b) && g && !i) {
                    h && (c === "type" && n.test(a.nodeName) &&
                        a.parentNode && d.error(
                            "type property can't be changed"
                        ), e === null ? a.nodeType === 1 &&
                        a.removeAttribute(c) : a[c] = e);
                    if (d.nodeName(a, "form") && a.getAttributeNode(
                            c)) return a.getAttributeNode(c).nodeValue;
                    if (c === "tabIndex") {
                        var k = a.getAttributeNode("tabIndex");
                        return k && k.specified ? k.value : o.test(
                                a.nodeName) || p.test(a.nodeName) &&
                            a.href ? 0 : b
                    }
                    return a[c]
                }
                if (!d.support.style && g && c === "style") {
                    h && (a.style.cssText = "" + e);
                    return a.style.cssText
                }
                h && a.setAttribute(c, "" + e);
                if (!a.attributes[c] && (a.hasAttribute && !a.hasAttribute(
                        c))) return b;
                var l = !d.support.hrefNormalized && g && i ? a
                    .getAttribute(c, 2) : a.getAttribute(c);
                return l === null ? b : l
            }
            h && (a[c] = e);
            return a[c]
        }
    });
    var r = /\.(.*)$/,
        s = /^(?:textarea|input|select)$/i,
        t = /\./g,
        u = / /g,
        v = /[^\w\s.|`]/g,
        w = function(a) {
            return a.replace(v, "\\$&")
        };
    d.event = {
        add: function(c, e, f, g) {
            if (c.nodeType !== 3 && c.nodeType !== 8) {
                try {
                    d.isWindow(c) && (c !== a && !c.frameElement) &&
                        (c = a)
                } catch (h) {}
                if (f === !1) f = x;
                else if (!f) return;
                var i, j;
                f.handler && (i = f, f = i.handler), f.guid || (f.guid =
                    d.guid++);
                var k = d._data(c);
                if (!k) return;
                var l = k.events,
                    m = k.handle;
                l || (k.events = l = {}), m || (k.handle = m =
                    function(a) {
                        return typeof d !== "undefined" && d.event
                            .triggered !== a.type ? d.event.handle
                            .apply(m.elem, arguments) : b
                    }), m.elem = c, e = e.split(" ");
                var n, o = 0,
                    p;
                while (n = e[o++]) {
                    j = i ? d.extend({}, i) : {
                        handler: f,
                        data: g
                    }, n.indexOf(".") > -1 ? (p = n.split("."),
                        n = p.shift(), j.namespace = p.slice(0)
                        .sort().join(".")) : (p = [], j.namespace =
                        ""), j.type = n, j.guid || (j.guid = f.guid);
                    var q = l[n],
                        r = d.event.special[n] || {};
                    if (!q) {
                        q = l[n] = [];
                        if (!r.setup || r.setup.call(c, g, p, m) ===
                            !1) c.addEventListener ? c.addEventListener(
                            n, m, !1) : c.attachEvent && c.attachEvent(
                            "on" + n, m)
                    }
                    r.add && (r.add.call(c, j), j.handler.guid || (
                            j.handler.guid = f.guid)), q.push(j), d
                        .event.global[n] = !0
                }
                c = null
            }
        },
        global: {},
        remove: function(a, c, e, f) {
            if (a.nodeType !== 3 && a.nodeType !== 8) {
                e === !1 && (e = x);
                var g, h, i, j, k = 0,
                    l, m, n, o, p, q, r, s = d.hasData(a) && d._data(
                        a),
                    t = s && s.events;
                if (!s || !t) return;
                c && c.type && (e = c.handler, c = c.type);
                if (!c || typeof c === "string" && c.charAt(0) ===
                    ".") {
                    c = c || "";
                    for (h in t) d.event.remove(a, h + c);
                    return
                }
                c = c.split(" ");
                while (h = c[k++]) {
                    r = h, q = null, l = h.indexOf(".") < 0, m = [],
                        l || (m = h.split("."), h = m.shift(), n =
                            new RegExp("(^|\\.)" + d.map(m.slice(0)
                                .sort(), w).join(
                                "\\.(?:.*\\.)?") + "(\\.|$)")), p =
                        t[h];
                    if (!p) continue;
                    if (!e) {
                        for (j = 0; j < p.length; j++) {
                            q = p[j];
                            if (l || n.test(q.namespace)) d.event.remove(
                                a, r, q.handler, j), p.splice(j--,
                                1)
                        }
                        continue
                    }
                    o = d.event.special[h] || {};
                    for (j = f || 0; j < p.length; j++) {
                        q = p[j];
                        if (e.guid === q.guid) {
                            if (l || n.test(q.namespace)) f == null &&
                                p.splice(j--, 1), o.remove && o.remove
                                .call(a, q);
                            if (f != null) break
                        }
                    }
                    if (p.length === 0 || f != null && p.length ===
                        1)(!o.teardown || o.teardown.call(a, m) ===
                            !1) && d.removeEvent(a, h, s.handle), g =
                        null, delete t[h]
                }
                if (d.isEmptyObject(t)) {
                    var u = s.handle;
                    u && (u.elem = null), delete s.events, delete s
                        .handle, d.isEmptyObject(s) && d.removeData(
                            a, b, !0)
                }
            }
        },
        trigger: function(a, c, e) {
            var f = a.type || a,
                g = arguments[3];
            if (!g) {
                a = typeof a === "object" ? a[d.expando] ? a : d.extend(
                        d.Event(f), a) : d.Event(f), f.indexOf("!") >=
                    0 && (a.type = f = f.slice(0, -1), a.exclusive = !
                        0), e || (a.stopPropagation(), d.event.global[
                        f] && d.each(d.cache, function() {
                        var b = d.expando,
                            e = this[b];
                        e && e.events && e.events[f] && d.event
                            .trigger(a, c, e.handle.elem)
                    }));
                if (!e || e.nodeType === 3 || e.nodeType === 8)
                    return b;
                a.result = b, a.target = e, c = d.makeArray(c), c.unshift(
                    a)
            }
            a.currentTarget = e;
            var h = d._data(e, "handle");
            h && h.apply(e, c);
            var i = e.parentNode || e.ownerDocument;
            try {
                e && e.nodeName && d.noData[e.nodeName.toLowerCase()] ||
                    e["on" + f] && e["on" + f].apply(e, c) === !1 &&
                    (a.result = !1, a.preventDefault())
            } catch (j) {}
            if (!a.isPropagationStopped() && i) d.event.trigger(a,
                c, i, !0);
            else if (!a.isDefaultPrevented()) {
                var k, l = a.target,
                    m = f.replace(r, ""),
                    n = d.nodeName(l, "a") && m === "click",
                    o = d.event.special[m] || {};
                if ((!o._default || o._default.call(e, a) === !1) &&
                    !n && !(l && l.nodeName && d.noData[l.nodeName.toLowerCase()])
                ) {
                    try {
                        l[m] && (k = l["on" + m], k && (l["on" + m] =
                                null), d.event.triggered = a.type,
                            l[m]())
                    } catch (p) {}
                    k && (l["on" + m] = k), d.event.triggered = b
                }
            }
        },
        handle: function(c) {
            var e, f, g, h, i, j = [],
                k = d.makeArray(arguments);
            c = k[0] = d.event.fix(c || a.event), c.currentTarget =
                this, e = c.type.indexOf(".") < 0 && !c.exclusive,
                e || (g = c.type.split("."), c.type = g.shift(), j =
                    g.slice(0).sort(), h = new RegExp("(^|\\.)" + j
                        .join("\\.(?:.*\\.)?") + "(\\.|$)")), c.namespace =
                c.namespace || j.join("."), i = d._data(this,
                    "events"), f = (i || {})[c.type];
            if (i && f) {
                f = f.slice(0);
                for (var l = 0, m = f.length; l < m; l++) {
                    var n = f[l];
                    if (e || h.test(n.namespace)) {
                        c.handler = n.handler, c.data = n.data, c.handleObj =
                            n;
                        var o = n.handler.apply(this, k);
                        o !== b && (c.result = o, o === !1 && (c.preventDefault(),
                            c.stopPropagation()));
                        if (c.isImmediatePropagationStopped()) break
                    }
                }
            }
            return c.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which"
            .split(" "),
        fix: function(a) {
            if (a[d.expando]) return a;
            var e = a;
            a = d.Event(e);
            for (var f = this.props.length, g; f;) g = this.props[--
                f], a[g] = e[g];
            a.target || (a.target = a.srcElement || c), a.target.nodeType ===
                3 && (a.target = a.target.parentNode), !a.relatedTarget &&
                a.fromElement && (a.relatedTarget = a.fromElement ===
                    a.target ? a.toElement : a.fromElement);
            if (a.pageX == null && a.clientX != null) {
                var h = c.documentElement,
                    i = c.body;
                a.pageX = a.clientX + (h && h.scrollLeft || i && i.scrollLeft ||
                    0) - (h && h.clientLeft || i && i.clientLeft ||
                    0), a.pageY = a.clientY + (h && h.scrollTop ||
                    i && i.scrollTop || 0) - (h && h.clientTop ||
                    i && i.clientTop || 0)
            }
            a.which == null && (a.charCode != null || a.keyCode !=
                null) && (a.which = a.charCode != null ? a.charCode :
                a.keyCode), !a.metaKey && a.ctrlKey && (a.metaKey =
                a.ctrlKey), !a.which && a.button !== b && (a.which =
                a.button & 1 ? 1 : a.button & 2 ? 3 : a.button &
                4 ? 2 : 0);
            return a
        },
        guid: 1e8,
        proxy: d.proxy,
        special: {
            ready: {
                setup: d.bindReady,
                teardown: d.noop
            },
            live: {
                add: function(a) {
                    d.event.add(this, H(a.origType, a.selector), d.extend({},
                        a, {
                            handler: G,
                            guid: a.handler.guid
                        }))
                },
                remove: function(a) {
                    d.event.remove(this, H(a.origType, a.selector),
                        a)
                }
            },
            beforeunload: {
                setup: function(a, b, c) {
                    d.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload =
                        null)
                }
            }
        }
    }, d.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, d.Event = function(a) {
        if (!this.preventDefault) return new d.Event(a);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this
                .isDefaultPrevented = a.defaultPrevented || a.returnValue ===
                !1 || a.getPreventDefault && a.getPreventDefault() ? y :
                x) : this.type = a, this.timeStamp = d.now(), this[d.expando] = !
            0
    }, d.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = y;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !
                1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = y;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !
                0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = y, this.stopPropagation()
        },
        isDefaultPrevented: x,
        isPropagationStopped: x,
        isImmediatePropagationStopped: x
    };
    var z = function(a) {
            var b = a.relatedTarget;
            try {
                if (b && b !== c && !b.parentNode) return;
                while (b && b !== this) b = b.parentNode;
                b !== this && (a.type = a.data, d.event.handle.apply(this,
                    arguments))
            } catch (e) {}
        },
        A = function(a) {
            a.type = a.data, d.event.handle.apply(this, arguments)
        };
    d.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        d.event.special[a] = {
            setup: function(c) {
                d.event.add(this, b, c && c.selector ? A :
                    z, a)
            },
            teardown: function(a) {
                d.event.remove(this, b, a && a.selector ? A :
                    z)
            }
        }
    }), d.support.submitBubbles || (d.event.special.submit = {
        setup: function(a, b) {
            if (this.nodeName && this.nodeName.toLowerCase() !==
                "form") d.event.add(this, "click.specialSubmit",
                function(a) {
                    var b = a.target,
                        c = b.type;
                    (c === "submit" || c === "image") && d(
                        b).closest("form").length && E(
                        "submit", this, arguments)
                }), d.event.add(this,
                "keypress.specialSubmit",
                function(a) {
                    var b = a.target,
                        c = b.type;
                    (c === "text" || c === "password") && d
                        (b).closest("form").length && a.keyCode ===
                        13 && E("submit", this, arguments)
                });
            else return !1
        },
        teardown: function(a) {
            d.event.remove(this, ".specialSubmit")
        }
    });
    if (!d.support.changeBubbles) {
        var B, C = function(a) {
                var b = a.type,
                    c = a.value;
                b === "radio" || b === "checkbox" ? c = a.checked : b ===
                    "select-multiple" ? c = a.selectedIndex > -1 ? d.map(a.options,
                        function(a) {
                            return a.selected
                        }).join("-") : "" : a.nodeName.toLowerCase() ===
                    "select" && (c = a.selectedIndex);
                return c
            },
            D = function D(a) {
                var c = a.target,
                    e, f;
                if (s.test(c.nodeName) && !c.readOnly) {
                    e = d._data(c, "_change_data"), f = C(c), (a.type !==
                        "focusout" || c.type !== "radio") && d._data(c,
                        "_change_data", f);
                    if (e === b || f === e) return;
                    if (e != null || f) a.type = "change", a.liveFired = b,
                        d.event.trigger(a, arguments[1], c)
                }
            };
        d.event.special.change = {
            filters: {
                focusout: D,
                beforedeactivate: D,
                click: function(a) {
                    var b = a.target,
                        c = b.type;
                    (c === "radio" || c === "checkbox" || b.nodeName
                        .toLowerCase() === "select") && D.call(this,
                        a)
                },
                keydown: function(a) {
                    var b = a.target,
                        c = b.type;
                    (a.keyCode === 13 && b.nodeName.toLowerCase() !==
                        "textarea" || a.keyCode === 32 && (c ===
                            "checkbox" || c === "radio") || c ===
                        "select-multiple") && D.call(this, a)
                },
                beforeactivate: function(a) {
                    var b = a.target;
                    d._data(b, "_change_data", C(b))
                }
            },
            setup: function(a, b) {
                if (this.type === "file") return !1;
                for (var c in B) d.event.add(this, c +
                    ".specialChange", B[c]);
                return s.test(this.nodeName)
            },
            teardown: function(a) {
                d.event.remove(this, ".specialChange");
                return s.test(this.nodeName)
            }
        }, B = d.event.special.change.filters, B.focus = B.beforeactivate
    }
    c.addEventListener && d.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        function f(a) {
            var c = d.event.fix(a);
            c.type = b, c.originalEvent = {}, d.event.trigger(c,
                null, c.target), c.isDefaultPrevented() && a.preventDefault()
        }
        var e = 0;
        d.event.special[b] = {
            setup: function() {
                e++ === 0 && c.addEventListener(a, f, !0)
            },
            teardown: function() {
                --e === 0 && c.removeEventListener(a, f, !0)
            }
        }
    }), d.each(["bind", "one"], function(a, c) {
        d.fn[c] = function(a, e, f) {
            if (typeof a === "object") {
                for (var g in a) this[c](g, e, a[g], f);
                return this
            }
            if (d.isFunction(e) || e === !1) f = e, e = b;
            var h = c === "one" ? d.proxy(f, function(a) {
                d(this).unbind(a, h);
                return f.apply(this, arguments)
            }) : f;
            if (a === "unload" && c !== "one") this.one(a, e, f);
            else
                for (var i = 0, j = this.length; i < j; i++) d.event
                    .add(this[i], a, h, e);
            return this
        }
    }), d.fn.extend({
        unbind: function(a, b) {
            if (typeof a !== "object" || a.preventDefault)
                for (var e = 0, f = this.length; e < f; e++) d.event
                    .remove(this[e], a, b);
            else
                for (var c in a) this.unbind(c, a[c]);
            return this
        },
        delegate: function(a, b, c, d) {
            return this.live(b, c, d, a)
        },
        undelegate: function(a, b, c) {
            return arguments.length === 0 ? this.unbind("live") :
                this.die(b, null, c, a)
        },
        trigger: function(a, b) {
            return this.each(function() {
                d.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                var c = d.Event(a);
                c.preventDefault(), c.stopPropagation(), d.event
                    .trigger(c, b, this[0]);
                return c.result
            }
        },
        toggle: function(a) {
            var b = arguments,
                c = 1;
            while (c < b.length) d.proxy(a, b[c++]);
            return this.click(d.proxy(a, function(e) {
                var f = (d._data(this, "lastToggle" +
                    a.guid) || 0) % c;
                d._data(this, "lastToggle" + a.guid,
                    f + 1), e.preventDefault();
                return b[f].apply(this, arguments) ||
                    !1
            }))
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var F = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    d.each(["live", "die"], function(a, c) {
            d.fn[c] = function(a, e, f, g) {
                var h, i = 0,
                    j, k, l, m = g || this.selector,
                    n = g ? this : d(this.context);
                if (typeof a === "object" && !a.preventDefault) {
                    for (var o in a) n[c](o, e, a[o], m);
                    return this
                }
                d.isFunction(e) && (f = e, e = b), a = (a || "").split(
                    " ");
                while ((h = a[i++]) != null) {
                    j = r.exec(h), k = "", j && (k = j[0], h = h.replace(
                        r, ""));
                    if (h === "hover") {
                        a.push("mouseenter" + k, "mouseleave" + k);
                        continue
                    }
                    l = h, h === "focus" || h === "blur" ? (a.push(
                            F[h] + k), h = h + k) : h = (F[h] || h) +
                        k;
                    if (c === "live")
                        for (var p = 0, q = n.length; p < q; p++) d
                            .event.add(n[p], "live." + H(h, m), {
                                data: e,
                                selector: m,
                                handler: f,
                                origType: h,
                                origHandler: f,
                                preType: l
                            });
                    else n.unbind("live." + H(h, m), f)
                }
                return this
            }
        }), d.each(
            "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error"
            .split(" "),
            function(a, b) {
                d.fn[b] = function(a, c) {
                    c == null && (c = a, a = null);
                    return arguments.length > 0 ? this.bind(b, a, c) :
                        this.trigger(b)
                }, d.attrFn && (d.attrFn[b] = !0)
            }),
        function() {
            function u(a, b, c, d, e, f) {
                for (var g = 0, h = d.length; g < h; g++) {
                    var i = d[g];
                    if (i) {
                        var j = !1;
                        i = i[a];
                        while (i) {
                            if (i.sizcache === c) {
                                j = d[i.sizset];
                                break
                            }
                            if (i.nodeType === 1) {
                                f || (i.sizcache = c, i.sizset = g);
                                if (typeof b !== "string") {
                                    if (i === b) {
                                        j = !0;
                                        break
                                    }
                                } else if (k.filter(b, [i]).length > 0) {
                                    j = i;
                                    break
                                }
                            }
                            i = i[a]
                        }
                        d[g] = j
                    }
                }
            }

            function t(a, b, c, d, e, f) {
                for (var g = 0, h = d.length; g < h; g++) {
                    var i = d[g];
                    if (i) {
                        var j = !1;
                        i = i[a];
                        while (i) {
                            if (i.sizcache === c) {
                                j = d[i.sizset];
                                break
                            }
                            i.nodeType === 1 && !f && (i.sizcache = c, i.sizset =
                                g);
                            if (i.nodeName.toLowerCase() === b) {
                                j = i;
                                break
                            }
                            i = i[a]
                        }
                        d[g] = j
                    }
                }
            }
            var a =
                /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                e = 0,
                f = Object.prototype.toString,
                g = !1,
                h = !0,
                i = /\\/g,
                j = /\W/;
            [0, 0].sort(function() {
                h = !1;
                return 0
            });
            var k = function(b, d, e, g) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b !== "string") return e;
                var i, j, n, o, q, r, s, t, u = !0,
                    w = k.isXML(d),
                    x = [],
                    y = b;
                do {
                    a.exec(""), i = a.exec(y);
                    if (i) {
                        y = i[3], x.push(i[1]);
                        if (i[2]) {
                            o = i[3];
                            break
                        }
                    }
                } while (i);
                if (x.length > 1 && m.exec(b))
                    if (x.length === 2 && l.relative[x[0]]) j = v(x[0] +
                        x[1], d);
                    else {
                        j = l.relative[x[0]] ? [d] : k(x.shift(), d);
                        while (x.length) b = x.shift(), l.relative[b] &&
                            (b += x.shift()), j = v(b, j)
                    } else {
                    !g && x.length > 1 && d.nodeType === 9 && !w && l.match
                        .ID.test(x[0]) && !l.match.ID.test(x[x.length -
                            1]) && (q = k.find(x.shift(), d, w), d = q.expr ?
                            k.filter(q.expr, q.set)[0] : q.set[0]);
                    if (d) {
                        q = g ? {
                                expr: x.pop(),
                                set: p(g)
                            } : k.find(x.pop(), x.length === 1 && (x[0] ===
                                    "~" || x[0] === "+") && d.parentNode ?
                                d.parentNode : d, w), j = q.expr ? k.filter(
                                q.expr, q.set) : q.set, x.length > 0 ?
                            n = p(j) : u = !1;
                        while (x.length) r = x.pop(), s = r, l.relative[
                                r] ? s = x.pop() : r = "", s == null &&
                            (s = d), l.relative[r](n, s, w)
                    } else n = x = []
                }
                n || (n = j), n || k.error(r || b);
                if (f.call(n) === "[object Array]")
                    if (u)
                        if (d && d.nodeType === 1)
                            for (t = 0; n[t] != null; t++) n[t] && (n[t] ===
                                !0 || n[t].nodeType === 1 && k.contains(
                                    d, n[t])) && e.push(j[t]);
                        else
                            for (t = 0; n[t] != null; t++) n[t] && n[t]
                                .nodeType === 1 && e.push(j[t]);
                else e.push.apply(e, n);
                else p(n, e);
                o && (k(o, h, e, g), k.uniqueSort(e));
                return e
            };
            k.uniqueSort = function(a) {
                if (r) {
                    g = h, a.sort(r);
                    if (g)
                        for (var b = 1; b < a.length; b++) a[b] === a[b -
                            1] && a.splice(b--, 1)
                }
                return a
            }, k.matches = function(a, b) {
                return k(a, null, null, b)
            }, k.matchesSelector = function(a, b) {
                return k(b, null, null, [a]).length > 0
            }, k.find = function(a, b, c) {
                var d;
                if (!a) return [];
                for (var e = 0, f = l.order.length; e < f; e++) {
                    var g, h = l.order[e];
                    if (g = l.leftMatch[h].exec(a)) {
                        var j = g[1];
                        g.splice(1, 1);
                        if (j.substr(j.length - 1) !== "\\") {
                            g[1] = (g[1] || "").replace(i, ""), d = l.find[
                                h](g, b, c);
                            if (d != null) {
                                a = a.replace(l.match[h], "");
                                break
                            }
                        }
                    }
                }
                d || (d = typeof b.getElementsByTagName !== "undefined" ?
                    b.getElementsByTagName("*") : []);
                return {
                    set: d,
                    expr: a
                }
            }, k.filter = function(a, c, d, e) {
                var f, g, h = a,
                    i = [],
                    j = c,
                    m = c && c[0] && k.isXML(c[0]);
                while (a && c.length) {
                    for (var n in l.filter)
                        if ((f = l.leftMatch[n].exec(a)) != null && f[2]) {
                            var o, p, q = l.filter[n],
                                r = f[1];
                            g = !1, f.splice(1, 1);
                            if (r.substr(r.length - 1) === "\\")
                                continue;
                            j === i && (i = []);
                            if (l.preFilter[n]) {
                                f = l.preFilter[n](f, j, d, i, e, m);
                                if (f) {
                                    if (f === !0) continue
                                } else g = o = !0
                            }
                            if (f)
                                for (var s = 0;
                                    (p = j[s]) != null; s++)
                                    if (p) {
                                        o = q(p, f, s, j);
                                        var t = e ^ !!o;
                                        d && o != null ? t ? g = !0 : j[
                                            s] = !1 : t && (i.push(
                                            p), g = !0)
                                    }
                            if (o !== b) {
                                d || (j = i), a = a.replace(l.match[n],
                                    "");
                                if (!g) return [];
                                break
                            }
                        }
                    if (a === h)
                        if (g == null) k.error(a);
                        else break;
                    h = a
                }
                return j
            }, k.error = function(a) {
                throw "Syntax error, unrecognized expression: " + a
            };
            var l = k.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function(a) {
                            return a.getAttribute("href")
                        },
                        type: function(a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function(a, b) {
                            var c = typeof b === "string",
                                d = c && !j.test(b),
                                e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++)
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h
                                        .nodeType !== 1) {}
                                    a[f] = e || h && h.nodeName.toLowerCase() ===
                                        b ? h || !1 : h === b
                                }
                            e && k.filter(b, a, !0)
                        },
                        ">": function(a, b) {
                            var c, d = typeof b === "string",
                                e = 0,
                                f = a.length;
                            if (d && !j.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() ===
                                            b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++) c = a[e], c && (a[e] =
                                    d ? c.parentNode : c.parentNode ===
                                    b);
                                d && k.filter(b, a, !0)
                            }
                        },
                        "": function(a, b, c) {
                            var d, f = e++,
                                g = u;
                            typeof b === "string" && !j.test(b) && (b =
                                b.toLowerCase(), d = b, g = t), g(
                                "parentNode", b, f, a, d, c)
                        },
                        "~": function(a, b, c) {
                            var d, f = e++,
                                g = u;
                            typeof b === "string" && !j.test(b) && (b =
                                b.toLowerCase(), d = b, g = t), g(
                                "previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function(a, b, c) {
                            if (typeof b.getElementById !== "undefined" &&
                                !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function(a, b) {
                            if (typeof b.getElementsByName !==
                                "undefined") {
                                var c = [],
                                    d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++)
                                    d[e].getAttribute("name") === a[1] &&
                                    c.push(d[e]);
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function(a, b) {
                            if (typeof b.getElementsByTagName !==
                                "undefined") return b.getElementsByTagName(
                                a[1])
                        }
                    },
                    preFilter: {
                        CLASS: function(a, b, c, d, e, f) {
                            a = " " + a[1].replace(i, "") + " ";
                            if (f) return a;
                            for (var g = 0, h;
                                (h = b[g]) != null; g++) h && (e ^ (h.className &&
                                (" " + h.className + " ").replace(
                                    /[\t\n\r]/g, " ").indexOf(a) >=
                                0) ? c || d.push(h) : c && (b[g] = !
                                1));
                            return !1
                        },
                        ID: function(a) {
                            return a[1].replace(i, "")
                        },
                        TAG: function(a, b) {
                            return a[1].replace(i, "").toLowerCase()
                        },
                        CHILD: function(a) {
                            if (a[1] === "nth") {
                                a[2] || k.error(a[0]), a[2] = a[2].replace(
                                    /^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
                                    a[2] === "even" && "2n" || a[2] ===
                                    "odd" && "2n+1" || !/\D/.test(a[
                                        2]) && "0n+" + a[2] || a[2]
                                );
                                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[
                                    3] - 0
                            } else a[2] && k.error(a[0]);
                            a[0] = e++;
                            return a
                        },
                        ATTR: function(a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(i, "");
                            !f && l.attrMap[g] && (a[1] = l.attrMap[g]),
                                a[4] = (a[4] || a[5] || "").replace(i,
                                    ""), a[2] === "~=" && (a[4] = " " +
                                    a[4] + " ");
                            return a
                        },
                        PSEUDO: function(b, c, d, e, f) {
                            if (b[1] === "not")
                                if ((a.exec(b[3]) || "").length > 1 ||
                                    /^\w/.test(b[3])) b[3] = k(b[3],
                                    null, null, c);
                                else {
                                    var g = k.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                } else if (l.match.POS.test(b[0]) || l.match
                                .CHILD.test(b[0])) return !0;
                            return b
                        },
                        POS: function(a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function(a) {
                            return a.disabled === !1 && a.type !==
                                "hidden"
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            return a.checked === !0
                        },
                        selected: function(a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function(a) {
                            return !!a.firstChild
                        },
                        empty: function(a) {
                            return !a.firstChild
                        },
                        has: function(a, b, c) {
                            return !!k(c[3], a).length
                        },
                        header: function(a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function(a) {
                            var b = a.getAttribute("type"),
                                c = a.type;
                            return "text" === c && (b === c || b ===
                                null)
                        },
                        radio: function(a) {
                            return "radio" === a.type
                        },
                        checkbox: function(a) {
                            return "checkbox" === a.type
                        },
                        file: function(a) {
                            return "file" === a.type
                        },
                        password: function(a) {
                            return "password" === a.type
                        },
                        submit: function(a) {
                            return "submit" === a.type
                        },
                        image: function(a) {
                            return "image" === a.type
                        },
                        reset: function(a) {
                            return "reset" === a.type
                        },
                        button: function(a) {
                            return "button" === a.type || a.nodeName.toLowerCase() ===
                                "button"
                        },
                        input: function(a) {
                            return /input|select|textarea|button/i.test(
                                a.nodeName)
                        }
                    },
                    setFilters: {
                        first: function(a, b) {
                            return b === 0
                        },
                        last: function(a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function(a, b) {
                            return b % 2 === 0
                        },
                        odd: function(a, b) {
                            return b % 2 === 1
                        },
                        lt: function(a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function(a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function(a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function(a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function(a, b, c, d) {
                            var e = b[1],
                                f = l.filters[e];
                            if (f) return f(a, c, b, d);
                            if (e === "contains") return (a.textContent ||
                                a.innerText || k.getText([a]) ||
                                "").indexOf(b[3]) >= 0;
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++)
                                    if (g[h] === a) return !1;
                                return !0
                            }
                            k.error(e)
                        },
                        CHILD: function(a, b) {
                            var c = b[1],
                                d = a;
                            switch (c) {
                                case "only":
                                case "first":
                                    while (d = d.previousSibling)
                                        if (d.nodeType === 1) return !1;
                                    if (c === "first") return !0;
                                    d = a;
                                case "last":
                                    while (d = d.nextSibling)
                                        if (d.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    var e = b[2],
                                        f = b[3];
                                    if (e === 1 && f === 0) return !0;
                                    var g = b[0],
                                        h = a.parentNode;
                                    if (h && (h.sizcache !== g || !a.nodeIndex)) {
                                        var i = 0;
                                        for (d = h.firstChild; d; d = d
                                            .nextSibling) d.nodeType ===
                                            1 && (d.nodeIndex = ++i);
                                        h.sizcache = g
                                    }
                                    var j = a.nodeIndex - f;
                                    return e === 0 ? j === 0 : j % e ===
                                        0 && j / e >= 0
                            }
                        },
                        ID: function(a, b) {
                            return a.nodeType === 1 && a.getAttribute(
                                "id") === b
                        },
                        TAG: function(a, b) {
                            return b === "*" && a.nodeType === 1 || a.nodeName
                                .toLowerCase() === b
                        },
                        CLASS: function(a, b) {
                            return (" " + (a.className || a.getAttribute(
                                "class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function(a, b) {
                            var c = b[1],
                                d = l.attrHandle[c] ? l.attrHandle[c](a) :
                                a[c] != null ? a[c] : a.getAttribute(c),
                                e = d + "",
                                f = b[2],
                                g = b[4];
                            return d == null ? f === "!=" : f === "=" ?
                                e === g : f === "*=" ? e.indexOf(g) >=
                                0 : f === "~=" ? (" " + e + " ").indexOf(
                                    g) >= 0 : g ? f === "!=" ? e !== g :
                                f === "^=" ? e.indexOf(g) === 0 : f ===
                                "$=" ? e.substr(e.length - g.length) ===
                                g : f === "|=" ? e === g || e.substr(0,
                                    g.length + 1) === g + "-" : !1 : e &&
                                d !== !1
                        },
                        POS: function(a, b, c, d) {
                            var e = b[2],
                                f = l.setFilters[e];
                            if (f) return f(a, c, b, d)
                        }
                    }
                },
                m = l.match.POS,
                n = function(a, b) {
                    return "\\" + (b - 0 + 1)
                };
            for (var o in l.match) l.match[o] = new RegExp(l.match[o].source +
                    /(?![^\[]*\])(?![^\(]*\))/.source), l.leftMatch[o] =
                new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[o].source.replace(
                    /\\(\d+)/g, n));
            var p = function(a, b) {
                a = Array.prototype.slice.call(a, 0);
                if (b) {
                    b.push.apply(b, a);
                    return b
                }
                return a
            };
            try {
                Array.prototype.slice.call(c.documentElement.childNodes, 0)[
                    0].nodeType
            } catch (q) {
                p = function(a, b) {
                    var c = 0,
                        d = b || [];
                    if (f.call(a) === "[object Array]") Array.prototype
                        .push.apply(d, a);
                    else if (typeof a.length === "number")
                        for (var e = a.length; c < e; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
            }
            var r, s;
            c.documentElement.compareDocumentPosition ? r = function(a, b) {
                    if (a === b) {
                        g = !0;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition)
                        return a.compareDocumentPosition ? -1 : 1;
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                } : (r = function(a, b) {
                    var c, d, e = [],
                        f = [],
                        h = a.parentNode,
                        i = b.parentNode,
                        j = h;
                    if (a === b) {
                        g = !0;
                        return 0
                    }
                    if (h === i) return s(a, b);
                    if (!h) return -1;
                    if (!i) return 1;
                    while (j) e.unshift(j), j = j.parentNode;
                    j = i;
                    while (j) f.unshift(j), j = j.parentNode;
                    c = e.length, d = f.length;
                    for (var k = 0; k < c && k < d; k++)
                        if (e[k] !== f[k]) return s(e[k], f[k]);
                    return k === c ? s(a, f[k], -1) : s(e[k], b, 1)
                }, s = function(a, b, c) {
                    if (a === b) return c;
                    var d = a.nextSibling;
                    while (d) {
                        if (d === b) return -1;
                        d = d.nextSibling
                    }
                    return 1
                }), k.getText = function(a) {
                    var b = "",
                        c;
                    for (var d = 0; a[d]; d++) c = a[d], c.nodeType === 3 ||
                        c.nodeType === 4 ? b += c.nodeValue : c.nodeType !==
                        8 && (b += k.getText(c.childNodes));
                    return b
                },
                function() {
                    var a = c.createElement("div"),
                        d = "script" + (new Date).getTime(),
                        e = c.documentElement;
                    a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a,
                        e.firstChild), c.getElementById(d) && (l.find.ID =
                        function(a, c, d) {
                            if (typeof c.getElementById !== "undefined" &&
                                !d) {
                                var e = c.getElementById(a[1]);
                                return e ? e.id === a[1] || typeof e.getAttributeNode !==
                                    "undefined" && e.getAttributeNode(
                                        "id").nodeValue === a[1] ? [e] :
                                    b : []
                            }
                        }, l.filter.ID = function(a, b) {
                            var c = typeof a.getAttributeNode !==
                                "undefined" && a.getAttributeNode("id");
                            return a.nodeType === 1 && c && c.nodeValue ===
                                b
                        }), e.removeChild(a), e = a = null
                }(),
                function() {
                    var a = c.createElement("div");
                    a.appendChild(c.createComment("")), a.getElementsByTagName(
                            "*").length > 0 && (l.find.TAG = function(a, b) {
                            var c = b.getElementsByTagName(a[1]);
                            if (a[1] === "*") {
                                var d = [];
                                for (var e = 0; c[e]; e++) c[e].nodeType ===
                                    1 && d.push(c[e]);
                                c = d
                            }
                            return c
                        }), a.innerHTML = "<a href='#'></a>", a.firstChild &&
                        typeof a.firstChild.getAttribute !== "undefined" &&
                        a.firstChild.getAttribute("href") !== "#" && (l.attrHandle
                            .href = function(a) {
                                return a.getAttribute("href", 2)
                            }), a = null
                }(), c.querySelectorAll && function() {
                    var a = k,
                        b = c.createElement("div"),
                        d = "__sizzle__";
                    b.innerHTML = "<p class='TEST'></p>";
                    if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !==
                        0) {
                        k = function(b, e, f, g) {
                            e = e || c;
                            if (!g && !k.isXML(e)) {
                                var h =
                                    /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/
                                    .exec(b);
                                if (h && (e.nodeType === 1 || e.nodeType ===
                                        9)) {
                                    if (h[1]) return p(e.getElementsByTagName(
                                        b), f);
                                    if (h[2] && l.find.CLASS && e.getElementsByClassName)
                                        return p(e.getElementsByClassName(
                                            h[2]), f)
                                }
                                if (e.nodeType === 9) {
                                    if (b === "body" && e.body) return p(
                                        [e.body], f);
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode) return
                                        p([], f);
                                        if (i.id === h[3]) return p([i],
                                            f)
                                    }
                                    try {
                                        return p(e.querySelectorAll(b),
                                            f)
                                    } catch (j) {}
                                } else if (e.nodeType === 1 && e.nodeName
                                    .toLowerCase() !== "object") {
                                    var m = e,
                                        n = e.getAttribute("id"),
                                        o = n || d,
                                        q = e.parentNode,
                                        r = /^\s*[+~]/.test(b);
                                    n ? o = o.replace(/'/g, "\\$&") : e
                                        .setAttribute("id", o), r && q &&
                                        (e = e.parentNode);
                                    try {
                                        if (!r || q) return p(e.querySelectorAll(
                                            "[id='" + o +
                                            "'] " + b), f)
                                    } catch (s) {} finally {
                                        n || m.removeAttribute("id")
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        };
                        for (var e in a) k[e] = a[e];
                        b = null
                    }
                }(),
                function() {
                    var a = c.documentElement,
                        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector ||
                        a.msMatchesSelector;
                    if (b) {
                        var d = !b.call(c.createElement("div"), "div"),
                            e = !1;
                        try {
                            b.call(c.documentElement, "[test!='']:sizzle")
                        } catch (f) {
                            e = !0
                        }
                        k.matchesSelector = function(a, c) {
                            c = c.replace(/\=\s*([^'"\]]*)\s*\]/g,
                                "='$1']");
                            if (!k.isXML(a)) try {
                                if (e || !l.match.PSEUDO.test(c) &&
                                    !/!=/.test(c)) {
                                    var f = b.call(a, c);
                                    if (f || !d || a.document && a.document
                                        .nodeType !== 11) return f
                                }
                            } catch (g) {}
                            return k(c, null, null, [a]).length > 0
                        }
                    }
                }(),
                function() {
                    var a = c.createElement("div");
                    a.innerHTML =
                        "<div class='test e'></div><div class='test'></div>";
                    if (a.getElementsByClassName && a.getElementsByClassName(
                            "e").length !== 0) {
                        a.lastChild.className = "e";
                        if (a.getElementsByClassName("e").length === 1)
                            return;
                        l.order.splice(1, 0, "CLASS"), l.find.CLASS =
                            function(a, b, c) {
                                if (typeof b.getElementsByClassName !==
                                    "undefined" && !c) return b.getElementsByClassName(
                                    a[1])
                            }, a = null
                    }
                }(), c.documentElement.contains ? k.contains = function(a,
                    b) {
                    return a !== b && (a.contains ? a.contains(b) : !0)
                } : c.documentElement.compareDocumentPosition ? k.contains =
                function(a, b) {
                    return !!(a.compareDocumentPosition(b) & 16)
                } : k.contains = function() {
                    return !1
                }, k.isXML = function(a) {
                    var b = (a ? a.ownerDocument || a : 0).documentElement;
                    return b ? b.nodeName !== "HTML" : !1
                };
            var v = function(a, b) {
                if(typeof b == "undefined")return false;
                var c, d = [],
                    e = "",
                    f = b.nodeType ? [b] : b;
                while (c = l.match.PSEUDO.exec(a)) e += c[0], a = a.replace(
                    l.match.PSEUDO, "");
                a = l.relative[a] ? a + "*" : a;
                for (var g = 0, h = f.length; g < h; g++) k(a, f[g], d);
                return k.filter(e, d)
            };
            d.find = k, d.expr = k.selectors, d.expr[":"] = d.expr.filters,
                d.unique = k.uniqueSort, d.text = k.getText, d.isXMLDoc = k
                .isXML, d.contains = k.contains
        }();
    var I = /Until$/,
        J = /^(?:parents|prevUntil|prevAll)/,
        K = /,/,
        L = /^.[^:#\[\.,]*$/,
        M = Array.prototype.slice,
        N = d.expr.match.POS,
        O = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    d.fn.extend({
        find: function(a) {
            var b = this.pushStack("", "find", a),
                c = 0;
            for (var e = 0, f = this.length; e < f; e++) {
                c = b.length, d.find(a, this[e], b);
                if (e > 0)
                    for (var g = c; g < b.length; g++)
                        for (var h = 0; h < c; h++)
                            if (b[h] === b[g]) {
                                b.splice(g--, 1);
                                break
                            }
            }
            return b
        },
        has: function(a) {
            var b = d(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++)
                    if (d.contains(this, b[a])) return !
                        0
            })
        },
        not: function(a) {
            return this.pushStack(Q(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(Q(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && d.filter(a, this).length > 0
        },
        closest: function(a, b) {
            var c = [],
                e, f, g = this[0];
            if (d.isArray(a)) {
                var h, i, j = {},
                    k = 1;
                if (g && a.length) {
                    for (e = 0, f = a.length; e < f; e++) i = a[
                        e], j[i] || (j[i] = d.expr.match.POS
                        .test(i) ? d(i, b || this.context) :
                        i);
                    while (g && g.ownerDocument && g !== b) {
                        for (i in j) h = j[i], (h.jquery ? h.index(
                            g) > -1 : d(g).is(h)) && c.push({
                            selector: i,
                            elem: g,
                            level: k
                        });
                        g = g.parentNode, k++
                    }
                }
                return c
            }
            var l = N.test(a) ? d(a, b || this.context) : null;
            for (e = 0, f = this.length; e < f; e++) {
                g = this[e];
                while (g) {
                    if (l ? l.index(g) > -1 : d.find.matchesSelector(
                            g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b) break
                }
            }
            c = c.length > 1 ? d.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function(a) {
            if (!a || typeof a === "string") return d.inArray(
                this[0], a ? d(a) : this.parent().children()
            );
            return d.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var c = typeof a === "string" ? d(a, b) : d.makeArray(
                    a),
                e = d.merge(this.get(), c);
            return this.pushStack(P(c[0]) || P(e[0]) ? e : d.unique(
                e))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), d.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function(a) {
            return d.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return d.dir(a, "parentNode", c)
        },
        next: function(a) {
            return d.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return d.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return d.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return d.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return d.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return d.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return d.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return d.sibling(a.firstChild)
        },
        contents: function(a) {
            return d.nodeName(a, "iframe") ? a.contentDocument ||
                a.contentWindow.document : d.makeArray(a.childNodes)
        }
    }, function(a, b) {
        d.fn[a] = function(c, e) {
            var f = d.map(this, b, c),
                g = M.call(arguments);
            I.test(a) || (e = c), e && typeof e === "string" &&
                (f = d.filter(e, f)), f = this.length > 1 && !O[
                    a] ? d.unique(f) : f, (this.length > 1 || K
                    .test(e)) && J.test(a) && (f = f.reverse());
            return this.pushStack(f, a, g.join(","))
        }
    }), d.extend({
        filter: function(a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? d.find.matchesSelector(b[0],
                a) ? [b[0]] : [] : d.find.matches(a, b)
        },
        dir: function(a, c, e) {
            var f = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (e === b || g.nodeType !==
                    1 || !d(g).is(e))) g.nodeType === 1 && f.push(
                g), g = g[c];
            return f
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !==
                b && c.push(a);
            return c
        }
    });
    var R = / jQuery\d+="(?:\d+|null)"/g,
        S = /^\s+/,
        T =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        U = /<([\w:]+)/,
        V = /<tbody/i,
        W = /<|&#?\w+;/,
        X = /<(?:script|object|embed|option|style)/i,
        Y = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Z = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>",
                "</colgroup></table>"
            ],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    Z.optgroup = Z.option, Z.tbody = Z.tfoot = Z.colgroup = Z.caption = Z.thead,
        Z.th = Z.td, d.support.htmlSerialize || (Z._default = [1,
            "div<div>", "</div>"
        ]), d.fn.extend({
            text: function(a) {
                if (d.isFunction(a)) return this.each(function(b) {
                    var c = d(this);
                    c.text(a.call(this, b, c.text()))
                });
                if (typeof a !== "object" && a !== b) return this.empty()
                    .append((this[0] && this[0].ownerDocument ||
                        c).createTextNode(a));
                return d.text(this)
            },
            wrapAll: function(a) {
                if (d.isFunction(a)) return this.each(function(b) {
                    d(this).wrapAll(a.call(this, b))
                });
                if (this[0]) {
                    var b = d(a, this[0].ownerDocument).eq(0).clone(!
                        0);
                    this[0].parentNode && b.insertBefore(this[0]),
                        b.map(function() {
                            var a = this;
                            while (a.firstChild && a.firstChild
                                .nodeType === 1) a = a.firstChild;
                            return a
                        }).append(this)
                }
                return this
            },
            wrapInner: function(a) {
                if (d.isFunction(a)) return this.each(function(b) {
                    d(this).wrapInner(a.call(this, b))
                });
                return this.each(function() {
                    var b = d(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                return this.each(function() {
                    d(this).wrapAll(a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    d.nodeName(this, "body") || d(this).replaceWith(
                        this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(a) {
                    this.nodeType === 1 && this.appendChild(
                        a)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(a) {
                    this.nodeType === 1 && this.insertBefore(
                        a, this.firstChild)
                })
            },
            before: function() {
                if (this[0] && this[0].parentNode) return this.domManip(
                    arguments, !1,
                    function(a) {
                        this.parentNode.insertBefore(a,
                            this)
                    });
                if (arguments.length) {
                    var a = d(arguments[0]);
                    a.push.apply(a, this.toArray());
                    return this.pushStack(a, "before", arguments)
                }
            },
            after: function() {
                if (this[0] && this[0].parentNode) return this.domManip(
                    arguments, !1,
                    function(a) {
                        this.parentNode.insertBefore(a,
                            this.nextSibling)
                    });
                if (arguments.length) {
                    var a = this.pushStack(this, "after", arguments);
                    a.push.apply(a, d(arguments[0]).toArray());
                    return a
                }
            },
            remove: function(a, b) {
                for (var c = 0, e;
                    (e = this[c]) != null; c++)
                    if (!a || d.filter(a, [e]).length) !b && e.nodeType ===
                        1 && (d.cleanData(e.getElementsByTagName(
                            "*")), d.cleanData([e])), e.parentNode &&
                        e.parentNode.removeChild(e);
                return this
            },
            empty: function() {
                for (var a = 0, b;
                    (b = this[a]) != null; a++) {
                    b.nodeType === 1 && d.cleanData(b.getElementsByTagName(
                        "*"));
                    while (b.firstChild) b.removeChild(b.firstChild)
                }
                return this
            },
            clone: function(a, b) {
                a = a == null ? !1 : a, b = b == null ? a : b;
                return this.map(function() {
                    return d.clone(this, a, b)
                })
            },
            html: function(a) {
                if (a === b) return this[0] && this[0].nodeType ===
                    1 ? this[0].innerHTML.replace(R, "") : null;
                if (typeof a !== "string" || X.test(a) || !d.support
                    .leadingWhitespace && S.test(a) || Z[(U.exec(a) || [
                        "", ""
                    ])[1].toLowerCase()]) d.isFunction(a) ? this.each(
                    function(b) {
                        var c = d(this);
                        c.html(a.call(this, b, c.html()))
                    }) : this.empty().append(a);
                else {
                    a = a.replace(T, "<$1></$2>");
                    try {
                        for (var c = 0, e = this.length; c < e; c++)
                            this[c].nodeType === 1 && (d.cleanData(
                                    this[c].getElementsByTagName(
                                        "*")), this[c].innerHTML =
                                a)
                    } catch (f) {
                        this.empty().append(a)
                    }
                }
                return this
            },
            replaceWith: function(a) {
                if (this[0] && this[0].parentNode) {
                    if (d.isFunction(a)) return this.each(function(
                        b) {
                        var c = d(this),
                            e = c.html();
                        c.replaceWith(a.call(this, b, e))
                    });
                    typeof a !== "string" && (a = d(a).detach());
                    return this.each(function() {
                        var b = this.nextSibling,
                            c = this.parentNode;
                        d(this).remove(), b ? d(b).before(a) :
                            d(c).append(a)
                    })
                }
                return this.length ? this.pushStack(d(d.isFunction(
                    a) ? a() : a), "replaceWith", a) : this
            },
            detach: function(a) {
                return this.remove(a, !0)
            },
            domManip: function(a, c, e) {
                var f, g, h, i, j = a[0],
                    k = [];
                if (!d.support.checkClone && arguments.length === 3 &&
                    typeof j === "string" && Y.test(j)) return this
                    .each(function() {
                        d(this).domManip(a, c, e, !0)
                    });
                if (d.isFunction(j)) return this.each(function(f) {
                    var g = d(this);
                    a[0] = j.call(this, f, c ? g.html() :
                        b), g.domManip(a, c, e)
                });
                if (this[0]) {
                    i = j && j.parentNode, d.support.parentNode &&
                        i && i.nodeType === 11 && i.childNodes.length ===
                        this.length ? f = {
                            fragment: i
                        } : f = d.buildFragment(a, this, k), h = f.fragment,
                        h.childNodes.length === 1 ? g = h = h.firstChild :
                        g = h.firstChild;
                    if (g) {
                        c = c && d.nodeName(g, "tr");
                        for (var l = 0, m = this.length, n = m - 1; l <
                            m; l++) e.call(c ? $(this[l], g) : this[
                                l], f.cacheable || m > 1 && l <
                            n ? d.clone(h, !0, !0) : h)
                    }
                    k.length && d.each(k, bc)
                }
                return this
            }
        }), d.buildFragment = function(a, b, e) {
            var f, g, h, i = b && b[0] ? b[0].ownerDocument || b[0] : c;
            a.length === 1 && typeof a[0] === "string" && a[0].length < 512 &&
                i === c && a[0].charAt(0) === "<" && !X.test(a[0]) && (d.support
                    .checkClone || !Y.test(a[0])) && (g = !0, h = d.fragments[
                    a[0]], h && (h !== 1 && (f = h))), f || (f = i.createDocumentFragment(),
                    d.clean(a, i, f, e)), g && (d.fragments[a[0]] = h ? f :
                    1);
            return {
                fragment: f,
                cacheable: g
            }
        }, d.fragments = {}, d.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            d.fn[a] = function(c) {
                var e = [],
                    f = d(c),
                    g = this.length === 1 && this[0].parentNode;
                if (g && g.nodeType === 11 && g.childNodes.length ===
                    1 && f.length === 1) {
                    f[b](this[0]);
                    return this
                }
                for (var h = 0, i = f.length; h < i; h++) {
                    var j = (h > 0 ? this.clone(!0) : this).get();
                    d(f[h])[b](j), e = e.concat(j)
                }
                return this.pushStack(e, a, f.selector)
            }
        }), d.extend({
            clone: function(a, b, c) {
                var e = a.cloneNode(!0),
                    f, g, h;
                if ((!d.support.noCloneEvent || !d.support.noCloneChecked) &&
                    (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(
                        a)) {
                    ba(a, e), f = bb(a), g = bb(e);
                    for (h = 0; f[h]; ++h) ba(f[h], g[h])
                }
                if (b) {
                    _(a, e);
                    if (c) {
                        f = bb(a), g = bb(e);
                        for (h = 0; f[h]; ++h) _(f[h], g[h])
                    }
                }
                return e
            },
            clean: function(a, b, e, f) {
                b = b || c, typeof b.createElement === "undefined" &&
                    (b = b.ownerDocument || b[0] && b[0].ownerDocument ||
                        c);
                var g = [];
                for (var h = 0, i;
                    (i = a[h]) != null; h++) {
                    typeof i === "number" && (i += "");
                    if (!i) continue;
                    if (typeof i !== "string" || W.test(i)) {
                        if (typeof i === "string") {
                            i = i.replace(T, "<$1></$2>");
                            var j = (U.exec(i) || ["", ""])[1].toLowerCase(),
                                k = Z[j] || Z._default,
                                l = k[0],
                                m = b.createElement("div");
                            m.innerHTML = k[1] + i + k[2];
                            while (l--) m = m.lastChild;
                            if (!d.support.tbody) {
                                var n = V.test(i),
                                    o = j === "table" && !n ? m.firstChild &&
                                    m.firstChild.childNodes : k[1] ===
                                    "<table>" && !n ? m.childNodes : [];
                                for (var p = o.length - 1; p >= 0; --
                                    p) d.nodeName(o[p], "tbody") &&
                                    !o[p].childNodes.length && o[p]
                                    .parentNode.removeChild(o[p])
                            }!d.support.leadingWhitespace && S.test(
                                    i) && m.insertBefore(b.createTextNode(
                                    S.exec(i)[0]), m.firstChild), i =
                                m.childNodes
                        }
                    } else i = b.createTextNode(i);
                    i.nodeType ? g.push(i) : g = d.merge(g, i)
                }
                if (e)
                    for (h = 0; g[h]; h++) !f || !d.nodeName(g[h],
                            "script") || g[h].type && g[h].type.toLowerCase() !==
                        "text/javascript" ? (g[h].nodeType === 1 &&
                            g.splice.apply(g, [h + 1, 0].concat(d.makeArray(
                                g[h].getElementsByTagName(
                                    "script")))), e.appendChild(g[h])
                        ) : f.push(g[h].parentNode ? g[h].parentNode
                            .removeChild(g[h]) : g[h]);
                return g
            },
            cleanData: function(a) {
                var b, c, e = d.cache,
                    f = d.expando,
                    g = d.event.special,
                    h = d.support.deleteExpando;
                for (var i = 0, j;
                    (j = a[i]) != null; i++) {
                    if (j.nodeName && d.noData[j.nodeName.toLowerCase()])
                        continue;
                    c = j[d.expando];
                    if (c) {
                        b = e[c] && e[c][f];
                        if (b && b.events) {
                            for (var k in b.events) g[k] ? d.event.remove(
                                j, k) : d.removeEvent(j, k, b.handle);
                            b.handle && (b.handle.elem = null)
                        }
                        h ? delete j[d.expando] : j.removeAttribute &&
                            j.removeAttribute(d.expando), delete e[
                                c]
                    }
                }
            }
        });
    var bd = /alpha\([^)]*\)/i,
        be = /opacity=([^)]*)/,
        bf = /-([a-z])/ig,
        bg = /([A-Z]|^ms)/g,
        bh = /^-?\d+(?:px)?$/i,
        bi = /^-?\d/,
        bj = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bk = ["Left", "Right"],
        bl = ["Top", "Bottom"],
        bm, bn, bo, bp = function(a, b) {
            return b.toUpperCase()
        };
    d.fn.css = function(a, c) {
        if (arguments.length === 2 && c === b) return this;
        return d.access(this, a, c, !0, function(a, c, e) {
            return e !== b ? d.style(a, c, e) : d.css(a, c)
        })
    }, d.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bm(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            zIndex: !0,
            fontWeight: !0,
            opacity: !0,
            zoom: !0,
            lineHeight: !0
        },
        cssProps: {
            "float": d.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, e, f) {
            if (a && a.nodeType !== 3 && a.nodeType !== 8 && a.style) {
                var g, h = d.camelCase(c),
                    i = a.style,
                    j = d.cssHooks[h];
                c = d.cssProps[h] || h;
                if (e === b) {
                    if (j && "get" in j && (g = j.get(a, !1, f)) !==
                        b) return g;
                    return i[c]
                }
                if (typeof e === "number" && isNaN(e) || e ==
                    null) return;
                typeof e === "number" && !d.cssNumber[h] && (e +=
                    "px");
                if (!j || !("set" in j) || (e = j.set(a, e)) !==
                    b) try {
                    i[c] = e
                } catch (k) {}
            }
        },
        css: function(a, c, e) {
            var f, g = d.camelCase(c),
                h = d.cssHooks[g];
            c = d.cssProps[g] || g;
            if (h && "get" in h && (f = h.get(a, !0, e)) !== b)
                return f;
            if (bm) return bm(a, c, g)
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[
                e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        },
        camelCase: function(a) {
            return a.replace(bf, bp)
        }
    }), d.curCSS = d.css, d.each(["height", "width"], function(a, b) {
        d.cssHooks[b] = {
            get: function(a, c, e) {
                var f;
                if (c) {
                    a.offsetWidth !== 0 ? f = bq(a, b, e) :
                        d.swap(a, bj, function() {
                            f = bq(a, b, e)
                        });
                    if (f <= 0) {
                        f = bm(a, b, b), f === "0px" && bo &&
                            (f = bo(a, b, b));
                        if (f != null) return f === "" || f ===
                            "auto" ? "0px" : f
                    }
                    if (f < 0 || f == null) {
                        f = a.style[b];
                        return f === "" || f === "auto" ?
                            "0px" : f
                    }
                    return typeof f === "string" ? f : f +
                        "px"
                }
            },
            set: function(a, b) {
                if (!bh.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), d.support.opacity || (d.cssHooks.opacity = {
        get: function(a, b) {
            return be.test((b && a.currentStyle ? a.currentStyle
                    .filter : a.style.filter) || "") ?
                parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style;
            c.zoom = 1;
            var e = d.isNaN(b) ? "" : "alpha(opacity=" + b *
                100 + ")",
                f = c.filter || "";
            c.filter = bd.test(f) ? f.replace(bd, e) : c.filter +
                " " + e
        }
    }), d(function() {
        d.support.reliableMarginRight || (d.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                d.swap(a, {
                    display: "inline-block"
                }, function() {
                    b ? c = bm(a,
                            "margin-right",
                            "marginRight") : c =
                        a.style.marginRight
                });
                return c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (bn =
        function(a, c, e) {
            var f, g, h;
            e = e.replace(bg, "-$1").toLowerCase();
            if (!(g = a.ownerDocument.defaultView)) return b;
            if (h = g.getComputedStyle(a, null)) f = h.getPropertyValue(
                e), f === "" && !d.contains(a.ownerDocument.documentElement,
                a) && (f = d.style(a, e));
            return f
        }), c.documentElement.currentStyle && (bo = function(a, b) {
        var c, d = a.currentStyle && a.currentStyle[b],
            e = a.runtimeStyle && a.runtimeStyle[b],
            f = a.style;
        !bh.test(d) && bi.test(d) && (c = f.left, e && (a.runtimeStyle
                .left = a.currentStyle.left), f.left = b ===
            "fontSize" ? "1em" : d || 0, d = f.pixelLeft + "px",
            f.left = c, e && (a.runtimeStyle.left = e));
        return d === "" ? "auto" : d
    }), bm = bn || bo, d.expr && d.expr.filters && (d.expr.filters.hidden =
        function(a) {
            var b = a.offsetWidth,
                c = a.offsetHeight;
            return b === 0 && c === 0 || !d.support.reliableHiddenOffsets &&
                (a.style.display || d.css(a, "display")) === "none"
        }, d.expr.filters.visible = function(a) {
            return !d.expr.filters.hidden(a)
        });
    var br = /%20/g,
        bs = /\[\]$/,
        bt = /\r?\n/g,
        bu = /#.*$/,
        bv = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bw =
        /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bx = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
        by = /^(?:GET|HEAD)$/,
        bz = /^\/\//,
        bA = /\?/,
        bB = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bC = /^(?:select|textarea)/i,
        bD = /\s+/,
        bE = /([?&])_=[^&]*/,
        bF = /(^|\-)([a-z])/g,
        bG = function(a, b, c) {
            return b + c.toUpperCase()
        },
        bH = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        bI = d.fn.load,
        bJ = {},
        bK = {},
        bL, bM;
    try {
        bL = c.location.href
    } catch (bN) {
        bL = c.createElement("a"), bL.href = "", bL = bL.href
    }
    bM = bH.exec(bL.toLowerCase()) || [], d.fn.extend({
        load: function(a, c, e) {
            if (typeof a !== "string" && bI) return bI.apply(
                this, arguments);
            if (!this.length) return this;
            var f = a.indexOf(" ");
            if (f >= 0) {
                var g = a.slice(f, a.length);
                a = a.slice(0, f)
            }
            var h = "GET";
            c && (d.isFunction(c) ? (e = c, c = b) : typeof c ===
                "object" && (c = d.param(c, d.ajaxSettings.traditional),
                    h = "POST"));
            var i = this;
            d.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() &&
                        (a.done(function(a) {
                            c = a
                        }), i.html(g ? d(
                                "<div>").append(
                                c.replace(bB,
                                    "")).find(g) :
                            c)), e && i.each(e, [c,
                            b, a
                        ])
                }
            });
            return this
        },
        serialize: function() {
            return d.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? d.makeArray(this
                    .elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (
                    this.checked || bC.test(this.nodeName) ||
                    bw.test(this.type))
            }).map(function(a, b) {
                var c = d(this).val();
                return c == null ? null : d.isArray(c) ?
                    d.map(c, function(a, c) {
                        return {
                            name: b.name,
                            value: a.replace(bt,
                                "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(bt, "\r\n")
                    }
            }).get()
        }
    }), d.each(
        "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend"
        .split(" "),
        function(a, b) {
            d.fn[b] = function(a) {
                return this.bind(b, a)
            }
        }), d.each(["get", "post"], function(a, c) {
        d[c] = function(a, e, f, g) {
            d.isFunction(e) && (g = g || f, f = e, e = b);
            return d.ajax({
                type: c,
                url: a,
                data: e,
                success: f,
                dataType: g
            })
        }
    }), d.extend({
        getScript: function(a, c) {
            return d.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return d.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            b ? d.extend(!0, a, d.ajaxSettings, b) : (b = a, a =
                d.extend(!0, d.ajaxSettings, b));
            for (var c in {
                    context: 1,
                    url: 1
                }) c in b ? a[c] = b[c] : c in d.ajaxSettings &&
                (a[c] = d.ajaxSettings[c]);
            return a
        },
        ajaxSettings: {
            url: bL,
            isLocal: bx.test(bM[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": "*/*"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": d.parseJSON,
                "text xml": d.parseXML
            }
        },
        ajaxPrefilter: bO(bJ),
        ajaxTransport: bO(bK),
        ajax: function(a, c) {
            function v(a, c, l, n) {
                if (r !== 2) {
                    r = 2, p && clearTimeout(p), o = b, m = n ||
                        "", u.readyState = a ? 4 : 0;
                    var q, t, v, w = l ? bR(e, u, l) : b,
                        x, y;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (e.ifModified) {
                            if (x = u.getResponseHeader(
                                    "Last-Modified")) d.lastModified[
                                k] = x;
                            if (y = u.getResponseHeader("Etag"))
                                d.etag[k] = y
                        }
                        if (a === 304) c = "notmodified", q = !
                            0;
                        else try {
                            t = bS(e, w), c = "success", q = !
                                0
                        } catch (z) {
                            c = "parsererror", v = z
                        }
                    } else {
                        v = c;
                        if (!c || a) c = "error", a < 0 && (a =
                            0)
                    }
                    u.status = a, u.statusText = c, q ? h.resolveWith(
                            f, [t, c, u]) : h.rejectWith(f, [u,
                            c, v
                        ]), u.statusCode(j), j = b, s && g.trigger(
                            "ajax" + (q ? "Success" : "Error"), [
                                u, e, q ? t : v
                            ]), i.resolveWith(f, [u, c]), s &&
                        (g.trigger("ajaxComplete", [u, e]), --d
                            .active || d.event.trigger(
                                "ajaxStop"))
                }
            }
            typeof a === "object" && (c = a, a = b), c = c || {};
            var e = d.ajaxSetup({}, c),
                f = e.context || e,
                g = f !== e && (f.nodeType || f instanceof d) ?
                d(f) : d.event,
                h = d.Deferred(),
                i = d._Deferred(),
                j = e.statusCode || {},
                k, l = {},
                m, n, o, p, q, r = 0,
                s, t, u = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        r || (l[a.toLowerCase().replace(bF,
                            bG)] = b);
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return r === 2 ? m : null
                    },
                    getResponseHeader: function(a) {
                        var c;
                        if (r === 2) {
                            if (!n) {
                                n = {};
                                while (c = bv.exec(m)) n[c[
                                        1].toLowerCase()] =
                                    c[2]
                            }
                            c = n[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function(a) {
                        r || (e.mimeType = a);
                        return this
                    },
                    abort: function(a) {
                        a = a || "abort", o && o.abort(a),
                            v(0, a);
                        return this
                    }
                };
            h.promise(u), u.success = u.done, u.error = u.fail,
                u.complete = i.done, u.statusCode = function(a) {
                    if (a) {
                        var b;
                        if (r < 2)
                            for (b in a) j[b] = [j[b], a[b]];
                        else b = a[u.status], u.then(b, b)
                    }
                    return this
                }, e.url = ((a || e.url) + "").replace(bu, "").replace(
                    bz, bM[1] + "//"), e.dataTypes = d.trim(e.dataType ||
                    "*").toLowerCase().split(bD), e.crossDomain ==
                null && (q = bH.exec(e.url.toLowerCase()), e.crossDomain =
                    q && (q[1] != bM[1] || q[2] != bM[2] || (q[
                        3] || (q[1] === "http:" ? 80 :
                        443)) != (bM[3] || (bM[1] ===
                        "http:" ? 80 : 443)))), e.data && e.processData &&
                typeof e.data !== "string" && (e.data = d.param(
                    e.data, e.traditional)), bP(bJ, e, c, u);
            if (r === 2) return !1;
            s = e.global, e.type = e.type.toUpperCase(), e.hasContent = !
                by.test(e.type), s && d.active++ === 0 && d.event
                .trigger("ajaxStart");
            if (!e.hasContent) {
                e.data && (e.url += (bA.test(e.url) ? "&" : "?") +
                    e.data), k = e.url;
                if (e.cache === !1) {
                    var w = d.now(),
                        x = e.url.replace(bE, "$1_=" + w);
                    e.url = x + (x === e.url ? (bA.test(e.url) ?
                        "&" : "?") + "_=" + w : "")
                }
            }
            if (e.data && e.hasContent && e.contentType !== !1 ||
                c.contentType) l["Content-Type"] = e.contentType;
            e.ifModified && (k = k || e.url, d.lastModified[k] &&
                (l["If-Modified-Since"] = d.lastModified[k]),
                d.etag[k] && (l["If-None-Match"] = d.etag[k])
            ), l.Accept = e.dataTypes[0] && e.accepts[e.dataTypes[
                0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[
                0] !== "*" ? ", */*; q=0.01" : "") : e.accepts[
                "*"];
            for (t in e.headers) u.setRequestHeader(t, e.headers[
                t]);
            if (e.beforeSend && (e.beforeSend.call(f, u, e) ===
                    !1 || r === 2)) {
                u.abort();
                return !1
            }
            for (t in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) u[t](e[t]);
            o = bP(bK, e, c, u);
            if (o) {
                u.readyState = 1, s && g.trigger("ajaxSend", [u,
                    e
                ]), e.async && e.timeout > 0 && (p =
                    setTimeout(function() {
                        u.abort("timeout")
                    }, e.timeout));
                try {
                    r = 1, o.send(l, v)
                } catch (y) {
                    status < 2 ? v(-1, y) : d.error(y)
                }
            } else v(-1, "No Transport");
            return u
        },
        param: function(a, c) {
            var e = [],
                f = function(a, b) {
                    b = d.isFunction(b) ? b() : b, e[e.length] =
                        encodeURIComponent(a) + "=" +
                        encodeURIComponent(b)
                };
            c === b && (c = d.ajaxSettings.traditional);
            if (d.isArray(a) || a.jquery && !d.isPlainObject(a))
                d.each(a, function() {
                    f(this.name, this.value)
                });
            else
                for (var g in a) bQ(g, a[g], c, f);
            return e.join("&").replace(br, "+")
        }
    }), d.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var bT = d.now(),
        bU = /(\=)\?(&|$)|\?\?/i;
    d.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return d.expando + "_" + bT++
        }
    }), d.ajaxPrefilter("json jsonp", function(b, c, e) {
        var f = typeof b.data === "string";
        if (b.dataTypes[0] === "jsonp" || c.jsonpCallback || c.jsonp !=
            null || b.jsonp !== !1 && (bU.test(b.url) || f && bU.test(
                b.data))) {
            var g, h = b.jsonpCallback = d.isFunction(b.jsonpCallback) ?
                b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2",
                m = function() {
                    a[h] = i, g && d.isFunction(i) && a[h](g[0])
                };
            b.jsonp !== !1 && (j = j.replace(bU, l), b.url === j &&
                    (f && (k = k.replace(bU, l)), b.data === k && (
                        j += (/\?/.test(j) ? "&" : "?") + b.jsonp +
                        "=" + h))), b.url = j, b.data = k, a[h] =
                function(a) {
                    g = [a]
                }, e.then(m, m), b.converters["script json"] =
                function() {
                    g || d.error(h + " was not called");
                    return g[0]
                }, b.dataTypes[0] = "json";
            return "script"
        }
    }), d.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                d.globalEval(a);
                return a
            }
        }
    }), d.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type =
            "GET", a.global = !1)
    }), d.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] ||
                c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async =
                        "async", a.scriptCharset && (d.charset =
                            a.scriptCharset), d.src = a.url, d.onload =
                        d.onreadystatechange = function(a, c) {
                            if (!d.readyState ||
                                /loaded|complete/.test(d.readyState)
                            ) d.onload = d.onreadystatechange =
                                null, e && d.parentNode && e.removeChild(
                                    d), d = b, c || g(200,
                                    "success")
                        }, e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var bV = d.now(),
        bW, bX;
    d.ajaxSettings.xhr = a.ActiveXObject ? function() {
            return !this.isLocal && bZ() || b$()
        } : bZ, bX = d.ajaxSettings.xhr(), d.support.ajax = !!bX, d.support
        .cors = bX && "withCredentials" in bX, bX = b, d.support.ajax && d.ajaxTransport(
            function(a) {
                if (!a.crossDomain || d.support.cors) {
                    var c;
                    return {
                        send: function(e, f) {
                            var g = a.xhr(),
                                h, i;
                            a.username ? g.open(a.type, a.url, a.async,
                                a.username, a.password) : g.open(a.type,
                                a.url, a.async);
                            if (a.xhrFields)
                                for (i in a.xhrFields) g[i] = a.xhrFields[
                                    i];
                            a.mimeType && g.overrideMimeType && g.overrideMimeType(
                                a.mimeType), !a.crossDomain && !e[
                                "X-Requested-With"] && (e[
                                    "X-Requested-With"] =
                                "XMLHttpRequest");
                            try {
                                for (i in e) g.setRequestHeader(i, e[i])
                            } catch (j) {}
                            g.send(a.hasContent && a.data || null), c =
                                function(e, i) {
                                    var j, k, l, m, n;
                                    try {
                                        if (c && (i || g.readyState ===
                                                4)) {
                                            c = b, h && (g.onreadystatechange =
                                                d.noop, delete bW[h]
                                            );
                                            if (i) g.readyState !== 4 &&
                                                g.abort();
                                            else {
                                                j = g.status, l = g.getAllResponseHeaders(),
                                                    m = {}, n = g.responseXML,
                                                    n && n.documentElement &&
                                                    (m.xml = n), m.text =
                                                    g.responseText;
                                                try {
                                                    k = g.statusText
                                                } catch (o) {
                                                    k = ""
                                                }
                                                j || !a.isLocal || a.crossDomain ?
                                                    j === 1223 && (j =
                                                        204) : j = m.text ?
                                                    200 : 404
                                            }
                                        }
                                    } catch (p) {
                                        i || f(-1, p)
                                    }
                                    m && f(j, k, m, l)
                                }, a.async && g.readyState !== 4 ? (bW ||
                                    (bW = {}, bY()), h = bV++, g.onreadystatechange =
                                    bW[h] = c) : c()
                        },
                        abort: function() {
                            c && c(0, 1)
                        }
                    }
                }
            });
    var b_ = {},
        ca = /^(?:toggle|show|hide)$/,
        cb = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        cc, cd = [
            ["height", "marginTop", "marginBottom", "paddingTop",
                "paddingBottom"
            ],
            ["width", "marginLeft", "marginRight", "paddingLeft",
                "paddingRight"
            ],
            ["opacity"]
        ];
    d.fn.extend({
        show: function(a, b, c) {
            var e, f;
            if (a || a === 0) return this.animate(ce("show", 3),
                a, b, c);
            for (var g = 0, h = this.length; g < h; g++) e =
                this[g], f = e.style.display, !d._data(e,
                    "olddisplay") && f === "none" && (f = e.style
                    .display = ""), f === "" && d.css(e,
                    "display") === "none" && d._data(e,
                    "olddisplay", cf(e.nodeName));
            for (g = 0; g < h; g++) {
                e = this[g], f = e.style.display;
                if (f === "" || f === "none") e.style.display =
                    d._data(e, "olddisplay") || ""
            }
            return this
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(ce("hide", 3),
                a, b, c);
            for (var e = 0, f = this.length; e < f; e++) {
                var g = d.css(this[e], "display");
                g !== "none" && !d._data(this[e], "olddisplay") &&
                    d._data(this[e], "olddisplay", g)
            }
            for (e = 0; e < f; e++) this[e].style.display =
                "none";
            return this
        },
        _toggle: d.fn.toggle,
        toggle: function(a, b, c) {
            var e = typeof a === "boolean";
            d.isFunction(a) && d.isFunction(b) ? this._toggle.apply(
                this, arguments) : a == null || e ? this.each(
                function() {
                    var b = e ? a : d(this).is(":hidden");
                    d(this)[b ? "show" : "hide"]()
                }) : this.animate(ce("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show()
                .end().animate({
                    opacity: b
                }, a, c, d)
        },
        animate: function(a, b, c, e) {
            var f = d.speed(b, c, e);
            if (d.isEmptyObject(a)) return this.each(f.complete);
            return this[f.queue === !1 ? "each" : "queue"](
                function() {
                    var b = d.extend({}, f),
                        c, e = this.nodeType === 1,
                        g = e && d(this).is(":hidden"),
                        h = this;
                    for (c in a) {
                        var i = d.camelCase(c);
                        c !== i && (a[i] = a[c], delete a[c],
                            c = i);
                        if (a[c] === "hide" && g || a[c] ===
                            "show" && !g) return b.complete
                            .call(this);
                        if (e && (c === "height" || c ===
                                "width")) {
                            b.overflow = [this.style.overflow,
                                this.style.overflowX,
                                this.style.overflowY
                            ];
                            if (d.css(this, "display") ===
                                "inline" && d.css(this,
                                    "float") === "none")
                                if (d.support.inlineBlockNeedsLayout) {
                                    var j = cf(this.nodeName);
                                    j === "inline" ? this.style
                                        .display =
                                        "inline-block" : (
                                            this.style.display =
                                            "inline", this.style
                                            .zoom = 1)
                                } else this.style.display =
                                    "inline-block"
                        }
                        d.isArray(a[c]) && ((b.specialEasing =
                            b.specialEasing || {})[
                            c] = a[c][1], a[c] = a[
                            c][0])
                    }
                    b.overflow != null && (this.style.overflow =
                        "hidden"), b.curAnim = d.extend({},
                        a), d.each(a, function(c, e) {
                        var f = new d.fx(h, b, c);
                        if (ca.test(e)) f[e ===
                            "toggle" ? g ?
                            "show" : "hide" : e
                        ](a);
                        else {
                            var i = cb.exec(e),
                                j = f.cur();
                            if (i) {
                                var k = parseFloat(
                                        i[2]),
                                    l = i[3] || (d.cssNumber[
                                            c] ? "" :
                                        "px");
                                l !== "px" && (d.style(
                                        h, c, (
                                            k ||
                                            1) +
                                        l), j =
                                    (k || 1) /
                                    f.cur() * j,
                                    d.style(h,
                                        c, j +
                                        l)), i[
                                    1] && (k =
                                    (i[1] ===
                                        "-=" ?
                                        -1 : 1) *
                                    k + j), f.custom(
                                    j, k, l)
                            } else f.custom(j, e,
                                "")
                        }
                    });
                    return !0
                })
        },
        stop: function(a, b) {
            var c = d.timers;
            a && this.queue([]), this.each(function() {
                for (var a = c.length - 1; a >= 0; a--)
                    c[a].elem === this && (b && c[a](!0),
                        c.splice(a, 1))
            }), b || this.dequeue();
            return this
        }
    }), d.each({
        slideDown: ce("show", 1),
        slideUp: ce("hide", 1),
        slideToggle: ce("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        d.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), d.extend({
        speed: function(a, b, c) {
            var e = a && typeof a === "object" ? d.extend({}, a) : {
                complete: c || !c && b || d.isFunction(a) &&
                    a,
                duration: a,
                easing: c && b || b && !d.isFunction(b) &&
                    b
            };
            e.duration = d.fx.off ? 0 : typeof e.duration ===
                "number" ? e.duration : e.duration in d.fx.speeds ?
                d.fx.speeds[e.duration] : d.fx.speeds._default,
                e.old = e.complete, e.complete = function() {
                    e.queue !== !1 && d(this).dequeue(), d.isFunction(
                        e.old) && e.old.call(this)
                };
            return e
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d +
                    c
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig ||
                (b.orig = {})
        }
    }), d.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem,
                this.now, this), (d.fx.step[this.prop] || d.fx.step
                ._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style ||
                    this.elem.style[this.prop] == null)) return this
                .elem[this.prop];
            var a, b = d.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ?
                0 : b : a
        },
        custom: function(a, b, c) {
            function g(a) {
                return e.step(a)
            }
            var e = this,
                f = d.fx;
            this.startTime = d.now(), this.start = a, this.end = b,
                this.unit = c || this.unit || (d.cssNumber[this.prop] ?
                    "" : "px"), this.now = this.start, this.pos =
                this.state = 0, g.elem = this.elem, g() && d.timers
                .push(g) && !cc && (cc = setInterval(f.tick, f.interval))
        },
        show: function() {
            this.options.orig[this.prop] = d.style(this.elem, this.prop),
                this.options.show = !0, this.custom(this.prop ===
                    "width" || this.prop === "height" ? 1 : 0, this
                    .cur()), d(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = d.style(this.elem, this.prop),
                this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b = d.now(),
                c = !0;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1,
                    this.update(), this.options.curAnim[this.prop] = !
                    0;
                for (var e in this.options.curAnim) this.options.curAnim[
                    e] !== !0 && (c = !1);
                if (c) {
                    if (this.options.overflow != null && !d.support
                        .shrinkWrapBlocks) {
                        var f = this.elem,
                            g = this.options;
                        d.each(["", "X", "Y"], function(a, b) {
                            f.style["overflow" + b] = g.overflow[
                                a]
                        })
                    }
                    this.options.hide && d(this.elem).hide();
                    if (this.options.hide || this.options.show)
                        for (var h in this.options.curAnim) d.style(
                            this.elem, h, this.options.orig[h]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            var i = b - this.startTime;
            this.state = i / this.options.duration;
            var j = this.options.specialEasing && this.options.specialEasing[
                    this.prop],
                k = this.options.easing || (d.easing.swing ?
                    "swing" : "linear");
            this.pos = d.easing[j || k](this.state, i, 0, 1, this.options
                .duration), this.now = this.start + (this.end -
                this.start) * this.pos, this.update();
            return !0
        }
    }, d.extend(d.fx, {
        tick: function() {
            var a = d.timers;
            for (var b = 0; b < a.length; b++) a[b]() || a.splice(
                b--, 1);
            a.length || d.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(cc), cc = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                d.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ?
                    a.elem.style[a.prop] = (a.prop === "width" ||
                        a.prop === "height" ? Math.max(0, a.now) :
                        a.now) + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), d.expr && d.expr.filters && (d.expr.filters.animated = function(
        a) {
        return d.grep(d.timers, function(b) {
            return a === b.elem
        }).length
    });
    var cg = /^t(?:able|d|h)$/i,
        ch = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? d.fn.offset = function(a) {
        var b = this[0],
            c;
        if (a) return this.each(function(b) {
            d.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return d.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (e) {}
        var f = b.ownerDocument,
            g = f.documentElement;
        if (!c || !d.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = f.body,
            i = ci(f),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || d.support.boxModel && g.scrollTop || h
            .scrollTop,
            m = i.pageXOffset || d.support.boxModel && g.scrollLeft ||
            h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : d.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            d.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return d.offset.bodyOffset(b);
        d.offset.initialize();
        var c, e = b.offsetParent,
            f = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (d.offset.supportsFixedPosition && k.position ===
                "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -=
                b.scrollTop, m -= b.scrollLeft, b === e && (l += b.offsetTop,
                    m += b.offsetLeft, d.offset.doesNotAddBorder && (!d
                        .offset.doesAddBorderForTableAndCells || !cg.test(
                            b.nodeName)) && (l += parseFloat(c.borderTopWidth) ||
                        0, m += parseFloat(c.borderLeftWidth) || 0), f =
                    e, e = b.offsetParent), d.offset.subtractsBorderForOverflowNotVisible &&
                c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) ||
                    0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l +=
            i.offsetTop, m += i.offsetLeft;
        d.offset.supportsFixedPosition && k.position === "fixed" && (l +=
            Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft,
                i.scrollLeft));
        return {
            top: l,
            left: m
        }
    }, d.offset = {
        initialize: function() {
            var a = c.body,
                b = c.createElement("div"),
                e, f, g, h, i = parseFloat(d.css(a, "marginTop")) ||
                0,
                j =
                "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            d.extend(b.style, {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    border: 0,
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                }), b.innerHTML = j, a.insertBefore(b, a.firstChild),
                e = b.firstChild, f = e.firstChild, h = e.nextSibling
                .firstChild.firstChild, this.doesNotAddBorder = f.offsetTop !==
                5, this.doesAddBorderForTableAndCells = h.offsetTop ===
                5, f.style.position = "fixed", f.style.top = "20px",
                this.supportsFixedPosition = f.offsetTop === 20 ||
                f.offsetTop === 15, f.style.position = f.style.top =
                "", e.style.overflow = "hidden", e.style.position =
                "relative", this.subtractsBorderForOverflowNotVisible =
                f.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset =
                a.offsetTop !== i, a.removeChild(b), d.offset.initialize =
                d.noop
        },
        bodyOffset: function(a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            d.offset.initialize(), d.offset.doesNotIncludeMarginInBodyOffset &&
                (b += parseFloat(d.css(a, "marginTop")) || 0, c +=
                    parseFloat(d.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var e = d.css(a, "position");
            e === "static" && (a.style.position = "relative");
            var f = d(a),
                g = f.offset(),
                h = d.css(a, "top"),
                i = d.css(a, "left"),
                j = (e === "absolute" || e === "fixed") && d.inArray(
                    "auto", [h, i]) > -1,
                k = {},
                l = {},
                m, n;
            j && (l = f.position()), m = j ? l.top : parseInt(h, 10) ||
                0, n = j ? l.left : parseInt(i, 10) || 0, d.isFunction(
                    b) && (b = b.call(a, c, g)), b.top != null && (
                    k.top = b.top - g.top + m), b.left != null && (
                    k.left = b.left - g.left + n), "using" in b ? b
                .using.call(a, k) : f.css(k)
        }
    }, d.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                e = ch.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(d.css(a, "marginTop")) || 0, c.left -=
                parseFloat(d.css(a, "marginLeft")) || 0, e.top +=
                parseFloat(d.css(b[0], "borderTopWidth")) || 0,
                e.left += parseFloat(d.css(b[0],
                    "borderLeftWidth")) || 0;
            return {
                top: c.top - e.top,
                left: c.left - e.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && (!ch.test(a.nodeName) && d.css(
                        a, "position") === "static")) a =
                    a.offsetParent;
                return a
            })
        }
    }), d.each(["Left", "Top"], function(a, c) {
        var e = "scroll" + c;
        d.fn[e] = function(c) {
            var f = this[0],
                g;
            if (!f) return null;
            if (c !== b) return this.each(function() {
                g = ci(this), g ? g.scrollTo(a ? d(
                            g).scrollLeft() : c, a ?
                        c : d(g).scrollTop()) :
                    this[e] = c
            });
            g = ci(f);
            return g ? "pageXOffset" in g ? g[a ? "pageYOffset" :
                    "pageXOffset"] : d.support.boxModel && g.document
                .documentElement[e] || g.document.body[e] : f[e]
        }
    }), d.each(["Height", "Width"], function(a, c) {
        var e = c.toLowerCase();
        d.fn["inner" + c] = function() {
            return this[0] ? parseFloat(d.css(this[0], e,
                "padding")) : null
        }, d.fn["outer" + c] = function(a) {
            return this[0] ? parseFloat(d.css(this[0], e, a ?
                "margin" : "border")) : null
        }, d.fn[e] = function(a) {
            var f = this[0];
            if (!f) return a == null ? null : this;
            if (d.isFunction(a)) return this.each(function(b) {
                var c = d(this);
                c[e](a.call(this, b, c[e]()))
            });
            if (d.isWindow(f)) {
                var g = f.document.documentElement["client" + c];
                return f.document.compatMode === "CSS1Compat" &&
                    g || f.document.body["client" + c] || g
            }
            if (f.nodeType === 9) return Math.max(f.documentElement[
                    "client" + c], f.body["scroll" + c],
                f.documentElement["scroll" + c], f.body[
                    "offset" + c], f.documentElement[
                    "offset" + c]);
            if (a === b) {
                var h = d.css(f, e),
                    i = parseFloat(h);
                return d.isNaN(i) ? h : i
            }
            return this.css(e, typeof a === "string" ? a : a +
                "px")
        }
    }), a.jQuery = a.$ = d
})(window);;
(function($) {
    var _remove = $.fn.remove;
    $.fn.remove = function() {
        $("*", this).add(this).triggerHandler("remove");
        return _remove.apply(this, arguments);
    };

    function isVisible(element) {
        function checkStyles(element) {
            var style = element.style;
            return (style.display != 'none' && style.visibility != 'hidden');
        }
        var visible = checkStyles(element);
        (visible && $.each($.dir(element, 'parentNode'), function() {
            return (visible = checkStyles(this));
        }));
        return visible;
    }
    $.extend($.expr[':'], {
        data: function(a, i, m) {
            return $.data(a, m[3]);
        },
        tabbable: function(a, i, m) {
            var nodeName = a.nodeName.toLowerCase();
            return (a.tabIndex >= 0 && (('a' == nodeName && a.href) ||
                (/input|select|textarea|button/.test(
                        nodeName) && 'hidden' != a.type &&
                    !a.disabled)) && isVisible(a));
        }
    });
    $.keyCode = {
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };

    function getter(namespace, plugin, method, args) {
        function getMethods(type) {
            var methods = $[namespace][plugin][type] || [];
            return (typeof methods == 'string' ? methods.split(/,?\s+/) :
                methods);
        }
        var methods = getMethods('getter');
        if (args.length == 1 && typeof args[0] == 'string') {
            methods = methods.concat(getMethods('getterSetter'));
        }
        return ($.inArray(method, methods) != -1);
    }
    $.widget = function(name, prototype) {
        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        $.fn[name] = function(options) {
            var isMethodCall = (typeof options == 'string'),
                args = Array.prototype.slice.call(arguments, 1);
            if (isMethodCall && options.substring(0, 1) == '_') {
                return this;
            }
            if (isMethodCall && getter(namespace, name, options,
                    args)) {
                var instance = $.data(this[0], name);
                return (instance ? instance[options].apply(instance,
                    args) : undefined);
            }
            return this.each(function() {
                var instance = $.data(this, name);
                (!instance && !isMethodCall && $.data(this,
                    name, new $[namespace][name](this,
                        options)));
                (instance && isMethodCall && $.isFunction(
                    instance[options]) && instance[
                    options].apply(instance, args));
            });
        };
        $[namespace][name] = function(element, options) {
            var self = this;
            this.widgetName = name;
            this.widgetEventPrefix = $[namespace][name].eventPrefix ||
                name;
            this.widgetBaseClass = namespace + '-' + name;
            this.options = $.extend({}, $.widget.defaults, $[
                    namespace][name].defaults, $.metadata && $.metadata
                .get(element)[name], options);
            this.element = $(element).bind('setData.' + name,
                function(e, key, value) {
                    return self._setData(key, value);
                }).bind('getData.' + name, function(e, key) {
                return self._getData(key);
            }).bind('remove', function() {
                return self.destroy();
            });
            this._init();
        };
        $[namespace][name].prototype = $.extend({}, $.widget.prototype,
            prototype);
        $[namespace][name].getterSetter = 'option';
    };
    $.widget.prototype = {
        _init: function() {},
        destroy: function() {
            this.element.removeData(this.widgetName);
        },
        option: function(key, value) {
            var options = key,
                self = this;
            if (typeof key == "string") {
                if (value === undefined) {
                    return this._getData(key);
                }
                options = {};
                options[key] = value;
            }
            $.each(options, function(key, value) {
                self._setData(key, value);
            });
        },
        _getData: function(key) {
            return this.options[key];
        },
        _setData: function(key, value) {
            this.options[key] = value;
            if (key == 'disabled') {
                this.element[value ? 'addClass' : 'removeClass'](
                    this.widgetBaseClass + '-disabled');
            }
        },
        enable: function() {
            this._setData('disabled', false);
        },
        disable: function() {
            this._setData('disabled', true);
        },
        _trigger: function(type, e, data) {
            var eventName = (type == this.widgetEventPrefix ? type :
                this.widgetEventPrefix + type);
            e = e || $.event.fix({
                type: eventName,
                target: this.element[0]
            });
            return this.element.triggerHandler(eventName, [e, data],
                this.options[type]);
        }
    };
    $.widget.defaults = {
        disabled: false
    };
    $.ui = {
        plugin: {
            add: function(module, option, set) {
                var proto = $.ui[module].prototype;
                for (var i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function(instance, name, args) {
                var set = instance.plugins[name];
                if (!set) {
                    return;
                }
                for (var i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        },
        cssCache: {},
        css: function(name) {
            if ($.ui.cssCache[name]) {
                return $.ui.cssCache[name];
            }
            var tmp = $('<div class="ui-gen">').addClass(name).css({
                position: 'absolute',
                top: '-5000px',
                left: '-5000px',
                display: 'block'
            }).appendTo('body');
            $.ui.cssCache[name] = !!((!(/auto|default/).test(tmp.css(
                'cursor')) || (/^[1-9]/).test(tmp.css(
                'height')) || (/^[1-9]/).test(tmp.css(
                'width')) || !(/none/).test(tmp.css(
                'backgroundImage')) || !(
                /transparent|rgba\(0, 0, 0, 0\)/).test(
                tmp.css('backgroundColor'))));
            try {
                $('body').get(0).removeChild(tmp.get(0));
            } catch (e) {}
            return $.ui.cssCache[name];
        },
        disableSelection: function(el) {
            return $(el).attr('unselectable', 'on').css(
                'MozUserSelect', 'none').bind('selectstart.ui',
                function() {
                    return false;
                });
        },
        enableSelection: function(el) {
            return $(el).attr('unselectable', 'off').css(
                'MozUserSelect', '').unbind('selectstart.ui');
        },
        hasScroll: function(e, a) {
            if ($(e).css('overflow') == 'hidden') {
                return false;
            }
            var scroll = (a && a == 'left') ? 'scrollLeft' :
                'scrollTop',
                has = false;
            if (e[scroll] > 0) {
                return true;
            }
            e[scroll] = 1;
            has = (e[scroll] > 0);
            e[scroll] = 0;
            return has;
        }
    };
    $.ui.mouse = {
        _mouseInit: function() {
            var self = this;
            this.element.bind('mousedown.' + this.widgetName,
                function(e) {
                    return self._mouseDown(e);
                });
            if ($.browser.msie) {
                this._mouseUnselectable = this.element.attr(
                    'unselectable');
                this.element.attr('unselectable', 'on');
            }
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind('.' + this.widgetName);
            ($.browser.msie && this.element.attr('unselectable',
                this._mouseUnselectable));
        },
        _mouseDown: function(e) {
            (this._mouseStarted && this._mouseUp(e));
            this._mouseDownEvent = e;
            var self = this,
                btnIsLeft = (e.which == 1),
                elIsCancel = (typeof this.options.cancel ==
                    "string" ? $(e.target).parents().add(e.target).filter(
                        this.options.cancel).length : false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(e)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    self.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(e) && this._mouseDelayMet(e)) {
                this._mouseStarted = (this._mouseStart(e) !== false);
                if (!this._mouseStarted) {
                    e.preventDefault();
                    return true;
                }
            }
            this._mouseMoveDelegate = function(e) {
                return self._mouseMove(e);
            };
            this._mouseUpDelegate = function(e) {
                return self._mouseUp(e);
            };
            $(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
                .bind('mouseup.' + this.widgetName, this._mouseUpDelegate);
            return false;
        },
        _mouseMove: function(e) {
            if ($.browser.msie && !e.button) {
                return this._mouseUp(e);
            }
            if (this._mouseStarted) {
                this._mouseDrag(e);
                return false;
            }
            if (this._mouseDistanceMet(e) && this._mouseDelayMet(e)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent,
                    e) !== false);
                (this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(
                    e));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function(e) {
            $(document).unbind('mousemove.' + this.widgetName, this
                ._mouseMoveDelegate).unbind('mouseup.' + this.widgetName,
                this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._mouseStop(e);
            }
            return false;
        },
        _mouseDistanceMet: function(e) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX -
                e.pageX), Math.abs(this._mouseDownEvent
                .pageY - e.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function(e) {
            return this.mouseDelayMet;
        },
        _mouseStart: function(e) {},
        _mouseDrag: function(e) {},
        _mouseStop: function(e) {},
        _mouseCapture: function(e) {
            return true;
        }
    };
    $.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    };
})(jQuery);
(function($) {
    $.widget("ui.tabs", {
        _init: function() {
            this.options.event += '.tabs';
            this._tabify(true);
        },
        _setData: function(key, value) {
            if ((/^selected/).test(key))
                this.select(value);
            else {
                this.options[key] = value;
                this._tabify();
            }
        },
        length: function() {
            return this.$tabs.length;
        },
        _tabId: function(a) {
            return a.title && a.title.replace(/\s/g, '_').replace(
                    /[^A-Za-z0-9\-_:\.]/g, '') || this.options.idPrefix +
                $.data(a);
        },
        ui: function(tab, panel) {
            return {
                options: this.options,
                tab: tab,
                panel: panel,
                index: this.$tabs.index(tab)
            };
        },
        _tabify: function(init) {
            this.$lis = $('li:has(a[href])', this.element);
            this.$tabs = this.$lis.map(function() {
                return $('a', this)[0];
            });
            this.$panels = $([]);
            var self = this,
                o = this.options;
            this.$tabs.each(function(i, a) {
                if (a.hash && a.hash.replace('#', ''))
                    self.$panels = self.$panels.add(a.hash);
                else if ($(a).attr('href') != '#') {
                    $.data(a, 'href.tabs', a.href);
                    $.data(a, 'load.tabs', a.href);
                    var id = self._tabId(a);
                    a.href = '#' + id;
                    var $panel = $('#' + id);
                    if (!$panel.length) {
                        $panel = $(o.panelTemplate).attr(
                                'id', id).addClass(o.panelClass)
                            .insertAfter(self.$panels[i -
                                1] || self.element);
                        $panel.data('destroy.tabs',
                            true);
                    }
                    self.$panels = self.$panels.add(
                        $panel);
                } else
                    o.disabled.push(i + 1);
            });
            if (init) {
                this.element.addClass(o.navClass);
                this.$panels.each(function() {
                    var $this = $(this);
                    $this.addClass(o.panelClass);
                });
                if (o.selected === undefined) {
                    if (location.hash) {
                        this.$tabs.each(function(i, a) {
                            if (a.hash == location.hash) {
                                o.selected = i;
                                if ($.browser.msie || $
                                    .browser.opera) {
                                    var $toShow = $(
                                            location.hash
                                        ),
                                        toShowId =
                                        $toShow.attr(
                                            'id');
                                    $toShow.attr('id',
                                        '');
                                    setTimeout(function() {
                                        $toShow
                                            .attr(
                                                'id',
                                                toShowId
                                            );
                                    }, 500);
                                }
                                scrollTo(0, 0);
                                return false;
                            }
                        });
                    } else if (o.cookie) {
                        var index = parseInt($.cookie(
                            'ui-tabs-' + $.data(self.element[
                                0])), 10);
                        if (index && self.$tabs[index])
                            o.selected = index;
                    } else if (self.$lis.filter('.' + o.selectedClass)
                        .length)
                        o.selected = self.$lis.index(self.$lis.filter(
                            '.' + o.selectedClass)[0]);
                }
                o.selected = o.selected === null || o.selected !==
                    undefined ? o.selected : 0;
                o.disabled = $.unique(o.disabled.concat($.map(
                    this.$lis.filter('.' + o.disabledClass),
                    function(n, i) {
                        return self.$lis.index(n);
                    }))).sort();
                if ($.inArray(o.selected, o.disabled) != -1)
                    o.disabled.splice($.inArray(o.selected, o.disabled),
                        1);
                this.$panels.addClass(o.hideClass);
                this.$lis.removeClass(o.selectedClass);
                if (o.selected !== null) {
                    this.$panels.eq(o.selected).show().removeClass(
                        o.hideClass);
                    this.$lis.eq(o.selected).addClass(o.selectedClass);
                    var onShow = function() {
                        self._trigger('show', null, self.ui(
                            self.$tabs[o.selected],
                            self.$panels[o.selected]
                        ));
                    };
                    if ($.data(this.$tabs[o.selected],
                            'load.tabs'))
                        this.load(o.selected, onShow);
                    else
                        onShow();
                }
                $(window).bind('unload', function() {
                    self.$tabs.unbind('.tabs');
                    self.$lis = self.$tabs = self.$panels =
                        null;
                });
            } else
                o.selected = this.$lis.index(this.$lis.filter(
                    '.' + o.selectedClass)[0]);
            if (o.cookie)
                $.cookie('ui-tabs-' + $.data(self.element[0]),
                    o.selected, o.cookie);
            for (var i = 0, li; li = this.$lis[i]; i++)
                $(li)[$.inArray(i, o.disabled) != -1 && !$(li).hasClass(
                        o.selectedClass) ? 'addClass' :
                    'removeClass'](o.disabledClass);
            if (o.cache === false)
                this.$tabs.removeData('cache.tabs');
            var hideFx, showFx, baseFx = {
                    'min-width': 0,
                    duration: 1
                },
                baseDuration = 'normal';
            if (o.fx && o.fx.constructor == Array)
                hideFx = o.fx[0] || baseFx, showFx = o.fx[1] ||
                baseFx;
            else
                hideFx = showFx = o.fx || baseFx;
            var resetCSS = {
                display: '',
                overflow: '',
                height: ''
            };
            if (!$.browser.msie)
                resetCSS.opacity = '';

            function hideTab(clicked, $hide, $show) {
                $hide.animate(hideFx, hideFx.duration ||
                    baseDuration,
                    function() {
                        $hide.addClass(o.hideClass).css(
                            resetCSS);
                        if ($.browser.msie && hideFx.opacity)
                            $hide[0].style.filter = '';
                        if ($show)
                            showTab(clicked, $show, $hide);
                    });
            }

            function showTab(clicked, $show, $hide) {
                if (showFx === baseFx)
                    $show.css('display', 'block');
                $show.animate(showFx, showFx.duration ||
                    baseDuration,
                    function() {
                        $show.removeClass(o.hideClass).css(
                            resetCSS);
                        if ($.browser.msie && showFx.opacity)
                            $show[0].style.filter = '';
                        self._trigger('show', null, self.ui(
                            clicked, $show[0]));
                    });
            }

            function switchTab(clicked, $li, $hide, $show) {
                $li.addClass(o.selectedClass).siblings().removeClass(
                    o.selectedClass);
                hideTab(clicked, $hide, $show);
            }
            this.$tabs.unbind('.tabs').bind(o.event, function() {
                var $li = $(this).parents('li:eq(0)'),
                    $hide = self.$panels.filter(
                        ':visible'),
                    $show = $(this.hash);
                if (($li.hasClass(o.selectedClass) && !
                        o.unselect) || $li.hasClass(o.disabledClass) ||
                    $(this).hasClass(o.loadingClass) ||
                    self._trigger('select', null, self.ui(
                        this, $show[0])) === false) {
                    this.blur();
                    return false;
                }
                self.options.selected = self.$tabs.index(
                    this);
                if (o.unselect) {
                    if ($li.hasClass(o.selectedClass)) {
                        self.options.selected = null;
                        $li.removeClass(o.selectedClass);
                        self.$panels.stop();
                        hideTab(this, $hide);
                        this.blur();
                        return false;
                    } else if (!$hide.length) {
                        self.$panels.stop();
                        var a = this;
                        self.load(self.$tabs.index(this),
                            function() {
                                $li.addClass(o.selectedClass)
                                    .addClass(o.unselectClass);
                                showTab(a, $show);
                            });
                        this.blur();
                        return false;
                    }
                }
                if (o.cookie)
                    $.cookie('ui-tabs-' + $.data(self.element[
                            0]), self.options.selected,
                        o.cookie);
                self.$panels.stop();
                if ($show.length) {
                    var a = this;
                    self.load(self.$tabs.index(this),
                        $hide.length ? function() {
                            switchTab(a, $li, $hide,
                                $show);
                        } : function() {
                            $li.addClass(o.selectedClass);
                            showTab(a, $show);
                        });
                } else
                    throw 'jQuery UI Tabs: Mismatching fragment identifier.';
                if ($.browser.msie)
                    this.blur();
                return false;
            });
            if (!(/^click/).test(o.event))
                this.$tabs.bind('click.tabs', function() {
                    return false;
                });
        },
        add: function(url, label, index) {
            if (index == undefined)
                index = this.$tabs.length;
            var o = this.options;
            var $li = $(o.tabTemplate.replace(/#\{href\}/g, url)
                .replace(/#\{label\}/g, label));
            $li.data('destroy.tabs', true);
            var id = url.indexOf('#') == 0 ? url.replace('#',
                '') : this._tabId($('a:first-child', $li)[0]);
            var $panel = $('#' + id);
            if (!$panel.length) {
                $panel = $(o.panelTemplate).attr('id', id).addClass(
                    o.hideClass).data('destroy.tabs', true);
            }
            $panel.addClass(o.panelClass);
            if (index >= this.$lis.length) {
                $li.appendTo(this.element);
                $panel.appendTo(this.element[0].parentNode);
            } else {
                $li.insertBefore(this.$lis[index]);
                $panel.insertBefore(this.$panels[index]);
            }
            o.disabled = $.map(o.disabled, function(n, i) {
                return n >= index ? ++n : n
            });
            this._tabify();
            if (this.$tabs.length == 1) {
                $li.addClass(o.selectedClass);
                $panel.removeClass(o.hideClass);
                var href = $.data(this.$tabs[0], 'load.tabs');
                if (href)
                    this.load(index, href);
            }
            this._trigger('add', null, this.ui(this.$tabs[index],
                this.$panels[index]));
        },
        remove: function(index) {
            var o = this.options,
                $li = this.$lis.eq(index).remove(),
                $panel = this.$panels.eq(index).remove();
            if ($li.hasClass(o.selectedClass) && this.$tabs.length >
                1)
                this.select(index + (index + 1 < this.$tabs.length ?
                    1 : -1));
            o.disabled = $.map($.grep(o.disabled, function(n, i) {
                return n != index;
            }), function(n, i) {
                return n >= index ? --n : n
            });
            this._tabify();
            this._trigger('remove', null, this.ui($li.find('a')[
                0], $panel[0]));
        },
        enable: function(index) {
            var o = this.options;
            if ($.inArray(index, o.disabled) == -1)
                return;
            var $li = this.$lis.eq(index).removeClass(o.disabledClass);
            if ($.browser.safari) {
                $li.css('display', 'inline-block');
                setTimeout(function() {
                    $li.css('display', 'block');
                }, 0);
            }
            o.disabled = $.grep(o.disabled, function(n, i) {
                return n != index;
            });
            this._trigger('enable', null, this.ui(this.$tabs[
                index], this.$panels[index]));
        },
        disable: function(index) {
            var self = this,
                o = this.options;
            if (index != o.selected) {
                this.$lis.eq(index).addClass(o.disabledClass);
                o.disabled.push(index);
                o.disabled.sort();
                this._trigger('disable', null, this.ui(this.$tabs[
                    index], this.$panels[index]));
            }
        },
        select: function(index) {
            if (typeof index == 'string')
                index = this.$tabs.index(this.$tabs.filter(
                    '[href$=' + index + ']')[0]);
            this.$tabs.eq(index).trigger(this.options.event);
        },
        load: function(index, callback) {
            var self = this,
                o = this.options,
                $a = this.$tabs.eq(index),
                a = $a[0],
                bypassCache = callback == undefined || callback ===
                false,
                url = $a.data('load.tabs');
            callback = callback || function() {};
            if (!url || !bypassCache && $.data(a, 'cache.tabs')) {
                callback();
                return;
            }
            var inner = function(parent) {
                var $parent = $(parent),
                    $inner = $parent.find('*:last');
                return $inner.length && $inner.is(
                    ':not(img)') && $inner || $parent;
            };
            var cleanup = function() {
                self.$tabs.filter('.' + o.loadingClass).removeClass(
                    o.loadingClass).each(function() {
                    if (o.spinner)
                        inner(this).parent().html(
                            inner(this).data(
                                'label.tabs'));
                });
                self.xhr = null;
            };
            if (o.spinner) {
                var label = inner(a).html();
                inner(a).wrapInner('<em></em>').find('em').data(
                    'label.tabs', label).html(o.spinner);
            }
            var ajaxOptions = $.extend({}, o.ajaxOptions, {
                url: url,
                success: function(r, s) {
                    $(a.hash).html(r);
                    cleanup();
                    if (o.cache)
                        $.data(a, 'cache.tabs',
                            true);
                    self._trigger('load', null,
                        self.ui(self.$tabs[
                            index], self.$panels[
                            index]));
                    o.ajaxOptions.success && o.ajaxOptions
                        .success(r, s);
                    callback();
                }
            });
            if (this.xhr) {
                this.xhr.abort();
                cleanup();
            }
            $a.addClass(o.loadingClass);
            setTimeout(function() {
                self.xhr = $.ajax(ajaxOptions);
            }, 0);
        },
        url: function(index, url) {
            this.$tabs.eq(index).removeData('cache.tabs').data(
                'load.tabs', url);
        },
        destroy: function() {
            var o = this.options;
            this.element.unbind('.tabs').removeClass(o.navClass)
                .removeData('tabs');
            this.$tabs.each(function() {
                var href = $.data(this, 'href.tabs');
                if (href)
                    this.href = href;
                var $this = $(this).unbind('.tabs');
                $.each(['href', 'load', 'cache'],
                    function(i, prefix) {
                        $this.removeData(prefix +
                            '.tabs');
                    });
            });
            this.$lis.add(this.$panels).each(function() {
                if ($.data(this, 'destroy.tabs'))
                    $(this).remove();
                else
                    $(this).removeClass([o.selectedClass,
                        o.unselectClass, o.disabledClass,
                        o.panelClass, o.hideClass
                    ].join(' '));
            });
        }
    });
    $.ui.tabs.defaults = {
        unselect: false,
        event: 'click',
        disabled: [],
        cookie: null,
        spinner: 'Loading&#8230;',
        cache: false,
        idPrefix: 'ui-tabs-',
        ajaxOptions: {},
        fx: null,
        tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
        panelTemplate: '<div></div>',
        navClass: 'ui-tabs-nav',
        selectedClass: 'ui-tabs-selected',
        unselectClass: 'ui-tabs-unselect',
        disabledClass: 'ui-tabs-disabled',
        panelClass: 'ui-tabs-panel',
        hideClass: 'ui-tabs-hide',
        loadingClass: 'ui-tabs-loading'
    };
    $.ui.tabs.getter = "length";
    $.extend($.ui.tabs.prototype, {
        rotation: null,
        rotate: function(ms, continuing) {
            continuing = continuing || false;
            var self = this,
                t = this.options.selected;

            function start() {
                self.rotation = setInterval(function() {
                    t = ++t < self.$tabs.length ? t : 0;
                    self.select(t);
                }, ms);
            }

            function stop(e) {
                if (!e || e.clientX) {
                    clearInterval(self.rotation);
                }
            }
            if (ms) {
                start();
                if (!continuing)
                    this.$tabs.bind(this.options.event, stop);
                else
                    this.$tabs.bind(this.options.event,
                        function() {
                            stop();
                            t = self.options.selected;
                            start();
                        });
            } else {
                stop();
                this.$tabs.unbind(this.options.event, stop);
            }
        }
    });
})(jQuery);
(function($) {
    $.cookie = function(key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString
                    .call(value)) || value === null || value ===
                undefined)) {
            options = $.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return (document.cookie = [encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires
                .toUTCString() : '', options.path ? '; path=' +
                options.path : '', options.domain ? '; domain=' +
                options.domain : '', options.secure ?
                '; secure' : ''
            ].join(''));
        }
        options = value || {};
        var decode = options.raw ? function(s) {
            return s;
        } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);
var _top;
(function($) {
    $.fn.fixedFloat = function(options) {
        if ($.browser.msie && $.browser.version < 7) {
            return false;
        }
        var options = $.extend({}, $.fn.fixedFloat.defaults, options);
        return this.each(function() {
            var $this = $(this);
            _top = $(this).offset().top - parseFloat($(this).css(
                'margin-top').replace(/auto/, 0));
            var applyFixedFloat = function() {
                y = $(this).scrollTop();
                if (y >= (_top - options.offsetTop)) {
                    $this.addClass(options.cssClassName);
                    $('.fixed').css({
                        marginBottom: $('#footer').outerHeight(
                            true)
                    });
                } else {
                    $this.removeClass(options.cssClassName);
                }
            };
            if (window.addEventListener) {
                window.addEventListener('scroll',
                    applyFixedFloat);
            } else if (window.attachEvent) {
                window.attachEvent('scroll', applyFixedFloat);
            }
        });
    }
    $.fn.fixedFloatUpdate = function() {
        _top = $(this).offset().top - parseFloat($(this).css(
            'margin-top').replace(/auto/, 0));
    }
    $.fn.fixedFloat.defaults = {
        cssClassName: "fixed",
        offsetTop: 0
    };
})(jQuery);
if (typeof dmc != 'object')
    dmc = {};
if (typeof dmc.Utils != 'object')
    dmc.Utils = {};
dmc.Utils.CustomEvent = function() {
    this._handlers = [];
}
dmc.Utils.CustomEvent.prototype.addHandler = function(func, obj) {
    if (typeof func == 'string') {
        func = window[func];
    }
    if (!obj) {
        obj = null;
    }
    if (typeof func == 'function') {
        this._handlers.push([func, obj]);
    }
};
dmc.Utils.CustomEvent.prototype.trigger = function(_someArgs_) {
    var retVal = null;
    for (var i = 0; i < this._handlers.length; ++i) {
        var handler = this._handlers[i];
        var func = handler[0];
        var obj = handler[1];
        if (func.apply(obj, arguments) === false) {
            retVal = false;
            break;
        }
    }
    return retVal;
};
dmc.Utils.create = function(proto) {
    function f() {};
    f.prototype = proto;
    return new f();
}
dmc.Utils.trimString = function(word) {
    word = word.replace(/^\s*(.*)/, "$1");
    word = word.replace(/(.*?)\s*$/, "$1");
    return word;
}
dmc.Utils.sortAssoc = function(aInput, sortOrder) {
    var aTemp = [];
    var aOutput = [];
    for (var sKey in aInput) {
        aTemp.push([sKey, aInput[sKey]]);
    }
    aTemp.sort(function() {
        if (sortOrder == 'asc') {
            return arguments[0][1] < arguments[1][1];
        } else if (sortOrder == 'desc') {
            return arguments[0][1] > arguments[1][1];
        }
    });
    for (var nIndex = aTemp.length - 1; nIndex >= 0; nIndex--) {
        aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];
    }
    return aOutput;
}
dmc.Utils.sortNaturalKeyAssoc = function(aInput) {
    var aOutput = [],
        key, aTemp = [];
    for (key in aInput) {
        if (aInput.hasOwnProperty(key)) {
            aTemp.push(key);
        }
    }
    aTemp.sort(function(a, b) {
        return parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(
            /\d+/)[0], 10);
    });
    for (key = 0; key < aTemp.length; key++) {
        aOutput[aTemp[key]] = aInput[aTemp[key]];
    }
    return aOutput;
}
dmc.Utils.getSortedArray = function(array) {
    var index = 0;
    var retArray = [];
    for (var key in array) {
        retArray[index] = key;
        index++;
    }
    retArray.sort(function(a, b) {
        var aa = a.split('|');
        var bb = b.split('|');
        var aNum = aa[1];
        var bNum = bb[1];
        if (!isNaN(parseFloat(aNum)) && isFinite(aNum)) {
            return (aNum - bNum);
        } else {
            return aNum < bNum ? -1 : (aNum > bNum ? 1 : 0);
        }
    });
    return retArray;
}
dmc.Utils.getSortedArrayByValue = function(aInput, sortOrder) {
    var aTemp = [];
    var aOutput = [];
    for (var sKey in aInput) {
        aTemp.push([sKey, aInput[sKey]]);
    }
    aTemp.sort(function() {
        if (sortOrder == 'asc') {
            return (arguments[0][1] - arguments[1][1]);
        } else if (sortOrder == 'desc') {
            return (arguments[1][1] - arguments[0][1]);
        }
    });
    for (var nIndex = 0; nIndex < aTemp.length; nIndex++) {
        aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];
    }
    return aOutput;
}
dmc.Utils.closeAndParentReload = function() {
    opener.setUserDataFromCookie();
    close();
}
dmc.Utils.findQueryStringParam = function(param) {
    var reQueryString = new RegExp('(?:\\?|&)' + param + '=(.*?)(?=&|$)',
        'gi');
    var rePath = new RegExp('\/' + param + '\/([^\/]+)\/', 'gi');
    var r = '',
        m;
    while ((m = reQueryString.exec(document.location.search)) != null) {
        r = m[1];
    }
    while ((m = rePath.exec(document.location.href)) != null) {
        r = m[1];
    }
    return r;
}
dmc.Utils.ArrayNotEmpty = function(aInput) {
    var returnValue = false;
    if (typeof aInput == 'array' || typeof aInput == 'object') {
        for (i in aInput) {
            returnValue = true;
            break;
        }
    }
    return returnValue;
}

function getOwnProperties(obj) {
    var returnValue = [];
    if (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                returnValue.push(prop);
            }
        }
    }
    return returnValue;
}

function toInteger(val) {
    var returnValue = Math.round(val);
    if (isNaN(returnValue) || !isFinite(returnValue)) {
        returnValue = 0;
    }
    return returnValue;
}

function toIntegerOrNull(val) {
    var returnValue = Math.round(val);
    if (isNaN(returnValue) || !isFinite(returnValue)) {
        returnValue = null;
    }
    return returnValue;
}

function toNumber(val) {
    var returnValue = parseFloat(val);
    if (isNaN(returnValue) || !isFinite(returnValue)) {
        returnValue = 0;
    }
    return returnValue;
}

function toNumberOrNull(val) {
    var returnValue = parseFloat(val);
    if (isNaN(returnValue) || !isFinite(returnValue)) {
        returnValue = null;
    }
    return returnValue;
}

function gfxToggle(gfx, active, inactive) {
    if (typeof gfx == 'object' && gfx.src) {
        var matches = gfx.src.match(/^(.*)\/([^\/]+)$/);
        switch (matches[2]) {
            case active:
                gfx.src = matches[1] + '/' + inactive;
                break;
            case inactive:
                gfx.src = matches[1] + '/' + active;
                break;
            default:
        }
    }
}

function showHideObject(objId, visibility) {
    if (objId) {
        var object = document.getElementById(objId);
        if (object) {
            switch (visibility) {
                case false:
                    object.style.visibility = 'hidden';
                    object.style.display = 'none';
                    break;
                case true:
                    object.style.visibility = 'visible';
                    object.style.display = 'block';
                    break;
            }
        }
    }
}

function nextField(e, source, dest, fieldlen) {
    if (!e) var e = window.event;
    if (e.keyCode > 32) {
        if (source.value.length == fieldlen) {
            dest.value = '';
            dest.focus();
        }
    }
}

function resetForm(url) {
    window.location.href = url;
}

function openLayerWindow(props) {
    if (typeof props == 'object' && props.url && document.body && document.createElement) {
        var url = props.url;
        var id = props.id;
        var width = parseInt(props.width);
        var height = parseInt(props.height);
        var left = parseInt(props.left);
        var top = parseInt(props.top);
        var textClose = props.textClose;
        var className = props.className;
        var scrollable = !!props.scrollable;
        var onlyOncePerSession = !!props.onlyOncePerSession;
        if (typeof id != 'string') {
            id = '';
        }
        if (typeof textClose != 'string') {
            textClose = '';
        }
        if (isNaN(width) || width <= 0) {
            width = 400;
        }
        if (isNaN(height) || height <= 0) {
            height = 300;
        }
        if (isNaN(left) || left < 0) {
            left = 40;
        }
        if (isNaN(top) || top < 0) {
            top = 30;
        }
        if (typeof className != 'string') {
            className = 'layerWindow';
        }
        var showWindow = true;
        if (onlyOncePerSession) {
            if (!navigator.cookieEnabled) {
                showWindow = false;
            } else {
                var cookieName = 'layerWindowHasAlreadyBeenOpened';
                if (id !== '') {
                    cookieName += '_' + id;
                }
                if (document.cookie.indexOf(cookieName + '=true') >= 0) {
                    showWindow = false;
                }
            }
        }
        if (showWindow) {
            if (onlyOncePerSession) {
                document.cookie = cookieName + '=true';
            }
            var container = document.createElement('div');
            container.style.display = 'none';
            container.id = id;
            container.className = className;
            container.style.position = 'absolute';
            container.style.left = left + 'px';
            container.style.top = top + 'px';
            var pane = document.createElement('div');
            pane.className = className + '_pane';
            container.appendChild(pane);
            var content = document.createElement('div');
            content.className = className + '_content';
            pane.appendChild(content);
            var header = document.createElement('div');
            header.className = className + '_header';
            content.appendChild(header);
            var closeLink = document.createElement('a');
            closeLink.href = '#';
            closeLink.className = className + '_closeLink';
            closeLink.innerHTML = textClose;
            closeLink.style.display = 'block';
            header.appendChild(closeLink);
            closeLink.onclick = function() {
                document.body.removeChild(container);
            }
            var iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.className = className + '_iframe';
            iframe.frameBorder = '0';
            iframe.marginWidth = '0';
            iframe.marginHeight = '0';
            iframe.style.border = 'none';
            iframe.style.width = width + 'px';
            iframe.style.height = height + 'px';
            iframe.scrolling = (scrollable ? 'yes' : 'no');
            iframe.onload = iframe.onreadystatechange = function() {
                if (!iframe.readyState || iframe.readyState == 'complete') {
                    container.style.display = 'block';
                }
            }
            content.appendChild(iframe);
            setTimeout(function() {
                document.body.appendChild(container);
            }, 0);
        }
    }
}

function automatizeBoxToggling(props) {
    var selectorContainer = $.trim(props.selectorContainer);
    var selectorHeader = $.trim(props.selectorHeader);
    var selectorContent = $.trim(props.selectorContent);
    var classForOpenState = $.trim(props.classForOpenState);
    var classForClosedState = $.trim(props.classForClosedState);
    if (selectorContainer !== '' && selectorHeader !== '' && selectorContent !==
        '') {
        var containers = $(selectorContainer);

        function updateContainer(container, toggle) {
            var content = container.find(selectorContent);
            var hide = (content.css('display') == 'none' || container.hasClass(
                classForClosedState));
            if (toggle) {
                hide = !hide;
            }
            if (hide) {
                content.slideUp();
                container.removeClass(classForOpenState);
                container.addClass(classForClosedState);
            } else {
                content.slideDown();
                container.removeClass(classForClosedState);
                container.addClass(classForOpenState);
            }
        }
        containers.each(function(index, elem) {
            var container = $(elem);
            var header = container.find(selectorHeader);
            var content = container.find(selectorContent);
            updateContainer(container);
            header.click(function() {
                updateContainer(container, true)
            });
        });
    }
}
if (typeof jQuery == 'function') {
    jQuery(function() {
        var $ = jQuery;
        var doOnSubmit = function() {
            var returnValue = null;
            if ($(this).hasClass('formAlreadySubmitted')) {
                returnValue = false;
            } else {
                $(this).addClass('formAlreadySubmitted');
            }
            return returnValue;
        }
        $('form.singleSubmitForm').submit(doOnSubmit);
    });
}

function closeWindow() {
    if (window.opener) {
        window.close();
    } else if (parent && typeof parent.tb_remove == 'function') {
        parent.tb_remove();
    }
    return true;
}

function toggle(obj, imgpath) {
    obj.src = imgpath;
}

function sfHover() {
    var navi = document.getElementById("sfNavi");
    if (navi) {
        var sfEls = document.getElementById("sfNavi").getElementsByTagName("LI");
        for (var i = 0; i < sfEls.length; i++) {
            sfEls[i].onmouseover = function() {
                this.className += " sfhover";
            }
            sfEls[i].onmouseout = function() {
                this.className = this.className.replace(new RegExp(
                    " sfhover\\b"), "");
            }
        }
    }
}
if (window.attachEvent) window.attachEvent("onload", sfHover);
if (typeof jQuery == 'function') {
    jQuery(function() {
        var $ = jQuery;
        var updateSalutationDivs = function() {
            var isInitialCall = (arguments.length == 0);
            $('select[id^=salutation]').each(function(id,
                fieldSalutation) {
                var identifier = fieldSalutation.id.substr(
                    10);
                var divPerson = $('#formFieldsForPerson' +
                    identifier);
                var divCompany = $('#formFieldsForCompany' +
                    identifier);
                var divCompany2 = $(
                    '#formFieldsForCompany2' +
                    identifier);
                var divBirthday = $(
                    '#formFieldsForBirthday' +
                    identifier);
                var fieldTitle = divPerson.find(
                    "[name$='[title]']");
                var fieldFirstName = divPerson.find(
                    "[name$='[firstname]']");
                var fieldLastName = divPerson.find(
                    "[name$='[lastname]']");
                var fieldCompany = divCompany.find(
                    "[name$='[company]']");
                var fieldContactPerson = divCompany.find(
                    '[id^=address2]');
                var fieldDay = divBirthday.find(
                    '[id^=birthday0]');
                var fieldMonth = divBirthday.find(
                    '[id^=birthday1]');
                var fieldYear = divBirthday.find(
                    '[id^=birthday2]');
                if (fieldContactPerson.size() == 0 &&
                    identifier !== '') {
                    fieldContactPerson = $('#address2' +
                        identifier);
                }
                if (divPerson.size() > 0 && divCompany.size() >
                    0 && fieldFirstName.size() > 0 &&
                    fieldLastName.size() > 0 &&
                    fieldCompany.size() > 0 &&
                    fieldContactPerson.size() > 0) {
                    var oldValCompany = fieldCompany.val();
                    var oldValContactPerson = '';
                    var oldValContactPersonCompany =
                        fieldContactPerson.val();
                    var oldValTitle = fieldTitle.val();
                    var oldValFirstName = fieldFirstName.val();
                    var oldValLastName = fieldLastName.val();
                    var oldValDay = fieldDay.val();
                    var oldValMonth = fieldMonth.val();
                    var oldValYear = fieldYear.val();
                    if (fieldSalutation.value == 5) {
                        if (!isInitialCall) {
                            oldValContactPerson =
                                fieldContactPerson.val();
                            fieldCompany.val(oldValCompany);
                            fieldContactPerson.val(
                                oldValLastName);
                            oldValTitle = fieldTitle.val();
                            oldValFirstName =
                                fieldFirstName.val();
                            oldValLastName = fieldLastName.val();
                            oldValDay = fieldDay.val();
                            oldValMonth = fieldMonth.val();
                            oldValYear = fieldYear.val();
                        }
                        fieldTitle.val('');
                        fieldLastName.val('');
                        fieldFirstName.val('');
                        fieldDay.val('');
                        fieldMonth.val('');
                        fieldYear.val('');
                        divPerson.hide();
                        divBirthday.hide();
                        divCompany.show();
                        if (divCompany2) {
                            divCompany2.show();
                        }
                    } else {
                        if (!isInitialCall) {
                            oldValContactPersonCompany =
                                fieldContactPerson.val();
                            fieldTitle.val(oldValTitle);
                            fieldFirstName.val(
                                oldValFirstName);
                            fieldLastName.val((
                                    oldValLastName ==
                                    '') ?
                                oldValContactPersonCompany :
                                oldValLastName);
                            fieldDay.val(oldValDay);
                            fieldMonth.val(oldValMonth);
                            fieldYear.val(oldValYear);
                            oldValCompany = fieldCompany.val();
                            fieldContactPerson.val(
                                oldValContactPerson);
                        }
                        fieldCompany.val('');
                        if (identifier != '_shipaddr') {
                            fieldContactPerson.val('');
                        }
                        divCompany.hide();
                        divPerson.show();
                        divBirthday.show();
                        if (divCompany2) {
                            divCompany2.hide();
                        }
                    }
                }
                if (isInitialCall) {
                    $(fieldSalutation).change(
                        updateSalutationDivs);
                }
            });
        }
        updateSalutationDivs();
    });
}

function toggleFrame5LinesWithMoreLink(openerElement) {
    var container = $(openerElement).parents('.frame5LinesWithMoreLink');
    var cLink = container.children('.opener').find('a');
    var linkNames = cLink.attr('rel').split('_');
    if (cLink.html() == linkNames[0]) {
        container.children('.hide').removeAttr('class');
    } else {
        container.children('div:first').attr('class', 'hide');
    }
    cLink.html(cLink.html() == linkNames[0] ? linkNames[1] : linkNames[0]);
}

function pushEcondaMarker(marker, skipFirstMarker) {
    var i = 0;
    if (skipFirstMarker) {
        i = 1;
    }
    for (; i < marker.length; i++) {
        var myEmospro = {};
        myEmospro.pageId = emospro.pageId;
        myEmospro.siteid = emospro.siteid;
        myEmospro.langid = emospro.langid;
        myEmospro.countryid = emospro.countryid;
        myEmospro.content = emospro.content;
        myEmospro.app = emospro.app;
        myEmospro.marker = marker[i];
        window.emosPropertiesEvent(myEmospro);
    }
}
$(document).ready(function() {
    if (window.config && config.brandId == 7) {
        automatizeBoxToggling({
            selectorContainer: '.infobox',
            selectorHeader: 'h1',
            selectorContent: 'p',
            classForOpenState: 'open',
            classForClosedState: 'close'
        });
    }
    $('.toggleContentMoreBefore').hover(function() {
        $(this).css('cursor', 'pointer');
    }, function() {
        $(this).css('cursor', 'default');
    });
    $('.toggleContentMoreBefore').click(function() {
        var linkNames = $(this).attr('rel').split('_');
        $(this).html($(this).html() == linkNames[0] ? linkNames[
            1] : linkNames[0]);
        $(this).parents('div:eq(0)').find(
            '.frame103ToggleContent').slideToggle("normal");
    });
    $('a.tooltip').cluetip({
        local: true,
        cursor: 'pointer',
        showTitle: false,
        fx: {
            open: 'show',
            openSpeed: ''
        }
    });
});

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
        />/g, '&gt;').replace(/"/g, '&quot;');
}
dmc = {}
dmc.UI = {}
dmc.UI.Stage = {}
dmc.UI.Accordion = {}
dmc.Utils = {}
dmc.Utils.Console = {}
dmc.WALZ = {}
dmc.WALZ.Search = {}
dmc.WALZ.Product = {}
dmc.WALZ.ProductList = {}
dmc.Utils.CustomEvent = function() {
    this._handlers = [];
}
dmc.Utils.CustomEvent.prototype.addHandler = function(func, obj) {
    if (typeof func == 'string') {
        func = window[func];
    }
    if (!obj) {
        obj = null;
    }
    if (typeof func == 'function') {
        this._handlers.push([func, obj]);
    }
};
dmc.Utils.CustomEvent.prototype.trigger = function(_someArgs_) {
    var retVal = null;
    for (var i = 0; i < this._handlers.length; ++i) {
        var handler = this._handlers[i];
        var func = handler[0];
        var obj = handler[1];
        if (func.apply(obj, arguments) === false) {
            retVal = false;
            break;
        }
    }
    return retVal;
};
dmc.Utils.create = function(proto) {
    function f() {};
    f.prototype = proto;
    return new f();
}
dmc.Utils.trimString = function(word) {
    word = word.replace(/^\s*(.*)/, "$1");
    word = word.replace(/(.*?)\s*$/, "$1");
    return word;
}
dmc.Utils.sortAssoc = function(aInput, sortOrder) {
    var aTemp = [];
    var aOutput = [];
    for (var sKey in aInput) {
        aTemp.push([sKey, aInput[sKey]]);
    }
    aTemp.sort(function() {
        if (sortOrder == 'asc') {
            return arguments[0][1] < arguments[1][1];
        } else if (sortOrder == 'desc') {
            return arguments[0][1] > arguments[1][1];
        }
    });
    for (var nIndex = aTemp.length - 1; nIndex >= 0; nIndex--) {
        aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];
    }
    return aOutput;
}
dmc.Utils.sortNaturalKeyAssoc = function(aInput) {
    var aOutput = [],
        key, aTemp = [];
    for (key in aInput) {
        if (aInput.hasOwnProperty(key)) {
            aTemp.push(key);
        }
    }
    aTemp.sort(function(a, b) {
        return parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(
            /\d+/)[0], 10);
    });
    for (key = 0; key < aTemp.length; key++) {
        aOutput[aTemp[key]] = aInput[aTemp[key]];
    }
    return aOutput;
}
dmc.Utils.getSortedArray = function(array) {
    var index = 0;
    var retArray = [];
    for (var key in array) {
        retArray[index] = key;
        index++;
    }
    retArray.sort(function(a, b) {
        var aa = a.split('|');
        var bb = b.split('|');
        var aNum = aa[1];
        var bNum = bb[1];
        if (!isNaN(parseFloat(aNum)) && isFinite(aNum)) {
            return (aNum - bNum);
        } else {
            return aNum < bNum ? -1 : (aNum > bNum ? 1 : 0);
        }
    });
    return retArray;
}
dmc.Utils.getSortedArrayByValue = function(aInput, sortOrder) {
    var aTemp = [];
    var aOutput = [];
    for (var sKey in aInput) {
        aTemp.push([sKey, aInput[sKey]]);
    }
    aTemp.sort(function() {
        if (sortOrder == 'asc') {
            return (arguments[0][1] - arguments[1][1]);
        } else if (sortOrder == 'desc') {
            return (arguments[1][1] - arguments[0][1]);
        }
    });
    for (var nIndex = 0; nIndex < aTemp.length; nIndex++) {
        aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];
    }
    return aOutput;
}
dmc.Utils.closeAndParentReload = function() {
    opener.setUserDataFromCookie();
    close();
}
dmc.Utils.findQueryStringParam = function(param) {
    var reQueryString = new RegExp('(?:\\?|&)' + param + '=(.*?)(?=&|$)',
        'gi');
    var rePath = new RegExp('\/' + param + '\/([^\/]+)\/', 'gi');
    var r = '',
        m;
    while ((m = reQueryString.exec(document.location.search)) != null) {
        r = m[1];
    }
    while ((m = rePath.exec(document.location.href)) != null) {
        r = m[1];
    }
    return r;
}
dmc.Utils.ArrayNotEmpty = function(aInput) {
    var returnValue = false;
    if (typeof aInput == 'array' || typeof aInput == 'object') {
        for (i in aInput) {
            returnValue = true;
            break;
        }
    }
    return returnValue;
}
dmc.Utils.Console = {
    Log: function(logText) {
        var logItem = $(document.createElement('div'));
        logItem.css('text-align', 'right');
        $('body').append(logItem);
        logItem.html(logText + ' &lt;');
    }
}
dmc.Utils.ll = {
    close: {
        '101_de': 'schlie&szlig;en',
        '102_de': 'schlie&szlig;en',
        '103_de': 'schlie&szlig;en',
        '103_fr': 'Fermer la fen&ecirc;tre',
        '104_fr': 'Fermer la fen&ecirc;tre',
        '105_it': 'Chiudi questa finestra',
        '107_nl': 'Venster sluiten',
        '111_nl': 'Venster sluiten',
        '111_fr': 'Fermer la fen&ecirc;tre'
    }
};
dmc.Utils.cookieHeader = {
    numMaxVisible: {
        'default': 1,
        '117': ''
    },
    bgColorClasses: {
        '104': 'c104',
        '111': 'c111'
    },
    main: function(hint, hintLinktext, pageId, agreement, pathImg,
        hintLinkRight, linkedString) {
        var cookieBar = this.getCookie('hideCB');
        var num = '#';
        if (cookieBar == null || cookieBar != 'hide') {
            this.setVisible(hint, hintLinktext, pageId, agreement,
                pathImg, hintLinkRight, linkedString);
            if (cookieBar != null && cookieBar.indexOf('show-') == 0) {
                num = cookieBar.substr(cookieBar.lastIndexOf('-') + 1);
            }
            if (isNaN(num)) {
                var numMaxVisibleLoc = (this.numMaxVisible[window.config
                    .clientPk] ? this.numMaxVisible[window.config
                    .clientPk] : this.numMaxVisible['default']);
                this.setCookieView('show' + (numMaxVisibleLoc != '' ?
                    '-' + numMaxVisibleLoc : ''));
            } else if (num == 1) {
                this.setCookieView('hide');
            } else {
                this.setCookieView('show-' + (num - 1));
            }
        }
    },
    getCookie: function(xName) {
        var nameEQ = xName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return (unescape(c.substring(nameEQ.length, c.length)));
            }
        }
        return null;
    },
    setCookieView: function(view) {
        $.cookie('hideCB', view, {
            path: '/'
        });
    },
    setVisible: function(hint, hintLinktext, pageId, agreement, pathImg,
        hintLinkRight, linkedString) {
        if (typeof linkedString != "undefined" && linkedString != "") {
            hint = hint.replace(linkedString, '<a href="' + pageId +
                '">' + linkedString + '</a>');
        }
        $('#chmain').append('<p class="left">' + hint +
            (hintLinkRight != true ? ' &nbsp;<a href="' + pageId +
                '">' + hintLinktext + '</a>' : '') + '</p>');
        $('#chmain').append('<p class="right">' +
            (agreement != "" ? '<a href="javascript: void(0);">' +
                agreement + '</a> &nbsp;' : '') +
            (hintLinkRight == true ? '<a href="' + pageId + '">' +
                hintLinktext + '</a> ' : '') +
            '<a href="javascript: void(0);"><img id="close" src="' +
            pathImg + '" /></a></p>');
        if (this.bgColorClasses[window.config.clientPk]) {
            $('#cookieheader').addClass(this.bgColorClasses[window.config
                .clientPk]);
        }
        $('#cookieheader').css('display', 'block');
        $('#chmain p.right a').click(function() {
            $(this).parent().parent().parent().slideUp(500,
                function() {
                    dmc.Utils.cookieHeader.setCookieView(
                        'hide');
                });
        });
    }
};
var naviLayerHtml = null;
var activeNav = -1;
var activeTopNav = -1;
try {
    var _w = Math.max($(window).width(), $(window).height());
    var _h = Math.min($(window).width(), $(window).height());
} catch (err) {
    var _w = 0;
    var _h = 0;
}
var tabletView = (_w >= 1000 && _h >= 600);

function toggle(obj, imgpath) {
    obj.src = imgpath;
}

function naviClick(url) {
    if (isTablet()) {
        return false;
    } else {
        window.location = url;
    }
}

function topNaviToggle() {
    if (!isTablet()) {
        $('.tnlButton').mouseenter(function() {
            getLayer = this.id.split('_');
            $('#' + getLayer[1]).css('display', 'block');
            if ($('#' + getLayer[1]).width() + $('#' + getLayer[1]).offset()
                .left > $('body').width()) {
                $('#' + getLayer[1]).css('left', 'auto');
                $('#' + getLayer[1]).css('right', '-10px');
            }
        });
        $('.tnlButton').mouseleave(function() {
            $('#' + getLayer[1]).css('display', 'none');
            $('#' + getLayer[1]).mouseenter(function() {
                $('#trigger_' + getLayer[1]).addClass('sfhover');
                $(this).css('display', 'block');
            });
            $('#' + getLayer[1]).mouseleave(function(e) {
                if ((e.relatedTarget == null) || (navigator.appVersion
                        .search('MSIE') > 0 && !$(this).hasClass(
                            e.fromElement.className))) {
                    return false;
                }
                $('#trigger_' + getLayer[1]).removeClass(
                    'sfhover');
                $(this).css('display', 'none');
                $('#' + getLayer[1]).unbind();
            });
        });
    } else {
        var imageCloseButtonPath =
            '/cache/fileadmin_templates_BABY_baby_global_img_icons_ic_close.gif';
        var closeButton = $('<img class="groupNaviFlyoutCloseButton" src="' +
            imageCloseButtonPath + '" />');
        closeButton.click(function() {
            $('#' + getLayer[1]).css('display', 'none');
            $('#trigger_' + getLayer[1]).removeClass('sfhover');
            $('#' + getLayer[1]).unbind();
            activeTopNav = -1;
        });
        $('.tnlButton').find('> a').attr('href', '#');
        $('.topNaviMenu').each(function() {
            $(this).append(closeButton.clone(true));
        });
        $('.tnlButton').click(function() {
            getLayer = this.id.split('_');
            if (activeTopNav != getLayer[1]) {
                $('.tnlButton').removeClass('sfhover');
                $('#' + activeTopNav).css('display', 'none');
                $('#trigger_' + getLayer[1]).addClass('sfhover');
                $('#' + getLayer[1]).css('display', 'block');
                if ($('#' + getLayer[1]).width() + $('#' + getLayer[1])
                    .offset().left > $('body').width()) {
                    $('#' + getLayer[1]).css('left', 'auto');
                    $('#' + getLayer[1]).css('right', '-10px');
                }
                activeTopNav = getLayer[1];
            } else {
                $('#' + getLayer[1]).css('display', 'none');
                $('#trigger_' + getLayer[1]).removeClass('sfhover');
                $('#' + getLayer[1]).unbind();
                activeTopNav = -1;
            }
        });
    }
}

function toggleButton() {
    $('.submitButton').mouseover(function() {
        var rel = $(this).attr('rel');
        var tmpArr = Array();
        tmpArr = rel.split('###');
        $(this).attr('src', tmpArr[1]);
    });
    $('.submitButton').mouseout(function() {
        var rel = $(this).attr('rel');
        var tmpArr = Array();
        tmpArr = rel.split('###');
        $(this).attr('src', tmpArr[0]);
    });
}

function toggleDiv() {
    $('.toggle').click(function() {
        var rel = $(this).attr('rel');
        $(this).toggleClass('ic_minus');
        $('#' + rel).slideToggle('slow');
    });
}

function seoBoxToggle(el) {
    var elementID = el.attr('id');
    var naturalHeight = $(('#' + elementID) + ' > .seoBoxContent')[0].offsetHeight;
    var tLink = $(el).next().next();
    tLink.toggle(function() {
        $(el).animate({
            height: naturalHeight
        }, function() {
            var tmp = tLink.attr('rel');
            tLink.attr('rel', tLink.html());
            tLink.html(tmp);
        });
    }, function() {
        $(el).animate({
            height: window["seoBoxHeight" + elementID]
        }, function() {
            var tmp = tLink.attr('rel');
            tLink.attr('rel', tLink.html());
            tLink.html(tmp);
        });
    });
}

function ucfirst(str) {
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}
var Stage = {
    Timeout: 2,
    Count: 1,
    Direction: 1,
    Carousel: [],
    countElements: 0,
    Init: function() {
        $('#stage-carousel span.cTypo3').remove();
        $('#stage-carousel li').each(function(index, item) {
            $(item).attr("data-index", index + 1);
            Stage.Count++;
        });
        $('#stage-carousel li[data-index=1]').addClass('active');
        $('#stage-carousel li[data-index=1]').append(
            '<span class="arrow"></span>');
        $('#stage li').eq(0).addClass('active');
        $('#stage-carousel').jcarousel({
            vertical: true,
            scroll: 1,
            start: $('#stage-carousel li').length,
            auto: Stage.Timeout,
            wrap: 'circular',
            initCallback: Stage.Timeout > 0 ? Stage.initCallback : null,
            itemVisibleInCallback: {
                onAfterAnimation: Stage.refreshActiveItem
            }
        });
        var jCarouselPrev = $('.jcarousel-prev');
        var jCarouselNext = $('.jcarousel-next');
        jCarouselPrev.bind('click', function() {
            Stage.Direction = -1;
        });
        jCarouselNext.bind('click', function() {
            Stage.Direction = 1;
        });
        $('#stage-carousel li').hover(function() {
            if (!$(this).has('span').length) {
                $('#stage-carousel li').stop(true, true).removeClass(
                    'active');
                $(this).addClass('active');
            }
        }, function() {
            $('#stage-carousel li').stop(true, true).removeClass(
                'active');
            $('#stage-carousel li').each(function() {
                if ($(this).has('span').length) {
                    $(this).addClass('active');
                }
            });
        }).click(function() {
            $('span.arrow').remove();
            $('#stage li').removeClass('active');
            $('#stage-carousel li').removeClass('active');
            var index = $(this).attr('data-index');
            $(this).addClass('active');
            $(this).append('<span class="arrow"></span>');
            $('#stage li').eq(index - 1).addClass('active');
            return false;
        });
        if (isTablet()) {
            var stage = document.getElementById('stageContainer');
            var hammertime = new Hammer(stage, {
                drag_max_touches: 0
            });
            Hammer(stage).on('swiperight dragright', function(ev) {
                jCarouselNext.click();
            });
            Hammer(stage).on('swipeleft dragleft', function(ev) {
                jCarouselPrev.click();
            });
        }
    },
    refreshActiveItem: function(carousel, item, idx, state) {
        $('span.arrow').remove();
        $('#stage li').removeClass('active');
        var oldIndex = $('#stage-carousel li.active').attr('data-index');
        $('#stage-carousel li').removeClass('active');
        $('#stage li').css('display', 'none');
        var index = $(item).attr('data-index');
        if (Stage.Direction == 1) {
            var newIndex = parseInt(index) - 1;
            if (newIndex == 0)
                newIndex = Stage.Count - 1;
        } else {
            var newIndex = parseInt(index) + 1;
            if (newIndex == Stage.Count)
                newIndex = 1;
            Stage.Direction = 1;
        }
        $('#stage-carousel li[data-index=' + newIndex + ']').addClass(
            'active');
        $('#stage-carousel li[data-index=' + newIndex + ']').append(
            '<span class="arrow"></span>');
        $('#stage li').eq(newIndex - 1).addClass('active');
    },
    initCallback: function(carousel) {
        carousel.clip.hover(function() {
            carousel.stopAuto();
        }, function() {
            carousel.startAuto();
        });
    }
}
var Lazyload = {
    CurrentPage: 0,
    MaxCalls: 0,
    init: 0,
    ratio: 0,
    Complete: false,
    Busy: false,
    Json: null,
    OnPageComplete: null,
    Active: false,
    FlushCache: false,
    CachedPages: 0,
    CurrentLink: null,
    OnLazyLoadFlushCache: null,
    _cacheItemTotalCount: 0,
    _cache: new Array(),
    FetchProducts: function() {
        if (!Lazyload.Complete && (!Lazyload.Busy) && isNaN(Lazyload.MaxCalls) ===
            false) {
            if (Lazyload.Json.maxView == 'all') {
                Lazyload.Json.maxView = Lazyload.Json.totalItems;
            }
            if (Lazyload.MaxCalls === false || Lazyload.MaxCalls === 0) {
                Lazyload.Complete = true;
                Lazyload.RemoveScrollEvent();
            } else {
                Lazyload.MaxCalls--;
                var queryStringColl = null;
                if (dmc.WALZ.Search.FilterUrl !== "") {
                    var filterUrl = dmc.WALZ.Search.FilterUrl.substring(
                        dmc.WALZ.Search.FilterUrl.indexOf('?'), dmc
                        .WALZ.Search.FilterUrl.length);
                }
                if (typeof(filterUrl) !== 'undefined' && filterUrl !==
                    '') {
                    filterUrl = filterUrl.substring(1);
                    queryStringColl = new Array();
                    var kvPairs = filterUrl.split('&');
                    for (var i = 0; i < kvPairs.length; i++) {
                        var kvPair = kvPairs[i].split('=');
                        queryStringColl[kvPair[0]] = kvPair[1];
                    }
                }
                var nextlink = Lazyload.CurrentLink;
                var key;
                for (key in queryStringColl) {
                    if (queryStringColl.hasOwnProperty(key) && nextlink
                        .indexOf(queryStringColl[key]) === -1) {
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                            "?") + key + "=" + queryStringColl[key];
                    }
                }
                if (nextlink.match(/filter/gi)) {
                    if (nextlink.match(/search/gi)) {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?productsPerPage=\d{1,4}/gi, '');
                        nextlink = nextlink.replace(/\.0\./gi, '.10.');
                        nextlink = nextlink.replace(/\.a\d{1,3}\./gi,
                            '.' + Lazyload.Json.ajaxPageAlias + '.'
                        );
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                            "?") + 'lazy=1';
                    } else {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?productsPerPage=\d{1,4}/gi, '');
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                                "?") + 'id=' + Lazyload.Json.ajaxPageAlias +
                            '&type=10&lazy=1';
                        nextlink = nextlink.replace(/\.html\?$/gi,
                            '.html');
                    }
                    nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                            "?") + Lazyload.Json.ajaxPageParameter +
                        '=' + Lazyload.Json.nextLazyLoadedPage +
                        '&productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest;
                } else {
                    if (nextlink.match(
                            /\/group\/\d{1,20}\/(.*)\.0\.html/gi) && !(
                            nextlink.match(/(.*).a\d{1,5}\.0\.html/gi) ||
                            nextlink.match(/(.*).a\d{1,5}\.11\.html/gi)
                        )) {
                        nextlink = nextlink.replace(
                            /(page)(\/)(\d+)(\/)/gi, '');
                        nextlink = nextlink.replace(
                            /productsPerPage=\d{1,4}/gi,
                            'productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest
                        );
                        nextlink = nextlink.replace('group/', Lazyload.Json
                            .ajaxPageParameter + "/" + Lazyload.Json
                            .nextLazyLoadedPage + "/" + 'group/');
                        nextlink = nextlink.replace(
                            /[^\.]+\.[^\.]+\.html/, Lazyload.Json.ajaxPageAlias +
                            'http://baby-walz.de/.10.html');
                    } else if (nextlink.match(/\/[a-z0-9\-\/]*\.html/gi)) {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /productsPerPage=\d{1,4}/gi,
                            'productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest
                        );
                        nextlink = nextlink.replace(/(&)?page=\d{1,4}/g,
                            '');
                        nextlink = nextlink.replace(
                            /(&)?type=\d{1,2}/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?id=[a-z0-9]*/gi, '');
                        nextlink = nextlink.replace(/\.html\?$/gi,
                            '.html');
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                                "?") + Lazyload.Json.ajaxPageParameter +
                            '=' + Lazyload.Json.nextLazyLoadedPage +
                            '&type=10&lazy=1&id=' + Lazyload.Json.ajaxPageAlias;
                    } else if (nextlink.match(
                            /\/index.php\?id=[a-z0-9]*(&)?/gi)) {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /productsPerPage=\d{1,4}/gi,
                            'productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest
                        );
                        nextlink = nextlink.replace(
                            /(&)?mb3_wersch=[a-z0-9]{1,6}/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?zlg=[a-z0-9]{1,3}/gi, '');
                        nextlink = nextlink.replace(/(&)?wtr=\d{1,3}/gi,
                            '');
                        nextlink = nextlink.replace(
                            /(&)?mb3_partner_param=[a-z0-9]*/gi, ''
                        );
                        nextlink = nextlink.replace(
                            /(&)?mb3_partner=[a-z0-9]*/gi, '');
                        nextlink = nextlink.replace(/(&)?page=\d{1,4}/g,
                            '');
                        nextlink = nextlink.replace(
                            /(&)?type=\d{1,2}/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?id=[a-z0-9]*/gi, '');
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                                "?") + Lazyload.Json.ajaxPageParameter +
                            '=' + Lazyload.Json.nextLazyLoadedPage +
                            '&type=10&lazy=1&id=' + Lazyload.Json.ajaxPageAlias;
                    } else if ((nextlink.match(
                            /(.*).a\d{1,5}\.0\.html/gi)) || (nextlink.match(
                            /(.*).a\d{1,5}\.11\.html/gi))) {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?productsPerPage=\d{1,4}/gi, '');
                        nextlink = nextlink.replace(
                            /(page)(\/)(\d+)(\/)/g, '');
                        nextlink = nextlink.replace(/(&)?page=\d{1,4}/g,
                            '');
                        nextlink = nextlink.replace(
                            /(&)?type=\d{1,2}/gi, '');
                        nextlink = nextlink.replace(/\.0\./gi, '.10.');
                        nextlink = nextlink.replace(/\.a\d{1,3}\./gi,
                            '.' + Lazyload.Json.ajaxPageAlias + '.'
                        );
                        nextlink = nextlink.replace(/\.html\?$/gi,
                            '.html');
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                                "?") + Lazyload.Json.ajaxPageParameter +
                            '=' + Lazyload.Json.nextLazyLoadedPage +
                            '&productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest +
                            '&lazy=1';
                    } else if (nextlink.match(
                            /(.*).g\d{1,9}\.0\.html/gi)) {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /productsPerPage=\d{1,4}/gi,
                            'productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest
                        );
                        nextlink = nextlink.replace(/(&)?page=\d{1,4}/g,
                            '');
                        nextlink = nextlink.replace(
                            /(&)?type=\d{1,2}/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?id=[a-z0-9]*/gi, '');
                        nextlink = nextlink.replace(/\.html\?$/gi,
                            '.html');
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                                "?") + Lazyload.Json.ajaxPageParameter +
                            '=' + Lazyload.Json.nextLazyLoadedPage +
                            '&type=10&lazy=1&id=' + Lazyload.Json.ajaxPageAlias;
                    } else if (nextlink.match(
                            /(.*).gi\d{1,9}\.0\.html/gi)) {
                        nextlink = nextlink.replace(
                            /(&)?show=(\d{1,4}|all)/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?productsPerPage=\d{1,4}/gi,
                            'productsPerPage=' + Lazyload.Json.lazyloadedProductsPerRequest
                        );
                        nextlink = nextlink.replace(/(&)?page=\d{1,4}/g,
                            '');
                        nextlink = nextlink.replace(
                            /(&)?type=\d{1,2}/gi, '');
                        nextlink = nextlink.replace(
                            /(&)?id=[a-z0-9]*/gi, '');
                        nextlink = nextlink.replace(/\.html\?$/gi,
                            '.html');
                        nextlink += ((nextlink.indexOf("?") >= 0) ? "&" :
                                "?") + Lazyload.Json.ajaxPageParameter +
                            '=' + Lazyload.Json.nextLazyLoadedPage +
                            '&type=10&lazy=1&id=' + Lazyload.Json.ajaxPageAlias;
                    }
                }
                $.ajax({
                    type: 'GET',
                    url: nextlink,
                    success: function(html) {
                        if (Lazyload.MaxCalls === 0) {
                            $('#loadingImg').hide();
                        }
                        var newRows = $(html).find(Lazyload
                            .Json.listContainer +
                            ' .prodLine');
                        $(Lazyload.Json.listContainer).append(
                            newRows);
                        Lazyload.ParseScript(html);
                        if (Lazyload.MaxCalls === 0) {
                            $("img").trigger("unveil");
                        }
                        Lazyload.Busy = false;
                        if (Lazyload.OnPageComplete) {
                            Lazyload.OnPageComplete()
                        }
                    }
                });
                Lazyload.Json.nextLazyLoadedPage++;
            }
        }
        Lazyload.Busy = true;
    },
    ParseScript: function(_source) {
        var source = _source;
        var scripts = new Array();
        if (source != "") {
            while (source.indexOf("<script") > -1 || source.indexOf(
                    "</script") > -1) {
                var s = source.indexOf("<script");
                var s_e = source.indexOf(">", s);
                var e = source.indexOf("</script", s);
                var e_e = source.indexOf(">", e);
                scripts.push(source.substring(s_e + 1, e));
                source = source.substring(0, s) + source.substring(e_e +
                    1);
            }
            for (var i = 0; i < scripts.length; i++) {
                try {
                    eval(scripts[i]);
                } catch (ex) {
                    return;
                }
            }
        }
    },
    AddScrollEvent: function(configContainer) {
        $(window).bind('scroll', function() {
            if ($(document).scrollTop() > $(Lazyload.Json.listContainer)
                .height() - Lazyload.Json.threshold) {
                Lazyload.FetchProducts();
            }
        });
    },
    RemoveScrollEvent: function() {
        $(window).unbind('scroll');
    },
    AppendScrollAnchors: function(toCopy, target) {
        var copyContainer = $(toCopy);
        $(toCopy).remove();
        $(target).append(copyContainer);
        copyContainer.css('display', 'block');
    }
}
var Utils = {
    ParsePopupParams: function(parameters) {
        var paramObj = {
            Width: 800,
            Height: 500,
            Scrolling: true
        }
        var paramsList = parameters.split(',');
        for (i = 0; i < paramsList.length; i++) {
            var keyValue = paramsList[i].split('=');
            switch (keyValue[0]) {
                case 'width':
                    {
                        paramObj.Width = parseInt(keyValue[1]);
                        break;
                    }
                case 'height':
                    {
                        paramObj.Height = parseInt(keyValue[1]);
                        break;
                    }
                case 'scrollbars':
                    {
                        paramObj.Scrolling = ((keyValue[1] == '0' ||
                            keyValue[1] == 'no') ? false : true);
                        break;
                    }
            }
        }
        return paramObj;
    },
    InputHint: function() {
        $('input[data-hint], textarea[data-hint]').each(function(_,
            element) {
            var caption = $(element).attr("data-hint");
            $(element).addClass('datahint');
            $(element).focus(function() {
                if ($(element).val() == caption) {
                    $(element).val('');
                }
                if ($(element).get(0).tagName ==
                    'textarea' && $(element).text() ==
                    caption) {
                    $(element).text('');
                }
                $(element).removeClass('datahint');
            });
            $(element).blur(function() {
                if ($(element).val() == '') {
                    $(element).val(caption);
                    $(element).addClass('datahint');
                }
                if ($(element).get(0).tagName ==
                    'textarea' && $(element).text() ==
                    '') {
                    $(element).text(caption);
                    $(element).addClass('datahint');
                }
            });
            if ($(element).val() == '') {
                $(element).val(caption);
                $(element).addClass('datahint');
            }
            if ($(element).get(0).tagName == 'textarea' && $(
                    element).text() == '') {
                $(element).text(caption);
                $(element).addClass('datahint');
            }
            if ($(element).val() != caption && $(element).val() !=
                '') {
                $(element).removeClass('datahint');
            }
            if ($(element).get(0).tagName == 'textarea' && $(
                    element).text() != caption) {
                $(element).removeClass('datahint');
            }
        });
        $('form').bind('submit', function() {
            $('input[data-hint], textarea[data-hint]').each(
                function(_, element) {
                    var caption = $(element).attr(
                        "data-hint");
                    if ($(element).val() == caption) {
                        $(element).val('');
                    }
                    if ($(element).get(0).tagName ==
                        'textarea' && $(element).text() ==
                        caption) {
                        $(element).text('');
                    }
                });
        });
    },
    GetWindowHeight: function() {
        if (typeof(window.innerWidth) == 'number') {
            return window.innerHeight;
        } else if (document.documentElement && (document.documentElement
                .clientHeight)) {
            return document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientHeight)) {
            return document.body.clientHeight;
        }
        return 0;
    },
    GetWindowScrollY: function() {
        var scrollY = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollY = document.documentElement.scrollTop;
        } else if (document.body && document.body.scrollTop) {
            scrollY = document.body.scrollTop;
        } else if (window.pageYOffset) {
            scrollY = window.pageYOffset;
        } else if (window.scrollY) {
            scrollY = window.scrollY;
        }
        return scrollY;
    },
    ToggleContainerPositionScrollTop: function() {
        if (typeof $('.navContainer').get(0) != undefined && $(
                '#jsLazyloadanchors').css('display') == 'block') {
            var thresholdTop = $('.navContainer').offset() ? ($(
                        '.navContainer').height() + $('.navContainer').offset()
                    .top + $('#jsLazyloadanchors').height() + 10) : $(
                    '.navContainer').height() + $('#jsLazyloadanchors')
                .height() + 10;
            var thresholdBottom = ($('body').height() - $('#scrollHide')
                .height() - $('#footerGfx').height() - $(
                    '#footerHead').height());
        }
    },
    AppendFlyout: function(html) {
        var naviContainer = $(document.createElement('div'));
        naviContainer.append($(html));
        $("html").click(function() {
            if (!mouseOverMainNavi && !mouseOverFlyout) {
                mainNaviClose();
            }
        });
        $('.groupNavi ul.groupNaviLevel1 > li').each(function(i,
            element) {
            $(element).find('div').append(naviContainer.find(
                '#navLayerContainer' + i.toString()));
            var closeMenu = function() {
                $('#navLayerContainer' + i.toString()).parent()
                    .css('display', 'none');
                $(element).removeClass('hover');
                activeNav = -1;
            };
            var navItemWidth = $('#navLayerContainer' + i.toString())
                .attr('itemprop');
            $(element).find('> a').css('width', navItemWidth +
                'px');
            var hasSubMenu = true;
            if ($(element).find('.groupNaviFlyout').children().length ==
                0) {
                hasSubMenu = false;
            }
            if (isTablet() && hasSubMenu) {
                var imageCloseButtonPath =
                    '/cache/fileadmin_templates_BABY_baby_global_img_icons_ic_close.gif';
                var closeButton = $(
                    '<img class="groupNaviFlyoutCloseButton" src="' +
                    imageCloseButtonPath + '" />');
                closeButton.click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    mainNaviClose();
                });
                $(element).find('.groupNaviFlyout').append(
                    closeButton);
                var currentLink = $(element).find('> a');
                $(currentLink).click(function(event) {
                    if (i == activeNav) {
                        $('#navLayerContainer' + i.toString())
                            .parent().css('display',
                                'none');
                        $(element).removeClass('hover');
                        activeNav = -1;
                    } else {
                        $('.groupNaviFlyout').css(
                            'display', 'none');
                        $('.groupNavi ul li').removeClass(
                            'hover');
                        $('#navLayerContainer' + i.toString())
                            .parent().css('display',
                                'block');
                        $(element).addClass('hover');
                        activeNav = i;
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    checkHover();
                });
                $('#navLayerContainer' + i.toString()).click(
                    function() {
                        if (activeNav != i) {
                            $('.groupNaviFlyout').css(
                                'display', 'none');
                            $('.groupNavi ul li').removeClass(
                                'hover');
                            $('#navLayerContainer' + i.toString())
                                .parent().css('display',
                                    'block');
                            activeNav = i;
                        } else {
                            $('#navLayerContainer' + i.toString())
                                .parent().css('display',
                                    'none');
                            activeNav = -1;
                        }
                    });
            } else {
                var inner = 0;
                $(element).hover(function() {
                    inner = 0;
                    setTimeout(function() {
                        if (inner == 0) {
                            $(
                                '#navLayerContainer' +
                                i.toString()
                            ).parent().css(
                                'display',
                                'block');
                            $(element).addClass(
                                'hover');
                            inner = 1;
                        }
                    }, 300);
                }, function() {
                    $('#navLayerContainer' + i.toString())
                        .parent().css('display', 'none');
                    $(element).removeClass('hover');
                    inner = -1;
                });
                $('#navLayerContainer' + i.toString()).hover(
                    function() {
                        $('#navLayerContainer' + i.toString())
                            .parent().css('display',
                                'block');
                        inner = 1;
                    },
                    function() {
                        $('#navLayerContainer' + i.toString())
                            .parent().css('display', 'none');
                        inner = -1;
                    });
            }
        });
    },
    AppendCompareGroupFlyout: function(html) {
        var naviContainer = $('.navigation > ul li:eq(2)');
        naviContainer.after($(html));
        naviContainer.hover(function() {
            inner = 0;
            setTimeout(function() {
                if (inner == 0) {
                    naviContainer.show();
                    inner = 1;
                }
            }, 300);
        }, function() {
            inner = -1;
        });
        naviContainer.hover(function() {
            $(this).show();
            inner = 1;
        }, function() {
            inner = -1;
        });
    },
    CheckFrameContent: function(object, callback) {
        if ($(object).contents().find('div').get(0) != null) {
            if (callback)
                callback();
        } else {
            setTimeout(function() {
                Utils.CheckFrameContent(object, callback);
            }, 500);
        }
    },
    checkPersonalChars: function(string) {
        var returnValue = true;
        strPattern = /[^\x20-\xFF]/;
        if (string.search(strPattern) != -1) {
            returnValue = false;
        }
        return returnValue;
    },
    fCut: function(stringData, words) {
        if (typeof stringData != 'undefined') {
            return (stringData.split(' ', words).join(' ') + '...');
        } else {
            return '';
        }
    },
    FormatAnchors: function() {
        $('a[onclick*="openWindow"], a[onclick*="alertLayer"]').each(
            function(i, element) {
                $(element).attr('href', 'javascript:void(0);');
            });
        $('a[href*="window.print()"]').removeAttr('target');
    },
    GetParam: function(s) {
        var qs = document.location.search;
        qs = qs.split("+").join(" ");
        var param;
        var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            if (tokens[1] == s) {
                param = decodeURIComponent(tokens[2]);
            }
        }
        return param;
    },
    FillEmptyCarouselItemsUpTo: function(selector, count) {
        var length = $(selector + ' li').length;
        if (length < count) {
            for (var i = 1; i <= count - length; i++) {
                var emptyCarouselItem = $(document.createElement('li'));
                emptyCarouselItem.addClass('empty');
                if (i == count - length)
                    emptyCarouselItem.addClass('last');
                $(selector).append(emptyCarouselItem);
            }
        }
    },
    GetRandom: function(min, max) {
        if (min > max) {
            return (-1);
        }
        if (min == max) {
            return (min);
        }
        return (min + parseInt(Math.random() * (max - min + 1)))
    },
    parseTwitterDate: function(date) {
        var tmp = date.split(' ');
        var days = {
            'Mon': 'Montag',
            'Tue': 'Dienstag',
            'Wed': 'Mittwoch',
            'Thu': 'Donnerstag',
            'Fri': 'Freitag',
            'Sat': 'Samstag',
            'Sun': 'Sontag'
        };
        var months = {
            'Jan': '1',
            'Feb': '2',
            'Mar': '3',
            'Apr': '4',
            'May': '5',
            'Jun': '6',
            'Jul': '7',
            'Aug': '8',
            'Sep': '9',
            'Oct': '10',
            'Nov': '11',
            'Dec': '12'
        };
        return days[tmp[0]] + ', ' + tmp[2] + '.' + months[tmp[1]] +
            '.' + tmp[5];
    },
    ClearCarouselContainer: function(selector) {
        var bkp = $(selector + ' ul');
        $(selector + ' .jcarousel-container').remove();
        $(selector + ' .jcarousel-clip').remove();
        $(selector + ' .jcarousel-item').remove();
        $(selector).append(bkp);
    },
    FancySelect: function(wrapperId, noSort, noSortAlt, trigger, callee,
        param) {
        if ($('#' + wrapperId).data('initialized') != true) {
            var mySelect = $('<div class="selectWrapper"></div>');
            mySelect.append('<div class="selectedButton"><a></a></div>');
            mySelect.append(
                '<div class="selectedList" style="display:none"><ul></ul></div>'
            );
            var mySelectLink = mySelect.find('.selectedButton > a');
            var myOptions = mySelect.find('.selectedList > ul');
            mySelectLink.click(function() {
                mySelect.find('.selectedList').animate({
                    height: 'toggle'
                }, 200);
            });
            myOptions.hover(function() {}, function() {
                mySelectLink.trigger('click');
            });
            $('#' + wrapperId).after(mySelect);
            $('#' + wrapperId).data('initialized', true);
            $('#' + wrapperId + ' > option').each(function() {
                var that = this;
                if ($(this).attr('selected')) {
                    mySelectLink.html($(this).html() == noSort ?
                        noSortAlt : $(this).html());
                }
                var myClass = $(this).html() == noSort ?
                    ' class="noSort"' : '';
                if (typeof trigger === "undefined") {
                    var myLi = $('<li ' + myClass +
                        '><a href="' + $(this).attr('value') +
                        '">' + $(this).html() + '</a></li>'
                    );
                    myLi.click(function() {
                        mySelectLink.html($(that).html() ==
                            noSort ? noSortAlt : $(
                                that).html());
                        mySelectLink.trigger('click');
                        mySelectLink.unbind('click');
                    });
                } else {
                    var myLi = $('<li ' + myClass +
                        '><a href="javascript:void(0);">' +
                        $(this).html() + '</a></li>');
                    var url = $(this).attr('value');
                    myLi.click(function() {
                        var fn = window[callee];
                        if (typeof fn === 'function') {
                            if (typeof param ===
                                "undefined") {
                                fn(url);
                            } else {
                                fn(url, param);
                            }
                        }
                    });
                }
                myOptions.append(myLi);
            });
        }
    },
    elementInViewPort: function(el) {
        if (el instanceof jQuery) {
            el = el[0];
        }
        var dimensions = el.getBoundingClientRect();
        return (dimensions.top >= 0 && dimensions.left >= 0 &&
            dimensions.bottom <= (window.innerHeight || document.documentElement
                .clientHeight) && dimensions.right <= (window.innerWidth ||
                document.documentElement.clientWidth));
    }
}
var Zoomr = {
    ImageRootUrl: '',
    ImageList: '',
    LL: {},
    _currentItemIndex: 0,
    Init: function() {
        Zoomr._createErezView();
        Zoomr._createImageList();
        Zoomr._createCloseButton();
        $('#dmc_zoomr_flash').html('');
    },
    _createErezView: function() {
        var imagesArray = Zoomr.ImageList.split('|');
        if (typeof Utils.GetParam('item') != 'undefined')
            Zoomr._currentItemIndex = parseInt(Utils.GetParam('item'));
        erezview_create('http://zoom2.walz.de/erez', imagesArray[Zoomr._currentItemIndex],
            2000, 2000, 256, '&tmp=ajax-viewer', 600, 600);
        $(document).ready(function() {
            var zoomCanvas = $('#dmc_zoomr > table').find(
                'table td > div');
            var zoomControls = $('#dmc_zoomr').find('a[title]');
            var zoomControlsContainer = $(
                '<div id="zoomrControls"></div>');
            $('#dmc_zoomr > table').remove();
            $('#dmc_zoomr').append(zoomCanvas);
            $(zoomControlsContainer).append(zoomControls);
            $('#dmc_zoomr').append(zoomControlsContainer);
            $('#popup').css('padding', '0');
            $('#popup').css('margin', '0');
        });
    },
    _createImageList: function() {
        var imagesArray = Zoomr.ImageList.split('|');
        var topContainer = $('<div id="zoomrTopContainer"></div>')
        var imageListContainer = $('<div id="zoomrImgList"></div>')
        var logo = $('<div id="logo"></div>');
        var imageListUlContainer = $('<ul></ul>')
        $('#dmc_zoomr').parent().parent().css('padding', 0).css(
            'background-color', '#FFF')
        $('#dmc_zoomr').append(topContainer);
        var offsetWidth = 0;
        var index;
        var maxlength = 6;
        maxlength = imagesArray.length < maxlength ? imagesArray.length :
            maxlength;
        for (var i = 0; i < maxlength; i++) {
            var li = $('<li></li>');
            if (Zoomr._currentItemIndex == i)
                li.addClass('active');
            var img = $(
                '<img src="http://zoom.walz.de/fsicache/erezplain?tmp=552_baby&src=' +
                imagesArray[i] + '" />');
            offsetWidth += 72;
            index = i;
            (function(i) {
                img.bind('click', function() {
                    var frame = $(parent.document.body).find(
                        '#fancybox-frame');
                    frame.attr('src', frame.attr('src') +
                        '&item=' + i);
                });
            })(index);
            $(li).append(img);
            $(imageListUlContainer).append(li);
            $(imageListUlContainer).css('width', offsetWidth);
        }
        $(imageListContainer).append(logo);
        $(imageListContainer).append(imageListUlContainer);
        $(topContainer).append(imageListContainer);
    },
    _createCloseButton: function() {
        var fbClose = $(parent.document.body).find('#fancybox-close');
        fbClose.remove();
        var closeButton = $('<a id="zoomrCloseBtn"><span>' + Zoomr.LL.CLOSE +
            '</span></a>');
        closeButton.attr('href', 'javascript:void(0);');
        closeButton.addClass('button1');
        closeButton.bind('click', function() {
            parent.$.fancybox.close();
        });
        $('#dmc_zoomr').append(closeButton);
    }
}
var TabBox = {
    UpdateTabs: function(selector) {
        var tabs = $(selector).find('> ul li');
        var contents = $(selector).find('> :not(:first)').find('> div');
        tabs.each(function(i, elem) {
            if (contents.get(i) != null) {
                var content = $(contents.get(i));
                if (content.html().replace(
                        /<(img|object|embed)\s+[^>]*>/g, '*').replace(
                        /<[^>]*>|&nbsp;/g, '').replace(
                        /^\s+|\s+$/g, '') !== '') {
                    $(tabs.get(i)).removeClass('hide').show();
                } else {
                    $(tabs.get(i)).hide();
                    content.hide();
                }
            }
        });
        var active = $(selector).find('> ul').find(
            '.active:visible:first');
        if (active.size() == 0) {
            active = $(tabs.filter(':visible:first'));
        }
        activeIdx = 0;
        tabs.each(function(i, elem) {
            if (elem == active.get(0)) {
                activeIdx = i;
            }
        });
        active.css('cursor', 'default');
        tabs.not(active).css('cursor', 'pointer');
        var activeContent = $(contents.get(activeIdx));
        contents.not(activeContent).hide();
        activeContent.removeClass('hide').show();
        var carousels = $(contents.get(activeIdx)).find('.carousel').not(
            '.carouselActivated');
        activeContent.find('.carousel').addClass('carouselActivated');
        $(".carousel").tinycarousel({
            display: 4,
            intervaltime: 0,
            duration: 500
        });
        $(".carousel .buttons").bind('click', function() {
            $(this).parent().removeClass('prev').removeClass(
                'next').removeClass('disable');
            $(this).hasClass('disable') ? $(this).parent().addClass(
                $(this).attr('class')) : false;
        });
    },
    ApplyActiveTabByIndex: function(index, selector) {
        $(selector).find('> ul li').removeClass('active').addClass(
            'inactive');
        $(selector).find('> ul li').removeClass('inactive').eq(index -
            1).addClass('active');
        TabBox.UpdateTabs(selector);
    },
    AddEventListener: function(event, selector) {
        $(selector).find('> ul li').bind(event, function() {
            $(selector).find('> ul li').removeClass('active').addClass(
                'inactive');
            $(this).removeClass('inactive').addClass('active');
            TabBox.UpdateTabs(selector);
        });
        TabBox.ApplyActiveTabByIndex(1, selector);
    }
}
var Accordion = {
    Init: function(selector) {
        var accElements = $(selector).children();
        $(selector).find('> div:first').addClass('first');
        $(selector).find('> div:last').addClass('last');
        accElements.each(function(i, element) {
            if (!$(element).hasClass('opened')) {
                $(element).addClass('closed');
            } else {
                var elementAccChildElements = $(element).find(
                    '> :not(:first)');
                $(elementAccChildElements).css('display',
                    'block');
            }
            var header = $(element).find('.csc-textpicHeader');
            if (header.get(0) != null) {
                $(element).find('.csc-textpicHeader').remove();
                var childElements = $(element).children();
                $(element).children().remove();
                $(element).append(header);
                $(element).append(childElements);
            }
            var allOtherAccChildElements = $(element).find(
                '> :not(:first):not(:last)');
            if (!$(element).hasClass('opened')) {
                allOtherAccChildElements.css('display', 'none');
            }
        });
    },
    ApplyActiveItemByIndex: function(index, selector) {
        $(selector).find('> div').removeClass('opened').addClass(
            'closed');
        $(selector).find('> div').eq(index - 1).removeClass('closed').addClass(
            'opened');
        var allOtherAccChildElements = $(selector).find('> div').eq(
            index - 1).find(' :not(:first):not(:last)');
        allOtherAccChildElements.slideDown('slow');
    },
    AddEventListener: function(event, selector) {
        var accElements = $(selector).children();
        accElements.each(function(i, element) {
            $(element).find(':first, :last').bind(event,
                function() {
                    var allOtherAccChildElements = $(
                        element).find(
                        '> :not(:first):not(:last)');
                    if ($(element).hasClass('closed')) {
                        $(element).removeClass('closed').addClass(
                            'opened');
                        allOtherAccChildElements.slideDown(
                            'slow',
                            function() {
                                Utils.ToggleContainerPositionScrollTop();
                            });
                    } else {
                        $(element).removeClass('opened').addClass(
                            'closed');
                        allOtherAccChildElements.slideUp(
                            'slow',
                            function() {
                                Utils.ToggleContainerPositionScrollTop();
                            });
                    }
                    return false;
                });
        });
    }
}
var toggleContent = function(el) {
    $(el).parent().next().slideToggle('fast');
    $(el).parent().toggleClass('open');
};
$(document).ready(function() {
    anchor = location.href.split("#")[1];
    if (anchor != '' && anchor != undefined) {
        $('#' + anchor + '+h4').children().first().trigger('onclick');
    }
});
dmc.WALZ.Search = {
    SelectedFilters: [],
    Instance: null,
    FilterUrl: ""
};
var Checklist = {
    Create: false,
    Init: function(selector, checked) {
        var sourceContainer;
        var nativeInput;
        var FF = $.browser;
        if (Checklist.Create) {
            sourceContainer = $(selector);
        } else {
            sourceContainer = $(selector).parent();
            nativeInput = $(selector).parent().find('input');
            $(selector).parent().find('input').remove();
        }
        var itemContentTmp = $(sourceContainer).html();
        $(sourceContainer).html('');
        var container = $(document.createElement('div'));
        container.addClass('imageCheckbox');
        var newContent = $(document.createElement('span'));
        newContent.html(itemContentTmp);
        $(sourceContainer).append(container);
        $(sourceContainer).append(newContent);
        if (Checklist.Create) {
            var nativeInput = $(document.createElement('input'));
            nativeInput.attr('type', 'checkbox');
            $(container).append(nativeInput);
        } else {
            $(container).append(nativeInput);
        }
        var chkImg = $(document.createElement('img'));
        $(container).append(chkImg);
        if ($(container).find('input').attr('checked') || checked) {
            $(chkImg).addClass('checked');
            var imgSrc = $(chkImg).css('background-image').replace(
                'url(', '').replace(')', '');
            imgSrc = imgSrc.replace(/"/g, '');
            $(chkImg).attr('src', imgSrc);
        }
        if (checked) {
            $(container).find('input').attr('checked', 'true');
        }
        var imgSrc = $(chkImg).css('background-image').replace('url(',
            '').replace(')', '');
        imgSrc = imgSrc.replace(/"/g, '');
        chkImg.attr('src', imgSrc);
        chkImg.bind('click', function() {
            var input = $(this).prev();
            if (!$(this).hasClass('checked')) {
                $(this).addClass('checked');
                var imgSrc = $(this).css('background-image').replace(
                    'url(', '').replace(')', '');
                imgSrc = imgSrc.replace(/"/g, '');
                $(this).attr('src', imgSrc);
                input.attr('checked', 'true');
            } else {
                $(this).removeClass('checked');
                var imgSrc = $(this).css('background-image').replace(
                    'url(', '').replace(')', '');
                imgSrc = imgSrc.replace(/"/g, '');
                $(this).attr('src', imgSrc);
                input.removeAttr('checked');
            }
        });
    },
    BindResetLink: function(selector) {
        $(selector).bind('click', function() {
            $('.checked').each(function(i, element) {
                var input = $(this).prev();
                input.removeAttr('checked');
                $(element).removeClass('checked');
                var imgSrc = $(this).css(
                    'background-image').replace(
                    'url(', '').replace(')', '');
                imgSrc = imgSrc.replace(/"/g, '');
                $(this).attr('src', imgSrc);
            });
            return false;
        });
    },
    SetState: function(selector) {
        var tmpArr = new Array();
        $(selector).each(function(_, element) {
            var checked = $(element).find('input').attr(
                'checked');
            tmpArr.push(checked ? true : false);
        });
        var cookieData = cookie_get('mb3pc');
        if (cookieData && typeof cookieData != 'undefined') {
            var data = JSON.parse(cookieData);
            if (data) {
                data.checkListState = tmpArr;
                cookieDataUpdated = JSON.stringify(data);
                cookie_set('mb3pc', cookieDataUpdated, '', '/');
            }
        }
    },
    GetState: function(selector) {},
    ResetState: function(selector) {
        var cookieData = cookie_get('mb3pc');
        if (cookieData && typeof cookieData != 'undefined') {
            var data = JSON.parse(cookieData);
            if (data && data.checkListState) {
                data.checkListState = null;
                cookieDataUpdated = JSON.stringify(data);
                cookie_set('mb3pc', cookieDataUpdated, '', '/');
            }
        }
    }
}
var isMobile = false;
var alertLayer = function(type, href, content, height, width, scrolling,
    textConf, noCenterOnScroll, callback) {
    var isInIframe = (self.location != top.location);
    if (scrolling == null || scrolling == 'auto') {
        scrolling = true;
    }
    var fancyProps = {
        'width': width,
        'height': height,
        'type': type,
        'content': content,
        'scrolling': scrolling ? 'auto' : 'no',
        'href': href,
        'autoScale': false,
        'autoDimensions': false,
        'centerOnScroll': noCenterOnScroll ? false : true,
        'padding': 0,
        'opacity': 1,
        'onComplete': function() {
            if (isInIframe) {
                fancyboxDisableParent();
            }
            if (callback) {
                callback();
            }
        }
    };
    if (isInIframe) {
        fancyProps.onClosed = function() {
            fancyboxEnableParent();
        }, fancyProps.centerOnScroll = true;
    }
    if (isMobile) {
        fancyProps.centerOnScroll = false;
    }
    $.fancybox(fancyProps);
    $('#fancybox-close').html((textConf && textConf.closeText) ? textConf.closeText :
        dmc.Utils.ll.close[jsClientIdLangId]);
}
var confirmed = false;
var alertLayerConfirm = function(textConf, callbackYes, callbackNo) {
    confirmed = false;
    var isInIframe = (self.location != top.location);
    var noBtn = '';
    if (textConf.no != '') {
        noBtn =
            '<a href="javascript:void(0)" id="confirmNo" class="button2"><span>' +
            textConf.no + '</span></a>'
    }
    var fancyProps = {
        width: 'auto',
        height: 'auto',
        type: 'html',
        content: '<div class="confirm">' + (textConf.headline ? '<b>' +
                textConf.headline + '</b>' : '') +
            '<div class="confirmMessage"><p>' + textConf.text + '</p>' +
            '<div class="formButtons">' + noBtn +
            '<a href="javascript:void(0)" id="confirmYes" class="button2"><span>' +
            textConf.yes + '</span></a></div></div></div>',
        scrolling: 'no',
        'centerOnScroll': true,
        'padding': 0
    };
    if (isInIframe) {
        fancyProps.hideOnOverlayClick = false;
        fancyProps.showCloseButton = false;
        fancyProps.enableEscapeButton = false;
        fancyProps.onComplete = fancyboxDisableParent;
    }
    if (isMobile) {
        fancyProps.centerOnScroll = false;
    }
    fancyProps.onClosed = function() {
        if (confirmed == true) {
            if (callbackYes) {
                callbackYes();
            }
        }
    }
    $.fancybox(fancyProps);
    $('#confirmYes').bind('click', function() {
        fancyboxEnableParent();
        $.fancybox.close();
        if (callbackYes) {
            confirmed = true;
        }
    });
    $('#confirmNo').bind('click', function() {
        if (callbackNo) {
            confirmed = false;
            callbackNo();
        }
        fancyboxEnableParent();
        $.fancybox.close();
    });
    $('#fancybox-close').html((textConf && textConf.closeText) ? textConf.closeText :
        dmc.Utils.ll.close[jsClientIdLangId]);
}
var fancyboxDisableParent = function() {
    parent.$('#fancybox-close').css('display', 'none');
    parent.$('#fancybox-outer').css('background-color', '#d1d1d1');
    parent.$('#fancybox-overlay').unbind('click');
    document.body.scroll = "no";
    parent.document.body.scroll = "no";
    parent.$('#fancybox-frame').attr('scrolling', 'no');
}
var fancyboxEnableParent = function() {
    parent.$('#fancybox-close').css('display', 'block');
    parent.$('#fancybox-outer').css('background-color', '#ffffff');
    parent.$('#fancybox-overlay').bind(function() {
        $.fancybox.close();
    });
    document.body.scroll = "auto";
    parent.document.body.scroll = "auto";
    parent.$('#fancybox-frame').attr('scrolling', 'auto');
}
var fancyBoxLayerSubmit = function(height, width, scrolling, formSelector,
    textConf, noHttps) {
    if (scrolling == null || scrolling == 'auto') {
        scrolling = true;
    }
    $.fancybox({
        'width': width,
        'height': height,
        'type': 'iframe',
        'content': '',
        'type': 'iframe',
        'scrolling': scrolling ? 'auto' : 'no',
        'href': 'about:blank',
        'centerOnScroll': true,
        'padding': 0
    });
    if (isMobile) {
        fancyProps.centerOnScroll = false;
    }
    $('#fancybox-close').html((textConf && textConf.closeText) ? textConf.closeText :
        dmc.Utils.ll.close[jsClientIdLangId]);
    setTimeout(function() {
        var form = $(formSelector);
        if (noHttps) {
            form.attr('action', form.attr('action').replace(
                'https:', 'http:'));
        };
        form.attr('target', $('#fancybox-frame').attr('name'));
        form.get(0).submit();
    }, 300);
    return false;
}

function getLastRow() {
    $("tr.tableCount:last").addClass('lastRow');
    $("tr.features:last").addClass('lastRow');
    $("tr.productRow:last").addClass('lastRow');
}
var Socializer = {
    fbData: '',
    fbEl: '#socializerFb',
    twData: '',
    twEl: '#socializerTw',
    blData: '',
    blEl: '#socializerBl',
    init: function(confObj) {
        var that = this;
        $.each(confObj, function(index, value) {
            that[index] = value;
        });
        this.fetchFbData(this.fbData);
        this.fetchTwData(this.twData);
        this.fetchBlData(this.blData);
    },
    fetchFbData: function(url) {
        var that = this;
        var url =
            'http://baby-walz.de/fileadmin/scripts/rssProxy.php?feed=' +
            url;
        var jData;
        var limit = 4;
        var cur = 0;
        var jItems;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            success: function(data) {
                var html = '';
                jData = $(data);
                jItems = jData.find("item");
                jItems.each(function() {
                    if (cur < limit) {
                        html += '<li>';
                        html += '<a href="' + $(
                                this).find('link').text() +
                            '" target="_blank">babywalz</a>';
                        html += '<br/>' +
                            str_replace('\n\n',
                                '<br/>', $(this).find(
                                    'description').text()
                            );
                        html += '</li>';
                    };
                    cur++;
                });
                if (html) {
                    html = '<ul>' + html + '</ul>';
                    $(that.fbEl).html(html);
                    $(that.fbEl).parent().css('display',
                        'block');
                    $(that.fbEl).parent().parent().find(
                        '.socialLoading').css('display',
                        'none');
                };
            }
        });
    },
    fetchTwData: function(url) {
        var that = this;
        var url = url;
        $.getJSON(url + '&callback=?', function(json) {
            var html = '';
            var ptr;
            for (var i = 0; i < 4; i++) {
                ptr = json[i];
                html += '<li>';
                html +=
                    '<a href="http://twitter.com/babywalz_news" target="_blank">' +
                    Utils.parseTwitterDate(ptr.created_at) +
                    '</a>';
                html += '<br/>' + str_replace('\n\n', '<br/>',
                    Utils.fCut(ptr.text, 9));
                html += '</li>';
            };
            if (html) {
                html = '<ul>' + html + '</ul>';
                $(that.twEl).html(html);
                $(that.twEl).parent().css('display', 'block');
                $(that.twEl).parent().parent().find(
                    '.socialLoading').css('display', 'none');
            };
        });
    },
    fetchBlData: function(url) {
        var that = this;
        var url =
            'http://baby-walz.de/fileadmin/scripts/rssProxy.php?feed=' +
            url;
        var jData;
        var limit = 4;
        var cur = 0;
        var jItems;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            success: function(data) {
                var html = '';
                jData = $(data);
                jItems = jData.find("item");
                jItems.each(function() {
                    if (cur < limit) {
                        html += '<li>';
                        html += '<a href="' + $(
                                this).find('link').text() +
                            '" target="_blank">' +
                            Utils.fCut($(this).find(
                                    'title').text(),
                                5) + '</a>';
                        html += '<br/>' +
                            str_replace('\n\n',
                                '<br/>', Utils.fCut(
                                    $(this).find(
                                        'description'
                                    ).text(), 9));
                        html += '</li>';
                    };
                    cur++;
                });
                if (html) {
                    html = '<ul>' + html + '</ul>';
                    $(that.blEl).html(html);
                    $(that.blEl).parent().css('display',
                        'block');
                    $(that.blEl).parent().parent().find(
                        '.socialLoading').css('display',
                        'none');
                };
            }
        });
    }
};

function toggleFrame5LinesWithMoreLink(openerElement) {
    var container = $(openerElement).parents('.frame5LinesWithMoreLink');
    var cLink = container.children('.opener').find('a');
    var linkNames = cLink.attr('rel').split('_');
    if (cLink.html() == linkNames[0]) {
        container.children('.hidden').removeAttr('class');
    } else {
        container.children('div:first').attr('class', 'hidden');
    }
    cLink.html(cLink.html() == linkNames[0] ? linkNames[1] : linkNames[0]);
}

function openWindow(url, target, parameters) {
    var paramObj = Utils.ParsePopupParams(parameters);
    alertLayer('iframe', url, '', paramObj.Height, paramObj.Width, paramObj.Scrolling);
}

function loadSubgroupNavi() {
    if (typeof ajaxNaviURL != "undefined") {
        $.ajax({
            type: "GET",
            url: ajaxNaviURL,
            dataType: "html",
            beforeSend: function() {},
            success: function(data) {
                var nContainer = $(document.createElement('div'));
                nContainer.html(data);
                try {
                    if (typeof naviLayerHtml != "undefined") {
                        Utils.AppendFlyout(naviLayerHtml);
                    }
                } catch (e) {}
            }
        });
    }
}
if ($(location).attr('hash') == '#continue') {
    $(document).bind('mobileinit', function() {
        $.mobile.hashListeningEnabled = false;
        $.mobile.linkBindingEnabled = false;
    });
}
$(document).ready(function() {
    $(
        '.tabnav span.cTypo3, .featureTeaserInner span.cTypo3, ul span.cTypo3'
    ).remove();
    if ($('body').hasClass('homePage')) {
        if (typeof $('#stage-carousel').get(0) != 'undefined' && typeof $(
                '#stage-carousel:visible').get(0) != 'undefined') {
            Stage.Timeout = 5;
            Stage.Init();
        }
        if (typeof $('#brandSlider').get(0) != 'undefined') {
            $('#brandSlider a').prepend('<span>&nbsp;</span>');
            $('#brandSlider li').each(function() {
                $(this).css('width', $(this).find('img').attr(
                    'width'));
            });
            $('#brandSlider').jcarousel({
                scroll: 6,
                auto: Stage.Timeout,
                wrap: 'circular',
                animation: 1500
            });
        }
    } else if ($('body').hasClass('categoryLandingPages') || $('body').hasClass(
            'productOverviewPage')) {
        if (typeof $('#stage-carousel').get(0) != 'undefined' && typeof $(
                '#stage-carousel:visible').get(0) != 'undefined') {
            Stage.Timeout = 5;
            Stage.Init();
        }
        if (typeof $('#brandSlider').get(0) != 'undefined') {
            $('#brandSlider a').prepend('<span>&nbsp;</span>');
            $('#brandSlider li').each(function() {
                $(this).css('width', $(this).find('img').attr(
                    'width'));
            });
            $('#brandSlider').jcarousel({
                scroll: 4,
                auto: Stage.Timeout,
                wrap: 'circular',
                animation: 1500
            });
        }
        if (window.addEventListener) {
            window.addEventListener('scroll', Utils.ToggleContainerPositionScrollTop);
        } else if (window.attachEvent) {
            window.attachEvent('scroll', Utils.ToggleContainerPositionScrollTop);
        }
        Utils.ToggleContainerPositionScrollTop();
    } else if ($('body').hasClass('basket') || $('body').hasClass(
            'basketStep10')) {
        getLastRow();
    } else {
        if (typeof $('#popup .checklistRed').get(0) == 'undefined') {
            Checklist.ResetState();
        }
        $('.checklistRed li').each(function(i, element) {
            var checkliststates;
            var cookieData = cookie_get('mb3pc');
            if (cookieData && typeof cookieData != 'undefined') {
                var data = JSON.parse(cookieData);
                if (data && data.checkListState && data.checkListState
                    .length > 0) {
                    checkliststates = data.checkListState;
                }
            }
            Checklist.Create = true;
            if (checkliststates && checkliststates.length > 0 &&
                checkliststates[i]) {
                Checklist.Init(element, true);
            } else {
                Checklist.Init(element);
            }
        });
        if (typeof $('.checklistRed').get(0) != 'undefined') {
            $('.functionBar .print a').bind('click', function() {
                Checklist.SetState('.checklistRed li');
            });
        }
        if ($('ul#crosssellingTargetContainer li').length >= 1) {
            $('.carouselVert').jcarousel({
                vertical: true,
                scroll: 1
            });
        }
    }
    if ($('div#scrollArea div.groupNavi').is(':visible')) {
        loadSubgroupNavi();
    }
    $('.equalHeight').equalHeights();
    topNaviToggle();
    toggleButton();
    toggleDiv();
    $('.tabnav').each(function(_, element) {
        TabBox.AddEventListener('click', element);
    });
    $('.featureTeaserInner').each(function(_, element) {
        TabBox.AddEventListener('mouseover', element);
    });
    $('.accordion').each(function(_, element) {
        Accordion.Init(element);
        Accordion.AddEventListener('click', element);
    });
    Utils.InputHint();
    Utils.FormatAnchors();
    $('a.tooltip').cluetip({
        local: true,
        cursor: 'pointer',
        showTitle: false,
        fx: {
            open: 'show',
            openSpeed: ''
        }
    });
    $('.formField input, .formField select, .formField textarea').focus(
        function() {
            $(this).closest('.formField').addClass('formFieldHover');
        });
    $('.formField input, .formField select, .formField textarea').blur(
        function() {
            $(this).closest('.formField').removeClass(
                'formFieldHover');
        });
    $('.equalHeight').equalHeights();
    if ($('#stageContainer .stageCarouselArea')) {
        if ($('#stageContainer .stageCarouselArea .stageCarousel li').length >
            1) {
            Stage.Carousel = $('#stageContainer .stageCarouselArea').jcarousel({
                scroll: 1,
                wrap: 'circular',
                auto: 5,
                itemVisibleInCallback: {
                    onAfterAnimation: adaptPager
                }
            });
        } else {
            Stage.Carousel = $('#stageContainer .stageCarouselArea').jcarousel({
                scroll: 0,
                wrap: 'circular',
                auto: 5,
                itemVisibleInCallback: {
                    onAfterAnimation: adaptPager
                }
            });
        }
        var width = $(
            '#stageContainer .stageCarouselArea .jcarousel-clip ul li'
        ).length * 26;
        $('#stageContainer .stageCarouselArea').append(
            '<div class="jcarousel-pagination"><ul style="width: ' +
            width + 'px;"></ul></div>');
        for (var count = 0; count < $(
                '#stageContainer .stageCarouselArea .jcarousel-clip ul li'
            ).length; ++count) {
            $(
                '#stageContainer .stageCarouselArea .jcarousel-pagination ul'
            ).append(
                '<li class="jcarousel-page" onclick="jCarouselScrollTo(' +
                count + ');"></li>');
        }
        if ($(
                '#stageContainer .stageCarouselArea .jcarousel-pagination ul li'
            ).length > 1) {
            $(
                '#stageContainer .stageCarouselArea .jcarousel-pagination li'
            ).eq(1).addClass('jcarousel-page-active');
        } else {
            $(
                '#stageContainer .stageCarouselArea .jcarousel-pagination li:first'
            ).addClass('jcarousel-page-active');
        }
        $(
            '#stageContainer .stageCarouselArea .jcarousel-prev-horizontal'
        ).removeAttr('style');
        $(
            '#stageContainer .stageCarouselArea .jcarousel-next-horizontal'
        ).removeAttr('style');
        Stage.countElements = $(
            '#stageContainer .stageCarouselArea .jcarousel-pagination li'
        ).length;
    }
});

function jCarouselScrollTo(index) {
    var lastIndex = $('#stageContainer .jcarousel-clip li').last().attr(
        'jcarouselindex');
    var newIndex = Math.floor(lastIndex / Stage.countElements) * Stage.countElements +
        index;
    if (newIndex > lastIndex) {
        newIndex -= Stage.countElements;
    }
    Stage.Carousel.jcarousel('scroll', newIndex);
}

function adaptPager(carousel, item, pos, state) {
    var index = pos % Stage.countElements;
    if ($(carousel.container).children('.jcarousel-pagination').children('ul').children(
            'li').length > 0) {
        $(carousel.container).children('.jcarousel-pagination').children('ul').children(
            'li').removeClass('jcarousel-page-active');
        $(carousel.container).children('.jcarousel-pagination').children('ul').children(
            'li').eq(index).addClass('jcarousel-page-active');
    }
}

function clearDataHints() {
    $('input[data-hint], textarea[data-hint]').each(function(_, element) {
        var caption = $(element).attr("data-hint");
        if ($(element).val() == caption) {
            $(element).val('');
        }
        if ($(element).get(0).tagName == 'textarea' && $(element).text() ==
            caption) {
            $(element).text('');
        }
    });
}

function isTablet() {
    return 'ontouchstart' in document.documentElement;
}

function checkHover() {
    var ul = $('.groupNavi ul');
    var liHover = ul.find('li.hover');
    if (liHover.length && !liHover.find('a.current').length) {
        ul.addClass('hover');
    } else {
        ul.removeClass('hover');
    }
}
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 &
                    63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 &
                    63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
(function(i) {
    var q = {
            vertical: false,
            rtl: false,
            start: 1,
            offset: 1,
            size: null,
            scroll: 3,
            visible: null,
            animation: "normal",
            easing: "swing",
            auto: 0,
            wrap: null,
            initCallback: null,
            reloadCallback: null,
            itemLoadCallback: null,
            itemFirstInCallback: null,
            itemFirstOutCallback: null,
            itemLastInCallback: null,
            itemLastOutCallback: null,
            itemVisibleInCallback: null,
            itemVisibleOutCallback: null,
            buttonNextHTML: "<div></div>",
            buttonPrevHTML: "<div></div>",
            buttonNextEvent: "click",
            buttonPrevEvent: "click",
            buttonNextCallback: null,
            buttonPrevCallback: null,
            itemFallbackDimension: null
        },
        r = false;
    i(window).bind("load.jcarousel", function() {
        r = true
    });
    i.jcarousel = function(a, c) {
        this.options = i.extend({}, q, c || {});
        this.autoStopped = this.locked = false;
        this.buttonPrevState = this.buttonNextState = this.buttonPrev =
            this.buttonNext = this.list = this.clip = this.container =
            null;
        if (!c || c.rtl === undefined) this.options.rtl = (i(a).attr(
                "dir") || i("html").attr("dir") || "").toLowerCase() ==
            "rtl";
        this.wh = !this.options.vertical ? "width" : "height";
        this.lt = !this.options.vertical ? this.options.rtl ? "right" :
            "left" : "top";
        for (var b = "", d = a.className.split(" "), f = 0; f < d.length; f++)
            if (d[f].indexOf("jcarousel-skin") != -1) {
                i(a).removeClass(d[f]);
                b = d[f];
                break
            }
        if (a.nodeName.toUpperCase() == "UL" || a.nodeName.toUpperCase() ==
            "OL") {
            this.list = i(a);
            this.container = this.list.parent();
            if (this.container.hasClass("jcarousel-clip")) {
                if (!this.container.parent().hasClass(
                        "jcarousel-container")) this.container = this.container
                    .wrap("<div></div>");
                this.container = this.container.parent()
            } else if (!this.container.hasClass("jcarousel-container"))
                this.container = this.list.wrap("<div></div>").parent()
        } else {
            this.container = i(a);
            this.list = this.container.find("ul,ol").eq(0)
        }
        b !== "" && this.container.parent()[0].className.indexOf(
            "jcarousel-skin") == -1 && this.container.wrap(
            '<div class=" ' + b + '"></div>');
        this.clip = this.list.parent();
        if (!this.clip.length || !this.clip.hasClass("jcarousel-clip"))
            this.clip = this.list.wrap("<div></div>").parent();
        this.buttonNext = i(".jcarousel-next", this.container);
        if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !==
            null) this.buttonNext = this.clip.after(this.options.buttonNextHTML)
            .next();
        this.buttonNext.addClass(this.className("jcarousel-next"));
        this.buttonPrev = i(".jcarousel-prev", this.container);
        if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !==
            null) this.buttonPrev = this.clip.after(this.options.buttonPrevHTML)
            .next();
        this.buttonPrev.addClass(this.className("jcarousel-prev"));
        this.clip.addClass(this.className("jcarousel-clip")).css({
            overflow: "hidden",
            position: "relative"
        });
        this.list.addClass(this.className("jcarousel-list")).css({
            overflow: "hidden",
            position: "relative",
            top: 0,
            margin: 0,
            padding: 0
        }).css(this.options.rtl ? "right" : "left", 0);
        this.container.addClass(this.className("jcarousel-container")).css({
            position: "relative"
        });
        !this.options.vertical && this.options.rtl && this.container.addClass(
            "jcarousel-direction-rtl").attr("dir", "rtl");
        var j = this.options.visible !== null ? Math.ceil(this.clipping() /
            this.options.visible) : null;
        b = this.list.children("li");
        var e = this;
        if (b.size() > 0) {
            var g = 0,
                k = this.options.offset;
            b.each(function() {
                e.format(this, k++);
                g += e.dimension(this, j)
            });
            this.list.css(this.wh, g + 100 + "px");
            if (!c || c.size === undefined) this.options.size = b.size()
        }
        this.container.css("display", "block");
        this.buttonNext.css("display", "block");
        this.buttonPrev.css("display", "block");
        this.funcNext = function() {
            e.next()
        };
        this.funcPrev = function() {
            e.prev()
        };
        this.funcResize = function() {
            e.reload()
        };
        this.options.initCallback !== null && this.options.initCallback(
            this, "init");
        if (!r && i.browser.safari) {
            this.buttons(false, false);
            i(window).bind("load.jcarousel", function() {
                e.setup()
            })
        } else this.setup()
    };
    var h = i.jcarousel;
    h.fn = h.prototype = {
        jcarousel: "0.2.7"
    };
    h.fn.extend = h.extend = i.extend;
    h.fn.extend({
        setup: function() {
            this.prevLast = this.prevFirst = this.last = this.first =
                null;
            this.animating = false;
            this.tail = this.timer = null;
            this.inTail = false;
            if (!this.locked) {
                this.list.css(this.lt, this.pos(this.options.offset) +
                    "px");
                var a = this.pos(this.options.start, true);
                this.prevFirst = this.prevLast = null;
                this.animate(a, false);
                i(window).unbind("resize.jcarousel", this.funcResize)
                    .bind("resize.jcarousel", this.funcResize)
            }
        },
        reset: function() {
            this.list.empty();
            this.list.css(this.lt, "0px");
            this.list.css(this.wh, "10px");
            this.options.initCallback !== null && this.options.initCallback(
                this, "reset");
            this.setup()
        },
        reload: function() {
            this.tail !== null && this.inTail && this.list.css(
                this.lt, h.intval(this.list.css(this.lt)) +
                this.tail);
            this.tail = null;
            this.inTail = false;
            this.options.reloadCallback !== null && this.options
                .reloadCallback(this);
            if (this.options.visible !== null) {
                var a = this,
                    c = Math.ceil(this.clipping() / this.options
                        .visible),
                    b = 0,
                    d = 0;
                this.list.children("li").each(function(f) {
                    b += a.dimension(this, c);
                    if (f + 1 < a.first) d = b
                });
                this.list.css(this.wh, b + "px");
                this.list.css(this.lt, -d + "px")
            }
            this.scroll(this.first, false)
        },
        lock: function() {
            this.locked = true;
            this.buttons()
        },
        unlock: function() {
            this.locked = false;
            this.buttons()
        },
        size: function(a) {
            if (a !== undefined) {
                this.options.size = a;
                this.locked || this.buttons()
            }
            return this.options.size
        },
        has: function(a, c) {
            if (c === undefined || !c) c = a;
            if (this.options.size !== null && c > this.options.size)
                c = this.options.size;
            for (var b = a; b <= c; b++) {
                var d = this.get(b);
                if (!d.length || d.hasClass(
                        "jcarousel-item-placeholder")) return
                false
            }
            return true
        },
        get: function(a) {
            return i(".jcarousel-item-" + a, this.list)
        },
        add: function(a, c) {
            var b = this.get(a),
                d = 0,
                f = i(c);
            if (b.length === 0) {
                var j, e = h.intval(a);
                for (b = this.create(a);;) {
                    j = this.get(--e);
                    if (e <= 0 || j.length) {
                        e <= 0 ? this.list.prepend(b) : j.after(
                            b);
                        break
                    }
                }
            } else d = this.dimension(b);
            if (f.get(0).nodeName.toUpperCase() == "LI") {
                b.replaceWith(f);
                b = f
            } else b.empty().append(c);
            this.format(b.removeClass(this.className(
                "jcarousel-item-placeholder")), a);
            f = this.options.visible !== null ? Math.ceil(this.clipping() /
                this.options.visible) : null;
            d = this.dimension(b, f) - d;
            a > 0 && a < this.first && this.list.css(this.lt, h
                .intval(this.list.css(this.lt)) - d + "px");
            this.list.css(this.wh, h.intval(this.list.css(this.wh)) +
                d + "px");
            return b
        },
        remove: function(a) {
            var c = this.get(a);
            if (!(!c.length || a >= this.first && a <= this.last)) {
                var b = this.dimension(c);
                a < this.first && this.list.css(this.lt, h.intval(
                    this.list.css(this.lt)) + b + "px");
                c.remove();
                this.list.css(this.wh, h.intval(this.list.css(
                    this.wh)) - b + "px")
            }
        },
        next: function() {
            this.tail !== null && !this.inTail ? this.scrollTail(
                false) : this.scroll((this.options.wrap ==
                    "both" || this.options.wrap == "last") &&
                this.options.size !== null && this.last ==
                this.options.size ? 1 : this.first + this.options
                .scroll)
        },
        prev: function() {
            this.tail !== null && this.inTail ? this.scrollTail(
                true) : this.scroll((this.options.wrap ==
                    "both" || this.options.wrap == "first") &&
                this.options.size !== null && this.first ==
                1 ? this.options.size : this.first - this.options
                .scroll)
        },
        scrollTail: function(a) {
            if (!(this.locked || this.animating || !this.tail)) {
                this.pauseAuto();
                var c = h.intval(this.list.css(this.lt));
                c = !a ? c - this.tail : c + this.tail;
                this.inTail = !a;
                this.prevFirst = this.first;
                this.prevLast = this.last;
                this.animate(c)
            }
        },
        scroll: function(a, c) {
            if (!(this.locked || this.animating)) {
                this.pauseAuto();
                this.animate(this.pos(a), c)
            }
        },
        pos: function(a, c) {
            var b = h.intval(this.list.css(this.lt));
            if (this.locked || this.animating) return b;
            if (this.options.wrap != "circular") a = a < 1 ? 1 :
                this.options.size && a > this.options.size ?
                this.options.size : a;
            for (var d = this.first > a, f = this.options.wrap !=
                    "circular" && this.first <= 1 ? 1 : this.first,
                    j = d ? this.get(f) : this.get(this.last),
                    e = d ? f : f - 1, g = null, k = 0, l =
                    false, m = 0; d ? --e >= a : ++e < a;) {
                g = this.get(e);
                l = !g.length;
                if (g.length === 0) {
                    g = this.create(e).addClass(this.className(
                        "jcarousel-item-placeholder"));
                    j[d ? "before" : "after"](g);
                    if (this.first !== null && this.options.wrap ==
                        "circular" && this.options.size !==
                        null && (e <= 0 || e > this.options.size)
                    ) {
                        j = this.get(this.index(e));
                        if (j.length) g = this.add(e, j.clone(
                            true))
                    }
                }
                j = g;
                m = this.dimension(g);
                if (l) k += m;
                if (this.first !== null && (this.options.wrap ==
                        "circular" || e >= 1 && (this.options.size ===
                            null || e <= this.options.size))) b =
                    d ? b + m : b - m
            }
            f = this.clipping();
            var p = [],
                o = 0,
                n = 0;
            j = this.get(a - 1);
            for (e = a; ++o;) {
                g = this.get(e);
                l = !g.length;
                if (g.length === 0) {
                    g = this.create(e).addClass(this.className(
                        "jcarousel-item-placeholder"));
                    j.length === 0 ? this.list.prepend(g) : j[d ?
                        "before" : "after"](g);
                    if (this.first !== null && this.options.wrap ==
                        "circular" && this.options.size !==
                        null && (e <= 0 || e > this.options.size)
                    ) {
                        j = this.get(this.index(e));
                        if (j.length) g = this.add(e, j.clone(
                            true))
                    }
                }
                j = g;
                m = this.dimension(g);
                if (m === 0) throw Error(
                    "jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."
                );
                if (this.options.wrap != "circular" && this.options
                    .size !== null && e > this.options.size) p.push(
                    g);
                else if (l) k += m;
                n += m;
                if (n >= f) break;
                e++
            }
            for (g = 0; g < p.length; g++) p[g].remove();
            if (k > 0) {
                this.list.css(this.wh, this.dimension(this.list) +
                    k + "px");
                if (d) {
                    b -= k;
                    this.list.css(this.lt, h.intval(this.list.css(
                        this.lt)) - k + "px")
                }
            }
            k = a + o - 1;
            if (this.options.wrap != "circular" && this.options
                .size && k > this.options.size) k = this.options
                .size;
            if (e > k) {
                o = 0;
                e = k;
                for (n = 0; ++o;) {
                    g = this.get(e--);
                    if (!g.length) break;
                    n += this.dimension(g);
                    if (n >= f) break
                }
            }
            e = k - o + 1;
            if (this.options.wrap != "circular" && e < 1) e = 1;
            if (this.inTail && d) {
                b += this.tail;
                this.inTail = false
            }
            this.tail = null;
            if (this.options.wrap != "circular" && k == this.options
                .size && k - o + 1 >= 1) {
                d = h.margin(this.get(k), !this.options.vertical ?
                    "marginRight" : "marginBottom");
                if (n - d > f) this.tail = n - f - d
            }
            if (c && a === this.options.size && this.tail) {
                b -= this.tail;
                this.inTail = true
            }
            for (; a-- > e;) b += this.dimension(this.get(a));
            this.prevFirst = this.first;
            this.prevLast = this.last;
            this.first = e;
            this.last = k;
            return b
        },
        animate: function(a, c) {
            if (!(this.locked || this.animating)) {
                this.animating = true;
                var b = this,
                    d = function() {
                        b.animating = false;
                        a === 0 && b.list.css(b.lt, 0);
                        if (!b.autoStopped && (b.options.wrap ==
                                "circular" || b.options.wrap ==
                                "both" || b.options.wrap ==
                                "last" || b.options.size ===
                                null || b.last < b.options.size ||
                                b.last == b.options.size && b.tail !==
                                null && !b.inTail)) b.startAuto();
                        b.buttons();
                        b.notify("onAfterAnimation");
                        if (b.options.wrap == "circular" && b.options
                            .size !== null)
                            for (var f = b.prevFirst; f <= b.prevLast; f++)
                                if (f !== null && !(f >= b.first &&
                                        f <= b.last) && (f < 1 ||
                                        f > b.options.size)) b.remove(
                                    f)
                    };
                this.notify("onBeforeAnimation");
                if (!this.options.animation || c === false) {
                    this.list.css(this.lt, a + "px");
                    d()
                } else this.list.animate(!this.options.vertical ?
                    this.options.rtl ? {
                        right: a
                    } : {
                        left: a
                    } : {
                        top: a
                    }, this.options.animation, this.options
                    .easing, d)
            }
        },
        startAuto: function(a) {
            if (a !== undefined) this.options.auto = a;
            if (this.options.auto === 0) return this.stopAuto();
            if (this.timer === null) {
                this.autoStopped = false;
                var c = this;
                this.timer = window.setTimeout(function() {
                    c.next()
                }, this.options.auto * 1E3)
            }
        },
        stopAuto: function() {
            this.pauseAuto();
            this.autoStopped = true
        },
        pauseAuto: function() {
            if (this.timer !== null) {
                window.clearTimeout(this.timer);
                this.timer = null
            }
        },
        buttons: function(a, c) {
            if (a == null) {
                a = !this.locked && this.options.size !== 0 &&
                    (this.options.wrap && this.options.wrap !=
                        "first" || this.options.size === null ||
                        this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this
                        .options.wrap == "first") && this.options
                    .size !== null && this.last >= this.options
                    .size) a = this.tail !== null && !this.inTail
            }
            if (c == null) {
                c = !this.locked && this.options.size !== 0 &&
                    (this.options.wrap && this.options.wrap !=
                        "last" || this.first > 1);
                if (!this.locked && (!this.options.wrap || this
                        .options.wrap == "last") && this.options
                    .size !== null && this.first == 1) c = this
                    .tail !== null && this.inTail
            }
            var b = this;
            if (this.buttonNext.size() > 0) {
                this.buttonNext.unbind(this.options.buttonNextEvent +
                    ".jcarousel", this.funcNext);
                a && this.buttonNext.bind(this.options.buttonNextEvent +
                    ".jcarousel", this.funcNext);
                this.buttonNext[a ? "removeClass" : "addClass"]
                    (this.className("jcarousel-next-disabled"))
                    .attr("disabled", a ? false : true);
                this.options.buttonNextCallback !== null &&
                    this.buttonNext.data("jcarouselstate") != a &&
                    this.buttonNext.each(function() {
                        b.options.buttonNextCallback(b,
                            this, a)
                    }).data("jcarouselstate", a)
            } else this.options.buttonNextCallback !== null &&
                this.buttonNextState != a && this.options.buttonNextCallback(
                    b, null, a);
            if (this.buttonPrev.size() > 0) {
                this.buttonPrev.unbind(this.options.buttonPrevEvent +
                    ".jcarousel", this.funcPrev);
                c && this.buttonPrev.bind(this.options.buttonPrevEvent +
                    ".jcarousel", this.funcPrev);
                this.buttonPrev[c ? "removeClass" : "addClass"]
                    (this.className("jcarousel-prev-disabled"))
                    .attr("disabled", c ? false : true);
                this.options.buttonPrevCallback !== null &&
                    this.buttonPrev.data("jcarouselstate") != c &&
                    this.buttonPrev.each(function() {
                        b.options.buttonPrevCallback(b,
                            this, c)
                    }).data("jcarouselstate", c)
            } else this.options.buttonPrevCallback !== null &&
                this.buttonPrevState != c && this.options.buttonPrevCallback(
                    b, null, c);
            this.buttonNextState = a;
            this.buttonPrevState = c
        },
        notify: function(a) {
            var c = this.prevFirst === null ? "init" : this.prevFirst <
                this.first ? "next" : "prev";
            this.callback("itemLoadCallback", a, c);
            if (this.prevFirst !== this.first) {
                this.callback("itemFirstInCallback", a, c, this
                    .first);
                this.callback("itemFirstOutCallback", a, c,
                    this.prevFirst)
            }
            if (this.prevLast !== this.last) {
                this.callback("itemLastInCallback", a, c, this.last);
                this.callback("itemLastOutCallback", a, c, this
                    .prevLast)
            }
            this.callback("itemVisibleInCallback", a, c, this.first,
                this.last, this.prevFirst, this.prevLast);
            this.callback("itemVisibleOutCallback", a, c, this.prevFirst,
                this.prevLast, this.first, this.last)
        },
        callback: function(a, c, b, d, f, j, e) {
            if (!(this.options[a] == null || typeof this.options[
                        a] != "object" && c !=
                    "onAfterAnimation")) {
                var g = typeof this.options[a] == "object" ?
                    this.options[a][c] : this.options[a];
                if (i.isFunction(g)) {
                    var k = this;
                    if (d === undefined) g(k, b, c);
                    else if (f === undefined) this.get(d).each(
                        function() {
                            g(k, this, d, b, c)
                        });
                    else {
                        a = function(m) {
                            k.get(m).each(function() {
                                g(k, this, m, b, c)
                            })
                        };
                        for (var l = d; l <= f; l++) l !== null &&
                            !(l >= j && l <= e) && a(l)
                    }
                }
            }
        },
        create: function(a) {
            return this.format("<li></li>", a)
        },
        format: function(a, c) {
            a = i(a);
            for (var b = a.get(0).className.split(" "), d = 0; d <
                b.length; d++) b[d].indexOf("jcarousel-") != -1 &&
                a.removeClass(b[d]);
            a.addClass(this.className("jcarousel-item")).addClass(
                this.className("jcarousel-item-" + c)).css({
                "float": this.options.rtl ? "right" : "left",
                "list-style": "none"
            }).attr("jcarouselindex", c);
            return a
        },
        className: function(a) {
            return a + " " + a + (!this.options.vertical ?
                "-horizontal" : "-vertical")
        },
        dimension: function(a, c) {
            var b = a.jquery !== undefined ? a[0] : a,
                d = !this.options.vertical ? (b.offsetWidth ||
                    h.intval(this.options.itemFallbackDimension)
                ) + h.margin(b, "marginLeft") + h.margin(b,
                    "marginRight") : (b.offsetHeight || h.intval(
                    this.options.itemFallbackDimension)) + h.margin(
                    b, "marginTop") + h.margin(b,
                    "marginBottom");
            if (c == null || d == c) return d;
            d = !this.options.vertical ? c - h.margin(b,
                    "marginLeft") - h.margin(b, "marginRight") :
                c - h.margin(b, "marginTop") - h.margin(b,
                    "marginBottom");
            i(b).css(this.wh, d + "px");
            return this.dimension(b)
        },
        clipping: function() {
            return !this.options.vertical ? this.clip[0].offsetWidth -
                h.intval(this.clip.css("borderLeftWidth")) - h.intval(
                    this.clip.css("borderRightWidth")) : this.clip[
                    0].offsetHeight - h.intval(this.clip.css(
                    "borderTopWidth")) - h.intval(this.clip.css(
                    "borderBottomWidth"))
        },
        index: function(a, c) {
            if (c == null) c = this.options.size;
            return Math.round(((a - 1) / c - Math.floor((a - 1) /
                c)) * c) + 1
        }
    });
    h.extend({
        defaults: function(a) {
            return i.extend(q, a || {})
        },
        margin: function(a, c) {
            if (!a) return 0;
            var b = a.jquery !== undefined ? a[0] : a;
            if (c == "marginRight" && i.browser.safari) {
                var d = {
                        display: "block",
                        "float": "none",
                        width: "auto"
                    },
                    f, j;
                i.swap(b, d, function() {
                    f = b.offsetWidth
                });
                d.marginRight = 0;
                i.swap(b, d, function() {
                    j = b.offsetWidth
                });
                return j - f
            }
            return h.intval(i.css(b, c))
        },
        intval: function(a) {
            a = parseInt(a, 10);
            return isNaN(a) ? 0 : a
        }
    });
    i.fn.jcarousel = function(a) {
        if (typeof a == "string") {
            var c = i(this).data("jcarousel"),
                b = Array.prototype.slice.call(arguments, 1);
            return c[a].apply(c, b)
        } else return this.each(function() {
            i(this).data("jcarousel", new h(this, a))
        })
    }
})(jQuery);
(function($) {
    $.fn.touchwipe = function(settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() {},
            wipeRight: function() {},
            wipeUp: function() {},
            wipeDown: function() {},
            preventDefaultEvents: true
        };
        if (settings) $.extend(config, settings);
        this.each(function() {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                this.removeEventListener('touchmove',
                    onTouchMove);
                startX = null;
                isMoving = false
            }

            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault()
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft()
                        } else {
                            config.wipeRight()
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown()
                        } else {
                            config.wipeUp()
                        }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove',
                        onTouchMove, false)
                }
            }
            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart',
                    onTouchStart, false)
            }
        });
        return this
    }
})(jQuery);
(function($) {
    $.tiny = $.tiny || {};
    $.tiny.carousel = {
        options: {
            start: 1,
            display: 1,
            axis: 'x',
            controls: true,
            pager: false,
            interval: false,
            intervaltime: 3000,
            rewind: false,
            animation: true,
            duration: 1000,
            callback: null
        }
    };
    $.fn.tinycarousel = function(options) {
        var options = $.extend({}, $.tiny.carousel.options, options);
        this.each(function() {
            $(this).data('tcl', new Carousel($(this), options));
        });
        return this;
    };
    $.fn.tinycarousel_start = function() {
        $(this).data('tcl').start();
    };
    $.fn.tinycarousel_stop = function() {
        $(this).data('tcl').stop();
    };
    $.fn.tinycarousel_move = function(iNum) {
        $(this).data('tcl').move(iNum - 1, true);
    };

    function Carousel(root, options) {
        var oSelf = this;
        var oViewport = $('.viewport:first', root);
        var oContent = $('.overview:first', root);
        var oPages = oContent.children();
        var oBtnNext = $('.next:first', root);
        var oBtnPrev = $('.prev:first', root);
        var oPager = $('.pager:first', root);
        var iPageSize, iSteps, iCurrent, oTimer, bPause, bForward = true,
            bAxis = options.axis == 'x';

        function initialize() {
            iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0])
                .outerHeight(true);
            var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() :
                oViewport.outerHeight()) / (iPageSize * options
                .display)) - 1);
            iSteps = Math.max(1, Math.ceil(oPages.length / options.display) -
                iLeftover);
            iCurrent = Math.min(iSteps, Math.max(1, options.start)) - 2;
            oContent.css(bAxis ? 'width' : 'height', (iPageSize * oPages.length));
            oSelf.move(1);
            setEvents();
            return oSelf;
        };

        function setEvents() {
            if (options.controls && oBtnPrev.length > 0 && oBtnNext.length >
                0) {
                oBtnPrev.click(function() {
                    oSelf.move(-1);
                    return false;
                });
                oBtnNext.click(function() {
                    oSelf.move(1);
                    return false;
                });
            }
            if (options.interval) {
                root.hover(oSelf.stop, oSelf.start);
            }
            if (options.pager && oPager.length > 0) {
                $('a', oPager).click(setPager);
            }
        };

        function setButtons() {
            if (options.controls) {
                oBtnPrev.toggleClass('disable', !(iCurrent > 0));
                oBtnNext.toggleClass('disable', !(iCurrent + 1 < iSteps));
            }
            if (options.pager) {
                var oNumbers = $('.pagenum', oPager);
                oNumbers.removeClass('active');
                $(oNumbers[iCurrent]).addClass('active');
            }
        };

        function setPager(oEvent) {
            if ($(this).hasClass('pagenum')) {
                oSelf.move(parseInt(this.rel), true);
            }
            return false;
        };

        function setTimer() {
            if (options.interval && !bPause) {
                clearTimeout(oTimer);
                oTimer = setTimeout(function() {
                    iCurrent = iCurrent + 1 == iSteps ? -1 :
                        iCurrent;
                    bForward = iCurrent + 1 == iSteps ? false :
                        iCurrent == 0 ? true : bForward;
                    oSelf.move(bForward ? 1 : -1);
                }, options.intervaltime);
            }
        };
        this.stop = function() {
            clearTimeout(oTimer);
            bPause = true;
        };
        this.start = function() {
            bPause = false;
            setTimer();
        };
        this.move = function(iDirection, bPublic) {
            iCurrent = bPublic ? iDirection : iCurrent += iDirection;
            if (iCurrent > -1 && iCurrent < iSteps) {
                var oPosition = {};
                oPosition[bAxis ? 'left' : 'top'] = -(iCurrent * (
                    iPageSize * options.display));
                oContent.animate(oPosition, {
                    queue: false,
                    duration: options.animation ? options.duration : 0,
                    complete: function() {
                        if (typeof options.callback ==
                            'function') options.callback.call(
                            this, oPages[iCurrent],
                            iCurrent);
                    }
                });
                setButtons();
                setTimer();
            }
        };
        return initialize();
    };
})(jQuery);
(function($) {
    var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle,
        $cluetipArrows, $dropShadow, imgCount;
    $.fn.cluetip = function(options) {
        var defaults = {
            width: 275,
            height: 'auto',
            cluezIndex: 97,
            positionBy: 'auto',
            topOffset: 15,
            leftOffset: 15,
            local: false,
            hideLocal: true,
            attribute: 'rel',
            titleAttribute: 'alt',
            splitTitle: '',
            showTitle: true,
            cluetipClass: 'default',
            hoverClass: '',
            waitImage: true,
            cursor: 'help',
            arrows: false,
            dropShadow: true,
            dropShadowSteps: 6,
            sticky: false,
            mouseOutClose: false,
            activation: 'hover',
            closePosition: 'top',
            closeText: 'Close',
            truncate: 0,
            fx: {
                open: 'show',
                openSpeed: ''
            },
            hoverIntent: {
                sensitivity: 3,
                interval: 50,
                timeout: 0
            },
            onActivate: function(e) {
                return true;
            },
            onShow: function(ct, c) {},
            ajaxCache: true,
            ajaxProcess: function(data) {
                data = $(data).not(
                    'style, meta, link, script, title');
                return data;
            },
            ajaxSettings: {
                dataType: 'html'
            }
        };
        if (options && options.ajaxSettings) {
            $.extend(defaults.ajaxSettings, options.ajaxSettings);
            delete options.ajaxSettings;
        }
        if (options && options.fx) {
            $.extend(defaults.fx, options.fx);
            delete options.fx;
        }
        if (options && options.hoverIntent) {
            $.extend(defaults.hoverIntent, options.hoverIntent);
            delete options.hoverIntent;
        }
        $.extend(defaults, options);
        return this.each(function() {
            var cluetipContents = false;
            var cluezIndex = parseInt(defaults.cluezIndex, 10) -
                1;
            var isActive = false;
            if (!$cluetip) {
                $cluetipInner = $(
                    '<div id="cluetip-inner"></div>');
                $cluetipTitle = $(
                    '<h3 id="cluetip-title"></h3>');
                $cluetipOuter = $(
                    '<div id="cluetip-outer"></div>').append(
                    $cluetipInner).prepend($cluetipTitle);
                $cluetip = $('<div></div>').attr({
                    'id': 'cluetip'
                }).css({
                    zIndex: defaults.cluezIndex
                }).append($cluetipOuter).append(
                    '<div id="cluetip-extra"></div>')[
                    insertionType](insertionElement).hide();
                $('<div id="cluetip-waitimage"></div>').css({
                    position: 'absolute',
                    zIndex: cluezIndex - 1
                }).insertBefore('#cluetip').hide();
                $cluetip.css({
                    position: 'absolute',
                    zIndex: cluezIndex
                });
                $cluetipOuter.css({
                    position: 'relative',
                    zIndex: cluezIndex + 1
                });
                $cluetipArrows = $(
                    '<div id="cluetip-arrows" class="cluetip-arrows"></div>'
                ).css({
                    zIndex: cluezIndex + 1
                }).appendTo('#cluetip');
            }
            var dropShadowSteps = (defaults.dropShadow) ? +
                defaults.dropShadowSteps : 0;
            if (!$dropShadow) {
                $dropShadow = $([]);
                for (var i = 0; i < dropShadowSteps; i++) {
                    $dropShadow = $dropShadow.add($(
                        '<div></div>').css({
                        zIndex: cluezIndex - i - 1,
                        opacity: .1,
                        top: 1 + i,
                        left: 1 + i
                    }));
                };
                $dropShadow.css({
                    position: 'absolute',
                    backgroundColor: '#000'
                }).prependTo($cluetip);
            }
            var $this = $(this);
            var tipAttribute = $this.attr(defaults.attribute),
                ctClass = defaults.cluetipClass;
            if (!tipAttribute && !defaults.splitTitle) return
            true;
            if (defaults.local && defaults.hideLocal) {
                $(tipAttribute + ':first').hide();
            }
            var tOffset = parseInt(defaults.topOffset, 10),
                lOffset = parseInt(defaults.leftOffset, 10);
            var tipHeight, wHeight;
            var defHeight = isNaN(parseInt(defaults.height, 10)) ?
                'auto' : (/\D/g).test(defaults.height) ?
                defaults.height : defaults.height + 'px';
            var sTop, linkTop, posY, tipY, mouseY;
            var tipWidth = parseInt(defaults.width, 10) +
                parseInt($cluetip.css('paddingLeft')) +
                parseInt($cluetip.css('paddingRight')) +
                dropShadowSteps;
            if (isNaN(tipWidth)) tipWidth = 275;
            var linkWidth = this.offsetWidth;
            var linkLeft, posX, tipX, mouseX, winWidth;
            var tipParts;
            var tipTitle = (defaults.attribute != 'title') ?
                $this.attr(defaults.titleAttribute) : '';
            if (defaults.splitTitle) {
                tipParts = tipTitle.split(defaults.splitTitle);
                tipTitle = tipParts.shift();
            }
            var localContent;
            var activate = function(event) {
                if (!defaults.onActivate($this)) {
                    return false;
                }
                isActive = true;
                $cluetip.removeClass().css({
                    width: defaults.width
                });
                if (tipAttribute == $this.attr('href')) {
                    $this.css('cursor', defaults.cursor);
                }
                $this.attr('title', '');
                if (defaults.hoverClass) {
                    $this.addClass(defaults.hoverClass);
                }
                linkTop = posY = $this.offset().top;
                linkLeft = $this.offset().left;
                mouseX = event.pageX;
                mouseY = event.pageY;
                if ($this[0].tagName.toLowerCase() !=
                    'area') {
                    sTop = $(document).scrollTop();
                    winWidth = $(window).width();
                }
                if (defaults.positionBy == 'fixed') {
                    posX = linkWidth + linkLeft + lOffset;
                    $cluetip.css({
                        left: posX
                    });
                } else {
                    posX = (linkWidth > linkLeft &&
                            linkLeft > tipWidth) ||
                        linkLeft + linkWidth + tipWidth +
                        lOffset > winWidth ? linkLeft -
                        tipWidth - lOffset : linkWidth +
                        linkLeft + lOffset;
                    if ($this[0].tagName.toLowerCase() ==
                        'area' || defaults.positionBy ==
                        'mouse' || linkWidth + tipWidth >
                        winWidth) {
                        if (mouseX + 20 + tipWidth >
                            winWidth) {
                            posX = (mouseX - tipWidth -
                                    lOffset) >= 0 ? mouseX -
                                tipWidth - lOffset : mouseX -
                                (tipWidth / 2);
                        } else {
                            posX = mouseX + lOffset;
                        }
                        var pY = posX < 0 ? event.pageY +
                            tOffset : event.pageY;
                    }
                    $cluetip.css({
                        left: (posX > 0 && defaults
                                .positionBy !=
                                'bottomTop') ? posX : (
                                mouseX + (tipWidth /
                                    2) > winWidth) ?
                            winWidth / 2 - tipWidth /
                            2 : Math.max(mouseX - (
                                    tipWidth / 2),
                                0)
                    });
                }
                wHeight = $(window).height();
                if (tipParts) {
                    for (var i = 0; i < tipParts.length; i++) {
                        if (i == 0) {
                            $cluetipInner.html(tipParts[i]);
                        } else {
                            $cluetipInner.append(
                                '<div class="split-body">' +
                                tipParts[i] + '</div>');
                        }
                    };
                    cluetipShow(pY);
                } else if (!defaults.local && tipAttribute.indexOf(
                        '#') != 0) {
                    if (cluetipContents && defaults.ajaxCache) {
                        $cluetipInner.html(cluetipContents);
                        cluetipShow(pY);
                    } else {
                        var ajaxSettings = defaults.ajaxSettings;
                        ajaxSettings.url = tipAttribute;
                        ajaxSettings.beforeSend = function() {
                            $cluetipOuter.children().empty();
                            if (defaults.waitImage) {
                                if (defaults.positionBy !=
                                    'bottomTop') {
                                    $(
                                        '#cluetip-waitimage'
                                    ).css({
                                        top: mouseY -
                                            10,
                                        left: parseInt(
                                            posX,
                                            10
                                        )
                                    }).show();
                                } else {
                                    $(
                                        '#cluetip-waitimage'
                                    ).css({
                                        top: mouseY +
                                            10,
                                        left: mouseX
                                    }).show();
                                }
                            }
                        };
                        ajaxSettings.error = function() {
                            if (isActive) {
                                $cluetipInner.html(
                                    '<i>sorry, the contents could not be loaded</i>'
                                );
                            }
                        };
                        ajaxSettings.success = function(
                            data) {
                            cluetipContents = defaults.ajaxProcess(
                                data);
                            if (isActive) {
                                $cluetipInner.html(
                                    cluetipContents
                                );
                                $('#cluetip-waitimage')
                                    .hide();
                                if (isActive)
                                    cluetipShow(pY);
                            }
                        };
                        ajaxSettings.complete = function() {
                            imgCount = $(
                                '#cluetip-inner img'
                            ).length;
                            if (imgCount) {
                                $('#cluetip-inner img')
                                    .load(function() {
                                        imgCount--;
                                        if (
                                            imgCount <
                                            1) {
                                            $(
                                                '#cluetip-waitimage'
                                            ).hide();
                                            if (
                                                isActive
                                            )
                                                cluetipShow(
                                                    pY
                                                );
                                        }
                                    });
                            } else {
                                $('#cluetip-waitimage')
                                    .hide();
                                if (isActive)
                                    cluetipShow(pY);
                            }
                        };
                        $.ajax(ajaxSettings);
                    }
                } else if (defaults.local) {
                    var $localContent = $(tipAttribute +
                        ':first');
                    var localCluetip = $.fn.wrapInner ?
                        $localContent.wrapInner(
                            '<div></div>').children().clone(
                            true) : $localContent.html();
                    $.fn.wrapInner ? $cluetipInner.empty().append(
                        localCluetip) : $cluetipInner.html(
                        localCluetip);
                    cluetipShow(pY);
                }
            };
            var cluetipShow = function(bpY) {
                $cluetip.addClass('cluetip-' + ctClass);
                if (defaults.truncate) {
                    var $truncloaded = $cluetipInner.text()
                        .slice(0, defaults.truncate) +
                        '...';
                    $cluetipInner.html($truncloaded);
                }

                function doNothing() {};
                tipTitle ? $cluetipTitle.show().html(
                        tipTitle) : (defaults.showTitle) ?
                    $cluetipTitle.show().html('&nbsp;') :
                    $cluetipTitle.hide();
                if (defaults.sticky) {
                    var $closeLink = $(
                        '<div id="cluetip-close"><a href="#">' +
                        defaults.closeText +
                        '</a></div>');
                    (defaults.closePosition == 'bottom') ?
                    $closeLink.appendTo($cluetipInner): (
                        defaults.closePosition ==
                        'title') ? $closeLink.prependTo(
                        $cluetipTitle) : $closeLink.prependTo(
                        $cluetipInner);
                    $closeLink.click(function() {
                        cluetipClose();
                        return false;
                    });
                    if (defaults.mouseOutClose) {
                        $cluetip.hover(function() {
                            doNothing();
                        }, function() {
                            $closeLink.trigger(
                                'click');
                        });
                    } else {
                        $cluetip.unbind('mouseout');
                    }
                }
                var direction = '';
                $cluetipOuter.css({
                    overflow: defHeight == 'auto' ?
                        'visible' : 'auto',
                    height: defHeight
                });
                tipHeight = defHeight == 'auto' ? $cluetip.outerHeight() :
                    parseInt(defHeight, 10);
                tipY = posY;
                if (defaults.positionBy == 'fixed') {
                    tipY = posY - defaults.dropShadowSteps +
                        tOffset;
                } else if ((posX < mouseX && Math.max(posX,
                        0) + tipWidth > mouseX) || defaults
                    .positionBy == 'bottomTop') {
                    if (posY + tipHeight + tOffset > sTop +
                        wHeight && mouseY - sTop >
                        tipHeight + tOffset) {
                        tipY = mouseY - tipHeight - tOffset;
                        direction = 'top';
                    } else {
                        tipY = mouseY + tOffset;
                        direction = 'bottom';
                    }
                } else if (posY + tipHeight + tOffset >
                    sTop + wHeight) {
                    tipY = (tipHeight >= wHeight) ? sTop :
                        sTop + wHeight - tipHeight -
                        tOffset;
                } else if ($this.css('display') == 'block' ||
                    $this[0].tagName.toLowerCase() ==
                    'area' || defaults.positionBy ==
                    "mouse") {
                    tipY = bpY - tOffset;
                } else {
                    tipY = posY - defaults.dropShadowSteps;
                }
                if (direction == '') {
                    posX < linkLeft ? direction = 'left' :
                        direction = 'right';
                }
                $cluetip.css({
                    top: tipY + 'px'
                }).removeClass().addClass('clue-' +
                    direction + '-' + ctClass).addClass(
                    ' cluetip-' + ctClass);
                if (defaults.arrows) {
                    var bgY = (posY - tipY - defaults.dropShadowSteps);
                    $cluetipArrows.css({
                        top: (/(left|right)/.test(
                                    direction) &&
                                posX >= 0 && bgY >
                                0) ? bgY + 'px' : /(left|right)/
                            .test(direction) ? 0 : ''
                    }).show();
                } else {
                    $cluetipArrows.hide();
                }
                $dropShadow.hide();
                $cluetip.hide()[defaults.fx.open](defaults.fx
                    .open != 'show' && defaults.fx.openSpeed
                );
                if (defaults.dropShadow) $dropShadow.css({
                    height: tipHeight,
                    width: defaults.width
                }).show();
                defaults.onShow($cluetip, $cluetipInner);
            };
            var inactivate = function() {
                isActive = false;
                $('#cluetip-waitimage').hide();
                if (!defaults.sticky) {
                    cluetipClose();
                };
                if (defaults.hoverClass) {
                    $this.removeClass(defaults.hoverClass);
                }
            };
            var cluetipClose = function() {
                $cluetipOuter.parent().hide().removeClass()
                    .end().children().empty();
                if (tipTitle) {
                    $this.attr('title', tipTitle);
                }
                $this.css('cursor', '');
                if (defaults.arrows) $cluetipArrows.css({
                    top: ''
                });
            };
            if (defaults.activation == 'click' || defaults.activation ==
                'toggle') {
                $this.click(function(event) {
                    if ($cluetip.is(':hidden')) {
                        activate(event);
                    } else {
                        inactivate(event);
                    }
                    this.blur();
                    return false;
                });
            } else {
                $this.click(function() {
                    if (tipAttribute == $this.attr(
                            'href')) {
                        return false;
                    }
                });
                if ($.fn.hoverIntent && defaults.hoverIntent) {
                    $this.hoverIntent({
                        sensitivity: defaults.hoverIntent
                            .sensitivity,
                        interval: defaults.hoverIntent.interval,
                        over: function(event) {
                            activate(event);
                        },
                        timeout: defaults.hoverIntent.timeout,
                        out: function(event) {
                            inactivate(event);
                        }
                    });
                } else {
                    $this.hover(function(event) {
                        activate(event);
                    }, function(event) {
                        inactivate(event);
                    });
                }
            }
        });
    };
    var insertionType = 'appendTo',
        insertionElement = 'body';
    $.cluetip = {};
    $.cluetip.setup = function(options) {
        if (options && options.insertionType && (options.insertionType)
            .match(/appendTo|prependTo|insertBefore|insertAfter/)) {
            insertionType = options.insertionType;
        }
        if (options && options.insertionElement) {
            insertionElement = options.insertionElement;
        }
    };
})(jQuery);
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) +
            1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t -
            1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) -
            1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d -
            s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 *
            Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d -
            s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) +
            b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (
            1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t +
            s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) +
            b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) +
                b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) +
                b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2,
            0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) *
            .5 + c * .5 + b;
    }
});
(function($) {
    $.fn.bgIframe = $.fn.bgiframe = function(s) {
        if ($.browser.msie && /6.0/.test(navigator.userAgent)) {
            s = $.extend({
                top: 'auto',
                left: 'auto',
                width: 'auto',
                height: 'auto',
                opacity: true,
                src: 'javascript:false;'
            }, s || {});
            var prop = function(n) {
                    return n && n.constructor == Number ? n + 'px' : n;
                },
                html =
                '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' +
                s.src + '"' +
                'style="display:block;position:absolute;z-index:-1;' +
                (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' :
                    '') + 'top:' + (s.top == 'auto' ?
                    'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' :
                    prop(s.top)) + ';' + 'left:' + (s.left == 'auto' ?
                    'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' :
                    prop(s.left)) + ';' + 'width:' + (s.width == 'auto' ?
                    'expression(this.parentNode.offsetWidth+\'px\')' :
                    prop(s.width)) + ';' + 'height:' + (s.height ==
                    'auto' ?
                    'expression(this.parentNode.offsetHeight+\'px\')' :
                    prop(s.height)) + ';' + '"/>';
            return this.each(function() {
                if ($('> iframe.bgiframe', this).length == 0)
                    this.insertBefore(document.createElement(
                        html), this.firstChild);
            });
        }
        return this;
    };
})(jQuery);
$.fn.equalHeights = function(px) {
    $(this).each(function() {
        var currentTallest = 0;
        $(this).children().each(function(i) {
            if ($(this).height() > currentTallest) {
                currentTallest = $(this).height();
            }
        });
        if (!px || !Number.prototype.pxToEm) currentTallest =
            currentTallest.pxToEm();
        if ($.browser.msie && $.browser.version == 6.0) {
            $(this).children().css({
                'height': currentTallest
            });
        }
        $(this).children().css({
            'min-height': currentTallest
        });
    });
    return this;
};
$.fn.equalWidths = function(px) {
    $(this).each(function() {
        var currentWidest = 0;
        $(this).children().each(function(i) {
            if ($(this).width() > currentWidest) {
                currentWidest = $(this).width();
            }
        });
        if (!px || !Number.prototype.pxToEm) currentWidest =
            currentWidest.pxToEm();
        if ($.browser.msie && $.browser.version == 6.0) {
            $(this).children().css({
                'width': currentWidest
            });
        }
        $(this).children().css({
            'min-width': currentWidest
        });
    });
    return this;
};
Number.prototype.pxToEm = String.prototype.pxToEm = function(settings) {
    settings = jQuery.extend({
        scope: 'body',
        reverse: false
    }, settings);
    var pxVal = (this == '') ? 0 : parseFloat(this);
    var scopeVal;
    var getWindowWidth = function() {
        var de = document.documentElement;
        return self.innerWidth || (de && de.clientWidth) || document.body
            .clientWidth;
    };
    if (settings.scope == 'body' && $.browser.msie && (parseFloat($('body')
            .css('font-size')) / getWindowWidth()).toFixed(1) > 0.0) {
        var calcFontSize = function() {
            return (parseFloat($('body').css('font-size')) /
                getWindowWidth()).toFixed(3) * 16;
        };
        scopeVal = calcFontSize();
    } else {
        scopeVal = parseFloat(jQuery(settings.scope).css("font-size"));
    };
    var result = (settings.reverse == true) ? (pxVal * scopeVal).toFixed(2) +
        'px' : (pxVal / scopeVal).toFixed(2) + 'em';
    return result;
};
(function($) {
    $.widget("ui.selectmenu", {
        _init: function() {
            var self = this,
                o = this.options;
            this.ids = [this.element.attr('id') + '-' +
                'button', this.element.attr('id') + '-' +
                'menu'
            ];
            this._safemouseup = true;
            this.newelement = $('<a class="' + this.widgetBaseClass +
                ' ui-widget ui-state-default ui-corner-all" id="' +
                this.ids[0] +
                '" role="button" href="#" aria-haspopup="true" aria-owns="' +
                this.ids[1] + '"></a>').insertAfter(this.element);
            var tabindex = this.element.attr('tabindex');
            if (tabindex) {
                this.newelement.attr('tabindex', tabindex);
            }
            this.newelement.data('selectelement', this.element);
            this.selectmenuIcon = $('<span class="' + this.widgetBaseClass +
                    '-icon ui-icon"></span>').prependTo(this.newelement)
                .addClass((o.style == "popup") ?
                    'ui-icon-triangle-2-n-s' :
                    'ui-icon-triangle-1-s');
            $('label[for=' + this.element.attr('id') + ']').attr(
                'for', this.ids[0]).bind('click', function() {
                self.newelement[0].focus();
                return false;
            });
            this.newelement.bind('mousedown', function(event) {
                self._toggle(event);
                if (o.style == "popup") {
                    self._safemouseup = false;
                    setTimeout(function() {
                        self._safemouseup =
                            true;
                    }, 300);
                }
                return false;
            }).bind('click', function() {
                return false;
            }).keydown(function(event) {
                var ret = true;
                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER:
                        ret = true;
                        break;
                    case $.ui.keyCode.SPACE:
                        ret = false;
                        self._toggle(event);
                        break;
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.LEFT:
                        ret = false;
                        self._moveSelection(-1);
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.RIGHT:
                        ret = false;
                        self._moveSelection(1);
                        break;
                    case $.ui.keyCode.TAB:
                        ret = true;
                        break;
                    default:
                        ret = false;
                        self._typeAhead(event.keyCode,
                            'mouseup');
                        break;
                }
                return ret;
            }).bind('mouseover focus', function() {
                $(this).addClass(self.widgetBaseClass +
                    '-focus ui-state-hover');
            }).bind('mouseout blur', function() {
                $(this).removeClass(self.widgetBaseClass +
                    '-focus ui-state-hover');
            });
            $(document).mousedown(function(event) {
                self.close(event);
            });
            this.element.click(function() {
                this._refreshValue();
            }).focus(function() {
                this.newelement[0].focus();
            });
            var cornerClass = (o.style == "dropdown") ?
                " ui-corner-bottom" : " ui-corner-all"
            this.list = $('<ul class="' + self.widgetBaseClass +
                '-menu ui-widget ui-widget-content' +
                cornerClass +
                '" aria-hidden="true" role="listbox" aria-labelledby="' +
                this.ids[0] + '" id="' + this.ids[1] +
                '"></ul>').appendTo('body');
            var selectOptionData = [];
            this.element.find('option').each(function() {
                selectOptionData.push({
                    value: $(this).attr('value'),
                    text: self._formatText(
                        jQuery(this).text()
                    ),
                    selected: $(this).attr(
                        'selected'),
                    classes: $(this).attr(
                        'class'),
                    parentOptGroup: $(this).parent(
                        'optgroup').attr(
                        'label')
                });
            });
            var activeClass = (self.options.style == "popup") ?
                " ui-state-active" : "";
            for (var i in selectOptionData) {
                var thisLi = $(
                        '<li role="presentation"><a href="#" tabindex="-1" role="option" aria-selected="false">' +
                        selectOptionData[i].text + '</a></li>')
                    .data('index', i).addClass(selectOptionData[
                        i].classes).data('optionClasses',
                        selectOptionData[i].classes || '').mouseup(
                        function(event) {
                            if (self._safemouseup) {
                                var changed = $(this).data(
                                    'index') != self._selectedIndex();
                                self.value($(this).data('index'));
                                self.select(event);
                                if (changed) {
                                    self.change(event);
                                }
                                self.close(event, true);
                            }
                            return false;
                        }).click(function() {
                        return false;
                    }).bind('mouseover focus', function() {
                        self._selectedOptionLi().addClass(
                            activeClass);
                        self._focusedOptionLi().removeClass(
                            self.widgetBaseClass +
                            '-item-focus ui-state-hover'
                        );
                        $(this).removeClass(
                            'ui-state-active').addClass(
                            self.widgetBaseClass +
                            '-item-focus ui-state-hover'
                        );
                    }).bind('mouseout blur', function() {
                        if ($(this).is(self._selectedOptionLi())) {
                            $(this).addClass(activeClass);
                        }
                        $(this).removeClass(self.widgetBaseClass +
                            '-item-focus ui-state-hover'
                        );
                    });
                if (selectOptionData[i].parentOptGroup) {
                    var optGroupName = self.widgetBaseClass +
                        '-group-' + selectOptionData[i].parentOptGroup;
                    if (this.list.find('li.' + optGroupName).size()) {
                        this.list.find('li.' + optGroupName +
                            ':last ul').append(thisLi);
                    } else {
                        $('<li role="presentation" class="' +
                            self.widgetBaseClass +
                            '-group ' + optGroupName +
                            '"><span class="' + self.widgetBaseClass +
                            '-group-label">' +
                            selectOptionData[i].parentOptGroup +
                            '</span><ul></ul></li>').appendTo(
                            this.list).find('ul').append(
                            thisLi);
                    }
                } else {
                    thisLi.appendTo(this.list);
                }
                this.list.bind('mousedown mouseup', function() {
                    return false;
                });
                if (o.icons) {
                    for (var j in o.icons) {
                        if (thisLi.is(o.icons[j].find)) {
                            thisLi.data('optionClasses',
                                selectOptionData[i].classes +
                                ' ' + self.widgetBaseClass +
                                '-hasIcon').addClass(self.widgetBaseClass +
                                '-hasIcon');
                            var iconClass = o.icons[j].icon ||
                                "";
                            thisLi.find('a:eq(0)').prepend(
                                '<span class="' + self.widgetBaseClass +
                                '-item-icon ui-icon ' +
                                iconClass + '"></span>');
                        }
                    }
                }
            }
            this.list.find('li:last').addClass(
                "ui-corner-bottom");
            if (o.style == 'popup') {
                this.list.find('li:first').addClass(
                    "ui-corner-top");
            }
            if (o.transferClasses) {
                var transferClasses = this.element.attr('class') ||
                    '';
                this.newelement.add(this.list).addClass(
                    transferClasses);
            }
            var selectWidth = this.element.width();
            this.newelement.width((o.width) ? o.width :
                selectWidth);
            if (o.style == 'dropdown') {
                this.list.width((o.menuWidth) ? o.menuWidth : (
                    (o.width) ? o.width : selectWidth));
            } else {
                this.list.width((o.menuWidth) ? o.menuWidth : (
                    (o.width) ? o.width - o.handleWidth :
                    selectWidth - o.handleWidth));
            }
            if (o.maxHeight && o.maxHeight < this.list.height()) {
                this.list.height(o.maxHeight);
            }
            this._optionLis = this.list.find('li:not(.' + self.widgetBaseClass +
                '-group)');
            this.list.keydown(function(event) {
                var ret = true;
                switch (event.keyCode) {
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.LEFT:
                        ret = false;
                        self._moveFocus(-1);
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.RIGHT:
                        ret = false;
                        self._moveFocus(1);
                        break;
                    case $.ui.keyCode.HOME:
                        ret = false;
                        self._moveFocus(':first');
                        break;
                    case $.ui.keyCode.PAGE_UP:
                        ret = false;
                        self._scrollPage('up');
                        break;
                    case $.ui.keyCode.PAGE_DOWN:
                        ret = false;
                        self._scrollPage('down');
                        break;
                    case $.ui.keyCode.END:
                        ret = false;
                        self._moveFocus(':last');
                        break;
                    case $.ui.keyCode.ENTER:
                    case $.ui.keyCode.SPACE:
                        ret = false;
                        self.close(event, true);
                        $(event.target).parents(
                            'li:eq(0)').trigger(
                            'mouseup');
                        break;
                    case $.ui.keyCode.TAB:
                        ret = true;
                        self.close(event, true);
                        break;
                    case $.ui.keyCode.ESCAPE:
                        ret = false;
                        self.close(event, true);
                        break;
                    default:
                        ret = false;
                        self._typeAhead(event.keyCode,
                            'focus');
                        break;
                }
                return ret;
            });
            if (o.style == 'dropdown') {
                this.newelement.addClass(self.widgetBaseClass +
                    "-dropdown");
                this.list.addClass(self.widgetBaseClass +
                    "-menu-dropdown");
            } else {
                this.newelement.addClass(self.widgetBaseClass +
                    "-popup");
                this.list.addClass(self.widgetBaseClass +
                    "-menu-popup");
            }
            this.newelement.prepend('<span class="' + self.widgetBaseClass +
                '-status">' + selectOptionData[this._selectedIndex()]
                .text + '</span>');
            this.element.hide();
            if (this.element.attr('disabled') == true) {
                this.disable();
            }
            this.value(this._selectedIndex());
        },
        destroy: function() {
            this.element.removeData(this.widgetName).removeClass(
                this.widgetBaseClass + '-disabled' + ' ' +
                this.namespace + '-state-disabled').removeAttr(
                'aria-disabled');
            $('label[for=' + this.newelement.attr('id') + ']').attr(
                'for', this.element.attr('id')).unbind(
                'click');
            this.newelement.remove();
            this.list.remove();
            this.element.show();
        },
        _typeAhead: function(code, eventType) {
            var self = this;
            if (!self._prevChar) {
                self._prevChar = ['', 0];
            }
            var C = String.fromCharCode(code);
            c = C.toLowerCase();
            var focusFound = false;

            function focusOpt(elem, ind) {
                focusFound = true;
                $(elem).trigger(eventType);
                self._prevChar[1] = ind;
            };
            this.list.find('li a').each(function(i) {
                if (!focusFound) {
                    var thisText = $(this).text();
                    if (thisText.indexOf(C) == 0 ||
                        thisText.indexOf(c) == 0) {
                        if (self._prevChar[0] == C) {
                            if (self._prevChar[1] < i) {
                                focusOpt(this, i);
                            }
                        } else {
                            focusOpt(this, i);
                        }
                    }
                }
            });
            this._prevChar[0] = C;
        },
        _uiHash: function() {
            return {
                value: this.value()
            };
        },
        open: function(event) {
            var self = this;
            var disabledStatus = this.newelement.attr(
                "aria-disabled");
            if (disabledStatus != 'true') {
                this._refreshPosition();
                this._closeOthers(event);
                this.newelement.addClass('ui-state-active');
                this.list.appendTo('body').addClass(self.widgetBaseClass +
                    '-open').attr('aria-hidden', false).find(
                    'li:not(.' + self.widgetBaseClass +
                    '-group):eq(' + this._selectedIndex() +
                    ') a')[0].focus();
                if (this.options.style == "dropdown") {
                    this.newelement.removeClass('ui-corner-all')
                        .addClass('ui-corner-top');
                }
                this._refreshPosition();
                this._trigger("open", event, this._uiHash());
            }
        },
        close: function(event, retainFocus) {
            if (this.newelement.is('.ui-state-active')) {
                this.newelement.removeClass('ui-state-active');
                this.list.attr('aria-hidden', true).removeClass(
                    this.widgetBaseClass + '-open');
                if (this.options.style == "dropdown") {
                    this.newelement.removeClass('ui-corner-top')
                        .addClass('ui-corner-all');
                }
                if (retainFocus) {
                    this.newelement[0].focus();
                }
                this._trigger("close", event, this._uiHash());
            }
        },
        change: function(event) {
            this.element.trigger('change');
            this._trigger("change", event, this._uiHash());
        },
        select: function(event) {
            this._trigger("select", event, this._uiHash());
        },
        _closeOthers: function(event) {
            $('.' + this.widgetBaseClass + '.ui-state-active').not(
                this.newelement).each(function() {
                $(this).data('selectelement').selectmenu(
                    'close', event);
            });
            $('.' + this.widgetBaseClass + '.ui-state-hover').trigger(
                'mouseout');
        },
        _toggle: function(event, retainFocus) {
            if (this.list.is('.' + this.widgetBaseClass +
                    '-open')) {
                this.close(event, retainFocus);
            } else {
                this.open(event);
            }
        },
        _formatText: function(text) {
            return this.options.format ? this.options.format(
                text) : text;
        },
        _selectedIndex: function() {
            return this.element[0].selectedIndex;
        },
        _selectedOptionLi: function() {
            return this._optionLis.eq(this._selectedIndex());
        },
        _focusedOptionLi: function() {
            return this.list.find('.' + this.widgetBaseClass +
                '-item-focus');
        },
        _moveSelection: function(amt) {
            var currIndex = parseInt(this._selectedOptionLi().data(
                'index'), 10);
            var newIndex = currIndex + amt;
            return this._optionLis.eq(newIndex).trigger(
                'mouseup');
        },
        _moveFocus: function(amt) {
            if (!isNaN(amt)) {
                var currIndex = parseInt(this._focusedOptionLi()
                    .data('index'), 10);
                var newIndex = currIndex + amt;
            } else {
                var newIndex = parseInt(this._optionLis.filter(
                    amt).data('index'), 10);
            }
            if (newIndex < 0) {
                newIndex = 0;
            }
            if (newIndex > this._optionLis.size() - 1) {
                newIndex = this._optionLis.size() - 1;
            }
            var activeID = this.widgetBaseClass + '-item-' +
                Math.round(Math.random() * 1000);
            this._focusedOptionLi().find('a:eq(0)').attr('id',
                '');
            this._optionLis.eq(newIndex).find('a:eq(0)').attr(
                'id', activeID)[0].focus();
            this.list.attr('aria-activedescendant', activeID);
        },
        _scrollPage: function(direction) {
            var numPerPage = Math.floor(this.list.outerHeight() /
                this.list.find('li:first').outerHeight());
            numPerPage = (direction == 'up') ? -numPerPage :
                numPerPage;
            this._moveFocus(numPerPage);
        },
        _setData: function(key, value) {
            this.options[key] = value;
            if (key == 'disabled') {
                this.close();
                this.element.add(this.newelement).add(this.list)[
                    value ? 'addClass' : 'removeClass'](
                    this.widgetBaseClass + '-disabled' +
                    ' ' +
                    this.namespace + '-state-disabled').attr(
                    "aria-disabled", value);
            }
        },
        value: function(newValue) {
            if (arguments.length) {
                this.element[0].selectedIndex = newValue;
                this._refreshValue();
                this._refreshPosition();
            }
            return this.element[0].selectedIndex;
        },
        _refreshValue: function() {
            var activeClass = (this.options.style == "popup") ?
                " ui-state-active" : "";
            var activeID = this.widgetBaseClass + '-item-' +
                Math.round(Math.random() * 1000);
            this.list.find('.' + this.widgetBaseClass +
                '-item-selected').removeClass(this.widgetBaseClass +
                "-item-selected" + activeClass).find('a').attr(
                'aria-selected', 'false').attr('id', '');
            this._selectedOptionLi().addClass(this.widgetBaseClass +
                "-item-selected" + activeClass).find('a').attr(
                'aria-selected', 'true').attr('id',
                activeID);
            var currentOptionClasses = this.newelement.data(
                'optionClasses') ? this.newelement.data(
                'optionClasses') : "";
            var newOptionClasses = this._selectedOptionLi().data(
                    'optionClasses') ? this._selectedOptionLi()
                .data('optionClasses') : "";
            this.newelement.removeClass(currentOptionClasses).data(
                'optionClasses', newOptionClasses).addClass(
                newOptionClasses).find('.' + this.widgetBaseClass +
                '-status').html(this._selectedOptionLi().find(
                'a:eq(0)').html());
            this.list.attr('aria-activedescendant', activeID)
        },
        _refreshPosition: function() {
            this.list.css('left', this.newelement.offset().left);
            var menuTop = this.newelement.offset().top;
            var scrolledAmt = this.list[0].scrollTop;
            this.list.find('li:lt(' + this._selectedIndex() +
                ')').each(function() {
                scrolledAmt -= $(this).outerHeight();
            });
            if (this.newelement.is('.' + this.widgetBaseClass +
                    '-popup')) {
                menuTop += scrolledAmt;
                this.list.css('top', menuTop);
            } else {
                menuTop += this.newelement.height();
                this.list.css('top', menuTop);
            }
        }
    });
    $.extend($.ui.selectmenu, {
        getter: "value",
        version: "@VERSION",
        eventPrefix: "selectmenu",
        defaults: {
            transferClasses: true,
            style: 'popup',
            width: null,
            menuWidth: null,
            handleWidth: 26,
            maxHeight: null,
            icons: null,
            format: null
        }
    });
})(jQuery);

function $_GET(s) {
    var qs = document.location.search;
    qs = qs.split("+").join(" ");
    var param;
    var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        if (tokens[1] == s) {
            param = decodeURIComponent(tokens[2]);
        }
    }
    return param;
};

function utf8_encode(argString) {
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
    var string = (argString + '');
    var utftext = "",
        start, end, stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((
                c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode((
                (c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) |
                128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
    return utftext;
};

function utf8_decode(str_data) {
    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;
    str_data += '';
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) <<
                6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
};

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
};

function urlDecode(url) {
    url = url.replace(/Ü/g, 'ue');
    url = url.replace(/ü/g, 'ue');
    url = url.replace(/Ä/g, 'ae');
    url = url.replace(/ä/g, 'ae');
    url = url.replace(/Ö/g, 'oe');
    url = url.replace(/ö/g, 'oe');
    url = url.replace(/ß/g, 'ss');
    url = url.replace(/ /g, '-');
    url = url.replace(/\(/g, '');
    url = url.replace(/\)/g, '');
    url = url.replace(/\//g, '-');
    return url;
};
var Shopfinder = {
    api: false,
    apiBusy: false,
    apiCallbackStack: [],
    activeMarker: null,
    countryCode: '',
    updateCookieBusy: false,
    directionsService: '',
    directionsRenderer: '',
    directionsFrom: '',
    directionsTo: '',
    directionsInit: false,
    footerBusyCounter: 0,
    geocoder: false,
    geocoderErr: '',
    geoData: false,
    inputErr: '',
    inputDefault: '',
    listContainer: '',
    linkDetail: '',
    linkDirections: '',
    linkMain: '',
    linkNameDetail: '',
    linkNameDirections: '',
    linkNameShowAll: '',
    map: null,
    mapContainer: '',
    markers: [],
    markerIcon: '',
    markerIconHover: '',
    previewContainer: '',
    qryAddress: false,
    resTmp: [],
    resNr: 3,
    searchInputFields: [],
    showInfoPopup: true,
    showAnimation: false,
    shopsJson: [],
    shopListPid: '',
    tmpConf: null,
    visibleInfoWindow: null,
    mapOptions: {
        zoom: '',
        center: '',
        mapTypeId: '',
        scrollwheel: false
    },
    init: function(confObj, type) {
        switch (type) {
            case 'main':
                this.tmpConf = confObj;
                this.loadAPI('initMap');
                break;
            case 'detail':
                this.tmpConf = confObj;
                this.loadAPI('initDirectionsMap');
                break;
        }
        this.countryCode = confObj.countryCode;
        this.linkDetail = confObj.linkDetail;
        this.shopListPid = confObj.shopListPid;
        this.linkNameDetail = this.linkNameDetail ? this.linkNameDetail :
            confObj.linkNameDetail;
        this.linkNameDirections = this.linkNameDirections ? this.linkNameDirections :
            confObj.linkNameDirections;
        this.inputErr = confObj.inputErr;
        this.inputDefault = confObj.inputDefault;
        this.linkNameShowAll = confObj.linkNameShowAll ? confObj.linkNameShowAll :
            this.linkNameShowAll;
        this.linkMain = confObj.linkMain;
    },
    initMap: function() {
        var that = this;
        this.mapContainer = $('#dmcshopfinderMapWrapper').get(0);
        this.listContainer = $('#dmcshopfinderListWrapper').get(0);
        this.previewContainer = $('#dmcshopfinderPreviewWrapper');
        this.shopsJson = this.tmpConf.shopsJson;
        this.markerIcon = this.tmpConf.markerIcon;
        this.markerIconHover = this.tmpConf.markerIconHover;
        this.linkDetail = this.tmpConf.linkDetail;
        this.geocoderErr = this.tmpConf.geocoderErr;
        this.kmz = this.tmpConf.kmz;
        this.mapOptions.zoom = this.tmpConf.mapZoom;
        this.mapOptions.center = new google.maps.LatLng(this.tmpConf.mapLat,
            this.tmpConf.mapLng);
        this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.map = new google.maps.Map(this.mapContainer, this.mapOptions);
        this.renderKMZ();
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }
        this.getMarkers(function() {
            if ($_GET('dmcshopfinderLocation')) {
                $('#dmcshopfinderSearch1Input').attr('value',
                    $_GET('dmcshopfinderLocation'));
                $('#dmcshopfinderSearch1Input').attr('class',
                    'txt');
                that.findClosestMarkers($_GET(
                    'dmcshopfinderLocation'));
            }
        });
    },
    initDirectionsMap: function() {
        var that = this;
        var ptr = this.tmpConf.shopsJson;
        var cookieData = cookie_get('mb3p_location');
        var origin = '';
        var destination = '';
        this.geocoderErr = this.tmpConf.geocoderErr;
        this.mapOptions.zoom = this.tmpConf.mapZoom;
        this.mapOptions.center = new google.maps.LatLng(this.tmpConf.mapLat,
            this.tmpConf.mapLng);
        this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.mapContainer = $('#dmcshopfinderDirectionsMapWrapper').get(
            0);
        this.map = new google.maps.Map(this.mapContainer, this.mapOptions);
        if ($_GET('dmcshopfinderOrigin') && $_GET(
                'dmcshopfinderDestination')) {
            origin = $_GET('dmcshopfinderOrigin');
            destination = $_GET('dmcshopfinderDestination');
        } else if (cookieData && typeof cookieData != 'undefined') {
            var cookieJson = JSON.parse(cookieData);
            cookieJson.address = htmlEntities(cookieJson.address);
            origin = str_replace('+', ' ', cookieJson.address);
            destination = ptr.address + ',' + ptr.zipcode + ' ' + ptr.city;
        } else {
            origin = ',';
            destination = ptr.address + ',' + ptr.zipcode + ' ' + ptr.city;
        };
        if (!(origin == ',' && !this.geoData)) {
            this.calRoute(origin, destination);
        } else {
            origin = '';
            this.geoData = true;
        };
        this.initInputDirections(origin, destination);
    },
    initInputDirections: function(origin, destination) {
        var that = this;
        var inp1;
        var inp2;
        var tmp;
        var tmpClasses;
        $('#dmcshopfinderDirectionsInput').find('input').each(function() {
            if ($(this).attr('name') == 'dmcshopfinderOrigin') {
                $(this).attr('value', origin);
                inp1 = $(this);
                inp1.css('color', '#333');
            } else {
                $(this).attr('value', destination);
                inp2 = $(this);
            }
            $(this).click(function() {
                $(this).attr('value', $(this).attr(
                    'disabled') ? $(this).attr(
                    'value') : '');
            });
            $(this).keyup(function(event) {
                if (event.keyCode == '13') {
                    $('#dmcshofpinderBtnSubmit').trigger(
                        'click');
                }
            });
        });
        $('#dmcshofpinderBtnSwitch').click(function() {
            tmp = inp1.attr('value');
            tmpClasses = inp1.attr('class');
            inp1.attr('value', inp2.attr('value'));
            inp1.attr('class', inp2.attr('class'));
            inp2.attr('value', tmp);
            inp2.attr('class', tmpClasses);
            if (inp1.attr('disabled')) {
                inp1.removeAttr('disabled');
                inp1.css('color', '#333');
                inp2.attr('disabled', 'disabled');
                inp2.css('color', '#999');
            } else {
                inp2.removeAttr('disabled');
                inp2.css('color', '#333');
                inp1.attr('disabled', 'disabled');
                inp1.css('color', '#999');
            }
        });
        $('#dmcshofpinderBtnSubmit').click(function() {
            that.resetDirections();
            that.calRoute(inp1.attr('value'), inp2.attr('value'));
        });
    },
    loadAPICallbackHandler: function() {},
    loadAPI: function(callback) {
        var that = this;
        this.apiCallbackStack.push(callback);
        this.loadAPICallbackHandler = function() {
            this.api = true;
            $.each(that.apiCallbackStack.sort(), function() {
                if (typeof that[this] == 'function') {
                    that[this]();
                }
            });
        };
        if (!this.apiBusy && !this.api) {
            this.apiBusy = true;
            var script = document.createElement('script');
            var prot = window.document.location.protocol;
            script.src = prot +
                '//maps.google.com/maps/api/js?sensor=false&language=de&callback=Shopfinder.loadAPICallbackHandler';
            script.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(script);
        } else if (this.api) {
            if (typeof this[callback] == 'function') {
                this[callback]();
            }
        };
    },
    renderKMZ: function() {
        if (this.kmz != '' && this.kmz != 'undefined') {
            var ctaLayer = new google.maps.KmlLayer(this.kmz, {
                map: this.map,
                clickable: false,
                preserveViewport: true,
                suppressInfoWindows: false
            });
        }
    },
    calRoute: function(origin, destination) {
        var that = this;
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer.setMap(this.map);
        this.directionsRenderer.setPanel($(
            "#dmcshopfinderDirectionsListWrapper").get(0));
        var mode = google.maps.DirectionsTravelMode.DRIVING;
        var request = {
            origin: origin,
            destination: destination,
            travelMode: mode
        };
        this.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $('#dmcshopfinderDirectionsInput').find('input')
                    .each(function() {
                        if (!$(this).attr('disabled')) {
                            that.removeErrors();
                        }
                    });
                that.directionsRenderer.setDirections(response);
            } else {
                $('#dmcshopfinderDirectionsInput').find('input')
                    .each(function() {
                        if (!$(this).attr('disabled')) {
                            that.showError($(
                                '#dmcshopfinderDirectionsInput'
                            ), $(this), that.geocoderErr);
                        }
                    });
            }
        });
    },
    resetDirections: function() {
        try {
            this.directionsRenderer.setMap(null);
        } catch (e) {};
        try {
            this.directionsRenderer.setPanel(null);
        } catch (e) {};
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(this.map);
        this.directionsRenderer.setPanel($(
            "#dmcshopfinderDirectionsListWrapper").get(0));
    },
    initSearchButton: function(input, id, action) {
        var that = this;
        this.searchInputFields.push(input);
        switch (action) {
            case 'home':
                $('#' + input).keyup(function(event) {
                    if (event.keyCode == '13') {
                        $('#' + id).trigger('click');
                    }
                });
                $('#' + id).click(function() {
                    if (that.reviseSearchInput($('#' + input).attr(
                            'value'), $('#' + input).attr(
                            'data-hint'))) {
                        that.removeErrors();
                        that.findClosestMarkers($('#' + input).attr(
                            'value'));
                    } else {
                        that.showError($(
                            '#dmcshopfinderSearch1Wrapper'
                        ), $('#' + input), that.inputErr);
                    }
                });
                break;
            default:
                if ($_GET('dmcshopfinderLocation')) {
                    $('#' + input).attr('value', $_GET(
                        'dmcshopfinderLocation'));
                }
                $('#' + input).click(function() {
                    $('#' + input).attr('value', '');
                });
                break;
        }
    },
    onSubmitHandler: function(input) {
        if (this.reviseSearchInput($('#' + input).attr('value'), $('#' +
                input).attr('data-hint'))) {
            this.removeErrors();
            return true;
        } else {
            this.showError($('#' + input).parent('form'), $('#' + input),
                this.inputErr);
            return false;
        }
    },
    reviseSearchInput: function(txt, defTxt) {
        var len = '';
        var revise = false;
        switch (this.countryCode) {
            case 'de':
                len = 5;
                break;
            case 'at':
            case 'ch':
                len = 4;
                break;
        }
        if (txt.match(/^[0123456789]+$/)) {
            if (txt.length == len) {
                revise = true;
            }
        } else {
            if (txt.length > 0 && txt != defTxt) {
                revise = true;
            }
        }
        return revise;
    },
    initClearButton: function(id) {
        var that = this;
        $('#' + id).click(function() {
            $('#dmcshopfinderSearchResultList').slideUp(500);
            $.each(that.searchInputFields, function(val, key) {
                $('#' + this).attr('class',
                    'txt datahint');
                $('#' + this).attr('value', $('#' +
                    this).attr('data-hint'));
            });
            that.removeErrors();
            that.previewContainer.html($(
                '#dmcshopfinderPreviewWrapperIntro').html());
            that.resetMarkers();
        });
    },
    findClosestMarkers: function(address, callback, regionBased) {
        var that = this;
        var attr = 0;
        var Numsort = function(a, b) {
            return (a)[attr] - (b)[attr];
        }
        var geoJSON = this.geocoder.geocode({
            'address': address + (regionBased == 'noRegion' ?
                '' : ', ' + this.countryCode),
            'region': regionBased == 'noRegion' ? '' : this.countryCode
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                var mlat;
                var mlng;
                var d;
                that.removeErrors();
                that.resTmp = [];
                for (var i = 0; i < that.markers.length; i++) {
                    mlat = that.markers[i].position.lat();
                    mlng = that.markers[i].position.lng();
                    d = Math.pow((lat - mlat), 2) + Math.pow((
                        lng - mlng), 2);
                    that.resTmp[i] = [];
                    that.resTmp[i][0] = d;
                    that.resTmp[i][1] = i;
                }
                that.resTmp.sort(Numsort);
                if (callback) {
                    callback();
                } else {
                    that.showSearchResult();
                }
            } else {
                that.showError($('#dmcshopfinderSearch1Wrapper'),
                    $('#dmcshopfinderSearch1Input'), that.geocoderErr
                );
            }
        });
    },
    showError: function(layer, input, msg) {
        this.removeErrors();
        var err = $('<div class="error" id="dmcshopfinderError"></div>');
        err.html(msg);
        layer.prepend(err);
        input.addClass('error');
    },
    removeErrors: function() {
        $('#dmcshopfinderError').remove();
        $('input').removeClass('error');
    },
    showSearchResult: function() {
        var template = $('.dmcshopfinderSearchResultTemplate');
        template.css('display', 'none');
        var resultList = '';
        var tmpTemplate;
        var ptr = 0;
        for (var i = 0; i < this.resNr; i++) {
            ptr = this.markers[this.resTmp[i][1]];
            tmpTemplate = template.html();
            $.each(ptr.json, function(index, value) {
                if (value == null || value == '') {
                    tmpTemplate = tmpTemplate.replace('#JS' +
                        index.toUpperCase() + '#<br>', '').replace(
                        '#JS' + index.toUpperCase() +
                        '#<BR>', '');
                } else {
                    tmpTemplate = tmpTemplate.replace('#JS' +
                        index.toUpperCase() + '#', value);
                }
            });
            tmpTemplate = tmpTemplate.replace('#JSLINKDETAIL#', this.getShopUrl(
                this.linkDetail, ptr.uid, ptr.title));
            tmpTemplate = tmpTemplate.replace('#JSLINKNAMEDETAIL#',
                this.linkNameDetail);
            tmpTemplate = tmpTemplate.replace('#JSLINKDIRECTIONS#',
                this.getShopUrl(this.linkDetail, ptr.uid, ptr.title) +
                '?dmcshopfinderTab=geo');
            tmpTemplate = tmpTemplate.replace('#JSLINKNAMEDIRECTIONS#',
                this.linkNameDirections);
            resultList += tmpTemplate;
        }
        $('#dmcshopfinderSearchResultList').html(resultList);
        $('#dmcshopfinderSearchResultList').show("fast");
        $('#dmcshopfinderSearchResultList').find(
            '.dmcshopfinderButtonMore').click(function() {
            var lls = $(this).attr('rel').split('___');
            $(this).html($(this).html() == lls[0] ? lls[1] :
                lls[0]);
            $(this).parent().find('.jsMoreInfo').slideToggle(
                "fast");
            if ($(this).hasClass('open'))
                $(this).removeClass('open')
            else
                $(this).addClass('open')
        });
        this.highlightMarkerGroup();
        this.showPreview(this.markers[this.resTmp[0][1]]);
    },
    hoverMarkerAndItems: function(infoWindow, marker, googlePopup) {
        var that = this;
        return function() {
            that.resetMarkers();
            marker.setZIndex(10000);
            that.highlightMarker(marker);
            if (that.visibleInfoWindow && that.visibleInfoWindow !=
                infoWindow) {
                that.visibleInfoWindow.close();
            }
            if (that.showInfoPopup && googlePopup) {
                infoWindow.open(that.map, marker);
                that.visibleInfoWindow = infoWindow;
            }
            that.showPreview(marker);
        };
    },
    showPreview: function(marker) {
        if (this.previewContainer.find('div:first').html() != marker.previewWindow
            .html()) {
            this.previewContainer.html(marker.previewWindow);
        }
    },
    highlightMarkerGroup: function() {
        this.resetMarkers();
        for (var i = 0; i < this.resNr; i++) {
            this.markers[this.resTmp[i][1]].setIcon(this.markerIconHover);
            this.markers[this.resTmp[i][1]].setZIndex(10000);
            if (this.showAnimation) {
                this.markers[this.resTmp[i][1]].setAnimation(google.maps
                    .Animation.BOUNCE);
            }
        }
    },
    resetMarkers: function() {
        this.activeMarker = false;
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setIcon(this.markerIcon);
            this.markers[i].setZIndex(10);
            if (this.showAnimation) {
                this.markers[i].setAnimation(null);
            }
        }
    },
    highlightMarker: function(marker) {
        if (this.activeMarker && this.activeMarker != marker) {
            this.activeMarker.setIcon(this.markerIcon);
            if (this.showAnimation) {
                this.activeMarker.setAnimation(null);
            }
        }
        if (this.activeMarker != marker) {
            marker.setIcon(this.markerIconHover);
            if (this.showAnimation) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            this.activeMarker = marker;
        }
    },
    findClosestMarkerHandler: function() {},
    updateCookie: function(callback) {
        if (!this.updateCookieBusy && false) {
            this.updateCookieBusy = true;
            var that = this;
            var cookieData = cookie_get('mb3p_location');
            var cookieJson = '';
            if (cookieData && typeof cookieData != 'undefined') {
                var cookieJson = JSON.parse(cookieData);
                if (cookieJson.rendered) {
                    this[callback]();
                } else {
                    $.getJSON(
                        "http://baby-walz.de/typo3conf/ext/dmcshopfinder/pi1/dmcshopfinder_getJSON.php?", {
                            'pid': '19107'
                        },
                        function(data) {
                            that.shopsJson = data;
                            that.loadMarkers();
                            cookieJson.shops = [];
                            that.loadAPI('findClosestMarkerHandler');
                        });
                }
            };
            this.findClosestMarkerHandler = function() {
                if (!that.geocoder) {
                    that.geocoder = new google.maps.Geocoder();
                };
                that.findClosestMarkers(htmlEntities(cookieJson.address),
                    function() {
                        var ptr;
                        for (var i = 0; i < that.resNr; i++) {
                            ptr = that.markers[that.resTmp[i][1]];
                            cookieJson.shops[i] = {
                                title: ptr.title,
                                uid: ptr.uid,
                                position: {
                                    latPos: ptr.position.lat(),
                                    lngPos: ptr.position.lng(),
                                    lat: function() {
                                        return this.latPos;
                                    },
                                    lng: function() {
                                        return this.lngPos;
                                    }
                                }
                            };
                            if (i == 0) {
                                cookieJson.shops[i].json = ptr.json;
                            }
                        }
                        cookieJson.rendered = cookieJson.shops.length >
                            0 ? true : false;
                        cookieData = JSON.stringify(cookieJson);
                        cookieData = htmlEntities(cookieData);
                        cookie_set('mb3p_location', cookieData,
                            '', '/');
                        if (typeof that[callback] == 'function') {
                            that[callback]();
                        };
                    }, 'noRegion');
            };
        } else {};
    },
    showFooter: function() {
        var template = $('#dmcshopfinderFooterList li:first-child');
        var tmpTemplate;
        var cookieData = cookie_get('mb3p_location');
        if (cookieData && typeof cookieData != 'undefined') {
            var json = JSON.parse(cookieData);
            var resultList = '';
            if (json.shops.length > 1) {
                for (var i = 0; i < json.shops.length; i++) {
                    tmpTemplate = template.html();
                    tmpTemplate = tmpTemplate.replace('#JSDETAILINK#',
                        this.getShopUrl(this.linkDetail,
                            htmlEnteties(json.shops[i].uid),
                            htmlEntities(json.shops[i].title)));
                    tmpTemplate = tmpTemplate.replace('#JSSHOPNAME#',
                        htmlEntities(json.shops[i].title));
                    resultList += '<li>' + tmpTemplate + '</li>';
                }
                $('#dmcshopfinderFooterList').html(resultList);
            } else if (this.footerBusyCounter < 3) {
                var t = setTimeout("Shopfinder.showFooter()", 500);
                this.footerBusyCounter++;
            };
        };
    },
    showClosest: function() {
        var template = $('#dmcshopfinderClosest');
        var tmpTemplate;
        var cookieData = cookie_get('mb3p_location');
        if (cookieData && typeof cookieData != 'undefined') {
            var json = JSON.parse(cookieData);
            var content = '';
            tmpTemplate = template.html();
            tmpTemplate = tmpTemplate.replace('#JSLINKDETAIL#', this.getShopUrl(
                this.linkDetail, htmlEntities(json.shops[0].uid),
                htmlEntities(json.shops[0].title)));
            tmpTemplate = tmpTemplate.replace('#JSLINKNAMEDETAIL#',
                this.linkNameDetail);
            tmpTemplate = tmpTemplate.replace('#JSLINKDIRECTIONS#',
                this.getShopUrl(this.linkDetail, htmlEntities(json.shops[
                    0].uid), htmlEntities(json.shops[0].title)) +
                '?dmcshopfinderTab=geo');
            tmpTemplate = tmpTemplate.replace('#JSLINKNAMEDIRECTIONS#',
                this.linkNameDirections);
            $.each(json.shops[0].json, function(index, value) {
                if (value == null || value == '') {
                    tmpTemplate = tmpTemplate.replace('#JS' +
                        index.toUpperCase() + '#<br>', '').replace(
                        '#JS' + index.toUpperCase() +
                        '#<BR>', '');
                } else {
                    tmpTemplate = tmpTemplate.replace('#JS' +
                        index.toUpperCase() + '#', value.replace(
                            /([^>\r\n]?)(\r\n|\n\r|\r|\n)/gm,
                            '<br />'));
                }
            });
            content = tmpTemplate;
            $('#dmcshopfinderClosest').html(content);
            $('#dmcshopfinderClosest').css('display', 'block');
            $('#dmcshopfinderClosest').find('.dmcshopfinderButtonMore')
                .click(function() {
                    var lls = $(this).attr('rel').split('___');
                    $(this).html($(this).html() == lls[0] ? lls[1] :
                        lls[0]);
                    $('#dmcshopfinderClosest').find('.jsMoreInfo').slideToggle(
                        "fast");
                    if ($(this).hasClass('open'))
                        $(this).removeClass('open')
                    else
                        $(this).addClass('open')
                });
        }
    },
    showDetail: function() {
        var i, j;
        var that = this;
        if ($('#dmcshopfinderTabs').parent().parent().attr('id') ==
            'popup') {
            that.init(ShopfinderDirectionsConf, 'detail');
            that.directionsInit = true;
            that.waitForGMap('.adp-directions', function() {
                $('.adp-directions tr').each(function(i, row) {
                    $(row).find('td').eq(1).addClass(
                        "adp-td-info");
                    $(row).find('td').eq(2).addClass(
                        "adp-td-distance");
                });
            });
        } else {
            $('#dmcshopfinderTabs').find('li').each(function(i) {
                $(this).click(function() {
                    $('#dmcshopfinderTabs').find('li').removeClass(
                        'active');
                    $(this).addClass('active');
                    $('#dmcshopfinderTabContent > div')
                        .each(function(j) {
                            $(this).css('display',
                                i == j ?
                                'block' :
                                'none');
                        });
                    if (i == $('#dmcshopfinderTabs').find(
                            'li').length - 1 && !that.directionsInit) {
                        that.init(
                            ShopfinderDirectionsConf,
                            'detail');
                        that.directionsInit = true;
                        that.waitForGMap(
                            '.adp-directions',
                            function() {
                                $(
                                    '.adp-directions tr'
                                ).each(function(
                                    i, row) {
                                    $(row).find(
                                        'td'
                                    ).eq(
                                        1
                                    ).addClass(
                                        "adp-td-info"
                                    );
                                    $(row).find(
                                        'td'
                                    ).eq(
                                        2
                                    ).addClass(
                                        "adp-td-distance"
                                    );
                                });
                            });
                    }
                    try {
                        if ($('#stage-carousel').get(0) !=
                            null && $(
                                '#stage-carousel:visible'
                            ).get(0) != null && $(
                                '.jcarousel-container')
                            .get(0) == null) {
                            Stage.Timeout = 5;
                            Stage.Init();
                        }
                    } catch (err) {}
                });
            });
        }
        if ($_GET('dmcshopfinderTab') == 'geo') {
            this.init(ShopfinderDirectionsConf, 'detail');
            that.directionsInit = true;
        }
    },
    waitForGMap: function(object, callback) {
        if ($(object).get(0) != null) {
            if (callback)
                callback();
        } else {
            var that = this;
            setTimeout(function() {
                that.waitForGMap(object, callback);
            }, 500);
        }
    },
    getShopUrl: function(t3url, uid, title) {
        sUrl = t3url.split('/L/');
        return sUrl[0] + '/L/' + sUrl[1].split('/')[0] + '/sid/' + uid +
            '/Ort/' + urlDecode(title) + '/' + sUrl[1].split('/')[1];
    },
    getMarkers: function(callback) {
        var that = this;
        this.markers = [];
        for (var i = 0; i < this.shopsJson.length; i++) {
            var tmpLatLng = new google.maps.LatLng(this.shopsJson[i].lat,
                this.shopsJson[i].lon);
            var marker = new google.maps.Marker({
                map: this.map,
                uid: this.shopsJson[i].uid,
                json: this.shopsJson[i],
                title: this.shopsJson[i].name,
                position: tmpLatLng,
                draggable: true,
                previewWindow: '',
                icon: this.markerIcon
            });
            var infoWindow = new google.maps.InfoWindow({
                content: ['<h3>' + this.shopsJson[i].name +
                    '</h3>', '<div>' + this.shopsJson[i].address +
                    '</div>'
                ].join(''),
                size: new google.maps.Size(200, 80)
            });
            (function(uid, title) {
                google.maps.event.addListener(marker, 'click',
                    function() {
                        window.location = that.getShopUrl(that.linkDetail,
                            uid, title);
                    });
            })(marker.uid, marker.title);
            google.maps.event.addListener(marker, 'mouseover', this.hoverMarkerAndItems(
                infoWindow, marker, false));
            var li = document.createElement('li');
            $(li).addClass('l2');
            var aSel = $('<a></a>');
            aSel.addClass('l2');
            aSel.attr('href', this.getShopUrl(this.linkDetail, marker.uid,
                marker.title));
            aSel.html(this.shopsJson[i].name);
            aSel.click(this.hoverMarkerAndItems(infoWindow, marker,
                true));
            aSel.mouseover(this.hoverMarkerAndItems(infoWindow, marker,
                false));
            li.appendChild(aSel.get(0));
            this.listContainer.appendChild(li);
            var template = $('.dmcshopfinderPreviewTemplate');
            template.css('display', 'none');
            var tmpTemplate;
            tmpTemplate = template.html();
            $.each(marker.json, function(index, value) {
                if (value == null || value == '') {
                    tmpTemplate = tmpTemplate.replace('#JS' +
                        index.toUpperCase() + '#<br>', '').replace(
                        '#JS' + index.toUpperCase() +
                        '#<BR>', '');
                } else {
                    tmpTemplate = tmpTemplate.replace('#JS' +
                        index.toUpperCase() + '#', value);
                }
            });
            tmpTemplate = tmpTemplate.replace('#JSLINKDETAIL#', this.getShopUrl(
                this.linkDetail, marker.uid, marker.title));
            tmpTemplate = tmpTemplate.replace('#JSLINKNAMEDETAIL#',
                this.linkNameDetail);
            tmpTemplate = tmpTemplate.replace('#JSLINKDIRECTIONS#',
                this.getShopUrl(this.linkDetail, marker.uid, marker
                    .title) + '?dmcshopfinderTab=geo');
            tmpTemplate = tmpTemplate.replace('#JSLINKNAMEDIRECTIONS#',
                this.linkNameDirections);
            marker.previewWindow = $(tmpTemplate);
            this.markers.push(marker);
        }
        if (callback) {
            callback();
        }
    },
    loadMarkers: function() {
        if (this.markers.length < 1) {
            for (var i = 0; i < this.shopsJson.length; i++) {
                var marker = {
                    title: this.shopsJson[i].name,
                    uid: this.shopsJson[i].uid,
                    position: {
                        latPos: this.shopsJson[i].lat,
                        lngPos: this.shopsJson[i].lon,
                        lat: function() {
                            return this.latPos;
                        },
                        lng: function() {
                            return this.lngPos;
                        }
                    },
                    json: this.shopsJson[i]
                };
                this.markers.push(marker);
            }
        }
    }
};
(function($) {
    var tmp, loading, overlay, wrap, outer, inner, close, nav_left,
        nav_right, selectedIndex = 0,
        selectedOpts = {},
        selectedArray = [],
        currentIndex = 0,
        currentOpts = {},
        currentArray = [],
        ajaxLoader = null,
        imgPreloader = new Image(),
        imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
        swfRegExp = /[^\.]\.(swf)\s*$/i,
        loadingTimer, loadingFrame = 1,
        start_pos, final_pos, busy = false,
        shadow = 20,
        fx = $.extend($('<div/>')[0], {
            prop: 0
        }),
        titleh = 0,
        isIE6 = !$.support.opacity && !window.XMLHttpRequest,
        fancybox_abort = function() {
            return;
            loading.hide();
            imgPreloader.onerror = imgPreloader.onload = null;
            if (ajaxLoader) {
                ajaxLoader.abort();
            }
            tmp.empty();
        },
        fancybox_error = function() {
            $.fancybox(
                '<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
                    'scrolling': 'no',
                    'padding': 20,
                    'transitionIn': 'none',
                    'transitionOut': 'none'
                });
        },
        fancybox_get_viewport = function() {
            return [$(window).width(), $(window).height(), $(document).scrollLeft(),
                $(document).scrollTop()
            ];
        },
        fancybox_get_zoom_to = function() {
            var view = fancybox_get_viewport(),
                to = {},
                margin = currentOpts.margin,
                resize = currentOpts.autoScale,
                horizontal_space = (shadow + margin) * 2,
                vertical_space = (shadow + margin) * 2,
                double_padding = (currentOpts.padding * 2),
                ratio;
            if (currentOpts.width.toString().indexOf('%') > -1) {
                to.width = ((view[0] * parseFloat(currentOpts.width)) / 100) -
                    (shadow * 2);
                resize = false;
            } else {
                to.width = currentOpts.width + double_padding;
            }
            if (currentOpts.height.toString().indexOf('%') > -1) {
                to.height = ((view[1] * parseFloat(currentOpts.height)) /
                    100) - (shadow * 2);
                resize = false;
            } else {
                to.height = currentOpts.height + double_padding;
            }
            if (resize && (to.width > (view[0] - horizontal_space) || to.height >
                    (view[1] - vertical_space))) {
                if (selectedOpts.type == 'image' || selectedOpts.type ==
                    'swf') {
                    horizontal_space += double_padding;
                    vertical_space += double_padding;
                    ratio = Math.min(Math.min(view[0] - horizontal_space,
                            currentOpts.width) / currentOpts.width,
                        Math.min(view[1] - vertical_space, currentOpts.height) /
                        currentOpts.height);
                    to.width = Math.round(ratio * (to.width -
                        double_padding)) + double_padding;
                    to.height = Math.round(ratio * (to.height -
                        double_padding)) + double_padding;
                } else {
                    to.width = Math.min(to.width, (view[0] -
                        horizontal_space));
                    to.height = Math.min(to.height, (view[1] -
                        vertical_space));
                }
            }
            to.top = view[3] + ((view[1] - (to.height + (shadow * 2))) *
                0.5);
            to.left = view[2] + ((view[0] - (to.width + (shadow * 2))) *
                0.5);
            if (currentOpts.autoScale === false) {
                to.top = Math.max(view[3] + margin, to.top);
                to.left = Math.max(view[2] + margin, to.left);
            }
            return to;
        },
        fancybox_format_title = function(title) {
            if (title && title.length) {
                switch (currentOpts.titlePosition) {
                    case 'inside':
                        return title;
                    case 'over':
                        return '<span id="fancybox-title-over">' + title +
                            '</span>';
                    default:
                        return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' +
                        title +
                            '</span><span id="fancybox-title-right"></span></span>';
                }
            }
            return false;
        },
        fancybox_process_title = function() {
            var title = currentOpts.title,
                width = final_pos.width - (currentOpts.padding * 2),
                titlec = 'fancybox-title-' + currentOpts.titlePosition;
            $('#fancybox-title').remove();
            titleh = 0;
            if (currentOpts.titleShow === false) {
                return;
            }
            title = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(
                    title, currentArray, currentIndex, currentOpts) :
                fancybox_format_title(title);
            if (!title || title === '') {
                return;
            }
            $('<div id="fancybox-title" class="' + titlec + '" />').css({
                'width': width,
                'paddingLeft': currentOpts.padding,
                'paddingRight': currentOpts.padding
            }).html(title).appendTo('body');
            switch (currentOpts.titlePosition) {
                case 'inside':
                    titleh = $("#fancybox-title").outerHeight(true) -
                        currentOpts.padding;
                    final_pos.height += titleh;
                    break;
                case 'over':
                    $('#fancybox-title').css('bottom', currentOpts.padding);
                    break;
                default:
                    $('#fancybox-title').css('bottom', $("#fancybox-title")
                        .outerHeight(true) * -1);
                    break;
            }
            $('#fancybox-title').appendTo(outer).hide();
        },
        fancybox_set_navigation = function() {
            $(document).unbind('keydown.fb').bind('keydown.fb', function(e) {
                if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
                    e.preventDefault();
                    $.fancybox.close();
                } else if (e.keyCode == 37) {
                    e.preventDefault();
                    $.fancybox.prev();
                } else if (e.keyCode == 39) {
                    e.preventDefault();
                    $.fancybox.next();
                }
            });
            if ($.fn.mousewheel) {
                wrap.unbind('mousewheel.fb');
                if (currentArray.length > 1) {
                    wrap.bind('mousewheel.fb', function(e, delta) {
                        e.preventDefault();
                        if (busy || delta === 0) {
                            return;
                        }
                        if (delta > 0) {
                            $.fancybox.prev();
                        } else {
                            $.fancybox.next();
                        }
                    });
                }
            }
            if (!currentOpts.showNavArrows) {
                return;
            }
            if ((currentOpts.cyclic && currentArray.length > 1) ||
                currentIndex !== 0) {
                nav_left.show();
            }
            if ((currentOpts.cyclic && currentArray.length > 1) ||
                currentIndex != (currentArray.length - 1)) {
                nav_right.show();
            }
        },
        fancybox_preload_images = function() {
            var href, objNext;
            if ((currentArray.length - 1) > currentIndex) {
                href = currentArray[currentIndex + 1].href;
                if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                    objNext = new Image();
                    objNext.src = href;
                }
            }
            if (currentIndex > 0) {
                href = currentArray[currentIndex - 1].href;
                if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                    objNext = new Image();
                    objNext.src = href;
                }
            }
        },
        _finish = function() {
            inner.css('overflow', (currentOpts.scrolling == 'auto' ? (
                currentOpts.type == 'image' || currentOpts.type ==
                'iframe' || currentOpts.type == 'swf' ?
                'hidden' : 'auto') : (currentOpts.scrolling ==
                'yes' ? 'auto' : 'hidden')));
            if (!$.support.opacity) {
                inner.get(0).style.removeAttribute('filter');
                wrap.get(0).style.removeAttribute('filter');
            }
            $('#fancybox-title').show();
            if (currentOpts.hideOnContentClick) {
                inner.one('click', $.fancybox.close);
            }
            if (currentOpts.hideOnOverlayClick) {
                overlay.one('click', $.fancybox.close);
            }
            if (currentOpts.showCloseButton) {
                close.css('display', 'block');
            }
            fancybox_set_navigation();
            $(window).bind("resize.fb", $.fancybox.center);
            if (currentOpts.centerOnScroll) {
                $(window).bind("scroll.fb", $.fancybox.center);
            } else {
                $(window).unbind("scroll.fb");
            }
            if ($.isFunction(currentOpts.onComplete)) {
                currentOpts.onComplete(currentArray, currentIndex,
                    currentOpts);
            }
            busy = false;
            fancybox_preload_images();
        },
        fancybox_draw = function(pos) {
            var width = Math.round(start_pos.width + (final_pos.width -
                    start_pos.width) * pos),
                height = Math.round(start_pos.height + (final_pos.height -
                    start_pos.height) * pos),
                top = Math.round(start_pos.top + (final_pos.top - start_pos
                    .top) * pos),
                left = Math.round(start_pos.left + (final_pos.left -
                    start_pos.left) * pos);
            wrap.css({
                'width': width + 'px',
                'height': height + 'px',
                'top': top + 'px',
                'left': left + 'px'
            });
            width = Math.max(width - currentOpts.padding * 2, 0);
            height = Math.max(height - (currentOpts.padding * 2 + (titleh *
                pos)), 0);
            inner.css({
                'width': width + 'px',
                'height': height + 'px'
            });
            if (typeof final_pos.opacity !== 'undefined') {
                wrap.css('opacity', (pos < 0.5 ? 0.5 : pos));
            }
        },
        fancybox_get_obj_pos = function(obj) {
            var pos = obj.offset();
            pos.top += parseFloat(obj.css('paddingTop')) || 0;
            pos.left += parseFloat(obj.css('paddingLeft')) || 0;
            pos.top += parseFloat(obj.css('border-top-width')) || 0;
            pos.left += parseFloat(obj.css('border-left-width')) || 0;
            pos.width = obj.width();
            pos.height = obj.height();
            return pos;
        },
        fancybox_get_zoom_from = function() {
            var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
                from = {},
                pos, view;
            if (orig && orig.length) {
                pos = fancybox_get_obj_pos(orig);
                from = {
                    width: (pos.width + (currentOpts.padding * 2)),
                    height: (pos.height + (currentOpts.padding * 2)),
                    top: (pos.top - currentOpts.padding - shadow),
                    left: (pos.left - currentOpts.padding - shadow)
                };
            } else {
                view = fancybox_get_viewport();
                from = {
                    width: 1,
                    height: 1,
                    top: view[3] + view[1] * 0.5,
                    left: view[2] + view[0] * 0.5
                };
            }
            return from;
        },
        fancybox_show = function() {
            loading.hide();
            if (wrap.is(":visible") && $.isFunction(currentOpts.onCleanup)) {
                if (currentOpts.onCleanup(currentArray, currentIndex,
                        currentOpts) === false) {
                    $.event.trigger('fancybox-cancel');
                    busy = false;
                    return;
                }
            }
            currentArray = selectedArray;
            currentIndex = selectedIndex;
            currentOpts = selectedOpts;
            inner.get(0).scrollTop = 0;
            inner.get(0).scrollLeft = 0;
            if (currentOpts.overlayShow) {
                if (isIE6) {
                    $('select:not(#fancybox-tmp select)').filter(function() {
                        return this.style.visibility !== 'hidden';
                    }).css({
                        'visibility': 'hidden'
                    }).one('fancybox-cleanup', function() {
                        this.style.visibility = 'inherit';
                    });
                }
                overlay.css({
                    'background-color': currentOpts.overlayColor,
                    'opacity': currentOpts.overlayOpacity
                }).unbind().show();
            }
            final_pos = fancybox_get_zoom_to();
            fancybox_process_title();
            if (wrap.is(":visible")) {
                $(close.add(nav_left).add(nav_right)).hide();
                var pos = wrap.position(),
                    equal;
                start_pos = {
                    top: pos.top,
                    left: pos.left,
                    width: wrap.width(),
                    height: wrap.height()
                };
                equal = (start_pos.width == final_pos.width && start_pos.height ==
                    final_pos.height);
                inner.fadeOut(currentOpts.changeFade, function() {
                    var finish_resizing = function() {
                        inner.html(tmp.contents()).fadeIn(
                            currentOpts.changeFade, _finish
                        );
                    };
                    $.event.trigger('fancybox-change');
                    inner.empty().css('overflow', 'hidden');
                    if (equal) {
                        inner.css({
                            top: currentOpts.padding,
                            left: currentOpts.padding,
                            width: Math.max(final_pos.width -
                                (currentOpts.padding *
                                    2), 1),
                            height: Math.max(final_pos.height -
                                (currentOpts.padding *
                                    2) - titleh, 1)
                        });
                        finish_resizing();
                    } else {
                        inner.css({
                            top: currentOpts.padding,
                            left: currentOpts.padding,
                            width: Math.max(start_pos.width -
                                (currentOpts.padding *
                                    2), 1),
                            height: Math.max(start_pos.height -
                                (currentOpts.padding *
                                    2), 1)
                        });
                        fx.prop = 0;
                        $(fx).animate({
                            prop: 1
                        }, {
                            duration: currentOpts.changeSpeed,
                            easing: currentOpts.easingChange,
                            step: fancybox_draw,
                            complete: finish_resizing
                        });
                    }
                });
                return;
            }
            wrap.css('opacity', 1);
            if (currentOpts.transitionIn == 'elastic') {
                start_pos = fancybox_get_zoom_from();
                inner.css({
                    top: currentOpts.padding,
                    left: currentOpts.padding,
                    width: Math.max(start_pos.width - (currentOpts.padding *
                        2), 1),
                    height: Math.max(start_pos.height - (
                        currentOpts.padding * 2), 1)
                }).html(tmp.contents());
                wrap.css(start_pos).show();
                if (currentOpts.opacity) {
                    final_pos.opacity = 0;
                }
                fx.prop = 0;
                $(fx).animate({
                    prop: 1
                }, {
                    duration: currentOpts.speedIn,
                    easing: currentOpts.easingIn,
                    step: fancybox_draw,
                    complete: _finish
                });
            } else {
                inner.css({
                    top: currentOpts.padding,
                    left: currentOpts.padding,
                    width: Math.max(final_pos.width - (currentOpts.padding *
                        2), 1),
                    height: Math.max(final_pos.height - (
                            currentOpts.padding * 2) - titleh,
                        1)
                }).html(tmp.contents());
                wrap.css(final_pos).fadeIn(currentOpts.transitionIn ==
                    'none' ? 0 : currentOpts.speedIn, _finish);
            }
        },
        fancybox_process_inline = function() {
            tmp.width(selectedOpts.width);
            tmp.height(selectedOpts.height);
            if (selectedOpts.width == 'auto') {
                selectedOpts.width = tmp.width();
            }
            if (selectedOpts.height == 'auto') {
                selectedOpts.height = tmp.height();
            }
            fancybox_show();
        },
        fancybox_process_image = function() {
            busy = true;
            selectedOpts.width = imgPreloader.width;
            selectedOpts.height = imgPreloader.height;
            $("<img />").attr({
                'id': 'fancybox-img',
                'src': imgPreloader.src,
                'alt': selectedOpts.title
            }).appendTo(tmp);
            fancybox_show();
        },
        fancybox_start = function() {
            fancybox_abort();
            var obj = selectedArray[selectedIndex],
                href, type, title, str, emb, selector, data;
            selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(
                    obj).data('fancybox') == 'undefined' ?
                selectedOpts : $(obj).data('fancybox')));
            title = obj.title || $(obj).title || selectedOpts.title || '';
            selectedOpts = fancybox_customOptions(selectedOpts, obj);
            if (obj.nodeName && !selectedOpts.orig) {
                selectedOpts.orig = $(obj).children("img:first").length ? $(
                    obj).children("img:first") : $(obj);
            }
            if (title === '' && selectedOpts.orig) {
                title = selectedOpts.orig.attr('alt');
            }
            if (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href)) {
                href = selectedOpts.href || null;
            } else {
                href = selectedOpts.href || obj.href || null;
            }
            if (selectedOpts.type) {
                type = selectedOpts.type;
                if (!href) {
                    href = selectedOpts.content;
                }
            } else if (selectedOpts.content) {
                type = 'html';
            } else if (href) {
                if (href.match(imgRegExp)) {
                    type = 'image';
                } else if (href.match(swfRegExp)) {
                    type = 'swf';
                } else if ($(obj).hasClass("iframe")) {
                    type = 'iframe';
                } else if (href.match(/#/)) {
                    obj = href.substr(href.indexOf("#"));
                    type = $(obj).length > 0 ? 'inline' : 'ajax';
                } else {
                    type = 'ajax';
                }
            } else {
                type = 'inline';
            }
            selectedOpts.type = type;
            selectedOpts.href = href;
            selectedOpts.title = title;
            if (selectedOpts.autoDimensions && selectedOpts.type !==
                'iframe' && selectedOpts.type !== 'swf') {
                selectedOpts.width = 'auto';
                selectedOpts.height = 'auto';
            }
            if (selectedOpts.modal) {
                selectedOpts.overlayShow = true;
                selectedOpts.hideOnOverlayClick = false;
                selectedOpts.hideOnContentClick = false;
                selectedOpts.enableEscapeButton = false;
                selectedOpts.showCloseButton = false;
            }
            if ($.isFunction(selectedOpts.onStart)) {
                if (selectedOpts.onStart(selectedArray, selectedIndex,
                        selectedOpts) === false) {
                    busy = false;
                    return;
                }
            }
            tmp.css('padding', (shadow + selectedOpts.padding +
                selectedOpts.margin));
            $('.fancybox-inline-tmp').unbind('fancybox-cancel').bind(
                'fancybox-change',
                function() {
                    $(this).replaceWith(inner.children());
                });
            switch (type) {
                case 'html':
                    tmp.html(selectedOpts.content);
                    fancybox_process_inline();
                    break;
                case 'inline':
                    $('<div class="fancybox-inline-tmp" />').hide().insertBefore(
                        $(obj)).bind('fancybox-cleanup', function() {
                        $(this).replaceWith(inner.children());
                    }).bind('fancybox-cancel', function() {
                        $(this).replaceWith(tmp.children());
                    });
                    $(obj).appendTo(tmp);
                    fancybox_process_inline();
                    break;
                case 'image':
                    busy = false;
                    $.fancybox.showActivity();
                    imgPreloader = new Image();
                    imgPreloader.onerror = function() {
                        fancybox_error();
                    };
                    imgPreloader.onload = function() {
                        imgPreloader.onerror = null;
                        imgPreloader.onload = null;
                        fancybox_process_image();
                    };
                    imgPreloader.src = href;
                    break;
                case 'swf':
                    str =
                        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' +
                        selectedOpts.width + '" height="' + selectedOpts.height +
                        '"><param name="movie" value="' + href +
                        '"></param>';
                    emb = '';
                    $.each(selectedOpts.swf, function(name, val) {
                        str += '<param name="' + name + '" value="' +
                            val + '"></param>';
                        emb += ' ' + name + '="' + val + '"';
                    });
                    str += '<embed src="' + href +
                        '" type="application/x-shockwave-flash" width="' +
                        selectedOpts.width + '" height="' + selectedOpts.height +
                        '"' + emb + '></embed></object>';
                    tmp.html(str);
                    fancybox_process_inline();
                    break;
                case 'ajax':
                    selector = href.split('#', 2);
                    data = selectedOpts.ajax.data || {};
                    if (selector.length > 1) {
                        href = selector[0];
                        if (typeof data == "string") {
                            data += '&selector=' + selector[1];
                        } else {
                            data.selector = selector[1];
                        }
                    }
                    busy = false;
                    $.fancybox.showActivity();
                    ajaxLoader = $.ajax($.extend(selectedOpts.ajax, {
                        url: href,
                        data: data,
                        error: fancybox_error,
                        success: function(data, textStatus,
                            XMLHttpRequest) {
                            if (ajaxLoader.status == 200) {
                                tmp.html(data);
                                fancybox_process_inline();
                            }
                        }
                    }));
                    break;
                case 'iframe':
                    $('<iframe id="fancybox-frame" name="fancybox-frame' +
                        new Date().getTime() +
                        '" frameborder="0" hspace="0" scrolling="' +
                        selectedOpts.scrolling + '" src="' +
                        secureIFrameUrl(selectedOpts.href) +
                        '"></iframe>').appendTo(tmp);
                    fancybox_show();
                    break;
            }
        },
        fancybox_animate_loading = function() {
            if (!loading.is(':visible')) {
                clearInterval(loadingTimer);
                return;
            }
            $('div', loading).css('top', (loadingFrame * -40) + 'px');
            loadingFrame = (loadingFrame + 1) % 12;
        },
        fancybox_init = function() {
            if ($("#fancybox-wrap").length) {
                return;
            }
            $('body').append(tmp = $('<div id="fancybox-tmp"></div>'),
                loading = $(
                    '<div id="fancybox-loading"><div></div></div>'),
                overlay = $('<div id="fancybox-overlay"></div>'), wrap =
                $('<div id="fancybox-wrap"></div>'));
            if (!$.support.opacity) {
                wrap.addClass('fancybox-ie');
                loading.addClass('fancybox-ie');
            }
            outer = $('<div id="fancybox-outer"></div>').append(
                '<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>'
            ).appendTo(wrap);
            outer.append(inner = $('<div id="fancybox-inner"></div>'),
                close = $('<a id="fancybox-close"></a>'), nav_left = $(
                    '<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'
                ), nav_right = $(
                    '<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'
                ));
            close.click($.fancybox.close);
            loading.click($.fancybox.cancel);
            nav_left.click(function(e) {
                e.preventDefault();
                $.fancybox.prev();
            });
            nav_right.click(function(e) {
                e.preventDefault();
                $.fancybox.next();
            });
            if (isIE6) {
                overlay.get(0).style.setExpression('height',
                    "document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'"
                );
                loading.get(0).style.setExpression('top',
                    "(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'"
                );
                outer.prepend(
                    '<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>'
                );
            }
        },
        fancybox_customOptions = function(selectedOpts, obj) {
            try {
                $('#fancybox-close').html(dmc.Utils.ll.close[
                    jsClientIdLangId]);
            } catch (e) {}
            if (obj.rel) {
                var eId = obj.rel.split('fancybox')[1];
                var els = [];
                els = selectedOpts.popUpMeasures.split(',');
                var pat = /^fancybox(.*)_custom_(.*)/;
                if (obj.rel.match(pat)) {
                    eId = obj.rel.match(pat)[1];
                    els.push(obj.rel.match(pat)[1] + "_" + obj.rel.match(
                        pat)[2]);
                }
                for (var i = 0; i < els.length; i++) {
                    var dmcConf = new Array();
                    dmcConf = els[i].split('_');
                    if (dmcConf[0] == eId) {
                        selectedOpts.height = dmcConf[1] | 0;
                        selectedOpts.width = dmcConf[2] | 0;
                        selectedOpts.scrolling = dmcConf[3] == '1' ? 'auto' :
                            'no';
                    }
                }
            }
            return selectedOpts;
        };
    $.fn.fancybox = function(options) {
        $(this).data('fancybox', $.extend({}, options, ($.metadata ? $(
            this).metadata() : {}))).unbind('click.fb').bind(
            'click.fb',
            function(e) {
                e.preventDefault();
                if (busy) {
                    return;
                }
                busy = true;
                $(this).blur();
                selectedArray = [];
                selectedIndex = 0;
                var rel = $(this).attr('rel') || '';
                if (!rel || rel == '' || rel === 'nofollow') {
                    selectedArray.push(this);
                } else {
                    selectedArray = $("a[rel=" + rel +
                        "], area[rel=" + rel + "]");
                    selectedIndex = selectedArray.index(this);
                }
                fancybox_start();
                return false;
            });
        return this;
    };
    $.fancybox = function(obj) {
        if (busy) {
            return;
        }
        busy = true;
        var opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};
        selectedArray = [];
        selectedIndex = opts.index || 0;
        if ($.isArray(obj)) {
            for (var i = 0, j = obj.length; i < j; i++) {
                if (typeof obj[i] == 'object') {
                    $(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
                } else {
                    obj[i] = $({}).data('fancybox', $.extend({
                        content: obj[i]
                    }, opts));
                }
            }
            selectedArray = jQuery.merge(selectedArray, obj);
        } else {
            if (typeof obj == 'object') {
                $(obj).data('fancybox', $.extend({}, opts, obj));
            } else {
                obj = $({}).data('fancybox', $.extend({
                    content: obj
                }, opts));
            }
            selectedArray.push(obj);
        }
        if (selectedIndex > selectedArray.length || selectedIndex < 0) {
            selectedIndex = 0;
        }
        fancybox_start();
    };
    $.fancybox.showActivity = function() {
        clearInterval(loadingTimer);
        loading.show();
        loadingTimer = setInterval(fancybox_animate_loading, 66);
    };
    $.fancybox.hideActivity = function() {
        loading.hide();
    };
    $.fancybox.next = function() {
        return $.fancybox.pos(currentIndex + 1);
    };
    $.fancybox.prev = function() {
        return $.fancybox.pos(currentIndex - 1);
    };
    $.fancybox.pos = function(pos) {
        if (busy) {
            return;
        }
        pos = parseInt(pos, 10);
        if (pos > -1 && currentArray.length > pos) {
            selectedIndex = pos;
            fancybox_start();
        }
        if (currentOpts.cyclic && currentArray.length > 1 && pos < 0) {
            selectedIndex = currentArray.length - 1;
            fancybox_start();
        }
        if (currentOpts.cyclic && currentArray.length > 1 && pos >=
            currentArray.length) {
            selectedIndex = 0;
            fancybox_start();
        }
        return;
    };
    $.fancybox.cancel = function() {
        if (busy) {
            return;
        }
        busy = true;
        $.event.trigger('fancybox-cancel');
        fancybox_abort();
        if (selectedOpts && $.isFunction(selectedOpts.onCancel)) {
            selectedOpts.onCancel(selectedArray, selectedIndex,
                selectedOpts);
        }
        busy = false;
    };
    $.fancybox.close = function() {
        if (busy || wrap.is(':hidden')) {
            return;
        }
        busy = true;
        if (currentOpts && $.isFunction(currentOpts.onCleanup)) {
            if (currentOpts.onCleanup(currentArray, currentIndex,
                    currentOpts) === false) {
                busy = false;
                return;
            }
        }
        fancybox_abort();
        $(close.add(nav_left).add(nav_right)).hide();
        $('#fancybox-title').remove();
        wrap.add(inner).add(overlay).unbind();
        $(window).unbind("resize.fb scroll.fb");
        $(document).unbind('keydown.fb');

        function _cleanup() {
            overlay.fadeOut('fast');
            wrap.hide();
            $.event.trigger('fancybox-cleanup');
            inner.empty();
            if ($.isFunction(currentOpts.onClosed)) {
                currentOpts.onClosed(currentArray, currentIndex,
                    currentOpts);
            }
            currentArray = selectedOpts = [];
            currentIndex = selectedIndex = 0;
            currentOpts = selectedOpts = {};
            busy = false;
        }
        inner.css('overflow', 'hidden');
        if (currentOpts.transitionOut == 'elastic') {
            start_pos = fancybox_get_zoom_from();
            var pos = wrap.position();
            final_pos = {
                top: pos.top,
                left: pos.left,
                width: wrap.width(),
                height: wrap.height()
            };
            if (currentOpts.opacity) {
                final_pos.opacity = 1;
            }
            fx.prop = 1;
            $(fx).animate({
                prop: 0
            }, {
                duration: currentOpts.speedOut,
                easing: currentOpts.easingOut,
                step: fancybox_draw,
                complete: _cleanup
            });
        } else {
            wrap.fadeOut(currentOpts.transitionOut == 'none' ? 0 :
                currentOpts.speedOut, _cleanup);
        }
    };
    $.fancybox.resize = function() {
        var c, h;
        if (busy || wrap.is(':hidden')) {
            return;
        }
        busy = true;
        c = inner.wrapInner("<div style='overflow:auto'></div>").children();
        h = c.height();
        wrap.css({
            height: h + (currentOpts.padding * 2) + titleh
        });
        inner.css({
            height: h
        });
        c.replaceWith(c.children());
        $.fancybox.center();
    };
    $.fancybox.center = function() {
        busy = true;
        var view = fancybox_get_viewport(),
            margin = currentOpts.margin,
            to = {};
        to.top = view[3] + ((view[1] - ((wrap.height() - titleh) + (
            shadow * 2))) * 0.5);
        to.left = view[2] + ((view[0] - (wrap.width() + (shadow * 2))) *
            0.5);
        to.top = Math.max(view[3] + margin, to.top);
        to.left = Math.max(view[2] + margin, to.left);
        wrap.css(to);
        busy = false;
    };
    $.fn.fancybox.defaults = {
        padding: 10,
        margin: 20,
        opacity: false,
        modal: false,
        cyclic: false,
        scrolling: 'auto',
        width: 560,
        height: 340,
        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,
        ajax: {},
        swf: {
            wmode: 'transparent'
        },
        hideOnOverlayClick: true,
        hideOnContentClick: false,
        overlayShow: true,
        overlayOpacity: 0.3,
        overlayColor: '#666',
        titleShow: true,
        titlePosition: 'outside',
        titleFormat: null,
        transitionIn: 'fade',
        transitionOut: 'fade',
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: 'fast',
        easingIn: 'swing',
        easingOut: 'swing',
        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        onStart: null,
        onCancel: null,
        onComplete: null,
        onCleanup: null,
        onClosed: null
    };
    $(document).ready(function() {
        //fancybox_init();
    });
})(jQuery);
secureIFrameUrl = function(url) {
    return url.replace('http:', '');
};
eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) >
            35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'),
            k[c]);
    return p
}(
    'h.i[\'1a\']=h.i[\'z\'];h.O(h.i,{y:\'D\',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});',
    62, 74,
    '||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce'
    .split('|'), 0, {}))﻿;
(function($) {
    if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
        alert('blockUI requires jQuery v1.2.3 or later!  You are using v' +
            $.fn.jquery);
        return;
    }
    $.fn._fadeIn = $.fn.fadeIn;
    var noOp = function() {};
    var mode = document.documentMode || 0;
    var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) ||
        mode < 8);
    var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !
        mode;
    $.blockUI = function(opts) {
        install(window, opts);
    };
    $.unblockUI = function(opts) {
        remove(window, opts);
    };
    $.growlUI = function(title, message, timeout, onClose) {
        var $m = $('<div class="growlUI"></div>');
        if (title) $m.append('<h1>' + title + '</h1>');
        if (message) $m.append('<h2>' + message + '</h2>');
        if (timeout == undefined) timeout = 3000;
        $.blockUI({
            message: $m,
            fadeIn: 700,
            fadeOut: 1000,
            centerY: false,
            timeout: timeout,
            showOverlay: false,
            onUnblock: onClose,
            css: $.blockUI.defaults.growlCSS
        });
    };
    $.fn.block = function(opts) {
        return this.unblock({
            fadeOut: 0
        }).each(function() {
            if ($.css(this, 'position') == 'static')
                this.style.position = 'relative';
            if ($.browser.msie)
                this.style.zoom = 1;
            install(this, opts);
        });
    };
    $.fn.unblock = function(opts) {
        return this.each(function() {
            remove(this, opts);
        });
    };
    $.blockUI.version = 2.31;
    $.blockUI.defaults = {
        message: '<h1>Please wait...</h1>',
        title: null,
        draggable: true,
        theme: false,
        css: {
            padding: 0,
            margin: 0,
            width: '30%',
            top: '40%',
            left: '35%',
            textAlign: 'center',
            color: '#000',
            border: '3px solid #aaa',
            backgroundColor: '#fff',
            cursor: 'wait'
        },
        themedCSS: {
            width: '30%',
            top: '40%',
            left: '35%'
        },
        overlayCSS: {
            backgroundColor: '#CCC',
            opacity: 0.6,
            cursor: 'wait'
        },
        growlCSS: {
            width: '350px',
            top: '10px',
            left: '',
            right: '10px',
            border: 'none',
            padding: '5px',
            opacity: 0.6,
            cursor: 'default',
            color: '#fff',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px'
        },
        iframeSrc: /^https/i.test(window.location.href || '') ?
            'javascript:false' : 'about:blank',
        forceIframe: false,
        baseZ: 1000,
        centerX: true,
        centerY: true,
        allowBodyStretch: true,
        bindEvents: true,
        constrainTabKey: true,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
        showOverlay: true,
        focusInput: true,
        applyPlatformOpacityRules: true,
        onBlock: null,
        onUnblock: null,
        quirksmodeOffsetHack: 4
    };
    var pageBlock = null;
    var pageBlockEls = [];

    function install(el, opts) {
        var full = (el == window);
        var msg = opts && opts.message !== undefined ? opts.message :
            undefined;
        opts = $.extend({}, $.blockUI.defaults, opts || {});
        opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
        var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
        var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
        msg = msg === undefined ? opts.message : msg;
        if (full && pageBlock)
            remove(window, {
                fadeOut: 0
            });
        if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
            var node = msg.jquery ? msg[0] : msg;
            var data = {};
            $(el).data('blockUI.history', data);
            data.el = node;
            data.parent = node.parentNode;
            data.display = node.style.display;
            data.position = node.style.position;
            if (data.parent)
                data.parent.removeChild(node);
        }
        var z = opts.baseZ;
        var lyr1 = ($.browser.msie || opts.forceIframe) ? $(
            '<iframe class="blockUI" style="z-index:' + (z++) +
            ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' +
            opts.iframeSrc + '"></iframe>') : $(
            '<div class="blockUI" style="display:none"></div>');
        var lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' +
            (z++) +
            ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'
        );
        var lyr3;
        if (opts.theme && full) {
            var s =
                '<div class="blockUI blockMsg blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' +
                z + ';display:none;position:fixed">' +
                '<div class="ui-widget-header ui-dialog-titlebar blockTitle">' +
                (opts.title || '&nbsp;') + '</div>' +
                '<div class="ui-widget-content ui-dialog-content"></div>' +
                '</div>';
            lyr3 = $(s);
        } else {
            lyr3 = full ? $(
                '<div class="blockUI blockMsg blockPage" style="z-index:' +
                z + ';display:none;position:fixed"></div>') : $(
                '<div class="blockUI blockMsg blockElement" style="z-index:' +
                z + ';display:none;position:absolute"></div>');
        }
        if (msg) {
            if (opts.theme) {
                lyr3.css(themedCSS);
                lyr3.addClass('ui-widget-content');
            } else
                lyr3.css(css);
        }
        if (!opts.applyPlatformOpacityRules || !($.browser.mozilla &&
                /Linux/.test(navigator.platform)))
            lyr2.css(opts.overlayCSS);
        lyr2.css('position', full ? 'fixed' : 'absolute');
        if ($.browser.msie || opts.forceIframe)
            lyr1.css('opacity', 0.0);
        var layers = [lyr1, lyr2, lyr3],
            $par = full ? $('body') : $(el);
        $.each(layers, function() {
            this.appendTo($par);
        });
        if (opts.theme && opts.draggable && $.fn.draggable) {
            lyr3.draggable({
                handle: '.ui-dialog-titlebar',
                cancel: 'li'
            });
        }
        var expr = setExpr && (!$.boxModel || $('object,embed', full ? null :
            el).length > 0);
        if (ie6 || expr) {
            if (full && opts.allowBodyStretch && $.boxModel)
                $('html,body').css('height', '100%');
            if ((ie6 || !$.boxModel) && !full) {
                var t = sz(el, 'borderTopWidth'),
                    l = sz(el, 'borderLeftWidth');
                var fixT = t ? '(0 - ' + t + ')' : 0;
                var fixL = l ? '(0 - ' + l + ')' : 0;
            }
            $.each([lyr1, lyr2, lyr3], function(i, o) {
                var s = o[0].style;
                s.position = 'absolute';
                if (i < 2) {
                    full ? s.setExpression('height',
                            'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:' +
                            opts.quirksmodeOffsetHack + ') + "px"') :
                        s.setExpression('height',
                            'this.parentNode.offsetHeight + "px"');
                    full ? s.setExpression('width',
                        'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'
                    ) : s.setExpression('width',
                        'this.parentNode.offsetWidth + "px"');
                    if (fixL) s.setExpression('left', fixL);
                    if (fixT) s.setExpression('top', fixT);
                } else if (opts.centerY) {
                    if (full) s.setExpression('top',
                        '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'
                    );
                    s.marginTop = 0;
                } else if (!opts.centerY && full) {
                    var top = (opts.css && opts.css.top) ? parseInt(
                        opts.css.top) : 0;
                    var expression =
                        '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' +
                        top + ') + "px"';
                    s.setExpression('top', expression);
                }
            });
        }
        if (msg) {
            if (opts.theme)
                lyr3.find('.ui-widget-content').append(msg);
            else
                lyr3.append(msg);
            if (msg.jquery || msg.nodeType)
                $(msg).show();
        }
        if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
            lyr1.show();
        if (opts.fadeIn) {
            var cb = opts.onBlock ? opts.onBlock : noOp;
            var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
            var cb2 = msg ? cb : noOp;
            if (opts.showOverlay)
                lyr2._fadeIn(opts.fadeIn, cb1);
            if (msg)
                lyr3._fadeIn(opts.fadeIn, cb2);
        } else {
            if (opts.showOverlay)
                lyr2.show();
            if (msg)
                lyr3.show();
            if (opts.onBlock)
                opts.onBlock();
        }
        bind(1, el, opts);
        if (full) {
            pageBlock = lyr3[0];
            pageBlockEls = $(':input:enabled:visible', pageBlock);
            if (opts.focusInput)
                setTimeout(focus, 20);
        } else
            center(lyr3[0], opts.centerX, opts.centerY);
        if (opts.timeout) {
            var to = setTimeout(function() {
                full ? $.unblockUI(opts) : $(el).unblock(opts);
            }, opts.timeout);
            $(el).data('blockUI.timeout', to);
        }
    };

    function remove(el, opts) {
        var full = (el == window);
        var $el = $(el);
        var data = $el.data('blockUI.history');
        var to = $el.data('blockUI.timeout');
        if (to) {
            clearTimeout(to);
            $el.removeData('blockUI.timeout');
        }
        opts = $.extend({}, $.blockUI.defaults, opts || {});
        bind(0, el, opts);
        var els;
        if (full)
            els = $('body').children().filter('.blockUI').add(
                'body > .blockUI');
        else
            els = $('.blockUI', el);
        if (full)
            pageBlock = pageBlockEls = null;
        if (opts.fadeOut) {
            els.fadeOut(opts.fadeOut);
            setTimeout(function() {
                reset(els, data, opts, el);
            }, opts.fadeOut);
        } else
            reset(els, data, opts, el);
    };

    function reset(els, data, opts, el) {
        els.each(function(i, o) {
            if (this.parentNode)
                this.parentNode.removeChild(this);
        });
        if (data && data.el) {
            data.el.style.display = data.display;
            data.el.style.position = data.position;
            if (data.parent)
                data.parent.appendChild(data.el);
            $(el).removeData('blockUI.history');
        }
        if (typeof opts.onUnblock == 'function')
            opts.onUnblock(el, opts);
    };

    function bind(b, el, opts) {
        var full = el == window,
            $el = $(el);
        if (!b && (full && !pageBlock || !full && !$el.data(
                'blockUI.isBlocked')))
            return;
        if (!full)
            $el.data('blockUI.isBlocked', b);
        if (!opts.bindEvents || (b && !opts.showOverlay))
            return;
        var events = 'mousedown mouseup keydown keypress';
        b ? $(document).bind(events, opts, handler) : $(document).unbind(
            events, handler);
    };

    function handler(e) {
        if (e.keyCode && e.keyCode == 9) {
            if (pageBlock && e.data.constrainTabKey) {
                var els = pageBlockEls;
                var fwd = !e.shiftKey && e.target == els[els.length - 1];
                var back = e.shiftKey && e.target == els[0];
                if (fwd || back) {
                    setTimeout(function() {
                        focus(back)
                    }, 10);
                    return false;
                }
            }
        }
        if ($(e.target).parents('div.blockMsg').length > 0)
            return true;
        return $(e.target).parents().children().filter('div.blockUI').length ==
            0;
    };

    function focus(back) {
        if (!pageBlockEls)
            return;
        var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
        if (e)
            e.focus();
    };

    function center(el, x, y) {
        var p = el.parentNode,
            s = el.style;
        var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p,
            'borderLeftWidth');
        var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p,
            'borderTopWidth');
        if (x) s.left = l > 0 ? (l + 'px') : '0';
        if (y) s.top = t > 0 ? (t + 'px') : '0';
    };

    function sz(el, p) {
        return parseInt($.css(el, p)) || 0;
    };
})(jQuery);
eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) >
            35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function(e) {
            return d[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}(
    'k c={3z:\'11/7r/\',56:"7q.5U",6P:10,6G:5t,6F:10,6Q:5t,5V:I,6l:I,58:1,2I:1a,57:3,45:10,6O:35,6E:10,2K:35,4i:5,2Y:7s,2H:\'7t.7w\',6Y:\'7v 2h 7u 7o\',5o:\'4X 2h 4R 1S, 7n 5J 7h 2h 3o. 7g 7f 7i Q 3l 5J 5S.\',6j:\'4X 2h 7j 2h 7m\',6L:\'7l...\',60:\'4X 2h 7k\',6K:0.75,4Z:I,6e:\'7x 2q <i>5E 5F</i>\',6r:\'7y://7L.7K/11/\',6q:\'7J 2h 7M 5E 5F 7N\',61:I,2J:\'2z\',4r:\'2z\',4k:K,4g:K,2R:K,3I:K,3D:K,3m:30,2B:5I,2V:5I,3U:I,1c:\'7Q-7P\',4l:K,3e:[],4B:I,4h:0,z:[],2M:[\'2J\',\'4r\',\'4k\',\'4g\',\'1c\',\'2I\',\'3m\',\'4l\',\'2B\',\'2V\',\'2R\',\'3I\',\'3U\',\'3D\'],1m:[],32:{},4E:{},46:[],1i:(V.7O&&!1F.5a),4c:4f.7I.7H("7B")!=-1,3b:1a,$:r(1o){u V.7e(1o)},4G:r(2c,5H){2c[2c.19]=5H},17:r(5A,2G,2b,55,5s){k m=V.17(5A);f(2G)c.5y(m,2G);f(5s)c.1C(m,{7z:0,7C:\'3M\',6h:0});f(2b)c.1C(m,2b);f(55)55.2y(m);u m},5y:r(m,2G){Q(k x 5x 2G){m[x]=2G[x]}},1C:r(m,2b){Q(k x 5x 2b){O{f(c.1i&&x==\'1g\'){m.q.5Y=2b[x]==1?\'3M\':\'7D(1g=\'+(2b[x]*2a)+\')\'}G m.q[x]=2b[x]}P(e){}}},2m:r(){2c=4f.7G.3G("7F");u 5N(2c[1])},6I:r(){k 3t=V.5e&&V.5e!="6y"?V.5Z:V.4t;b.R=c.1i?3t.7E:5w.7R;b.H=c.1i?3t.70:5w.7c;b.3H=c.1i?3t.3H:77;b.4b=c.1i?3t.4b:79},U:r(m){k p={x:m.5X,y:m.5W};41(m.5G){m=m.5G;p.x+=m.5X;p.y+=m.5W;f(m!=V.4t&&m!=V.5Z){p.x-=m.3H;p.y-=m.4b}}u p},5i:r(a,1P,3y){O{2Q M(a,1P,3y);u 1a}P(e){u I}},62:r(){k 51=0,3Q=-1;Q(i=0;i<c.z.19;i++){f(c.z[i]){f(c.z[i].D.q.1v&&c.z[i].D.q.1v>51){51=c.z[i].D.q.1v;3Q=i}}}f(3Q==-1)c.2W=-1;G c.z[3Q].2g()},74:r(1o){u c.4R(1o)},4R:r(m){O{c.3d(m).2C()}P(e){}u 1a},5h:r(C,1B){k 2O=V.49(\'A\'),4Q={},4H=-1,j=0;Q(i=0;i<2O.19;i++){f(c.3N(2O[i])&&((c.z[C].3D==c.4I(2O[i],\'3D\')))){4Q[j]=2O[i];f(c.z[C]&&2O[i]==c.z[C].a){4H=j}j++}}u 4Q[4H+1B]},4I:r(a,3a){O{k s=a.2X.5g().1z(/\\s/g,\' \').3G(\'{\')[2].3G(\'}\')[0];f(c.4c){Q(k i=0;i<c.2M.19;i++){s=s.1z(c.2M[i]+\':\',\',\'+c.2M[i]+\':\').1z(2Q 7d("^\\\\s*?,"),\'\')}}5m(\'k 2c = {\'+s+\'};\');f(2c[3a])u 2c[3a];G u c[3a]}P(e){u c[3a]}},2L:r(a){k 1l=c.4I(a,\'1l\');f(1l)u 1l;u a.78.1z(/7a/g,\'/\')||a.2r},3K:r(1o){k 3J=c.$(1o),2o=c.4E[1o],a={};f(!3J&&!2o)u K;f(!2o){2o=3J.5P(I);2o.1o=\'\';c.4E[1o]=2o;u 3J}G{u 2o.5P(I)}},2A:r(d){f(!c.1i)u;k a=d.72,i,l,n;f(a){l=a.19;Q(i=0;i<l;i+=1){n=a[i].2v;f(1M d[n]===\'r\'){d[n]=K}}}f(c.5T&&c.5T(d))u;a=d.1X;f(a){l=a.19;Q(i=0;i<l;i+=1){c.2A(d.1X[i])}}},3V:r(m,1B){k 1n=c.3d(m);O{c.5h(1n.C,1B).2X()}P(e){}O{1n.2C()}P(e){}u 1a},5S:r(m){u c.3V(m,-1)},3l:r(m){u c.3V(m,1)},42:r(e){f(!e)e=1F.1t;f(!e.1e)e.1e=e.5u;f(e.1e.5z)u;k 1B=K;7A(e.86){1Y 34:1Y 39:1Y 40:1B=1;5O;1Y 33:1Y 37:1Y 38:1B=-1;5O;1Y 27:1Y 13:1B=0}f(1B!==K){c.3u(V,\'4C\',c.42);O{f(!c.61)u I}P(e){}f(e.47)e.47();G e.8B=1a;f(1B==0){O{c.3d().2C()}P(e){}u 1a}G{u c.3V(c.2W,1B)}}G u I},8x:r(1s){c.4G(c.1m,1s)},5l:r(4L){k m,2x=/^11-D-([0-9]+)$/;m=4L;41(m.1x){m=m.1x;f(2x.8s(m.1o))u m.1o.1z(2x,"$1")}m=4L;41(m.1x){f(m.3j&&c.3N(m)){Q(C=0;C<c.z.19;C++){1n=c.z[C];f(1n&&1n.a==m)u C}}m=m.1x}},3d:r(m){O{f(1M m==\'3T\')u c.z[c.2W];f(1M m==\'36\')u c.z[m];f(1M m==\'4J\')m=c.$(m);u c.z[c.5l(m)]}P(e){}},6C:r(){Q(i=0;i<c.z.19;i++){f(c.z[i]&&c.z[i].6z)c.62()}},4W:r(e){f(!e)e=1F.1t;f(e.8v>1)u I;f(!e.1e)e.1e=e.5u;f(e.1e.5z)u;k 1h=e.1e;41(1h.1x&&!(1h.14&&1h.14.Z(/11-(1S|3o|3x)/))){1h=1h.1x}f(!1h.1x)u;c.W=c.3d(1h);f(1h.14.Z(/11-(1S|3o)/)){k 5d=I;k 2T=1f(c.W.D.q.Y);k 2U=1f(c.W.D.q.15)}f(e.5Q==\'6X\'){f(5d){f(1h.14.Z(\'11-1S\'))c.W.F.q.1H=\'3o\';c.2T=2T;c.2U=2U;c.64=e.5K;c.5q=e.5v;c.2s(V,\'5L\',c.59);f(e.47)e.47();f(c.W.F.14.Z(/11-(1S|3x)-31/)){c.W.2g();c.3b=I}u 1a}G f(1h.14.Z(/11-3x/)){c.W.2g();c.W.44();c.3b=1a}}G f(e.5Q==\'6V\'){c.3u(V,\'5L\',c.59);f(5d&&c.W){f(1h.14.Z(\'11-1S\')){1h.q.1H=c.3p}k 3C=2T!=c.2T||2U!=c.2U;f(!3C&&!c.3b&&!1h.14.Z(/11-3o/)){c.W.6f()}G f(3C||(!3C&&c.7Y)){c.W.44()}c.3b=1a}G f(1h.14.Z(\'11-1S-31\')){1h.q.1H=c.3p}}},59:r(e){f(!c.W||!c.W.D)u;f(!e)e=1F.1t;c.W.x.E=c.2T+e.5K-c.64;c.W.y.E=c.2U+e.5v-c.5q;k w=c.W.D;w.q.Y=c.W.x.E+\'N\';w.q.15=c.W.y.E+\'N\';f(c.W.X){k o=c.W.X;o.1k.q.Y=(c.W.x.E-o.1p)+\'N\';o.1k.q.15=(c.W.y.E-o.1p)+\'N\'}u 1a},2s:r(m,1t,1V){O{m.2s(1t,1V,1a)}P(e){O{m.5r(\'2Z\'+1t,1V);m.7V(\'2Z\'+1t,1V)}P(e){m[\'2Z\'+1t]=1V}}},3u:r(m,1t,1V){O{m.3u(1t,1V,1a)}P(e){O{m.5r(\'2Z\'+1t,1V)}P(e){m[\'2Z\'+1t]=K}}},3N:r(a){u(a.2X&&a.2X.5g().1z(/\\s/g,\' \').Z(/c.(84|e)8b/))},4z:r(i){f(c.4B&&c.3e[i]&&c.3e[i]!=\'3T\'){k 12=V.17(\'12\');12.4e=r(){c.4z(i+1)};12.1l=c.3e[i]}},6b:r(36){f(36&&1M 36!=\'8c\')c.4i=36;k a,2x,j=0;k 4O=V.49(\'A\');Q(i=0;i<4O.19;i++){a=4O[i];2x=c.3N(a);f(2x&&2x[0]==\'c.5i\'){f(j<c.4i){c.3e[j]=c.2L(a);j++}}}2Q 2t(c.1c,r(){c.4z(0)});k 5U=c.17(\'12\',{1l:c.3z+c.56})},4m:r(){f(!c.2u){c.2u=c.17(\'29\',K,{U:\'23\',Y:0,15:0,R:\'2a%\',1v:c.2Y},V.4t,I)}},3r:r(m,o,4s,2S,i){o=5N(o);m.q.S=(o<=0)?\'T\':\'1j\';f(o<0||(2S==1&&o>4s))u;f(i==K)i=c.46.19;f(1M(m.i)!=\'3T\'&&m.i!=i){7X(c.46[m.i]);o=m.5M}m.i=i;m.5M=o;m.q.S=(o<=0)?\'T\':\'1j\';c.1C(m,{1g:o});c.46[i]=2k(r(){c.3r(m,1y.1D((o+0.1*2S)*2a)/2a,4s,2S,i)},25)}};2t=r(1c,1K){b.1K=1K;b.1c=1c;k v=c.2m(),43;b.3i=c.1i&&v>=5.5&&v<7;b.5R=!c.1i||(c.1i&&v>=7);f(!1c||(!b.3i&&!b.5R)){f(1K)1K();u}c.4m();b.1k=c.17(\'1k\',{8i:0},{S:\'T\',U:\'23\',1v:c.2Y++,8p:\'81\'},c.2u,I);b.4q=c.17(\'4q\',K,K,b.1k,1);b.1d=[];Q(k i=0;i<=8;i++){f(i%3==0)43=c.17(\'43\',K,{H:\'2z\'},b.4q,I);b.1d[i]=c.17(\'1d\',K,K,43,I);k q=i!=4?{89:0,8a:0}:{U:\'4o\'};c.1C(b.1d[i],q)}b.1d[4].14=1c;b.5D()};2t.L.5D=r(){k 1l=c.3z+"7U/"+b.1c+".7T";k 5B=c.4c?c.2u:K;b.22=c.17(\'12\',K,{U:\'23\',Y:\'-5C\',15:\'-5C\'},5B,I);k 2E=b;b.22.4e=r(){2E.63()};b.22.1l=1l};2t.L.63=r(){k o=b.1p=b.22.R/4,1R=[[0,0],[0,-4],[-2,0],[0,-8],0,[-2,-8],[0,-2],[0,-6],[-2,-2]],3E={H:(2*o)+\'N\',R:(2*o)+\'N\'};Q(k i=0;i<=8;i++){f(1R[i]){f(b.3i){k w=(i==1||i==7)?\'2a%\':b.22.R+\'N\';k 29=c.17(\'29\',K,{R:\'2a%\',H:\'2a%\',U:\'4o\',6v:\'T\'},b.1d[i],I);c.17(\'29\',K,{5Y:"80:7Z.8w.8t(8z=8A, 1l=\'"+b.22.1l+"\')",U:\'23\',R:w,H:b.22.H+\'N\',Y:(1R[i][0]*o)+\'N\',15:(1R[i][1]*o)+\'N\'},29,I)}G{c.1C(b.1d[i],{6A:\'52(\'+b.22.1l+\') \'+(1R[i][0]*o)+\'N \'+(1R[i][1]*o)+\'N\'})}c.1C(b.1d[i],3E)}}c.32[b.1c]=b;f(b.1K)b.1K()};2t.L.4K=r(){c.2A(b.1k);O{b.1k.1x.3c(b.1k)}P(e){}};M=r(a,1P,3y,1E){c.4B=1a;b.3y=3y;Q(i=0;i<c.2M.19;i++){k 2v=c.2M[i];f(1P&&1M 1P[2v]!=\'3T\')b[2v]=1P[2v];G b[2v]=c[2v]}k m;f(1P&&1P.3X)m=c.$(1P.3X);G m=a.49(\'6k\')[0];f(!m)m=a;Q(i=0;i<c.z.19;i++){f(c.z[i]&&c.z[i].2p!=m&&!c.z[i].48){c.z[i].5j()}}Q(i=0;i<c.z.19;i++){f(c.z[i]&&c.z[i].a==a){c.z[i].2g();u 1a}}f(!c.5V){O{c.z[c.4h-1].2C()}P(e){}}k C=b.C=c.4h++;c.z[b.C]=b;f(1E==\'3x\'){b.3s=I;b.1E=\'3x\'}G{b.1W=I;b.1E=\'1S\'}b.a=a;b.3Y=m.1o||a.1o;b.2p=m;b.1m=[];k 1R=c.U(m);b.D=c.17(\'29\',{1o:\'11-D-\'+b.C,14:b.4l},{S:\'T\',U:\'23\',1v:c.2Y++},K,I);b.D.8l=r(e){O{c.z[C].6T(e)}P(e){}};b.D.8o=r(e){O{c.z[C].6Z(e)}P(e){}};b.1U=m.R?m.R:m.1T;b.1O=m.H?m.H:m.1u;b.2i=1R.x;b.2f=1R.y;b.2F=(b.2p.1T-b.1U)/2;b.3B=(b.2p.1u-b.1O)/2;c.4m();f(c.32[b.1c]){b.4j();b[b.1E+\'4d\']()}G f(!b.1c){b[b.1E+\'4d\']()}G{b.4n();k 2E=b;2Q 2t(b.1c,r(){2E.4j();2E[2E.1E+\'4d\']()})}};M.L.4j=r(x,y){k w=c.32[b.1c];b.X=w;c.32[b.1c]=K};M.L.4n=r(){f(b.48||b.1b)u;b.5k=b.a.q.1H;b.a.q.1H=\'8r\';f(!c.1b){c.1b=c.17(\'a\',{14:\'11-1b\',2N:c.60,1w:c.6L},{U:\'23\',1g:c.6K},c.2u)}b.1b=c.1b;b.1b.2r=\'6R:c.z[\'+b.C+\'].5j()\';b.1b.S=\'1j\';b.1b.q.Y=(b.2i+b.2F+(b.1U-b.1b.1T)/2)+\'N\';b.1b.q.15=(b.2f+(b.1O-b.1b.1u)/2)+\'N\';2k("f (c.z["+b.C+"] && c.z["+b.C+"].1b) "+"c.z["+b.C+"].1b.q.S = \'1j\';",2a)};M.L.8m=r(){k C=b.C;k 12=V.17(\'12\');b.F=12;12.4e=r(){O{c.z[C].1K()}P(e){}};12.14=\'11-1S\';12.q.S=\'T\';12.q.3A=\'3L\';12.q.U=\'23\';12.q.8n=\'3M\';12.q.1v=3;12.2N=c.5o;f(c.4c)c.2u.2y(12);12.1l=c.2L(b.a);b.4n()};M.L.1K=r(){O{f(!b.F)u;f(b.48)u;G b.48=I;f(b.1b){b.1b.q.S=\'T\';b.1b=K;b.a.q.1H=b.5k||\'\'}f(b.1W){b.2e=b.F.R;b.2n=b.F.H;b.3W=b.2e;b.6n=b.2n;b.F.R=b.1U;b.F.H=b.1O}G f(b.6N)b.6N();b.2K=c.2K;b.6o();b.D.2y(b.F);b.F.q.U=\'4o\';f(b.J)b.D.2y(b.J);b.D.q.Y=b.2i+\'N\';b.D.q.15=b.2f+\'N\';c.2u.2y(b.D);b.1N=(b.F.1T-b.1U)/2;b.1G=(b.F.1u-b.1O)/2;k 6D=c.6O+2*b.1N;b.2K+=2*b.1G;k 26=b.2e/b.2n;k 2B=b.3U?b.2B:b.2e;k 2V=b.3U?b.2V:b.2n;k 16={x:\'2z\',y:\'2z\'};f(b.4r==\'1Q\'){16.x=\'1Q\';16.y=\'1Q\'}G{f(b.2J.Z(/^15/))16.y=K;f(b.2J.Z(/54$/))16.x=\'4p\';f(b.2J.Z(/^53/))16.y=\'4p\';f(b.2J.Z(/Y$/))16.x=K}3q=2Q c.6I();b.x={E:1f(b.2i)-b.1N+b.2F,B:b.2e,1I:b.2e<2B?b.2e:2B,16:16.x,1e:b.4k,1A:c.45,21:6D,24:3q.3H,1Z:3q.R,3Z:b.1U};k 8k=b.x.E+1f(b.1U);b.x=b.16(b.x);b.y={E:1f(b.2f)-b.1G+b.3B,B:b.2n,1I:b.2n<2V?b.2n:2V,16:16.y,1e:b.4g,1A:c.6E,21:b.2K,24:3q.4b,1Z:3q.H,3Z:b.1O};k 8g=b.y.E+1f(b.1O);b.y=b.16(b.y);f(b.3s)b.8h();f(b.1W)b.6B(26);k x=b.x;k y=b.y;b.6H()}P(e){f(c.z[b.C]&&c.z[b.C].a)1F.4S.2r=c.2L(c.z[b.C].a)}};M.L.6H=r(){k 1r={x:b.x.E-20,y:b.y.E-20,w:b.x.B+40,h:b.y.B+40+b.3m};c.3O=(c.1i&&c.2m()<7);f(c.3O)b.2d(\'4U\',\'T\',1r);c.3P=(1F.5a||4f.8j==\'8q\'||(c.1i&&c.2m()<5.5));f(c.3P)b.2d(\'4V\',\'T\',1r);f(b.X&&!b.2I)b.3w(b.x.E,b.y.E,b.x.B,b.y.B);k 3F=b.X?b.X.1p:0;b.4N(1,b.2i+b.2F-b.1N,b.2f+b.3B-b.1G,b.1U,b.1O,b.x.E,b.y.E,b.x.B,b.y.B,c.6G,c.6P,c.57,3F)};M.L.16=r(p){k 2j,3E=p==b.x?\'x\':\'y\';f(p.1e&&p.1e.Z(/ /)){2j=p.1e.3G(\' \');p.1e=2j[0]}f(p.1e&&c.$(p.1e)){p.E=c.U(c.$(p.1e))[3E];f(2j&&2j[1]&&2j[1].Z(/^[-]?[0-9]+N$/))p.E+=1f(2j[1])}G f(p.16==\'2z\'||p.16==\'1Q\'){k 4A=1a;k 2D=I;f(p.16==\'1Q\')p.E=1y.1D(p.24+(p.1Z-p.B-p.21)/2);G p.E=1y.1D(p.E-((p.B-p.3Z)/2)); f(p.E<p.24+p.1A){p.E=p.24+p.1A;4A=I}f(p.B<p.1I){p.B=p.1I;2D=1a}f(p.E+p.B>p.24+p.1Z-p.21){f(4A&&2D)p.B=p.1Z-p.1A-p.21;G f(p.B<p.1Z-p.1A-p.21){p.E=p.24+p.1Z-p.B-p.1A-p.21}G{p.E=p.24+p.1A;f(2D)p.B=p.1Z-p.1A-p.21}}f(p.B<p.1I){p.B=p.1I;2D=1a}}G f(p.16==\'4p\'){p.E=1y.82(p.E-p.B+p.3Z)}f(p.E<p.1A){6W=p.E;p.E=p.1A;f(2D)p.B=p.B-(p.E-6W)}u p};M.L.6B=r(26){k x=b.x;k y=b.y;k 4a=1a;f(x.B/y.B>26){ k 85=x.B;x.B=y.B*26;f(x.B<x.1I){x.B=x.1I;y.B=x.B/26}4a=I}G f(x.B/y.B<26){ k 88=y.B;y.B=x.B/26;4a=I}f(4a){x.E=1f(b.2i)-b.1N+b.2F;x.1I=x.B;b.x=b.16(x);y.E=1f(b.2f)-b.1G+b.3B;y.1I=y.B;b.y=b.16(y)}};M.L.4N=r(2S,3f,3k,3h,3g,4u,4v,4y,4x,6a,1L,3n,4w){k 67=(4y-3h)/1L,66=(4x-3g)/1L,68=(4u-3f)/1L,69=(4v-3k)/1L,65=(4w-3n)/1L,t,1n="c.z["+b.C+"]";Q(i=1;i<=1L;i++){3h+=67;3g+=66;3f+=68;3k+=69;3n+=65;t=1y.1D(i*(6a/1L));k s="O {";f(i==1){s+=1n+".F.q.S = \'1j\';"+"f ("+1n+".2p.3j == \'6k\' && c.6l) "+1n+".2p.q.S = \'T\';"}f(i==1L){3h=4y;3g=4x;3f=4u;3k=4v;3n=4w}s+=1n+"."+b.1E+"8e("+1y.1D(3h)+", "+1y.1D(3g)+", "+1y.1D(3f)+", "+1y.1D(3k)+", "+1y.1D(3n);s+=");} P (e) {}";2k(s,t)}f(2S==1){2k(\'O { \'+1n+\'.X.1k.q.S = "1j"; } P (e){}\',t);2k(\'O { \'+1n+\'.6x(); } P(e){}\',t+50)}G 2k(\'O { \'+1n+\'.4P(); } P(e){}\',t)};M.L.87=r(w,h,x,y,1p){O{b.F.R=w;b.F.H=h;f(b.X&&b.2I){k o=b.X.1p-1p;b.3w(x+o,y+o,w-2*o,h-2*o,1)}c.1C(b.D,{\'S\':\'1j\',\'Y\':x+\'N\',\'15\':y+\'N\'})}P(e){1F.4S.2r=c.2L(b.a)}};M.L.3w=r(x,y,w,h,6w){f(!b.X)u;k o=b.X;f(6w)o.1k.q.S=\'1j\';o.1k.q.Y=(x-o.1p)+\'N\';o.1k.q.15=(y-o.1p)+\'N\';o.1k.q.R=(w+2*(b.1N+o.1p))+\'N\';w+=2*(b.1N-o.1p);h+=+2*(b.1G-o.1p);o.1d[4].q.R=w>=0?w+\'N\':0;o.1d[4].q.H=h>=0?h+\'N\':0;f(o.3i)o.1d[3].q.H=o.1d[5].q.H=o.1d[4].q.H};M.L.6x=r(){b.6z=I;b.2g();f(b.3s&&b.8d==\'83\')b.7W();b.4T();f(c.4Z)b.4Y();f(b.J)b.6s();f(b.3W>b.x.B)b.6S();f(!b.J)b.5c()};M.L.5c=r(){k C=b.C;k 1c=b.1c;2Q 2t(1c,r(){O{c.z[C].6p()}P(e){}})};M.L.6p=r(){k 3l=c.5h(b.C,1);f(3l.2X.5g().Z(/c\\.5i/))k 12=c.17(\'12\',{1l:c.2L(3l)})};M.L.5j=r(){b.a.q.1H=b.5k;f(b.1b)c.1b.q.S=\'T\';c.z[b.C]=K};M.L.4Y=r(){k 5f=c.17(\'a\',{2r:c.6r,14:\'11-5f\',1w:c.6e,2N:c.6q});b.3R(5f,\'15 Y\')};M.L.6o=r(){f(!b.2R&&b.3Y)b.2R=\'J-Q-\'+b.3Y;f(b.2R){b.J=c.3K(b.2R)}f(b.3I){k s=(b.J)?b.J.1w:\'\';b.J=c.3K(b.3I);f(b.J)b.J.1w=b.J.1w.1z(/\\s/g,\' \').1z(\'{J}\',s)}f(b.J)b.2K+=b.3m};M.L.6s=r(){O{b.D.q.R=b.D.1T+\'N\';b.J.q.S=\'T\';b.J.14+=\' 11-3A-3L\';k H;f(c.1i&&(c.2m()<6||V.5e==\'6y\')){H=b.J.1u}G{k 6u=c.17(\'29\',{1w:b.J.1w},K,K,I);b.J.1w=\'\';b.J.2y(6u);H=b.J.1X[0].1u;b.J.1w=b.J.1X[0].1w}c.1C(b.J,{6v:\'T\',H:0,1v:2});f(c.58){2l=1y.1D(H/50);f(2l==0)2l=1;2l=2l*c.58}G{b.5b(H,1);u}k t=0;Q(k h=H%2l;h<=H;h+=2l,t+=10){k 3S=(h==H)?1:0;k 5m="O { "+"c.z["+b.C+"].5b("+h+", "+3S+");"+"} P (e) {}";2k(5m,t)}}P(e){}};M.L.5b=r(H,3S){f(!b.J)u;b.J.q.H=H+\'N\';b.J.q.S=\'1j\';b.y.B=b.D.1u-2*b.1G;k o=b.X;f(o){o.1d[4].q.H=(b.D.1u-2*b.X.1p)+\'N\';f(o.3i)o.1d[3].q.H=o.1d[5].q.H=o.1d[4].q.H}f(3S)b.5c()};M.L.2d=r(3j,S,1r){k 18=V.49(3j);f(18){Q(i=0;i<18.19;i++){f(18[i].8f==3j){k 1q=18[i].3v(\'T-2q\');f(S==\'1j\'&&1q){1q=1q.1z(\'[\'+b.C+\']\',\'\');18[i].2w(\'T-2q\',1q);f(!1q)18[i].q.S=\'1j\'}G f(S==\'T\'){k 1J=c.U(18[i]);1J.w=18[i].1T;1J.h=18[i].1u;k 6d=(1J.x+1J.w<1r.x||1J.x>1r.x+1r.w);k 6i=(1J.y+1J.h<1r.y||1J.y>1r.y+1r.h);k 5n=c.5l(18[i]);f(!6d&&!6i&&5n!=b.C){f(!18[i].5p||(18[i].5p&&18[i].5p[\'S\']!=\'T\')){f(!1q){18[i].2w(\'T-2q\',\'[\'+b.C+\']\')}G f(!1q.Z(\'[\'+b.C+\']\')){18[i].2w(\'T-2q\',1q+\'[\'+b.C+\']\')}18[i].q.S=\'T\'}}G f(1q==\'[\'+b.C+\']\'||c.2W==5n){18[i].2w(\'T-2q\',\'\');18[i].q.S=\'1j\'}G f(1q&&1q.Z(\'[\'+b.C+\']\')){18[i].2w(\'T-2q\',1q.1z(\'[\'+b.C+\']\',\'\'))}}}}}};M.L.2g=r(){Q(i=0;i<c.z.19;i++){f(c.z[i]&&i==c.2W){k 28=c.z[i];28.F.14+=\' 11-\'+28.1E+\'-31\';f(28.J){28.J.14+=\' 11-J-31\'}f(28.1W){28.F.q.1H=c.1i?\'6g\':\'4M\';28.F.2N=c.6j}}}b.D.q.1v=c.2Y++;f(b.X)b.X.1k.q.1v=b.D.q.1v;b.F.14=\'11-\'+b.1E;f(b.J){b.J.14=b.J.14.1z(\' 11-J-31\',\'\')}f(b.1W){b.F.2N=c.5o;c.3p=1F.5a?\'4M\':\'52(\'+c.3z+c.56+\'), 4M\';f(c.1i&&c.2m()<6)c.3p=\'6g\';b.F.q.1H=c.3p}c.2W=b.C;c.2s(V,\'4C\',c.42)};M.L.6f=r(){b.2C()};M.L.2C=r(){c.3u(V,\'4C\',c.42);O{b.8u=I;k x=1f(b.D.q.Y);k y=1f(b.D.q.15);k w=(b.1W)?b.F.R:1f(b.F.q.R);k h=(b.1W)?b.F.H:1f(b.F.q.H);f(b.X){f(b.2I)b.3w(x,y,w,h);G f(b.6M)b.X.1k.q.S=\'T\';G b.X.4K()}k n=b.D.1X.19;Q(i=n-1;i>=0;i--){k 6U=b.D.1X[i];f(6U!=b.F){c.2A(b.D.1X[i]);b.D.3c(b.D.1X[i])}}f(b.3s)b.8y();b.D.q.R=\'2z\';b.F.q.1H=\'7S\';k 3F=b.X?b.X.1p:0;b.4N(-1,x,y,w,h,b.2i-b.1N+b.2F,b.2f-b.1G+b.3B,b.1U,b.1O,c.6Q,c.6F,3F,c.57)}P(e){b.4P()}};M.L.4P=r(){b.2p.q.S=\'1j\';f(c.3O)b.2d(\'4U\',\'1j\');f(c.3P)b.2d(\'4V\',\'1j\');f(b.3s&&b.6M)b.71();G{f(b.X&&b.2I)b.X.4K();c.2A(b.D);f(c.1i&&c.2m()<5.5)b.D.1w=\'\';G b.D.1x.3c(b.D)}f(c.6J)c.6J.q.3A=\'3M\';c.z[b.C]=K;c.6C()};M.L.3R=r(m,U,2P,1g){f(1M m==\'4J\')m=c.3K(m);f(!m||1M m==\'4J\'||!b.1W)u;k 1s=c.17(\'29\',K,{\'Y\':0,\'15\':0,\'U\':\'23\',\'1v\':3,\'S\':\'T\'},b.D,I);f(1g)c.1C(m,{\'1g\':1g});m.14+=\' 11-3A-3L\';1s.2y(m);k Y=b.1N;k 4F=b.F.R-1s.1T;k 15=b.1G;k 4D=b.F.H-1s.1u;f(!U)U=\'1Q 1Q\';f(U.Z(/^53/))15+=4D;f(U.Z(/^1Q/))15+=4D/2;f(U.Z(/54$/))Y+=4F;f(U.Z(/1Q$/))Y+=4F/2;1s.q.Y=Y+\'N\';1s.q.15=15+\'N\';f(2P)1s.2w(\'2P\',I);f(!1g)1g=1;1s.2w(\'1g\',1g);c.3r(1s,0,1g,1);c.4G(b.1m,1s)};M.L.4T=r(){Q(i=0;i<c.1m.19;i++){k o=c.1m[i];f(o.3X==K||o.3X==b.3Y){b.3R(o.76,o.U,o.2P,o.1g)}}};M.L.6T=r(){Q(i=0;i<b.1m.19;i++){k o=b.1m[i];f(o.3v(\'2P\'))c.3r(o,0,o.3v(\'1g\'),1)}};M.L.6Z=r(){Q(i=0;i<b.1m.19;i++){k o=b.1m[i];f(o.3v(\'2P\'))c.3r(o,o.3v(\'1g\'),0,-1)}};M.L.6S=r(){k a=c.17(\'a\',{2r:\'6R:c.z[\'+b.C+\'].6m();\',2N:c.6Y},{6A:\'52(\'+c.3z+c.2H+\')\',3A:\'3L\',6h:\'0 6c 6c 0\',R:\'73\',H:\'7b\'},K,I);b.3R(a,\'53 54\',I,0.75);b.2H=a};M.L.6m=r(){O{c.2A(b.2H);b.2H.1x.3c(b.2H);b.2g();b.x.E=1f(b.D.q.Y)-(b.3W-b.F.R)/2;f(b.x.E<c.45)b.x.E=c.45;b.D.q.Y=b.x.E+\'N\';k 6t=b.D.1T-b.F.R;b.F.R=b.3W;b.F.H=b.6n;b.x.B=b.F.R;b.D.q.R=(b.x.B+6t)+\'N\';b.y.B=b.D.1u-2*b.1G;b.3w(b.x.E,b.y.E,b.x.B,b.y.B);Q(k i=0;i<b.1m.19;i++){c.2A(b.1m[i]);b.1m[i].1x.3c(b.1m[i])}f(c.4Z)b.4Y();b.4T();b.44()}P(e){1F.4S.2r=b.F.1l}};M.L.44=r(){k 1r={x:1f(b.D.q.Y)-20,y:1f(b.D.q.15)-20,w:b.F.1T+40,h:b.F.1u+40+b.3m};f(c.3O)b.2d(\'4U\',\'T\',1r);f(c.3P)b.2d(\'4V\',\'T\',1r)};c.2s(V,\'6X\',c.4W);c.2s(V,\'6V\',c.4W);c.2s(1F,\'7p\',c.6b);',
    62, 534,
    '|||||||||||this|hs|||if|||||var||el||||style|function|||return|||||expanders||span|key|wrapper|min|content|else|height|true|caption|null|prototype|HsExpander|px|try|catch|for|width|visibility|hidden|position|document|dragExp|objOutline|left|match||highslide|img||className|top|justify|createElement|els|length|false|loading|outlineType|td|target|parseInt|opacity|fobj|ie|visible|table|src|overlays|exp|id|offset|hiddenBy|imgPos|overlay|event|offsetHeight|zIndex|innerHTML|parentNode|Math|replace|marginMin|op|setStyles|round|contentType|window|offsetBorderH|cursor|minSpan|elPos|onLoad|steps|typeof|offsetBorderW|thumbHeight|params|center|pos|image|offsetWidth|thumbWidth|func|isImage|childNodes|case|clientSpan||marginMax|graphic|absolute|scroll||ratio||blurExp|div|100|styles|arr|showHideElements|newWidth|thumbTop|focus|to|thumbLeft|tgt|setTimeout|step|ieVersion|newHeight|clone|thumb|by|href|addEventListener|HsOutline|container|name|setAttribute|re|appendChild|auto|purge|minWidth|doClose|allowReduce|pThis|thumbOffsetBorderW|attribs|fullExpandIcon|outlineWhileAnimating|anchor|marginBottom|getSrc|overrides|title|aAr|hideOnMouseOut|new|captionId|dir|wLeft|wTop|minHeight|focusKey|onclick|zIndexCounter|on||blur|pendingOutlines||||number||||param|hasFocused|removeChild|getExpander|preloadTheseImages|x1|h1|w1|hasAlphaImageLoader|tagName|y1|next|spaceForCaption|oo1|move|styleRestoreCursor|client|fade|isHtml|iebody|removeEventListener|getAttribute|positionOutline|html|custom|graphicsDir|display|thumbOffsetBorderH|hasMoved|slideshowGroup|dim|o2|split|scrollLeft|captionTemplateId|node|getNode|block|none|isHsAnchor|hideSelects|hideIframes|topmostKey|createOverlay|end|undefined|allowSizeReduction|previousOrNext|fullExpandWidth|thumbnailId|thumbsUserSetId|thumbSpan||while|keyHandler|tr|redoShowHide|marginLeft|faders|preventDefault|onLoadStarted|getElementsByTagName|changed|scrollTop|safari|Create|onload|navigator|targetY|expandedImagesCounter|numberOfImagesToPreload|connectOutline|targetX|wrapperClassName|genContainer|displayLoading|relative|max|tbody|align|oFinal|body|x2|y2|oo2|h2|w2|preloadFullImage|hasMovedMin|continuePreloading|keydown|dTop|clones|dLeft|push|activeI|getParam|string|destroy|element|pointer|changeSize|aTags|onEndClose|hsAr|close|location|createCustomOverlays|SELECT|IFRAME|mouseClickHandler|Click|writeCredits|showCredits||topZ|url|bottom|right|parent|restoreCursor|outlineStartOffset|captionSlideSpeed|mouseMoveHandler|opera|placeCaption|onDisplayFinished|isDraggable|compatMode|credits|toString|getAdjacentAnchor|expand|cancelLoading|originalCursor|getWrapperKey|eval|wrapperKey|restoreTitle|currentStyle|dragY|detachEvent|nopad|250|srcElement|clientY|self|in|setAttribs|form|tag|appendTo|9999px|preloadGraphic|Highslide|JS|offsetParent|val|200|and|clientX|mousemove|tempOpacity|parseFloat|break|cloneNode|type|hasPngSupport|previous|geckoBug|cur|allowMultipleInstances|offsetTop|offsetLeft|filter|documentElement|loadingTitle|enableKeyListener|focusTopmost|onGraphicLoad|dragX|dOo|dH|dW|dX|dY|dur|preloadImages|10px|clearsX|creditsText|onClick|hand|margin|clearsY|focusTitle|IMG|hideThumbOnExpand|doFullExpand|fullExpandHeight|getCaption|preloadNext|creditsTitle|creditsHref|writeCaption|borderOffset|temp|overflow|vis|onExpanded|BackCompat|isExpanded|background|correctRatio|cleanUp|modMarginRight|marginTop|restoreSteps|expandDuration|show|clientInfo|mask|loadingOpacity|loadingText|preserveContent|htmlGetSize|marginRight|expandSteps|restoreDuration|javascript|createFullExpand|onMouseOver|child|mouseup|tmpMin|mousedown|fullExpandTitle|onMouseOut|clientHeight|sleep|attributes|45px|closeId||overlayId|pageXOffset|rel|pageYOffset|_slash_|44px|innerHeight|RegExp|getElementById|arrow|Use|drag|keys|bring|cancel|Loading|front|click|size|load|zoomout|graphics|1001|fullexpand|actual|Expand|gif|Powered|http|padding|switch|Safari|border|alpha|clientWidth|MSIE|appVersion|indexOf|userAgent|Go|no|vikjavev|the|homepage|all|shadow|drop|innerWidth|default|png|outlines|attachEvent|writeExtendedContent|clearTimeout|hasHtmlexpanders|DXImageTransform|progid|collapse|floor|after|htmlE|tmpWidth|keyCode|imageSetSize|tmpHeight|lineHeight|fontSize|xpand|object|objectLoadTime|SetSize|nodeName|oldBottom|htmlSizeOperations|cellSpacing|vendor|oldRight|onmouseover|imageCreate|maxWidth|onmouseout|borderCollapse|KDE|wait|test|AlphaImageLoader|isClosing|button|Microsoft|registerOverlay|htmlOnClose|sizingMethod|scale|returnValue'
    .split('|'), 0, {}));
(function(t, e) {
    "use strict";

    function n() {
        if (!i.READY) {
            i.event.determineEventTypes();
            for (var t in i.gestures) i.gestures.hasOwnProperty(t) && i.detection
                .register(i.gestures[t]);
            i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect),
                i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect),
                i.READY = !0
        }
    }
    var i = function(t, e) {
        return new i.Instance(t, e || {})
    };
    i.defaults = {
            stop_browser_behavior: {
                userSelect: "none",
                touchAction: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        }, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled,
        i.HAS_TOUCHEVENTS = "ontouchstart" in t, i.MOBILE_REGEX =
        /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS &&
        navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN =
        "down", i.DIRECTION_LEFT = "left", i.DIRECTION_UP = "up", i.DIRECTION_RIGHT =
        "right", i.POINTER_MOUSE = "mouse", i.POINTER_TOUCH = "touch", i.POINTER_PEN =
        "pen", i.EVENT_START = "start", i.EVENT_MOVE = "move", i.EVENT_END =
        "end", i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance =
        function(t, e) {
            var r = this;
            return n(), this.element = t, this.enabled = !0, this.options =
                i.utils.extend(i.utils.extend({}, i.defaults), e || {}),
                this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(
                    this.element, this.options.stop_browser_behavior), i.event
                .onTouch(t, i.EVENT_START, function(t) {
                    r.enabled && i.detection.startDetect(r, t)
                }), this
        }, i.Instance.prototype = {
            on: function(t, e) {
                for (var n = t.split(" "), i = 0; n.length > i; i++)
                    this.element.addEventListener(n[i], e, !1);
                return this
            },
            off: function(t, e) {
                for (var n = t.split(" "), i = 0; n.length > i; i++)
                    this.element.removeEventListener(n[i], e, !1);
                return this
            },
            trigger: function(t, e) {
                var n = i.DOCUMENT.createEvent("Event");
                n.initEvent(t, !0, !0), n.gesture = e;
                var r = this.element;
                return i.utils.hasParent(e.target, r) && (r = e.target),
                    r.dispatchEvent(n), this
            },
            enable: function(t) {
                return this.enabled = t, this
            }
        };
    var r = null,
        o = !1,
        s = !1;
    i.event = {
            bindDom: function(t, e, n) {
                for (var i = e.split(" "), r = 0; i.length > r; r++) t.addEventListener(
                    i[r], n, !1)
            },
            onTouch: function(t, e, n) {
                var a = this;
                this.bindDom(t, i.EVENT_TYPES[e], function(c) {
                    var u = c.type.toLowerCase();
                    if (!u.match(/mouse/) || !s) {
                        (u.match(/touch/) || u.match(
                            /pointerdown/) || u.match(
                            /mouse/) && 1 === c.which) && (o = !
                            0), u.match(/touch|pointer/) && (s = !
                            0);
                        var h = 0;
                        o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ?
                                h = i.PointerEvent.updatePointer(
                                    e, c) : u.match(/touch/) ?
                                h = c.touches.length : s || (h =
                                    u.match(/up/) ? 0 : 1), h >
                                0 && e == i.EVENT_END ? e = i.EVENT_MOVE :
                                h || (e = i.EVENT_END), h ||
                                null === r ? r = c : c = r, n.call(
                                    i.detection, a.collectEventData(
                                        t, e, c)), i.HAS_POINTEREVENTS &&
                                e == i.EVENT_END && (h = i.PointerEvent
                                    .updatePointer(e, c))), h ||
                            (r = null, o = !1, s = !1, i.PointerEvent
                                .reset())
                    }
                })
            },
            determineEventTypes: function() {
                var t;
                t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() :
                    i.NO_MOUSEEVENTS ? ["touchstart", "touchmove",
                        "touchend touchcancel"
                    ] : ["touchstart mousedown", "touchmove mousemove",
                        "touchend touchcancel mouseup"
                    ], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[
                        i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] =
                    t[2]
            },
            getTouchList: function(t) {
                return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() :
                    t.touches ? t.touches : [{
                        identifier: 1,
                        pageX: t.pageX,
                        pageY: t.pageY,
                        target: t.target
                    }]
            },
            collectEventData: function(t, e, n) {
                var r = this.getTouchList(n, e),
                    o = i.POINTER_TOUCH;
                return (n.type.match(/mouse/) || i.PointerEvent.matchType(
                    i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {
                    center: i.utils.getCenter(r),
                    timeStamp: (new Date).getTime(),
                    target: n.target,
                    touches: r,
                    eventType: e,
                    pointerType: o,
                    srcEvent: n,
                    preventDefault: function() {
                        this.srcEvent.preventManipulation &&
                            this.srcEvent.preventManipulation(),
                            this.srcEvent.preventDefault &&
                            this.srcEvent.preventDefault()
                    },
                    stopPropagation: function() {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function() {
                        return i.detection.stopDetect()
                    }
                }
            }
        }, i.PointerEvent = {
            pointers: {},
            getTouchList: function() {
                var t = this,
                    e = [];
                return Object.keys(t.pointers).sort().forEach(function(
                    n) {
                    e.push(t.pointers[n])
                }), e
            },
            updatePointer: function(t, e) {
                return t == i.EVENT_END ? this.pointers = {} : (e.identifier =
                        e.pointerId, this.pointers[e.pointerId] = e),
                    Object.keys(this.pointers).length
            },
            matchType: function(t, e) {
                if (!e.pointerType) return !1;
                var n = {};
                return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE ||
                    e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] =
                    e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType ==
                    i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType ==
                    e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN,
                    n[t]
            },
            getEvents: function() {
                return ["pointerdown MSPointerDown",
                    "pointermove MSPointerMove",
                    "pointerup pointercancel MSPointerUp MSPointerCancel"
                ]
            },
            reset: function() {
                this.pointers = {}
            }
        }, i.utils = {
            extend: function(t, n, i) {
                for (var r in n) t[r] !== e && i || (t[r] = n[r]);
                return t
            },
            hasParent: function(t, e) {
                for (; t;) {
                    if (t == e) return !0;
                    t = t.parentNode
                }
                return !1
            },
            getCenter: function(t) {
                for (var e = [], n = [], i = 0, r = t.length; r > i; i++)
                    e.push(t[i].pageX), n.push(t[i].pageY);
                return {
                    pageX: (Math.min.apply(Math, e) + Math.max.apply(
                        Math, e)) / 2,
                    pageY: (Math.min.apply(Math, n) + Math.max.apply(
                        Math, n)) / 2
                }
            },
            getVelocity: function(t, e, n) {
                return {
                    x: Math.abs(e / t) || 0,
                    y: Math.abs(n / t) || 0
                }
            },
            getAngle: function(t, e) {
                var n = e.pageY - t.pageY,
                    i = e.pageX - t.pageX;
                return 180 * Math.atan2(n, i) / Math.PI
            },
            getDirection: function(t, e) {
                var n = Math.abs(t.pageX - e.pageX),
                    r = Math.abs(t.pageY - e.pageY);
                return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT :
                    i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP :
                    i.DIRECTION_DOWN
            },
            getDistance: function(t, e) {
                var n = e.pageX - t.pageX,
                    i = e.pageY - t.pageY;
                return Math.sqrt(n * n + i * i)
            },
            getScale: function(t, e) {
                return t.length >= 2 && e.length >= 2 ? this.getDistance(
                    e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
            },
            getRotation: function(t, e) {
                return t.length >= 2 && e.length >= 2 ? this.getAngle(e[
                    1], e[0]) - this.getAngle(t[1], t[0]) : 0
            },
            isVertical: function(t) {
                return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
            },
            stopDefaultBrowserBehavior: function(t, e) {
                var n, i = ["webkit", "khtml", "moz", "ms", "o", ""];
                if (e && t.style) {
                    for (var r = 0; i.length > r; r++)
                        for (var o in e) e.hasOwnProperty(o) && (n = o,
                            i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() +
                                n.substring(1)), t.style[n] = e[o]);
                    "none" == e.userSelect && (t.onselectstart =
                        function() {
                            return !1
                        })
                }
            }
        }, i.detection = {
            gestures: [],
            current: null,
            previous: null,
            stopped: !1,
            startDetect: function(t, e) {
                this.current || (this.stopped = !1, this.current = {
                    inst: t,
                    startEvent: i.utils.extend({}, e),
                    lastEvent: !1,
                    name: ""
                }, this.detect(e))
            },
            detect: function(t) {
                if (this.current && !this.stopped) {
                    t = this.extendEventData(t);
                    for (var e = this.current.inst.options, n = 0, r =
                            this.gestures.length; r > n; n++) {
                        var o = this.gestures[n];
                        if (!this.stopped && e[o.name] !== !1 && o.handler
                            .call(o, t, this.current.inst) === !1) {
                            this.stopDetect();
                            break
                        }
                    }
                    return this.current && (this.current.lastEvent = t),
                        t.eventType == i.EVENT_END && !t.touches.length -
                        1 && this.stopDetect(), t
                }
            },
            stopDetect: function() {
                this.previous = i.utils.extend({}, this.current), this.current =
                    null, this.stopped = !0
            },
            extendEventData: function(t) {
                var e = this.current.startEvent;
                if (e && (t.touches.length != e.touches.length || t.touches ===
                        e.touches)) {
                    e.touches = [];
                    for (var n = 0, r = t.touches.length; r > n; n++) e
                        .touches.push(i.utils.extend({}, t.touches[n]))
                }
                var o = t.timeStamp - e.timeStamp,
                    s = t.center.pageX - e.center.pageX,
                    a = t.center.pageY - e.center.pageY,
                    c = i.utils.getVelocity(o, s, a);
                return i.utils.extend(t, {
                    deltaTime: o,
                    deltaX: s,
                    deltaY: a,
                    velocityX: c.x,
                    velocityY: c.y,
                    distance: i.utils.getDistance(e.center, t.center),
                    angle: i.utils.getAngle(e.center, t.center),
                    direction: i.utils.getDirection(e.center, t
                        .center),
                    scale: i.utils.getScale(e.touches, t.touches),
                    rotation: i.utils.getRotation(e.touches, t.touches),
                    startEvent: e
                }), t
            },
            register: function(t) {
                var n = t.defaults || {};
                return n[t.name] === e && (n[t.name] = !0), i.utils.extend(
                        i.defaults, n, !0), t.index = t.index || 1e3,
                    this.gestures.push(t), this.gestures.sort(function(
                        t, e) {
                        return t.index < e.index ? -1 : t.index > e
                            .index ? 1 : 0
                    }), this.gestures
            }
        }, i.gestures = i.gestures || {}, i.gestures.Hold = {
            name: "hold",
            index: 10,
            defaults: {
                hold_timeout: 500,
                hold_threshold: 1
            },
            timer: null,
            handler: function(t, e) {
                switch (t.eventType) {
                    case i.EVENT_START:
                        clearTimeout(this.timer), i.detection.current.name =
                            this.name, this.timer = setTimeout(function() {
                                "hold" == i.detection.current.name &&
                                    e.trigger("hold", t)
                            }, e.options.hold_timeout);
                        break;
                    case i.EVENT_MOVE:
                        t.distance > e.options.hold_threshold &&
                            clearTimeout(this.timer);
                        break;
                    case i.EVENT_END:
                        clearTimeout(this.timer)
                }
            }
        }, i.gestures.Tap = {
            name: "tap",
            index: 100,
            defaults: {
                tap_max_touchtime: 250,
                tap_max_distance: 10,
                tap_always: !0,
                doubletap_distance: 20,
                doubletap_interval: 300
            },
            handler: function(t, e) {
                if (t.eventType == i.EVENT_END) {
                    var n = i.detection.previous,
                        r = !1;
                    if (t.deltaTime > e.options.tap_max_touchtime || t.distance >
                        e.options.tap_max_distance) return;
                    n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp <
                        e.options.doubletap_interval && t.distance < e.options
                        .doubletap_distance && (e.trigger("doubletap",
                            t), r = !0), (!r || e.options.tap_always) &&
                        (i.detection.current.name = "tap", e.trigger(i.detection
                            .current.name, t))
                }
            }
        }, i.gestures.Swipe = {
            name: "swipe",
            index: 40,
            defaults: {
                swipe_max_touches: 1,
                swipe_velocity: .7
            },
            handler: function(t, e) {
                if (t.eventType == i.EVENT_END) {
                    if (e.options.swipe_max_touches > 0 && t.touches.length >
                        e.options.swipe_max_touches) return;
                    (t.velocityX > e.options.swipe_velocity || t.velocityY >
                        e.options.swipe_velocity) && (e.trigger(this.name,
                        t), e.trigger(this.name + t.direction, t))
                }
            }
        }, i.gestures.Drag = {
            name: "drag",
            index: 50,
            defaults: {
                drag_min_distance: 10,
                drag_max_touches: 1,
                drag_block_horizontal: !1,
                drag_block_vertical: !1,
                drag_lock_to_axis: !1,
                drag_lock_min_distance: 25
            },
            triggered: !1,
            handler: function(t, n) {
                if (i.detection.current.name != this.name && this.triggered)
                    return n.trigger(this.name + "end", t), this.triggered = !
                        1, e;
                if (!(n.options.drag_max_touches > 0 && t.touches.length >
                        n.options.drag_max_touches)) switch (t.eventType) {
                    case i.EVENT_START:
                        this.triggered = !1;
                        break;
                    case i.EVENT_MOVE:
                        if (t.distance < n.options.drag_min_distance &&
                            i.detection.current.name != this.name)
                            return;
                        i.detection.current.name = this.name, (i.detection
                            .current.lastEvent.drag_locked_to_axis ||
                            n.options.drag_lock_to_axis && n.options
                            .drag_lock_min_distance <= t.distance
                        ) && (t.drag_locked_to_axis = !0);
                        var r = i.detection.current.lastEvent.direction;
                        t.drag_locked_to_axis && r !== t.direction &&
                            (t.direction = i.utils.isVertical(r) ?
                                0 > t.deltaY ? i.DIRECTION_UP : i.DIRECTION_DOWN :
                                0 > t.deltaX ? i.DIRECTION_LEFT : i
                                .DIRECTION_RIGHT), this.triggered ||
                            (n.trigger(this.name + "start", t),
                                this.triggered = !0), n.trigger(
                                this.name, t), n.trigger(this.name +
                                t.direction, t), (n.options.drag_block_vertical &&
                                i.utils.isVertical(t.direction) ||
                                n.options.drag_block_horizontal &&
                                !i.utils.isVertical(t.direction)) &&
                            t.preventDefault();
                        break;
                    case i.EVENT_END:
                        this.triggered && n.trigger(this.name +
                            "end", t), this.triggered = !1
                }
            }
        }, i.gestures.Transform = {
            name: "transform",
            index: 45,
            defaults: {
                transform_min_scale: .01,
                transform_min_rotation: 1,
                transform_always_block: !1
            },
            triggered: !1,
            handler: function(t, n) {
                if (i.detection.current.name != this.name && this.triggered)
                    return n.trigger(this.name + "end", t), this.triggered = !
                        1, e;
                if (!(2 > t.touches.length)) switch (n.options.transform_always_block &&
                    t.preventDefault(), t.eventType) {
                    case i.EVENT_START:
                        this.triggered = !1;
                        break;
                    case i.EVENT_MOVE:
                        var r = Math.abs(1 - t.scale),
                            o = Math.abs(t.rotation);
                        if (n.options.transform_min_scale > r && n.options
                            .transform_min_rotation > o) return;
                        i.detection.current.name = this.name, this.triggered ||
                            (n.trigger(this.name + "start", t),
                                this.triggered = !0), n.trigger(
                                this.name, t), o > n.options.transform_min_rotation &&
                            n.trigger("rotate", t), r > n.options.transform_min_scale &&
                            (n.trigger("pinch", t), n.trigger(
                                "pinch" + (1 > t.scale ? "in" :
                                    "out"), t));
                        break;
                    case i.EVENT_END:
                        this.triggered && n.trigger(this.name +
                            "end", t), this.triggered = !1
                }
            }
        }, i.gestures.Touch = {
            name: "touch",
            index: -1 / 0,
            defaults: {
                prevent_default: !1,
                prevent_mouseevents: !1
            },
            handler: function(t, n) {
                return n.options.prevent_mouseevents && t.pointerType ==
                    i.POINTER_MOUSE ? (t.stopDetect(), e) : (n.options.prevent_default &&
                        t.preventDefault(), t.eventType == i.EVENT_START &&
                        n.trigger(this.name, t), e)
            }
        }, i.gestures.Release = {
            name: "release",
            index: 1 / 0,
            handler: function(t, e) {
                t.eventType == i.EVENT_END && e.trigger(this.name, t)
            }
        }, "object" == typeof module && "object" == typeof module.exports ?
        module.exports = i : (t.Hammer = i, "function" == typeof t.define &&
            t.define.amd && t.define("hammer", [], function() {
                return i
            }))
})(this);
headFunctionsHeight = 90;
headFunctionsMarginTop = -20;
orgDiffer = headFunctionsHeight + headFunctionsMarginTop;
expandWidth = 30;
wrapped = false;
$(document).ready(function() {
    if ($('.groupNavi').html() != "") {
        orgElementPos = $('.groupNavi').offset();
        console.debug("orgElementPos = "+orgElementPos+" $('.groupNavi')"+$('.groupNavi').length);
        var stickyHeaderScrollHandler = (orgElementPos == null)?(function(){}):function() {
            orgElementTop = orgElementPos.top;
            if ($(window).scrollTop() >= (orgElementTop - orgDiffer)) {
                if (wrapped == false) {
                    $('.headSearch').wrap(
                        '<div id="stickyHeadSearchWrapper"></div>'
                    );
                    $('.groupNavi').wrap(
                        '<div id="stickyGroupNaviWrapper"></div>'
                    );
                    $('.headFunctions').wrap(
                        '<div id="stickyHeadFunctionsWrapper" align="center"></div>'
                    );
                    $('.headFunctions div.logo').wrap(
                        '<div id="stickyLogoWrapper"></div>');
                    $("#stickyLogoWrapper").append(
                        '<a id="stickyLogoLink"></a>');
                    $("#stickyLogoLink").attr("href", $(
                        ".logo.h1 a")[0].href);
                    wrapped = true;
                }
            } else {
                if (wrapped == true) {
                    $('.headSearch').unwrap();
                    $('.groupNavi').unwrap();
                    $('.headFunctions').unwrap();
                    $('.headFunctions div.logo').unwrap();
                    $("#stickyLogoLink").remove();
                    wrapped = false;
                }
            }
        };
        if (window.addEventListener) {
            window.addEventListener('scroll', stickyHeaderScrollHandler);
        } else if (window.attachEvent) {
            window.attachEvent('scroll', stickyHeaderScrollHandler);
        }
    }
});

function lottery_nextField(e, source, nextNumber) {
    if (!e) var e = window.event;
    if (e.keyCode > 32) {
        if (document.getElementById('lottery_solution_' + nextNumber)) {
            document.getElementById('lottery_solution_' + nextNumber).setAttribute(
                'autocomplete', 'off');
            document.getElementById('lottery_solution_' + nextNumber).focus();
        }
    }
}

function lottery_previousField(e, source, nextNumber) {
    if (!e) var e = window.event;
    document.getElementById('lottery_solution_' + (nextNumber - 1)).setAttribute(
        'autocomplete', 'off');
    if (e.keyCode == 8 && source.value == '') {
        if ((nextNumber - 2) >= 0) {
            document.getElementById('lottery_solution_' + (nextNumber - 2)).focus();
            document.getElementById('lottery_solution_' + (nextNumber - 2)).value =
                "";
        }
    }
}

function lottery_checkSpace(e) {
    if (!e) var e = window.event;
    if (e.charCode == 32) {
        return false;
    }
    return true;
}

function giftSearchAction(ctype, uid, actionName, actionValue, button) {
    filterGENDER = $('#giftfinder_form_' + uid + ' input[name="filterGENDER"]');
    filterGENDERmale = $('#giftfinder_form_' + uid +
        ' input[name="filterGENDERmale"]');
    filterGENDERfemale = $('#giftfinder_form_' + uid +
        ' input[name="filterGENDERfemale"]');
    if (filterGENDERmale.attr('checked') ^ filterGENDERfemale.attr('checked')) {
        if (filterGENDERmale.attr('checked')) {
            filterGENDER.val(filterGENDERmale.val());
        }
        if (filterGENDERfemale.attr('checked')) {
            filterGENDER.val(filterGENDERfemale.val());
        }
    }
    filterGENDERmale.attr('checked', false);
    filterGENDERfemale.attr('checked', false);
    form = $('form.giftfinder_form', $(button).siblings('div'));
    form.submit();
};
$(document).ready(function() {
    var anyForm = $('.giftfinder_form');
    if ($(anyForm).attr('id') != undefined) {
        var gfid = $(anyForm).attr('id').substr($(anyForm).attr('id').lastIndexOf(
            '_') + 1);
        $('.giftFinderCategory_' + gfid + ' input').change(function() {
            giftFinderCategory = $(this).parents(
                '.giftFinderCategory_' + gfid);
            $('select:enabled', giftFinderCategory).attr(
                'disabled', 'disabled');
            select = $(this).nextAll('select');
            select.removeAttr('disabled');
            select.trigger('change');
        });
        $('.giftFinderCategory_' + gfid + ' fieldset select').change(
            function(e) {
                $(this).siblings('input[type=radio]').attr(
                    'checked', true);
                var url = '';
                url = $("option:selected", this).val();
                url = url.replace(/^https?:/i, '');
                form = $(this).parents('.giftFinderCategory_' +
                    gfid).siblings('form');
                form.attr('action', url);
            });
        $('.giftfinder_form').each(function() {
            giftFinderCategory = $(this).next();
            $('input:first', giftFinderCategory).removeAttr(
                'disabled');
            $('input:first', giftFinderCategory).attr('checked',
                'true');
            $('input:first', giftFinderCategory).trigger(
                'change');
        });
    }
    if (isTablet()) {
        var tabletStyleSheet =
            '/cache/fileadmin_templates_BABY_baby_global_css_tablet.css';
        if (document.createStyleSheet) {
            document.createStyleSheet(tabletStyleSheet);
        } else {
            $('head').append($("<link rel='stylesheet' href='" +
                tabletStyleSheet +
                "' type='text/css' media='screen' />"));
        }
    }
});
if (typeof dmc != 'object')
    dmc = {};
if (typeof dmc.WALZ != 'object')
    dmc.WALZ = {};
if (typeof dmc.WALZ.Product != 'object')
    dmc.WALZ.Product = {};
dmc.Product = (function() {
    function Product(config) {
        this.lastCampainArtnumber = '';
        this.confClientPk = '';
        this.confClientName = '';
        this.confLanguagePk = '';
        this.confIsoCode2 = '';
        this.selfUID = config.selfUID;
        this.parentContainer = config.parentContainer;
        if (!config.parentContainer) {
            this.parentContainer = 'productDetail';
        }
        this.parentContainerObj = document.getElementById(this.parentContainer);
        this.relTypeComponent = 1;
        this.relTypeComponentSpecify = 4294967296;
        this.selectFieldTemplateContainer =
            'selectFieldTemplateContainer';
        this.onArticleChanged = new dmc.Utils.CustomEvent();
        this.dataProduct = {};
        this.dataArticles = {};
        this.dataComponents = {};
        this.dataMedia = {};
        this.dataCrossselling = {};
        this.components = [];
        this.components[this.relTypeComponent] = [];
        this.components[this.relTypeComponentSpecify] = [];
        this.componentArticleMapping = [];
        this.componentArticleMapping[this.relTypeComponent] = [];
        this.componentArticleMapping[this.relTypeComponentSpecify] = [];
        this.articleComponentMapping = [];
        this.articleComponentMapping[this.relTypeComponent] = [];
        this.articleComponentMapping[this.relTypeComponentSpecify] = [];
        this.specifyingComponentComponentMapping = [];
        this.specifyingComponentCount = 0;
        this.specifyingComponentList = [];
        this.selectFields = [];
        this.selectFieldClass = 'productComponent_' + this.selfUID;
        this.fieldArticleOrderNumber = 'productArticleOrderNumber_' +
            this.selfUID;
        this.fieldProductPrice = 'productPrice_' + this.selfUID;
        this.fieldAvailabilityLink = 'productAvailLink_' + this.selfUID;
        this.fieldAvailability = 'productAvail_' + this.selfUID;
        this.fieldCopytext = 'productCopytext_' + this.selfUID;
        this.fieldWarning = 'productWarning_' + this.selfUID;
        this.fieldSeals = 'productSeals_' + this.selfUID;
        this.fieldBulkyFeeNotice = 'productBulkyFeeNotice';
        this.fieldDeliveryServiceIcon = 'deliveryServiceIcon';
        this.fieldProductAmountForm = 'productAmountForm_' + this.selfUID;
        this.fieldProductBasketPk = 'productBasketPk_' + this.selfUID;
        this.fieldProductBasketProductPk = 'productBasketProductPk_' +
            this.selfUID;
        this.divProductComponentList = 'productComponentList';
        this.fieldGravureInput = 'productGravureInput_' + this.selfUID;
        this.fieldGravureText = 'productGravureText_' + this.selfUID;
        this.fieldGravureMessageBefore = 'productGravureMessageBefore_' +
            this.selfUID;
        this.fieldGravureMessageAfter = 'productGravureMessageAfter_' +
            this.selfUID;
        this.gravureForm = 'productGravureForm_' + this.selfUID;
        this.gravureContainer = 'gravureContainer_' + this.selfUID;
        this.productGravureAbstractContent =
            'productGravureAbstractContent';
        this.productGravureHint = 'productGravureHint';
        this.productYardwareNotice = 'productYardwareNotice';
        this.crosssellingTargetContainer =
            'crosssellingTargetContainer';
        this.crosssellingContainer = 'crosssellings';
        this.productCrossSellingNotice = 'productCrossSellingNotice';
        this.divProductManufacturerImages = 'prodLogos';
        this.divProductManufacturer2Images = 'prodSubLogos';
        this.divProductCareInfoImages = 'careInfo';
        this.basketButtonClass = '.buBasket';
        this.productForm = 'productForm_' + this.selfUID;
        this.configStockTypeCSSPrefix = 'stock_';
        this.mediaRelTypeLarge = 560;
        this.mediaRelTypeThumb2 = 554;
        this.mediaRelTypeCareInfo = 506;
        this.mediaRelTypeTestInfo = 508;
        this.mediaRelTypeOther = 509;
        this.mediaRelTypeManufacturer = 507;
        this.mediaRelTypeManufacturer2 = 577;
        this.mainImage = 'dmc_mb3_product_pi1' + this.selfUID +
            'MainImage';
        this.thumbImageList = 'dmc_mb3_product_pi1' + this.selfUID +
            'ImageLinks';
        this.specifyingChosenComponents = [];
        this.addToBasketParams = {};
        this.chosenArtSize;
        this.debug = true;
        if (config) {
            for (var prop in config) {
                if (config.hasOwnProperty(prop)) {
                    this[prop] = config[prop];
                }
            }
        }
    }
    Product.prototype = {
        _instances: [],
        getInstance: function() {
            var key = this.selfUID.toString();
            if (typeof this._instances[key] == 'object') {
                return this._instances[key];
            } else {
                this._instances[key] = this;
                this._instances[key].selfUID = key;
                return this._instances[key];
            }
        },
        init: function() {
            var key = this.selfUID.toString();
            if (this._instances[key] == null) {
                this._instances[key] = this;
                this._instances[key].selfUID = key;
            }
            this.inject();
            this.readProductData();
            this.processComponents();
            this.createSelectFields();
            var articleSpecificallyChosen = this.getOrdernumberArtsize();
            if (!articleSpecificallyChosen) {
                this.selectBestAvailableCheapestArticle();
            }
            this.change();
            this.refreshArticleByKQpriAnchorParam();
        },
        inject: function() {
            var _this = this;
            $(this.parentContainerObj).find(this.basketButtonClass)
                .click(function() {
                    //$(this).parents('form').submit();
                });
            $(this.parentContainerObj).find('#' + this.productForm)
                .submit(function(event) {
                    //_this.addToBasket(event, _this.selfUID);
                });
        },
        update: function() {
            this.componentArticleMapping[this.relTypeComponent] = [];
            this.componentArticleMapping[this.relTypeComponentSpecify] = [];
            this.articleComponentMapping[this.relTypeComponent] = [];
            this.articleComponentMapping[this.relTypeComponentSpecify] = [];
            this.specifyingComponentComponentMapping = [];
            this.processComponents();
            this.createSelectFields();
            var articleSpecificallyChosen = this.getOrdernumberArtsize();
            if (!articleSpecificallyChosen) {
                this.selectBestAvailableCheapestArticle();
            }
            this.change();
        },
        change: function(sourceComponentPk) {
            this.getChosenComponents();
            this.refillSelectFields(sourceComponentPk);
            var currentArticle = this.getCurrentArticle();
            this.updatePage(currentArticle);
            this.onArticleChanged.trigger(this.selfUID, this,
                currentArticle);
            this.debugLog(currentArticle.artNumber + ' - ' +
                currentArticle.artSize);
        },
        processComponents: function() {
            this.extractComponents(this.dataProduct);
            for (var artNumber in this.dataArticles) {
                if (this.dataArticles.hasOwnProperty(artNumber)) {
                    for (var artSize in this.dataArticles[
                            artNumber]) {
                        if (this.dataArticles[artNumber].hasOwnProperty(
                                artSize)) {
                            this.extractComponents(this.dataArticles[
                                    artNumber][artSize],
                                artNumber, artSize);
                        }
                    }
                }
            }
            this.createComponentComponentMapping();
        },
        getOrdernumberArtsize: function() {
            var returnValue = false;
            var ordersize = dmc.Utils.findQueryStringParam(
                "ordersize");
            var artSize = '';
            if (typeof(ordersize) != "undefined" && ordersize !=
                "") {
                artSize = ordersize;
            }
            var ordernumber = dmc.Utils.findQueryStringParam(
                "ordernumber");
            if (typeof(ordernumber) != "undefined" &&
                ordernumber != "" && typeof this.componentArticleMapping[
                    this.relTypeComponentSpecify] !=
                "undefined" && this.componentArticleMapping[
                    this.relTypeComponentSpecify][ordernumber] !=
                "undefined") {
                var artNumber = ordernumber;
                this.debugLog('Ordernumber: ' + artNumber +
                    ', Size: ' + artSize);
                if (artSize == '') {
                    this.debugLog(
                        'No artSize chosen, using selectBestAvailableCheapestArticle(' +
                        artNumber + ')');
                    returnValue = this.selectBestAvailableCheapestArticle(
                        artNumber);
                } else {
                    returnValue = this.setComponentsByArtNumber(
                        artNumber, artSize);
                    if (!returnValue) {
                        this.debugLog(
                            'artNumber + artSize not available, using selectBestAvailableCheapestArticle()'
                        );
                        returnValue = this.selectBestAvailableCheapestArticle();
                    }
                }
            }
            return returnValue;
        },
        selectBestAvailableCheapestArticle: function(
            chosenArtNumber) {
            var returnValue = false;
            var availability = [];
            for (var artNumber in this.dataArticles) {
                if (this.dataArticles.hasOwnProperty(artNumber)) {
                    if (typeof chosenArtNumber != 'undefined' &&
                        (chosenArtNumber > 0 || chosenArtNumber !=
                            '') && chosenArtNumber != artNumber
                    ) {
                        continue;
                    }
                    for (var artSize in this.dataArticles[
                            artNumber]) {
                        if (this.dataArticles[artNumber].hasOwnProperty(
                                artSize)) {
                            var stockTypeCode = this.dataArticles[
                                artNumber][artSize].stockTypeCode;
                            var currentPricePlainInt = this.dataArticles[
                                    artNumber][artSize].currentPricePlain *
                                100;
                            if (stockTypeCode != 0) {
                                var key = (stockTypeCode *
                                        10000000) +
                                    currentPricePlainInt;
                                if (typeof availability[key] ==
                                    "undefined") availability[
                                    key] = [];
                                availability[key].push({
                                    'artNumber': artNumber,
                                    'artSize': artSize
                                });
                            }
                        }
                    }
                }
            }
            if (dmc.Utils.ArrayNotEmpty(availability) === true) {
                availability = dmc.Utils.sortNaturalKeyAssoc(
                    availability);
                for (var stockTypeCodeCurrentPricePlainInt in
                        availability) {
                    if (availability.hasOwnProperty(
                            stockTypeCodeCurrentPricePlainInt)) {
                        var bestAvailableCheapestArticle =
                            availability[
                                stockTypeCodeCurrentPricePlainInt
                            ][0];
                        this.setComponentsByArtNumber(
                            bestAvailableCheapestArticle.artNumber,
                            bestAvailableCheapestArticle.artSize
                        );
                        this.debugLog(
                            'Best available and cheapest article (' +
                            stockTypeCodeCurrentPricePlainInt +
                            '): ' +
                            bestAvailableCheapestArticle.artNumber +
                            ' ' +
                            bestAvailableCheapestArticle.artSize
                        );
                        returnValue = true;
                        break;
                    }
                }
            }
            return returnValue;
        },
        setComponentsByArtNumber: function(artNumber, chosenArtSize) {
            var returnValue = false;
            if (typeof chosenArtSize != 'undefined' && (
                    chosenArtSize > 0 || chosenArtSize != '') &&
                (this.dataArticles[artNumber][chosenArtSize].stockTypeCode ==
                    0)) {
                returnValue = false;
            } else {
                for (var artSize in this.componentArticleMapping[
                        this.relTypeComponentSpecify][
                        artNumber
                    ]) {
                    if (this.componentArticleMapping[this.relTypeComponentSpecify]
                        [artNumber].hasOwnProperty(artSize)) {
                        if (typeof chosenArtSize != 'undefined' &&
                            (chosenArtSize > 0 || chosenArtSize !=
                                '') && chosenArtSize != artSize
                        ) {
                            continue;
                        }
                        for (var componentPk in this.componentArticleMapping[
                                this.relTypeComponentSpecify
                            ][artNumber][artSize]) {
                            if (this.componentArticleMapping[
                                    this.relTypeComponentSpecify
                                ][artNumber][artSize].hasOwnProperty(
                                    componentPk)) {
                                for (var i in this.componentArticleMapping[
                                        this.relTypeComponentSpecify
                                    ][artNumber][artSize][
                                        componentPk
                                    ]) {
                                    if (this.componentArticleMapping[
                                            this.relTypeComponentSpecify
                                        ][artNumber][artSize][
                                            componentPk
                                        ].hasOwnProperty(i)) {
                                        if ($(this.parentContainerObj)
                                            .find('#component_' +
                                                componentPk).length >
                                            0) {
                                            $(this.parentContainerObj)
                                                .find(
                                                    '#component_' +
                                                    componentPk +
                                                    ' select').val(
                                                    this.componentArticleMapping[
                                                        this.relTypeComponentSpecify
                                                    ][artNumber]
                                                    [artSize][
                                                        componentPk
                                                    ][i].relCode
                                                );
                                            this.getChosenComponents();
                                            this.refillSelectFields(
                                                componentPk
                                            );
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        returnValue = true;
                        break;
                    }
                }
            }
            return returnValue;
        },
        getCurrentArticle: function() {
            var relevantArticles = [];
            var componentLength = 0;
            for (var componentPk in this.specifyingChosenComponents) {
                if (this.specifyingChosenComponents.hasOwnProperty(
                        componentPk)) {
                    componentLength++;
                    var relCode = this.specifyingChosenComponents[
                        componentPk];
                    if (this.articleComponentMapping[this.relTypeComponentSpecify]
                        .hasOwnProperty(componentPk)) {
                        for (var i in this.articleComponentMapping[
                                this.relTypeComponentSpecify
                            ][componentPk][relCode]) {
                            if (this.articleComponentMapping[
                                    this.relTypeComponentSpecify
                                ][componentPk][relCode].hasOwnProperty(
                                    i)) {
                                var artNumber = this.articleComponentMapping[
                                    this.relTypeComponentSpecify
                                ][componentPk][relCode][i].artNumber;
                                var artSize = this.articleComponentMapping[
                                    this.relTypeComponentSpecify
                                ][componentPk][relCode][i].artSize;
                                if (typeof relevantArticles[
                                        artNumber + '|' +
                                        artSize] == 'undefined')
                                    relevantArticles[artNumber +
                                        '|' + artSize] = 0;
                                relevantArticles[artNumber +
                                    '|' + artSize]++;
                            }
                        }
                    } else {
                        componentLength--;
                    }
                }
            }
            if (componentLength == 0) {
                outer: {
                    for (var artNumber in this.dataArticles) {
                        if (this.dataArticles.hasOwnProperty(
                                artNumber)) {
                            for (var artSize in this.dataArticles[
                                    artNumber]) {
                                if (this.dataArticles[artNumber]
                                    .hasOwnProperty(artSize)) {
                                    if (typeof relevantArticles[
                                            artNumber + '|' +
                                            artSize] ==
                                        'undefined')
                                        relevantArticles[
                                            artNumber + '|' +
                                            artSize] = 0;
                                    relevantArticles[artNumber +
                                        '|' + artSize]++;
                                    break outer;
                                }
                            }
                        }
                    }
                }
            }
            var sortedRelevantArticles = dmc.Utils.getSortedArrayByValue(
                relevantArticles, 'desc');
            for (var artNumberArtSize in sortedRelevantArticles) {
                if (sortedRelevantArticles.hasOwnProperty(
                        artNumberArtSize)) {
                    var arrArtNumberArtSize = artNumberArtSize.split(
                        '|');
                    var currentArticle = {
                        'artNumber': arrArtNumberArtSize[0],
                        'artSize': arrArtNumberArtSize[1]
                    };
                    break;
                }
            }
            return currentArticle;
        },
        getCurrentArticlePk: function() {
            var currentArticle = this.getCurrentArticle();
            return this.dataArticles[currentArticle.artNumber][
                currentArticle.artSize
            ].articlePk;
        },
        refillSelectFields: function(sourceComponentPk) {
            if (typeof sourceComponentPk == 'undefined') {
                for (var sourceComponentPk in this.specifyingChosenComponents) {
                    break;
                }
            }
            this.fillSelectFieldsWithComponentData(
                sourceComponentPk);
            this.getChosenComponents();
        },
        updatePage: function(currentArticle) {
            var articleVO = this.dataArticles[currentArticle.artNumber]
                [currentArticle.artSize];
            this.setGravure(articleVO, currentArticle);
            this.displayCopytext(articleVO, currentArticle);
            this.displayComponents(articleVO, currentArticle);
            this.displayArtNumber(articleVO, currentArticle);
            this.displayAvailability(articleVO, currentArticle);
            this.displayManufacturerImages(articleVO,
                currentArticle);
            this.displayCareInfoImages(articleVO,
                currentArticle);
            this.displayTestInfoOtherTuevImages(articleVO,
                currentArticle);
            this.displayYardWareNotice(articleVO,
                currentArticle);
            this.displayPrice(articleVO, currentArticle);
            this.displayAdditionalFeeNotice(articleVO,
                currentArticle);
            this.displayDeliveryServiceIcon(articleVO,
                currentArticle);
            this.displayBulkyDeliveryNote(articleVO,
                currentArticle);
            this.displayNewIcon(articleVO, currentArticle);
            this.displayImages(articleVO, currentArticle);
            this.displayCrossSelling(articleVO, currentArticle);
        },
        refreshArticleByKQpriAnchorParam: function() {
            var preSelectedArticle = null;
            var paramIdentifier = "KQpriArticle";
            var anchorString = window.location.href.split('#')[
                1];
            if (typeof anchorString != typeof undefined &&
                anchorString.indexOf(paramIdentifier) == 0) {
                var resultArray = anchorString.substr(
                    paramIdentifier.length).split(";");
                var artNumber = resultArray[0];
                var artSize = !resultArray[2] ? "0" :
                    resultArray[2];
                var kqpriConfList = new Array();
                kqpriConfList[artNumber] = new Array();
                kqpriConfList[artNumber][artSize] = new Array();
                kqpriConfList[artNumber][artSize][
                    'stockTypeCode'
                ] = resultArray[3];
                kqpriConfList[artNumber][artSize]['stockAmount'] =
                    resultArray[4];
                kqpriConfList[artNumber][artSize][
                    'weeksToDelivery'
                ] = resultArray[5];
                this.doKqpriProductUpdate(kqpriConfList);
                preSelectedArticle = {
                    artNumber: "" + artNumber + "",
                    artSize: "" + artSize + ""
                };
                try {
                    this.updatePage(preSelectedArticle);
                } catch (err) {
                    this.debugLog(
                        "Anchor parameter for article was set 'artnumber(" +
                        preSelectedArticle.artNumber +
                        "), artSize(" + preSelectedArticle.artSize +
                        ")' but could not be loaded.");
                }
                var urlParams = {}
                location.search.substr(1).split("&").forEach(
                    function(item) {
                        urlParams[item.split("=")[0]] =
                            item.split("=")[1]
                    });
                if (typeof urlParams['componentSelection'] !=
                    'undefined') {
                    var componentSelectionParam = decodeURI(
                        urlParams['componentSelection']);
                    var splitted = componentSelectionParam.split(
                        ";");
                    splitted.forEach(function(item) {
                        var rel = item.split("||")[0];
                        var sel = item.split("||")[1];
                        $("select.selectDetail[rel='" +
                            rel + "']").val(sel);
                        $("select.selectDetail[rel='" +
                            rel + "']").change();
                    });
                }
            }
        },
        readProductData: function() {
            if (typeof componentConf != 'undefined' && typeof componentConf[
                    this.selfUID] != 'undefined') {
                this.dataProduct = componentConf[this.selfUID].product;
                this.dataArticles = componentConf[this.selfUID]
                    .articles;
                this.dataComponents = componentConf[this.selfUID]
                    .components;
                this.dataMedia = componentConf[this.selfUID].media;
                this.dataCrossselling = componentConf[this.selfUID]
                    .crossselling;
                for (var artNumber in this.dataArticles) {
                    if (this.dataArticles.hasOwnProperty(
                            artNumber)) {
                        for (var artSize in this.dataArticles[
                                artNumber]) {
                            if (this.dataArticles[artNumber].hasOwnProperty(
                                    artSize)) {
                                for (var sortKey in this.dataArticles[
                                            artNumber][artSize]
                                        .componentData[this.relTypeComponentSpecify]) {
                                    if (this.dataArticles[
                                            artNumber][artSize]
                                        .componentData[this.relTypeComponentSpecify]
                                        .hasOwnProperty(sortKey)
                                    ) {
                                        var componentPk = this.dataArticles[
                                            artNumber][
                                            artSize
                                        ].componentData[
                                            this.relTypeComponentSpecify
                                        ][sortKey].componentPk;
                                        if (typeof this.selectFields[
                                                componentPk] ==
                                            'undefined') {
                                            this.selectFields[
                                                componentPk
                                            ] = [];
                                            this.specifyingComponentCount++;
                                        }
                                        if (typeof this.selectFields[
                                                componentPk][
                                                this.dataArticles[
                                                    artNumber][
                                                    artSize
                                                ].componentData[
                                                    this.relTypeComponentSpecify
                                                ][sortKey].relCode
                                            ] == 'undefined') {
                                            this.selectFields[
                                                    componentPk
                                                ][this.dataArticles[
                                                    artNumber
                                                ][artSize].componentData[
                                                    this.relTypeComponentSpecify
                                                ][sortKey].relCode] =
                                                this.dataArticles[
                                                    artNumber][
                                                    artSize
                                                ].componentData[
                                                    this.relTypeComponentSpecify
                                                ][sortKey].relValue;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (var componentPk in this.selectFields) {
                    if (this.selectFields.hasOwnProperty(
                            componentPk)) {
                        this.specifyingComponentList.push(
                            componentPk);
                    }
                }
            }
        },
        extractComponents: function(obj, artNumber, artSize) {
            var stockTypeCode = 0;
            var selectable = 0;
            if (typeof artNumber == 'undefined') {
                artNumber = 0;
                artSize = 0;
            } else {
                stockTypeCode = this.dataArticles[artNumber][
                    artSize
                ].stockTypeCode;
                selectable = this.dataArticles[artNumber][
                    artSize
                ].selectable;
            }
            if ((typeof obj.componentData != 'undefined' &&
                    selectable == true) || artNumber == 0) {
                for (var componentType in obj.componentData) {
                    if (obj.componentData.hasOwnProperty(
                            componentType)) {
                        if (componentType != this.relTypeComponent &&
                            componentType != this.relTypeComponentSpecify
                        ) {
                            continue;
                        }
                        for (var sortKey in obj.componentData[
                                componentType]) {
                            if (obj.componentData[componentType]
                                .hasOwnProperty(sortKey)) {
                                var componentPk = obj.componentData[
                                        componentType][sortKey]
                                    .componentPk;
                                if (typeof this.components[
                                        componentType][
                                        componentPk
                                    ] == 'undefined') this.components[
                                    componentType][
                                    componentPk
                                ] = [];
                                this.components[componentType][
                                    componentPk
                                ][sortKey] = {
                                    'relCode': obj.componentData[
                                        componentType][
                                        sortKey
                                    ].relCode,
                                    'relValue': obj.componentData[
                                        componentType][
                                        sortKey
                                    ].relValue,
                                    'mediaPk': obj.componentData[
                                        componentType][
                                        sortKey
                                    ].relMediaPk
                                };
                                if (typeof this.articleComponentMapping[
                                        componentType][
                                        componentPk
                                    ] == 'undefined') this.articleComponentMapping[
                                    componentType][
                                    componentPk
                                ] = [];
                                if (typeof this.articleComponentMapping[
                                        componentType][
                                        componentPk
                                    ][obj.componentData[
                                        componentType][
                                        sortKey
                                    ].relCode] == 'undefined')
                                    this.articleComponentMapping[
                                        componentType][
                                        componentPk
                                    ][obj.componentData[
                                        componentType][
                                        sortKey
                                    ].relCode] = [];
                                this.articleComponentMapping[
                                    componentType][
                                    componentPk
                                ][obj.componentData[
                                    componentType][
                                    sortKey
                                ].relCode].push({
                                    'artNumber': artNumber,
                                    'artSize': artSize,
                                    'sortKey': sortKey
                                });
                                if (typeof this.componentArticleMapping[
                                        componentType][
                                        artNumber
                                    ] == 'undefined') this.componentArticleMapping[
                                    componentType][
                                    artNumber
                                ] = [];
                                if (typeof this.componentArticleMapping[
                                        componentType][
                                        artNumber
                                    ][artSize] == 'undefined')
                                    this.componentArticleMapping[
                                        componentType][
                                        artNumber
                                    ][artSize] = [];
                                if (typeof this.componentArticleMapping[
                                        componentType][
                                        artNumber
                                    ][artSize][componentPk] ==
                                    'undefined') this.componentArticleMapping[
                                    componentType][
                                    artNumber
                                ][artSize][componentPk] = [];
                                this.componentArticleMapping[
                                    componentType][
                                    artNumber
                                ][artSize][componentPk].push({
                                    'relCode': obj.componentData[
                                        componentType
                                    ][sortKey].relCode,
                                    'relValue': obj.componentData[
                                        componentType
                                    ][sortKey].relValue,
                                    'mediaPk': obj.componentData[
                                        componentType
                                    ][sortKey].relMediaPk,
                                    'sortKey': sortKey,
                                    'typeCodeList': this
                                        .dataComponents[
                                            componentPk
                                        ].typeCodeList
                                });
                            }
                        }
                    }
                }
            }
        },
        createComponentComponentMapping: function() {
            var tempArr = [];
            for (var artNumber in this.componentArticleMapping[
                    this.relTypeComponentSpecify]) {
                if (this.componentArticleMapping[this.relTypeComponentSpecify]
                    .hasOwnProperty(artNumber)) {
                    for (var artSize in this.componentArticleMapping[
                            this.relTypeComponentSpecify][
                            artNumber
                        ]) {
                        if (this.componentArticleMapping[this.relTypeComponentSpecify]
                            [artNumber].hasOwnProperty(artSize)
                        ) {
                            var fieldsCreation = '',
                                strCreation = '';
                            var arrCreation = [],
                                keys = [];
                            for (var i = 0; i < this.specifyingComponentList
                                .length; i++) {
                                var currentComponentPk = this.specifyingComponentList[
                                    i];
                                var currentRelCode = this.componentArticleMapping[
                                    this.relTypeComponentSpecify
                                ][artNumber][artSize][
                                    currentComponentPk
                                ][0].relCode;
                                fieldsCreation = fieldsCreation +
                                    '["' + currentComponentPk +
                                    '|' + currentRelCode + '"]';
                                strCreation =
                                    'if (typeof this.specifyingComponentComponentMapping' +
                                    fieldsCreation +
                                    ' == "undefined") this.specifyingComponentComponentMapping' +
                                    fieldsCreation + ' = []';
                                arrCreation.push(strCreation);
                                keys.push('["' +
                                    currentComponentPk +
                                    '|' + currentRelCode +
                                    '"]');
                            }
                            var concatComponentList =
                                arrCreation.join(';\n') + ';\n' +
                                'this.specifyingComponentComponentMapping' +
                                keys.join('') + ' = true' +
                                ';\n';
                            tempArr.push(concatComponentList);
                        }
                    }
                }
            }
            var jsCode = tempArr.join('');
            eval(jsCode);
        },
        createSelectFields: function() {
            var _this = this;
            var previousComponentPk = null;
            var loopArray = this.specifyingComponentComponentMapping;
            for (var i = 0; i < this.specifyingComponentCount; i++) {
                var createSelect = true;
                if (i > 0) {
                    this.getChosenComponents();
                    for (var chosenComponentPk in this.specifyingChosenComponents) {
                        if (this.specifyingChosenComponents.hasOwnProperty(
                                chosenComponentPk)) {
                            var chosenRelCode = this.specifyingChosenComponents[
                                chosenComponentPk];
                            if (typeof loopArray[
                                    chosenComponentPk + '|' +
                                    chosenRelCode] !=
                                'undefined') {
                                loopArray = loopArray[
                                    chosenComponentPk + '|' +
                                    chosenRelCode];
                            }
                        }
                    }
                }
                var sortedLoopArray = this.sortCurrentArticleSpecifyingComponents(
                    loopArray);
                for (var m = 0; m < sortedLoopArray.length; m++) {
                    var componentPkRelCode = sortedLoopArray[m];
                    var arrComponentPkRelCode =
                        componentPkRelCode.split('|');
                    var componentPk = arrComponentPkRelCode[0];
                    var relCode = arrComponentPkRelCode[1];
                    if (createSelect) {
                        if ($(this.parentContainerObj).find(
                                '#component_' + componentPk).length >
                            0) {
                            $(this.parentContainerObj).find(
                                '#component_' + componentPk +
                                ' select').html('');
                            var template = $(this.parentContainerObj)
                                .find('#component_' +
                                    componentPk);
                        } else {
                            var template = $(this.parentContainerObj)
                                .find('#' + this.selectFieldTemplateContainer)
                                .clone();
                            template.attr('id', 'component_' +
                                componentPk);
                            template.find('label').html(this.dataComponents[
                                componentPk].name);
                            template.find('select').attr('rel',
                                    componentPk).addClass(this.selectFieldClass)
                                .change(function() {
                                    _this.change($(this).attr(
                                        'rel'));
                                });
                            if (typeof sizeGuidanceLink !=
                                'undefined' && typeof this.dataComponents[
                                    componentPk]['typeCodeList']
                                ['SIZE'] != 'undefined') {
                                template.find('span').html(
                                    sizeGuidanceLink);
                            }
                        }
                        createSelect = false;
                    }
                    template.find('select').append($(
                        '<option></option>').val(
                        relCode).html(this.selectFields[
                        componentPk][relCode]));
                }
                if ($(this.parentContainerObj).find(
                        '#component_' + componentPk).length ==
                    0) {
                    if (previousComponentPk === null) {
                        $(this.parentContainerObj).find('#' +
                            this.selectFieldTemplateContainer
                        ).after(template);
                    } else {
                        $(this.parentContainerObj).find(
                            '#component_' +
                            previousComponentPk).after(
                            template);
                    }
                    previousComponentPk = componentPk;
                }
            }
        },
        fillSelectFieldsWithComponentData: function(
            sourceComponentPk) {
            if (typeof this.articleComponentMapping[this.relTypeComponentSpecify] !==
                'undefined' && !this.isEmpty(this.articleComponentMapping[
                    this.relTypeComponentSpecify])) {
                var loopArray = this.specifyingComponentComponentMapping;
                var alreadyChosenComponents = this.specifyingChosenComponents;
                for (var i = 0; i < this.specifyingComponentCount; i++) {
                    var createSelect = true;
                    if (i > 0) {
                        this.getChosenComponents();
                        for (var chosenComponentPk in this.specifyingChosenComponents) {
                            if (this.specifyingChosenComponents
                                .hasOwnProperty(
                                    chosenComponentPk)) {
                                var chosenRelCode = this.specifyingChosenComponents[
                                    chosenComponentPk];
                                if (typeof loopArray[
                                        chosenComponentPk + '|' +
                                        chosenRelCode] !=
                                    'undefined') {
                                    loopArray = loopArray[
                                        chosenComponentPk +
                                        '|' + chosenRelCode
                                    ];
                                    break;
                                }
                            }
                        }
                    }
                    var sortedLoopArray = this.sortCurrentArticleSpecifyingComponents(
                        loopArray);
                    for (var m = 0; m < sortedLoopArray.length; m++) {
                        var componentPkRelCode =
                            sortedLoopArray[m];
                        var arrComponentPkRelCode =
                            componentPkRelCode.split('|');
                        var componentPk = arrComponentPkRelCode[
                            0];
                        var relCode = arrComponentPkRelCode[1];
                        if (createSelect) {
                            var selectField = $(this.parentContainerObj)
                                .find('#component_' +
                                    componentPk + ' select');
                            selectField.html('');
                            createSelect = false;
                        }
                        selectField.append($(
                            '<option></option>').val(
                            relCode).html(this.selectFields[
                            componentPk][relCode]));
                        if (typeof alreadyChosenComponents[
                                componentPk] != 'undefined') {
                            selectField.find('option[value=' +
                                alreadyChosenComponents[
                                    componentPk] + ']').attr(
                                'selected', true);
                        }
                        var template = $(this.parentContainerObj)
                            .find('#component_' + componentPk);
                        if (sortedLoopArray.length == 1) {
                            template.find(
                                'span.singleComponent').html(
                                this.selectFields[
                                    componentPk][relCode]);
                            template.find('select').hide();
                        } else {
                            template.find(
                                'span.singleComponent').html(
                                '');
                            template.find('select').show();
                        }
                    }
                }
            } else {
                for (var component in this.specifyingChosenComponents) {
                    if (this.specifyingChosenComponents.hasOwnProperty(
                            component)) {
                        var template = $(this.parentContainerObj)
                            .find('#component_' + component);
                        template.hide();
                    }
                }
            }
        },
        isEmpty: function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        },
        getChosenComponents: function() {
            var _this = this;
            $('.' + this.selectFieldClass).each(function() {
                _this.specifyingChosenComponents[$(this)
                    .attr('rel')] = $(this).val();
            });
        },
        getImages: function(obj, relTypeCode, excludeRelCodeNull) {
            var imageList = [];
            if (typeof obj != 'undefined' && typeof obj[
                    relTypeCode] != 'undefined') {
                for (var sortKey in obj[relTypeCode]) {
                    if (obj[relTypeCode].hasOwnProperty(sortKey)) {
                        var mediaPk = obj[relTypeCode][sortKey]
                            .mediaPk;
                        if (this.dataMedia[mediaPk].fileName &&
                            this.dataMedia[mediaPk].fileName.length >
                            0 && ((excludeRelCodeNull && obj[
                                        relTypeCode][sortKey].relCode !=
                                    null) || !
                                excludeRelCodeNull)) {
                            var imagePath = (this.dataMedia[
                                    mediaPk].path != null) ?
                                this.dataMedia[mediaPk].path +
                                this.dataMedia[mediaPk].fileName :
                                '' + this.dataMedia[mediaPk].fileName;
                            imageList.push({
                                'url': this.getImageLink(
                                    relTypeCode,
                                    imagePath),
                                'path': imagePath,
                                'index': this.dataMedia[
                                    mediaPk].index,
                                'reference': this.dataMedia[
                                    mediaPk].reference
                            });
                        }
                    }
                }
            }
            return imageList;
        },
        getMergedImages: function(productMediaList,
            articleMediaList, relTypeCode, excludeRelCodeNull) {
            var imageList = [];
            var productImages = this.getImages(productMediaList,
                relTypeCode, excludeRelCodeNull);
            var articleImages = this.getImages(articleMediaList,
                relTypeCode, excludeRelCodeNull);
            imageList = productImages.concat(articleImages);
            return imageList;
        },
        setGravure: function(articleVO, currentArticle) {
            var gravureFieldCount = parseInt(articleVO.gravureHeadline);
            var gravureFieldLength = parseInt(articleVO.gravureLength);
            $(this.parentContainerObj).find('#' + this.fieldGravureMessageBefore)
                .text('');
            $(this.parentContainerObj).find('#' + this.fieldGravureMessageAfter)
                .text('');
            if (gravureFieldCount > 0 && gravureFieldLength > 0) {
                var textParts = infoGravureBefore.split('||');
                var newText = textParts[0] + gravureFieldLength +
                    textParts[1];
                $(this.parentContainerObj).find('#' + this.fieldGravureMessageBefore)
                    .html(newText);
                $(this.parentContainerObj).find('#' + this.fieldGravureMessageAfter)
                    .html(infoGravureAfter);
            }
            if (gravureFieldCount > 0 && gravureFieldLength > 0) {
                $(this.parentContainerObj).find('#' + this.fieldGravureInput)
                    .html('');
                for (var i = 0; i < gravureFieldCount; i++) {
                    var input = $('<input />').attr('type',
                        'text').attr('maxLength',
                        gravureFieldLength).attr('id', this
                        .fieldGravureText + '_' + i).attr(
                        'name', this.fieldGravureText + '[' +
                        i + ']').attr('class',
                        'gravure txt');
                    if ($(this.parentContainerObj).find('#' +
                            this.gravureForm).length > 0 && $(
                            this.parentContainerObj).find('#' +
                            this.gravureForm).val().length > 0) {
                        var rows = $(this.parentContainerObj).find(
                            '#' + this.gravureForm).val().split(
                            textGravureSeparator);
                        if (typeof rows[i] == 'undefined' || !
                            rows[i]) {
                            input.val('');
                        } else {
                            input.val(rows[i]);
                        }
                    }
                    $(this.parentContainerObj).find('#' + this.fieldGravureInput)
                        .append(input);
                }
                if ($(this.parentContainerObj).find('#' + this.productGravureAbstractContent)
                    .length > 0 && typeof ProductPersonalizationLayer ==
                    'object') {
                    $(this.parentContainerObj).find('#' + this.productGravureAbstractContent)
                        .html('');
                    ProductPersonalizationLayer.inputLevel =
                        true;
                }
                $(this.parentContainerObj).find('#' + this.fieldGravureInput)
                    .css({
                        'display': 'block'
                    });
                $(this.parentContainerObj).find('#' + this.productGravureHint)
                    .css({
                        'display': 'block'
                    });
            } else {
                $(this.parentContainerObj).find('#' + this.fieldGravureInput)
                    .css({
                        'display': 'none'
                    });
                $(this.parentContainerObj).find('#' + this.productGravureHint)
                    .css({
                        'display': 'none'
                    });
            }
        },
        displayComponents: function(articleVO, currentArticle) {
            var currentArticleComponents = [];
            $(this.parentContainerObj).find('#' + this.fieldWarning)
                .html('');
            $(this.parentContainerObj).find('#' + this.fieldSeals)
                .html('');
            $(this.parentContainerObj).find('#' + this.divProductComponentList +
                ' div:not(:first-child)').remove();
            if (dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[
                    this.relTypeComponent]) === false) {
                return;
            }
            if (typeof this.componentArticleMapping[this.relTypeComponent]
                [0] != 'undefined' && typeof this.componentArticleMapping[
                    this.relTypeComponent][0][0] != 'undefined' &&
                dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[
                    this.relTypeComponent][0][0]) === true &&
                typeof this.componentArticleMapping[this.relTypeComponent]
                [currentArticle.artNumber] != 'undefined' &&
                typeof this.componentArticleMapping[this.relTypeComponent]
                [currentArticle.artNumber][currentArticle.artSize] !=
                'undefined' && dmc.Utils.ArrayNotEmpty(this.componentArticleMapping[
                        this.relTypeComponent][currentArticle.artNumber]
                    [currentArticle.artSize]) === true) {
                currentArticleComponents = this.mergeComponentArrays(
                    this.componentArticleMapping[this.relTypeComponent]
                    [0][0], this.componentArticleMapping[
                        this.relTypeComponent][
                        currentArticle.artNumber
                    ][currentArticle.artSize]);
            } else if (typeof this.componentArticleMapping[this
                    .relTypeComponent][0] != 'undefined' &&
                typeof this.componentArticleMapping[this.relTypeComponent]
                [0][0] != 'undefined' && dmc.Utils.ArrayNotEmpty(
                    this.componentArticleMapping[this.relTypeComponent]
                    [0][0]) === true) {
                currentArticleComponents = this.componentArticleMapping[
                    this.relTypeComponent][0][0];
            } else if (typeof this.componentArticleMapping[this
                    .relTypeComponent][currentArticle.artNumber] !=
                'undefined' && typeof this.componentArticleMapping[
                    this.relTypeComponent][currentArticle.artNumber]
                [currentArticle.artSize] != 'undefined' && dmc.Utils
                .ArrayNotEmpty(this.componentArticleMapping[
                        this.relTypeComponent][currentArticle.artNumber]
                    [currentArticle.artSize]) === true) {
                currentArticleComponents = this.componentArticleMapping[
                        this.relTypeComponent][currentArticle.artNumber]
                    [currentArticle.artSize];
            }
            var newComponentTables = [];
            if (dmc.Utils.ArrayNotEmpty(
                    currentArticleComponents) === true) {
                var sortedCurrentArticleComponents = this.sortCurrentArticleComponents(
                    currentArticleComponents);
                for (var sortKey in
                        sortedCurrentArticleComponents) {
                    if (sortedCurrentArticleComponents.hasOwnProperty(
                            sortKey)) {
                        var componentPkI = sortKey.split("|");
                        var componentPk = componentPkI[0];
                        var componentGroup = this.dataComponents[
                            componentPk].group;
                        if (componentGroup == "") componentGroup =
                            0;
                        var componentName = this.dataComponents[
                            componentPk].name;
                        var componentValue = '';
                        for (var i in currentArticleComponents[
                                componentPk]) {
                            if (currentArticleComponents[
                                    componentPk].hasOwnProperty(
                                    i)) {
                                componentValue += '<span>';
                                if (currentArticleComponents[
                                        componentPk][i].mediaPk !=
                                    null) {
                                    var mediaVO = this.dataMedia[
                                        currentArticleComponents[
                                            componentPk][i]
                                        .mediaPk];
                                    componentValue +=
                                        '<img src="' + this.getImageLink(
                                            560, mediaVO.path +
                                            mediaVO.fileName) +
                                        '" /><br />';
                                    componentValue +=
                                        currentArticleComponents[
                                            componentPk][i].relValue;
                                } else {
                                    componentValue +=
                                        currentArticleComponents[
                                            componentPk][i].relValue;
                                }
                                if (typeof currentArticleComponents[
                                        componentPk][i][
                                        'typeCodeList'
                                    ]['WARNING'] != 'undefined') {
                                    componentValue +=
                                        '</span><br />';
                                } else {
                                    componentValue +=
                                        '</span> ';
                                }
                            }
                        }
                        if (typeof currentArticleComponents[
                                componentPk][0]['typeCodeList']
                            ['LIST'] != 'undefined' || typeof currentArticleComponents[
                                componentPk][0]['typeCodeList']
                            ['LINK'] != 'undefined') {
                            if (typeof newComponentTables[
                                    componentGroup] ==
                                'undefined') {
                                newComponentTables[
                                    componentGroup] = $(
                                    this.parentContainerObj
                                ).find('#' + this.divProductComponentList +
                                    ' div.template').clone();
                                newComponentTables[
                                    componentGroup].attr(
                                    'class', '');
                                if (componentGroup != 0) {
                                    newComponentTables[
                                        componentGroup].find(
                                        'h4').html(
                                        componentGroup);
                                }
                            }
                            var newComponentRow = $(
                                newComponentTables[
                                    componentGroup]).find(
                                'table tr.componentRow:first-child'
                            ).clone();
                            $(newComponentRow).find(
                                'td.componentLabel').html(
                                componentName);
                            $(newComponentRow).find(
                                'td.componentValue').html(
                                componentValue);
                            $(newComponentTables[componentGroup])
                                .find('table').append(
                                    newComponentRow);
                        } else if (typeof currentArticleComponents[
                                componentPk][0]['typeCodeList']
                            ['WARNING'] != 'undefined') {
                            $(this.parentContainerObj).find('#' +
                                this.fieldWarning).append(
                                componentValue);
                        } else if (typeof currentArticleComponents[
                                componentPk][0]['typeCodeList']
                            ['SEAL'] != 'undefined') {
                            if (typeof currentArticleComponents[
                                    componentPk][0]['relValue'] !=
                                'undefined') {
                                var textlines =
                                    currentArticleComponents[
                                        componentPk][i].relValue
                                    .split(",");
                                var template =
                                    '<p class="sealtext">';
                                $.each(textlines, function(key,
                                    value) {
                                    var parts = value.split(
                                        '\t');
                                    if (parts.length ==
                                        2) {
                                        template +=
                                            parts[0] +
                                            '<span style="float: right;">' +
                                            parts[1] +
                                            '</span>';
                                    } else {
                                        template +=
                                            value + ' ';
                                    }
                                });
                                template += '</p>';
                                componentValue = componentValue
                                    .replace(
                                        currentArticleComponents[
                                            componentPk][i].relValue,
                                        template);
                            }
                            $(this.parentContainerObj).find('#' +
                                this.fieldSeals).append(
                                componentValue);
                        }
                    }
                }
                for (var componentGroup in newComponentTables) {
                    if (newComponentTables.hasOwnProperty(
                            componentGroup)) {
                        $(newComponentTables[componentGroup]).find(
                            'table tr:first-child').remove();
                        $(this.parentContainerObj).find('#' +
                            this.divProductComponentList).append(
                            newComponentTables[
                                componentGroup]);
                    }
                }
                $(this.parentContainerObj).find('#' + this.divProductComponentList)
                    .css({
                        'display': 'block'
                    });
            } else {
                $(this.parentContainerObj).find('#' + this.divProductComponentList)
                    .css({
                        'display': 'none'
                    });
            }
        },
        displayArtNumber: function(articleVO, currentArticle) {
            var prependedZeros = "";
            var length = currentArticle.artNumber.length;
            for (var i = length; i < 7; i++) {
                prependedZeros += "0";
            }
            $(this.parentContainerObj).find('#' + this.fieldArticleOrderNumber)
                .text(prependedZeros + [currentArticle.artNumber
                    .slice(0, length - 3), '.',
                    currentArticle.artNumber.slice(-3)
                ].join('') + '.' + articleVO.adCode);
        },
        displayNewIcon: function(articleVO, currentArticle) {
            this.newBannerWrap = 'productNewBanner_' + this.selfUID +
                '_wrap';
            if (articleVO.showNewIcon) {
                $(this.parentContainerObj).find('#' + this.newBannerWrap)
                    .css({
                        'display': 'block'
                    });
            } else {
                $(this.parentContainerObj).find('#' + this.newBannerWrap)
                    .css({
                        'display': 'none'
                    });
            }
        },
        displayPrice: function(articleVO, currentArticle) {
            this.oldPriceWrap = 'productOldPrice_' + this.selfUID +
                '_wrap';
            this.currentPriceWrap = 'productCurrentPrice_' +
                this.selfUID + '_wrap';
            this.recommendedRetailPriceWrap =
                'productRecommendedRetailPrice_' + this.selfUID +
                '_wrap';
            this.reducedBannerWrap = 'productReducedBanner_' +
                this.selfUID + '_wrap';
            this.oldPriceSpan = 'productOldPrice_span';
            this.oldPriceDescription =
                'productOldPriceDescription';
            this.recommendedRetailPriceSpan =
                'productRecommendedRetailPrice_span';
            this.currentPrice1Span =
                'productCurrentPrice1_span';
            this.currentPrice2Span =
                'productCurrentPrice2_span';
            this.currentPrice3Span =
                'productCurrentPrice3_span';
            this.savingsSpan = 'productSavings_span';
            this.savings3Span = 'productSavings3_span';
            this.premiumPointSpan = 'premiumPoints_span';
            this.hasSavingsAboveThreshold = articleVO.hasSavingsAboveThreshold;
            this.recommendedRetailPriceSavingPercentage =
                articleVO.recommendedRetailPriceSavingPercentage;
            this.oldPriceSavingPercentage = articleVO.oldPriceSavingPercentage;
            $(this.parentContainerObj).find('#' + this.fieldProductPrice)
                .text(articleVO.currentPrice);
            $(this.parentContainerObj).find('#' + this.reducedBannerWrap)
                .css({
                    'display': 'none'
                });
            $(this.parentContainerObj).find('#' + this.recommendedRetailPriceWrap)
                .css({
                    'display': 'none'
                });
            $(this.parentContainerObj).find('#' + this.oldPriceWrap)
                .css({
                    'display': 'none'
                });
            $(this.parentContainerObj).find('#' + this.oldPriceDescription)
                .css({
                    'display': 'none'
                });
            $(this.parentContainerObj).find('#' + this.currentPriceWrap)
                .css({
                    'display': 'block'
                });
            $(this.parentContainerObj).find('#' + this.savingsSpan)
                .text('');
            $(this.parentContainerObj).find('#' + this.savings3Span)
                .text('');
            if (this.hasSavingsAboveThreshold) {
                $(this.parentContainerObj).find('#' + this.reducedBannerWrap)
                    .css({
                        'display': 'block'
                    });
                $(this.parentContainerObj).find('#' + this.currentPriceWrap)
                    .css({
                        'display': 'none'
                    });
                if (this.recommendedRetailPriceSavingPercentage >=
                    this.oldPriceSavingPercentage) {
                    var savings = articleVO.recommendedRetailPriceSaving;
                    var diffPercent = this.recommendedRetailPriceSavingPercentage;
                    $(this.parentContainerObj).find('#' + this.recommendedRetailPriceSpan)
                        .text(articleVO.recommendedRetailPrice);
                    $(this.parentContainerObj).find('#' + this.currentPrice3Span)
                        .text(articleVO.currentPrice);
                    if (articleVO.recommendedRetailPricePlain <
                        100 && diffPercent > articleVO.recommendedRetailPricePlain -
                        articleVO.currentPricePlain) {
                        savings = Number(diffPercent).toFixed(0) +
                            '%';
                    }
                    $(this.parentContainerObj).find('#' + this.savings3Span)
                        .text(savings);
                    $(this.parentContainerObj).find('#' + this.recommendedRetailPriceWrap)
                        .css({
                            'display': 'block'
                        });
                } else {
                    var savings = articleVO.oldPriceSaving;
                    var diffPercent = this.oldPriceSavingPercentage;
                    $(this.parentContainerObj).find('#' + this.oldPriceSpan)
                        .text(articleVO.oldPrice);
                    $(this.parentContainerObj).find('#' + this.currentPrice2Span)
                        .text(articleVO.currentPrice);
                    $(this.parentContainerObj).find('#' + this.oldPriceDescription)
                        .css({
                            'display': 'block'
                        });
                    if (articleVO.oldPricePlain < 100 &&
                        diffPercent > articleVO.oldPricePlain -
                        articleVO.currentPricePlain) {
                        savings = Number(diffPercent).toFixed(0) +
                            '%';
                    }
                    $(this.parentContainerObj).find('#' + this.savingsSpan)
                        .text(savings);
                    $(this.parentContainerObj).find('#' + this.oldPriceWrap)
                        .css({
                            'display': 'block'
                        });
                }
            }
            $(this.parentContainerObj).find('#' + this.currentPrice1Span)
                .text(articleVO.currentPrice);
            if (typeof(articleVO.promotionPoints) !=
                "undefined" && articleVO.promotionPoints !=
                null) {
                $(this.parentContainerObj).find('#' + this.premiumPointSpan)
                    .text(articleVO.promotionPoints);
            }
            this.infoBlockPrice1 = 'infoBlockPrice1';
            this.articleBlockPrice1 = 'articleBlockPrice1';
            this.articleBlockAmount1 = 'articleBlockAmount1';
            this.infoBlockPrice2 = 'infoBlockPrice2';
            this.articleBlockPrice2 = 'articleBlockPrice2';
            this.articleBlockAmount2 = 'articleBlockAmount2';
            this.infoPriceGroup = 'infoPriceGroup';
            for (i = 1; i <= 2; i++) {
                $(this.parentContainerObj).find('#' + this[
                    'infoBlockPrice' + i]).css({
                    'display': 'none'
                });
                if (articleVO['blockAmount' + i] > 0) {
                    $(this.parentContainerObj).find('#' + this[
                        'infoBlockPrice' + i]).css({
                        'display': 'block'
                    });
                    $(this.parentContainerObj).find('#' + this[
                        'articleBlockPrice' + i]).text(
                        articleVO['blockPrice' + i]);
                    $(this.parentContainerObj).find('#' + this[
                        'articleBlockAmount' + i]).text(
                        blockPriceAmountText.replace(
                            '###BLOCKAMOUNT###', articleVO[
                                'blockAmount' + i]));
                }
            }
            $(this.parentContainerObj).find('#' + this.infoPriceGroup)
                .css({
                    'display': 'none'
                });
            if (articleVO.priceGroupId != '000' && articleVO.blockAmount1 >
                0) {
                $(this.parentContainerObj).find('#' + this.infoPriceGroup)
                    .css({
                        'display': 'block'
                    });
            }
            this.baseUnitPriceContainer = 'baseUnitPriceInfo_' +
                this.selfUID;
            this.baseUnitPriceHeader =
                'baseUnitPriceInfoHeader_' + this.selfUID;
            if (typeof articleVO.baseUnit == 'string' &&
                articleVO.baseUnit != '') {
                $(this.parentContainerObj).find('#' + this.baseUnitPriceContainer +
                    ' span.unit').text(articleVO.baseUnit);
                $(this.parentContainerObj).find('#' + this.baseUnitPriceContainer +
                    ' span.baseprice').text(articleVO.baseUnitPrice);
                $(this.parentContainerObj).find('#' + this.baseUnitPriceHeader)
                    .css({
                        'display': 'block'
                    });
                $(this.parentContainerObj).find('#' + this.baseUnitPriceContainer)
                    .css({
                        'display': 'block'
                    });
            }
        },
        displayYardWareNotice: function(articleVO, currentArticle) {
            if (articleVO.stockUnit == 'M') {
                $(this.parentContainerObj).find('#' + this.productYardwareNotice)
                    .css({
                        'display': 'block'
                    });
            }
        },
        displayAvailability: function(articleVO, currentArticle) {
            this.availField = 'productAvailField_' + this.selfUID;
            this.availClassField = 'productAvailFieldClass_' +
                this.selfUID;
            var availabilityLink = 'void(0)';
            var infoText = articleVO.stockTypeText;
            if (articleVO.stockTypeCode == 2 && articleVO.weeksToDelivery >
                0) {
                infoText = weeksToDeliveryInfo.replace(
                    '{ORDERLINE_weeksToDelivery}',
                    articleVO.weeksToDelivery);
            }
            $(this.parentContainerObj).find('#' + this.availField)
                .attr('value', infoText);
            $(this.parentContainerObj).find('#' + this.availClassField)
                .attr('value', this.configStockTypeCSSPrefix +
                    articleVO.stockTypeCode);
            $(this.parentContainerObj).find('#' + this.fieldAvailabilityLink)
                .attr('href', 'javascript: void(0);').unbind(
                    'click');
            if (typeof configStockTypeLink != "undefined") {
                if (typeof configStockTypeLink[articleVO.stockTypeCode] !=
                    "undefined" && configStockTypeLink[
                        articleVO.stockTypeCode]) {
                    $(this.parentContainerObj).find('#' + this.fieldAvailabilityLink)
                        .click(function() {
                            openWindow(configStockTypeLink[
                                    articleVO.stockTypeCode
                                ], '',
                                'width=480,height=390,scrollbars=1,status=0'
                            );
                        });
                }
            }
            $(this.parentContainerObj).find('#' + this.fieldAvailability)
                .attr('class', this.configStockTypeCSSPrefix +
                    articleVO.stockTypeCode).html(infoText);
        },
        displayCopytext: function(articleVO, currentArticle) {
            if (articleVO.copyText != null && articleVO.copyText
                .length > 0) {
                $(this.parentContainerObj).find('#' + this.fieldCopytext)
                    .html(articleVO.copyText);
            } else {
                $(this.parentContainerObj).find('#' + this.fieldCopytext)
                    .html(this.dataProduct.copyText);
            }
        },
        displayAdditionalFeeNotice: function(articleVO,
            currentArticle) {
            if (articleVO.deliveryTypeCode == 1) {
                $(this.parentContainerObj).find('#' + this.fieldBulkyFeeNotice)
                    .html(bulkyCostsInfo.replace(
                        '###bulkycosts###', articleVO.bulkyCosts
                    )).css({
                        'display': 'block'
                    });
            } else {
                $(this.parentContainerObj).find('#' + this.fieldBulkyFeeNotice)
                    .css({
                        'display': 'none'
                    });
            }
        },
        displayDeliveryServiceIcon: function(articleVO,
            currentArticle) {
            if (articleVO.status & 16 || articleVO.status & 32) {
                $(this.parentContainerObj).find('#' + this.fieldDeliveryServiceIcon)
                    .css({
                        'display': 'block'
                    });
            } else {
                $(this.parentContainerObj).find('#' + this.fieldDeliveryServiceIcon)
                    .css({
                        'display': 'none'
                    });
            }
        },
        displayImages: function(articleVO, currentArticle) {},
        imageToggle: function(obj, currentArticle) {},
        displayBulkyDeliveryNote: function(articleVO,
            currentArticle) {
            this.freeDeliveryNotice = 'productDeliveryNotice';
            if ((articleVO.currentPricePlain / 100 >
                    minDeliveryCostFree / 100) &&
                minDeliveryCostFree != 0 && (articleVO.deliveryTypeCode &
                    1) == 0 && (articleVO.bulkyCosts.search(
                    /(.)*[1-9](.)*/)) == -1) {
                $(this.parentContainerObj).find('#' + this.freeDeliveryNotice)
                    .css({
                        'display': 'block'
                    });
                $('.productDeliveryNoticeShort').html(
                    deliveryFreeShortText);
            } else if (articleVO.deliveryTypeCode == 1 &&
                displayDeliveryCostsText == true) {
                $(this.parentContainerObj).find('#' + this.freeDeliveryNotice)
                    .css({
                        'display': 'none'
                    });
                $('.productDeliveryNoticeShort').html(
                    plus_deliveryCostsBulky);
            } else {
                $(this.parentContainerObj).find('#' + this.freeDeliveryNotice)
                    .css({
                        'display': 'none'
                    });
                $('.productDeliveryNoticeShort').html(
                    plus_deliveryCostsText);
            }
        },
        displayManufacturerImages: function(articleVO,
            currentArticle) {
            var imageList = this.getMergedImages(this.dataProduct[
                "mediaList"], this.dataArticles[
                currentArticle.artNumber][
                currentArticle.artSize
            ]["mediaList"], this.mediaRelTypeManufacturer);
            var htmlString = '';
            if ($(this.parentContainerObj).find('#' + this.divProductManufacturerImages)
                .find('a').length > 0) {
                $(this.parentContainerObj).find('#' + this.divProductManufacturerImages)
                    .find('a').remove();
            } else {
                $(this.parentContainerObj).find('#' + this.divProductManufacturerImages)
                    .find('img').remove();
            }
            if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
                typeof imageList[0] != 'undefined') {
                for (i in imageList) {
                    if (imageList.hasOwnProperty(i)) {
                        if (imageList[i].reference) {
                            htmlString += '<a href="' +
                                imageList[i].reference +
                                '" ><img src="' + imageList[i].url +
                                '" /></a>';
                        } else {
                            htmlString += '<img src="' +
                                imageList[i].url + '" />';
                        }
                    }
                }
                if ($(this.parentContainerObj).find('#' + this.divProductManufacturerImages)
                    .children(':first').length > 0) {
                    $(this.parentContainerObj).find('#' + this.divProductManufacturerImages)
                        .children(':first').append(htmlString);
                } else {
                    $(this.parentContainerObj).find('#' + this.divProductManufacturerImages)
                        .append(htmlString);
                }
            }
            var imageList = this.getMergedImages(this.dataProduct[
                "mediaList"], this.dataArticles[
                currentArticle.artNumber][
                currentArticle.artSize
            ]["mediaList"], this.mediaRelTypeManufacturer2);
            var htmlString = '';
            $(this.parentContainerObj).find('#' + this.divProductManufacturer2Images +
                ' img').remove();
            if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
                typeof imageList[0] != 'undefined') {
                for (i in imageList) {
                    if (imageList.hasOwnProperty(i)) {
                        htmlString += '<img src="' + imageList[
                            i].url + '" />';
                    }
                }
                if ($(this.parentContainerObj).find('#' + this.divProductManufacturer2Images)
                    .children(':first').length > 0) {
                    $(this.parentContainerObj).find('#' + this.divProductManufacturer2Images)
                        .children(':first').append(htmlString);
                } else {
                    $(this.parentContainerObj).find('#' + this.divProductManufacturer2Images)
                        .append(htmlString);
                }
            }
        },
        displayCareInfoImages: function(articleVO, currentArticle) {
            var imageList = this.getMergedImages(this.dataProduct[
                "mediaList"], this.dataArticles[
                currentArticle.artNumber][
                currentArticle.artSize
            ]["mediaList"], this.mediaRelTypeCareInfo);
            var htmlString = '';
            $(this.parentContainerObj).find('#' + this.divProductCareInfoImages +
                ' img').remove();
            if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
                typeof imageList[0] != 'undefined') {
                for (i in imageList) {
                    if (imageList.hasOwnProperty(i)) {
                        htmlString += '<img src="' + imageList[
                            i].url + '" />';
                    }
                }
                $(this.parentContainerObj).find('#' + this.divProductCareInfoImages)
                    .append(htmlString);
            }
        },
        displayTestInfoOtherTuevImages: function(articleVO,
            currentArticle) {
            var imageListTestInfo = this.getMergedImages(this.dataProduct[
                "mediaList"], this.dataArticles[
                currentArticle.artNumber][
                currentArticle.artSize
            ]["mediaList"], this.mediaRelTypeTestInfo);
            var imageListOther = this.getMergedImages(this.dataProduct[
                "mediaList"], this.dataArticles[
                currentArticle.artNumber][
                currentArticle.artSize
            ]["mediaList"], this.mediaRelTypeOther);
            var imageList = imageListTestInfo.concat(
                imageListOther);
            var htmlString = '';
            if (dmc.Utils.ArrayNotEmpty(imageList) === true &&
                typeof imageList[0] != 'undefined') {
                for (i in imageList) {
                    if (imageList.hasOwnProperty(i)) {
                        htmlString += '<span><img src="' +
                            imageList[i].url + '" /></span>';
                    }
                }
                $(this.parentContainerObj).find('#' + this.fieldSeals)
                    .append(htmlString);
            }
        },
        displayCrossSelling: function(articleVO, currentArticle) {},
        addToBasket: function(event) {},
        checkFields: function(currentArticleVO) {},
        doKqpriProductUpdate: function(kqpriConfList) {
            for (var artNumber in kqpriConfList) {
                if (kqpriConfList.hasOwnProperty(artNumber)) {
                    if (typeof this.dataArticles[artNumber] !=
                        'undefined') {
                        for (var artSize in kqpriConfList[
                                artNumber]) {
                            if (kqpriConfList[artNumber].hasOwnProperty(
                                    artSize)) {
                                if (typeof this.dataArticles[
                                        artNumber][artSize] !=
                                    'undefined') {
                                    this.dataArticles[artNumber]
                                        [artSize].stockAmount =
                                        kqpriConfList[artNumber]
                                        [artSize]['stockAmount'];
                                    this.dataArticles[artNumber]
                                        [artSize].stockTypeCode =
                                        kqpriConfList[artNumber]
                                        [artSize][
                                            'stockTypeCode'
                                        ];
                                    if (kqpriConfList[artNumber]
                                        [artSize][
                                            'stockTypeCode'
                                        ] == 1 || kqpriConfList[
                                            artNumber][artSize]
                                        ['stockTypeCode'] == 2) {
                                        this.dataArticles[
                                            artNumber][
                                            artSize
                                        ].selectable = true
                                    }
                                    if (typeof stockTypeText[
                                            kqpriConfList[
                                                artNumber][
                                                artSize
                                            ]['stockTypeCode']] !=
                                        'undefined') {
                                        this.dataArticles[
                                                artNumber][
                                                artSize
                                            ].stockTypeText =
                                            stockTypeText[
                                                kqpriConfList[
                                                    artNumber][
                                                    artSize
                                                ][
                                                    'stockTypeCode'
                                                ]];
                                    }
                                    this.dataArticles[artNumber]
                                        [artSize].weeksToDelivery =
                                        kqpriConfList[artNumber]
                                        [artSize][
                                            'weeksToDelivery'
                                        ];
                                }
                            }
                        }
                    }
                }
            }
            this.update();
        },
        debugLog: function(msg) {
            if (this.debug && typeof console != 'undefined') {
                console.info(msg);
            }
        },
        mergeComponentArrays: function(array1, array2) {
            var fullArray = new Array(array1, array2);
            var tmpArray = [],
                mergedArray = [];
            for (var i in fullArray) {
                if (fullArray.hasOwnProperty(i)) {
                    for (var componentPk in fullArray[i]) {
                        if (fullArray[i].hasOwnProperty(
                                componentPk)) {
                            tmpArray[fullArray[i][componentPk].sortKey +
                                    '|' + componentPk] =
                                fullArray[i][componentPk];
                        }
                    }
                }
            }
            var tmpArray = dmc.Utils.sortNaturalKeyAssoc(
                tmpArray);
            for (var sortKeyComponentPk in tmpArray) {
                if (tmpArray.hasOwnProperty(sortKeyComponentPk)) {
                    var aKeys = sortKeyComponentPk.split('|');
                    mergedArray[aKeys[1]] = tmpArray[
                        sortKeyComponentPk];
                }
            }
            return mergedArray;
        },
        sortCurrentArticleComponents: function(
            currentArticleComponents) {
            var sortOrder = [];
            for (var componentPk in currentArticleComponents) {
                if (currentArticleComponents.hasOwnProperty(
                        componentPk)) {
                    for (var i in currentArticleComponents[
                            componentPk]) {
                        if (currentArticleComponents[
                                componentPk].hasOwnProperty(i)) {
                            var sortKey = parseInt(
                                currentArticleComponents[
                                    componentPk][i].sortKey,
                                10) + 10000000;
                            sortOrder[sortKey] = componentPk +
                                '|' + i;
                        }
                    }
                }
            }
            sortOrder = dmc.Utils.sortNaturalKeyAssoc(sortOrder);
            var sortedCurrentArticleComponents = {};
            for (var sortKey in sortOrder) {
                if (sortOrder.hasOwnProperty(sortKey)) {
                    var componentPkI = sortOrder[sortKey].split(
                        "|");
                    var componentPk = componentPkI[0];
                    var i = componentPkI[1];
                    var objSortKey = componentPk.toString() +
                        "|";
                    if (typeof sortedCurrentArticleComponents[
                            objSortKey] == 'undefined') {
                        sortedCurrentArticleComponents[
                            objSortKey] = [];
                    }
                    sortedCurrentArticleComponents[objSortKey][
                        i
                    ] = currentArticleComponents[
                        componentPk][i];
                }
            }
            return sortedCurrentArticleComponents;
        },
        sortCurrentArticleSpecifyingComponents: function(
            currentArticleSpecifyingComponents) {
            var sortOrder = [];
            var currentArticle = this.getCurrentArticle();
            for (var chosenComponentPkChosenRelCode in
                    currentArticleSpecifyingComponents) {
                if (currentArticleSpecifyingComponents.hasOwnProperty(
                        chosenComponentPkChosenRelCode)) {
                    var arrChosenComponentPkChosenRelCode =
                        chosenComponentPkChosenRelCode.split(
                            '|');
                    var componentPk =
                        arrChosenComponentPkChosenRelCode[0];
                    var relCode =
                        arrChosenComponentPkChosenRelCode[1];
                    var artPos = 0;
                    if (typeof currentArticle.artNumber !=
                        "undefined" && parseInt(currentArticle.artNumber) >
                        0) {
                        for (var i in this.articleComponentMapping[
                                this.relTypeComponentSpecify
                            ][componentPk][relCode]) {
                            if (this.articleComponentMapping[
                                    this.relTypeComponentSpecify
                                ][componentPk][relCode].hasOwnProperty(
                                    i)) {
                                if (this.articleComponentMapping[
                                        this.relTypeComponentSpecify
                                    ][componentPk][relCode][i].artNumber ==
                                    currentArticle.artNumber) {
                                    artPos = i;
                                    break;
                                }
                            }
                        }
                    }
                    var sortKey = parseInt(this.articleComponentMapping[
                        this.relTypeComponentSpecify][
                        componentPk
                    ][relCode][artPos].sortKey) + 10000000;
                    sortOrder[sortKey] = componentPk + '|' +
                        relCode;
                }
            }
            sortOrder = dmc.Utils.sortNaturalKeyAssoc(sortOrder);
            var sortedCurrentArticleSpecifyingComponents = [];
            var i = 0;
            for (var sortKey in sortOrder) {
                if (sortOrder.hasOwnProperty(sortKey)) {
                    sortedCurrentArticleSpecifyingComponents[i] =
                        sortOrder[sortKey];
                    i++;
                }
            }
            return sortedCurrentArticleSpecifyingComponents;
        }
    };
    return Product;
})();
var dmc_mb3_product_pi1mediaIndex = 0;
dmc.WALZ.Product = function(config) {
    dmc.Product.call(this, config);
    dmc.WALZ.Product.prototype.updatePage = function(currentArticle) {
        dmc.Product.prototype.updatePage.call(this, currentArticle);
        var articleVO = this.dataArticles[currentArticle.artNumber][
            currentArticle.artSize
        ];
        this.checkSubmitButton(articleVO, currentArticle);
    };
    dmc.WALZ.Product.prototype.change = function(sourceComponentPk) {
        dmc.Product.prototype.change.call(this, sourceComponentPk);
        var currentArticle = this.getCurrentArticle();
        if (typeof FFCampaign == 'function') {
            var campaign = new FFCampaign();
            var searchURL =
                'http://baby-walz.de/typo3conf/ext/dmc_mb3_integratedsearch/ajaxProductCampaigns.php?instance=0&clientname=' +
                this.confClientName + '&' + 'clientpk=' + this.confClientPk +
                '&language=' + this.confLanguagePk + '&langiso2=' +
                this.confIsoCode2 + '&format=json&productNumber=' +
                currentArticle.artNumber + '&do=getProductCampaigns';
            $(document).ready(function() {
                if (this.lastCampainArtnumber != currentArticle
                    .artNumber) {
                    this.lastCampainArtnumber = currentArticle.artNumber;
                    campaign.init(searchURL);
                }
            });
        }
    };
    dmc.WALZ.Product.prototype.displayImages = function(articleVO,
        currentArticle) {
        $(this.parentContainerObj).find('#' + this.thumbImageList).html(
            '');
        var imageList = this.getMergedImages(this.dataArticles[
                currentArticle.artNumber][currentArticle.artSize][
                "mediaList"
            ], this.dataProduct["mediaList"], this.mediaRelTypeLarge,
            true);
        if (imageList.length == 0) {
            imageList = this.getImages(this.dataProduct["mediaList"],
                this.mediaRelTypeLarge, false);
        }
        if (imageList.length > 0 && typeof imageList[0] != 'undefined') {
            $(this.parentContainerObj).find('#' + this.mainImage).attr(
                'src', imageList[0].url);
            $(this.parentContainerObj).find('#' + this.mainImage).css(
                'display', '');
            var zoomProductJsObject = $('#zoomProductJsObject object')[
                0];
            if (typeof zoomProductJsObject != 'undefined') {
                zoomProductJsObject.parentNode.removeChild(
                    zoomProductJsObject);
            }
            var oldWrite = document.write;
            var output = '';
            document.write = function(s) {
                output += s;
            };
            try {
                var tmpImages = [];
                for (i in imageList) {
                    tmpImages.push(imageList[i].path);
                }
                var productMediaImageSuffix = '';
                if (imageList.length > 1) {
                    productMediaImageSuffix =
                        '&showcase_InitialImage=1';
                }
                writeFsiFlashCode({
                    productMediaImage: tmpImages.join("|") +
                        productMediaImageSuffix
                });
            } catch (e) {}
            document.write = oldWrite;
            $('#zoomProductJsObject').append(output);
            dmc_mb3_product_pi1mediaIndex = 0;
        } else {
            $(this.parentContainerObj).find('#' + this.mainImage).css(
                'display', 'none');
        }
        Utils.ClearCarouselContainer('.moreImages');
        var _this = this;
        if (imageList.length >= 1) {
            for (i = 0; i < imageList.length; i++) {
                var template = $('<li><a><img /></a></li>');
                template.find('a').attr('rel', i).attr('href',
                    'javascript: void(0);').click(function() {
                    _this.imageToggle($(this), currentArticle);
                });
                if (i == 0) {
                    template.find('a').addClass('aktiv');
                }
                template.find('img').attr('src', this.getImageLink(this
                    .mediaRelTypeThumb2, imageList[i].path)).attr(
                    'class', 'thumbs');
                $(this.parentContainerObj).find('#' + this.thumbImageList)
                    .append(template);
            }
        }
        if (imageList.length > 1) {
            $('.carouselMoreImages').jcarousel({
                vertical: true,
                scroll: 1
            });
        } else if (imageList.length == 1) {
            $('.carouselMoreImages').css('height', '60px');
            $('.carouselMoreImages').css('padding', '0px 0px 0px 5px');
        }
        if (imageList.length < 4) {
            $('.moreImages .carouselMoreImages').css('padding',
                '0px 8px');
            $('.moreImages .jcarousel-container-vertical').css(
                'padding', '5px 0px 0px');
            $('.moreImages .jcarousel-prev').css('display', 'none');
            $('.moreImages .jcarousel-next').css('display', 'none');
            $('.moreImages .jcarousel-container-vertical').css('height', (
                imageList.length * 64) + 'px');
            $('.moreImages .jcarousel-clip-vertical').css('height', (
                imageList.length * 64) + 'px');
        }
    };
    dmc.WALZ.Product.prototype.imageToggle = function(obj, currentArticle) {
        var imageList = [];
        var productImages = this.getImages(this.dataProduct["mediaList"],
            this.mediaRelTypeLarge, true);
        var articleImages = this.getImages(this.dataArticles[
            currentArticle.artNumber][currentArticle.artSize][
            "mediaList"
        ], this.mediaRelTypeLarge, true);
        imageList = articleImages.concat(productImages);
        if (imageList.length == 0) {
            imageList = this.getImages(this.dataProduct["mediaList"],
                this.mediaRelTypeLarge, false);
        }
        var imgNum = obj.attr('rel');
        var imgURL = imageList[imgNum].url;
        $(this.parentContainerObj).find('#' + this.mainImage).attr(
            'src', imgURL);
        dmc_mb3_product_pi1mediaIndex = parseInt(imageList[imgNum].index);
        $('.moreImages a').removeClass('aktiv');
        $(obj).addClass('aktiv');
        if ($('#zoomProductJsObject').html() != '' && $(
                '#zoomProductJsObject').html() != 'undefined') {
            var zoomParam = $('#zoomProductJsObject object').find(
                'param[name=movie]');
            var zoomUrl = zoomParam.attr('value').replace(/([0-9]+)$/g,
                parseInt(imageList[imgNum].index));
            zoomParam.attr('value', zoomUrl);
            $('#zoomProductJsObject').find('embed').attr('src', zoomUrl);
        };
    };
    dmc.WALZ.Product.prototype.getImageLink = function(relTypeCode,
        imagePath) {
        var returnValue = document.location.protocol;
        var matches = imagePath.match(/static/);
        if (matches && matches.length > 0) {
            returnValue += '//walz-images.walz.de/fsicache/' +
                imagePath;
        } else {
            returnValue +=
                '//walz-images.walz.de/fsicache/images?type=image&profile=' +
                relTypeCode + '_baby&source=' + imagePath;
        }
        return returnValue;
    };
    dmc.WALZ.Product.prototype.displayCrossSelling = function(articleVO,
        currentArticle) {
        var sourceList = this.dataCrossselling[currentArticle.artNumber];
        var masterList = this.dataCrossselling[this.dataProduct[
            'productNumber']];
        $(this.parentContainerObj).find('#' + this.crosssellingTargetContainer)
            .html('');
        if (sourceList && sourceList.length > 0) {
            this.renderProductlist(sourceList, $(this.parentContainerObj)
                .find('#' + this.crosssellingTargetContainer), $(
                    this.parentContainerObj).find('#' + this.crosssellingContainer),
                $(this.parentContainerObj).find('#' + this.productCrossSellingNotice)
            );
        } else if (masterList && masterList.length > 0) {
            this.renderProductlist(masterList, $(this.parentContainerObj)
                .find('#' + this.crosssellingTargetContainer), $(
                    this.parentContainerObj).find('#' + this.crosssellingContainer),
                $(this.parentContainerObj).find('#' + this.productCrossSellingNotice)
            );
        } else {
            $(this.parentContainerObj).find('#' + this.crosssellingContainer)
                .css({
                    'display': 'none'
                });
            $(this.parentContainerObj).find('#' + this.productCrossSellingNotice)
                .css({
                    'display': 'none'
                });
        }
    };
    dmc.WALZ.Product.prototype.displayComponents = function(articleVO,
        currentArticle) {
        dmc.Product.prototype.displayComponents.call(this, articleVO,
            currentArticle);
        this.mediaRelTypeTuev = 520;
        var componentValue = '';
        var imageList = this.getMergedImages(this.dataProduct[
                "mediaList"], this.dataArticles[currentArticle.artNumber]
            [currentArticle.artSize]["mediaList"], this.mediaRelTypeTuev
        );
        if (imageList.length > 0 && typeof imageList[0] != 'undefined') {
            for (var i in imageList) {
                componentValue += '<span>';
                componentValue += '<img src="' + imageList[i].url +
                    '" />';
                componentValue += '</span>';
            }
            $(this.parentContainerObj).find('#' + this.fieldSeals).append(
                componentValue);
        }
    };
    dmc.WALZ.Product.prototype.renderProductlist = function(itemList,
        targetContainerObj, crosssellingContainerObj, crossNoticeObj) {
        var targetList = [];
        for (var i = 0; i < itemList.length; i++) {
            var newNode = $(this.parentContainerObj).find('#plist' +
                itemList[i]).clone().attr('id', 'plist' + (itemList[
                i] + 1));
            targetList[i] = newNode;
        }
        var targetHtmlObj = $('<div></div>');
        var rowDiv = $('<li></li>').attr('class', 'prodLine');
        for (var j = 0; j < targetList.length; j++) {
            rowDiv.append($('<div>').append(targetList[j].clone()).html());
            if (j % 4 == 3) {
                targetHtmlObj.append(rowDiv);
                rowDiv = $('<li></li>').attr('class', 'prodLine');
            }
        }
        if (targetList.length % 4 != 0) {
            targetHtmlObj.append(rowDiv);
        }
        targetContainerObj.html(targetHtmlObj.html());
        if (targetList.length > 0) {
            crosssellingContainerObj.css({
                'display': 'block'
            });
            crossNoticeObj.css({
                'display': 'block'
            });
            $('#crosssellings').removeClass('hide');
            $('#crosssellings').removeClass('fittingArticleSmall');
            if (targetList.length == 0) {
                $('#crosssellings').addClass('hide');
            } else if (targetList.length <= 2) {
                $('#crosssellings').addClass('fittingArticleSmall');
            }
            $('#' + this.crosssellingTargetContainer).jcarousel({
                vertical: true,
                scroll: 1
            });
        }
    };
    dmc.WALZ.Product.prototype.addToBasket = function(event, uid) {
        var currentArticle = this.getCurrentArticle();
        var currentArticleVO = this.dataArticles[currentArticle.artNumber]
            [currentArticle.artSize];
        var isTop = (window.top == window);
        var checkAmount = false;
        if (currentArticleVO.stockTypeCode == 0 || currentArticleVO.stockTypeCode ==
            3 || currentArticleVO.stockTypeCode == 4) {
            event.preventDefault();
        } else {
            if ((typeof this.addToBasketParams.confirmed == 'undefined' ||
                    this.addToBasketParams.confirmed == false) && !this
                .checkFields(currentArticleVO)) {
                checkAmount = true;
                event.preventDefault();
            }
            if (typeof this.addToBasketParams.isStokkeProduct !=
                'undefined' && this.addToBasketParams.isStokkeProduct ==
                1) {
                event.preventDefault();
                alertLayer('iframe', '',
                    'http://baby-walz.de/stokkevideo.html', 790,
                    720, '', '', true);
            } else {
                var gravureFieldCount = parseInt(currentArticleVO.gravureHeadline);
                var gravureFieldLength = parseInt(currentArticleVO.gravureLength);
                var gravureTextArray = [];
                if (gravureFieldCount > 0 && gravureFieldLength > 0) {
                    for (var i = 0; i < gravureFieldCount; i++) {
                        gravureTextArray.push($(this.parentContainerObj)
                            .find('#' + this.fieldGravureText + '_' +
                                i).val());
                    }
                    if (typeof textGravureSeparator == 'undefined') {
                        var textGravureSeparator = '###';
                    }
                    $(this.parentContainerObj).find('#' + this.gravureForm)
                        .val(gravureTextArray.join(textGravureSeparator));
                }
                var amount = 0;
                amount = $(this.parentContainerObj).find('#' + this.fieldProductAmountForm)
                    .val();
                if (amount < 1) {
                    amount = 1;
                }
                $(this.parentContainerObj).find('#' + this.fieldProductBasketProductPk)
                    .val(this.dataProduct['productPk']);
                $(this.parentContainerObj).find('#' + this.fieldProductBasketPk)
                    .val(currentArticleVO.articlePk);
                if (!checkAmount) {
                    if (typeof this.addToBasketParams.target ==
                        'undefined' || this.addToBasketParams.target !=
                        'self') {
                        if (!isTop) {
                            var form = $('#productForm_' + uid);
                            form.attr('target', $('#fancybox-frame').attr(
                                'name'));
                        } else if (this.addToBasketParams.isStokkeProduct ==
                            2) {
                            var form = $('#productForm_' + uid);
                            form.attr('target', $('#fancybox-frame').attr(
                                'name'));
                        } else {
                            alertLayer('iframe', 'about:blank', '', 660,
                                970, false, '', true);
                            var form = $('#productForm_' + uid);
                            form.attr('target', $('#fancybox-frame').attr(
                                'name'));
                        }
                    }
                }
            }
        }
    };
    dmc.WALZ.Product.prototype.checkFields = function(currentArticleVO,
        callbackNo, callbackYes) {
        var returnValue = true;
        var _this = this;
        if (!callbackYes) {
            callbackYes = function() {
                _this.addToBasketParams.confirmed = true;
                setTimeout(function() {
                    $(_this.parentContainerObj).find('#' +
                        _this.productForm).submit();
                }, 1000);
            }
        }
        if (!callbackNo) {
            callbackNo;
        }
        var confirmTxtYes = 'Bestätigen';
        var confirmTxtNo = 'Abbrechen';
        var gravureFieldCount = parseInt(currentArticleVO.gravureHeadline);
        var gravureFieldLength = parseInt(currentArticleVO.gravureLength);
        var gravureTextPlain = '';
        var gravureTextArr = new Array();
        var headline = '';
        var messages = '';
        var gravureError = false;
        if (gravureFieldCount > 0 && gravureFieldLength > 0) {
            for (var i = 0; i < gravureFieldCount; i++) {
                var iptValue = $(this.parentContainerObj).find('#' +
                    this.fieldGravureText + '_' + i).val();
                gravureTextArr[i] = dmc.Utils.trimString(iptValue);
            }
            gravureTextPlain = gravureTextArr.join('');
            if (!Utils.checkPersonalChars(gravureTextPlain) ||
                gravureTextPlain.search(textGravureSeparator) != -1) {
                headline = noticeGravureHeadline;
                messages += noticeGravureError + "<br />";
                returnValue = false;
                gravureError = true;
            }
            if (gravureTextPlain == "" && !gravureError) {
                messages += noticeGravureNo + "<br />";
                returnValue = false;
                gravureError = true;
            }
        }
        var amountObj = $(this.parentContainerObj).find('#' + this.fieldProductAmountForm);
        var yardWare = currentArticleVO.stockUnit;
        if (parseInt(currentArticleVO.maxQuantity) > 0 && amountObj.val() >
            parseInt(currentArticleVO.maxQuantity)) {
            var textConf = {
                'closeText': ''
            };
            alertLayer('html', '', $('#maxAllowedInfoWrapper').html(),
                250, '80%', 'auto', textConf);
            $(this.parentContainerObj).find('#' + this.fieldProductAmountForm)
                .val(currentArticleVO.maxQuantity);
            returnValue = false;
        }
        if (amountObj.length > 0) {
            if (yardWare && yardWare == "M") {
                headline = noticeYardWareHeadline;
                var splitText = noticeYardWare.split('||');
                messages += splitText[0] + (amountObj.val() * 10) +
                    splitText[1] + amountObj.val() + splitText[2] +
                    "<br />";
            } else if (amountObj.val() >= 10) {
                headline = noticeAmountHeadline;
                var splitText = noticeAmount.split('||');
                messages += splitText[0] + amountObj.val() + splitText[
                    1] + "<br />";
            }
            if ((yardWare && yardWare == "M") || (amountObj.val() >= 10)) {
                callbackNo = function() {
                    amountObj.val(1);
                    amountObj.focus();
                }
            }
        }
        var confirmTxtYes;
        var confirmTxtNo;
        if ($('body').data('dmc_mb3_product.yes') && $('body').data(
                'dmc_mb3_product.no')) {
            confirmTxtYes = $('body').data('dmc_mb3_product.yes');
            confirmTxtNo = $('body').data('dmc_mb3_product.no');
        } else if (typeof(personalizationSubmit) !== 'undefined' &&
            typeof(personalizationChange) !== 'undefined') {
            confirmTxtYes = personalizationSubmit;
            confirmTxtNo = personalizationChange;
        };
        if (messages != '') {
            var textConf = {
                headline: headline,
                text: messages,
                yes: confirmTxtYes,
                no: confirmTxtNo
            };
            alertLayerConfirm(textConf, callbackYes, callbackNo);
            returnValue = false;
        }
        return returnValue;
    };
    dmc.WALZ.Product.prototype.checkSubmitButton = function(articleVO,
        currentArticle) {
        this.notepadLink = 'notepadLink';
        this.giftdeskLink = 'giftdeskLink';
        this.compareListLink = 'recommendLink';
        var butt = $(this.parentContainerObj).find(
            '#textimage_add_to_basket_1');
        if (butt.length == 0) {
            butt = $(this.parentContainerObj).find(
                '#textimage_change_1');
        }
        if (butt.length > 0) {
            if (articleVO.stockTypeCode == 3 || articleVO.stockTypeCode ==
                0 || articleVO.stockTypeCode == 4 || (articleVO.status &
                    32768) == 32768) {
                butt.attr('alt', buttInactiveAltTag).attr('title',
                    buttInactiveAltTag).css('cursor', 'default').attr(
                    'rel', buttInactiveRelAttr).attr('src',
                    buttInactive);
                $('.buBasket').css('cursor', 'default').attr('onclick',
                    null);
                $('.buBasket').unbind();
                if ($('#soldout2')) {
                    if (articleVO.stockTypeCode == 4 || (articleVO.status &
                            32768) == 32768) {
                        $('#soldout2').css({
                            'display': 'block'
                        });
                    } else if (articleVO.stockTypeCode != 4 && !(
                            articleVO.status & 32768)) {
                        $('#soldout2').css({
                            'display': 'none'
                        });
                    }
                }
            } else {
                if ($('#soldout2')) {
                    $('#soldout2').css({
                        'display': 'none'
                    });
                }
                butt.attr('alt', buttActiveAltTag).attr('title',
                    buttActiveAltTag).css('cursor', 'pointer').attr(
                    'rel', buttActiveRelAttr).attr('src',
                    buttActive);
            }
        }
        if (articleVO.stockTypeCode == 3 || articleVO.stockTypeCode ==
            0 || articleVO.stockTypeCode == 4) {
            $(this.parentContainerObj).find('#' + this.notepadLink).css({
                'display': 'none'
            });
            $(this.parentContainerObj).find('#' + this.giftdeskLink).css({
                'display': 'none'
            });
            $(this.parentContainerObj).find('#' + this.compareListLink)
                .css({
                    'display': 'none'
                });
        } else {
            $(this.parentContainerObj).find('#' + this.notepadLink).css({
                'display': 'block'
            });
            $(this.parentContainerObj).find('#' + this.giftdeskLink).css({
                'display': 'block'
            });
            $(this.parentContainerObj).find('#' + this.compareListLink)
                .css({
                    'display': 'block'
                });
        }
    };
};
dmc.WALZ.Product.prototype = dmc.Utils.create(dmc.Product.prototype);

function videoPopup(url, popupParams) {
    openWindow(url, 'popup_video', popupParams);
}

function cliplister() {
    return false;
}
var printableVoucher = {
    container: 'div.printableVoucher div#brandSliderContainer',
    containerLink: 'div.printableVoucher div#brandSliderContainer ul#brandSlider a',
    inputVoucherShippingMethod: 'input.voucherShippingMethod',
    inputVoucherMessage: 'div.productDetail.printableVoucher .personalizeVoucher textarea.inputVoucherMessage',
    voucherMessageCount: 'div.productDetail.printableVoucher .personalizeVoucher div#voucherMessageCount',
    shippingMethodPdfPrintout: '',
    shippingMethodEMail: '',
    shippingMethodMail: '',
    firstPrintableVoucherColor: '',
    firstPrintableVoucherColorArtNumber: 0,
    mailableVoucherColor: '',
    mailableVoucherColorArtNumber: 0,
    lastChosenColor: '',
    lastChosenColorArtNumber: 0,
    conversionRate: 0,
    vatRate: 0,
    relevantComponentPk: 0,
    maxLengthPersonalMessage: 650,
    alreadySubmitted: false,
    voucherAction: function(action, isStokkeProduct, languageId, returnUrl,
        uid, id, target, popup, url, popupParams) {
        if (action == "basketChange" || action == "basketAddVoucher") {
            if (this.alreadySubmitted) {
                this.alreadySubmitted = false;
            } else {
                this.alreadySubmitted = true;
            }
        }
        $('#productAction_' + uid).val(action);
        this.changeArticle();
        $('#productForm_' + uid).submit();
    },
    changeArticle: function() {
        selectedArticle = product01.getCurrentArticlePk();
        $('#productAmountForm_' + selfUID).val(1);
        this.econdaDetailView();
    },
    setColor: function(obj, artNumber) {
        if (typeof obj == "object") {
            var objColor = obj.parent().attr('rel');
            $(this.containerLink).parent().attr('class', '');
            obj.parent().attr('class', 'chosen');
        } else {
            var objColor = obj;
            this.setActiveColor(obj);
        }
        product01.setComponentsByArtNumber(artNumber);
        this.changeArticle();
        if (typeof obj == "object") {
            this.lastChosenColor = objColor;
            this.lastChosenColorArtNumber = artNumber;
        }
    },
    setShippingMethod: function(obj) {
        if (this.shippingMethodMail == obj.val()) {
            $('.previewOrderButtons .preview').css({
                'display': 'none'
            });
            $('div#printableVoucherPersonalization').css({
                'display': 'none'
            });
            this.setColor(this.mailableVoucherColor, this.mailableVoucherColorArtNumber);
            this.setActiveColor(this.mailableVoucherColor);
        } else {
            if (this.shippingMethodPdfPrintout == obj.val()) {
                $('div#voucherRecipientEmailField').css({
                    'display': 'none'
                });
            } else {
                $('div#voucherRecipientEmailField').css({
                    'display': 'block'
                });
            }
            $('.previewOrderButtons .preview').css({
                'display': 'block'
            });
            $('div#printableVoucherPersonalization').css({
                'display': 'block'
            });
            this.setColor(this.firstPrintableVoucherColor, this.firstPrintableVoucherColorArtNumber);
            this.setActiveColor(this.firstPrintableVoucherColor);
            if (this.lastChosenColor != "" && this.lastChosenColor !=
                this.mailableVoucherColor) {
                this.setColor(this.lastChosenColor, this.lastChosenColorArtNumber);
                this.setActiveColor(this.lastChosenColor);
            }
        }
        this.createCarousel(obj.val());
    },
    setActiveColor: function(color) {
        $('#brandSlider li div').attr('class', '');
        $('#brandSlider li div').each(function() {
            if ($(this).attr('rel') == color) {
                $(this).attr('class', 'chosen');
            }
        });
    },
    createCarousel: function(shippingMethod) {
        $('#brandSlider').remove();
        $(this.container + ' div.shadowBoxInner').html(
            '<ul id="brandSlider"></ul>');
        if (this.shippingMethodMail == shippingMethod) {
            $('#brandSlider').html($('#elementsMailableArticles').html());
            this.setActiveColor(this.mailableVoucherColor);
        } else {
            $('#brandSlider').html($('#elementsPrintableArticles').html());
            this.setColor(this.firstPrintableVoucherColor, this.firstPrintableVoucherColorArtNumber);
            this.setActiveColor(this.firstPrintableVoucherColor);
            if (this.lastChosenColor != "" && this.lastChosenColor !=
                this.mailableVoucherColor) {
                this.setColor(this.lastChosenColor, this.lastChosenColorArtNumber);
                this.setActiveColor(this.lastChosenColor);
            }
        }
        $('#brandSlider').jcarousel({
            scroll: 4,
            animation: 'fast',
            wrap: 'last',
            itemFallbackDimension: 205
        });
        $(printableVoucher.containerLink).unbind('click').click(
            function() {
                printableVoucher.setColor($(this), $(this).parent()
                    .attr('data'));
            });
    },
    econdaDetailView: function(dontTrack) {
        if ($('#voucherSelectValue_' + selfUID).val() != '') {
            var price = parseFloat($('#voucherSelectValue_' + selfUID).val());
        } else {
            var price = parseFloat($('#voucherInputValue_' + selfUID).val()
                .replace(",", "."));
        }
        if (typeof(price) == "number") {
            var netPrice = price / (1 + (this.vatRate / 100));
            netPrice = netPrice * this.conversionRate;
            netPrice = netPrice.toFixed(2);
        } else {
            var netPrice = 0;
        }
        if (this.shippingMethodMail == $(printableVoucher.inputVoucherShippingMethod +
                ':checked').val()) {
            var shippingMethod = "per Post";
        } else if (this.shippingMethodEMail == $(printableVoucher.inputVoucherShippingMethod +
                ':checked').val()) {
            var shippingMethod = "per Email";
        } else if (this.shippingMethodPdfPrintout == $(printableVoucher
                .inputVoucherShippingMethod + ':checked').val()) {
            var shippingMethod = "zum Ausdrucken";
        }
        if (typeof(emospro) == "undefined") emospro = {};
        var currentArticle = product01.getCurrentArticle();
        var artNumber = currentArticle["artNumber"];
        var artSize = currentArticle["artSize"];
        var color = $('#component_' + this.relevantComponentPk +
            ' select').val();
        emospro.ec_Event = [
            ["view", artNumber, product01.dataProduct["name"] +
                ', ' + color + ', ' + shippingMethod, netPrice,
                window.partnerContentLabelGrouppath + product01.dataProduct[
                    "name"] + ', ' + color + ', ' + shippingMethod,
                1, product01.dataArticles[artNumber][artSize][
                    "stockTypeText"
                ], window.partnerReferer, "NULL"
            ]
        ];
        if (!dontTrack) {
            window.emosPropertiesEvent(emospro);
        }
    },
    reverseCharacterCount: function(obj) {
        var charsLeft = printableVoucher.maxLengthPersonalMessage - obj
            .val().length;
        var charsDisplay = charsLeft;
        if (charsLeft <= 0) {
            $(printableVoucher.voucherMessageCount).addClass('error');
            obj.val(obj.val().substring(0, printableVoucher.maxLengthPersonalMessage));
            charsDisplay = 0;
        } else if (charsLeft <= 10) {
            $(printableVoucher.voucherMessageCount).addClass('error');
        } else {
            $(printableVoucher.voucherMessageCount).removeClass('error');
        }
        $(printableVoucher.voucherMessageCount).html(charsDisplay);
    },
    inject: function() {
        $('.buBasket').unbind('click');
        $(printableVoucher.inputVoucherShippingMethod).click(function() {
            printableVoucher.setShippingMethod($(this));
        });
        $(printableVoucher.inputVoucherMessage).keyup(function() {
            printableVoucher.reverseCharacterCount($(this));
        });
        if ($(printableVoucher.inputVoucherMessage).length > 0) {
            printableVoucher.reverseCharacterCount($(printableVoucher.inputVoucherMessage));
        }
        if (typeof selfUID != "undefined" && selfUID != "") {
            $('#voucherSelectValue_' + selfUID).change(function() {
                $('#voucherInputValue_' + selfUID).val('');
            });
        }
    }
};

function factfinder_clicktracking(n, query, product_name, product_number,
    channel, artSimi, sessionId, pageSize, pageNum, searchinstance) {
    if (query.length > 0) {
        while (n = n.parentNode) {
            if (/^plist\d+/i.test(n.id)) break;
        }
        n = $(n);
        var num = n.attr('id').replace(/\D+/g, '') - 0 + 1;
        pageSize -= 0;
        pageNum -= 0;
        artSimi -= 0;
        var data = {
            'query': query,
            'product': product_number,
            'pos': (pageNum * pageSize - pageSize) + num,
            'origPos': num,
            'page': pageNum,
            'simi': artSimi,
            'sid': sessionId,
            'title': product_name,
            'pageSize': $('.prodLine').find('[id^=plist]').length,
            'origPageSize': pageSize,
            'channel': channel,
            'event': 'click',
            'instance': searchinstance
        };
        $.ajax({
            'type': 'POST',
            'url': 'http://baby-walz.de/typo3conf/ext/dmc_mb3_integratedsearch/ajaxTracking.php',
            'data': data,
            'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cache': false,
            'async': false
        });
    }
}
var ProductPersonalizationLayer = {
    inputLevel: true,
    inputTmpVal: '',
    inputErr: '',
    close: '',
    init: function(inputErr, close) {
        var that = this;
        var textConf = {
            'closeText': close
        };
        this.inputErr = inputErr;
        this.close = close;
        $('#productGravureFbLink').click(function() {
            if (that.inputLevel) {
                alertLayer('html', '', $(
                        '#productGravureWrapper').find(
                        'div:first').get(0), 470, 530, true,
                    textConf);
            } else {
                alertLayer('html', '', $(
                        '#productGravureAbstractWrapper').find(
                        'div:first').get(0), 470, 530, true,
                    textConf);
            }
            $('#fancybox-close').click(function() {
                that.setDataBack();
            });
            $('#fancybox-overlay').click(function() {
                that.setDataBack();
            });
        });
        $('#productGravureSubmit').click(function() {
            var revise = true;
            that.inputTmpVal = '';
            $('#fancybox-inner').find('input:text').each(
                function() {
                    if (!Utils.checkPersonalChars($(this).attr(
                            'value'))) {
                        revise = false;
                        $(this).attr('value', '');
                        $(this).addClass('error');
                    } else {
                        $(this).removeClass('error');
                        $('#fancybox-inner').find(
                            '#personalizationErrorSpan'
                        ).remove();
                    }
                    that.inputTmpVal += $(this).attr(
                        'value') + '<br/>';
                });
            if (revise) {
                $('#productGravureWrapper').append($(
                        '#fancybox-inner').find('div:first')
                    .get(0));
                that.inputLevel = false;
                $('#fancybox-inner').append($(
                    '#productGravureAbstractWrapper').find(
                    'div:first').get(0));
                $('#fancybox-inner').find(
                    '#productGravureAbstractContent').html(
                    that.inputTmpVal);
            } else {
                $('#fancybox-inner').find(
                    '#personalizationErrorSpan').remove();
                $('#fancybox-inner').find('div:first').prepend(
                    '<span id="personalizationErrorSpan" class="error">' +
                    that.inputErr + '</span>');
            }
        });
        $('#productGravureAbstractChange').click(function() {
            $('#productGravureAbstractWrapper').append($(
                '#fancybox-inner').find('div:first').get(
                0));
            $('#fancybox-inner').append($(
                '#productGravureWrapper').find(
                'div:first').get(0));
            that.inputLevel = true;
        });
        $('#productGravureAbstractSubmit').click(function() {
            $('#fancybox-close').trigger('click');
        });
    },
    setDataBack: function() {
        if (this.inputLevel) {
            $('#productGravureWrapper').append($('#fancybox-inner').find(
                'div:first').get(0));
        } else {
            $('#productGravureAbstractWrapper').append($(
                '#fancybox-inner').find('div:first').get(0));
        }
    }
};
(function() {
    window.ajaxLoadPagingLinks = function(data) {
        var url = 'http://baby-walz.de/index.php?eID=ajaxPagingLinks';
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            dataType: 'json',
            success: function(result) {
                ajaxLoadPagingLinksResponse(result);
            }
        });
    };

    function ajaxLoadPagingLinksResponse(result) {
        if (result != false) {
            if (result.pagingUrl.prev != false) {
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingPrev').attr(
                    "href", result.pagingUrl.prev);
            } else if (result.pagingUrl.next) {
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingPrev').attr(
                    "href", 'javascript:void(0)');
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingPrev').attr(
                    "class", 'inactive');
            } else {
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingPrev').css({
                    'display': 'none'
                });
                $('.dmc_mb3_productlist_02 .pdsPaging .spacer').html(' ');
                $('.dmc_mb3_productlist_02 .pdsPaging .spacer').attr(
                    'class', 'inactive');
            }
            if (result.pagingUrl.next != false) {
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingNext').attr(
                    "href", result.pagingUrl.next);
            } else if (result.pagingUrl.prev) {
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingNext').attr(
                    "href", 'javascript:void(0)');
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingNext').attr(
                    "class", 'inactive');
            } else {
                $('.dmc_mb3_productlist_02 .pdsPaging .spacer').html(' ');
                $('.dmc_mb3_productlist_02 .pdsPaging .spacer').attr(
                    'class', 'inactive');
                $('.dmc_mb3_productlist_02 .pdsPaging #pdsPagingNext').css({
                    'display': 'none'
                });
            }
        }
    };
})();

function returnStokkeSuccess() {
    if (typeof product01 == 'object') {
        product01.addToBasketParams.isStokkeProduct = 2;
        alertLayer('iframe', 'about:blank', '', 660, 970, false, null, null,
            function() {
                product01.addToBasketParams.isStokkeProduct = 0;
                $(product01.parentContainerObj).find('#' + product01.productForm)
                    .submit();
            });
    }
}
$(document).ready(function() {
    $('.jsOpenRankingTab').click(function() {
        TabBox.ApplyActiveTabByIndex(2, '.tabnav');
    });
    $('#continueButton').click(function() {
        if (window.top != window.self) {
            parent.$.fancybox.close();
            parent.location.reload(true);
        } else {
            window.history.back();
        }
    });
});

function deleteNpadOrderline(uid, name, orderlinePK) {
    var obj = document.getElementById('deleteNotepadOrderline');
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    var formObj = document.getElementById('dmc_mb3_notepad_pi1_' + parent_uid +
        '_form');
    obj.name = name;
    obj.value = orderlinePK;
    formObj.submit();
}

function deleteGiftdeskOrderlineWithConfirm(uid, deleteFieldName, orderlinePK,
    textConf) {
    var callbackYes = function() {
        deleteGiftdeskOrderlineWithConfirm(uid, deleteFieldName,
            orderlinePK, textConf.text)
    }
    if (!confirmed) {
        alertLayerConfirm(textConf, callbackYes, null);
        return false;
    }
    var obj = document.getElementById('deleteGiftdeskOrderline');
    obj.name = deleteFieldName;
    obj.value = orderlinePK;
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    var formObj = document.getElementById('dmc_mb3_giftdesk_pi1_' + parent_uid +
        '_form');
    formObj.submit();
}

function deleteBasketOrderline(uid, name, orderlinePK) {
    var obj = document.getElementById('deleteOrderline');
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    var formObj = document.getElementById('dmc_mb3_shoppingbasket_pi1_' +
        parent_uid + '_form');
    var callbackYes = function() {
        deleteBasketOrderline(uid, name, orderlinePK)
    }
    if (!confirmed) {
        alertLayerConfirm(deleteOrderlineNotices, callbackYes, null);
        return false;
    }
    obj.name = name;
    obj.value = orderlinePK;
    formObj.submit();
}

function allIntoShoppingBasket(uid, name) {
    var obj = document.getElementById('allIntoBasket');
    var formObj = document.getElementById('dmc_mb3_notepad_pi1_' + uid +
        '_form');
    obj.name = name;
    obj.value = 'moveAllOrderlines';
    formObj.submit();
}

function allIntoShoppingBasketFromGiftdesk(uid, name) {
    var obj = document.getElementById('allIntoBasketFromGiftdesk');
    var formObj = document.getElementById('dmc_mb3_giftdesk_pi1_' + uid +
        '_form');
    obj.name = name;
    obj.value = 'moveAllOrderlinesFromGiftdesk';
    formObj.submit();
}

function changeOrderlineStatus(uid, changeFieldName, orderlinePK) {
    var obj = document.getElementById('changeGiftdeskOrderline');
    obj.name = changeFieldName;
    obj.value = orderlinePK;
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    var formObj = document.getElementById('dmc_mb3_giftdesk_pi1_' + parent_uid +
        '_form');
    formObj.submit();
}

function deleteClistOrderline(uid, name, orderlinePK) {
    if (!$("#compare" + uid).attr('checked')) {
        alertLayerConfirm(dmc_mb3_notepadC.textConf, function() {
            var tmp = uid.split('_');
            var parent_uid = tmp[0];
            $('#deleteCompareListOrderline').attr('name', name);
            $('#deleteCompareListOrderline').attr('value', orderlinePK);
            $('#dmc_mb3_notepad_pi1_' + parent_uid + '_form').submit();
        });
    }
}

function deleteClistItem(uid, name, orderlinePK, delFrom) {
    if (delFrom == 'notepad') {
        deleteItem(uid, name, orderlinePK);
    } else {
        alertLayerConfirm(dmc_mb3_notepadC.textConf, function() {
            deleteItem(uid, name, orderlinePK);
        });
    }
}

function deleteItem(uid, name, orderlinePK) {
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    $('#removeAction').attr('name', name);
    $('#removeAction').attr('value', orderlinePK);
    $('#dmc_mb3_notepad_pi1_' + parent_uid + '_form').submit();
}

function copyFromCompareToNotepad(uid, name, orderlinePK, fromname, toname) {
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    $('#removeAction').attr('name', name);
    $('#removeAction').attr('value', orderlinePK);
    $('#comparelistOrderlineFrom').attr('name', 'dmc_mb3_orderline_pi1[' + uid +
        '][orderlineFrom]');
    $('#comparelistOrderlineFrom').attr('value', fromname);
    $('#comparelistOrderlineTo').attr('name', 'dmc_mb3_orderline_pi1[' + uid +
        '][orderlineTo]');
    $('#comparelistOrderlineTo').attr('value', toname);
    $('#dmc_mb3_notepad_pi1_' + parent_uid + '_form').submit();
}
var comparelistArr = new Array();
$(document).ready(function() {
    $('.comparecbox').each(function(index) {
        if ($(this).attr('checked') == true) {
            comparelistArr[index] = $(this).attr('id');
        }
    });
});
dmc.WALZ.ProductList = {
    Init: function() {
        this.SetCurrentView();
        this.AppendUpArrow();
        this.AdjustColorFilter();
        if (typeof(lazyloadConfig) !== "undefined" && lazyloadConfig.init ===
            true) {
            Lazyload.Json = lazyloadConfig;
            Lazyload.CurrentPage = parseInt(Lazyload.Json.currentPage);
            Lazyload.MaxCalls = parseInt(Lazyload.Json.maxAjaxCall);
            Lazyload.CurrentLink = Lazyload.Json.currentLink;
            Lazyload.Complete = false;
            Lazyload.Busy = false;
            if (Lazyload.Json.init == true && Lazyload.Json.maxAjaxCall >
                0) {
                this._getLzyLdState();
            } else {
                $('#loadingImg').hide();
            }
        }
    },
    ReInitialize: function() {
        if (typeof(lazyloadConfig) !== "undefined") {
            Lazyload.Json = lazyloadConfig;
            Lazyload.CurrentPage = parseInt(Lazyload.Json.currentPage);
            Lazyload.MaxCalls = parseInt(Lazyload.Json.maxAjaxCall);
            Lazyload.CurrentLink = Lazyload.Json.currentLink;
            Lazyload.Complete = false;
            Lazyload.Busy = false;
            if (Lazyload.MaxCalls === false || Lazyload.MaxCalls === 0) {
                $('#loadingImg').hide();
            }
        }
    },
    SetCurrentView: function() {
        if ($.cookie('listview') == 'lines') {
            this.SetListView('lines');
        } else {
            this.SetListView('tiles');
        }
    },
    AppendUpArrow: function() {
        var copyContainer = $('#jsLazyloadanchors');
        $('#jsLazyloadanchors').remove();
        $('.content').append(copyContainer);
        var appendUpArrowHandler = function() {
            var fromTopPx = 400;
            var scrolledFromtop = $(window).scrollTop();
            if (scrolledFromtop > fromTopPx) {
                $('.goTopBtn').css('display', 'inline-block');
            } else {
                $('.goTopBtn').hide();
            }
        };
        if (window.addEventListener) {
            window.addEventListener('scroll', appendUpArrowHandler);
        } else if (window.attachEvent) {
            window.attachEvent('scroll', appendUpArrowHandler);
        }
    },
    AdjustColorFilter: function() {
        $('#refineNav .refineGroup:not(#ARTICLE_COLOR_FAMILIES)').each(
            function(groupIndex, item) {
                var totalCount = $(item).find(
                    '.refineGroupItems input[type=checkbox]').length;
                if (totalCount < 9) {
                    var list = $(item).find('.refineGroupItems');
                    list.css('height', 'auto');
                    list.css('overflow-y', 'visible');
                }
            });
    },
    InitLazyload: function() {
        dmc.WALZ.ProductList._addLzyLdClickEvent();
        Lazyload.OnPageComplete = function() {
            dmc.WALZ.ProductList._addLzyLdClickEvent();
            if (Utils.elementInViewPort(document.getElementById(
                    'loadingImg')) && Lazyload.MaxCalls !== 0) {
                Lazyload.FetchProducts();
            }
            if (typeof(Lazyload.lastPage) !== "undefined") {
                if (Lazyload.lastPage > Lazyload.Json.nextLazyLoadedPage -
                    1) {
                    Lazyload.FetchProducts();
                } else if (Lazyload.lastPage == Lazyload.Json.nextLazyLoadedPage -
                    1) {
                    window.scrollTo(0, Lazyload.scrollY);
                }
            }
        }
        if (typeof(Lazyload.lastPage) !== "undefined") {
            if (Lazyload.lastPage > (Lazyload.Json.nextLazyLoadedPage -
                    1) && (Lazyload.currentUrl == Lazyload.CurrentLink) &&
                (typeof(Lazyload.scrollY) !== "undefined")) {
                Lazyload.FetchProducts();
            }
        }
        Lazyload.AddScrollEvent('#listcontainer');
        Lazyload.Active = true;
    },
    UnloadLazyload: function() {
        dmc.WALZ.ProductList._removeLzyLdState();
        delete Lazyload.OnPageComplete;
        Lazyload.RemoveScrollEvent();
        Lazyload.CurrentPage = 1;
        Lazyload.Complete = false;
        Lazyload.Busy = false;
        Lazyload.Active = false;
    },
    _addLzyLdClickEvent: function() {
        $('#listcontainer').unbind('click');
        $('#listcontainer').click(function() {
            dmc.WALZ.ProductList._setLzyLdState();
        });
    },
    _setLzyLdState: function() {
        var data = {}
        data.lazyloadState = {
            scrollY: Utils.GetWindowScrollY(),
            currentPage: Lazyload.Json.nextLazyLoadedPage - 1,
            currentUrl: Lazyload.CurrentLink
        };
        cookie_set('ppos', JSON.stringify(data), '', '/');
    },
    _getLzyLdState: function() {
        var cookieData = cookie_get('ppos');
        if (cookieData && typeof cookieData != 'undefined') {
            var data = JSON.parse(cookieData);
            if (data && data.lazyloadState) {
                Lazyload.lastPage = data.lazyloadState.currentPage;
                Lazyload.scrollY = data.lazyloadState.scrollY;
                Lazyload.currentUrl = data.lazyloadState.currentUrl;
                data.lazyloadState = null;
                cookie_set('ppos', JSON.stringify(data), '', '/');
            }
        }
        dmc.WALZ.ProductList.InitLazyload();
    },
    SetListView: function(viewtype) {
        if (viewtype == 'lines') {
            $('#listcontainer').addClass('listView');
            $('#tilelist').attr('src',
                '/cache/fileadmin_templates_BABY_baby_global_img_icons_view_1.gif'
            );
            $('#tilelist').addClass('cursor');
            $('#linelist').attr('src',
                '/cache/fileadmin_templates_BABY_baby_global_img_icons_view_2_active.gif'
            );
            $('#linelist').removeClass('cursor');
            $('.colorText').show();
            $.cookie('listview', 'lines', {
                path: '/'
            });
        } else {
            $('#listcontainer').removeClass('listView');
            $('#tilelist').attr('src',
                '/cache/fileadmin_templates_BABY_baby_global_img_icons_view_1_active.gif'
            );
            $('#tilelist').removeClass('cursor');
            $('#linelist').attr('src',
                '/cache/fileadmin_templates_BABY_baby_global_img_icons_view_2.gif'
            );
            $('#linelist').addClass('cursor');
            $('.colorText').hide();
            $.cookie('listview', 'tiles', {
                path: '/'
            });
        }
    },
    triggerColorBoxImages: function() {
        var timeout;
        $('.prodListItem a.colorBox').unbind('click');
        $('.prodListItem a.colorBox').click(function() {
            var data = $(this).attr('rel').split('|');
            dmc.WALZ.ProductList.switchColorBoxImage(data[0],
                data[1]);
        });
        $('.prodListItem a.colorBox').unbind('mouseenter');
        $('.prodListItem a.colorBox').mouseenter(function() {
            window.clearTimeout(timeout);
            $(this).siblings('a.colorBox').removeClass('border');
            $(this).addClass('border');
        });
        $('.prodListItem a.colorBox').unbind('mouseleave');
        $('.prodListItem a.colorBox').mouseleave(function() {
            var obj = $(this);
            timeout = window.setTimeout(function() {
                obj.parent().children('a.colorBox').removeClass(
                    'border');
                obj.parent().children(
                    'a.colorBox.active').addClass(
                    'border');
            }, 300)
        });
    },
    changeColorBoxImages: function() {
        var switchedProducts = new Array();
        if (dmc.WALZ.ProductList.colorFilter != '' && dmc.WALZ.ProductList
            .colorFilter != null) {
            colors = dmc.WALZ.ProductList.colorFilter.split("|");
            colors.reverse();
            for (i = 0; i < colors.length; i++) {
                color = colors[i];
                if (typeof(productConf['colourMapping'][color]) !=
                    'undefined') {
                    for (productPkArticleNumber in productConf[
                            'colourMapping'][color]) {
                        data = productPkArticleNumber.split('|');
                        if (typeof(switchedProducts[data[0]]) ==
                            "undefined") {
                            dmc.WALZ.ProductList.switchColorBoxImage(
                                data[0], data[1]);
                            switchedProducts[data[0]] = true;
                        }
                    }
                }
            }
        }
    },
    FancySelect: function(wrapperId, noSort, noSortAlt) {
        if ($('#' + wrapperId).data('initialized') != true) {
            var mySelect = $('<div class="selectWrapperVpp"></div>');
            mySelect.append('<div class="selectedButton"><a></a></div>');
            mySelect.append(
                '<div class="selectedList" style="display:none"><ul></ul></div>'
            );
            var mySelectLink = mySelect.find('.selectedButton > a');
            var myOptions = mySelect.find('.selectedList > ul');
            mySelectLink.click(function() {
                mySelect.find('.selectedList').animate({
                    height: 'toggle'
                }, 200);
            });
            myOptions.hover(function() {}, function() {
                mySelectLink.trigger('click');
            });
            $('#' + wrapperId).after(mySelect);
            $('#' + wrapperId).data('initialized', true);
            $('#' + wrapperId + ' > option').each(function() {
                var that = this;
                if ($(this).attr('selected')) {
                    mySelectLink.html($(this).html());
                }
                var myLi = $('<li><a href="' + $(this).attr(
                        'value') + '">' + $(this).html() +
                    '</a></li>');
                myLi.click(function() {
                    mySelectLink.html($(that).html());
                    mySelectLink.trigger('click');
                    mySelectLink.unbind('click');
                });
                myOptions.append(myLi);
            });
        }
    },
    switchColorBoxImage: function(productPk, articleNumber) {
        var imgClass = productPk + 'MainImage';
        var oldContainer = $('.prodListItem .' + imgClass);
        var imageURL = '';
        if (typeof(productConf[productPk]['images'][articleNumber]) ==
            "undefined" || typeof(productConf[productPk]['images'][
                articleNumber
            ][0]) == "undefined") {
            imageURL = productConf[productPk]['images']['default'];
        } else {
            imageURL = productConf[productPk]['images'][articleNumber][
                0
            ];
        }
        if (imageURL != oldContainer.attr('src')) {
            if (!$.browser.msie) {
                $('.prodListItem a.colorBox').unbind('click');
                var newContainer = oldContainer.clone().css({
                    'z-index': '3'
                });
                newContainer.hide();
                newContainer.css('margin-top', '-' + oldContainer.height() +
                    'px');
                newContainer.attr('src', imageURL).load(function() {
                    oldContainer.after(newContainer);
                    oldContainer.fadeOut(800, function() {
                        oldContainer.remove();
                        newContainer.css('margin-top',
                            '0px');
                        newContainer.css('z-index', '1');
                    });
                    newContainer.fadeIn(800, function() {
                        dmc.WALZ.ProductList.triggerColorBoxImages();
                    });
                });
            } else {
                oldContainer.attr('src', imageURL);
            }
        }
        $('.prodListItem .' + imgClass).parents('.prodListItem').find(
            'a.colorBox').each(function() {
            var data = $(this).attr('rel').split('|');
            if (data[1] == articleNumber) {
                $(this).siblings('a.colorBox').removeClass(
                    'active').removeClass('border');
                $(this).addClass('active').addClass('border');
                $('.prodListItem .' + imgClass).parents(
                    '.prodListItem').find(
                    'a.productDetailURL').attr('href', data[
                    2]);
            }
        });
    }
}

function setListview(viewtype) {
    dmc.WALZ.ProductList.SetListView(viewtype);
}
dmc.PriceRenderer = dmc.PriceRenderer || (function($) {
    function PriceRenderer(config) {
        this.idPrefix = "#";
        this.reducedClass = "reduced";
        this.recommendedPriceClass = "isRecommendedPrice";
        this.oldPriceClass = "isOldPrice";
        this.basePriceClass = "hasBasePrice";
        this.listItemId = "";
        this.priceformatcode = true;
        this.currentPrice = "";
        this.referencePrice = "";
        this.reduced = false;
        this.isRecommendedPrice = false;
        this.isOldPrice = false;
        this.hasBasePrice = false;
        this.baseUnit = "";
        this.basePrice = "";
        this.parsePrices = false;
        if (config) {
            for (var prop in config) {
                this[prop] = config[prop];
            }
        }
    }
    PriceRenderer.prototype = {
        init: function() {
            if (this.parsePrices) {
                this.parseFromDOM();
            }
        },
        parseFromDOM: function() {
            var $listItem = $(this.idPrefix + this.listItemId);
            this.currentPrice = $listItem.find('.currentPrice')
                .data('original');
            this.referencePrice = $listItem.find(
                '.referencePrice').data('original');
            if ($listItem.data('reduced') == 'reduced') {
                this.reduced = true;
            }
            this.isRecommendedPrice = $listItem.find(
                '.recommendedPrice').hasClass(this.recommendedPriceClass);
            this.isOldPrice = $listItem.find('.oldPrice').hasClass(
                this.oldPriceClass);
            this.hasBasePrice = $listItem.find('.baseUnitPrice')
                .hasClass(this.basePriceClass);
            if (this.hasBasePrice) {
                this.baseUnit = $listItem.find('.unit').data(
                    'original');
                this.basePrice = $listItem.find('.baseprice').data(
                    'original');
            }
        },
        renderToDOM: function() {
            var $listItem = $(this.idPrefix + this.listItemId);
            if (this.priceformatcode == true) {
                $listItem.find('.priceformatcode').text(
                    $listItem.find('.priceformatcode').data(
                        'original'));
            } else {
                $listItem.find('.priceformatcode').text('');
            }
            $listItem.find('.currentPrice').text(this.currentPrice);
            $listItem.find('.referencePrice').text(this.referencePrice);
            if (this.reduced) {
                $listItem.addClass(this.reducedClass);
                $listItem.find('.wrap').addClass(this.reducedClass);
            } else {
                $listItem.removeClass(this.reducedClass);
                $listItem.find('.wrap').removeClass(this.reducedClass);
            }
            if (this.isRecommendedPrice) {
                $listItem.find('.recommendedPrice').show();
            } else {
                $listItem.find('.recommendedPrice').hide();
            }
            if (this.isOldPrice) {
                $listItem.find('.oldPrice').show();
            } else {
                $listItem.find('.oldPrice').hide();
            }
            if (this.hasBasePrice) {
                $listItem.find('.baseUnitPrice').show();
                $listItem.find('.unit').text(this.baseUnit);
                $listItem.find('.baseprice').text(this.basePrice);
            } else {
                $listItem.find('.baseUnitPrice').hide();
            }
        }
    };
    return PriceRenderer;
})($);
dmc.TimeoutOrigin = dmc.TimeoutOrigin || (function($) {
    function TimeoutOrigin() {
        this.firedFrom = 0;
    }
    TimeoutOrigin.prototype = {
        setOriginator: function(originator) {
            this.firedFrom = originator;
        },
        getOriginator: function() {
            return this.firedFrom;
        },
    };
    return TimeoutOrigin;
})($);
dmc.ComponentConfCache = dmc.ComponentConfCache || (function($) {
    function ComponentConfCache() {
        this.cache = [];
    }
    ComponentConfCache.prototype = {
        add: function(pk, conf) {
            this.cache[pk] = conf;
        },
        retrieve: function(pk) {
            return this.cache[pk];
        }
    };
    return new ComponentConfCache;
})($);
dmc.CurrentlyInjected = dmc.CurrentlyInjected || (function($) {
    function CurrentlyInjected() {
        this.product = {};
        this.id = "";
    }
    CurrentlyInjected.prototype = {
        setId: function(id) {
            this.id = id;
        },
        getId: function() {
            return this.id;
        },
        setProduct: function(product) {
            this.product = product;
        },
        getProduct: function() {
            return this.product;
        }
    };
    return new CurrentlyInjected;
})($);
dmc.InjectThumbnail = dmc.InjectThumbnail || (function($) {
    function loadArticleInformation(pk, orderNumber, numPreviewElements) {
        var conf = dmc.ComponentConfCache.retrieve(pk);
        if (typeof(conf) !== "undefined") {
            processArticleInformation(conf, orderNumber,
                numPreviewElements);
        } else {
            var url = window.location.origin +
                "http://baby-walz.de/index.php?id=productconfajax&type=10&product=" +
                pk;
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    console.debug(data);
                    var conf = $.parseJSON(data);
                    dmc.ComponentConfCache.add(pk, conf)
                    processArticleInformation(conf,
                        orderNumber, numPreviewElements
                    );
                }
            });
        }
    }

    function inject(el) {
        var timeoutOrigin = new dmc.TimeoutOrigin();
        var tileId = $(el).parents('.prodListItem').attr('id');
        var targetLink = $('#' + tileId).find('a.dynamicLink');
        $('#' + tileId).find('.tempSelection').removeClass(
            'tempSelection');
        $('#' + tileId).find('.selected').addClass('removeSelection');
        $(el).addClass('tempSelection');
        var pk = tileId.replace("p_", "");
        var orderNumber = $(el).data('orderNumber');
        var numPreviewElements = $(el).parents('.availableArticlesBox')
            .data('numElements');
        var config = {
            listItemId: tileId,
            parsePrices: true
        }
        var product = new dmc.PriceRenderer(config);
        product.init();
        if (dmc.CurrentlyInjected.getId() != tileId) {
            if (dmc.CurrentlyInjected.getId() != "") {
                undoImmediately('#' + dmc.CurrentlyInjected.getId(),
                    dmc.CurrentlyInjected.getProduct());
            }
            dmc.CurrentlyInjected.setId(tileId);
            dmc.CurrentlyInjected.setProduct(product);
        }
        loadArticleInformation(pk, orderNumber, numPreviewElements);
        prepareTarget(targetLink, product, timeoutOrigin);
        var previewText = $(el).find('.articleColorTileImage').data(
            'previewText');
        targetLink.find('.previewText').html(previewText);
        targetLink.find('.previewLayer').show();
        targetLink.find('.icon').hide();
        var targetImg = targetLink.find('img.mainImage');
        if (isTablet()) {
            var thumbLink = $(el).find('a').data('currentLink');
        } else {
            var thumbLink = $(el).find('a').attr('href');
        }
        targetLink.attr('href', thumbLink);
        targetImg.attr('src', $(el).find('img').data('bigImage'));
        setTimeout(function() {
            $(el).attr('title', previewText);
        }, 100);
        var rankingCount = $('#' + tileId).find(
            'ul.articleList li[data-orderNumber="' + orderNumber +
            '"]').attr('data-rankingCount');
        if (rankingCount == null) rankingCount = "0";
        $('#' + tileId).find('span.rankCount').html("(" + rankingCount +
            ")");
        var rankingStars = $('#' + tileId).find(
            'ul.articleList li[data-orderNumber="' + orderNumber +
            '"]').attr('data-rankingStars');
        if (rankingStars == null) rankingStars = "0";
        var rankingStarsSrc =
            '/fileadmin/templates/BABY/baby_global/img/stars/star' +
            rankingStars + '.png';
        $('#' + tileId).find('img.rankImage').attr('src',
            rankingStarsSrc);
        undo(el, product, timeoutOrigin);
    }

    function processArticleInformation(conf, orderNumber,
        numPreviewElements) {
        if (typeof(conf.articles[orderNumber]) !== "undefined") {
            var relTypeComponentSpecify = 4294967296;
            var relevantInformation = {
                listItemId: "",
                priceformatcode: false,
                currentPrice: "",
                referencePrice: "",
                reduced: false,
                isRecommendedPricePrice: false,
                isOldPrice: false,
                hasBasePrice: false,
                baseUnit: "",
                basePrice: ""
            }
            var numArticles = 0;
            for (key in conf.articles) {
                var articleInStock = false;
                for (size in conf.articles[key]) {
                    if (conf.articles[key][size].stockTypeCode == 1 ||
                        conf.articles[key][size].stockTypeCode == 2) {
                        articleInStock = true;
                        break;
                    }
                }
                if (articleInStock) {
                    numArticles++;
                }
            }
            var hasDifferentSizes = false;
            var availableArtSizes = [];
            var count = 0;
            var arrayKeys = [];
            var cheapestPrice = -1;
            var cheapestSizeKeyNum = 0;
            var previousPrice = -1;
            for (key in conf.articles[orderNumber]) {
                if (conf.articles[orderNumber].hasOwnProperty(key)) {
                    arrayKeys.push(key);
                    if (conf.articles[orderNumber][key].stockTypeCode ==
                        1 || conf.articles[orderNumber][key].stockTypeCode ==
                        2) {
                        if (cheapestPrice == -1 || conf.articles[
                                orderNumber][key].currentPrice <
                            cheapestPrice) {
                            cheapestPrice = conf.articles[orderNumber][
                                key
                            ].currentPrice;
                            cheapestSizeKeyNum = count;
                        }
                        if (previousPrice != -1 && previousPrice !=
                            conf.articles[orderNumber][key].currentPrice
                        ) {
                            relevantInformation.priceformatcode = true;
                        }
                        previousPrice = conf.articles[orderNumber][key]
                            .currentPrice;
                    }
                    count++;
                }
            }
            if (count > 1 || arrayKeys[0] != 0) {
                hasDifferentSizes = true;
            }
            var listContainer = $('#p_' + conf.product.productPk).find(
                '.previewsizes');
            if (hasDifferentSizes === true && numArticles <=
                numPreviewElements) {
                var sizeComponentPK = 0;
                var overallSizeString = "";
                for (pk in conf.components) {
                    if (conf.components[pk].typeCodeList.SIZE === true) {
                        sizeComponentPK = pk;
                    }
                }
                for (size in conf.articles[orderNumber]) {
                    var displayedSize = "";
                    for (component in conf.articles[orderNumber][size].componentData[
                            relTypeComponentSpecify]) {
                        if (conf.articles[orderNumber][size].componentData[
                                relTypeComponentSpecify][component].componentPk ==
                            sizeComponentPK) {
                            displayedSize = conf.articles[orderNumber][
                                    size
                                ].componentData[relTypeComponentSpecify]
                                [component].relValue;
                            overallSizeString += displayedSize + " ";
                        }
                    }
                    if (conf.articles[orderNumber][size].stockTypeCode ==
                        1 || conf.articles[orderNumber][size].stockTypeCode ==
                        2) {
                        availableArtSizes.push({
                            'size': size,
                            'availability': 'inStock',
                            display: displayedSize
                        });
                    } else {
                        availableArtSizes.push({
                            'size': size,
                            'availability': 'outOfStock',
                            display: displayedSize
                        });
                    }
                }
                listContainer.html('');
                var currentLink = $('#p_' + conf.product.productPk).find(
                    '.dynamicLink').attr('href');
                currentLink = currentLink.replace(/orderNumber=\d+/gi,
                    'orderNumber=' + orderNumber);
                if (overallSizeString.length < 25) {
                    for (var i = 0; i < availableArtSizes.length; i++) {
                        $('<li/>', {
                            'class': availableArtSizes[i].availability,
                            'data-size': availableArtSizes[i].size,
                            text: availableArtSizes[i].display
                        }).click(function(e) {
                            e.preventDefault();
                            if ($(this).hasClass('inStock')) {
                                window.location = currentLink +
                                    '&ordersize=' + $(this).data(
                                        'size');
                            } else {
                                window.location = currentLink;
                            }
                        }).appendTo(listContainer);
                    }
                } else {
                    if (typeof(dmc.WALZ.ProductList.LL.availableInDifferentSizes) !==
                        'undefinded') {
                        listContainer.text(dmc.WALZ.ProductList.LL.availableInDifferentSizes);
                    }
                }
            } else if (numArticles > numPreviewElements) {
                if (typeof(dmc.WALZ.ProductList.LL.availableInDifferentVersions) !==
                    'undefinded') {
                    listContainer.text(dmc.WALZ.ProductList.LL.availableInDifferentVersions);
                }
            }
            var recommendedRetailPriceSavingPercentage = conf.articles[
                orderNumber][arrayKeys[cheapestSizeKeyNum]].recommendedRetailPriceSavingPercentage;
            var oldPriceSavingPercentage = conf.articles[orderNumber][
                arrayKeys[cheapestSizeKeyNum]
            ].oldPriceSavingPercentage;
            var hasSavingsAboveThreshold = conf.articles[orderNumber][
                arrayKeys[cheapestSizeKeyNum]
            ].hasSavingsAboveThreshold;
            relevantInformation.listItemId = "p_" + conf.product.productPk;
            relevantInformation.currentPrice = conf.articles[
                orderNumber][arrayKeys[cheapestSizeKeyNum]].currentPrice;
            if (hasSavingsAboveThreshold) {
                relevantInformation.reduced = true;
                if (recommendedRetailPriceSavingPercentage >=
                    oldPriceSavingPercentage) {
                    relevantInformation.referencePrice = conf.articles[
                            orderNumber][arrayKeys[cheapestSizeKeyNum]]
                        .recommendedRetailPrice;
                    relevantInformation.isRecommendedPrice = true;
                } else {
                    relevantInformation.referencePrice = conf.articles[
                            orderNumber][arrayKeys[cheapestSizeKeyNum]]
                        .oldPrice;
                    relevantInformation.isOldPrice = true;
                }
            }
            if (conf.articles[orderNumber][arrayKeys[cheapestSizeKeyNum]]
                .baseUnitPrice != "") {
                relevantInformation.hasBasePrice = true;
                relevantInformation.baseUnit = conf.articles[
                    orderNumber][arrayKeys[cheapestSizeKeyNum]].baseUnit;
                relevantInformation.basePrice = conf.articles[
                    orderNumber][arrayKeys[cheapestSizeKeyNum]].baseUnitPrice;
            }
            var article = new dmc.PriceRenderer(relevantInformation);
            article.init();
            article.renderToDOM();
        }
    }

    function undo(el, product, timeoutOrigin) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        el.mouseleave(function() {
            el.attr('title', '');
            var targetLink = el.parents('.prodListItem').find(
                'a.dynamicLink');
            setTimeout(function() {
                if ((isHovered(targetLink) === false ||
                        typeof(isHovered(targetLink)) ==
                        "undefined") && timeoutOrigin.getOriginator() ==
                    1) {
                    el.removeClass('tempSelection');
                    el.parents('.prodListItem').find(
                        '.selected').removeClass(
                        'removeSelection');
                    var timeout = 0;
                    resetTargetState(targetLink,
                        product, timeout,
                        timeoutOrigin);
                    delete timeoutOrigin;
                }
            }, 1000);
            timeoutOrigin.setOriginator(1);
            removeHoverState(targetLink);
            el.unbind('mouseleave');
        });
    }

    function resetTargetState(el, product, timeout, timeoutOrigin) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        removeHoverState(el);
        setTimeout(function() {
            if ((isHovered(el) === false || typeof(isHovered(el)) ==
                    "undefined") && timeoutOrigin.getOriginator() ==
                2) {
                product.renderToDOM();
                el.attr('href', el.data('original'));
                var targetImg = el.find('img.mainImage');
                targetImg.attr('src', targetImg.data('original'));
                targetImg.attr('z-index', '2');
                el.parents('.prodListItem').find(
                    '.tempSelection').removeClass(
                    'tempSelection');
                el.parents('.prodListItem').find('.selected').removeClass(
                    'removeSelection');
                el.find('.previewLayer').hide();
                el.find('.icon').show();
                var rankCount = el.parents('.prodListItem').find(
                    'span.rankCount');
                rankCount.html("(" + rankCount.attr(
                    'data-original-html') + ")");
                var rankImage = el.parents('.prodListItem').find(
                    'img.rankImage');
                rankImage.attr('src', rankImage.attr(
                    'data-original-src'));
            }
        }, timeout);
        timeoutOrigin.setOriginator(2);
    }

    function undoImmediately(el, product) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        el.find('.previewLayer').hide();
        product.renderToDOM();
        el.attr('href', el.data('original'));
        var targetImg = el.find('img.mainImage');
        targetImg.attr('src', targetImg.data('original'));
        targetImg.attr('z-index', '2');
        el.parents('.prodListItem').find('.tempSelection').removeClass(
            'tempSelection');
        el.parents('.prodListItem').find('.selected').removeClass(
            'removeSelection');
        el.find('.icon').show();
        var targetLink = el.find('a.dynamicLink');
        removeHoverState(targetLink);
        el.unbind('mouseleave');
    }

    function prepareTarget(el, product, timeoutOrigin) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        addHoverState(el);
        if (el.hasClass('injected') == false) {
            el.addClass('injected');
            el.mouseover(function() {
                addHoverState(el);
            });
            el.mouseleave(function() {
                removeHoverState(el);
                var timeout = 1000;
                resetTargetState(el, product, timeout,
                    timeoutOrigin);
            });
        }
    }

    function addHoverState(el) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        el.addClass('hover');
    }

    function removeHoverState(el) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        el.removeClass('hover');
    }

    function isHovered(el) {
        if (el instanceof jQuery) {
            return el.hasClass('hover');
        } else {
            return $(el).hasClass('hover');
        }
    }
    return {
        inject: inject
    }
})($);
(function($) {
    $.fn.unveil = function(threshold, callback) {
        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-original",
            images = this,
            loaded;
        this.one("unveil", function() {
            var source = $(this).data('original');
            source = source || this.getAttribute(attrib);
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(
                    this);
            }
        });

        function unveil() {
            var inview = images.filter(function() {
                var $e = $(this);
                if ($e.is(":hidden")) return;
                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();
                return eb >= wt - th && et <= wb + th;
            });
            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }
        $w.bind("scroll.unveil resize.unveil lookup.unveil", unveil);
        unveil();
        return this;
    };
})(window.jQuery || window.Zepto);
var shoppingbasketFormDoubleSubmit = false;

function shoppingbasketFormSubmit(ctype, uid, nextstepValue, formnum) {
    var formId = ''
    if (formnum) {
        formId = formnum
    } else {
        var overidefieldnum = document.getElementById('overidefieldnum');
        if (overidefieldnum) {
            newId = overidefieldnum.value
            formId = newId;
        }
    }
    var form = document.getElementById(ctype + '_' + uid + '_form' + formId);
    var nextstep = document.getElementById(ctype + '_' + uid + '_nextstep' +
        formId);
    if (shoppingbasketFormDoubleSubmit == false) {
        if (form && nextstep && nextstepValue > 0) {
            shoppingbasketFormDoubleSubmit = true;
            nextstep.value = '' + nextstepValue;
            $('input[data-hint], textarea[data-hint]').each(function(_, element) {
                var caption = $(element).attr("data-hint");
                if ($(element).val() == caption) {
                    $(element).val('');
                }
                if ($(element).get(0).tagName == 'textarea' && $(
                        element).text() == caption) {
                    $(element).text('');
                }
            });
            form.submit();
        }
    }
}

function shoppingbasketFormChangeAction(ctype, uid, oldAction, newAction) {
    var action = document.getElementById(ctype + '[' + uid + ']' + '[action][' +
        oldAction + ']');
    if (action) {
        action.value = newAction;
    }
}

function shoppingbasketMailFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '_' + uid + '_' +
        'basketmail_form');
    form.submit();
}

function mergeForms(form1, form2) {
    $('#' + form2 + ' :input[value=]').remove();
    $('#' + form2 + ' :input').not(':submit').clone().hide().appendTo('#' +
        form1);
    return true;
}

function filloutBenefit(bVoucherAllowed, bPromotionAllowed) {
    var sBenefitCode = $('#benefitInput').val().toUpperCase();
    if (typeof(sBenefitCode) == 'undefined' || sBenefitCode == '' ||
        sBenefitCode == $('#benefitInput').attr('data-hint')) {
        return false;
    }
    $('#benefitInput').val(sBenefitCode);
    if (!/^([a-z0-9]{11}|\d{3}[a-z0-9]{3}|\d{7,10})$/i.test(sBenefitCode)) {
        $('#errorBenefitCombined').show();
        window.scrollTo(0, 0);
        return false;
    }
    $('#errorBenefitCombined').hide();
    var sAction = 'promotionCheck';
    $('#voucherCode').val('');
    $('#cryptCode').val('');
    $('#promotion2').val('');
    if (bPromotionAllowed && /^[a-z0-9]{11}$/i.test(sBenefitCode)) {
        $('#cryptCode').val(sBenefitCode);
    } else if (bPromotionAllowed && /^\d{3}[a-z0-9]{3}$/i.test(sBenefitCode)) {
        $('#promotion2').val(sBenefitCode);
    } else if (bVoucherAllowed && /^\d{7,10}$/.test(sBenefitCode)) {
        sAction = 'voucherpayoff';
        $('#voucherCode').val(sBenefitCode);
    }
    $('#benefitAction').val(sAction);
    return true;
}

function benefitNotSet() {
    var sBenefitCode = $('#benefitInput').val();
    if (typeof(sBenefitCode) == 'undefined' || sBenefitCode == '' ||
        sBenefitCode == $('#benefitInput').attr('data-hint')) {
        return true;
    } else {
        return false;
    }
}

function removeVoucher(sVouchercode) {
    $('#removeBenefit').val('removeVoucher');
    $('#voucherCode').val(sVouchercode);
}

function removePromotion(sPromotioncode) {
    $('#removeBenefit').val('removePromotion');
    $('#promotion2').val(sPromotioncode);
}

function shoppingbasketCheckPaymentType(ctype, uid, installment) {
    var installmentCheckBox = document.getElementById(ctype + '[' + uid + ']' +
        '[installment][checkbox]');
    var mode = installmentCheckBox.checked;
    if (installment == '1') {
        installmentCheckBox.disabled = false;
    } else {
        installmentCheckBox.checked = false;
        installmentCheckBox.disabled = true;
    }
}
var dmc_mb3_shoppingbasketcached = {
    decode: function(data) {
        var lsRegExp = /\+/g;
        return unescape(String(data).replace(lsRegExp, " "));
    }
}

function fillShoppingBasketWithData(basketAmountContainerId,
    articlesAmountContainerSelector) {
    var articlesAmountContainer = $(articlesAmountContainerSelector);
    var basketAmountContainer = $('#' + basketAmountContainerId);
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        console.debug(cookieData);
        var data = $.parseJSON(cookieData);
        if (data) {
            if (articlesAmountContainer.length > 0 && typeof data.shoppingbasket
                .articlesAmount != 'undefined') {
                articlesAmountContainerValue = dmc_mb3_shoppingbasketcached.decode(
                    data.shoppingbasket.articlesAmount);
                if (articlesAmountContainer) {
                    articlesAmountContainer.html(htmlEntities(
                        articlesAmountContainerValue));
                }
            }
            if (basketAmountContainer && typeof data.shoppingbasket.basketAmount !=
                'undefined') {
                basketAmountContainerValue = dmc_mb3_shoppingbasketcached.decode(
                    data.shoppingbasket.basketAmount);
                if (basketAmountContainer) {
                    basketAmountContainer.html(htmlEntities(
                        basketAmountContainerValue));
                }
            }
            var basketDisplayContentContainer = $('#freedeliveryInfoId');
            if (typeof data.shoppingbasket.basketAmount != 'undefined' && data.shoppingbasket
                .freeDelivery == 1 && basketDisplayContentContainer.length > 0) {
                basketDisplayContentContainer.attr('class', 'unhide');
            }
            if (data.shoppingbasket.basketAddStatus == 1) {
                showToolTip(basketAmountContainerId, shoppingBasketConfirmMsg);
            }
            resetCookie();
        }
    }
}

function resetCookie() {
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data) {
            data.shoppingbasket.basketAddStatus = "0";
            cookieDataUpdated = JSON.stringify(data);
            cookie_set('mb3pc', cookieDataUpdated, '', '/');
        }
    }
}

function isBasketEmpty() {
    var cookieData = cookie_get('mb3pc');
    var retval = true;
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data) {
            if (typeof data.shoppingbasket != 'undefiend' && data.shoppingbasket
                .articlesAmount != 0) {
                retval = false;
            }
        }
    }
    return retval;
}

function deliveryAddressChangeName(ctype, uid) {
    var form = document.getElementById(ctype + '_' + uid + '_form');
    if (form) {
        document.getElementById(ctype + '[' + uid + ']' + '[action]' +
            '[changeDeliveryCustomer]').value = "loadDeliveryAddress";
        form.submit();
    }
}

function deleteOrderline(uid, name, orderlinePK) {
    var obj = document.getElementById('deleteOrderline');
    var tmp = uid.split('_');
    var parent_uid = tmp[0];
    var formObj = document.getElementById('dmc_mb3_shoppingbasket_pi1_' +
        parent_uid + '_form');
    if (confirm(deleteOrderlineNotice) == true) {
        obj.name = name;
        obj.value = orderlinePK;
        formObj.submit();
    }
}

function moveOrderline(uid, basicFieldName, actionType, orderlinePk, fromValue,
    toValue) {
    var obj = document.getElementById(fromValue + 'ActionIdentifier');
    obj.name = basicFieldName + '[action][' + actionType + '][' + orderlinePk +
        ']';
    obj.value = orderlinePk;
    var obj2 = document.getElementById(fromValue + 'OrderlineTo');
    obj2.name = basicFieldName + '[orderlineTo]';
    obj2.value = toValue;
    var obj3 = document.getElementById(fromValue + 'OrderlineFrom');
    obj3.name = basicFieldName + '[orderlineFrom]';
    obj3.value = fromValue;
    var tmp = uid.split('_');
    var parentUid = tmp[0];
    if (fromValue == 'shoppingcart') {
        var extensionName = 'dmc_mb3_shoppingbasket_pi1';
    } else if (fromValue == 'notepad' || fromValue == 'comparelist') {
        var extensionName = 'dmc_mb3_notepad_pi1';
    } else if (fromValue == 'giftdesk') {
        var extensionName = 'dmc_mb3_giftdesk_pi1';
    }
    var obj5 = document.getElementById(fromValue + 'ArticleAmount');
    if (obj5) {
        obj5.name = basicFieldName + '[ArticleAmount]';
        obj5.value = $('#orderline_amount_' + orderlinePk).val();
    }
    var formObj = document.getElementById(extensionName + '_' + parentUid +
        '_form');
    formObj.submit();
}

function copyOrderlineSubmit(uid, basicFieldName, actionType, orderlinePk,
    fromValue, toValue) {
    var obj = document.getElementById(fromValue + 'ActionIdentifier');
    obj.name = basicFieldName + '[action][' + actionType + '][' + orderlinePk +
        ']';
    obj.value = orderlinePk;
    var obj2 = document.getElementById(fromValue + 'OrderlineTo');
    obj2.name = basicFieldName + '[orderlineTo]';
    obj2.value = toValue;
    var obj3 = document.getElementById(fromValue + 'OrderlineFrom');
    obj3.name = basicFieldName + '[orderlineFrom]';
    obj3.value = fromValue;
    var tmp = uid.split('_');
    var parentUid = tmp[0];
    if (fromValue == 'shoppingcart') {
        var extensionName = 'dmc_mb3_shoppingbasket_pi1';
    } else if (fromValue == 'notepad') {
        var extensionName = 'dmc_mb3_notepad_pi1';
    } else if (fromValue == 'giftdesk') {
        var extensionName = 'dmc_mb3_giftdesk_pi1';
    }
    var targetContainer = $('<iframe name="myWalzFrame"></iframe>');
    targetContainer.attr('src', 'about:blank');
    targetContainer.css('display', 'none');
    $('.tnlMywalz').append(targetContainer);
    var form = $('#' + extensionName + '_' + parentUid + '_form');
    form.attr('target', 'myWalzFrame');
    form.submit();
    Utils.CheckFrameContent(targetContainer, function() {
        targetContainer.remove();
        setUserDataFromCookie();
        $('.tnlMywalz').fadeIn('slow');
        $('#trigger_a18878').addClass('sfhover');
        setTimeout(function() {
            $('.tnlMywalz').fadeOut('slow');
            $('#trigger_a18878').removeClass('sfhover');
        }, 4000);
    });
}

function updatePaymentAndDeliveryTypeVisibility() {
    var $ = jQuery;
    var radioPrepayment = $('#payment_prepayment');
    var labelPrepayment = $('label[for=payment_prepayment]');
    var radio24hExpress = $('#input_deliverysubtype_24hexpress');
    var label24hExpress = $('label[for=input_deliverysubtype_24hexpress]');
    if (radioPrepayment.size() && radio24hExpress.size()) {
        if (radioPrepayment.attr('checked')) {
            radio24hExpress.hide();
            label24hExpress.hide();
        } else {
            radio24hExpress.show();
            label24hExpress.show();
        }
        if (radio24hExpress.attr('checked')) {
            radioPrepayment.hide();
            labelPrepayment.hide();
        } else {
            radioPrepayment.show();
            labelPrepayment.show();
        }
    }
}

function triggerShoppingbasket() {
    fillShoppingBasketWithData('basketAmountContainer',
        '.articlesAmountContainer');
}
(function() {
    function toggleBox(ctype, uid, state, checkboxId, containerId,
        actionName, actionSetValue, actionUnsetValue, todos) {
        var checkbox = $('#' + checkboxId);
        var container = $('#' + containerId);
        var visible = ((container.css('display') != 'none') && (container.css(
            'visibility') != 'hidden'));
        if ((!state || !visible) && (state !== false || visible)) {
            if (typeof todos == 'function') {
                todos();
            }
            container.animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'normal');
            checkbox.attr('checked', !visible);
            if (visible) {
                shoppingbasketFormChangeAction(ctype, uid, actionSetValue,
                    actionUnsetValue);
            } else {
                shoppingbasketFormChangeAction(ctype, uid, actionSetValue,
                    actionSetValue);
            }
        }
    }
    window.toggleLoginCustomer = function(ctype, uid, state) {
        toggleBox(ctype, uid, state, 'loginCustomerCheckbox',
            'loginCustomerForm', 'loginCustomer', 'loginCustomer',
            'unsetloginCustomer');
    }
    window.toggleDeliveryAddress = function(ctype, uid, state) {
        toggleBox(ctype, uid, state, 'deliveryAddressCheckBox',
            'shippingAddress_deliverycustomer', 'deliveryAddress',
            'deliveryAddress', 'unsetDeliveryAddress',
            function() {
                var elem = document.getElementById(ctype + '[' +
                    uid + '][shippingAddress]');
                togglePackstationAddress(ctype, uid, false)
                elem.value = (elem.value == 2) ? 1 : 2;
            });
    }
    window.togglePackstationAddress = function(ctype, uid, state) {
        toggleBox(ctype, uid, state, 'packstationAddressCheckBox',
            'packstationAddressForm', 'delivery', 'shippingAddress',
            'unsetDelivery',
            function() {
                var elem = document.getElementById(ctype + '[' +
                    uid + '][shippingAddress]');
                toggleDeliveryAddress(ctype, uid, false)
                elem.value = (elem.value == 3) ? 1 : 3;
            });
    }
})();
var creditcard_info = new Array();
creditcard_info[''] = '';

function setCreditCardInfoText() {
    $('#creditcard_info').html(creditcard_info[$('#ccard').val()]);
    if ($('#ccard').val()) {
        $('#checknbr').attr('maxLength', 4);
        if ($('#ccard').val() != 'AMX') {
            $('#checknbr').attr('maxLength', 3);
        }
        $('#cardnbr').attr('maxLength', 16);
        if ($('#ccard').value == 'AMX') {
            $('#cardnbr').attr('maxLength', 15);
        }
    }
}
$(function() {
    setCreditCardInfoText();
});

function step15FormBehavior(ctype, uid) {
    $('#basketRegisterCuNo form').css('visibility', 'hidden');
    $('#basketRegisterCuNo form').slideUp();
    $('#alreadyCustomer input.radio').attr('checked', true);
    $('.radioHead input.radio').click(function() {
        $('.jsRadioToggles input.radio').attr('checked', false);
        $('.jsFormToggle').css('visibility', 'hidden');
        $('.jsFormToggle').slideUp();
        $(this).attr('checked', true);
        $(this).parent().parent().next('.toggleDiv').slideDown('fast');
        $(this).parent().parent().next('.toggleDiv').css('visibility',
            'visible');
        $(this).parent().parent().next().children('.jsFormToggle').slideDown(
            'fast');
        $(this).parent().parent().next().children('.jsFormToggle').css(
            'visibility', 'visible');
    });
    $('.dmcmb3shoppingbasketWrapper').each(function() {
        if ($(this).find('input').hasClass('error')) {
            $('.jsFormToggle').css('visibility', 'hidden');
            $('.jsFormToggle').slideUp();
            $(this).find('input.radio').attr('checked', true);
            $(this).find('.jsFormToggle').slideDown('fast');
            $(this).find('.jsFormToggle').css('visibility', 'visible');
        }
    });
    if ($('#alreadyLoggedin').size() !== 0) {
        $('.jsRadioToggles input.radio').attr('checked', false);
        $('#basketRegister input.radio').attr('checked', true);
        $('.jsFormToggle').css('visibility', 'hidden');
        $('.jsFormToggle').slideUp();
    }
    $('.dmc_mb3_shoppingbasket_basket15 .loginAndOrder .submitButton').bind(
        'click.submit',
        function() {
            if ($('#alreadyCustomer input.radio').is(':checked')) {
                shoppingbasketFormSubmit(ctype, uid, 20, 2);
            }
            if ($('#basketRegisterCuNo input.radio').is(':checked')) {
                $('#basketRegisterCuNo').find('form').submit();
            }
        });
    $('.dmc_mb3_shoppingbasket_basket15 .orderWithoutLogin .submitButton').bind(
        'click.submit',
        function() {
            shoppingbasketFormSubmit(ctype, uid, 20, 3);
        });
}

function step15FormBehaviorMobile(ctype, uid) {
    $('#basketRegisterCuNo form').css('visibility', 'hidden');
    $('#basketRegisterCuNo form').slideUp();
    $('#alreadyCustomer input.radio').attr('checked', true);
    $('.radioHead input.radio').click(function() {
        $('.jsRadioToggles input.radio').attr('checked', false);
        $('.jsFormToggle').css('visibility', 'hidden');
        $('.jsFormToggle').slideUp();
        $(this).attr('checked', true);
        $(this).parent().next('.toggleDiv').slideDown('fast');
        $(this).parent().next('.toggleDiv').css('visibility', 'visible');
        $(this).parent().next().children('.jsFormToggle').slideDown(
            'fast');
        $(this).parent().next().children('.jsFormToggle').css(
            'visibility', 'visible');
    });
    $('.dmcmb3shoppingbasketWrapper').each(function() {
        if ($(this).find('input').hasClass('error')) {
            $('.jsFormToggle').css('visibility', 'hidden');
            $('.jsFormToggle').css('display', 'none');
            $('.jsFormToggle').slideUp();
            id = $('div.radioHead').find('input[type="radio"]')[0].id;
            $('#' + id).attr('checked', false);
            id = $('div.radioHead').find('input[type="radio"]')[1].id;
            $('#' + id).attr('checked', false);
            id = $(this).find('div.radioHead').find(
                'input[type="radio"]')[0].id;
            $('#' + id).attr('checked', true);
            $(this).find('.jsFormToggle').slideDown('fast');
            $(this).find('.jsFormToggle').css('visibility', 'visible');
        }
    });
    if ($('#alreadyLoggedin').size() !== 0) {
        $('.jsRadioToggles input.radio').attr('checked', false);
        $('#basketRegister input.radio').attr('checked', true);
        $('.jsFormToggle').css('visibility', 'hidden');
        $('.jsFormToggle').slideUp();
    }
    $('.dmc_mb3_shoppingbasket_basket15 .col_2c_1 .submitButton').bind(
        'click.submit',
        function() {
            if ($('#alreadyCustomer input.radio').is(':checked')) {
                shoppingbasketFormSubmit(ctype, uid, 20, 2);
            }
            if ($('#basketRegisterCuNo input.radio').is(':checked')) {
                $('#basketRegisterCuNo').find('form').submit();
            }
        });
    $('.dmc_mb3_shoppingbasket_basket15 .col_2c_2 .submitButton').bind(
        'click.submit',
        function() {
            shoppingbasketFormSubmit(ctype, uid, 20, 3);
        });
}

function openChangeBasketWindow(url, target, parameters) {
    var paramObj = Utils.ParsePopupParams(parameters);
    alertLayer('iframe', url, '', paramObj.Height, paramObj.Width, paramObj.Scrolling);
}

function showAddressbook() {
    alertLayer('html', '', $("#addressbook").html(), 370, 560, 'auto',
        'schliessen');
    $('#addressbooklink').attr('checked', false);
}

function useAddressbookItem() {
    var addressbookitemId = ($("input[name='addressbookitem']:checked").val());
    if ($('#' + addressbookitemId + '_type').val() == 'delivery') {
        $('#shipaddr_salutation' + $('#' + addressbookitemId + '_salutation').val())
            .attr("checked", "checked");
        $('#shipaddr_salutation' + $('#' + addressbookitemId + '_salutation').val())
            .trigger('change');
        if ($('#' + addressbookitemId + '_salutation').val() == 5) {
            $('#shipaddr_company').val($('#' + addressbookitemId + '_company').val());
            $('#surename_shipaddr').val('');
        } else {
            $('#shipaddr_company').val('');
            $('#surename_shipaddr').val($('#' + addressbookitemId + '_lastname')
                .val());
        }
        $('#address2_shipaddr').val($('#' + addressbookitemId + '_address2').val());
        $('#shipaddr_street').val($('#' + addressbookitemId + '_address1').val());
        $('#shipaddr_plz').val($('#' + addressbookitemId + '_zip').val());
        $('#shipaddr_city').val($('#' + addressbookitemId + '_city').val());
        $('#shipping_to_shipping_address').attr("checked", "checked");
        setshippingaddressform('deliverycustomer');
    } else {
        $('#pack_salutation' + $('#' + addressbookitemId + '_salutation').val())
            .attr("checked", "checked");
        $('#pack_name').val($('#' + addressbookitemId + '_lastname').val());
        $('#pack_number').val($('#' + addressbookitemId + '_address2').val());
        $('#pack_stationNo').val($('#' + addressbookitemId + '_address1').val());
        $('#pack_plz').val($('#' + addressbookitemId + '_zip').val());
        $('#pack_city').val($('#' + addressbookitemId + '_city').val());
        $('#shipping_to_packing_station').attr("checked", "checked");
        setshippingaddressform('packstation');
    }
    $.fancybox.close();
}
$(document).ready(function() {
    var myurl = document.URL;
    var mysearch = myurl.search(/#continue/);
    if (mysearch != -1) {
        $('.jsContinueShop').each(function() {
            $(this).removeClass('hide');
        });
    }
    var anker = location.href.split('#')[1];
    if (anker == 'showupdate') {
        $('.tnlMywalz').fadeIn('slow');
        $('#trigger_a18878').addClass('sfhover');
        setTimeout(function() {
            $('.tnlMywalz').fadeOut('slow');
            $('#trigger_a18878').removeClass('sfhover');
        }, 4000);
    }
    jQuery("div.dmc_mb3_shoppingbasket_basket30 div.radioToggle").click(
        function() {
            var elementId = jQuery(this).children(
                "input[type=radio]").first().attr('id');
            jQuery('#' + elementId).attr('checked', 'checked');
            changePaymentType(elementId.substring(8));
        });
});

function mobileContinueShopping() {
    if (top.document.referrer.indexOf(shopDomain) >= 0) {
        history.replaceState({}, top.document.title, top.document.location.href);
        top.window.location.href = top.document.referrer;
    } else {
        top.window.location.href = 'http://' + shopDomain;
    }
}
var mouseX = 0;
var mouseY = 0;
var tooltip = null;

function getMouseXY(e) {
    if (document.all) {
        mouseX = window.event.x + document.body.scrollLeft;
        mouseY = window.event.y + document.body.scrollTop;
    } else {
        var Element = e.target;
        var CalculatedTotalOffsetLeft = 0;
        var CalculatedTotalOffsetTop = 0;
        while (Element.offsetParent) {
            CalculatedTotalOffsetLeft = Element.offsetLeft;
            CalculatedTotalOffsetTop = Element.offsetTop;
            Element = Element.offsetParent;
        };
        mouseX = e.pageX - CalculatedTotalOffsetLeft;
        mouseY = e.pageY - CalculatedTotalOffsetTop;
    }
}

function updateTooltip(x, y) {
    if (tooltip != null) {
        tooltip.style.left = (x + 10) + 'px';
        tooltip.style.top = (y + 10) + 'px';
    }
}

function showTooltip(id) {
    tooltip = document.getElementById(id);
    if (tooltip.innerHTML != '') {
        tooltip.style.display = 'block';
        tooltip.style.visibility = 'visible';
    }
}

function hideTooltip() {
    tooltip.style.display = 'none';
    tooltip.style.visibility = 'hidden';
    tooltip = null;
}

function openWindow(url, target, parameters) {
    var paramObj = Utils.ParsePopupParams(parameters);
    alertLayer('iframe', url, '', paramObj.Height, paramObj.Width, paramObj.Scrolling);
}
$(document).ready(function() {
    $('.formNewsletterMiniBox').find('form').each(function() {
        $(this).attr('id', 'formNewsletterMiniBox' + Utils.GetRandom(
            1, 100000));
    });
    $('.formNewsletterMiniBox').bind('submit', function() {
        return fancyBoxLayerSubmit(300, 800, true, '#' + $(this)
            .find('form').attr('id'), '', false);
    });
});
$(function() {
    $('td:has(input[name=\'TSFE_ADMIN_PANEL[display_sqlloginfo]\']) a')
        .mousedown(function() {
            var cookieData = cookie_get('mb3pc');
            var value = document.TSFE_ADMIN_PANEL_FORM[
                'TSFE_ADMIN_PANEL[display_sqlloginfo]'].value;
            var status = 'closed';
            if (value == 0) {
                status = 'open';
            }
            if (cookieData && typeof cookieData != 'undefined') {
                var data = JSON.parse(cookieData);
                if (data) {
                    data.sqlLogger = status;
                    cookieDataUpdated = JSON.stringify(data);
                    cookie_set('mb3pc', cookieDataUpdated, '', '/');
                }
            }
        });
    $('.typo3-adminPanel-update').click(function() {
        var cookieData = cookie_get('mb3pc');
        if (cookieData && typeof cookieData != 'undefined') {
            var data = JSON.parse(cookieData);
            if (data) {
                if ($(
                        'input[name="TSFE_ADMIN_PANEL[save_check]"]:checked'
                    ).val()) {
                    data.savefile_name = $(
                        'input[name="TSFE_ADMIN_PANEL[savefile_name]"]'
                    ).val();
                } else {
                    data.savefile_name = '';
                }
                cookieDataUpdated = JSON.stringify(data);
                cookie_set('mb3pc', cookieDataUpdated, '', '/');
            }
        }
    });
});

function toggleView(objId) {
    if (objId) {
        var object = document.getElementById(objId);
        var showQueryTextObj = $('input:[name="TSFE_ADMIN_PANEL[show_query_' +
            objId + ']"]');
        if (object) {
            oldState = object.style.visibility;
            switch (oldState) {
                case 'visible':
                    object.style.visibility = 'hidden';
                    object.style.display = 'none';
                    showQueryTextObj.val(0);
                    break;
                default:
                    object.style.visibility = 'visible';
                    object.style.display = 'block';
                    showQueryTextObj.val(1);
                    break;
            }
        }
    }
}
var blockPriceList = new Array();
var artNumberOld = 0;
var numberOfOrderlines = 0;
var exprSearchAll = /^\d{3,4}\.?\d{3}(\.?\w{3})?$/;
var exprSearchAuto = /^\d{3,4}\.\d{3}\.\w{3}|\w{10}$/;
window.shoppingBasketSubmit = new dmc.Utils.CustomEvent();

function checkOrderFormAndSubmitShoppingbasket(ctype, uid) {
    return function(basket_ctype, basket_uid, basket_nextstepValue,
        basket_fromnum) {
        var callbackOrderlineConfirmationYes = function() {
            orderFormChangeAction(ctype, uid, 'addToBasket',
                'addToBasket', null, 0);
        }
        var callbackOrderlineConfirmationNo = function() {
            shoppingbasketFormSubmit(basket_ctype, basket_uid,
                basket_nextstepValue, basket_fromnum);
        }
        if (checkOrderlines()) {
            var textConf = {
                text: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_info_text'
                ),
                no: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_no'
                ),
                yes: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_yes'
                ),
                headline: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_headline'
                )
            };
            confirmation = alertLayerConfirm(textConf,
                callbackOrderlineConfirmationYes,
                callbackOrderlineConfirmationNo);
        } else {
            shoppingbasketFormSubmit(basket_ctype, basket_uid,
                basket_nextstepValue, basket_fromnum);
        }
    }
}

function openOrderlineForm(ctype, uid, action) {
    var $orderForm = $('#orderform_' + ctype + '_' + uid);
    var $orderFormEnableLink = $('#orderFormEnable');
    var $orderFormDisableLink = $('#orderFormDisable');
    var $shoppingBasketFormSubmitButton = $(
        '#jsFirstShoppingBasketFormSubmitButton');
    var callbackOrderlineFormYes = function() {
        if ($shoppingBasketFormSubmitButton.size() > 0) {
            $shoppingBasketFormSubmitButton.css('display', 'block');;
        }
        orderFormChangeAction(ctype, uid, 'addToBasket', 'addToBasket',
            null, 0);
    }
    var callbackOrderlineFormNo = function() {
        cleanupOrderForm();
        $orderForm.slideUp();
        $orderFormEnableLink.css('display', 'block');
        $orderFormDisableLink.css('display', 'none');
        if ($shoppingBasketFormSubmitButton.size() > 0) {
            $shoppingBasketFormSubmitButton.css('display', 'block');;
        }
    }
    if (action == 'enable') {
        $orderForm.slideDown();
        $orderFormEnableLink.css('display', 'none');
        $orderFormDisableLink.css('display', 'block');
        if ($shoppingBasketFormSubmitButton.size() > 0) {
            $shoppingBasketFormSubmitButton.css('display', 'none');;
        }
    } else if (action == 'disable') {
        if (checkOrderlines()) {
            var textConf = {
                text: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_info_text'
                ),
                no: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_no'
                ),
                yes: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_yes'
                ),
                headline: $('body').data(
                    'dmc_mb3_orderform.close_order_form_confirmation_headline'
                )
            };
            confirmation = alertLayerConfirm(textConf, callbackOrderlineFormYes,
                callbackOrderlineFormNo);
        } else {
            callbackOrderlineFormNo();
        }
    }
}

function toggleToBasketButton() {}

function initOrderlineForm(ctype, uid) {
    $('#orderform_' + ctype + '_' + uid).css('display', 'none');
    $('#orderFormEnable').css('display', 'block');
    $('#orderFormDisable').css('display', 'none');
    $('#addToBasketEnabled').hide();
    $('#addToBasketDisabled').show();
    $('#moreInputFields').hide();
}

function orderFormChangeAction(ctype, uid, actionName, actionValue,
    additionalParam, lineNumberIn) {
    var form = $('#orderform_' + ctype + '_' + uid);
    var action = $('#orderformAction_' + ctype + '_' + uid);
    if (additionalParam != null) {
        additionalParam = '[' + additionalParam + ']';
    } else {
        additionalParam = '';
    }
    if (lineNumberIn != null) {
        lineNumber = lineNumberIn;
    }
    if (action) {
        action.attr('name', ctype + '[' + uid + '][action][' + actionName + ']' +
            additionalParam);
        action.attr('value', actionValue);
    }
    if (checkOrderlineFields(lineNumber, function() {
            orderFormChangeAction(ctype, uid, actionName, actionValue,
                additionalParam, lineNumberIn)
        }) == true) {
        form.submit();
    }
}

function setDivVisible(field) {
    var check = false;
    $('#selectbox_' + field + ' option').each(function() {
        if ($(this).html() != '-' && $(this).html() != '') {
            check = true;
        }
    });
    if (check == true) {
        document.getElementById('selectdiv_' + field).style.marginLeft = "0px";
    }
}

function setDivInvisible(field) {
    document.getElementById('selectdiv_' + field).style.marginLeft = "-10000px";
}

function setupFields(ctype, uid) {
    var open = false;
    var tmpVal = '';
    initOrderlineForm(ctype, uid);
    for (var lineNumber = 0; lineNumber < numberOfOrderlines; lineNumber++) {
        updateComponentView(lineNumber)
        if (checkOrderlines(lineNumber)) {
            open = true;
        }
        tmpVal = $('#text_artnumber_' + lineNumber).attr('value');
        if (tmpVal) {
            tmpVal = tmpVal.length > 9 ? tmpVal : '0' + tmpVal;
            tmpVal = tmpVal.substr(0, 4) + '.' + tmpVal.substr(4, 3) + '.' +
                tmpVal.substr(7, 3);
            $('#ordernb1_' + lineNumber).val(tmpVal);
        }
    }
    if (checkOrderlines() == true) {
        openOrderlineForm(ctype, uid, 'enable');
    }
    var myurl = document.URL;
    var mysearch = myurl.search(/#enable/);
    if (mysearch != -1) {
        openOrderlineForm(ctype, uid, 'enable');
    }
}

function cleanupOrderForm() {
    $('.jsLineNo').each(function() {
        var tempOrderlineNum = $(this).attr('value');
        if ($('#ordernb1_' + tempOrderlineNum).val() != '') {
            $('#ordernb1_' + tempOrderlineNum).val('');
            $('#text_artnumber_' + tempOrderlineNum).val('');
            $('#ordernb1_' + tempOrderlineNum).removeClass('error');
            retrieveArticleData(tempOrderlineNum, false, false);
        }
    });
}

function checkOrderlines() {
    var returnValue = false;
    for (var lineNumber = 0; lineNumber < numberOfOrderlines; lineNumber++) {
        if ($('#text_artnumber_' + lineNumber).val() > 0) {
            returnValue = true;
        }
    }
    return returnValue;
}

function orderLinesHasErrors() {
    var returnValue = false;
    $('.orderLineDirektinputs').each(function() {
        var tempOrderlineNum = $(this).find('.jsLineNo').attr('value');
        if ($('#errorbox_' + tempOrderlineNum).hasClass('errorVisible')) {
            returnValue = true;
        };
    });
    return returnValue;
}

function oneOrderlineHasNoErrors() {
    var returnValue = false;
    $('.orderLineDirektinputs').each(function() {
        var tempOrderlineNum = $(this).find('.jsLineNo').attr('value');
        if ($('#errorbox_' + tempOrderlineNum).hasClass('errorHidden') &&
            $('#text_artnumber_' + tempOrderlineNum).val()) {
            returnValue = true;
        };
    });
    return returnValue;
}

function updateComponentView(lineNumber, amountChange) {
    var inputComponentView = document.getElementById('text_componentView_' +
        lineNumber);
    var alreadyUpdated = inputComponentView.alreadyUpdated;
    var oldComponentView = '';
    var oldArticleSize = null;
    var oldComponentViewStillAvailable = false;
    if (!alreadyUpdated) {
        inputComponentView.alreadyUpdated = true;
    } else {
        inputComponentView.className = inputComponentView.className.replace(
            'error', 'noError');
        oldComponentView = inputComponentView.value;
        inputComponentView.value = '';
    }
    var selectboxComponentView = document.getElementById(
        'selectbox_componentView_' + lineNumber);
    for (var i = selectboxComponentView.length; i > 0; i--) {
        selectboxComponentView.options[i - 1] = null;
    }
    var artnumber = document.getElementById('text_artnumber_' + lineNumber).value;
    if (artnumber && articleData[artnumber]) {
        for (var tmpArticleSize in articleData[artnumber]) {
            if (articleData[artnumber][tmpArticleSize].componentSpec ==
                oldComponentView) {
                oldArticleSize = tmpArticleSize;
                break;
            }
        }
        for (var articleSize in articleData[artnumber]) {
            if (typeof(articleData[artnumber][articleSize]) == 'object') {
                if (oldArticleSize != null && articleSize == oldArticleSize) {
                    oldComponentViewStillAvailable = true;
                }
                newoption = new Option(articleData[artnumber][articleSize].componentSpec,
                    articleSize);
                selectboxComponentView.options[selectboxComponentView.length] =
                    newoption;
            }
        }
    }
    if (oldComponentViewStillAvailable) {
        inputComponentView.value = oldComponentView;
    } else {
        if (selectboxComponentView.length == 1 || (selectboxComponentView.length >
                0 && (!inputComponentView.value))) {
            inputComponentView.value = selectboxComponentView.options[0].text;
        }
    }
    if (inputComponentView.value == '-') {
        document.getElementById('text_componentView_' + lineNumber).readOnly =
            true;
    }
    return updateGravure(lineNumber, amountChange);
}

function updateStaticFields(lineNumber) {
    var returnValue = false;
    var artnumber = document.getElementById('text_artnumber_' + lineNumber).value;
    var componentSpec = document.getElementById('text_componentView_' +
        lineNumber).value;
    var articleSize = null;
    var artSizeField = document.getElementById('text_size_' + lineNumber);
    var amountField = document.getElementById('text_amount_' + lineNumber);
    var maxAllowed = document.getElementById('text_maxallowedquantity_' +
        lineNumber);
    var amountNum = '';
    var description = '';
    var imageURL = clearGif;
    var imageHeight = 1;
    var productlink = '#';
    var singlePrice = '';
    var totalPrice = '';
    var stocktype = '';
    var stocktypecode = '';
    var stockunit = '';
    var stocktypeHTML = '';
    var weeksToDelivery = 0;
    var manufacturer = '';
    var reducePrice = '';
    var baseUnitPriceText = '';
    var maxallowedquantity = 0;
    if (artnumber && articleData[artnumber]) {
        for (var tmpArticleSize in articleData[artnumber]) {
            if (articleData[artnumber][tmpArticleSize].componentSpec ==
                componentSpec) {
                articleSize = tmpArticleSize;
                break;
            }
        }
        imageURL = articleData[artnumber]['imageURL'];
        imageHeight = 40;
        productlink = 'product/' + articleData[artnumber]['productPk'] +
            '/group/' + articleData[artnumber]['groupPk'] + productURL;
    }
    if (artnumber) {
        var artNum = artnumber;
        if (artnumber.length > 10) {
            artNum = artnumber.substring(1);
        }
        var artNb1 = $('#text_artnumber_' + lineNumber);
        artNb1.val(artNum);
    }
    if (artnumber && articleData[artnumber] && articleData[artnumber][
            articleSize
        ]) {
        if (articleData[artnumber][articleSize]['variation'] > 0) {
            description = description + '<BR />' + articleData[artnumber][
                articleSize
            ]['variation'];
        }
        singlePriceNum = (parseFloat(articleData[artnumber][articleSize][
            'price'
        ])).toFixed(2);
        reducePriceNum = (parseFloat(articleData[artnumber][articleSize][
            'reduceprice'
        ])).toFixed(2);
        amountNum = parseInt(amountField.value);
        maxallowedquantity = parseInt(articleData[artnumber][articleSize][
            'maxallowedquantity'
        ]);
        if (isNaN(amountNum) || amountNum <= 0) {
            amountNum = 1;
        } else if (amountNum > 100) {
            amountNum = 100;
        }
        amountField.className = amountField.className.replace('formError',
            'noError');
        artSizeField.value = articleData[artnumber][articleSize]['size'];
        if (isNaN(singlePriceNum)) {
            singlePrice = '';
        } else {
            singlePrice = singlePriceNum + ' ' + currency;
        }
        if (isNaN(singlePriceNum)) {
            totalPrice = '';
        } else {
            totalPrice = (singlePriceNum * amountNum).toFixed(2) + ' ' +
                currency;
        }
        if (isNaN(reducePriceNum) || reducePriceNum == 0) {
            reducePrice = '';
            $('#price_container_' + lineNumber).removeClass('reduced');
        } else {
            reducePrice = reducePriceNum + ' ' + currency;
            $('#price_container_' + lineNumber).addClass('reduced');
        }
        if (articleData[artnumber][articleSize]['reducetype'] == 'uvp') {
            $('#uvp_container_' + lineNumber).show();
        } else {
            $('#uvp_container_' + lineNumber).hide();
        }
        description = articleData[artnumber][articleSize]['text'];
        manufacturer = articleData[artnumber][articleSize]['manufacturer'];
        stocktype = stockTypeCodes[articleData[artnumber][articleSize][
            'stocktype'
        ]];
        stocktypecode = articleData[artnumber][articleSize]['stocktype'];
        stockunit = articleData[artnumber][articleSize]['stockunit'];
        weeksToDelivery = articleData[artnumber][articleSize]['weeksToDelivery'];
        if (typeof(articleData[artnumber][articleSize]['baseUnitPrice']) !=
            'undefined') {
            baseUnitPriceText = '<br />' + llBaseUnitPrice + ': ';
            var baseUnitPrice = articleData[artnumber][articleSize][
                'baseUnitPrice'
            ].toFixed(2).replace('.', ',');
            var baseUnitParts = articleData[artnumber][articleSize]['baseUnit']
                .split(' ');
            var baseUnitAmount = baseUnitParts[0];
            var baseUnit = baseUnitParts[1];
            if (typeof(unitMappings[baseUnit]) != 'undefined') {
                baseUnit = unitMappings[baseUnit];
            }
            baseUnitPriceText += baseUnitAmount + '&nbsp;' + baseUnit + ' = ' +
                baseUnitPrice + '&nbsp;' + currency;
        }
    }
    if (stocktypecode != '' && stocktype != '') {
        if (stocktypecode == 2 && weeksToDeliveryInfo != '' && weeksToDelivery >
            0) {
            stocktype = weeksToDeliveryInfo.replace('###weeksToDelivery###',
                weeksToDelivery);
        }
        stocktypeHTML = '<span class="stock stock_' + stocktypecode + '">' +
            stocktype + '</span>';
    }
    if (manufacturer == null) {
        manufacturer = '';
    }
    document.getElementById('text_amount_' + lineNumber).value = amountNum;
    document.getElementById('label_singleprice_' + lineNumber).innerHTML =
        singlePrice.replace('.', ',');
    document.getElementById('label_reduceprice_' + lineNumber).innerHTML =
        reducePrice.replace('.', ',');
    document.getElementById('label_totalprice_' + lineNumber).innerHTML =
        totalPrice.replace('.', ',');
    document.getElementById('label_manufacturer_' + lineNumber).innerHTML =
        manufacturer;
    document.getElementById('label_description_' + lineNumber).innerHTML =
        description;
    document.getElementById('label_stocktype_' + lineNumber).innerHTML =
        stocktypeHTML;
    document.getElementById('label_stockunit_' + lineNumber).innerHTML =
        stockunit;
    document.getElementById('productlink_' + lineNumber).value = productlink;
    document.getElementById('baseUnitPrice_' + lineNumber).innerHTML =
        baseUnitPriceText;
    document.getElementById('label_reduceprice_' + lineNumber).innerHTML =
        reducePrice.replace('.', ',');
    if (maxAllowed) {
        maxAllowed.value = maxallowedquantity;
    }
    if (manufacturer != '') {
        document.getElementById('label_manufacturer_' + lineNumber).style.display =
            'block';
    }
    if (javaErrorcheck) {
        returnValue = errorCheck(lineNumber);
    }
    return returnValue;
}

function errorCheck(lineNumber) {
    var error = false;
    var returnValue = false;
    var errorLabel = "";
    var artnumber = document.getElementById('text_artnumber_' + lineNumber).value;
    var componentSpec = document.getElementById('text_componentView_' +
        lineNumber).value;
    var articleSize = '';
    var classname = "";
    if (artnumber.length > 0) {
        if (articleData[artnumber]) {
            for (var tmpArticleSize in articleData[artnumber]) {
                if (articleData[artnumber][tmpArticleSize].componentSpec ==
                    componentSpec) {
                    articleSize = tmpArticleSize;
                    break;
                }
            }
            classname = document.getElementById('text_artnumber_' + lineNumber)
                .className.replace("error", "noError");
            document.getElementById('text_artnumber_' + lineNumber).className =
                classname;
            $('#ordernb1_' + lineNumber).removeClass("error").addClass(
                "noError");
            if (articleSize.length > 0) {
                if (articleData[artnumber][articleSize]) {
                    classname = document.getElementById('text_componentView_' +
                        lineNumber).className.replace("error", "noError");
                    document.getElementById('text_componentView_' + lineNumber)
                        .className = classname;
                } else {
                    errorLabel = 'articleId';
                }
            }
        } else {
            errorLabel = 'artnumber';
        }
    }
    if (errorLabel.length > 0) {
        var errorTextKey = errorLabel;
        if (errorLabel != 'soldout') {
            $('#text_' + errorLabel + '_' + lineNumber).removeClass("noError").addClass(
                "error");
        }
        if (articleData['not_online']) {
            errorTextKey = 'orderonline';
        }
        document.getElementById('error_' + lineNumber).innerHTML = errorTexts[
            errorTextKey];
        document.getElementById('errorbox_' + lineNumber).className =
            ' errorVisible';
        if (errorLabel == 'artnumber') {
            $('#ordernb1_' + lineNumber).removeClass("noError").addClass(
                "error");
        }
        returnValue = false;
    } else {
        document.getElementById('errorbox_' + lineNumber).className =
            ' errorHidden';
        $('#ordernb1_' + lineNumber).removeClass("error").addClass("noError");
        returnValue = true;
    }
    if (oneOrderlineHasNoErrors()) {
        $('#addToBasketEnabled').show();
        $('#addToBasketDisabled').hide();
        $('#moreInputFields').show();
    } else {
        $('#addToBasketEnabled').hide();
        $('#addToBasketDisabled').show();
        $('#moreInputFields').hide();
    }
    return returnValue;
}

function fieldOnFocus(field, lineNumber) {
    var tmpValue = document.getElementById('text_' + field + '_' + lineNumber).value;
    if (tmpValue != '-') {
        document.getElementById('selectbox_' + field + '_' + lineNumber).selectedIndex =
            0;
        setDivVisible(field + '_' + lineNumber);
        setTimeout(function() {
            document.getElementById('selectbox_' + field + '_' +
                lineNumber).focus();
        }, 100);
    }
}

function fieldOnBlur(field, lineNumber) {
    setDivInvisible(field + '_' + lineNumber);
}

function fieldOnChange(field, self, lineNumber) {
    var index = self.selectedIndex;
    if (index >= 0) {
        document.getElementById('text_' + field + '_' + lineNumber).value =
            self.options[index].text;
    };
}

function fieldOnClick(field, lineNumber, nextFocus) {
    fieldOnBlur(field, lineNumber);
    var nextField = document.getElementById(nextFocus);
    if (nextField) {
        setTimeout(function() {
            nextField.focus();
        }, 100);
    }
}

function addOrderline(lineNumber) {
    var numberOfOrderlines = parseInt(document.getElementById(
        'numberOfOrderlines').value);
}

function showError(lineNumber) {
    $('#ordernb1_' + lineNumber).addClass('error');
    $('#ordernb1_' + lineNumber).removeClass('noError');
}

function hideError(lineNumber) {
    $('#ordernb1_' + lineNumber).removeClass('error');
}

function retrieveArticleData(lineNumber, forceCall, amountChange) {
    var force = forceCall ? true : false;
    var artnumber = document.getElementById('text_artnumber_' + lineNumber).value;
    var amount = document.getElementById('text_amount_' + lineNumber).value;
    ajaxCall = false;
    if (artnumber.length > 0) {
        if (typeof(articleData[artnumber]) == 'object') {} else {
            ajaxCall = useAjax;
        }
    }
    if (ajaxCall || force) {
        var url =
            'http://baby-walz.de/typo3conf/ext/dmc_mb3_orderform/ajaxGetArticleData.php';
        var data = 'artnumber=' + artnumber + '&clientPk=' + clientPk +
            '&languagePk=' + languagePk + '&lineNumber=' + lineNumber + '&rnd=' +
            Math.random() + '&amount=' + amount;
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: function(result) {
                response(result, amountChange);
            },
            complete: function() {
                $('#ordernb1_' + lineNumber).data('busy', false);
            }
        });
    } else {
        $('#ordernb1_' + lineNumber).data('busy', false);
        updateComponentView(lineNumber, amountChange);
        setTimeout(function() {
            document.getElementById('text_componentView_' + lineNumber)
                .focus();
        }, 100);
    }
}

function response(result, amountChange) {
    var artnumber = result['artnumber'];
    var lineNumber = result['lineNumber'];
    var adCode = '';
    articleData['not_online'] = false;
    if (result['status'] == 'found') {
        $('#ordernb1_' + lineNumber).val(getFormattedArtNo(result['artnumber']));
        hideError(lineNumber);
        articleData[artnumber] = result['properties'];
    } else if (result['status'] == 'not_online') {
        articleData['not_online'] = true;
    } else {
        showError(lineNumber);
    }
    document.getElementById('text_artnumber_' + lineNumber).value = artnumber;
    updateComponentView(lineNumber, amountChange);
    if (amountChange == false) {
        setTimeout(function() {
            document.getElementById('text_componentView_' + lineNumber)
                .focus();
        }, 100);
        fieldOnFocus('componentView', lineNumber);
    }
}

function blockPriceInfoResponse(blockPriceresult, element, artnumber) {
    if (blockPriceresult['status'] == 'found') {
        blockPriceList = blockPriceresult['blockPrice'];
    }
    if (typeof blockPriceList != 'undefined') {
        content = "<table><tr><td colspan=3 bgcolor=white>" + blockPriceTitle +
            "</td></tr><tr><td>" + hintMinQtyText + "</td><td>" +
            hintMaxQtyText + "</td><td>" + hintPriceText + "</td></tr>";
        for (var articlePk in blockPriceList[0]) {
            for (var i in blockPriceList[0][articlePk]) {
                minQty = blockPriceList[0][articlePk][i]['minQuantity'];
                maxQty = blockPriceList[0][articlePk][i]['maxQuantity'];
                blockPrice = blockPriceList[0][articlePk][i]['price'];
                content = content + "<tr><td>" + minQty + "</td><td>" + maxQty +
                    "</td><td>" + blockPrice + "</td></tr>";
            }
        }
        content = content + "</table>";
        if (content != '' && blockPriceList != '' && artnumber != '') {
            showToolTip(element, content, "", true);
        }
    }
}

function productInfoPopup(productlinkId, titleId) {
    var popupurl = document.getElementById(productlinkId).value;
    var title = document.getElementById(titleId);
    if (title) {
        title = title.textContent;
    } else {
        title = '';
    }
    openJQueryPopupWindow(popupurl, title,
        'width=705,height=510,scrollbars=yes,resizable=no,toolbar=no,status=no,directories=no,menubar=no,location=no'
    )
}

function nextField(e, source, dest, fieldlen) {
    if (!e) var e = window.event;
    if (e.keyCode > 32) {
        if (source.value.length == fieldlen) {
            dest.value = '';
            setTimeout(function() {
                dest.focus();
            }, 100);
        }
    }
}

function checkArtNumberField(e, artNumberFieldId, lineNumber, forceAjaxCall,
    amountChange) {
    var forceAjaxCall = forceAjaxCall ? true : false;
    var artNb1 = document.getElementById('text_artnumber_' + lineNumber);
    var artNb = artNb1.value;
    var artNumberField = document.getElementById(artNumberFieldId);
    if (!e) var e = window.event;
    if (e.keyCode > 32) {
        if (artNumberField && artNb.length == 10) {
            artNumberField.value = artNb;
            addOrderline(lineNumber)
            retrieveArticleData(lineNumber, forceAjaxCall, amountChange)
        }
    }
}

function checkOrderlineFields(orderlineNum, caller) {
    if (!articleData || articleData['not_online']) {
        return false;
    }
    var confObj = {
        orderlineSelector: '.orderLineDirektinputs',
        gravureField: 'orderlineGravureForm',
        gravureFieldText: 'orderlineGravureText',
        gravureFieldCount: 0,
        gravureFieldLength: 0,
        amountField: 'text_amount',
        yardWareValue: '',
        yardWareField: 'label_stockunit',
        maxAllowed: 'text_maxallowedquantity_' + orderlineNum
    }
    onb1 = document.getElementById('ordernb1_' + orderlineNum);
    if (onb1.value.length > 8) {
        artnumber = onb1;
    } else {
        onb1.className = 'error';
        document.getElementById('error_' + orderlineNum).innerHTML = errorTexts[
            'artnumber'];
        document.getElementById('errorbox_' + orderlineNum).className =
            ' errorVisible';
        return false;
    }
    return checkItem(confObj, caller);
}

function checkItem(confObj, caller) {
    var returnValue = true;
    var messages = '';
    var headline = '';
    var callbackNo;
    var callbackYes = function() {
        caller();
    };
    var confirmTxtYes = 'Bestätigen';
    var confirmTxtNo = 'Abbrechen';
    var orderlineSelector = 'body';
    var gravureError = false;
    $(confObj.orderlineSelector).each(function() {
        var num = '';
        var gravureFieldCount = confObj.gravureFieldCount;
        var gravureFieldLength = confObj.gravureFieldLength;
        if (confObj.orderlineSelector != '') {
            num = '_' + $(this).find('.jsLineNo').attr('value');
            if (document.getElementById('orderlineGravureHeadline' +
                    num).value > 0 && document.getElementById(
                    'orderlineGravureLength' + num).value > 0) {
                gravureFieldCount = parseInt(document.getElementById(
                    'orderlineGravureHeadline' + num).value);
                gravureFieldLength = parseInt(document.getElementById(
                    'orderlineGravureLength' + num).value);
            }
        }
        var gravureText = '';
        var gravureTextPlain = '';
        var gravureTextArr = new Array();
        var gravureError = false;
        if (typeof $('#' + confObj.gravureField + num).get(0) !=
            'undefined' && gravureFieldCount > 0 && gravureFieldLength >
            0) {
            for (var i = 0; i < gravureFieldCount; i++) {
                var iptValue = document.getElementById(confObj.gravureFieldText +
                    num + '_' + i).value;
                gravureTextArr[i] = dmc.Utils.trimString(iptValue);
            }
            gravureTextPlain = gravureTextArr.join('');
            gravureText = gravureTextArr.join(textGravureSeparator);
            if (!Utils.checkPersonalChars(gravureTextPlain) ||
                gravureTextPlain.search(textGravureSeparator) != -1) {
                headline = noticeGravureHeadline;
                messages += noticeGravureError + "<br />";
                returnValue = false;
                gravureError = true;
            } else {
                $('#' + confObj.gravureField + num).val(gravureText);
            }
            if (gravureTextPlain == "" && !gravureError) {
                messages += noticeGravureNo + "<br />";
                if (!confirmed) {
                    returnValue = false;
                } else {
                    $('#' + confObj.gravureField + num).val(
                        textGravureSeparator);
                }
            }
        }
        var amountObj = document.getElementById(confObj.amountField +
            num);
        var yardWare = confObj.yardWareValue;
        if (confObj.yardWareField && confObj.yardWareField != null) {
            yardWare = document.getElementById(confObj.yardWareField +
                num).innerHTML;
        }
        if (amountObj && !gravureError) {
            var splitText;
            if (yardWare && yardWare == "M") {
                headline = noticeYardWareHeadline;
                splitText = noticeYardWare.split('||');
                messages += splitText[0] + (amountObj.value * 10) +
                    splitText[1] + amountObj.value + splitText[2] +
                    "<br />";
            } else if (amountObj.value >= 10) {
                headline = noticeAmountHeadline;
                splitText = noticeAmount.split('||');
                messages += splitText[0] + amountObj.value + splitText[
                    1] + "<br />";
            }
            if ((yardWare && yardWare == "M") || (amountObj.value >= 10)) {
                callbackNo = function() {
                    if (confObj.orderlineSelector != '') {
                        $('.orderAmount').val(1);
                    } else {
                        amountObj.value = 1;
                    }
                    amountObj.focus();
                };
            }
        }
    });
    if ($('body').data('dmc_mb3_product.yes') && $('body').data(
            'dmc_mb3_product.no')) {
        confirmTxtYes = $('body').data('dmc_mb3_product.yes');
        confirmTxtNo = $('body').data('dmc_mb3_product.no');
    } else if ($('body').data('dmc_mb3_orderform.yes') && $('body').data(
            'dmc_mb3_orderform.no')) {
        confirmTxtYes = $('body').data('dmc_mb3_orderform.yes');
        confirmTxtNo = $('body').data('dmc_mb3_orderform.no');
    } else if (personalizationSubmit && personalizationChange) {
        confirmTxtYes = personalizationSubmit;
        confirmTxtNo = personalizationChange;
    }
    if (messages != '') {
        var textConf = {
            headline: headline,
            text: messages,
            yes: confirmTxtYes,
            no: confirmTxtNo
        }
        if (gravureError) {
            textConf.no = '';
            alertLayerConfirm(textConf, null, null);
            returnValue = false;
        } else {
            if (!confirmed) {
                alertLayerConfirm(textConf, callbackYes, callbackNo);
                returnValue = false;
                return returnValue;
            }
        }
    }
    return returnValue;
}

function updateGravure(lineNumber, amountChange) {
    if (amountChange != true) {
        var artnumber = document.getElementById('text_artnumber_' + lineNumber)
            .value;
        var componentSpec = document.getElementById('text_componentView_' +
            lineNumber).value;
        var articleSize = null;
        var gravureInput = document.getElementById('orderlineGravureInput_' +
            lineNumber);
        var gravureMessage = document.getElementById('orderlineGravureMessage_' +
            lineNumber);
        var gravureForm = document.getElementById('orderlineGravureForm_' +
            lineNumber);
        var gravureInfo = document.getElementById('orderlineGravureInfo_' +
            lineNumber);
        var gravureLength = document.getElementById('orderlineGravureLength_' +
            lineNumber);
        var gravureHeadline = document.getElementById(
            'orderlineGravureHeadline_' + lineNumber);
        var gravureFieldCount = 0;
        var gravureFieldLength = 0;
        if (artnumber.length > 0 && articleData[artnumber]) {
            for (var tmpArticleSize in articleData[artnumber]) {
                if (articleData[artnumber][tmpArticleSize].componentSpec ==
                    componentSpec) {
                    articleSize = tmpArticleSize;
                    break;
                }
            }
        }
        if (articleData[artnumber] && articleData[artnumber][articleSize]) {
            gravureFieldLength = parseInt(articleData[artnumber][articleSize][
                'gravurelength'
            ]);
            gravureFieldCount = parseInt(articleData[artnumber][articleSize][
                'gravureheadline'
            ]);
        }
        gravureLength.value = gravureFieldLength;
        gravureHeadline.value = gravureFieldCount;
        actualFieldCount = gravureInput.getElementsByTagName('input').length;
        if (gravureFieldCount != actualFieldCount || articleData['status'] !=
            'found') {
            gravureInput.innerHTML = '';
            gravureMessage.innerHTML = '';
            gravureInput.style.visibility = 'hidden';
            gravureInput.style.display = 'none';
            gravureInfo.style.visibility = 'hidden';
            gravureInfo.style.display = 'none';
            if (gravureMessage && gravureFieldLength > 0 && gravureFieldCount >
                0) {
                var mParts = gravureMessageBefore.split('||');
                var newText = mParts[0] + gravureFieldLength + mParts[1];
                gravureMessage.innerHTML = newText;
            }
            if (gravureFieldCount > 0 && gravureFieldLength > 0) {
                for (var i = 0; i < gravureFieldCount; i++) {
                    var br = document.createElement('br');
                    var ipt = document.createElement('input');
                    ipt.setAttribute('maxLength', gravureFieldLength);
                    ipt.setAttribute('id', 'orderlineGravureText_' + lineNumber +
                        '_' + i, true);
                    $(ipt).addClass('txt gravurTxt');
                    ipt.value = '';
                    if (gravureForm.value) {
                        var metadata = gravureForm.value;
                        var rows = metadata.split(textGravureSeparator);
                        if (!rows[i] || rows[i] == undefined) {
                            ipt.value = '';
                        } else {
                            ipt.value = rows[i];
                        }
                    }
                    ipt.name = 'orderlineGravureText_' + lineNumber + '[' + i +
                        ']';
                    gravureInput.appendChild(ipt);
                    gravureInput.appendChild(br);
                }
                gravureInput.style.visibility = 'visible';
                gravureInput.style.display = '';
                gravureInfo.style.visibility = 'visible';
                gravureInfo.style.display = '';
            }
        }
    }
    return updateStaticFields(lineNumber);
}

function checkArtNumber(linenumber) {
    if ($('#ordernb1_' + linenumber).val() == '') {
        $('#text_artnumber_' + linenumber).val('');
        retrieveArticleData(linenumber, false, false);
        $('#ordernb1_' + linenumber).removeClass('error');
        if (oneOrderlineHasNoErrors()) {
            $('#addToBasketEnabled').show();
            $('#addToBasketDisabled').hide();
            $('#moreInputFields').show();
        } else {
            $('#addToBasketEnabled').hide();
            $('#addToBasketDisabled').show();
            $('#moreInputFields').hide();
        }
    }
}
$(document).ready(function() {
    var url = $('#metanavi_a18204').attr('href');
    $('#metanavi_a18204').attr('href', url + '#enable');
    var myurl = document.URL;
    var mysearch = myurl.search(/#enable/);
    if (mysearch != -1) {
        var $shoppingBasketFormSubmitButton = $(
            '#jsFirstShoppingBasketFormSubmitButton');
        if ($shoppingBasketFormSubmitButton.size() > 0) {
            $shoppingBasketFormSubmitButton.css('display', 'none');
        }
    }
    $("[id^='ordernb1_']").bind({
        keyup: function(e) {
            var el = $(this);
            if (el.val().match(exprSearchAuto)) {
                orderFormValidateSubmit(el, false);
            } else if (e.keyCode == 13) {
                orderFormValidateSubmit(el, true);
            }
        },
        blur: function() {
            var el = $(this);
            orderFormValidateSubmit(el, true);
        }
    });
});
var orderFormValidateSubmit = function(el, finishedInput) {
    var val = el.attr('value');
    var lineNumber = el.attr('id').split('_')[1];
    if (val.match(exprSearchAll)) {
        val = val.replace(/^0/g, '').replace(/\./g, '');
        $('#text_artnumber_' + lineNumber).val(val);
        el.val(getFormattedArtNo(val));
        addOrderline(lineNumber);
        if (!el.data('busy')) {
            el.data('busy', true);
            retrieveArticleData(lineNumber, false, false);
        }
    } else if (finishedInput) {
        if (val == '') {
            $('#text_artnumber_' + lineNumber).attr('value', '');
            checkArtNumber(lineNumber);
        }
    }
};

function getFormattedArtNo(artNo) {
    var artNoLength = artNo.length;
    artNo = (artNoLength == 7 || artNoLength == 10 ? artNo : '0' + artNo);
    var returnValue = artNo.substr(0, 4) + '.' + artNo.substr(4, 3);
    if (artNoLength > 8) {
        returnValue = returnValue + '.' + artNo.substr(7, 3);
    }
    return returnValue;
}

function isIOSDevice() {
    returnValue = false;
    var userAgent = navigator.userAgent.toLowerCase();
    var deviceUAs = ['iphone', 'ipod', 'ipad'];
    for (var i = 0; i < deviceUAs.length; i++) {
        if (userAgent.search(deviceUAs[i]) > -1) {
            returnValue = true;
            break;
        }
    }
    return returnValue;
}

function addArticle(uid, id, listname) {
    var form = document.getElementById(listname + 'Form_' + uid);
    var listArticlePk = document.getElementById(listname + 'ArticlePk_' + uid);
    var listProductPk = document.getElementById(listname + 'ProductPk_' + uid);
    var notepadGravure = document.getElementById(listname + 'Gravure_' + uid);
    var listAmount = document.getElementById(listname + 'Amount_' + uid);
    var amountForm = document.getElementById('productAmountForm_' + uid);
    if (!product01) {
        var product01 = new dmc.WALZ.Product({
            'selfUID': uid
        });
        product01 = product01.getInstance();
    }
    var currentArticle = product01.getCurrentArticle();
    var currentArticleVO = product01.dataArticles[currentArticle.artNumber][
        currentArticle.artSize
    ];
    var gravureFieldCount = parseInt(currentArticleVO.gravureHeadline);
    var gravureFieldLength = parseInt(currentArticleVO.gravureLength);
    var gravureTextArray = [];
    if (gravureFieldCount > 0 && gravureFieldLength > 0) {
        for (var i = 0; i < gravureFieldCount; i++) {
            gravureTextArray.push($(product01.parentContainerObj).find('#' +
                product01.fieldGravureText + '_' + i).val());
        }
        if (typeof textGravureSeparator == 'undefined') {
            var textGravureSeparator = '###';
        }
    }
    var amount = 0;
    if (amountForm) {
        if (amountForm.nodeName == 'SELECT') {
            amount = amountForm.options[amountForm.selectedIndex].value;
        } else if (amountForm.nodeName == 'INPUT' && (amountForm.type == 'text' ||
                amountForm.type == 'tel' || amountForm.type == 'hidden')) {
            amount = amountForm.value;
        }
    }
    var artPk = product01.getCurrentArticlePk();
    if (amount == "") {
        if (blockPriceConf[uid][artPk][0]) {
            amount = blockPriceConf[uid][artPk][0]['minQuantity'];
        } else {
            amount = 1;
        }
    }
    if (form && listArticlePk && listProductPk && notepadGravure && amount > 0) {
        listArticlePk.value = artPk;
        listProductPk.value = id;
        notepadGravure.value = gravureTextArray.join(textGravureSeparator);
        listAmount.value = amount;
        form.submit();
    } else if (amount < 1 || isNaN(parseInt(amount))) {
        alert(errorAmountText);
    }
}
var dmc_mb3_notepadcached = {
    decode: function(data) {
        var lsRegExp = /\+/g;
        return unescape(String(data).replace(lsRegExp, " "));
    }
}

function fillNotepadWithData(notepadAmountContainerId,
    notepadArticleAmountContainerId, tipText) {
    var notepadArticlesAmountContainer = document.getElementById(
        notepadArticleAmountContainerId);
    var notepadAmountContainer = document.getElementById(
        notepadAmountContainerId);
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data && typeof data.notepad != 'undefined') {
            if (notepadArticlesAmountContainer && typeof data.notepad.articlesAmount !=
                'undefined') {
                notepadArticlesAmountContainerValue = dmc_mb3_notepadcached.decode(
                    data.notepad.articlesAmount);
                notepadArticlesAmountContainerValue = htmlEntities(
                    notepadArticlesAmountContainerValue);
                if (notepadArticlesAmountContainer) {
                    notepadArticlesAmountContainer.innerHTML =
                        notepadArticlesAmountContainerValue;
                }
            }
            if (notepadAmountContainer && typeof data.notepad.notepadAmount !=
                'undefined') {
                notepadAmountContainerValue = dmc_mb3_notepadcached.decode(data
                    .notepad.notepadAmount);
                notepadAmountContainerValue = htmlEntities(
                    notepadAmountContainerValue);
                if (notepadAmountContainer) {
                    notepadAmountContainer.innerHTML =
                        notepadAmountContainerValue;
                }
            }
            if (data.notepad.notepadAddStatus == 1) {
                showToolTip(notepadAmountContainerId, tipText);
            }
            resetNotepadCookie();
        }
    }
}

function resetNotepadCookie() {
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data) {
            data.notepad.notepadAddStatus = "0";
            cookieDataUpdated = JSON.stringify(data);
            cookie_set('mb3pc', cookieDataUpdated, '', '/');
        }
    }
}

function isNotepadEmpty() {
    var cookieData = cookie_get('mb3pc');
    var retval = true;
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data) {
            if (typeof data.notepad != 'undefined' && data.notepad.articlesAmount !=
                0) {
                retval = false;
            }
        }
    }
    return retval;
}

function checkFieldsList(uid, id, variation, size, color, caller, listname) {
    var confObj = {
        orderlineSelector: '',
        gravureField: listname + 'Gravure_' + uid,
        gravureFieldText: 'productGravureText_' + uid + '_' + id,
        gravureFieldCount: parseInt(productConf[uid][id]['articles'][
            variation
        ][size][color]['gravureText']),
        gravureFieldLength: parseInt(productConf[uid][id]['articles'][
            variation
        ][size][color]['gravureLength']),
        amountField: 'productAmountForm_' + uid + '_' + id,
        yardWareValue: productConf[uid][id]['articles'][variation][size][
            color
        ]['stockUnit'],
        yardWareField: null,
        maxAllowed: productConf[uid][id]['articles'][variation][size][color]
            ['maxAllowedQuantity']
    }
    return dmc.WALZ.Product.CheckFields(confObj, caller);
}

function addToListSubmit(uid, id, target, popup, url, popupParams, listname) {
    if (typeof product01 == "undefined" && typeof selfUID != "undefined") {
        var product01 = new dmc.WALZ.Product({
            "selfUID": selfUID
        });
    }
    product01 = product01.getInstance();
    var currentArticle = product01.getCurrentArticle();
    var currentArticleVO = product01.dataArticles[currentArticle.artNumber][
        currentArticle.artSize
    ];
    var callbackYes = function() {
        product01.addToBasketParams.confirmed = true;
        addToListSubmit(uid, id, target, popup, url, popupParams, listname);
    };
    if ((typeof product01.addToBasketParams.confirmed != 'undefined' &&
            product01.addToBasketParams.confirmed == true) || product01.checkFields(
            currentArticleVO,
            function() {}, callbackYes)) {
        var targetContainer = appendTargetContainer();
        var form = $('#' + listname + 'Form_' + uid);
        form.attr('action', url);
        form.attr('target', 'myWalzFrame');
        addArticle(uid, id, listname);
        setFrameData(listname, targetContainer);
    }
}

function addToRecommendList(uid, popupParams) {
    var paramObj = Utils.ParsePopupParams(popupParams);
    alertLayer('iframe', 'about:blank', '', 700, 700, paramObj.Scrolling, '',
        true);
    setTimeout(function() {
        $('#addToRecommendAction').attr('name',
            'dmc_mb3_orderlinelist_pi1[' + uid +
            '][action][recommend]');
        var form = $('#dmc_mb3_notepad_pi1_' + uid + '_form');
        form.attr('target', $('#fancybox-frame').attr('name'));
        form.submit();
        $('#addToRecommendAction').attr('name', '');
        form.attr('target', '');
    }, 300);
}

function addToCompareList(uid) {
    var itemsArr = new Array();
    $('#addToCompareAction').attr('name', 'dmc_mb3_orderlinelist_pi1[' + uid +
        '][action][compare]');
    $('#clickedArticles').attr('name', 'dmc_mb3_orderlinelist_pi1[' + uid +
        '][selectedItems]');
    $('.comparecbox').each(function(_, element) {
        if ($(element).attr('checked') != "") {
            itemsArr.push($(element).attr('value'));
        }
    });
    $('#clickedArticles').attr('value', itemsArr);
    var targetContainer = appendTargetContainer();
    var form = $('#dmc_mb3_notepad_pi1_' + uid + '_form');
    form.attr('target', 'myWalzFrame');
    form.submit();
    setFrameData('comparelist', targetContainer);
}

function createOnArticleChangedHandlerNotepadLink(uid, urlRatingsDummy,
    urlRankingDummy, popupParams) {
    return function(uid, productObj, currentArticleVO) {
        var $ = jQuery;
        var inNotepad = productObj.dataArticles[currentArticleVO.artNumber]
            [currentArticleVO.artSize].inNotepad;
        if (inNotepad != '') {
            $('#notepadLink > a').addClass('active');
            $('#notepadLink > a').html($('body').data(
                'dmc_mb3_product.added_to_notepad'));
        } else {
            $('#notepadLink > a').removeClass('active');
            $('#notepadLink > a').html($('body').data(
                'dmc_mb3_product.add_to_notepad'));
        }
    };
}

function createOnArticleChangedHandlerCompareListLink(uid, urlRatingsDummy,
    urlRankingDummy, popupParams) {
    return function(uid, productObj, currentArticleVO) {
        var $ = jQuery;
        var inCompareList = productObj.dataArticles[currentArticleVO.artNumber]
            [currentArticleVO.artSize].inCompareList;
        if (inCompareList != '') {
            $('#recommendLink > a').addClass('active');
            $('#recommendLink > a').html($('body').data(
                'dmc_mb3_product.added_to_comparelist'));
        } else {
            $('#recommendLink > a').removeClass('active');
            $('#recommendLink > a').html($('body').data(
                'dmc_mb3_product.add_to_comparelist'));
        }
    };
}

function handleActionButtons(bname, idToHide, idToShow) {
    var atLeastOneSelected = false;
    $(bname).each(function(_, element) {
        if ($(element).attr('checked') != "") {
            atLeastOneSelected = true;
        }
    });
    if (atLeastOneSelected == true) {
        $(idToHide).hide();
        $(idToShow).show();
    } else {
        $(idToHide).show();
        $(idToShow).hide();
    }
}

function setFrameData(listname, tContainer) {
    Utils.CheckFrameContent(tContainer, function() {
        tContainer.remove();
        setUserDataFromCookie();
        $('.tnlMywalz').fadeIn('slow');
        $('#trigger_a18878').addClass('sfhover');
        $('#' + listname + 'Link > a').addClass('active');
        $('#' + listname + 'Link > a').html($('body').data(
            'dmc_mb3_product.added_to_notepad'));
        setTimeout(function() {
            $('.tnlMywalz').fadeOut('slow');
            $('#trigger_a18878').removeClass('sfhover');
        }, 4000);
    });
}

function appendTargetContainer() {
    var targetContainer = $('<iframe name="myWalzFrame"></iframe>');
    targetContainer.attr('src', 'about:blank');
    targetContainer.css('display', 'none');
    $('.tnlMywalz').append(targetContainer);
    return targetContainer;
}
$(document).ready(function() {
    handleActionButtons('.recommendcbox', '#recommendDisabled',
        '#recommendEnabled');
    handleActionButtons('.comparecbox', '#compareDisabled',
        '#compareEnabled');
    $('.recommendcbox').change(function() {
        handleActionButtons('.recommendcbox',
            '#recommendDisabled', '#recommendEnabled');
    });
    $('.comparecbox').change(function() {
        handleActionButtons('.comparecbox', '#compareDisabled',
            '#compareEnabled');
    });
});

function articleFeedbackLink(uid, id, url, popupParams) {
    var currentArticle = product01.getCurrentArticle();
    var artNumber = currentArticle.artNumber
    popupurl = url.replace('%s', artNumber);
    var paramObj = Utils.ParsePopupParams(popupParams);
    alertLayer('iframe', popupurl, '', paramObj.Height, paramObj.Width);
}

function backToFormView(ctype, uid) {
    var preview = document.getElementById('preview');
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]');
    if (preview) {
        preview.value = -1;
    }
    if (form) {
        form.submit();
    }
}

function cheaperProductFeedbackLink(uid, id, url, popupParams) {
    if (typeof popupParams != 'string' || popupParams == '') {
        popupParams =
            'scrollbars=yes,resizable=yes,toolbar=no,status=no,directories=no,menubar=no,location=no';
    }
    var currentArticle = product01.getCurrentArticle();
    var artNumber = currentArticle.artNumber
    popupurl = url.replace('%s', artNumber);
    var popup_cheaperProductFeedback = window.open(popupurl,
        'popup_cheaperProductFeedback', popupParams);
    popup_cheaperProductFeedback.focus();
}

function articleRecommendLink(uid, id, url, popupParams) {
    if (!product01) {
        var product01 = new dmc.WALZ.Product({
            'selfUID': uid
        });
        product01 = product01.getInstance();
    }
    var currentArticle = product01.getCurrentArticle();
    var popupurl = url.replace('%s', currentArticle.artNumber);
    var paramObj = Utils.ParsePopupParams(popupParams);
    alertLayer('iframe', popupurl, '', paramObj.Height, paramObj.Width);
}

function backToFormView(ctype, uid) {
    var preview = document.getElementById('preview');
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]');
    if (preview) {
        preview.value = -1;
    }
    if (form) {
        form.submit();
    }
}

function addRecipient() {
    var recipientamount = $("#recipientamount").val();
    recipientamount++;
    $("#recipient" + recipientamount).css("display", "block");
    $("#recipientamount").val(recipientamount);
    if (recipientamount == 15) {
        $("#morerecipients").css("display", "none");
    }
}

function pcoFormSetAction(ctype, uid, newAction) {
    var action = document.getElementById(ctype + '[' + uid + ']' +
        '[pcoAction]');
    if (action) {
        action.value = newAction;
    }
}
var updateSalutationDivs = function() {
    var isInitialCall = (arguments.length == 0);
    $('input[id^=salutation]').each(function(id, fieldSalutation) {
        var identifier = fieldSalutation.id.substr(10);
        var divPerson = $('#formFieldsForPerson' + identifier);
        var divCompany = $('#formFieldsForCompany' + identifier);
        var divCompany2 = $('#formFieldsForCompany2' + identifier);
        var divBirthday = $('#formFieldsForBirthday' + identifier);
        var fieldTitle = divPerson.find("[name$='[title]']");
        var fieldFirstName = divPerson.find("[name$='[firstname]']");
        var fieldLastName = divPerson.find("[name$='[lastname]']");
        var fieldCompany = divCompany.find("[name$='[company]']");
        var fieldContactPerson = divCompany.find('[id^=address2]');
        var fieldDay = divBirthday.find('[id^=birthday0]');
        var fieldMonth = divBirthday.find('[id^=birthday1]');
        var fieldYear = divBirthday.find('[id^=birthday2]');
        if (fieldContactPerson.size() == 0 && identifier !== '') {
            fieldContactPerson = $('#address2' + identifier);
        }
        if (divPerson.size() > 0 && divCompany.size() > 0 &&
            fieldFirstName.size() > 0 && fieldLastName.size() > 0 &&
            fieldCompany.size() > 0 && fieldContactPerson.size() >
            0) {
            var oldValCompany = fieldCompany.val();
            var oldValContactPerson = '';
            var oldValContactPersonCompany = fieldContactPerson.val();
            var oldValTitle = fieldTitle.val();
            var oldValFirstName = fieldFirstName.val();
            var oldValLastName = fieldLastName.val();
            var oldValDay = fieldDay.val();
            var oldValMonth = fieldMonth.val();
            var oldValYear = fieldYear.val();
            if (fieldSalutation.value == 5) {
                if (!isInitialCall) {
                    oldValContactPerson = fieldContactPerson.val();
                    fieldCompany.val(oldValCompany);
                    fieldContactPerson.val((oldValLastName == '') ?
                        oldValContactPerson : oldValLastName);
                    oldValTitle = fieldTitle.val();
                    oldValFirstName = fieldFirstName.val();
                    oldValLastName = fieldLastName.val();
                    oldValDay = fieldDay.val();
                    oldValMonth = fieldMonth.val();
                    oldValYear = fieldYear.val();
                }
                fieldTitle.val('');
                fieldLastName.val('');
                fieldFirstName.val('');
                fieldDay.val('');
                fieldMonth.val('');
                fieldYear.val('');
                divPerson.hide();
                divBirthday.hide();
                divCompany.show();
                if (divCompany2) {
                    divCompany2.show();
                }
            } else {
                if (!isInitialCall) {
                    fieldTitle.val(oldValTitle);
                    fieldFirstName.val(oldValFirstName);
                    oldValContactPersonCompany = fieldContactPerson
                        .val();
                    fieldLastName.val((oldValLastName == '') ?
                        oldValContactPersonCompany :
                        oldValLastName);
                    fieldDay.val(oldValDay);
                    fieldMonth.val(oldValMonth);
                    fieldYear.val(oldValYear);
                    oldValCompany = fieldCompany.val();
                    fieldContactPerson.val(oldValContactPerson);
                }
                fieldCompany.val('');
                if (identifier != '_shipaddr') {
                    fieldContactPerson.val('');
                }
                divCompany.hide();
                divPerson.show();
                divBirthday.show();
                if (divCompany2) {
                    divCompany2.hide();
                }
            }
        }
    });
}
$(document).ready(function() {
    $('.cbox').change(function() {
        var name = $(this).attr('name');
        $('input[name="' + name + '_hidden"]').val($(this).val());
    });
    $('.cbox').each(function(_, element) {
        if ($(element).attr('checked') != "") {
            var name = $(element).attr('name');
            $('input[name="' + name + '_hidden"]').val($(
                element).val());
        }
    });
    $('.cbox').change(updateSalutationDivs);
    updateSalutationDivs();
});
var loginFormSubmitFlag = false;
var logoutFormSubmitFlag = false;
var changePasswordSubmitFlag = false;
var autoLoginSubmitFlag = false;
var billingAddressSubmitFlag = false;
var deliveryAddressSubmitFlag = false;
var paymentTypeSubmitFlag = false;
var userProfileSubmitFlag = false;
var userNameSubmitFlag = false;
var deliveryTypeSubmitFlag = false;
var accountDeleteSubmitFlag = false;

function loginFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '_' + uid + '_form_login');
    if (loginFormSubmitFlag == false) {
        if (form) {
            loginFormSubmitFlag = true;
            form.submit();
        }
    }
}

function changePasswordFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[changePassword]');
    if (changePasswordSubmitFlag == false) {
        if (form) {
            changePasswordSubmitFlag = true;
            form.submit();
        }
    }
}

function autoLoginFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[changeAutoLogin]');
    if (autoLoginSubmitFlag == false) {
        if (form) {
            autoLoginSubmitFlag = true;
            form.submit();
        }
    }
}

function billingAddressFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[billingcustomer]');
    if (billingAddressSubmitFlag == false) {
        if (form) {
            billingAddressSubmitFlag = true;
            form.submit();
        }
    }
}

function deliveryAddressFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[deliverycustomer]');
    if (deliveryAddressSubmitFlag == false) {
        if (form) {
            deliveryAddressSubmitFlag = true;
            form.submit();
        }
    }
}

function deliveryAddressDelete(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[deliverycustomer]');
    if (form) {
        document.getElementById(ctype + '[' + uid + ']' + '[action]' +
            '[changeDeliveryCustomer]').value = "deleteDeliveryCustomer";
        form.submit();
    }
}

function deliveryAddressChangeName(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[deliverycustomer]');
    if (form) {
        document.getElementById(ctype + '[' + uid + ']' + '[action]' +
            '[changeDeliveryCustomer]').value = "loadDeliveryAddress";
        form.submit();
    }
}

function paymentTypeFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[paymenttype]');
    if (paymentTypeSubmitFlag == false) {
        if (form) {
            paymentTypeSubmitFlag = true;
            form.submit();
        }
    }
}

function deliveryTypeFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[deliverytype]');
    if (deliveryTypeSubmitFlag == false) {
        if (form) {
            deliveryTypeSubmitFlag = true;
            form.submit();
        }
    }
}

function userProfileFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[profile]');
    if (userProfileSubmitFlag == false) {
        if (form) {
            userProfileSubmitFlag = true;
            form.submit();
        }
    }
}

function logoutFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[logout]');
    if (logoutFormSubmitFlag == false) {
        if (form) {
            logoutFormSubmitFlag = true;
            form.submit();
        }
    }
}

function changeUserNameSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[changeUsername]');
    if (userNameSubmitFlag == false) {
        if (form) {
            userNameSubmitFlag = true;
            form.submit();
        }
    }
}

function accountDeleteFormSubmit(ctype, uid) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[accountDelete]');
    if (accountDeleteSubmitFlag == false) {
        if (form) {
            accountDeleteSubmitFlag = true;
            form.submit();
        }
    }
}

function toggleDetail(num, offContent, onContent) {
    var boxPrefix = (arguments[3]) ? arguments[3] : 'detail-';
    var linkPrefix = (arguments[4]) ? arguments[4] : 'detaillink-';
    var pattern = boxPrefix + '(.*)';
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        var regex = '/' + pattern + '/.exec(divs[i].id)';
        var match = eval(regex);
        if (match) {
            if (divs[i].id == boxPrefix + num) {
                divs[i].style.display = (divs[i].style.display == 'none') ?
                    "block" : "none";
                document.getElementById(linkPrefix + num).innerHTML = (document
                    .getElementById(linkPrefix + num).innerHTML ==
                    offContent) ? onContent : offContent;
            } else {
                divs[i].style.display = 'none';
                document.getElementById(linkPrefix + match[1]).innerHTML =
                    offContent;
            }
        }
    }
}
var dmc_mb3_usermanagementcached = {
    decode: function(data) {
        var lsRegExp = /\+/g;
        return unescape(String(data).replace(lsRegExp, " "));
    }
}

function setUserDataFromCookie() {
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        console.debug(cookieData);
        var data = $.parseJSON(cookieData);
        if (data) {
            var usermanagementSalutionContainer = $('#usermanagementSalutation');
            var notepadInfoContainer = $('#myWalza799Info');
            var comparelistInfoContainer = $('#myWalza18971Info');
            var giftdeskInfoContainer = $('#myWalza18972Info');
            var productcomparisonContainer = $('#myWalza189711Info');
            var myOrdersInfoContainer = $('#myWalza18973Info');
            var notepadTeaserFullContainer = $('#myWalzNotepadTeaserFull');
            var notepadTeaserEmptyContainer = $('#myWalzNotepadTeaserEmpty');
            var notepadTeaserAmountContainer = $('#myWalzNotepadTeaserAmount');
            var giftdeskTeaserFullContainer = $('#myWalzGiftdeskTeaserFull');
            var giftdeskTeaserEmptyContainer = $('#myWalzGiftdeskTeaserEmpty');
            var giftdeskTeaserAmountContainer = $('#myWalzGiftdeskTeaserAmount');
            var giftdeskTeaserOrderedContainer = $(
                '#myWalzGiftdeskTeaserOrdered');
            var giftdeskTeaserOrderedAmountContainer = $(
                '#myWalzGiftdeskTeaserOrderedAmount');
            if (giftdeskTeaserFullContainer.size() > 0 &&
                giftdeskTeaserEmptyContainer.size() > 0 &&
                giftdeskTeaserAmountContainer.size() > 0 &&
                giftdeskTeaserOrderedContainer.size() > 0) {
                if (typeof data.giftdesk != 'undefined' && typeof data.giftdesk
                    .articlesAmount != 'undefined' && typeof data.giftdesk.orderedArticlesAmount !=
                    'undefined' && data.giftdesk.articlesAmount > 0) {
                    giftdeskTeaserAmountContainer.html(data.giftdesk.articlesAmount);
                    if (data.giftdesk.orderedArticlesAmount > 0) {
                        giftdeskTeaserOrderedContainer.css("display", "block");
                        giftdeskTeaserOrderedAmountContainer.html(data.giftdesk
                            .orderedArticlesAmount);
                    }
                    giftdeskTeaserFullContainer.css("display", "block");
                } else {
                    giftdeskTeaserEmptyContainer.css("display", "block");
                }
            }
            if (notepadTeaserFullContainer.size() > 0 &&
                notepadTeaserEmptyContainer.size() > 0 &&
                notepadTeaserAmountContainer.size() > 0) {
                if (typeof data.notepad != 'undefined' && typeof data.notepad.articlesAmount !=
                    'undefined' && data.notepad.articlesAmount > 0) {
                    notepadTeaserAmountContainer.html(data.notepad.articlesAmount);
                    notepadTeaserFullContainer.css("display", "block");
                } else {
                    notepadTeaserEmptyContainer.css("display", "block");
                }
            }
            if (usermanagementSalutionContainer.size() > 0 && typeof data.usermanagement !=
                'undefined' && typeof data.usermanagement.customersalutation !=
                'undefined' && typeof data.usermanagement.customername !=
                'undefined') {
                usermanagementSalutionValue = $('body').data(
                        'dmc_mb3_usermanagement.userlogout_intro_text') + ' ' +
                    dmc_mb3_usermanagementcached.decode(data.usermanagement.customerfirstname) +
                    ' ' + dmc_mb3_usermanagementcached.decode(data.usermanagement
                        .customername);
                usrmgmtSalutationValue = htmlEntities(
                    usermanagementSalutionValue);
                usermanagementSalutionContainer.html(usrmgmtSalutationValue);
                $(".usermanagementSalutation").html(data.usermanagement.customerfirstname +
                    ' ' + data.usermanagement.customername);
                $('#usermanagementLogin').hide();
                $('#usermanagementLogout').show();
            } else {
                $('#usermanagementLogin').show();
                $('#usermanagementLogout').hide();
            }
            if (notepadInfoContainer.size() > 0 && typeof data.notepad !=
                'undefined' && typeof data.notepad.articlesAmount !=
                'undefined') {
                if (data.notepad.articlesAmount > 0) {
                    notepadInfoContainer.attr('class', 'myWalzAmount');
                    notepadInfoContainer.html('(' + data.notepad.articlesAmount +
                        ')');
                } else {
                    notepadInfoContainer.html('(0)');
                }
            }
            if (comparelistInfoContainer.size() > 0 && typeof data.comparelist !=
                'undefined' && typeof data.comparelist.articlesAmount !=
                'undefined') {
                if (data.comparelist.articlesAmount > 0) {
                    comparelistInfoContainer.attr('class', 'myWalzAmount');
                    comparelistInfoContainer.html('(' + data.comparelist.articlesAmount +
                        ')');
                } else {
                    comparelistInfoContainer.html('(0)');
                }
            }
            if (giftdeskInfoContainer.size() > 0 && typeof data.giftdesk !=
                'undefined' && typeof data.giftdesk.articlesAmount !=
                'undefined' && typeof data.usermanagement != 'undefined' &&
                typeof data.usermanagement.customersalutation != 'undefined' &&
                typeof data.usermanagement.customername != 'undefined') {
                if (data.giftdesk.articlesAmount > 0) {
                    giftdeskInfoContainer.attr('class', 'myWalzAmount');
                    giftdeskInfoContainer.html('(' + data.giftdesk.articlesAmount +
                        ')');
                } else {
                    giftdeskInfoContainer.html('(0)');
                }
            }
            if (productcomparisonContainer.size() > 0 && typeof data.productcomparison !=
                'undefined' && typeof data.productcomparisonContainer.articlesAmount !=
                'undefined') {
                if (data.productcomparisonContainer.articlesAmount > 0) {
                    productcomparisonContainer.attr('class', 'myWalzAmount');
                    productcomparisonContainer.html('(' + data.productcomparisonContainer
                        .articlesAmount + ')');
                } else {
                    productcomparisonContainer.html('(0)');
                }
            }
            if (myOrdersInfoContainer.size() > 0 && typeof data.myOrders !=
                'undefined' && typeof data.myOrders.articlesAmount !=
                'undefined') {
                if (data.giftdesk.articlesAmount > 0) {
                    myOrdersInfoContainer.attr('class', 'myWalzAmount');
                    myOrdersInfoContainer.html('(' + data.myOrders.articlesAmount +
                        ')');
                } else {
                    myOrdersInfoContainer.html('(0)');
                }
            }
        } else {
            $('#usermanagementLogin').show();
            $('#usermanagementLogout').hide();
        }
    } else {
        $('#usermanagementLogin').show();
        $('#usermanagementLogout').hide();
    }
}

function openURL(url) {
    var errorURL = url;
    if (window.opener && window.opener.open && !window.opener.closed) {
        opener.location.href = errorURL;
        close();
    } else {
        self.location.href = errorURL;
    }
}

function updateDoubletInput(originId, doubletId) {
    originElement = document.getElementById(originId);
    doubletElement = document.getElementById(doubletId);
    if (originElement && doubletElement) {
        doubletElement.value = originElement.value;
    }
}
$(document).ready(function() {
    setUserDataFromCookie();
    var anker = location.href.split('#')[1];
    if (anker == 'children') {
        moreChildrenData(true);
    }
    if (anker == 'changepasswordconfirm') {
        showInfoLayer($('body').data(
                'dmc_mb3_usermanagement.changepasswordconfirm'), $(
                'body').data(
                'dmc_mb3_usermanagement.infolayerbutton'), $('body')
            .data(
                'dmc_mb3_usermanagement.changepasswordconfirm_headline'
            ));
    }
});

function moreChildrenData(show) {
    var display1 = 'none';
    var display2 = 'block';
    if (show == true) {
        display1 = 'block';
        display2 = 'none';
    } else {
        $('#moreChildrenForm' + ' input').removeClass('error');
        $('#moreChildrenForm' + ' input').val('');
        $('#moreChildrenForm' + ' input').attr('checked', '');
    }
    $('#showMoreChildren').css("display", display2);
    $('#hideMoreChildren').css("display", display1);
    $('#moreChildrenForm').css("display", display1);
}

function showInfoLayer(infotext, buttontext, headline) {
    $(document).ready(function() {
        var textConf = {
            headline: headline,
            text: infotext,
            yes: buttontext,
            no: ''
        };
        alertLayerConfirm(textConf, null, null);
    });
}

function redirectFromPopup(textConf, redirectUrl) {
    var callbackYes = function() {
        location.href = redirectUrl;
    }
    var callbackNo = function() {
        return false;
    }
    alertLayerConfirm(textConf, callbackYes, callbackNo);
}

function checkNewsletterRegistration(clientPk, languagePK) {
    if ($('#usrname').val() != "" && $('#reusername').val() != "" && $(
            '#usrname').val() == $('#reusername').val() && checkEmail != $(
            '#usrname').val()) {
        checkEmail = $('#usrname').val();
        $.ajax({
            url: "http://baby-walz.de/index.php?eID=ajaxCheckNewsletter&clientpk=" +
                clientPk + "&languagepk=" + languagePK + "&email=" + $(
                    '#usrname').val(),
            dataType: "text",
            success: function(response) {
                if (response == 1) {
                    $('#newsletter').removeAttr("checked");
                    $('#divNewsletter').hide();
                } else {
                    $('#divNewsletter').show();
                };
            }
        });
    }
}

function addToGiftdesk(uid, id) {
    var form = document.getElementById('giftdeskForm_' + uid);
    var giftdeskArticlePk = document.getElementById('giftdeskArticlePk_' + uid);
    var giftdeskGravure = document.getElementById('giftdeskGravure_' + uid);
    var giftdeskProductPk = document.getElementById('giftdeskProductPk_' + uid);
    var giftdeskAmount = document.getElementById('giftdeskAmount_' + uid);
    var amountForm = document.getElementById('productAmountForm_' + uid);
    if (!product01) {
        var product01 = new dmc.WALZ.Product({
            'selfUID': uid
        });
        product01 = product01.getInstance();
    }
    var currentArticle = product01.getCurrentArticle();
    var currentArticleVO = product01.dataArticles[currentArticle.artNumber][
        currentArticle.artSize
    ];
    var gravureFieldCount = parseInt(currentArticleVO.gravureHeadline);
    var gravureFieldLength = parseInt(currentArticleVO.gravureLength);
    var gravureTextArray = [];
    if (gravureFieldCount > 0 && gravureFieldLength > 0) {
        for (var i = 0; i < gravureFieldCount; i++) {
            gravureTextArray.push($(product01.parentContainerObj).find('#' +
                product01.fieldGravureText + '_' + i).val());
        }
        if (typeof textGravureSeparator == 'undefined') {
            var textGravureSeparator = '###';
        }
    }
    var amount = 0;
    if (amountForm) {
        amount = amountForm.value;
    }
    if (form && giftdeskArticlePk && giftdeskProductPk && giftdeskGravure &&
        amount > 0) {
        giftdeskArticlePk.value = product01.getCurrentArticlePk();
        giftdeskProductPk.value = id;
        giftdeskGravure.value = gravureTextArray.join(textGravureSeparator);
        giftdeskAmount.value = amount;
        form.submit();
    }
}
var dmc_mb3_giftdeskcached = {
    decode: function(data) {
        var lsRegExp = /\+/g;
        return this.decodeUtf8(unescape(String(data).replace(lsRegExp,
            " ")));
    },
    decodeUtf8: function(utftext) {
        var plaintext = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                plaintext += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                plaintext += String.fromCharCode(((c & 31) << 6) | (c2 &
                    63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                plaintext += String.fromCharCode(((c & 15) << 12) | ((
                    c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return plaintext;
    }
}

function fillGiftdeskWithData(giftdeskAmountContainerId,
    giftdeskArticleAmountContainerId, tipText) {
    var giftdeskArticlesAmountContainer = document.getElementById(
        giftdeskArticleAmountContainerId);
    var giftdeskAmountContainer = document.getElementById(
        giftdeskAmountContainerId);
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data && typeof data.giftdesk != 'undefined') {
            if (giftdeskArticlesAmountContainer && typeof data.giftdesk.articlesAmount !=
                'undefined') {
                giftdeskArticlesAmountContainerValue = dmc_mb3_giftdeskcached.decode(
                    data.giftdesk.articlesAmount);
                giftdeskArticlesAmountContainerValue = htmlEntities(
                    giftdeskArticlesAmountContainerValue);
                if (giftdeskArticlesAmountContainer) {
                    giftdeskArticlesAmountContainer.innerHTML =
                        giftdeskArticlesAmountContainerValue;
                }
            }
            if (giftdeskAmountContainer && typeof data.giftdesk.giftdeskAmount !=
                'undefined') {
                giftdeskAmountContainerValue = dmc_mb3_giftdeskcached.decode(
                    data.giftdesk.giftdeskAmount);
                giftdeskArticlesAmountContainerValue = htmlEntities(
                    giftdeskArticlesAmountContainerValue);
                if (giftdeskAmountContainer) {
                    giftdeskAmountContainer.innerHTML =
                        giftdeskAmountContainerValue;
                }
            }
            if (data.giftdesk.giftdeskAddStatus == 1) {
                showToolTip(giftdeskAmountContainerId, tipText);
            }
            resetGiftdeskCookie();
        }
    }
}

function resetGiftdeskCookie() {
    var cookieData = cookie_get('mb3pc');
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data) {
            data.giftdesk.giftdeskAddStatus = "0";
            cookieDataUpdated = JSON.stringify(data);
            cookie_set('mb3pc', cookieDataUpdated, '', '/');
        }
    }
}

function isGiftdeskEmpty() {
    var cookieData = cookie_get('mb3pc');
    var retval = true;
    if (cookieData && typeof cookieData != 'undefined') {
        var data = JSON.parse(cookieData);
        if (data) {
            if (typeof data.giftdesk != 'undefined' && data.giftdesk.articlesAmount !=
                0) {
                retval = false;
            }
        }
    }
    return retval;
}

function checkFieldsGiftdesk(uid, id, variation, size, color, caller) {
    var confObj = {
        orderlineSelector: '',
        gravureField: 'giftdeskGravure_' + uid,
        gravureFieldText: 'productGravureText_' + uid + '_' + id,
        gravureFieldCount: parseInt(productConf[uid][id]['articles'][
            variation
        ][size][color]['gravureText']),
        gravureFieldLength: parseInt(productConf[uid][id]['articles'][
            variation
        ][size][color]['gravureLength']),
        amountField: 'productAmountForm_' + uid + '_' + id,
        yardWareValue: productConf[uid][id]['articles'][variation][size][
            color
        ]['stockUnit'],
        yardWareField: null,
        maxAllowed: productConf[uid][id]['articles'][variation][size][color]
            ['maxAllowedQuantity']
    }
    return dmc.WALZ.Product.CheckFields(confObj, caller);
}

function addToGiftdeskSubmit(uid, id, target, popup, url, popupParams, loginUrl) {
    if (typeof product01 == "undefined" && typeof selfUID != "undefined") {
        var product01 = new dmc.WALZ.Product({
            "selfUID": selfUID
        });
    }
    product01 = product01.getInstance();
    var currentArticle = product01.getCurrentArticle();
    var currentArticleVO = product01.dataArticles[currentArticle.artNumber][
        currentArticle.artSize
    ];
    var callbackYes = function() {
        product01.addToBasketParams.confirmed = true;
        addToGiftdeskSubmit(uid, id, target, popup, url, popupParams,
            loginUrl);
    };
    if ((typeof product01.addToBasketParams.confirmed != 'undefined' &&
            product01.addToBasketParams.confirmed == true) || product01.checkFields(
            currentArticleVO,
            function() {}, callbackYes)) {
        var paramObj = Utils.ParsePopupParams(popupParams);
        var form = $('#giftdeskForm_' + uid);
        form.attr('action', url);
        var cookieData = cookie_get('mb3pc');
        if (cookieData && typeof cookieData != 'undefined') {
            console.debug(cookieData);
            var data = $.parseJSON(cookieData);
            if (data) {
                if (typeof data.usermanagement != 'undefined' && typeof data.usermanagement
                    .customersalutation != 'undefined' && typeof data.usermanagement
                    .customername != 'undefined') {
                    var targetContainer = $(
                        '<iframe name="myWalzFrame"></iframe>');
                    targetContainer.attr('src', 'about:blank');
                    targetContainer.css('display', 'none');
                    $('.tnlMywalz').append(targetContainer);
                    form.attr('target', 'myWalzFrame');
                    addToGiftdesk(uid, id);
                    Utils.CheckFrameContent(targetContainer, function() {
                        targetContainer.remove();
                        setUserDataFromCookie();
                        $('#giftdeskLink > a').addClass('active');
                        $('.tnlMywalz').fadeIn('slow');
                        $('#trigger_a18878').addClass('sfhover');
                        setTimeout(function() {
                            $('.tnlMywalz').fadeOut('slow');
                            $('#trigger_a18878').removeClass(
                                'sfhover');
                            if ($('#usermanagementLogout').size() ==
                                0) {
                                location.reload();
                            }
                        }, 4000);
                    });
                } else {
                    alertLayer('iframe', loginUrl, '', paramObj.Height,
                        paramObj.Width, paramObj.Scrolling);
                }
            } else {
                alertLayer('iframe', loginUrl, '', paramObj.Height, paramObj.Width,
                    paramObj.Scrolling);
            }
        } else {
            alertLayer('iframe', loginUrl, '', paramObj.Height, paramObj.Width,
                paramObj.Scrolling);
        }
    }
}

function addRecipientRow() {
    if (myRowCounter > 0 && myRowCounter < 15) {
        var oldCounter = myRowCounter - 1;
        var tpl = $('#recipientRowTemplate').html();
        if (tpl != null) {
            var rowHTML = '';
            for (var i = 0; i < 5; i++) {
                tpl_tmp = tpl.replace(/PLACEHOLDER/g, myRowCounter);
                tpl_tmp = tpl_tmp.replace(/ROWCOUNTER/g, myRowCounter + 1);
                rowHTML += tpl_tmp;
                myRowCounter++;
            }
            $('#newRecipientRow_' + oldCounter).replaceWith(rowHTML);
        }
    } else {
        var oldCounter = myRowCounter - 1;
        $('#newRecipientRow_' + oldCounter).replaceWith(noticeMaxRowsReached);
    }
}

function createOnArticleChangedHandlerGiftdeskLink(uid, urlRatingsDummy,
    urlRankingDummy, popupParams) {
    return function(uid, productObj, currentArticleVO) {
        var $ = jQuery;
        var cookieData = cookie_get('mb3pc');
        if (cookieData && typeof cookieData != 'undefined') {
            console.debug(cookieData);
            var data = $.parseJSON(cookieData);
            if (data) {
                if (typeof data.usermanagement != 'undefined' && typeof data
                    .usermanagement.customersalutation != 'undefined' &&
                    typeof data.usermanagement.customername != 'undefined') {
                    var inGiftdesk = productObj.dataArticles[
                            currentArticleVO.artNumber][currentArticleVO.artSize]
                        .inGiftdesk;
                    if (inGiftdesk != '') {
                        $('#giftdeskLink > a').addClass('active');
                    } else {
                        $('#giftdeskLink > a').removeClass('active');
                    }
                }
            }
        }
    };
}

function showSendToFriendForm(el) {
    $(el).toggleClass('ic_minus');
    $('#sendGiftdeskFormContainer').slideToggle();
}

function checkBlankAndSubmit(frmId) {
    if ((typeof $("#subject") != 'undefined') && ($("#subject").val() == $(
            "#hidsubject").val())) {
        $("#subject").val('');
    }
    if ((typeof $("#message") != 'undefined') && ($("#message").val() == $(
            "#hidmessage").val())) {
        $("#message").val('')
    }
    document.getElementById(frmId).submit();
}
$(document).ready(function() {
    var anker = location.href.split('#')[1];
    if (anker == 'sendgiftdeskform') {
        $('#sendGiftdeskFormContainer').show();
        $('.togglePlus').removeClass('ic_plus');
        $('.togglePlus').addClass('ic_minus');
    }
});

function articleRankingLink(uid, id, url) {
    var artNumber = '';
    var variation = '';
    var size = '';
    var color = '';
    variation = currentVariation(uid, id);
    size = currentSize(uid, id, variation);
    color = currentColor(uid, id, variation, size);
    artNumber = productConf[uid][id]['articles'][variation][size][color][
        'artNumber'
    ];
    document.location.href = url.replace('%s', artNumber);
}

function createOnArticleChangedHandlerForRanking(uid, urlRatingsDummy,
    urlRankingDummy, popupParams) {
    var defaultRankingImage = '';
    if (typeof window['artRankingDetailsUrlDefaultImage_' + uid] != 'undefined' &&
        window['artRankingDetailsUrlDefaultImage_' + uid] != '') {
        defaultRankingImage = window['artRankingDetailsUrlDefaultImage_' + uid];
    } else {
        defaultRankingImage = window['artRankingDetailsUrlDefaultImageSmall'];
    }
    return function(_, productObj, currentArticleVO) {
        var $ = jQuery;
        if (window.artRankingDetails) {
            var artNumber = currentArticleVO.artNumber;
            if (uid) {
                var detail = artRankingDetails[uid][artNumber];
            }
            var image = $('#rankdetail_' + uid + '_image');
            var countSpan = $('#rankdetail_' + uid + '_count');
            var readRatingsLink = $('#rankdetail_' + uid + '_readRatings');
            var rankingLink = $('#rankdetail_' + uid + '_ranking');
            var imageLink = $('#rankdetail_' + uid + '_imageLink');
            var urlRatings = urlRatingsDummy.replace('__ARTNUMBER__',
                artNumber);
            var urlRanking = urlRankingDummy.replace('__ARTNUMBER__',
                artNumber);
            var paramObj = Utils.ParsePopupParams(popupParams);
            createOnArticleChangedHandlerForRankingLink(uid,
                urlRatingsDummy, urlRankingDummy, popupParams);
            imageLink.attr('href', 'javascript:void(0)');
            if (detail && detail.commentCount > 0) {
                image.attr('src', detail.urlImage);
                countSpan.html('(' + detail.commentCount + ')');
                readRatingsLink.show();
                imageLink.css('cursor', 'pointer');
                imageLink.attr('href', '#prodInfo');
            } else {
                imageLink.css('cursor', 'pointer');
                imageLink.attr('href', '#rankingIntro');
                image.attr('src', defaultRankingImage);
                countSpan.html('(0)');
                readRatingsLink.hide();
            }
        }
    };
}

function createOnArticleChangedHandlerForRankingLink(uid, urlRatingsDummy,
    urlRankingDummy, popupParams) {
    return function(uid, productObj, currentArticleVO) {
        var $ = jQuery;
        if (window.artRankingDetails) {
            var artNumber = currentArticleVO.artNumber;
            var detail = artRankingDetails[artNumber];
            var urlRatings = urlRatingsDummy.replace('__ARTNUMBER__',
                artNumber);
            var urlRanking = urlRankingDummy.replace('__ARTNUMBER__',
                artNumber);
            var paramObj = Utils.ParsePopupParams(popupParams);
            $('.js_rankdetail_' + uid + '_ranking').each(function() {
                $(this).attr('href',
                    "javascript:alertLayer('iframe','" +
                    urlRanking + "', ''," + paramObj.Height +
                    "," + paramObj.Width + "," + paramObj.Scrolling +
                    ")");
            });
        }
    };
}

function createOnArticleChangedHandlerForRankingComments(uid, urlRatingsDummy,
    urlRankingDummy, popupParams) {
    var $ = jQuery;
    var numberOfInitialComments = 3;
    var maxCommentsPerPage = 10;
    var rankingHandler = createOnArticleChangedHandlerForRanking(uid,
        urlRatingsDummy, urlRankingDummy, popupParams);
    return function(_, productObj, currentArticleVO) {
        rankingHandler(uid, productObj, currentArticleVO);
        var artNumber = currentArticleVO.artNumber;
        var showAllCommentsLink = $('#showAllComments_' + uid);
        var allComments = $('.productranking_comment_' + uid);
        var pagination = $('#commentsPagination_' + uid).html('');
        var comments = $('.productranking_comment_' + uid + '_' + artNumber);
        var commentsCount = comments.size();
        var updateComments = function(pageIdx) {
            allComments.hide();
            var startIdx = 0;
            var endIdx = 0;
            if (isNaN(pageIdx)) {
                endIdx = Math.min(numberOfInitialComments,
                    commentsCount);
            } else {
                startIdx = pageIdx * maxCommentsPerPage;
                endIdx = Math.min(startIdx + maxCommentsPerPage,
                    commentsCount);
            }
            for (var i = startIdx; i < endIdx; ++i) {
                (function() {
                    var comment = $(comments.get(i));
                    comment.show();
                })();
            }
        }
        updateComments();
        showAllCommentsLink.hide()
        if (commentsCount > numberOfInitialComments) {
            showAllCommentsLink.unbind('click');
            showAllCommentsLink.click(function() {
                showAllCommentsLink.hide();
                updateComments(0);
                var pageCount = Math.ceil(commentsCount /
                    maxCommentsPerPage);
                if (pagination.size() > 0 && pageCount > 1) {
                    pagination.html('');
                    var linkPrev = $(
                        '<a class="arrowHeadPreviousPage"><img width="20" height="16" class="arrowHeadPreviousPage" alt="" src="/cache/clear.gif"></a>'
                    );
                    var linkNext = $(
                        '<a class="arrowHeadNextPage"><img width="20" height="16" class="arrowHeadNextPage" alt="" src="/cache/clear.gif"></a>'
                    );
                    pagination.append(linkPrev);
                    for (var i = 0; i < pageCount; ++i) {
                        if (i > 0) {
                            pagination.append(document.createTextNode(
                                ' | '));
                        }
                        var page = $(document.createElement('a'));
                        page.attr('href', '#prodInfo');
                        page.html(i + 1);
                        if (i == 0) {
                            page.addClass('PageHeadAktiv');
                        }
                        page.click(function() {
                            var pages = pagination.find(
                                'a:not(:first)').not(
                                ':last');
                            pages.removeClass(
                                'PageHeadAktiv');
                            var pageIdx = $(this).html() -
                                1;
                            $(this).addClass(
                                'PageHeadAktiv');
                            updateComments(pageIdx);
                            location.href = '#prodInfo';
                            return false;
                        });
                        pagination.append(page);
                    }
                    pagination.append(linkNext);
                }
                linkPrev.click(function() {
                    var pages = $('#commentsPagination_' +
                        uid).find('a:not(:first)').not(
                        ':last');
                    var els = [];
                    var cur = '';
                    pages.each(function(i, el) {
                        if ($(el).attr('class') ==
                            'PageHeadAktiv') {
                            cur = i;
                        }
                        els.push($(el));
                    });
                    if (cur - 1 >= 0) {
                        pages.removeClass('PageHeadAktiv');
                        updateComments(cur - 1);
                        els[cur - 1].addClass(
                            'PageHeadAktiv');
                        location.href = '#prodInfo';
                    }
                });
                linkNext.click(function() {
                    var pages = $('#commentsPagination_' +
                        uid).find('a:not(:first)').not(
                        ':last');
                    var els = [];
                    var cur = '';
                    var amount = 0;
                    pages.each(function(i, el) {
                        if ($(el).attr('class') ==
                            'PageHeadAktiv') {
                            cur = i;
                        }
                        els.push($(el));
                        amount++;
                    });
                    if (cur + 1 < amount) {
                        pages.removeClass('PageHeadAktiv');
                        updateComments(cur + 1);
                        els[cur + 1].addClass(
                            'PageHeadAktiv');
                        location.href = '#prodInfo';
                    }
                });
                return false;
            });
            showAllCommentsLink.show();
        }
    }
}
if (typeof dmc == 'object' && typeof dmc.WALZ == 'object' && typeof dmc.WALZ.Search ==
    'object') {
    dmc.WALZ.Search._this = null;
    dmc.WALZ.Search.Busy = false;
    dmc.WALZ.Search.Init = function() {
        this.BindSiblingsGroupNaviToggle();
        Accordion.Init($('#refineNav'));
        Accordion.AddEventListener('click', $('#refineNav'));
        $('.refineGroupItems input').each(function(_, element) {
            Checklist.Init(element);
        });
        this.SetFilterStateEvents();
        if (dmc.WALZ.Search.Instance == null) {
            this.SetFilterStateDefaults();
            dmc.WALZ.Search.Instance = this;
        }
    }
    dmc.WALZ.Search.SetFilterStateDefaults = function() {
        _this = this;
        $('.refineGroup').each(function(_, element) {
            var item = {
                'id': $(element).attr('id').toLowerCase(),
                'state': true
            };
            dmc.WALZ.Search.SelectedFilters.push(item);
        });
    }
    dmc.WALZ.Search.SetFilterStateEvents = function() {
        $('.refineGroup h2, .refineGroup .toggleButton').click(function() {
            var id = $(this).parent().attr('id').toLowerCase();
            for (var i = 0; i < dmc.WALZ.Search.SelectedFilters.length; i++) {
                if (dmc.WALZ.Search.SelectedFilters[i].id == id) {
                    dmc.WALZ.Search.SelectedFilters[i].state = !dmc
                        .WALZ.Search.SelectedFilters[i].state;
                }
            }
        });
    }
    dmc.WALZ.Search.CheckFilterStates = function() {
        _this = this;
        for (var i = 0; i < dmc.WALZ.Search.SelectedFilters.length; i++) {
            if (dmc.WALZ.Search.SelectedFilters[i].state) {
                var openItem = $('.refineGroup').eq(i);
                openItem.removeClass('closed').addClass('opened');
                openItem.find('.refineGroupItemsContainer').css('display',
                    'block');
            }
        }
    }
    dmc.WALZ.Search.LoadFilter = function(filterUrl, searchstring) {
        if (typeof(lazyloadConfig) !== 'undefined') {
            filterUrl += ((filterUrl.indexOf("?") >= 0) ? "&" : "?") +
                'show=' + lazyloadConfig.show;
        }
        dmc.WALZ.Search.FilterUrl = filterUrl;
        if (!this.Busy) {
            _this = this;
            $.ajax({
                type: 'GET',
                url: filterUrl,
                success: function(html) {
                    $('div.contentContainer').css('opacity', 1);
                    $('div.contentContainer').replaceWith(html);
                    $('body').css('cursor', 'auto');
                    dmc.WALZ.Search.Instance.Busy = false;
                    dmc.WALZ.Search.Instance.Init();
                    dmc.WALZ.Search.Instance.CheckFilterStates();
                    if ($.cookie('searchbacklink') != null) {
                        $.cookie('searchbacklink', ($.cookie(
                            'searchbacklink').split(
                            "|"))[0] + '|' + (filterUrl
                            .replace(/.11.html/,
                                'http://baby-walz.de/.0.html'
                            )) + '|' + searchstring, {
                            path: '/'
                        });
                        if (window.history && window.history.pushState) {
                            history.replaceState({
                                "view": "FILTER"
                            }, '', document.location);
                            var seourl = document.location.pathname +
                                filterUrl.substring(filterUrl.indexOf(
                                    "?"), filterUrl.length);
                            history.pushState({
                                "view": "FILTER"
                            }, '', seourl);
                        }
                    }
                    if (Lazyload.MaxCalls === 0) {
                        $("img").trigger("unveil");
                    }
                }
            });
            $('div.contentContainer').css('opacity', 0.5);
            $('body').css('cursor', 'wait');
        }
        this.Busy = true;
    }
    dmc.WALZ.Search.BindSiblingsGroupNaviToggle = function() {
        $('#jsParentGroup').css('cursor', 'pointer');
        $('#jsParentGroup, div#siblingsGroupNavi').hover(function() {
            $('div#siblingsGroupNavi').css('left', 'auto');
        }, function() {
            $('div#siblingsGroupNavi').css('left', '-99999px');
        });
    }
    $(window).bind("popstate", function(evt) {
        var state = evt.originalEvent.state;
        if (state) {
            if (state.view == "FILTER") {
                location.reload();
            }
        }
    });
    $(document).ready(function() {
        dmc.WALZ.Search.Init();
        dmc.WALZ.Search.CheckFilterStates();
    });

    function searchFilterJump(url, searchstring) {
        dmc.WALZ.Search.LoadFilter(url, searchstring);
        dmc.WALZ.ProductList.ReInitialize();
    }
}

function FFSuggest() {
    var pDebug = false;
    var pInstanceName = '';
    var pSearchURL = '';
    var pQueryParamName = '';
    var pFormname = '';
    var pLayerName = '';
    var pQueryInput;
    var pSuggest = new Array();
    var pSuggestDeeplinkUrl = new Array();
    var pLastQuery;
    var submitted = false;
    var pShowImages = false;
    var pSearchDelay = 400;
    var pSearchChars = 2;
    var pTimer = false;
    var pSearchTriggered = false;
    var pSuggestImageClass = 'suggestImage';
    var pSuggestTypeClass = 'suggestTextType';
    var pSuggestAmountClass = 'suggestTextAmount';
    var pSuggestQueryTypedClass = 'suggestTextQueryTyped';
    var pSuggestFooterClass = 'suggestFooter';
    var pSuggestHeaderClass = 'suggestHeader';
    var pSuggestRowClass = 'suggestRow';
    var pSuggestHighlightClass = 'suggestHighlight';
    var pSuggestQueryStyle = "font-weight: bold; padding: 2px 15px 2px 10px;";
    var pCurrency = "&euro;";
    var ptranslation;
    this.init = function(searchURL, formname, queryParamName, divLayername,
        instanceName, debugMode, showImages, suggestdelay, suggestchars,
        translation, layout, currencySymbol) {
        pSearchURL = searchURL;
        pFormname = formname;
        pQueryParamName = queryParamName;
        pLayerName = divLayername;
        pInstanceName = instanceName;
        pDebug = debugMode;
        pShowImages = showImages;
        pCurrency = currencySymbol;
        if (pSearchURL == '') {
            if (pDebug) alert('no searchurl defined');
            return null;
        } else if (pInstanceName == '') {
            if (pDebug) alert('no instancename defined');
            return null;
        } else if (pFormname == '') {
            if (pDebug) alert('no formname defined');
            return null;
        } else if (pQueryParamName == '') {
            if (pDebug) alert('no queryparamname defined');
            return null;
        } else if (pLayerName == '') {
            if (pDebug) alert('need a layer for output');
        }
        if (suggestdelay != '') {
            pSearchDelay = suggestdelay;
        }
        if (suggestchars != '') {
            pSearchChars = suggestchars;
        }
        pQueryInput = document[pFormname][pQueryParamName];
        defaultInput();
        pQueryInput.onkeyup = handleKeyPress;
        pQueryInput.onfocus = function() {
            if ((pQueryInput.value != '') && ($('div #suggestLayer > *')
                    .length > 0)) {
                showLayer();
            }
            clearInput();
        };
        pQueryInput.onblur = function() {
            hideLayer();
            defaultInput();
        };
        document[pFormname].onsubmit = handleSubmit;
        ptranslation = translation;
    }

    function clearInput() {
        if (pQueryInput.value == translation['noinput']) {
            pQueryInput.value = '';
        }
    }

    function defaultInput() {
        if (pQueryInput.value == '' || pQueryInput.value == '*') {
            pQueryInput.value = translation['noinput'];
        }
    }

    function handleSubmit() {
        if (pQueryInput.value == '' || pQueryInput.value == translation[
                'noinput']) {
            defaultInput();
            return false;
        }
        if (typeof layout == 'undefined') {
            return false;
        }
        if (layout == 1) {
            var id = $('tr.' + pSuggestHighlightClass).attr("id");
        } else {
            var id = $('div.' + pSuggestHighlightClass).attr("id");
        }
        if (id != undefined) {
            if (layout == 1) {
                var id = $('tr.' + pSuggestHighlightClass).attr("id");
            } else {
                var id = $('div.' + pSuggestHighlightClass).attr("id");
            }
            var query;
            for (var i = 0; i < pSuggest.length; i++) {
                if (pSuggest[i].search(id) == 0) {
                    query = pSuggest[i].substring(id.length);
                    break;
                }
            }
            addInputToForm('userInput', document[pFormname][pQueryParamName].value);
            document[pFormname][pQueryParamName].value = query;
            addInputToForm('queryFromSuggest', 'true');
        }
        $.cookie('searchbacklink', null, {
            path: '/'
        });
    }
    this.handleSuggestRedirect = function() {
        if (layout == 1) {
            var id = $('tr.' + pSuggestHighlightClass).attr("id");
        } else {
            var id = $('div.' + pSuggestHighlightClass).attr("id");
        }
        $.cookie('searchbacklink', null, {
            path: '/'
        });
        window.location.href = pSuggestDeeplinkUrl[id];
    }
    this.handleClick = function() {
        document[pFormname].onsubmit();
        document[pFormname].submit();
    }
    this.handleMouseOver = function(id) {
        unmarkAll();
        if (layout == 1) {
            $('#' + pLayerName + ' tr[id="' + id + '"]').removeClass(
                pSuggestRowClass).addClass(pSuggestHighlightClass);
        } else {
            $('#' + pLayerName + ' div[id="' + id + '"]').removeClass(
                pSuggestRowClass).addClass(pSuggestHighlightClass);
        }
    }
    this.handleMouseOut = function(id) {
        if (layout == 1) {
            $('#' + pLayerName + ' tr[id="' + id + '"]').removeClass(
                pSuggestHighlightClass).addClass(pSuggestRowClass);
        } else {
            $('#' + pLayerName + ' div[id="' + id + '"]').removeClass(
                pSuggestHighlightClass).addClass(pSuggestRowClass);
        }
    }

    function handleKeyPress(evt) {
        evt = (evt) ? evt : ((event) ? event : null);
        var keyCode = evt.keyCode;
        if (keyCode == 38) {
            moveUp();
        } else if (keyCode == 27) {
            hideLayer();
        } else if (keyCode == 40) {
            moveDown();
        } else {
            if (pTimer) {
                clearTimeout(pTimer);
                pSearchTriggered = false;
            }
            if (pQueryInput.value == '') {
                hideLayer();
                if (typeof pLayer != 'undefined' && pLayer != null) {
                    pLayer.innerHTML = '';
                }
                pLastQuery = '';
                return null;
            }
            if (!pSearchTriggered && pLastQuery != pQueryInput.value &&
                pQueryInput.value.length >= pSearchChars) {
                pSearchTriggered = true;
                pTimer = setTimeout(getSuggestions, pSearchDelay);
            }
            pLastQuery = pQueryInput.value;
        }
    }

    function moveUp() {
        if (layout == 1) {
            if ($('tr.' + pSuggestHighlightClass).length == 0) {
                $('tr.' + pSuggestRowClass + ':last').removeClass(
                    pSuggestRowClass).addClass(pSuggestHighlightClass);
            } else {
                if ($('tr.' + pSuggestHighlightClass).prev('tr.' +
                        pSuggestRowClass).length == 0) {
                    $('tr.' + pSuggestHighlightClass).removeClass(
                        pSuggestHighlightClass).addClass(pSuggestRowClass);
                    $('tr.' + pSuggestRowClass + ':last').removeClass(
                        pSuggestRowClass).addClass(pSuggestHighlightClass);
                } else {
                    $('tr.' + pSuggestHighlightClass).removeClass(
                        pSuggestHighlightClass).addClass(pSuggestRowClass).prev(
                        'tr.' + pSuggestRowClass).removeClass(
                        pSuggestRowClass).addClass(pSuggestHighlightClass);
                }
            }
        } else {
            if ($('div.' + pSuggestHighlightClass).length == 0) {
                $('div.' + pSuggestRowClass + ':last').removeClass(
                    pSuggestRowClass).addClass(pSuggestHighlightClass);
            } else {
                var id = $('div.' + pSuggestHighlightClass).attr('id');
                var newID = parseInt(id) - 1;
                $('div#' + id).removeClass(pSuggestHighlightClass).addClass(
                    pSuggestRowClass);
                $('div#' + newID).removeClass(pSuggestRowClass).addClass(
                    pSuggestHighlightClass);
            }
        }
    }

    function moveDown() {
        if (layout == 1) {
            if ($('tr.' + pSuggestHighlightClass).length == 0) {
                $('tr.' + pSuggestRowClass + ':first').removeClass(
                    pSuggestRowClass).addClass(pSuggestHighlightClass);
            } else {
                if ($('tr.' + pSuggestHighlightClass).next('tr.' +
                        pSuggestRowClass).length == 0) {
                    $('tr.' + pSuggestHighlightClass).addClass(pSuggestRowClass)
                        .removeClass(pSuggestHighlightClass);
                    $('tr.' + pSuggestRowClass + ':first').removeClass(
                        pSuggestRowClass).addClass(pSuggestHighlightClass);
                } else {
                    $('tr.' + pSuggestHighlightClass).addClass(pSuggestRowClass)
                        .removeClass(pSuggestHighlightClass).next('tr.' +
                            pSuggestRowClass).removeClass(pSuggestRowClass).addClass(
                            pSuggestHighlightClass);
                }
            }
        } else {
            if ($('div.' + pSuggestHighlightClass).length == 0) {
                $('div.' + pSuggestRowClass + ':first').removeClass(
                    pSuggestRowClass).addClass(pSuggestHighlightClass);
            } else {
                var id = $('div.' + pSuggestHighlightClass).attr('id');
                var newID = parseInt(id) + 1;
                $('div#' + id).removeClass(pSuggestHighlightClass).addClass(
                    pSuggestRowClass);
                $('div#' + newID).removeClass(pSuggestRowClass).addClass(
                    pSuggestHighlightClass);
            }
        }
    }

    function getSuggestions() {
        var query = $('input[name=' + pQueryParamName + ']').attr('value');
        var requestURL = pSearchURL + '&query=' + encodeURIComponent(query);
        $.ajax({
            type: "GET",
            url: requestURL,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(json, textStatus) {
                var jsonObj = eval(json);
                if (typeof jsonObj != 'undefined') {
                    if (jsonObj.length > 0) {
                        if (layout == 1) {
                            var outputText =
                                '<table cellpadding="0" cellspacing="0" class="' +
                                pLayerName + '" border="0">';
                            outputText +=
                                '<tr class="suggestHeader" ><th class="suggestHeader" nowrap="nowrap" colspan="3">' +
                                ptranslation['header'] +
                                '</th></tr>'
                        } else {
                            var outputText = '<div class="' +
                                pLayerName + '" >';
                            outputText +=
                                '<div class="suggestRowContainer">';
                        }
                        pSuggest = new Array();
                        var ifCategory = true;
                        var ifProduct = true;
                        var ifBrand = true;
                        for (var i = 0; i < jsonObj.length; i++) {
                            var suggestQuery = jsonObj[i].name;
                            var suggestCount = jsonObj[i].hitCount;
                            if (suggestCount == 0) {
                                suggestCount = '';
                            } else if (suggestCount == 1) {
                                suggestCount = ptranslation[
                                    'singleProduct'];
                            } else {
                                suggestCount = suggestCount + ' ' +
                                    ptranslation['product'];
                            }
                            var suggestType = ptranslation[jsonObj[
                                i].type];
                            if (!suggestType) {
                                suggestType = "";
                            }
                            var suggestImageUrl = jsonObj[i].imageURL;
                            var suggestTypeText = jsonObj[i].type;
                            var productPrice = jsonObj[i].attributes
                                .PRODUCT_PRICE;
                            var deeplinkUrl = jsonObj[i].attributes
                                .deeplink;
                            var parentCategory = jsonObj[i].attributes
                                .parentCategory;
                            var productPriceInt = parseFloat(
                                productPrice);
                            if (!productPrice || typeof productPrice ==
                                undefined) {
                                productPrice = "";
                                productPriceInt = 0;
                            } else {
                                productPrice = productPrice.replace(
                                        '.', ',') + '&nbsp;' +
                                    pCurrency;
                            }
                            var productSavings = parseInt(jsonObj[i]
                                .attributes.PRODUCT_PRICE_SAVINGS
                            );
                            var productOldPrice = "";
                            if (productSavings != 0 && !isNaN(
                                    productSavings)) {
                                var productOldPrice = (
                                    productPriceInt + (
                                        productSavings / 100)).toFixed(
                                    2);
                                productOldPrice = productOldPrice.replace(
                                        '.', ',') + '&nbsp;' +
                                    pCurrency;
                            }
                            var id = i;
                            pSuggestDeeplinkUrl[id] = deeplinkUrl;
                            if (layout == 1) {
                                outputText += '<tr id="' + id +
                                    '" class="' + pSuggestRowClass +
                                    '" onMouseOver="' +
                                    pInstanceName +
                                    '.handleMouseOver(' + id +
                                    ');" onMouseOut="' +
                                    pInstanceName +
                                    '.handleMouseOut(' + id +
                                    ');" onMouseDown="' +
                                    pInstanceName + '.' + (
                                        suggestTypeText ==
                                        'productName' ?
                                        'handleSuggestRedirect()' :
                                        'handleClick()') + ';">' +
                                    (pShowImages ?
                                        '<td nowrap="nowrap" class="' +
                                        pSuggestImageClass +
                                        '"><img src="' +
                                        suggestImageUrl +
                                        '" alt=""/></td>' : '') +
                                    '<td nowrap="nowrap" style="' +
                                    pSuggestQueryStyle +
                                    ';"><div class="suggestRes">' +
                                    suggestQuery.replace(new RegExp(
                                            "(" + query + ")", "ig"
                                        ),
                                        '<span class="suggestContent">$1</span>'
                                    ) + '</div></td>' +
                                    '<td class="' +
                                    pSuggestTypeClass + '">' +
                                    suggestType + '</td>' +
                                    '<td nowrap="nowrap" class="' +
                                    pSuggestAmountClass +
                                    '"><div style="white-space:  nowrap;">' +
                                    suggestCount + ' </div></td>' +
                                    '</tr>';
                            } else {
                                switch (suggestTypeText) {
                                    case 'category':
                                        if (ifCategory == true) {
                                            outputText +=
                                                '<div class="suggestColumn0"><div class="suggestRowCategory" onMouseDown="' +
                                                pInstanceName +
                                                '.handleSuggestRedirect();"><div class="' +
                                                pSuggestHeaderClass +
                                                '" ><p>' +
                                                ptranslation[
                                                    'category'] +
                                                '</p></div>';
                                        }
                                        ifCategory = false;
                                        break;
                                    case 'productName':
                                        if (ifProduct == true) {
                                            if (ifBrand == true &&
                                                ifCategory == false
                                            ) {
                                                outputText +=
                                                    '</div></div><div class="suggestColumn2">';
                                            } else if (ifBrand ==
                                                true && ifCategory ==
                                                true) {
                                                outputText +=
                                                    '<div class="suggestColumn1">';
                                            } else {
                                                outputText +=
                                                    '</div>';
                                            }
                                            outputText +=
                                                '<div class="suggestRowProduct" onMouseDown="' +
                                                pInstanceName +
                                                '.handleSuggestRedirect();"><div class="' +
                                                pSuggestHeaderClass +
                                                '" ><p>' +
                                                ptranslation[
                                                    'productName'] +
                                                '</p></div>';
                                        }
                                        ifProduct = false;
                                        break;
                                    case 'brand':
                                        if (ifBrand == true) {
                                            if (ifProduct == true &&
                                                ifCategory == false
                                            ) {
                                                outputText +=
                                                    '</div></div><div class="suggestColumn2">';
                                            } else if (ifProduct ==
                                                true && ifCategory ==
                                                true) {
                                                outputText +=
                                                    '<div class="suggestColumn1">';
                                            } else {
                                                outputText +=
                                                    '</div>';
                                            }
                                            outputText +=
                                                '<div class="suggestRowBrand" onMouseDown="' +
                                                pInstanceName +
                                                '.handleClick();"><div class="' +
                                                pSuggestHeaderClass +
                                                '" ><p>' +
                                                ptranslation[
                                                    'brand'] +
                                                '</p></div>';
                                        }
                                        ifBrand = false;
                                        break;
                                    default:
                                        break;
                                }
                                outputText += '<div id="' + id +
                                    '" class="' + pSuggestRowClass +
                                    '" onMouseOver="' +
                                    pInstanceName +
                                    '.handleMouseOver(' + id +
                                    ');" onMouseOut="' +
                                    pInstanceName +
                                    '.handleMouseOut(' + id +
                                    ');">' + '<span class="' + (
                                        suggestTypeText ==
                                        'category' ?
                                        'suggestTextCategoryName' :
                                        'suggestTextQuery') + '">' +
                                    suggestQuery.replace(new RegExp(
                                            "(" + query + ")", "ig"
                                        ), '<span class="' +
                                        pSuggestQueryTypedClass +
                                        '">$1</span>') + (
                                        suggestTypeText ==
                                        'category' ?
                                        ' <span class="suggestTextCategoryPath">' +
                                        parentCategory + '</span>' :
                                        '') + ((productSavings != 0 &&
                                            suggestTypeText ==
                                            'productName') ?
                                        ' <span class="suggestTextPriceStrike">' +
                                        productOldPrice + '</span>' :
                                        '') + (suggestTypeText ==
                                        'productName' ? (
                                            productSavings != 0 ?
                                            ' <span class="suggestTextPriceSale">' +
                                            productPrice +
                                            '</span>' :
                                            ' <span class="suggestTextPrice">' +
                                            productPrice +
                                            '</span>') : '') +
                                    '</span>' + '<span class="' +
                                    pSuggestAmountClass + '">(' +
                                    suggestCount + ')</span>' +
                                    '</div>';
                            }
                            pSuggest[i] = id + suggestQuery;
                        }
                        if (layout == 1) {
                            outputText += '</table>';
                        } else {
                            outputText +=
                                '</div></div></div><div class="' +
                                pSuggestFooterClass + '" colspan="' +
                                (3 + pShowImages) +
                                '">&nbsp;</div>';
                        }
                        $('div#' + pLayerName).html(outputText).show();
                        $('div#' + pLayerName).css("visibility",
                            "visible");
                        if (ifCategory) {
                            $('#suggestLayer .suggestLayer').removeClass(
                                "suggestLayer").addClass(
                                "suggestLayerHalfInner");
                            $(
                                '.suggestLayer, .suggestLayerHalfWide'
                            ).removeClass(
                                'suggestLayer suggestLayerHalfWide'
                            ).addClass("suggestLayerHalf");
                        } else if (!ifCategory && ifProduct &&
                            ifBrand) {
                            $('#suggestLayer .suggestLayer').removeClass(
                                "suggestLayer").addClass(
                                "suggestLayerHalfInner");
                            $('.suggestLayer, .suggestLayerHalf').removeClass(
                                'suggestLayer suggestLayerHalf'
                            ).addClass('suggestLayerHalfWide');
                        } else {
                            $(
                                '#suggestLayer .suggestLayerHalfInner'
                            ).removeClass(
                                'suggestLayerHalfInner').addClass(
                                'suggestLayer');
                            $(
                                '.suggestLayerHalf, .suggestLayerHalfWide'
                            ).removeClass(
                                'suggestLayerHalf suggestLayerHalfWide'
                            ).addClass("suggestLayer");
                        }
                    } else {
                        $('div#' + pLayerName).hide();
                        $('div#' + pLayerName).css("visibility",
                            "hidden");;
                    }
                }
            },
            error: function(e, xhr, settings, exception) {
                if (pDebug) {
                    alert('Error:\nHTTP result code: ' + e.status +
                        '\nrequested URL: ' + requestURL);
                }
            }
        });
        pSearchTriggered = false;
    }

    function hideLayer() {
        unmarkAll();
        $('div#' + pLayerName).css("visibility", "hidden");
        $('div#' + pLayerName).hide();
        fireSuggestLayerHidden();
    }
    this.hideLayerOutsideCall = function() {
        hideLayer();
    }

    function showLayer() {
        $('div#' + pLayerName).show();
        $('div#' + pLayerName).css("visibility", "visible");
    }

    function fireSuggestCompleted(suggestLayerIsVisible) {
        if (typeof(onSuggestCompleted) == 'function') {
            onSuggestCompleted(suggestLayerIsVisible);
        }
    }

    function fireSuggestLayerHidden() {
        if (typeof(onSuggestLayerHidden) == 'function') {
            onSuggestLayerHidden();
        }
    }

    function unmarkAll() {
        if (typeof layout == 'undefined') {
            return false;
        }
        if (layout == 1) {
            $('tr.' + pSuggestHighlightClass).each(function(i) {
                $(this).removeClass(pSuggestHighlightClass).addClass(
                    pSuggestRowClass);
            });
        } else {
            $('div.' + pSuggestHighlightClass).each(function(i) {
                $(this).removeClass(pSuggestHighlightClass).addClass(
                    pSuggestRowClass);
            });
        }
    }

    function addInputToForm(name, value) {
        var element = document.createElement('input');
        element.name = name;
        element.type = 'hidden';
        element.value = value;
        document[pFormname].appendChild(element);
    }
}

function toggleOrderDetail(num, offContent, onContent) {
    var boxPrefix = (arguments[3]) ? arguments[3] : 'orderdetail-';
    var linkPrefix = (arguments[4]) ? arguments[4] : 'orderdetaillink-';
    var pattern = boxPrefix + '(.*)';
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        var regex = '/' + pattern + '/.exec(divs[i].id)';
        var match = eval(regex);
        if (match) {
            if (divs[i].id == boxPrefix + num) {
                divs[i].style.display = (divs[i].style.display == 'none') ?
                    "block" : "none";
                document.getElementById(linkPrefix + num).innerHTML = (document
                    .getElementById(linkPrefix + num).innerHTML ==
                    offContent) ? onContent : offContent;
            } else {
                divs[i].style.display = 'none';
                document.getElementById(linkPrefix + match[1]).innerHTML =
                    offContent;
            }
        }
    }
}
var reorderFormSubmitFlag = false;

function reOrderFormSubmit(ctype, uid, orderpk) {
    var form = document.getElementById(ctype + '[' + uid + ']' + '[form]' +
        '[reOrder]');
    document.getElementById(ctype + '[' + uid + ']' + '[orderPk]').value =
        orderpk;
    if (reorderFormSubmitFlag == false) {
        if (form) {
            reorderFormSubmitFlag = true;
            form.submit();
        }
    }
}
