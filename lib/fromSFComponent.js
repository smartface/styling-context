"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTreeFromSFComponent = void 0;
var hooks_1 = __importDefault(require("../core/hooks"));
var StyleContext = __importStar(require("../styling/StyleContext"));
var Stylable_1 = __importDefault(require("../styling/Stylable"));
var raiseErrorMaybe_1 = __importDefault(require("../core/util/raiseErrorMaybe"));
var createTreeItem_1 = require("./createTreeItem");
var createActorName_1 = require("./createActorName");
function buildContextTree(component, name, root, rootName, defaultClassNames, acc) {
    if (acc[name] === undefined) {
        acc[name] = (0, createTreeItem_1.createTreeItem)(component, name, rootName, root, defaultClassNames);
    }
    component.children &&
        Object.keys(component.children).forEach(function (child) {
            var comp = component.children[child];
            try {
                if (comp.component !== undefined && comp.classNames !== undefined) {
                    buildContextTree(comp.component, (0, createActorName_1.createActorName)(name, child), root, rootName, "", acc);
                }
                else {
                    buildContextTree(comp, (0, createActorName_1.createActorName)(name, child), root, rootName, "", acc);
                }
            }
            catch (e) {
                e.message = "Error when component would be collected: " + child + ". " + e.message;
                (0, raiseErrorMaybe_1.default)(e, component.onError);
            }
        });
}
/**
 * Extract components tree from a SF Component
 *
 * @param {Object} component - A @smartface/native component
 * @param {string} name - component name
 * @param {function} initialClassNameMap - classNames mapping with specified component and children
 * @param {?function} hookList - callback function to capture context's hooks
 * @param {?Object} acc [={}] - Initial Accumulator value
 *
 * @return {function} - context helper
 */
function extractTreeFromSFComponent(root, rootName, defaultClassNames, acc) {
    if (acc === void 0) { acc = {}; }
    buildContextTree(root, rootName, root, rootName, defaultClassNames, acc);
    return acc;
}
exports.extractTreeFromSFComponent = extractTreeFromSFComponent;
function fromSFComponent(root, rootName, hooksList, collection) {
    if (hooksList === void 0) { hooksList = null; }
    if (collection === void 0) { collection = {}; }
    var ctree = extractTreeFromSFComponent(root, rootName, null);
    Object.keys(ctree).forEach(function (name) {
        var item = ctree[name];
        ctree[name] = collection[name] || (0, Stylable_1.default)(item);
    });
    return StyleContext.createStyleContext(ctree, (0, hooks_1.default)(hooksList), function updateContextTree(contextElements) {
        if (contextElements === void 0) { contextElements = {}; }
        return fromSFComponent(root, rootName, hooksList, contextElements);
    });
}
exports.default = fromSFComponent;
//# sourceMappingURL=fromSFComponent.js.map