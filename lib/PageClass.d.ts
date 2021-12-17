import Page = require("@smartface/native/ui/page");
import View = require("@smartface/native/ui/view");
export interface ContextPage extends Page {
    new (name: string, params: ConstructorParameters<typeof Page>): ContextPage;
    addStyleableChild(child: View<any>, name?: string, classNames?: string, userProps?: {
        [key: string]: any;
    }, defaultClassNames?: string): void;
}
export interface PageClass<T> {
    new (...args: any[]): ContextPage;
}
