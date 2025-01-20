"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var dummyData = require('./Helper/dummy.json');
var historyData = require('./Helper/history.json');
var seasonal = require('./Helper/seasonal.json');
var mongoose = require('mongoose');
require('./db/Configuration');
var Product = require("./db/Data/ProductsSchema");
var UserHistory = require("./db/Data/userSchema");
var cors = require('cors');
var dotenv = require('dotenv');
var app = express();
var server = require('http').createServer(app);

// Load environment variables from .env file
dotenv.config();

// Use the environment variables from the .env file
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3001;

// Middleware to allow CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON (add this before your route definitions)
app.use(express.json());

// Async function to handle available items
var findAvailableItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(sanitizedString, dummyProductsData, suggestion) {
    var _iterator, _step, _loop;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(!Array.isArray(sanitizedString) || sanitizedString.length === 0)) {
            _context2.next = 3;
            break;
          }
          throw new Error("Invalid input: sanitizedString is empty or not an array");
        case 3:
          if (!Array.isArray(suggestion)) {
            suggestion = [];
          }
          _iterator = _createForOfIteratorHelper(sanitizedString);
          _context2.prev = 5;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var word, availableItems;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  word = _step.value;
                  availableItems = dummyProductsData.filter(function (item) {
                    return item.name.toLowerCase().includes(word.toLowerCase()) && item.quantity > 0;
                  });
                  availableItems.forEach(function (item) {
                    var existingItem = suggestion.find(function (suggested) {
                      return suggested.id === item.id;
                    });
                    if (!existingItem) {
                      suggestion.push({
                        id: item.id,
                        priority: 1
                      });
                    } else {
                      existingItem.priority += 1;
                    }
                  });
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context2.next = 12;
            break;
          }
          return _context2.delegateYield(_loop(), "t0", 10);
        case 10:
          _context2.next = 8;
          break;
        case 12:
          _context2.next = 17;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t1 = _context2["catch"](5);
          _iterator.e(_context2.t1);
        case 17:
          _context2.prev = 17;
          _iterator.f();
          return _context2.finish(17);
        case 20:
          _context2.next = 26;
          break;
        case 22:
          _context2.prev = 22;
          _context2.t2 = _context2["catch"](0);
          console.error("Error finding available items:", _context2.t2.message);
          throw new Error("Failed to find available items");
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[0, 22], [5, 14, 17, 20]]);
  }));
  return function findAvailableItems(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Find history data that is in availableStoreData but not in suggestion
var AddHistoryDataIfAvailable = function AddHistoryDataIfAvailable(dummyProductsData, suggestion, transformedHistory) {
  var filteredHistoryData = transformedHistory.filter(function (historyItem) {
    var storeItem = dummyProductsData.find(function (item) {
      return item.id === historyItem.id && item.quantity > 0;
    });
    var isInSuggestion = suggestion.some(function (suggested) {
      return suggested.id === historyItem.id;
    });
    return storeItem && !isInSuggestion;
  });
  filteredHistoryData.forEach(function (item) {
    suggestion.push({
      id: item.id,
      priority: 1
    });
  });
};

// Find seasonal data that is in availableStoreData but not in suggestion
var AddSeasonalDataIfAvailable = function AddSeasonalDataIfAvailable(currentMonth, dummyProductsData, suggestion) {
  if (!seasonal[currentMonth]) {
    console.log("Invalid month");
    return;
  }
  var filteredSeasonalData = seasonal[currentMonth].filter(function (seasonalItem) {
    var storeItem = dummyProductsData.find(function (item) {
      return item.id === seasonalItem.id && item.quantity > 0;
    });
    var isInSuggestion = suggestion.some(function (suggested) {
      return suggested.id === seasonalItem.id;
    });
    return storeItem && !isInSuggestion;
  });
  filteredSeasonalData.forEach(function (item) {
    suggestion.push({
      id: item.id,
      priority: 1
    });
  });
};

// Async function to handle history items
var findItemInHistory = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(suggestion, transformedHistory) {
    var _iterator2, _step2, _loop2;
    return _regeneratorRuntime().wrap(function _callee2$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _iterator2 = _createForOfIteratorHelper(suggestion);
          _context4.prev = 2;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var suggestedItem, historyItem;
            return _regeneratorRuntime().wrap(function _loop2$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  suggestedItem = _step2.value;
                  historyItem = transformedHistory.find(function (item) {
                    return item.id === suggestedItem.id;
                  });
                  if (historyItem) {
                    suggestedItem.priority += 1;
                  }
                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _loop2);
          });
          _iterator2.s();
        case 5:
          if ((_step2 = _iterator2.n()).done) {
            _context4.next = 9;
            break;
          }
          return _context4.delegateYield(_loop2(), "t0", 7);
        case 7:
          _context4.next = 5;
          break;
        case 9:
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t1 = _context4["catch"](2);
          _iterator2.e(_context4.t1);
        case 14:
          _context4.prev = 14;
          _iterator2.f();
          return _context4.finish(14);
        case 17:
          _context4.next = 23;
          break;
        case 19:
          _context4.prev = 19;
          _context4.t2 = _context4["catch"](0);
          console.error("Error finding available items:", _context4.t2.message);
          throw new Error("Failed to find available items");
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee2, null, [[0, 19], [2, 11, 14, 17]]);
  }));
  return function findItemInHistory(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

// Async function to handle seasonal items
var findItemInSeasonal = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(currentMonth, suggestion) {
    var _iterator3, _step3, _loop3;
    return _regeneratorRuntime().wrap(function _callee3$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (seasonal[currentMonth]) {
            _context6.next = 3;
            break;
          }
          throw new Error("No data found for the month: ".concat(currentMonth));
        case 3:
          _iterator3 = _createForOfIteratorHelper(suggestion);
          _context6.prev = 4;
          _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
            var suggestedItem, seasonalItems, seasonalItem;
            return _regeneratorRuntime().wrap(function _loop3$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  suggestedItem = _step3.value;
                  seasonalItems = seasonal[currentMonth];
                  seasonalItem = seasonalItems.find(function (item) {
                    return item.id === suggestedItem.id;
                  });
                  if (seasonalItem) {
                    suggestedItem.priority += 1;
                  }
                case 4:
                case "end":
                  return _context5.stop();
              }
            }, _loop3);
          });
          _iterator3.s();
        case 7:
          if ((_step3 = _iterator3.n()).done) {
            _context6.next = 11;
            break;
          }
          return _context6.delegateYield(_loop3(), "t0", 9);
        case 9:
          _context6.next = 7;
          break;
        case 11:
          _context6.next = 16;
          break;
        case 13:
          _context6.prev = 13;
          _context6.t1 = _context6["catch"](4);
          _iterator3.e(_context6.t1);
        case 16:
          _context6.prev = 16;
          _iterator3.f();
          return _context6.finish(16);
        case 19:
          _context6.next = 25;
          break;
        case 21:
          _context6.prev = 21;
          _context6.t2 = _context6["catch"](0);
          console.error("Error finding available items:", _context6.t2.message);
          throw new Error("Failed to find available items");
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee3, null, [[0, 21], [4, 13, 16, 19]]);
  }));
  return function findItemInSeasonal(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var sanitizeAndCleanString = function sanitizeAndCleanString(key1) {
  var sanitizedArray = key1.replace(/[^a-zA-Z\s]/g, "").toLowerCase().split(/\s+/).filter(function (word) {
    return word.length > 1;
  });
  var uniqueWords = _toConsumableArray(new Set(sanitizedArray));
  return uniqueWords;
};
var getCurrentMonthInIndia = function getCurrentMonthInIndia() {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var currentMonth = months[new Date().getMonth()];
  return currentMonth;
};

// Function to make suggestions
var CallSuggestion = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(key1, transformedHistory) {
    var suggestion, dummyProductsData, sanitizedString, currectMonth;
    return _regeneratorRuntime().wrap(function _callee4$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          suggestion = [];
          _context7.next = 4;
          return Product.find();
        case 4:
          dummyProductsData = _context7.sent;
          sanitizedString = sanitizeAndCleanString(key1);
          currectMonth = getCurrentMonthInIndia();
          _context7.next = 9;
          return findAvailableItems(sanitizedString, dummyProductsData, suggestion);
        case 9:
          _context7.next = 11;
          return findItemInHistory(suggestion, transformedHistory);
        case 11:
          _context7.next = 13;
          return findItemInSeasonal(currectMonth, suggestion);
        case 13:
          AddHistoryDataIfAvailable(dummyProductsData, suggestion, transformedHistory);
          AddSeasonalDataIfAvailable(currectMonth, dummyProductsData, suggestion);
          suggestion.sort(function (a, b) {
            return b.priority - a.priority;
          });
          return _context7.abrupt("return", suggestion);
        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](0);
          console.error("Error in suggestion function:", _context7.t0);
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee4, null, [[0, 19]]);
  }));
  return function CallSuggestion(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

// API endpoint to send suggestion data to the frontend
app.post('/api/suggestion/:username', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var username, key1, user, suggestion, userHistory, transformedHistory, uniqueSuggestions, products, makeFormatedData, isValidData;
    return _regeneratorRuntime().wrap(function _callee5$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          username = req.params.username;
          key1 = req.body.key1;
          if (req.body) {
            _context8.next = 5;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid request: "key1" is required in the request body'
          }));
        case 5:
          _context8.next = 7;
          return UserHistory.findOne({
            username: username
          });
        case 7:
          user = _context8.sent;
          if (!user) {
            user = new UserHistory({
              username: username,
              history: [],
              cart: []
            });
          }
          suggestion = [];
          _context8.next = 12;
          return UserHistory.findOne({
            username: username
          }).populate("history.product");
        case 12:
          userHistory = _context8.sent;
          transformedHistory = [];
          if (userHistory) {
            transformedHistory = userHistory.history.map(function (item) {
              return {
                id: item.product.id,
                name: item.product.name,
                category: item.product.category,
                price: item.product.price,
                quantity: item.product.quantity
              };
            });
          }
          if (!(key1.length > 0 && transformedHistory.length > 0)) {
            _context8.next = 24;
            break;
          }
          _context8.next = 18;
          return CallSuggestion(key1, transformedHistory);
        case 18:
          suggestion = _context8.sent;
          uniqueSuggestions = new Map();
          suggestion.forEach(function (product) {
            if (!uniqueSuggestions.has(product.id)) {
              uniqueSuggestions.set(product.id, product);
            }
          });
          suggestion = Array.from(uniqueSuggestions.values());
          _context8.next = 25;
          break;
        case 24:
          if (transformedHistory.length > 0) {
            suggestion = transformedHistory;
          }
        case 25:
          if (!(!suggestion || suggestion.length === 0)) {
            _context8.next = 27;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            success: false,
            message: 'No suggestions found'
          }));
        case 27:
          _context8.next = 29;
          return Product.find();
        case 29:
          products = _context8.sent;
          if (!products) {
            _context8.next = 35;
            break;
          }
          makeFormatedData = [];
          _context8.next = 34;
          return products.forEach(function (product) {
            var matchedItem = suggestion.find(function (item) {
              return item.id === product.id && product.quantity > 0;
            });
            if (matchedItem) {
              makeFormatedData.push(product);
            }
          });
        case 34:
          suggestion = makeFormatedData;
        case 35:
          isValidData = suggestion.every(function (product) {
            return product.id && product.name;
          });
          if (isValidData) {
            _context8.next = 38;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid product data format: id and name are required for each product'
          }));
        case 38:
          res.status(200).json({
            success: true,
            message: 'Suggestions fetched successfully',
            data: suggestion
          });
          _context8.next = 45;
          break;
        case 41:
          _context8.prev = 41;
          _context8.t0 = _context8["catch"](0);
          console.error('Error fetching suggestions:', _context8.t0);
          next(_context8.t0);
        case 45:
        case "end":
          return _context8.stop();
      }
    }, _callee5, null, [[0, 41]]);
  }));
  return function (_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());

// API endpoint to send product data to the frontend
app.get('/api/products', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var products, error;
    return _regeneratorRuntime().wrap(function _callee6$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return Product.find();
        case 3:
          products = _context9.sent;
          if (!(!products || products.length === 0)) {
            _context9.next = 8;
            break;
          }
          error = new Error('No products found in the database');
          error.statusCode = 404;
          throw error;
        case 8:
          res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products
          });
          _context9.next = 14;
          break;
        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function (_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}());

// API endpoint to add product data to the frontend
app.post('/api/addProduct', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var _req$body, id, name, category, price, quantity, error, existingProduct, _error, newProduct;
    return _regeneratorRuntime().wrap(function _callee7$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body = req.body, id = _req$body.id, name = _req$body.name, category = _req$body.category, price = _req$body.price, quantity = _req$body.quantity;
          if (!(!id || !name || !category || !price || !quantity)) {
            _context10.next = 6;
            break;
          }
          error = new Error('All fields are required: id, name, category, price, and quantity');
          error.statusCode = 400;
          throw error;
        case 6:
          _context10.next = 8;
          return Product.findOne({
            id: id
          });
        case 8:
          existingProduct = _context10.sent;
          if (!existingProduct) {
            _context10.next = 13;
            break;
          }
          _error = new Error('Product with this ID already exists');
          _error.statusCode = 409;
          throw _error;
        case 13:
          newProduct = new Product({
            id: id,
            name: name,
            category: category,
            price: price,
            quantity: quantity
          });
          _context10.next = 16;
          return newProduct.save();
        case 16:
          res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct
          });
          _context10.next = 22;
          break;
        case 19:
          _context10.prev = 19;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 22:
        case "end":
          return _context10.stop();
      }
    }, _callee7, null, [[0, 19]]);
  }));
  return function (_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}());

// API endpoint to update product data
app.put('/api/updateProduct', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var _req$body2, id, name, category, price, quantity, error, product, _error2, _error3;
    return _regeneratorRuntime().wrap(function _callee8$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name, category = _req$body2.category, price = _req$body2.price, quantity = _req$body2.quantity;
          if (id) {
            _context11.next = 6;
            break;
          }
          error = new Error('Product ID is required for updating');
          error.statusCode = 400;
          throw error;
        case 6:
          _context11.next = 8;
          return Product.findOne({
            id: id
          });
        case 8:
          product = _context11.sent;
          if (product) {
            _context11.next = 13;
            break;
          }
          _error2 = new Error('Product with this ID does not exist');
          _error2.statusCode = 404;
          throw _error2;
        case 13:
          if (!(quantity < 0)) {
            _context11.next = 17;
            break;
          }
          _error3 = new Error('Product quantity cannot be less than 0');
          _error3.statusCode = 400;
          throw _error3;
        case 17:
          if (name) product.name = name;
          if (category) product.category = category;
          if (price) product.price = price;
          if (quantity) product.quantity = quantity;
          _context11.next = 23;
          return product.save();
        case 23:
          res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
          });
          _context11.next = 29;
          break;
        case 26:
          _context11.prev = 26;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 29:
        case "end":
          return _context11.stop();
      }
    }, _callee8, null, [[0, 26]]);
  }));
  return function (_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}());

// API to add history
app.post('/api/addHistory/:username', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var username, _req$body3, productId, productName, category, price, quantity, userHistory;
    return _regeneratorRuntime().wrap(function _callee9$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          username = req.params.username;
          _req$body3 = req.body, productId = _req$body3.productId, productName = _req$body3.productName, category = _req$body3.category, price = _req$body3.price, quantity = _req$body3.quantity;
          _context12.prev = 2;
          _context12.next = 5;
          return UserHistory.findOne({
            username: username
          });
        case 5:
          userHistory = _context12.sent;
          if (!userHistory) {
            // Create new user history if not found
            userHistory = new UserHistory({
              username: username,
              history: [{
                product: {
                  id: productId,
                  name: productName,
                  category: category,
                  price: price,
                  quantity: quantity
                },
                purchaseDate: new Date()
              }]
            });
          } else {
            // Add the new purchase to the user's history
            userHistory.history.push({
              product: {
                id: productId,
                name: productName,
                category: category,
                price: price,
                quantity: quantity
              },
              purchaseDate: new Date()
            });

            // Remove the product from the user's cart by productId
            userHistory.cart = userHistory.cart.filter(function (cartItem) {
              return cartItem.product.id !== productId;
            });
          }
          // Save the updated user history
          _context12.next = 9;
          return userHistory.save();
        case 9:
          res.status(201).json({
            success: true,
            message: 'Purchase history added successfully and product removed from cart',
            data: userHistory
          });
          _context12.next = 16;
          break;
        case 12:
          _context12.prev = 12;
          _context12.t0 = _context12["catch"](2);
          console.error(_context12.t0);
          res.status(500).json({
            message: 'Internal server error'
          });
        case 16:
        case "end":
          return _context12.stop();
      }
    }, _callee9, null, [[2, 12]]);
  }));
  return function (_x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}());

// API to get history of a user by username
app.get('/api/history/:username', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var username, userHistory, transformedHistory;
    return _regeneratorRuntime().wrap(function _callee10$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          username = req.params.username;
          _context13.next = 4;
          return UserHistory.findOne({
            username: username
          }).populate("history.product");
        case 4:
          userHistory = _context13.sent;
          if (userHistory) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: "User history not found"
          }));
        case 7:
          transformedHistory = userHistory.history.map(function (item) {
            return {
              id: item.product.id,
              name: item.product.name,
              category: item.product.category,
              price: item.product.price,
              quantity: item.product.quantity
            };
          });
          res.status(200).json({
            success: true,
            message: "User history fetched successfully",
            data: transformedHistory
          });
          _context13.next = 15;
          break;
        case 11:
          _context13.prev = 11;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 15:
        case "end":
          return _context13.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function (_x24, _x25) {
    return _ref10.apply(this, arguments);
  };
}());

// API to endpoint to add product to cart or update both.
app.post('/api/handleToCart/:username', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var username, _req$body4, id, name, category, price, quantity, call, existingProduct, StoreQuantity, userCart, productIndex, productInCart;
    return _regeneratorRuntime().wrap(function _callee11$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          username = req.params.username;
          _req$body4 = req.body, id = _req$body4.id, name = _req$body4.name, category = _req$body4.category, price = _req$body4.price, quantity = _req$body4.quantity, call = _req$body4.call;
          _context14.prev = 2;
          if (!(!id || !name || !category || !price || quantity === undefined || quantity < 0)) {
            _context14.next = 5;
            break;
          }
          return _context14.abrupt("return", res.status(400).json({
            success: false,
            message: 'All fields are required: id, name, category, price, and quantity.'
          }));
        case 5:
          _context14.next = 7;
          return Product.findOne({
            id: id
          });
        case 7:
          existingProduct = _context14.sent;
          if (existingProduct) {
            _context14.next = 10;
            break;
          }
          return _context14.abrupt("return", res.status(409).json({
            success: false,
            message: 'Product with this ID does not exist in the product list.'
          }));
        case 10:
          if (!(call === "add" && existingProduct.quantity === 0)) {
            _context14.next = 12;
            break;
          }
          return _context14.abrupt("return", res.status(409).json({
            success: false,
            message: 'Product is out of stock.'
          }));
        case 12:
          // Adjust the quantities based on the action
          StoreQuantity = call === "remove" ? existingProduct.quantity + 1 : existingProduct.quantity - 1;
          if (!(StoreQuantity < 0)) {
            _context14.next = 15;
            break;
          }
          return _context14.abrupt("return", res.status(409).json({
            success: false,
            message: 'Insufficient stock to add this product.'
          }));
        case 15:
          _context14.next = 17;
          return UserHistory.findOne({
            username: username
          });
        case 17:
          userCart = _context14.sent;
          if (!userCart) {
            userCart = new UserHistory({
              username: username,
              cart: []
            });
          }

          // Check if the product is already in the user's cart
          productIndex = userCart.cart.findIndex(function (item) {
            return item.product.id === id;
          });
          if (!(productIndex >= 0)) {
            _context14.next = 25;
            break;
          }
          productInCart = userCart.cart[productIndex]; // Update the quantity of the product in the cart
          if (productInCart.product.quantity <= 1 && call === "remove") {
            // Remove the product if quantity drops to zero
            userCart.cart.splice(productIndex, 1);
          } else {
            call === "add" ? userCart.cart[productIndex].product.quantity += 1 : userCart.cart[productIndex].product.quantity -= 1;
            userCart.cart[productIndex].cartDate = new Date(); // Update cart date
          }
          _context14.next = 30;
          break;
        case 25:
          if (!(call === "add")) {
            _context14.next = 29;
            break;
          }
          // Add the product to the cart
          userCart.cart.push({
            product: {
              id: id,
              name: name,
              category: category,
              price: price,
              quantity: 1
            },
            cartDate: new Date()
          });
          _context14.next = 30;
          break;
        case 29:
          return _context14.abrupt("return", res.status(409).json({
            success: true,
            message: 'Cart is empty or product not found.',
            data: userCart
          }));
        case 30:
          _context14.next = 32;
          return userCart.save();
        case 32:
          // Update the product inventory in the store
          existingProduct.quantity = StoreQuantity;
          _context14.next = 35;
          return existingProduct.save();
        case 35:
          res.status(201).json({
            success: true,
            message: 'Product updated in cart successfully.',
            data: userCart
          });
          _context14.next = 42;
          break;
        case 38:
          _context14.prev = 38;
          _context14.t0 = _context14["catch"](2);
          console.error(_context14.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error.'
          });
        case 42:
        case "end":
          return _context14.stop();
      }
    }, _callee11, null, [[2, 38]]);
  }));
  return function (_x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}());

// API to endpoint to get all produts to cart
app.get('/api/getCart/:username', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var username, userHistory, cartProducts;
    return _regeneratorRuntime().wrap(function _callee12$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          username = req.params.username;
          _context15.prev = 1;
          _context15.next = 4;
          return UserHistory.findOne({
            username: username
          });
        case 4:
          userHistory = _context15.sent;
          if (userHistory) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            success: false,
            message: 'User not found or cart is empty.'
          }));
        case 7:
          // Retrieve the cart products
          cartProducts = userHistory.cart.map(function (cartItem) {
            return {
              id: cartItem.product.id,
              name: cartItem.product.name,
              category: cartItem.product.category,
              price: cartItem.product.price,
              quantity: cartItem.product.quantity,
              cartDate: cartItem.cartDate
            };
          });
          if (!(cartProducts.length === 0)) {
            _context15.next = 10;
            break;
          }
          return _context15.abrupt("return", res.status(200).json({
            success: true,
            message: 'Cart is empty.',
            data: []
          }));
        case 10:
          res.status(200).json({
            success: true,
            message: 'Cart products retrieved successfully.',
            data: cartProducts
          });
          _context15.next = 17;
          break;
        case 13:
          _context15.prev = 13;
          _context15.t0 = _context15["catch"](1);
          console.error(_context15.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error.'
          });
        case 17:
        case "end":
          return _context15.stop();
      }
    }, _callee12, null, [[1, 13]]);
  }));
  return function (_x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}());

// Dummy API's --------------------------------------------

// API to add dummy data on history for multiple products without removing from cart
app.post('/api/dummy/addHistory/:username', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var username, userHistory, purchaseItems, _userHistory$history;
    return _regeneratorRuntime().wrap(function _callee13$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          username = req.params.username;
          if (!(!historyData || !Array.isArray(historyData) || historyData.length === 0)) {
            _context16.next = 3;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            success: false,
            message: 'Products array is required and should not be empty'
          }));
        case 3:
          _context16.prev = 3;
          _context16.next = 6;
          return UserHistory.findOne({
            username: username
          });
        case 6:
          userHistory = _context16.sent;
          purchaseItems = historyData.map(function (product) {
            return {
              product: {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: product.quantity
              },
              purchaseDate: new Date()
            };
          });
          if (!userHistory) {
            userHistory = new UserHistory({
              username: username,
              history: purchaseItems,
              cart: []
            });
          } else {
            (_userHistory$history = userHistory.history).push.apply(_userHistory$history, _toConsumableArray(purchaseItems));
          }
          _context16.next = 11;
          return userHistory.save();
        case 11:
          res.status(201).json({
            success: true,
            message: 'Purchase history added successfully',
            data: userHistory
          });
          _context16.next = 18;
          break;
        case 14:
          _context16.prev = 14;
          _context16.t0 = _context16["catch"](3);
          console.error(_context16.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        case 18:
        case "end":
          return _context16.stop();
      }
    }, _callee13, null, [[3, 14]]);
  }));
  return function (_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}());

// API to add dummy data in product list
app.get('/api/dummy/addProducts', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res, next) {
    var products, error, invalidProducts, _error4, existingProductIds, newProducts, savedProducts;
    return _regeneratorRuntime().wrap(function _callee14$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          products = dummyData;
          if (!(!Array.isArray(products) || products.length === 0)) {
            _context17.next = 6;
            break;
          }
          error = new Error('Request body should be an array of products');
          error.statusCode = 400;
          throw error;
        case 6:
          invalidProducts = products.filter(function (product) {
            return !product.id || !product.name || !product.category || !product.price || !product.quantity;
          });
          if (!(invalidProducts.length > 0)) {
            _context17.next = 11;
            break;
          }
          _error4 = new Error('One or more products have missing fields');
          _error4.statusCode = 400;
          throw _error4;
        case 11:
          _context17.next = 13;
          return Product.find({
            'id': {
              $in: products.map(function (p) {
                return p.id;
              })
            }
          }).distinct('id');
        case 13:
          existingProductIds = _context17.sent;
          // Filter out products that already exist in the database
          newProducts = products.filter(function (product) {
            return !existingProductIds.includes(product.id);
          });
          if (!(newProducts.length > 0)) {
            _context17.next = 22;
            break;
          }
          _context17.next = 18;
          return Product.insertMany(newProducts);
        case 18:
          savedProducts = _context17.sent;
          // Save only new products to the database
          res.status(201).json({
            success: true,
            message: 'Products added successfully',
            data: savedProducts
          });
          _context17.next = 23;
          break;
        case 22:
          res.status(200).json({
            success: true,
            message: 'No new products to add'
          });
        case 23:
          _context17.next = 28;
          break;
        case 25:
          _context17.prev = 25;
          _context17.t0 = _context17["catch"](0);
          next(_context17.t0);
        case 28:
        case "end":
          return _context17.stop();
      }
    }, _callee14, null, [[0, 25]]);
  }));
  return function (_x32, _x33, _x34) {
    return _ref14.apply(this, arguments);
  };
}());

// -----------------------------------------------------------

// General error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.stack); // Log the error details for debugging purposes

  var statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
  var message = err.message || 'Internal Server Error'; // Default error message

  // Return a structured error response
  res.status(statusCode).json({
    error: true,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack // Don't send stack trace in production
  });
});

// Start the server.
mongoose.connection.on('error', function (error) {
  console.error('Error connecting to database: ', error);
});

// Check database connection.
mongoose.connection.once('open', function () {
  console.log('Database connected.');
  server.listen(port, host, function () {
    console.log("Server is running on http://".concat(host, ":").concat(port));
  });
});