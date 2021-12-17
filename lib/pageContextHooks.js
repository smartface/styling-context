"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageContextHooks = void 0;
var merge_1 = __importDefault(require("@smartface/styler/lib/utils/merge"));
var sfCorePropFactory_1 = __importDefault(require("./sfCorePropFactory"));
function pageContextHooks(hook) {
    switch (hook) {
        case 'beforeStyleDiffAssign':
            return function beforeStyleDiffAssign(styles) {
                return (0, sfCorePropFactory_1.default)(styles);
            };
        case 'reduceDiffStyleHook':
            return function reduceDiffStyleHook(oldStyles, newStyles) {
                function isEqual(oldStyle, newStyle) {
                    if (oldStyle === undefined) {
                        return false;
                    }
                    var keys1 = Object.keys(oldStyle);
                    var keys2 = Object.keys(newStyle);
                    if (keys1.length !== keys2.length) {
                        return false;
                    }
                    var res = keys2.some(function (key) {
                        return oldStyle[key] !== newStyle[key];
                    });
                    return !res;
                }
                return function diffStylingReducer(acc, key) {
                    // align is readolnly issue on Android
                    if (key === 'align') {
                        acc[key] = undefined;
                        return acc;
                    }
                    else if (key === "layout") {
                        var diffReducer = reduceDiffStyleHook(oldStyles[key] || {}, newStyles[key] || {});
                        Object.keys(newStyles[key] || {}).reduce(diffReducer, acc[key] = {});
                    }
                    else if (key == "flexProps" && newStyles[key]) {
                        Object.keys(newStyles[key])
                            .forEach(function (name) {
                            if (oldStyles[key] === undefined || newStyles[key][name] !== oldStyles[key][name]) {
                                acc[name] = newStyles[key][name];
                                if (newStyles[key][name] === null) {
                                    acc[name] = NaN;
                                    // fixes flexgrow NaN value bug
                                    if (name === "flexGrow") {
                                        acc[name] = 0;
                                    }
                                }
                                else {
                                    acc[name] = newStyles[key][name];
                                }
                            }
                        });
                    }
                    else if (newStyles[key] !== null && newStyles[key] instanceof Object) {
                        if (Object.keys(newStyles[key]).length > 0 && !isEqual(oldStyles[key] || {}, newStyles[key])) {
                            acc[key] = (0, merge_1.default)(oldStyles[key], newStyles[key]);
                        }
                    }
                    else if (oldStyles[key] !== newStyles[key]) {
                        acc[key] = newStyles[key];
                    }
                    if (acc[key] === null) {
                        acc[key] = NaN;
                    }
                    return acc;
                };
            };
    }
    return undefined;
}
exports.pageContextHooks = pageContextHooks;
//# sourceMappingURL=pageContextHooks.js.map