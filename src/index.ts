import type View from "@smartface/native/ui/view";

export * as addChild from "./action/addChild";
export * as removeChild from "./action/removeChild";
export * as removeChildren from "./action/removeChildren";
export * as pageContext from "./pageContext";
export * as pageContextPatch from "./pageContextPatch";
export * as componentContextPatch from "./componentContextPatch";

export interface IViewContainer {
  addChild(child: View):void;
  removeChild(child: View): void;
}

export type StyleContextComponent = {
  dispatch?: (action: { [key: string]: any }) => void;
};
export type StyleContextAddChild = {
  addStyleableChild(
    child: View,
    name?: string,
    classNames?: string,
    userProps?: { [key: string]: any },
    defaultClassNames?: string,
  ): void;
};
export type StyleContextContainerComponent = IViewContainer & StyleContextAddChild & StyleContextComponent;
export type StyleContextComponentType<T> = T &
  StyleContextAddChild &
  StyleContextComponent;
export type StyleContextComponentWithDispatch<T> = T & StyleContextComponent;
export type componentContextPatch = <T = any>(
  component: T,
  name: string,
) => StyleContextComponentType<T>;

