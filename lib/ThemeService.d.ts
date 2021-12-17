import { StylingBoundry } from 'StylingBoundry';
declare type ThemeListener = (themeName: string) => void;
export declare class ThemeService {
    private config;
    private themeListeners;
    private themeConfig;
    private currentTheme;
    private themeSources;
    private themeBoundry;
    static instance: ThemeService;
    constructor(config: Record<any, any>);
    addPage(page: StylingBoundry, name: string): any;
    onChange(listener: ThemeListener): () => void;
    getStyle(className: string): any;
    changeTheme(name: string): void;
}
export {};
