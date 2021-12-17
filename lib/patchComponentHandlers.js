"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchComponentHandlers = void 0;
var raiseErrorMaybe_1 = __importDefault(require("../core/util/raiseErrorMaybe"));
// function createOriginals(component) {
//   !component.__original_addChild && (component.__original_addChild = component.addChild);
//   !component.__original_removeChild && (component.__original_removeChild = component.removeChild);
//   !component.__original_removeAll && (component.__original_removeAll = component.removeAll);
// }
function patchComponentHandlers(component, rootName, name) {
    try {
        if (component.layout && component.layout.addChild) {
            createOriginals(component.layout);
            Object.defineProperties(component.layout, {
                addChild: {
                    enumerable: true,
                    configurable: true,
                    value: addChild.bind(component, component.layout.__original_addChild.bind(component.layout))
                },
                removeChild: {
                    enumerable: true,
                    configurable: true,
                    value: removeChild.bind(component, component.layout.__original_removeChild.bind(component.layout))
                },
                removeAll: {
                    enumerable: true,
                    configurable: true,
                    value: removeChildren.bind(component, component.layout.__original_removeAll.bind(component.layout))
                }
            });
        }
        else if (component.addChild) {
            createOriginals(component);
            Object.defineProperties(component, {
                addChild: {
                    enumerable: true,
                    configurable: true,
                    value: addChild.bind(component, component.__original_addChild.bind(component))
                },
                removeChild: {
                    enumerable: true,
                    configurable: true,
                    value: removeChild.bind(component, component.__original_removeChild.bind(component))
                },
                removeAll: {
                    enumerable: true,
                    configurable: true,
                    value: removeChildren.bind(component, component.__original_removeAll.bind(component))
                }
            });
        }
        else {
            !component.removeChild && (component.removeChild = removeChild.bind(component));
        }
    }
    catch (e) {
        e.message = "An Error is occurred when component [".concat(name, "] is patched in the [").concat(rootName, "]. ").concat(e.message);
        (0, raiseErrorMaybe_1.default)(e, component.onError);
    }
}
exports.patchComponentHandlers = patchComponentHandlers;
//# sourceMappingURL=patchComponentHandlers.js.map