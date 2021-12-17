import type View = require("@smartface/native/ui/view");
import { ConstructorOf } from "./ConstructorOf";
export declare function styleableContainerComponentMixin<T extends ConstructorOf<any> = ConstructorOf<any>>(ViewClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        addStyleableChild(child: View, name: string, classNames?: string | undefined, userProps?: {
            [key: string]: any;
        } | undefined, defaultClassNames?: string | undefined): void;
        removeChild(view: View): void;
        dispatch?: ((action: {
            [key: string]: any;
        }) => void) | undefined;
    };
} & T;
export declare function styleableComponentMixin<T extends ConstructorOf<any> = ConstructorOf<any>>(ViewClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        dispatch?: ((action: {
            [key: string]: any;
        }) => void) | undefined;
    };
} & T;
