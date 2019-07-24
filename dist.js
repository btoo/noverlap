"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
;
var wrappedFunctionCloner = function (config, fn, map) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var self, _a, _b, hash, _c, comparator, _d, wait, _e, start, _f, queue, _g, beforeFinish, _h, success, _j, fail, _k, finish, _l, w;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        self = this;
                        if (!(typeof config === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, config.apply(void 0, args)];
                    case 1:
                        _l = _m.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _l = config || {};
                        _m.label = 3;
                    case 3:
                        _a = _l, _b = _a.hash, hash = _b === void 0 ? undefined : _b, _c = _a.comparator, comparator = _c === void 0 ? undefined : _c, _d = _a.wait, wait = _d === void 0 ? 420 : _d, _e = _a.start, start = _e === void 0 ? undefined : _e, _f = _a.queue, queue = _f === void 0 ? undefined : _f, _g = _a.beforeFinish, beforeFinish = _g === void 0 ? undefined : _g, _h = _a.success, success = _h === void 0 ? undefined : _h, _j = _a.fail, fail = _j === void 0 ? undefined : _j, _k = _a.finish, finish = _k === void 0 ? undefined : _k;
                        w = typeof wait === 'number' ? wait : 420;
                        return [2 /*return*/, new Promise(function () {
                                var resrej = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    resrej[_i] = arguments[_i];
                                }
                                return __awaiter(_this, void 0, void 0, function () {
                                    var key, _a, keyReference, keys, existingKey, value, resolveRejects, _b, _c;
                                    var _this = this;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                if (!(typeof hash === 'function')) return [3 /*break*/, 2];
                                                return [4 /*yield*/, hash.call.apply(hash, [this].concat(args))];
                                            case 1:
                                                _a = _d.sent();
                                                return [3 /*break*/, 3];
                                            case 2:
                                                _a = args[0];
                                                _d.label = 3;
                                            case 3:
                                                key = _a;
                                                keyReference = false;
                                                if (!(typeof comparator === 'function')) return [3 /*break*/, 7];
                                                keys = map.keys();
                                                existingKey = void 0;
                                                _d.label = 4;
                                            case 4:
                                                if (!(existingKey = keys.next().value)) return [3 /*break*/, 6];
                                                return [4 /*yield*/, comparator(key, existingKey)];
                                            case 5:
                                                if (_d.sent()) {
                                                    keyReference = existingKey;
                                                    return [3 /*break*/, 6];
                                                }
                                                return [3 /*break*/, 4];
                                            case 6: return [3 /*break*/, 8];
                                            case 7:
                                                if (map.has(key)) {
                                                    keyReference = key;
                                                }
                                                _d.label = 8;
                                            case 8:
                                                if (!keyReference) return [3 /*break*/, 9];
                                                resolveRejects = map.get(keyReference);
                                                !resolveRejects && console.warn("Function invocations not found despite the existence of invocation hash.", 'Function:', fn, 'Hash:', key);
                                                value = resolveRejects || [];
                                                value.push(resrej);
                                                return [3 /*break*/, 12];
                                            case 9:
                                                value = [resrej];
                                                map.set(key, value);
                                                _b = typeof start === 'function';
                                                if (!_b) return [3 /*break*/, 11];
                                                return [4 /*yield*/, start.apply(void 0, args)];
                                            case 10:
                                                _b = (_d.sent());
                                                _d.label = 11;
                                            case 11:
                                                _b;
                                                _d.label = 12;
                                            case 12:
                                                _c = typeof queue === 'function';
                                                if (!_c) return [3 /*break*/, 14];
                                                return [4 /*yield*/, queue.apply(void 0, args)];
                                            case 13:
                                                _c = (_d.sent());
                                                _d.label = 14;
                                            case 14:
                                                _c;
                                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var result_1, _a, _b, err_1, _c, _d;
                                                    return __generator(this, function (_e) {
                                                        switch (_e.label) {
                                                            case 0:
                                                                if (!(value && value[value.length - 1] === resrej)) return [3 /*break*/, 13];
                                                                _e.label = 1;
                                                            case 1:
                                                                _e.trys.push([1, 7, 10, 13]);
                                                                _a = typeof beforeFinish === 'function';
                                                                if (!_a) return [3 /*break*/, 3];
                                                                return [4 /*yield*/, beforeFinish.apply(void 0, args)];
                                                            case 2:
                                                                _a = (_e.sent());
                                                                _e.label = 3;
                                                            case 3:
                                                                _a;
                                                                return [4 /*yield*/, fn.call.apply(fn, [this].concat(args))];
                                                            case 4:
                                                                result_1 = _e.sent();
                                                                _b = typeof success === 'function';
                                                                if (!_b) return [3 /*break*/, 6];
                                                                return [4 /*yield*/, success.apply(void 0, [result_1].concat(args))];
                                                            case 5:
                                                                _b = (_e.sent());
                                                                _e.label = 6;
                                                            case 6:
                                                                _b;
                                                                value.map(function (_a) {
                                                                    var resolve = _a[0], reject = _a[1];
                                                                    return resolve(result_1);
                                                                });
                                                                return [3 /*break*/, 13];
                                                            case 7:
                                                                err_1 = _e.sent();
                                                                result_1 = err_1;
                                                                _c = typeof fail === 'function';
                                                                if (!_c) return [3 /*break*/, 9];
                                                                return [4 /*yield*/, fail.apply(void 0, [result_1].concat(args))];
                                                            case 8:
                                                                _c = (_e.sent());
                                                                _e.label = 9;
                                                            case 9:
                                                                _c;
                                                                value.map(function (_a) {
                                                                    var resolve = _a[0], reject = _a[1];
                                                                    return reject(result_1);
                                                                });
                                                                return [3 /*break*/, 13];
                                                            case 10:
                                                                _d = typeof finish === 'function';
                                                                if (!_d) return [3 /*break*/, 12];
                                                                return [4 /*yield*/, finish.apply(void 0, [result_1].concat(args))];
                                                            case 11:
                                                                _d = (_e.sent());
                                                                _e.label = 12;
                                                            case 12:
                                                                _d;
                                                                map["delete"](keyReference);
                                                                return [7 /*endfinally*/];
                                                            case 13: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, w);
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                }
            });
        });
    };
};
/**
 * prevent function invocations (both sync and async) from redundantly overlapping with each other.
 * note that this will cause the function's return value to be async
 * @param config - noverlap configs
 * @param config.hash - a hash function of the async function parameters
 * @param config.comparator - a function used to determine if an existing key in the map is to be considered the same as a hash
 * @param config.wait - a wait time that will start on each execution of an async function and reset with every overlapping execution
 * @param config.start - a callback that is provided with the wrapped function's parameters and invoked when the wrapped function's key is hashed into the map
 * @param config.queue - a callback that is provided with the wrapped function's parameters and invoked whenever an invocation of the wrapped function is recorded
 * @param config.beforeFinish - a callback that is provided with the wrapped function's parameters and invoked right before the wrapped function
 * @param config.success - a callback that is provided with the wrapped function's invocation's result and arguments and executed after the wrapped function is successfully called
 * @param config.fail - a callback that is provided with the wrapped function's invocation's error and arguments and executed after the wrapped function is erroneously called
 * @param config.finish - a callback that is provided with the wrapped function's invocation's result and arguments and executed after the wrapped function is called
 * @returns - an instantiation of noverlap, a wrapper function used to apply noverlap to any function
 */
exports["default"] = (function (config) {
    if (config === void 0) { config = {}; }
    return function (fn) {
        var map = new Map();
        return wrappedFunctionCloner(config, fn, map);
    };
});
