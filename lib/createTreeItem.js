"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTreeItem = void 0;
var application_1 = __importDefault(require("@smartface/native/application"));
// function addChild(superAddChild, child, name, classNames = "", userProps = null, defaultClassNames= "") {
//   superAddChild(child);
//   name && this.dispatch(addContextChild(name, child, classNames, userProps, defaultClassNames));
// }
// function removeChild(superRemoveChild, child) {
//   if (child) {
//     superRemoveChild && superRemoveChild(child);
//     child.dispatch && child.dispatch(removeContextChild());
//   }
//   else {
//     this.getParent && this.getParent() && this.getParent().removeChild(this);
//     this.dispatch && this.dispatch(removeContextChild());
//   }
// }
// function removeChildren(superRemoveAll) {
//   superRemoveAll();
//   this.dispatch && this.dispatch(removeContextChildren());
// }
function createTreeItem(component, name, rootName, root, defaultClassNames) {
    var componentVars;
    var classNames = component.__tree_item === true ? component.classNames : "";
    if (name == rootName + "_statusBar") {
        componentVars = root.constructor && root.constructor.$$styleContext.statusBar || {};
        component = application_1.default.statusBar || component;
    }
    else if (name == rootName + "_headerBar") {
        componentVars = root.constructor && root.constructor.$$styleContext.headerBar || {};
    }
    else {
        componentVars = component.constructor && component.constructor.$$styleContext || {};
    }
    // patchComponent(component, rootName, name);
    classNames = componentVars.classNames ?
        componentVars.classNames + " " + classNames + " #" + name :
        classNames + " #" + name;
    return {
        component: component,
        classNames: classNames,
        defaultClassNames: componentVars.defaultClassNames ?
            componentVars.defaultClassNames + (defaultClassNames ? (" " + defaultClassNames) : "") : defaultClassNames,
        userStyle: componentVars.userProps,
        name: name,
        __tree_item: true
    };
    // }
}
exports.createTreeItem = createTreeItem;
//# sourceMappingURL=createTreeItem.js.map