import HeaderBar = require("@smartface/native/ui/headerbar");
import type View = require("@smartface/native/ui/view");
import { StyleContextComponentType, StyleContextComponent } from "@smartface/styling-context/src";

export interface StyleablePage {
  readonly dispatch?: StyleContextComponent['dispatch'];
  addStyleableChild(
    child: View,
    name?: string,
    classNames?: string,
    userProps?: { [key: string]: any; },
    defaultClassNames?: string
  ): void;
}