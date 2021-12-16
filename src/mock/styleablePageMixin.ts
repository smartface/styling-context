import type View = require("@smartface/native/ui/view");
import createPageContext from "pageContext";
import { ThemeService } from "../ThemeService";
import { StyleContextComponentType, StyleContextComponent } from "..";
import { StyleablePage } from "./StyleablePage";
import addContextChild from "../action/addChild";
import removeContextChild from "../action/removeChild";
import removeContextChildren from "../action/removeChildren";
import { PageClass } from "./PageClass";
import Page = require("@smartface/native/ui/page");
import { ThemeDispatchFn } from "@smartface/contx/lib/styling/ThemeContext";

export function styleablePageMixin(PageClass: typeof Page) {
  return class
    extends (PageClass as unknown as PageClass)
    implements StyleablePage
  {
    dispatch?: StyleContextComponent["dispatch"];
    themeContext?: ThemeDispatchFn;
    private headerBarUpdated: boolean = false;

    constructor(private name: string, params: Record<string, any>) {
      super(params);
    }

    addStyleableChild(
      child: View<typeof View.Events>,
      name?: string,
      classNames?: string,
      userProps?: { [key: string]: any },
      defaultClassNames?: string
    ): void {
      name &&
        this.dispatch?.(
          addContextChild(name, child, classNames, userProps, defaultClassNames)
        );
      this.layout.addChild(child);
    }

    private updateHeaderBar() {
      if (
        this.parentController &&
        this.parentController.headerBar &&
        !this.headerBarUpdated
      ) {
        this.headerBarUpdated = true;
        this.dispatch?.({
          type: "updateComponent",
          component: this.parentController.headerBar,
        });
      }
    }

    componentDidEnter(dispatcher: StyleContextComponent["dispatch"]) {
      this.dispatch = dispatcher;
    }

    onShow = () => {
      this.updateHeaderBar();
      this.dispatch?.({
        type: "invalidate",
      });
      this.dispatch?.({
        type: "forceComponentUpdate",
        name: "statusbar",
      });

      this.layout.applyLayout();
    };

    onOrientationChange = () => {
      this.dispatch &&
        this.dispatch({
          type: "orientationStarted",
        });
      this.layout.applyLayout();
      setTimeout(() => {
        this.dispatch &&
          this.dispatch({
            type: "orientationEnded",
          });
        this.layout.applyLayout();
      }, 1);
    };

    removeChild(child: StyleContextComponentType<View>) {
      this.layout.removeChild(child);
      child.dispatch && child.dispatch(removeContextChild());
    }

    removeChildren() {
      this.dispatch?.(removeContextChildren());
    }

    onLoad() {
      // this.themeContext = Application.theme(createPageContext(this, name, null, null), name);
      this.themeContext = ThemeService.instance?.addPage(
        createPageContext(this, this.name),
        this.name
      );
      this.updateHeaderBar();
    };

    dispose() {
      this.removeChildren();
      this.themeContext?.(null);
    }

    onSafeAreaPaddingChange(paddings: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    }) {
      const style: {
        paddingLeft?: number;
        paddingRight?: number;
        paddingTop?: number;
        paddingBottom?: number;
      } = {};
      paddings.left != undefined && (style.paddingLeft = paddings.left);
      paddings.right != undefined && (style.paddingRight = paddings.right);
      paddings.top != undefined && (style.paddingTop = paddings.top);
      paddings.bottom != undefined && (style.paddingBottom = paddings.bottom);

      if (this.ios.safeAreaLayoutMode === true) {
        this.dispatch?.({
          type: "updatePageSafeArea",
          safeArea: style,
        });

        this.layout.applyLayout();
      }
    }
  };
}
