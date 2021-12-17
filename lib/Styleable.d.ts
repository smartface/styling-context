import NavigationController = require('@smartface/native/ui/navigationcontroller');
import View = require('@smartface/native/ui/view');
import { ComponentStyleContext } from './ComponentStyleContext';
export declare abstract class Styleable {
    static $$styleContext: ComponentStyleContext;
}
export declare type ViewType = View | NavigationController;
export interface ComponentWithNamedChildren {
    addChildByName(name: string, child: View): void;
}
export interface ComponentConstructor {
    new (params?: any): {};
}
