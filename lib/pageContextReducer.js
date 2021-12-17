"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageContextReducer = void 0;
var fromSFComponent_1 = require("./fromSFComponent");
var pageContext_1 = require("./pageContext");
function pageContextReducer(context, action, target, state) {
    var newState = Object.assign({}, state);
    switch (action.type) {
        case "updateUserStyle":
            context
                .find(target, { updateUserStyle: function () { throw new TypeError("Target ".concat(target, " component cannot be found.")); } })
                .updateUserStyle(action.userStyle);
            return newState;
        case "changeUserStyle":
            context.find(target, { setUserStyle: function () { throw new TypeError("Target ".concat(target, " component cannot be found.")); } })
                .setUserStyle(action.userStyle);
            return newState;
        case "updatePageSafeArea":
            context
                .find(target, { setSafeArea: function () { throw new TypeError("Target ".concat(target, " component cannot be found.")); } })
                .setSafeArea(Object.assign({}, action.safeArea));
            return newState;
        case "invalidate":
            context.map(function (actor) {
                actor.setDirty(true);
            });
            return newState;
        case 'addChild':
            var rootName = target + "_" + action.name;
            var ctree = (0, fromSFComponent_1.createActorTreeFromSFComponent)(action.component, action.name, target, action.defaultClassNames);
            /*if(action.classNames && typeof action.classNames !== 'string' && !Array.isArray(action.classNames)){
                    throw new Error(action.classNames+" classNames must be String or Array");
            }*/
            ctree[target + "_" + action.name] &&
                action.classNames &&
                ctree[rootName].pushClassNames(action.classNames);
            action.userStyle && ctree[rootName].setUserStyle(action.userStyle);
            context.addTree(ctree);
            return newState;
        case 'removeChild':
            context.remove(target);
            return newState;
        case 'removeChildren':
            context.removeChildren(target);
            return newState;
        case 'pushClassNames':
            if (!action.classNames)
                throw new Error("Classnames must not be null or undefined");
            context.find(target).pushClassNames(action.classNames);
            return newState;
        case 'removeClassName':
            context.find(target).removeClassName(action.className);
            return newState;
        case "orientationStarted":
            context.map(function (actor) {
                actor.setDirty(true);
            });
            pageContext_1.orientationState = "started";
            return newState;
        case "orientationEnded":
            context.map(function (actor) {
                actor.setDirty(true);
            });
            pageContext_1.orientationState = "ended";
            return newState;
        case "updateComponent":
            var stylable = context.find(target);
            stylable.updateComponent(action.component);
            stylable.applyStyles(true);
            return newState;
    }
    return state;
}
exports.pageContextReducer = pageContextReducer;
//# sourceMappingURL=pageContextReducer.js.map