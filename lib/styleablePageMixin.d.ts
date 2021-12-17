import View = require("@smartface/native/ui/view");
import { StyleContextComponentType, StyleContextComponent } from ".";
export declare function styleablePageMixin<T extends new (...args: any[]) => any = new (...args: any[]) => any>(Pg: T): {
    new (...args: any[]): {
        [x: string]: any;
        dispatch?: StyleContextComponent["dispatch"];
        themeContext?: ((action?: any) => void) | undefined;
        headerBarUpdated: boolean;
        name: string;
        addStyleableChild(child: View<any>, name?: string | undefined, classNames?: string | undefined, userProps?: {
            [key: string]: any;
        } | undefined, defaultClassNames?: string | undefined): void;
        updateHeaderBar(): void;
        componentDidEnter(dispatcher: StyleContextComponent["dispatch"]): void;
        onShow: () => void;
        onOrientationChange: () => void;
        removeChild(child: StyleContextComponentType<View>): void;
        removeChildren(): void;
        onLoad(): void;
        dispose(): void;
        onSafeAreaPaddingChange(paddings: {
            left?: number;
            right?: number;
            top?: number;
            bottom?: number;
        }): void;
    };
} & T;
