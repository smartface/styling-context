"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orientationState = void 0;
var commandsManager_1 = __importDefault(require("@smartface/styler/lib/commandsManager"));
var merge_1 = __importDefault(require("@smartface/styler/lib/utils/merge"));
var screen_1 = __importDefault(require("@smartface/native/device/screen"));
var system_1 = __importDefault(require("@smartface/native/device/system"));
var isTablet_1 = __importDefault(require("../core/isTablet"));
var fromSFComponent_1 = __importDefault(require("./fromSFComponent"));
var pageContextHooks_1 = require("./pageContextHooks");
var pageContextReducer_1 = require("./pageContextReducer");
exports.orientationState = "ended";
commandsManager_1.default.addRuntimeCommandFactory(function pageContextRuntimeCommandFactory(type, error) {
    switch (type) {
        case '+Device':
            return function deviceRule(opts) {
                var Device = {
                    screen: {
                        width: screen_1.default.width,
                        height: screen_1.default.height
                    },
                    os: system_1.default.OS,
                    osVersion: system_1.default.OSVersion,
                    type: isTablet_1.default ? "tablet" : "phone",
                    orientation: screen_1.default.width > screen_1.default.height ? "landscape" : "portrait",
                    language: system_1.default.language
                };
                opts = (0, merge_1.default)(opts);
                var isOK = false;
                try {
                    isOK = eval(opts.args);
                }
                catch (e) {
                    error && error(e);
                    return {};
                }
                return isOK ? opts.value : {};
            };
    }
});
/**
 * Creates new page context boundry
 *
 * @param {object} component - Root component of the context
 * @param {string} name - Root component ID
 * @param {function} reducers - Reducers function
 */
function createPageContext(component, name, reducers) {
    if (reducers === void 0) { reducers = null; }
    var styleContext = (0, fromSFComponent_1.default)(component, name, pageContextHooks_1.pageContextHooks);
    var _contextReducer = reducers ?
        function (context, action, target, state) {
            var newState = (0, pageContextReducer_1.pageContextReducer)(context, action, target, state);
            return reducers(context, action, target, newState || state);
        } :
        pageContextReducer_1.pageContextReducer;
    // creates an initial styling for the context
    // styleContext(styling, _contextReducer);
    return function setStyle(styling) {
        try {
            // const styling = styler(newStyles);
            // injects a new styling to the context
            styleContext(styling, _contextReducer);
        }
        catch (e) {
            throw e;
        }
    };
}
exports.default = createPageContext;
//# sourceMappingURL=pageContext.js.map