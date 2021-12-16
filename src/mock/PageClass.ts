import StatusBar = require("@smartface/native/application/statusbar");
import HeaderBar = require("@smartface/native/ui/headerbar");
import Page = require("@smartface/native/ui/page");
import { StyleContextComponentType } from "index";

export interface ContextPage extends Page {
  headerBar: StyleContextComponentType<HeaderBar>
  statusBar: StyleContextComponentType<StatusBar>
}

export interface PageClass {
  new (...args: any[]): ContextPage
}
