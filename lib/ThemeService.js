"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
var data_1 = __importDefault(require("@smartface/native/global/data"));
var ThemeContext_1 = require("@smartface/contx/lib/styling/ThemeContext");
var themeListenerKeys = [];
var ThemeService = /** @class */ (function () {
    function ThemeService(config) {
        var _this = this;
        this.config = config;
        this.themeListeners = new WeakMap();
        this.themeConfig = this.config.theme;
        this.currentTheme = data_1.default.getStringVariable('currentTheme') || this.themeConfig.currentTheme;
        this.themeSources = this.themeConfig.themes.map(function (name) { return ({
            name: name,
            // @ts-ignore
            rawStyles: require("./generated/themes/".concat(name)),
            isDefault: _this.currentTheme === name,
        }); });
        this.themeBoundry = (0, ThemeContext_1.createThemeContextBound)(this.themeSources);
        if (ThemeService.instance) {
            throw new Error("ThemeService cannot be instantiated one more");
        }
        ThemeService.instance = this;
    }
    ThemeService.prototype.addPage = function (page, name) {
        return this.themeBoundry(page, name);
    };
    ThemeService.prototype.onChange = function (listener) {
        var _this = this;
        var key = {};
        themeListenerKeys.push(key);
        this.themeListeners.set(key, listener);
        var deletionIndex = themeListenerKeys.length - 1;
        return function () {
            if (_this.themeListeners.has(key)) {
                _this.themeListeners.delete(key);
                themeListenerKeys.splice(deletionIndex, 1);
            }
        };
    };
    ThemeService.prototype.getStyle = function (className) {
        console.log("class name : ", className, this.themeBoundry.toString());
        return this.themeBoundry()(className);
    };
    ThemeService.prototype.changeTheme = function (name) {
        var _this = this;
        this.themeBoundry()({
            type: 'changeTheme',
            theme: name,
        });
        themeListenerKeys.forEach(function (key) {
            var _a;
            if (_this.themeListeners.has(key)) {
                (_a = _this.themeListeners.get(key)) === null || _a === void 0 ? void 0 : _a(name);
            }
        });
    };
    return ThemeService;
}());
exports.ThemeService = ThemeService;
;
//# sourceMappingURL=ThemeService.js.map