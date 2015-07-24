/**
 *工具
 */

define(['jquery'],function($) {
	var d = {};
	d.escapeHTML = function(a) {
        if (a) {
            a = d.unescapeHTML(a);
            var c = document.createElement("div");
            a = document.createTextNode(a);
            c.appendChild(a);
            return c.innerHTML
        }
    };
    d.unescapeHTML = function(a) {
        a = (a + "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        return a = a.replace(/&quot;/g, '"')
    };
    d.IYOHO_clone = function(a) {
        if ("object" != typeof a || null == a)
            return a;
        var c = {};
        a.length && (c = []);
        for (var b in a)
            c[b] = IYOHO_clone(a[b]);
        return c
    };
    d.IYOHO_Object2Array = function(a) {
        var c = 
        [], b;
        for (b in a)
            c.push(a[b]);
        return c
    };
    d.timeFormat = function(a, c) {
        var b = a.getDate(), e = a.getMonth() + 1, d = a.getFullYear();
        10 > b && (b = "0" + b);
        10 > e && (e = "0" + e);
        return d + c + e + c + b
    };
    d.request = function(a) {
        a: {
            for (var c = window.document.location.href, b = c.indexOf("?"), c = c.substr(b + 1).split("&"), b = 0; b < c.length; b++) {
                var e = c[b].split("=");
                if (e[0].toUpperCase() == a.toUpperCase()) {
                    a = e[1];
                    break a
                }
            }
            a = ""
        }
        return a
    };
    d.cookie = function(a, c, b) {
        if ("undefined" != typeof c) {
            b = b || {};
            null === c && (c = "", b.expires = -1);
            var e = "";
            b.expires && ("number" == 
            typeof b.expires || b.expires.toUTCString) && ("number" == typeof b.expires ? (e = new Date, e.setTime(e.getTime() + 864E5 * b.expires)) : e = b.expires, e = "; expires=" + e.toUTCString());
            var f = b.path ? "; path=" + b.path : "", k = b.domain ? "; domain=" + b.domain : "";
            b = b.secure ? "; secure" : "";
            document.cookie = [a, "=", encodeURIComponent(c), e, f, k, b].join("")
        } else {
            c = null;
            if (document.cookie && "" != document.cookie)
                for (b = document.cookie.split(";"), e = 0; e < b.length; e++)
                    if (f = d.trim(b[e]), f.substring(0, a.length + 1) == a + "=") {
                        c = decodeURIComponent(f.substring(a.length + 
                        1));
                        break
                    }
            return c
        }
    };
    d.trim = function(a) {
        if (String.prototype.trim)
            return null == a ? "" : String.prototype.trim.call(a);
        var c = /^\s+/, b = /\s+$/;
        return null == a ? "" : a.toString().replace(c, "").replace(b, "")
    };
    d.IYOHO_isEmail = function(a) {
        return /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/.test(a)
    };
    d.IYOHO_isQQ = function(a) {
        return /^[1-9]\d{4,10}$/.test(a)
    };
    d.IYOHO_isTel = function(a) {
        return /^\s*[.0-9]{8,11}\s*$/.test(a)
    };
    d.IYOHO_isPostcode = function(a) {
        return /^[0-9]\d{5}(?!\d)/.test(a)
    };
    d.IYOHO_isUserName = function(a) {
        return /^[^@\/\'\\\"#$%&\^\*]+$/.test(a)
    };
    d.IYOHO_isURL = function(a) {
        return /^((http(s)?|ftp|telnet|news|rtsp|mms):\/\/)?(((\w(\-*\w)*\.)+[a-zA-Z]{2,4})|(((1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d).){3}(1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d).?))(:\d{0,5})?(\/+.*)*$/.test(a)
    };
    d.getZodiac = function(a, c) {
        var b = new Date(1999, a - 1, c, 0, 0, 0), e = [];
        e.push(["\u6469\u7faf\u5ea7", new Date(1999, 0, 1, 0, 0, 0)]);
        e.push(["\u6c34\u74f6\u5ea7", new Date(1999, 0, 20, 0, 0, 0)]);
        e.push(["\u53cc\u9c7c\u5ea7", new Date(1999, 1, 19, 0, 0, 0)]);
        e.push(["\u7267\u7f8a\u5ea7", new Date(1999, 2, 
            21, 0, 0, 0)]);
        e.push(["\u91d1\u725b\u5ea7", new Date(1999, 3, 21, 0, 0, 0)]);
        e.push(["\u53cc\u5b50\u5ea7", new Date(1999, 4, 21, 0, 0, 0)]);
        e.push(["\u5de8\u87f9\u5ea7", new Date(1999, 5, 22, 0, 0, 0)]);
        e.push(["\u72ee\u5b50\u5ea7", new Date(1999, 6, 23, 0, 0, 0)]);
        e.push(["\u5904\u5973\u5ea7", new Date(1999, 7, 23, 0, 0, 0)]);
        e.push(["\u5929\u79e4\u5ea7", new Date(1999, 8, 23, 0, 0, 0)]);
        e.push(["\u5929\u874e\u5ea7", new Date(1999, 9, 23, 0, 0, 0)]);
        e.push(["\u5c04\u624b\u5ea7", new Date(1999, 10, 22, 0, 0, 0)]);
        e.push(["\u6469\u7faf\u5ea7", new Date(1999, 
            11, 22, 0, 0, 0)]);
        for (var d = e.length - 1; 0 <= d; d--)
            if (b >= e[d][1])
                return e[d][0]
    };
    d.getShengxiao = function(a) {
        var c = "\u7334\u9e21\u72d7\u732a\u9f20\u725b\u864e\u5154\u9f99\u86c7\u9a6c\u7f8a".split("");
        return /^\d{4}$/.test(a) ? c[a % 12] : null
    };
    d.unique = function(a) {
        a = a || [];
        for (var c = {}, b = 0, e = a.length; b < e; b++) {
            var d = a[b];
            "undefined" == typeof c[d] && (c[d] = 1)
        }
        a.length = 0;
        for (b in c)
            a[a.length] = b;
        return a
    };
    d.genDefID = function(a) {
        var c = (new Date).getTime() + "";
        return a + "_" + c.substring(c.length - 6) + "_" + Math.round(1E3 * Math.random())
    };
    d.fucCheckLength = function(a) {
        var c, b;
        for (c = b = 0; c < a.length; c++)
            b = 0 <= a.charCodeAt(c) && 255 >= a.charCodeAt(c) ? b + 1 : b + 2;
        return b
    };
    d.limitWords = function(a, c) {
        var b = "", b = d.unescapeHTML(a);
        if (d.fucCheckLength(b) > c) {
            for (var b = a = d.unescapeHTML(a), e = c - 1, f = 0, k = b.length, h = b.length, g = 0; g < b.length; g++)
                if (0 >= f && (k = g), 128 > b.charCodeAt(g) ? f++ : f += 2, f > e) {
                    h = g;
                    break
                }
            b = b.substring(k, h);
            b = d.escapeHTML(b);
            b += "..."
        } else
            b = a;
        return b
    };
    d.checkCapsLock = function(a) {
        valueCapsLock = a.which;
        return 65 <= valueCapsLock && 90 >= valueCapsLock && 
        !a.shiftKey ? !0 : !1
    };
    d.getPos = function(a) {
        var c = 0, b = 0;
        if (a.offsetParent)
            for (; a.offsetParent; )
                c += a.offsetLeft, b += a.offsetTop, a = a.offsetParent;
        return [b, c]
    };
    d.getCssVal = function(a, c) {
        return a.currentStyle ? a.currentStyle[c] : document.defaultView.getComputedStyle(a, !1)[c]
    };
    d.isArray = function(a) {
        return "[object Array]" === Object.prototype.toString.apply(a)
    };
    Date.prototype.format = function(a) {
        var c = {"M+": this.getMonth() + 1,"d+": this.getDate(),"h+": this.getHours(),"m+": this.getMinutes(),"s+": this.getSeconds(),"q+": Math.floor((this.getMonth() + 
            3) / 3),S: this.getMilliseconds()};
        /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var b in c)
            (new RegExp("(" + b + ")")).test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? c[b] : ("00" + c[b]).substr(("" + c[b]).length)));
        return a
    };
    d.getFlash = function(a) {
        return -1 != navigator.appName.indexOf("Microsoft") && -1 == navigator.appVersion.indexOf("MSIE 9.0") ? window[a] : document[a]
    };
    d.hasHistory = function() {
        return 0 <= navigator.userAgent.indexOf("MSIE") && 0 > navigator.userAgent.indexOf("Opera") ? 
        0 < history.length ? !0 : !1 : 1 < history.length ? !0 : !1
    };
    d.isNullObj = function(a) {
        for (var c in a)
            if (a.hasOwnProperty(c))
                return !1;
        return !0
    };
    d.rand = function(a, c) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * a + 1);
            case 2:
                return parseInt(Math.random() * (c - a + 1) + a);
            default:
                return 0
        }
    }

    return d;

})