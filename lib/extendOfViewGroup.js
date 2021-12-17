"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendOfViewGroup = void 0;
function extendOfViewGroup(klass) {
    return typeof klass.prototype.addChild === "function";
}
exports.extendOfViewGroup = extendOfViewGroup;
//# sourceMappingURL=extendOfViewGroup.js.map