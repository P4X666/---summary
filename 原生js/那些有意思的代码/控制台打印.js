var i = "#1475b2"
    , c = "#42c02e"
    , u = function (e) {
        var t = e.title
            , r = e.content
            , n = e.backgroundColor
            , a = [`%c ${t}, ${r} )`, `padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060 ;`, `padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ${n} ;]`;
        return function () {
            var e;
            window.console && "function" === typeof window.console.log && (e = console).log.apply(e, arguments)
        }.apply(void 0, a)
    };

(function (e) {
    var t = e.title
        , r = e.content;
    u({
        title: t,
        content: r,
        backgroundColor: c
    })
})({
    title: "Environment",
    content: "production"
})