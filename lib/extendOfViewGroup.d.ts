import ViewGroup = require("@smartface/native/ui/viewgroup");
import { ConstructorOf } from "./ConstructorOf";
export declare function extendOfViewGroup<T extends any = any>(klass: ConstructorOf<T>): klass is ConstructorOf<T & ViewGroup>;
