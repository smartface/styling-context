export function pageContextHooks(hook: any): ((styles: any) => {
    [key: string]: any;
}) | ((oldStyles: any, newStyles: any) => (acc: any, key: any) => any) | undefined;
