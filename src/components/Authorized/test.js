webpackJsonp([14], {
  "1oy2": function(t, e) {
  }, "3FtF": function(t, e) {
  }, "4Eoi": function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.filter = function(t, e) {
      var n = new Date(t), o = {
        "M+": n.getMonth() + 1,
        "d+": n.getDate(),
        "h+": n.getHours(),
        "m+": n.getMinutes(),
        "s+": n.getSeconds(),
        "q+": Math.floor((n.getMonth() + 3) / 3),
        S: n.getMilliseconds()
      };
      /(y+)/.test(e) && (e = e.replace(RegExp.$1, (n.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (var a in o) new RegExp("(" + a + ")").test(e) && (e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? o[a] : ("00" + o[a]).substr(("" + o[a]).length)));
      return e;
    };
  }, "5FGN": function(t, e) {
  }, "5FmO": function(t, e) {
  }, IcnI: function(t, e, n) {
    "use strict";
    var o, a = n("IvJb"), r = n("9rMa"), i = n("a3Yh"), s = n.n(i), c = {
      state: { fetchLoading: !1, title: "", user: null }, getters: {
        fetchLoading: function(t) {
          return t.fetchLoading;
        }, userCookie: function(t) {
          return t.user;
        }
      }, actions: {
        FETCH_LOADING: function(t, e) {
          (0, t.commit)("loading", e);
        }
      }, mutations: (o = {}, s()(o, "loading", function(t, e) {
        t.fetchLoading = e;
      }), s()(o, "userLogin", function(t, e) {
        t.user = e;
      }), s()(o, "userLogout", function(t, e) {
        t.user = e;
      }), o)
    }, u = {
      state: { cateList: [], dishList: [], cate2DishList: [], num: 0, remark: "" },
      getters: {
        cate2DishList: function(t) {
          return t.cate2DishList;
        }, num: function(t) {
          return t.num;
        }, remark: function(t) {
          return t.remark;
        }
      },
      actions: {
        setNum: function(t, e) {
          return (0, t.commit)("setNum", e);
        }, setRemark: function(t, e) {
          return (0, t.commit)("setRemark", e);
        }, setCate2DishList: function(t, e) {
          return (0, t.commit)("setCate2DishList", e);
        }
      },
      mutations: {
        setCate2DishList: function(t, e) {
          t.cate2DishList = e;
        }, setNum: function(t, e) {
          t.num = e;
        }, setRemark: function(t, e) {
          t.remark = e;
        }
      }
    }, l = n("Bjlo").Promise;
    window.Promise || (window.Promise = l), a.default.use(r.a);
    var h = new r.a.Store({ modules: { app: c, cart: u } });
    e.a = h;
  }, LMgQ: function(t, e, n) {
    "use strict";
    var o = n("rVsN"), a = n.n(o), r = n("LTzH"), i = n("VqY/"), s = {
      find: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
        return console.log("FavoriteService", "" + i.a.API_ME_URL), r.a.post(i.a.API_ME_URL + "api/favorite/index?pageno=" + t + "&pagesize=" + e).then(function(t) {
          var e = t.data.data;
          return e.list = e.list.map(function(t) {
            return t.availableState = !0, t;
          }), a.a.resolve(t.data);
        });
      }, cancelFav: function(t) {
        return r.a.post(i.a.API_ME_URL + "api/favorite/destroy", { id: t }).then(function(t) {
          return a.a.resolve(t);
        }).catch(function(t) {
          console.log(t);
        });
      }, addFav: function(t) {
        return r.a.post(i.a.API_ME_URL + "api/favorite/create", { id: t }).then(function(t) {
          return a.a.resolve(t);
        }).catch(function(t) {
          console.log(t);
        });
      }, saveOrUpdate: function() {
        return !0;
      }
    };
    e.a = s;
  }, LTzH: function(t, e, n) {
    "use strict";
    var o = n("rVsN"), a = n.n(o), r = n("aozt"), i = n.n(r), s = n("IcnI"), c = n("9ab0"), u = (n.n(c), n("VqY/"));
    i.a.defaults.timeout = 5e3;
    var l = void 0;
    i.a.interceptors.request.use(function(t) {
      return t.withCredentials = !0, s.a.state.token && (t.headers.Authorization = "token " + s.a.state.token), t.data && "false" === t.data.loading || t.params && "false" === t.params.loading || (l = new Date, s.a.dispatch("FETCH_LOADING", !0)), t;
    }, function(t) {
      return a.a.reject(t);
    }), i.a.interceptors.response.use(function(t) {
      var e = (new Date).getTime() - l.getTime();
      return e < 500 && (e = 500), setTimeout(function() {
        s.a.dispatch("FETCH_LOADING", !1);
      }, e), t;
    }, function(t) {
      s.a.dispatch("FETCH_LOADING", !1), l = new Date, console.log("request interceptor error :", t.response);
      var e = "";
      if (t.response) {
        switch (t.response.status) {
          case 401:
            var n = u.a.API_PASSPORT_URL.substring(0, u.a.API_PASSPORT_URL.length - 1);
            window.location.href = n + "/account/logout?service=" + encodeURIComponent(n + "?from=" + encodeURIComponent(window.location.href));
        }
        if (t.response.data && t.response.data.code && t.response.data.message) return e = t.response.data && t.response.data.code && t.response.data.message, a.a.reject(t.response.data);
        e = t.response.status + " " + t.response.statusText || "系统异常,请稍后再试";
      } else e = "服务超时,请稍后重试";
      Object(c.Message)({ type: "error", message: e, showClose: !0, center: !0, customClass: "common_tip" });
      var o = { code: 0, message: e };
      return a.a.reject(o);
    }), e.a = i.a;
  }, NHnr: function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var o = n("IvJb"), a = n("4YfN"), r = n.n(a), i = {
      name: "app-header", data: function() {
        return { showQuit: !1 };
      }, mounted: function() {
      }, methods: {
        showList: function(t) {
          this.showQuit = !0;
        }, hiddenList: function(t) {
          this.showQuit = !1;
        }, logout: function() {
          var t = this.CFG.API_PASSPORT_URL.substring(0, this.CFG.API_PASSPORT_URL.length - 1);
          window.location.href = t + "/account/logout?service=" + encodeURIComponent(t + "?from=" + encodeURIComponent(window.location.href));
        }
      }, computed: {
        user: function() {
          return this.$store.state.app.user;
        }
      }
    }, s = function() {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return n("div", { staticClass: "header" }, [n("div", { staticClass: "nav" }, [t._m(0), t._v(" "), n("ul", { staticClass: "link" }, [t._m(1), t._v(" "), n("router-link", {
        attrs: {
          to: "/uc",
          tag: "li"
        }
      }, [n("a", { attrs: { href: "javascript:;" } }, [t._v("个人中心")])]), t._v(" "), n("router-link", {
        attrs: {
          to: "/account",
          tag: "li"
        }
      }, [n("a", { attrs: { href: "javascript:;" } }, [t._v("帐号设置")])]), t._v(" "), t._m(2), t._v(" "), t._m(3), t._v(" "), t._m(4), t._v(" "), t._m(5), t._v(" "), t._m(6), t._v(" "), n("li", {
        staticClass: "last",
        on: {
          mouseenter: function(e) {
            t.showList(e);
          }, mouseleave: function(e) {
            t.hiddenList(e);
          }
        }
      }, [n("img", {
        staticClass: "header_img",
        attrs: { src: t.user.avatar, alt: t.user.nickName, "data-action": "menu" }
      }), t._v(" "), t.showQuit ? n("div", { staticClass: "pull_list" }, [n("a", {
        staticClass: "quit",
        attrs: { href: "javascript:void(0)" },
        on: { click: t.logout }
      }, [t._v("退出")])]) : t._e()])], 1)])]);
    };
    s._withStripped = !0;
    var c = {
      render: s, staticRenderFns: [function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("div", { staticClass: "logo" }, [e("a", { attrs: { href: "https://www.csdn.net" } })]);
      }, function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("li", [e("a", { attrs: { href: "https://www.csdn.net" } }, [this._v("首页")])]);
      }, function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("li", [e("a", { attrs: { href: "http://msg.csdn.net/" } }, [this._v("消息中心")])]);
      }, function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("li", [e("a", { attrs: { href: "https://mp.csdn.net/postlist" } }, [this._v("创作中心")])]);
      }, function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("li", [e("a", { attrs: { href: "https://my.csdn.net/my/score" } }, [this._v("我的C币")])]);
      }, function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("li", [e("a", { attrs: { href: "https://order.csdn.net/myorder" } }, [this._v("订单中心")])]);
      }, function() {
        var t = this.$createElement, e = this._self._c || t;
        return e("li", [e("a", { attrs: { href: "https://blog.csdn.net/home/help.html" } }, [this._v("帮助中心")])]);
      }]
    }, u = c;
    var l = !1;
    var h = n("C7Lr")(i, u, !1, function(t) {
      l || n("xh/0");
    }, "data-v-eb82b608", null);
    h.options.__file = "src/components/header/AppHeader.vue";
    var f = h.exports, d = {
      name: "app-loading", data: function() {
        return { proBar: 70 };
      }, props: ["colorParam", "heightParam"], mounted: function() {
      }, methods: {
        change: function() {
          var t = this, e = setInterval(function() {
            t.proBar++, 100 === t.proBar && clearInterval(e);
          }, 10);
        }
      }, created: function() {
        this.change();
      }
    }, p = function() {
      var t = this.$createElement, e = this._self._c || t;
      return e("div", { staticClass: "progress alert round" }, [e("span", {
        staticClass: "meter bar",
        style: { width: this.proBar + "%", background: this.colorParam, height: this.heightParam + "px" }
      })]);
    };
    p._withStripped = !0;
    var m = { render: p, staticRenderFns: [] }, v = m;
    var _ = !1;
    var g = n("C7Lr")(d, v, !1, function(t) {
      _ || n("1oy2");
    }, null, null);
    g.options.__file = "src/components/loading/Loading.vue";
    var L = g.exports, w = n("9rMa"), P = {
      name: "App",
      data: function() {
        return { heightParam: 2, colorParam: "#b20b13", init: !1, transitionName: "slide-left", footShow: !1 };
      },
      mounted: function() {
        document.getElementById("skeleton").style.display = "none", this.init = !0;
      },
      components: { AppHeader: f, Loading: L },
      methods: r()({}, Object(w.b)(["FETCH_LOADING"]), {
        afterLeave: function(t) {
          console.log("动画leave之后======"), this.footShow = !0;
        }
      }),
      computed: r()({}, Object(w.c)(["fetchLoading"]), {
        qqLink: {
          get: function() {
            return "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDE4MDEwNl80ODc3MzVfODAwMTgwMTA2XzJf";
          }
        }
      })
    }, R = function() {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return t.init ? n("div", { attrs: { id: "app" } }, [t.fetchLoading ? n("Loading", {
        attrs: {
          colorParam: t.colorParam,
          heightParam: t.heightParam
        }
      }) : t._e(), t._v(" "), n("transition", {
        attrs: { name: t.transitionName, mode: "out-in" },
        on: { "after-leave": t.afterLeave }
      }, [n("router-view", { staticClass: "view" })], 1)], 1) : t._e();
    };
    R._withStripped = !0;
    var C = { render: R, staticRenderFns: [] }, A = C;
    var b = !1;
    var S = n("C7Lr")(P, A, !1, function(t) {
      b || n("5FGN");
    }, null, null);
    S.options.__file = "src/App.vue";
    var O = S.exports, E = n("zO6J"), I = n("VqY/"), N = n("ZLEe"), T = n.n(N), U = n("LMgQ"), D = n("4Eoi"), F = {
      name: "vue-demo", data: function() {
        return { times: "Jun 2,2017 12:00:00" };
      }, created: function() {
        T()(D).forEach(function(t) {
          o.default.filter(t, D[t]);
        }), console.log("CFG uc", this.CFG), console.log(this.$store.state.app.user), U.a.find().then(function(t) {
          console.log("favoriteService.find:", t);
        }).catch(function(t) {
          console.error("favoriteService.find", t);
        });
      }, methods: {
        post: function() {
          this.http.get(this.CFG.API_MY_URL + "service/main/my_relation?pageno=1&pagesize=10&type=follow").then(function(t) {
            console.log(t);
          }).catch(function(t) {
            console.log(t);
          });
        }, deleteFavorite: function() {
          U.a.delete(123456).then(function(t) {
            console.log("deleteFavorite:", t);
          }).catch(function(t) {
            console.error("deleteFavorite", t);
          });
        }
      }
    }, y = function() {
      var t = this, e = t.$createElement, n = t._self._c || e;
      return n("div", [n("button", { on: { click: t.post } }, [t._v("点击测试")]), t._v(" "), n("button", { on: { click: t.deleteFavorite } }, [t._v("删除收藏")]), t._v(" "), n("div", [t._v(t._s(t._f("filter")(t.times, "yyyy.MM.dd")))])]);
    };
    y._withStripped = !0;
    var M = { render: y, staticRenderFns: [] }, k = M;
    var q = !1;
    var x = n("C7Lr")(F, k, !1, function(t) {
      q || n("3FtF");
    }, "data-v-5369224a", null);
    x.options.__file = "src/pages/uc/demo/VueDemo.vue";
    var G = x.exports, $ = n("IcnI"), j = n("Klf7"), H = function() {
      var t = null, e = j.get("UserName");
      e && (t = {
        userName: e,
        nickName: j.get("UserNick"),
        avatar: "https://avatar.csdn.net/" + j.get("AU").split("").join("/") + "/2_" + e + ".jpg"
      });
      return t;
    };
    o.default.use(E.a), E.a.prototype.goBack = function() {
      this.isBack = !0, window.history.go(-1);
    };
    var V = new E.a({
      routes: [{ path: "/", redirect: "/uc" }, {
        path: "/uc",
        component: function(t) {
          return n.e(11).then(function() {
            return t(n("7oD6"));
          }.bind(null, n)).catch(n.oe);
        },
        meta: { loginRequired: !0 },
        children: [{ path: "", redirect: "/uc/profile" }, {
          path: "profile", component: function(t) {
            return n.e(1).then(function() {
              return t(n("vVfY"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "个人资料-个人中心-CSDN" }
        }, {
          path: "favorite-list", component: function(t) {
            return Promise.all([n.e(0), n.e(9)]).then(function() {
              return t(n("Mc/b"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "我的收藏-个人中心-CSDN" }
        }, {
          path: "follow-list", component: function(t) {
            return Promise.all([n.e(0), n.e(5)]).then(function() {
              return t(n("ZBGl"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "我的关注-个人中心-CSDN" }
        }, {
          path: "fan-list", component: function(t) {
            return Promise.all([n.e(0), n.e(4)]).then(function() {
              return t(n("lNgt"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "我的粉丝-个人中心-CSDN" }
        }, { path: "vue-demo", component: G }]
      }, {
        path: "/account",
        component: function(t) {
          return n.e(10).then(function() {
            return t(n("iIUx"));
          }.bind(null, n)).catch(n.oe);
        },
        meta: { loginRequired: !0 },
        children: [{ path: "", redirect: "/account/index" }, {
          path: "index", component: function(t) {
            return n.e(8).then(function() {
              return t(n("qlDa"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "帐号安全-帐号设置-CSDN" }
        }, {
          path: "password", component: function(t) {
            return Promise.all([n.e(0), n.e(12)]).then(function() {
              return t(n("617b"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "修改密码-帐号设置-CSDN" }
        }, {
          path: "cellphone", component: function(t) {
            return Promise.all([n.e(0), n.e(3)]).then(function() {
              return t(n("Rxdy"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "修改手机-帐号设置-CSDN" }
        }, {
          path: "email", component: function(t) {
            return Promise.all([n.e(0), n.e(2)]).then(function() {
              return t(n("RnqH"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "修改邮箱-帐号设置-CSDN" }
        }, {
          path: "bind", component: function(t) {
            return Promise.all([n.e(0), n.e(7)]).then(function() {
              return t(n("0S3u"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "帐号关联-帐号设置-CSDN" }
        }, {
          path: "log", component: function(t) {
            return Promise.all([n.e(0), n.e(6)]).then(function() {
              return t(n("tu0W"));
            }.bind(null, n)).catch(n.oe);
          }, meta: { title: "登录日志-帐号设置-CSDN" }
        }]
      }, { path: "*", redirect: "/uc/profile" }]
    }), z = H();
    z && $.a.commit("userLogin", z), V.beforeEach(function(t, e, n) {
      if (window._hmt) {
        console.log("进入了window._hmt");
        var o = t.fullPath || "";
        window._hmt.push(["_trackPageview", "/#" + o]);
      }
      var a = I.a.ROOT_URL.substring(0, I.a.ROOT_URL.length - 1) + "#" + t.fullPath;
      (window.csdn.track.reportPageView({ curl: a }), t.meta.title && (document.title = t.meta.title), t.matched.some(function(t) {
        return t.meta.loginRequired;
      })) ? (console.info($.a), $.a.state.app.user ? n() : (window.location.href = I.a.API_PASSPORT_URL.substring(0, I.a.API_PASSPORT_URL.length - 1) + "?from=" + I.a.ROOT_URL.substring(0, I.a.ROOT_URL.length - 1) + "#" + t.fullPath, n(!1))) : n();
    });
    var B = V, Y = n("9ab0"), J = n.n(Y), Q = (n("tqWA"), n("nO5U"), n("5FmO"), n("LTzH")), W = n("Klf7");
    o.default.config.productionTip = !1, o.default.use(J.a), o.default.use(W), o.default.prototype.CFG = I.a, o.default.prototype.http = Q.a, new o.default({
      el: "#app",
      store: $.a,
      router: B,
      http: Q.a,
      components: { App: O },
      template: "<App/>",
      created: function() {
        console.log("APP CREATED CFG", I.a);
      }
    });
  }, "VqY/": function(t, e, n) {
    "use strict";
    console.log("环境变量: process.env=", Object({
      NODE_ENV: "production",
      API_MY_URL: "https://my.csdn.net/",
      API_PASSPORT_URL: "https://passport.csdn.net/",
      API_ME_URL: "//me.csdn.net/",
      ROOT_URL: "https://i.csdn.net/",
      STATIC_URL: "https://csdnimg.cn/release/i_pc/",
      STATIC_GLOBAL_URL: "https://g.csdnimg.cn/"
    })), e.a = {
      NODE_ENV: "production",
      ENV: "prod",
      API_MY_URL: "https://my.csdn.net/",
      API_ME_URL: "//me.csdn.net/",
      API_PASSPORT_URL: "https://passport.csdn.net/",
      STATIC_URL: "https://my.csdn.net/",
      STATIC_GLOBAL_URL: "https://my.csdn.net/",
      ROOT_URL: "https://i.csdn.net/"
    };
  }, nO5U: function(t, e) {
  }, tqWA: function(t, e) {
  }, "xh/0": function(t, e) {
  }
}, ["NHnr"]);
//# sourceMappingURL=app.7bb3707b15026d26ed05.js.map