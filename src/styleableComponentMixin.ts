import View = require("@smartface/native/ui/view");
import ViewGroup = require("@smartface/native/ui/viewgroup");
import { Styleable } from "./Styleable";
import addContextChild from "./action/addChild";
import removeContextChild from "./action/removeChild";
import { ConstructorOf } from "./ConstructorOf";

type IContainer<T> = ConstructorOf<ViewGroup>;
export function styleableContainerComponentMixin<
  T extends IContainer<{ [k: string]: any }> = IContainer<{ [k: string]: any }>
>(ViewClass: T) {
  return class extends ViewClass implements Styleable {
    addStyleableChild(
      child: View,
      name: string,
      classNames?: string,
      userProps?: { [key: string]: any },
      defaultClassNames?: string
    ): void {
      super.addChild?.(child);
      this.dispatch?.(
        addContextChild(name, child, classNames, userProps, defaultClassNames)
      );
    }

    removeChild(view: View) {
      this.dispatch?.(removeContextChild());
      super.removeChild?.(view);
    }
    dispatch?: (action: { [key: string]: any }) => void;
  };
}

export function styleableComponentMixin<
  T extends ConstructorOf<any> = ConstructorOf<any>
>(ViewClass: T) {
  return class extends (ViewClass as unknown as T) implements Styleable {
    dispatch?: (action: { [key: string]: any }) => void;
  };
}
