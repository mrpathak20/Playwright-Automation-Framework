import type { Label, Link } from "allure-js-commons";
/**
 * @deprecated please use api exported by "allure-js-commons" instead.
 */
export interface AllurePlaywrightLegacyApi {
    label: (name: string, value: string) => Promise<void>;
    labels: (...labels: Label[]) => Promise<void>;
    link: (type: string, url: string, name?: string) => Promise<void>;
    links: (...links: Link[]) => Promise<void>;
    parameter: (name: string, value: string, options?: {
        excluded?: boolean;
        mode?: "hidden" | "masked" | "default";
    }) => Promise<void>;
    description: (markdown: string) => Promise<void>;
    descriptionHtml: (html: string) => Promise<void>;
    testCaseId: (id: string) => Promise<void>;
    historyId: (id: string) => Promise<void>;
    allureId: (id: string) => Promise<void>;
    displayName: (name: string) => Promise<void>;
    attachment: (name: string, content: Buffer | string, type: string) => Promise<void>;
    issue: (name: string, url: string) => Promise<void>;
    tms: (name: string, url: string) => Promise<void>;
    epic: (name: string) => Promise<void>;
    feature: (name: string) => Promise<void>;
    story: (name: string) => Promise<void>;
    suite: (name: string) => Promise<void>;
    parentSuite: (name: string) => Promise<void>;
    subSuite: (name: string) => Promise<void>;
    owner: (name: string) => Promise<void>;
    severity: (name: string) => Promise<void>;
    layer: (name: string) => Promise<void>;
    tag: (name: string) => Promise<void>;
    tags: (...tagsList: string[]) => Promise<void>;
    step: (name: string, body: () => Promise<void>) => Promise<void>;
}
/**
 * @deprecated please use api exported by "allure-js-commons" instead.
 */
export declare const allurePlaywrightLegacyApi: AllurePlaywrightLegacyApi;
