"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActorTreeFromSFComponent = void 0;
var createTreeItem_1 = require("createTreeItem");
var Stylable_1 = __importDefault(require("../styling/Stylable"));
var fromSFComponent_1 = require("./fromSFComponent");
function createActorTreeFromSFComponent(component, name, rootName, defaultClassNames) {
    var _a;
    if (component.addChild || component.layout) {
        var ctree_1 = (0, fromSFComponent_1.extractTreeFromSFComponent)(component, name, defaultClassNames);
        var _ctree_1 = {};
        Object.keys(ctree_1).forEach(function (name) { return _ctree_1[(0, fromSFComponent_1.createName)(rootName, name)] = (0, Stylable_1.default)(ctree_1[name]); });
        return _ctree_1;
    }
    else {
        return _a = {},
            _a[(0, fromSFComponent_1.createName)(rootName, name)] = (0, Stylable_1.default)((0, createTreeItem_1.createTreeItem)(component, name, rootName, component, defaultClassNames)),
            _a;
    }
}
exports.createActorTreeFromSFComponent = createActorTreeFromSFComponent;
//# sourceMappingURL=createActorTreeFromSFComponent.js.map