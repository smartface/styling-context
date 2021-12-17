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
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentContextPatch = exports.pageContextPatch = exports.pageContext = exports.removeChildren = exports.removeChild = exports.addChild = void 0;
exports.addChild = __importStar(require("./action/addChild"));
exports.removeChild = __importStar(require("./action/removeChild"));
exports.removeChildren = __importStar(require("./action/removeChildren"));
exports.pageContext = __importStar(require("./pageContext"));
exports.pageContextPatch = __importStar(require("./pageContextPatch"));
exports.componentContextPatch = __importStar(require("./componentContextPatch"));
//# sourceMappingURL=index.js.map