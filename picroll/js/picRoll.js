//图片滚动
(function( $, undefined ) {
	function p() {
        for (var a = "{", c = 1; 32 >= c; c++) {
            var d = Math.floor(16 * Math.random()).toString(16), a = a + d;
            if (8 == c || 12 == c || 16 == c || 20 == c)
                a += "-"
        }
        return a + "}"
    }
    var a = $, c = require("tool");
    a.fn.picRoll = function(b) {
        var e = a.extend({width: "100%",height: "100%",datas: [],isOpenNew: !0}, b), d = a(this).css({position: "relative",overflow: "hidden"}), k = c.rand(1, 2), h = 0, g = [];
        for (b = 0; b < e.datas.length; b++) {
            var m = e.datas[b], n = c.genDefID("yiyi_picroll");
            g.push(n);
            n = a("<a/>").css({display: "block",
                width: e.width,height: e.height,cursor: "pointer",position: "absolute",left: 0,top: d.height() * b * -1}).attr({id: n,"class": "yiyi-picroll-piccontent",href: m.href,target: !0 === e.isOpenNew ? "_blank" : "_self"}).appendTo(d);
            m.title && "" != a.trim(m.title) && n.attr({alt: m.title,title: m.title});
            a("<img/>").css({border: 0,height: "100%",width: "100%"}).attr({src: m.img}).appendTo(n)
            a("<span/>").html(m.title).appendTo(n);
        }
        window.picRoll || (window.picRoll = []);
        var l = p();
        window.picRoll.push({handler: {move: function() {
                    h < e.datas.length - 1 ? h++ : h = 0;
                    var b = 0, b = 0 == h ? e.datas.length - 
                    1 : h - 1;
                    a("#" + g[b]).css({"z-index": 99});
                    a("#" + g[h]).css({top: -1 * d.height(),"z-index": 999}).animate({top: 0}, 500, function() {
                        a("#" + g[b]).css({top: -1 * d.height()})
                    });
                    window.setTimeout(function() {
                        var a = l, b;
                        window.picRollHasRolle.split(",").length == window.picRoll.length + 1 && (window.picRollHasRolle = "");
                        for (var d = !0; d; )
                            a = c.rand(1, window.picRoll.length) - 1, b = window.picRoll[a], a = b.id, d = 0 <= window.picRollHasRolle.indexOf(a + ",") ? !0 : !1;
                        window.picRollHasRolle += a + ",";
                        b.handler.move()
                    }, 1E3 * k)
                }},id: l});
        window.picRollStart || 
        (window.setTimeout(function() {
            var a;
            a = window.picRoll[c.rand(1, window.picRoll.length) - 1];
            _guid = a.id;
            window.picRollHasRolle = _guid + ",";
            a.handler.move()
        }, 1E3 * k), window.picRollStart = !0)
    }
})( jQuery );