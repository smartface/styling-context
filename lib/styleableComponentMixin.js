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
exports.styleableComponentMixin = exports.styleableContainerComponentMixin = void 0;
var addChild_1 = __importDefault(require("./action/addChild"));
var removeChild_1 = __importDefault(require("./action/removeChild"));
function styleableContainerComponentMixin(ViewClass) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.addStyleableChild = function (child, name, classNames, userProps, defaultClassNames) {
            var _a, _b;
            (_a = _super.prototype.addChild) === null || _a === void 0 ? void 0 : _a.call(this, child);
            (_b = this.dispatch) === null || _b === void 0 ? void 0 : _b.call(this, (0, addChild_1.default)(name, child, classNames, userProps, defaultClassNames));
        };
        class_1.prototype.removeChild = function (view) {
            var _a, _b;
            (_a = this.dispatch) === null || _a === void 0 ? void 0 : _a.call(this, (0, removeChild_1.default)());
            (_b = _super.prototype.removeChild) === null || _b === void 0 ? void 0 : _b.call(this, view);
        };
        return class_1;
    }(ViewClass));
}
exports.styleableContainerComponentMixin = styleableContainerComponentMixin;
function styleableComponentMixin(ViewClass) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_2;
    }(ViewClass));
}
exports.styleableComponentMixin = styleableComponentMixin;
//# sourceMappingURL=styleableComponentMixin.js.map