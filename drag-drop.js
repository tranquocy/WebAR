!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var t;
    (t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (t.registerAframeClickDragComponent = e());
  }
})(function () {
  return (function e(t, n, o) {
    function r(c, u) {
      if (!n[c]) {
        if (!t[c]) {
          var a = "function" == typeof require && require;
          if (!u && a) return a(c, !0);
          if (i) return i(c, !0);
          var f = new Error("Cannot find module '" + c + "'");
          throw ((f.code = "MODULE_NOT_FOUND"), f);
        }
        var d = (n[c] = { exports: {} });
        t[c][0].call(
          d.exports,
          function (e) {
            var n = t[c][1][e];
            return r(n ? n : e);
          },
          d,
          d.exports,
          e,
          t,
          n,
          o
        );
      }
      return n[c].exports;
    }
    for (
      var i = "function" == typeof require && require, c = 0;
      c < o.length;
      c++
    )
      r(o[c]);
    return r;
  })(
    {
      1: [
        function (e, t, n) {
          "use strict";
          function o(e, t) {
            return (t = { exports: {} }), e(t, t.exports), t.exports;
          }
          function r(e) {
            for (var t = e; t.parent; ) t = t.parent;
            t.updateMatrixWorld(!0);
          }
          function i(e, t) {
            for (; e.attachedToParent; ) (e = e.parentElement), t(e);
          }
          function c(e, t) {
            for (; e.attachedToParent; )
              if (((e = e.parentElement), t(e))) return !0;
            return !1;
          }
          function u(e, t) {
            t.set(
              e.components.position.data.x,
              e.components.position.data.y,
              e.components.position.data.z
            ),
              i(e, function (e) {
                e.components &&
                  e.components.position &&
                  t.set(
                    t.x + e.components.position.data.x,
                    t.y + e.components.position.data.y,
                    t.z + e.components.position.data.z
                  );
              });
          }
          function a(e, t, n) {
            return r(t), t.localToWorld(n);
          }
          function f(e, t, n, o, r, i) {
            return { x: ((e - n) / r) * 2 - 1, y: 2 * -((t - o) / i) + 1 };
          }
          function d(e, t, n) {
            var o = t / e.dot(n);
            return n.multiplyScalar(o);
          }
          function s(e, t, n, o, r, i) {
            function u(i) {
              var c = i.clientX,
                u = i.clientY;
              x = { clientX: c, clientY: u };
              var a = T(e, o, { x: c, y: u }),
                f = O(e, o, o.components.camera.camera, a, r),
                p = f.x,
                h = f.y,
                E = f.z,
                z = void 0;
              (z = v.copy(s)),
                g.set(n.x, n.y, n.z),
                (z = v.multiply(d.getWorldQuaternion())),
                g.applyQuaternion(z),
                j || (z.multiply(l), y.setFromQuaternion(z, m)),
                (w.x = e.Math.radToDeg(y.x)),
                (w.y = e.Math.radToDeg(y.y)),
                (w.z = e.Math.radToDeg(y.z));
              var D = { x: p - g.x, y: h - g.y, z: E - g.z };
              t.parentEl !== t.sceneEl &&
                (g.set(D.x, D.y, D.z),
                t.parentEl.object3D.worldToLocal(g),
                (D.x = g.x),
                (D.y = g.y),
                (D.z = g.z)),
                t.emit(b, {
                  nextPosition: D,
                  nextRotation: w,
                  clientX: c,
                  clientY: u
                }),
                t.setAttribute("position", D),
                t.setAttribute("rotation", w);
            }
            function a(e) {
              var t = p(e.changedTouches, 1),
                n = t[0];
              u(n);
            }
            function f(e) {
              var t = e.detail;
              ("position" !== t.name && "rotation" !== t.name) ||
                h(t.oldData, t.newData) ||
                u(x);
            }
            var d = o.components.camera.camera,
              s = d.getWorldQuaternion().inverse(),
              l = t.object3D.getWorldQuaternion(),
              m = t.object3D.rotation.order,
              v = new e.Quaternion(),
              y = t.object3D.rotation.clone(),
              g = new e.Vector3(n.x, n.y, n.z),
              x = i,
              w = {
                x: e.Math.radToDeg(y.x),
                y: e.Math.radToDeg(y.y),
                z: e.Math.radToDeg(y.z)
              },
              E = t.sceneEl.systems.camera.activeCameraEl,
              j = c(t, function (e) {
                return e === E;
              });
            return (
              document.addEventListener("mousemove", u),
              document.addEventListener("touchmove", a),
              o.addEventListener("componentchanged", f),
              function (e) {
                document.removeEventListener("mousemove", u),
                  document.removeEventListener("touchmove", a),
                  o.removeEventListener("componentchanged", f);
              }
            );
          }
          function l(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : g,
              n = e.THREE;
            e.registerComponent(t, {
              schema: {},
              init: function () {
                W(this, n, t);
              },
              update: function () {},
              remove: function () {
                C(this);
              },
              pause: function () {
                C(this);
              },
              play: function () {
                W(this, n, t);
              }
            });
          }
          var p = (function () {
              function e(e, t) {
                var n = [],
                  o = !0,
                  r = !1,
                  i = void 0;
                try {
                  for (
                    var c, u = e[Symbol.iterator]();
                    !(o = (c = u.next()).done) &&
                    (n.push(c.value), !t || n.length !== t);
                    o = !0
                  );
                } catch (e) {
                  (r = !0), (i = e);
                } finally {
                  try {
                    !o && u.return && u.return();
                  } finally {
                    if (r) throw i;
                  }
                }
                return n;
              }
              return function (t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance"
                );
              };
            })(),
            m =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            v = o(function (e, t) {
              function n(e) {
                var t = [];
                for (var n in e) t.push(n);
                return t;
              }
              (t = e.exports =
                "function" == typeof Object.keys ? Object.keys : n),
                (t.shim = n);
            }),
            y = o(function (e, t) {
              function n(e) {
                return (
                  "[object Arguments]" == Object.prototype.toString.call(e)
                );
              }
              function o(e) {
                return (
                  (e &&
                    "object" ==
                      ("undefined" == typeof e ? "undefined" : m(e)) &&
                    "number" == typeof e.length &&
                    Object.prototype.hasOwnProperty.call(e, "callee") &&
                    !Object.prototype.propertyIsEnumerable.call(e, "callee")) ||
                  !1
                );
              }
              var r =
                "[object Arguments]" ==
                (function () {
                  return Object.prototype.toString.call(arguments);
                })();
              (t = e.exports = r ? n : o),
                (t.supported = n),
                (t.unsupported = o);
            }),
            h = o(function (e) {
              function t(e) {
                return null === e || void 0 === e;
              }
              function n(e) {
                return !(
                  !e ||
                  "object" !== ("undefined" == typeof e ? "undefined" : m(e)) ||
                  "number" != typeof e.length ||
                  "function" != typeof e.copy ||
                  "function" != typeof e.slice ||
                  (e.length > 0 && "number" != typeof e[0])
                );
              }
              function o(e, o, a) {
                var f, d;
                if (t(e) || t(o)) return !1;
                if (e.prototype !== o.prototype) return !1;
                if (c(e))
                  return (
                    !!c(o) && ((e = r.call(e)), (o = r.call(o)), u(e, o, a))
                  );
                if (n(e)) {
                  if (!n(o)) return !1;
                  if (e.length !== o.length) return !1;
                  for (f = 0; f < e.length; f++) if (e[f] !== o[f]) return !1;
                  return !0;
                }
                try {
                  var s = i(e),
                    l = i(o);
                } catch (e) {
                  return !1;
                }
                if (s.length != l.length) return !1;
                for (s.sort(), l.sort(), f = s.length - 1; f >= 0; f--)
                  if (s[f] != l[f]) return !1;
                for (f = s.length - 1; f >= 0; f--)
                  if (((d = s[f]), !u(e[d], o[d], a))) return !1;
                return (
                  ("undefined" == typeof e ? "undefined" : m(e)) ===
                  ("undefined" == typeof o ? "undefined" : m(o))
                );
              }
              var r = Array.prototype.slice,
                i = v,
                c = y,
                u = (e.exports = function (e, t, n) {
                  return (
                    n || (n = {}),
                    e === t ||
                      (e instanceof Date && t instanceof Date
                        ? e.getTime() === t.getTime()
                        : !e ||
                          !t ||
                          ("object" !=
                            ("undefined" == typeof e ? "undefined" : m(e)) &&
                            "object" !=
                              ("undefined" == typeof t ? "undefined" : m(t)))
                        ? n.strict
                          ? e === t
                          : e == t
                        : o(e, t, n))
                  );
                });
            }),
            g = "click-drag",
            x = "dragstart",
            b = "dragmove",
            w = "dragend",
            E = 100,
            j = (function () {
              function e(e) {
                return (n = new e.Matrix4()), !0;
              }
              var t = !1,
                n = void 0;
              return {
                unproject: function (o, r, i) {
                  var c = i.components.camera.camera;
                  return (
                    (t = t || e(o)),
                    r.applyProjection(n.getInverse(c.projectionMatrix)),
                    a(o, c, r)
                  );
                }
              };
            })(),
            z = j.unproject,
            D = (function () {
              function e(e) {
                return (n = new e.Vector3()), (o = new e.Vector3()), !0;
              }
              var t = !1,
                n = void 0,
                o = void 0;
              return {
                screenCoordsToDirection: function (r, i, c) {
                  var a = c.x,
                    d = c.y;
                  t = t || e(r);
                  var s = f(a, d, 0, 0, window.innerWidth, window.innerHeight),
                    l = s.x,
                    p = s.y;
                  n.set(l, p, -1);
                  var m = z(r, n, i);
                  u(i, o);
                  var v = m.sub(o).normalize(),
                    y = v.x,
                    h = v.y,
                    g = v.z;
                  return { x: y, y: h, z: g };
                }
              };
            })(),
            T = D.screenCoordsToDirection,
            L = (function () {
              function e(e) {
                return (n = new e.Vector3()), (o = new e.Vector3()), !0;
              }
              var t = !1,
                n = void 0,
                o = void 0;
              return {
                directionToWorldCoords: function (r, i, c, a, f) {
                  var s = a.x,
                    l = a.y,
                    p = a.z;
                  (t = t || e(r)), u(i, o), n.set(s, l, p);
                  var m = d(c.getWorldDirection(), f, n),
                    v = m.add(o),
                    y = v.x,
                    h = v.y,
                    g = v.z;
                  return { x: y, y: h, z: g };
                }
              };
            })(),
            O = L.directionToWorldCoords,
            M = (function () {
              function e(e) {
                return (
                  (i = new e.Plane()),
                  (n = new e.Vector3()),
                  (o = new e.Vector3()),
                  (r = new e.Raycaster()),
                  (r.far = 1 / 0),
                  (r.near = 0),
                  !0
                );
              }
              var t = !1,
                n = void 0,
                o = void 0,
                r = void 0,
                i = void 0;
              return {
                selectItem: function (c, a, f, d, s) {
                  t = t || e(c);
                  var l = T(c, f, { x: d, y: s }),
                    p = l.x,
                    m = l.y,
                    v = l.z;
                  u(f, n), o.set(p, m, v), r.set(n, o);
                  var y = Array.from(
                      f.sceneEl.querySelectorAll("[" + a + "]")
                    ).map(function (e) {
                      return e.object3D;
                    }),
                    h = !0,
                    g = r
                      .intersectObjects(y, h)
                      .filter(function (e) {
                        return !!e.object.el;
                      })
                      .filter(function (e) {
                        return e.object.parent.visible;
                      })[0];
                  if (!g) return {};
                  var x = g.point,
                    b = g.object;
                  i.setFromNormalAndCoplanarPoint(
                    f.components.camera.camera
                      .getWorldDirection()
                      .clone()
                      .negate(),
                    x.clone().sub(n)
                  );
                  var w = i.constant,
                    E = x.sub(b.getWorldPosition());
                  return { depth: w, offset: E, element: b.el };
                }
              };
            })(),
            S = M.selectItem,
            A = (function () {
              function e(e, t) {
                function r() {
                  for (
                    var e = performance.now();
                    g.length && e - g[0].time > E;

                  )
                    g.shift();
                }
                function i(e) {
                  var t = e.detail.nextPosition;
                  r(),
                    g.push({
                      position: Object.assign({}, t),
                      time: performance.now()
                    });
                }
                function c(n) {
                  var r = n.clientX,
                    c = n.clientY,
                    u = S(e, t, v, r, c),
                    a = u.depth,
                    f = u.offset,
                    d = u.element;
                  d &&
                    !(function () {
                      var t = s(e, d, f, v, a, { clientX: r, clientY: c });
                      (y = d),
                        (h = {
                          offset: { x: f.x, y: f.y, z: f.z },
                          depth: a,
                          clientX: r,
                          clientY: c
                        }),
                        d.addEventListener(b, i),
                        (o = function (e) {
                          d.removeEventListener(b, i), t && t(), (t = null);
                        }),
                        d.emit(x, h);
                    })();
                }
                function u() {
                  if (g.length < 2) return 0;
                  var e = g[g.length - 1],
                    t = g[0],
                    n = 1e3 / (e.time - t.time);
                  return {
                    x: (e.position.x - t.position.x) * n,
                    y: (e.position.y - t.position.y) * n,
                    z: (e.position.z - t.position.z) * n
                  };
                }
                function a(e) {
                  var t = e.clientX,
                    n = e.clientY;
                  if (y) {
                    r();
                    var i = u();
                    y.emit(
                      w,
                      Object.assign({}, h, {
                        clientX: t,
                        clientY: n,
                        velocity: i
                      })
                    ),
                      o && o(),
                      (o = void 0);
                  }
                }
                function f(e) {
                  var t = p(e.changedTouches, 1),
                    n = t[0];
                  c(n);
                }
                function d(e) {
                  var t = p(e.changedTouches, 1),
                    n = t[0];
                  a(n);
                }
                function l() {
                  (v = m.camera.el),
                    document.addEventListener("mousedown", c),
                    document.addEventListener("mouseup", a),
                    document.addEventListener("touchstart", f),
                    document.addEventListener("touchend", d),
                    (n = function (e) {
                      document.removeEventListener("mousedown", c),
                        document.removeEventListener("mouseup", a),
                        document.removeEventListener("touchstart", f),
                        document.removeEventListener("touchend", d);
                    });
                }
                var m = document.querySelector("a-scene"),
                  v = void 0,
                  y = void 0,
                  h = void 0,
                  g = [];
                m.hasLoaded ? l() : m.addEventListener("loaded", l);
              }
              function t() {
                n && n(), (n = void 0);
              }
              var n = void 0,
                o = void 0,
                r = [];
              return {
                didMount: function (t, n, o) {
                  0 === r.length && e(n, o), r.indexOf(t) === -1 && r.push(t);
                },
                didUnmount: function (e) {
                  var n = r.indexOf(e);
                  o && o(),
                    (o = void 0),
                    n !== -1 && (r.splice(n, 1), 0 === r.length && t());
                }
              };
            })(),
            W = A.didMount,
            C = A.didUnmount;
          t.exports = l;
        },
        {}
      ]
    },
    {},
    [1]
  )(1);
});
//# sourceMappingURL=aframe-click-drag-component.min.js.map
