"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleablePageMixin = void 0;
var pageContext_1 = __importDefault(require("pageContext"));
var ThemeService_1 = require("./ThemeService");
var addChild_1 = __importDefault(require("./action/addChild"));
var removeChild_1 = __importDefault(require("./action/removeChild"));
var removeChildren_1 = __importDefault(require("./action/removeChildren"));
function styleablePageMixin(Pg) {
    var StyleablePageClass = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this, args[1]) || this;
            _this.headerBarUpdated = false;
            _this.onShow = function () {
                var _a, _b;
                _this.updateHeaderBar();
                (_a = _this.dispatch) === null || _a === void 0 ? void 0 : _a.call(_this, {
                    type: "invalidate",
                });
                (_b = _this.dispatch) === null || _b === void 0 ? void 0 : _b.call(_this, {
                    type: "forceComponentUpdate",
                    name: "statusbar",
                });
                _this.layout.applyLayout();
            };
            _this.onOrientationChange = function (_a) {
                var orientation = _a.orientation;
                _this.dispatch &&
                    _this.dispatch({
                        type: "orientationStarted",
                    });
                _this.layout.applyLayout();
                setTimeout(function () {
                    _this.dispatch &&
                        _this.dispatch({
                            type: "orientationEnded",
                        });
                    _this.layout.applyLayout();
                }, 1);
            };
            _this.name = args[0];
            return _this;
        }
        class_1.prototype.addChild = function (child, name, classNames, userProps, defaultClassNames) {
            if (name)
                this.addStyleableChild(child, name, classNames, userProps, defaultClassNames);
            else if (this.layout)
                this.layout.addChild(child);
        };
        class_1.prototype.addStyleableChild = function (child, name, classNames, userProps, defaultClassNames) {
            var _a;
            name &&
                ((_a = this.dispatch) === null || _a === void 0 ? void 0 : _a.call(this, (0, addChild_1.default)(name, child, classNames, userProps, defaultClassNames)));
            this.layout.addChild(child);
        };
        class_1.prototype.updateHeaderBar = function () {
            var _a;
            if (this.parentController &&
                this.parentController.headerBar &&
                !this.headerBarUpdated) {
                this.headerBarUpdated = true;
                (_a = this.dispatch) === null || _a === void 0 ? void 0 : _a.call(this, {
                    type: "updateComponent",
                    component: this.parentController.headerBar,
                });
            }
        };
        class_1.prototype.componentDidEnter = function (dispatcher) {
            this.dispatch = dispatcher;
        };
        class_1.prototype.removeChild = function (child) {
            this.layout.removeChild(child);
            child.dispatch && child.dispatch((0, removeChild_1.default)());
        };
        class_1.prototype.removeChildren = function () {
            var _a;
            (_a = this.dispatch) === null || _a === void 0 ? void 0 : _a.call(this, (0, removeChildren_1.default)());
        };
        class_1.prototype.onLoad = function () {
            var _a;
            // this.themeContext = Application.theme(createPageContext(this, name, null, null), name);
            this.themeContext = (_a = ThemeService_1.ThemeService.instance) === null || _a === void 0 ? void 0 : _a.addPage((0, pageContext_1.default)(this, this.name), this.name);
            this.updateHeaderBar();
        };
        class_1.prototype.dispose = function () {
            var _a;
            this.removeChildren();
            (_a = this.themeContext) === null || _a === void 0 ? void 0 : _a.call(this, null);
        };
        class_1.prototype.onSafeAreaPaddingChange = function (paddings) {
            var _a;
            var style = {};
            paddings.left != undefined && (style.paddingLeft = paddings.left);
            paddings.right != undefined && (style.paddingRight = paddings.right);
            paddings.top != undefined && (style.paddingTop = paddings.top);
            paddings.bottom != undefined && (style.paddingBottom = paddings.bottom);
            if (this.ios.safeAreaLayoutMode === true) {
                (_a = this.dispatch) === null || _a === void 0 ? void 0 : _a.call(this, {
                    type: "updatePageSafeArea",
                    safeArea: style,
                });
                this.layout.applyLayout();
            }
        };
        return class_1;
    }(Pg));
    return StyleablePageClass;
}
exports.styleablePageMixin = styleablePageMixin;
//# sourceMappingURL=styleablePageMixin.js.map